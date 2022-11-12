/* gsap額外引入的 ScrollTrigger 與 TextPlugin 套件 */
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// gsap
function animated(element) {
    let y = -100;

    //設定元素初始值
    element.style.transform = `translate(${y}px, 0px)`;

    gsap.fromTo(
    element,
    { x: 0, y: y, opacity: 0, visibility: "hidden" },
    {
        duration: 1,
        delay: 0.2,
        x: 0,
        y: 0,
        visibility: "visible",
        opacity: "1",
        ease: "expo", // 元素的運動速度變化
        overwrite: "auto",
        scale: 1.1, //放大
    }
    );
}
function hide(element) {
    gsap.set(element, { opacity: 0, visibility: "hidden" });
}

// --- banner-wrapper 互動式網頁設計 ---//
const bannerWrapper = gsap.timeline({
    scrollTrigger: {
        trigger: ".banner-wrapper-bg", 
        start: 'top 35%', 
        end: 'top 1%',
    },
})
bannerWrapper.fromTo('.banner-wrapper-bg .title',{ opacity: 0, scale: 0.5 },{ opacity: 1, scale: 1, duration: 2})
    .fromTo('.banner-wrapper-bg .subtitle',{ opacity: 0, scale: 0.5,},{
    opacity: 1, scale: 1, duration: 2}, "<")
    .from('.banner-wrapper-bg .hands-up',{ opacity: 0, rotation: -90, duration: 2},"<")
    .from('.banner-wrapper-bg .hands-down',{ opacity: 0, rotation: 90, duration: 2},"<")
    // .fromTo('.banner-wrapper-bg .hands-up',{ opacity: 0, x: 100, rotation: 45},{ opacity: 1, x: 0, rotation: 0, duration: 2}, "<")
    // .fromTo('.banner-wrapper-bg .hands-down',{ opacity: 0, x: -100, rotation: -45},{ opacity: 1, x: 0, rotation: 0, duration: 2},"<")
    .from('.banner-wrapper-bg .head-img',{ x: 50, y: -100, rotation:180, opacity: 0, duration: 1},"<")
    .from('.banner-wrapper-bg .bottom-img',{ x: -50, y: 100, rotation: -90, opacity: 0,duration: 1},"<")


//--- 跑馬燈無限循環 ---//
gsap.from('.loop', {
    xPercent: "-50",
    ease: "none", /*動畫輪播才不會有速度差*/
    duration: 10,
    repeat: -1,
});
//--- 跑馬燈 ---//
gsap.to('.marqee', {
    scrollTrigger: ".banner-wrapper-bg", 
    xPercent: -33,
    duration: 2,
});
gsap.fromTo('.marqee-reverse', {
    scrollTrigger: ".banner-wrapper-bg", 
    xPercent: -33,
},{
    xPercent: 0,
    duration: 2,
});

//引導問題 
//todo:放大跳動
gsap.utils.toArray(".trouble-animation-item").forEach((element) => {
    hide(element); // 每個元素一進來都必須先隱藏

    ScrollTrigger.create({
        trigger: element,
        // markers: true,
        // start: 'top: 35%',
        // end: 'top 1%', // 決定動畫結束點的位置
        scrub: true, //重要！開啟scrub來決定動畫播放是否依賴視窗滾動
        //向下滾動進入start點時觸發callback
        onEnter: function () {
            animated(element); 
        },
        //向上滾動超過end點時觸發（回滾時觸發）callback
        onEnterBack: function () {
            animated(element);
        },
        //向下滾動超過end點時觸發callback
        onLeave: function () {
            hide(element);
        },
    });
});

// --- 翻牌效果 ---//
const flipcard = gsap.timeline({
    scrollTrigger: {trigger: ".section1", start: 'top 35%', end: 'top 1%',},})
flipcard.to('.card-flip',{ duration: 0.5, rotationY: 180, stagger: 0.2})

// --- car animation---//
let mm = gsap.matchMedia(); //gsap不同裝置動畫設定使用
const carRun = gsap.timeline({
    scrollTrigger: {trigger: ".carRunning", start: 'top 35%', end: 'top 1%',},})
mm.add("(min-width: 1080px)",() =>{ //電腦版才動畫
    carRun.to('.icon-car',{ duration: 1, x: -730})
    carRun.to('.icon-finishFlag',{ duration: 0.5, rotation: -29, x: -15, y: -15})
})

// --- Q&A tabs---//
let tabLink = document.getElementById("tabs").querySelectorAll("li");
let tabHref = document.getElementById("tabs").querySelectorAll("a");
let tabContents = document.getElementById("tab-inner").querySelectorAll('.card');
window.onload = function (){
    // 啟動第一個panel
    panelDisplay(tabLink[0]);
    //點擊tab連結
    for(let i = 0; i < tabLink.length; i++){
        tabLink[i].addEventListener('click',function(e){
        e.preventDefault();
        panelDisplay(this);
        });
    };
}
function panelDisplay(activePanel){
    for(let i =0;i<tabLink.length;i++){
        if(tabLink[i] == activePanel)
        {
            tabLink[i].classList.add("navbar-item-liner-show");
            tabHref[i].classList.add("active");
            tabContents[i].style.display="block";
        }else{
            tabLink[i].classList.remove("navbar-item-liner-show");
            tabHref[i].classList.remove("active");
            tabContents[i].style.display="none";
        }
    }
}