const { SlashCommandBuilder, Client, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");
const { Users } = require("../../Models");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addpremium")
        .setDescription("Permet de mettre le premium.")
        .setDMPermission(true)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option
            .setName("membre")
            .setDescription("Permet de mettre le premium.")
            .setRequired(true)
        ),

    category: "Administrateurs",

    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {

        const user = interaction.options.getUser("membre");
        const member = interaction.guild.members.cache.get(user.id);

        if(!member) {
            return await interaction.reply({
                content: "Impossible de trouver le membre.",
                ephemeral: true
            });
        };

        let data = await Users.findOne({
            userId: interaction.user.id
        });

        if(!data) {
            data = new Users({
                userId: interaction.user.id,
                premium: true,
                cooldown: new Date()
            }).save();
        } else {
            data.premium = true;
            await data.save();
        };

        return await interaction.reply({
            content: `Vous avez ajouté le premium a ${member.user}`,
            ephemeral: true
        });
    }
};