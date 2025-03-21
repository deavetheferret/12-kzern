import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Masonry from "masonry-layout";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // BURGER MENU JS
  const burgerMenuBtn = document.querySelector("#menu-nav-btn");
  const closeBurgerMenuBtn = document.querySelector("#close-menu-btn");
  const nav = document.querySelector("#menu-nav");

  burgerMenuBtn.addEventListener("click", () => {
    nav.classList.add("open");
    burgerMenuBtn.setAttribute("aria-expanded", true);
    document.querySelector("body").style.overflow = "hidden";
  });

  const closeMenu = () => {
    nav.classList.remove("open");
    burgerMenuBtn.setAttribute("aria-expanded", false);
    document.querySelector("body").style.overflow = "auto";
  };

  closeBurgerMenuBtn.addEventListener("click", closeMenu);

  nav.querySelectorAll("li a").forEach((menuItem) => {
    menuItem.addEventListener("click", closeMenu);
  });

  // Video loader fixer
  setTimeout(() => {
    const video = document.querySelector("video");
    video.play();
  }, 3000);

  // ACCORDION JS
  // Sélectionne chaque accordéon sur la page HTML
  const accordions = document.querySelectorAll(".accordion");

  // Itère sur chacun des accordéons individuellement
  accordions.forEach(function (accordion) {
    // Ajoute 2 variables, la première sélectionnant le bouton de l'accordéon, la seconde sélectionnant son contenu
    const accordionBtn = accordion.querySelector(".label button");
    const accordionContent = accordion.querySelector(".content");
    const accordionArrow = accordion.querySelector(".label .arrow");

    // Ajoute un écouteur d'événement sur le bouton de l'accordion
    accordionBtn.addEventListener("click", function () {
      const isExpanded = accordionBtn.getAttribute("aria-expanded") == "true";
      const imgAccordionId = accordionBtn.getAttribute("data-img");
      const imgAccordion = imgAccordionId
        ? document.getElementById(imgAccordionId)
        : null;
      const imgAccordions = document.querySelectorAll(
        "#imgs-accordion img:not(#" + imgAccordionId + ")"
      );
      imgAccordions.forEach((img) => {
        img.style.opacity = 0;
      });

      // Si le contenu de l'accordéon a la class "open", ça veut dire qu'au click, on veut refermer l'accordéon (-> mettre sa height à 0)
      if (accordionContent.classList.contains("open")) {
        gsap.to(accordionContent, {
          height: 0,
          duration: 0.5,
        });
        gsap.to(accordionArrow, {
          rotate: 0,
          duration: 0.2,
        });
        gsap.to(imgAccordion, {
          opacity: 0,
          duration: 0.5,
        });
        // Sinon, on veut voir le contenu
      } else {
        gsap.to(accordionContent, {
          height: "auto",
          duration: 0.5,
        });
        gsap.to(accordionArrow, {
          rotate: 180,
          duration: 0.2,
        });
        gsap.to(imgAccordion, {
          opacity: 1,
          duration: 0.5,
        });
      }
      // On vient ensuite ajouter la class open à l'accordéon
      accordionContent.classList.toggle("open");
      accordionBtn.setAttribute("aria-expanded", !isExpanded);
    });
  });

  // ANIMATION
  const sectionTitlesAnim = document.querySelectorAll(".section-title-anim");
  sectionTitlesAnim.forEach((sectionTitleAnim) => {
    const trigger = sectionTitleAnim.closest("section");
    gsap.to(sectionTitleAnim, {
      flex: 1,
      duration: 2.5,
      scrollTrigger: trigger,
    });
  });

  gsap.to(".square-anim", {
    width: "100%",
    duration: 2.5,
  });

  // Masonry
  const elem = document.querySelector(".masonry");
  const msnry = new Masonry(elem, {
    // options
    itemSelector: ".masonry-item",
    gutter: 10,
  });

  setTimeout(() => {
    msnry.layout();
  }, 2000);
});
