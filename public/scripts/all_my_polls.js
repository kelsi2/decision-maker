jQuery(document).ready(function () {
  $("#allPolls").on("submit", (e) => {
    //prevent the browser from redirecting to json page
    e.preventDefault();
    let email = $("#allPollEmail").val();
    fetchId(email);
  });

  const fetchId = (email) => {
    $.ajax({
      url: `/admin/hello?email=${email}`,
      method: "GET",
      dataType: "json",
      success: (links) => {
        let count = 1;
        for (let link of links) {
          $(".poll-container").append(
            `<br><a class='poll-links' href=/admin/${link.id}>Poll ${count}</a><br>`
          );
          count++;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  };
});
