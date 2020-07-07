const config = require('../config.json')
const Discord = require('discord.js')
const mongoose  = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'setprefix',
    description: 'kick script',
    execute(message) {
        const args = message.content.split(' ').slice(1)
        const newprefix = args[0]
        if(message.member.hasPermission('ADMINISTRATOR')) {
        Config.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            guild.update({$set: {prefix: `${newprefix}`}},
            function(err) {
            if(err)
            console.log(err) 
        })
        })
        message.channel.send(`Configuration setting [PREFIX] updated to ${newprefix}`)
    }
    else {
        message.channel.send('No permissions to change prefix')
    }
}
}