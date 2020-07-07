const config = require('../config.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')
const axios = require('axios')

module.exports = {
    name: 'covid19',
    description: 'kick script',
    execute(message) { 
        const args = message.content.split(' ').slice(1)
        const country = args[0]
        const embed = new Discord.MessageEmbed()
        if(!country) {
        axios.get('https://api.covid19api.com/world/total').then((response) => {
            embed.setTitle('COVID-19 Global Stats')
            embed.setColor('RED')
            embed.addField('Total Confirmed Cases', response.data.TotalConfirmed)
            embed.addField('Total Deaths', response.data.TotalDeaths)
            embed.addField('Total Recovered', response.data.TotalRecovered)
            message.channel.send(embed)
        })
    }
    }
}