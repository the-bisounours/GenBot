const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { Users, Accounts } = require("../../Models");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gen")
        .setDescription("Permet de connaitre la latence.")
        .setDMPermission(true)
        .setDefaultMemberPermissions(null)
        .addStringOption(option => option
            .setName("service")
            .setDescription("Permet de générer un service.")
            .addChoices(
                { name: "Amazon", value: "amazon" },
                { name: "Netflix", value: "netflix" },
                { name: "Spotify", value: "spotify" },
            )
            .setRequired(true)
        ),

    category: "Informations",

    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {

        let user = await Users.findOne({
            userId: interaction.user.id
        });

        if(!user) {
            user = new Users({
                userId: interaction.user.id,
                premium: false,
                cooldown: new Date()
            }).save();
        };

        if(!user.premium) {
            return await interaction.reply({
                content: "Vous devez avoir le prémium.",
                ephemeral: true
            });
        };

        const now = new Date();
        if (now < user.cooldown) {
            const timeLeft = Math.round((user.cooldown - now) / 1000 / 60);
            return await interaction.reply({
                content: `Vous devez attendre encore \`${timeLeft}\` minutes avant de pouvoir réutiliser cette commande.`,
                ephemeral: true
            });
        };

        const accounts = await Accounts.find({
            service: interaction.options.getString("service")
        });

        if(accounts.length === 0) {
            return await interaction.reply({
                content: `Il n'y a plus de stock dans la base de donnée pour le service \`${interaction.options.getString("service")}\`.`,
                ephemeral: true
            });
        };

        try {

            await interaction.member.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Informations de votre compte générer")
                    .setFooter({
                        text: "Made by the_bisounours",
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTimestamp()
                    .setColor("Blurple")
                    .setDescription(`> **Service:** \`${accounts[0].service}\`\n> **Username:** \`${accounts[0].username}\`\n> **Password:** \`${accounts[0].password}\`\n> **Compte générer:** <t:${Math.round(accounts[0].createdAt / 1000)}:D> <t:${Math.round(accounts[0].createdAt / 1000)}:R>`)
                ]
            });

            await accounts[0].deleteOne();
            user.cooldown = new Date(now.getTime() + process.env.CooldownHours * 60 * 60 * 1000);
            await user.save();

            return await interaction.reply({
                content: "Votre service a été envoyé en message privé.", 
                ephemeral: true
            });

        } catch (err) {
            return await interaction.reply({
                content: "Votre service n'a pas été envoyé en message privé.", 
                ephemeral: true
            });
        };
    }
};