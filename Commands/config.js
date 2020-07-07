const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'config',
    description: 'kick script',
    execute(message) { 
        Config.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) return console.log(err)
            const embed = new Discord.MessageEmbed()
            embed.setAuthor('Server Configuration', config.outlawurl)
            embed.setColor('RED')
            embed.addField('Config', `**Prefix** - ${guild.prefix}\n**Welcome Message** - ${guild.welcomemsg}\n**Logs Channel** - ${guild.logs}`)
            message.channel.send(embed)
        })
    }
}