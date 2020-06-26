$(document).ready(function(){

  changeInputsConfirmStatus();

  $(document).on("change", ".format_search", function(){
    var format = $(this).val();
    if(format == "STANDARD"){
      $(".price_appraisal").addClass("disableattchmentbutton")
      $(".upload_sale_agreement").addClass("disableattchmentbutton")
    } else {
      $(".price_appraisal").removeClass("disableattchmentbutton")
      $(".upload_sale_agreement").removeClass("disableattchmentbutton")
    }
  });

  $(document).on("change", ".sale_agreement_cadastral_certificate_date", function(){
    $('.sale_agreement_cadastral_certificate_date').val($(this).val());
  });

  $(document).on("change", ".surtax_decimal, .surtax_fraction", function(){
    var parentEl = $(this).closest('.confirm_inputs');
    var surtax_decimal = checkNumericValue($(parentEl).find('.surtax_decimal').val());
    var surtax_fraction = checkNumericValue($(parentEl).find('.surtax_fraction').val());
    var surtax = checkNumericValue([surtax_decimal, surtax_fraction].join(','));
    var transfer_tax_pct = checkNumericValue($(parentEl).find('.transfer_tax').val());

    var surtax_tax_amount = (surtax*transfer_tax_pct/100).toFixed(2);
    var surtax_tax_amount_arr = (surtax_tax_amount).toString().split('.');
    $(parentEl).find('.tax_surtax_decimal').val(show_formatted_number(surtax_tax_amount_arr[0]));
    $(parentEl).find('.tax_surtax_fraction').val(surtax_tax_amount_arr[1]);

    var total_sents = 0.0;

    $.each($(parentEl).find('.asset_tax_decimal'), function(){
      total_sents += checkNumericValue($(this).val())*100;
    });

    $.each($(parentEl).find('.asset_tax_fraction'), function(){
      total_sents += checkNumericValue($(this).val());
    });

    var total_tax = (total_sents/100).toFixed(2);

    var total_tax_arr = (total_tax).toString().split('.');

    $(parentEl).find('.asset_tax_decimal_total').val(show_formatted_number(total_tax_arr[0]));
    $(parentEl).find('.asset_tax_fraction_total').val(total_tax_arr[1]);
  });

  $(document).on("click", ".confirm_inputs_check", function(){
    var parentEl = $(this).closest('.confirm_inputs');
    updateConfirmInputs(parentEl);
  });

  $(document).on("click", ".edit_confirmed_inputs_btn", function(){
    var parentEl = $(this).closest('.confirm_inputs');
    $(parentEl).find('.confirm_inputs_check').prop('checked', false);
    updateConfirmInputs(parentEl);
  });

  // processed steps confirm/unconfirm
  $(".sale_agreement_processed_step").change(function(){
    var id = getId(this.id);
    if ($(this).is(":checked")) {
      $('#li_sale_agreement_processed_step_' + id).addClass("processed");
    }
    else{
      $('#li_sale_agreement_processed_step_' + id).removeClass("processed");
    }
  });

  // add/remove contract clauses
  $(".add_new_contract_clause").click(function(){
    var parent_contract_clause = $(this).closest('.contract_clauses_parent');
    var contract_clause = $(parent_contract_clause).find('.dummy_contract_clause').clone();
    var last_contract_clause = $(parent_contract_clause).find(".contract_clauses .contract_clause:last").attr('id');
    if (last_contract_clause){
      var index = parseInt(getId(last_contract_clause)) + 1;
    }
    else{
      var index = 1;
    }
    contract_clause = contract_clause.html().replace(/replace_index/g, index).replace(/replace_param/g, "contract_clause");
    $(parent_contract_clause).find('.contract_clauses').append(contract_clause);
  })

  $(document).on("click", ".remove_contract_clause", function(){
    $(this).closest(".contract_clause").remove();
  });

  $(document).on("change", ".asset_transfer_tax_declaration_type", function(){
    if ($(this).val() == "ONE_FOR_EACH"){
      $(".invoice_for_all_buyers").addClass('hide');
      $(".invoice_for_each_buyer").removeClass('hide');
      $(".invoice_for_all_buyers").find('input').attr('disabled', true);
      $(".invoice_for_each_buyer").find('input').attr('disabled', false);
    }
    else{
      $(".invoice_for_all_buyers").removeClass('hide');
      $(".invoice_for_each_buyer").addClass('hide');
      $(".invoice_for_all_buyers").find('input').attr('disabled', false);
      $(".invoice_for_each_buyer").find('input').attr('disabled', true);
    }
  });

  // add/remove other charges
  $("#add_other_charge_customer_invoice").click(function(){
    var other_charge = $("#dummy_other_charge_customer_invoice").clone();
    var last_other_charge = $("#other_charges_customer_invoice .other_charge:last").attr('id');
    if (last_other_charge){
      var index = parseInt(getId(last_other_charge)) + 1;
    }
    else{
      var index = 1;
    }
    other_charge = other_charge.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_charges");
    $("#other_charges_customer_invoice").append(other_charge);
    initVirtualKeyboard($("#other_charges_customer_invoice"));
  })

  $(document).on("click", ".other_charge .remove_charge_customer_invoice", function(){
    var parentEl = $(this).closest(".other_charge");
    var resource_id = $(parentEl).find('.resource_id').val();
    var remove_resources = $("#customer_invoice_remove_resources").val().split(',');
    remove_resources.push(resource_id);
    $("#customer_invoice_remove_resources").val(remove_resources.join(','));
    $(parentEl).remove();
  });

  // add/remove other charges
  $("#add_discount_customer_invoice").click(function(){
    var discount = $("#dummy_discount_customer_invoice").clone();
    var last_discount = $("#discounts_customer_invoice .discount:last").attr('id');
    if (last_discount){
      var index = parseInt(getId(last_discount)) + 1;
    }
    else{
      var index = 1;
    }
    discount = discount.html().replace(/replace_index/g, index).replace(/replace_param/g, "discounts");
    $("#discounts_customer_invoice").append(discount);
    $(".add_discount_customer_invoice_div").addClass('hide');
    initVirtualKeyboard($("#discounts_customer_invoice"));
  })

  $(document).on("click", ".discount .remove_charge_customer_invoice", function(){
    var parentEl = $(this).closest(".discount");
    var resource_id = $(parentEl).find('.resource_id').val();
    var remove_resources = $("#customer_invoice_remove_resources").val().split(',');
    remove_resources.push(resource_id);
    $("#customer_invoice_remove_resources").val(remove_resources.join(','));
    $(parentEl).remove();
    $(".add_discount_customer_invoice_div").removeClass('hide');
  });

  $(document).on("change", ".customer_invoice_type", function(){
    if ($(this).val() == "ONE_FOR_EACH"){
      $(".customer_invoice_allocation_of_fee_info").removeClass('hide');
    }
    else{
      $(".customer_invoice_allocation_of_fee_info").addClass('hide');
    }
  });

  $(document).on("change", ".customer_invoice_fee_allocation_type", function(){
    if ($(this).val() == "MANUAL"){
      $(".customer_invoice_allocation_of_fee_manual_info").removeClass('hide');
    }
    else{
      $(".customer_invoice_allocation_of_fee_manual_info").addClass('hide');
    }
  });

  $(document).on("click", ".invoice_change_payment_receiver", function(){
    var parentEl = $(this).closest('.payment_receiver');
    var customer_invoice_payment_receiver_office = $(parentEl).find('.customer_invoice_payment_receiver_office')
    var invoice_payment_receiver_agent_info = $(parentEl).find(".invoice_payment_receiver_agent_info");
    var invoice_payment_receiver_office_info = $(parentEl).find(".invoice_payment_receiver_office_info");
    if ($(customer_invoice_payment_receiver_office).val() == "true"){
      $(invoice_payment_receiver_agent_info).removeClass('hide');
      $(invoice_payment_receiver_office_info).addClass('hide');
      $(customer_invoice_payment_receiver_office).val(false);
    }
    else{
      $(invoice_payment_receiver_agent_info).addClass('hide');
      $(invoice_payment_receiver_office_info).removeClass('hide');
      $(customer_invoice_payment_receiver_office).val(true);
    }
  });

  $(document).on("change", ".asset_transfer_tax_first_home", function(){
    if ($(this).val() == "true"){
      $(this).closest('.contact-type-fields').find(".first_home_other_options_class").removeClass('hide');
    }
    else{
      $(this).closest('.contact-type-fields').find(".first_home_other_options_class").addClass('hide');
    }
  });

  $(document).on("change", ".first_home_other_option", function(e){
    var parentEl = $(this).closest('.first_home_other_options_class')
    var default_value = $(parentEl).find('.first_home_required_option').val();
    if (default_value == "true"){
      $(parentEl).find('.first_home_other_option.true').prop('checked', true);
    }
    else{
      $(parentEl).find('.first_home_other_option.false').prop('checked', true);
    }
    $('.tax_status_notice_free_to_pay').removeClass('hide');
    $('.tax_status_notice_pay_to_free').addClass('hide');
    $("#tax_status_current_contact_type").val($(this).closest('.contact-type-fields').attr('id'));
    if (!$(this).closest('.contact-type-fields').find('.confirm_inputs_check').is(':checked')){
      $('.modal').modal('hide');
      setTimeout(function(){
        $('#tax_status_first_home_buyer').modal('show');
      }, 500);
    }
  });

  $(document).on("change", ".asset_transfer_tax_first_home", function(e){
    var parentEl = $(this).closest('.contact-type-fields');
    var current_selected_value = $(parentEl).find('.asset_transfer_tax_first_home:checked').val();
    if (current_selected_value == "true"){
      $(parentEl).find('.asset_transfer_tax_first_home.false').prop('checked', true);
      $(parentEl).find('.first_home_other_options_class').addClass('hide');
    }
    else{
      $(parentEl).find('.asset_transfer_tax_first_home.true').prop('checked', true);
      $(parentEl).find('.first_home_other_options_class').removeClass('hide');
    }
    if ($(parentEl).find('.asset_transfer_tax_first_home:checked').val() == "true"){
      $('.tax_status_notice_free_to_pay').removeClass('hide');
      $('.tax_status_notice_pay_to_free').addClass('hide');
    }
    else{
      $('.tax_status_notice_free_to_pay').addClass('hide');
      $('.tax_status_notice_pay_to_free').removeClass('hide');
    }
    $("#tax_status_current_contact_type").val($(parentEl).attr('id'));
    if (!$(parentEl).find('.confirm_inputs_check').is(':checked')){
      $('.modal').modal('hide');
      setTimeout(function(){
        $('#tax_status_first_home_buyer').modal('show');
      }, 500);
    }
  });

  $(document).on("click", "#confirm_tax_status_first_home_buyer", function(e){
    var parentEl = $("#" + $("#tax_status_current_contact_type").val());
    var current_selected_value = $(parentEl).find('.asset_transfer_tax_first_home:checked').val();
    if (current_selected_value == "true"){
      $(parentEl).find('.asset_transfer_tax_first_home.false').prop('checked', true);
      $(parentEl).find('.first_home_other_options_class').addClass('hide');
    }
    else{
      $(parentEl).find('.asset_transfer_tax_first_home.true').prop('checked', true);
      $(parentEl).find('.first_home_other_options_class').removeClass('hide');
    }
    $('.modal').modal('hide');
    setTimeout(function(){
      $('#asset_transfer_tax_step_1').modal('show');
    }, 500);
  });

  $(document).on("click", ".single_payment_date", function(){
    date_of_payment = $(this).val();
    if (date_of_payment == "true"){
      $('.date_of_payment').parent().removeClass("hide");
    }
    else{
      $('.date_of_payment').parent().addClass("hide");
    }
  });

  $(document).on("click", ".AssetTransferTaxModalstep3Btn", function(){
    buyer_id = $(this).data("id");
    all_recipients = $('.all_buyer_recipients').val();
    if (buyer_id){
      $('.display_attachments').addClass("hide");
      $('.display_all_attachments').addClass('hide');
      $('.buyer_attachments_'+buyer_id).removeClass("hide");
      $('.all_buyer_recipients').attr("disabled", true);
      $('.indiviual_buyer_recipient_'+buyer_id).attr("disabled", false);
      $('.indiviual_buyer_recipient_id_'+buyer_id).attr("disabled", false);
      $('.tranfer_tax_buyer_id').val(buyer_id);
      $('#transfer_tax_recipients').val($('.indiviual_buyer_recipient_'+buyer_id).val());
    }else{
      $('.display_attachments').addClass("hide");
      $('.display_all_attachments').removeClass('hide');
      $('.all_buyer_recipients').attr("disabled", false);
      $('.indiviual_buyer_recipient').attr("disabled", true);
      $('.tranfer_tax_buyer_id').val("");
      $('#transfer_tax_recipients').val(all_recipients);
    }
  });

  $(document).on("click", '.CustomerInvoiceMailerBtn', function(){
    $('#customer_invoice_recipients').val("");
    seller_id = $(this).data("id");
    all_recipients = $('.all_seller_recipients').val();
    if (seller_id){
      $('.display_seller_attachments').addClass("hide");
      $('.seller_attachments_'+seller_id).removeClass("hide");
      $('.seller_id').val(seller_id);
      indiviual_recipient = $('.indiviual_seller_recipient_'+seller_id).val();
      $('#customer_invoice_recipients').val(indiviual_recipient)
    }else{
      $('.seller_id').val('');
      $('.display_seller_attachments').removeClass("hide");
      $('#customer_invoice_recipients').val(all_recipients)
    }
  });

  $(document).on("click", '.show_agent_reward_information', function(){
    $('.agent_reward_share_info').toggleClass("hide");
    if ($(this).hasClass("iconUp")){
      $(this).removeClass("iconUp");
      $(this).addClass("iconBottom");
    }
    else{
      $(this).removeClass("iconBottom");
      $(this).addClass("iconUp");
    }
    $(".show_upside_arrow, .set_title_name").toggleClass("hide");
  });

  $(document).on("click", ".show_drop_down_menu", function(){
    var parentEl = $(this).parent().closest('.drop_down_data_list');
    $(parentEl).find('.set_title_name').toggleClass("hide");
    $(parentEl).find('.show_upside_arrow').toggleClass("hide");
    $(parentEl).find('.display_drop_down_data').toggleClass("hide");
  });

  $(document).on("click", "#add_office_tasks_settlement", function(){
    var office_task = $("#dummy_office_tasks_settlement").clone();
    var last_office_task = $("#office_tasks_settlement_app .office_tasks_lists:last").attr('id');
    if (last_office_task){
      var index = parseInt(getId(last_office_task)) + 1;
    }
    else{
      var index = 1;
    }
    office_task = office_task.html().replace(/replace_index/g, index).replace(/replace_param/g, "office_commission_tasks").replace(/replace_type/g, "ASSET_TRANSFER_TAX");
    $("#office_tasks_settlement_app").append(office_task);
  });

  $(document).on("click", ".office_tasks_lists .remove_office_task", function(){
    var parentEl = $(this).closest(".office_tasks_lists");
    var resource_id = $(parentEl).find('.resource_id').val();
    var remove_resources = $("#tasks_remove_resources").val().split(',');
    var resource_id_index = remove_resources.indexOf(resource_id);
    if (resource_id_index < 0){
      remove_resources.push(resource_id);
    }
    remove_resources = remove_resources.filter(Boolean);
    $("#tasks_remove_resources").val(remove_resources.join(','));
    $(parentEl).remove();
  });

  $(document).on("click", ".add_house_manager_tasks", function(){
    var parentEl = $(this).closest(".house_managers_tasks");
    var type = $(parentEl).find('.house_manager_task_type').val();
    var param_type = $(parentEl).find('.house_manager_param_type').val();
    var house_manager_task = $(parentEl).find('.dummy_house_managers_tasks').clone();
    var last_house_manager_task = $(parentEl).find(".house_managers_tasks_settlement_app .office_tasks_lists:last").attr('id');
    if (last_house_manager_task){
      var index = parseInt(getId(last_house_manager_task)) + 1;
    }
    else{
      var index = 1;
    }
    house_manager_task = house_manager_task.html().replace(/replace_index/g, index).replace(/replace_param/g, param_type).replace(/replace_type/g, type);
    $(parentEl).find(".house_managers_tasks_settlement_app").append(house_manager_task);
  });

  $(document).on("click", "#add_other_commission_tasks", function(){
    var other_task = $("#dummy_other_commission_tasks").clone();
    var last_other_task = $("#other_commission_tasks .other_tasks_lists:last").attr('id');
    if (last_other_task){
      var index = parseInt(getId(last_other_task)) + 1;
    }
    else{
      var index = 1;
    }
    other_task = other_task.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_brand_commission_tasks");
    $("#other_commission_tasks").append(other_task).find('.datepickeron').datepicker({
      format: 'dd.mm.yyyy',
      weekStart: 1,
      autoclose: true,
      todayHighlight: true,
      clearBtn: true,
      disableTouchKeyboard: true,
      Readonly: true
    }).attr("readonly", "readonly");
  });

  $(document).on("click", ".add_other_tasks_resources", function(){
    var parentEl = $(this).closest('.other_tasks_attachments');
    var type = $(parentEl).find('.other_task_type').val();
    var other_task_attachment = $(parentEl).find('.dummy_other_tasks_resources').clone();
    var last_other_task_attachment = $(parentEl).find(".other_tasks_resources .office_tasks_lists:last").attr('id');
    if (last_other_task_attachment){
      var index = parseInt(getId(last_other_task_attachment)) + 1;
    }
    else{
      var index = 1;
    }
    other_task_attachment = other_task_attachment.html().replace(/replace_resource_index/g, index).replace(/replace_resource_param/g, "other_brand_commission_tasks").replace(/replace_resource_type/g, type);
    $(parentEl).find(".other_tasks_resources").append(other_task_attachment);

  });

  $(document).on("click", ".remove_other_commission_task", function(){
    var parentEl = $(this).closest('.other_tasks_lists');
    var attachments = $(parentEl).find('.office_tasks_lists');
    var remove_resources = $("#tasks_remove_resources").val().split(',');
    $.each($(attachments), function(index, attachment){
      var resource_id = $(this).find('.resource_id').val();
      var resource_id_index = remove_resources.indexOf(resource_id);
      if (resource_id_index < 0){
        remove_resources.push(resource_id);
      }
    });
    remove_resources = remove_resources.filter(Boolean);
    $("#tasks_remove_resources").val(remove_resources.join(','));
    $(parentEl).remove();
  });

});

function changeInputsConfirmStatus(){
  $.each($('.confirm_inputs_check'), function(index, confirm_inputs_check){
    var parentEl = $(this).closest('.confirm_inputs');
    updateConfirmInputs(parentEl);
  });
}

function updateConfirmInputs(parentEl){
  if ($(parentEl).find('.confirm_inputs_check').is(':checked')){
    $(parentEl).find('.readonly_eles').attr('readonly', true);
    $(parentEl).find("input:checkbox.readonly_eles").addClass('unclickable');
    $(parentEl).find('.datepickeron.readonly_eles').datepicker('destroy');
  }
  else{
    $(parentEl).find('.readonly_eles').removeAttr('readonly');
    $(parentEl).find("input:checkbox.readonly_eles").removeClass('unclickable');
    initiateDatePicker($(parentEl).find('.datepickeron.readonly_eles'));
  }
}