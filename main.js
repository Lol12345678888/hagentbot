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
    status:     cmd_status,
    psay:       cmd_psay,
    say2:       cmd_say2,
    serversay:  cmd_serversay
}

function cmd_serversay(msg, args){
    let args0 = args[0]
    if(args0){
        if(msg.member.roles.has('528355485833756683')){
        let serversayEmbed = new Discord.RichEmbed()
        .setTitle("Nachricht vom Hagentserver")
        .setDescription(args.join(' '))
        .setFooter(`Nachricht von ${msg.author.tag}`, msg.author.avatarURL)
        .setTimestamp(new Date)
        client.channels.get("415113700740169728").send(serversayEmbed)
        client.channels.get("510807769964740609").send(serversayEmbed)
        msg.delete();
        }
        else if(!msg.member.roles.has('528355485833756683')){
        msg.channel.send(`${msg.member} Du hast keine Rechte dafür!`)
        }}
    else if(args0 == undefined){
     msg.channel.send("Was soll ich für eine Nachricht senden?")
    }
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
function cmd_say2(msg, args) {
    if(!args) return msg.channel.send("WAS SOLL ICH SAGEN MHHH???!")
    msg.channel.send(args)
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
function cmd_psay(msg, args){
    let = psayMEMBER = msg.mentions.members.first()

   
    psayMEMBER.send(args.join(" "))
    msg.delete()
    let _Embed = new Discord.RichEmbed()
    .setTitle(`Nachricht gesendet`)
    .setColor("#56f442")
    .addField("Gesendet an", psayMEMBER.user.username)
    .addField("Mit der Nachricht", args.join(" "))
    msg.channel.send(_Embed)
   
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

        if(cont.startsWith(config.prefix)) {

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
      let hagentlogchan = guild.channels.get("530479689601646613")
      let pigsellogchan = guild.channels.get("459385383495663626")
      
      if (!vold && vnew) {
          let joinEmbed = new Discord.RichEmbed()
              .setDescription(`:white_check_mark: **${mnew.displayName}** ist **\`${vnew.name}\`** Beigetreten`)
              .setTimestamp()
              .setColor('#5aed21')
              .setThumbnail(mnew.user.avatarURL)
              .setFooter(`Beauftragt von ${client.users.get("410786268616720395").username}`, client.users.get('410786268616720395').avatarURL)
          if(guild.id == "410787388290498561"){
              hagentlogchan.send(joinEmbed)}else
            if(guild.id == "364334738418434049"){
            pigsellogchan.send(joinEmbed)
            }

      }
      else if (vold && !vnew) {
          let leftEmbed = new Discord.RichEmbed()
              .setTitle('')                  
              .setDescription(`:small_red_triangle_down: **${mnew.displayName}** Hat **\`${vold.name}\`** verlassen`)
              .setTimestamp()
              .setThumbnail(mnew.user.avatarURL)
              .setColor("#e50b16")
              .setFooter(`Beauftragt von ${client.users.get("410786268616720395").username}`, client.users.get('410786268616720395').avatarURL)
              if(guild.id == "410787388290498561"){
                hagentlogchan.send(leftEmbed)}else
              if(guild.id == "364334738418434049"){
              pigsellogchan.send(leftEmbed)
              }   
      }
      else if (vold && vnew && vold.id != vnew.id) {
          let wentEmbed = new Discord.RichEmbed()
              .setTitle('')
              .setDescription(`:arrow_right: **${mnew.displayName}** ist von **\`${vold.name}\`** zu **\`${vnew.name}\`** gesprungen`)
              .setTimestamp()
              .setThumbnail(mnew.user.avatarURL)
              .setColor("#0be5d2")
              .setFooter(`Beauftragt von ${client.users.get("410786268616720395").username}`, client.users.get('410786268616720395').avatarURL)
              if(guild.id == "410787388290498561"){
                hagentlogchan.send(wentEmbed)}else
              if(guild.id == "364334738418434049"){
              pigsellogchan.send(wentEmbed)
              }      
      }
    }) 
 

client.login(process.env.token)
