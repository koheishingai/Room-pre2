(function() {
  "use strict"
  var object = {};
  
  object.$main_slide = $(".main-slide");
  object.$next = $(".next");
  
  if(object.$main_slide.hasClass("n0") === true){
    object.now = 0;
  }else if(object.$main_slide.hasClass("n1") === true){
    object.now = 1;
  }else if(object.$main_slide.hasClass("n2") === true){
    object.now = 2;
  }else if(object.$main_slide.hasClass("n3") === true){
    object.now = 3;
  }
  
  console.log(object.now);
  object.a = 'body.about .side-nav.white-nav li a';
  
  object.setA = function(){
    for(var i=0;i<4;i++){
      if(i === object.now){
        $(object.a+".n"+i).addClass("on");
      }else{
        $(object.a+".n"+i).removeClass("on");
      }
    }  
  };
  
  object.init = function(){
    object.setA();
  };
  
  object.init();
  
  object.$next.click(function(){
  if($(this).hasClass("n0") === true){
    object.next = 0;
  }else if($(this).hasClass("n1") === true){
    object.next = 1;
  }else if($(this).hasClass("n2") === true){
    object.next = 2;
  }else if($(this).hasClass("n3") === true){
    object.next = 3;
  }
  if(object.now !== object.next){
    object.$main_slide.removeClass("n"+object.now).addClass("n"+object.next);
    object.now = object.next;
    object.setA();
    about.$menu_list.addClass("hide"); 
  };
  
  });
  
  
})();