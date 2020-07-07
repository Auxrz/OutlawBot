const config = require('../config.json')
const Discord = require('discord.js')
const mongoose  = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'setlogs',
    description: 'kick script',
    execute(message) {
        const args = message.content.split(' ').slice(1)
        const logschannel = message.channel.id
        if(message.member.hasPermission('ADMINISTRATOR')) {
        Config.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            guild.update({$set: {logs: `${logschannel}`}},
            function(err) {
            if(err)
            console.log(err) 
        })
        })
        message.channel.send(`Log channel updated to ${logschannel}`)
    }
    else {
        message.channel.send('No permissions to change log channel.')
    }
}
}
            