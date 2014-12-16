this.koheishingai = this.koheishingai || {};
(function(koheishingai) {
  'Use Strict'

  koheishingai.$href = $('.href');
  koheishingai.$body = $('body');
  koheishingai.$loader = $('.screen.loader');
    koheishingai.$load = $('.screen.room .content .loading .text');

  koheishingai.ajax = function(u, a, t, ar) {
    var aj = {};
    $.ajax({
      url: "/" + u + "?" + a + "?" + ar,
      cache: false,
      success: function(data) {
        // aj.array = material.analyzArgs(ar);
        aj.result = data;
        /* for (var i = 0; i < aj.array.length; i++) {
            aj.result = aj.result.split(":::" + i + ":::").join(aj.array[i]);
        }*/
        $('object-n' + t).fadeOut();
        $('[object-id="' + t + '"]').html(aj.result);
      }
    });
  };

  koheishingai.loading_start = "<div class='partial-load object-n";
  koheishingai.loading_end = "' style='width:100%;height:100%;'><img src='./images/load.svg'></div>";

  koheishingai.getObject = function() {
    var go = {};
    go.cnt = 0;
    $('[object]').each(function() {
      $(this).html(koheishingai.loading_start + go.cnt + koheishingai.loading_end);
      $(this).attr("object-id", go.cnt);
      if ($(this).attr("data") === "default") {
        go.data_name = room.root_name;
        go.data_lang = room.getLang();
        if (room.position === undefined || room.position === "") {
          go.data_position = "main";
        } else {
          go.data_position = room.position;
        }
        go.data = go.data_name + "_" + go.data_position + "_" + go.data_lang;
      } else {
        go.data = "";
      }
      go.args = $(this).attr("args");
      if (room.getLang() === "ja") {
        koheishingai.ajax("getObject", $(this).attr("object") + "_ja", go.cnt, go.data);
      } else {
        koheishingai.ajax("getObject", $(this).attr("object") + "_en", go.cnt, go.data);
      }
      go.cnt++;
    });
  };

  koheishingai.init = function() {
    koheishingai.getObject();
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