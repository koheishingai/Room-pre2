this.picture = this.picture || {};
(function(picture) {
  'Use Strict'
  
  picture.width = window.innerWidth;
  picture.height = window.innerHeight;  
  picture.id = $('body').attr("data");
  
  picture.$content = $('.content');
  picture.$menu = $('search_w .menu');
  picture.$menu_list = $('.content .menu-list');
  picture.$picture_out = $('#picture-out');  
    
  picture.getPicture = function(id){
    var gp = {};
    gp.maxHeight = parseInt(picture.$content.css("height")) - 20;
    gp.maxWidth = parseInt(picture.$content.css("width")) - 20;
    picture.$picture_out.css("max-height", gp.maxHeight);
    picture.$picture_out.css("max-width", gp.maxWidth);  
    $.ajax({
      url: "/" + "getPicture" + "?" + id,
      cache: false,
      success: function(data) {
        gp.list = JSON.parse(data);
        if(room.getLang() === "ja"){
          $(".picture-title").text(gp.list["title-ja"].split("_").join(" "));
        }else{
          $(".picture-title").text(gp.list["title-en"].split("_").join(" "));
        }
        picture.$picture_out.attr("src", gp.list["url"]);
        gp.outHeight = 0 - (parseInt(picture.$picture_out.css("height"))/2 - 50);
        if(window.innerWidth < 1170){
          gp.outWidth = 0 - (parseInt(picture.$picture_out.css("width"))/2);
        }else{
          gp.outWidth = 0 - (parseInt(picture.$picture_out.css("width"))/2 - 130);
        }
        setTimeout(function(){
          picture.$picture_out.css("margin-top", gp.outHeight);
          picture.$picture_out.css("margin-left", gp.outWidth);
          picture.$picture_out.fadeIn().css("display", "block");
        }, 1350);
      }
    });
  }

  picture.dataCheck = function(){
    if(picture.id === "404"){
      $('body').addClass("empty");
    }else{
      $('body').removeClass("empty");
      picture.getPicture(picture.id);
    }
  };
    
  picture.sizeContent = function(w, h){
    picture.$content.css("height", h - 100);
  };
  
  picture.init = function(){
    picture.sizeContent(picture.width, picture.height);
    room.getObject();
    picture.dataCheck();
  }
  
  picture.init();
  
  $(window).resize(function() {
    picture.width = window.innerWidth;
    picture.height = window.innerHeight;
    if (picture.timer !== false) {
      clearTimeout(picture.timer)
    }
    picture.timer = setTimeout(function() {
      picture.sizeContent(picture.width, picture.height);
      picture.getPicture(picture.id);
    }, 100)
  });
  
  picture.$menu.click(function(){
    if(picture.$menu_list.hasClass("hide") === false){
      picture.$menu_list.addClass("hide");    
    }else{
      picture.$menu_list.removeClass("hide");
    }
  });
  
}(this.picture));
//Kohei Shingai