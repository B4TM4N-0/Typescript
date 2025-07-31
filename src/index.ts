import { Client, GatewayIntentBits, Events, Message } from 'discord.js';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/status', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on(Events.MessageCreate, (message: Message) => {
  if (message.author.bot) return;

  if (message.content === '!lebron') {
    message.channel.send('https://tenor.com/qyUw9qEpXlb.gif');
  }
});

client.login(process.env.DISCORD_TOKEN);
