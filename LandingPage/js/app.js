/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const navMenu = document.getElementById("#navbar__menu");
const navList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
console.log("section: " + sections.length);
/**
 * Build the navbar
 */
function buildNav() {
  sections.forEach((section) => {
    const sectionId = section.getAttribute("id");
    const sectionClass = section.getAttribute("class");
    const navData = section.getAttribute("data-nav");
    const lst = document.createElement("li");
    const el = document.createElement("a");
    el.innerText = navData;
    el.classList.add("nav-items");
    //console.log("*** " + el.classList.add("nav-items"));
    el.setAttribute("id", sectionId);
    el.href = "#" + sectionId;
    lst.appendChild(el);
    navList.appendChild(lst);
    scrollEvent(lst, section);
  });
}
buildNav();

function isSectionView(section) {
  const location = section.getBoundingClientRect();
  return (location.top <= 150) & (location.bottom >= 150);
}

function addClassActive() {
  for (section of sections) {
    if (isSectionView(section)) {
      // add active-class
      section.classList.add("active-class");
      document
        .querySelector(`a[href='#${section.id}']`)
        .classList.add("active");
    } else {
      //remove active-class
      section.classList.remove("active-class");
      document
        .querySelector(`a[href='#${section.id}']`)
        .classList.remove("active");
    }
  }
}

// add eventlistener to add active-class.
document.addEventListener("scroll", function () {
  addClassActive();
});

// listening for tne event for the navigation.
function scrollEvent(lst, section) {
  lst.addEventListener("click", function (e) {
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });
}

// When the user scrolls down show the button
const button = document.getElementById("scrollToTopBttn");

window.onscroll = function () {
  scroll();
};

function scroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

// when the user clicks on the button, scroll to the top.
function scrollToTopBttn() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
