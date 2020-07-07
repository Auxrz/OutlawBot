const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')

module.exports = {
    name: 'help',
    description: 'kick script',
    execute(message) { 
        const args = message.content.split(' ').slice(1)
        const embed = new Discord.MessageEmbed()
        embed.setColor('RED')
        embed.setAuthor('Outlaw Help', config.outlawurl)


        if(!args[0]) {
            //embed.addField('Usage', ':help [commandname], see :commands for the list of commands.')
            embed.setAuthor('Outlaw Commands', config.outlawurl)
        embed.setDescription('View specific usage for a command via :help [commandname]')
        embed.setThumbnail(config.outlawurl)
        embed.addField('***Moderation***', '`softban`, `kick`, `ban`, `setlogs`, `addrole`, `removerole`, `purge`, `modlogs`')
        embed.addField('***Information***', '`help`')
        embed.addField('***Community***', '`announce`, `opt`, `unopt`, `poll`')
        embed.addField('***Music***', '`play`, `stop`')
        embed.addField('***Config***', '`setannouncerole`, `setprefix`, `welcomemsg`, `setlogs`, `config`')

            message.channel.send(embed)
            return;
        }
        const command = args[0].toLowerCase()
        if(command === 'setdmrole') {
            embed.addField('`Setdmrole`', 'Set the role to be DMd, supports tags and IDs.[ONLY USABLE BY OWNER OR DEVELOPERS]')
            message.channel.send(embed)
        }
        if(command === 'setannouncerole') {
            embed.addField('`Setannouncerole`', 'Sets the role that allows for access to announcements, supports tags and IDs. [ONLY USABLE BY OWNER OR DEVELOPERS]')
            message.channel.send(embed)
        }
        if(command === 'setprefix') {
            embed.addField('`Setprefix`', 'Sets the prefix for the bot.')
            message.channel.send(embed)
        }
        if(command === 'opt') {
            embed.addField('`Opt`', 'Grants the DM role to the user using the command.')
            message.channel.send(embed)
        }
        if(command === 'unopt') {
            embed.addField('`Unopt`', 'Removes the DM role from the user using the command.')
            message.channel.send(embed)
        }
        if(command === 'poll') {
            embed.addField('`Poll`', 'Creates an embedded message with a yes and no reaction.')
            message.channel.send(embed)
        }
        if(command === 'addrole') {
            embed.addField('`Addrole`', 'Adds a role to a specific user, cannot add moderators roles.')
            message.channel.send(embed)
        }
        if(command === 'removerole') {
            embed.addField('`Removerole`', 'Removes a role from a specific user, cannot remove moderator roles.')
            message.channel.send(embed)
        }
        if(command === 'welcomemsg') {
            embed.addField('`Welcomemsg`', 'Send a message everytime a user joins the server, sends the message in the channel that the command is used in. If you wish to remove the message, simply leave it blank.')
            message.channel.send(embed)
        }
        if(command === 'setlogs') {
            embed.addField('`Setlogs`', 'Sets the current channel to log all moderation and guild events.')
            message.channel.send(embed)
        }
        if(command === 'kick') {
            embed.addField('`Kick`', 'Removes a user from the server, cannot remove moderators. Supports IDs and mentions')
            message.channel.send(embed)
        }
        if(command === 'softban') {
            embed.addField('`Softban`', 'Removes a user from the server while removing their messages. Supports IDs and mentions.')
            message.channel.send(embed)
        }
        if(command === 'ban') {
            embed.addField('`Ban`', 'Bans a user from the server and removes their messages. Supports IDs and mentions.')
            message.channel.send(embed)
        }
        if(command === 'announce') {
            embed.addField('`Announce`', 'DMs all users that currently opted in.')
            message.channel.send(embed)
        }
        if(command === 'config') {
            embed.addField('`Config`', 'Shows server configuration')
            message.channel.send(embed)
        }
        if(command === 'purge') {
            embed.addField('`Purge`', 'Deletes a specificed amount of messages (below 101) in the channel.')
            message.channel.send(embed)
        }
        if(command === 'play') {
            embed.addField('`Play`', 'Plays a certain song, does not support URLs, only searches')
            message.channel.send(embed)
        }
        if(command === 'stop') {
            embed.addField('`Stop`', 'Causes outlaw to leave the voice channel')
            message.channel.send(embed)
        }
        if(command === 'modlogs') {
            embed.addField('`Modlogs`', "Searchs a user's past moderation history in the server.")
            message.channel.send(embed)
        }

    }
}