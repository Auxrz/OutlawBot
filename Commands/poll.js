const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')
const {yes, no} = require('../bot.js')

module.exports = {
    name: 'poll',
    description: 'kick script',
    execute(message) { 
        const args = message.content.split(' ').slice(1)
        const question = args.join(' ')
        const pollembed = new Discord.MessageEmbed()
        //const yes = client.emojis.get('699211245202702336')
        //const no = client.emojis.get('699211435628167179')
        if(message.member.hasPermission('KICK_MEMBERS')) {
            message.delete()
            pollembed.setColor('RED')
            pollembed.setAuthor('Outlaw Poll', config.outlawurl)
            pollembed.addField('Poll Question', question)
            pollembed.setFooter(`${message.author.tag}`, `${config.outlawurl}`)
            message.channel.send(pollembed).then((poll) => { 
                poll.react('699211245202702336')
                poll.react('699211435628167179')
            })
        }
        else {
            message.channel.send('Only moderators can do polls!')
        }
    }
}