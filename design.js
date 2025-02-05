const open_menu = document.getElementById("toggle-menu");
const nav_bar = document.querySelector(".nav-bar");
const topic = document.querySelector(".topic");
const nav_link = document.querySelectorAll(".nav-link-custom");

open_menu.onclick = () => {
  const value = open_menu.className;
  const condition = value.includes("left");
  nav_bar.style.width = condition ? "4%" : "15%";
  topic.style.visibility = condition ? "hidden" : "visible";
  nav_link.forEach((Element) => {
    Element.style.display = condition ? "none" : "block";
  });
  open_menu.className = condition
    ? open_menu.className.replaceAll("left", "right")
    : open_menu.className.replaceAll("right", "left");
};
