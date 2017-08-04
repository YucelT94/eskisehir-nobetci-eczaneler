var express = require('express');
var fs = require('fs');

var main_controller = {};
var controllersPath = process.cwd() + '/app/controllers';

fs.readdirSync(controllersPath).forEach(function (file) {
    if (file.match(/\.js$/)) {
        main_controller[file.split('.')[0].toLowerCase()] =
            require(controllersPath + '/' + file);
    }
});

var nobetcieczane_controller = {};
var nobetcieczane_controllersPath = process.cwd() + '/app/controllers';
fs.readdirSync(nobetcieczane_controllersPath).forEach(function (file) {
    if (file.match(/\.js$/)) {
        nobetcieczane_controller[file.split('.')[0].toLowerCase()] =
            require(nobetcieczane_controllersPath + '/' + file);
    }
});

module.exports = function (app) {
    var router = express.Router();
    router.route('/').get(main_controller.main.index);
    router.route('/nobetciodunpazari').get(nobetcieczane_controller.nobetciodunpazari.nobetciodunpazari);
    router.route('/nobetcitepebasi').get(nobetcieczane_controller.nobetcitepebasi.nobetcitepebasi);

    app.use(router);
};
