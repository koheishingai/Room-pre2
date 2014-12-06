fs = require('fs');

index = {};
index.space_path = './public/room/space/';
index.layout_path = './public/room/layout/';

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

exports.getLayout = function(req, res) {
  var gl = {};
  gl.list = req.url.split("?");
  gl.flg = gl.list[1];
  gl.id = gl.list[2].split("&_=")[0];
  fs.readFile(index.layout_path+gl.flg+"/layout.html", 'utf8', function(err, val) {
    res.send(val);
  });
  fs.readFile(index.layout_path+gl.flg+"user.json", 'utf8', function(err, val) {
    console.log(val);
  });
};