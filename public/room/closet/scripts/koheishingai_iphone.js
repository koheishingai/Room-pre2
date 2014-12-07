this.koheishingai = this.koheishingai || {};
(function(koheishingai) {
    'Use Strict'
    
    koheishingai.ajax = function(u, a, t, ar) {
        var aj = {};
        $.ajax({
            url: "/" + u + "?" + a,
            cache: false,
            success: function(data) {
                // aj.array = material.analyzArgs(ar);
                aj.result = data;
                /* for (var i = 0; i < aj.array.length; i++) {
                    aj.result = aj.result.split(":::" + i + ":::").join(aj.array[i]);
                }*/
                $('object-n'+t).fadeOut();
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
            $(this).html(koheishingai.loading_start+go.cnt+koheishingai.loading_end);
            $(this).attr("object-id", go.cnt);
            go.args = $(this).attr("args");
            if (room.getLang() === "ja") {
                koheishingai.ajax("getObject", $(this).attr("object") + "_ja", go.cnt, "");
            } else {
                koheishingai.ajax("getObject", $(this).attr("object") + "_en", go.cnt, "");
            }
            go.cnt++;
        });
    };
    
    koheishingai.init = function(){
      koheishingai.getObject();
    }
    
    koheishingai.init();

}(this.koheishingai));
//Kohei Shingai