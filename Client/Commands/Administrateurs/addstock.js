const { SlashCommandBuilder, Client, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");
const { Accounts } = require("../../Models");
const id = require("../../Functions/id");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addstock")
        .setDescription("Permet de mettre du stock.")
        .setDMPermission(true)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => option
            .setName("service")
            .setDescription("Permet de mettre du stock.")
            .setRequired(true)
            .addChoices(
                { name: "Amazon", value: "amazon" },
                { name: "Netflix", value: "netflix" },
                { name: "Spotify", value: "spotify" },
            )
        )
        .addStringOption(option => option
            .setName("username")
            .setDescription("Permet de mettre l'username.")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("password")
            .setDescription("Permet de mettre le password.")
            .setRequired(true)
        ),

    category: "Administrateurs",

    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {

        const service = interaction.options.getString("service");
        const username = interaction.options.getString("username");
        const password = interaction.options.getString("password");

        const account = await new Accounts({
            guildId: interaction.guild.id,
            accountId: id("ACCOUNT", 8),
            service: service,
            username: username,
            password: password,
            createdAt: Date.now()
        }).save();

        return await interaction.reply({
            content: `Vous avez ajouté un stock pour \`${service}\` avec l'identifiant \`${account.accountId}\``,
            ephemeral: true
        });
    }
};