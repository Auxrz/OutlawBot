const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'commands',
    description: 'kick script',
    execute(message) { 
        const commands = new Discord.MessageEmbed()
        commands.setAuthor('Outlaw Commands', config.outlawurl)
        commands.setDescription('View specific usage for a command via :help [commandname]')
        commands.setThumbnail(config.outlawurl)
        commands.addField('***Moderation***', '`softban`, `kick`, `ban`, `setlogs`, `addrole`, `removerole`, `purge`, `modlogs`')
        commands.addField('***Information***', '`help`, `commands`')
        commands.addField('***Community***', '`announce`, `opt`, `unopt`, `poll`')
        commands.addField('***Music***', '`play`, `stop`')
        commands.addField('***Config***', '`setannouncerole`, `setprefix`, `welcomemsg`, `setlogs`, `config`')

        commands.setColor('RED')
        commands.setFooter('Any questions? DM Aux#1393')
        message.channel.send(commands)
    }
}