var request = require('request');
var cheerio = require('cheerio');
var url = 'http://www.bulurum.com/nobetci-eczane/tepebasi/';

exports.nobetcitepebasi = function (req, res, next) {
    request(url, function (err, response, body) {
        if (err) {
            return next(err);
        }
        if (response.statusCode !== 200) {
            return next(new Error('Server Error'));
        }
        $ = cheerio.load(body);

        var links = $('section.DutiesResult')
            .map(function (i, e) {
                var tds = $(e).find('div.ResultLeft');
                return {
                    name: $(tds[0]).find('a.ResultName').text().trim(),
                    address: $(tds[0]).find('div.ResultAddr span').text().trim(),
                    telephone: $(tds[0]).find('span.spPhone').text().trim(),
                };
            })
            .get() // get basic JSONArray
            .sort(function (a, b) { // sort by code
                return a.code - b.code;
            });

        if (req.query.skip) {
            links = links.slice(req.query.skip);
        }
        if (req.query.limit) {
            links = links.slice(0, req.query.limit);
        }

        return res.json(links);
    });
};