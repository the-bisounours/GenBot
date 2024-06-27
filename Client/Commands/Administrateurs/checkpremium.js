const { SlashCommandBuilder, Client, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");
const { Users } = require("../../Models");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("checkpremium")
        .setDescription("Permet de check le premium.")
        .setDMPermission(true)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option
            .setName("membre")
            .setDescription("Permet de check le premium.")
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

        const data = await Users.findOne({
            userId: interaction.user.id
        });

        return await interaction.reply({
            content: `${data && data.premium ? `${member.user} a le prémium.` : `${member.user} n'a pas le prémium.`}`,
            ephemeral: true
        });
    }
};