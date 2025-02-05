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

const header_buttons = document.querySelectorAll(".add-client-btn");

header_buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let x = event.clientX - event.target.offsetLeft;
    let y = event.clientY - event.target.offsetTop;
    let ripples = document.createElement("span");
    ripples.classList.add("button-upper-hover");
    console.log(ripples, 27);
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    button.appendChild(ripples);
    setTimeout(() => {
      ripples.remove();
    }, 1000);
  });
});
