const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');
const { slashCommandHandeler } = require('./handelers/slashCommand');
const { modalSubmissionHandeler } = require('./handelers/modalSubmit');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers ]});

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// mongoose connection
let conn_string = 'mongodb://localhost:27017/discord';
mongoose.connect(conn_string)
.then(() => console.log("Database Connected"))
.catch((err) => console.error(err));

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

// slash command handeler
client.on(Events.InteractionCreate, async interaction => {
	let res;
	if( interaction.isChatInputCommand() ){
		res = await slashCommandHandeler(client, interaction);
	}
	else if( interaction.isModalSubmit() ){
		res = await modalSubmissionHandeler(interaction);
	}
	else{
		return;
	}

	if(res.status) return;
	return interaction.reply({  content: 'There was an error while executing this command!', ephemeral: true  });
});

client.login(token);