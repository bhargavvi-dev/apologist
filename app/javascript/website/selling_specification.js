$(document).ready(function(){
  $(document).on("change", ".room_premise_check", function(){
    var id = getId(this.id);
    if (this.checked) {
      var parentEl = $(this).closest('.RoomPremises');
      text_field = parentEl.find('.room_amount').val("1");
      text_field.attr('disabled', false);
      set_unselect_text("#room_premise_select_text_" + id, "#room_premise_unselect_text_" + id);
    }
    else {
      var parentEl = $(this).closest('.RoomPremises');
      text_field = parentEl.find('.room_amount').val("");
      text_field.attr('disabled', true);
      set_select_text("#room_premise_select_text_" + id, "#room_premise_unselect_text_" + id);
    }
  });

  //remove room premise on click
  $(document).on("click", ".s_remove_room_premise", function(){
    var parent_ele = $(this).closest(".s_room_premise");
    $(parent_ele).remove();
  });

  $(document).on("click", ".s_remove_room_premise_name", function(){
    var parent_ele = $(this).closest(".s_room_premise");
    room_premise_name_text_field = $(parent_ele).find(".room_premise_name").val();
    if (room_premise_name_text_field != ''){
      $(parent_ele).find(".room_premise_title").text(room_premise_name_text_field);
    }else{
      default_name = (parent_ele).find("#default_name").val()
      $(parent_ele).find(".room_premise_title").text(default_name);
    }
  });


  //edit room premise name
  $(document).on("click", ".s_edit_room_premise_name", function(){
    var parent_ele = $(this).closest(".s_room_premise");
    room_premise_name_text_field = $(parent_ele).find(".room_premise_name");
    room_premise_title_text = $(parent_ele).find(".room_premise_title");
    add_room_premise = $(parent_ele).find("#add_room_premise");
    remove_room_premise = $(parent_ele).find("#remove_room_premise");
    $(add_room_premise).toggleClass("hide");
    $(remove_room_premise).toggleClass("hide");
    $(room_premise_name_text_field).toggleClass("hide");
    $(room_premise_title_text).toggleClass("hide");
    $(room_premise_name_text_field).focus();
    // $(room_premise_name_text_field).removeClass("hide");
    // $(room_premise_title_text).addClass("hide");
  }); 
})