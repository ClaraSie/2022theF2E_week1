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

