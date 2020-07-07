const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'removerole',
    description: 'kick script',
    execute(message) { 
        Config.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) return console.log(err)
            let logs = guild.logs
        const author = message.author
        let embed = new Discord.MessageEmbed
        const logembed = new Discord.MessageEmbed
        logembed.setAuthor('Outlaw', config.outlawurl)
        logembed.setColor('RED')
                if(message.member.hasPermission('MANAGE_ROLES')) {
                let args = message.content.split(' ').slice(1)
                let role = message.mentions.roles.first()
                if(!role) { 
                    let arole = args.slice(1)
                const darole = message.guild.roles.cache.find(r => r.name == arole)
                const user = message.mentions.members.first()

                if(!user) {
                    const id = message.guild.members.get(args[0])
                    if(darole.permissions.has('KICK_MEMBERS')) return message.channel.send('Cannot remove moderator roles.')
                    id.roles.add(darole)
                    embed.setTitle(`Removed role ${arole} from ${id.displayName}`)
                    messae.channel.send(embed)
                    if(!logs) return
            logembed.addField('Removerole', `${author.tag} removed ${arole} from ${id.displayName} `)
            message.guild.channels.cache.get(logs).send(logembed)
            
                    
                }
                if(user){ 
                    if(darole.permissions.has('KICK_MEMBERS')) return message.channel.send('Cannot remove moderator roles.')
                    user.roles.remove(darole)
                    embed.setTitle(`Removed role ${arole} from ${user.displayName}`)
                    message.channel.send(embed)
                    if(!logs) return
                    logembed.addField('Removerole', `${author.tag} removed ${arole} from ${user.displayName} `)
                    message.guild.channels.cache.get(logs).send(logembed)
                    }
            }
            if(role) {
                const user = message.mentions.members.first()
                if(!user) {
                    const id = message.guild.members.cache.get(args[0])
                    if(role.permissions.has('KICK_MEMBERS')) return message.channel.send('Cannot remove moderator roles.')
                    id.roles.remove(role)
                    embed.setTitle(`Removed role ${role.name} from ${id.displayName}`)
                    message.channel.send(embed)
                    if(!logs) return
                    logembed.addField('Removerole', `${author.tag} removed ${role.name} from ${id.displayName} `)
                    message.guild.channels.cache.get(logs).send(logembed)
                }
                if(user){
            if(role.permissions.has('KICK_MEMBERS')) return message.channel.send('Cannot remove moderator roles.')
                user.roles.remove(role)
                embed.setTitle(`Removed role ${role.name} from ${user.displayName}`)
                    message.channel.send(embed)
                    if(!logs) return
                    logembed.addField('Removerole', `${author.tag} removed ${role.name} from ${user.displayName} `)
                    message.guild.channels.cache.get(logs).send(logembed)
                }
            }
        }
            })
        }
    }