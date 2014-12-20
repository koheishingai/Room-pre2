(function() {
    "use strict"

    var object = {};

    object.$panel_img = $('.panel .img');

    object.article_name = $(".article-id").attr("val");

    if (bradev.browser === "firefox" && bradev.device === "other") {
        setTimeout(function() {
            $('.partial-load').css("text-align", "left");
            setTimeout(function() {
                $('.partial-load').css("text-align", "center");
            }, 100);
        }, 1000);
    }

    object.numConvert = function(n) {
        return 0 - n;
    }

    object.createArray = function(l) {
        var out = l.split("[").join("");
        out = out.split("]").join("");
        return out.split(",");
    }

    object.convertStrings = function(o) {
        var out = o.split(" ").join("");
        out = out.split("_").join(" ");
        return out.split("//").join(",");
    }


    object.setSize = function(n) {
        var ss = {};
        var in_width = $(n + ' .in .thumb').css("width");
        var in_height = $(n + ' .in .thumb').css("height");
        var title_width = $(n + ' .in .title').css("width");
        if (parseInt(in_width) - parseInt(title_width) < 30) {
            $(n + ' .in .title').addClass("m");
            title_width = $(n + ' .in .title').css("width");
        } else {
            $(n + ' .in .title').removeClass("m");
            title_width = $(n + ' .in .title').css("width");
        }
        var title_height = $(n + ' .in .title').css("height");
        if ($(n).hasClass("left") === true && window.innerWidth > 1170) {
            var title_left = (parseInt(in_width) - parseInt(title_width)) / 2 + parseInt($(n + ' .in .left').css("width"));
        } else {
            var title_left = (parseInt(in_width) - parseInt(title_width)) / 2;
        }
        var title_top = (parseInt(in_height) - parseInt(title_height)) / 2;
        var sub_width = $(n + ' .in .sub').css("width");
        var sub_height = $(n + ' .in .sub').css("height");
        if (parseInt(in_width) - parseInt(sub_width) < 20) {
            $(n + ' .in .sub').fadeOut();
            title_top = title_top + 7;
            sub_width = $(n + ' .in .sub').css("width");
        } else {
            $(n + ' .in .sub').fadeIn();
            sub_width = $(n + ' .in .sub').css("width");
        }
        if ($(n).hasClass("left") === true && window.innerWidth > 1170) {
            var sub_left = (parseInt(in_width) - parseInt(sub_width)) / 2 + parseInt($(n + ' .in .left').css("width"));
        } else {
            var sub_left = (parseInt(in_width) - parseInt(sub_width)) / 2;
        }
        var sub_top = (parseInt(in_height) - parseInt(sub_height)) / 2;
        if ($(n).hasClass("left") === true && window.innerWidth > 1170) {
            var sub_left = (parseInt(in_width) - parseInt(sub_width)) / 2 + parseInt($(n + ' .in .left').css("width"));
            title_top = title_top + 17;
            sub_top = sub_top + 17;
        } else {
            var sub_left = (parseInt(in_width) - parseInt(sub_width)) / 2;
        }
        $(n + ' .in .title').css("margin-left", title_left);
        $(n + ' .in .title').css("margin-top", title_top - 7);
        $(n + ' .in .sub').css("margin-left", sub_left);
        $(n + ' .in .sub').css("margin-top", sub_top + 22);
        $(n).addClass("f");
    }

    object.setSizeExec = function(l) {
        var ss = {};
        for (var key in l) {
            ss.img_now = '.img.n' + key;
            ss.out = object.createArray(l[key]);
            $(ss.img_now + ' .loader').fadeOut();
            $(ss.img_now + ' .in').removeClass("hide");
            $(ss.img_now).attr("article-id", ss.out[2].split(" ").join(""));
            ss.title_out = object.convertStrings(ss.out[0]);
            ss.sub_out = object.convertStrings(ss.out[1]);
            if (ss.out[3] !== undefined) {
                $(ss.img_now + ' .thumb').css("background", "url(" + ss.out[3] + ")");
            }
            if (ss.out[4] !== undefined) {
                $('head').append("<style>.article-panel-type01 .panel " + ss.img_now + " .thumb:hover{background:url(" + ss.out[4] + ") !important}body.no-touch .article-panel-type01 .panel " + ss.img_now + " .thumb:hover{background:url(" + ss.out[3] + ") !important;background-position: 50% !important;background-size: cover !important;}</style>");
            }
            $(ss.img_now + ' .in .l .title').text(ss.title_out.split(":::")[0]);
            $(ss.img_now + ' .in .right-bottom').text(ss.title_out.split(":::")[1]);
            $(ss.img_now + ' .in .l .sub').text(ss.sub_out);
            object.setSize(ss.img_now);
        }
    }

    object.loadData = function(n) {
        $.ajax({
            url: "/getData?" + n,
            cache: false,
            success: function(data) {
                object.list_article = JSON.parse(data);
                object.setSizeExec(object.list_article);
            }
        });
    }

    object.setPanel = function() {
        var sp = {};
        setTimeout(function() {
            object.$panel_img.each(function(index) {
                if ($(this).hasClass("left")) {
                    sp.vector = "left";
                    sp.flg = true;
                } else if ($(this).hasClass("top")) {
                    sp.vector = "top";
                    sp.flg = true;
                }
                sp.width = parseInt($(this).css("width").split("px").join("")) - 140;
                sp.height = parseInt($(this).css("height").split("px").join("")) - 23;
                if (sp.vector === "left") {
                    $(".left-bottom", this).css("margin-top", "-23px").css("margin-left", sp.width);
                } else if (sp.vector === "top") {
                    $(".left-bottom", this).css("margin-top", 0).css("margin-left", sp.width);
                }
                if (sp.flg !== true) {
                    $(".loader", this).css("margin-top", object.numConvert(parseInt(sp.height)) - 16);
                }
            });
        }, 200);
    };

    object.init = function() {
        setTimeout(function() {
            object.setPanel();
            object.loadData(object.article_name);
            if($('body').hasClass("mobile") === true){
              $('.thumb h1').hide();
              setTimeout(function() {
                object.loadData(object.article_name);
                $('.thumb h1').fadeIn();
              }, 1350);
            }
        }, 1350);
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
            if (object.list_article !== null && object.list_article !== undefined) {
                object.setSizeExec(object.list_article);
            }
        }, 100);
    });

    $('.img.href').click(function() {
        room.position = koheishingai.$href.attr("target")
        koheishingai.$body.addClass("trn");
        setTimeout(function() {
            // koheishingai.$body.addClass("trn2");
            // setTimeout(function() {
            koheishingai.$loader.fadeIn(function() {
                // koheishingai.$body.removeClass("trn2");
                if (room.getLang() === "ja") {
                    room.ios("cooking", "準備中です");
                    setTimeout(function() {
                        koheishingai.$loader.fadeOut(function() {
                            koheishingai.$body.removeClass("trn");
                        });
                    }, 430);
                } else {
                    room.ios("cooking", "Now Preparing");
                    setTimeout(function() {
                        koheishingai.$loader.fadeOut(function() {
                            koheishingai.$body.removeClass("trn");
                        });
                    }, 430);
                }
            });
            // }, 180);
        }, 280);
    });

})();
