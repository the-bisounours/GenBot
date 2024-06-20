const { SlashCommandBuilder, Client, ChatInputCommandInteraction } = require("discord.js");
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Permet de modifier le volume.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .addNumberOption(option => option
            .setName("volume")
            .setDescription("Permet de modifier le volume.")
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(100)
        ),

    category: "Musiques",

    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {

        const player = useMainPlayer();

        const channel = interaction.member.voice?.channel;
        if (!channel) {
            return await interaction.reply({
                content: "Vous n'êtes connecté à aucun canal vocal.",
                ephemeral: true
            });
        };

        if (!player.queues.get(interaction.guild.id) || !player.queues.get(interaction.guild.id).isPlaying()) {
            return await interaction.reply({
                content: "Il n'y a pas de musique en cours.",
                ephemeral: true
            });
        };

        if (player.queues.get(interaction.guild.id).node.volume === interaction.options.getNumber("volume")) {
            return await interaction.reply({
                content: `Le volume de la musique est déjà a \`${interaction.options.getNumber("volume")}/100\``,
                ephemeral: true
            });
        };
        
        player.queues.get(interaction.guild.id).node.setVolume(interaction.options.getNumber("volume"));
        return await interaction.reply({
            content: `Le volume est maintenant a \`${interaction.options.getNumber("volume")}/100\`.`
        });
    }
};