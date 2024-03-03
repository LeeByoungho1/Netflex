// 현재 섹션 인덱스 및 섹션과 비디오 요소들을 초기화
var currentSectionIndex = 0;
var sections = document.querySelectorAll('.section');

// 스크롤 이동 중 여부를 나타내는 변수
let isScrolling = false;

let videoArr = ["https://sll-web.s3.ap-northeast-2.amazonaws.com/SLL+web+1-1018.mp4", "https://sll-web.s3.ap-northeast-2.amazonaws.com/SLL+web+2.mp4", "https://sll-web.s3.ap-northeast-2.amazonaws.com/SLL+web+3-1018.mp4", "https://sll-web.s3.ap-northeast-2.amazonaws.com/SLL+web+4-1018.mp4"]

// 스크롤 이벤트 처리 함수
function handleScroll(event) {
    if (isScrolling) {
        return;
    }

    // 스크롤의 방향을 나타내는 deltaY 값 가져오기
    var deltaY = event.deltaY;

    // 아래로 스크롤하는 경우
    if (deltaY > 0) {
        currentSectionIndex++;
    }
    // 위로 스크롤하는 경우
    else if (deltaY < 0) {
        currentSectionIndex--;
    }

    // 현재 섹션 인덱스를 배열 범위 내로 제한
    currentSectionIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));

    // 스크롤 이동 중 플래그를 활성화
    isScrolling = true;

    // 현재 섹션의 위치로 부드러운 스크롤 이동
    sections[currentSectionIndex].scrollIntoView({
        // behavior: 'auto'
        behavior: 'smooth'
        // behavior: 'instant'
    });

    setTimeout(function () {
        isScrolling = false;
    }, 1000)

    // 사이드바
    if (currentSectionIndex == 0) {
        $(".sideBar").css({ opacity: 0, transition: "opacity 0s ease" })
    }

    if (currentSectionIndex < 5) {
        $(".sideBar .sideBarBox div").css({ height: currentSectionIndex * 25 + "%" })
        $(".sideBar #num").text("0" + currentSectionIndex)
    }

    if (currentSectionIndex > 0) {
        $(".sideBar").css({ opacity: 1, transition: "opacity 3s ease" })
    }

    // 사이드바
    if (currentSectionIndex > 2) {
        $(".nav #logo").attr("src", "./img/logo3.png")
    } else {
        $(".nav #logo").attr("src", "./img/logo2.png")
    }
}

// 스크롤 이벤트 리스너 추가
document.body.addEventListener('wheel', handleScroll);

var videoControl = true
var videoIndex = 0

$(".contentBox").on("click", function () {
    videoIndex = $(this).index()
    $(".contentBox").children("#bg").css({ opacity: 0 })
    $(this).children("#bg").css({ opacity: 0.7 })

    // $(".contentBox #box").css({ top: "55%" })
    // $(this).children("#box").css({ top: "50%" })

    for (var i = 0; i < 4; i++) {
        $(".contentBox").eq(i).children("#box").children("img").attr("src", `./img/icon/icon${i}1.png`)
    }
    $(this).children("#box").children("img").attr("src", `./img/icon/icon${videoIndex}0.png`)

    if (videoControl) {
        $(".section #v2").css({ opacity: 0 })
        $(".section #v1").attr("src", videoArr[videoIndex]);
        videoControl = false
    } else {
        $(".section #v2").attr("src", videoArr[videoIndex]);
        $(".section #v2").css({ opacity: 1 })
        videoControl = true
    }
})

$(".contentBox").eq(0).trigger('click');

var movieIndex = 4
var movieLeft = ["-33%", "-13%", "7%", "27%", "50%", "73%", "92.5%", "120%"]
var id = ""

$(".movieNav #prev, .movieNav #next").on("click", function (e) {
    id = e.target.id;
    var movieBoxes = $(".movieBox");

    if (id == "next") {
        movieLeft.unshift(movieLeft.pop());
    } else {
        movieLeft.push(movieLeft.shift());
    }

    for (var i = 0; i < 8; i++) {

        if (movieLeft[i] == "50%") {
            var altValue = movieBoxes.eq(i).find("img").attr("alt")
            var bgUrl = "./img/" + altValue + "bg.png";
            var titleUrl = "./img/" + altValue + "txt.png";
            $(".movieBg").css({ "background-image": `url(${bgUrl})` });
            $(".movieBox h3").css({ "opacity": "0.3" });
            $("#movieTitle").attr("src", titleUrl);

            movieBoxes.eq(i).children("h3").css({ "opacity": "1" })
            movieBoxes.eq(i).css({ width: "22%", "box-shadow": "0 12px 30px 6px rgba(0,0,0,0.4)" }).children("div").css({ opacity: 0 });
        } else {
            movieBoxes.eq(i).css({ width: "15%", "box-shadow": "0 10px 22px 4px rgba(0,0,0,0.3)" }).children("div").css({ opacity: 0.7 });
        }

        if (movieLeft[i] == "-33%" || movieLeft[i] == "120%") {
            movieBoxes.eq(i).css({ opacity: 0 });
        } else {
            movieBoxes.eq(i).css({ opacity: 1 });
        }

        movieBoxes.eq(i).css({ left: movieLeft[i] });
    }

});

$("#prev").trigger('click');

// main 애니메이션
let h1Num = 0;
document.querySelectorAll('.main h1').forEach((el) => {
    // 각 엘리먼트의 animation-delay를 0.5, 1.0, 1.5 ~ 차례로 준다.
    el.style.setProperty('animation-delay', `${h1Num}s`);
    h1Num += 0.5;
})

let pNum = 0;
document.querySelectorAll('.main #p1 p').forEach((el) => {
    // 각 엘리먼트의 animation-delay를 0.5, 1.0, 1.5 ~ 차례로 준다.
    el.style.setProperty('animation-delay', `${pNum}s`);
    pNum += 0.2;
})
document.querySelectorAll('.main #p2 p').forEach((el) => {
    // 각 엘리먼트의 animation-delay를 0.5, 1.0, 1.5 ~ 차례로 준다.
    el.style.setProperty('animation-delay', `${pNum}s`);
    pNum += 0.2;
})

// 마우스 커서
document.addEventListener('mousemove', (e) => {
    let mouseX = e.pageX;
    let mouseY = e.pageY;

    let cursor = document.querySelector('.cursor');
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

$(".main .txtOut").on("mouseover", function (e) {
    $(".cursor").css({ width: "3vw", height: "3vw" })
}).on("mouseleave", function () {
    $(".cursor").css({ width: "1vw", height: "1vw" })
})

$(".main .txtOut").hover(
    function () {
        // Mouseover event
        $(this).removeClass("txtOut").addClass("txtOver");
    },
    function () {
        // Mouseout event
        $(this).removeClass("txtOver").addClass("txtOut");
    }
);
