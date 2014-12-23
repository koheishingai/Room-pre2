fs = require('fs');

index = {};

index.space_path = './public/room/space/';
index.layout_path = './public/room/layout/';
index.object_path = './public/room/closet/object/';
index.data_path = './public/room/closet/data/article/list/';
index.picture_path = './public/room/closet/data/picture/';

index.addScript = function(f, o) {
    var out = o + '<script src="./room/closet/scripts/' + f + '.js"></script>'
    return out;
};

index.addStyle = function(f, o) {
    var out = o + '<link rel="stylesheet" href="./room/closet/styles/' + f + '.css"></link>'
    return out;
};

exports.index = function(req, res) {
    res.render('index');
};

exports.picture = function(req, res) {
    if(req.url.indexOf("?id:") !== -1){
      var id_out = req.url.split("?id:")[1];
      res.render('picture', {id:id_out});
    }else{
      res.render('picture', {id:"404"});
    }
};

exports.sentence = function(req, res) {
    if(req.url.indexOf("?id:") !== -1){
      var id_out = req.url.split("?id:")[1];
      res.render('sentence', {id:id_out});
    }else{
      res.render('sentence', {id:"404"});
    }
};

exports.getSpace = function(req, res) {
    var gs = {};
    gs.list = req.url.split("?");
    gs.name = gs.list[1];
    gs.lang = gs.list[2].split("&_=")[0];
    fs.readFile(index.space_path + gs.name + "/title.json", 'utf8', function(err, val) {
        gs.out = JSON.parse(val);
        res.send(gs.out[gs.lang]);
    });
};

exports.getPicture = function(req, res) {
    var gp = {};
    gp.list = req.url.split("?");
    gp.id = gp.list[1].split("&_=")[0];
    fs.readFile(index.picture_path + gp.id + "/info.json", 'utf8', function(err, val) {
        res.send(val);
    });
};

exports.getLayout = function(req, res) {
    var gl = {};
    gl.list = req.url.split("?");
    gl.name  = gl.list[1];
    gl.lang = gl.list[2];
    gl.id   = gl.list[3].split("&_=")[0];
    if (gl.lang === "ja") {
        fs.readFile(index.layout_path + gl.name + "/layout_ja.html", 'utf8', function(err, val) {
            gl.out = index.addScript(gl.name, val);
            res.send(gl.out);
        });
    } else {
        fs.readFile(index.layout_path + gl.name + "/layout_en.html", 'utf8', function(err, val) {
            gl.out = index.addScript(gl.name, val);
            res.send(gl.out);
        });
    }
    fs.readFile(index.layout_path + gl.name + "user.json", 'utf8', function(err, val) {
        // console.log(val);
    });
};

exports.getRoom = function(req, res) {
    var gr = {};
    gr.list = req.url.split("?");
    gr.name = gr.list[1];
    gr.lang = gr.list[2].split("&_=")[0];
    if (gr.lang === "ja") {
        fs.readFile(index.layout_path + gr.name + "/layout_ja.html", 'utf8', function(err, val) {
            gr.out = index.addStyle(gr.name, index.addScript(gr.name, val));
            res.send(gr.out);
        });
    } else {
        fs.readFile(index.layout_path + gr.name + "/layout_en.html", 'utf8', function(err, val) {
            gr.out = index.addStyle(gr.name, index.addScript(gr.name, val));
            res.send(gr.out);
        });
    }
};

exports.getObject = function(req, res) {
    var go = {};
    go.list = req.url.split("?");
    go.name = go.list[1];
    go.data = go.list[2].split("&_=")[0];
    fs.readFile(index.object_path + go.name + ".html", 'utf8', function(err, val) {
        go.name = go.name.split("_")[0];
        if (go.data !== "") {
            val = val.split(":::data:::").join(go.data);
        }
        go.out = index.addStyle(go.name, index.addScript(go.name, val));
        res.send(go.out);
    });
};

exports.getData = function(req, res) {
    var gd = {};
    gd.list = req.url.split("?");
    gd.name = gd.list[1].split("&_=")[0];
    fs.readFile(index.data_path + gd.name + ".json", 'utf8', function(err, val) {
        res.send(val);
    });
};