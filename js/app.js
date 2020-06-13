const navbar = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

function createList() {
  const list_elements = [];

  for (let index = 0; index < sections.length; index++) {
    let list_element = {};
    list_element.text = sections[index].dataset.nav;
    list_element.id = sections[index].id;
    list_elements.push(list_element);
  }
  return list_elements;
}

function createNavElements(list_elements) {
  let elements = [];
  for (let index = 0; index < list_elements.length; index++) {
    let link = document.createElement("a");
    let li = document.createElement("li");
    link.setAttribute("href", "#" + list_elements[index].id);
    link.innerHTML = list_elements[index].text;
    li.append(link);
    elements.push(li);
  }
  return elements;
}

// build the nav
function buildNav() {
  let nav_elements = createNavElements(createList());
  createActiveEventListeners(nav_elements);
  navbar.append(...nav_elements);
}


// Add class 'active' to section when it is near top of viewport
function makeActiveOnScroll() {
  for (const section of sections) {
    const box = section.getBoundingClientRect();
    // You can play with the values in the "if" condition to further make it more accurate. 
    if (box.top <= 150 && box.bottom >= 150) {
      section.setAttribute("class", "active-class");
    } else {
      section.removeAttribute("class");
    }
  }
}


function createActiveEventListeners(nav_elements) {
  let top, left;

  for (let index = 0; index < nav_elements.length; index++) {
    nav_elements[index].addEventListener("click", function (e) {
      e.preventDefault();

      sections.forEach(function (section) {
        section.removeAttribute("class");
      });

      sections[index].setAttribute("class", "active-class");
      top = sections[index].offsetTop;
      left = sections[index].offsetLeft;
      window.scrollTo({
        top: top,
        left: left,
        behavior: "smooth",
      });
    });
  }
}

document.addEventListener("scroll", function() {
  makeActiveOnScroll();
});

// the following will call the main function
buildNav();
