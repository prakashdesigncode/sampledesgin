//Open Menu Toggle
$("#toggle-menu").on("click", function () {
  const $openMenu = $(this);
  const $navBar = $(".nav-bar");
  const $topic = $(".topic");
  const $navLink = $(".nav-link-custom");

  const condition = $openMenu.hasClass("left");
  $navBar.css("width", condition ? "4%" : "15%");
  $topic.css("visibility", condition ? "hidden" : "visible");
  $navLink.css("display", condition ? "none" : "block");
  $openMenu.removeClass("left right").addClass(condition ? "right" : "left");
  if (condition) {
    $openMenu.removeClass("bxs-chevron-left").addClass("bxs-chevron-right");
  } else {
    $openMenu.removeClass("bxs-chevron-right").addClass("bxs-chevron-left");
  }
});

//Ripple Effect on Button Clicks
$(".add-client-btn").on("click", function (event) {
  const $button = $(this);
  const x = event.clientX - $button.offset().left;
  const y = event.clientY - $button.offset().top;

  const $ripples = $("<span>")
    .addClass("button-upper-hover")
    .css({ left: x, top: y });

  $button.append($ripples);
  setTimeout(() => $ripples.remove(), 1000);
});

/*-----------------functions Start-------------------------*/
function handleLoaded(callback) {
  const $loader = $("#loaders");
  $loader.show();

  setTimeout(function () {
    $loader.hide();
    callback();
  }, 500);
}

const handleNavigate = () => {
  const $mainLayout = $("#main-layout");
  const $manageLayout = $("#manage-layout");
  const $title = $("#colleage-title");

  handleLoaded(() => {
    $title.text("UPM COLLAGE Of UNIVERSTY");
    $mainLayout.hide();
    $manageLayout.show();
  });
};

const handleBread = (value) => {
  const $manageLayout = $("main ul li a");
  const staticValues = ["basic-details", "features", "default-settings"];

  staticValues.forEach((e, index) => {
    const $element = $("#" + e);
    const $link = $manageLayout.eq(index + 1);

    if (e === value) {
      $element.show();
      $link.css("color", "#41b9b4");
    } else {
      $element.hide();
      $link.css("color", "#898989");
    }
  });
};

const handleMenu = (value) => {
  const $element = $(".main-menu ul li:nth-child(" + value + ")");
  const $allElement = $(".main-menu ul li");
  const $pages = $(".page");
  const $title = $("#colleage-title");
  const $manageLayout = $("#manage-layout");

  $title.text("");
  $manageLayout.hide();
  $pages.each(function (index) {
    $(this).toggle(index + 1 === value);
  });

  $allElement.removeClass("active-menu").find("i").css("color", "#dad3d3");

  $element.addClass("active-menu").find("i").css("color", "#41b9b4");
};

const openAddClient = () => {
  $("#add-client-popup").toggleClass("visible");
};

function updateLabel() {
  const $input = $("#checkbox3");
  const $label = $("#file-label");
  const fileName = $input[0].files[0]
    ? $input[0].files[0].name
    : "No file selected";
  $label.text(fileName);
}

/*-----------------functions Start-------------------------*/

// Document Ready
$(document).ready(function () {
  $(".page").first().show();
});

//Close Popup when Clicking Outside
$(window).on("click", function (event) {
  const $popup = $("#add-client-popup");
  if ($(event.target).is($popup)) {
    $popup.removeClass("visible");
  }
});

/*tabs*/

const tabsOptions = document.querySelectorAll(".tabs button");
const activeStatus = document.querySelector(".tabs .active");
const tabContents = document.querySelectorAll(".tab-content .tab-pane");

const setActiveTab = (index) => {
  const selectedTab = tabsOptions[index];
  const tabRect = selectedTab.getBoundingClientRect();
  activeStatus.style.left = `${
    tabRect.left - selectedTab.parentElement.getBoundingClientRect().left
  }px`;
  // activeStatus.style.width = `${tabRect.width}px`;
  tabContents.forEach((content) => content.classList.remove("active"));
  const targetTab = document.querySelector(
    selectedTab.getAttribute("data-bs-target")
  );
  targetTab.classList.add("active");
  tabsOptions[index].style.color = "#41b9b4";
};

setActiveTab(0);

for (let i = 0; i < tabsOptions.length; i++) {
  tabsOptions[i].onclick = () => {
    setActiveTab(i);
    tabsOptions.forEach((btn) => (btn.style.color = "#898989"));
    tabsOptions[i].style.color = "#41b9b4";
  };
}

//crop image

$("#client-logo").on("change", (e) => {
  const file = e.target.files[0];
  const fileRender = new FileReader();
  fileRender.onload = function (e) {
    $("#logo").attr("src", e.target.result).addClass("profile-image");
  };
  fileRender.readAsDataURL(file);
});
