//const { Client } = require("discord.js");
//const client = new Client({ intents: ["MessageContent"] });

//client
    //.login("OTg1MzE1NDIzODAzMzAxOTQ4.GuOPcr.wbSpr1WOw7xdlpMBKu-mXVT1JFeSuHly1sM1Tg")
    //.then(() => console.log("Bot iniciado com sucesso."))
    //.catch((err) => console.log("Erro ao iniciar o Bot: ${err.message}"));

//client.on("ready", () => {
    //client.user.setStatus("dnd")
    //client.user.setActivity("Vegas RP MTA");
    //client.user.setPresence("Vivendo")
//});
require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.User,
        Partials.Channel,
    ],
});


client.on('ready', () => {
    console.log('O bot está no ar!');
});

client.on("ready", () => {
    client.user.setStatus("dnd")
    client.user.setPresence("Vivendo")
    client.user.setActivity("JOGANDO NO VEGAS RP MTA")
});

client.on('messageCreate', (message) => {
    if(message.author.bot) return;

    if(message.content === 'ping') message.channel.send(`**O ping do bot é de estimados ${client.ws.ping}ms**`);
});

client.on('messageCreate', (message) => {
    if(message.author.bot) return;

    if(message.content === 'Olá') message.channel.send(`**Olá ${message.author}**`);
});

// client.on('messageCreate', (message, nome, sobrenome) => {
//     if(message.author.bot) return;

//     if(message.content === 'v!registrar') message.channel.send(`Cidadão Registrado com sucesso! Bem vindo ao Vegas City *${message.author}!*`);
// });

// Evento que ocorre sempre que uma mensagem é enviada no servidor
client.on('messageCreate', message => {
    // Verificando se a mensagem começa com o prefixo e se o autor não é um bot
    if(message.author.bot) return;
    message.delete();
    // Separando o nome do comando e seus argumentos
    const args = message.content.trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    // Verificando se o comando é "!nome"
    if (command === 'v!registrar') {
      // Verificando se o comando foi usado corretamente com um argumento (o novo nome)
      if (!args.length) {
        return message.channel.send('Você precisa fornecer um novo nome!');
      }
  
      // Obtendo o novo nome a partir dos argumentos
      const novoNome = args.join(' ');

      // Mudando o nome do usuário para o novo nome
      message.member.setNickname(novoNome)
        .then(() => {
          message.channel.send(`Cidadão Registrado com sucesso! Bem vindo ao Vegas City *${message.author}!*`);
        //   const GUILD_ID = '1073417348272361502';
        //   const ROLE_ID = '1073417348490461208';
        //   const guild = client.guilds.cache.get(GUILD_ID);
        //   const user = guild.members.fetch(message.author.id);
        //   const role = guild.roles.cache.get(ROLE_ID);
        //   console.log(guild + "" + user + "" + role)
        //   user.roles.set(role)
        })
        .then(() => {
            const GUILD_ID = '1073417348272361502';
            const ROLE_ID = '1073417348490461208';
            var guild = client.guilds.cache.get(GUILD_ID);
            var user = guild.members.fetch(message.author.id);
            var role = guild.roles.cache.get(ROLE_ID);
            console.log(guild + "" + user + "" + role)
            user.roles.add(role)
        })
        .catch(error => {
          console.error(error);
          message.channel.send(`Ocorreu um erro ao tentar registrar, tente novamente ou chame um suporte!`);
        });
    }
  });

client.login(process.env.TOKEN);

