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
    
    room.removeExplain = function(){
      $('.explain').remove();
    };

    room.addExplain = function(){
      room.$room.append(room.explain_start+"This is Room"+room.explain_end);
      room.$layout.append(room.explain_start+"This is Layout"+room.explain_end);
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
        if (bradev.browser !== "safari" && bradev.device === "other") {
            room.$body.removeClass("view2");
        } else {
            room.$body.removeClass("view").removeClass("view2").removeClass("mobile");;
        }
        setTimeout(function() {
            room.removeExplain();
            room.$body.removeClass("view")
        }, 280);      
    };

    room.back = function() {
      
    };
    
    room.view = function() {
        if (bradev.browser !== "safari" && bradev.device === "other") {
            room.addExplain();
            room.$body.addClass("view");
        } else {
            room.$body.addClass("view").addClass("mobile");
        }
        setTimeout(function() {
            room.$body.addClass("view2");
        }, 280);
    };
    
    room.edit = function() {
    
    };

}(this.room));
//Kohei Shingai