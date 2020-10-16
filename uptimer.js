const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const kontrol = require("node-fetch");
const data = require('quick.db');
require("./util/eventLoader")(client);

const express = require('express');
const app = express();
const http = require('http');
app.get("/", (request, response) => {
console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
client.ayarlar = { "token": "NzYxMzU2MDUxNzM1MjQ4OTA3.X3ZaFA.pVty1AGH970_SkoqyUEz0P4_hkg", "prefix": "!", "sahip": "722367617557331970" };

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`Yüklenen komut: ${client.ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "!yardım") {
const embed = new Discord.MessageEmbed();

embed.addField(`GIFARM UPTIME Yardım`, `Bu bot glitch'e gelen 1000 saat sınırı yüzünden yapılmıştır, herkes dilediği gibi kullanabilir.`)
embed.addField(`Genel Komutlar`,`
\`!link ekle\` - Sisteme bot eklersiniz.
\`!link sil\` - Sistemden Bot Silersiniz.
\`!link liste\` - Sistemde Kaç Bot Olduğunu Listeler.
\`!link hepsinisil\` - Sistemdedeki tüm botları siler.
`)
.setFooter(`2020 © Uptime | Kodlayan cerberus#0404`, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 2;
  if (message.author.id === message.guild.owner.id) permlvl = 3;
  if (message.author.id === client.ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g

client.login(client.ayarlar.token);

client.on('ready', async () => {
client.user.setStatus('dnd');
});

setInterval(() => {
const linkler = data.fetch('chimped');
if(linkler) {
if(linkler.length > 0) {
linkler.forEach(s => {
kontrol(s.site).catch(err => {
console.log('');
client.user.setActivity(`${s.site} hata verdi. Sahibi: ${s.sahipTag}`);
console.log(`${s.site} hata verdi. Sahibi: ${s.sahipTag}`);
})
client.user.setActivity(`${s.site} uptime edildi. ~ Ekleyen: ${s.sahipTag} ~ Eklenme tarihi: ${s.eklenmeTarihi}`);

})
}
}
}, 280000)

