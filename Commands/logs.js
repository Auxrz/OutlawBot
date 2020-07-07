const mongoose = require('mongoose')
const Logs = require('../lib/outlawlogs')
const Discord = require('discord.js')
const config = require('../config.json')
mongoose.connect('mongodb://127.0.0.1:27017',
{useNewUrlParser: true}), (err) => {
	if(err) return console.err(err);
	console.log('Connected to mongodb')
}
module.exports = {
    name: 'modlogs',
    description: 'kick script',
    execute(message) { 
        const args = message.content.split(' ').slice(1)
        const dauser = message.mentions.members.first()
        if(dauser) { 
            const useriden = dauser.id
        Logs.findOne({
            guildID: message.guild.id,
            userID: useriden
            }, (err, user) =>{
                if(err) return console.error(err)
                if(!user) {
                     /* const newoutlawusers = new Logs({
                        guildID: message.guild.id,
                        userID: useriden,
                        Strikes: null,
                        strikereasons: null,
                        Kicks: null,
                        kickreasons: null,
                        Bans: null,
                        banreasons: null
                })
                */
                message.channel.send('User does not have any modlogs.')
                //return newoutlawusers.save()
            }
            if(user) {
                const embed = new Discord.MessageEmbed()
                embed.setAuthor('Outlaw Modlogs', config.outlawurl )
                embed.setDescription(`Moderation logs for ${dauser.user.tag}`)
                embed.setColor('RED')
                if(user.Kicks != null) {
                    embed.addField('Kicks', `${user.Kicks}`)
                    }
                    if(user.kickreasons.length != 0){ 
                    embed.addField('Kick-reasons', user.kickreasons)
                    }
                    if(user.Bans != null){ 
                    embed.addField('Bans', user.Bans)
                    }
                    if(user.banreasons.length != 0) {
                    embed.addField('Ban-reasons', user.banreasons)
                    }
                    message.channel.send(embed)
          
                
            }
        })
    }
    else if(!dauser) {
        let userarg = args[0]
        let foruser = message.guild.members.cache.get(userarg)
        Logs.findOne({
            guildID: message.guild.id,
            userID: foruser.id
            }, (err, auser) =>{
                if(err) return console.error(err)
                if(!auser) {
                    const newoutlawusers = new Logs({
                        guildID: message.guild.id,
                        userID: foruser.id,
                        Strikes: null,
                        strikereasons: Array,
                        Kicks: null,
                        kickreasons: Array,
                        Bans: null,
                        banreasons: Array
                })
                message.channel.send('User does not have any modlogs.')
                return newoutlawusers.save()
            }
            if(auser) {
                const embed = new Discord.MessageEmbed()
                embed.setAuthor('Outlaw Modlogs', config.outlawurl )
                embed.setDescription(`Moderation logs for ${foruser.user.tag}`)
                embed.setColor('RED')
                if(auser.Kicks != null) {
                embed.addField('Kicks', `${auser.Kicks}`)
                }
                if(auser.kickreasons.length != 0){ 
                embed.addField('Kick-reasons', auser.kickreasons)
                }
                if(auser.Bans != null){ 
                embed.addField('Bans', auser.Bans)
                }
                if(auser.banreasons.length != 0) {
                embed.addField('Ban-reasons', auser.banreasons)
                }
                message.channel.send(embed)
                
            }
        })
    }

    }
}
