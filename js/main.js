// new fullpage("#fullpage", {
//     //options here
//     autoScrolling: true,
//     scrollHorizontally: true,
//     // scrollBar: true,
// });
// window.onresize = function () {
//     window.scrollTo(0, 0);
//     setTimeout(() => {
//         document.location.reload();
//         console.log("Main1Top", Main1Top);
//     }, 1000);
// };

const elMain = document.querySelector(".main");
const elNavbar = document.querySelector(".header_bar");
const elContentBox = document.querySelector(".content_inner");
const scroll = window.scrollY; //스크롤값

const elSection = document.querySelectorAll("section.section");
const elSectionCount = elSection.length;

const ContentOffset = document.querySelector(".content_inner").offsetTop;

elSection.forEach(function (item, index) {
    item.addEventListener("wheel", function (event) {
        event.preventDefault();
        let delta = 0;

        if (!event) event = window.event;
        if (event.wheelDelta) {
            delta = event.wheelDelta / 90;
            if (window.opera) delta = -delta;
        } else if (event.detail) delta = -event.detail / 3;

        let moveTop = window.scrollY;
        let elSectionSelector = elSection[index];
        let elSectionNext = elSection[index + 1];
        let elSectionPrev = elSection[index - 1];
        // console.log(moveTop);

        // wheel down : move to next section
        if (delta < 0) {
            if (elSectionSelector !== elSectionCount - 1) {
                try {
                    moveTop =
                        window.pageYOffset +
                        elSectionNext.getBoundingClientRect().top;
                    // console.log(elSectionNext);
                } catch (e) {}
            }
            // if (moveTop > ContentOffset) {
            //     elNavbar.style.position = "fixed";
            // }
            // if (moveTop < ContentOffset) {
            //     setTimeout(() => {
            //         elNavbar.style.position = "absolute";
            //     }, 200);
            // }
        }

        // wheel up : move to previous section
        else {
            if (elSectionSelector !== 0) {
                try {
                    moveTop =
                        window.pageYOffset +
                        elSectionPrev.getBoundingClientRect().top;
                    // console.log(elSectionPrev);
                    // console.log("떨어진 거리", ContentOffset);
                    // console.log("스크롤값", window.scrollY);
                } catch (e) {}
            }
            // if (moveTop < ContentOffset) {
            //     setTimeout(() => {
            //         elNavbar.style.position = "absolute";
            //     }, 500);
            // }
            // if (moveTop < 100) {
            //     elNavbar.style.position = "absolute";
            // }
        }

        // console.log("떨어진 거리", ContentOffset);
        // console.log("스크롤값", moveTop);

        const body = document.querySelector("html");
        window.scrollTo({ top: moveTop, left: 0, behavior: "smooth" });
    });

    $(window).on("scroll", function (event) {});
});

// window.onscroll = function () {
//     let pos = { y: 0, oy: 0, status: true };

//     pos.y = window.scrollY; //현재 스크롤값
//     pos.status = pos.y > pos.oy; // true일 경우, 아래로 스크롤 되고 있는 중
//     pos.oy = pos.y; //이전 스크롤값
//     if ((pos.y = ContentOffset * 0.7)) {
//         setTimeout(() => {
//             elNavbar.style.position = "fixed";
//         }, 500);
//     } else if (pos.y < ContentOffset) {
//         elNavbar.style.position = "absolute";
//     }
//     if ((pos.status = true)) {
//     }

//     console.log("pos.y 값", pos.y);
//     console.log("offset 값", ContentOffset);
// };

// window.onscroll = () => {
//     if (scroll > elMain.offsetTop) {
//         console.log("작동");
//     }
// };

//navbar

let Main1Top = $(".main1").offset().top;
let Main2Top = $(".main2").offset().top;
let Main3Top = $(".main3").offset().top;
window.onresize = () => {
    Main1Top = $(".main1").offset().top;
    Main2Top = $(".main2").offset().top;
    Main3Top = $(".main3").offset().top;
};

const elBar = document.querySelector("span.bar");
const elTopBtn = document.querySelector(".top_btn");

const elHeaderBarLi = document.querySelectorAll(".header_bar li");
const elMenu = document.querySelectorAll(".header_bar li span");

console.log("Main1Top", Main1Top);
console.log("Main2Top", Main2Top);
console.log("Main3Top", Main3Top);

let pos = { y: 0 };
window.onscroll = () => {
    pos.y = window.scrollY;

    if (pos.y >= Main1Top) {
        elNavbar.style.position = "fixed";
        elTopBtn.style.opacity = "1";
    }
    if (pos.y < Main1Top) {
        elNavbar.style.position = "absolute";
        elTopBtn.style.opacity = "0";
    }

    if (
        Main1Top * 0.9 < window.pageYOffset &&
        window.pageYOffset < Main1Top * 1.1
    ) {
        elHeaderBarLi.forEach((item) => {
            item.classList.remove("active");
        });
        elBar.style = `
            width:${elMenu[0].offsetWidth}px;
            left:${elMenu[0].offsetLeft}px;
            background:#568a35`;

        // console.log("main1");
        // console.log("Main1Top", Main1Top);
    }
    if (
        Main2Top * 0.9 < window.pageYOffset &&
        window.pageYOffset < Main2Top * 1.1
    ) {
        elHeaderBarLi.forEach((item) => {
            item.classList.remove("active");
        });
        elBar.style = `
        width:${elMenu[1].offsetWidth}px;
        left:${elMenu[1].offsetLeft}px;
        background:#500089`;
        document.querySelectorAll(".main2 .content div").forEach((item) => {
            item.classList.add("up");
        });
        // console.log("main2");
    }
    if (
        Main3Top * 0.9 < window.pageYOffset &&
        window.pageYOffset < Main3Top * 1.1
    ) {
        elHeaderBarLi.forEach((item) => {
            item.classList.remove("active");
        });
        elBar.style = `
        width:${elMenu[2].offsetWidth}px;
        left:${elMenu[2].offsetLeft}px;
        background:#58ccff`;
        // console.log("main3");
    }
    if (pos.y == 0) {
        elHeaderBarLi.forEach((item) => {
            item.classList.remove("active");
        });
        elBar.style = `
        width:0px;
        left:${elMenu[0].offsetLeft - 100}px;
        background:transparent`;
    }
};

elHeaderBarLi[0].addEventListener("click", () => {
    document.querySelector(".main1").scrollIntoView({ behavior: "smooth" });
});
elHeaderBarLi[1].addEventListener("click", () => {
    document.querySelector(".main2").scrollIntoView({ behavior: "smooth" });
    elNavbar.style.position = "fixed";
});
elHeaderBarLi[2].addEventListener("click", () => {
    document.querySelector(".main3").scrollIntoView({ behavior: "smooth" });
    elNavbar.style.position = "fixed";
});

//이메일 복사 클릭

const elEmail = document.querySelector("a.email");
elEmail.addEventListener("click", (e) => {
    e.preventDefault();
    const text = elEmail.textContent;
    const textarea = document.createElement("textarea");
    textarea.textContent = text;
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("email이 복사되었습니다!");
});

let swiper = new Swiper(".myswiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    slidesPerView: "auto",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    768: {
        slidesPerView: 1,
    },
});

//top btn
elTopBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
});
