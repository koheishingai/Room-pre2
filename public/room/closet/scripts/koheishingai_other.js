this.koheishingai = this.koheishingai || {};
(function(koheishingai) {
  'Use Strict'

  koheishingai.$href = $('.href');
  koheishingai.$body = $('body');
  koheishingai.$loader = $('.screen.loader');
  koheishingai.$load = $('.screen.room .content .loading .text');

  koheishingai.init = function() {
    room.getObject();
  }

  koheishingai.init();

  koheishingai.$href.click(function() {
    room.position = koheishingai.$href.attr("target")
    koheishingai.$body.addClass("trn");
    setTimeout(function() {
      // koheishingai.$body.addClass("trn2");
      // setTimeout(function() {
        koheishingai.$loader.fadeIn(function() {
          // koheishingai.$body.removeClass("trn2");
        });
      // }, 180);
    }, 280);
  });


    koheishingai.$load.click(function(){
            if(room.getLang() === "ja"){
              room.ios("cross", "記事はありません");
            }else{
              room.ios("cross",  "No Article");
            }
    });


}(this.koheishingai));
//Kohei Shingai