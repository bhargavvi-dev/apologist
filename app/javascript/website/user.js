$(document).ready(function(){

  $(document).on("click", "#check_fees", function(){
    $( "#fees_cost_balance" ).removeClass( "hide" )
    $( "#archive_payable_invoice" ).addClass( "hide" )
  });

  $(document).on("click", "#archive_invoice", function(){
    $( "#fees_cost_balance" ).addClass( "hide" )
    $( "#archive_payable_invoice" ).removeClass( "hide" )
  });
  
  //agent
  $(".charge_permission_true").click(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#charge_days_" + id).addClass("hide");
  });

  $(".charge_permission_false").click(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#charge_days_" + id).removeClass("hide");
  });

  $(".choose_responsible_person").click(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    var selected_responsible_persons = [];
    $('#responsiblePersonsList input[type=checkbox]:checked').each(function(){
      var personIdArr = this.id.split("_");
      selected_responsible_persons.push(personIdArr[personIdArr.length - 1]);
    });
    var office_user = $("#add_responsible_modal_user").text().trim();
    $("#" + office_user + "_selected_responsible_persons").text(selected_responsible_persons.join(","));
  });

  $(".add_visiting_address").click(function() {
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#add_visiting_address_wrapper_" + id).remove();
    $("#visiting_address_wrapper_" + id).removeClass('hide');
  });

  $(".add_introduction_text").click(function() {
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $(".add_introduction_text" + id).remove();
    $("#introduction_text_area" + id).removeClass('hide');
  });

  if($("#user_introduction").val() != ""){
    $(".add_introduction_text").remove();
    $("#introduction_text_area").removeClass('hide');
  }

  $(".linkedin-icon").click(function() {
    $("#facebook-form, #twitter-form, #youtube-form, #whatsapp-form, #skype-form").addClass('hide');
    $("#linkedin-form").removeClass('hide');
  });

  $('.linkedin-btn').click(function(){    
    $("#linkedin-form").addClass('hide');
  });

  $(".facebook-icon").click(function() {
    $("#linkedin-form, #twitter-form, #youtube-form, #whatsapp-form, #skype-form").addClass('hide');
    $("#facebook-form").removeClass('hide');
  });

  $('.facebook-btn').click(function(){
    $("#facebook-form").addClass('hide');
  });  

  $(".twitter-icon").click(function() {
    $("#linkedin-form, #facebook-form, #youtube-form, #whatsapp-form, #skype-form").addClass('hide');
    $("#twitter-form").removeClass('hide');
  });

  $('.twitter-btn').click(function(){
    $("#twitter-form").addClass('hide');
  });

  $(".youtube-icon").click(function() {
    $("#linkedin-form, #facebook-form, #twitter-form, #whatsapp-form, #skype-form").addClass('hide');
    $("#youtube-form").removeClass('hide');
  });

  $('.youtube-btn').click(function(){
    $("#youtube-form").addClass('hide');
  });  

  $(".whatsapp-icon").click(function() {
    $("#linkedin-form, #facebook-form, #twitter-form, #youtube-form, #skype-form").addClass('hide');
    $("#whatsapp-form").removeClass('hide');
  });

  $('.whatsapp-btn').click(function(){
    $("#whatsapp-form").addClass('hide');
  });  

  $(".skype-icon").click(function() {
    $("#linkedin-form, #facebook-form, #twitter-form, #youtube-form, #whatsapp-form").addClass('hide');
    $("#skype-form").removeClass('hide');
  });

  $('.skype-btn').click(function(){
    $("#skype-form").addClass('hide');
  });

  //responsible person

  // show loader while filtering/assigning offices
  $("#assignToOfficesBtn").click(function(){
    $("#assign-to-offices-loader").show();
    $("#assignToOffices").modal('toggle');
  });

  $("#assign-to-offices-filter").click(function(){
    $("#assign-to-offices-loader").show();
  });

  $("#assignToAgentEntrepreneursBtn").click(function(){
    $("#assign-to-agent-entrepreneurs-loader").show();
    $("#assignToAgentEntrepreneurs").modal('toggle');  
  });

  $("#assign-to-agent-entrepreneurs-filter").click(function(){
    $("#assign-to-agent-entrepreneurs-loader").show();
  });

  //industry

  //save industy show/enable

  $(document).on('click', '.industry_edit', function(){
    var id = getId(this.id);
    $(this).addClass('hide');
    $("#industry_name_" + id).removeAttr('disabled');
    $("#industry_" + id).removeClass('hide');
    $("#industry_save_" + id).removeClass('hide');
  });

  $(document).on('click', '.industry_remove', function(){
    var id = getId(this.id);
    $("#" + id).remove();
  });

  $(document).on('click', '.industry_delete', function(){
    var id = getId(this.id);
    $.ajax({
      url: '/industries/'+id,
      method: 'DELETE',
      success: function(result){
        $("#industry_" + id).remove();
      }
    }); 
  });  

  $(document).on('click', '.show_image_loader', function(){
    $("#loader-image").show();
  });

  // customer reassigner

  //proceed only if atleast one lead is selected
  //update the selected leads for first
  if ($("#final_leads").length > 0){
    checkUncheckLeads();
    updateLeadReassignerSubmitBtnStatus();
  }

  //show/hide property address
  $("#lead_reassigner_same_property_address").change(function(){
    if (this.checked == true){
      $(".property_address_info").addClass("hide");
    }
    else{
      $(".property_address_info").removeClass("hide");
    }
  });

  //submit the actual form
  $("#lead_reassigner_filter_step_2_btn").click(function(){
    if (!$("#lead_reassigner_filter_step_2_btn").attr("disabled")){
      $("#lead_reassigner_filter_step_2_submit_btn").click();
    }
  });

  //submit lead-filter for on change of any search term
  $(".lead-filter").change(function(){
    $("#loader-image").show();
    $("#lead-filter-form").submit();
  });

  //update lead results count in main for
  $("#limit_lead_search_results").change(function(){
    $("#lead_results_count").val($(this).val());
  });

  // only pass the confimed leads
  $(document).on("change", ".confirm_lead", function(){
    var id  = getId(this.id);
    if ($(this).is(":checked")) {
      // update to unselect text
      $("#confirm_lead_destroy_" + id).prop('checked', false);
      set_unselect_text("#lead_select_text_" + id, "#lead_unselect_text_" + id);
    }
    else {
      // update to select text
      $("#confirm_lead_destroy_" + id).prop('checked', true);
      set_select_text("#lead_select_text_" + id, "#lead_unselect_text_" + id);
    }
    updateLeadReassignerConfrimLeadStatus();
  })

  // set lead order
  $(document).on("focusin", ".lead_receiving_order", function(){
    $(this).data('val', $(this).val());
  });

  $(document).on("change", ".lead_receiving_order", function(){
    if ($(this).val()!= ''){
      var order = $(this).val();
      $(".lead_receiving_order option[value=" + order + "]:selected").parent(".lead_receiving_order").val($(this).data('val'));
      $(this).val(order);
    }
  });

  //update the actual selected leads in manual search
  $(document).on("click", ".lead_check", function(){
    var id = getId(this.id);
    //if checked
    if ($(this).is(":checked")) {
      // update to unselect text
      set_unselect_text("#lead_select_text_" + id, "#lead_unselect_text_" + id);
    }
    else {
      // update to select text
      set_select_text("#lead_select_text_" + id, "#lead_unselect_text_" + id);
    }
    var final_leads = $("#final_leads").val().split(",");
    var final_lead_index = final_leads.indexOf(id);
    if ($("#lead_check_" + id).is(":checked")){
      if (final_lead_index < 0){
        final_leads.push(id);
      }
    }
    else{
      if (final_lead_index > -1){
        final_leads.splice(final_lead_index, 1);
      }
    }
    final_leads = final_leads.filter(Boolean);
    $("#final_leads").val(final_leads.join(","));
    updateLeadReassignerSubmitBtnStatus();
  });

  $(document).on("click", ".filter_rejected_offers_type", function(){
    var filter_type = $(this).val();
    $('.pre-icon').show();
    $.ajax({
      url: '/customers/filter_offers',
      method: 'GET',
      data: {
              'filter_type': filter_type,
            },
      success: function(result){
      }
    });
  });

})

function setResponsiblePersonsInfo(office_id, office_user_id, office_name) {
  $("#add_responsible_office").val(office_id);
  $("#add_responsible_modal_user").text(office_user_id);
  var responsible_person_ids = $("#" + office_user_id + "_selected_responsible_persons").text().trim().split(",");
  $("#selected_responsible_person").val(responsible_person_ids);
  set_filtered_responsible_person();
  // $('#responsiblePersonsList input[type=checkbox]:checked').each(function(){
  //   $(this).prop('checked', false);
  // });
  // if (responsible_person_ids.length > 0) {
  //   for(var i=0; i<responsible_person_ids.length; i++){
  //     $("#responsible_person_" + responsible_person_ids[i]).prop('checked', true);
  //   }
  // }
}

function setRegisterResponsiblePersonInfo(office_id) {
  $("#register_responsible_office").val(office_id);
}

function checkUncheckLeads() {
  var final_leads = $("#final_leads").val().split(",");
  final_leads.forEach(function(final_lead){
    if ($("#lead_" + final_lead).length > 0){
      if (!$("#lead_" + final_lead).is(":checked")){
        $("#lead_check_" + final_lead).prop('checked', true);
        $("#lead_select_text_" + final_lead).addClass("hide");
        $("#lead_unselect_text_" + final_lead).removeClass("hide");
      }
    }
  });
}

function updateLeadReassignerSubmitBtnStatus(){
  if ($("#final_leads").val() == ""){
    $("#lead_reassigner_filter_step_2_btn").attr("disabled", true);
  }
  else{
    $("#lead_reassigner_filter_step_2_btn").attr("disabled", false);
  }
}

function updateLeadReassignerConfrimLeadStatus(){
  if ($(".confirm_lead:checkbox:checked").length > 0){
    $("#lead_reassigner_step_3_btn").attr("disabled", false);
  }
  else{
    $("#lead_reassigner_step_3_btn").attr("disabled", true);
  }
}