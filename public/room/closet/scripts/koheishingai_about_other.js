this.about = this.about || {};
(function(about) {
  'Use Strict'
  
  about.width = window.innerWidth;
  about.height = window.innerHeight;  
  
  about.$content = $('body.about .content');
  about.$menu = $('body.about .search_w .menu');
  about.$menu_list = $('body.about .content .menu-list');
    
  about.sizeContent = function(w, h){
    about.$content.css("height", h - 100);
  };
  
  about.init = function(){
    about.sizeContent(about.width, about.height);
    room.getObject();
  }
  
  about.init();
  
  $(window).resize(function() {
    about.width = window.innerWidth;
    about.height = window.innerHeight;
    if (about.timer !== false) {
      clearTimeout(about.timer)
    }
    about.timer = setTimeout(function() {
      about.sizeContent(about.width, about.height);
    }, 100)
  });
  
  about.$menu.click(function(){
    if(about.$menu_list.hasClass("hide") === false){
      about.$menu_list.addClass("hide");    
    }else{
      about.$menu_list.removeClass("hide");
    }
  });
  
    $('.view').click(function() {
      alert("test");    
    });
  
  
}(this.about));
//Kohei Shingai