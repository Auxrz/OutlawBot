const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')
const ytdl = require("ytdl-core")
const ffmpeg = require("ffmpeg")
var YouTube = require('youtube-node');
const config = require('../config.json')

var yt = new YouTube()
yt.setKey(config.ytpikey)

module.exports = {
    name: 'stop',
    description: 'kick script',
    execute(message) { 


const mvoice = message.member.voice.channel
	mvoice.leave()
	const embed = new Discord.MessageEmbed()
	embed.setAuthor('Outlaw Music', config.outlawurl)
	embed.setDescription('I have left the voice channel.')
	embed.setColor('RED')
    message.channel.send(embed)
    }
}