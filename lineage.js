var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


var url = '/~kappachi/lines.htm';
var lines = [];
    var i = 216;

request(url, function (error, response, html) {
  if (!error) {
    var $ = cheerio.load(html);
    var title, release, rating;
    // We'll use the unique header class as a starting point.

      var lines = []
    $('table').filter(function (data) {
      var json = { line: "", date: "", image: "", members: [] };
      var line = $(this).children('caption').text().replace(/\n*/gi, '');
      line = line.replace(/^ */g, '');
      line = line.replace(/ *$/g, '');
      json.date = line.split(' - ')[0].replace('Spring', 'Spr');
      json.line = line.split(' - ')[1];

      var members = $(this).children('tbody').text().replace(/\n*/gi, '').replace(/^ */g, '').replace(/ *$/g, '');
      $(this).children('tbody').children('tr').each(function (num, elem) {
        var person = $(this).children('td').first().text();
        var member = {};
        member.lineName = person.split('"')[1];
        member.name = $(this).children('td').last().text()
        json.members.push(member);
        
        if(member.name === "#119") {
          i = 124;
        }
        console.log(i+": "+member.name);
        i--
      })
      lines.push(json);
    });
    // fs.writeFile('message.txt', JSON.stringify(lines), (err) => {
    //   if (err) throw err;
    //   console.log('It\'s saved!');
    // });
  } else {
    console.log(error);
  }
})
exports = module.exports = app;