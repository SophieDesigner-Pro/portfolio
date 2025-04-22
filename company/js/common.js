const nav = document.querySelector('nav');
nav.addEventListener('mouseenter', (e) => {
    e.target.classList.add('on');
})
nav.addEventListener('mouseleave', (e) => {
    e.target.classList.remove('on');
});

const p = document.querySelector('.r_menu .sel p');
if (p) {
    p.addEventListener('click', function () {
        const selElement = this.closest('.sel');
        if (selElement) {
            selElement.classList.toggle('on');
        }
    });
}

let mainSlide = new Swiper('.main_slide_wrap', {
    loop: true,
    autoplay: {
        delay: 3000,        // 3초마다 자동 넘김
        disableOnInteraction: false,
    },
    effect: 'fade',
    keyboard: {
        enabled: true,      // 키보드로 넘기기 가능
    },
    navigation: {
        nextEl: ".main_visual .next", // 오른쪽 버튼
        prevEl: ".main_visual .prev", // 왼쪽 버튼
    },
    on: {
        // autoplayTimeLeft 콜백: time은 남은 시간(ms), progress는 남은 비율(1 ~ 0)
        autoplayTimeLeft(swiper, time, progress) {
            // progress가 1일 때 채워진 높이는 0%, 0일 때 100%
            document.querySelector('.swiper-pagination-line-fill').style.height = (1 - progress) * 100 + '%';
        },
        init(swiper) {
            updatePagination(swiper); // 처음 슬라이드 번호 표시
        },
        slideChangeTransitionEnd(swiper) {
            updatePagination(swiper); // 슬라이드 바뀔 때 번호 변경
        },
    }
})

//슬라이드 번호 보여주는 함수
function updatePagination(swiper) {
    const curentNum = swiper.realIndex + 1;//현재 슬라이드 번호(0부터 시작이라 +1)
    const fomattedNum = curentNum < 10 ? `0${curentNum}` : curentNum;
    document.querySelector('.swiper-pagination-current').textContent
        = fomattedNum;
}

//마우스 따라다니는 커서 + 드래그 효과
const cursor = document.querySelector('.custom_cursor');
const businessSection = document.querySelector('business ul');

//마우스가 움직일때마다 커서 따라가기
document.addEventListener('mousemove', (e) => {
    //const scrollY
    cursor.style.left = `${e.clientX}px`; //가로위치
    cursor.style.top = `${e.clientY}px`; //세로위치  
})


gsap.registerPlugin(ScrollTrigger);
// 한 번만 설정
ScrollTrigger.defaults({
    scroller: "body",
    scrub: 1
});

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("body"),  // 전체 페이지에 적용
    smooth: true, // 부드러운 스크롤 활성화
    lerp: 0.08, // 부드러운 감속 정도 (0~1)
});

// Locomotive Scroll과 ScrollTrigger 동기화
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("body", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
});

// Locomotive Scroll 적용 후 ScrollTrigger 업데이트
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.txt_area',
        start: 'top 20%',
        end: 'bottom bottom',
        scrub: true,
    }
})

tl.to('.txt_area strong.tit', {
    backgroundSize: '100%',
    duration: 1,
    ease: 'none'
}).to('.txt_area b.tit', {
    backgroundSize: '100%',
    duration: 1,
    ease: 'none'
}, '+=0.6')
    .to('.txt_area em.tit', {
        backgroundSize: '100%',
        duration: 1,
        ease: 'none'
    }, '+=1.2')


const visionCards = gsap.utils.toArray('.vision .card');
visionCards.forEach((card, i) => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.vision',
            start: `top+=${i * 300} center`,
            end: `top+=${(i + 1) * 300} center`,
            scrub: 1.2,
        }
    });
    tl.fromTo(card, { rotationY: 0 }, {
        rotationY: 180,
        transformOrigin: "center center",
        ease: "power2.out"
    })
})

function applySimplyScroll(selector, speed = 4, direction = 'forwards') {
    $(selector).simplyScroll({
        speed,
        direction,
        pauseOnHover: true,
        pauseOnTouch: true,
    })
}
applySimplyScroll('.vision .list');