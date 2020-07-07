const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'purge',
    description: 'kick script',
    execute(message) { 
        const args = message.content.split(' ').slice(1)
        const embed  = new Discord.MessageEmbed()
        const logembed = new Discord.MessageEmbed()
        embed.setColor('RED')
        logembed.setColor('RED')

        const numberof = args[0]
        Config.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) return console.log(err)
            let logs = guild.logs
        if(!numberof) return message.channel.send('Please specify a number.')
        if(numberof > 100 ) return message.channel.send('Cannot delete more then 100 messages.')
        if(numberof < 1) return message.channel.send('You cannot delete 0 messages.')
        message.channel.messages.fetch({limit: numberof}).then( messages => {
            message.channel.bulkDelete(messages)
            embed.setDescription(`Successfully deleted ${numberof} messages`)
            message.channel.send(embed)
            if(logs === null || !logs) return
            logembed.setAuthor(message.author.tag, config.outlawurl)
            logembed.setDescription(`Purged Messages\n${message.author.tag} has deleted ${numberof} messages in ${message.channel.name}`)
            message.guild.channels.cache.get(logs).send(logembed)
        })

        
    })
}
}

        