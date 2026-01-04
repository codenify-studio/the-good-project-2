// const scroll = new LocomotiveScroll({
//   el: document.querySelector("#main"),
//   smooth: true,
// });

function locomotiveScrollTrigger() {
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
locomotiveScrollTrigger();

gsap.to(".nav-logo svg", {
  transform: "translateY(-100%)",
  scrollTrigger: {
    trigger: "#page1",
    scroller: "#main",
    start: "top 0",
    end: "top -10%",
    scrub: true,
  },
});
gsap.to(".nav-element .nav-links", {
  transform: "translateY(-100%)",
  opacity: 0,
  scrollTrigger: {
    trigger: "#page1",
    scroller: "#main",
    start: "top 0",
    end: "top -10%",
    scrub: true,
  },
});

function videoconAnimation() {
  var videocon = document.querySelector("#video-container");
  var playbtn = document.querySelector("#play");

  // videocon.addEventListener("mouseenter", function(){
  //     playbtn.style.opacity = 1
  //     playbtn.style.scale = 1
  // })

  videocon.addEventListener("mouseenter", function () {
    gsap.to(playbtn, {
      opacity: 1,
      scale: 1,
    });
  });
  videocon.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      opacity: 0,
      scale: 0,
    });
  });
  videocon.addEventListener("mousemove", function (dets) {
    gsap.to(playbtn, {
      left: dets.x - 70,
      top: dets.y - 80,
    });
  });
}
videoconAnimation();

function headingLoading() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.2,
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.5,
  });
}
headingLoading();

function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
    });
  });
  // document.querySelectorAll(".elem").addEventListener("mouseenter", function(elem){
  //     gsap.to("#cursor", {
  //         transform: 'translate(-50%,-50%) scale(1)',
  //     })
  // })
  // document.querySelectorAll(".elem").addEventListener("mouseleave", function(){
  //     gsap.to("#cursor", {
  //         transform: 'translate(-50%,-50%) scale(0)',
  //     })
  // })
  document.querySelectorAll(".product").forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(1)",
        overwrite: true,
      });
    });
    card.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(0)",
      });
    });
  });
}
cursorAnimation();
document.querySelectorAll(".details").forEach(function (boxhover) {
  boxhover.addEventListener("mouseenter", function () {
    boxhover.parentElement.classList.add("active");
  });
  boxhover.addEventListener("mouseleave", function () {
    boxhover.parentElement.classList.remove("active");
  });
});

function toggleAnimation() {
  // toggle btn
  var toggleBtn = document.querySelector(".toggle-btn");
  var body = document.body;
  toggleBtn.addEventListener("click", function () {
    body.classList.toggle("active");
    if (document.body.classList.contains("active")) {
      gsap.from(".mega-menu-links a", {
        y: 50,
        opacity: 0,
        delay: 0.2,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
      gsap.from(".social-links a", {
        y: 50,
        opacity: 0,
        delay: 0.2,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
      gsap.from(".mega-menu-child p", {
        y: -50,
        opacity: 0,
        delay: 0.4,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  });
}
toggleAnimation();

// document
//   .querySelector(".gift-for-good")
//   .addEventListener("mouseenter", function () {
//     gsap.from(".comn-head-animation", {
//       y: 50,
//       opacity: 0,
//       delay: 0.2,
//       duration: 0.5,
//       stagger: 0.1,
//       ease: "power2.out",
//     });
//   });

// gsap.from("#comn-head-animation", {
//   y: 50,
//   opacity: 0,
//   duration: 0.5,
//   stagger: 0.1,
//   ease: "power2.out",
//   scrollTrigger: {
//     trigger: ".gift-for-good",
//     start: "top 80%",
//     once: true,
//   },
// });


const input = document.querySelector(".newsletter-input");
const button = document.querySelector(".reset-button");

input.addEventListener("input", function(){
  if (this.value.length > 0){
    button.classList.add("active");
  }
  else{
    button.classList.remove("active");
  }
})
