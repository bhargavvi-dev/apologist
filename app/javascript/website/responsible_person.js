$(document).ready(function() {

  $(document).on("click", "#responsiblePersonSave", function(){
    $("#register-responsible-person").submit();
  });

  //when office is clicked , update the param array, set select/unselect text
  $(document).on("click", ".responsible_person_office", function(){
    var id = getId(this.id); 
    //if checked
    if ($("#responsible_person_office_check_" + id).is(":checked")) {
      //add to the actual param
      addIdToArray("selected_responsible_person_offices", id);
      // update to unselect text
      set_unselect_text("#responsible_office_select_text_" + id, "#responsible_office_unselect_text_" + id);
    }
    else {
      // remove from actual param
      removeIdFromArray("selected_responsible_person_offices", id);
      // update to select text
      set_select_text("#responsible_office_select_text_" + id, "#responsible_office_unselect_text_" + id);
    }
  });

  //when agent is clicked , update the param array, set select/unselect text
  $(document).on("click", ".responsible_person_agent", function(){
    var id = getId(this.id);
    //if checked
    if ($("#responsible_person_agent_check_" + id).is(":checked")) {
      //add to the actual param
      addIdToArray("selected_responsible_person_agents", id);
      // update to unselect text
      set_unselect_text("#responsible_agent_select_text_" + id, "#responsible_agent_unselect_text_" + id);
    }
    else {
      // remove from actual param
      removeIdFromArray("selected_responsible_person_agents", id);
      // update to select text
      set_select_text("#responsible_agent_select_text_" + id, "#responsible_agent_unselect_text_" + id);
    }
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

// set responsible persons to filtered/retrieved offices
// called when offices are filtered or next offices are called
// grab the already selected  offices from the "selected_responsible_person_offices" and check if it has any office in
// retrieved offices, if any then check it true and update its text
function set_responsible_person_filtered_offices() {
  var idArr = $("#selected_responsible_person_offices").val().split(",");
  $('.responsible_person_office_check').prop('checked', false);
  $('.responsible_office_select_text').removeClass('hide');
  $('.responsible_office_unselect_text').addClass('hide');
  for(var i=0; i<idArr.length; i++){
    var id = idArr[i];
    // check if the current showed office has this office included
    if ($("#responsible_person_office_check_" + id).length > 0) {
      $("#responsible_person_office_check_" + id).prop('checked', true);
      set_unselect_text("#responsible_office_select_text_" + id, "#responsible_office_unselect_text_" + id);
    }
  }
}

// set responsible persons to filtered/retrieved agents
// called when agents are filtered or next agents are called
// grab the already selected  agents from the "selected_responsible_person_agents" and check if it has any agent in
// retrieved agents, if any then check it true and update its text
function set_responsible_person_filtered_agents() {
  var idArr = $("#selected_responsible_person_agents").val().split(",");
  $('.responsible_person_agent_check').prop('checked', false);
  $('.responsible_agent_select_text').removeClass('hide');
  $('.responsible_agent_unselect_text').addClass('hide');
  for(var i=0; i<idArr.length; i++){
    var id = idArr[i];
    // check if the current showed agents has this agent included
    if ($("#responsible_person_agent_check_" + id).length > 0) {
      $("#responsible_person_agent_check_" + id).prop('checked', true);
      set_unselect_text("#responsible_agent_select_text_" + id, "#responsible_agent_unselect_text_" + id);
    }
  }
}

// remove an id from holder and update it
function removeIdFromArray(holderId, id) {
  var idArr = $("#" + holderId).val()
  idArr = idArr ? idArr.split(",") : [];
  var index = idArr.indexOf(id);
  if (index > -1) {
    idArr.splice(index, 1);
    $("#" + holderId).val(idArr.join(","));
  }
}

// add an id to holder and update it
function addIdToArray(holderId, id) {
  var idArr = $("#" + holderId).val()
  idArr = idArr ? idArr.split(",") : [];
  var index = idArr.indexOf(id);
  if (index < 0) {
    idArr.push(id);
    $("#" + holderId).val(idArr.join(","));
  }
}