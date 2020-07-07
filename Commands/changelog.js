const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'changelog',
    description: 'kick script',
    execute(message) {
        const embed = new Discord.MessageEmbed()
        embed.setAuthor('Outlaw Changelog', config.outlawurl)
        embed.setDescription('Recent changes that have occured.')
        embed.addField('Major Changes', '- Updated to DiscordV12\n- Modlogs added! Use :modlog [@User or UserID]')
        embed.addField('Minor Changes', '- N/A')
        embed.setFooter('Changelog')
        embed.setColor('RED')
        message.channel.send(embed)
    }
}