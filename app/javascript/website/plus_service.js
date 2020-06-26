$(document).ready(function(){

  // $(document).on("click", ".confirm_cancel_email_customer_btn", function(){
  //   var customer_id = $('#send_email_customer_id').val();
  //   var customer_email = $('#send_email_customer_email').val();

  //   $('#cancel_plus_service_customer_id').val(customer_id);
  //   $('#cancel_plus_service_customer_email').val(customer_email);
  // });

  $("#ShareAdInSocialBtn").click(function () {
    $("#tabs-1").removeClass('hide');
  });

  $(document).on("click", ".openClosePanelForSocialAd", function(){
    var toggle_id = $(this).data('show_modal_id');
    $(this).parent().parent().find("#"+toggle_id).toggleClass("hide");
    $(this).find(".show_social_media_buttons").toggleClass("hide");
  });

  // $(document).on("click", ".cancel_plus_service_btn", function(){
  //   var parentEl = $(this).closest('.parent_customer');
  //   var customer_id = $(parentEl).find('.contact_customer_id').val();
  //   var customer_email = $(parentEl).find('.contact_customer_email').val();

  //   $('#send_email_customer_id').val(customer_id);
  //   $('#send_email_customer_email').val(customer_email);
  // });

  // $(document).on('click', ".new_password_email_customer_btn", function(){
  //   var parentEl = $(this).closest('.parent_customer');
  //   var customer_id = $(parentEl).find('.contact_customer_id').val();
  //   var customer_email = $(parentEl).find('.contact_customer_email').val();

  //   $('#new_password_customer_id').val(customer_id);
  //   $('#new_password_customer_email').val(customer_email);
  // });

  // $(document).on("click", ".send_customer_plus_service_email_btn", function(){
  //   var customer_email = [];
  //   var parentEl = $(this).closest('.parent_customer');
  //   var customer_id = $(parentEl).find('.contact_customer_id').val();
  //   customer_email.push($(parentEl).find('.contact_customer_email').val());
  //   $('#sales_key_customer_recepient_email_id').val(customer_email);
  //   $('#sales_key_customer_email_id').val(customer_email);
  // });

  $(document).on("click", ".add_new_link_messages", function(){
    var parentEl = $(this).closest('.parent_messages');
    var other_link = $(parentEl).find('.dummy_add_messages_link').clone();
    var last_other_link = $(parentEl).find('.brand_messages_links .other_message_link_lists:last').attr('id')

    if (last_other_link){
      var index = parseInt(getId(last_other_link)) + 1;
    }
    else{
      var index = 1;
    }
    var param_key = $(parentEl).find('.other_links_params_key').val();
    other_link = other_link.html().replace(/replace_index/g, index).replace(/replace_param/g, param_key);
    $(parentEl).find('.brand_messages_links').append(other_link);
  });

  $(document).on('click', ".remove_other_message_link_lists", function(){
    $(this).closest(".other_message_link_lists").remove();
  });

  $(document).on('click', '.clear_content_channel_specific', function(){
    var parentElId = $(this).closest('.parent_messages').attr('id');
    $('#specific_channel_type_id').val(parentElId);
    setTimeout(function () {
      $('#ConfimDeleteNotificationModal').modal("show");
    }, 1000);
  });

  $(document).on('click', '.confirm_clear_content_channel_specific', function(){
    var parentElId = $('#specific_channel_type_id').val();
    $('#'+parentElId).find('input').val(' ');
    $('#'+parentElId).find('textarea').val(' ');
    $('.modal').modal('hide');
  });

  $(document).on('click', '.save_content_channel_specific', function(e){
    e.preventDefault();
    var parentEl = $(this).closest('.parent_messages');
    $('.parent_messages').find('input').prop("disabled", true);
    $('.parent_messages').find('textarea').prop("disabled", true);
    $(parentEl).find('input').prop("disabled", false);
    $(parentEl).find('textarea').prop("disabled", false);
    var form = $(this).closest('form');
    form.submit();
  });

  $(document).on('change', '.filter_message_by_type', function(){
    $(this).closest('form').submit();
  });
  $(document).on('click', '.filter_message_by_month', function(){
    $(this).closest('form').submit();
  });
  $(document).on('click', '.filter_message_by_year', function(){
    $(this).closest('form').submit();
  });

  $(document).on('click', '.add_new_picture_btn', function(){
    var parentEl = $(this).closest('.parent_messages').attr('id');
    $('#'+parentEl).find('.add_new_channel_specific_picture').click();
  });
  $(document).on('click', '.add_new_video_btn', function(){
    var parentEl = $(this).closest('.parent_messages').attr('id');
    $('#'+parentEl).find('.add_new_channel_specific_video').click();
  });

  $(document).on("click", ".commission_customer_check", function(){
    var id = getId(this.id);
    var parentEl = $(this).closest('.commission_customers');
    var bg_color_ele = $(parentEl).find('.change_customer_assoc_select_color');
    if ($(this).is(":checked")){
      $(parentEl).find('.select_text').addClass('hide')
      $(parentEl).find('.unselect_text').removeClass('hide');
      $(bg_color_ele).removeClass('blueBg');
      $(bg_color_ele).addClass('redBg');
    }
    else{
      $(parentEl).find('.select_text').removeClass('hide')
      $(parentEl).find('.unselect_text').addClass('hide');
      $(bg_color_ele).addClass('blueBg');
      $(bg_color_ele).removeClass('redBg');
    }
  });

});
