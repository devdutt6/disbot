const { Client, Collection, Events, GatewayIntentBits, userMention, bold } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('node:path');
const cron = require('node-cron');
const { token } = require('./config.json');
const { slashCommandHandeler } = require('./handelers/slashCommand');
const { modalSubmissionHandeler } = require('./handelers/modalSubmit');
// const { remainderScript } = require('./utils/remainderScript');
const { Remainder } = require('./modules/reminder');
const { DateTime } = require('luxon');
// const { userMention, bold } = require('discord.js');

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

cron.schedule( '* * * * *', async () => {
	try{
		let current_time = DateTime.now();

		let remainders = await Remainder.find({ date: {
			$lt: current_time.ts
		} }).lean();
		console.log(`got ${remainders.length} to send`);
		for( let i=0;i<remainders.length;i++){
			let channel = await client.channels.fetch(remainders[i].channelId);
			await channel.send(`Remainder for ${userMention(remainders[i].userId)}\n${bold('description: ')}${remainders[i].description}`);
		}

		await Remainder.deleteMany({ date: {
			$lt: current_time.ts
		} });
		return;
	}
	catch(err){
		console.error(err);
		return;
	}
} ); // every minute check and send remainder

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