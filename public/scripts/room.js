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
    
    // [Var]
    room.space_path = "./room/space/";
    room.root_name = $("html").attr("name");
    room.explain_start = "<div class='bg-content text explain'>";
    room.explain_end = "</div>";
    room.layout_loader = '<div class="screen loader"><img src="./images/load.svg"></div>';
    room.mode = "main";

    room.getLayout = function(f, id){
      alert(bradev.device);
      $.ajax({
        url: "/getLayout?" + f + "?" + id,
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
      room.$room.append(room.explain_start+"This is Room"+room.explain_end);
      room.$layout.html(room.explain_start+"This is Layout"+room.explain_end);
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
      try {
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 2);
      } catch (e) {
        return undefined;
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
      room.hideSafari();
      room.getSpace();
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
          $('.layer.layout .explain').text("This is Layout");
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
        $('.layer.layout .explain').text("Create Room");
        room.getLayout(f, room.createId(7));
      }else if(f === "manage"){
        $('.layer.layout .explain').text("Manage Room");
      }else if(f === "what"){
        $('.layer.layout .explain').text("What's Room?");
      }
      room.$body.addClass("layout");
      setTimeout(function() {
    　　　room.$body.addClass("layout2");
      }, 280);    
    };

}(this.room));
//Kohei Shingai