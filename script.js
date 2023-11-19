function LocomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function NavbarAnimation() {
  gsap.to("#nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      // markers: "true",
      start: "top 0",
      end: "top -5%",
      scrub: 1,
    },
  });

  gsap.to("#nav-part2 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      // markers: "true",
      start: "top 0",
      end: "top -5%",
      scrub: 1,
    },
  });
}

function videoconAnimation() {
  var videocon = document.querySelector("#video-container");
  var playbtn = document.querySelector("#play");
  //  videocon.addEventListener("mouseenter",function(){
  //     playbtn.style.opacity =1
  //     playbtn.style.scale=1
  // })
  // videocon.addEventListener("mouseleave",function(){
  //     playbtn.style.opacity =0
  //     playbtn.style.scale=0
  // })
  videocon.addEventListener("mouseenter", function () {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
    });
  });
  videocon.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,
    });
  });

  videocon.addEventListener("mousemove", function (dets) {
    gsap.to(playbtn, {
      left: dets.x - 50,
      top: dets.y - 180,
    });
  });
}
function loadingAnimation() {
  gsap.from("#page1 h1", {
    y: 80,
    opacity: 0,
    delay: 0.5,
    duration: 0.8,
    stagger: 0.223,
  });
  gsap.from("#page1 #video-container", {
    y: 100,
    opacity: 0,
    delay: 0.9,
    duration: 0.8,
    stagger: 0.223,
  });
  gsap.from("#page2 ", {
    y: 120,
    opacity: 0,
    delay: 2,
    duration: 0.8,
    stagger: 0.223,
  });
}
function cursorAnimation() {
  document.addEventListener("mousemove", function (e) {
    gsap.to("#cursor", {
      left: e.x,
      top: e.y,
    });
  });

  var a = document.querySelectorAll(".child img");
  // console.log(a);

  a.forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%, -50%) scale(1)",
      });
    });
    e.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%, -50%) scale(0)",
      });
    });
  });
}
LocomotiveAnimation();
NavbarAnimation();
videoconAnimation();
loadingAnimation();
cursorAnimation();

// TODO gsap
// TODO locomotive js
// TODO position in css
// TODO JS
// 1:23:00
