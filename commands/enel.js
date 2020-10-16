const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(` Bu komudu kullanabilmek için "Sunucuyu Yönet" yetkisine sahip olman gerek.`)
  if (!args[0]) return message.channel.send(`:no_entry: ****** Filtresini Ayarlamak İçin \`s$$****** aç\` | Kapatmak İstiyorsanız \`s$$****** kapat\` Yazabilirsiniz`)
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(`:no_entry: ****** Filtresini Ayarlamak İçin \`s$$****** aç\` | Kapatmak İstiyorsanız \`s$$****** kapat\` Yazabilirsiniz`)

    if (args[0] == 'aç') {
    db.set(`reklamFiltre_${message.guild.id}`, 'acik')
    let i = await db.fetch(`reklamFiltre_${message.guild.id}`)
  message.channel.send(`****** Filtresi başarıyla ayarlandı.`)   
    
  }

  if (args[0] == 'kapat') {
      
    db.delete(`reklamFiltre_${message.guild.id}`)
    
    message.channel.send(`****** Filtresini Kapattım.`)
  }
 
};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['******', '******-filtresi', 'reklamfiltresi', '******-filtre', 'reklamfiltre'],
 permLevel: 0
};

exports.help = {
 name: 'linkengel',
 description: 'reklamm',
 usage: 's$$kanal'
};