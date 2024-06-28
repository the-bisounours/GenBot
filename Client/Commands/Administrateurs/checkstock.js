const { SlashCommandBuilder, Client, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { Accounts } = require("../../Models");
const paginations = require("../../Functions/paginations");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("checkstock")
        .setDescription("Permet de regarder le stock.")
        .setDMPermission(true)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    category: "Administrateurs",

    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {

        const accounts = await Accounts.find({ 
            guildId: interaction.guild.id
        });

        if(accounts.length === 0) {
            return await interaction.reply({
                content: "Aucun compte disponible dans ce serveur.",
                ephemeral: true
            });
        };

        const embeds = [];
        for (let index = 0; index < accounts.length; index++) {
            const account = accounts[index];
            
            embeds.push(
                new EmbedBuilder()
                .setTitle("Informations des comptes disponible")
                .setFooter({
                    text: "Made by the_bisounours",
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()
                .setColor("Blurple")
                .setDescription(`> **Identifiant:** \`${account.accountId}\`\n> **Service:** \`${account.service}\`\n> **Username:** \`${account.username}\`\n> **Password:** \`${account.password}\`\n> **Compte générer:** <t:${Math.round(account.createdAt / 1000)}:D> <t:${Math.round(account.createdAt / 1000)}:R>`)
            )
        };

        return await paginations(interaction, embeds, 60 * 1000, false);
    }
};