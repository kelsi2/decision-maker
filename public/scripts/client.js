jQuery(document).ready(function() {

  addOptionButton();
  emailCheck();
  deleteOption();

});
const addOptionButton = () => {
  const max = 10;
  const min = 2;
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
      .attr('required', 'true')
      .attr('placeholder', `Extra Option`))
      if(countOptions() > min) {
        $('#deletebtn').show();
      } else {
        $('#deletebtn').hide();
      };
    };
  });
};

const emailCheck = () => {
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
  });
}

const countOptions = () => {
  const opCount = document.querySelectorAll('.options').length;
  return opCount;
};

const deleteOption = () => {
  const min = 2;
  $("#deletebtn").click(function(e) {
    e.preventDefault();
    const optField = document.getElementById('field_wrapper')
    const optChild = optField.children;
    optChild[countOptions() - 1].remove()
    if(countOptions() > min) {
      $('#deletebtn').show();
    } else {
      $('#deletebtn').hide();
    }
  });
}

