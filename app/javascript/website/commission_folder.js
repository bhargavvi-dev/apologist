$(document).ready(function(){

  $(document).on('click', '.select_only_one', function(){
    if ($(this).is(":checked")){
      $(this).closest('.parent_list').find('.select_only_one').prop("checked", false);
      $(this).prop("checked", true);
    }
  });
  $(document).on('click', '.parentCheckBox', function(){
    $(this).parents('fieldset:eq(0)').find('.childCheckBox').prop('checked', this.checked);
  });

  $(document).on('click', '.update_selected_marketing_photographs', function(){
    var pathArray = window.location.pathname.split( '/' );
    var folder_type = pathArray[pathArray.length-1];
    var parentEl = $('#'+folder_type+'_docs');
    var commission_id = $('.commission_folder_commission_id').val();
    var total_resource_ids = [];

    var page_no = getUrlParameter('page_no');
    var picture_no = getUrlParameter('picture_no');
    var old_resource_id = getUrlParameter('old_resource_id');
    var channel_type = getUrlParameter('channel_type');
    var show_modal_id = getUrlParameter('show_modal_id');
    var back_show_modal_id = getUrlParameter('back_show_modal_id');
    var material_id = getUrlParameter('material_id');

    var send_by_email_checks = $(parentEl).find('.send_by_email:checked');
    for (var i = 0; i < send_by_email_checks.length; i++) {
      send_by_email_check = send_by_email_checks[i];
      total_resource_ids.push($(send_by_email_check).val())
    }

    $('.pre-icon').show();

    $.ajax({
      url: '/agent_office/commissions/'+commission_id+'/change_brochure_picture',
      method: 'PUT',
      data: { 'id': commission_id,
              'show_modal': show_modal_id,
              'notice_id': 'choose_marketing_photographs_notice',
              'page_no': page_no,
              "picture_no": picture_no,
              "old_resource": old_resource_id,
              "new_picture": total_resource_ids.join(','),
              "channel_type": channel_type,
              "change_marketing_picture": true,
              "back_show_modal_id": back_show_modal_id,
              "material_id": material_id
            },
      success: function(result){
        if (result['success'] == true){
          redirectTo(result['url']);
        }
      }
    });
  });


  $(document).on('click', '.save_selected_marketing_photographs', function(){
    var pathArray = window.location.pathname.split( '/' );
    var folder_type = pathArray[pathArray.length-1];
    var parentEl = $('#'+folder_type+'_docs');
    var commission_id = $('.commission_folder_commission_id').val();
    var commission_type = $('.commission_folder_commission_type').val();
    var total_resource_ids = [];

    var send_by_email_checks = $(parentEl).find('.send_by_email:checked');
    for (var i = 0; i < send_by_email_checks.length; i++) {
      send_by_email_check = send_by_email_checks[i];
      total_resource_ids.push($(send_by_email_check).val())
    }

    if (commission_type == "estimate"){
      var DataUrl = '/agent_office/commission/estimations/'+commission_id+'/create_price_appraisal_report';
      var DataValue = {'id': commission_id, 'marketing_photographs': total_resource_ids[total_resource_ids.length-1], 'commission_referral': true};
    }
    else{
      var DataUrl = '/agent_office/commissions/'+commission_id+'/choose_marketing_photographs';
      var DataValue = {'id': commission_id, 'show_modal': 'marketingMaterialStep4Modal', 'notice_id': 'choose_marketing_photographs_notice', 'final_marketing_photographs': total_resource_ids.join(","), 'commission_referral': true};
    }
    $('.pre-icon').show();

    $.ajax({
      url: DataUrl,
      method: 'PUT',
      data: DataValue,
      success: function(result){
        if (result['success'] == true){
          redirectTo(result['url']);
        }
      }
    });
  });

  $(document).on('click', '.save_selected_marketing_links', function(){
    var partner_videos_links = false;
    var pathArray = window.location.pathname.split( '/' );
    var folder_type = pathArray[pathArray.length-1];
    var parentEl = $('#'+folder_type+'_docs');
    var commission_id = $('.commission_folder_commission_id').val();
    var resource_path_and_name = {};
    var total_resources = [];
    if (folder_type == "partner_videos_links"){
      partner_videos_links = true;
    }

    var send_by_email_checks = $(parentEl).find('.send_by_email:checked');
    for (var i = 0; i < send_by_email_checks.length; i++) {
      send_by_email_check = send_by_email_checks[i];
      resource_id = $(send_by_email_check).val()
      parentEl = $(send_by_email_check).closest('.parent_check_commission_resource');
      resource_name = $(parentEl).find('.check_email_resource_name').val();
      resource_path = $(parentEl).find('.check_email_resource_name').data("resource_path");
      if (resource_path_and_name[resource_id]){
        resource_path_and_name[resource_id].push({'name': resource_name, 'url': resource_path})
      }else{
        resource_path_and_name[resource_id] = {'name': resource_name, 'url': resource_path}
      }
      total_resources.push(resource_id)
    }
    $('.pre-icon').show();
    $.ajax({
      url: '/agent_office/commissions/'+commission_id+'/update_marketing_material_video_links',
      method: 'PUT',
      data: {'id': commission_id, 'final_marketing_links': total_resources, 'partner_videos_links': partner_videos_links, 'resources': resource_path_and_name},
      success: function(result){
        if (result['success'] == true){
          redirectTo(result['url']);
        }
      }
    });

  });

  $(document).on("change", ".commission_folder_resources_order", function(){
    var filterEl = $(this).closest('.filter');
    var parentEl = $(this).closest('.parent');
    var current_order  = $(this).val();
    var previous_order = $(filterEl).find('.current_order').val();
    if (previous_order != current_order){
      $(filterEl).find('.current_order').val(current_order);
      var folder_type = $(filterEl).find('.folder_type').val();
      if (folder_type == "marketing_material_documents"){
        var list = $(parentEl).find('.material_public_version_list');
        var listItems = list.children('.material_public_version_info');
        list.append(listItems.get().reverse());
      }
      else{
        var list = $(parentEl).find('.resource_list');
        var listItems = list.children('.resource');
        list.append(listItems.get().reverse());
      }
    }
  });

  $(document).on("change", ".commission_folder_resource_spec", function(){
    var parentEl = $(this).closest('.parent');
    var associate_type, associate_id = ''
    var selected = $(this).find('option:selected');
    $(parentEl).find('.media_attachment_name').val(selected.text().trim());
    $(parentEl).find('.resource_spec_name').val(selected.data('name'));
    associate_type = selected.data('associate_type');
    var associate_id = selected.data('associate_id');
    if (associate_type && associate_id){
      $(parentEl).find('.resource_associate_type').val(associate_type);
      $(parentEl).find('.resource_associate_id').val(associate_id);
    }
  });

  $(document).on("click", ".openClosePanel", function(){
    var toggle_id = $(this).data('show_modal_id');
    $(this).parent().parent().find("#"+toggle_id).toggleClass("hide");
    $(this).find(".show_selected_office_commission_information_arrow").toggleClass("hide");
  });

  //show document group form on clicking edit group btn
  $(document).on("click", ".commission_folder_edit", function(){
    var id = getId(this.id);
    $("#commission_folder_lbl_"+ id).addClass('hide');
    $("#commission_folder_form_" + id).removeClass('hide');
  });

  //remove the create commission folder form when clicked on remove btn
   $(document).on("click", ".commission_folder_new_remove", function(){
     $("#" + getId(this.id)).remove();
   });

  //enable filename box and show save,cancel and remove btns on clicking edit commission folder btn
  $(document).on("click", ".commission_folder_edit", function(){
    var id = getId(this.id);
    $(this).addClass('hide');
    $("#commission_folder_name_" + id).removeClass("hide");
    $("#commission_folder_file_" + id).addClass("hide");
    $("#commission_folder_form_" + id).removeClass("hide");
    $("#commission_folder_remove_" + id).removeClass("hide");
    $("#commission_folder_cancel_" + id).removeClass("hide");
  });

  $(document).on("change", ".CommissionMedia", function(){
    var id = getId(this.id);
    $.each(this.files, function() {
      readCommissionURL(this, id);
    });
  });

  $(document).on("click", ".check_commission_resources_ids", function(){
    var parentEl = $(this).closest('.parent');
    checkSelectedCommissionResources(parentEl);
    var folder_type = $(parentEl).find('.resource_folder_type').val()
    var sub_folder_type = $(parentEl).find('.resource_sub_folder_type').val()
    $('#commission_folder_type').val(folder_type)
    $('#commission_sub_folder_resources').val(sub_folder_type)
    var visit_report_id = $(parentEl).find('.visit_report_id').val();
    if (visit_report_id){
      $('#commission_folder_visit_report_id').val(visit_report_id);
      var path = $(parentEl).find('.visit_report_id').data('pdf_download_path');
      var name = I18n.t("js.general.task.visit_report");
      $("#show_selected_resources").append("<li class='form-group'><a href='"+path+"'>"+name+"</a></li>");
    }
  });

  $(document).on("click", ".check_commission_offers_ids", function(){
    var parentEl = $(this).closest('.parent');
    var send_by_email_checks = $(parentEl).find('.send_by_email:checked');
    total_offer_pdfs = [];
    total_offer_ids = [];
    $('#send_commission_offers_ids').val('');
    $('#offer_type_premilinary_agreement_status').val('');
    for (var i = 0; i < send_by_email_checks.length; i++) {
      send_by_email_check = send_by_email_checks[i];
      total_offer_ids.push($(send_by_email_check).val())
      pdf_name = $(parentEl).find('.check_email_offer_pdf_name');
      total_offer_pdfs.push(pdf_name);
    }
    $('#send_commission_offers_ids').val(total_offer_ids.join(","));
    var status = (parentEl).find('.preliminary_agreement_status_type').val();
    if (status){
      $('#offer_type_premilinary_agreement_status').val(status);
    }
    $("#show_selected_offers_pdfs").html(' ');
    $.each(total_offer_ids, function(index, offer_id){
      name = $("#email_offer_pdf_id_"+offer_id).val();
      path = $("#email_offer_pdf_id_"+offer_id).data("pdf_path");
      $("#show_selected_offers_pdfs").append("<li class='form-group'><a href='"+path+"'>"+name+"</a></li>");
    });
  });

  $(document).on("click", ".add_document_to_remax_service_btn", function(){
    var parentEleId = $("#resource_folder_parent_ele").val();
    $(".pre-icon").show();
    if ($(this).data("update_remax_service") == true){
      $('#'+parentEleId).find('.update_to_plus_service').val("true");
    }
    else{
      $('#'+parentEleId).find('.update_to_plus_service').val("false");
    }
    setTimeout(function () {
      $('.modal').modal('hide');
      $('#'+parentEleId).find('form').submit();
    }, 1000);
  });
  
  $(document).on("click", ".delete_resource_btn", function(){
    var parentEleId = $("#delete_resource_parent_ele").val();
    if ($(this).data("update_remax_service") == true){
      $.ajax({
        url: '/resources/'+$("#commission_id").val()+'/delete_media',
        method: 'POST',
        data: {'media_id': parentEleId, 'type': "AgentOffice::Commission::Base"},
        success: function(result){
          if (result["success"] == true) {
            window.location.reload();
          }
          else {
            alert("something went wrong")
          }
        },
        error: function(error){
          alert("something went wrong")
        }
      })
    }
  });

  $(document).on("click", ".add_new_commission_folder_resource", function(){
    var parentEl = $(this).closest('.parent');
    var other_resource = $(parentEl).find(".dummy_other_commission_folder_resources").clone();

    var last_other_resource = $(parentEl).find(".other_commission_folder_resources .nested-fields:last").attr('id');
    if (last_other_resource){
      var index = parseInt(getId(last_other_resource)) + 1;
    }
    else{
      var index = 1;
    }

    other_resource = other_resource.html().replace(/replace_random_id/g, index).replace(/replace_param/g, "resource_attributes");
    $(parentEl).find(".other_commission_folder_resources").append(other_resource);
    initiateDatePicker();
  });

  $(document).on("click", ".remove_other_commission_folder_resources", function(){
    $(this).closest(".nested-fields").remove();
  });

  $(document).on("click", ".save_commission_document_btn", function(){
    var parentElId = $(this).closest('.nested-fields').attr('id');
    $("#resource_folder_parent_ele").val(parentElId);
    setTimeout(function () {
      $('#ResourceUploadConfirmModal').modal('show');
    }, 1000);
  });
  
  $(document).on("click", ".delete_resource_document_btn", function(){
    var parentEl = $(this).closest('.resource');
    var resource_id = $(parentEl).find('.send_by_email').val();
    $("#delete_resource_parent_ele").val(resource_id);
  });

  $(document).on("click", ".check_commission_folder_offer_type", function(){
    var offer_type = $(this).val();
    $('.parent').removeClass('hide');
    if (offer_type=="active_offers"){
      $('.rejected_offer_list').addClass('hide');
      $('.preliminary_agreements_list').addClass('hide');
    }
    if(offer_type=="rejected_offers"){
      $('.preliminary_agreements_list').addClass('hide');
      $('.active_offer_list').addClass('hide');
    }
    if(offer_type=="preliminary_agreements"){
      $('.active_offer_list').addClass('hide');
      $('.rejected_offer_list').addClass('hide');
    }
  });

  $(document).on('click', '.edit_media_attachment_name', function(){
    var parentEl = $(this).closest('.resource');
    $(parentEl).find('.media_attachment_name_btn').toggleClass('hide');
    $(parentEl).find('.show_media_attachment_name').toggleClass('hide');
  });

  $(document).on('click', '.save_media_attachment_name', function(){
    var parentEl = $(this).closest('.resource');
    var attachment_name = $(parentEl).find('.check_media_attachment_name_input');
    var commission_id = $('.commission_folder_commission_id').val();
    var resource_id = $(parentEl).find('.send_by_email').val();
    var partner_video_link = $(parentEl).find('.set_photograph_partner_video_link').val();
    var partner_video_link_index = $(parentEl).find('.set_photograph_partner_video_link_index').val();
    $(".pre-icon").show();
    $.ajax({
      url: '/agent_office/commission/sellings/'+commission_id+'/update_attachment_name',
      method: 'POST',
      data: {'selling_id': commission_id, 'resource_id': resource_id, 'media_attachment_name': $(attachment_name).val(), 'partner_video_link': partner_video_link, 'index': partner_video_link_index },
      success: function(result){
        if (result["success"] == true) {
          $(".pre-icon").hide();
          $(parentEl).find('.media_attachment_name_btn').toggleClass('hide');
          $(parentEl).find('.show_media_attachment_name').toggleClass('hide');
          $(parentEl).find('.media_attachment_name_present').html($(attachment_name).val());
        }
        else {
          $(".pre-icon").hide();
          $("#save_media_attachment_name_error").show();
          $("#save_media_attachment_name_error").html("<div class='alert alert-dismissible alert-danger'><button class='close' data-dismiss='alert' type='button'>×</button>"+$('#error_msg').val()+"</div>")
          fadeOutFlashMessage('save_media_attachment_name_error')
        }
      }
    });
  });

  $(document).on("change", ".check_folder_upload_media_file", function(){
    var parent = $(this).closest('.parent');
    var resolution_type = $(parent).find('.check_photograph_resolution_type').val();
    checkFileUploadResoulution($(this), $(parent), resolution_type);
  });

  $(document).on("click", ".media_attachment_properties_save_btn", function(){
    var parentEl = $('#save_media_attachment_parent_element_id').val();
    permission = $(this).data("media_attachment_save");
    if (permission == true){
      $(parentEl).find('.convert_to_low_resolution').val(true);
    }
    else{
      $('#'+parentEl).find('.media_attachment_name').val('');
      $('#'+parentEl).find('.check_folder_upload_media_file').val('');
    }
  });

});

function hideCommissionFolderForm(id) {
  $("#commission_folder_edit_" + id).removeClass('hide');
  $("#commission_folder_name_" + id).addClass("hide");
  $("#commission_folder_file_" + id).removeClass("hide");
  $("#commission_folder_form_" + id).addClass("hide");
  $("#commission_folder_remove_" + id).addClass("hide");
  $("#commission_folder_cancel_" + id).addClass("hide");
}

function readCommissionURL(file, id) {
  var reader = new FileReader();
  reader.onload = function(e) {
    $("#CommissionMediaFileName_" + id).val(file.name);
  }
  reader.readAsDataURL(file);
}

function checkSelectedCommissionResources(parentEl){
  total_resources = [];
  total_resource_ids = {};
  var send_by_email_checks = $(parentEl).find('.send_by_email:checked');
  for (var i = 0; i < send_by_email_checks.length; i++) {
    send_by_email_check = send_by_email_checks[i];
    parentEl = $(send_by_email_check).closest('.parent_check_commission_resource');
    resource_name = $(parentEl).find('.check_email_resource_name');
    object_type = $(send_by_email_check).data("object_type");
    if (total_resource_ids[object_type]){
      total_resource_ids[object_type].push($(send_by_email_check).val());
    }
    else{
      total_resource_ids[object_type] = [$(send_by_email_check).val()];
    }
    // total_resource_ids.push($(send_by_email_check).val())
    total_resources.push(resource_name)
  }
  $("#show_selected_resources").html(' ');
  $.each(total_resources, function(index, resources){
    name = $(resources).val();
    path = $(resources).data("resource_path");
    $("#show_selected_resources").append("<li class='form-group'><a href='"+path+"'>"+name+"</a></li>");
  });
  total_resource_ids_arr = [];
  $.each(total_resource_ids, function(obj, obj_ids) {
    total_resource_ids_arr.push(obj+":"+obj_ids.join('-'));
  });
  // $('#send_commission_resources_ids').val(total_resource_ids.join(","))
  $('#send_commission_resources_ids').val(total_resource_ids_arr.join(","));
}

function checkFileUploadResoulution(ele, parentEl, resolution_type){
  $('.show_content_high_resolution').addClass('hide');
  $('.show_content_low_resolution').addClass('hide');
  var _URL = window.URL || window.webkitURL;
  $('#save_media_attachment_parent_element_id').val($(parentEl).attr('id'));
  if (resolution_type == "high"){
    $('.show_content_high_resolution').removeClass('hide');
  }else{
    $('.show_content_low_resolution').removeClass('hide');
  }
  var file = $(ele)[0].files[0];
  img = new Image();
  var imgwidth = 0;
  var imgheight = 0;
  var maxwidth = 640;
  var maxheight = 640;

  img.src = _URL.createObjectURL(file);
  img.onload = function() {
    imgwidth = this.width;
    imgheight = this.height;
    if ((resolution_type == "high") && (imgwidth <= maxwidth && imgheight <= maxheight)){
      setTimeout(function () {
        $('#CheckResourcePropertiesModal').modal('show');
      }, 1000);
    }
    else if ((resolution_type == "low") && (imgwidth > maxwidth || imgheight > maxheight)){
      setTimeout(function () {
        $('#CheckResourcePropertiesModal').modal('show');
      }, 1000);
    }
  };
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};