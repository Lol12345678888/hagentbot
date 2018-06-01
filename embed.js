const { RichEmbed } = require('discord.js')


const COLORS = {
    green:  0x2ecc71,
    red:    0xe74c3c,
    türkis: 0x1abc9c,
    purple: 0x8e44ad
}



module.exports = {

   rot(chan, cont, title) {
       var message 
       var emb = new RichEmbed()
       .setColor(COLORS.red)
       .setDescription(cont)

       if(title) {
           emb.setTitle(title)
         }
        chan.send(' ', emb).then((m) =>{
            message = m
        })
        return message
        },
   info(){

   },
   grün(chan, cont, title) {
    var message 
    var emb = new RichEmbed()
    .setColor(COLORS.green)
    .setDescription(cont)

    if(title) {
        emb.setTitle(title)
      }
     chan.send(' ', emb).then((m) =>{
         message = m
     })
     return message
   },
   lila(chan, cont, title) {
    var message 
    var emb = new RichEmbed()
    .setColor(COLORS.purple)
    .setDescription(cont)

    if(title) {
        emb.setTitle(title)
      }
     chan.send(' ', emb).then((m) =>{
         message = m
     })
     return message
   }

}