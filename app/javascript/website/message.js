$(document).ready(function(){

  // $(document).on("click", ".hint_accept", ".hint_reject", function(){
  //   var id = getId(this.id);
  //   if ($(this).attr("hint_status") == "ACCEPTED"){
  //     $("#hint_status_accept_"+id).attr("hint_status", "ACCEPTED");
  //   else
  //     $("#hint_status_reject_"+id).attr("hint_status", "REJECTED");
  //   }
  //   $.ajax({
  //     url: "/agent_office/commissions/" + id + "/update_hint_status",
  //     type: 'post'
  //   });  
  // });

  $(document).on("click", ".open_message", function(){
    if ($(this).attr("read_status") == "false"){      
      var id = getId(this.id);
      $("#open_message_subject_"+id).attr("read_status", "true");
      $("#open_message_btn_"+id).attr("read_status", "true");
      $("#subject_"+id, "#body_"+id).addClass('normal');
      $.ajax({
        url: "messages/message_associations/" + id + "/update_read_status",
        type: 'post'
      });
    }
  });

  $(document).on("click", ".recipient_check_as_radio", function(){  
    var id = getId(this.id)
    set_recipient(id);
    if (!$("#responsible_person_check_" + id).is(":checked")) {
      $("#final_recipients").val("");
    }
    else{
     $("#final_recipients").val(id); 
    }
    $('.recipient_check').each(function(){
      if ($('.recipient_check').is(":checked")) {
        $(this).prop('checked', false);
        var id = getId(this.id)
        set_select_text("#responsible_select_text_" + id, "#responsible_unselect_text_" + id);
        $("#final_recipients").val("");
      }
    });
  });

  $(document).on("click", ".recipient_check", function(){
    var id = getId(this.id);
    $('.recipient_check_as_radio').each(function(){
      if ($('.recipient_check_as_radio').is(":checked")){
        $(this).prop('checked', false);
        var id = getId(this.id)
        set_select_text("#responsible_select_text_" + id, "#responsible_unselect_text_" + id);
        $("#final_recipients").val("");
      }
    });  
    //if checked
    if ($("#responsible_person_check_" + id).is(":checked")) {
      // update to unselect text
      set_unselect_text("#responsible_select_text_" + id, "#responsible_unselect_text_" + id);
    }
    else {
      // update to select text
      set_select_text("#responsible_select_text_" + id, "#responsible_unselect_text_" + id);
    }
    var final_recipients = $("#final_recipients").val().split(",");
    var removed_recipients = $("#removed_recipients").val().split(",");
    var final_recipient_index = final_recipients.indexOf(id);
    var remove_recipient_index = removed_recipients.indexOf(id);
    if ($("#responsible_person_check_" + id).is(":checked")){
      if (final_recipient_index < 0){
        final_recipients.push(id);
      }
      if (remove_recipient_index > -1){
        removed_recipients.splice(remove_recipient_index, 1);
      }
    }
    else{
      if (final_recipient_index > -1){
        final_recipients.splice(final_recipient_index, 1);
      }
      if (remove_recipient_index < 0){
        removed_recipients.push(id);
      }
    }
    final_recipients = final_recipients.filter(Boolean);
    removed_recipients = removed_recipients.filter(Boolean);
    $("#final_recipients").val(final_recipients.join(","));
    $("#removed_recipients").val(removed_recipients.join(","));
  });

  $(document).on("click", ".customer_message_check", function(){
    var id = getId(this.id);
    //if checked
    if ($("#responsible_person_check_" + id).is(":checked")) {
      // update to unselect text
      set_unselect_text("#customer_select_text_" + id, "#customer_unselect_text_" + id);
    }
    else {
      // update to select text
      set_select_text("#customer_select_text_" + id, "#customer_unselect_text_" + id);
    }
    var final_recipients = $("#final_recipients").val().split(",");
    var removed_recipients = $("#removed_recipients").val().split(",");
    var final_recipient_index = final_recipients.indexOf(id);
    var remove_recipient_index = removed_recipients.indexOf(id);
    if ($("#responsible_person_check_" + id).is(":checked")){
      if (final_recipient_index < 0){
        final_recipients.push(id);
      }
      if (remove_recipient_index > -1){
        removed_recipients.splice(remove_recipient_index, 1);
      }
    }
    else{
      if (final_recipient_index > -1){
        final_recipients.splice(final_recipient_index, 1);
      }
      if (remove_recipient_index < 0){
        removed_recipients.push(id);
      }
    }
    final_recipients = final_recipients.filter(Boolean);
    removed_recipients = removed_recipients.filter(Boolean);
    $("#final_recipients").val(final_recipients.join(","));
    $("#removed_recipients").val(removed_recipients.join(","));
  });
});

//show unselect text, hide select text
function set_unselect_text(selectId, unselectId) {
  $(selectId).addClass('hide');
  $(unselectId).removeClass('hide');
}

//show select text, hide unselect text
function set_select_text(selectId, unselectId) {
  $(selectId).removeClass('hide');
  $(unselectId).addClass('hide');
}

//check the recipients after filtering or next users if user has checked them before filtering (new recipients)
//uncheck the recipients after filtering or next users if user has unchecked them before filtering (already existed recipients)
function checkUncheckRecipients() {
  var final_recipients = $("#final_recipients").val().split(",");
  final_recipients.forEach(function(final_recipient){
    if ($("#responsible_person_check_" + final_recipient).length > 0){
      if (!$("#responsible_person_check_" + final_recipient).is(":checked")){
        $("#responsible_person_check_" + final_recipient).prop('checked', true)
      }
    }
  });

  var removed_recipients = $("#removed_recipients").val().split(",");
  removed_recipients.forEach(function(removed_recipient){
    if ($("#responsible_person_check_" + removed_recipient).length > 0){
      if ($("#responsible_person_check_" + removed_recipient).is(":checked")){
        $("#responsible_person_check_" + removed_recipient).prop('checked', false)
      }
    }
  });
}

function set_recipient(id) {
  var $box = $("#responsible_person_check_" + id);
  $(".responsible_select_text").removeClass('hide');
  $(".responsible_unselect_text").addClass('hide');
  if ($box.is(":checked")) {
    $("#final_recipients").val(id);
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    $(group).prop("checked", false);
    $box.prop("checked", true);
    $("#responsible_select_text_" + id).addClass('hide');
    $("#responsible_unselect_text_" + id).removeClass('hide');
  }
  else{
    $("#final_recipients").val(id);
  }
}