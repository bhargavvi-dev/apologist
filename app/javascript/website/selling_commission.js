$(document).ready(function() {

    $('#next_page').on('click', function() {
        $('.active').fadeOut('slow', function() {
          // this gets called when the fade out finishes
            $(this).removeClass('active').next().fadeIn('slow', function() {
                // this gets called when the fade in finishes
                $(this).addClass('active');
                if ($(this).hasClass("lastArrow")){
                    $('.slideArrowRight').addClass("hide")
                } else {
                    $('.slideArrowLeft').removeClass("hide")
                }
            });
        });
    });

    $('#previous_page').on('click', function() {
        $('.active').fadeOut('slow', function() {
          // this gets called when the fade out finishes
            $(this).removeClass('active').prev().fadeIn('slow', function() {
                // this gets called when the fade in finishes
                $(this).addClass('active');
                if ($(this).hasClass("firstArrow")){
                    $('.slideArrowLeft').addClass("hide")
                } else {
                    $('.slideArrowRight').removeClass("hide")
                }
            });
        });
    });

    $(document).on("click", ".openVolume", function(){
        var toggle_id = $(this).data('show_modal_id');
        $("#choose_volume").toggleClass("hide");
        $(".show_selected_volume").toggleClass("hide");
    });

    $(document).on("click", ".openSuccessRates", function(){
        var toggle_id = $(this).data('show_modal_id');
        $("#choose_success_rates").toggleClass("hide");
        $(".show_selected_success_rates").toggleClass("hide");
    });

    $(document).on("click", ".openResults", function(){
        var toggle_id = $(this).data('show_modal_id');
        $("#choose_results").toggleClass("hide");
        $(".show_selected_results").toggleClass("hide");
    });

    $(document).on("click", ".restart_commission_copy_data_button", function () {
        $('.show_commission_data_copy_notice').removeClass('hide');
    });

    $(document).on("click", ".restart_commission_notification_btn", function () {
        $('.restart_commission_id').val('');
        $('.show_commission_data_copy_notice').addClass('hide');
        var parentEl = $(this).closest('.parent_display_tab_content');
        var commission_id = $(parentEl).find('.commission_id').val();
        var commission_customer_id = $(parentEl).find('.commission_customer_id').val();
        $('.restart_commission_id').val(commission_id);
        $('.commission_customer_id').val(commission_customer_id);
    });

    $(document).on("click", ".update_and_restart_commission_btn", function () {
        var parentEl = $(this).closest('.parent');
        var commission_id = $(parentEl).find('.restart_commission_id').val();
        var commission_customer_id = $(parentEl).find('.commission_customer_id').val();
        var t;
        clearTimeout(t);
        t = setTimeout(function () {
            $(".pre-icon").show();
            url = "/agent_office/commissions/" + commission_id + "/update_commission_number/";
            $.ajax({
                url: url,
                type: 'PUT',
                data: {id: commission_id, commission_customer_id: commission_customer_id}
            });
        }, 500);
    });

    $(document).on('click', ".move_to_previous_task_list_btn", function () {
        var parentEl = $(this).closest('.parent_display_tab_content');
        var current_task_list = $(parentEl).find('.current_task_list_index').text().trim();
        current_task_list = parseInt(current_task_list);
        var updated_current_page = current_task_list - 1;
        if ($(parentEl).find("#sales_brochure_page_" + updated_current_page).length > 0) {
            $(parentEl).find("#sales_brochure_page_" + (current_task_list + 3)).addClass("hide");
            $(parentEl).find("#sales_brochure_page_" + updated_current_page).removeClass("hide");
            $(parentEl).find(".current_task_list_index").text(updated_current_page);
        }
    });

    $(document).on('click', ".move_to_nxt_task_list_btn", function () {
        var parentEl = $(this).closest('.parent_display_tab_content');
        var current_task_list = $(parentEl).find('.current_task_list_index').text().trim();
        current_task_list = parseInt(current_task_list);
        var updated_current_page = current_task_list + 1;
        if ($(parentEl).find("#sales_brochure_page_" + updated_current_page).length > 0) {
            $(parentEl).find("#sales_brochure_page_" + current_task_list).addClass("hide");
            $(parentEl).find("#sales_brochure_page_" + (updated_current_page + 3)).removeClass("hide");
            $(parentEl).find(".current_task_list_index").text(updated_current_page);
        }
    });

    $(document).on("click", ".add_new_task_or_activity", function () {
        var other_task = $("#dummy_new_task_or_activity").clone();

        var last_task = $("#other_tasks_or_reminder_listings .nested-fields:last").attr('id');
        if (last_task) {
            var index = parseInt(getId(last_task)) + 1;
        } else {
            var index = 1;
        }

        other_task = other_task.html().replace(/replace_random_id/g, index).replace(/replace_param/g, "task_attributes");
        $("#other_tasks_or_reminder_listings").append(other_task);
        initiateDatePicker();
    });

    $(document).on("click", ".remove_task_or_activity", function () {
        $(this).closest('.parent_tasks_fields').remove();
    });

    $(document).on('click', '.show_task_date_and_time_fields_listing', function () {
        var parentEl = $(this).closest('.parent_tasks_fields');
        $('.reminder_settings_fields_listing').addClass('hide');
        $(parentEl).find('.task_date_and_time_fields_listing').toggleClass('hide');
    });
    $(document).on('click', '.show_reminder_settings_fields_listing', function () {
        var parentEl = $(this).closest('.parent_tasks_fields');
        $('.task_date_and_time_fields_listing').addClass('hide');
        $(parentEl).find('.reminder_settings_fields_listing').toggleClass('hide');
    });

    $(document).on("click", ".show_hide_extra_tool_buttons", function () {
        $('.set_show_title_buttons_visible').toggleClass('hide');
        $('.extra_tool_buttons').toggleClass('hide');
        $('.addPageheight').toggleClass('minH1250');
    });

    $(document).on("change", ".partner_spec_select", function () {
        var parentEle = $(this).closest('.parent');
        if ($(this).find(":selected").data('name') == "PARTNER_VIDEO") {
            $(parentEle).find('.resource_type_image').attr('disabled', true);
            $(parentEle).find('.resource_type_video').attr('disabled', false);
        } else {
            $(parentEle).find('.resource_type_image').attr('disabled', false);
            $(parentEle).find('.resource_type_video').attr('disabled', true);
        }
    });

    $(document).on("click", ".navigator_save_d_btn", function () {
        var name = $(this).attr('name');
        $('#main_navigator_features').html($('.navigator_results').clone());
        $("#navigator_save_btn").attr('name', name);
        $('#navigator_save_btn').click();
    });

    // add/remove other appartment features
    $(document).on("click", "#add_other_apartment_feature", function () {
        var other_apartment_feature = $("#dummy_other_apartment_feature").clone();
        var last_other_apartment_feature = $("#other_apartment_features .other_apartment_feature:last").attr('id');
        if (last_other_apartment_feature) {
            var index = parseInt(getId(last_other_apartment_feature)) + 1;
        } else {
            var index = 1;
        }
        other_apartment_feature = other_apartment_feature.html().replace(/replace_index/g, index).replace(/replace_param/g, "navigator_features");
        $("#other_apartment_features").append(other_apartment_feature);
    });

    $(document).on("click", "#add_other_house_feature", function () {
        var other_house_feature = $("#dummy_other_house_feature").clone();
        var last_other_house_feature = $("#other_house_features .other_house_feature:last").attr('id');
        if (last_other_house_feature) {
            var index = parseInt(getId(last_other_house_feature)) + 1;
        } else {
            var index = 1;
        }
        other_house_feature = other_house_feature.html().replace(/replace_index/g, index).replace(/replace_param/g, "navigator_features");
        $("#other_house_features").append(other_house_feature);
    });

    $(document).on("click", ".remove_navigator_feature", function () {
        $(this).closest(".parent").remove();
    });

    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        localStorage.setItem('activeTab', $(e.target).attr('href'));
    });
    var activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        $('a[href="' + activeTab + '"]').tab('show');
    }

    // show/hide other proprty subtypes for step 1-1
    if ($("#current_step").val() == '1_1') {
        property_subtypes_show();
    }

    if ($("#current_step").val() == '1_2') {
        property_subtypes_show();
    }

    // show/hide other proprty subtype info for step 4-5
    if ($("#current_step").val() == '4_5') {
        property_subtype_other_info_show($('.property_subtype'));
    }

    $(document).on("change", '.fixedTermRadioBtn', function () {
        if ($(this).val() == "true") {
            $('.fixedTermStartDate').attr('disabled', false);
            $('.indefiniteTermStartDate').attr('disabled', true);
        } else {
            $('.indefiniteTermStartDate').attr('disabled', false);
            $('.fixedTermStartDate').attr('disabled', true);
        }
    });

    if (window.location.search.indexOf('expired=true') > -1) {
        setTimeout(function () {
            $("#interruptCommissionModal").modal("show");
        }, 500);
    }

    $(document).on("change", '.property_type, .property_use', function () {
        property_subtypes_show();
    });

    $(document).on("change", '.property_subtype', function () {
        property_subtype_other_info_show($(this));
    });

    // selling commission show info notification
    if ($("#show_info_notification").val() == 'true') {
        setTimeout(function () {
            $('#flatSpecificationNotificationModal').modal('show');
        }, 500);
    }

    $("#saveFlatNotification").click(function () {
        $("#show_info_notification").val(false);
    });

    $(document).on("click", '.selling_commission_property_info', function () {
        if ($(this).val() == "OTHER_SOURCE") {
            $('#brand_other_source').removeClass('hide');
        } else {
            $('#brand_other_source').addClass('hide');
        }
    });

    $(document).on("click", '.commission_contract_payment', function () {
        if ($(this).val() == "OTHER") {
            $('#other_terms_of_payment').attr('disabled', false);
        } else {
            $('#other_terms_of_payment').attr('disabled', true);
        }
    });

    $(document).on("click", '.apartmnt_management_forms', function () {
        if ($(this).val() == "OTHER_MANAGEMENT_FORM") {
            $('#other_aprtment_management_form').attr('disabled', false);
        } else {
            $('#other_aprtment_management_form').attr('disabled', true);
        }
    });

    $(document).on("click", '.commission_contract_vacation_time', function () {
        if ($(this).val() == "NOT_IMMEDIATELY") {
            $('#vacation_note').attr('disabled', false);
        } else {
            $('#vacation_note').attr('disabled', true);
        }
    });

    $(document).on("click", ".partner_customer_contact_method", function () {
        $(".partner_contact_type_inputs input").attr("disabled", true);
        $(".partner_contact_" + $(this).val().toLowerCase() + " input").attr("disabled", false);
        if ($(this).val() == "SELF") {
            $('#step1').removeClass('hide');
            $('#step2, #step3').addClass('hide');
        }
        if ($(this).val() == "CLIENT") {
            $('#step2').removeClass('hide');
            $('#step1, #step3').addClass('hide');
        }
        if ($(this).val() == "PARTNER") {
            $('#step3').removeClass('hide');
            $('#step1, #step2').addClass('hide');
        }
    });

    // $(document).on('click', '#ChooseRoomPremisesModalClose', function () {
    //   $('#chooseRoomsPremisesModal').modal('hide');
    //   setTimeout(function () {
    //     $('#PartnerServiceRoomModal').modal('show');
    //   }, 500);
    // });

    $('#SendLeadAgentModal').on('shown.bs.modal', function () {
        var recipient_email = $('#lead_agent_recipient_email').val();
        if (recipient_email == '') {
            $('#SendLeadBtn').attr('disabled', true);
        } else {
            $('#SendLeadBtn').attr('disabled', false);
        }
    });

    $(document).on('keyup', '#lead_agent_recipient_email', function () {
        var email = $(this).val();
        if (email == '') {
            $('#SendLeadBtn').attr('disabled', true);
        } else {
            $('#SendLeadBtn').attr('disabled', false);
        }
    });

    if ($("#register_channel_document_order").length > 0){
        $("#supreintendent_websiteBtn").attr('style', '');
        $("#supreintendent_emailBtn").attr('style', '');
        if ($('#supreintendent_website').val() == "") {
          $("#supreintendent_websiteBtn").attr('style', 'pointer-events: none;');          
          $("#supreintendent_websiteBtn").html("<div class='flexCol1'>No registered web-site</div>")
        }
        if ($('#supreintendent_registered_emailId').val() == ""){
          $("#supreintendent_emailBtn").attr('style', 'pointer-events: none;');
          $("#supreintendent_emailBtn").html("<div class='flexCol1'>No registered e-mail</div>")
        }
    }

    $("#supreintendent_websiteBtn").on('click', function() {

      var website_value_to_redirect = $('#supreintendent_website').val();
      var protocol = 'https://';
      var protocol2 = 'http://';
      if (website_value_to_redirect.includes(protocol))
          website_value_to_redirect = website_value_to_redirect;
      else if (website_value_to_redirect.includes(protocol2))
          website_value_to_redirect = website_value_to_redirect;
      else
          website_value_to_redirect = protocol + website_value_to_redirect;
      window.open(website_value_to_redirect,'_blank');
    });

    // if ($('#supreintendent_website').val()){
    //   $('#supreintendent_websiteBtn').attr('href', $('#supreintendent_website').val());
    // }
    // else{
    //   $('#supreintendent_websiteBtn').attr('href', 'javascript:void(0);');
    // }
    // if ($('#supreintendent_email').val()){
    //   var email = $('#supreintendent_email').val();
    //   if (validateEmail(email)){
    //     $('#order_hm_recipient_email').val(email);
    //     $('#sendSupreintendentDocument').attr('disabled', false);
    //   }
    //   else{
    //     $('#order_hm_recipient_email').val('');
    //     $('#sendSupreintendentDocument').attr('disabled', true);
    //   }
    // }
    // else{
    //   $('#order_hm_recipient_email').val('');
    //   $('#sendSupreintendentDocument').attr('disabled', true);
    // }
  // });

  // set filename when file uploaded

  $(document).on("change", ".houseManagerDocument", function(){
    var parent = $(this).closest('.parent');
    var media_attachment_name_ele =  $(parent).find('.media_attachment_name');
    if ($(media_attachment_name_ele).val() == ""){
      $.each(this.files, function() {
        showFilename(this, media_attachment_name_ele);
      });
    }
  });

  // after adding customer-assoc and click on add_field link to add render customer fields and then remove the link
  $('#customers').on('cocoon:after-insert', function(e, insertedItem) {
    $(insertedItem).children(".add_fields").click();
    $(insertedItem).children(".add_fields").remove();
    var customer_fields_ele = $(".customer_fields")[$(".customer_fields").length - 1];
    var last_customer_assoc_ele = $(".customer-association-fields")[$(".customer-association-fields").length - 1];
    var actual_customer_pos = $(last_customer_assoc_ele).find(".actual_customer_info");
    $(actual_customer_pos).after($(customer_fields_ele));
    if ($("#default_customer").find(".nested-fields:visible").length == 0){
      $(insertedItem).find(".remove_fields").addClass('removeDefaultCustomer');
      $(last_customer_assoc_ele).appendTo($("#default_customer"));
      $("#default_customer").find(".seperator").remove();
      $("#default_customer").find('.primary_customer').val('true');
    }
  });

  $('#customers, #default_customer').on('cocoon:before-remove', function(e, removingItem) {
    var total_assigned_commissions = parseInt($(removingItem).find('.total_assigned_commissions').val());
    // var office_ids = $(removingItem).find('.office_ids').val();
    // condition to alreay exist customer assoc
    // if (total_assigned_commissions != 0){
    if (total_assigned_commissions == 1){
      // office_ids_arr = office_ids.split(',');
      // var current_office_id = $(removingItem).find('.current_office_id').val();
      // if (total_assigned_commissions == 1){  
        // var index = office_ids_arr.indexOf(current_office_id);
        // if (index > -1) {
        //   office_ids_arr.splice(index, 1);
        //   $(removingItem).find('.office_ids').val(office_ids_arr.join(','));
        // }
      // }
      $(removingItem).find('.office_ids').attr("disabled", false);
    }
    updateQualityCheckBtns($(removingItem).closest('.comments'));
  });

  $(document).on("click", ".removeDefaultCustomer", function(){
    $("#default_customer").closest(".nested-fields").hide();
    $('.add_new_customer').click();
  });

  // remove hr for default customer
  $("#default_customer").find(".seperator").remove();
  //if new defaut customer is added then click on add field to render customer fields, remove add link and remove 'remove' link
  if ($(".customer-association-fields").length > 1){
  }
  else {
    if ($(".customer-association-fields").find('add_fields')){
      $("#default_customer").find(".add_fields").click();
      $(".customer-association-fields").find(".add_fields").remove();  
    }
  }
  // $("#default_customer").find(".add_fields").click();
  // $(".customer-association-fields").find(".add_fields").remove();  
  // $("#contacts").find(".add_fields").remove();

  //$("#default_customer").find(".remove_fields").remove();
  if ($("#default_customer").hasClass('show_remove')){
    $("#default_customer").find(".remove_fields").addClass('removeDefaultCustomer');
  }
  else{
    $("#default_customer").find(".remove_fields").remove();
  }

  // upon create remove extra rendered fields from default customer
  if ($("#default_customer .customer_fields").length > 1){
    $("#default_customer").children(".customer_fields").remove();
  }

  //for default new customer, set the customer fields under nested customer assoc form
  if ($("#default_customer").children(".customer_fields").length == 1){
    var customer_fields_ele = $("#default_customer").children(".customer_fields");
    var customer_assoc_ele = $("#default_customer").children(".customer-association-fields");
    var actual_customer_pos = $(customer_assoc_ele).find(".actual_customer_info");
    $(actual_customer_pos).after($(customer_fields_ele));
  }
  if ($(".remove_fields").length == 1){
    $(".remove_fields").addClass("hide");
    }
  else if ($(".remove_fields").length >= 1){
    var remove_fields  = document.getElementsByClassName("remove_fields")
    remove_fields[0].className = remove_fields[0].className.replace(/\bremove_fields\b/g, "remove_fields hide")

    }
  else{
    if ($(".remove_fields").hasClass("hide")){
    ($(".remove_fields").removeClass("hide"));
    }
  }

  $("#different_property_address").change(function() {
      if(this.checked) {
        $(".property_address_info").removeClass("hide");
      }
      else {
        $(".property_address_info").addClass("hide");
      }
  });

  //initialize time picker
  $('.timepicker').timepicker();

  // commission interruption -if  seller will sell later then show contact date else hide

  $(".selling_commission_interruption").click(function(){
    if ($(this).val() == "WILL_SELL_LATER"){
      $("#interruption_new_contact_date").removeClass("hide");
    }
    else{
      $("#interruption_new_contact_date").addClass("hide");
    }
    if ($(this).val() == "OTHER_INTERRUPTION_REASON"){
      $('#interruption_other_reason').attr('disabled', false);
    }
    else{
      $('#interruption_other_reason').attr('disabled', true);
    }
  });

  $(".photography_type_icon").click(function(){
    var active_photography_rotator = this.id + "_rotator";
    $("#active_photography_rotator").text(active_photography_rotator);
    $(".photography_rotator").addClass("hide");
    $("#"+active_photography_rotator).removeClass('hide');
    var title_id = this.id + "_examples_title";
    $(".photohraphy_examples_title").addClass('hide');
    $("#" + title_id).removeClass('hide');
  });

  $('#previous_photography_image').click(function(e){
    e.preventDefault;
    var active_photography_rotator = $("#active_photography_rotator").text().trim();
    var rotator_images = $("#" + active_photography_rotator + " .images");
    rotator_images.children('.imageHolder').first().animate({marginLeft:"-=310px"}, function(){
      $(this).appendTo(rotator_images).removeAttr("style");
    });
  });

  $('#next_photography_image').click(function(e){
    e.preventDefault;
    var active_photography_rotator = $("#active_photography_rotator").text().trim();
    var rotator_images = $("#" + active_photography_rotator + " .images");
    rotator_images.children('.imageHolder').last().prependTo(rotator_images).removeAttr("style").css("margin-left", "-310px").animate({marginLeft:"0"});
  });

  $(".plan_type_icon").click(function(){
    var active_plan_rotator = this.id + "_rotator";
    $("#active_plan_rotator").text(active_plan_rotator);
    $(".plan_rotator").addClass("hide");
    $("#"+active_plan_rotator).removeClass('hide');
    var title_id = this.id + "_examples_title";
    $(".plan_examples_title").addClass('hide');
    $("#" + title_id).removeClass('hide');
  });

  $('#previous_plan_image').click(function(e){
    e.preventDefault;
    var active_plan_rotator = $("#active_plan_rotator").text().trim();
    var rotator_images = $("#" + active_plan_rotator + " .images");
    rotator_images.children('.imageHolder').first().animate({marginLeft:"-=310px"}, function(){
      $(this).appendTo(rotator_images).removeAttr("style");
    });
  });

  $('#next_plan_image').click(function(e){
    e.preventDefault;
    var active_plan_rotator = $("#active_plan_rotator").text().trim();
    var rotator_images = $("#" + active_plan_rotator + " .images");
    rotator_images.children('.imageHolder').last().prependTo(rotator_images).removeAttr("style").css("margin-left", "-310px").animate({marginLeft:"0"});
  });

  $("#service_subway_previous_btn").click(function(){
    var current_step = $("#service_subway_current_step").text().trim();
    var update_previous_step = parseInt(current_step) - 2;
    var updated_next_step = parseInt(current_step);
    var updated_current_step = parseInt(current_step) - 1;
    if (updated_current_step >= 1){
      updateServiceSubwaySteps(update_previous_step, updated_current_step, updated_next_step);
    }
  });

  $("#service_subway_next_btn").click(function(){
    var current_step = $("#service_subway_current_step").text().trim();
    var updated_next_step = parseInt(current_step) + 2;
    var update_previous_step = parseInt(current_step);
    var updated_current_step = parseInt(current_step) + 1;
    if (updated_current_step <= 6){
      updateServiceSubwaySteps(update_previous_step, updated_current_step, updated_next_step)
    }
  });

  //price navigator

  // construction start year decrementer
  $("#price_navigator_construction_start_year_decrement").click(function(){
    var year = parseInt($("#price_navigator_construction_start_year").val());
    if (year >= 5) {
      $("#price_navigator_construction_start_year").val(year - 5);
    }
  });

  // construction start year incrementer
  $("#price_navigator_construction_end_year_increment").click(function(){
    var year = parseInt($("#price_navigator_construction_end_year").val());
    if (year >= 5) {
      $("#price_navigator_construction_end_year").val(year + 5);
    }
  });

  // square area decrementer
  $("#price_navigator_square_area_start_decrement").click(function(){
    var year = parseInt($("#price_navigator_square_area_start").val());
    if (year >= 5) {
      $("#price_navigator_square_area_start").val(year - 5);
    }
  });

  // square area incrementer
  $("#price_navigator_square_area_end_increment").click(function(){
    var year = parseInt($("#price_navigator_square_area_end").val());
    if (year >= 5) {
      $("#price_navigator_square_area_end").val(year + 5);
    }
  });

  // plot area decrementer
  $("#price_navigator_plot_area_start_decrement").click(function(){
    var val = parseInt($("#price_navigator_plot_area_start").val());
    if (val >= 5) {
      $("#price_navigator_plot_area_start").val(val - 100);
    }
  });

  // plot area incrementer
  $("#price_navigator_plot_area_end_increment").click(function(){
    var val = parseInt($("#price_navigator_plot_area_end").val());
    if (val >= 5) {
      $("#price_navigator_plot_area_end").val(val + 100);
    }
  });

  // only enable submit if customer give permission to share contact info
  $("#customer_accepts_share_contact").change(function() {
    if(this.checked) {
      if ($("#partner_customer_contact_types input:checkbox:checked").length > 0)
      {
        $("#partner_benefits_submit").removeAttr("disabled");
      }
    }
    else {
      $("#partner_benefits_submit").attr("disabled", true);
    }
  });

  $(".partner_customer_contact_type").change(function() {
    if ($("#partner_customer_contact_types input:checkbox:checked").length > 0)
    {
      if ($("#customer_accepts_share_contact").is(":checked")) {
        $("#partner_benefits_submit").removeAttr("disabled");
      }
    }
    else
    {
      $("#partner_benefits_submit").attr("disabled", true);
    }
  });

  $("#incentive_tiers").change(function(){
    if ($(this).val() == "1"){
      $("#tier_1_set_fee_and_tiers").removeClass("hide");
      $("#other_tier_set_fee_and_tiers").addClass("hide");
      $(".tier_1_disabled").attr("disabled", false);
      $(".other_tier_disabled").attr("disabled", true);
    }
    else{
      $("#tier_1_set_fee_and_tiers").addClass("hide");
      $("#other_tier_set_fee_and_tiers").removeClass("hide");
      $(".tier_1_disabled").attr("disabled", true);
      $(".other_tier_disabled").attr("disabled", false);
    }
  });

  $(".incentive_reward_form").change(function(){
    if($(this).val() == "INCENTIVE_PERCENT_BASED"){
      $("#incentive_pct_based_fee_label").addClass("hide");
      $("#incentive_fixed_fee_label").removeClass("hide");
      $(".incentive_model_fee_sign_perc").removeClass("hide");
      $(".incentive_model_fee_sign_euro").addClass("hide");
    }
    else{
      $("#incentive_pct_based_fee_label").removeClass("hide");
      $("#incentive_fixed_fee_label").addClass("hide");
      $(".incentive_model_fee_sign_perc").addClass("hide");
      $(".incentive_model_fee_sign_euro").removeClass("hide");
    }
  });


  // hide already selected tailored services
  $(".assigned_tailored_service").each(function(){
    $("#tailored_service_selector option[value=" + this.value +"]").hide();
  });
  //remove tailored service
  $(document).on("click", ".tailored_service_remove", function(){
    var id = getId(this.id);
    $("#tailored_service_" + id).remove();
    $(this).closest('.parent').remove();
    $("#tailored_service_selector option[value=" + id +"]").show();
    updateTailoredTotalFixedFee();
  });

  // submit inner tailored package form when click outer submit btn
  $("#tailored_service_package_submit_btn").click(function(){
    $("#tailored_service_package_form").submit();
  });

  // processed steps confirm/unconfirm

  $(".contract_processed_step").change(function(){
    var id = getId(this.id);
    if ($(this).is(":checked")) {
      $("#contract_terms_li_" + id).addClass("processed");
      // $("#processed_step_confirm_" + id).addClass("hide");
      // $("#processed_step_unconfirm_" + id).removeClass("hide");
    }
    else{
      $("#contract_terms_li_" + id).removeClass("processed");
      // $("#processed_step_confirm_" + id).removeClass("hide");
      // $("#processed_step_unconfirm_" + id).addClass("hide");
    }
  });

  $(".flat_sell_model").change(function(){
    if(this.value == "false"){
      $("#debtfree_bottom_model_price").addClass("hide");
    }
    else{
      $("#debtfree_bottom_model_price").removeClass("hide");
    }
  });

  // show/hide leased content
  $(".property_leased").change(function(){
    if(this.value == "false"){
      $("#property_leased_content").addClass("hide");
    }
    else{
      $("#property_leased_content").removeClass("hide");
    }
  });

  // show/hide lease start and end date
  $(".lease_term_type").change(function(){
    if(this.value == "FIXED"){
      $("#lease_start_end_date").removeClass("hide");
    }
    else{
      $("#lease_start_end_date").addClass("hide");
    }
  });

  // show/hide lease expiry and notice periods
  $(".lease_terminated").change(function(){
    if(this.value == "false"){
      $("#lease_notice_period").removeClass("hide");
      $("#lease_expires_on").addClass("hide");
    }
    else{
      $("#lease_notice_period").addClass("hide");
      $("#lease_expires_on").removeClass("hide");
    }
  });

  // add/remove other costs
  $("#add_other_payable_cost").click(function(){
    var other_payable_cost = $("#dummy_other_payable_cost").clone();
    var last_other_payable_cost = $("#other_payable_costs .other_payable_cost:last").attr('id');
    if (last_other_payable_cost){
      var index = parseInt(getId(last_other_payable_cost)) + 1;
    }
    else{
      var index = 1;
    }
    other_payable_cost = other_payable_cost.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_payable_costs");
    $("#other_payable_costs").append(other_payable_cost);
  });

  $(document).on("click", ".remove_other_payable_cost", function(){
    $(this).closest(".other_payable_cost").remove();
  });

  $("#add_other_reimburse_cost").click(function(){
    var other_reimburse_cost = $("#dummy_other_reimburse_cost").clone();
    var last_other_reimburse_cost = $("#other_reimburse_costs .other_reimburse_cost:last").attr('id');
    if (last_other_reimburse_cost){
      var index = parseInt(getId(last_other_reimburse_cost)) + 1;
    }
    else{
      var index = 1;
    }
    other_reimburse_cost = other_reimburse_cost.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_reimburse_costs");
    $("#other_reimburse_costs").append(other_reimburse_cost);
  });

  $(document).on("click", ".remove_other_reimburse_cost", function(){
    $(this).closest(".other_reimburse_cost").remove();
  });

  // track selected customers while filtering and fetching customers

  $(document).on("click", "#selectCustomerSubmit", function(){
    if ($("#final_customers").val() != ''){
      $("#loader-image").show();
      $("#selectCustomerAgentformId").submit();
    }
    else
    {
      setFlashMessage("selectCustomerError", "selectCustomerErrorFlash", I18n.t("js.general.task.select_at_least_one_customer"));
    }
  });

  $(document).on("click", ".customer_check", function(){
    var id = getId(this.id);
    //if checked
    if ($("#customer_check_" + id).is(":checked")) {
      // update to unselect text
      addIdToArray("final_customers", id);
      set_unselect_text("#customer_select_text_" + id, "#customer_unselect_text_" + id);
    }
    else {
      // update to select text
      removeIdFromArray("final_customers", id);
      set_select_text("#customer_select_text_" + id, "#customer_unselect_text_" + id);
    }
  });

  $(document).on("click", ".allCustomerCheck", function(){
    var id = getId(this.id);
    //if checked
    if ($("#customer_check_" + id).is(":checked")) {
      addIdToArray("final_customers", id);
    }
    else {
      removeIdFromArray("final_customers", id);
    }
  });

  $("#sellingCommissionOfferPdfBtn").click(function(){
    submitUpdatedForm(this,"sellingCommissionOfferPdf")
  });

  $(document).on('click', '#guestBookPdfBtn', function(e){
    submitUpdatedForm(this,"guestBookPdf")
  });

  $(document).on('click', '#sellingCommissionContractPdfBtn', function(e){
    submitUpdatedForm(this,"sellingCommissionContractPdf")
  });
  
  $("#printbtnSellingNotesPdfPathId").click(function(){
    $("#notes_submit_name").val("printPdfbtn");
    submitUpdatedForm(this,"printSellingNotes")
  });

  $("#notesToolSavebtn").click(function(){
    $("#notes_submit_name").val("notesToolSave");
  });

  // make sure that user can select confirm_service_pack and confirm_service_pack_price of same group
  $(".confirm_service_pack").change(function(){
    var id = getId(this.id);
    $(".confirm_service_pack_price").prop('checked', false);
    $(".confirm_service_pack_price").attr('disabled', true);
    $("#confirm_service_pack_price_" + id).attr('disabled', false);
  });

  $(".confirm_service_pack_price").click(function(){
    var id = getId(this.id);
    var currentState = this.checked;
    $(".confirm_service_pack_price").prop('checked', false);
    $("#confirm_service_pack_price_" + id).prop('checked', currentState);
  });

  // show/hide representative info based on type
  $(document).on("change", ".representative_type", function(){
    var parent_ele = $(this).closest(".customer-association-fields");
    if (this.value == "NO_LEGAL_REPRESENTATIVE"){
      $(parent_ele).find(".representative_info").addClass("hide");
    }
    else{
      $(parent_ele).find(".representative_info").removeClass("hide");
    }
    if (this.value == "COMPANY_PERSON"){
      $(parent_ele).find(".private_info").addClass("hide");
    }
    else{
      $(parent_ele).find(".private_info").removeClass("hide");
    }
    if (this.value == "PRIVATE_PERSON"){
      $(parent_ele).find(".company_info").addClass("hide");
    }
    else{
      $(parent_ele).find(".company_info").removeClass("hide");
    }

  });



  // load price navigator results on page load
  if($("#price_navigator_construction_start_year").val() && $("#price_navigator_square_area_start").val() && $("#price_navigator_quarter_suburb").val()){
    $("#search_criteria_label").removeClass("hide");
    $("#search_form").addClass("hide");
    $(".show_search_criteria").toggleClass("hide");
    $("#price_navigator_get_results").click();
    $("#price_development_trend, #property_features_price_impact, #composition_of_price_estimate").addClass("hide");
    $("#navigator-loader-image").removeClass("hide");
  } else {
    $("#search_criteria_label").addClass("hide");
    $("#search_form").removeClass("hide");    
  }

  $(document).on('click', '#price_navigator_get_results', function(){
    $("#search_criteria_label").addClass("hide");
    $("#search_form").removeClass("hide");    
    $("#price_development_trend, #property_features_price_impact, #composition_of_price_estimate").addClass("hide");
    $("#navigator-loader-image").removeClass("hide");    
  });

  // price navigator show/hide search criteria
  $(document).on('click', '#search_criteria', function(){
    $("#search_form").toggleClass("hide");
    $(".show_search_criteria").toggleClass("hide");
    $("#search_criteria_label").toggleClass("hide");
  });

  $(document).on('change', '#agent_office_commission_selling_service_pack',  function() {
    $(".pre-icon").show();
    var commission_id = $("#commission_id").val();
    $.ajax({
      url: '/agent_office/commissions/'+ commission_id + "/service_pack_values/"+$(this).val(),
      type: 'GET',
      data: {'object_type': $("#service_pack_values_object_type").val()}
      // success: function(data) {
      //   result = data["service_pack"];
      //   if (result){
      //     if (result["fixed_fee"]){
      //       $("#agent_office_commission_selling_fixed_fee").val(result["fixed_fee"]);
      //     }
      //     if (result["pct_based_fee"]){
      //       $("#agent_office_commission_selling_pct_based_fee").val(result["pct_based_fee"]);
      //     }
      //     if (result["document_charges"]){
      //       $("#agent_office_commission_selling_document_charges").val(result["document_charges"]);
      //     }
      //   }
      // }
    });
  });

  //remove housing facility
  $(document).on("click", ".commission_fee_type", function(){
    if ($(this).val() == "CONFIRMED_OFFER"){
      $('.commission_fee_confirmed_offer_info').removeClass('hide');
      $('.commission_fee_seperate_attachment_info').addClass('hide');
    }
    else if ($(this).val() == "SEPERATE_ATTACHMENT"){
      $('.commission_fee_confirmed_offer_info').addClass('hide');
      $('.commission_fee_seperate_attachment_info').removeClass('hide');
    }
    else{
      $('.commission_fee_confirmed_offer_info').removeClass('hide');
      $('.commission_fee_seperate_attachment_info').addClass('hide');
    }
  });

  //apartment spec hide damage infor not damage not present
  $(document).on("change", '.apartment_spec_damage_present', function(){
    if (this.value == "true"){
      $(this).closest(".defect_damage").find(".defect_damage_additional_info").removeClass("hide");
    }
    else{
      $(this).closest(".defect_damage").find(".defect_damage_additional_info").addClass("hide");
    }
  });

  //highlight fields for which user is not sure
  $(".unsure_check").click(function(){
    var id = this.id;
    $("." + id).toggleClass("unsure_field");
  });

  // add new housing facility
  $(document).on("click", "#add_new_housing_facility", function(){
    var housing_facility = $("#dummy_housing_facility").clone();
    var last_other_facility = $("#other_housing_facilities .other_housing_facility:last").attr('id');
    if (last_other_facility){
      var index = parseInt(getId(last_other_facility)) + 1;
    }
    else{
      var index = 1;
    }
    housing_facility = housing_facility.html().replace(/replace_index/g, index).replace(/replace_sub_param/g, 'OTHER').replace(/replace_param/g, "housing_facilities");
    $("#other_housing_facilities").append(housing_facility);
  });

  //remove housing facility
  $(document).on("click", ".remove_other_housing_facility", function(){
    $(this).closest(".other_housing_facility").remove();
  });

  // add new repair-renovation
  $(document).on("click", "#add_repair_renovation", function(){
    var repair_renovation = $("#dummy_repair_renovation").clone();
    var last_repair_renovation = $("#repairs_renovations .repair_renovation:last").attr('id');
    if (last_repair_renovation){
      var index = parseInt(getId(last_repair_renovation)) + 1;
    }
    else{
      var index = 1;
    }
    repair_renovation = repair_renovation.html().replace(/replace_me_index/g, index).replace(/replace_repairs_renovations/g, "repairs_renovations");
    $("#repairs_renovations").append(repair_renovation).find(".virtualKeyboard").keyboard({
      layout: 'custom',
      restrictInput : true, 
      preventPaste : true,  
      autoAccept : true, 
      keyBinding: 'mousedown touchstart',   
      position: {
        of: null, 
        my: 'center top',
        at: 'center top',
        at2: 'center bottom', 
        collision: 'flipfit flipfit'
      } 
    });
  });

  //remove repair-renovation
  $(document).on("click", ".remove_repair_renovation", function(){
    $(this).closest(".repair_renovation").remove();
  });

  // track selected client customers while filtering and fetching customers
  $(document).on("change", ".client_customer_check", function(){
    var id = getId(this.id);
    if ($(this).is(":checked")){
      $(".client_customer_check").prop('checked', false);
      $(this).prop('checked', true);
      $("#final_client_customer").val(id);
      set_unselect_text("#client_customer_select_text_" + id, "#client_customer_unselect_text_" + id);
    }
    else{
      $("#final_client_customer").val('');
      set_select_text("#client_customer_select_text_" + id, "#client_customer_unselect_text_" + id);
    }
  });

  // track selected housing company while filtering and fetching customers
  $(document).on("click", ".housing_company", function(){
    var id = getId(this.id);
    $(".housing_company_unselect_text").addClass('hide');
    $(".housing_company_select_text").removeClass('hide');  
    var $box = $("#housing_company_check_" + id);
    set_select_text("#housing_company_select_text_" + id, "#housing_company_unselect_text_" + id);
    if ($box.is(":checked")) {
      $("#final_housing_company").val(id);
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      $(group).prop("checked", false);
      $box.prop("checked", true);
      set_unselect_text("#housing_company_select_text_" + id, "#housing_company_unselect_text_" + id);
    }else{
      $("#final_housing_company").val('');
    }
  });

  // track selected housing company while filtering and fetching customers
  $(document).on("change", ".superintendent", function(){
    var id = getId(this.id);
    $(".superintendent_unselect_text").addClass('hide');
    $(".superintendent_select_text").removeClass('hide');  
    var $box = $("#superintendent_check_" + id);
    set_select_text("#superintendent_select_text_" + id, "#superintendent_unselect_text_" + id);
    if ($box.is(":checked")) {
      $("#final_superintendent").val(id);
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      $(group).prop("checked", false);
      $box.prop("checked", true);
      set_unselect_text("#superintendent_select_text_" + id, "#superintendent_unselect_text_" + id);
    }
    else{
      $("#final_superintendent").val('');
    }
  });

  // submit the form for superintendent for housing company on submit button click
  $("#search_superintendent_submit").click(function(e){
    e.preventDefault();
    $("#housing_company_superintendent_id").val($("#final_superintendent").val());
    removeHousingCompanyBootstrapValidations();
    $("#superintendent_form").remove();
    $("#saveMedia").trigger('click');
    $("#saveMedia").trigger('click');
  });

  // stowage amount setter
  $(document).on("change keyup", ".stowage_check, .stowage_amount", function(){
    var stowage_amount_setter = $(this).closest(".stowage_amount_setter");
    var stowage_amount = $(stowage_amount_setter).find(".stowage_amount");
    var stowage_check = $(stowage_amount_setter).find(".stowage_check");
    if ($(stowage_check).is(":checked") && parseInt($(stowage_amount).val()) >= 0){
      $(stowage_amount_setter).find(".stowage_create").attr('disabled', false);
    }
    else{
      $(stowage_amount_setter).find(".stowage_create").attr('disabled', true);
    }
  });

  $(document).on("click", ".stowage_create", function(){
    var stowage_amount_setter = $(this).closest(".stowage_amount_setter");
    var stowage_amount = $(stowage_amount_setter).find(".stowage_amount");
    var stowage_elements = $(stowage_amount_setter).find(".stowage_elements");
    var dummy_element = $("#dummy_stowage_surface_material_info").clone();
    var last_element = $(stowage_elements).find(".stowage_element:last").attr('id');
    if (last_element){
      var index = parseInt(getId(last_element)) + 1;
    }
    else{
      var index = 1;
    }
    var amount = parseInt($(stowage_amount).val());
    var total_existing_elements = $(stowage_elements).find(".stowage_element").length;
    var diff_amount = amount - total_existing_elements;
    if (diff_amount > 0){
      var stowage_type = $(stowage_amount_setter).find(".stowage_type").text().trim();
      var sample_label_name = $(stowage_amount_setter).find(".sample_label_name").text().trim();
      dummy_element = dummy_element.html();
      for(var i=0; i<diff_amount; i++){
        new_element = dummy_element;
        new_element = new_element.replace(/replace_index/g, index).replace(/replace_stowage_type/g, stowage_type).replace(/replace_label_name/g, sample_label_name + " " + (i+total_existing_elements+1)).replace(/replace_param/g, "data[details]");
        $(stowage_elements).append(new_element);
        index += 1;
      }
    }
    else if(diff_amount < 0){
     $(stowage_elements).find(".stowage_element").slice(diff_amount).remove();
    }
  });

  // add stowage
  $(document).on("click", ".add_other_stowage_element", function(){
    var id = getId(this.id);
    var other_stowage_elements = $("#other_stowage_elements_" + id);
    var dummy_stowage_element = $("#dummy_other_stowage_material_info").clone();
    var last_other_stowage_element = $(other_stowage_elements).find(".other_stowage_element:last").attr('id');
    if (last_other_stowage_element){
      var index = parseInt(getId(last_other_stowage_element)) + 1;
    }
    else{
      var index = 1;
    }
    dummy_stowage_element = dummy_stowage_element.html().replace(/replace_index/g, index).replace(/replace_param/g, 'data[details]');
    $(other_stowage_elements).append(dummy_stowage_element);
  });

  //remove housing facility
  $(document).on("click", ".remove_other_stowage_element", function(){
    $(this).closest(".other_stowage_element").remove();
  });

  // add other accessory
  $(document).on("click", ".add_other_accessory", function(){
    var other_accessories_parent = $(this).closest(".other_accessories_parent");
    var other_accessories = $(other_accessories_parent).find(".other_accessories");
    var dummy_other_accessory = $("#dummy_other_accessory").clone();
    var last_other_accessory = $(other_accessories).find(".other_accessory:last").attr('id');
    if (last_other_accessory){
      var index = parseInt(getId(last_other_accessory)) + 1;
    }
    else{
      var index = 1;
    }
    dummy_other_accessory = dummy_other_accessory.html().replace(/replace_index/g, index).replace(/replace_param/g, 'data[details]');
    $(other_accessories).append(dummy_other_accessory);
  });

  $(document).on("click", ".add_other_integrated_accessory", function(){
    var other_accessories_parent = $(this).closest(".other_accessories_parent");
    var other_accessories = $(other_accessories_parent).find(".other_accessories");
    var dummy_other_accessory = $("#dummy_other_integrated_accessory").clone();
    var last_other_accessory = $(other_accessories).find(".other_accessory:last").attr('id');
    if (last_other_accessory){
      var index = parseInt(getId(last_other_accessory)) + 1;
    }
    else{
      var index = 1;
    }
    var specific_type =  $(other_accessories_parent).find("#specific_type").text().trim();
      dummy_other_accessory = dummy_other_accessory.html().replace(/replace_index/g, index).replace(/replace_param/g, 'data[details]').replace(/replace_specific_type/g, specific_type);
      $(other_accessories).append(dummy_other_accessory);
  });

  //remove other accessory
  $(document).on("click", ".remove_other_accessory", function(){
    $(this).closest(".other_accessory").remove();
  });

  //housing company plot options show/hide
  $(".housing_company_plot_own_type").change(function(){
    if ($(this).val() == "RENT"){
      $("#plot_redeem_options").removeClass("hide");
      if (!$("#housing_company_plot_has_redeemed").is(":checked")){
        $("#plot_redeem_info").removeClass("hide");
      }
      else{
        $("#plot_redeem_info").addClass("hide");
      }
    }
    else{
      $("#plot_redeem_options").addClass("hide");
      $("#plot_redeem_info").addClass("hide");
    }
  });

  $(".housing_company_plot_redeem_option").change(function(){
    if (!$("#housing_company_plot_has_redeemed").is(":checked")){
      $("#plot_redeem_info").removeClass("hide");
      }
    else{
      $("#plot_redeem_info").addClass("hide");
    }
  });

  // add new other housing cost
  $(document).on("click", "#add_other_housing_cost", function(){
    var other_housing_cost = $("#dummy_other_housing_cost").clone();
    var last_other_housing_cost = $("#other_housing_costs .other_housing_cost:last").attr('id');
    if (last_other_housing_cost){
      var index = parseInt(getId(last_other_housing_cost)) + 1;
    }
    else{
      var index = 1;
    }
    other_housing_cost = other_housing_cost.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_housing_costs");
    $("#other_housing_costs").append(other_housing_cost).find('.virtualKeyboard').keyboard({
      layout: 'custom',
      restrictInput : true, 
      preventPaste : true,  
      autoAccept : true, 
      keyBinding: 'mousedown touchstart',   
      position: {
        of: null, 
        my: 'center top',
        at: 'center top',
        at2: 'center bottom', 
        collision: 'flipfit flipfit'
      } 
    });
  });

  //remove other housing cost
  $(document).on("click", ".remove_other_housing_cost", function(){
    $(this).closest(".other_housing_cost").remove();
  });

  //building material/heating system other type, show text_field
  $("#housing_company_building_material").change(function(){
    if ($(this).val() == "MATERIAL_OTHER"){
      $("#other_building_material").removeClass("hide");
    }
    else{
      $("#other_building_material").addClass("hide");
    }
  });

  $("#housing_company_heating_system").change(function(){
    if ($(this).val() == "HEATING_OTHER"){
      $("#other_heating_system").removeClass("hide");
    }
    else{
      $("#other_heating_system").addClass("hide");
    }
  });

  // change contract commission model structure
  $("#contract_use_commission_offer").change(function(){
    if ($(this).is(":checked")){
      $("#contract_fixed_fee").val($("#commission_fixed_fee").val());
      $("#contract_pct_based_fee").val($("#commission_pct_based_fee").val());
      $("#contract_document_charges").val($("#commission_document_charges").val());
    }
  });

  // submit main form on housing company save detaild info submit
  $("#housingCompanySaveDetaildInfo").click(function(){
    $("#housingCompanyDetailedInfo").modal('hide');
    $("#saveMedia").click();
  });

  // superintendent switch single/multiple files upload
  // if ($('input[class=partner_document_type]:checked').val() == "MULTIPLE"){
  //   $("#superintendent_upload_files_one_by_one input").attr('disabled', true);
  //   $("#superintendent_upload_all_files input").attr('disabled', false);
  // }
  // else{
  //   $("#superintendent_upload_all_files input").attr('disabled', true);
  //   $("#superintendent_upload_files_one_by_one input").attr('disabled', false);
  // }

  $(document).on('click', '.partner_document_type', function () {
    if ($(this).val() == "SINGLE"){
      $('#superintendent_upload_files_one_by_one').removeClass('hide');
      $('#superintendent_upload_all_files').addClass('hide');
      $("#superintendent_upload_all_files input").attr('disabled', true);
      $("#superintendent_upload_files_one_by_one input").attr('disabled', false);
    }
    else{
      $('#superintendent_upload_all_files').removeClass('hide');
      $('#superintendent_upload_files_one_by_one').addClass('hide');
      $("#superintendent_upload_files_one_by_one input").attr('disabled', true);
      $("#superintendent_upload_all_files input").attr('disabled', false);
    }
  });

  // show superintendent office information
  $(document).on('click', '#show_superintendent_office_information', function () {
    $("#superintendent_form").toggleClass("hide");
    if ($(this).hasClass("iconUp")){
      $(this).removeClass("iconUp");
      $(this).addClass("iconBottom");
    }
    else{
      $(this).removeClass("iconBottom");
      $(this).addClass("iconUp");
    }
    $(".show_superintendent_office_information_arrow").toggleClass("hide");
  });

  // update superintendent document validation date
  $(document).on('change', '.superintendent_document_valid_date', function () {
    var date = $(this).datepicker('getDate');
    parentEle = $(this).closest('.parent');
    var valid_months = $(parentEle).find("#superintendent_document_valid_months").val();
    date.setMonth(date.getMonth() + parseInt(valid_months));
    var day = date.getDate();
    day = (day<10) ? "0"+day : day;
    var month = (date.getMonth() + 1);
    month = (month<10) ? "0"+month : month;
    $(parentEle).find(".superintendent_document_validation_expire_date").val(day + '.' + month + '.' +  date.getFullYear());
  });

  $(document).on("keyup click change", "#RepairCharges, #FinancialCharges, #ServiceCharges", function(){
    var total_charges = 0;
    repair_charges = $("#RepairCharges").val();
    financial_charges = $("#FinancialCharges").val();
    service_charges =  $("#ServiceCharges").val();
    if (service_charges){
      total_charges += checkNumericValue(service_charges);
    }
    if (repair_charges){
      total_charges += checkNumericValue(repair_charges);
    }
    if (financial_charges){
      total_charges += checkNumericValue(financial_charges);
    }
    
    if (total_charges){
      val = $("#TotalCharges").val(total_charges);
      $("#TotalCharges").val(addThousandSeparators($("#TotalCharges").val().replace(".",","))); 
    }
    else{
      $("#TotalCharges").val(""); 
    }
  });

  //confrim offer submit
  $("#agent_offer_confirm").click(function(){
    if ($("#saveMediaNext").length > 0){
      $("#saveMediaNext").click();
    }
    else{
      $("#saveMedia").click();
    }
  });

  //chnag color when processed - commision - contract
  $(".spec_processed_step").change(function(){
    var id = getId(this.id);
    if ($(this).is(":checked")){
      $("#specificationsPartLi" + id).addClass("processed");
    }
    else{
      $("#specificationsPartLi" + id).removeClass("processed");
    }
  });

  $('#Add_new_note').click(function (e) {
    var nextTab = $('#tabs li').size()+1;
    var NewNavTab = $('#dummy_nav_tab').clone();
    var NewTabpane = $('#dummy_tab_pane').clone();
    
    //replacing nav-tab href and appending to tabs
    NewNavTab = NewNavTab.html().replace(/replace_index/g, nextTab).replace("#new_note", "#tab_"+nextTab).replace(/disabled/g, '');
    $(NewNavTab).appendTo('#tabs').find('.datepickeron').datepicker({
      format: 'dd.mm.yyyy',
      weekStart: 1,
      autoclose: true,
      todayHighlight: true,
      clearBtn: true,
      disableTouchKeyboard: true,
      Readonly: true
    }).attr("readonly", "readonly");

    //replacing tab contents
    NewTabpane = NewTabpane.html().replace(/replace_index/g, nextTab).replace(/replace_sub_param/g, "notes_attributes").replace(/replace_param/g, "agent_office_commission_base");

    $('<div class="tab-pane acitve" id="tab_'+nextTab+'">' +NewTabpane+'</div>').appendTo('#adding_tab_content').find('.ckeditorCustom').ckeditor({});
    $('#adding_tab_content').find('.cke_1').remove();
    $('#tabs a:last').tab('show');
  });

  $("#NotesToolModal").on('shown.bs.modal', function() {
    $('.ckeditorCustom').ckeditor({
    });
  });

  $(".nav-tabs").on("click", ".closeTab", function () {
    var TabId = $(this).parent('a').attr('href'); 
    var id = getId(TabId);
    if (TabId == ('#new_note_'+id)){
      confirm_remove  = confirm(I18n.t("js.general.task.delete_content"));
      if (confirm_remove){
        $('#agent_office_commission_base_notes_attributes_'+id+'__destroy').val(1);
        $(TabId).addClass('hide');
        $(this).parent().addClass('hide');
      }
    }
    else{
      $(this).parent().remove();
      $(TabId).remove();
    }
    $('#tabs a:first').tab('show');
  });

  $(".nav-tabs").on("click", ".edit_note_date", function () {
    var ele = $(this).parent().find(".w120");
    $(ele).toggleClass(".datepickeron");
    if ($(ele).hasClass('.datepickeron')){
      $(ele).css("border-color", "#bc1922");
      $(ele).datepicker({
        format: 'dd.mm.yyyy',
        weekStart: 1,
        autoclose: true,
        todayHighlight: true,
        clearBtn: true,
        disableTouchKeyboard: true,
        Readonly: true
      }).attr("readonly", "readonly");
    }
    else{
      $(ele).css("border-color", "");
      $(ele).datepicker("destroy");
    }
  });

  $(document).on("click", ".add_other_note_attachment", function(){
    var parentEl = $(this).closest('.commission_note_fields');
    var other_attachment = $(parentEl).find('.dummy_other_note_attachment').clone();
    var last_other_attachment = $(parentEl).find(".other_note_attachments .other_note_attachment_lists:last").attr('id');
    if (last_other_attachment){
      var index = parseInt(getId(last_other_attachment)) + 1;
    }
    else{
      var index = 1;
    }
    var param_key = $(parentEl).find('.note_attachment_resource_param').val();
    other_attachment = other_attachment.html().replace(/replace_resource_index/g, index).replace(/replace_resource_param/g, param_key);
    $(parentEl).find(".other_note_attachments").append(other_attachment);
  });

  $(document).on("click", ".remove_other_note_attachment", function(){
    var parentEl = $(this).closest('.other_note_attachment_lists');
    $(parentEl).find(".check_note_attachment_remove").val(1);
    $(parentEl).addClass('hide');
  });

  var property_sub_types = [];
  $(document).on("change", ".apartment_property_subtype", function(){
    if ($(this).is(":checked")) {
      property_sub_types.push($(this).val());
      var inArray = isInArray("OTHER", property_sub_types);
      if (inArray){
        $('.apartment_property_subtype_info').attr("disabled", false);
      }
    }
    else{
      var index = property_sub_types.indexOf($(this).val());
      property_sub_types.splice(index, 1);
      $('.apartment_property_subtype_info').attr("disabled", true);
    }
  });

  $(document).on('click', '.check_confirm_leads_listings', function(){
    var check_boxes = $('.check_confirm_leads_listings');
    for(var i=0; i<check_boxes.length; i++){
      checked_check_box = check_boxes[i];
      if ($(checked_check_box).is(':checked')){
        $(checked_check_box).parent().find('.confirm_label_class').addClass('hide');
        $(checked_check_box).parent().find('.unconfirm_label_class').removeClass('hide');
      }
      else{
        $(checked_check_box).parent().find('.unconfirm_label_class').addClass('hide');
        $(checked_check_box).parent().find('.confirm_label_class').removeClass('hide');
      }
    }
  });
});

function updateServiceSubwaySteps(previous_step, current_step, next_step){
  if (next_step <= 6){
    $(".service_subway_next_step").addClass("hide");
    $("#service_subway_next_step_" + next_step).removeClass("hide");
  }
  if (previous_step >= 1){
    $(".service_subway_previous_step").addClass("hide");
    $("#service_subway_previous_step_" + previous_step).removeClass("hide");
  }
  $(".service_subway_current_step").addClass("hide");
  $("#service_subway_current_step_" + current_step).removeClass("hide");
  $("#service_subway_current_step").text(current_step);
  $(".service_subway_step_content").addClass("hide");
  $("#service_subway_step_content_" + current_step).removeClass("hide");
  $('.slideNext').removeClass('hide');
  var total_last_step = $("#total_service_subway_last_step").val();
  if (next_step >= total_last_step){
    $('.slideNext').addClass('hide');
  }
}

function updateTailoredTotalFixedFee(){
  var total = 0.0;
  $("#tailored_services").find(".tailored_service_price").each(function(){
    var price = this.value.replace(",", ".");
    if (price != "") {
      price = parseFloat(price);
      total += price;
    }
  });
  total = total.toFixed(2).replace(".", ",");
  $("#tailored_fixed_fee_total").val(total);
}

function submitUpdatedForm(element, link_id){
  setTimeout(function(){
    $(element).closest('form').submit()
    }, 200);
    setTimeout(function(){
      $("#"+link_id)[0].click();
    }, 500);
}

function checkUncheckCustomers() {
  var final_customers = $("#final_customers").val().split(",");
  $('.customer_check').prop('checked', false);
  $('.customer_select_text').removeClass('hide');
  $('.customer_unselect_text').addClass('hide');
  final_customers.forEach(function(final_customer){
    if ($("#customer_" + final_customer).length > 0){
      $("#customer_check_" + final_customer).prop('checked', true);
      $('#customer_select_text_'+final_customer).addClass('hide');
      $('#customer_unselect_text_'+final_customer).removeClass('hide');
    }
  });
}

function checkUncheckHousingCompanies() {
  var idArr = $("#final_housing_company").val().split(",");
  $('.housing_company_check').prop('checked', false);
  for(var i=0; i<idArr.length; i++){
    var id = idArr[i];
    // check if the current showed service provider has this serivce provider included
    if ($("#housing_company_check_" + id).length > 0) {
      $("#housing_company_check_" + id).prop('checked', true);
      set_unselect_text("#housing_company_select_text_" + id, "#housing_company_unselect_text_" + id);
    }
  }
}

function checkUncheckSuperintendents() {
  var final_superintendent= $("#final_superintendent").val();
  if ($("#superintendent_" + final_superintendent).length > 0){
    $("#superintendent_check_" + final_superintendent).prop('checked', true)
  }
}

function checkUncheckPartners() {
  var final_recipients = $("#final_recipients").val().split(",");
  $('.recipient_check').prop('checked', false);
  final_recipients.forEach(function(final_recipient){
    if ($("#responsible_person_check_" + final_recipient).length > 0){
      if (!$("#responsible_person_check_" + final_recipient).is(":checked")){
        $("#responsible_person_check_" + final_recipient).prop('checked', true)
      }
    }
  });
}

function removeHousingCompanyBootstrapValidations(){
  var bootstrapValidator = $('#selling-commission-housing-form').data('bootstrapValidator');
  if (bootstrapValidator){
    if ($("#agent_office_commission_base_housing_company_attributes_name").length > 0){
      bootstrapValidator.enableFieldValidators('agent_office_commission_base_housing_company_attributes_name', false);
    }
    if ($("#register_superintendent_office_name").length > 0){
      bootstrapValidator.enableFieldValidators('register_superintendent_office_name', false);
    }
  }
  $("#saveMedia").attr("disabled", false);
}

// function checkNumericValue(val) {
//   val = parseFloat(val.replace(",", "."));
//   return val;
// }

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function property_subtypes_show(){
  var property_type = $(".property_type:checked").val();
  $(".property_use_details").addClass('hide');
  $(".property_subtypes").addClass('hide');
  $(".property_subtypes input").attr('disabled', true);
  $('.other_property_subtype_info').addClass('hide');
  $('.property_details_common_class').addClass('hide');
  $('.property_details_common_class input').attr('disabled', true);
  if (property_type == "APARTMENT"){
    if ($("#current_step").val() == '1_2'){
      $(".property_subtype").parent().removeClass('hide');
      $('.property_use_details').removeClass('hide');
      $('.property_detailed_info_apartment').removeClass('hide');
      $('.property_detailed_info_apartment input').attr('disabled', false);
    }
    $(".property_subtypes_apartment_none").removeClass('hide');
    $(".property_subtypes_apartment_none input").attr('disabled', false);
    $('.buying_apartment_subtypes_check').removeClass('hide');
    $('.buying_apartment_subtypes_check input').attr('disabled', false);
    var value = $('.property_use_details').find('.estimate_property_subtype:checked').val();
    if (value == "VACATIONAL"){
      $('#property_subtype_SENIOR_HOUSE').parent().addClass('hide');
      $('#property_subtype_HITAS').parent().addClass('hide');
    }
    property_subtype_other_info_show($('.property_subtypes_apartment_none'));
  }
  else if (property_type == "REAL_ESTATE"){
    $('.property_use_details').removeClass('hide');
    $('.buying_apartment_subtypes_check').addClass('hide');
    var property_use = $(".property_use:checked").val();
    if (property_use == "RESIDENTIAL"){
      $(".property_subtypes_real_estate_residential").removeClass('hide');
      $(".property_subtypes_real_estate_residential input").attr('disabled', false);
      $('.property_detailed_info_real_estate_residential_vacational').removeClass('hide');
      $('.property_detailed_info_real_estate_residential_vacational input').attr('disabled', false);
      property_subtype_other_info_show($('.property_subtypes_real_estate_residential'));
    }
    else if(property_use == "VACATIONAL"){
      $(".property_subtypes_real_estate_vacational").removeClass('hide');
      $(".property_subtypes_real_estate_vacational input").attr('disabled', false);
      $('.property_detailed_info_real_estate_residential_vacational').removeClass('hide');
      $('.property_detailed_info_real_estate_residential_vacational input').attr('disabled', false);
      property_subtype_other_info_show($('.property_subtypes_real_estate_vacational'));
    }
    else if(property_use == "COMMERCIAL"){
      $(".property_subtypes_real_estate_commercial").removeClass('hide');
      $(".property_subtypes_real_estate_commercial input").attr('disabled', false);
      $('.buying_apartment_subtypes_check input').attr('disabled', true);
      $('.property_detailed_info_real_estate_commercial').removeClass('hide');
      $('.property_detailed_info_real_estate_commercial input').attr('disabled', false);
      property_subtype_other_info_show($('.property_subtypes_real_estate_commercial'));
    }
    else if(property_use == "OTHER_PROPERTY_USE"){
      $(".property_subtypes_real_estate_other_property_use").removeClass('hide');
      $(".property_subtypes_real_estate_other_property_use input").attr('disabled', false);
      $('.property_detailed_info_real_estate_other').removeClass('hide');
      $('.property_detailed_info_real_estate_other input').attr('disabled', false);
      property_subtype_other_info_show($('.property_subtypes_real_estate_other_property_use'));
    }
  }
  else if (property_type == "NEW_PROPERTY"){
    $(".property_subtypes_new_property_none").removeClass('hide');
    $(".property_subtypes_new_property_none input").attr('disabled', false);
    $('.buying_apartment_subtypes_check').removeClass('hide');
    $('.buying_apartment_subtypes_check input').attr('disabled', false);
    if ($("#current_step").val() == '1_2'){
      $('.property_use_details').removeClass('hide');
    }
    property_subtype_other_info_show($('.property_subtypes_new_property_none'));
  }
}

function property_subtype_other_info_show(ele){
  var other_property_subtype_selected = false;
  var default_val = $(ele).closest('.property_subtypes').find('.property_subtype:checked').val();
  if (default_val == undefined){
    $(ele).closest('.property_subtypes').find('.property_subtype').eq(0).attr('checked', 'checked');
  }
  $.each($(ele).closest('.property_subtypes').find('.property_subtype:checked'), function(index, property_subtype){
    if ($(property_subtype).length > 0 && $(property_subtype).val() == "OTHER_PROPERTY_SUBTYPE"){
      other_property_subtype_selected = true;
    }
  });
  if (other_property_subtype_selected){
    $('.other_property_subtype_info').removeClass('hide');
  }
  else{
    $('.other_property_subtype_info').addClass('hide');
  }
}