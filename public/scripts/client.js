jQuery(document).ready(function() {
  let max = 10;
  let min = 2;

  $("#addOptionBtn").on('click', function(event) {
    if(countOptions() >= max) {
      event.preventDefault();
      alert('max options reached');
    } else {
    event.preventDefault();
    $('#field_wrapper').append($('<input>')
      .attr('type', 'text')
      .addClass("options")
      .attr('name', `options[${countOptions()}]`)
      .attr('placeholder', `Extra Option`))
      if(countOptions() > min) {
        $('#deletebtn').show();
    } else {
      $('#deletebtn').hide();
    }
  }
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

$("#deletebtn").click(function(e) {
  e.preventDefault();
  let optField = document.getElementById('field_wrapper')
  let optChild = optField.children;
  optChild[countOptions() - 1].remove()
  if(countOptions() > min) {
    $('#deletebtn').show();
} else {
  $('#deletebtn').hide();
}
})

  let countOptions = () => {
    let opCount = document.querySelectorAll('.options').length;
    return opCount;
  }

});

