$(document).ready(function(){
  var t;

  $(document).on('click', '.checkbox_count', function(){
    checked = $("input[type=checkbox]:checked").length;
    if(!checked) {
      // setFlashMessage("choose_customer_count", "choose_customer_count", I18n.t('js.general.task.select_at_least_one_customer'));
      alert("You must check at least one checkbox.");
      return false;
    }
  });

  $(document).on('keyup, click', '.executive_filter_by_customer_name, .executive_commission_customer_filter_save_btn, #start_date, #end_date', function(){
    var parentEl = $(this).closest('.filter_parent_form');
    clearTimeout(t);
    t = setTimeout(function () {
      // $(".pre-icon").show();
      url = "/agent_office/commissions/search/executive_commission_customer_filter";
      $.ajax({
        url: url,
        type: 'POST',
        data: {commission_customer_filter: true, name_search: $(".executive_filter_by_customer_name").val(), register_search: $('#choose_register option:selected').val(), start_date_search: $('#start_date').val(), end_date_search: $('#end_date').val(), filter: true}
      });
    }, 500);
  });

  $(document).on('click', '.commission_customer_filter_save_btn', function(){
    var parentEl = $(this).closest('.filter_parent_form');
    clearTimeout(t);
    t = setTimeout(function () {
      $(".pre-icon").show();
      url = "/agent_office/commissions/search/commission_customer_filter";
      $.ajax({
        url: url,
        type: 'POST',
        data: {commission_customer_filter: true, name_search: $(parentEl).find(".filter_by_customer_name").val(), address_search: $(parentEl).find('.filter_by_property_address').val(), filter: true}
      });
    }, 500);
  });

  $(document).on('keyup, change', '.filter_commission_customer_name, .filter_commission_property_address, .filter_commission_listing_type', function(){
    clearTimeout(t);
    t = setTimeout(function () {
      $(".pre-icon").show();
      url = "/agent_office/commissions/search/commission_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {listing_type: $('.filter_commission_listing_type:checked').val(), name_search: $(".filter_commission_customer_name").val(), address_search: $('.filter_commission_property_address').val(), filter: true}
      });
    }, 500);
  });

  $(document).on('keyup', '#search, #agent_search, .search',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $('#filterFormId').submit();
      $('#filterFormId_agent').submit();
      $("#loader-image").show();
    }, 500);
  });

  $(document).on('keyup', '#search_photograph',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $('#filterFormId_photograph').submit();
      $("#loader-image_photograph").show();
    }, 500);
  });

  $(document).on('keyup', '#search_floor',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $('#filterFormId_floor').submit();
      $("#loader-image_floor").show();
    }, 500);
  });

  $(document).on('keyup', '#customerSearch',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      var commission_id = $("#commission_id").val();
      url = "/search/filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search: $("#customerSearch").val(), search_type: 'commission_customers', filter_id: 'filter_customers', show_scroll_bar: true, filter: true}
      });
    }, 500);
  });

  $(document).on('keyup', '#agentSearch',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      var commission_id = $("#commission_id").val();
      url = "/search/filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search: $("#agentSearch").val(), search_type: 'commission_agents', filter_id: 'filter_agents', show_scroll_bar: true, filter: true}
      });
    }, 500);
  });

  //housing company search
  $(document).on('keyup', '#housingCompanySearch',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commissions/'+ commission_id + "/search/housing_company_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search: $("#housingCompanySearch").val(), housing_company_id: $("#housing_company_id").val(), filter: true}
      });
    }, 500);
  });

  //superintendent search
  $(document).on('keyup', '#superintendentSearch',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $("#superintendent-loader-image").show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commissions/'+ commission_id + "/search/superintendent_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search: $("#superintendentSearch").val(), superintendent_id: $("#superintendent_id").val(), filter: true}
      });
    }, 500);
  });

  $(document).on('keyup', '#inspector_search, .search',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $('#filterFormIdInspector').submit();
      $("#add-inspector-loader").show();
    }, 500);
  });

  $(document).on('keyup', '#messageSearch',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      $.ajax({
        url: '/messages/search/user_filter',
        type: 'POST',
        data: {search : $("#messageSearch").val(), id : $("#id").val()}
      });
    }, 500);
  });

  $(document).on('keyup', '#customer_messageSearch',  function() {
    clearTimeout(t);    
    t = setTimeout(function () {
      $("#loader-image").show();
      $.ajax({
        url: '/messages/search/customer_filter',
        type: 'POST',
        data: {search : $("#customer_messageSearch").val(), id : $("#id").val()}
      });
    }, 500);
  });

  $(document).on("click", ".object_check", function(){
    checked = $("input[type=checkbox]:checked").length;
    alert(checked)
    if (checked>3) {
      // setFlashMessage("choose_customer_count", "choose_customer_count", I18n.t('js.general.task.please_check_less_than_three_customer'));
      alert("Please check Less than equal to three checkbox.");
      return false;
    }
    var parentEl = $(this).closest('.parent');
    var object_id = $(this).data("object_id");
    var filter_objects_ele = $(this).closest('.filter_objects');
    var final_selected_objects_ele = $(filter_objects_ele).find('.final_selected_objects');
    var is_checked = $(this).is(":checked");
    // if only one check box is allowed to be selected
    if ($(this).hasClass('single_check')){
      $(final_selected_objects_ele).val('');
      $(filter_objects_ele).find('.object_check').prop('checked', false);
      $(filter_objects_ele).find('.select_text').removeClass('hide');
      $(filter_objects_ele).find('.unselect_text').addClass('hide');
    }
    //if checked
    if (is_checked) {
      // update to unselect text
      $(this).prop('checked', true);
      addToFinalSelectedObjects(final_selected_objects_ele, object_id, parentEl);
    }
    else {
      // update to select text
      $(this).prop('checked', false);
      removeFromFinalSelectedObjects(final_selected_objects_ele, object_id, parentEl);
    }
  });

  //search agents
  $(document).on('change', '.agent_office_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitAgentFilterForm(parentEl);
  });

  $(document).on('keyup', '.agent_name_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitAgentFilterForm(parentEl);
  });

  $(document).on('keyup', '.agents_name_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitAgentOfficeFilterForm(parentEl);
  });

  $(document).on('keyup', '.agent_office_name_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitAgentOfficeFilterForm(parentEl);
  });

  $(document).on('keyup', '.office_name_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitOfficeFilterForm(parentEl);
  });

  //sales team search agents
  $(document).on('change', '.sales_agent_office_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitSalesTeamAgentFilterForm(parentEl);
  });

  $(document).on('keyup', '.sales_agent_name_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitSalesTeamAgentFilterForm(parentEl);
  });

  $(document).on('change', '.colleague_agent_office_search',  function() {
    var parentEl = $(this).closest(".colleague_filter_form");
    submitColleagueAgentFilterForm(parentEl);
  });

  $(document).on('keyup', '.colleague_agent_name_search',  function() {
    var parentEl = $(this).closest(".colleague_filter_form");
    submitColleagueAgentFilterForm(parentEl);
  });

  //sestimations search agents
  $(document).on('change', '.estimation_agent_office_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitEstimationAgentFilterForm(parentEl);
  });

  $(document).on('keyup', '.estimation_agent_name_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitEstimationAgentFilterForm(parentEl);
  });

  $(document).on('keyup', '.overview_agent_name_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitOverviewAgentFilterForm(parentEl);
  });

  $(document).on('change', '.overview_agent_office_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitOverviewAgentFilterForm(parentEl);
  });

  $(document).on('keyup', '.external_partner_name_search',  function() {
    var parentEl = $(this).closest(".filter_form");
    submitExternalPartnerFilterForm(parentEl);
  });

  function submitSalesTeamAgentFilterForm(parentEl){
    clearTimeout(t);
    t = setTimeout(function () {
      //$(parentEl).find('.loader').show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commissions/'+ commission_id + "/search/sales_team_agent_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search : $(parentEl).find('.sales_agent_name_search').val(), office : $(parentEl).find('.sales_agent_office_search').val(), role: 'agent'}
      });
    }, 500);
  }

  function submitColleagueAgentFilterForm(parentEl){
    clearTimeout(t);
    t = setTimeout(function () {
      //$(parentEl).find('.loader').show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commissions/'+ commission_id + "/search/colleague_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search : $(parentEl).find('.colleague_agent_name_search ').val(), office : $(parentEl).find('.colleague_agent_office_search').val(), role: 'agent'}
      });
    }, 500);
  }

  function submitEstimationAgentFilterForm(parentEl){
    clearTimeout(t);
    t = setTimeout(function () {
      //$(parentEl).find('.loader').show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commission/estimations/'+ commission_id + "/search/agent_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search : $(parentEl).find('.estimation_agent_name_search').val(), office : $(parentEl).find('.estimation_agent_office_search').val(), role: 'agent'}
      });
    }, 500);
  }

  function submitOverviewAgentFilterForm(parentEl){
    clearTimeout(t);
    t = setTimeout(function () {
      //$(parentEl).find('.loader').show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commission/estimations/'+ commission_id + "/search/overview_agent_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search : $(parentEl).find('.overview_agent_name_search').val(), office : $(parentEl).find('.overview_agent_office_search').val(), role: 'agent'}
      });
    }, 500);
  }

  function submitAgentFilterForm(parentEl){
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commissions/'+ commission_id + "/search/agent_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search : $(parentEl).find('.agent_name_search').val(), office : $(parentEl).find('.agent_office_search').val(), role: 'agent'}
      });
    }, 500);
  }
  
  function submitAgentOfficeFilterForm(parentEl){
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commissions/'+ commission_id + "/search/agent_office_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search : $(parentEl).find('.agents_name_search').val(), office : $(parentEl).find('.agent_office_name_search').val(), role: 'agent'}
      });
    }, 500);
  }

  function submitOfficeFilterForm(parentEl){
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commissions/'+ commission_id + "/search/office_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search : $(parentEl).find('.office_name_search').val()}
      });
    }, 500);
  }

  function submitExternalPartnerFilterForm(parentEl){
    clearTimeout(t);
    t = setTimeout(function () {
      var commission_id = $("#commission_id").val();
      url = '/agent_office/commissions/'+ commission_id + "/search/external_partner_filter/";
      $.ajax({
        url: url,
        type: 'POST',
        data: {search : $(parentEl).find('.external_partner_name_search').val()}
      });
    }, 500);
  }

  // OpenHouse Listing search
  // City or property search box
  $(document).on('keyup', '#search_text_field',  function() {
    var list_type = $(this).parent().find('#listing_type').val()
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      url = '/agent_office/commissions/prospects_listings?prospects_chart=true'
      $.ajax({
        url: url,
        type: 'POST',
        data: {search: $("#search_text_field").val(), filter: true, commission_type: list_type}
      });
    }, 500);
  });

  // Search by name textbox
  $(document).on('keyup change', '.listing_search_by_name, .commission_order',  function() {
    var list_type = $(this).parent().find('#listing_type').val()
    var name = $(this).parent().find('#listing_type').next(".listing_search_by_name").val()
    var order = $(this).parent().find('#order').val()
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      url = '/agent_office/commissions/prospects_listings?prospects_chart=true'
      $.ajax({
        url: url,
        type: 'POST',
        data: {listing_search_by_name: name, filter: true, commission_type: list_type, order: order}
      });
    }, 500);
  });

  // Filter by cancel commission type
  $(document).on("change", ".CancelCommissionType, .interruption_reason, .CommissionTime", function(){
    var list_type = "cancelled_commission"
    var confirm_commission_type = $('.CancelCommissionType').val()
    var myCheckboxes = new Array();
    var start_time = $('.listing_start_time').val()
    var end_time = $('.listing_end_time').val()

    $('.interruption_reason:input:checkbox').each( function() {
      if($(this).is(":checked")) {
        myCheckboxes.push($(this).val());
      }
    });

    var name = myCheckboxes    

    $("#selling_commission_interruption_reason").addClass('hide')
    $("#buying_commission_interruption_reason").addClass('hide')
    $("#renting_commission_interruption_reason").addClass('hide')
    $("#estimation_commission_interruption_reason").addClass('hide') 
    $(".FiterCheckboxCancellation").addClass('hide')
    
    if (confirm_commission_type == "SELL"){
      $("#selling_commission_interruption_reason").removeClass('hide')
      $(".FiterCheckboxCancellation").removeClass('hide')
    }
    else if(confirm_commission_type == "BUY"){
      $("#buying_commission_interruption_reason").removeClass('hide')
      $(".FiterCheckboxCancellation").removeClass('hide')
    }
    else if(confirm_commission_type == "LESSOR" || confirm_commission_type == "TENANT"){
      $("#renting_commission_interruption_reason").removeClass('hide')
      $(".FiterCheckboxCancellation").removeClass('hide')
    }
    else if(confirm_commission_type == "APPRAISAL"){
      $("#estimation_commission_interruption_reason").removeClass('hide')
      $(".FiterCheckboxCancellation").removeClass('hide')
    }
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      url = '/agent_office/commissions/prospects_listings?prospects_chart=true'
      $.ajax({
        url: url,
        type: 'POST',
        data: {interruption_reasons: name, filter: true, commission_type: list_type, confirm_commission_type: confirm_commission_type, start_time: start_time, end_time: end_time}
      });
    }, 500);
  });
  // Filer by month and year
  $(document).on("change", ".filter_property_date", function(){
    var list_type = $("#search_text_field").parent().find('#listing_type').val()
    dateArr = [];
    $(".filter_property_date").each(function() {
      dateArr.push($(this).val())
    });
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      url = '/agent_office/commissions/prospects_listings?prospects_chart=true';
      $.ajax({
        url: url,
        type: 'POST',
        data: { year: dateArr[0], month: dateArr[1],commission_type: list_type}
      });
    },500);
  });
});

function checkUncheckObjects(search_type, filter_id){
  var filter_objects_ele = $("#"+filter_id).closest('.filter_objects');
  var final_selected_objects_ele = $(filter_objects_ele).find('.final_selected_objects');
  if ($(final_selected_objects_ele).length > 0){
    var final_selected_objects = $(final_selected_objects_ele).val().split(',');
    $(filter_objects_ele).find('.object_check').prop('checked', false);
    $(filter_objects_ele).find('.select_text').removeClass('hide');
    $(filter_objects_ele).find('.unselect_text').addClass('hide');

    final_selected_objects.forEach(function(object_id){
      var object_ele = $(filter_objects_ele).find('*[data-object_id="'+object_id+'"]');
      if ($(object_ele).length > 0){
        $(object_ele).prop('checked', true);
        var parentEl = $(object_ele).closest('.parent');
        $(parentEl).find('.select_text').addClass('hide');
        $(parentEl).find('.unselect_text').removeClass('hide');
      }
    });
  }
}

// remove an id from holder and update it
function removeFromFinalSelectedObjects(final_selected_objects_ele, object_id, parentEl) {
  var object_id = (object_id).toString()
  var idArr = $(final_selected_objects_ele).val();
  idArr = idArr ? idArr.split(",") : [];
  var index = idArr.indexOf(object_id);
  if (index > -1) {
    idArr.splice(index, 1);
    $(final_selected_objects_ele).val(idArr.join(","));
  }
  set_select_text($(parentEl).find('.select_text'), $(parentEl).find('.unselect_text'));
}

// add an id to holder and update it
function addToFinalSelectedObjects(final_selected_objects_ele, id, parentEl) {
  var idArr = $(final_selected_objects_ele).val();
  idArr = idArr ? idArr.split(",") : [];
  var index = idArr.indexOf(id);
  if (index < 0) {
    idArr.push(id);
    $(final_selected_objects_ele).val(idArr.join(","));
  }
  set_unselect_text($(parentEl).find('.select_text'), $(parentEl).find('.unselect_text'));
}