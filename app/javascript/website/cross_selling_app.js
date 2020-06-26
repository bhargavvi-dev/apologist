$(document).ready(function(){

  if($('#get_brand_property_results').val() == "true"){
    $('#get_brand_property_results_listing').html(' ');
    $('.pre-icon').show();
    setTimeout(function(){
      $('.get_brand_property_results_btn').closest('form').submit();
      $('.pre-icon').hide();
    }, 500);
  }
  if($('#get_brand_completed_listings_results').val() == "true"){
    $('#get_brand_completed_results_listing').html(' ');
    $('.pre-icon').show();
    setTimeout(function(){
      $('.get_brand_completed_results_btn').closest('form').submit();
      $('.pre-icon').hide();
    }, 500);
  }

  $(document).on('click', '.get_brand_property_results_btn', function(){
    $('#get_brand_property_results_listing').html(' ');
    $('.get_brand_property_results_save_btn').click();
    $('.pre-icon').show();
    setTimeout(function(){
      $(this).closest('form').submit();
      $('.pre-icon').hide();
    }, 500);
  });
  $(document).on('click', '.get_brand_completed_results_btn', function(){
    $('#get_brand_completed_results_listing').html(' ');
    $('.get_brand_completed_results_save_btn').click();
    $('.pre-icon').show();
    setTimeout(function(){
      $(this).closest('form').submit();
      $('.pre-icon').hide();
    }, 500);
  });
});