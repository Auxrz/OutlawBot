const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'announce',
    description: 'kick script',
    execute(message) { 
       
        let args = message.content.split(" ").slice(1)
        const joined = args.join(' ')
        const embed = new Discord.MessageEmbed()
            embed.setColor('RED')
            embed.setTitle(message.author.tag)
            embed.addField('Announcement', joined)
            embed.setFooter(message.guild.name, config.outlawurl)
        Config.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(message.member.roles.cache.has(guild.announcerole)) {
                const optdoe = guild.opted
                console.log(optdoe)
                 var i;
                for(i = 0; i < optdoe.length; i++){ 
                message.guild.members.fetch(optdoe[i]).then(res => {
                    let id = res.user
                    id.send(embed)
                })
            }
        }
        else {
            message.channel.send('No permission to announce.')
        }
    })
}
}