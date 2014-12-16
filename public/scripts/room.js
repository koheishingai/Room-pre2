this.room = this.room || {};
(function(room) {
    'Use Strict'

    // [Environment]
    room.$favicon = $('.favicon');
    room.$styles = $('.styles');
    room.$title = $('title');
    room.$body = $('body');
    room.$hide_safari = $('.hide-safari');

    // [Object]
    room.$room = $('.screen.layer.room');
    room.$layout = $('.screen.layer.layout');
    room.$create = $('.button.center.create');
    room.$manage = $('.button.center.manage');
    room.$what = $('.button.center.what');
    
    // [Var]
    room.space_path = "./room/space/";
    room.root_name = $("html").attr("name");
    room.explain_start = "<div class='bg-content text explain'>";
    room.explain_end = "</div>";
    room.layout_loader = '<div class="screen loader"><img src="./images/load.svg"></div>';
    room.mode = "main";

    room.noTouch = function(){
      if(bradev.device !== "other"){
        room.$body.addClass("no-touch");
      }
    };

    room.getRoom = function(f){
      if(bradev.device === "iphone"){
        var d = "iphone";
      }else{
        var d = "other";
      }
      $.ajax({
        url: "/getRoom?" + f + "_" + d + "?" + room.getLang(),
        cache: false,
        success: function(data) {
          room.$room.html(data);
          $('.screen.loader').fadeOut();
        }
      });
    };

    room.getLayout = function(f, id){
      if(bradev.device === "iphone"){
        var d = "iphone";
      }else{
        var d = "other";
      }
      $.ajax({
        url: "/getLayout?" + f + "_" + d + "?" + room.getLang() +"?" + id,
        cache: false,
        success: function(data) {
          room.$layout.html(data);
          $('.screen.layer.layout .loader').fadeOut();
        }
      });
    };

    room.createId = function(num){
      var str = '';
      var mojishu = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
      var len = mojishu.length;
      for (var i = 0; i < num; i++) {
        var rand = parseInt(Math.random()*len);
        str += mojishu.charAt(rand);
      }
      return str;
      localStorage.setItem("ID", str);
    }
    
    room.removeExplain = function(){
      $('.explain').remove();
    };

    room.refreshExplain = function(){
      if(room.getLang() !== "ja"){
        // room.$room.append(room.explain_start+"This is Room"+room.explain_end);
        // room.$layout.html(room.explain_start+"This is Layout"+room.explain_end);
        room.$layout.html("");
      }else{
        //room.$room.append(room.explain_start+"部屋"+room.explain_end);
        //room.$layout.html(room.explain_start+"レイアウト"+room.explain_end);
        room.$layout.html("");
      }
      room.$layout.append('<div class="screen loader"><img src="./images/load.svg"></div>');
    };

    room.hideSafari = function(){
      if (bradev.browser === "safari" || bradev.device !== "other") {
        room.$hide_safari.hide();
      }
    };

    room.getTime = function(){
      var t = new Date();
      var h = t.getHours();
      var m = t.getMinutes();
      var s = t.getSeconds();
      return "" + h + "" + m + "" + s;
    };

    room.getLang = function() {
     var href = location.href;
     if(href.indexOf("?ja") !== -1) {
       return "ja";
     }else if(href.indexOf("?en") !== -1){
       return "en";
     }else{
      try {
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 2);
      } catch (e) {
        return undefined;
      }
     }
    };

    room.setContent = function() {
      if(room.getLang() !== "ja"){
        room.$create.text("Create Room");
        room.$manage.text("Manage Room");
        room.$what.text("What's Room?");
      }else{
        room.$body.addClass("ja");
        room.$create.text("部屋の作成");
        room.$manage.text("部屋の管理");
        room.$what.text("部屋について");
      }
    };

    room.getSpace = function() {
  
      gs = {};
    
      gs.getTitle = function(n, l) {
        $.ajax({
          url: "/getSpace?" + n + "?" + l,
          cache: false,
          success: function(data) {
            room.$title.html(data);
          }
        });
      };
    
      room.$favicon.attr("href", room.space_path + room.root_name + "/f.ico?"+room.getTime());
      room.$styles.attr("href", room.space_path + room.root_name + "/custom.css?"+room.getTime());
      gs.getTitle(room.root_name, room.getLang());
    };

    room.init = function() {
      room.noTouch();
      room.setContent();
      room.hideSafari();
      room.getSpace();
      room.getRoom(room.root_name);
    };

    room.init();

    room.close = function() {
        if(room.mode === "view"){
          if (bradev.browser !== "safari" && bradev.device === "other") {
              room.$body.removeClass("view2");
          } else {
              room.$body.removeClass("view").removeClass("view2").removeClass("mobile");;
          }
          setTimeout(function() {
              room.removeExplain();
              room.$body.removeClass("view");
              room.mode = "main";
          }, 280);      
        }else if(room.mode === "layout"){
          $('.screen.layer.layout .loader').fadeOut();
          if(room.getLang() !== "ja"){
            // $('.layer.layout .explain').text("This is Layout");
          }else{
            // $('.layer.layout .explain').text("レイアウト");
          }
          room.$body.removeClass("layout2");
          setTimeout(function() {
              room.refreshExplain();
              room.$body.removeClass("layout");
              room.mode = "view";
          }, 280);        
        }
    };

    room.back = function() {
      
    };
    
    room.view = function() {
        room.mode = "view";
        if (bradev.browser !== "safari" && bradev.device === "other") {
            room.refreshExplain();
            room.$body.addClass("view");
        } else {
            room.$body.addClass("view").addClass("mobile");
        }
        setTimeout(function() {
            room.$body.addClass("view2");
        }, 280);
    };
    
    room.layout = function(f) {
      room.mode = "layout";
      $('.screen.layer.layout .loader').fadeIn();
      if(f === "create"){
        if(room.getLang() !== "ja"){
          $('.layer.layout .explain').text("Create Room");
        }else{
          $('.layer.layout .explain').text("部屋の作成");        
        }
        room.getLayout(f, room.createId(7));
      }else if(f === "manage"){
        if(room.getLang() !== "ja"){
          $('.layer.layout .explain').text("Manage Room");
        }else{
          $('.layer.layout .explain').text("部屋の管理");
        }
      }else if(f === "what"){
        if(room.getLang() !== "ja"){
          $('.layer.layout .explain').text("What's Room");
        }else{
          $('.layer.layout .explain').text("部屋について");
        }
        room.getLayout(f, room.createId(7));
      }
      room.$body.addClass("layout");
      setTimeout(function() {
    　　　room.$body.addClass("layout2");
      }, 280);    
    };

  room.ios = function(i, m){
    $('.ui-ios-overlay img').attr("src", "./images/ios_"+i+".png")
    $('.ui-ios-overlay .title').text(m);
    $('.ui-ios-overlay').fadeIn(function(){
      setTimeout(function(){
        $('.ui-ios-overlay').fadeOut();
      }, 330);
    });
  }

}(this.room));
//Kohei Shingai