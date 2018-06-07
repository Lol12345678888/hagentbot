const Discord = require('discord.js')
const fs      = require('fs')
const Embeds  = require('./embed')


const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

var client = new Discord.Client()


// client.on('ready', () => {
//     console.log(`Logging in.`)
//     console.log(`Logging in..`)
//     console.log(`Logging in...`)
//     console.log(`Erfolgreich eingeloggt in ${client.user.username}`)
//     client.user.setActivity('#help | Beta 2.2.0')
    
// })
client.on('warn', console.warn);
client.on('error', console.error);
client.on('ready', () => console.log(`${client.user.username} is ready!`));
client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));
client.on('reconnecting', () => console.log('I am reconnecting now!'));
client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`Backfisch`);
  });

var cmdmap = {

    say:        cmd_say,
    emotes:     cmd_emotes,
    help:       cmd_help,
    status:     cmd_status
    

}


function cmd_say(msg, args) {
    if(msg.member.hasPermission('KICK_MEMBERS')){
    Embeds.grün(msg.channel, (args.join(' ')))
    msg.delete()
    }
    else if(msg.author.id === config.hagent){
        
            Embeds.grün(msg.channel, (args.join(' ')))
            msg.delete()
    }
    else if(msg.author.id === config.owner){
        Embeds.grün(msg.channel, (args.join(' ')))
            msg.delete()
    }
    if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.reply(`HA haste keine rechte für ne? NOOB!`);
}
function cmd_status(msg, args){
    let permAdmin = msg.member.hasPermission("ADMINISTRATOR") 
    let lulu = msg.author.id == "373857433380061184"
    if(!lulu){
    if(!permAdmin) return msg.channel.send("HA hast nämlich keine rechte du lappen!")
    }
    let game = args.join(' ')
    client.user.setActivity(game)
    let statusembed = new Discord.RichEmbed()
    .setColor("#3ee8e5")
    .setDescription("Der Botstatus wurde erfolgreich zu" + " " + "**" + game + "**" + " " + "geändert")
    msg.channel.send(statusembed)
    
}
function cmd_help(msg, args){
    Embeds.grün(msg.channel, `Bot von Lulu0508 Programmiert
_help
_say[Können nur admins, Hagent oder Lulu nutzen]`, "HELP")
}
function cmd_emotes(msg, args) {
    
    const emojiList = msg.guild.emojis.map(e=>e.toString()).join(" ");
    msg.channel.send(emojiList);
}

client.on('message', (msg) =>{

    var cont   = msg.content,
        author = msg.member,
        chan   = msg.channel,
        guild  = msg.guild

        if(author.id != client.user.id && cont.startsWith(config.prefix)) {

        var invoke = cont.split(' ')[0].substr(config.prefix.length)
            args   = cont.split(' ').slice(1)

            if(invoke in cmdmap){
                cmdmap[invoke](msg, args)
            }
        }
})
client.on("message", (message) => {
    if (message.content.startsWith("ping")) {
      message.channel.send("pong!");
    }
  });
  client.on('voiceStateUpdate', (mold, mnew) => {
    let guild = mnew.guild
          
      let vold = mold.voiceChannel
      let vnew = mnew.voiceChannel
      let logchan = guild.channels.get("451087272293433344")
      if(!logchan) return
      if (!vold && vnew) {
          let joinEmbed = new Discord.RichEmbed()
              .setDescription(`:white_check_mark: **${mnew.displayName}** ist **\`${vnew.name}\`** Beigetreten`)
              .setTimestamp()
              .setColor('#5aed21')
              .setThumbnail(mnew.user.avatarURL)
              .setFooter(`Beauftragt von ${client.users.get("410786268616720395").username}`, client.users.get('410786268616720395').avatarURL)
          logchan.send(joinEmbed)
      }
      else if (vold && !vnew) {
          let leftEmbed = new Discord.RichEmbed()
              .setTitle('')                  
              .setDescription(`:small_red_triangle_down: **${mnew.displayName}** Hat **\`${vold.name}\`** verlassen`)
              .setTimestamp()
              .setThumbnail(mnew.user.avatarURL)
              .setColor("#e50b16")
              .setFooter(`Beauftragt von ${client.users.get("410786268616720395").username}`, client.users.get('410786268616720395').avatarURL)
              logchan.send(leftEmbed)      
      }
      else if (vold && vnew && vold.id != vnew.id) {
          let wentEmbed = new Discord.RichEmbed()
              .setTitle('')
              .setDescription(`:arrow_right: **${mnew.displayName}** ist von **\`${vold.name}\`** zu **\`${vnew.name}\`** gesprungen`)
              .setTimestamp()
              .setThumbnail(mnew.user.avatarURL)
              .setColor("#0be5d2")
              .setFooter(`Beauftragt von ${client.users.get("410786268616720395").username}`, client.users.get('410786268616720395').avatarURL)
          logchan.send(wentEmbed)        
      }
    }) 
  
 

client.login(process.env.token)
