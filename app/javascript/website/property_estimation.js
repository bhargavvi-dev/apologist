$(document).ready(function(){

  calculatePriceAppraisalReliability();
  calculateServicesAnalysis();
  calculateHousingCompanyAnalysis();

  $(document).on('click', ".estimation_analysis_year", function(){
    var pre_selected_years = $(".chart_year_data").find('.selected');
    if ($(pre_selected_years).length > 0){
      current_index = $(this).data("index");
      if (!(current_index == parseInt($(pre_selected_years[0]).data("index")) || current_index == parseInt($(pre_selected_years[0]).data("index"))-1 || current_index == parseInt($(pre_selected_years[pre_selected_years.length-1]).data("index"))+1 || current_index == parseInt($(pre_selected_years[pre_selected_years.length-1]).data("index")))){
        return false;
      }
    }
    $(this).toggleClass('selected');
    $(this).toggleClass('btn-blue');
    $(this).toggleClass('btn-default');

    var selected_years = $(".chart_year_data").find('.selected');
    var current_index = $(this).data("index");
    if (selected_years.length > 0){
      var start_index = $(selected_years[0]).data("index");
      var start_year = $(selected_years[0]).text().trim();
      if (selected_years.length > 1){
        end_index =  $(selected_years[selected_years.length-1]).data("index");
        end_year = $(selected_years[selected_years.length-1]).text().trim();
      }
      else{
        end_index = start_index;
        end_year = start_year;
      }
    }
    else{
      start_index = -1;
      end_index = -1;
      start_year = $('.estimation_analysis_year')[0].text().trim();
      start_year = $('.estimation_analysis_year')[$('.estimation_analysis_year').length - 1].text().trim();
    }

    dataset_json = {}
    dataset_json["province_actual_data"] = sliceDataSet($("#province_actual_data").data("dataset").split(","), start_index, end_index);
    dataset_json["city_actual_data"] = sliceDataSet($("#city_actual_data").data("dataset").split(","), start_index, end_index);
    dataset_json["quarter_suburb_actual_data"] = sliceDataSet($("#quarter_suburb_actual_data").data("dataset").split(","), start_index, end_index);
    dataset_json["province_asking_data"] = sliceDataSet($("#province_asking_data").data("dataset").split(","), start_index, end_index);
    dataset_json["city_asking_data"] = sliceDataSet($("#city_asking_data").data("dataset").split(","), start_index, end_index);
    dataset_json["quarter_suburb_asking_data"] = sliceDataSet($("#quarter_suburb_asking_data").data("dataset").split(","), start_index, end_index);
    dataset_json["province_forecast_data"] = sliceDataSet($("#province_forecast_data").data("dataset").split(","), start_index, end_index);
    dataset_json["city_forecast_data"] = sliceDataSet($("#city_forecast_data").data("dataset").split(","), start_index, end_index);
    dataset_json["quarter_suburb_forecast_data"] = sliceDataSet($("#quarter_suburb_forecast_data").data("dataset").split(","), start_index, end_index);
    dataset_json["customer_estimation_data"] = sliceDataSet($("#customer_estimation_data").data("dataset").split(","), start_index, end_index);
    dataset_json["total_sales_results_data"] = sliceDataSet($("#total_sales_results_data").data("dataset").split(","), start_index, end_index);
    dataset_json["average_sales_days_data"] = sliceDataSet($("#average_sales_days_data").data("dataset").split(","), start_index, end_index);

    var x_labels = sliceDataSet($("#x_labels").data("value").split(","), start_index, end_index);

    number_of_deals_during_analysis = 0;
    dataset_json["total_sales_results_data"].forEach(function(ele){
      if (parseInt(ele)){
        number_of_deals_during_analysis += parseInt(ele)
      }
    });
    $("#number_of_deals_during_analysis").text(number_of_deals_during_analysis);
    $("#number_of_deals_during_analysis_input").val(number_of_deals_during_analysis);

    avg_selling_time_during_analysis = 0;
    dataset_json["average_sales_days_data"].forEach(function(ele){
      if (parseInt(ele)){
        avg_selling_time_during_analysis += parseInt(ele)
      }
    });
    $("#avg_selling_time_during_analysis").text(avg_selling_time_during_analysis);
    $("#avg_selling_time_during_analysis_input").val(avg_selling_time_during_analysis);

    latest_actual_price = dataset_json["city_actual_data"][dataset_json["city_actual_data"].length-3];
    $("#latest_actual_price").text(latest_actual_price);
    $("#latest_actual_price_input").val(latest_actual_price);
    $("#latest_actual_price_year_input").val(start_year);
    $("#property_analysis_start_year").val(end_year);
    $("#property_analysis_end_year").val(start_year);
      // ================ show price trends chart ==========================
    $("#price_development_trend").removeClass("hide");
    $("#priceTrendsChart").html("<canvas id='price_trends_chart'>");

    var datasets = chartDataSets(dataset_json);
    var ctx = document.getElementById("price_trends_chart").getContext('2d');
    var yAxes = chartYAxes(parseInt($("#line_chart_max").data('value')), parseInt($("#line_chart_min").data('value')), parseInt($("#bar_chart_max").data('value')));
    var myChart = initChart(ctx, x_labels, datasets, yAxes);
  });

  $(document).on("change", ".property_trade_type", function(){
    $("#property_trade_type").val($("#property_trade_type_" + $(this).val()).text().trim());
  });

  $(document).on("click", "#marketAnalysisModalBtn", function(){
    if ($('#market_analysis_form_submit_id').val() == "false"){
      $('#price_navigator_get_results').click();
    }
  });

  $(document).on("click", ".agent_final_estimate_check", function(){
    var id = getId(this.id);
    var final_estimate_agents = $("#final_estimate_agents").val().split(',');
    var parent_ele = $(this).closest('.agent_sales_team');
    var select_ele = $(parent_ele).find("#sales_team_select_text_" + id);
    var unselect_ele = $(parent_ele).find("#sales_team_unselect_text_" + id);
    if ($(this).is(":checked")){
      set_unselect_text(select_ele, unselect_ele);
      if (!isInArray(id, final_estimate_agents)){
        final_estimate_agents.push(id);
      }
    }
    else{
      set_select_text(select_ele, unselect_ele);
      if (isInArray(id, final_estimate_agents)){
        final_estimate_agents.splice(final_estimate_agents.indexOf(id), 1);
      }
    }
    $("#final_estimate_agents").val(final_estimate_agents.join(','));
  });

  if (window.location.search.indexOf('commission_back=true') > -1){
    setTimeout(function(){
      $("#check_price_appraisal_report_step_1").modal("show");
    }, 500);
  }

  $(document).on('change', '.reason_for_price_appraisal', function(){
    commonAddOrRemoveHideClass($(this), "OTHER", "disable_fields");
  });

  $(document).on('change', '.estimate_property_history', function(){
    commonAddOrRemoveHideClass($(this), "RECENT_SALE", "hide_fields");
  });

  $(document).on('change', '.previous_price_appraisal', function(){
    commonAddOrRemoveHideClass($(this), "YES_APPRAISAL", "hide_fields");
  });

  $(document).on('click', '.add_other_expense_task', function(){
    var other_expense = $("#dummy_other_estimate_contract_expenses").clone();
    var last_other_expense = $("#other_estimate_expenses .other_expenses_lists:last").attr('id');
    if (last_other_expense){
      var index = parseInt(getId(last_other_expense)) + 1;
    }
    else{
      var index = 1;
    }
    other_expense = other_expense.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_estimate_expenses");
    if ($("#pc_browser").val() != 'true') {
      $("#other_estimate_expenses").append(other_expense).find('.virtualKeyboard').keyboard({
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
  });

  $(document).on("click", ".remove_other_expenses", function(){
    $(this).closest(".other_expenses_lists").remove();
  });

  $(document).on("change", ".estimate_overview_type", function(){
    if ($(this).val() == "NO_OVERVIEW") {
      $('.hide_all_overviews_section').addClass('hide');
    }

    if ($(this).val() == "INTERNAL_OVERVIEW") {
      $('.hide_all_overviews_section').removeClass('hide');
      $('.external_overview_hide').removeClass('hide');
      $('.external_overview_title').addClass('hide');
    }
    else if ($(this).val() == "EXTERNAL_OVERVIEW") {
      $('.hide_all_overviews_section').removeClass('hide');
      $('.external_overview_hide').addClass('hide');
      $('.external_overview_title').removeClass('hide');
    }
  });

  $(document).on('click', '.add_other_information_sources', function(){
    var other_source = $("#dummy_other_information_sources").clone();
    var last_other_source = $("#other_information_sources .other_information_source_lists:last").attr('id');
    if (last_other_source){
      var index = parseInt(getId(last_other_source)) + 1;
    }
    else{
      var index = 1;
    }
    other_source = other_source.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_information_sources");
    $("#other_information_sources").append(other_source).find(".datepickeron").datepicker({
      format: 'dd.mm.yyyy',
      weekStart: 1,
      autoclose: true,
      todayHighlight: true,
      clearBtn: true,
      disableTouchKeyboard: true,
      Readonly: true
    }).attr("readonly", "readonly");
  });

  $(document).on("click", ".remove_other_information_source", function(){
    $(this).closest(".other_information_source_lists").remove();
  });

  $('input[type="range"]').rangeslider({
    // Feature detection the default is `true`.
    // Set this to `false` if you want to use
    // the polyfill also in Browsers which support
    // the native <input type="range"> element.
    polyfill: false,

    // Default CSS classes
    rangeClass: 'rangeslider',
    disabledClass: 'rangeslider--disabled',
    horizontalClass: 'rangeslider--horizontal',
    verticalClass: 'rangeslider--vertical',
    fillClass: 'rangeslider__fill',
    handleClass: 'rangeslider__handle',

    // Callback function
    onInit: function() {
      calculatePriceAppraisalReliability();
      calculateServicesAnalysis();
      calculateHousingCompanyAnalysis();
    },

    // // Callback function
    onSlide: function(position, value) {
      var current_ele = $(this)[0]['$element'];
      if (current_ele){
        var parentEl = $(current_ele).closest('.analysis_report_class');
        var price_ele = $(parentEl).find('.price_analysis_report_input_value');
        var service_ele = $(parentEl).find('.service_analysis_report_input_value');
        var housing_ele = $(parentEl).find('.housing_analysis_report_input_value');
        var other_ele = $(parentEl).find('.other_analysis_report_input_value');
        if (price_ele){
          $('#reliability_analysis_result_input').val("");
          calculatePriceAppraisalReliability();
          $(price_ele).val(value);
        }
        if (service_ele){
          $('#service_analysis_result_input').val("");
          calculateServicesAnalysis();
          $(service_ele).val(value);
        }
        if (housing_ele){
          $('#housing_analysis_result_input').val("");
          calculateHousingCompanyAnalysis();
          $(housing_ele).val(value);
        }
        if (other_ele){
          $(other_ele).val(value);
        }
      }
    },

    // Callback function
    onSlideEnd: function(position, value) {
      var current_ele = $(this)[0]['$element'];
      if (current_ele){
        var parentEl = $(current_ele).closest('.analysis_report_class');
        var price_ele = $(parentEl).find('.price_analysis_report_input_value');
        var service_ele = $(parentEl).find('.service_analysis_report_input_value');
        var housing_ele = $(parentEl).find('.housing_analysis_report_input_value');
        if (price_ele){
          $('#reliability_analysis_result_input').val("");
          calculatePriceAppraisalReliability();
          $(price_ele).val(value);
        }
        if (service_ele){
          $('#service_analysis_result_input').val("");
          calculateServicesAnalysis();
          $(service_ele).val(value);
        }
        if (housing_ele){
          $('#housing_analysis_result_input').val("");
          calculateHousingCompanyAnalysis();
          $(housing_ele).val(value);
        }
      }
    }
  });

  $(document).on("change", ".estimate_property_appraisal_type_value", function(){
    var price_appraisal_val = $(this).val();
    if (price_appraisal_val == "APPRAISAL_REPORT"){
      var parentEl = $(this).closest(".price_appraisal_value_type_report");
      $(parentEl).find('.appraisal_type_report_input').attr('disabled', false);
      $('.price_appraisal_value_type_book').find('.appraisal_type_book_input').attr('disabled', true);
    }
    else{
      var parentEl = $(this).closest(".price_appraisal_value_type_book");
      $(parentEl).find('.appraisal_type_book_input').attr("disabled", false)
      $('.price_appraisal_value_type_report').find('.appraisal_type_report_input').attr('disabled', true);
    }
  });

  $(document).on("change", ".estimate_property_type", function(){
    $('.estimate_property_subtype').parent().parent().find(".hide").removeClass("hide");
    if ($(this).val() == "APARTMENT" && $('.estimate_property_use:checked').val() == "VACATIONAL"){
      removePropertySubtypes();
    }
  });

  $(document).on("change", ".estimate_property_use", function(){
    $('.estimate_property_subtype').parent().parent().find(".hide").removeClass("hide");
    if ($(this).val() == "VACATIONAL" && $('.estimate_property_type:checked').val() == "APARTMENT"){
      removePropertySubtypes();
    }
  });

  $(document).on("click", ".start_zooming", function(){
    $('.ZoomMaterialImg').zoom();
  });

  $(document).on("click", ".stop_zooming", function(){
    $('.ZoomMaterialImg').trigger('zoom.destroy');;
  });

  $(document).on("change", ".check_contract_kilometer_allowance", function(){
    commonAddOrRemoveHideClass($(this), "ALLOWANCE_YES", "hide_fields");
  });

  $(document).on("click change", ".client_is_incapable_class", function(){
    commonAddOrRemoveHideClass($(this), "true", "hide_fields");
  });

  $(document).on("change keyup", ".clone_me_class", function(){
    var current_ele_val = $(this).val();
    var ele = $(this).attr('data-selector'); 
    $(ele).val(current_ele_val);
  });

  setTimeout(function(){
    var tab_id = getParam('ShowtargetTab');
    if (tab_id){
      $('.nav-tab-5 li').removeClass('active');
      $('.nav-tab-5 a[href="#'+tab_id+'"]').tab().parent().addClass("active");
      $('.tab-pane').removeClass('active in');
      $('#'+tab_id).addClass('active in');
    }
  }, 500);

  $(document).on('change', '.set_property_review_type', function(){
    var review_type = $(this).val();
    commonAddOrRemoveHideClass($(this), "HANDED_TO_AGENT", "hide_fields");
    if (review_type == "HANDED_TO_AGENT"){
      $('.review_retrieve_date').attr("disabled", true);
      $('.review_retrieve_place').attr("disabled", true);
    }
    else{
      $('.review_retrieve_date').attr("disabled", false);
      $('.review_retrieve_place').attr("disabled", false);
    }
  });

  $(document).on('click', '.add_other_internal_reviews', function(){
    var other_review = $("#dummy_other_internal_reviews").clone();
    var last_other_review = $("#other_internal_reviews .other_internal_reviews_lists:last").attr('id');
    if (last_other_review){
      var index = parseInt(getId(last_other_review)) + 1;
    }
    else{
      var index = 1;
    }
    other_review = other_review.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_internal_reviews");
    $("#other_internal_reviews").append(other_review).find('.datepickeron').datepicker({
      format: 'dd.mm.yyyy',
      weekStart: 1,
      autoclose: true,
      todayHighlight: true,
      clearBtn: true,
      disableTouchKeyboard: true,
      Readonly: true
    }).attr("readonly", "readonly");
  });

  $(document).on("click", ".remove_other_internal_reviews", function(){
    $(this).closest(".other_internal_reviews_lists").remove();
  });

  $(document).on("click", ".addOtherinternalReviewAgents", function(){
    var other_review_id = $(this).closest(".other_internal_reviews_lists").attr('id');
    //$('#final_overview_agents').val('');
    $(".agent_final_overview_check").prop('checked', false);
    if (other_review_id){
      var index = parseInt(getId(other_review_id));
      if (index){
        $('#overview_other_internal_agent_ids').val(index);
        var agent_ids = $('#other_internal_reviews_'+index+'_agent_ids').val().split(",");
      }
      else{
        $('#overview_other_internal_agent_ids').val('');
      }
    }
    else{
      $('#overview_other_internal_agent_ids').val('');
      var agent_ids = $('#overview_internal_agent_ids').val().split(",");
    }
    setOverviewAgents(agent_ids);
  });

  $(document).on("click", ".agent_final_overview_check", function(){
    var id = getId(this.id);
    var parentEl = $(this).closest(".sales_filter_agent");
    var final_overview_agents = $('#overview_internal_agent_ids').val().split(",");
    var parent_ele = $(this).closest('.agent_sales_team');
    var select_ele = $(parent_ele).find("#sales_team_select_text_" + id);
    var unselect_ele = $(parent_ele).find("#sales_team_unselect_text_" + id);
    if ($(this).is(":checked")){
      set_unselect_text(select_ele, unselect_ele);
      if (!isInArray(id, final_overview_agents)){
        final_overview_agents.push(id);
      }
    }
    else{
      set_select_text(select_ele, unselect_ele);
      if (isInArray(id, final_overview_agents)){
        final_overview_agents.splice(final_overview_agents.indexOf(id), 1);
      }
    }
    $(parentEl).find("#final_overview_agents").val(final_overview_agents);
  });


  $(document).on('click', '.add_other_main_building_info', function(){
    var building = $("#dummy_other_main_building_info").clone();
    var last_building = $("#other_main_building_info .other_main_building_info_lists:last").attr('id');
    if (last_building){
      var index = parseInt(getId(last_building)) + 1;
    }
    else{
      var index = 1;
    }
    building = building.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_main_building_info");
    $("#other_main_building_info").append(building);
  });

  $(document).on("click", ".remove_other_main_building_info", function(){
    $(this).closest(".other_main_building_info_lists").remove();
  });

  $(document).on("click", ".check_property_subtype", function(){
    var parentEl = $(this).closest('.estimation_property_info_form');
    var ele = $(parentEl).find('.property_detailed_info_real_estate_commercial');
    var childEle = $(this).val();
    if ($(this).is(":checked")){
      $(ele).find('.property_building_'+childEle).removeClass('hide');
    }
    else{
      $(ele).find('.property_building_'+childEle).addClass('hide');
    }
  });

  $(document).on("click", ".check_radio_property_subtype", function(){
    var parentEl = $(this).closest('.estimation_property_info_form');
    var ele = $(parentEl).find('.property_detailed_info_real_estate_other');
    var childEle = $(this).val();
    if ($(this).is(":checked") && childEle == "GARAGE"){
      $(ele).find('.property_building_GARAGE').removeClass('hide');
    }
    else{
      $(ele).find('.property_building_GARAGE').addClass('hide');
    }
  });



  $(document).on("click", ".zoom_marketing_content_btn", function(){
    var size = parseInt($('.zoom_marketing_content').css("font-size"));
    if ($(this).hasClass("plus")) {
        size = size + 2;
    } else {
        size = size - 2;
        if (size <= 16) {
            size = 16;
        }
    }
    $('.zoom_marketing_content').css("font-size", size);
  });
  
});

function calculatePriceAppraisalReliability(){
  var totalSum = 0;
  var elements = $('.price_analysis_report_input_value');
  for (var i=0; i<= elements.length; i++) {
    if (elements[i]){
      totalSum += checkNumericValue(elements[i].value);
    }
  }
  if (totalSum > 25){
    $("#reliability_analysis_result_text").html(I18n.t("js.general.task.good"));
    $('#reliability_analysis_result_input').val("GOOD");
  }
  else if (totalSum > 15 && totalSum <= 25){
    $("#reliability_analysis_result_text").html(I18n.t("js.general.task.satisfactory"));
    $('#reliability_analysis_result_input').val("SATISFACTORY");
  }
  else{
    $("#reliability_analysis_result_text").html(I18n.t("js.general.task.bad"));
    $('#reliability_analysis_result_input').val("BAD");
  }
}

function calculateServicesAnalysis(){
  var totalSum = 0;
  var elements = $('.service_analysis_report_input_value');
  for (var i=0; i<= elements.length; i++) {
    if (elements[i]){
      totalSum += checkNumericValue(elements[i].value);
    }
  }
  if (totalSum > 25){
    $('#service_analysis_result_text').html(I18n.t("js.general.task.good"));
    $('#service_analysis_result_input').val("GOOD");
  }
  else if (totalSum > 15 && totalSum <= 25){
    $('#service_analysis_result_text').html(I18n.t("js.general.task.satisfactory"));
    $('#service_analysis_result_input').val("SATISFACTORY");
  }
  else{
    $('#service_analysis_result_text').html(I18n.t("js.general.task.bad"));
    $('#service_analysis_result_input').val("BAD");
  }
  
}

function calculateHousingCompanyAnalysis(){
  var totalSum = 0;
  var elements = $('.housing_analysis_report_input_value');
  for (var i=0; i<= elements.length; i++) {
    if (elements[i]){
      totalSum += checkNumericValue(elements[i].value);
    }
  }
  if (totalSum > 25){
    $('#housing_analysis_result_text').html(I18n.t("js.general.task.good"));
    $('#housing_analysis_result_input').val("GOOD");
  }
  else if (totalSum > 15 && totalSum <= 25){
    $('#housing_analysis_result_text').html(I18n.t("js.general.task.satisfactory"));
    $('#housing_analysis_result_input').val("SATISFACTORY");
  }
  else{
    $('#housing_analysis_result_text').html(I18n.t("js.general.task.bad"));
    $('#housing_analysis_result_input').val("BAD");
  }
}

function removePropertySubtypes() {
  var property_sub_types = $('.estimate_property_subtype');
  for (var i=0; i<= property_sub_types.length; i++) {
    if (property_sub_types[i]){
      if (property_sub_types[i].value == "SENIOR_HOUSE" || property_sub_types[i].value == "HITAS") {
        $(property_sub_types[i]).parent().addClass("hide");
      }
    }
  }
}

function getQuery() {
  var query = {},
      href = window.location.href;
  href.replace(/[?&](.+?)=([^&#]*)/g, function (_, key, value) {
      query[key] = decodeURI(value).replace(/\+/g, ' ');
  });
  return query;
}

function getParam(name){
    var obj = getQuery();
    return obj[name];
}

function checkUncheckEstimateAgents(){
  var final_estimate_agents = $("#final_estimate_agents").val().split(',');
  $(".agent_final_estimate_check").prop('checked', false);
  for(var i=0; i<final_estimate_agents.length; i++){
    if ($(".agent_final_estimate_check_" + final_estimate_agents[i]).length > 0){
      $(".agent_final_estimate_check_" + final_estimate_agents[i]).prop('checked', true)
    }
  }
}

function checkUncheckOverviewAgents(){
  var final_overview_agents = $("#final_overview_agents").val().split(',');
  $(".agent_final_overview_check").prop('checked', false);
  for(var i=0; i<final_overview_agents.length; i++){
    if ($(".agent_final_overview_check_" + final_overview_agents[i]).length > 0){
      $(".agent_final_overview_check_" + final_overview_agents[i]).prop('checked', true)
    }
  }
}

function setOverviewAgents(agent_ids){
  $('.select_overview_text').removeClass('hide');
  $('.unselect_overview_text').addClass('hide');
  for (i=0; i <= agent_ids.length; i++){
    var id = parseInt(agent_ids[i]);
    if (id){
      var ele = $('.agent_final_overview_check_'+id);
      $(ele).prop('checked', true);
      var select_ele = $(".sales_team_select_text_class_"+id);
      var unselect_ele = $(".sales_team_unselect_text_class_"+id);
      set_unselect_text(select_ele, unselect_ele);
    }
  }
}

function sliceDataSet(dataset, start_index, end_index){
  if (start_index == -1 && end_index == -1){
    return dataset
  }
  var default_dataset = dataset.slice(-2);
  var actual_dataset = dataset.slice(0,-2).reverse();
  actual_dataset = actual_dataset.slice(start_index, end_index+1).reverse().concat(default_dataset);

  return actual_dataset;
}

function chartDataSets(dataset_json){
  datasets = [];
  $.each($('.chart_data'), function(){
    var dataset = {
        label: $(this).data("label"),
        data: (dataset_json[$(this).attr('id')] || sliceDataSetStraight($(this).data("dataset").split(','), 0, parseInt($("#time_span").val()))),
        fill: $(this).data("fill") == "true",
        pointStyle: $(this).data("point_style"),
        backgroundColor: $(this).data("background_color"),
        borderColor: $(this).data("border_color"),
        pointBackgroundColor: $(this).data("point_background_color"),
        yAxesGroup: $(this).data("y_axes_group"),
        yAxisID: $(this).data("y_axis_id"),
        lineTension: $(this).data("line_tension"),
        pointRadius: $(this).data("point_radius"),
        type: $(this).data("chart_type"),
        borderDash: [parseInt($(this).data("border_dash_start")), parseInt($(this).data("border_dash_end"))]
      }
    datasets.push(dataset);
  });
  return datasets;
}

function sliceDataSetStraight(dataset, start_index, end_index){
  var default_dataset = dataset.slice(-2);
  var actual_dataset = dataset.slice(0,-2).reverse();
  actual_dataset = actual_dataset.slice(start_index, end_index+1).reverse().concat(default_dataset);

  return actual_dataset;
}

function chartYAxes(line_chart_max, line_chart_min, bar_chart_max){
  yAxes = [{
    "id": "y-axis-1",
    stacked: false,
    display: true,
    position: 'left',
    scalePositionLeft: true,
    scaleLabel: {
      display: true,
      labelString: '€/m2',
      fontSize: 16,
      fontWight: 'bold',
      fontColor: '#000',
      autoSkip: false
    },
    ticks: {
      min: line_chart_min,
      max: line_chart_max,
      padding: 10
    }
   }]

  if ($("#show_estimation_analysis_chart").length > 0){
    yAxes.push({
    "id": "y-axis-2",
    stacked: false,
    display: true,
    position: 'right',
    scalePositionLeft: false,
    ticks: {
      stepSize: 50,
      max: bar_chart_max
      }
    })
  }
  return yAxes
  // var y_axises = []
  // $.each($('.show_carts'), function(){
  //   var y_axis_ele = $(this).find('.y_axis')
  //   ticks = {}
  //   if ($(y_axis_ele).data("has_chart_min") == "true"){
  //     ticks["min"] = parseInt($(y_axis_ele).data("chart_min"))
  //   }
  //   if ($(y_axis_ele).data("has_chart_max") == "true"){
  //     ticks["max"] = parseInt($(y_axis_ele).data("chart_max"))
  //   }
  //   if ($(y_axis_ele).data("has_step_size") == "true"){
  //     ticks["stepSize"] = parseInt($(y_axis_ele).data("step_size"))
  //   }
  //   var y_axis = {
  //     "id": $(y_axis_ele).data("axis_id"),
  //     stacked: false,
  //     display: true,
  //     position: $(y_axis_ele).data("position"),
  //     scalePositionLeft: $(y_axis_ele).data("scale_position_left") == "true",
  //     scalePositionRight: $(y_axis_ele).data("scale_position_right") == "true",
  //     scaleLabel: {
  //         display: true,
  //         labelString: $(y_axis_ele).data("label_string")
  //       },
  //     ticks: ticks
  //   }
  // });
}


function initChart(ctx, x_labels, datasets, yAxes){
  if ($("#show_estimation_analysis_chart").length > 0){
    chart_type = 'bar';
  }
  else{
    chart_type = 'line';
  }
  new Chart(ctx, {
    type: chart_type,
    data: {
      labels: x_labels,
      datasets: datasets
    },
    options: {
      layout: {
        padding: {
          left: 5,
          right: 5,
          top: 0,
          bottom: 5
        }
      },
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      responsive: true,
      legend: {
        position: 'right',
      },    
      title: {
        display: true,
        text: $("#chart_main_title").text()
      },    
      scales: {
        yAxes: yAxes,
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: I18n.t("js.general.task.year"),
            fontSize: 16,
            fontWight: 'bold',
            fontColor: '#000',
            autoSkip: false
          }
        }]
      }
    }
  });
}