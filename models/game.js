var seraphUrl = require('url').parse('http://app37458637:gp9yfrsaA1uQD6a5pMZm@app37458637.sb05.stations.graphenedb.com:24789');
var db = require("seraph")({
    server: seraphUrl.protocol + '//' + seraphUrl.host,
    user: seraphUrl.auth.split(':')[0],
    pass: seraphUrl.auth.split(':')[1]
});
var model = require('seraph-model');

var choice = model(db, 'Choice');
var scene = model(db, 'Scene');
var statistic = model(db, 'Statistic');
var game = model(db, 'Game');

choice.schema = {
    title: {type: String, required: true}
};

scene.schema = {
    title: String,
    content: {type: String, required: true}
};

statistic.schema = {
    name: {type: String, required: true},
    display: {type: Boolean, default: false}
};

game.schema = {
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    template: {type: Boolean, default: false}
};

// Composition: the scene contains an array of choices; each choice contains an array of scenes (without choices) that they lead to -- this reduces a lot of overhead in the server trying to traverse relationships.
scene.compose(choice, 'choices', 'CONTAINS', {many: true});
scene.compose(statistic, 'statistics', 'REFERENCES', {many: true});
choice.compose(scene, 'scenes', 'LEADS_TO', {many: true});
choice.compose(statistic, 'statistics', 'AFFECTS', {many: true});

// Composition: the game has an initial scene, then all the statistics
//game.compose(scene, 'scenes', 'CONTAINS', {many: true});
game.compose(statistic, 'statistics', 'CONTAINS', {many: true});
game.compose(scene, 'first_scene', 'LEADS_TO');

module.exports.choice = choice;
module.exports.scene = scene;
module.exports.statistic = statistic;
module.exports.game = game;