const config = require('../config.json')
const Discord = require('discord.js')
const mongoose  = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'setannouncerole',
    description: 'kick script',
    execute(message) {
        const args = message.content.split(' ').slice(1)
        const role = message.mentions.roles.first()
        let owner = message.guild.owner
        let author = message.author
        if(author.id === owner.id || config.devids.includes(author.id)) {
        Config.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(!role) {
                let darole = args[0]
            guild.update({$set: {announcerole: `${darole}`}},
            function(err) {
            if(err)
            console.log(err) 

            })
            message.channel.send('Configuration setting [ANNOUNCE ROLE] has been updated.')
            }
        else if(role) {
            guild.update({$set: {announcerole: `${role.id}`}},
            function(err) {
            if(err)
            console.log(err) 
            })
            message.channel.send('Configuration setting [ANNOUNCE ROLE] has been updated.')
        }
    })
}
else {
    message.channel.send('You must be the owner to configure this setting.')
}
}
}
