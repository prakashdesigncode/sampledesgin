//goble start variable;
let allClients = [];
let baseUrl = "http://localhost:5000/api/v1";

//Open Menu Toggle
$("#toggle-menu").on("click", function () {
  const $openMenu = $(this);
  const $navBar = $(".nav-bar");
  const $topic = $(".topic");
  const $navLink = $(".nav-link-custom");

  const condition = $openMenu.hasClass("left");
  $navBar.css("width", condition ? "5%" : "15%");
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

const openAddClient = (id) => {
  $("#create-client-name").val("");
  $("#create-client-code").val("");
  $(id).toggleClass("visible");
};

function updateLabel() {
  const $input = $("#checkbox3");
  const $label = $("#file-label");
  const fileName = $input[0].files[0]
    ? $input[0].files[0].name
    : "No file selected";
  $label.text(fileName);
}

function addEmails() {
  let adminEmails = $("#admin-emails");
  adminEmails.append(` <div class="d-flex align-items-center gap-3">
                <input type="email" class="form-control mt-1" id="admin-mail" placeholder="Admin Mail">
              <input type="email" class="form-control mt-1" id="admin-code" placeholder="Admin Code">
               <i class="bx bx-x cancel-admin mt-2 cursor-pointer" onClick="deleteEmail(this)"></i>
            </div>`);
}

function deleteEmail(element) {
  $(element).closest(".d-flex").remove();
}

function addLabel(element) {
  $(`#${element}`).append(`<div class="mb-2 d-flex gap-2">
                    <input type="email" class="form-control mt-1" id="exampleFormControlInput1" placeholder="Label">
                    <input type="email" class="form-control mt-1" id="exampleFormControlInput1" placeholder="Value">
                  </div>`);
}

function addLabelManage() {
  let labelsArray = $("#labelsArray");
  const childrenCount = labelsArray.children().length;
  labelsArray.append(`
    <div class="card rounded border-none" style="width: 23rem;" >
              <div class="card-body">
                <div class=" card-title text-secondary justify-content-between align-items-center text-center bg-white d-flex">
                 <div class="">Default (Ab)</div> 
                   <div class="d-flex align-items-center gap-2">
                  <button class="client-create-btn" onclick="addLabel('label-${
                    childrenCount + 1
                  }')">Add Label</button>
                  <i class="bx bx-x cancel-admin" onclick="removeLabel(this)"></i>
                </div>
                </div>
                <div class="text-secondary my-3 pt-2" id="label-${
                  childrenCount + 1
                }"> <div class="mb-2 d-flex gap-2" >
                  <input type="email" class="form-control mt-1" id="exampleFormControlInput1" placeholder="Label">
                  <input type="email" class="form-control mt-1" id="exampleFormControlInput1" placeholder="Value">
                </div>
                <div class="mb-2 d-flex gap-2">
                  <input type="email" class="form-control mt-1" id="exampleFormControlInput1" placeholder="Label">
                  <input type="email" class="form-control mt-1" id="exampleFormControlInput1" placeholder="Value">
                </div></div>
                <div class="bg-white text-end"> <button class="client-create-btn">Activate</button></div>
              </div>
            </div>
            `);
}

function removeLabel(element) {
  $(element).closest(".card").remove();
}

function filterTable() {
  const searchInput = $("#table-search").val();
  const clientList = $("#client-list");
  const filteredData = allClients.filter(function (item) {
    return (
      item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.code.toLowerCase().includes(searchInput.toLowerCase())
    );
  });
  clientList.empty();
  filteredData.forEach(function (item) {
    clientList.append(`
      <tr>
        <td>
          ${item?.code} 
        </td>
        <td>
          <img
            class="admin-image"
            alt="admin"
            width="35"
            height="35"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"
          />
          <span class="ms-3">${item?.name}</span>
        </td>
        <td>5</td>  
        <td>45</td>
        <td>10</td>
        <td class="d-flex align-items-center gap-2">
          <button type="button" class="manage-btn" id="manage-btn" data-navigateId="${item?._id}">Manage</button>
          <i class='bx bx-trash cursor-pointer ' data-id="${item?._id}" id="deleteClient" ></i>
        </td>
      </tr>
    `);
  });
}

/*-----------------functions Start-------------------------*/

//call get apis like compound did mount
$(document).ready(function () {
  getClients()();
});

//call get apis
const getClients = (isToggle) => () => {
  const callback = (data) => {
    if (isToggle) openAddClient("#add-client-popup");
    allClients = data;
    const clientList = $("#client-list");
    clientList.empty();
    data.forEach(function (item) {
      clientList.append(`<tr>
                <td>
                  ${item?.code} 
                </td>
                <td>
                  <img
                    class="admin-image"
                    alt="admin"
                    width="35"
                    height="35"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"
                  />
                  <span class="ms-3">${item?.name}</span>
                  table </td>
                <td>5</td>
                <td>45</td>
                <td>10</td>
                <td class="d-flex align-items-center gap-2">
                  <button type="button" class="manage-btn" id="manage-btn" data-navigateId="${item?._id}" >Manage</button>
                  <i class='bx bx-trash mx-3 cursor-pointer' data-id="${item?._id}"  id="deleteClient"></i>
                </td>
              </tr>`);
    });
  };
  apiCall({
    url: `${baseUrl}/account`,
    type: "GET",
    callback,
  });
};

//call post apis
const createClient = () => {
  const name = $("#create-client-name").val();
  const code = $("#create-client-code").val();
  apiCall({
    url: `${baseUrl}/account`,
    type: "POST",
    data: { name, code },
    callback: getClients(true),
  });
};

//call delete apis
const deleteClient = (_id) => {
  apiCall({
    url: `${baseUrl}/account/${_id}`,
    type: "delete",
    callback: getClients(false),
  });
};

//call put apis
const updateClient = (_id) => {
  const themes = { primary, secondary };
  const logo = { url, alt };
  apiCall({
    url: `${baseUrl}/account/${_id}`,
    type: "put",
    data: { settings: { ...themes, ...logo } },
  });
};
// Document Ready
$(document).ready(function () {
  $(".page").first().show();
  $(`#max-users`).keypress(function (e) {
    var charCode = e.which ? e.which : e.keyCode;
    if (String.fromCharCode(charCode).match(/[^0-9]/g)) return false;
  });
  $("#max-users").on("paste", function (event) {
    event.preventDefault();
    $("#max-users").val("");
  });
  $("#max-exams").on("paste", function (event) {
    event.preventDefault();
    $("#max-exams").val("");
  });
  $(`#max-exams`).keypress(function (e) {
    var charCode = e.which ? e.which : e.keyCode;
    if (String.fromCharCode(charCode).match(/[^0-9]/g)) return false;
  });
  $("#table-search").on("input", function () {
    filterTable();
  });
  $("#removeSearch").on("click", function () {
    $("#table-search").val("");
    filterTable();
  });
  $("#client-list").on("click", "#manage-btn", "#deleteClient", function () {
    const removeClient = $(this).data("id");
    const navigateId = $(this).data("navigateId");
    if (removeClient) deleteClient(removeClient);
    if (navigateId) handleNavigate();
  });
});

//Close Popup when Clicking Outside
$(window).on("click", function (event) {
  const $popup = $("#add-client-popup");
  const $cropImage = $("#crop-image-popup");
  if ($(event.target).is($popup)) {
    return $popup.removeClass("visible");
  }
  if ($(event.target).is($cropImage)) {
    return $cropImage.removeClass("visible");
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

$(document).ready(function () {
  var $image = $("#logo");
  var $crop_image = $("#cropImage");
  var cropper;

  $("#client-logo").on("change", function (e) {
    openAddClient("#crop-image-popup");
    var reader = new FileReader();
    reader.onload = function (event) {
      $crop_image.attr("src", event.target.result);
      if (cropper) cropper.destroy();
      cropper = new Cropper($crop_image[0], {
        aspectRatio: 16 / 9,
        viewMode: 1,
      });
    };
    reader.readAsDataURL(this.files[0]);
  });

  $("#getCroppedImage").on("click", function () {
    var canvas = cropper.getCroppedCanvas();
    var croppedImage = canvas.toDataURL("image/png");
    $image.attr("src", croppedImage);
    openAddClient("#crop-image-popup");
  });
});

// api integration data Start
function apiCall({ url = "", data = "", type = "", callback = () => {} }) {
  $.ajax({
    url,
    type,
    ...(data && { data: JSON.stringify(data) }),
    contentType: "application/json",
    dataType: "json",
    success: (response) => {
      const { data = "" } = response;
      callback(data);
    },
    error: (error) => {
      console.log(error);
    },
  });
}

//basic details data
const handleBasic = () => {
  let clientLogo = $("#logo").attr("src");
  let clientName = $("#client-name").val();
  let clientCode = $("#client-code").val();
  let clientThemes = $("#client-theme").val();
  let admins = [];
  $("#admin-emails .d-flex").each(function () {
    let adminEmail = $(this).find("#admin-mail").val();
    let adminCode = $(this).find("#admin-code").val();
    admins.push({ adminEmail, adminCode });
  });
  const data = { clientLogo, clientName, clientCode, clientThemes, admins };
  return data;
};

const handleFeatures = () => {
  let isEnableAnomaly = $("#anomaly-detection").prop("checked");
  let isEnableHeba = $("#heba-creation").prop("checked");
  let maxUsers = $("#max-users").val();
  let maxExams = $("#max-exams").val();
  const data = { isEnableAnomaly, isEnableHeba, maxExams, maxUsers };
  return data;
};
