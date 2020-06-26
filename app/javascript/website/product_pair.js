$(document).ready(function(){

  $("#registerService").click(function(){
    $("#loader-image").show();
  });

  //show selling service form on clicking edit btn
  $(document).on("click", ".selling_service_edit", function(){
    var id = getId(this.id);
    $(this).addClass('hide');
    $("#selling_service_price_" + id).removeAttr('disabled');
    $("#selling_service_name_" + id).removeAttr('disabled');
    $("#selling_service_vat_" + id).addClass('hide');
    $("#selling_service_price_without_vat_" + id).addClass('hide');
    $("#selling_service_vat_combo_" + id).removeClass('hide');    
    $("#selling_service_save_" + id).removeClass('hide');
    $("#selling_service_cancel_" + id).removeClass("hide");
    $("#selling_service_remove_" + id).removeClass("hide");
  });
});