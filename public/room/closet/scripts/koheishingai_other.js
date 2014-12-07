this.koheishingai = this.koheishingai || {};
(function(koheishingai) {
    'Use Strict'
    
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
                koheishingai.ajax("getObject", $(this).attr("object") + "_ja", go.cnt, go.args);
            } else {
                koheishingai.ajax("getObject", $(this).attr("object") + "_en", go.cnt, go.args);
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