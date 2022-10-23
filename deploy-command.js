const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const { guildId, clientId, token } = require('./config.json');

let commands = [];
// Getting all command files from command folder
let commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

// Creating array of commands from command files
for( const file of commandFiles ){
  const command = require(path.join(__dirname, `commands/${file}`));
  commands.push(command.data.toJSON());
}

// REST from discord.js for request application apis
const rest = new REST({ version: '10' }).setToken(token);

// Registering the commands of application(bot) for some specific GUILD(server) to discord application
(async () => {
  try{
    console.log(`Starting deployment of ${commands.length} application (/) commands`);

    const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    // console.log({ data });
    console.log(`Completed deployment of ${data.length} application (/) commands`);
  }
  catch(err){
    console.error(err);
  }
})();