$(document).ready(function(){

    $("#unconfirm_cost").click(function () {
    if ($("#confirm_costs").val() == 'false') {
      $("#confirm_costs").val(true);
      if ($(".chnagebglink").hasClass("blueBg")){
        $(".chnagebglink").removeClass("blueBg")
        $(".chnagebglink").addClass("darkGrayBg")
        $(".bgimage1").addClass("hide")
        $(".bgimage2").removeClass("hide")
      }
    }else{
      $("#confirm_costs").val(false);
      if ($(".chnagebglink").hasClass("darkGrayBg")){
        $(".chnagebglink").removeClass("darkGrayBg")
        $(".chnagebglink").addClass("blueBg")
        $(".bgimage").removeClass("hide")
        $(".bgimage2").addClass("hide")
        $(".bgimage1").removeClass("hide")
      }
    }
  });

  $(document).on('click', '.check_and_confirm_invoice', function(){
    $("#ConfirmAddedCosts").modal('hide');
    setTimeout(function(){
      setFlashMessage("selectCostError", "selectCostErrorFlash", I18n.t("js.general.task.confirm_cost"));
      $('#commission_calculation_step_1').modal('show');
    }, 500);
    $( "#form_sales_team" ).addClass( "hide" )
    $( "#manage_cost_listing" ).removeClass( "hide" )
  });

  $(document).on("click change", "#total_amount_of_invoice_with_vat", function(){
    var total_amount_with_vat = $(this).val();
    var vat = $('#commission_tax_base_invoice').val();
    var with_vat_val = total_amount_with_vat.replace(",",".") / (1+checkNumericValue(vat));
    if (total_amount_with_vat){
      $('#total_amount_of_invoice_without_vat').val(show_formatted_number(with_vat_val,2,false));
    }
    var value = $(this).val()
    value = value.replace(',', '.');
    value = parseFloat(value.replace(/\s/g, ''));
    $('.agent_reward_share_with_vat').each(function(i){
      var agent_reward_pr = $(this).closest(".agents_reward_share").find(".agent_percentage").val();
      var agent_percentage_value = value*parseFloat(agent_reward_pr)/100
      $(this).val(String(agent_percentage_value))
    });
    $('.office_reward_share_with_vat').each(function(i){
      var office_reward_pr = $(this).closest(".office_reward_share").find(".office_percentage").val();
      var office_percentage_value = value*parseFloat(office_reward_pr)/100
      $(this).val(String(office_percentage_value))
    });

    $('.agent_reward_share_without_vat').each(function(i){
      var agent_reward_pr_without_vat = $(this).closest(".agents_reward_share").find(".agent_percentage").val();
      var agent_percentage_value_without_vat = parseFloat($("#total_amount_of_invoice_without_vat").val())*parseFloat(agent_reward_pr_without_vat)/100
      $(this).val(String(agent_percentage_value_without_vat))
    });

    $('.office_reward_share_without_vat').each(function(i){
      var office_reward_pr_without_vat = $(this).closest(".office_reward_share").find(".office_percentage").val();
      var office_percentage_value_without_vat = parseFloat($("#total_amount_of_invoice_with_vat").val())*parseFloat(office_reward_pr_without_vat)/100
      $(this).val(String(office_percentage_value_without_vat))
    });



  });

  $(document).on("click change", "#total_amount_of_invoice_without_vat", function(){
    var total_amount_without_vat = $(this).val();
    var vat = $('#commission_tax_base_invoice').val();
    var without_vat_val = total_amount_without_vat.replace(',','.') * (1+checkNumericValue(vat));
    if (total_amount_without_vat){
      $('#total_amount_of_invoice_with_vat').val(show_formatted_number(without_vat_val,2,false));
    }
    var value = $(this).val();
    value = value.replace(',', '.');
    value = parseFloat(value.replace(/\s/g, ''));
    $('.agent_reward_share_without_vat').each(function(i){
      var agent_reward_pr = $(this).closest(".agents_reward_share").find(".agent_percentage").val();
      var agent_percentage_value = value*parseFloat(agent_reward_pr)/100
      $(this).val(String(agent_percentage_value))
    });
    $('.office_reward_share_without_vat').each(function(i){
      var office_reward_pr = $(this).closest(".office_reward_share").find(".office_percentage").val();
      var office_percentage_value = value*parseFloat(office_reward_pr)/100
      $(this).val(String(office_percentage_value))
    });

    $('.agent_reward_share_with_vat').each(function(i){
      var agent_reward_pr_without_vat = $(this).closest(".agents_reward_share").find(".agent_percentage").val();
      var agent_percentage_value_without_vat = parseFloat($("#total_amount_of_invoice_with_vat").val())*parseFloat(agent_reward_pr_without_vat)/100
      $(this).val(String(agent_percentage_value_without_vat))
    });

    $('.office_reward_share_with_vat').each(function(i){
      var office_reward_pr_without_vat = $(this).closest(".office_reward_share").find(".office_percentage").val();
      var office_percentage_value_without_vat = parseFloat($("#total_amount_of_invoice_with_vat").val())*parseFloat(office_reward_pr_without_vat)/100
      $(this).val(String(office_percentage_value_without_vat))
    });
  });

  $(document).on('click change', '.other_charge_customer_invoice_value, .remove_charge_customer_invoice, #discounts_1_value', function(){
    setTimeout(function () {
      var sum = 0 
      $.map($('[id*="other_charges_value_"]'), function(n, i){
        value_1 = getPositiveValue(n.value)
        sum+=value_1
      });
      $(".commission_charge_cal").each(function() {
        sum+=checkNumericValue($(this).val())
      });
      var total_fee = $("#agent_office_commission_base_customer_invoice_attributes_total_fee").val(show_formatted_number(sum,2,false))

      if ($("#discounts_1_value").length > 0) {
        discount_price = sum - checkNumericValue($("#discounts_1_value").val())
        $("#agent_office_commission_base_customer_invoice_attributes_total_fee_to_charge").val(show_formatted_number(discount_price,2,false))
      }else{
        $("#agent_office_commission_base_customer_invoice_attributes_total_fee_to_charge").val(show_formatted_number(sum,2,false))
      }
    }, 1000);
  });

  $(document).on('click', '.change_sales_user_btn', function(){
    $('#sales_team_user_id').val('');
    var ele = $(this).find('.team_member_id');
    $('#sales_team_user_id').val($(ele).val());
  });

  $(document).on('click', '.change_colleague_btn', function(){
    $('#colleague_agent_id').val('');
    var ele = $(this).find('.colleague_id');
    $('#colleague_agent_id').val($(ele).val());
  });

  $(document).on('click', '.change_sales_externalpartner_btn', function(){
    $('#sales_team_externalpartner_id').val('');
    var ele = $(this).find('.team_member_id');
    $('#sales_team_externalpartner_id').val($(ele).val());
  });

  $(document).on('click', '.remove-btn-cls', function(){
    $("#loader-image").show();
  });

  $(document).on('change', '.sales_reward_share', function(){
    reward_share = $(this).val();
    if (reward_share == "BY_TEAMS"){
      if ($(this).closest('.parent').hasClass('commission_calculation')){
        $("#reward_share_by_teams_notification_modal_close").data('show_modal_id', 'commission_calculation_step_1');
      }
      else if ($(this).closest('.parent').hasClass('invite_colleague')){
        $("#reward_share_by_teams_notification_modal_close").data('show_modal_id', 'InviteColleagueModal');
      }
      else{
        $("#reward_share_by_teams_notification_modal_close").data('show_modal_id', '');
      }
    }
    if (reward_share == "EQUALLY"){
      calculateRewardEqually();
    }
    if (reward_share == "PERSONALLY"){
      calculateRewardPersonally(); 
    }
    if(reward_share == "BY_AMOUNT"){
      calculateTeamRewardByAmount();
    }
    else{
      $('.reward_share_amount').addClass('hide');
    }
    if (reward_share == "BY_TEAMS"){
      $('.modal').modal("hide");
      calculateRewardShareByTeams();
      setTimeout(function(){
        $('#RewardShareByTeamsNotificationModal').modal("show");
      }, 500);
    }
    else{
      $('#RewardShareByTeamsNotificationModal').modal("hide");
    }
  });

  $(document).on("change", '.reward_share_amount', function(){
    calculateTeamRewardByAmount();
  });

  $(document).on("change", ".sales_member_roles_radio", function(){
    var parentEl = $(this).closest('.sales_roles_radiobuttons');
    if ($(this).is(":checked")) {
      $(parentEl).find('.sales_member_roles_radio').prop('checked',false);
      $(this).prop("checked", true);
      role_type = $(this).parent().find("span").text().trim();
      var id = $(this).attr('id')
      var idArr = id.split("_");
      var id = idArr[idArr.length - 2];
      if (role_type == "Procurer"){
        procurer_value = $('#commission_procurer').val();
        $("#sales_personal_reward_by_team_"+id).val(procurer_value);
      }
      else if (role_type == "Seller"){
        seller_value = $('#commission_seller').val();
        $("#sales_personal_reward_by_team_"+id).val(seller_value);
      }
      else if (role_type == "Hinter"){ 
        hinter_value = $('#commission_hinter').val();
        $("#sales_personal_reward_by_team_"+id).val(hinter_value);
      }
      else{
        $("#sales_personal_reward_by_team_"+id).val(""); 
      }
    }
  });

  $(document).on("click", ".colleague_check", function(){
    var id = getId(this.id);
    if ($(this).is(":checked")){
      $(".colleague_check").prop('checked', false);
      $(this).prop('checked', true);
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      var parent_ele = $(this).closest('.agent_colleague');
      var select_ele = $(parent_ele).find("#colleague_select_text_" + id);
      var unselect_ele = $(parent_ele).find("#colleague_unselect_text_" + id);
      set_unselect_text(select_ele, unselect_ele);
      $("#colleague_agent").val(id);
    }
    else{
      $("#colleague_agent").val(id);
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      set_select_text(select_ele, unselect_ele);
    }
  });

  $(document).on("click", ".agent_check", function(){
    var id = getId(this.id);
    if ($(this).is(":checked")){
      var parent_ele = $(this).closest('.agent_checks');
      set_unselect_text("#select_text_" + id, "#unselect_text_" + id);
      $("#final_agent").val(id);
    }
    else{
      set_select_text("#select_text_" + id, "#unselect_text_" + id);
    }
  });

  $(document).on("click", ".office_check", function(){
    var id = getId(this.id);
    if ($(this).is(":checked")){
      var parent_ele = $(this).closest('.office');
      set_unselect_text("#select_text_" + id, "#unselect_text_" + id);
      $("#final_office").val(id);
    }
    else{
      set_select_text("#select_text_" + id, "#unselect_text_" + id);
    }
  });

  $(document).on("click", ".agent_sales_team_check", function(){
    var id = getId(this.id);
    if ($(this).is(":checked")){
      $(".agent_sales_team_check").prop('checked', false);
      $(this).prop('checked', true);
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      var parent_ele = $(this).closest('.agent_sales_team');
      var select_ele = $(parent_ele).find("#sales_team_select_text_" + id);
      var unselect_ele = $(parent_ele).find("#sales_team_unselect_text_" + id);
      set_unselect_text(select_ele, unselect_ele);
      $("#final_sales_agent").val(id);
    }
    else{
      $("#final_sales_agent").val(id);
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      set_select_text(select_ele, unselect_ele);
    }
  });

  $(document).on("click", ".external_partner_sales_team_check", function(){
    var id = getId(this.id);
    if ($(this).is(":checked")){
      $(".external_partner_sales_team_check").prop('checked', false);
      $(this).prop('checked', true);
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      var parent_ele = $(this).closest('.external_partner_sales_team');
      var select_ele = $(parent_ele).find("#external_partner_select_text_" + id);
      var unselect_ele = $(parent_ele).find("#external_partner_unselect_text_" + id);
      set_unselect_text(select_ele, unselect_ele);
      $("#final_external_partner").val(id);
    }
    else{
      $("#final_external_partner").val('');
      $('.select_text').removeClass('hide');
      $('.unselect_text').addClass('hide');
      set_select_text(select_ele, unselect_ele);
    }
  });

  $(document).on("click", ".checkTotalSumValue", function(){
    var form = $(this).closest('form');
    var total_fields = $(form).find('.sales_team_members_list');
    var total = 0;
    reward_type = $(form).find('input[name="agent_office_commission_base[reward_share]"]:checked').val();
    if (reward_type == "EQUALLY") {
      $(form).submit();
    }
    else{
      total_amount = 100;
      checkIfSumisEqualtoHundred(form, total_fields, total, total_amount);
    }
  });

});

function getPositiveValue(value){
  if (value == undefined){
    value = 0;
  }
  else if(value == ""){
    value = 0;
  }
  else if(value.trim().length == 0){
    value = 0;
  }
  else{
    value = value.replace(/,/g, ".");
  }
  return parseFloat(value)
}

function calculateTeamRewardByAmount(){
  $('.sales_team_member_team_reward').removeClass('hide');
  $('.sales_roles_checkboxes').find('input').attr('disabled', false);
  $('.sales_roles_radiobuttons').find('input').attr('disabled', true);
  $('.sales_personal_reward_by_team').find('input').attr('disabled', false);
  $('.sales_personal_reward_equally').addClass('hide');
  $('.reward_share_amount').removeClass('hide');
  $('.sales_personal_reward_input').val("");
  $('.sales_personal_reward').addClass("hide");
  $('.sales_roles_radiobuttons').addClass("hide");
  $('.sales_roles_checkboxes').removeClass("hide");
  $('.sales_personal_reward_by_team').removeClass('hide');
  
  reward_share_amount = checkNumericValue($('#sales_reward_share_amount').val());
  if (reward_share_amount){
    if (reward_share_amount > 100){
      var msg = I18n.t("js.general.task.must_be_less_or_equal_to_100")
      display_validation_text($('#sales_reward_share_amount'),msg);
      $('.sales_team_reward').addClass("hide");
    }
    else{
      remove_validation_text($('#sales_reward_share_amount'));
      setValuesforRewards("sales_team_reward", reward_share_amount);
    }
  }
  else{
    $('.sales_team_reward').addClass("hide");
  }
}

function calculateRewardEqually(){
  $('.sales_team_member_team_reward').removeClass('hide');
  $('.sales_roles_checkboxes').find('input').attr('disabled', false);
  $('.sales_roles_radiobuttons').find('input').attr('disabled', true);
  $('.sales_personal_reward_equally').removeClass('hide');
  $('.sales_roles_radiobuttons').addClass("hide");
  $('.sales_personal_reward_by_team').addClass('hide');
  $('.sales_personal_reward_by_team').find('input').attr('disabled', true);
  $('.sales_roles_checkboxes').removeClass("hide");
  $('.sales_team_reward').removeClass("hide");
  $('.sales_team_reward').html("0%");
  $('.sales_team_reward_input').val("0");
  reward_share_amount = 100;
  setValuesforRewards("sales_personal_reward", reward_share_amount);


}

function calculateRewardShareByTeams(){
  $('.sales_team_member_team_reward').removeClass('hide');
  $('.sales_roles_checkboxes').find('input').attr('disabled', false);
  $('.sales_roles_radiobuttons').find('input').attr('disabled', true);
  $('.sales_personal_reward_by_team').find('input').attr('disabled', false);
  $('.sales_roles_checkboxes').removeClass("hide");
  $('.sales_personal_reward_equally').addClass('hide');
  $('.sales_team_reward').addClass("hide");
  $('.sales_personal_reward').addClass("hide");
  $('.sales_team_reward_input').val("");
  $('.sales_personal_reward_input').val("");
  $('.sales_personal_reward_by_team').removeClass('hide');
  $('.sales_roles_radiobuttons').addClass('hide');

}

function calculateRewardPersonally(){
  $('.sales_team_members_form_btn').addClass('checkTotalSumValue');
  $('.sales_team_member_team_reward').addClass('hide');
  $('.sales_personal_reward_equally').addClass('hide');
  $('.sales_roles_radiobuttons').find('input').prop('checked',false);
  $('.sales_personal_reward_by_team').find('input').attr('disabled', false);
  $('.sales_team_reward').addClass("hide");
  $('.sales_personal_reward').addClass("hide");
  $('.sales_team_reward_input').val("");
  $('.sales_personal_reward_by_team').removeClass('hide');
  $('.sales_roles_checkboxes').addClass('hide');
  $('.sales_roles_radiobuttons').removeClass('hide');
  $('.sales_roles_checkboxes').find('input').attr('disabled', true);
  $('.sales_roles_radiobuttons').find('input').attr('disabled', false);
}

function setValuesforRewards(reward_type, reward_amount){
  members_list_cm = $('#commission_calculation_sales_team').find('.sales_team_members_list');
  members_list_st = $('#sales_team_members_reward_share').find('.sales_team_members_list');
  if (members_list_cm){
    calculateRewardShare(reward_type, reward_amount, members_list_cm);
  }
  if (members_list_st){
    calculateRewardShare(reward_type, reward_amount, members_list_st);
  }
  
}

function checkIfSumisEqualtoHundred(form, fields, total, total_amount){
  for (i=0; i<= fields.length; i++){
    ele = fields[i];
    if (ele){
      $this = ele.getAttribute('id');
      var idArr = $this.split("_");
      var id = idArr[idArr.length - 1];
      reward_amount = $('#sales_personal_reward_by_team_'+id);
      amount = $(reward_amount).val();
      total += checkNumericValue(amount);
    }
  }
  if (total == total_amount){
    $(form).submit();
  }
  else{
    $('.sum_must_be_equal_to_100').removeClass('hide');
    $(".modal").animate({ scrollTop: 0  }, "medium");
    $('.sum_must_be_equal_to_100').show().delay(3000).fadeOut();
  }
}

function checkUncheckExternalPartners() {
  var final_external_partner = $("#final_external_partner").val();
  $(".external_partner_sales_team_check").prop('checked', false);
  if ($(".external_partner_sales_team_check_" + final_external_partner).length > 0){
    $(".external_partner_sales_team_check_" + final_external_partner).prop('checked', true)
  }
}

function checkUncheckSalesAgents(){
  var final_sales_agent = $("#final_sales_agent").val();
  $(".agent_sales_team_check").prop('checked', false);
  if ($(".agent_sales_team_check_" + final_sales_agent).length > 0){
    $(".agent_sales_team_check_" + final_sales_agent).prop('checked', true)
  }
}

function checkUncheckAgents(){
  var final_agent = $("#final_agent").val();
  $(".agent_check").prop('checked', false);
  if ($(".agent_check_" + final_agent).length > 0){
    $(".agent_check_" + final_agent).prop('checked', true)
  }
}

function checkUncheckOffices(){
  var final_office = $("#final_office").val();
  $(".office_check").prop('checked', false);
  if ($(".office_check_" + final_office).length > 0){
    $(".office_check_" + final_office).prop('checked', true)
  }
}

function checkUncheckColleagueAgents(){
  var final_sales_agent = $("#colleague_agent").val();
  $(".colleague_check").prop('checked', false);
  if ($(".colleague_check_" + final_sales_agent).length > 0){
    $(".colleague_check_" + final_sales_agent).prop('checked', true)
  }
}

function calculateRewardShare(reward_type, reward_amount, members_list){
  total_members = members_list.length;
  indiviual_team_reward_value = (parseFloat(reward_amount/total_members)).toFixed(2);  
  indiviual_team_reward_value = checkNumericValue(indiviual_team_reward_value);
  if (members_list.length*indiviual_team_reward_value != reward_amount){
    var diff_reward = reward_amount - members_list.length*indiviual_team_reward_value;
    if (diff_reward > 0){
      var main_member_reward = indiviual_team_reward_value + (diff_reward); //33.33 - (-0.01) in case of 10/3
      var other_member_reward = indiviual_team_reward_value;
    }
    else{
      var main_member_reward = indiviual_team_reward_value + (diff_reward) + (total_members-1)*(-diff_reward); //2.67 + (-0.01) + 2*0.01
      var other_member_reward = indiviual_team_reward_value + (diff_reward); //2.67 + (-0.01) in case of 8/3
    }
  }
  else{
   var main_member_reward = indiviual_team_reward_value;
   var other_member_reward = indiviual_team_reward_value;
  }
  for (i=0; i<= members_list.length; i++){
    var member = members_list[i];
    if (member){
      each_indiviual_team_reward_value = other_member_reward;
      member_id = member.getAttribute('id');
      show_reward_ele = $('#'+member_id).find('.'+reward_type);
      $(show_reward_ele).removeClass("hide");
      if ($(show_reward_ele).hasClass('main_agent')){
        each_indiviual_team_reward_value = main_member_reward;
      }
      $(show_reward_ele).html(show_formatted_number(each_indiviual_team_reward_value)+ "%");
      $('#'+reward_type+'_'+member_id).val(show_formatted_number(each_indiviual_team_reward_value, 2, false));
    }
  }
}

function removeSelectedAgents(){
  var agent_ids = $("#final_sales_agent").val().split(",");
  agent_ids.forEach(function(id){
    $(".remove_agent_sales_team_" + id).addClass('hide');
  });
}

function removeSelectedColleagues(){
  var agent_ids = $("#colleague_agent").val().split(",");
  agent_ids.forEach(function(id){
    $(".remove_colleague_" + id).addClass('hide');
  });
}

function removeSelectedAgent(){
  var final_agent = $("#final_agent").val().split(",");
  final_agent.forEach(function(id){
    $(".remove_agent_" + id).addClass('hide');
  });
}

function removeSelectedOffices(){
  var office_ids = $("#final_office").val().split(",");
  office_ids.forEach(function(id){
    $(".remove_office_" + id).addClass('hide');
  });
}