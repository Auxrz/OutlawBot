const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'addrole',
    description: 'kick script',
    execute(message) { 
            Config.findOne({
                guildID: message.guild.id
            }, (err, guild) => {
                if(err) return console.log(err)
                    let logs = guild.logs
            const embed = new Discord.MessageEmbed()
            const logembed = new Discord.MessageEmbed()
            logembed.setAuthor('Outlaw', config.outlawurl)
            logembed.setColor('RED')
            const author = message.author
            if(message.member.hasPermission('MANAGE_ROLES')) {
            let args = message.content.split(' ').slice(1)
            let role = message.mentions.roles.first()
            if(!role) { 
            let arole = args.slice(1)
        const darole = message.guild.roles.cache.find(r => r.name == arole)
        const user = message.mentions.members.first()
        if(!user) {
            const id = message.guild.members.cache.get(args[0])
            if(id.id === author.id) return message.channel.send('You cannot add roles to yourself.')
            if(darole.permissions.has('KICK_MEMBERS')) return message.channel.send('Cannot add moderator roles.')
            id.roles.add(darole)
            embed.setTitle(`Added role ${arole} to ${id.displayName}`)
            message.channel.send(embed)
            if(!logs) return
            logembed.addField('Addrole', `${author.tag} added ${arole} to ${id.displayName} `)
            message.guild.channels.cache.get(logs).send(logembed)

        }
        if(user){ 
            if (user.id === author.id) return message.channel.send('You cannot add roles to yourself.')
            if(darole.permissions.has('KICK_MEMBERS')) return message.channel.send('Cannot add moderator roles.')
            user.roles.add(darole)
            embed.setTitle(`Added role ${arole} to ${user.displayName}`, true)
            message.channel.send(embed)
            if(!logs) return
            logembed.addField('Addrole', `${author.tag} added ${arole} to ${user.displayName} `)
            message.guild.channels.cache.get(logs).send(logembed)
            }
    }
    if(role) {
        const user = message.mentions.members.first()
        if(!user) {
            const id = message.guild.members.get(args[0])
            if(id.id === author.id) return message.channel.send('You cannot add roles to yourself')
            if(role.permissions.has('KICK_MEMBERS')) return message.channel.send('Cannot add moderator roles.')
            id.roles.add(role)
            embed.setTitle(`Added role ${role.name} to ${id.displayName}`)
            message.channel.send(embed)
            if(!logs) return
            logembed.addField('Addrole', `${author.tag} added ${role.name} to ${id.displayName} `)
            message.guild.channels.cache.get(logs).send(logembed)

        }
        if(user){ 
            if(user.id === author.id) return message.channel.send('You cannot add roles to yourself')
            if(role.permissions.has('KICK_MEMBERS')) return message.channel.send('Cannot add moderator roles.')
        user.roles.add(role)
        embed.setTitle(`Added role ${role.name} to ${user.displayName}`)
        message.channel.send(embed)
        if(!logs) return
        logembed.addField('Addrole', `${author.tag} added ${role.name} to ${user.displayName} `)
        message.guild.channels.cache.get(logs).send(logembed)
        }
    }
}
    })
}
}