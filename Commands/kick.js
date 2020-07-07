
const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')
const Logs = require('../lib/outlawlogs')

module.exports = {
    name: 'kick',
    description: 'kick script',
    execute(message) {

        function softban() {
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
            const aguild = message.guild
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
                                userID: userid,
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
                logembed.addField('Actions', `${author.tag} has softbanned ${dauser.displayName}`)
                if(reason) {
                    logembed.addField('Reason', `${reason}`)
                    user.update({$push: {kickreasons: `${reason} | Kicked by ${message.author.tag}`}},
                    function(err) {
                        if(err)
                        console.log(err) 
                    })
                }
                if(!reason) {
                    logembed.addField('Reason', 'Lack of Reasons')
                }
                if(!dauser.kickable) return message.channel.send('I cannot kick this user.')
                if(user.Kicks === null) {
                    user.update({$set: {Kicks: '1'}},
                        function(err) {
                        if(err)
                        console.log(err) 

                })
                usersoftban()
            }
            else {
                user.update({$set: {Kicks: `${user.Kicks + 1}`}},
                function(err) {
                if(err)
                console.log(err) 
            })
    
                usersoftban()
            }
            async function usersoftban() {
                dauser.ban()
                aguild.unban(user)
                dauser.send(`You have been kicked for ${reason}`)
            embed.addField('Kick', `${dauser.displayName} has been vanquished.`)
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
                logembed.addField('Actions', `${author.tag} has kicked ${tagged.displayName}`)
                if(reason) {
                    logembed.addField('Reason', `${reason}`)
                    user.update({$push: {kickreasons: `${reason} | Kicked by ${message.author.tag}`}},
                    function(err) {
                        if(err)
                        console.log(err) 
                    })
                }
                if(!reason) {
                    logembed.addField('Reason', 'Lack of Reasons')
                }
                if(!tagged.kickable) return message.channel.send('I cannot kick this user.')
                if(user.Kicks === null) {
                    user.update({$set: {Kicks: '1'}},
                        function(err) {
                        if(err)
                        console.log(err) 

                })
                actualsoftban()
            }
            else {
                user.update({$set: {Kicks: `${user.Kicks + 1}`}},
                function(err) {
                if(err)
                console.log(err) 
            })
    
                actualsoftban()
        }

                async function actualsoftban() { 
                tagged.ban()
                message.guild.members.unban(tagged)
                tagged.send(`You have kicked for ${reason}`)
                embed.addField('Kick', `${tagged.displayName} has been vanquished.`)
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
        if(message.member.hasPermission('KICK_MEMBERS')) {
            softban()
        }
        else if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.channel.send('No permission to kick members.')
    }
}