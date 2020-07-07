const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')
const Logs = require('../lib/outlawlogs')

module.exports = {
    name: 'ban',
    description: 'kick script',
    execute(message) { 
        function ban() {
            Config.findOne({
                guildID: message.guild.id
            }, (err, daguild) => {
                if(err) return console.log(err)
                let logs = daguild.logs
            const args = message.content.split(' ').slice(1)
            const tagged = message.mentions.members.first()
            const embed = new Discord.MessageEmbed()
            const logembed = new Discord.MessageEmbed()
            const author = message.author
            let dat = args.slice(1)
            const reason = dat.join(' ')
            logembed.setFooter('Outlaw Logs')
            
            if(!tagged) {
                let userid = args[0]
                let dauser = message.guild.members.cache.get(userid)
                Logs.findOne({
                    guildID: message.guild.id,
                    userID: dauser.id
                    }, (err, user) =>{
                        if(err) return console.error(err)
                        if(!user) {
                            const newoutlawusers = new Logs({
                                guildID: message.guild.id,
                                userID: dauserid,
                                Strikes: null,
                                strikereasons: Array,
                                Kicks: null,
                                kickreasons: Array,
                                Bans: null,
                                banreasons: Array
                        })
                        return newoutlawusers.save()
                    }

                if(dauser.hasPermission('KICK_MEMBERS')) return message.channel.send('Cannot kick a mod.')
                logembed.addField('Actions', `${author.tag} has banned ${dauser.displayName}`)
                if(reason) {
                    logembed.addField('Reason', `${reason}`)
                    user.update({$push: {banreason: `${reason} | Banned by ${message.author.tag}`}},
                    function(err) {
                        if(err)
                        console.log(err) 
                    })
                }
                if(!reason) {
                    logembed.addField('Reason', 'Lack of Reasons')
                }
                if(!dauser.kickable) return message.channel.send('I cannot ban this user.')
                if(user.Bans === null) {
                    user.update({$set: {Bans: '1'}},
                        function(err) {
                        if(err)
                        console.log(err) 

                })
                userban()
            }
            else {
                user.update({$set: {Bans: `${user.Bans + 1}`}},
                function(err) {
                if(err)
                console.log(err) 
            })
    
                userban()
            }
            async function userban() {
                dauser.ban()
                dauser.send(`You have been banned for ${reason}`)
            embed.addField('Banned', `${dauser.displayName} has been vanquished.`)
            message.channel.send(embed)
            if(daguild.logs === null) return
            message.channels.cache.get(logs).send(logembed)
            }

                

            })
        }
            else if(tagged) {
                Logs.findOne({
                    guildID: message.guild.id,
                    userID: tagged.id
                    }, (err, user) =>{
                        if(err) return console.error(err)
                        if(!user) {
                            const newoutlawusers = new Logs({
                                guildID: message.guild.id,
                                userID: tagged.id,
                                Strikes: null,
                                strikereasons: Array,
                                Kicks: null,
                                kickreasons: Array,
                                Bans: null,
                                banreasons: Array
                        })
                        return newoutlawusers.save()
                    }

                if(tagged.hasPermission('KICK_MEMBERS')) return message.channel.send('Cannot kick a mod.')
                logembed.addField('Actions', `${author.tag} has banned ${tagged.displayName}`)
                if(reason) {
                    logembed.addField('Reason', `${reason}`)
                    user.update({$push: {banreasons: `${reason} | Banned by ${message.author.tag}`}},
                    function(err) {
                        if(err)
                        console.log(err) 
                    })
                }
                if(!reason) {
                    logembed.addField('Reason', 'Lack of Reasons')
                }
                if(!tagged.kickable) return message.channel.send('I cannot ban this user.')
                if(user.Bans === null) {
                    user.update({$set: {Bans: '1'}},
                        function(err) {
                        if(err)
                        console.log(err) 

                })
                actualban()
            }
            else {
                user.update({$set: {Bans: `${user.Bans + 1}`}},
                function(err) {
                if(err)
                console.log(err) 
            })
    
                actualban()
        }

                async function actualban() { 
                tagged.ban()
                tagged.send(`You have been banned for ${reason}`)
                embed.addField('Ban', `${tagged.displayName} has been vanquished.`)
                message.channel.send(embed)
                if(daguild.logs === null) return
                message.guild.channels.cache.get(logs).send(logembed)
                }
                //if(!guild.logs === null
                //if (daguild.logs === null) return
       /* })
    }


            })

        }*/
    })
}

        })

    }
        if(message.member.hasPermission('BAN_MEMBERS')) {
            ban()
        }
        else if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.channel.send('No permission to ban members.')
    }
}
