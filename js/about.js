// 마우스 커서
document.addEventListener('mousemove', (e) => {
    let mouseX = e.pageX;
    let mouseY = e.pageY;

    let cursor = document.querySelector('.cursor');
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

$(".nav .navArea #about").on("click", function () {
    $("body").css({ overflow: "visible" })
})

$(".nav #logo").on("click", function () {
    $("body").css({ overflow: "hidden" })
})

var count = true
$(window).on("scroll", function (e) {
    var scroll = $(this).scrollTop()
    var about = $(".about").height() + 100
    var one = $(".one").height()
    var two = $(".two").height()

    if (scroll < about) {
        $(".nav #logo").attr("src", "./img/logo2.png")
        $(".nav a").css({ color: "#fff" })
    } else if (scroll < about + one) {
        $(".nav #logo").attr("src", "./img/logo3.png")
        $(".nav a").css({ color: "#fff" })
    } else if (scroll < about + one + two) {
        $(".nav #logo").attr("src", "./img/logo2.png")
        $(".nav a").css({ color: "#000" })
    }

    if (scroll < about + one - 200) {
        if (count) {
            $('.number-counter').countTo();
            count = false
        }
    }
})

// main 애니메이션
let h1Num = 0;
document.querySelectorAll('.about #animate1').forEach((el) => {
    // 각 엘리먼트의 animation-delay를 0.5, 1.0, 1.5 ~ 차례로 준다.
    el.style.setProperty('animation-delay', `${h1Num}s`);
    h1Num += 0.5;
})


    (function ($) {
        $.fn.countTo = function (options) {
            return this.each(function () {
                //-- Arrange
                var FRAME_RATE = 60;
                var $el = $(this);
                var countFrom = parseInt($el.attr('data-count-from'));
                var countTo = parseInt($el.attr('data-count-to'));
                var countSpeed = $el.attr('data-count-speed');
                var divideBy100 = $el.hasClass('divide-by-100');

                //-- Action
                var rafId;
                var increment;
                var currentCount = countFrom;
                var countAction = function () {
                    if (currentCount < countTo) {
                        // Perform number increment
                        var displayedValue = divideBy100 ? Math.floor(currentCount) / 100 : Math.floor(currentCount);
                        $el.text(displayedValue.toFixed(divideBy100 ? 2 : 0));  // Display with two decimal places for divide-by-100

                        increment = countSpeed / FRAME_RATE;
                        currentCount += increment;
                        rafId = requestAnimationFrame(countAction);
                    } else {
                        // Terminate animation once it reaches the target count number
                        var finalValue = divideBy100 ? countTo / 100 : countTo;
                        $el.text(finalValue.toFixed(divideBy100 ? 2 : 0));
                    }
                };

                rafId = requestAnimationFrame(countAction);
            });
        };
    }(jQuery));


