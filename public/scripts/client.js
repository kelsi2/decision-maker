jQuery(document).ready(function() {

  $("#addOptionBtn").on('click', function(event) {

    event.preventDefault();
    $('.field_wrapper').append($('<input><br>')
      .attr('type', 'text')
      .addClass("options")

      .attr('placeholder', `Extra Option`));
  });

  $('.form_email').on('blur', function() {
    const email = $('.form_email').val();
    if (email != '') {
      $.ajax({
        url: '/user/email_check',
        type: 'post',
        data: {
          email
        },
        success: function(data) {
          console.log('success');
          console.log(data);
      }
      });
    }
  })


});

