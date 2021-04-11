const fs = require('fs');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
} 

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
});

//Despondency
const despondent = ['sad', 'depressed', 'dejected', 'desolate']

/*client.on('message', message => {
  if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if(command === 'ping') {
    message.channel.send('**Pinging...**')
    .then((msg) => {
      setTimeout(function() {
        msg.edit(`**Pong! Latency is \`${msg.createdTimestamp - message.createdTimestamp}\`ms. API Latency is \`${Math.round(client.ws.ping)}\`ms.**`)
      }, 1000)
    })
  }
});*/

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  if(command === 'ping') {
    message.channel.send('**Pinging...**')
        .then((msg) => {
        setTimeout(function() {
        msg.edit(`**Pong! Latency is \`${msg.createdTimestamp - message.createdTimestamp}\`ms. API Latency is \`${Math.round(client.ws.ping)}\`ms.**`)
  }, 1000)
})
  }
});

const loyalty = new Discord.MessageEmbed()
.setTitle('Loyalty')
.setDescription('**I am loyal to \`Synoi#1111; 718896385159725115\`**')
.setFooter('Created by Synoi#1111')
.setColor('BLUE')

client.on('message', message => {
  if(message.content.toLowerCase().startsWith(`${prefix}loyalty`)) {
    message.channel.send(loyalty)
  }
});


client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
    if(command === 'aecho') {
    const aecho = args.join(' ');
    message.delete();
    const aembed = new Discord.MessageEmbed()
    .setTitle('Anonymous user')
    .setDescription(`${aecho}`)
    .setColor('RANDOM')
    message.channel.send(aembed).catch(err => console.log(err));
    }
    if(command === 'echo') {
      const echo = args.join(' ');
      message.delete();
      const eembed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
      .setDescription(`${echo}`)
      .setColor('RANDOM')
      message.channel.send(eembed);
      message.channel.send(`**Tip: use \`?aecho\` for anonymous echo-embeds.**`)
      .then(msg => {
        msg.delete({ timeout: 3000});
      })
    }
    //
    });

 let blacklistedWords = ['Test', 'Testing', 'Blacklist'];  
 
 client.on('message', message => {
   if(blacklistedWords.some(w => message.content.includes(w))) {
     message.delete()
     .then(messages => {
       message.author.send(`Blacklisted word found in the message, \`${message.content}\`.`)
     })
   }
 })


//Kick command with confirmation 

client.login(token); 
