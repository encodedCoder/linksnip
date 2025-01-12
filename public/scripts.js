// filepath: /C:/Users/theCode/OneDrive/Desktop/shortly/aa/link-shortener-app/public/script.js
$(document).ready(function () {
  $("#shorten-form").on("submit", function (event) {
    event.preventDefault();
    const originalUrl = $("#originalUrl").val();

    $.ajax({
      url: "/shorten",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ originalUrl }),
      success: function (response) {
        $("#result").html(
          `<p>Shortened URL: <a href="${response.shortenedUrl}" target="_blank">${response.shortenedUrl}</a></p>`
        );
      },
      error: function (xhr) {
        let errorMessage = "An error occurred";
        if (xhr.responseJSON && xhr.responseJSON.message) {
          errorMessage = xhr.responseJSON.message;
        }
        $("#result").html(`<p class="text-danger">${errorMessage}</p>`);
      },
    });
  });
});
