$(document).ready(function(){

  $(document).on("click", ".add_new_cost", function(){
    $(".new_cost").removeClass("hide")
  });

  $(function() {
    $(".sort_paginate_ajax th a, .sort_paginate_ajax .pagination a").on("click", function(){
      $.getScript(this.href);
      return false;
    });
  });
  
  $(document).on("click", ".residential_properties", function(){
    $('.residential_properties').toggleClass("hide");
    $('.total_residential_volume').toggleClass("hide");
  });

  $(document).on("click", ".commercial_properties", function(){
    $('.commercial_properties').toggleClass("hide");
    $('.total_commercial_volume').toggleClass("hide");
  });

  $(document).on("click", ".remax_region", function(){
    $('.vat_paid').toggleClass("hide");
    $('.remax_region').toggleClass("hide");
  });

  $(document).on("click", ".affiliate_commission", function(){
    $('.affiliate_commission').toggleClass("hide");
    $('.commission_earned').toggleClass("hide");
  });

  $(document).on("click", ".brand_office", function(){
    $('.brand_office').toggleClass("hide");
    $('.office_data').toggleClass("hide");
  });

  $(document).on("click", ".brand_region", function(){
    $('.brand_region').toggleClass("hide");
    $('.region_data').toggleClass("hide");
  });

  $(document).on("change", ".customer_data_situation", function(){
    var customer_data_situation = $(this).val()
    if ( customer_data_situation == "ALL_DATA_DELETED" ){
      $(".all_data_deleted").removeClass("hide")
      $(".no_data_deleted").addClass("hide")
      $(".some_data_deleted").addClass("hide")
      $(".all_data_deliver").addClass("hide")
    } else if ( customer_data_situation == "NO_DATA_COULD_BE_DELETED" ) {
      $(".all_data_deleted").addClass("hide")
      $(".no_data_deleted").removeClass("hide")
      $(".some_data_deleted").addClass("hide")
      $(".all_data_deliver").addClass("hide")
    } else if ( customer_data_situation == "SOME_DATA_DELETED" ) {
      $(".all_data_deleted").addClass("hide")
      $(".no_data_deleted").addClass("hide")
      $(".some_data_deleted").removeClass("hide")
      $(".all_data_deliver").addClass("hide")
    } else {
      $(".all_data_deleted").addClass("hide")
      $(".no_data_deleted").addClass("hide")
      $(".some_data_deleted").addClass("hide")
      $(".all_data_deliver").removeClass("hide")
    }
  });

  if ($('.confirmation_check_lock').length > 0){
    var check_confirm = 0
    $('.confirmation_check_lock').each(function(i){
      if ($(this).val() == 'true'){
        check_confirm = check_confirm + 1
      };
    });
    if (check_confirm > 0){
      $(".create_final_invoice").removeClass("disableattchmentbutton")
    } else {
      $(".create_final_invoice").addClass("disableattchmentbutton")
    }
  };

  $(document).on("click", ".confirm_check_button", function(){
    var confirm_check_val = $(this).closest(".confirm_check_parent").find(".confirmation_check_lock").val();
    var commission_id = $(this).closest(".confirm_check_parent").find(".commission_id").val();
    if (confirm_check_val == 'false'){
      $(this).closest(".confirm_check_parent").find(".button_text_not_confirm").addClass("hide");
      $(this).closest(".confirm_check_parent").find(".button_text_confirmed").removeClass("hide");
      $(this).closest(".confirm_check_parent").find(".confirmation_check_lock").val(true)
    } else {
      $(this).closest(".confirm_check_parent").find(".button_text_confirmed").addClass("hide");
      $(this).closest(".confirm_check_parent").find(".button_text_not_confirm").removeClass("hide");
      $(this).closest(".confirm_check_parent").find(".confirmation_check_lock").val(false)
    }
    $.ajax({
      type:'POST',
      url:'/agent_office/commissions/confirm_invoice_check',
      data: { commission_id : commission_id,confirm_check_val : confirm_check_val},
      success:function(){
      }
    });
    if ($('.confirmation_check_lock').length > 0){
      var check_confirm = 0
      $('.confirmation_check_lock').each(function(i){
        if ($(this).val() == 'true'){
          check_confirm = check_confirm + 1
        };
      });
      if (check_confirm > 0){
        $(".create_final_invoice").removeClass("disableattchmentbutton")
      } else {
        $(".create_final_invoice").addClass("disableattchmentbutton")
      }
    };
  });

  $(document).on("click", ".show_drop_down_menu_fee_total", function(){
    var parentEl = $(this).parent().closest('.drop_down_menu_total_listing');
    $(parentEl).find('.set_billing_report').toggleClass("hide");
    $(parentEl).find('.display_drop_down_fee_listing').toggleClass("hide");    
  });

  $(document).on("click", ".show_drop_down_menu_cost_total", function(){
    var parentEl = $(this).parent().closest('.drop_down_menu_total_listing');
    $(parentEl).find('.set_billing_report_cost').toggleClass("hide");
    $(parentEl).find('.display_drop_down_cost_listing').toggleClass("hide");    
  });

  $(document).on("change", ".acquisition_day", function(){
    $(".acquisition_month").addClass("mandatory_field")
    $(".acquisition_year").addClass("mandatory_field")
  });

  $(document).on("change", ".estimated_selling_price", function(){
    var estimated_selling_price = $(this).val()
    if (estimated_selling_price == "YES" ){
      $(".based_on_your_judgement").addClass("hide")
      $(".based_on_statistics").removeClass("hide")
    } else {
      $(".based_on_statistics").addClass("hide")
      $(".based_on_your_judgement").removeClass("hide")
    }
  });

  $(document).on("click", ".energy_certificate", function(){
    var energy_certificate = $(this).val()
    if (energy_certificate == "NO" ){
      $(".energy_class").addClass("hide")
      $(".energy_certificate_info").removeClass("hide")
    } else {
      $(".energy_certificate_info").addClass("hide")
      $(".energy_class").removeClass("hide")
    }
  });

  $(document).on("click", ".has_married", function(){
    var has_married = $(this).val()
    if (has_married == "yes" ){
      $(".client_marriage_partnership").removeClass("hide")
    } else {
      $(".client_marriage_partnership").addClass("hide")
    }
  });

  $(document).on("click", ".water_charge_base", function(){
    var water_charge_base = $(this).val()
    if (water_charge_base == "EQUALIZATION_BILL" ){
      $(".watercharge_per_month").removeClass("hide")
    } else {
      $(".watercharge_per_month").addClass("hide")
    }
  });

  $(document).on("click", ".other_occupier_right", function(){
    var other_occupier_right = $(this).val()
    if (other_occupier_right == "no" ){
      $(".other_occupier_info").addClass("hide")
      $(".other_occupier_secured").addClass("hide")
    } else {
      $(".other_occupier_info").removeClass("hide")
      $(".other_occupier_secured").removeClass("hide")
    }
  });

  $(document).on("change", "#choose_commission_type", function(){
    var commission_type = $(this).val();
    var search_by = $("#search_by").val();
    $.ajax({
      type:'POST',
      url:'/agent_office/commissions/search_payment_transaction',
      data: { commission_type : commission_type,search_by : search_by},
      success:function(){
      }
    });
  });
  $(document).on("keyup", "#search_by", function(){
    var commission_type = $("#choose_commission_type").val();
    var search_by = $(this).val();
    $.ajax({
      type:'POST',
      url:'/agent_office/commissions/search_payment_transaction',
      data: { commission_type : commission_type,search_by : search_by},
      success:function(){
      }
    });
  });
  $(document).on("keyup", "#searching_by_name", function(){
    var choose_report_status= $("#choose_report_status").val();
    var search_by_name = $(this).val();
    var selected_month= $("#selected_month").val();
    var selected_year= $("#selected_year").val();
    $.ajax({
      type:'POST',
      url:'/invoices/each_office_report_status',
      data: { choose_report_status : choose_report_status,search_by_name : search_by_name,selected_month : selected_month,selected_year : selected_year},
      success:function(){
      }
    });
  });
  $(document).on("change", "#choose_report_status", function(){
    var choose_report_status = $(this).val();
    var search_by_name = $("#searching_by_name").val();
    var selected_month= $("#selected_month").val();
    var selected_year= $("#selected_year").val();
    $.ajax({
      type:'POST',
      url:'/invoices/each_office_report_status',
      data: { choose_report_status : choose_report_status,search_by_name : search_by_name,selected_month : selected_month,selected_year : selected_year},
      success:function(){
      }
    });
  });


  $(document).on("click", ".quality_check_button", function(){
    var quality_check_val = $(this).closest(".quality_check_parent").find(".quality_check_lock").val();
    var commission_id = $(this).closest(".quality_check_parent").find(".commission_id").val();
    if (quality_check_val == 'false'){
      $(this).closest(".quality_check_parent").find(".button_text_color").addClass("hide");
      $(this).closest(".quality_check_parent").find(".button_text_color_lock").removeClass("hide");
      $(this).closest(".quality_check_parent").find(".payment_button").addClass("disableattchmentbutton");
      $(this).closest(".quality_check_parent").find(".quality_check_lock").val(true)
    } else {
      $(this).closest(".quality_check_parent").find(".button_text_color_lock").addClass("hide");
      $(this).closest(".quality_check_parent").find(".button_text_color").removeClass("hide");
      $(this).closest(".quality_check_parent").find(".payment_button").removeClass("disableattchmentbutton");
      $(this).closest(".quality_check_parent").find(".quality_check_lock").val(false)
    }
    $.ajax({
      type:'POST',
      url:'/agent_office/commissions/lock_quality_check',
      data: { commission_id : commission_id,quality_check_val : quality_check_val},
      success:function(){
      }
    });
  });

  $(document).on("click", ".fee_charged_check", function(){
    var fee_charged_val = $(this).val()
    if (fee_charged_val == "no_charged" ){
      $(this).closest(".fee_list").find(".no_fee_charge").removeClass("hide")
    } else {
      $(this).closest(".fee_list").find(".no_fee_charge").addClass("hide")
    }
  });

  $(document).on("click", ".fee_reason_check", function(){
    var fee_charged_val = $(this).val()
    if (fee_charged_val == "reason" ){
      $(this).closest(".reason_list").find(".no_fee_charge_reason").removeClass("hide")
    } else {
      $(this).closest(".reason_list").find(".no_fee_charge_reason").addClass("hide")
    }
  });

  $(document).on("click", ".show_drop_down_menu_listing", function(){
    var parentEl = $(this).parent().closest('.drop_down_data_listing');
    $(parentEl).find('.set_title_name_listing').toggleClass("hide");
    $(parentEl).find('.show_upside_arrow_listing').toggleClass("hide");
    $(parentEl).find('.button_name_listing').toggleClass("hide");
    $(parentEl).find('.display_drop_down_data_listing').toggleClass("hide");
    var paymentEl = $(parentEl).find('.display_drop_down_data_payment')
    if ($(paymentEl).hasClass("hide")){
    } else {
      $(parentEl).find('.set_title_name_payment').toggleClass("hide");
      $(parentEl).find('.show_upside_arrow_payment').toggleClass("hide");
      $(parentEl).find('.button_name_payment').toggleClass("hide");
      $(parentEl).find('.display_drop_down_data_payment').toggleClass("hide");
    }
  });

  $(document).on("click", ".show_drop_down_menu_payment", function(){
    var parentEl = $(this).parent().closest('.drop_down_data_payment');
    $(parentEl).find('.set_title_name_payment').toggleClass("hide");
    $(parentEl).find('.show_upside_arrow_payment').toggleClass("hide");
    $(parentEl).find('.button_name_payment').toggleClass("hide");
    $(parentEl).find('.display_drop_down_data_payment').toggleClass("hide");
    var listingEl = $(parentEl).find('.display_drop_down_data_listing')
    if ($(listingEl).hasClass("hide")){
    } else {
      $(parentEl).find('.set_title_name_listing').toggleClass("hide");
      $(parentEl).find('.show_upside_arrow_listing').toggleClass("hide");
      $(parentEl).find('.button_name_listing').toggleClass("hide");
      $(parentEl).find('.display_drop_down_data_listing').toggleClass("hide");
    }
  });
  
  $(document).on("click", ".payment_transaction_check", function(){
    var transaction_check = $("#payment_transaction").val();
    var commission_id = $("#commission_id").val();
    if (transaction_check == 'false'){
      $("#payment_transaction").val(true);
      $(".payment_transaction_check").removeClass("redBg");
      $(".payment_transaction_check").addClass("blueBg");
      $(".payment_transaction_text").removeClass("blue");
      $(".own_reward").addClass("blueBg");
      $(".own_reward").removeClass("disableattchmentbutton");
      $.ajax({
        type:'POST',
        url:'/agent_office/commissions/add_payment_transactions',
        data: { commission_id : commission_id,payment_transaction: true},
        success:function(){
        }
      });
    } else {
      $("#payment_transaction").val(false);
      $(".payment_transaction_check").addClass("redBg");
      $(".payment_transaction_check").removeClass("blueBg");
      // $(".payment_transaction_text").addClass("blue");
      $(".own_reward").addClass("grayBg");
      $(".own_reward").addClass("disableattchmentbutton");
      $(".own_reward").removeClass("blueBg");
      $.ajax({
        type:'POST',
        url:'/agent_office/commissions/add_payment_transactions',
        data: { commission_id : commission_id,payment_transaction: false},
        success:function(){
        }
      });
    }
  });

  $(document).on("click", ".confirmed_customer", function(){
    $(".send_message_customers").removeClass("disableattchmentbutton")
    $(".send_message_agent").removeClass("disableattchmentbutton")
    $(".rearrange_listing").removeClass("disableattchmentbutton")
  });

  $(document).on("click", ".confirm_new_agent", function(){
    var confirm_new_agent = $(this).val();
    var confirm_new_office = $(".select_office_check").val();
    var confirm_old_agent = $(".confirm_old_agent").val();
    if ($(this).is(":checked")){
      // $('#get_current_page_feedback_url').val(confirm_new_agent);
      $(".rearrange_confirmed_customers").removeClass("disableattchmentbutton")
    } else {
      $(".rearrange_confirmed_customers").addClass("disableattchmentbutton")
    }
    if (confirm_new_agent == confirm_old_agent){
      $(".rearrange_confirmed_customers").addClass("disableattchmentbutton")
    }
    $.ajax({
      type:'GET',
      url:'/agent_office/commissions/select_new_agent',
      data: { new_id: confirm_new_agent, new_office_id: confirm_new_office},
      success:function(){
      }
    });
  });

  $(document).on("change", ".request_status", function(){
    var request_status = $(this).val();
    if (request_status == "send_request_to_delete"){
      $('.delete_request').removeClass('hide');
      $('.deliver_request').addClass('hide');
    }else{
      $('.delete_request').addClass('hide');
      $('.deliver_request').removeClass('hide');
    }
  });
  
  $(document).on("change", ".agent_percentage", function(){
    var change_agent_reward_share_pr = $(this).val();
    $(this).attr('data-editable', 'false');
    change_agent_reward_share_pr = parseFloat(change_agent_reward_share_pr.replace(',', '.').replace(/\s/g, ''));
    var change_value_with_vat = (parseFloat($("#total_amount_of_invoice_with_vat").val())*change_agent_reward_share_pr)/100
    var change_value_without_vat = (parseFloat($("#total_amount_of_invoice_without_vat").val())*change_agent_reward_share_pr)/100
    $(this).closest(".agents_reward_share").find(".agent_reward_share_without_vat").val(change_value_without_vat);
    $(this).closest(".agents_reward_share").find(".agent_reward_share_with_vat").val(change_value_with_vat);
    var temp_pr = 0;
    var editable_agent = 0;
    $('.agent_percentage').each(function(i){
      if ($(this).data('editable') == false){
        editable_agent = editable_agent + 1
        temp_pr = temp_pr + parseFloat($(this).val())
      }
    });
    if ($(".office_percentage").length > 0){
      var agent_total_reward_share_pr = 50;
    } else {
      var agent_total_reward_share_pr = 100
    }
    var remaining_pr = parseFloat(agent_total_reward_share_pr) - parseFloat(temp_pr)
    var remaing_agent = $(".agent_percentage").length - editable_agent
    var per_agent_pr = parseFloat(remaining_pr)/parseFloat(remaing_agent)
    $('.agent_percentage').each(function(i){
      if ($(this).data('editable') != false){
        $(this).val(String(parseFloat(per_agent_pr)));
        setValueofAgentPercentage()
      }
    });
  });
  
  $(document).on("change", ".office_percentage", function(){
    var change_office_reward_share_pr = $(this).val();
    $(this).attr('data-editable', 'false');
    change_office_reward_share_pr = parseFloat(change_office_reward_share_pr.replace(',', '.').replace(/\s/g, ''));
    var change_office_value_with_vat = (parseFloat($("#total_amount_of_invoice_with_vat").val())*change_office_reward_share_pr)/100
    var change_office_value_without_vat = (parseFloat($("#total_amount_of_invoice_without_vat").val())*change_office_reward_share_pr)/100
    $(this).closest(".office_reward_share").find(".office_reward_share_without_vat").val(change_office_value_without_vat);
    $(this).closest(".office_reward_share").find(".office_reward_share_with_vat").val(change_office_value_with_vat);
    var temp_pr = 0;
    var editable_agent = 0;
    $('.office_percentage').each(function(i){
      if ($(this).data('editable') == false){
        editable_agent = editable_agent + 1
        temp_pr = temp_pr + parseFloat($(this).val())
      }
    });
    if ($(".agent_percentage").length > 0){
      var agent_total_reward_share_pr = 50;
    } else {
      var agent_total_reward_share_pr = 100
    }
    var remaining_pr = parseFloat(agent_total_reward_share_pr) - parseFloat(temp_pr)
    var remaing_agent = $(".office_percentage").length - editable_agent
    var per_agent_pr = parseFloat(remaining_pr)/parseFloat(remaing_agent)
    $('.office_percentage').each(function(i){
      if ($(this).data('editable') != false){
        $(this).val(String(parseFloat(per_agent_pr)));
        setValueofOfficePercentage()
      }
    });
  });

  // $(document).on("change", ".checkdate", function(){
  //   if ($(this).hasClass("start_date")){
  //     var start_date_1 = $(this).val();
  //     var last_date_2 = $(this).closest('.varies_by_commission_type').find('.end_date').val();
  //   } else if ($(this).hasClass("end_date")){
  //     // const last_date_old_temp = jQuery.extend(true, {}, $(this).val());
  //     const last_date_old_temp = $(this).val();
  //     var temp_date = last_date_old_temp
  //     var last_date_old = temp_date.split(".")
  //     var last_date = $(this).val().replace(/\./g, "-").split("-");
  //     last_date = last_date[2]+'-'+last_date[1]+'-'+last_date[0]
  //     var start_date = $(this).closest('.varies_by_commission_type').find('.start_date').val().replace(/\./g, "-").split("-");
  //     start_date = start_date[2]+'-'+start_date[1]+'-'+start_date[0]
  //     var latest_last_date = new Date(last_date);
  //     var latest_start_date = new Date(start_date);
  //     // alert(latest_start_date);
  //     // var  dates = $(this).datepicker({
  //     //   minDate: latest_start_date
  //     // });
  //     if (latest_last_date<=latest_start_date){
  //       // alert(last_date_old)
  //       alert("Last date is not lower than First date");
  //       // $(this).datepicker('setDate', new Date(last_date_old[2],last_date_old[1]-1,last_date_old[0]));
  //     }
  //   }
  // });

  $(document).on("change", ".filter_options", function(){
    $(".check_commission_rate").prop("checked", false);
    $('.same_by_commission_type').addClass('hide');
    $( "#varies_by_commission_type" ).empty();
    var filter_value = $(this).val();
    var agent_id_temp = $("#agent_id_temp").val();
    var step = $("#step").val();
    var open_card = $("#open_card").val();
    if (filter_value == "the_current_reward_share"){
      $.ajax({
              type:'GET',
              url:'/agents/current_user_reward',
              data: { filter_value : filter_value,id : agent_id_temp,step : step,open_card : open_card
                    },
              success:function(){
              }
            });
      $('.varies_by_commission_type').removeClass('hide');
    } else if (filter_value == "all"){
      $.ajax({
              type:'GET',
              url:'/agents/all_user_rewards',
              data: { filter_value : filter_value,id : agent_id_temp,step : step,open_card : open_card
                    },
              success:function(){
              }
            });
      $('.varies_by_commission_type').removeClass('hide');
    } else if (filter_value == "upcoming_reward_share"){
      $.ajax({
              type:'GET',
              url:'/agents/upcoming_user_reward',
              data: { filter_value : filter_value,id : agent_id_temp,step : step,open_card : open_card
                    },
              success:function(){
              }
            });
      $('.varies_by_commission_type').removeClass('hide');
    } else if (filter_value == "overdue_reward_share_information"){
      $.ajax({
              type:'GET',
              url:'/agents/overdue_user_reward',
              data: { filter_value : filter_value,id : agent_id_temp,step : step,open_card : open_card
                    },
              success:function(){
              }
            });
      $('.varies_by_commission_type').removeClass('hide');
    }
  });

  if ($( "#reward_share_filters option:selected" ).val() == "the_current_reward_share"){
    $( "#varies_by_commission_type" ).empty();
    var agent_id_temp = $("#agent_id_temp").val();
    $.ajax({
            type:'GET',
            url:'/agents/current_user_reward',
            data: { filter_value : "the_current_reward_share",id : agent_id_temp
                  },
            success:function(d){
              //I assume you want to do something on controller action execution success?
            }
          });
    $('.varies_by_commission_type').removeClass('hide');
  }

  $(document).on("change", ".check_commission_rate", function(){
    var commission_rate = $(this).val();
    if (commission_rate == "VARIES_BY_COMMISSION_TYPE"){
      $('.same_by_commission_type').addClass('hide');
      $('.varies_by_commission_type').removeClass('hide');
    }else{
      $('.varies_by_commission_type').addClass('hide');
      $('.same_by_commission_type').removeClass('hide');
    }
  });

  if ($("#prospects_listings_number_count").val() == 0){
    $(".prospectListing").addClass("disableattchmentbutton")
  }
  if ($("#potential_listings_number_count").val() == 0){
    $(".potentialListing").addClass("disableattchmentbutton")
  }
  if ($("#active_listings_number_count").val() == 0){
    $(".activeListing").addClass("disableattchmentbutton")
  }
  if ($("#completed_listings_number_count").val() == 0){
    $(".completedListing").addClass("disableattchmentbutton")
  }

  $(document).on("click", ".remax_button", function(){
    $(".remax_website").removeClass("hide")
    $(".kahiseva_website").addClass("hide")
  });

  $(document).on("click", ".kahiseva_button", function(){
    $(".kahiseva_website").removeClass("hide")
    $(".remax_website").addClass("hide")
  });

  $(document).on("click", ".openCloseDetails", function(){
    var toggle_id = $(this).data('show_modal_id');
    $(this).parent().parent().find("#"+toggle_id).toggleClass("hide");
    $(this).find(".show_selected_detail_arrow").toggleClass("hide");
  });

  $(document).on("click", "#is_permitted_send_me_offers_first", function(){
    if ($("#is_permitted_send_me_offers_first").is(":checked")) {
      $("#not_permitted_send_me_offers").attr('checked', false);
    }
  });

  $(document).on("click", "#is_permitted_send_me_offers_others", function(){
    if ($("#is_permitted_send_me_offers_others").is(":checked")) {
      $("#not_permitted_send_me_offers").attr('checked', false);
    }
  });

  $(document).on("click", "#not_permitted_send_me_offers", function(){
    if ($("#not_permitted_send_me_offers").is(":checked")) {
      $("#is_permitted_send_me_offers_first").attr('checked', false);
      $("#is_permitted_send_me_offers_others").attr('checked', false);
    }
  });

  $(document).on("click", "#confirm_new_delete_requests", function(){
    $( "#new_delete_requests" ).removeClass( "hide" )
    $( "#delete_request" ).addClass( "hide" )
    $( "#refuse_request" ).addClass( "hide" )
  });

  $(document).on("click", "#confirm_delete_request", function(){
    $( "#new_delete_requests" ).addClass( "hide" )
    $( "#delete_request" ).removeClass( "hide" )
    $( "#refuse_request" ).addClass( "hide" )
  });

  $(document).on("click", "#confirm_refuse_request", function(){
    $( "#new_delete_requests" ).addClass( "hide" )
    $( "#delete_request" ).addClass( "hide" )
    $( "#refuse_request" ).removeClass( "hide" )
  });

  $(document).on("click", "#confirm_agent", function(){
    $( "#form_sales_team" ).removeClass( "hide" )
    $( "#manage_cost_listing" ).addClass( "hide" )
    $( "#manage_list_settings" ).addClass( "hide" )
  });

  $(document).on("click", "#manage_listing", function(){
    $( "#form_sales_team" ).addClass( "hide" )
    $( "#manage_list_settings" ).addClass( "hide" )
    $( "#manage_cost_listing" ).removeClass( "hide" )
  });

  $(document).on("click", "#manage_settings", function(){
    $( "#form_sales_team" ).addClass( "hide" )
    $( "#manage_list_settings" ).removeClass( "hide" )
    $( "#manage_cost_listing" ).addClass( "hide" )
  });

  $(document).on("click", "#confirm_new_deliver_requests", function(){
    $( "#new_deliver_requests" ).removeClass( "hide" )
    $( "#delivered_request" ).addClass( "hide" )
  });

  $(document).on("click", "#confirm_delivered_request", function(){
    $( "#new_deliver_requests" ).addClass( "hide" )
    $( "#delivered_request" ).removeClass( "hide" )
  });

  $(document).on("click", "#payable_invoice_tab", function(){
    $( "#payable_invoices" ).removeClass( "hide" )
    $( "#incoming_payments" ).addClass( "hide" )
  });

  $(document).on("click", "#incoming_payment_tab", function(){
    $( "#payable_invoices" ).addClass( "hide" )
    $( "#incoming_payments" ).removeClass( "hide" )
  });

  $(document).on("click", "#manage_leads", function(){
    $( "#leads" ).removeClass( "hide" )
    $( "#lead_transmitter" ).addClass( "hide" )
    $( "#lead_manager" ).addClass( "hide" )
  });

  $(document).on("click", "#manage_lead_transmitter", function(){
    $( "#leads" ).addClass( "hide" )
    $( "#lead_transmitter" ).removeClass( "hide" )
    $( "#lead_manager" ).addClass( "hide" )
  });

  $(document).on("click", "#manage_lead_manager", function(){
    $( "#leads" ).addClass( "hide" )
    $( "#lead_transmitter" ).addClass( "hide" )
    $( "#lead_manager" ).removeClass( "hide" )
  });

  $(document).on("click", ".office_check", function(){
    var id = getId(this.id); 
    //if checked
    if ($("#current_user_office_check_" + id).is(":checked")) {
      //add to the actual param
      addIdToArray("selected_offices", id);
      // update to unselect text
      set_unselect_text("#office_select_text_" + id, "#office_unselect_text_" + id);
    }
    else {
      // remove from actual param
      removeIdFromArray("selected_offices", id);
      // update to select text
      set_select_text("#office_select_text_" + id, "#office_unselect_text_" + id);
    }
  });

  $(document).on("click", ".select_office_check", function(){
    var id = getId(this.id);
    if ($("#select_office_check_" + id).is(":checked")) {
      //add to the actual param
      $(".select_office_check").prop('checked', false);
      $(this).prop('checked', true);
      $('.office_select_text').removeClass('hide');
      $('.office_unselect_text').addClass('hide');
      set_unselect_text("#office_select_text_" + id, "#office_unselect_text_" + id);
      $("#selected_offices_list").val(id);
      // update to unselect text
    }
    else {
      // remove from actual param
      $("#selected_offices_list").val(id);
      // update to select text
      set_select_text("#office_select_text_" + id, "#office_unselect_text_" + id);
    }
  });

  $(document).on("click", ".pep_close", function(){
    $("#signatureModal").modal("hide");
    setTimeout(function(){
      $("#pepModelModal").modal("show");
    }, 500);
  });
  $(document).on("click", ".nextlink1", function(){
    if ($("#go_to_next_form_1").hasClass("verification1")){
      $( "#pep_form_1" ).removeClass( "active in" )
      $( "#pep_form_2" ).addClass( "active in" )
      $( ".pep2" ).addClass( "active" )
      $( ".pep1" ).removeClass( "active" )
    }
    if ($("#go_to_next_form_1").hasClass("benificial1")){
      $( "#pep_form_1" ).removeClass( "active in" )
      $( "#pep_form_3" ).addClass( "active in" )
      $( ".pep3" ).addClass( "active" )
      $( ".pep1" ).removeClass( "active" )
    }
  });
  $(document).on("click", ".nextlink2", function(){
    if ($("#go_to_next_form_2").hasClass("report2")){
      $( "#pep_form_2" ).removeClass( "active in" )
      $( "#pep_form_3" ).addClass( "active in" )
      $( ".pep3" ).addClass( "active" )
      $( ".pep2" ).removeClass( "active" )
    }
  });
  $(document).on("click", ".previouslink2", function(){
    if ($("#go_to_previous_form_2").hasClass("origin2")){
      $( "#pep_form_2" ).removeClass( "active in" )
      $( "#pep_form_1" ).addClass( "active in" )
      $( ".pep1" ).addClass( "active" )
      $( ".pep2" ).removeClass( "active" )
    }
  });
  $(document).on("click", ".previouslink3", function(){
    if ($("#go_to_previous_form_3").hasClass("origin3")){
      $( "#pep_form_3" ).removeClass( "active in" )
      $( "#pep_form_1" ).addClass( "active in" )
      $( ".pep1" ).addClass( "active" )
      $( ".pep3" ).removeClass( "active" )
    }
    if ($("#go_to_previous_form_3").hasClass("verification3")){
      $( "#pep_form_3" ).removeClass( "active in" )
      $( "#pep_form_2" ).addClass( "active in" )
      $( ".pep2" ).addClass( "active" )
      $( ".pep3" ).removeClass( "active" )
    }
  });
  $(document).on("click", ".pep_hide", function(){
    $('.modal').modal('hide');
    $('#book_new_offer_step_2_modal').load("agent_office/commission/commons//form_steps/_form_step_4_7.html.haml");
    setTimeout(function(){
    $('#book_new_offer_step_2_modal').modal('show');
  }, 1500);
  });
  $(document).on("click", ".acting_capacity_of_4", function(){
      $( "#another_acting_capacity_of" ).removeClass( "hide" )
  });
  $(document).on("click", ".acting_capacity_of_1", function(){
      $( "#another_acting_capacity_of" ).addClass( "hide" )
  });
  $(document).on("click", ".acting_capacity_of_2", function(){
      $( "#another_acting_capacity_of" ).addClass( "hide" )
  });
  $(document).on("click", ".acting_capacity_of_3", function(){
      $( "#another_acting_capacity_of" ).addClass( "hide" )
  });
  $(document).on("click", ".pep_value_1", function(){
      $( ".pep_values" ).addClass( "hide" )
  });
  $(document).on("click", ".pep_value_2", function(){
      $( ".pep_values" ).removeClass( "hide" )
  });
  $(document).on("click", ".attachment_fields_checkbox", function(){
      if ($(this).is(':checked') == true){
        var data = $(this).closest('.attachment_fields_count').find('.file_attachments');
        data.removeClass("disableattchmentbutton")
      }
      else{
        var data = $(this).closest('.attachment_fields_count').find('.file_attachments');
        data.addClass("disableattchmentbutton")
      }
  });

  if ($(".attachment_fields_count").length >= 4){
    var attchment_total_fields  = document.getElementsByClassName("attchment_remove_link")
    attchment_total_fields[0].className = attchment_total_fields[0].className.replace(/\battchment_remove_link\b/g, "attchment_remove_link hide")
    attchment_total_fields[1].className = attchment_total_fields[1].className.replace(/\battchment_remove_link\b/g, "attchment_remove_link hide")
    attchment_total_fields[2].className = attchment_total_fields[2].className.replace(/\battchment_remove_link\b/g, "attchment_remove_link hide")
    attchment_total_fields[3].className = attchment_total_fields[3].className.replace(/\battchment_remove_link\b/g, "attchment_remove_link hide")
  }
  if ($(".pep_show_parent").length <= 0){
    $(".pep_show_child").addClass("hide");
  }
  else{
    $(".pep_show_child").removeClass("hide");
  }

  $("#add_visiting_address").click(function(){
    $("#visiting_address_wrapper").removeClass("hide");
    $("#add_visiting_address_wrapper").remove();
  });

  $("#add_billing_address").click(function(){
    $("#billing_address_wrapper").removeClass("hide");
    $("#add_billing_address_wrapper").remove();
  });

  $(".selectAllCards").click(function () {
      $(".allCustomerCheck").prop('checked', this.checked);
  });
    
  $("#ckbCheckAll").click(function () {
      $(".checkBoxClass").prop('checked', this.checked);
  });

  $("#CheckBox1").click(function () {
      $(".check_confirm_leads_listings").prop('checked', this.checked);
  });

  $("#CheckBox2").click(function () {
      $(".checkOpenHousecontacts").prop('checked', this.checked);
  });

  $("#CheckBox3").click(function () {
      $(".checkPurchaseWatches").prop('checked', this.checked);
  });

  $("#CheckBox4").click(function () {
      $(".checkOpenHousecontacts").prop('checked', this.checked);
  });

  $("#CheckBox5").click(function () {
      $(".chkCancelledCommissions").prop('checked', this.checked);
  });

  $("#chkAllPotentialList").click(function () {
      $(".chkPotentialListing").prop('checked', this.checked);
  });

  $("#chkAllActiveList").click(function () {
      $(".chkActiveListing").prop('checked', this.checked);
  });

  $("#chkCompletedList").click(function () {
    $(".chkCompletedListing").prop('checked', this.checked);
  });

  $(".addThousandSeparators").focusout(function() {
    $(this).val(addThousandSeparators($(this).val()));
  });

  $("#presentation_text").on('keyup',function(){
    $(this).css('height','auto');
    $(this).height(this.scrollHeight);
  });

  $(document).on('click', '#proceed_next_btn', function(){
    $("#proceed_previous").val('');
    $("#commision_base_form_id").closest("form").submit();
  });

  $(document).on('click', '#proceed_previous_btn', function(){
    $("#proceed_next").val('');
    $("#commision_base_form_id").closest("form").submit();
  });

  $(document).on('click', '#save_send_feedback_modal_form_btn', function(){
    var browser_data;
    var browser_parser = new UAParser();
    var browser_global_data = browser_parser.getResult();
    var screen_size;

    if(window){
      if(window.screen){
        screen_size = window.screen.width + 'x' + window.screen.height
      }
    }

    browser_data = {
                    'browser_name': browser_global_data.browser.name,
                    'browser_version': browser_global_data.browser.version,
                    'os_name': browser_global_data.os.name,
                    'os_version': browser_global_data.os.version,
                    'screen_size': screen_size,
                    'device_type': browser_global_data.device.type
                  }

    $('#get_current_user_browser_details').val(JSON.stringify(browser_data));
    $('#get_current_page_feedback_url').val(window.location.href);
    $('#save_user_feedback_form_id').closest('form').submit();
  });

  common_events();

  $(document).on("change", ".check_feedback_phase_attachment_type", function(){
    var phase_type = $(this).val();
    $('.attach_current_page_location').addClass('hide');
    $('.attach_feedback_resources').addClass('hide');
    if (phase_type == "YES"){
      $('.attach_current_page_location').removeClass('hide');
    }else{
      $('.attach_feedback_resources').removeClass('hide');
    }
  });

  $(document).on("change", "#check_invoice_vat", function(){
    var vat_type = $(this).val();
    if (vat_type == "YES"){
      $('.attach_diff_invoice').removeClass('hide');
      $('.attach_same_invoice').addClass('hide');
    }else{
      $('.attach_diff_invoice').addClass('hide');
      $('.attach_same_invoice').removeClass('hide');
    }
  });

  // setTimeout(function () {
  //   $('.ckeditorCustomStatic').ckeditor({});
  // }, 1000);

  $(document).on("click", ".open_house_contacts_property_info", function(){
    var parentEl = $(this).closest('.searchResultBox');
    var target_ele = $(parentEl).find('.OpenHousePropertInfo');
    $(parentEl).find('.set_title_name').toggleClass("hide");
    $(parentEl).find('.show_upside_arrow').toggleClass("hide");
    $(target_ele).toggleClass('hide');
  });

  $(document).on("click", ".show_list_of_drop_down_menu", function(){
    var parentEl = $(this).parent().closest('.drop_down_diary_list');
    var diary_list_step = $(parentEl).data('class_selector');
    if ($(parentEl).find(diary_list_step).hasClass('hide')){
      $('.display_drop_down_dairy_list').addClass('hide');
      $('.set_list_name_close').addClass('hide');
      $('.show_up_arrow').addClass('hide');
      $('.set_list_name_open').removeClass('hide');
      $('.show_down_arrow').removeClass('hide');
    }
    $(parentEl).find(diary_list_step+'_set_list_name').toggleClass("hide");
    $(parentEl).find(diary_list_step+'_show_up_arrow').toggleClass("hide");
    $(parentEl).find(diary_list_step).toggleClass("hide");
  });

  $(document).on("click", ".show_contract_drop_down_menu", function(){
    var parentEl = $(this).parent().closest('.drop_down_data_list');
    var contract_step = $(parentEl).data('class_selector');
    if ($(parentEl).find(contract_step).hasClass('hide')){
      $('.display_drop_down_data').addClass('hide');
      $('.set_title_name_close').addClass('hide');
      $('.show_upside_arrow').addClass('hide');
      $('.set_title_name_open').removeClass('hide');
      $('.show_downside_arrow').removeClass('hide');
    }
    $(parentEl).find(contract_step+'_set_title_name').toggleClass("hide");
    $(parentEl).find(contract_step+'_show_upside_arrow').toggleClass("hide");
    $(parentEl).find(contract_step).toggleClass("hide");
  });

  $(document).on("change", ".copy_same", function(){
    $('.' + $(this).data('class_name')).val($(this).val());
    if ($(this).data('trigger_class_name')){
      $('.' + $(this).data('trigger_class_name')).trigger('change');
    }
  });

  $(document).on("click", ".unclickable", function(){
    return false;;
  });

  // $('.location_search_input_tags').tagit({
  //   placeholderText: I18n.t("js.general.task.property_fill_placeholder"),
  //   afterTagAdded: function(event, ui) {
  //     $('.location_search_input_tags').parent().find('.tagit-new').find('input').attr('placeholder', '');
  //   },
  //   afterTagRemoved: function(event, ui) {
  //     if ($('.location_search_input_tags').parent().find('ul').children('li').size() == 1){
  //       $('.location_search_input_tags').parent().find('.tagit-new').find('input').attr('placeholder', I18n.t("js.general.task.property_fill_placeholder"));
  //     }
  //   }
  // });

  $(document).on("change", ".checkFile", function(){
    var reader = new FileReader();
    var fileField = $(this);
    var file = $(fileField)[0].files[0];

    reader.onload = function() {
      dataUrl = reader.result;
      checkFileIcon = $(fileField).closest('.checkFileParent').find('.checkFileIcon');
      $(checkFileIcon).removeClass('hide');
      var checkLink = $(checkFileIcon).find('a');
      $(checkLink).attr('download', file.name);
      $(checkLink).attr('href', dataUrl);
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  $(document).on("click", ".set_checkbox_check", function(){
    var id = getId(this.id);
    var parentEl = $(this).parent();
    if ($(this).is(":checked")){
      $(".set_checkbox_check").prop('checked', false);
      $(this).prop('checked', true);
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      $(parentEl).find('.select_text').addClass('hide')
      $(parentEl).find('.unselect_text').removeClass('hide');
    }
    else{
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
    }
  });

  $(document).on("click", ".set_delete_deliver_checkbox_check", function(){
    var id = getId(this.id);
    var parentEl = $(this).parent();
    var value = $(this).val();
    if ($(this).is(":checked")){
      $(".set_delete_deliver_checkbox_check").prop('checked', false);
      $(this).prop('checked', true);
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      $(parentEl).find('.select_text').addClass('hide')
      $(parentEl).find('.unselect_text').removeClass('hide');
      $('#confirm_checkbox').removeClass('disableattchmentbutton');
      if (value == 'delete'){
        $('#press_to_delete').removeClass('hide');
        $('#press_to_deliver').addClass('hide');
      } else {
        $('#press_to_deliver').removeClass('hide');
        $('#press_to_delete').addClass('hide');
      }
    }
    else{
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      $('#press_to_deliver').addClass('hide');
      $('#press_to_delete').addClass('hide');
      $('#confirm_checkbox').addClass('disableattchmentbutton');
    }
  });

  $(document).on("click", ".set_office_agent_checkbox_check", function(){
    var id = getId(this.id);
    var parentEl = $(this).parent();
    var value = $(this).val();
    if ($(this).is(":checked")){
      $(".set_office_agent_checkbox_check").prop('checked', false);
      $(this).prop('checked', true);
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      $(parentEl).find('.select_text').addClass('hide')
      $(parentEl).find('.unselect_text').removeClass('hide');
      $('#GetcheckBox').removeClass('disableattchmentbutton');
      if (value == "agent"){
        $('#confirmBox2').removeClass('hide');
        $('#confirmBox1').addClass('hide');
      } else {
        $('#confirmBox1').removeClass('hide');
        $('#confirmBox2').addClass('hide');
      }
    }
    else{
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      $('#confirmBox1').addClass('hide');
      $('#confirmBox2').addClass('hide');
      $('#GetcheckBox').addClass('disableattchmentbutton');
    }
  });

  $(document).on("click", ".origin_set_checkbox_check", function(){
    var id = getId(this.id);
    var parentEl = $(this).parent();
    if ($(this).is(":checked")){
      $(".origin_set_checkbox_check").prop('checked', true);
      $(this).prop('checked', true);
      $('.select_text_1').removeClass('hide');
      $('.unselect_text_1').addClass('hide');
      $(parentEl).find('.select_text_1').addClass('hide')
      $(parentEl).find('.unselect_text_1').removeClass('hide');
    }
    else{
      $('.select_text_1').removeClass('hide');
      $('.unselect_text_1').addClass('hide');
    }
  });
  $(document).on("click", ".verification_set_checkbox_check", function(){
    var id = getId(this.id);
    var parentEl = $(this).parent();
    if ($(this).is(":checked")){
      $(".verification_set_checkbox_check").prop('checked', true);
      $(this).prop('checked', true);
      $('.select_text_2').removeClass('hide');
      $('.unselect_text_2').addClass('hide');
      $(parentEl).find('.select_text_2').addClass('hide')
      $(parentEl).find('.unselect_text_2').removeClass('hide');
    }
    else{
      $('.select_text_2').removeClass('hide');
      $('.unselect_text_2').addClass('hide');
    }
  });
  $(document).on("click", ".report_set_checkbox_check", function(){
    var id = getId(this.id);
    var parentEl = $(this).parent();
    if ($(this).is(":checked")){
      $(".report_set_checkbox_check").prop('checked', true);
      $(this).prop('checked', true);
      $('.select_text_3').removeClass('hide');
      $('.unselect_text_3').addClass('hide');
      $(parentEl).find('.select_text_3').addClass('hide')
      $(parentEl).find('.unselect_text_3').removeClass('hide');
    }
    else{
      $('.select_text_3').removeClass('hide');
      $('.unselect_text_3').addClass('hide');
    }
  });
  $(document).on("click", ".set_checkbox_signatory_check", function(){
    var id = getId(this.id);
    //if checked
    if ($(this).is(":checked")){
      // update to unselect text
      set_unselect_text("#select_text_" + id, "#unselect_text_" + id);
    }
    else {
      // update to select text
      set_select_text("#select_text_" + id, "#unselect_text_" + id);
    }
  });
  
  $(document).on("click", ".hard_return_back", function(){
    redirectTo(window.location.href);
  });

  $(document).on("click", ".make_request", function(){
    var url = $(this).data('request_url');
    var method_type = $(this).data('method_type');
    var t;
    clearTimeout(t);
    t = setTimeout(function () {
      $.ajax({
        url: url,
        type: method_type
      });
    }, 100);
  });

  $(document).on("change", ".media-file-upload", function(){
    var id = getId(this.id);
    var reader = new FileReader();
    var parentEl = $(this).closest('.file_attachments');
    var ele = $(parentEl).find('.preview_attachments');

    if ($(parentEl).find(".saved_media_file").length > 0){
      $(parentEl).find(".destroy-media-file").val("0");
    }
    removePreviewFileEle = "<a class='remove-file remove-media-file dib' href='javascript:void(0);'><div class='remove-preview-file remove'><i class='fa fa-times'></i></div></a>";

    preview_file_ele = "<li class='form-group'><a href='javascript:void(0);'>" + this.files.item(0).name + "</a> " + removePreviewFileEle + "</li>";
    $(ele).find("li").addClass("hide");
    $(ele).append(preview_file_ele);
  });

  $(document).on("click", ".remove-media-file", function(){
    var parentEl = $(this).closest('.file_attachments');
    $(parentEl).find(".media-file-upload").val('');
    if ($(parentEl).find(".saved_media_file").length > 0){
      $(parentEl).find(".destroy-media-file").val("1");
    }
    $(parentEl).find("li").addClass("hide");
  });

  // $(document).on("click", ".remove-saved-media-file", function(){
  //   var parentEl = $(this).closest('.file_attachments');
  //   var ele = $(parentEl).find('.destroy-media-file');
  //   var premission = confirm(I18n.t("js.general.task.are_you_sure"));
  //   if (premission == true) {
  //     $(ele).val("1");
  //     $(parentEl).find("li").addClass("hide");
  //   }
  // });

  $(document).on('click', '.checkMandatory', function(e){
    var form = $(this).closest('form');
    var mandatory_fields = $(form).find('.mandatory_field')
    var isValid = checkIfAllFieldsHaveValues(mandatory_fields);
    if (!isValid){
      e.preventDefault();
      $(mandatory_fields).each(function() {
        custom_validation(this);
      });
      $(form).find(".has-error").find('input').focus();
      $('#loader-image').hide();
    }
  });

  // $(document).on('click', '.checkFraction', function(e){
  //   var unique_fraction_fields, class_name;
  //   var form = $(this).closest('form');
  //   var fraction_seller_fields = $(form).find('.calculate_seller_fraction');
  //   var fraction_buyer_fields = $(form).find('.calculate_buyer_fraction');
  //   var isSellerValid = checkIfSumEqualToOne(fraction_seller_fields);
  //   var isBuyerValid = checkIfSumEqualToOne(fraction_buyer_fields);

  //   if (!isSellerValid){
  //     e.preventDefault();
  //     $(fraction_seller_fields).each(function() {
  //       var msg = I18n.t("js.general.task.must_be_less_or_equal_to_1")
  //       display_validation_text($(this),msg);
  //     });
  //     $(form).find(".has-error").find('input').focus();
  //   }
  //   if (!isBuyerValid){
  //     e.preventDefault();
  //     $(fraction_buyer_fields).each(function() {
  //       var msg = I18n.t("js.general.task.must_be_less_or_equal_to_1")
  //       display_validation_text($(this),msg);
  //     });
  //     $(form).find(".has-error").find('input').focus();
  //   }
  // });  

  $(document).on("change keyup", ".mandatory_field", function(){
    custom_validation(this);
  });

  // $(document).on("shown.bs.modal", "#send_reminder_message_customer_modal, #send_hint_colleague, #send_visit_report_modal, #send_selling_commission_contract_modal, #send_renting_commission_contract_modal, #send_commission_calculation, #SendPurchaseWatchModal, #send_message_to_offerors_step_2_modal, #send_message_to_visitors_step_3_modal, #send_rent_application_form_modal, #get_rent_approval_modal, #remaxLoginInfoEmailModal, #feedbackModal, #remaxEmailModal, #SendLeadAgentModal, #OrderFormPartnerModal, #OrderSuperintendentDocumentsModal, #partnerContactEmailModal, #send_selling_commission_offer_modal, #send_selling_commission_specifications_modal, #SendsalesKeyModal, #SendspecificationformModal, #SendcustomerKeyModal, #send_purchase_agreement, #send_asset_transfer_tax_invoice, #send_customer_invoice, .ContactAgentModal, .SendBrochureModal, #sendMessageUserModal, #SendResourcesbyEmailModal, #SendOffersbyEmailModal, #SendCancelPlusServiceCustomerModal, #SendNewPasswordCustomerModal, .CommissionPlusServiceModals", function(){
  //   $('.ckeditorCustom').ckeditor({
  //   });
  // });

  // $(document).on("shown.bs.modal", ".modal", function(){
  //   $('.ckeditorCustom').ckeditor({
  //   });
  // });

  $(document).on('click', '#ConfirmLeadPartners', function () {
    var t;
    clearTimeout(t);
    t = setTimeout(function () {
      $('#send-lead-partners-formId').submit();
    }, 100);
  });

  $(document).on('click', '#OrderFormStep3Close', function () {
    $('#OrderFormStep3').modal('hide');
    setTimeout(function(){
      updateProductServiceStep2ModalShowStatus('show');
    }, 500);
  });

  $(document).on('click', '#PartnerServiceRoomOpen', function () {
    showRoomPremiseWishFields();
    updateProductServiceStep2ModalShowStatus('hide');
  });

  $(document).on('click', '.partnerServiceRoomModal', function () {
    showRoomPremiseWishFields();
  });

  $(document).on('click', '#PartnerServiceRoomClose', function () {
    $('#PartnerServiceRoomModal').modal('hide');
    setTimeout(function(){
      updateProductServiceStep2ModalShowStatus('show');
    }, 500);
  });
  
  $(document).on('click', '#photographId', function () {
    $("#current_selected_order_partner_service").val("photographer");
    if ($('#selected_photography_partner').val() == "") {
      $('.photograph_order_partner_service').attr('disabled', true);
    }
    else{
      $('.photograph_order_partner_service').attr('disabled', false);
    }
  });

  $(document).on('click', '#floorPlanId', function () {
    $("#current_selected_order_partner_service").val("floor_plan");
    if ($('#selected_floor_plan_partner').val() == "") {
      $('.floor_order_partner_service').attr('disabled', true);
    }
    else{
      $('.floor_order_partner_service').attr('disabled', false);
    }
  });

  $(document).on("click", ".helpIcon", function(){
    var parentEl = $(this).closest('.helpQuestion');
    unsure_check_box = parentEl.find('input')[0];
    if(unsure_check_box.value == 'false' || unsure_check_box.value == ''){
      unsure_check_box.value = 'true';
      parentEl.addClass('activeHelp');
    }
    else{
      unsure_check_box.value = 'false';
      parentEl.removeClass('activeHelp');
    }
  });

  $(document).on("click", ".helpIconBottom", function(){  
    var parentEl = $(this).closest('.helpQuestionBottom');
    unsure_check_box = parentEl.find('input')[0];
    if(unsure_check_box.value == 'false' || unsure_check_box.value == ''){
      unsure_check_box.value = 'true';
      parentEl.addClass('activeHelp');
    }
    else{
      unsure_check_box.value = 'false';
      parentEl.removeClass('activeHelp');
    }
  });

  $(document).on('keyup', '#office_logo_text',  function() {
    var value = document.getElementById('display_office_logo_text');
    value.innerText = $("#office_logo_text").val();
    var image = document.getElementById('image_display');
    if ($(this).val() == '' && $("#office_logo_url").val() != undefined) {
      image.src = $("#office_logo_url").val();
    }else {
      image.src = $("#brand_logo_url").val();  
    }
    
  });

  // scroll listing
  $('.scroll').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 20,
    nextSelector: 'a.jscroll-next:last',
    callback: common_events
  });

  //scroll listing
  $('.scroll-customer').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 20,
    nextSelector: 'a.jscroll-next-customer:last',
    callback: common_events
  });

  // scroll listing
  $('.scroll-partner').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 0,
    nextSelector: 'a.jscroll-next-partner:last',
    callback: common_events
  });

  // scroll listing
  $('.scroll-office').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 0,
    nextSelector: 'a.jscroll-next-office:last',
    callback: common_events
  }); 
 
  // scroll listing
  $('.scroll-agent').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 0,
    nextSelector: 'a.jscroll-next-agent:last',
    callback: common_events
  });

  // scroll listing
  $('.scroll-person').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 0,
    nextSelector: 'a.jscroll-next-person:last',
    callback: common_events
  });
  // load working office field
  if ($(".working-offices").length == 0){
    $(".addWorkingOffice").trigger('click');
    $(".nested-fields").first().find( ".removeWorkingOffice" ).css('display','none')
  }else{
    $(".working-offices").first().find( ".removeWorkingOffice" ).css('display','none')
  }

  // open remax email modal
  $(document).on('input propertychange paste click', '#user_email',  function() {
    userEmail = $(this).val();
    if (validateEmail(userEmail)) {
      $("#remaxEmailbtn").attr('disabled', false);
    }else{
      $("#remaxEmailbtn").attr('disabled', true);
    }
  })
  if ($("#user_email").val() != ""){
    $("#remaxEmailbtn").attr('disabled', false);
  }
  $(document).on('click', '#remaxEmailbtn',  function() {
    userVal = $('#user_email').val();
    msgText = $("#old_message").val();
    msgText = msgText.replace("userEmail", userVal);
    msgText = msgText.replace(/^\s+|\s+$/gm,'');
    $("#message").html(msgText);
  })

  $(document).on('change', '#supreintendent_registered_emailId',  function() {
    hmEmail = $(this).val();
    if (validateEmail(hmEmail)) {
      $('#order_supreintendent_recipient_email').val(hmEmail);
      $('#orderSuprientendentEmailbtn').attr('disabled', false);
    }
    else{
      $('#order_supreintendent_recipient_email').val('');
      $('#orderSuprientendentEmailbtn').attr('disabled', true);
    }
  });

  // user/office contract until show/hide
  if ((".contract_until").length > 0) {
    $('.contract_type_time_limited, .contract_probation_true').click(function(){
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      $('#contract_until_' + id).show('slow');
    });

    $('.contract_probation_false').click(function(){
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      if(!$('#contract_type_time_limited_' + id).is(":checked")) {
        $('#contract_until_' + id).hide('slow');
      }
    });

    $('.contract_type_indefinitely_valid').click(function(){
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      if(!$('#contract_probation_true_' + id).is(":checked")) {
        $('#contract_until_' + id).hide('slow');
      }
    });

    var time_limited_contract_types = $(".contract_type_time_limited");
    for(var i=0; i<time_limited_contract_types.length; i++){
      var idArr = time_limited_contract_types[i].id.split("_");
      var id = idArr[idArr.length - 1];
      if ($("#contract_type_time_limited_" + id).is(":checked")){
        $('#contract_until_' + id).show('slow');
      }
      else{
        if ($("#contract_probation_true_" + id).is(":checked")){
          $('#contract_until_' + id).show('slow');
        }
        else {
          $('#contract_until_' + id).hide('slow');
        }
      }
    }
  }

  //reward share and fixed fee disabling
  $(".reward_only_share").click(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#only_share_share_" + id).removeAttr('disabled');
    $("#fee_share_fee_" + id).attr({'disabled': 'disabled'});
    $("#fee_share_share_" + id).attr({'disabled': 'disabled'});
  });

  $(".reward_fee_share").click(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#fee_share_fee_" + id).removeAttr('disabled');
    $("#fee_share_share_" + id).removeAttr('disabled');
    $("#only_share_share_" + id).attr({'disabled': 'disabled'});
  });

  $(".commission_reward_type_commission").click(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#chain_fee_share_" + id).removeAttr('disabled');
  });

  $(".commission_reward_type_total_sales").click(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#chain_fee_share_" + id).attr({'disabled': 'disabled'});
  });

  //add aditional languages
  if ($("#add_new_language").length > 0){
    var total_added_languages = 0;
    $(document).on("click", "#add_new_language",  function() {
      var count = ++total_added_languages;
      $('#input_add_language').append('<div class="added_language" id="added_language_wrapper_' + count + '"><div class="col-xs-12 col-sm-8 col-md-10 form-group"><input type="text" id="input_add_language_'+count+'" name="languages['+ count +']" class="form-control"/></div><div class="col-xs-12 col-sm-3 col-md-2 form-group text-right pt10"><label class="remove_language"  id="remove_language_' + count + '"><a href="javascript:void(0)" class="addLink remove_fields dynamic"><i class="removeIcon"></i>Remove</a></label></div></div>')
    });
    $(document).on("click",".remove_language", function() {
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      $("#added_language_wrapper_"+ id).remove();
    });
  }

  if ($("#bank_account_details").length > 0){
    var total_added_bank_account = $("#bank_account_details").find($("input")).length/2;
    $(document).on("click", "#add_new_bank_account",  function() {
      var count = ++total_added_bank_account;
      $('#input_add_bank_account_details').append('<div class="added_bank_account" id="added_bank_account_wrapper_' + count + '"><div class="fieldRemove"><div class="row row7"><div class="col-xs-12 col-sm-6 form-group"><input type="text" id="input_add_name_'+count+'" name="setting[bank_details_'+ count +'][name]" class="form-control" placeholder = "Bank name"/></div><div class="col-xs-12 col-sm-6 form-group"><input type="text" id="input_add_bank_number_'+count+'" name="setting[bank_details_'+ count +'][number]" class="form-control" placeholder = "Bank account number" /></div></div><a href="javascript:void(0)" class="addLink remove_fields dynamic remove_bank_account_details" id="remove_bank_account_details_' + count + '"><i class="removeIcon"></i>Remove</a></div></div>')
    });
    $(document).on("click",".remove_bank_account_details", function() {
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      $("#added_bank_account_wrapper_"+ id).remove();
    });
  }

  if ($("#kahiseva_bank_account_details").length > 0){
    var total_added_bank_account = $("#kahiseva_bank_account_details").find($("input")).length/2;
    $(document).on("click", "#add_new_kahiseva_bank_account",  function() {
      var count = ++total_added_bank_account;
      $('#input_add_kahiseva_bank_account_details').append('<div class="added_kahiseva_bank_account" id="added_kahiseva_bank_account_wrapper_' + count + '"><div class="fieldRemove"><div class="row row7"><div class="col-xs-12 col-sm-6 form-group"><input type="text" id="input_add_name_'+count+'" name="setting[kahiseva_bank_details_'+ count +'][name]" class="form-control" placeholder = "Bank name"/></div><div class="col-xs-12 col-sm-6 form-group"><input type="text" id="input_add_bank_number_'+count+'" name="setting[kahiseva_bank_details_'+ count +'][number]" class="form-control" placeholder = "Bank account number" /></div></div><a href="javascript:void(0)" class="addLink remove_kahiseva_fields dynamic remove_kahiseva_bank_account_details" id="remove_kahiseva_bank_account_details_' + count + '"><i class="removeIcon"></i>Remove</a></div></div>')
    });
    $(document).on("click",".remove_kahiseva_bank_account_details", function() {
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      $("#added_kahiseva_bank_account_wrapper_"+ id).remove();
    });
  }

  // if ($("#sales_area").length > 0){
  //   var total_added_sales_area = $("#sales_area").find($("input")).length;
  //   $(document).on("click", "#add_new_sales_area",  function() {
  //     var count = ++total_added_sales_area;
  //     $('#input_add_sales_area').append('<div class="added_sales_area" id="added_sales_area_wrapper_' + count + '"><div class="fieldRemove"><div class="row row7"><div class="col-xs-12 col-sm-6 form-group"><input type="text" id="input_add_name_'+count+'" name="setting[sales_area_'+ count +'][name]" class="form-control" placeholder = "Name"/></div></div><a href="javascript:void(0)" class="addLink remove_fields dynamic remove_sales_area" id="remove_sales_area_' + count + '"><i class="removeIcon"></i>'+I18n.t("js.general.task.remove")+'</a></div></div>')
  //   });
  //   $(document).on("click",".remove_sales_area", function() {
  //     var idArr = this.id.split("_");
  //     var id = idArr[idArr.length - 1];
  //     $("#added_sales_area_wrapper_"+ id).remove();
  //   });
  // }  

  // add and remove working area
  $(document).on("click", "#add_new_working_area", function(){
    var workingAreas = $(".working_area");
    var lastWorkingAreaIdArr = workingAreas[workingAreas.length - 1].id.split("_");
    var lastWorkingAreaId = lastWorkingAreaIdArr[lastWorkingAreaIdArr.length - 1];
    var newWorkingAreaId = (parseInt(lastWorkingAreaId) + 1).toString();
    var workingAreaHolder = $("#working_area_holder").text().trim();
    if ($("#confirm_current_city_as_wa_0").length > 0) {
      var newWorkingArea = "<div id='working_area_wrapper_" + newWorkingAreaId + "' class='form-group fieldRemove'><input type='text' name='working_areas[" + newWorkingAreaId + "]' class='working_area form-control' id='working_area_" + newWorkingAreaId + "'><a href='javascript:void(0)' class='addLink remove_working_area' id='remove_working_area_" + newWorkingAreaId + "'><i class='removeIcon'></i>Remove</a></div>"
    }
    else {
      var newWorkingArea = "<div id='working_area_wrapper_" + newWorkingAreaId + "' class='form-group fieldRemove'><input type='text' name='working_areas[" + newWorkingAreaId + "]' class='working_area form-control' id='working_area_" + newWorkingAreaId + "'><a href='javascript:void(0)' class='addLink remove_working_area' id='remove_working_area_" + newWorkingAreaId + "'><i class='removeIcon'></i>Remove</a></div>"
    }
    $("#working_areas").append(newWorkingArea);
  });

  $(document).on("click", ".remove_working_area", function(e){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#working_area_wrapper_" + id).remove();
  });

  // order email
  $(function(){
    var remaxrecipient = $('#input_remax_recipient');
    var count = $('#input_remax_recipient p').size();
    $(document).on("click", "#add_recipient_for_remax_email",  function() {
      $('<p><input type="email" id="recipient_email" name="recipient_email['+ count +']" class="form-control"/><a href="#" id="removeremaxinput">Remove</a></p>').appendTo(remaxrecipient);
      count++;
      return false;
    });
    $(document).on("click","#removeremaxinput", function() {
      if( count > 1 )
        {
          $(this).parents('p').remove();
          count--;
        }
      return false;
    });
  });


  //show loader when adding responsible person
  $("#addResponsibleBtn").click(function(){
    $('#responsiblePersons').modal('toggle');
  });

  $("#addInternalResponsibleBtn").click(function(){
    $('#internalResponsiblePersons').modal('toggle');
  });

  //responsible_person nda document show/hide
  $(".responsible_role").click(function(){
    if ($("#user_role_internal").is(":checked")) {
      $("#nda_wrapper").addClass('hide');
    }
    if ($("#user_role_external").is(":checked")) {
      $("#nda_wrapper").removeClass('hide');
    }
  });

  // check for valid hours, minutes
  $(document).on( 'change', ".time_hour",function(){
    if (!($(this).val() >= parseInt("00") && $(this).val() <= 23)){
      $(this).val("");
    }
  });

  $(document).on( 'change', ".time_minute",function(){
    if (!($(this).val() >= parseInt("00") && $(this).val() <= 59)){
      $(this).val("");
    }
  });

  $(document).ready(function () {
    setTimeout(function () {
      $(".stepBtnSticky").css('height', $('.stepBtnSticky').height());
      $(".stepBtnSticky").css('position', 'sticky');
    }, 500);  
  });
  
  $(document).ready(function () {
    setTimeout(function () {
      $(".stepBtnStickymanage").css('height', $(window).height());
      $(".stepBtnStickymanage").css('position', 'sticky');
    }, 500);
  });  
  
});

function addThousandSeparators(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
  }
  return x1 + x2;
}

function setScrollPosition(selectedId) {
  $('html,body').animate({scrollTop: ($("#" + selectedId).offset().top - 2) }, 'slow');
}

function slideContent(slideFrom){
  if ($("#open_card_form").val() != 'true') {
    $('#mainWrapper').show('slide', { direction : slideFrom}, 1000);
  }
}

function fadeOutFlashMessage(id){
  $("#" + id).delay(3000).fadeOut(500);
}

function getId(id){
  var idArr = id.split("_");
  return idArr[idArr.length - 1];
}

function setFlashMessage(parentId, flashId, msg, fadeOut, animate){
  $("#" + parentId).html(getFlashMessageEle(msg, flashId));
  if (animate != false){
    SetFocusOnTopOfPage()
    //$('html, body').animate({scrollTop:$('#' + parentId).position().top}, 'slow');
  }
  if (fadeOut != false) {
    fadeOutFlashMessage(flashId);
  }
}

function getFlashMessageEle(msg, flashId){
  return "<div id='" + flashId + "' class='alert alert-dismissible alert-success'><button class='close' data-dismiss='alert' type='button'>×</button>" + msg + "</div>"
}

function common_events(){
  $( '#filterFormId, #filterFormId_agent, #filterFormIdInspector' ).on( 'change', 'select', function(){
    $("#loader-image").show();
    $( '#filterFormId' ).submit();
    $('#filterFormId_agent').submit();
    $('#filterFormIdInspector').submit();
  });
  
  $( '#filterFormId_director' ).on( 'change', 'select', function(){
    $(".pre-icon").show();
    $( '#filterFormId_director' ).submit();
  });

  $( '#filterFormId_kahiseva' ).on( 'change', 'select', function(){
    $(".pre-icon").show();
    $( '#filterFormId_kahiseva' ).submit();
  });

  $( '#filterFormId_lead' ).on( 'change', 'select', function(){
    $(".pre-icon").show();
    $( '#filterFormId_lead' ).submit();
  });

  $(document).on("keyup", "#lead_search_name", function(){
    $(".pre-icon").show();
    $( '#filterFormId_lead' ).submit();
  });

  $(document).on("keyup", ".search_kahiseva_agent_name", function(){
    $(".pre-icon").show();
    $( '#filterFormId_director' ).submit();
  });

  $(document).on("keyup", ".search_customer_name", function(){
    $(".pre-icon").show();
    $( '#filterFormId_director' ).submit();
  });

  $(document).on('change', '.filter_check_box', function(){
    $("#loader-image").show();
    $(this).closest('form').submit();
  });

  $('.fileUploadMedia').on( 'change', function(){
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.preview_file_box').html('<img src='+e.target.result+'>');
      }
      reader.readAsDataURL(this.files[0]);
    }
  });

  initiateDatePicker();

  // virtual keyboard
  $('.container').on('cocoon:after-insert', function(e, insertedItem) {
    if ($("#pc_browser").val() != 'true') {
      $('.virtualKeyboard').attr('readonly', true);    
      $('.virtualKeyboard').keyboard({
        layout: 'custom',
        restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
        preventPaste : true,  // prevent ctrl-v and right click
        autoAccept : true, 
        keyBinding: 'mousedown touchstart',   
        position: {
          of: null, // null = attach to input/textarea; use $(sel) to attach elsewhere
          my: 'center top',
          at: 'center top',
          at2: 'center bottom', // used when "usePreview" is false
          collision: 'flipfit flipfit'
        },
        usePreview: true,
        initialFocus: true,
        reposition: true,
      });

      $('.datepickeron').datepicker({
        format: 'dd.mm.yyyy',
        weekStart: 1,
        autoclose: true,
        todayHighlight: true,
        clearBtn: true,
        disableTouchKeyboard: true,
        Readonly: true
      }).attr("readonly", "readonly");    
    }
  });

  if ($("#pc_browser").val() != 'true') {
    $('.virtualKeyboard').attr('readonly', true);
    // initVirtualKeyboard($(document));
  }
  // else{
  //   initVirtualKeyboard($(document));
  // }

  $("#flash_msg").delay(3000).fadeOut(500);

  $(".filter-btn-cls, #filter-btn, #saveMedia, #saveMediaNext").click(function(){
    $("#loader-image").show();
  });
  
  $(document).on("click", ".pre-icon-load", function(){
    $(".pre-icon").show();
  });

  $(document).on("click", ".pre-icon-load-remote", function(){
    $(".pre-icon").show();
  });

  $(document).on("submit", ".pre-load-form", function(){
    $(".pre-icon").show();
  });

  $(document).on("click", ".navbar-toggle", function(){
    $(this).toggleClass('active');
    $('.navbar-collapse').toggleClass('active');
    $('.menuOverlay').toggleClass('active');
  });
  $(document).on("click", ".menuOverlay", function(){
    $(this).removeClass('active');
    $('.navbar-collapse').toggleClass('active');
    $('.navbar-toggle').toggleClass('active');
  });

  $('.officeChoosePosition').change(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 2];
    var selected_option = document.getElementById("user_office_users_attributes_" + id + "_position");
    var position_val = selected_option[selected_option.selectedIndex].value;
    if(position_val=="INDIVIDUAL" || position_val=="NO_POSITION"){
      $("#user_office_users_attributes_"+ id +"_team_id").addClass('hide');
      $("#user_office_users_attributes_"+ id +"_team_id").val("");
    }
    else{
      $("#user_office_users_attributes_"+ id +"_team_id").removeClass('hide');
    }
  });

  $(document).on('click', '.hideShowModal', function(){
    $('.modal').modal('hide');
    var show_modal_id = $(this).data('show_modal_id');
    if ($('#' + show_modal_id).length > 0){
      setTimeout(function () {
        $("#" + show_modal_id).modal('show');
      }, 1000);
    }
  });

  $(document).on('click', '.displayNotice', function(e){
    e.preventDefault();
    var notice_selector = $(this).data('notice_selector');
    var closest_notice_ele = $(this).closest('tbody').find(notice_selector);
    $(closest_notice_ele).removeClass('hide');
    if (isAnyModalOpen()){
      $(".modal").animate({ scrollTop: 0  }, "medium");
    }
    else{
      $('html,body').animate({scrollTop: 0 }, 'medium');
    }
    $(closest_notice_ele).show().delay(3000).fadeOut();
  });

  $(document).on('change', '.media_file', function(e){
    var parentEl = $(this).closest('.parent');
    $.each(this.files, function() {
      showMediaFilename(this, parentEl);
    });
  });

  // Load chart for prospects listing
  if(window.location.search.indexOf('prospects_chart=true') > -1 ){
    var url = window.location
    var method_type = "get"
    var t;
    clearTimeout(t);
    t = setTimeout(function () {
      $.ajax({
        url: url,
        type: method_type
      });
    }, 100);
  }

}

function showMediaFilename(file, parentEl){
  var reader = new FileReader();
  reader.onload = function(e) {
    $(parentEl).find('.media_attachment_name').val(file.name);
  }
  reader.readAsDataURL(file);
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function showFilename(file, ele) {
  var reader = new FileReader();
  reader.onload = function(e) {
    $(ele).val(file.name);
  }
  reader.readAsDataURL(file);
}

function showRoomPremiseWishFields(){
  if ($("#current_selected_order_partner_service").val() == "photographer"){
    $(".room_premise_photographer_wish").removeClass("hide");
    $(".room_premise_floor_plan_wish").addClass("hide");
  }
  else if ($("#current_selected_order_partner_service").val() == "floor_plan"){
    $(".room_premise_floor_plan_wish").removeClass("hide");
    $(".room_premise_photographer_wish").addClass("hide");
  }
}

function partnerCustomerContactDisableOtherInput(){
  $(".partner_contact_type_inputs input").attr("disabled", true);
  if ($("input:radio.partner_customer_contact_method:checked").val()){
    $(".partner_contact_" + $("input:radio.partner_customer_contact_method:checked").val().toLowerCase() + " input").attr("disabled", false);
  }
}

function updateProductServiceStep2ModalShowStatus(status){
  if ($("#current_selected_order_partner_service").val() == "photographer"){
    $('#OrderFormPhotographyStep2').modal(status);
  }
  else if ($("#current_selected_order_partner_service").val() == "floor_plan"){
    $('#OrderFormFloorPlanStep2').modal(status);
  }
}

function redirectTo(url, params){
  $.each(params, function(index, value){
    url = url + value;
  });
  window.location.replace(url);
}

function initiateDatePicker(normal = $('.datepickeron'), year = $('.datepickeron-year')){
  // date picker
  $(normal).datepicker({
    format: 'dd.mm.yyyy',
    weekStart: 1,
    autoclose: true,
    todayHighlight: true,
    clearBtn: true,
    disableTouchKeyboard: true,
    Readonly: true
  }).attr("readonly", "readonly");

  // date picker
  $(year).datepicker({
    minViewMode: 2,
    format: 'yyyy'
  }).attr("readonly", "readonly");
}

// function custom_validation(element){
//   var form = $(element).closest('form');
//   if ($(element).val().length > 0){
//     remove_validation_text(element);
//   }
//   else{
//    $(element).parent().closest('div').addClass('has-error');
//    $(element).parent().closest('div').css("position", "relative");
//    $(element).parent().closest('div').find('small:eq(0)').remove();
//    $(element).parent().closest('div').find('i:eq(0)').remove();
//    $(element).parent().closest('div').append('<i class="form-control-feedback fa fa-remove" style="top: 0px; right: 5px;"></i>'); 
//    $(element).parent().closest('div').append('<small class="help-block">'+I18n.t("js.general.task.mandatory_field")+'</small>');
//   }
//   if ($(form).find(".has-error").length > 0){
//     $(form).find("button[type='submit']").prop('disabled',true);}
//   else{
//     $(form).find("button[type='submit']").prop('disabled',false);
//   }
// }

function checkIfAllFieldsHaveValues(elements) {
  var isValid = true;
  $(elements).each(function() {
    if ( !$(this).prop('disabled') && !$(this).prop('readonly') && $(this).val() === '' )
      isValid = false;
  });
  return isValid;
}

function SetFocusOnTopOfPage(){
  $(".modal").animate({ scrollTop: 0 }, "slow");
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function checkIfAllFieldsHaveUniqueValues(elements) {
  var isValid;
  var values = [];
  $(elements).each(function() {
    if ( $(this).val() != '' ) {
      values.push($(this).val())
      var check_valid = true;
      for (i=0; i<values.length; i++) {
        for (j=i+1; j<values.length; j++) {
          if (values[i]==values[j]) {
            isValid = false;
            var first_ele = $(elements)[i];
            var second_ele = $(elements)[j];
            custom_uniquness_validation(first_ele, second_ele);
            check_valid = false;
            break;
          }
        }
      }
      if (check_valid){
        var class_name = $(this).attr("data-unique");
        $('.'+class_name).parent().closest('div').removeClass('has-error');
        $('.'+class_name).parent().closest('div').find('small:eq(0)').remove();
        $('.'+class_name).parent().closest('div').find('i:eq(0)').remove();
      }
    }
  });
  return isValid;
}

// function custom_uniquness_validation(f_element, s_element){
//   var form = $(f_element).closest('form');
//   if ($(s_element).val() === $(f_element).val()){
//     $(f_element).parent().closest('div').addClass('has-error');
//     $(f_element).parent().closest('div').append('<i class="form-control-feedback fa fa-remove" style="top: 0px;"></i>');
//     $(s_element).parent().closest('div').addClass('has-error');
//     $(s_element).parent().closest('div').append('<i class="form-control-feedback fa fa-remove" style="top: 0px;"></i>');
//     if ($(f_element).parent().find('.help-block').length > 0) {
//       $(f_element).parent().closest('div').find('.help-block').html('<small class="help-block">'+I18n.t("js.general.task.cannot_be_same")+'</small>');
//     }
//     else{
//       $(f_element).parent().closest('div').append('<small class="help-block">'+I18n.t("js.general.task.cannot_be_same")+'</small>');
//     }

//     if ($(s_element).parent().find('.help-block').length > 0) {
//       $(s_element).parent().closest('div').find('.help-block').html('<small class="help-block">'+I18n.t("js.general.task.cannot_be_same")+'</small>');
//     }
//     else{
//       $(s_element).parent().closest('div').append('<small class="help-block">'+I18n.t("js.general.task.cannot_be_same")+'</small>');
//     }
//   }
//   if ($(form).find(".has-error").length > 0){
//     $(form).find("button[type='submit']").prop('disabled',true);}
//   else{
//     if (!($(form).attr('id') == 'new_agent_office_commission_selling_show_visitor' && $(".auth_agent_lock_type:enabled").val() == 'unlock')){
//       $(form).find("button[type='submit']").prop('disabled',false);
//     }
//   }
// }
function isAnyModalOpen() {
  return $('.modal.in').length > 0;
}

function display_validation_text(element,msg){
  $(element).parent().closest('div').addClass('has-error');
  $(element).parent().closest('div').find('small:eq(0)').remove();
  $(element).parent().closest('div').find('i:eq(0)').remove();
  $(element).parent().closest('div').append('<i class="form-control-feedback fa fa-remove" style="top: 0px;"></i>'); 
  $(element).parent().closest('div').append('<small class="help-block">'+msg+'</small>');

}
function remove_validation_text(element){
  $(element).parent().closest('div').removeClass('has-error');
  $(element).parent().closest('div').find('small:eq(0)').remove();
  $(element).parent().closest('div').find('i:eq(0)').remove();
}

function checkIfSumEqualToOne(elements){
  var isValid = true;
  var total_fraction = 0;
  $(elements).each(function() {
    var fraction = $(this).val();
    if (fraction.match('/') != null){
      var split = fraction.split('/');
      var result = parseInt(split[0], 10) / parseInt(split[1], 10);
      total_fraction += parseFloat(result)
    }else{
      total_fraction += (parseFloat(fraction))
    }
  });
  if (total_fraction == 1) {
    isValid = true;
  }
  else{
    isValid = false; 
  }
  return isValid;
}

function checkIfPerSumEqualToOne(elements){
  var isValid = true;
  var total_percentage = 0;
  $(elements).each(function() {
    if ( $(this).val() != '' ) {
      total_percentage += parseFloat($(this).val())
    }
  });
  if (total_percentage == 100) {
    isValid = true;
  }
  else{
    isValid = false; 
  }
  return isValid;
}

function initVirtualKeyboard(ele){
  $(ele).find('.virtualKeyboard').keyboard({
    layout: 'custom',
    restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
    preventPaste : true,  // prevent ctrl-v and right click
    autoAccept : true,
    keyBinding: 'mousedown touchstart',
    position: {
      of: null, // null = attach to input/textarea; use $(sel) to attach elsewhere
      my: 'center top',
      at: 'center top',
      at2: 'center bottom', // used when "usePreview" is false
      collision: 'flipfit flipfit'
    },
    usePreview: true,
    initialFocus: true,
    reposition: true,
  });
}

function checkIsNaNVal(val){
  val = (isNaN(val)) ? 0 : val;
  return val;
}

function checkNumericValue(number, decimal_points = 2) {
  if (number){
    return parseFloat(parseFloat(number.toString().replace(' ', '').replace(",", ".")).toFixed(decimal_points));
  }
  else{
    return 0;
  }
}

function show_formatted_number(number, decimal_points = 2, with_space = true){
  if (number){
    number = checkNumericValue(number);
    var parts = number.toString().split(".");
    if (with_space){
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return parts.join(",");
  }
  else{
    0
  }
}

function commonAddOrRemoveHideClass(check_object, match_value, type){
  var parentEl = $(check_object).closest(".parent_hide_show_class");
  var childEl = $(parentEl).find(".child_hide_show_class");
  if ($(check_object).val() == match_value){
    if (type == "hide_fields"){
      $(childEl).removeClass("hide");
    }
    if (type == "disable_fields"){
      $(childEl).find('input').attr("disabled", false);
    }
  }
  else{
    if (type == "hide_fields"){
      $(childEl).addClass("hide");
    }
    if (type == "disable_fields"){
      $(childEl).find('input').attr("disabled", true);
      $(childEl).find('input').val("");
    }
  }
}

function modify_next_elements(){
  var elements = $(".jscroll-inner")
  $(elements).each(function() {
    var added = $(this).find('.jscroll-added')
    $(this).append($(added).children('.col-xs-12'))
    $(added).children('.col-xs-12').remove()
    $(this).append($(added))
  });
}

function setValueofAgentPercentage() {
  $('.agent_percentage').each(function(i){
    var change_agent_reward_share_pr = $(this).val();
    change_agent_reward_share_pr = parseFloat(change_agent_reward_share_pr.replace(',', '.').replace(/\s/g, ''));
    var change_value_with_vat = (parseFloat($("#total_amount_of_invoice_with_vat").val())*change_agent_reward_share_pr)/100
    var change_value_without_vat = (parseFloat($("#total_amount_of_invoice_without_vat").val())*change_agent_reward_share_pr)/100
    $(this).closest(".agents_reward_share").find(".agent_reward_share_without_vat").val(change_value_without_vat);
    $(this).closest(".agents_reward_share").find(".agent_reward_share_with_vat").val(change_value_with_vat);

  });
}

function setValueofOfficePercentage() {
  $('.agent_percentage').each(function(i){
    var change_office_reward_share_pr = $(this).val();
    change_office_reward_share_pr = parseFloat(change_office_reward_share_pr.replace(',', '.').replace(/\s/g, ''));
    var change_office_value_with_vat = (parseFloat($("#total_amount_of_invoice_with_vat").val())*change_office_reward_share_pr)/100
    var change_office_value_without_vat = (parseFloat($("#total_amount_of_invoice_without_vat").val())*change_office_reward_share_pr)/100
    $(this).closest(".office_reward_share").find(".office_reward_share_without_vat").val(change_office_value_without_vat);
    $(this).closest(".office_reward_share").find(".office_reward_share_with_vat").val(change_office_value_with_vat);
  });
}