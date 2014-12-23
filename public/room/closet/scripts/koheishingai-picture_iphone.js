this.picture = this.picture || {};
(function(picture) {
  'Use Strict'
  
  picture.width = window.innerWidth;
  picture.height = window.innerHeight;  
  picture.id = $('body').attr("data");
  
  picture.$content = $('.content');
  picture.$menu = $('search_w .menu');
  picture.$menu_list = $('.content .menu-list');
    
  picture.dataCheck = function(){
    if(picture.id === "404"){
      $('body').addClass("empty");
    }else{
      $('body').removeClass("empty");
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