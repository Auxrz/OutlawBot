const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'opt',
    description: 'kick script',
    execute(message) { 
        let args = message.content.split(" ").slice(1)
        const joined = args.join(' ')
        Config.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            guild.update({$addToSet: {opted: `${message.author.id}`}},
            function(err) {
            if(err)
            console.log(err) 
            message.author.send("You've been opted into receiving messages from this bot.")
            message.channel.send('Opted.')
        })
        })
    }
}