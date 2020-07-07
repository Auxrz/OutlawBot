const Discord = require('discord.js')
const mongoose = require('mongoose')
const Config = require('../lib/mongodb.js')
const ytdl = require("ytdl-core")
const ffmpeg = require("ffmpeg")
var YouTube = require('youtube-node');
const config = require('../config.json')

var yt = new YouTube()
yt.setKey(config.ytpikey)

module.exports = {
    name: 'play',
    description: 'kick script',
    execute(message) { 
        const queue = []
        const songs = message.content.split(' ').slice(1)
		const mvoice = message.member.voice.channel
        yt.search(`${songs.join(' ')}`, 2, function(error, result) {
            if (error) {
              console.log(error);
			}
			console.log(result)
			const url = `https://www.youtube.com/watch?v=${result.items[0].id.videoId}`
                   // if(clientvoice){ 
				queue.push(url)
				const embed = new Discord.MessageEmbed()
				.setAuthor('Outlaw Music', config.outlawurl)
				.setDescription(`Now playing ${url}`)
				.setColor('RED')
				message.channel.send(embed)
                        /*const embed = new Discord.MessageEmbed()
                embed.setDescription('Added to the queue')
				message.channel.send(embed)
				*/
                    //else {
                        const voiceConnection = mvoice.join().then(connection => {
							
							/*(function playsong(connection){
            const stream = ytdl(queue[0], {filter: 'audioonly'})
			const dispatcher = connection.play(stream)
			*/
			//const stream = ytdl(queue[0], {filter: 'audioonly'})
			const dispatcher = connection.play(ytdl(queue[0], {filter: 'audioonly'}))
						dispatcher.on('finish', () => {
							queue.shift()
							connection.play(ytdl(queue[0], {filter: 'audioonly'}))
            ////console.log(result)
           // console.log(JSON.stringify((result.items[1].id)))
            //console.log(result.items[1].id.videoId)
            
			//console.log(result.id.videoId)
					})
		})
    })
}
}