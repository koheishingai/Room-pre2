(function() {
  "use strict"

   var object = {};

   object.loading_start = "<div class='partial-load panel-n";
   object.loading_end = "' style='width:100%;height:100%;'><img src='./images/load_w.svg'></div>";

   $('.panel .loader').html(object.loading_start+"0"+object.loading_end);
   setTimeout(function(){
   $('.panel .img').each(function( index ) {
      var width = $(this).css("width");
      var height = $(this).css("height");
          width = parseInt(width.split("px").join("")) - 125;
          height = parseInt(height.split("px").join("")) - 20;
      $(".left-bottom", this).css("margin-top", height).css("margin-left", width);
          width = 0 - width;
          height = 0 - height;
      $(".loader", this).css("margin-top", height - 16);
   });
   },200);

})();