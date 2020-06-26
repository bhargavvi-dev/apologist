$(document).ready(function(){

  checkBrochureType();
  setBrochureVersion();
  checkCrossAppPropertyType();

  if ($('#check_borchure_order_and_type').val() == "true"){
    checkBorchureOrderandType();
  }

  $(document).on("change", ".cross_app_property_type", function(){
    checkCrossAppPropertyType();
  });

  $(document).on("change", ".cross_app_property_use", function(){
    checkCrossAppPropertyType();
  });


  $(document).on('change', '#set_cross_app_commission_property_type', function(){
    var default_office_id = $('#set_cross_app_default_commission_office').val();
    var commission_property_type = $("#set_cross_app_commission_property_type:checked").val();
    $('#next_property_cross_app_results_page').val('1');
    $('#next_property_cross_app_results_office_id').val(default_office_id)
    $('#property_cross_app_commission_type').val(commission_property_type);
    $('.property_fields_for_tenant_search_form').addClass('hide');
    $('.show_purchase_watch_types_filter').addClass('hide');
    $('.show_tenant_watch_types_filter').addClass('hide');
    if (commission_property_type == "RENT_TENANT"){
      $('.property_fields_for_tenant_search_form').removeClass('hide');
      $('.show_tenant_watch_types_filter').removeClass('hide');
    }
    if (commission_property_type == "BUY"){
      $('.show_purchase_watch_types_filter').removeClass('hide');
    }
  });

  $(document).on("shown.bs.modal", "#openSearchCriteriaModal", function(){
    property_subtypes_show();
  });

  $(document).on('change', '#set_cross_app_commission_type', function(){
    $('#set_cross_app_commission_change').val("true");
    $('#property_cross_app_commission_type').val($("#set_cross_app_commission_property_type:checked").val());
  });

  $(document).on('click', "#next-property-cross-app-results_form_btn", function(){
    url = $(this).data("form_url");
    t = setTimeout(function () {
      $(".pre-icon").show();
      data = {
        office_id: $("#next_property_cross_app_results_office_id").val(),
        page: $("#next_property_cross_app_results_page").val(),
        commission_property_type: $("#set_cross_app_commission_property_type:checked").val()
      }
      $.ajax({
        url: url,
        type: 'get',
        data: data
      });
    }, 500);
  });
  $(document).on('click', "#next-completed-cross-app-results_form_btn", function(){
    url = $(this).data("form_url");
    t = setTimeout(function () {
      $(".pre-icon").show();
      data = {
        office_id: $("#next_completed_cross_app_results_office_id").val(),
        page: $("#next_completed_cross_app_results_page").val(),
        commission_property_type: $("#set_cross_app_commission_property_type_completed:checked").val()
      }
      $.ajax({
        url: url,
        type: 'get',
        data: data
      });
    }, 500);
  });

  $(document).on('click', "#visitReportPartLi_location_environment", function(){
    $('.visit_report_housing_show_modals').val('housingCompanyDetailedInfo');
    $('.visit_report_housing_modals_back').data('show_modal_id', 'housingCompanyDetailedInfo');
  });

  $(document).on('click', "#visitReportPartLi_company_details", function(){
    $('.visit_report_housing_show_modals').val($(this).data('show_modal_id'));
    $('.visit_report_housing_modals_back').data('show_modal_id', $(this).data('show_modal_id'));
  });

  $(document).on('change', ".owners_changed_since_registration", function(){
    if ($('.owners_changed_since_registration:checked').val() == 'true'){
      $('.owners_changed_since_registration_text').removeClass('hide');
    }
    else{
      $('.owners_changed_since_registration_text').addClass('hide');
    }
  });

  $(document).on('change', ".deed_of_sale_signed_kint", function(){
    if ($('.deed_of_sale_signed_kint:checked').val() == 'true'){
      $('.deed_of_sale_has_text').removeClass('hide');
      $('.deed_of_sale_has_not_text').addClass('hide');
    }
    else{
      $('.deed_of_sale_has_text').addClass('hide');
      $('.deed_of_sale_has_not_text').removeClass('hide');
    }
  });

  $(document).on('click', "#add_other_rental_terms", function(){
    $('.other_rental_terms').removeClass('hide');
    $('#add_other_rental_terms').addClass('hide');
  });

  $(document).on('click', ".remove_other_rental_terms", function(){
    $('.other_rental_terms').addClass('hide');
    $('#add_other_rental_terms').removeClass('hide');
  });

  $(document).on('click', "#add_rental_tenant_credit_info", function(){
    $('.credit_info_details').removeClass('hide');
    $('#add_rental_tenant_credit_info').addClass('hide');
  });

  $(document).on('click', ".remove_rental_tenant_credit_info_details", function(){
    $('.credit_info_details').addClass('hide');
    $('#add_rental_tenant_credit_info').removeClass('hide');
  });

  $(document).on('click', "#visitReportPartLi_company_details", function(){
    var housing_company_modal_close_btn = $('.renting_tenant_housing_company_modal_close')
    $(housing_company_modal_close_btn).data('show_modal_id', $(housing_company_modal_close_btn).data('show_modal_id_company_details'))
  });

  $(document).on('click', "#visitReportPartLi_location_environment", function(){
    var housing_company_modal_close_btn = $('.renting_tenant_housing_company_modal_close')
    $(housing_company_modal_close_btn).data('show_modal_id', $(housing_company_modal_close_btn).data('show_modal_id_location_environment'))
  });

  $(document).on('change', ".rental_lessor_contact_type", function(){
    var parentEl = $(this).closest('.show-fields');
    if ($(".rental_lessor_contact_type:checked").val() == "NOT_AN_AGENT"){
      $('.lessor_contact_not_agent_fields').removeClass('hide');
      $('.lessor_contact_agency_fields').addClass('hide');
    }
    else{
      $('.lessor_contact_not_agent_fields').addClass('hide');
      $('.lessor_contact_agency_fields').removeClass('hide');
    }
  });
  
  $(document).on('click', ".send_visit_reminder_message", function(){
    var parentEl = $(this).closest('.show-fields');
    t = setTimeout(function () {
      $("#loader-image").show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commissions/'+ commission_id + "/get_send_reminder_message_customer";
      data = {
        property_address: $(parentEl).find('.property_address').val(),
        property_village: $(parentEl).find('.property_village').val(),
        property_post_number: $(parentEl).find('.property_post_number').val(),
        property_city: $(parentEl).find('.property_city').val(),
        visit_date: $(parentEl).find('.show_date').val(),
        visit_start_hour: $(parentEl).find('.start_hour').val(),
        visit_start_min: $(parentEl).find('.start_min').val()
      }
      $.ajax({
        url: url,
        type: 'put',
        data: data
      });
    }, 500);
  });

  $(document).on('change', ".visit_report_security_deposit_type", function(){
    var parentEl = $(this).closest('.show-fields');
    if ($(this).val() == "MONTHLY_DEPOSIT"){
      $('.fixed_security_deposit_input').addClass('hide');
      $('.monthly_security_deposit_input').removeClass('hide');
    }
    else{
      $('.fixed_security_deposit_input').removeClass('hide');
      $('.monthly_security_deposit_input').addClass('hide');
    }
  });

  $(document).on('change', ".visit_method", function(){
    var parentEl = $(this).closest('.show-fields');
    if ($(parentEl).find(".visit_method").val() == "WITH_CUSTOMER"){
      $.each($('.new_visit_features'), function(){
        $(this).attr('class', $(this).data('with_customer_class'));
      });
      $(parentEl).find('.visit_method_reminder').removeClass('hide');
      if ($(parentEl).find(".visit_method_reminder_confrim:checked").val() == "false"){
        $(parentEl).find('.send_visit_reminder_message').addClass('hide');
      }
      else{
        $(parentEl).find('.send_visit_reminder_message').removeClass('hide'); 
      }
    }
    else{
      $.each($('.new_visit_features'), function(){
        $(this).attr('class', $(this).data('without_customer_class'));
      });
      $(parentEl).find('.visit_method_reminder').addClass('hide');
      $(parentEl).find('.send_visit_reminder_message').addClass('hide');
    }
  });

  $(document).on('change', ".visit_method_reminder_confrim", function(){
    var parentEl = $(this).closest('.show-fields');
    if ($(parentEl).find(".visit_method_reminder_confrim:checked").val() == "false"){
      $(parentEl).find('.send_visit_reminder_message').addClass('hide');
      $.each($('.new_visit_features'), function(){
        $(this).attr('class', $(this).data('without_customer_class'));
      });
    }
    else{
      $(parentEl).find('.send_visit_reminder_message').removeClass('hide'); 
      $.each($('.new_visit_features'), function(){
        $(this).attr('class', $(this).data('with_customer_class'));
      });
    }
  });

  $(document).on('change', ".visit_report_sales_method", function(){
    if ($(this).val() == "REAL_ESTATE_AGENCY"){
      $('.not_real_estate_section').find('.show_modal').addClass('hideShowModal');
      $('.confirmed_sections_lbl_not_real_estate').removeClass('unclickable');
      $('.not_real_estate_agency_lbl').addClass('hide');
      $('.real_estate_agency_lbl').removeClass('hide');
    }
    else{
      $('.not_real_estate_section').find('.show_modal').removeClass('hideShowModal');
      $('.confirmed_sections_lbl_not_real_estate').addClass('unclickable');
      $('.not_real_estate_agency_lbl').removeClass('hide');
      $('.real_estate_agency_lbl').addClass('hide');
    }
  });

  $(document).on('click', ".visitReportPriceEstiamtionBtn", function(){
    $('#price_navigator_get_results').click();
  });
  
  $(document).on('click', '#change_visit_report_confirmed_status', function(){
    var current_status = $("#visit_report_confirmed_status").val();

    if (current_status == "READY"){
      $("#visit_report_confirmed_status").val("NOT_READY");
      $("#not_ready_confirmed_status").removeClass('hide');
      $("#ready_confirmed_status").addClass('hide');
    }
    else{
      $("#visit_report_confirmed_status").val("READY");
      $("#not_ready_confirmed_status").addClass('hide');
      $("#ready_confirmed_status").removeClass('hide');
    }
  });


  $(document).on('click', '.confirmed_sections_tab', function(){
    var parentEl = $(this).closest('.parent');
    var checkBox = $(parentEl).find('.confirmed_sections_check');
    $(checkBox).prop("checked", !$(checkBox).prop("checked"));
    if ($(checkBox).is(":checked")){
      $(parentEl).find('.confirmed_lbl').addClass('hide');
      $(parentEl).find('.unconfirmed_lbl').removeClass('hide');
    }
    else{
      $(parentEl).find('.confirmed_lbl').removeClass('hide');
      $(parentEl).find('.unconfirmed_lbl').addClass('hide');
    }
  });

  $(document).on('click', '.visitReportStep5SaveBtn', function(){
    $('.Step5SaveBtnSubmit').click();
  });

  $(document).on('click', '.visitReportStep5SaveNextBtn', function(){
    $('.Step5SaveNextBtn').click();
  });

  $(document).on('click', '#save_buying_commission_interupption_btn', function(){
    var interrupt_type = $('.selling_commission_interruption:checked').val();
    if (interrupt_type != "WILL_SELL_LATER"){
      $('.modal').modal('hide');
      setTimeout(function(){
        $('#intrupptionNotificationModal').modal('show');
      }, 500);
    }
    else{
      $('#interruption-commission-form-id').submit();
    }
  });

  $(document).on('click', '.UpdateStatusPurchaseWatch', function(){
    var id = getId(this.id)
    var interrupt_type = $(this).parent().closest('div').find('.selling_commission_interruption:checked').val();
    if (interrupt_type != "WILL_SELL_LATER"){
      $('.modal').modal('hide');
      setTimeout(function(){
        $('#intrupptionNotificationModal_'+id).modal('show');
      }, 500);
    }
    else{
      $('#interruption-commission-form-id-'+id).submit();
    }
  });

  $(document).on('click', "#save_interruption_form_btn", function(){
    setTimeout(function(){
      $('#interruption-commission-form-id').submit();
    }, 500);
  });

  $(document).on('click', ".SaveInterruptionBtn", function(){
    var id = getId(this.id)
    setTimeout(function(){
      $('#interruption-commission-form-id-'+id).submit();
    }, 500);
  });

  $(document).on('click', ".move_to_previous_btn", function(){
    var parentEl = $(this).closest('.parent_display_tab_content');
    var current_page = $(parentEl).find('.sales_brochure_current_page').text().trim();
    var updated_current_page = parseInt(current_page) - 1;
    updateShowPages(parentEl, updated_current_page);
  });

  $(document).on('click', ".move_to_next_btn", function(){
    var parentEl = $(this).closest('.parent_display_tab_content');
    var current_page = $(parentEl).find('.sales_brochure_current_page').text().trim();
    var updated_current_page = parseInt(current_page) + 1;
    updateShowPages(parentEl, updated_current_page)
  });

  if ($('.property_subtype_buying_results:checked').length > 0){
    //$('#get_search_results_buying_commission').click();
  }

  $(document).on('click', '#get_search_results_buying_commission', function(){
    $('#search_results_buying_commission_submit_btn').click();
  });

  $(document).on("click", ".drop_down_services_menu", function(){
    var parentEl = $(this).parent().closest('.parent_drop_down_data');
    var services = $(this).attr('id');
    if ($(parentEl).find('.'+services+'_drop_down_content').hasClass('hide')){
      $('.drop_down_content').addClass('hide');
      $('.services_set_title_name_close').addClass('hide');
      $('.services_show_upside_arrow').addClass('hide');
      $('.services_set_title_name_open').removeClass('hide');
      $('.services_show_downside_arrow').removeClass('hide');
    }
    $(parentEl).find('.'+services+'_set_title_name').toggleClass("hide");
    $(parentEl).find('.'+services+'_show_upside_arrow').toggleClass("hide");
    $(parentEl).find("."+services+"_drop_down_content").toggleClass("hide");
  });

  $(document).on("change", ".buy_sp_check", function(){
    var parentEl = $(this).closest('.drop_down_data_list');
    var sp_menu = $(parentEl).find('.buy_sp_menu');
    if ($(parentEl).find('.buy_sp_check_false:checked').length == $(parentEl).find('.buy_sp_check_false').length){
      $(sp_menu).addClass('btn-default');
      $(sp_menu).removeClass('btn-blue');
      $($(parentEl).data('class_selector')+"_confirmed").addClass('btn-default');
      $($(parentEl).data('class_selector')+"_confirmed").removeClass('btn-blue');
    }
    else{
      $(sp_menu).removeClass('btn-default');
      $(sp_menu).addClass('btn-blue');
      $($(parentEl).data('class_selector')+"_confirmed").removeClass('btn-default');
      $($(parentEl).data('class_selector')+"_confirmed").addClass('btn-blue');
    }
    updateConfirmPackageIndex();
  });

  $(document).on("click", '.searching_confirmed, .visit_and_estimate_confirmed, .negotiations_confirmed, .contract_confirmed', function(){
    var dataEle = $(this).data('class_selector')+"_data";
    if ($(this).hasClass('btn-blue')){
      $(dataEle).find('.buy_sp_check_false').prop('checked', true);
      $(this).addClass('btn-default');
      $(this).removeClass('btn-blue');
      $(dataEle).find('.buy_sp_menu').addClass('btn-default');
      $(dataEle).find('.buy_sp_menu').removeClass('btn-blue');
    }
    else{
      $(dataEle).find('.buy_sp_check_true').prop('checked', true);
      $(this).removeClass('btn-default');
      $(this).addClass('btn-blue');
      $(dataEle).find('.buy_sp_menu').removeClass('btn-default');
      $(dataEle).find('.buy_sp_menu').addClass('btn-blue');
    }
    updateConfirmPackageIndex();
  });

  $(document).on("change", ".finance_in_order", function(){
    if ($(this).val() == "true"){
      $("#finance_in_order_till_date").addClass('hide');
    }
    else{
      $("#finance_in_order_till_date").removeClass('hide');
    }
  });

  $(document).on("change", ".property_purchase_use_type", function(){
    if ($(this).val() == "RESIDENTIAL_PURPOSE"){
      $(".property_purchase_residential_purpose").removeClass('hide');
      $(".property_purchase_investment_purpose").addClass('hide');
    }
    else{
      $(".property_purchase_residential_purpose").addClass('hide');
      $(".property_purchase_investment_purpose").removeClass('hide');
    }
  });

  $(document).on('click', '.add_sale_agreement_agent', function(){
    var agent = $("#dummy_other_sale_agreement_agents").clone();
    var last_agent = $("#sale_agreement_agents .sale_agreement_agents_lists:last").attr('id');
    if (last_agent){
      var index = parseInt(getId(last_agent)) + 1;
    }
    else{
      var index = 1;
    }
    agent = agent.html().replace(/replace_index/g, index).replace(/replace_param/g, "sale_agreement_agents_info");
    $("#sale_agreement_agents").append(agent);
  });

  $(document).on("click", ".remove_sale_agreement_agent", function(){
    $(this).closest(".sale_agreement_agents_lists").remove();
  });

  if ($('#sale_agreement_agents .sale_agreement_agents_lists').length <= 0){
    $('.add_sale_agreement_agent').click();
    $("#sale_agreement_agents .sale_agreement_agents_lists:first").find('.remove_sale_agreement_agent').addClass('hide');
  }

  if ($("#sale_agreement_method_type_form").val() == "true"){
    updateSaleAgreementMethodInputs();
  }

  $(document).on('change', '.set_agreement_method_type', function(){
    updateSaleAgreementMethodInputs();
  });

  $(document).on('change', '.set_rent_profit_estimation_type', function(){
    var rent_profit_type = $(this).val();
    if (rent_profit_type == "EXPECTED_RENT_PROFIT"){
      $('.expected_rent_profit_show_class').removeClass('hide');
      $('.expected_rent_profit_hide_class').addClass('hide');
    }
    else{
      $('.expected_rent_profit_show_class').addClass('hide');
      $('.expected_rent_profit_hide_class').removeClass('hide');
      var price_type = $('.set_property_price_type').val();
      if (price_type == "FILL_THE_PRICE"){
        $('.visit_report_property_price_fields').removeClass('hide');
      }
      else{
        $('.visit_report_property_price_fields').addClass('hide');
      }
    }
  });

  $(document).on('change', '.visit_report_estimated_rent_input', function(){
    calculate_fixed_rent();
  });

  $(document).on('change', '.visit_report_maintance_charges_input', function(){
    calculate_fixed_rent();
  });

  $(document).on('change', '.visit_report_rental_months_input', function(){
    calculate_fixed_rent();
  });

  $(document).on('change', '.visit_report_property_price_input', function(){
    calculate_fixed_rent();
  });

  $(document).on('change', '.visit_report_renovation_investments_input', function(){
    calculate_fixed_rent();
  });

  $(document).on('change', '.visit_report_asset_transfer_tax_input', function(){
    calculate_fixed_rent();
  });

  $(document).on('change', '.visit_report_estimated_rent_profit_pct_input', function(){
    calculate_fixed_rent();
  });

  $(document).on('change', '.check_desired_location_input', function(){
    var parentEl = $(this).closest('.check_desired_location_match_index');
    calculate_match_index(parentEl, 'check_desired_location_match_index');
  });

  $(document).on('change', '.check_size_attribute_input', function(){
    var parentEl = $(this).closest('.check_size_attribute_match_index');
    calculate_match_index(parentEl, 'check_size_attribute_match_index');
  });

  $(document).on('change', '.check_price_and_costs_input', function(){
    var parentEl = $(this).closest('.check_price_and_costs_match_index');
    calculate_match_index(parentEl, 'check_price_and_costs_match_index');
  });

  $(document).on('change', '.check_equipments_input', function(){
    var parentEl = $(this).closest('.check_equipments_match_index');
    calculate_match_index(parentEl, 'check_equipments_match_index');
  });

  $(document).on('click', '.visitReportSummaryCriteriaBtn', function(){
    var parent_1 = $('.check_desired_location_match_index');
    calculate_match_index(parent_1, 'check_desired_location_match_index');

    var parent_2 = $('.check_size_attribute_match_index');
    calculate_match_index(parent_2, 'check_size_attribute_match_index');

    var parent_3 = $('.check_price_and_costs_match_index');
    calculate_match_index(parent_3, 'check_price_and_costs_match_index');

    var parent_4 = $('.check_equipments_match_index');
    calculate_match_index(parent_4, 'check_equipments_match_index');
  });

  $(document).on('change', '.set_debtfree_price_value, .set_sq_area_aoa_value, .set_evaluation_price_value', function(){
    calculate_evalution_price();
  });

  $(document).on('change', '.set_sq_aoa_input_value', function(){
    var sq_aoa_type = $(this).val();
    if (sq_aoa_type == "BASED_ON_AOA"){
      var sq_area_aoa = $('.apartment_sq_area_aoa_input_val').val();
      $('.visit_report_sq_area_aoa').val(sq_area_aoa);
    }
    else{
      var sq_area_superintendent = $('.apartment_sq_area_superintendent_input_val').val();
      $('.visit_report_sq_area_aoa').val(sq_area_superintendent);
    }
  });

  $(document).on('change', '.set_property_price_type', function(){
    var price_type = $(this).val();
    if (price_type == "FILL_THE_PRICE"){
      $('.visit_report_property_price_fields').removeClass('hide');
    }
    else{
      $('.visit_report_property_price_fields').addClass('hide');
    }
  });

  $(document).on('change', '.set_contact_reason_type', function(){
    updateContactAgentSubject();
  });

  $(document).on("click", ".clear_search_results_fields", function(){
    $('.property_search_form_fields').find('input:text').val('');
    $('.property_search_form_fields').find('input:checkbox').prop("checked", false);
  });

  $(document).on("click", "#save_user_as_an_agent_btn", function(){
    $(this).closest('form').submit();
  });

  $(document).on("change", '.set_brochure_type', function(){
    checkBrochureType();
    //checkBorchureOrderandType();
  });

  $(document).on("change", '.set_brochure_type_order', function(){
    checkBorchureOrderandType();
  });

  $(document).on("change", '.set_brochure_type_commission_type', function(){
    checkBorchureOrderandType();
  });

  $(document).on("change", ".set_brochure_version_type", function(){
    setBrochureVersion();
  });

  $(document).on("change", ".check_brochure_upload_media", function(){
    $('.modal').modal('hide');
    $('.parent_brochure_upload').val(' ');
    var parentEl = $(this).closest('.parent_brochure_upload_media').attr('id');
    $('.parent_brochure_upload').val(parentEl);
    setTimeout(function(){
      $('#confirmMediaUploadModal').modal('show');
    }, 500);
  });

  $(document).on("click", ".confirm_modal_btn", function(){
    var confirm = $(this).data("upload_confirm");
    if (confirm == "yes"){
      var parentEl = $('.parent_brochure_upload').val();
      parentEl = $('#'+parentEl);
      var resource_spec = $(parentEl).find('#brochure_resource_spec_id').val();
      var media = $(parentEl).find('.check_brochure_upload_media')[0].files[0];
      var resource_holder = $(parentEl).find('#brochure_resource_holder_id').val();
      var formData = new FormData();
      formData.append('media', media);
      formData.append('resource_holder', resource_holder);
      formData.append('resource_spec', resource_spec);
      formData.append('confirm', true);
      formData.append('office_id', $(parentEl).find('#brochure_resource_parent_id').val());
      t = setTimeout(function () {
      $("#loader-image").show();
        $.ajax({
          url: "/agent_office/commissions/update_user_brochures",
          type: 'put',
          data: formData,
          processData: false,
          contentType: false,
          success: function(result){
            window.location = window.location.href;
          }
        });
      }, 500);
    }
    else{
      setTimeout(function(){
        $('#crossSellingBrochureList').modal('show');
      }, 500);
    }
  });


});

function updateConfirmPackageIndex(){
  $('.confirmPackageIndex').text(parseInt(($('.buy_confirm_package_menus').find('.btn-blue').length/$('.buy_confirm_package_menus').find('button').length)*100)+"%");
}

function updateShowPages(parent, current_page){
  if ($(parent).find("#sales_brochure_page_" + current_page).length > 0){
    $(parent).find(".sales_brochure_page").addClass("hide");
    $(parent).find("#sales_brochure_page_" + current_page).removeClass("hide");
    $(parent).find(".sales_brochure_current_page").text(current_page);

    $(parent).find(".brochure_step_content").addClass("hide");
    $(parent).find("#brochure_step_content_" + current_page).removeClass("hide");
  }
}

function calculate_fixed_rent(){
  var total_estimated_rent = 0;
  var total_investment_price = 0;
  estimated_rent = $('.visit_report_estimated_rent_input').val();
  total_estimated_rent += checkNumericValue(estimated_rent)
  maintenance_charges = $('.visit_report_maintance_charges_input').val();
  total_estimated_rent -= checkNumericValue(maintenance_charges)
  rental_months = $('.visit_report_rental_months_input').val();
  total_estimated_rent = (total_estimated_rent*rental_months);
  property_price = $('.visit_report_property_price_input').val();
  total_investment_price += checkNumericValue(property_price)
  renovation_investments = $('.visit_report_renovation_investments_input').val();
  total_investment_price += checkNumericValue(renovation_investments)
  asset_transfer_tax = $('.visit_report_asset_transfer_tax_input').val();
  total_investment_price += checkNumericValue(asset_transfer_tax)
  if ($('.set_rent_profit_estimation_type:checked').val() == "FIXED_RENT_PROFIT"){
    var estimated_rent_final_val = (checkNumericValue(total_estimated_rent)/checkNumericValue(total_investment_price)).toFixed(2);
    estimated_rent_final_val = estimated_rent_final_val*100;
    $('.change_estimated_rent_label').text(checkNumericValue(estimated_rent_final_val));
  }
  else{
    estimated_rent_profit_pct = $('.visit_report_estimated_rent_profit_pct_input').val();
    estimated_rent_profit_pct = checkNumericValue(estimated_rent_profit_pct/100);
    
    if(estimated_rent_profit_pct != ''){
      total_estimated_rent = (total_estimated_rent/estimated_rent_profit_pct).toFixed(2);
    }
    
    total_estimated_rent -= checkNumericValue(renovation_investments)
    total_estimated_rent -= checkNumericValue(asset_transfer_tax)
    $('.change_label_max_purchase_price').text(checkNumericValue(total_estimated_rent))
    $('.change_label_asset_transfer_tax').text(checkNumericValue(asset_transfer_tax))
  }
}

function calculate_match_index(parentEl, parentElName){
  var total_checked_match_index = 0;
  var match_index = 0;
  var ele = $(parentEl).find('.match_index_yes');
  for (i=0; i<= ele.length; i++){
    var child_ele = ele[i];
    if (child_ele){
      if ($(child_ele).is(":checked")){
        total_checked_match_index += 1;
      }
    }
  }
  match_index = (total_checked_match_index/ele.length).toFixed(2);
  match_index = checkNumericValue(match_index)*100;
  $('.'+parentElName+'_result').text(checkNumericValue(match_index));
  $('.'+parentElName+'_result_input').val(checkNumericValue(match_index));

}

function calculate_evalution_price(){
  var total_asking_price = 0;
  var total_evaluation_price = 0;
  var debtfree_price  = $('.set_debtfree_price_value').val();
  var sq_area_aoa  = $('.set_sq_area_aoa_value').val();
  var evaluation_price  = $('.set_evaluation_price_value').val();
  
  debtfree_price = checkNumericValue(debtfree_price);
  sq_area_aoa = checkNumericValue(sq_area_aoa);
  evaluation_price = checkNumericValue(evaluation_price);
  total_asking_price = (debtfree_price/sq_area_aoa).toFixed(2);
  total_evaluation_price = (evaluation_price/sq_area_aoa).toFixed(2);
  $('.set_total_asking_price_value').val(checkNumericValue(total_asking_price));
  $('.set_total_evaluation_price_value').val(checkNumericValue(total_evaluation_price));
  $('.set_difference_asking_and_evalution').text(checkNumericValue(total_asking_price-total_evaluation_price));
}

function updateSaleAgreementMethodInputs(){
  var method_type = $('.set_agreement_method_type:checked').val();
  if (method_type == "REAL_ESTATE_AGENCY_TYPE"){
    $('.agreement_method_type_real_estate_agency').removeClass('hide');
    $('.agreement_method_type_brand_agency').addClass('hide');
    $('.agreement_method_type_real_estate_agency').find('input').attr('disabled', false);
    $('.agreement_method_type_brand_agency').find('input').attr('disabled', true);
  }
  else{
    $('.agreement_method_type_brand_agency').removeClass('hide');
    $('.agreement_method_type_real_estate_agency').addClass('hide');
    $('.agreement_method_type_real_estate_agency').find('input').attr('disabled', true);
    $('.agreement_method_type_brand_agency').find('input').attr('disabled', false);
  }
}

function updateContactAgentSubject(){
  $('.set_contact_agent_subject').val(" ");
  var contact_type = $('.set_contact_reason_type:checked').val();
  var value = $('#contact_reason_type_'+contact_type).val();
  var subject = $('.set_contact_agent_hidden_subject').val();
  $('.set_contact_agent_subject').val(subject+ ' : ' +value);
}

function setBrochureVersion(){
  $('.version_type_my_brochure').addClass('hide');
  $('.version_type_original_version_brochure').addClass('hide');
  var version_type = $('.set_brochure_version_type:checked').val();
  if (version_type == "ORIGINAL_VERSION"){
    $('.version_type_original_version_brochure').removeClass('hide');
    $('.version_type_my_brochure').addClass('hide');
  }
  else{
    $('.version_type_my_brochure').removeClass('hide');
    $('.version_type_original_version_brochure').addClass('hide');
  }
}

function checkBrochureType(){
  var brochure_type = $('.set_brochure_type:checked').val();
  $('.show_brochure_type_c_rent').removeClass('hide');
  $('.show_brochure_type_sell').removeClass('hide');
  if (brochure_type == "SALES_BROCHURES"){
    $('.show_brochure_type_sell').removeClass('hide');
    $('.show_brochure_type_c_rent').addClass('hide');
  }
  else if (brochure_type == "RENT_BROCHURES"){
    $('.show_brochure_type_c_rent').removeClass('hide');
    $('.show_brochure_type_sell').addClass('hide');
  }
}

function checkBorchureOrderandType(){
  t = setTimeout(function () {
    //$("#loader-image").show();
    data = {
      brochure_order: $(".set_brochure_type_order").val(),
      brochure_commission_type: $(".set_brochure_type_commission_type").val()
    }
    $.ajax({
      url: "/agent_office/commissions/get_user_all_brochures",
      type: 'get',
      data: data
    });
  }, 500);
}

function checkCrossAppPropertyType(){
  var property_type = $('.cross_app_property_type:checked').val();
  $('.apartment_property_form_fields').addClass('hide');
  $(".apartment_property_form_fields input").attr('disabled', true);
  $('.real_estate_property_form_fields').addClass('hide');
  $(".real_estate_property_form_fields input").attr('disabled', true);
  $('.real_estate_commercial_property_form_fields').addClass('hide');
  $(".real_estate_commercial_property_form_fields input").attr('disabled', true);
  $('.real_estate_other_property_form_fields').addClass('hide');
  $(".real_estate_other_property_form_fields input").attr('disabled', true);
  if (property_type == "APARTMENT"){
    $('.apartment_property_form_fields').removeClass('hide');
    $(".apartment_property_form_fields input").attr('disabled', false);
  }
  else if (property_type == "REAL_ESTATE"){
    var property_use = $(".cross_app_property_use:checked").val();
    if (property_use == "RESIDENTIAL"){
      $('.real_estate_property_form_fields').removeClass('hide');
      $(".real_estate_property_form_fields input").attr('disabled', false);
    }
    else if(property_use == "VACATIONAL"){
      $('.real_estate_property_form_fields').removeClass('hide');
      $(".real_estate_property_form_fields input").attr('disabled', false);
    }
    else if(property_use == "COMMERCIAL"){
      $('.real_estate_commercial_property_form_fields').removeClass('hide');
      $(".real_estate_commercial_property_form_fields input").attr('disabled', false);
    }
    else if(property_use == "OTHER_PROPERTY_USE"){
      $('.real_estate_other_property_form_fields').removeClass('hide');
      $(".real_estate_other_property_form_fields input").attr('disabled', false);
    }
  }
  else if (property_type == "NEW_PROPERTY"){
    $('.apartment_property_form_fields').removeClass('hide');
    $(".apartment_property_form_fields input").attr('disabled', false);
  }
}