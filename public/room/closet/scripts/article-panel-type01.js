(function() {
  "use strict"

  var object = {};

  object.loading_start = "<div class='partial-load panel-n";
  object.loading_end = "' style='width:100%;height:100%;'><img src='./images/load_w.svg'></div>";

  if (bradev.browser === "firefox" && bradev.device === "other") {
    setTimeout(function() {
      $('.partial-load').css("text-align", "left");
      setTimeout(function() {
        $('.partial-load').css("text-align", "center");
      }, 100);
    }, 1000);
  }

  object.setPanel = function() {
    setTimeout(function() {
      $('.panel .img').each(function(index) {
        if ($(this).hasClass("left")) {
          var vector = "left";
          var flg = true;
        }else if($(this).hasClass("top")){
          var vector = "top";
          var flg = true;
        }
        var width = $(this).css("width");
        var height = $(this).css("height");
        width = parseInt(width.split("px").join("")) - 140;
        height = parseInt(height.split("px").join("")) - 23;
        if(vector === "left"){
          $(".left-bottom", this).css("margin-top", "-23px").css("margin-left", width);
        }else if(vector === "top"){
          $(".left-bottom", this).css("margin-top", 0).css("margin-left", width);
        }
        width = 0 - width;
        height = 0 - height;
        if (flg !== true) {
          $(".loader", this).css("margin-top", height - 16);
        }
      });
    }, 200);
  };

  object.init = function() {
    $('.panel .loader').html(object.loading_start + "0" + object.loading_end);
    object.setPanel();
  }

  object.init();


  $(window).resize(function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    if (object.timer !== false) {
      clearTimeout(object.timer)
    }
    object.timer = setTimeout(function() {
      object.setPanel();
    }, 100)
  });

})();