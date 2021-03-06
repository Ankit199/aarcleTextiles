jQuery(document).ready(function () {
  "use strict";
  jQuery(window).on("load", function () {
    $('.scrolling  a[href*="#"]').on("click", function (e) {
      e.preventDefault(), e.stopPropagation();
      var o = $(this).attr("href");
      $(o).velocity("scroll", {
        duration: 800,
        offset: -50,
        easing: "easeOutExpo",
        mobileHA: !1,
      });
    }),
      $(".body-wrapper").each(function () {
        var e = $(".header"),
          o = e.children(".navbar"),
          a = (o.find(".navbar-header"), o.find(".navbar-collapse")),
          s = { nav_top: a.css("margin-top") };
        $(window).scroll(function () {
          o.hasClass("bb-fixed-header") &&
          (0 === $(this).scrollTop() || $(this).width() < 750)
            ? (o.removeClass("bb-fixed-header").appendTo(e),
              a.animate(
                { "margin-top": s.nav_top },
                {
                  duration: 100,
                  queue: !1,
                  complete: function () {
                    e.css("height", "auto");
                  },
                }
              ))
            : !o.hasClass("bb-fixed-header") &&
              $(this).width() > 750 &&
              $(this).scrollTop() >
                e.offset().top +
                  e.height() -
                  parseInt($("html").css("margin-top"), 10) &&
              (e.css("height", e.height()),
              o.css({ opacity: "0" }).addClass("bb-fixed-header"),
              o.appendTo($("body")).animate({ opacity: 1 }),
              a.css({ "margin-top": "0px" }));
        });
      }),
      $(window).trigger("resize"),
      $(window).trigger("scroll");
  });
}),
  $(".navbar").width() > 750 &&
    ($(".nav .dropdown").on("mouseover", function () {
      "use strict";
      $(this).addClass("show");
    }),
    $(".nav .dropdown").on("mouseleave", function () {
      "use strict";
      $(this).removeClass("show");
    })),
  $(".nav-category .dropdown-submenu ").hover(
    function () {
      "use strict";
      $(this).addClass("show");
    },
    function () {
      "use strict";
      $(this).removeClass("show");
    }
  ),
  jQuery(document).ready(function () {
    "use strict";
    $(".searchBox a").on("click", function () {
      $(".searchBox .dropdown-menu").toggleClass("display-block"),
        $(".searchBox a i").toggleClass("fa-close").toggleClass("fa-search");
    }),
      $("#searchButton").on("click", function (e) {
        e.preventDefault(), $("#searchbox").toggleClass("visibleIt");
      });
  }),
//   jQuery(document).ready(function () {
//     "use strict";
//     jQuery(".bannerV1 .fullscreenbanner").revolution({
//       delay: 5e3,
//       responsiveLevels: [1400, 1366, 992, 480],
//       startwidth: 1170,
//       startheight: 526,
//       fullWidth: "on",
//       fullScreen: "off",
//       hideCaptionAtLimit: "",
//       dottedOverlay: "twoxtwo",
//       navigationStyle: "preview4",
//       fullScreenOffsetContainer: "",
//       hideTimerBar: "on",
//     }),
//       jQuery(".bannerV4 .fullscreenbanner").revolution({
//         delay: 5e3,
//         startwidth: 835,
//         startheight: 470,
//         fullWidth: "off",
//         fullScreen: "off",
//         hideCaptionAtLimit: "",
//         dottedOverlay: "twoxtwo",
//         navigationStyle: "preview4",
//         fullScreenOffsetContainer: "",
//         hideTimerBar: "on",
//         onHoverStop: "on",
//       });
//   }),
  jQuery(document).ready(function () {
    "use strict";
    $(".featuredProductsSlider").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: !0,
      autoplay: !0,
      infinite: !0,
      dots: !1,
      autoplaySpeed: 2e3,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 } },
        { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    }),
      $(".partnersLogoSlider").slick({
        autoplay: !0,
        autoplaySpeed: 2e3,
        dots: !1,
        arrows: !1,
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: !0,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 4 } },
          { breakpoint: 992, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } },
          { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        ],
      }),
      $(".featuredCollectionSlider").slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: !0,
        autoplay: !1,
        infinite: !0,
        dots: !1,
        autoplaySpeed: 4e3,
        responsive: [
          { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
      }),
      $(".dealSlider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: !0,
        autoplay: !1,
        infinite: !0,
        dots: !1,
        autoplaySpeed: 3e3,
        responsive: [
          { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
      }),
      $(".testimonialSlider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !0,
        autoplay: !1,
        infinite: !0,
        dots: !1,
        autoplaySpeed: 5e3,
        responsive: [
          { breakpoint: 480, settings: { autoplay: !0, arrows: !1 } },
        ],
      }),
      $(".categorySlider").slick({ dots: !1, speed: 1e3, arrows: !0 }),
      $(".testimoni-carousel").slick({
        arrows: !1,
        autoplay: !0,
        infinite: !0,
        dots: !1,
        autoplaySpeed: 3e3,
      }),
      $(".productGallery").slick({
        arrows: !0,
        autoplay: !0,
        infinite: !0,
        dots: !1,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplaySpeed: 3e3,
        responsive: [
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { arrows: !1, slidesToShow: 1 } },
        ],
      }),
      $("#simple_timer").syotimer({
        year: 2018,
        month: 5,
        day: 9,
        hour: 20,
        minute: 30,
      }),
      $(".slider_timer").syotimer({
        year: 2018,
        month: 10,
        day: 9,
        hour: 20,
        minute: 30,
      }),
      $("[data-toast]").on("click", function () {
        var e = $(this),
          o = e.data("toast-type"),
          a = e.data("toast-icon"),
          s = (e.data("toast-position"), e.data("toast-title")),
          i = e.data("toast-message"),
          t = {
            class: "iziToast-" + o || "",
            title: s || "Title",
            message: i || "toast message",
            animateInside: !1,
            position: "topRight",
            progressBar: !1,
            icon: a,
            timeout: 3200,
            transitionIn: "fadeInLeft",
            transitionOut: "fadeOut",
            transitionInMobile: "fadeIn",
            transitionOutMobile: "fadeOut",
          };
        iziToast.show(t);
      }),
      $(".btn-wishlist").on("click", function () {
        var e = $(this).data("iteration") || 1,
          o = {
            title: "Product",
            animateInside: !1,
            position: "topRight",
            progressBar: !1,
            timeout: 3200,
            transitionIn: "fadeInLeft",
            transitionOut: "fadeOut",
            transitionInMobile: "fadeIn",
            transitionOutMobile: "fadeOut",
          };
        switch (e) {
          case 1:
            $(this).addClass("active"),
              (o.class = "iziToast-info"),
              (o.message = "added to your wishlist!"),
              (o.icon = "icon-bell");
            break;
          case 2:
            $(this).removeClass("active"),
              (o.class = "iziToast-danger"),
              (o.message = "removed from your wishlist!"),
              (o.icon = "icon-ban");
        }
        iziToast.show(o), e++, e > 2 && (e = 1), $(this).data("iteration", e);
      }),
      $(".select-drop").selectbox(),
      $(".incr-btn").on("click", function (e) {
        var o = $(this),
          a = 0,
          s = o.parent().find(".quantity").val();
        o
          .parent()
          .find('.incr-btn[data-action="decrease"]')
          .removeClass("inactive"),
          "increase" === o.data("action")
            ? (a = parseFloat(s) + 1)
            : s > 1
            ? (a = parseFloat(s) - 1)
            : ((a = 1), o.addClass("inactive")),
          o.parent().find(".quantity").val(a),
          e.preventDefault();
      });
    $("#price-range").slider({
      range: !0,
      min: 20,
      max: 300,
      values: [20, 300],
      slide: function (e, o) {
        $("#price-amount-1").val("$" + o.values[0]),
          $("#price-amount-2").val("$" + o.values[1]);
      },
    }),
      $("#price-amount-1").val("$" + $("#price-range").slider("values", 0)),
      $("#price-amount-2").val("$" + $("#price-range").slider("values", 1)),
      (function (e) {
        e("#thumbcarousel").carousel(0);
        var o = e("#thumbcarousel .item");
        e("#carousel").on("slide.bs.carousel", function (a) {
          var s = e(a.relatedTarget),
            i = s.data("thumb"),
            t = o.index(o.filter(".active").get(0));
          t > i
            ? (e("#thumbcarousel").one("slid.bs.carousel", function (o) {
                e("#thumbcarousel").carousel(i);
              }),
              t === o.length - 1
                ? e("#thumbcarousel").carousel("next")
                : e("#thumbcarousel").carousel(numThumbItems - 1))
            : e("#thumbcarousel").carousel(i);
        });
      })(jQuery),
      $(".quick-view .btn-block").click(function () {
        $(".quick-view").modal("hide");
      }),
      $(".video-box i").on("click", function () {
        var e =
          '<iframe class="embed-responsive-item"  allowfullscreen src="' +
          $(this).attr("data-video") +
          '"></iframe>';
        $(this).replaceWith(e);
      });
    var e = $("#faqAccordion .panel-heading i.fa");
    $("#faqAccordion .panel-heading").click(function () {
      e.removeClass("fa-chevron-down").addClass("fa-chevron-up"),
        $(this)
          .find("i.fa")
          .removeClass("fa-chevron-up")
          .addClass("fa-chevron-down");
    });
    var o = $("#accordionOne .panel-heading i.fa");
    $("#accordionOne .panel-heading").click(function () {
      o.removeClass("fa-chevron-down").addClass("fa-chevron-up"),
        $(this)
          .find("i.fa")
          .removeClass("fa-chevron-up")
          .addClass("fa-chevron-down");
    });
    var a = $("#accordionTwo .panel-heading i.fa");
    $("#accordionTwo .panel-heading").click(function () {
      a.removeClass("fa-chevron-down").addClass("fa-chevron-up"),
        $(this)
          .find("i.fa")
          .removeClass("fa-chevron-up")
          .addClass("fa-chevron-down");
    });
    var s = $("#togglesOne .panel-heading i.fa");
    $("#togglesOne .panel-heading").click(function () {
      s.removeClass("fa-chevron-down").addClass("fa-chevron-up"),
        $(this)
          .find("i.fa")
          .removeClass("fa-chevron-up")
          .addClass("fa-chevron-down");
    });
    var i = $("#togglesTwo .panel-heading i.fa");
    $("#togglesTwo .panel-heading").click(function () {
      i.removeClass("fa-chevron-down").addClass("fa-chevron-up"),
        $(this)
          .find("i.fa")
          .removeClass("fa-chevron-up")
          .addClass("fa-chevron-down");
    }),
      $('[data-toggle="tooltip"]').tooltip();
  });
(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  "script",
  "https://www.google-analytics.com/analytics.js",
  "ga"
);
ga("create", "UA-71155940-3", "auto");
ga("send", "pageview");
(function (w, i, d, g, e, t, s) {
  w[d] = w[d] || [];
  t = i.createElement(g);
  t.async = 1;
  t.src = e;
  s = i.getElementsByTagName(g)[0];
  s.parentNode.insertBefore(t, s);
})(
  window,
  document,
  "_gscq",
  "script",
  "//widgets.getsitecontrol.com/46851/script.js"
);
