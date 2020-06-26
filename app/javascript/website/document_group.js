$(document).ready(function(){

  $(document).on('click', '.doc_image_loader', function(){
    $("#doc-image-loader").show();
  });  

  //show document group form on clicking edit group btn
  $(document).on("click", ".document_group_edit", function(){
    var id = getId(this.id);
    $("#document_group_lbl_"+ id).addClass('hide');
    $("#document_group_form_" + id).removeClass('hide');
  });

  //hide document group form on clicking cancel btn
  $(document).on("click", ".document_group_cancel", function(){
    hideDocumentGroupForm(getId(this.id));
  });

  //remove the create document_group/document form when clicked on remove btn
  $(document).on("click", ".document_group_new_remove, .document_new_remove", function(){
    $("#" + getId(this.id)).remove();
  });

  //enable filename box and show save,cancel and remove btns document on clicking edit documment btn
  $(document).on("click", ".document_edit", function(){
    var id = getId(this.id);
    $(this).addClass('hide');
    $("#document_name_" + id).removeClass("hide");
    $("#document_file_" + id).addClass("hide");
    $("#document_form_" + id).removeClass("hide");
    $("#document_remove_" + id).removeClass("hide");
    $("#document_cancel_" + id).removeClass("hide");
  });

  $(document).on("change", ".groupDocumentMedia", function(){
    var id = getId(this.id);
    $.each(this.files, function() {
      readURL(this, id);
    });
  });

});

function readURL(file, id) {
  var reader = new FileReader();
  reader.onload = function(e) {
    $("#groupDocumentMediaFileName_" + id).val(file.name);
  }
  reader.readAsDataURL(file);
}

function hideDocumentGroupForm(id) {
  $("#document_group_lbl_" + id).removeClass('hide');
  $("#document_group_form_" + id).addClass('hide');
}

function hideDocumentForm(id) {
  $("#document_edit_" + id).removeClass('hide');
  $("#document_name_" + id).addClass("hide");
  $("#document_file_" + id).removeClass("hide");
  $("#document_form_" + id).addClass("hide");
  $("#document_remove_" + id).addClass("hide");
  $("#document_cancel_" + id).addClass("hide");
}