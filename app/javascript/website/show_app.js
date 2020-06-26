$(document).ready(function(){

  initiateOfferBuyerFields();

  initiateOfferPABuyerFields();

  initiateOfferRentResidentFields();

  if (window.location.search.indexOf('manage_and_convey_offers=true') > -1){
    setTimeout(function(){
      $("#manage_convey_offers_modal").modal("show");
    }, 500);
  }

  //update show to plus service
  $(document).on('click', '.update_show_to_plus_service', function(){
    var update_to_plus_service = $(this).closest('.show-fields').find('.update_to_plus_service');
    $(this).find('.icon').toggleClass('hide');
    if ($(update_to_plus_service).val() == "true"){
      $(update_to_plus_service).val("false");
      $(this).removeClass('btn-blue');
      $('.change_text_color').addClass('text-blue');
      $(this).addClass('btn-default');
    }else{
      $(update_to_plus_service).val("true");
      $(this).addClass('btn-blue');
      $('.change_text_color').removeClass('text-blue');
      $(this).removeClass('btn-default');
    }
  });

  //unconfirm offer
  $(document).on('click', '#update_to_preliminary_agreement', function(){
    if (confirm(I18n.t("js.general.task.are_you_sure"))){
      var t;
      clearTimeout(t);
      t = setTimeout(function () {
        $('.pre-icon').show();
        var commission_id = $("#commission_id").val();
        url = '/agent_office/commissions/'+ commission_id + "/update_to_preliminary_agreement/";
        $.ajax({
          url: url,
          type: 'post'
        });
      }, 100);
    }
  });

  //unconfirm offer
  $(document).on('click', '#unconfirm_offer', function(){
    if (confirm(I18n.t("js.general.task.are_you_sure"))){
      var t;
      clearTimeout(t);
      t = setTimeout(function () {
        $('.pre-icon').show();
        var commission_id = $("#commission_id").val();
        url = '/agent_office/commissions/'+ commission_id + "/unconfirm_offer/";
        $.ajax({
          url: url,
          type: 'put'
        });
      }, 100);
    }
  });

  if ($("#show_application").length > 0){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var modal = url.searchParams.get("modal");
    if (modal){
      $("#" + modal).modal('show');
      var index = 0;
      index = url_string.indexOf('&modal');
      if(index != -1){
        newURL = url_string.substring(0, index);
        window.history.pushState("", "", newURL);
      }
    }
  }

  if ($('#lock_show').length > 0){
    lock_register_new_visitor_form()

  }

  $('#shows').on('cocoon:after-insert', function(e, new_show) {
    //var new_index = $("#shows").find('.show-fields').length;
    var new_index  =$(new_show).find('.show_date').attr('id').split('agent_office_commission_base_shows_attributes_')[1].split('_show_date')[0];
    new_show_html = $(new_show).html().replace(/index0/g, "index"+(new_index));
    $(new_show).html(new_show_html);
  });

  $(document).on('click', '.AuthAgentUnLockBtn', function(){
    var back_modal_id = $(this).data("back_modal_id");
    $('body').addClass('hide');
    $(".modal").modal('hide');
    setTimeout(function(){
      $('#auth_agent_modal').addClass('bgWhite');
      $('#auth_agent_modal').data('bs.modal',null);
      $('#auth_agent_modal').modal({
        backdrop: 'static',
        keyboard: false
      });
      $('body').removeClass('hide');
    }, 1000);
    $("#auth_agent_back_btn").data("show_modal_id", back_modal_id);
    if (back_modal_id == 'register_new_visitor_modal'){
      $("#auth_agent_register_new_visitor").val('true');
    }
    else{
      $("#auth_agent_register_new_visitor").val('false');
    }
  });

  $(document).on('click', '.authAgentShowAppBack', function(){
    $('body').addClass('hide');
    $('.modal').modal('hide');
    var show_modal_id = $(this).data('show_modal_id');
    if ($('#' + show_modal_id).length > 0){
      setTimeout(function () {
        $("#" + show_modal_id).addClass('bgWhite');
        $("#" + show_modal_id).modal('show');
        $('body').removeClass('hide');
      }, 1000);
    }
  });

  $(document).on('click', '.BookOfferUnLockBtn', function(){
    var back_modal_id = $(this).data("back_modal_id");
    $('body').addClass('hide');
    $(".modal").modal('hide');
    setTimeout(function(){
      $('#auth_book_offer_modal').addClass('bgWhite');
      $('#auth_book_offer_modal').data('bs.modal',null);
      $('#auth_book_offer_modal').modal({
        backdrop: 'static',
        keyboard: false
      });
      $('body').removeClass('hide');
    }, 1000);
    $("#auth_book_offer_back_btn").data("show_modal_id", back_modal_id);
    if (back_modal_id == 'book_offer_modal'){
      $("#auth_book_offer").val('true');
    }
    else{
      $("#auth_book_offer").val('false');
    }
  });

  $(document).on('click', '.authbookOfferShowAppBack', function(){
    $('body').addClass('hide');
    $('.modal').modal('hide');
    var show_modal_id = $(this).data('show_modal_id');
    if ($('#' + show_modal_id).length > 0){
      setTimeout(function () {
        $("#" + show_modal_id).addClass('bgWhite');
        $("#" + show_modal_id).modal('show');
        $('body').removeClass('hide');
      }, 1000);
    }
  });

  if ($("#BookOfferScreenLocked").length > 0 ){
    var is_locked = $("#BookOfferScreenLocked").val()
    if (is_locked == "true"){
      lock_book_offer_form();  
    }
  }


  $(document).on('click', '.BookOfferLockBtn', function(){
    lock_book_offer_form();
  });

  $(document).on('click', '#book_new_offer_step_1', function(){
    $(".modal").modal('hide');
    var t;
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      var commission_id = $("#commission_id").val();
      var commission_type = $("#commission_type").val();
      if (commission_type == "C_RENT"){
        url = '/agent_office/commissions/'+ commission_id + "/book_new_rent_application_form/";
      }
      else{
        url = '/agent_office/commissions/'+ commission_id + "/book_new_offer_form/";
      }
      $.ajax({
        url: url,
        type: 'POST',
        data: {office_id : $("#book_new_offer_step_1").data('office_id'), offer_id : $("#book_new_offer_step_1").data('offer_id'), outer_world: $("#book_new_offer_step_1").data('outer_world')}
      });
    }, 100);
  })

  $(document).on('click', '.book_new_preliminary_agreement_return', function(){
    var offer_id = $(this).data('offer_id');
    var step = $(this).data('step');
    var t;
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commissions/'+ commission_id + "/book_new_preliminary_agreement_form/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {offer_id : offer_id, step : step}
      });
    }, 100);
  })

  $('#shows').on('cocoon:after-insert', function(e, insertedItem) {
    $(insertedItem).find('.datepickeron').datepicker({
      format: 'dd.mm.yyyy',
      weekStart: 1,
      autoclose: true,
      todayHighlight: true,
      clearBtn: true,
      disableTouchKeyboard: true,
      Readonly: true
    });
  });

  $(document).on('change', '.visitor_interested, .visitor_save_particulars_permission, .visitor_contact_permission, .visitor_convey_particulars_bank', function(){
    if ($('.visitor_interested').is(':checked')){
      if ($('.visitor_save_particulars_permission').is(':checked') && $('.visitor_contact_permission:checked').val() == 'true'){
        if ($('.visitor_loan_offer').is(':checked')){
          if ($('.visitor_convey_particulars_bank').is(':checked')){
            $('.visitor_permission_needed').addClass('hide');
            $("#visitor_form_save").attr('disabled', false);
          }
          else{
            $('.visitor_permission_needed').removeClass('hide');
            $("#visitor_form_save").attr('disabled', true);
          }
        }
        else{
          $('.visitor_permission_needed').addClass('hide');
          $("#visitor_form_save").attr('disabled', false);
        }
      }
      else{
        $('.visitor_permission_needed').removeClass('hide');
        $("#visitor_form_save").attr('disabled', true);
      }
    }
    else{
      $('.visitor_permission_needed').addClass('hide');
      $("#visitor_form_save").attr('disabled', false);
    }
    if ($('.visitor_loan_offer').is(':checked')){
      $('.convey_particulars_bank_ele').removeClass('hide');
    }
    else{
      $('.convey_particulars_bank_ele').addClass('hide');
    }
  });

  $(document).on('change', '.offer_purchase_type', function(){
    if ($(this).val() == "CASH"){
      $(this).closest('.purchase_type_info').find('.other_purchase_fields').addClass('hide');
      $(".c_cash_purchase_fields").removeClass('hide');
    }
    else{
      $(this).closest('.purchase_type_info').find('.other_purchase_fields').removeClass('hide');
      $(".c_cash_purchase_fields").addClass('hide');
    }
  });

  $(document).on('change', '.shares_closing_type', function(){
    if ($(this).val() == "CLOSING_PRIMARY"){
      $('.closing_primary').find('input[type=text]').prop('disabled', false);
      $('.closing_secondary').find('input[type=text]').prop('disabled', true);
    }
    else{
      $('.closing_primary').find('input[type=text]').prop('disabled', true);
      $('.closing_secondary').find('input[type=text]').prop('disabled', false);
    }
  });


  $(document).on('change', '.shares_payment_type', function(){
    if ($(this).val() == "PAYMENT_PRIMARY"){
      $('.payment_primary').find('input[type=text]').prop('disabled', false);
      $('.payment_secondary').find('input[type=text]').prop('disabled', true);
    }
    else{
      $('.payment_primary').find('input[type=text]').prop('disabled', true);
      $('.payment_secondary').find('input[type=text]').prop('disabled', false);
    }
    });

  $(document).on('change', '.offer_property_rented', function(){
    if ($(this).val() == "true"){
      $('.offer_property_rented_info').removeClass('hide');
    }
    else{
      $('.offer_property_rented_info').addClass('hide');
    }
  });

  $(document).on('change', '.c_transaction_conclusion_preconditions', function(){
    if ($(this).is(":checked")){
      $('.c_transaction_conclusion_preconditions_info').removeClass('hide');
    }
    else{
      $('.c_transaction_conclusion_preconditions_info').addClass('hide');
    }
  });

  $(document).on('change', '.c_offer_type', function(){
    if ($(this).val() == "STANDARD_COMPENSATION"){
      $('.c_standard_compensation_info').removeClass('hide');
      $('.c_deposit_offer_info').addClass('hide');
    }
    else{
      $('.c_standard_compensation_info').addClass('hide');
      $('.c_deposit_offer_info').removeClass('hide');
    }
  });

  $(document).on("click", ".checkUncheckVisitors", function(){
    var check_uncheck_visitors = $('.checkUncheckVisitors');
    for (var i = 0; i < check_uncheck_visitors.length; i++) {
      check_uncheck_visitors[i].checked = false;
      check_uncheck_visitors[i].value = "false";
    }
    this.checked = true;
    this.value = "true";
    if (this.id == "show_by_show"){
      $('.listAllPreviousShows').removeClass('hide');
    }
    else{
     $('.listAllPreviousShows').addClass('hide'); 
    }
  });

  $(document).on("click", ".previous_show_check", function(){
    var id = getId(this.id);
    //if checked
    if ($("#previous_show_check_" + id).is(":checked")) {
      // update to unselect text
      set_unselect_text("#previous_show_select_text_" + id, "#previous_show_unselect_text_" + id);
    }
    else {
      // update to select text
      set_select_text("#previous_show_select_text_" + id, "#previous_show_unselect_text_" + id);
    }
  });

  $(document).on('change', '.offer_reply_type', function(){
    if ($(this).val() == "ACCEPTED" || $(this).val() == "REJECTED" || $(this).val() == "COUNTER_OFFER"){
      if ($(this).val() == "COUNTER_OFFER"){
        counterOfferFormDisable(false, false);
      }
      else{
        counterOfferFormDisable(true, false);
      }
      $('.counter_offer_submit').attr('disabled', false);
    }
    else{
      $('.counter_offer_submit').attr('disabled', true);
    }
  });

  $(document).on('click', '.show_valid_offer_detailed_info', function(){
    $(this).closest('.valid_offer').find('.arrow, .valid_offer_detailed_info').toggleClass('hide');;
  });

  $(document).on('change', '.offerors_check', function(){
    var id = getId(this.id);
    var parent_ele = $(this).closest('.offeror_messages');
    var select_ele = $(parent_ele).find("#offerors_select_text_" + id);
    var unselect_ele = $(parent_ele).find("#offerors_unselect_text_" + id);
    if ($(this).is(":checked")) {
      // update to unselect text
      set_unselect_text(select_ele, unselect_ele);
    }
    else {
      // update to select text
      set_select_text(select_ele, unselect_ele);
    }
  });

  $(document).on('change', '.visitors_check', function(){
    var id = getId(this.id);
    var parent_ele = $(this).closest('.visitor_messages');
    var select_ele = $(parent_ele).find("#visitors_select_text_" + id);
    var unselect_ele = $(parent_ele).find("#visitors_unselect_text_" + id);
    if ($(this).is(":checked")) {
      // update to unselect text
      set_unselect_text(select_ele, unselect_ele);
    }
    else {
      // update to select text
      set_select_text(select_ele, unselect_ele);
    } 
  });

  $(document).on('click', '#ManageConevyOfferorBtn, .manage_convey_modal_open_btn', function(){
    $('.manage_convey_offers_modal').removeClass('hide');
    $('.offer_pipeline_modal').addClass('hide');
    $(".offer_history_back_btn").data('show_modal_id', 'manage_convey_offers_modal')
  });

  $(document).on('click', '#OfferPipelineActiveOfferorBtn, #OfferPipelinePassiveOfferorBtn, .GotoActiveofferBtn', function(){
    $('.manage_convey_offers_modal').addClass('hide');
    $('.offer_pipeline_modal').removeClass('hide');
  });

  $(document).on('click', '.GotoPassiveofferBtn', function(){
    $(".offer_history_back_btn").data('show_modal_id', 'offer_pipeline_modal')
  });

  $(document).on('click', '.accept-reject-offer', function(e){
    if (confirm(I18n.t("js.general.task.are_you_sure"))){
      url = $(this).data('url')
      t = setTimeout(function () {
        $.ajax({
          url: url,
          type: 'POST'
        });
      }, 100);
    }
    else{
      $(".pre-icon").hide();
    }
  });

  $(document).on('change keyup', '.uniqness_mandtory', function(e){
    var form = $(this).closest('form');
    var class_name = $(this).attr("data-unique");
    $(this).addClass(class_name);
    var unique_fields = $(form).find('.'+class_name);
    var isValid = checkIfAllFieldsHaveUniqueValues(unique_fields);
    if (isValid){
      e.preventDefault();
      $(form).find(".has-error").find('input').focus();
    }
  });

  $(document).on('keyup', '.only_calculate_fraction, .only_calculate_percentage', function(e){
     var classes = $.grep(this.className.split(" "), function(v, i){
       return v.indexOf('only_calculate_') === 0;
    }).join();
    checkSumOfOnlyFractionOrPercentage(e,this,classes.split("_")[2])
  });
  
  $(document).on('keyup', '.calculate_fraction, .calculate_percentage', function(e){
    parent_owner = $(this).closest('.ownershipParent')
    if ($(this).hasClass('calculate_fraction')){
      result = calculate_percentage_from_fraction($(this).val().toString())
      parent_owner.find('.calculate_percentage').val(result).trigger('change');
    }else{
      result = calculate_fraction_from_percentage($(this).val())
      parent_owner.find('.calculate_fraction').val(result).trigger('change');
    }
    checkSumOfCalculateFraction(e,this)
  });

  $(document).on("change", ".offer_asset_transfer_tax_pay_type", function(){
    if ($(this).val() == "FREE_FROM_TAX"){
      first_home = "true";
    }
    else{
      first_home = "false";
    }
    $(this).closest('.contact-type-fields').find('.first_home').val(first_home);
  });

});

function setBuyerContactFields(ele) {
  if ($(ele).find('.contact_fields').length == 0){
    $(ele).find(".add_fields").click();
  }
  $(ele).find(".add_fields").remove();
  if (ele[0].id == "default_buyer" || ele[0].id == "pa_default_buyer" ||  ele[0].id == "default_rent_resident"){
    $(ele).find(".remove_fields").remove();
  }
  $(ele).find(".actual_contact_info").after($(ele).find(".buyer_contact_fields"));
}

function counterOfferFormDisable(inputDisable, replyDisable) {
  $(".counter_offer_form :input").attr("disabled", inputDisable);
  $(".counter_offer_form .offer_reply_type").attr("disabled", replyDisable);
}

function initiateOfferBuyerFields(){
  // after adding customer-assoc and click on add_field link to add render customer fields and then remove the link
  $('#contact_types').on('cocoon:after-insert', function(e, insertedItem) {
    setBuyerContactFields(insertedItem);
  });

  //if new defaut buyer is added then click on add field to render customer fields, remove add link and remove 'remove' link
  if ($("#default_buyer").length > 0){
    setBuyerContactFields($("#default_buyer"));
  }
}

function removeAddLinkFromBuyerForm(){
  // remove add link in case user goes back to step 1, as this forms are already in dom
  $("#default_buyer").find(".add_fields").remove();
  $(".contact-type-fields").find(".add_fields").remove();
}

function initiateOfferRentResidentFields(){

  $('#rent_residents').on('cocoon:after-insert', function(e, insertedItem) {
    setBuyerContactFields(insertedItem);
  });

  //if new defaut buyer is added then click on add field to render customer fields, remove add link and remove 'remove' link
  if ($("#default_rent_resident").length > 0){
    setBuyerContactFields($("#default_rent_resident"));
  }
}

function initiateOfferPABuyerFields(){
  // after adding customer-assoc and click on add_field link to add render customer fields and then remove the link
  $('#pa_contact_types').on('cocoon:after-insert', function(e, insertedItem) {
    setBuyerContactFields(insertedItem);
  });

  //if new defaut buyer is added then click on add field to render customer fields, remove add link and remove 'remove' link
  if ($("#pa_default_buyer").length > 0){
    setBuyerContactFields($("#pa_default_buyer"));
  }
}

function removeAddLinkFromPABuyerForm(){
  // remove add link in case user goes back to step 1, as this forms are already in dom
  $("#pa_default_buyer").find(".add_fields").remove();
  $(".contact-type-fields").find(".add_fields").remove();
}

function lock_book_offer_form(){
  $('body').addClass('hide');
  $(".BookOfferLockBtn").addClass('hide');
  $(".BookOfferUnLockBtn").removeClass('hide');
  $(".modal").modal('hide');
  setTimeout(function(){
    $('#book_offer_modal').addClass('bgWhite');
    $('#book_offer_modal').data('bs.modal',null);
    $('#book_offer_modal').modal({
      backdrop: 'static',
      keyboard: false
    });
    $('body').removeClass('hide');
  }, 1000);
  $(".lock_btn").prop('disabled', true);
  // $("#BookOfferScreenLocked").val(true);
}

function lock_book_offer_modal_screen(){
  $('body').addClass('hide');
  $(".modal").modal('hide');
  setTimeout(function(){
    $('#book_offer_completion_modal').addClass('bgWhite');
    $('#book_offer_completion_modal').data('bs.modal',null);
    $('#book_offer_completion_modal').modal({
      backdrop: 'static',
      keyboard: false
    });
    $('body').removeClass('hide');
  }, 1000);
  $(".lock_btn").prop('disabled', true);
  $("#BookOfferScreenLocked").val(true);
}


function lock_register_new_visitor_form(){
  $('body').addClass('hide');
  $("#AuthAgentLockBtn").addClass('hide');
  $(".AuthAgentUnLockBtn").removeClass('hide');
  $(".modal").modal('hide');
  setTimeout(function(){
    $('#register_new_visitor_modal').addClass('bgWhite');
    $('#register_new_visitor_modal').data('bs.modal',null);
    $('#register_new_visitor_modal').modal({
      backdrop: 'static',
      keyboard: false
    });
    $('body').removeClass('hide');
  }, 1000);
  $(".lock_btn").prop('disabled', true);
  $(".lock_pdf").addClass('disableattchmentbutton')
  $("#auth_agent_screen_locked").val(true);
}

function lock_visitor_registration_completion_modal_screen(){
  $('body').addClass('hide');
  $(".modal").modal('hide');
  setTimeout(function(){
    $('#visitor_registration_completion_modal').addClass('bgWhite');
    $('#visitor_registration_completion_modal').data('bs.modal',null);
    $('#visitor_registration_completion_modal').modal({
      backdrop: 'static',
      keyboard: false
    });
    $('body').removeClass('hide');
  }, 1000);
  $(".lock_btn").prop('disabled', true);
  $("#auth_agent_screen_locked").val(true);
}

function checkSumOfCalculateFraction(e,element){
  var form = $(element).closest('form')
  var parentClass = $(element).closest('.calculate_fraction_and_percentage_both')
  var fraction_Transfer_tax_fields = parentClass.find('.calculate_fraction');
  var percentage_Transfer_tax_fields = parentClass.find('.calculate_percentage');
  
  if (fraction_Transfer_tax_fields.length > 0) {
    var msg_f = I18n.t("js.general.task.total_must_be_less_or_equal_to_1")
    var isTransferTaxValid_f = checkIfSumEqualToOne(fraction_Transfer_tax_fields);
    displayRemoveValidationMsg(form,e,msg_f,fraction_Transfer_tax_fields,isTransferTaxValid_f)  
  }
  if (percentage_Transfer_tax_fields.length > 0) {
    var msg_p = I18n.t("js.general.task.total_must_be_less_or_equal_to_100")
    var isTransferTaxValid_p = checkIfPerSumEqualToOne(percentage_Transfer_tax_fields);
    displayRemoveValidationMsg(form,e,msg_p,percentage_Transfer_tax_fields,isTransferTaxValid_p)
  }
}

function checkSumOfOnlyFractionOrPercentage(e,element,cal_type){
  var form = $(element).closest('form')
  var all_Transfer_tax_fields = $(element).closest('.contact-type-fields-validation').find('.only_calculate_'+cal_type);
  
  if (all_Transfer_tax_fields.length > 0) {
    if (cal_type == "fraction"){
      var msg = I18n.t("js.general.task.total_must_be_less_or_equal_to_1")
      var isTransferTaxValid = checkIfSumEqualToOne(all_Transfer_tax_fields);
    }else{
      var msg = I18n.t("js.general.task.total_per_must_be_less_or_equal_to_100")
      var isTransferTaxValid = checkIfPerSumEqualToOne(all_Transfer_tax_fields);
    }
    displayRemoveValidationMsg(form,e,msg,all_Transfer_tax_fields,isTransferTaxValid)  
  }
}

function displayRemoveValidationMsg(form,e,msg,all_Transfer_tax_fields,isTransferTaxValid){
  if (isTransferTaxValid){
    $(all_Transfer_tax_fields).each(function() {
      remove_validation_text($(this));
    });
  }else{
    e.preventDefault();
    $(all_Transfer_tax_fields).each(function() {
      display_validation_text($(this),msg);
    });
  }
  if ($(form).find(".has-error").length > 0){
    $(form).find("button[type='submit']").prop('disabled',true);}
  else{
    $(form).find("button[type='submit']").prop('disabled',false);
  }  
}

function calculate_percentage_from_fraction(fraction) {
  if (fraction.match('/') != null){
    var split = fraction.split('/');
    var result = (parseInt(split[0], 10)*100) / parseInt(split[1], 10);
  }else{
    result = (parseInt(fraction)*100)
  }
  if (result % 1 != 0){
    result = parseFloat(result).toFixed(2)
  }
  return checkIsNaNVal(result)
}

function calculate_fraction_from_percentage(percent) {
  if (percent.match('%') != null){
    var split = percent.split('%');
    var result = (parseInt(split[0])/100);
  }else{
    var result = (percent/100);
  }
  return (convert_to_fraction(result))
}


function highestCommonFactor(a,b) {
  if (b==0) return a;
  return highestCommonFactor(b,a%b);
}

function convert_to_fraction(num, return_object = false){
  if (!num.toString().split('.')[1]){
    num = num.toFixed(2);
  }
  var decimal = num.toString();
  var decimalArray = decimal.split(".");
  var leftDecimalPart = decimalArray[0]; // 1
  var rightDecimalPart = decimalArray[1]; // 75

  var numerator = leftDecimalPart + rightDecimalPart // 175
  var denominator = Math.pow(10,rightDecimalPart.length); // 100
  var factor = highestCommonFactor(numerator, denominator); // 25
  denominator /= factor;
  numerator /= factor;
  if (return_object){
    return {numerator: numerator, denominator: denominator};
  }
  else{
    if (numerator == 1 && denominator == 1){
      return numerator;
    }
    else if (numerator == 0 && denominator == 1){
      return 0;
    }
    else{
      return (numerator+'/'+denominator);
    }
  }
}