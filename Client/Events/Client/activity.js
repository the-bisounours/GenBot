const { Events, Client, ActivityType } = require("discord.js");
const { Activity } = require("../../Models");

module.exports = {
    name: Events.ClientReady,
    once: false,

    /**
     * 
     * @param {Client} client 
     */
    execute: async (client) => {

        client.user.setActivity({
            name: "the_bisounours",
            type: ActivityType.Streaming,
            url: "https://twitch.tv/the_bisounours"
        });
    }
};