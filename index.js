var fs = require('fs');
var token = require(process.env.HOME + '/.dagsen-bot-token.js');

var request = require('request');
var Telegram = require('telegram-bot');
var tg = new Telegram(token);

tg.on('message', function(msg) {
  console.log('got msg: ' + msg.text);
  if (!msg.text) return;

  if (!msg.text.indexOf('/mat')) {
    console.log('retreiving menu...');
    request('http://api.teknolog.fi/taffa/sv/today', function(err, res, body) {
      tg.sendMessage({
        text: body,
        chat_id: msg.chat.id
      });
    });
  }

  if (!msg.text.indexOf('/ute')) {
    console.log('retreiving weather...');
    request('http://outside.aalto.fi/data.txt', function(err, res, body) {
      outside = JSON.parse(body);
      message = "Temperatur: " + outside["gent-outside-t"] + " \xB0C\n";
      message += "Luftfuktighet: " + outside["gent-outside-h"] + " RH%\n";
      message += "Lufttryck: " + outside["gent-outside-b"] + " hPa\n";
      message += "Ljusstyrka: "  + outside["gent-outside-l"] + " lx\n";
      tg.sendMessage({
        text: message,
        chat_id: msg.chat.id
      });
    });
  }
});

tg.start();
