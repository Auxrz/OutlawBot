const config = require('../config.json')
const Discord = require('discord.js')
const mongoose  = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'welcomemsg',
    description: 'kick script',
    execute(message) {
        const args = message.content.split(' ').slice(1)
        const newprefix = args.join(' ')
        let welcomechannel = message.channel.id
        if(message.member.hasPermission('ADMINISTRATOR')) {
            Config.findOne({
                guildID: message.guild.id
            }, (err, guild) => {
            if(!newprefix) return guild.update({$set: {welcomemsg: null}})
                guild.update({$set: {welcomemsg: `${newprefix}`}},
                function(err) {
                if(err)
                console.log(err) 
                guild.update({$set: {welcomechannel: `${welcomechannel}`}},
                function(err) {
                if(err)
                console.log(err) 
            })
            })
        })
            message.channel.send(`Configuration setting [WELCOMEMSG] updated.`)
        }
        else {
            message.channel.send('No permissions to change welcome message.')
        }
    }
    }