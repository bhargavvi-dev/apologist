$(document).ready(function(){

  submit_form = false;

  window['finalPhotos'] = new Object();
  window['uniquePhotoKey'] = new Object();
  var uniqueKey = 0;
  window['finalCoords'] = new Object();

  window['finalFiles'] = new Object();
  window['uniqueFileKey'] = new Object();

  initiateRemoteFileSave('body');

  //window['finalCoords'] = new Object();
  window['cropPhoto'] = true;

  if (window['cropPhoto']) {

    $(document).on("click", ".upload_photos", function(event){
      var show_modal_id = $(this).closest('.modal').attr('id');
      $('.CloseCropModalBtn').data("show_modal_id", show_modal_id);
    });

    $(document).on("click", ".reupload_photo", function (event) {
      $(".remove_photo").trigger('click');
      formID = $('#upload_media_form_id').val();
      $('#'+formID).find('.upload_photos').trigger('click');
    });

    $(document).on("click", ".remove_photo", function (event) {
      formID = $('#upload_media_form_id').val();
      if($('#user-photo').data('Jcrop')) {
        jcrop_api.destroy();
        if (Object.keys(window['finalPhotos']).length > 0) {
          delete window['finalPhotos'][formID][uniqueKey];
        }
        $('#user-photo').removeAttr('style');
        $("#user-photo").attr("src","");
        $(formID).closest(".upload_photos")[0] = "";
        $('#user-photo').hide();
      }
    });

    $(document).on("change", ".upload_photos", function (event) {
        $('.modal').modal('hide');
        var formID = $(this).closest('form').attr('id');
        var uploadPhotoEleId = $(this).attr("id");
        setTimeout(function () {
          $('#user-image-crop').modal('show');
        }, 1000);
        var reader = new FileReader();
        reader.readAsDataURL($('#'+formID).find('.upload_photos')[0].files[0]);
        reader.onloadend = function() {
        image_src = reader.result;
          setImageCrop(image_src, formID)
        }
        uniqueKey += 1;
        window['finalPhotos'][formID][uniqueKey] = $('#'+formID).find('.upload_photos')[0].files[0];
        modal_id = $(this).closest('.modal').attr('id');
        if (modal_id == undefined){
          $('#upload_media_show_modal_id').val("");
        }
        else{
          $('#upload_media_show_modal_id').val(modal_id);
        }
        $('#upload_media_form_id').val(formID);
        $('#uploaded_file_id').val(uniqueKey);

        $("#upload_photos").val("");
    });

    $(document).on("click", ".btnCrop", function (e) {
      formID = $('#upload_media_form_id').val();
      uploadPhotoEleId = $('#uploaded_file_id').val();
      var show_modal_id = $('#upload_media_show_modal_id').val();

      parentEl = $('#'+formID).find('#preview_files');
      var removePreviewFileEle = "<div class='col-xs-12 remove-preview-file' id=remove-preview-file-" + uploadPhotoEleId + "><i class='fa fa-times'></i></div>";
      var canvas_id = "preview_file_"+uploadPhotoEleId ;
      var preview_class = "image";
      var width = $('#imgWidth').val();
      var height = $('#imgHeight').val();
      //fixed height 120*120 for canvas and same for draw image
      $(parentEl).append("<li class='canvas canvas-file' id=file-" + uploadPhotoEleId+ ">" + removePreviewFileEle + "<div class='col-xs-12 col-sm-6'><canvas height='120' width='120' id="+canvas_id+" class='preview "+ preview_class +"'/></div></li>");
      add_crop_image_on_canvas(window['finalPhotos'][formID][uniqueKey], canvas_id, parentEl);
      $('#user-image-crop').modal('hide');
      if (show_modal_id.length > 0){
        setTimeout(function () {
          $('#'+formID).modal('show');
        }, 1000);
      }
      $(".upload_photos").val("");
    });

    function setImageCrop(url, formID){
      if($('#user-photo').data('Jcrop')) {
        jcrop_api.destroy();
      }

      if ($( window ).width() <= 991){
        boxWidth = 250;
        boxHeight = 300;
      }
      else{
        boxWidth = 380;
        boxHeight = 400;
      }

      $('#user-photo').attr('src', url).Jcrop({
        boxWidth: boxWidth,
        onChange: setCoordinates,
        onSelect: setCoordinates,
        setSelect: [10,10,250,200],
        allowSelect: true,
        allowMove: true,
        allowResize: true
      }, function(){ jcrop_api = this; });
    }

    function add_crop_image_on_canvas(src, canvas_id){
      var img = new Image;
      if (typeof(src) == "string"){
        img.src = src;
      }
      else{
        img.src = URL.createObjectURL(src);
      }
      img.onload = function(){
        var x1 = $('#imgX1').val();
        var y1 = $('#imgY1').val();
        var width = $('#imgWidth').val();
        var height = $('#imgHeight').val();
        var canvas = document.getElementById(canvas_id)
        var ctx = canvas.getContext('2d');
        if ((width == 0) && (height == 0)){
          // if user does not select any crop area then take the original image
          ctx.drawImage(img,0,0,img.width,img.height,0,0,120,120);
        }else{
          ctx.drawImage(img, x1, y1, width, height, 0, 0, 120, 120);
        }
      }
    }

    function setCoordinates(c) {
      formID = $('#upload_media_form_id').val();
      $('#imgX1').val(c.x);
      $('#imgY1').val(c.y);
      $('#imgWidth').val(c.w);
      $('#imgHeight').val(c.h);
      if ((c.w != 0) && (c.h != 0)){
        window['finalCoords'][formID][uniqueKey] = [c.w, c.h, c.x, c.y]
      }else{
        window['finalCoords'][formID][uniqueKey] = []
      }
    }
  }
  else{
    $(document).on("change", ".upload_photos", function (event) {
      var formID = $(this).closest('form').attr('id');
      var uploadPhotoEleId = $(this).attr("id");
      initiatePreviewPhotos(event, ".upload_photos", $("#"+formID).find("#preview_files"+uploadPhotoEleId),formID, uploadPhotoEleId);
    });
  }
  // crop end

  $(document).on("click", ".canvas-file", function(event){
    var formID = $(this).closest('form').attr('id');
    var uploadFileEleId = $(this).attr("id");
    if (uploadFileEleId) {
      var idArr = this.id.split("-");
      var id = idArr[idArr.length - 1];
      delete window['finalPhotos'][formID][id];  
      $('#'+formID).find("#file-"+id).remove();
    }
  });

  $(document).on("change", ".upload_files", function (event) {
    var formID = $(this).closest('form').attr('id');
    var uploadFileEleId = $(this).attr("id");
    initiatePreviewFiles(event, ".upload_files", $("#"+formID).find("#preview_attachments"+uploadFileEleId), formID, uploadFileEleId);
  }); 

  $(document).on("click", ".remove-preview-file, .remove-file", function(){    
    if ($(this).attr("id")) {
      var removeFile = $(this).attr('id');
      var removeFileArr = removeFile.split("-");
      var findex = removeFileArr[removeFileArr.length - 1];
      var uploadFileEleId = removeFileArr[removeFileArr.length - 2];
      //finalFiles[parseInt(index)] = '';
      var form = $(this).closest('form');
      var formID = $(form).attr('id');
      delete window['finalFiles'][formID][uploadFileEleId][parseInt(findex)];
      $(form).find("#file" + uploadFileEleId + "-" + findex).remove();
    }
  });
});

function removeMedia(mediaId, removingElementId, ObjId, ObjType, msg) {
  var premission = confirm(msg);
  if (premission == true) {
    $.ajax({
      url: '/resources/'+ObjId+'/delete_media',
      method: 'POST',
      data: {'media_id': mediaId, 'type': ObjType},
      success: function(result){
        if (result["success"] == true) {
          if ($('#' + removingElementId).length > 0) {
            $('#' + removingElementId).remove();
          }
        }
        else {
          $("#save_delete_media_error").html("<div class='alert alert-dismissible alert-danger'><button class='close' data-dismiss='alert' type='button'>×</button>"+$('#error_msg').val()+"</div>")
        }
      },
      error: function(error){
        $("#save_delete_media_error").html("<div class='alert alert-dismissible alert-danger'><button class='close' data-dismiss='alert' type='button'>×</button>"+$('#error_msg').val()+"</div>")
      }
    })
  }
}

function saveFiles (event, btn, uploadFileEleId, formID, uploadFileEleIds) {
  if (window[formID + "-submit"] == false) {
    event.preventDefault();
    if (window['finalFiles'][formID][uploadFileEleId] != undefined) {
      if (Object.keys(window['finalFiles'][formID][uploadFileEleId]).length > 0) {
        var formData = new FormData();
        var keys = Object.keys(window['finalFiles'][formID][uploadFileEleId]);
        keys.forEach(function(key){
          var file = window['finalFiles'][formID][uploadFileEleId][key];
          formData.append('media[]', file);
        });

        var form = $("#" + formID);
        if ($(form).find("#form_submit, #offerors_form_submit, #send_reminder_message_customer_form_submit, #property_users_form_submit, .contact_agent_form_submit, .cancel_customer_plus_service, #feedback_resource_form_submit, #prospect_delete_request_form_submit, #customer_info_delete_request_form ").length > 0) {
          if ($(form).find("#object_type"+uploadFileEleId).val() == 'temp_folder_offerors') {
            formData.append('offerors', $(form).find('#offerors_ids').val());
            formData.append('body', $(form).find("#offerors_body").val());
            formData.append('subject', $(form).find("#offerors_subject").val());
            formData.append('id', $(form).find("#selling_commission_id").val());
            formData.append('offerors_modal_step_2', $(form).find("#offerors_modal_step_2").val());
            formData.append('notice_id', $(form).find('#step2_offerors_notice').val());
            var selling_commission_id = $(form).find("#selling_commission_id").val();
            var DataUrl = "/agent_office/commissions/"+selling_commission_id+"/create_temp_folder";
            var type = "PUT";
            if ($(form).find("#offerors_subject").val() == "" || $(form).find("#offerors_body").val() == ""){
              return;
            }
          }
          else if ($(form).find("#object_type"+uploadFileEleId).val() == 'temp_folder_visitors') {
            formData.append('final_visitors', $(form).find('#visitors_ids').val());
            formData.append('body', $(form).find("#visitors_body").val());
            formData.append('subject', $(form).find("#visitors_subject").val());
            formData.append('id', $(form).find("#selling_commission_id").val());
            formData.append('visitor_modal_step_3', $(form).find("#visitor_modal_step_3").val());
            formData.append('notice_id', $(form).find('#step3_visitor_notice').val());
            var selling_commission_id = $(form).find("#selling_commission_id").val();
            var DataUrl = "/agent_office/commissions/"+selling_commission_id+"/create_temp_folder";
            var type = "PUT";
            if ($(form).find("#visitors_subject").val() == "" || $(form).find("#visitors_body").val() == ""){
              return;
            }
          }
          else if ($(form).find("#object_type"+uploadFileEleId).val() == 'temp_folder_visit_customers') {
            formData.append('recipient_emails', $(form).find("#visit_customer_recipient_emails").val());
            formData.append('body', $(form).find("#body").val());
            formData.append('subject', $(form).find("#subject").val());
            formData.append('id', $(form).find("#selling_commission_id").val());
            var selling_commission_id = $(form).find("#selling_commission_id").val();
            var DataUrl = "/agent_office/commissions/"+selling_commission_id+"/create_temp_folder";
            var type = "PUT";
            if ($(form).find("#subject").val() == "" || $(form).find("#body").val() == ""){
              return;
            }
          }
          else if ($(form).find("#object_type"+uploadFileEleId).val() == 'temp_folder_property_users') {
            formData.append('recipient_emails', $(form).find("#property_users_recipient_emails").val());
            formData.append('body', $(form).find("#body").val());
            formData.append('subject', $(form).find("#subject").val());
            var DataUrl = "/agent_office/commissions/create_resources_folder";
            var type = "PUT";
            if ($(form).find("#subject").val() == "" || $(form).find("#body").val() == ""){
              return;
            }
          }
          else if ($(form).find("#object_type"+uploadFileEleId).val() == 'temp_folder_contact_agents') {
            formData.append('recipient_emails', $(form).find("#contact_agents_recipient_emails").val());
            formData.append('body', $(form).find("#body").val());
            formData.append('subject', $(form).find("#subject").val());
            var DataUrl = "/agent_office/commissions/create_resources_folder";
            var type = "PUT";
            if ($(form).find("#subject").val() == "" || $(form).find("#body").val() == ""){
              return;
            }
          }
          else if ($(form).find("#object_type"+uploadFileEleId).val() == 'temp_folder_customer_attachments') {
            formData.append('recipient_emails', $(form).find(".plus_service_commission_id").val());
            formData.append('commission_id', $(form).find(".plus_service_customer_email").val());
            formData.append('customer_id', $(form).find(".plus_service_customer_id").val());
            formData.append('body', $(form).find("#body").val());
            formData.append('subject', $(form).find("#subject").val());
            var DataUrl = "/agent_office/commissions/create_resources_folder";
            var type = "PUT";
            if ($(form).find("#subject").val() == "" || $(form).find("#body").val() == ""){
              return;
            }
          }
          else if ($(form).find("#object_type"+uploadFileEleId).val() == 'temp_folder_feedback_resources') {
            formData.append('message', $(form).find("#feedback_message").val());
            formData.append('subject', $(form).find("#feedback_subject_bug").val());
            var DataUrl = "/emails/create_resources_folder";
            var type = "PUT";
            if ($(form).find("#subject").val() == "" || $(form).find("#message").val() == ""){
              return;
            }
          }
          else if ($(form).find("#object_type"+uploadFileEleId).val() == 'temp_folder_prospect_delete_request_resources') {
            formData.append('message', $(form).find("#delete_request_reason").val());
            var DataUrl = "/emails/create_resources_folder";
            var type = "PUT";
            if ($(form).find("#message").val() == ""){
              return;
            }
          }
          else{
            var DataUrl = '';
            var type = '';
          }
        }
        else{
          formData.append('resource_type', $(form).find("#resource_type_name"+uploadFileEleId).val());
          formData.append('resource_spec', $(form).find("#resource_spec_name"+uploadFileEleId).val());
          formData.append('creator_id', $(form).find("#creator_id"+uploadFileEleId).val());
          formData.append('presentUploadFileEleId', uploadFileEleId);
          formData.append('type', $(form).find("#object_type"+uploadFileEleId).val());
          formData.append('agent_office_resource', $(form).find("#agent_office_resource"+uploadFileEleId).val());
          id = $(form).find("#object_id"+uploadFileEleId).val();
          var DataUrl = '/resources/'+id+'/save_media';
          var type = 'POST';
        }
        
        $("#loader-image, .pre-icon").show();
        $.ajax({
          url: DataUrl,
          type: type,
          data: formData,
          processData: false,
          contentType: false,
          success: function(result){
            var presentUploadFileEleId = result['presentUploadFileEleId'];
            var next_index = uploadFileEleIds.indexOf(presentUploadFileEleId) + 1;
            if (next_index == 0 || next_index >= uploadFileEleIds.length){
              if ($("#form_submit").length > 0) {
                window.location = window.location.href;
              }
              formUploadFileEles = $("#" + formID).find(".upload_files");
              if (uploadFileEleId == $(formUploadFileEles[formUploadFileEles.length - 1]).attr('id')) {
                removeListenerAndSubmit(btn, formID);
              }
            }
            else{
              saveFiles(event, btn, uploadFileEleIds[next_index], formID, uploadFileEleIds);
            }
          },
          error: function(error){
            $("#loader-image").hide();
            $("#save_delete_media_error").html("<div class='alert alert-dismissible alert-danger'><button class='close' data-dismiss='alert' type='button'>×</button>"+$('#error_msg').val()+"</div>")
          }
        });
      } else {
        formUploadFileEles = $("#" + formID).find(".upload_files");
        if (uploadFileEleId == $(formUploadFileEles[formUploadFileEles.length - 1]).attr('id')) {
          removeListenerAndSubmit(btn, formID);
        }
        else{
          var next_index = uploadFileEleIds.indexOf(uploadFileEleId) + 1;
          saveFiles(event, btn, uploadFileEleIds[next_index], formID, uploadFileEleIds);
        }
      }
    } else {
      formUploadFileEles = $("#" + formID).find(".upload_files");
      if (uploadFileEleId == $(formUploadFileEles[formUploadFileEles.length - 1]).attr('id')) {
        removeListenerAndSubmit(btn, formID);
      }
      else{
        var next_index = uploadFileEleIds.indexOf(uploadFileEleId) + 1;
        saveFiles(event, btn, uploadFileEleIds[next_index], formID, uploadFileEleIds);
      }  
    }
  }
  else {
    removeListenerAndSubmit(btn, formID);
  }
}

function savePhotos(event, btn, uploadFileEleId, formID, uploadFileEleIds) {
  if (window[formID + "-submit"] == false) {
    event.preventDefault();
    if (window['finalPhotos'][formID] != undefined) {
      if (Object.keys(window['finalPhotos'][formID]).length > 0) {
        var formData = new FormData();
        var keys = Object.keys(window['finalPhotos'][formID]);
        keys.forEach(function(key){
          var file = window['finalPhotos'][formID][key];
          formData.append('media[]', file);
          if (window['cropPhoto']){
            var file_cooridinate = window['finalCoords'][formID][key];
            formData.append('coordinate[]', file_cooridinate);
          }
        });
        formData.append('resource_type', $("#resource_type_name").val());
        formData.append('resource_spec', $("#resource_spec_name").val());
        formData.append('presentUploadFileEleId', uploadFileEleId);
        formData.append('agent_office_resource', $("#agent_office_resource").val());
        formData.append('associate_type', $('#'+formID).find("#associate_type").val());
        formData.append('type', $("#object_type").val());
        id = $('#'+formID).find("#object_id").val();
        $("#loader-image, .pre-icon").show();
        $.ajax({
          url: '/resources/'+id+'/save_media',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(result){
            var presentUploadFileEleId = result['presentUploadFileEleId'];
            var next_index = uploadFileEleIds.indexOf(presentUploadFileEleId) + 1;
            if (next_index == 0 || next_index >= uploadFileEleIds.length){
              removeListenerAndSubmit(btn, formID);
            }
            else{
              savePhotos(event, btn, uploadFileEleIds[next_index], formID, uploadFileEleIds);
            }
          },
          error: function(error){
            $("#loader-image").hide();
            $("#save_delete_media_error").html("<div class='alert alert-dismissible alert-danger'><button class='close' data-dismiss='alert' type='button'>×</button>"+$('#error_msg').val()+"</div>")
          }
        });
      } else {
        formUploadFileEles = $("#" + formID).find(".upload_photos");
        if (uploadFileEleId == $(formUploadFileEles[formUploadFileEles.length - 1]).attr('id')) {
          removeListenerAndSubmit(btn, formID);
        }
        else{
          var next_index = uploadFileEleIds.indexOf(uploadFileEleId) + 1;
          saveFiles(event, btn, uploadFileEleIds[next_index], formID, uploadFileEleIds);
        }
      }
    } else {
      formUploadFileEles = $("#" + formID).find(".upload_photos");
      if (uploadFileEleId == $(formUploadFileEles[formUploadFileEles.length - 1]).attr('id')) {
        removeListenerAndSubmit(btn, formID);
      }
      else{
        var next_index = uploadFileEleIds.indexOf(uploadFileEleId) + 1;
        saveFiles(event, btn, uploadFileEleIds[next_index], formID, uploadFileEleIds);
      }
    }
  }
  else {
    removeListenerAndSubmit(btn, formID);
  }
}

function initiateRemoteFileSave(mainParentEle){
  var allForms = $(mainParentEle).find('form');

  var formsWithResources = [];

  $.each(allForms, function(index, form){
    if ($(form).find('.upload_files').length > 0 || $(form).find('.upload_photos').length > 0){
      formsWithResources.push($(form));
      $(form).addClass('form-with-resource');
      window[$(form).attr('id') + "-submit"] = false
    }
  });

  var startIndexForFormWithoutId = $('.form-with-resource').length;

  if (formsWithResources.length > 0){
    $.each(formsWithResources, function(index, formEle){
      var form = $(formEle);
      var formID = $(form).attr('id');
      window['finalFiles'][formID] = {};
      window['finalPhotos'][formID] = {};
      window['uniqueFileKey'][formID] = {};
      window['uniquePhotoKey'][formID] = {};
      window['cropPhoto'] = true;
      var uniqueKey = 0;
      if (window['cropPhoto']){
        window['finalCoords'][formID] = {};
      }
      $.each($(form).find('.upload_files'), function(index, uploadFileEle){
        uploadFileEleId = $(uploadFileEle).attr('id');
        window['finalFiles'][formID][uploadFileEleId] = {};
        window['uniqueFileKey'][formID][uploadFileEleId] = 0;
      });

      $.each($(form).find('.upload_photos'), function(index, uploadFileEle){
        uploadFileEleId = 1;
        window['finalPhotos'][formID][uploadFileEleId] = {};
        window['uniquePhotoKey'][formID][uploadFileEleId] = 0;
        window['finalCoords'][formID][uploadFileEleId] = 0;
      });

      var submitBtns = $(form).find("[type=submit]");
      $.each(submitBtns, function(index, submitBtn){
        $(submitBtn).on('click', function(event){
          if ($(form).find(".upload_photos").length > 0) {
            uploadFileEleIds = []
            uniqueKey += 1;
            $(form).find('.preview').each(function(){
              uploadFileEleIds.push(uniqueKey)
            })
            //savePhotos(event, submitBtn, '', formID);
            savePhotos(event, submitBtn, uploadFileEleIds[0], formID, uploadFileEleIds);
          }
          if ($(form).find(".upload_files").length > 0) {
            uploadFileEleIds = []
            $(form).find('.upload_files').each(function(){
              uploadFileEleIds.push($(this).attr('id'))
            })
            saveFiles(event, submitBtn, uploadFileEleIds[0], formID, uploadFileEleIds);
          } 
        });
      });
    });
  }
}

function removeListenerAndSubmit(btn, formID){
  $(btn).off("click");
  window[formID + '-submit'] = true;
  $(btn).click();
}

function initiatePreviewPhotos(event, id, parentEl, formID, uploadPhotoEleId){
  if ($("#" + formID).find("#"+uploadFileEleId).val() != ""){
    var tgt = event.target || window.event.srcElement;
    var files = tgt.files;
    var u_key = '';
    if (FileReader && files && files.length) {
      for(var i=0; i < files.length; i++) {
        u_key = window['uniqueFileKey'][formID][uploadFileEleId];
        window['finalPhotos'][formID][uploadFileEleId][u_key]=files[i];
        
        var removePreviewFileEle = ""
        removePreviewFileEle = "<a class='remove-file dib' href='javascript:void(0);'><div class='remove-preview-file remove' id='remove-file-" + uploadFileEleId + "-" + u_key.toString() + "'><i class='fa fa-times'></i></div></a>";
        var canvas_id = "preview_file_" + uniqueKey.toString();
        var preview_class = getPreviewClassFromName(files[i].name);
        // var view_name = files[i].name;
        // if (view_name.length > 17){
        //   var view_name_arr = view_name.split(".")
        //   view_name =  view_name.slice(0,8) + "[...]." + view_name_arr[view_name_arr.length-1]
        // }
        $(parentEl).append("<li class='canvas canvas-file' id=file-" + uniqueKey.toString() + ">" + removePreviewFileEle + "<div class='col-xs-12 col-sm-6'><canvas height=212 width=149 id="+canvas_id+" class='preview "+ preview_class +"'/></div></li>");
        if (preview_class == "image_canvas"){
          add_image_on_canvas(files[i], canvas_id);
        }
        else if (preview_class == "pdf_canvas"){
          add_canvas(files, i, uniqueKey);
        }
        uniqueKey += 1;
      }
    }
    $("#" + formID).find("#"+uploadFileEleId).val("");
  }

};

function add_canvas(files,i,uniqueKey){
  var fr = new FileReader();
  fr.readAsArrayBuffer(files[i]);
  fr.onload = function(e) {
    load_and_set_canvas(fr.result, uniqueKey, files[i].name)
  }
}

function load_and_set_canvas(data, uniqueKey, file_name){
  PDFJS.disableWorker = true;
  PDFJS.getDocument(data).then(function getPdf(pdf) {
    var parentEl = $("#preview_files");
    pdf.getPage(1).then(function getPage(page) {
      var scale = 0.25;
      var viewport = page.getViewport(scale);
      // Prepare canvas using PDF page dimensions
      var canvases = $("#preview_file_" + uniqueKey.toString());
      var canvas = canvases[0];
      var context = canvas.getContext('2d');
      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
  });
}

function getPreviewClassFromName(name){
  var nameArr = name.split(".");
  var ext = nameArr[nameArr.length - 1];
  if (["jpg","jpeg","png"].indexOf(ext.toLowerCase()) >= 0){
    return "image_canvas";
  }
  else if(["pdf"].indexOf(ext.toLowerCase()) >= 0){
    return "pdf_canvas";
  }
  else{
    return "unknown_canvas"
  }
}

function add_image_on_canvas(src, canvas_id){
  var img = new Image;
  if (typeof(src) == "string"){
    img.src = src;
  }
  else{
    img.src = URL.createObjectURL(src);
  }
  img.onload = function(){
    var ctx = document.getElementById(canvas_id).getContext('2d');
    ctx.drawImage(img,0,0,img.width,img.height,0,0,149,212);
  }
}

function initiatePreviewFiles(event, id, parentEl, formID, uploadFileEleId){
  if ($("#" + formID).find("#"+uploadFileEleId).val() != ""){
    var tgt = event.target || window.event.srcElement;
    var files = tgt.files;
    var u_key = '';
    if (FileReader && files && files.length) {
      for(var i=0; i < files.length; i++) {
        u_key = window['uniqueFileKey'][formID][uploadFileEleId];
        window['finalFiles'][formID][uploadFileEleId][u_key]=files[i];
        
        var removePreviewFileEle = ""

        removePreviewFileEle = "<a class='remove-file dib' href='javascript:void(0);'><div class='remove-preview-file remove' id='remove-file-" + uploadFileEleId + "-" + u_key.toString() + "'><i class='fa fa-times'></i></div></a>";
        var view_name = files[i].name;
        $(parentEl).append("<li class='form-group' id=file" + uploadFileEleId + "-" + u_key.toString() + "><a href='javascript:void(0);'>" + view_name + "</a> " + removePreviewFileEle + "</li>");
        window['uniqueFileKey'][formID][uploadFileEleId] += 1;
      }
    }
    $("#" + formID).find("#"+uploadFileEleId).val("");
  }
}