fs = require('fs');

index = {};
index.space_path = './public/room/space/';
index.layout_path = './public/room/layout/';

index.addScript = function(f, o){
  var out = o + '<script src="./room/closet/scripts/'+f+'.js"></script>'
  return out;
};

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
  gl.lang = gl.list[2]
  gl.id = gl.list[3].split("&_=")[0];
  if(gl.lang === "ja"){
    fs.readFile(index.layout_path+gl.flg+"/layout_ja.html", 'utf8', function(err, val) {
      var out = index.addScript(gl.flg, val);
      res.send(out);
    });
  }else{
    fs.readFile(index.layout_path+gl.flg+"/layout_en.html", 'utf8', function(err, val) {
      var out = index.addScript(gl.flg, val);
      res.send(out);
    });  
  }
  fs.readFile(index.layout_path+gl.flg+"user.json", 'utf8', function(err, val) {
    // console.log(val);
  });
};