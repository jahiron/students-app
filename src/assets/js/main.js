

$(document).ready(function () {
  $("body").on("click", ".modal-button", function () {
    var modalBtn = $(this).data("target");
    $("html").addClass("is-clipped");
    $(modalBtn).addClass("is-active");
  });

  $("body").on("click", ".dismiss", function () {
    $("html").removeClass("is-clipped");
    $(".modal").removeClass("is-active");
  });

  const fileInput = document.querySelector("input[type=file]");
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector(".file-name");
      fileName.textContent = fileInput.files[0].name;
    }
  };



});
