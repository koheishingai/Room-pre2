this.sentence = this.about || {};
(function(sentence) {
  'Use Strict'
  
  sentence.width = window.innerWidth;
  sentence.height = window.innerHeight;  
  sentence.id = $('body').attr("data");
  
  sentence.$content = $('.content');
  sentence.$menu = $('.search_w .menu');
  sentence.$menu_list = $('.content .menu-list');
    
  sentence.sizeContent = function(w, h){
    sentence.$content.css("height", h - 100);
  };
  
  sentence.dataCheck = function(){
    if(sentence.id === "404"){
      $('body').addClass("empty");
    }else{
      $('body').removeClass("empty");
    }
  };
  
  sentence.init = function(){
    sentence.sizeContent(sentence.width, sentence.height);
    room.getObject();
    sentence.dataCheck();
  }
  
  sentence.init();
  
  $(window).resize(function() {
    sentence.width = window.innerWidth;
    sentence.height = window.innerHeight;
    if (sentence.timer !== false) {
      clearTimeout(sentence.timer)
    }
    sentence.timer = setTimeout(function() {
      sentence.sizeContent(sentence.width, sentence.height);
    }, 100)
  });
  
  sentence.$menu.click(function(){
    if(sentence.$menu_list.hasClass("hide") === false){
      sentence.$menu_list.addClass("hide");    
    }else{
      sentence.$menu_list.removeClass("hide");
    }
  });
  
}(this.sentence));
//Kohei Shingai