var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 2) == 'd!') {
        var args = message.substring(2).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'joke':            
                try {  
                    var joke = fs.readFileSync('Joke.txt').toString().split("\n");
                    //for(i in joke) {
                    //    console.log(joke[i]);
                    var jokeStr = joke[Math.floor(Math.random()*joke.length)]
                        console.log(jokeStr);
                    }    
                catch(e) {
                    console.log('Error:', e.stack);
                }
                bot.sendMessage({
                    to: channelID,
                    message: jokeStr
                });
            break;
            case 'no':
                bot.sendMessage({
                    to: channelID,
                    message: 'For the millionth time Karen, I told you I don\'t want salad for dinner!'
                });
            break;
            case 'order':
            bot.sendMessage({
                to: channelID,
                message: 'eat your brocoli, kid'
            });
        break;
        case 'help':
        bot.sendMessage({
            to: channelID,
            message: '*d!joke*\tfor dad joke\n*d!no*\t\tto say no like a dad\n*d!order*\tin case of the need for some parental guidance'
        });
        break;
            // Just add any case commands if you want to..
         }
     }
});