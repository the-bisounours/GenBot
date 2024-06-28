const { SlashCommandBuilder, Client, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");
const { Accounts } = require("../../Models");
const id = require("../../Functions/id");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("removestock")
        .setDescription("Permet de mettre du stock.")
        .setDMPermission(true)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => option
            .setName("account")
            .setDescription("Permet de mettre l'identifiant du compte.")
            .setRequired(true)
        ),

    category: "Administrateurs",

    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {

        const account = await Accounts.findOneAndDelete({
            guildId: interaction.guild.id,
            accountId: interaction.options.getString("account")
        });

        if(!account) {
            return await interaction.reply({
                content: `Le compte n'existe pas.`,
                ephemeral: true
            });
        };

        return await interaction.reply({
            content: `Vous avez retiré le compte avec l'identifiant \`${account.accountId}\``,
            ephemeral: true
        });
    }
};