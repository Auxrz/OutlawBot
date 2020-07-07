const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'unopt',
    description: 'kick script',
    execute(message) { 
        let args = message.content.split(" ").slice(1)
        const joined = args.join(' ')
        Config.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            guild.update({$pull: {opted: `${message.author.id}`}},
            function(err) {
            if(err)
            console.log(err)
            message.channel.send("You've been unopted.")
        })
        })
    }
}
        