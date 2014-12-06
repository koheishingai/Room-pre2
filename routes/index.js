fs = require('fs');

index = {};
index.space_path = './public/room/space/';

exports.index = function(req, res) {
    res.render('index');
};

exports.getSpace = function(req, res) {
  var gs = {};
  gs.list = req.url.split("?");
  gs.name = gs.list[1];
  gs.lang = gs.list[2].split("&_=")[0];
  fs.readFile(index.space_path+gs.name+"/title.json", 'utf8', function(err, val) {
    var out = JSON.parse(val);
    res.send(out[gs.lang]);
  });  
};