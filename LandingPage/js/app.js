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
 * End Global Variables
 * Start Helper Functions
 **/

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
    el.setAttribute("id", sectionId);
    el.href = "#" + sectionId;
    lst.appendChild(el);
    navList.appendChild(lst);
    console.log(navData + " / " + sectionId + " / " + sectionClass);
    scrollEvent(lst, section);
  });
}
buildNav();

function setSectionView(section) {
  const location = section.getBoundingClientRect();
  return (location.top <= 150) & (location.bottom >= 150);
}

function addClassActive() {
  for (section of sections) {
    console.log("**** section = " + section);
    if (setSectionView(section)) {
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

// add eventlistener.
document.addEventListener("scroll", function () {
  addClassActive();
});

// listening for tne event forthe navigation.
function scrollEvent(lst, section) {
  console.log("** scrollEvent *** ");

  lst.addEventListener("click", function (e) {
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });
}

// Add class 'active' to section when near top of viewport

// When the user scrolls down then
// slide down the navbar
/* window.onscroll = function () {
  scroll();
}; */

// Scroll to anchor ID using scrollTO event
/* function scroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar__list").style.top = "0";
  } else {
    document.getElementById("navbar__list").style.top = "-60px";
  }
} */
