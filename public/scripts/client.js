jQuery(document).ready(function() {

  $("#addOptionBtn").on('click', function(event) {

    event.preventDefault();
    $('.field_wrapper').append($('<input><br>')
      .attr('type', 'text')
      .addClass("options")
      .attr('placeholder', `Extra Option`));
  });
});

