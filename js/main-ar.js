var Main_obj;
var Main_obj_ser;
var jCount = 0;
var Bandle_selected = 0;
var sCount = 0;
var classNames;

function goToByScroll(id) {
    // Reove "link" from the ID
    id = id.replace("link", "");
    // Scroll
    $('html,body').animate({
            scrollTop: $("#" + id).offset().top
        },
        'slow');
}

$(document).ready(function(e) {

    $('.custom-selectbox').bind("DOMSubtreeModified", function() {
        if ($(this).find("select").next().attr("class") === "parsley-errors-list filled")
            $(this).find("ul").insertAfter($(this).find("span").next());
    });


    $("#model_name_1").val(localStorage.getItem("Car"));
    $("#model_grade_1").val(localStorage.getItem("Grade"));
    $("#model_service_1").val("Package " + localStorage.getItem("Service"));
    $(".carnames").html(localStorage.getItem("Car"));
    $(".main-img-src").attr("src", localStorage.getItem("car_img"));
    $(".rate10").html(localStorage.getItem("car_price"));
    $(".win-money").html(localStorage.getItem("car_price_save"));


    $(".congrats_items").append(localStorage.getItem("package_storgaet"));

    $.ajax({
        url: "cars.json",
        processData: false,
        dataType: "json",
        type: 'GET',
        cache: false,
        success: function(data, textStatus, jqXHR) {
            Main_obj = data;
            $.each(data.cars, function(i, cars) {
                $("#dropdown_0").append('<option value="' + i + '">' + i + '</option>');
            });
        }
    });



    $(document).on('click', '.final', function(e) {
        if (($(".drag_and_get_product_items").children(".dragged").length === 0)) {
            goToByScroll("app-select");
            e.preventDefault();
            return 0;
        }

        localStorage.setItem("Car", $("#dropdown_0").val());
        localStorage.setItem("Grade", $("#dropdown_1").val());
        localStorage.setItem("Service", Bandle_selected);
        localStorage.setItem("car_img", $(".main_img").attr("src"));
        localStorage.setItem("car_price", $(".rate2").html());
        localStorage.setItem("car_price_save", $(".rate1").html());
        localStorage.setItem("package_count", $(".drag_and_get_product_items").children().length - 1);

        $(".drag_and_get_product_items li:last-child").remove();
        $(".drag_and_get_product_items .add_another").remove();

        localStorage.setItem("package_storgaet", $(".drag_and_get_product_items").html());

    });

    $(document).on('click', '.owl-item', function() {

        if ($(this).hasClass("disable"))
            return 0;

        var thiss = $(this);
        n = $(this).index();


        //if ($(this).hasClass("bandle")) {
        //var classNames_name = $(this).find('.bandle').attr("class");
        classNames = $(this).find('.bandle').attr("class").toString().split(' ');
        classNames = classNames.filter(function(e) { return e });
        var removeItem = "bandle";
        classNames = jQuery.grep(classNames, function(value) { return value != removeItem; });
        var removeItem = "disable";
        classNames = jQuery.grep(classNames, function(value) { return value != removeItem; });

        var Classnamestring = classNames + "";
        Classnamestring = Classnamestring.replace(/,/g, " ");
        //console.log(classNames);
        /*
         $.each(classNames, function (i, className) {
            console.log(className);
            if (!$(this).hasClass("bandle"+id_sx)) {
              console.log("bandle"+id_sx);
              $(this).parent().addClass("disable");
            }
         });
         */
        //   }

        //$('#myCarousel').trigger('owl.goTo', n) ;
        var totalItems = $('.owl-item').length;

        if ((n > 1) && (n < totalItems - 1)) {
            owl = $('.owl-carousel').owlCarousel();
            owl.trigger('to.owl.carousel', [n, 500]);
        }
        //   console.log(n);

        var id_sx = $(this).find('.bandle').attr("id");
        if (classNames.length === 1)
            Bandle_selected = id_sx;
        //console.log(id_sx);

        var id_bandle = $(this).find('.bandle').attr("bandle");

        //console.log(id_bandle);

        var i = 0;
        var se = 1;

        $(".drag_and_get_items").find('.bandle').each(function() {
            if (id_sx == $(this).attr("id"))
                i++;
            if ((id_sx == $(this).attr("id")) && ($(this).parent().hasClass("disable")))
                se++;
        });

        //console.log(i + " - "+se + " - "+$(".drag_and_get_product_items").children().length);



        if (($(".drag_and_get_product_items").children().length === 5) || (se == i)) {
            $(".add_another").remove();
            $(".great_choice").show();
        } else {
            $(".great_choice").hide();
        }

        if (($(".drag_and_get_product_items").children().length < 5))
            $(".drag_and_get_product_items").prepend('<li class="dragged ' + Classnamestring + '" bandle ="' + id_bandle + '" id="' + id_sx + '"><picture><img src="' + $(this).find('img').attr("src") + '" alt=""></picture><span class="text">' + $(this).find('.text').html() + '</span>' +
                '<span class="price-offers" style="display:none;"><p><em></i>You saved </em>AED <span class="rate">' + $(this).find('.price-now').html() + '</span></p></span><span class="close"></span></li>');

        //    $('.drag_and_get_product_items').find('.rate')
        var sum = 0;
        var al = 0;
        $('.drag_and_get_product_items').find('.rate').each(function() {

            sum += parseFloat($(this).text().replace(',', '')); // Or this.innerHTML, this.innerText
        });
        //console.log($(this).find('.bandle').attr("id"));
        var id_s = '#' + $(this).find('.bandle').attr("id");

        var id_ss = "." + $(this).find('.bandle').attr("id");
        //console.log(id_s);
        var pesp = $(".drag_and_get_product_items").find(id_s);
        if (pesp) {



            $('div span ').each(function() {
                //var $span = $(this);
                //console.log($(this));
                //if ($(this).attr("id") !== id_sx) {

                //console.log("bandle"+$(this).attr("id") + " - " +!$(this).hasClass("bandle"+$(this).attr("id")));



                if (classNames.length === 1) {
                    if (!$(this).hasClass("bandle" + id_sx)) {
                        // console.log("bandle"+id_sx);
                        $(this).parent().addClass("disable");
                    }
                } else {
                    if (classNames.length === 2) {
                        if (!($(this).hasClass(classNames[0]) || $(this).hasClass(classNames[1]))) {
                            $(this).parent().addClass("disable");
                        }
                    }
                    if (classNames.length === 3) {
                        if (!($(this).hasClass(classNames[0]) || $(this).hasClass(classNames[1]) || $(this).hasClass(classNames[2]))) {
                            //  console.log($(this).hasClass(classNames[1]));
                            $(this).parent().addClass("disable");
                        }
                    }

                }



                //        console.log(id_bandle);
                if ($(this).attr("bandle") == id_bandle) {
                    $(this).parent().addClass("disable");
                }

            });

        }

        al = parseFloat($('.drag_and_get_product_items').find('.rate1').text().replace(',', '')) - sum;
        $('.drag_and_get_product_items').find('.rate1').text(sum.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.00', ''));


    });

    $(document).on('touchstart click', '.dragged .close', function() {

        var id_sp = $(this).parent().attr("id");
        var id_bandle = $(this).parent().attr("bandle");

        //        console.log(id_sp + "- " + id_bandle);
        $(this).parent().addClass("Closeds");
        classNames = $(this).parent().attr("class").toString().split(' ');
        classNames = classNames.filter(function(e) { return e });
        var removeItem = "dragged";
        classNames = jQuery.grep(classNames, function(value) { return value != removeItem; });
        var removeItem = "disable";
        classNames = jQuery.grep(classNames, function(value) { return value != removeItem; });

        var enable_other = 0;
        var classNames_doged = [];
        $('div span').each(function() {

            if ($(".drag_and_get_product_items").children(".dragged").length == 1) {
                $(this).parent().removeClass("disable");
            }


            if (classNames.length === 2) {

                var i = 0;
                $('.drag_and_get_product_items li').each(function() {

                    if (!$(this).hasClass("Closeds")) {


                        classNames_doged[i] = $(this).attr("class").toString().split(' ');
                        var removeItem = "dragged";
                        classNames_doged[i] = jQuery.grep(classNames_doged[i], function(value) { return value != removeItem; });
                        var removeItem = "disable";
                        classNames_doged[i] = jQuery.grep(classNames_doged[i], function(value) { return value != removeItem; });
                        var removeItem = "add_another";
                        classNames_doged[i] = jQuery.grep(classNames_doged[i], function(value) { return value != removeItem; });
                        classNames_doged[i] = classNames_doged[i].filter(function(e) { return e });
                        i++;
                    }
                });
                //console.log(classNames_doged);
                var s_count = 0;
                var result = 0;
                for (var s1 = 0; s1 < i; s1++) {
                    if (classNames_doged[s1].length == 1)
                        s_count++;
                }

                if (s_count == 0) {
                    if (!($(this).hasClass(classNames[0]) || $(this).hasClass(classNames[1]))) {
                        $(this).parent().removeClass("disable");
                    }
                }
                console.log(s_count);


            } else {
                if (classNames.length === 3) {
                    if (!($(this).hasClass(classNames[0]) || $(this).hasClass(classNames[1]))) {
                        $(this).parent().removeClass("disable");
                    }
                }


            }

            //console.log(enable_other);
            //console.log( $(this).attr("bandle") + " - "+ id_bandle);
            if ($(this).attr("bandle") == id_bandle) {
                $(this).parent().removeClass("disable");
            }

        });

        $(this).parent().remove();
        if (!$(".add_another").length) {
            $('.drag_and_get_product_items').find(' > li:nth-last-child(1)').before('<li class="add_another"><picture><img src="../img/icons/arrow-top-icon.png" alt=""></picture><span class="text">اختر عرضاً</span></li>');
            $(".great_choice").hide();
        }

        var sums = 0;
        var al = 0;

        $('.drag_and_get_product_items').find('.rate').each(function() {
            //                 alert($(this).html());
            sums += parseFloat($(this).text().replace(',', '')); // Or this.innerHTML, this.innerText
        });
        var total = parseFloat($('.price-offers').find('.rate2').text().replace(',', ''));

        ala = parseFloat($('.price-offers').find('.rate2').text().replace(',', '')) - sums;


        $('.drag_and_get_product_items').find('.rate1').text(sums.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.00', ''));




    });


});


// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery code in here.

function HideResize() {
    var width = $(window).width();
    // console.log(width);
    if (width <= 768) {
        $(function() {

            $(".sitemaps")
                .accordion({
                    header: "> div > h2",
                    collapsible: true,
                    active: false
                })
        });
    } else if (width > 768) {

        /*$( function() {

           $( "#accordion" )
                .accordion("disable");
        } );*/
    }

}

jQuery(document).ready(function() {
    HideResize();
    $(window).resize(function() {
        HideResize();
    });

    $("#dropdown_2").change(function() {
        if ($(this).val() !== null)
            $('#dropdown_2').next().text($(this).val());
    });

    $("#dropdown_3").change(function() {
        if ($(this).val() !== null)
            $('#dropdown_3').next().text($(this).val());
    });

    $("#dropdown_0").change(function() {
        // $(this).next("#dropdown_0").text($(this).val());
        if ($(this).val() !== null) {
            $('#dropdown_0').next().text($(this).val());
            $(".car-name").html($(this).val());


            $(".add_another").remove();
            $(".dragged").remove();


            $('.drag_and_get_product_items').find(' > li:nth-last-child(1)').before('<li class="add_another"><picture><img src="../img/icons/arrow-top-icon.png" alt=""></picture><span class="text">اختر عرضاً</span></li>');
            $(".great_choice").hide();

            $(".main_img1").hide();
            $("#dropdown_1").empty();
            //console.log(Main_obj.cars[$(this).val()].picture);
            $(".main_img").attr("src", Main_obj.cars[$(this).val()].picture);
            $(".price-offers").show();

            $(".pricing").hide();
            $(".price-offers2").show();
            $('html, body').animate({
                scrollTop: ($(window).scrollTop() + 100) + 'px'
            }, 300);

            $("#dropdown_1").append('<option selected="selected" disabled="disabled" value="">اختر الطراز</option>');
            $('#dropdown_1').next().text("اختر الطراز");
            $.each(Main_obj.cars[$(this).val()].grade, function(i, cars) {
                $("#dropdown_1").append('<option value="' + i + '">' + i + '</option>');

            });
        }
    }).change();

    $("#dropdown_1").change(function() {
        // $(this).next("#dropdown_0").text($(this).val());
        if ($(this).val() !== null) {

            //console.log("remove");

            $(".add_another").remove();
            $(".dragged").remove();


            $('.drag_and_get_product_items').find(' > li:nth-last-child(1)').before('<li class="add_another"><picture><img src="../img/icons/arrow-top-icon.png" alt=""></picture><span class="text">اختر عرضاً</span></li>');

            $(".app-select").show();

            $('#dropdown_1').next().text($(this).val());
            //console.log(Main_obj.cars[$("#dropdown_0").val()].grade[$("#dropdown_1").val()]);
            $(".rate1").html("0");
            $(".rate2").html(Main_obj.cars[$("#dropdown_0").val()].grade[$("#dropdown_1").val()].price);
            $(".pricing").show();

            //$('html, body').animate({scrollTop: ($(window).scrollTop() + 300) + 'px'}, 300);

            var totalItems = $('.owl-item').length;
            var $carousel = $(".owl-carousel");
            for (var i = 0; i < totalItems; i++) {
                $carousel.trigger('remove.owl.carousel', 0);
            }
            goToByScroll("app-select");

            $.ajax({
                url: "service.json",
                processData: false,
                dataType: "json",
                type: 'GET',
                cache: false,
                success: function(data, textStatus, jqXHR) {
                    Main_obj_ser = data;
                    cars = data[$("#dropdown_0").val()];

                    var bandle = 1;
                    var service = 1;
                    var total_count = 0;

                    var service = [];
                    var service_count = [];
                    var service_count_added = [];

                    for (var i = 1; i < 4; i++) {
                        for (var j = 1; j < 5; j++) {
                            if (cars[$("#dropdown_1").val()]["bandle" + i]["service" + j] !== undefined)
                                if (cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].logo !== undefined) {
                                    if (service[cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].name] == undefined) {
                                        service[cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].name] = "";
                                        service_count[cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].name] = 1;
                                    }
                                    service[cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].name] += "bandle" + i + " ";
                                    service_count[cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].name]++;
                                }
                        }
                    }

                    //      console.log(service);

                    for (var i = 1; i < 4; i++) {
                        for (var j = 1; j < 5; j++) {
                            total_count++;
                            if (cars[$("#dropdown_1").val()]["bandle" + i]["service" + j] !== undefined)
                                if (cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].logo !== undefined)
                                //if (service_count[cars[$("#dropdown_1").val()]["bandle"+i]["service"+j].name] )
                                {

                                    if (service_count_added[cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].name] !== 1)
                                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ' + service[cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].name] + ' " bandle="' + total_count + '" id="' + i + '"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].price + '</span><picture><img src="../img/offers-ar/' + cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].name + '</span></span>')]).trigger('refresh.owl.carousel');
                                    service_count_added[cars[$("#dropdown_1").val()]["bandle" + i]["service" + j].name] = 1;

                                }

                        }
                    }


                    //                                  console.log(service_count_added);
                    /*
                    if (cars[$("#dropdown_1").val()].bandle1.service1.logo !== undefined)
                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ss1" bandle="1" id="1"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()].bandle1.service1.price + '</span><picture><img src="../img/offers/' + cars[$("#dropdown_1").val()].bandle1.service1.logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()].bandle1.service1.name + '</span></span>')]).trigger('refresh.owl.carousel');
                    if (cars[$("#dropdown_1").val()].bandle1.service2.logo !== undefined)
                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ss1" bandle="2" id="1"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()].bandle1.service2.price + '</span><picture><img src="../img/offers/' + cars[$("#dropdown_1").val()].bandle1.service2.logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()].bandle1.service2.name + '</span></span>')]).trigger('refresh.owl.carousel');
                    if (cars[$("#dropdown_1").val()].bandle1.service3.logo !== undefined)
                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ss1" bandle="3" id="1"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()].bandle1.service3.price + '</span><picture><img src="../img/offers/' + cars[$("#dropdown_1").val()].bandle1.service3.logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()].bandle1.service3.name + '</span></span>')]).trigger('refresh.owl.carousel');
                    if (cars[$("#dropdown_1").val()].bandle1.service4.logo !== undefined)
                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ss1" bandle="4" id="1"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()].bandle1.service4.price + '</span><picture><img src="../img/offers/' + cars[$("#dropdown_1").val()].bandle1.service4.logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()].bandle1.service4.name + '</span></span>')]).trigger('refresh.owl.carousel');
                    if (cars[$("#dropdown_1").val()].bandle2.service1.logo !== undefined)
                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ss2" bandle="5" id="2"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()].bandle2.service1.price + '</span><picture><img src="../img/offers/' + cars[$("#dropdown_1").val()].bandle2.service1.logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()].bandle2.service1.name + '</span></span>')]).trigger('refresh.owl.carousel');
                    if (cars[$("#dropdown_1").val()].bandle2.service2.logo !== undefined)
                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ss2" bandle="6" id="2"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()].bandle2.service2.price + '</span><picture><img src="../img/offers/' + cars[$("#dropdown_1").val()].bandle2.service2.logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()].bandle2.service2.name + '</span></span>')]).trigger('refresh.owl.carousel');
                    if (cars[$("#dropdown_1").val()].bandle2.service3.logo !== undefined)
                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ss2" bandle="7" id="2"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()].bandle2.service3.price + '</span><picture><img src="../img/offers/' + cars[$("#dropdown_1").val()].bandle2.service3.logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()].bandle2.service3.name + '</span></span>')]).trigger('refresh.owl.carousel');
                    if (cars[$("#dropdown_1").val()].bandle3.service1.logo !== undefined)
                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ss3" bandle="8" id="3"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()].bandle3.service1.price + '</span><picture><img src="../img/offers/' + cars[$("#dropdown_1").val()].bandle3.service1.logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()].bandle3.service1.name + '</span></span>')]).trigger('refresh.owl.carousel');
                    if (cars[$("#dropdown_1").val()].bandle3.service2.logo !== undefined)
                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ss3" bandle="9" id="3"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()].bandle3.service2.price + '</span><picture><img src="../img/offers/' + cars[$("#dropdown_1").val()].bandle3.service2.logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()].bandle3.service2.name + '</span></span>')]).trigger('refresh.owl.carousel');
                    if (cars[$("#dropdown_1").val()].bandle3.service3.logo !== undefined)
                        $carousel.trigger('add.owl.carousel', [jQuery('<span class="bandle ss3" bandle="10" id="3"><span class="price-now" style="display:none;">' + cars[$("#dropdown_1").val()].bandle3.service3.price + '</span><picture><img src="../img/offers/' + cars[$("#dropdown_1").val()].bandle3.service3.logo + '" alt=""></picture><span class="text">' + cars[$("#dropdown_1").val()].bandle3.service3.name + '</span></span>')]).trigger('refresh.owl.carousel');
                    //  });
                    */
                }
            });



        }
    }).change();

    /*$('#dropdown_0').on('change',function () {
        var val = $(this).val();
       console.log(val);
      var el = $(this).closest('span',$(this));
        console.log(el);

    });*/

    $('.owl-carousel').owlCarousel({
        // responsiveClass: true,
        autoPlay: true,
        itemElement: 'li',
        stageElement: 'ul',
        rtl: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            320: {
                items: 2,
                nav: true,
                margin: 0
            },
            480: {
                items: 2,
                nav: true,
                margin: 0
            },
            768: {
                items: 4,
                nav: true,
                margin: 0
            },
            1000: {
                items: 5,
                nav: true,
                margin: 0
            }
        }
    });

    $(".owl-prev").html('<i class="fa fa-chevron-right"></i>');
    $(".owl-next").html('<i class="fa fa-chevron-left"></i>');


    // fadeandscale

    $('#fadeandscale').popup({
        pagecontainer: '.container',
        transition: 'all 0.3s'
    });

    //close btn
    $('#gif_loader').on('click tap', function() {
        $(this).remove();
    });

}); // (document).ready()