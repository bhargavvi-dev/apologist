$(document).ready(function() {

  $(document).on("click", ".responsible_person", function(){
    var id = getId(this.id);
    set_responsible_person(id);
    if (!$("#responsible_person_check_" + id).is(":checked")) {
      $("#selected_responsible_person").val("");
    }
  });

  $(document).on("click", ".internal_responsible_person", function(){
    var id = getId(this.id);
    set_internal_responsible_person(id);
    if (!$("#internal_responsible_person_check_" + id).is(":checked")) {
      $("#selected_internal_responsible_person").val("");
    }
  });

  $(document).on("click", ".inspector_check", function(){
    var id = getId(this.id);
    var parent_ele = $(this).closest('.office_inspector');
    var select_ele = $(parent_ele).find("#inspector_select_text_" + id);
    var unselect_ele = $(parent_ele).find("#inspector_unselect_text_" + id);
    if ($(this).is(":checked")) {
      // update to unselect text
      addIdToArray("selected_inspector", id);
      set_unselect_text(select_ele, unselect_ele);
    }
    else {
      // update to select text
      removeIdFromArray("selected_inspector", id);
      set_select_text(select_ele, unselect_ele);
    }

  });

  $("#office_fixed_fee_promotion_check").click(function(){
    if ($(this).is(':checked')) {
      $("#office_fixed_fee_promotion").removeAttr('disabled');
    }
    else {
      $("#office_fixed_fee_promotion").val("");
      $("#office_fixed_fee_promotion").attr({'disabled': 'disabled'});
    }
  });

  $('#filterFormIdInspector' ).on( 'change', 'select', function(){
    $("#add-inspector-loader").show();
    $('#filterFormIdInspector').submit();
  });

  $(document).on("click", ".photography_partner", function(){
    var id = getId(this.id);
    $(".OrderFormStep1Save").attr('disabled', false);
    set_photography_partner(id);
    if (!$("#photography_check_" + id).is(":checked")) {
      $("#selected_photography_partner").val("");
      $(".OrderFormStep1Save").attr('disabled', true);
    }
  });

  if ($("#selected_photography_partner").length > 0){
    checkUncheckPhotographyPartners();
  }

  if ($("#selected_floor_plan_partner").length > 0){
    checkUncheckFloorPartners();
  }

  $(document).on("click", ".floor_plan_partner", function(){
    var id = getId(this.id);
    set_floor_plan_partner(id);
    $(".OrderFormStep1Save").attr('disabled', false);
    if (!$("#floor_plan_check_" + id).is(":checked")) {
      $("#selected_floor_plan_partner").val("");
      $(".OrderFormStep1Save").attr('disabled', true);
    }
  });

  $("#add_visiting_address").click(function(){
    $("#visiting_address_wrapper").removeClass("hide");
    $("#add_visiting_address_wrapper").remove();
  });

  $("#add_billing_address").click(function(){
    $("#billing_address_wrapper").removeClass("hide");
    $("#add_billing_address_wrapper").remove();
  });

  $("#office_immediate_customer_reward_payment_false").click(function(){
    $("#office_customer_reward_payment_days").removeAttr('disabled');
  });

  $("#office_immediate_customer_reward_payment_true").click(function(){
    $("#office_customer_reward_payment_days").attr({'disabled': 'disabled'});
  });

  $("#office_joining_fee_check").click(function(){
    if ($(this).is(':checked')) {
      $("#office_joining_fee").removeAttr('disabled');
    }
    else {
      $("#office_joining_fee").val("");
      $("#office_joining_fee").attr({'disabled': 'disabled'});
    }
  });

  $("#office_fixed_fee_check").click(function(){
    if ($(this).is(':checked')) {
      $("#office_fixed_fee").removeAttr('disabled');
    }
    else {
      $("#office_fixed_fee").val("");
      $("#office_fixed_fee").attr({'disabled': 'disabled'});
    }
  });

  $("#office_royalty_check").click(function(){
    if ($(this).is(':checked')) {
      $("#office_royalty").removeAttr('disabled');
    }
    else {
      $("#office_royalty").val("");
      $("#office_royalty").attr({'disabled': 'disabled'});
    }
  });

  if ($("#new_opening_hours").length > 0) {
    $("#monday_start_hour").focusout(function(){
      monday_start_hour = $(this).val();
      start_hours = $(".start_hour");
      for(i = 0; i < start_hours.length; i++) {
        $(start_hours[i]).val(monday_start_hour)
      }
    });

    $("#monday_start_minute").focusout(function(){
      monday_start_minute = $(this).val();
      start_minutes = $(".start_minute");
      for(i = 0; i < start_minutes.length; i++) {
        $(start_minutes[i]).val(monday_start_minute)
      }
    });

    $("#monday_end_hour").focusout(function(){
      monday_end_hour = $(this).val();
      end_hours = $(".end_hour");
      for(i = 0; i < end_hours.length; i++) {
        $(end_hours[i]).val(monday_end_hour)
      }
    });

    $("#monday_end_minute").focusout(function(){
      monday_end_minute = $(this).val();
      end_minutes = $(".end_minute");
      for(i = 0; i < end_minutes.length; i++) {
        $(end_minutes[i]).val(monday_end_minute)
      }
    });
  }

  $("#openingHoursBtn").click(function(){
    $("#opening-hours-loader").show();
  });

  $("#moreOptionsBtn").click(function(){
    $("#opening-hours-loader").show();
  });


  $('.numeric-keyped').click(function() {    
    $('#office_joining_fee').val($('#office_joining_fee').val()+$(this).val());
    $('#office_joining_fee').focus();
  })

  $('.numeric-remove').click(function() {
    $('#office_joining_fee').val($('#office_joining_fee').val().slice(0,-1));
    $('#office_joining_fee').focus();
  })

  $("#office_joining_fee").bind('change keyup focus click keydown', function(e) {
    $('.number-picker').show();
  })

  $('.numeric-btn-colse').click(function() {
    $('.number-picker').hide();
    $('#office_joining_fee').focus();
  })

  $("body").click(function(e){
    if (!((e.target.id == "office_joining_fee") || (e.target.type == "button"))) {
      $('.number-picker').hide();
    }
  });

  $(".add_office_introduction_text").click(function() {
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $(".add_office_introduction_text" + id).remove();
    $("#office_introduction_text_area" + id).removeClass('hide');
  });

  if($("#office_introduction").val() != ""){
    $(".add_office_introduction_text").remove();
    $("#office_introduction_text_area").removeClass('hide');
  } 

});

function set_responsible_person(id) {
  var $box = $("#responsible_person_check_" + id);
  $(".responsible_select_text").removeClass('hide');
  $(".responsible_unselect_text").addClass('hide');
  if ($box.is(":checked")) {
    $("#selected_responsible_person").val(id);
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    $(group).prop("checked", false);
    $box.prop("checked", true);
    $("#responsible_select_text_" + id).addClass('hide');
    $("#responsible_unselect_text_" + id).removeClass('hide');
  }
}

function set_internal_responsible_person(id) {
  var $box = $("#internal_responsible_person_check_" + id);
  $(".internal_responsible_select_text").removeClass('hide');
  $(".internal_responsible_unselect_text").addClass('hide');
  if ($box.is(":checked")) {
    $("#selected_internal_responsible_person").val(id);
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    $(group).prop("checked", false);
    $box.prop("checked", true);
    $("#internal_responsible_select_text_" + id).addClass('hide');
    $("#internal_responsible_unselect_text_" + id).removeClass('hide');
  }
}

function set_photography_partner(id) {
  var $box = $("#photography_check_" + id);
  $(".photography_select_text").removeClass('hide');
  $(".photography_unselect_text").addClass('hide');
  if ($box.is(":checked")) {
    $("#selected_photography_partner").val(id);
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    $(group).prop("checked", false);
    $box.prop("checked", true);
    $("#photography_select_text_" + id).addClass('hide');
    $("#photography_unselect_text_" + id).removeClass('hide');
  }
}

function set_floor_plan_partner(id) {
  var $box = $("#floor_plan_check_" + id);
  $(".floor_plan_select_text").removeClass('hide');
  $(".floor_plan_unselect_text").addClass('hide');
  if ($box.is(":checked")) {
    $("#selected_floor_plan_partner").val(id);
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    $(group).prop("checked", false);
    $box.prop("checked", true);
    $("#floor_plan_select_text_" + id).addClass('hide');
    $("#floor_plan_unselect_text_" + id).removeClass('hide');
  }
}

function set_filtered_responsible_person() {
  var id = $("#selected_responsible_person").val();
  if ($("#responsible_person_check_" + id).length > 0) {
    $("#responsible_person_check_" + id).prop('checked', true);
    set_responsible_person(id);
  }
  else{
    $(".responsible_select_text").removeClass('hide');
    $(".responsible_unselect_text").addClass('hide');
    var group = "input:checkbox[name='responsible_persons_check[]']";
    $(group).prop("checked", false);
  }
}
 
function set_filtered_internal_responsible_person() {
  var id = $("#selected_internal_responsible_person").val();
  if ($("#internal_responsible_person_check_" + id).length > 0) {
    $("#internal_responsible_person_check_" + id).prop('checked', true);
    set_internal_responsible_person(id);
  }
  else{
    $(".internal_responsible_select_text").removeClass('hide');
    $(".internal_responsible_unselect_text").addClass('hide');
    var group = "input:checkbox[name='internal_responsible_persons_check[]']";
    $(group).prop("checked", false);
  }
}

function set_filtered_inspector() {
  var ids = $("#selected_inspector").val().split(',');
  $(".inspector_select_text").removeClass('hide');
  $(".inspector_unselect_text").addClass('hide');
  var group = "input:checkbox[name='inspector_check[]']";
  $(group).prop("checked", false);
  ids.forEach(function(id){
    if ($("#inspector_check_" + id).length > 0) {
      $("#inspector_check_" + id).prop('checked', true);
      $("#inspector_select_text_"+id).addClass('hide');
      $("#inspector_unselect_text_"+id).removeClass('hide');
    }
  });
}

function checkUncheckPhotographyPartners() {
  var final_customer = $("#selected_photography_partner").val();
  if (final_customer){
    if ($("#photography_" + final_customer).length > 0){
      if (!$("#photography_check_" + final_customer).is(":checked")){
        $("#photography_check_" + final_customer).prop('checked', true)
      }
    }
  }
}

function checkUncheckFloorPartners() {
  var final_customer = $("#selected_floor_plan_partner").val();
  if (final_customer){
    if ($("#floor_plan_" + final_customer).length > 0){
      if (!$("#floor_plan_check_" + final_customer).is(":checked")){
        $("#floor_plan_check_" + final_customer).prop('checked', true)
      }
    }
  }
}