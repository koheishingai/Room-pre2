this.koheishingai = this.koheishingai || {};
(function(koheishingai) {
  'Use Strict'

  koheishingai.$href = $('.href');
  koheishingai.$body = $('body');
  koheishingai.$loader = $('.screen.loader');
  
  koheishingai.init = function() {
    room.getObject();
  }

  koheishingai.init();

  koheishingai.$href.click(function() {
    room.position = koheishingai.$href.attr("target")
    koheishingai.$body.addClass("trn");
    setTimeout(function() {
      koheishingai.$body.addClass("trn2");
      setTimeout(function() {
        koheishingai.$loader.fadeIn(function() {
          koheishingai.$body.removeClass("trn2");
        });
      }, 180);
    }, 280);
  });

}(this.koheishingai));
//Kohei Shingai