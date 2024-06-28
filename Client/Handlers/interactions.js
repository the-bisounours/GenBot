const { REST, Routes, SlashCommandBuilder, Client, Events } = require("discord.js");
const fs = require("fs");

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client) => {

    const loadItems = (path, collection) => {
        const categories = fs.readdirSync(path);
        categories.forEach(category => {

            const files = fs.readdirSync(`${path}/${category}`);
            files.forEach(file => {

                const item = require(`../${path.split('./Client/')[1]}/${category}/${file}`);
                if (item.id) collection.set(item.id, item);

                if (item.data && item.data.name) {
                    
                    if(item.data instanceof SlashCommandBuilder) {
                        client.commands.set(item.data.name, item);
                    } else {
                        client.context.set(item.data.name, item);
                    };
                    
                    client.slashArray.push(item.data instanceof SlashCommandBuilder ? item.data.toJSON() : item.data);
                };
            });
        });
    };

    ['Buttons', 'Commands'].forEach(type => {
        loadItems(`./Client/${type}`, client[type.toLowerCase()]);
    });

    const rest = new REST({ version: "10" }).setToken(process.env.token);

    client.on(Events.ClientReady, async () => {
        try {

            await rest.put(Routes.applicationCommands(client.user.id), { body: client.slashArray });
            console.log("Les commandes slash ont été mises en place avec succès !");
    
        } catch (err) {
            console.error("Erreur lors de la création des commandes Slash :", err);
        };
    });

    console.log("Les boutons, les modales, les selects, les commandes et les contexts ont bien été chargés avec succès!");
};