const { Telegraf } = require('telegraf');
const dayjs = require('dayjs');

// Inserisci il tuo token qui
const bot = new Telegraf('7778268560:AAE9YVb1JK9AYZg_N5I6EN14QYEZse9dckI');

// Comando /start
bot.start((ctx) => {
  ctx.reply('Ciao! Inviami due date nel formato DD-MM-YYYY separate da uno spazio per calcolare la differenza.');
});

// Calcola la differenza tra due date
bot.on('text', (ctx) => {
  try {
    // Estrai il testo inviato dall'utente
    const userInput = ctx.message.text;

    // Dividi l'input in due date
    const [dateStr1, dateStr2] = userInput.split(' ');

    // Verifica che l'input sia nel formato giusto
    if (!dateStr1 || !dateStr2) {
      return ctx.reply('Devi inviare due date nel formato DD-MM-YYYY separate da uno spazio.');
    }

    // Converte le stringhe in oggetti dayjs
    const date1 = dayjs(dateStr1, 'DD-MM-YYYY');
    const date2 = dayjs(dateStr2, 'DD-MM-YYYY');

    // Verifica che entrambe le date siano valide
    if (!date1.isValid() || !date2.isValid()) {
      return ctx.reply('Assicurati che le date siano valide e nel formato DD-MM-YYYY.');
    }

    // Calcola la differenza in giorni
    const diffInDays = Math.abs(date1.diff(date2, 'day'));

    // Rispondi all'utente con la differenza calcolata
    ctx.reply(`La differenza tra ${dateStr1} e ${dateStr2} è di ${diffInDays} giorni.`);
  } catch (err) {
    ctx.reply('Si è verificato un errore. Assicurati di inviare due date nel formato DD-MM-YYYY.');
  }
});

// Avvia il bot
bot.launch().then(() => {
  console.log('Bot avviato!');
});

// Gestisci la chiusura del bot
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
