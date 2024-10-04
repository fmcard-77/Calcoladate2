const { Telegraf } = require('telegraf');

// Inizializza il bot con il tuo token
const bot = new Telegraf(process.env.7778268560:AAE9YVb1JK9AYZg_N5I6EN14QYEZse9dckI);

// Funzione per calcolare i giorni tra due date
function calcolaGiorni(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}

// Comando /calcola
bot.command('calcola', (ctx) => {
    const args = ctx.message.text.split(' ').slice(1);
    
    if (args.length !== 2) {
        return ctx.reply('Uso corretto: /calcola YYYY-MM-DD YYYY-MM-DD');
    }

    const [startDate, endDate] = args;

    try {
        const giorni = calcolaGiorni(startDate, endDate);
        ctx.reply(`I giorni tra ${startDate} e ${endDate} sono: ${giorni}`);
    } catch (error) {
        ctx.reply('Formato data non valido. Usa YYYY-MM-DD.');
    }
});

// Avvia il bot
bot.launch();

// Gestione della chiusura del bot
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
