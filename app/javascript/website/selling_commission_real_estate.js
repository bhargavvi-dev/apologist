$(document).ready(function(){

  $('#other_buildings').on('cocoon:after-insert', function(e, insertedItem) {
    var last_element_id = $("#other_buildings .building:nth-last-child(2)").attr('id');
    if (last_element_id){
      var index = parseInt(getId(last_element_id)) + 1;
    }
    else{
      var index = 1;
    }
    if (isNaN(index)){
      // total main+other
      var index = $(".buildings .building").length;
    }
    $(insertedItem).html($(insertedItem).html().replace(/replace_index/g, index));
  });

  $(document).on("change", '.water_areas_share_present', function() {
    if ($(this).is(":checked")){
      $('.lake_watercourse_name').removeClass('hide');
    }
    else{
      $('.lake_watercourse_name').addClass('hide');
    }
  });

  // add new use purpose
  $(".add_new_property_use_purpose").click(function(){
    var dummy_element = $(".dummy_property_use_purpose").clone();
    var last_element_id = $(".property_use_purposes .property_use_purpose:last").attr('id');
    if (last_element_id){
      var index = parseInt(getId(last_element_id)) + 1;
    }
    else{
      var index = 1;
    }
    new_element = dummy_element.html().replace(/replace_index/g, index).replace(/replace_param/g, "property_use_purposes");
    $(".property_use_purposes").append(new_element);
  })

  //remove property purpose
  $(document).on("click", ".remove_property_use_purpose", function(){
    $(this).closest(".property_use_purpose").remove();
  });

  // add new water system
  $(document).on("click", '#add_new_wastewater_system', function() {
    var wastewater_system = $("#dummy_wastewater_system").clone();
    var last_wastewater_system = $("#wastewater_systems .wastewater_system:last").attr('id');
    if (last_wastewater_system){
      var index = parseInt(getId(last_wastewater_system)) + 1;
    }
    else{
      var index = 1;
    }
    wastewater_system = wastewater_system.html().replace(/replace_index/g, index).replace(/replace_param/g, "wastewater_systems");
    $("#wastewater_systems").append(wastewater_system);
  })

  //remove water system
  $(document).on("click", ".remove_wastewater_system", function(){
    $(this).closest(".wastewater_system").remove();
  });

  // show/hide  repair_subsidies_received date
  $(document).on("change", ".repair_subsidies_received", function(){
    if ($(this).val() == "true") {
      $('.repair_subsidies_received_date').removeClass('hide');
    }
    else {
      $('.repair_subsidies_received_date').addClass('hide');
    }
  });

  // show text field on change of wastewater syster

  $(document).on("change", ".select_wastewater_system_type", function(){
    var parentEle = $(this).closest('.wastewater_system');
    $(parentEle).find('.wastewater_system_extra_info').addClass('hide');
    if ($(this).val() == "PRECIPITATION_WELLS") {
      $(parentEle).find('.wastewater_system_precipitation_wells_info').removeClass('hide');
    }
    else if ($(this).val() == "OTHER") {
      $(parentEle).find('.wastewater_system_other_info').removeClass('hide');
    }
  });

  // add new building
  $("#add_other_building").click(function(){
    var other_building = $("#dummy_other_building").clone();
    var last_other_building = $("#other_buildings .building:last").attr('id');
    if (last_other_building){
      var index = parseInt(getId(last_other_building)) + 1;
    }
    else{
      var index = 1;
    }
    other_building = other_building.html().replace(/replace_index/g, index).replace(/replace_param/g, "building_construction_info[other]");
    $("#other_buildings").append(other_building);
  })

  //remove building
  $(document).on("click", ".remove_other_building", function(){
    $(this).closest(".building").remove();
  });

  // add new building
  $(document).on("click", ".add_new_ventilation_system", function(){
    var parentEle = $(this).closest('.parent');
    var dummy_element = $(parentEle).find('.dummy_element').clone();
    var last_appended_ele_id = $(parentEle).find('.ventilation_systems .ventilation_system:last').attr('id');
    if (last_appended_ele_id){
      var index = parseInt(getId(last_appended_ele_id)) + 1;
    }
    else{
      var index = 1;
    }
    var replace_param = $(dummy_element).data('replace_params');
    dummy_element = dummy_element.html().replace(/replace_ventilation_index/g, index).replace(/replace_ventilation_param/g, replace_param);
    $(parentEle).find('.ventilation_systems').append(dummy_element);
  })

  //remove ventilation
  $(document).on("click", ".remove_ventilation_system", function(){
    $(this).closest(".ventilation_system").remove();
  });

  //other ventilation type
  $(document).on("change", ".choose_ventilation_system_type", function(){
    if ($(this).val() == "OTHER"){
      $(this).closest(".ventilation_system").find('.ventilation_system_other_info').removeClass('hide');
    }
    else{
      $(this).closest(".ventilation_system").find('.ventilation_system_other_info').addClass('hide');
    }
  });

   // add new heating system
  $(document).on("click", ".add_new_heating_system", function(){
    var parentEle = $(this).closest('.parent');
    var dummy_element = $(parentEle).find('.dummy_element').clone();
    var last_appended_ele_id = $(parentEle).find('.heating_systems .heating_system:last').attr('id');
    if (last_appended_ele_id){
      var index = parseInt(getId(last_appended_ele_id)) + 1;
    }
    else{
      var index = 1;
    }
    var replace_param = $(dummy_element).data('replace_params');
    dummy_element = dummy_element.html().replace(/replace_heating_index/g, index).replace(/replace_heating_param/g, replace_param);
    $(parentEle).find('.heating_systems').append(dummy_element);
    initiateDatePicker();
  })

  //remove heating system
  $(document).on("click", ".remove_heating_system", function(){
    $(this).closest(".heating_system").remove();
  });

  //other heating type
  $(document).on("change", ".choose_heating_system_type", function(){
    if ($(this).val() == "OTHER"){
      $(this).closest(".heating_system").find('.heating_system_other_info').removeClass('hide');
    }
    else{
      $(this).closest(".heating_system").find('.heating_system_other_info').addClass('hide');
    }

    if ($(this).val() == "OIL"){
      $(this).closest(".heating_system").find('.heating_system_oil_info').removeClass('hide');
    }
    else{
      $(this).closest(".heating_system").find('.heating_system_oil_info').addClass('hide');
    }
  });

  //show/hide property_mortgaged
  $(document).on("change", ".seperate_lien_report", function(){
    if ($(this).val() == "true"){
      $('.property_mortgaged').addClass('hide');
    }
    else{
      $('.property_mortgaged').removeClass('hide');
    }
  });
});