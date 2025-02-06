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
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    button.appendChild(ripples);
    setTimeout(() => {
      ripples.remove();
    }, 1000);
  });
});

const handleNavigate = () => {
  const loader = document.getElementById("loaders");
  const main_layout = document.getElementById("main-layout");
  const manage_layout = document.getElementById("manage-layout");
  const basic_details = document.getElementById("basic-details");
  loader.setAttribute(
    "class",
    "d-flex justify-content-center align-items-center w-100 d-block"
  );

  setTimeout(() => {
    loader.setAttribute(
      "class",
      "d-flex justify-content-center align-items-center w-100 d-none"
    );
  }, 2000);
  basic_details.style.display = "block";
  main_layout.style.display = "none";
  manage_layout.style.display = "block";
};

const handleBread = (value) => {
  const manage_layout = document.querySelectorAll("main ul li a");
  const static = ["basic-details", "features", "default-settings"];
  static.forEach((e, index) => {
    const Element = document.getElementById(e);
    if (e === value) {
      Element.style.display = "block";
      manage_layout[index + 1].style.color = "#41b9b4";
    } else {
      Element.style.display = "none";
      manage_layout[index + 1].style.color = "#898989";
    }
  });
};
