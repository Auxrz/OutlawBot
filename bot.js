const fs = require('fs');;
const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose')
const Config = require('./lib/mongodb.js')
const Logs = require('./lib/outlawlogs')
const ytdl = require("ytdl-core")
const ffmpeg = require("ffmpeg")
var YouTube = require('youtube-node');

var yt = new YouTube()
yt.setKey(config.ytpikey)

const { inspect } = require("util");
mongoose.connect('mongodb://127.0.0.1:27017',
{useNewUrlParser: true}), (err) => {
	if(err) return console.err(err);
	console.log('Connected to mongodb')
}
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	client.user.setActivity(`${client.users.cache.size} users | :help | In Beta`, {type: "WATCHING"});
	client.guilds.cache.keyArray().forEach(id => {
		Config.findOne({
			guildID:id
		}, (err,guild) => {
			if (err) console.error(err)
			if(!guild) {
				const newConfig = new Config({
					guildID: id,
					prefix: config.prefix,
					dmrole: null,
					announcerole: null,
					logs: null,
					welcomechannel: null,
					welcomemsg: null,
					opted: Array
					
				});
				return newConfig.save()
			}
		})
		})

	})
	client.on("guildCreate", server => {
				const newConfig = new Config({
					guildID: server.id,
					prefix: config.prefix,
					dmrole: null,
					announcerole: null,
					logs: null,
					welcomechannel: null,
					welcomemsg: null,
					opted: Array
				});
				return newConfig.save()
			})
			client.on("guildDelete", server => {
				Config.findOne({
					guildID: server.id
				}, (err, guild) => {
					guild.deleteOne()
				})
			})
				

client.on('message', message => {
	if(message.guild === null) return;
	Config.findOne({
		guildID: message.guild.id
	}, (err, guild) => {
		if(err) return console.error(err)
	if(!message.content.startsWith(guild.prefix) || message.author.bot) return;
	const args = message.content.slice(guild.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.channel.send("Error logged to console.");
	}

})
})
client.on('guildMemberAdd', guildmember => {
	const logembed = new Discord.MessageEmbed()
	Config.findOne({
		guildID: guildmember.guild.id
	}, (err, daguild) => {
		if(err) return console.error(err)
		if(daguild.logs){ 
		logembed.setAuthor('Member Joined')
		logembed.setDescription(`${guildmember.user.tag} has joined the server`)
		logembed.setColor('RED')
		logembed.setFooter('Outlaw Logs', config.outlawurl)
		guildmember.guild.channels.cache.get(daguild.logs).send(logembed)
		}
		if(daguild.welcomechannel === null) return 
		if(daguild.welcomemsg === null) return
		guildmember.guild.channels.cache.get(daguild.welcomechannel).send(`${guildmember} ${daguild.welcomemsg}`)
		
	})
})
client.on('guildMemberRemove', guildmember => {
	const logembed = new Discord.MessageEmbed
	Config.findOne({
		guildID: guildmember.guild.id
	}, (err, daguild) => {
		if(err) return console.err(err)
		if(!daguild.logs || daguild.logs === null) return;
		logembed.setAuthor('Member Left')
		logembed.setDescription(`${guildmember.user.tag} has left the server`)
		logembed.setColor('RED')
		logembed.setFooter('Outlaw Logs', config.outlawurl)
		guildmember.guild.channels.cache.get(daguild.logs).send(logembed)
	})
})
client.on('messageDelete', deleted => {
	const logembed = new Discord.MessageEmbed
	if(deleted.guild === null) return;
	Config.findOne({
		guildID: deleted.guild.id
	}, (err, daguild) => {
		if(err) return console.err(err)
		if(!daguild.logs || daguild.logs === null) return;
		logembed.setAuthor('Deleted Message')
		logembed.setDescription(`${deleted.member.user.tag} deleted message : ${deleted.content}`)
		logembed.setColor('RED')
		logembed.setFooter('Outlaw Logs', config.outlawurl)
		deleted.guild.channels.cache.get(daguild.logs).send(logembed)
})
})
client.on('messageUpdate', (oldMessage, newMessage) => {
	if(newMessage.guild === null) return;
	const logembed = new Discord.MessageEmbed()
	Config.findOne({
		guildID: oldMessage.guild.id
	}, (err, daguild) => {
		if(err) return console.err(err)
		if(!daguild.logs) return;
		if(oldMessage.author.bot) return;
		logembed.setAuthor('Edited Message')
		logembed.setDescription(`${oldMessage.member.user.tag} edited a message:\nOld Message: ${oldMessage.content}\nNew Message: ${newMessage.content}`)
		logembed.setColor('RED')
		logembed.setFooter('Outlaw Logs', config.outlawurl)
		oldMessage.guild.channels.cache.get(daguild.logs).send(logembed)
	})
})


	client.login(config.token);


