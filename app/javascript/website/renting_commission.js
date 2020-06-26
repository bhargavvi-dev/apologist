$(document).ready(function(){
  $(document).on("change", '.applicant_position_employee', function() {
    if ($(this).is(":checked")){
      $(this).closest('.contact-type-fields').find('.applicant_job_details_field').removeClass('hide');
    }
    else{
      $(this).closest('.contact-type-fields').find('.applicant_job_details_field').addClass('hide');
    }
  });

  $(document).on("change", '.applicant_position_student', function() {
    if ($(this).is(":checked")){
      $(this).closest('.contact-type-fields').find('.applicant_study_details_field').removeClass('hide');
    }
    else{
      $(this).closest('.contact-type-fields').find('.applicant_study_details_field').addClass('hide');
    }
  });

  $(document).on("click", '.send_app_form_btn', function() {
    $("#send_rent_app_form_back_btn").data('show_modal_id', $(this).data('return_back_modal'));
  });

  $(document).on("change", '.applicant_work_relationship_type', function() {
    var parentEl = $(this).closest('.contact-type-fields');
    if ($(this).val() == "PERMANENT"){
      $(parentEl).find('.applicant_permanent_work_fields').removeClass('hide');
      $(parentEl).find('.applicant_temporary_work_fields').addClass('hide');
      $(parentEl).find('.applicant_permanent_work_field_inputs').attr('disabled', false);
      $(parentEl).find('.applicant_temporary_work_field_inputs').attr('disabled', true);
    }
    else if ($(this).val() == "TEMPORARY"){
      $(parentEl).find('.applicant_permanent_work_fields').addClass('hide');
      $(parentEl).find('.applicant_temporary_work_fields').removeClass('hide');
      $(parentEl).find('.applicant_permanent_work_field_inputs').attr('disabled', true);
      $(parentEl).find('.applicant_temporary_work_field_inputs').attr('disabled', false);
    }
  });

  $(document).on("change", '.applicant_pets_present', function() {
    if ($(this).val() == "true"){
      $('.applicant_pets_fields').removeClass('hide');
    }
    else {
      $('.applicant_pets_fields').addClass('hide');
    }
  });

  $(document).on("change", '.applicant_credit_info_type', function() {
    var parentEl = $(this).closest('.contact-type-fields');
    if ($(this).val() == "PAYMENT_DEFAULT"){
      $('.applicant_credit_info_type_fields').removeClass('hide');
    }
    else {
      $('.applicant_credit_info_type_fields').addClass('hide');
    }
  });

  $(document).on("click", '.applicant_additional_info', function() {
    $(this).addClass('hide');
    $('.applicant_other_additional_info_fields').removeClass('hide');
  });

  $(document).on("change", '.applicant_lease_time_type', function() {
    var parentEl = $(this).closest('.parent');
    if ($(this).val() == "LEASE_PERMANENT" || $(this).val() == "COUNTER_LEASE_PERMANENT"){
      $(parentEl).find('.applicant_lease_permanent_fields').removeClass('hide');
      $(parentEl).find('.applicant_lease_temporary_fields').addClass('hide');
      $(parentEl).find('.applicant_lease_permanent_field_inputs').attr('disabled', false);
      $(parentEl).find('.applicant_lease_temporary_field_inputs').attr('disabled', true);
    }
    else if ($(this).val() == "LEASE_TEMPORARY" || $(this).val() == "COUNTER_LEASE_TEMPORARY"){
      $(parentEl).find('.applicant_lease_permanent_fields').addClass('hide');
      $(parentEl).find('.applicant_lease_temporary_fields').removeClass('hide');
      $(parentEl).find('.applicant_lease_permanent_field_inputs').attr('disabled', true);
      $(parentEl).find('.applicant_lease_temporary_field_inputs').attr('disabled', false);
    }
  });

  $(document).on("click", '.rent_applicant_offer_option', function() {
    if ($(this).hasClass('blueBgBox')){
      var makeGrayBg = true;
    }
    else{
      var makeGrayBg = false;
    }
    $('.rent_applicant_offer_option').removeClass('blueBgBox');
    $('.rent_applicant_offer_option').addClass('grayBgBox');
    $('.rent_applicant_accept_offer_label_defualt').removeClass('hide');
    $('.rent_applicant_accept_offer_label_undo').addClass('hide');
    $('.rental_counter_offer_terms').addClass('hide');
    if (makeGrayBg){
      $("#rent_applicant_offer_type").val("NO_APPLICANT_OFFER");
    }
    else{
      $(this).removeClass('grayBgBox');
      $(this).addClass('blueBgBox'); 
      $(this).find('.rent_applicant_accept_offer_label_defualt').addClass('hide');
      $(this).find('.rent_applicant_accept_offer_label_undo').removeClass('hide');
      var rent_applicant_offer_type = $(this).data("reply_type");
      $("#rent_applicant_offer_type").val(rent_applicant_offer_type);
      if (rent_applicant_offer_type == "COUNTER_RENT_OFFER"){
        $('.rental_counter_offer_terms').removeClass('hide');
      }
    }
  });

  $(document).on("change", '.other_co_security_deposit_receiver', function() {
    if ($(this).is(":checked")){
      $(this).closest('.parent').find('.co_security_deposit_receivers_info').removeClass('hide');
    }
    else {
      $(this).closest('.parent').find('.co_security_deposit_receivers_info').addClass('hide');
    }
  });

  $(document).on("change", '.guarantor_co_security_deposit_receiver', function() {
    if ($(this).is(":checked")){
      $(this).closest('.parent').find('.guarantor_fields').removeClass('hide');
    }
    else {
      $(this).closest('.parent').find('.guarantor_fields').addClass('hide');
    }
  });

  $(document).on("change", '.manually_filled_signed_application', function() {
    if ($(this).is(":checked")){
      $('.manually_filled_signed_application_file').removeClass('hide');
    }
    else {
      $('.manually_filled_signed_application_file').addClass('hide');
    }
  });

  $(document).on("click", ".apartment_is_leased", function(){
    if ($(this).val() == "true"){
      $('.check_apartment_is_leased_for_history').addClass("hide");
      $('.apartment_is_leased_col').addClass("col-sm-3");
      $('.apartment_is_leased_col').removeClass("col-sm-6");
      $('.check_apartment_is_leased').removeClass("hide");
    }
    else{
      $('.check_apartment_is_leased_for_history').removeClass("hide");
      $('.check_apartment_is_leased').addClass("hide");
      $('.apartment_is_leased_col').removeClass("col-sm-3");
      $('.apartment_is_leased_col').addClass("col-sm-6");
    }
  });    

  $(document).on("click", ".contract_lease_time_type", function(){
    var lease_type = $(this).val();
    if (lease_type == "CURRENT_LEASE_TIME") {
      $('.lease_time_type_for_now').removeClass("hide");
      $('.lease_time_type_limited').addClass("hide");
      $('.lease_time_type_other').addClass("hide");
    }
    if (lease_type == "LIMITED_LEASE_TIME"){
      $('.lease_time_type_limited').removeClass("hide");
      $('.lease_time_type_for_now').addClass("hide");
      $('.lease_time_type_other').addClass("hide"); 
    }
    if (lease_type == "OTHER_LEASE_TIME"){
      $('.lease_time_type_limited').addClass("hide");
      $('.lease_time_type_for_now').addClass("hide");
      $('.lease_time_type_other').removeClass("hide");  
    }
  });

  $(document).on("click", ".rent_agreement_lease_time_type", function(){
    var lease_type = $(this).val();
    if (lease_type == "CURRENT_LEASE_TIME") {
      $('.rent_agreement_enddate_tenancy').addClass("hide");
    }
    else if (lease_type == "LIMITED_LEASE_TIME"){
      $('.rent_agreement_enddate_tenancy').removeClass("hide");
    }
  });

  $(document).on("click keyup change", "#security_deposit_amount", function(){
    var total_month = $('#security_deposit_months').val();
    var total_rent = $(this).val();
    if (total_month){
       total_val = total_month * total_rent
      $('.total_deposit_value').val(total_val);
    } 
  });

  $(document).on("click keyup change", "#security_deposit_months", function(){
    var total_rent = $('#security_deposit_amount').val();
    var total_month = $(this).val();
    if (total_month){
       total_val = total_month * total_rent
      $('.total_deposit_value').val(total_val);
    } 
  });

  $(document).on("click", ".add_other_clause_info", function(){
    var other_clause = $("#dummy_other_clause_info").clone();
    var last_other_clause = $("#other_clause_info .other_clause_lists:last").attr('id');
    if (last_other_clause){
      var index = parseInt(getId(last_other_clause)) + 1;
    }
    else{
      var index = 1;
    }
    other_clause = other_clause.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_clause_info");
    $("#other_clause_info").append(other_clause);
  });

  $(document).on("click", ".remove_other_clauses", function(){
    $(this).closest(".other_clause_lists").remove();
  });

  $(document).on("click", "#rent_agreement_add_partial_month", function(){
    $("#rent_agreement_add_partial_month").addClass('hide');
    $('.rent_agreement_partial_month_rent_info').removeClass('hide');
  });

  $(document).on("click", ".remove_rent_agreement_partial_month_info", function(){
    $('.rent_agreement_partial_month_rent_info').addClass('hide');
    $('#rent_agreement_add_partial_month').removeClass('hide');
    $('.rent_agreement_partial_month_rent_info').find('input').val('');
  });

  $(document).on("click", ".add_tenant_other_costs_info", function(){
    var other_costs = $("#dummy_other_tenant_costs_info").clone();
    var last_other_costs = $("#other_tenant_costs_info .other_tenant_costs_lists:last").attr('id');
    if (last_other_costs){
      var index = parseInt(getId(last_other_costs)) + 1;
    }
    else{
      var index = 1;
    }
    other_costs = other_costs.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_costs_info");
    $("#other_tenant_costs_info").append(other_costs);
  });

  $(document).on("click", ".remove_other_tenant_costs_info", function(){
    $(this).closest(".other_tenant_costs_lists").remove();
  });

  $(document).on("click", ".rental_services_checked", function(){
    checkAdditionalServiceVal();
  });

  $(document).on("change", ".rental_services_price", function(){
    checkAdditionalServiceVal();
  });

  $(document).on('click', '.renting_commission_justification_type', function(){
    if ($(this).val() == "JUSTIFICATION_PCT"){
      $('.justification_type_pct').attr('disabled', false);
    }
    else{
      $('.justification_type_pct').attr('disabled', true);
    }
    if ($(this).val() == "JUSTIFICATION_INDEX_PCT"){
      $('.justification_type_index_pct').attr('disabled', false);
    }
    else{
      $('.justification_type_index_pct').attr('disabled', true);
    }
  });

  $(document).on('change', '.renting_security_deposit_type', function(){
    $('#security_deposit_amount').attr('disabled', true);
    $('#security_deposit_months').attr('disabled', true);
    $('.fixed_security_deposit_amount').attr('disabled', true);
    if ($(this).val() == "MONTHLY_DEPOSIT"){ 
      $('#security_deposit_amount').attr('disabled', false);
      $('#security_deposit_months').attr('disabled', false);
    }
    if ($(this).val() == "FIXED_DEPOSIT"){ 
      $('.fixed_security_deposit_amount').attr('disabled', false);
    }
  });

  $(document).on('change', '.rent_commission_time_limits', function(){
    if($(this).val() == "true"){
      $('.commission_start_date_not_limited').attr('disabled', true);
      $('.commission_start_date_limited').attr('disabled', false);
      $('.commission_end_date_limited').attr('disabled', false);
    }
    else{
      $('.commission_start_date_limited').attr('disabled', true);
      $('.commission_end_date_limited').attr('disabled', true);
      $('.commission_start_date_not_limited').attr('disabled', false);
    }
  });   

  $(document).on("change", '.rent_agreement_justification_type', function() {
    if ($(this).val() == "JUSTIFICATION_INDEX" || $(this).val() == "JUSTIFICATION_INDEX_PCT"){
      $(".rent_justification_basic_pct_fields").removeClass('hide');
    }
    else{
      $(".rent_justification_basic_pct_fields").addClass('hide');
    }
  });

  // add new other housing cost
  $(document).on("click", "#add_other_rental_condition", function(){
    var other_rental_condition = $("#dummy_other_rental_condition").clone();
    var last_other_rental_condition = $("#other_rental_conditions .other_rental_condition:last").attr('id');
    if (last_other_rental_condition){
      var index = parseInt(getId(last_other_rental_condition)) + 1;
    }
    else{
      var index = 1;
    }
    other_rental_condition = other_rental_condition.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_rental_conditions");
    $("#other_rental_conditions").append(other_rental_condition);
  })

  //remove other rental condition
  $(document).on("click", ".remove_other_rental_condition", function(){
    $(this).closest(".other_rental_condition").remove();
  });

  $(document).on("change", '.rent_property_use_type', function() {
    if ($(".rent_property_use_type:checked").val() == "PRIVATE_USE"){
      $('.private_use_tenant_info').find('input').attr('disabled', false);
      $('.private_use_tenant_info').removeClass('hide');
      $('.company_dweling_tenant_info').find('input').attr('disabled', true);
      $('.company_dweling_tenant_info').addClass('hide');
      $('.rent_agreement_confirm_employer').addClass('hide');
    }
    else if ($(".rent_property_use_type:checked").val() == "COMPANY_DWELLING"){
      $('.private_use_tenant_info').find('input').attr('disabled', true);
      $('.private_use_tenant_info').addClass('hide');
      $('.company_dweling_tenant_info').find('input').attr('disabled', false);
      $('.company_dweling_tenant_info').removeClass('hide');
      $('.rent_agreement_confirm_employer').removeClass('hide');
    }
  });

  $(document).on("change", '.rent_agreement_confirm_employer', function() {
    var indicator = $(this).val();
    $('.tenant_employer_information').addClass('hide');
    $("#tenant_employer_information_" + indicator).removeClass('hide');
    $('.rent_confirmed_employer').val(false);
    $("#rent_confirmed_employer_" + indicator).val(true);
  });

  $(document).on("click", '.remove_rent_resident', function() {
    var indicator = $(this).closest('.contact-type-fields').find('.contact_type_id').val();
    if (indicator){
      $("#tenant_employer_information_" + indicator).addClass('hide');
      $(".rent_agreement_confirm_employer option[value="+ indicator+ "]").remove();
    }
  });

  $(document).on("change", '.rent_amount', function() {
    var val = $(this).val();
    var parentEl = $(this).closest('.parent');
    $(parentEl).find('.rent_amount_deposit_type').val(val);
    var months = parseInt($(parentEl).find('.security_deposit_months').val());
    var security_deposit_amount = months*checkNumericValue(val);
    $(parentEl).find('.security_deposit_amount').val(show_formatted_number(security_deposit_amount));
  });

  $(document).on("change", '.security_deposit_months', function() {
    var parentEl = $(this).closest('.parent');
    var val = $(parentEl).find('.rent_amount').val();
    var months = parseInt($(parentEl).find('.security_deposit_months').val());
    var security_deposit_amount = months*checkNumericValue(val);
    $(parentEl).find('.security_deposit_amount').val(show_formatted_number(security_deposit_amount));
  });

  $(document).on("change", ".commission_renting_vat_type", function(){
      var vat_type = $(this).val();
      if (vat_type == "PRICE_INCLUDING_VAT"){
        $('.with_vat_fields').removeClass("hide");
        $('.without_vat_fields').addClass("hide");
        $('.with_vat_fields').find('input').attr('disabled', false);
        $('.with_vat_fields').find('select').attr('disabled', false);
        $('.without_vat_fields').find('input').attr('disabled', true);
        $('.without_vat_fields').find('select').attr('disabled', true);
        $('.brokerage_note').removeClass("hide");
        $('.brokerage_note_without_vat').addClass("hide");
        fixed_fee_type = $('.with_vat_fields .set_fixed_fee_type_option').val();
        if (fixed_fee_type == "MONTHLY_RENT"){
          $('.set_fee_type_class_monthly').addClass('hide');
          $('.set_fee_type_class_fixed').removeClass('hide');
          var rent_amount = $('.rental_services_rent_amount_per_month').val();
          var vat_type = $('.commission_renting_vat_type option:selected').val();
          var total_months = $('#rent_commission_rent_per_month').val();
          var vat = $('#rent_commission_tax_base_val').val();
          fixed_fee_with_vat = checkNumericValue(rent_amount)*checkNumericValue(total_months)
          var with_vat_val = fixed_fee_with_vat * (1+checkNumericValue(vat));
          $('.fixed_fee_val_with_vat').val(with_vat_val);
          $('.fixed_fee_val_with_vat').val($('.fixed_fee_val_with_vat').val().replace(".", ","));
        }
        else{
          var old_value_of_fixed_fee = ""
          var old_value_of_fixed_fee_new = ""
          var new_claue_of_fixed_fee = ""
          $('.set_fee_type_class_fixed').addClass('hide');
          $('.set_fee_type_class_monthly').removeClass('hide');
          var old_value_of_fixed_fee = $('#agent_office_commission_selling_fixed_fee').val();
          var old_value_of_fixed_fee = show_formatted_number(old_value_of_fixed_fee,2,false);
          var old_value_of_fixed_fee_new = (old_value_of_fixed_fee).replace(",", ".");
          var new_claue_of_fixed_fee = parseInt(old_value_of_fixed_fee_new) * $('.rent_apartment_tax_base').val()
          $('.fixed_fee_val_with_vat').val(((Math.round(new_claue_of_fixed_fee)).toString()).replace(".", ","));
          $('.fixed_fee_val_without_vat').val(((Math.round(new_claue_of_fixed_fee)).toString()).replace(".", ","));
        }
      }
      else{
        $('.brokerage_note').addClass('hide');
        $('.brokerage_note_without_vat').removeClass('hide');
        $('.with_vat_fields').addClass("hide");
        $('.without_vat_fields').removeClass("hide");
        $('.with_vat_fields').find('input').attr('disabled', true);
        $('.with_vat_fields').find('select').attr('disabled', true);
        $('.without_vat_fields').find('input').attr('disabled', false);
        $('.without_vat_fields').find('select').attr('disabled', false);
        fixed_fee_type = $('.without_vat_fields .set_fixed_fee_type_option').val();
        if (fixed_fee_type == "MONTHLY_RENT"){
          $('.set_fee_type_class_monthly').addClass('hide');
          $('.set_fee_type_class_fixed').removeClass('hide');
          $('.fixed_fee_val_without_vat').val($('.rental_services_rent_amount_per_month').val());
        }
        else{
          var old_value_of_fixed_fee_witout_vat = ""
          var old_value_of_fixed_fee_new_without_vat = ""
          var new_claue_of_fixed_fee_without_vat = ""
          $('.set_fee_type_class_fixed').addClass('hide');
          $('.set_fee_type_class_monthly').removeClass('hide');
          var old_value_of_fixed_fee_witout_vat = $('#agent_office_commission_selling_fixed_fee').val();
          var old_value_of_fixed_fee_witout_vat = show_formatted_number(old_value_of_fixed_fee_witout_vat,2,false);
          var old_value_of_fixed_fee_new_without_vat = (old_value_of_fixed_fee_witout_vat).replace(",", ".");
          var new_claue_of_fixed_fee_without_vat = parseFloat(old_value_of_fixed_fee_witout_vat) / $('.rent_apartment_tax_base').val()
          $('.fixed_fee_val_without_vat').val(((Math.round(new_claue_of_fixed_fee_without_vat)).toString()).replace(".", ","));
          $('.fixed_fee_val_with_vat').val(((Math.round(new_claue_of_fixed_fee_without_vat)).toString()).replace(".", ","));
        }
      }
      checkAdditionalServiceVal();
  });

  $(document).on("click", ".contract_apartment_is_leased", function(){
    if ($(this).val() == "true"){
      $('.set_apartment_is_not_leased').removeClass('hide');
      $('.check_fields_for_apartment_is_free').addClass('hide');
      $('.apartment_is_free_starting_from').removeClass('hide');
      $('.check_fields_for_apartment_is_free').removeClass('col-sm-9');
      $('.apartment_is_free_starting_from').find('input').attr('disabled', false);
      $('.check_fields_for_apartment_is_free').find('input').attr('disabled', true);
    }
    else{
      $('.set_apartment_is_not_leased').addClass('hide');
      $('.check_fields_for_apartment_is_free').removeClass('hide');
      $('.check_fields_for_apartment_is_free').addClass('col-sm-9');
      $('.apartment_is_free_starting_from').addClass('hide');
      $('.apartment_is_free_starting_from').find('input').attr('disabled', true);
      $('.check_fields_for_apartment_is_free').find('input').attr('disabled', false);
    }
  });

  $(document).on("change", ".rental_services_rent_amount_per_month", function(){
    var rent_amount = $(this).val();
    var vat_type = $('.commission_renting_vat_type option:selected').val();
    var total_months = $('#rent_commission_rent_per_month').val();
    var vat = $('#rent_commission_tax_base_val').val();
    fixed_fee_with_vat = checkNumericValue(rent_amount)*checkNumericValue(total_months)
    if (vat_type == "PRICE_INCLUDING_VAT"){
      var with_vat_val = fixed_fee_with_vat * (1+checkNumericValue(vat));
      $('.fixed_fee_val_with_vat').val(with_vat_val);
      $('.fixed_fee_val_with_vat').val($('.fixed_fee_val_with_vat').val().replace(".", ","));
    }
    else {
      $('.fixed_fee_val_without_vat').val(fixed_fee_with_vat);
      $('.fixed_fee_val_without_vat').val($('.fixed_fee_val_without_vat').val().replace(".", ","));
    }
  });

  $(document).on('change', '.rental_services_price_with_vat', function(e){
    calculateRentalServicePrices($(this));
  });

  $(document).on('change', '.rental_services_price_without_vat', function(){
    calculateRentalServicePrices($(this));
  });

  $(document).on("change", ".rental_services_selected_vat", function(){
    var value = $(this).val();
    var parentEl = $(this).closest('.set_rental_services_price_parent');
    var vat_type = $('.commission_renting_vat_type option:selected').val();
    if (vat_type == "PRICE_INCLUDING_VAT"){
      var price_val = $(parentEl).find('.rental_services_price_without_vat').val();
      var display_value = calculateValuewithVat(price_val, value);
      $(parentEl).find('.rental_services_price_with_vat').val(Math.round(display_value));
    }
    else{
      var price_val = $(parentEl).find('.rental_services_price_without_vat').val();
      var display_value = calculateValuewithVat(price_val, value);
      $(parentEl).find('.rental_price_with_vat_hidden_field').val(Math.round(price_val));
      $(parentEl).find('.rental_services_price_with_vat').val(Math.round(display_value));
    }
  });

  $(document).on('click', '.other_people_information', function(){
    var other_info = $("#dummy_other_people_information").clone();
    var last_other_info = $("#other_people_information .other_peoples_information_lists:last").attr('id');
    if (last_other_info){
      var index = parseInt(getId(last_other_info)) + 1;
    }
    else{
      var index = 1;
    }
    other_info = other_info.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_people_information");
    $("#other_people_information").append(other_info).find('.datepickeron').datepicker({
      format: 'dd.mm.yyyy',
      weekStart: 1,
      autoclose: true,
      todayHighlight: true,
      clearBtn: true,
      disableTouchKeyboard: true,
      Readonly: true
    }).attr("readonly", "readonly");
  });

  $(document).on("click", ".remove_other_people_information", function(){
    $(this).closest(".other_peoples_information_lists").remove();
  });

  $(document).on('change', '.set_fixed_fee_type_option', function(){
    var fixed_fee_type = $(this).val();
    if (fixed_fee_type == "MONTHLY_RENT"){
      $('.set_fee_type_class_monthly').addClass('hide');
      $('.set_fee_type_class_monthly :input').attr("disabled", true);
      $('.set_fee_type_class_fixed').removeClass('hide');
      $('.set_fee_type_class_fixed :input').attr("disabled", false);
    }
    else{
      $('.set_fee_type_class_fixed').addClass('hide');
      $('.set_fee_type_class_fixed :input').attr("disabled", true);
      $('.set_fee_type_class_monthly').removeClass('hide');
      $('.set_fee_type_class_monthly :input').attr("disabled", false);
    }
  });

  // $(document).on('change', '.commission_renting_tenant_vat_type', function(){
  //   var fixed_fee_type = $('.set_fixed_fee_type_option').val();
  //   var myvalue = "FIXED_RENT"
  //   if (fixed_fee_type == "MONTHLY_RENT"){
  //     $('.set_fixed_fee_type_option').val(myvalue);
  //   }
  // });

});

function checkAdditionalServiceVal() {
  var check_box_value = 0;
  var parentEl = $('.rental_services_lists');
  var vat_type = $('.commission_renting_vat_type option:selected').val();
  for (i=0; i<= parentEl.length; i++){
    if (parentEl[i]){
      check_box = $(parentEl[i]).find('.rental_services_checked')
      if ($(check_box).is(":checked")){
        if (vat_type == "PRICE_INCLUDING_VAT") {
          var value = $(parentEl[i]).find('.rental_services_price_without_vat').val();
        }
        else{
          var value = $(parentEl[i]).find('.rental_services_price_with_vat').val();
        }
        if (value){
          value = checkNumericValue(value);
          check_box_value += value;
        }
      }
    }
  }
  check_box_value = check_box_value.toFixed(2).replace(".", ",");
  $('.commission_renting_additional_services').val(check_box_value);
}

function calculateValuewithVat(value, vat){
  var value = checkNumericValue(value);
  var vat = checkNumericValue(vat);
  value = value/(1+(vat/100));
  return checkIsNaNVal(value);
}

function calculateRentalServicePrices(ele){
  var value = $(ele).val();
  var parentEl = $(ele).closest('.set_rental_services_price_parent');
  $(parentEl).find('.rental_price_with_vat_hidden_field').val(value);
  var vat = $(parentEl).find('.rental_services_selected_vat option:selected');
  var vat_type = $('.commission_renting_vat_type option:selected').val();
  var vat_value = $(vat).val();
  if (vat_type == "PRICE_INCLUDING_VAT"){
    var display_value = calculateValuewithVat(value, vat_value); 
    $(parentEl).find('.rental_services_price_without_vat').val(Math.round(display_value));
  }
  else{
    var display_value = checkNumericValue(value)+checkNumericValue(value)*checkNumericValue(vat_value)/100;
    $(parentEl).find('.rental_services_price_with_vat').val(Math.round(display_value)); 
  }
}