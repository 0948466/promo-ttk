$(document).ready ->
  form = $("#quiz_form_v")
  $('.click_answer').click  ->
    if $(@).parent().hasClass('check_false') or $(@).parent().hasClass('check_true')
    else
      Rails.fire(form[0], 'submit');