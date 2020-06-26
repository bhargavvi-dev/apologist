$(document).ready(function(){  
  makeMarketingPhotographsSortable();
  checkTotalPhotographsSelected();

  $("#marketingMaterialWindowCard, #marketingMaterialDirectMarketingLetter, #marketingMaterialInternetAd").on('shown.bs.modal', function(){
    makeMarketingPhotographsSortable(1);
  });

  $(document).on('click', '.marketing_material_change_toolbar_change_picture', function(){
    $("#chooseBrochurePictureTypeModalBack").attr("data-show_modal_id", $(this).data("back_btn_modal"));
    var url = $('.change_marketing_picture_url_photograph').attr('data-temp_url');
    if ($(this).data("channel_type") == "INTERNET_AD"){
      folder_type = "partner_photographs_web"
    }
    else{
      folder_type = "partner_photographs_print"
    }
    $(".change_marketing_picture_url_photograph").attr('href', url.replace(/replace_folder_type/g, folder_type).replace(/replace_resource_id/g, $(this).data('old_resource_id')).replace(/replace_material_id/g, $(this).data('material_id')).replace(/replace_channel_type/g, $(this).data('channel_type')).replace(/replace_back_show_modal_id/g, $(this).data('back_btn_modal')));
    var url = $('.change_marketing_picture_url_ground_floor').attr('data-temp_url');
    if ($(this).data("channel_type") == "INTERNET_AD"){
      folder_type = "partner_ground_floor_web"
    }
    else{
      folder_type = "partner_ground_floor_print"
    }
    $(".change_marketing_picture_url_ground_floor").attr('href', url.replace(/replace_folder_type/g, folder_type).replace(/replace_resource_id/g, $(this).data('old_resource_id')).replace(/replace_material_id/g, $(this).data('material_id')).replace(/replace_channel_type/g, $(this).data('channel_type')).replace(/replace_back_show_modal_id/g, $(this).data('back_btn_modal')));
  });

  $(document).on('click', '.mm_choose_folder_type_back_btn', function(){
    $('.modal').modal('hide');
    var modal_id = $(this).attr("data-show_modal_id");
    setTimeout(function(){
      $("#" + modal_id).modal('show');
    }, 750);
  });

  if (window.location.search.indexOf('commission_back=true') > -1){
    setTimeout(function(){
      $("#marketingMaterialStep4Modal").modal("show");
    }, 500);
  }
  else if (window.location.search.indexOf('save_upload_documents=true') > -1){
    setTimeout(function(){
      $('#OrderSuperintendentDocumentsSuccessModal').modal('show');
    }, 500);
  }
  else if (window.location.search.indexOf('commission_links_back=true') > -1){
    setTimeout(function(){
      $("#marketing_material_channel_specific_info_1").modal("show");
    }, 500);
  }
  else if (window.location.search.indexOf('change_brochure_picture_back=true') > -1){
    var modal_id = getUrlParameter('show_modal_id');
    setTimeout(function(){
      $("#" + modal_id).modal("show");
    }, 500);
  }

  $(document).on('click', '#returnToCreateMarketingMaterialStep4', function(){
    makeMarketingPhotographsSortable(0);
  });

  $(document).on("change", ".marketing_channel_check", function(){
    var marketing_channel = $(this).closest(".marketing_channel");
    $(marketing_channel).find(".marketing_channel_select_text, .marketing_channel_unselect_text").toggleClass('hide');
  });

  $(document).on('click', '.edit_presentation_text', function(){
    var edit_presentation_text_parent = $(this).closest(".edit_presentation_text_parent");
    $(edit_presentation_text_parent).find(".edit_presentation_text_label, .edit_presentation_text_field_ele").toggleClass('hide');
    var replace_btn = $(edit_presentation_text_parent).find(".replace_presentation_text");
    var save_btn = $(edit_presentation_text_parent).find(".save_presentation_text"); 
    if (replace_btn.prop('disabled')){
      replace_btn.prop('disabled', false);
      save_btn.prop('disabled', false);
    }
    else{
      replace_btn.prop('disabled', true);
      save_btn.prop('disabled', true);
    }
  });

  $(document).on('click', '.editPresentationTextBtn, .editAgentInfoBtn', function(){
    var modal_id = $(this).data("modal_id")
    $(".modal").modal("hide");
    setTimeout(function(){
      $(modal_id).modal("show");
    }, 500);
  });

  $(document).on('click', '.edit_presentation_text_field_close_modal', function(){
    $(".modal").modal("hide");
    setTimeout(function(){
      $("#marketingMaterialStep3Modal").modal("show");
    }, 500);
  });

  $(document).on('click', '#marketingChoosePhotoGraphsModalOpen', function(){
    $(".modal").modal("hide");
    setTimeout(function(){
      $("#marketingChoosePhotoGraphs").modal("show");
    }, 500);
  });

  $(document).on('click', '#marketingChoosePhotoGraphsModalClose', function(){
    $(".modal").modal("hide");
    setTimeout(function(){
      $("#marketingMaterialStep4").modal("show");
    }, 500);
  });

  $(document).on('click', '.edit_presentation_text_replace_default', function(){
    var edit_presentation_text_parent = $(this).closest(".edit_presentation_text_parent");
    $(edit_presentation_text_parent).find(".edit_presentation_text_label").text($("#default_edit_presentation_text").text());
    $(edit_presentation_text_parent).find(".edit_presentation_text_field").val($("#default_edit_presentation_text").text().trim());
  });

  $(document).on('change', '.market_agent_info_check', function(){
    var edit_agent_info_parent = $(this).closest(".market_agent_info_check_btns");
    $(edit_agent_info_parent).find(".market_agent_info_label").toggleClass('hide');
  });

  $(document).on('change', '.market_agent_photo_check', function(){
    var edit_agent_info_parent = $(this).closest(".market_agent_info_check_btns");
    $(edit_agent_info_parent).find(".market_agent_photo_label").toggleClass('hide');
  });

  $(document).on('change', '.market_other_agent_info_check', function(){
    var edit_agent_info_parent = $(this).closest(".market_other_agent_info_check_btns");
    $(edit_agent_info_parent).find(".market_agent_info_label").toggleClass('hide');
  });

  $(document).on('change', '.market_other_agent_photo_check', function(){
    var edit_agent_info_parent = $(this).closest(".market_other_agent_info_check_btns");
    $(edit_agent_info_parent).find(".market_agent_photo_label").toggleClass('hide');
  });

  $(document).on("click", ".email_resource_check", function(){
    var email_resource = $(this).closest(".email_resource");
    var count = $(".email_resource_check[type='checkbox']:checked").length;
    $(".update_confirmed_number").text(count)
    if ($(this).is(":checked")){
      $(this).parent().css('background','#EBF5FE')
      $('.save_selected_marketing_photographs').css('background','#004193')
      $(".save_selected_marketing_photographs").removeClass("disabled")
    }else{
      $(this).parent().css('background','')
      $('.save_selected_marketing_photographs').css('background','#696969')
      $(".save_selected_marketing_photographs").addClass("disabled")
    }
    $(email_resource).find(".email_resource_select_text").toggleClass('hide');
    $(email_resource).find(".email_resource_unselect_text").toggleClass('hide');
  });

  // make sure that proper elems are checked on filter/load-next
  $(document).on("click", ".marketing_photograph_check", function(){
    var form = $(this).closest('form');
    var marketing_photograph = $(this).closest(".marketing_photograph");
    $(marketing_photograph).find(".marketing_photograph_select_text").toggleClass('hide');
    $(this).closest('form').find(".final_marketing_photographs").attr("disabled", false);
    var id = getId(this.id);
    var final_marketing_photographs = $(this).closest('form').find(".final_marketing_photographs").val().split(",");
    var final_marketing_photograph_index = final_marketing_photographs.indexOf(id);
    //if checked
    photograph_check_ele = $(form).find("#marketing_photograph_check_" + id);
    if ($(photograph_check_ele).length > 0 && $(photograph_check_ele).is(":checked")) {
      if (final_marketing_photograph_index < 0){
        final_marketing_photographs.push(id);
      }
    }
    else {
      if (final_marketing_photograph_index > -1){
        final_marketing_photographs.splice(final_marketing_photograph_index, 1);
      }
    }
    final_marketing_photographs = final_marketing_photographs.filter(Boolean);
    $(this).closest('form').find(".final_marketing_photographs").val(final_marketing_photographs.join(","));
  });

  // remove marketing photograph on remove btn click
  $(document).on("click", ".remove_marketing_photograph", function(){
    //remove selected photograph from "Choose photographs"
    var id = getId(this.id);
    var marketing_photograph = $("#marketing_photograph_"+id);
    $(marketing_photograph).find(".marketing_photograph_select_text").toggleClass('hide');

    var final_marketing_photographs = $("#final_marketing_photographs").val().split(",");
    var final_marketing_photograph_index = final_marketing_photographs.indexOf(id);
    //if checked
    if ($("#marketing_photograph_check_" + id).is(":checked")) {
      $("#marketing_photograph_check_" + id).attr('checked', false);
      if (final_marketing_photograph_index > -1){
        final_marketing_photographs.splice(final_marketing_photograph_index, 1);
      }
    }
    final_marketing_photographs = final_marketing_photographs.filter(Boolean);
    $("#final_marketing_photographs").val(final_marketing_photographs.join(","));
    ///////////////////////////////////////////////////

    var marketing_photograph = $(this).closest(".show_marketing_photograph");
    $(marketing_photograph).addClass('hide');
    $(marketing_photograph).find(".destroy_marketing_photograph").val('1');
    var i = 1;
    $(".sortable_photographs_with_order_marketing li:not(.hide)").each(function(){
        $this = $(this);
        $this.find(".edit_resource_order").val(i);
        $this.find('.orderListing').text(i);
        i++;
    });
    checkTotalPhotographsSelected();
  });

  //edit marketing photograph share name
  $(document).on("click", ".edit_marketing_photograph_share_name_btn", function(){
    var marketing_photograph = $(this).closest(".show_marketing_photograph");
    $(marketing_photograph).find(".edit_marketing_photograph_share_name, .show_marketing_photograph_share_name").toggleClass('hide');
    $(marketing_photograph).find('.show_marketing_photograph_share_name').text($(marketing_photograph).find('.edit_marketing_photograph_share_name').val());
  });

  $(document).on('click', "#sales_brochure_previous_btn", function(){
    var current_page = $("#sales_brochure_current_page").text().trim();
    var updated_current_page = parseInt(current_page) - 1;
    updateSalesBrochureShowPages(updated_current_page);
  });

  $(document).on('click', "#sales_brochure_next_btn", function(){
    var current_page = $("#sales_brochure_current_page").text().trim();
    var updated_current_page = parseInt(current_page) + 1;
    updateSalesBrochureShowPages(updated_current_page)
  });


  // add new marketing price
  $("#add_marketing_new_price").click(function(){
    var marketing_new_price = $("#dummy_marketing_new_price").clone();
    var last_marketing_price = $("#marketing_new_prices .marketing_new_price:last").attr('id');
    if (last_marketing_price){
      var index = parseInt(getId(last_marketing_price)) + 1;
    }
    else{
      var index = 1;
    }
    marketing_new_price = marketing_new_price.html().replace(/replace_index/g, index).replace(/replace_param/g, "other_prices").replace(/replace_date/g, (new Date()).getTime()).replace(/replace_last_updated_label/g, '');
    if ($("#pc_browser").val() != 'true') {
      $("#marketing_new_prices").append(marketing_new_price).find('.virtualKeyboard').keyboard({
        layout: 'custom',
        restrictInput : true, 
        preventPaste : true,  
        autoAccept : true, 
        keyBinding: 'mousedown touchstart',   
        position: {
          of: null, 
          my: 'center top',
          at: 'center top',
          at2: 'center bottom', 
          collision: 'flipfit flipfit'
        } 
      });;
    }
  })

  $(document).on("click", ".remove_marketing_new_price", function(){
    $(this).closest(".marketing_new_price").remove();
  });

  // make sure that proper elems are checked on filter/load-next
  $(document).on("click", ".agent_office_user_check", function(){

    var agent_office_user = $(this).closest(".agent_office_user");
    $(agent_office_user).find(".select_text").toggleClass('hide');

    var id = getId(this.id);
    var add_agent_modal_user = $("#add_agent_modal_user").val();
    if (add_agent_modal_user == "MARKETING_APP"){
      final_agent_office_users_object = $("#final_agent_office_users");
    }
    else {
      final_agent_office_users_object = $("#final_agent_office_users_" + add_agent_modal_user.toLowerCase());
    }
    var final_agent_office_users = final_agent_office_users_object.val().split(",");
    var final_agent_office_user_index = final_agent_office_users.indexOf(id);
    //if checked
    if ($("#agent_office_user_check_" + id).is(":checked")) {
      if (final_agent_office_user_index < 0){
        final_agent_office_users.push(id);
      }
    }
    else {
      if (final_agent_office_user_index > -1){
        final_agent_office_users.splice(final_agent_office_user_index, 1);
      }
    }
    final_agent_office_users = final_agent_office_users.filter(Boolean);
    final_agent_office_users_object.val(final_agent_office_users.join(","));
  });

  // add new marketing video/presentation links
  $(document).on("click", "#add_new_marketing_video_presentation", function(){
    var dummy_object = $("#dummy_marketing_video_presentation").clone();
    var last_object = $("#marketing_video_presentations .marketing_video_presentation:last").attr('id');
    if (last_object){
      var index = parseInt(getId(last_object)) + 1;
    }
    else{
      var index = 1;
    }
    var new_object = dummy_object.html().replace(/replace_index/g, index).replace(/replace_param/g, "marketing_video_presentations");
    $("#marketing_video_presentations").append(new_object);
  })

  $(document).on("click", ".remove_marketing_video_presentation", function(){
    $(this).closest(".marketing_video_presentation").remove();
  });

  $(document).on("click", "#input_add_new_marketing_product_category", function(){
    $(this).addClass("hide");
    $("#marketing_product_category_2").removeClass('hide');
    $("#marketing_product_category_2 select").attr('disabled', false);
  });

  $(document).on("click", "#remove_marketing_product_category_2", function(){
    $("#input_add_new_marketing_product_category").removeClass("hide");
    $("#marketing_product_category_2").addClass('hide');
    $("#marketing_product_category_2 select").attr('disabled', true);
  });

  $(document).on("click", ".add_agent_marketing_app", function(){
    var add_agent_modal_user = $(this).data('modal_user');
    $("#add_agent_modal_user").val(add_agent_modal_user);
    if (add_agent_modal_user == "MARKETING_APP"){
      final_agent_office_users_object = $("#final_agent_office_users");
      $("#closeAddAgentModal").data('show_modal_id', 'marketingMaterialStep1Modal');
      $("#add_agent_show_modal").val('marketingMaterialStep1Modal');
    }
    else {
      final_agent_office_users_object = $("#final_agent_office_users_" + add_agent_modal_user.toLowerCase());
      $("#closeAddAgentModal").data('show_modal_id', "edit_agent_info_" + add_agent_modal_user.toLowerCase());
      $("#add_agent_show_modal").val("edit_agent_info_" + add_agent_modal_user.toLowerCase());
    }
    $(".final_agent_office_users").attr('disabled', true);
    final_agent_office_users_object.attr('disabled', false);

    checkUncheckAgentOfficeUsers();
  });

  $(document).on("keyup click change", "#marketing_debt_free_price, #marketing_debt_amount", function(){
    var total_charges = 0;
    debt_price = $("#marketing_debt_free_price").val();
    debt_amount = $("#marketing_debt_amount").val();
    reviewed_sq_area = $("#reviewed_sq_area").val();
    aoa_sq_area = $("#aoa_sq_area").val();
    if (debt_price){
      debt_price = checkNumericValue(debt_price);
    }
    if (debt_amount){
      debt_amount = checkNumericValue(debt_amount);
    }
    if (debt_price && debt_amount == ""){
      var total_charges = debt_price - 0
      val = $("#total_marketing_price").val(total_charges);
      $("#marketing_debt_amount").val("0");
      $("#total_marketing_price").val(addThousandSeparators($("#total_marketing_price").val().replace(".",",")));
      setValuesForMarketingPrice(reviewed_sq_area, aoa_sq_area);
    }
    else if(debt_amount && debt_price){
      var total_charges = Math.round((debt_price - debt_amount)*100)/100;
      val = $("#total_marketing_price").val(total_charges);
      $("#total_marketing_price").val(addThousandSeparators($("#total_marketing_price").val().replace(".",",")));
      setValuesForMarketingPrice(reviewed_sq_area, aoa_sq_area);
    }
    else{
      $("#total_marketing_price").val("0");
      setValuesForMarketingPrice(reviewed_sq_area, aoa_sq_area);
    }
  });

  //index the inspector comments
  $('.comments').on('cocoon:after-insert', function(e, insertedItem) {
    //as the ele is already inserted, we just need to find total no of comments
    $(insertedItem).find('.comment_number').text($(insertedItem).closest('.comments').find('.comment').length);
    updateQualityCheckBtns($(insertedItem).closest('.comments'));
  });

  $('.comments').on('cocoon:before-remove', function(e, removingItem) {
    $(removingItem).find('.marketing_material_recommendation_type').addClass('removingItem')
    updateQualityCheckBtns($(removingItem).closest('.comments'));
  });

  $(document).on('click', '.marktingMaterialShowModalBtn', function(){
    modal_close_btn = $('.modal').find('.CloseMarketingModal');
    check_modal_opened = $('.modal').find('#check_modal_opend_from_another_modal');
    check_modal_opened.val("false");
    modal_close_btn.addClass('hide');
    $('.modal').find('.CloseMarketingMaterialModalBtn').removeClass('hide');
  });

  $(document).on('click', '.marketing_materialupdate_presentation_text', function(){
    var edit_presentation_text_parent = $(this).closest(".edit_presentation_text_parent");
    var commission_id = $('#selling_commission_id').val(); 
    var property_presentation_text = $(edit_presentation_text_parent).find(".edit_presentation_text_field").val();
    var channel_type = $(edit_presentation_text_parent).find(".marketing_channel_type_presentation_text").val();
    var notice_id = $(edit_presentation_text_parent).find(".notice_id").val();
    var t;
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      $.ajax({
        url: '/agent_office/commissions/'+ commission_id +'/update_marketing_material_presentation_text',
        type: 'PUT',
        data: {notice_id : notice_id, property_presentation_text : property_presentation_text, channel_type : channel_type, id : commission_id}
      });
    }, 100);
  });

  $(document).on("change", ".change_marketing_photograph_check", function(){
    var is_checked = $(this).is(":checked");
    var parentEl = $(this).closest('.MarketingChangePhotographs');
    parentEl.find('input[type=checkbox]').prop('checked', false);
    parentEl.find('.change_marketing_photograph_select_text').removeClass('hide');
    parentEl.find('.change_marketing_photograph_unselect_text').addClass('hide');
    if (is_checked){
      $(this).prop("checked", true);
      $(this).closest('.change_marketing_photograph').find('.change_marketing_photograph_select_text').addClass('hide');
      $(this).closest('.change_marketing_photograph').find('.change_marketing_photograph_unselect_text').removeClass('hide');
    }
  });

  $(document).on("change", '#product_categories_viewing_viewing_type', function(){
    if ($(this).val() == "FIRST_VIEWING" || $(this).val() == "OPEN_VIEWING" ){
      $('#product_category_date').removeClass('hide');
    }
    else{
      $('#product_category_date').addClass('hide');
      $('#product_category_date').val('');
    }
  });

  $(document).on("change", ".marketing_material_recommendation_type", function(){
    updateQualityCheckBtns($(this).closest('.comments'));
  });

  $(document).on("click", ".save_marketing_new_price", function(){
    var commission_id = $('#commission_id').val();
    var commission_type = $('#commission_type').val();
    var parentEl = $(this).closest('.marketing_new_price');
    var markting_price_date = $(parentEl).find('.marketing_new_price_date').val();
    var index = $(parentEl).find('.marketing_new_price_index').val();
    var notice_id = $(parentEl).find('.notice_id').val();

    var base_data = {id : commission_id, commission_type: commission_type, index : index, date : markting_price_date, notice_id : notice_id}

    if (commission_type == "C_RENT"){
      var security_deposit_type = $(parentEl).find("input:radio.security_deposit_type:checked").val();
      var security_deposit_months = $(parentEl).find('.security_deposit_months').val();
      var rent_amount = $(parentEl).find('.rent_amount').val();
      var security_deposit_amount = $(parentEl).find('.security_deposit_amount').val();
      var fixed_security_deposit_amount = $(parentEl).find('.fixed_security_deposit_amount').val();
      data = {security_deposit_type : security_deposit_type, security_deposit_months : security_deposit_months, rent_amount : rent_amount, security_deposit_amount: security_deposit_amount, fixed_security_deposit_amount: fixed_security_deposit_amount}
    }
    else if (commission_type == "BUY"){
      var price_start = $(parentEl).find(".price_start").val();
      var price_end = $(parentEl).find(".price_end").val();
      data = {price_start: price_start, price_end: price_end}
    }
    else{
      var other_debt_free_price = $(parentEl).find('.other_debt_free_price').val();
      var other_debt_amount_price = $(parentEl).find('.other_debt_amount_price').val();
      var other_debt_selling_price = $(parentEl).find('.other_debt_selling_price').val();
      data = {debt_free_price_per_m2 : other_debt_free_price, debt_amount_per_m2 : other_debt_amount_price, selling_price_per_m2 : other_debt_selling_price}
    }

    var t;
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      $.ajax({
        url: '/agent_office/commissions/'+ commission_id +'/add_new_marketing_price',
        type: 'PUT',
        data: Object.assign(base_data, data)
      });
    }, 100);
  });

  $(document).on('keyup click change', '.other_debt_free_price', function(){
    var debt_price = $(this).val();
    var parentEl = $(this).closest('.marketing_new_price');
    var debt_amnt = $(parentEl).find('.other_debt_amount_price').val();
    var selling_price = $(parentEl).find('.other_debt_selling_price');
    if (debt_price){ 
      debt_price = checkNumericValue(debt_price);
    }
    if(debt_amnt){
      debt_amnt = checkNumericValue(debt_amnt);
    }
    if (debt_price && debt_amnt){
      $(selling_price).val(Math.round((debt_price - debt_amnt)*100)/100);
      $(selling_price).val($(parentEl).find('.other_debt_selling_price').val().replace(".",","));
    }
    else if (debt_price && debt_amnt == '') {
      $(selling_price).val(debt_price - 0); 
      $(selling_price).val($(parentEl).find('.other_debt_selling_price').val().replace(".",","));
    }
    else{
      $(selling_price).val("0");
    }
  });

  $(document).on('keyup click change', '.other_debt_amount_price', function(){
    var debt_amnt = $(this).val();
    var parentEl = $(this).closest('.marketing_new_price');
    var debt_price = $(parentEl).find('.other_debt_free_price').val();
    var selling_price = $(parentEl).find('.other_debt_selling_price');
    if (debt_price){ 
      debt_price = checkNumericValue(debt_price);
    }
    if(debt_amnt){
      debt_amnt = checkNumericValue(debt_amnt);
    }
    if (debt_price && debt_amnt){
      $(selling_price).val(Math.round((debt_price - debt_amnt)*100)/100);
      $(selling_price).val($(parentEl).find('.other_debt_selling_price').val().replace(".",","));
    }
    else if (debt_price && debt_amnt == '') {
      $(selling_price).val(debt_price - 0); 
      $(selling_price).val($(parentEl).find('.other_debt_selling_price').val().replace(".",","));
    }
    else{
      $(selling_price).val("0");
    }
  });

  $(document).on('click', '#marketingStep4Btn', function(){
    checkTotalPhotographsSelected(true);
  });

});

function setValuesForMarketingPrice(reviewed_sq_area, aoa_sq_area){
  if (aoa_sq_area > 0){
    aoa_deb_price = Math.round((debt_price/aoa_sq_area)*100)/100;
    aoa_debt_amount = Math.round((debt_amount/aoa_sq_area)*100)/100;
    if ($("#aoa_debt_free_price").length > 0){
      $("#aoa_debt_free_price").val(aoa_deb_price);
      $("#aoa_debt_free_price").val($("#aoa_debt_free_price").val().replace(".",","));
    }
    if ($("#aoa_debt_amount_price").length > 0){
      $("#aoa_debt_amount_price").val(aoa_debt_amount);
      $("#aoa_debt_amount_price").val($("#aoa_debt_amount_price").val().replace(".",","));
    }
    var total_aoa_price = Math.round((aoa_deb_price - aoa_debt_amount)*100)/100;
    if ($("#aoa_debt_selling_price").length > 0){
      val = $("#aoa_debt_selling_price").val(total_aoa_price);
      $("#aoa_debt_selling_price").val($("#aoa_debt_selling_price").val().replace(".",","));
    }
  }
  else{
    $("#aoa_debt_selling_price").val("0");
  }
  if(reviewed_sq_area > 0){
    reviewed_debt_price =  Math.round((debt_price/reviewed_sq_area)*100)/100;
    reviewed_debt_amount =  Math.round((debt_amount/reviewed_sq_area)*100)/100;
    $("#reviewed_debt_free_price").val(reviewed_debt_price);
    $("#reviewed_debt_free_price").val($("#reviewed_debt_free_price").val().replace(".",","));
    $("#reviewed_debt_amount_price").val(reviewed_debt_amount);
    $("#reviewed_debt_amount_price").val($("#reviewed_debt_amount_price").val().replace(".",","));
    var total_reviewed_price = Math.round((reviewed_debt_price - reviewed_debt_amount)*100)/100;
    val = $("#reviewed_debt_selling_price").val(total_reviewed_price);
    $("#reviewed_debt_selling_price").val($("#reviewed_debt_selling_price").val().replace(".",","));
  }
  else{
    $("#reviewed_debt_selling_price").val("0");
  }
}

function updateQualityCheckBtns(comments){
  var comment_types = $(comments).find('.marketing_material_recommendation_type');
  var must_fix_comment_present = false
  $.each(comment_types, function(index, comment_type){
    if ($(comment_type).val() == "MUST_FIX" && !$(comment_type).hasClass('removingItem')){
      must_fix_comment_present = true;
    }
  })
  if (must_fix_comment_present){
    $('.material_quality_card_btn').removeClass('hide');
    $('.material_approve_btn').addClass('hide');
    $('.material_quality_card_btn').attr('disabled', false);
    $('.material_approve_btn').attr('disabled', true);
  }
  else{
    $('.material_quality_card_btn').addClass('hide');
    $('.material_approve_btn').removeClass('hide');
    $('.material_quality_card_btn').attr('disabled', true);
    $('.material_approve_btn').attr('disabled', false);
  }
}

function set_marketing_photographs(id){
  var $box = $("#change_marketing_photograph_check_" + id);
  $(".change_marketing_photograph_unselect_text").addClass('hide');
  $(".change_marketing_photograph_select_text").removeClass('hide');
  if ($box.is(":checked")) {
    $("#final_update_marketing_photographs").val(id);
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    $(group).prop("checked", false);
    $box.prop("checked", true);
    $("#marketing_photograph_select_text_" + id).addClass('hide');
    $("#marketing_photograph_unselect_text_" + id).removeClass('hide');
  } 
}

function checkTotalPhotographsSelected(submited = false){
  total_pictures_required = $('#total_no_of_marketing_pictures').val();
  total_pictures = $('.sortable_photographs_with_order_marketing li:not(.hide)').size();
  $('#marketingStep4Btn').attr('type', 'submit');
  // if(total_pictures >= total_pictures_required){
  //   //$('#marketingStep4Btn').attr('disabled', false);
  //   $('#marketingStep4Btn').attr('type', 'submit');
  // }
  // else{
  //   $('#marketingStep4Btn').attr('type', 'button');
  //   if (submited){
  //     setFlashMessage("marketingChoosePhotoGraphsNotice", "marketingChoosePhotoGraphsFlash", I18n.t("js.general.task.please_select_minimum_photographs"));
  //     SetFocusOnTopOfPage();
  //   }
  // }

}

function updateSalesBrochureShowPages(current_page){
  if ($("#sales_brochure_page_" + current_page).length > 0){
    $(".sales_brochure_page").addClass("hide");
    $("#sales_brochure_page_" + current_page).removeClass("hide");
    $("#sales_brochure_current_page").text(current_page);

    $(".brochure_step_content").addClass("hide");
    $("#brochure_step_content_" + current_page).removeClass("hide");
  }
}

function checkUncheckMarketingPhotographs() {
  var final_marketing_photographs = $("#final_marketing_photographs").val().split(",");
  final_marketing_photographs.forEach(function(final_marketing_photograph){
    if ($("#final_marketing_photograph_" + final_marketing_photograph).length > 0){
      if (!$("#marketing_photograph_check_" + final_marketing_photograph).is(":checked")){
        $("#marketing_photograph_check_" + final_marketing_photograph).prop('checked', true)
      }
    }
  });
}

function makeMarketingPhotographsSortable(add_index=0){
  $(".sortable_photographs_with_order").sortable({
    stop : function(event, ui) {
      var parentEl = $(ui.item).closest('.sortable_photographs_with_order');
      $.each($(parentEl).find('li:not(.hide)'), function(index, ele){
        $(ele).find(".edit_resource_order").val(index+1+add_index);
        $(ele).find('.orderListing').text(index+1+add_index);
      });
      },
      axis : 'y'
  });
  $(".sortable_photographs_with_order").disableSelection();
}

function checkUncheckAgentOfficeUsers() {
  var add_agent_modal_user = $("#add_agent_modal_user").val();
  if (add_agent_modal_user == "MARKETING_APP"){
    final_agent_office_users_object = $("#final_agent_office_users");
  }
  else {
    final_agent_office_users_object = $("#final_agent_office_users_" + add_agent_modal_user.toLowerCase());
  }
  $(".agent_office_user_check").prop('checked', false);
  var final_agent_office_users = final_agent_office_users_object.val().split(",");
  final_agent_office_users.forEach(function(final_agent){
    if ($("#agent_office_user_check_" + final_agent).length > 0){
      if (!$("#agent_office_user_check_" + final_agent).is(":checked")){
        $("#agent_office_user_check_" + final_agent).prop('checked', true);
        $("#agent_office_user_check_" + final_agent).closest(".agent_office_user").find(".select_text").toggleClass('hide');
      }
    }
  });
}