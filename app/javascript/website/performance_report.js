$(document).ready(function() {
  if ($('.show_performance_reports').length > 0){
    $('.set_default_user_dashboard').trigger('click');
  }

  ind_scrolled = 0;
  $(document).on("click","#downClick",function(){
    ind_scrolled=ind_scrolled+150;
    if (ind_scrolled >= 0 && ind_scrolled <= 600){
      scrollMenuTop(this,ind_scrolled)
    }
    else{
      ind_scrolled = 600;
      scrollMenuTop(this,ind_scrolled)
    }
  });

  $(document).on("click","#upClick",function(){
    ind_scrolled=ind_scrolled-150;
    if (ind_scrolled >= 0){
      scrollMenuTop(this,ind_scrolled)
    }
    else{
      ind_scrolled = 0;
      scrollMenuTop(this,ind_scrolled)
    }
  });

  $(document).on('click', ".sales_pipeline_benchmark_btn", function(){
    var btn_class = $(this).data('selector');
    var parentEl = $(btn_class).closest('.parent_btn_class');
    $(parentEl).toggleClass('hide');
    $(this).find('.show_upside_arrow').toggleClass('hide');
    $(this).find('.set_title_name').toggleClass('hide');
  });

  $(document).on('change', '.customer_analysis_type', function(){
    $(".pre-icon").show();
    var path = $("#path").val();
    $.ajax({
      url: '/performance_reports/update_chart_details',
      method: 'POST',
      data: {'screen': 'customer_results', 'analysis_type': $(this).val(),'path': path}
    });
  });

  $(document).on('change', '.standard_benchmark', function(){
    $(".pre-icon").show();
    var path = $("#path").val();
    $.ajax({
      url: '/performance_reports/update_chart_details',
      method: 'POST',
      data: {'screen': 'customer_results', 'analysis_type': $(this).val(),'benchmark_type':$(".standard_benchmark:checked").val(),'path': path}
    });
  });

  $(document).on('change', '.check_financial_sales_analysis', function(){
    $(".pre-icon").show();
    var path = $("#path").val();
    $.ajax({
      url: '/performance_reports/update_chart_details',
      method: 'POST',
      data: {'screen': 'financial_results', 'financial_sales_view_type': $(this).val(),'path': path}
    });
  });

  $(document).on('change', '.check_pipeline_commission_type', function(){
    $(".pre-icon").show();
    var path = $("#path").val();
    $.ajax({
      url: '/performance_reports/update_chart_details',
      method: 'POST',
      data: {'screen': 'sales_pipeline', 'commission_type': $(this).val(),'path': path}
    });
  });

  $(document).on('change', '.check_user_dashbaord_reward_type', function(){
    $(".pre-icon").show();
    var path = $("#path").val();
    $.ajax({
      url: '/performance_reports/update_chart_details',
      method: 'POST',
      data: {'screen': 'user_dashboard', 'commission_type': $(this).val(),'path': path}
    });
  });

  $(document).on('click', '.process_phase, .process_commission_phase, .process_customer_phase, .process_customer_relation_phase, .sales_area_type', function(){
    var process_phase_type = $(this).val()
    var theclass = this.className
    if (process_phase_type == "sales_1" ){
      $(".sales_2_phase").addClass("hide")
      $(".sales_1_phase").removeClass("hide")
    } else {
      $(".sales_1_phase").addClass("hide")
      $(".sales_2_phase").removeClass("hide")
    }
    if (theclass.toString().includes("process_phase")){
      $(".process_phase").removeClass("process_phase_active");
      $(this).addClass("process_phase_active");
      $(".process_phase").removeClass("active");
      $(this).addClass("active");
    } else if (theclass.toString().includes("process_commission_phase")) {
      $(".process_commission_phase").removeClass("process_commission_phase_active");
      $(this).addClass("process_commission_phase_active");
      $(".process_commission_phase").removeClass("active");
      $(this).addClass("active");
    } else if (theclass.toString().includes("process_customer_phase")) {
      $(".process_customer_phase").removeClass("process_customer_phase_active");
      $(this).addClass("process_customer_phase_active");
      $(".process_customer_phase").removeClass("active");
      $(this).addClass("active");
    } else if (theclass.toString().includes("process_customer_relation_phase")) {
      $(".process_customer_relation_phase").removeClass("process_customer_relation_phase_active");
      $(this).addClass("process_customer_relation_phase_active");
      $(".process_customer_relation_phase").removeClass("active");
      $(this).addClass("active");
    }
    var process_phase = $(".process_phase_active").val();
    var process_commission_phase = $(".process_commission_phase_active").val();
    var process_customer_phase = $(".process_customer_phase_active").val();
    var process_customer_relation_phase = $(".process_customer_relation_phase_active").val();

    var process_phase_active =
    $(".pre-icon").show();
    var path = $("#path").val();
    url = "/performance_reports/update_chart_details/";
    $.ajax({
      url: url,
      type: 'POST',
      data: {screen: 'performance_maps', phase_type: process_phase, commission_type: process_commission_phase, customer_type: process_customer_phase, customer_relationship_type: process_customer_relation_phase, sales_area_type: $('.sales_area_type').val(), path: path, filter: true}
    });
  });

  $(document).on('click', '.sales_area_filter', function(){
    $(".pre-icon").show();
    screen = $("#screen").val();
    url = "/performance_reports/office_sales_area_filter/";
    $.ajax({
      url: url,
      type: 'POST',
      data: {screen: screen, sales_area_type: $(this).val(), filter: true}
    });
  });
});

function scrollMenuTop(element,scrolled){
  $(element).parent().parent().find(".scrollmenu").animate({
    scrollTop:  scrolled
  });
}

function callNextPrevStepReport(screen,forward, graphId, office_id){
  $(".pre-icon").show();
  if (forward == "true"){
    counter = parseInt($(".forward_counter").val())+1
  }else{
    counter = parseInt($(".forward_counter").val())-1
  }
  $(".forward_counter").val(counter);
  var analysis_type, financial_sales_view_type, path,commission_type;
  if (screen == "customer_results"){
    analysis_type = $('.customer_analysis_type:checked').val();
  }
  else{
    analysis_type = '';
    financial_sales_view_type = '';
  }

  if (screen == "financial_results"){
    financial_sales_view_type = $('.check_financial_sales_analysis:checked').val();
  }else{    
    financial_sales_view_type = '';
  }
  path = $('#path').val()
  commission_type = $(".check_user_dashbaord_reward_type:checked").val();
  $.ajax({
    url: '/performance_reports/move_next_step',
    method: 'GET',
    data: {'graph_id': graphId, 'screen': screen, 'forward': forward, 'counter': counter, 'office_id': office_id, 'analysis_type': analysis_type, 'financial_sales_view_type': financial_sales_view_type, 'path': path, 'commission_type': commission_type}
  });
}

function DrawGraphById(graphId, graphData, type, title, checked_labels){
  var ctx = document.getElementById(graphId).getContext("2d");
  var myChart = new Chart(ctx, {
    type: type,
    data: graphData,
    options: {
      responsive: true,
          "hover": {
            "animationDuration": 0
          },
          "animation": {
            "duration": 1,
            "onComplete": function () {
              if( !this.canvas ) return;
              var chart = this;
              var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            
              ctx.textAlign = 'center';
              ctx.font="16px Helvetica Neue";
              ctx.textBaseline = 'bottom';
              ctx.fillStyle = 'black';
              // chart.textAlign = "center";
              // chart.textBaseline = "middle";
              var datasets = this.config.data.datasets;

              datasets.forEach(function (dataset, i) {
                chart.getDatasetMeta(i).data.forEach(function (bar, index) {
                  label_value = dataset.label.replace(/[^a-zA-Z ]/g, "");
                  var show_value = isInArray(label_value, checked_labels);
                  if (show_value){
                    var data = dataset.data[index];
                    ctx.fillText(data+"€", bar._model.x-5, bar._model.y+5);
                  }
                });
              });
            }
          },
          tooltips: {
            "enabled": false
           },
          title: {
            display: true,
            text: title,
          },scales: {
            yAxes: [{
              ticks: {
                padding: 15,
                beginAtZero:true
              }
            }],
            xAxes: [{
              padding: 15,
              barPercentage: 0.4
            }]
          }
      }
  });
}

function removeExistingChart(graph_id){
  var grapharea = document.getElementById(graph_id).getContext("2d");
  var myChart = new Chart(grapharea);
  myChart.destroy();
}

function getCheckedUncheckedLabels(ele){
  var checked_labels = [];
  var parentEl = $(ele).closest('.parent_graph_class');
  var check_boxes = $(parentEl).find('.show_value:checkbox');
  for(var i=0; i<check_boxes.length; i++){
    var check_box = check_boxes[i];
    if (check_box.checked) {
      var check_box_label = $(check_box).parent().text().trim();
      check_box_label = check_box_label.replace(/[^a-zA-Z ]/g, "");
      checked_labels.push(check_box_label);
    }
  }
  return checked_labels;
}