$(document).ready(function(){
  
  $(document).on("change", ".filter_options", function(){
    $(".check_commission_rate").prop("checked", false);
    $('.same_by_commission_type').addClass('hide');
    $( "#varies_by_commission_type" ).empty();
    var filter_value = $(this).val();
    var agent_id_temp = $("#agent_id_temp").val();
    var step = $("#step").val();
    var open_card = $("#open_card").val();
    if (filter_value == "the_current_reward_share"){
      $.ajax({
              type:'GET',
              url:'/agents/current_user_reward',
              data: { filter_value : filter_value,id : agent_id_temp,step : step,open_card : open_card
                    },
              success:function(){
              }
            });
      $('.varies_by_commission_type').removeClass('hide');
    } else if (filter_value == "all"){
      $.ajax({
              type:'GET',
              url:'/agents/all_user_rewards',
              data: { filter_value : filter_value,id : agent_id_temp,step : step,open_card : open_card
                    },
              success:function(){
              }
            });
      $('.varies_by_commission_type').removeClass('hide');
    } else if (filter_value == "upcoming_reward_share"){
      $.ajax({
              type:'GET',
              url:'/agents/upcoming_user_reward',
              data: { filter_value : filter_value,id : agent_id_temp,step : step,open_card : open_card
                    },
              success:function(){
              }
            });
      $('.varies_by_commission_type').removeClass('hide');
    } else if (filter_value == "overdue_reward_share_information"){
      $.ajax({
              type:'GET',
              url:'/agents/overdue_user_reward',
              data: { filter_value : filter_value,id : agent_id_temp,step : step,open_card : open_card
                    },
              success:function(){
              }
            });
      $('.varies_by_commission_type').removeClass('hide');
    }
  });

  if ($( "#reward_share_filters option:selected" ).val() == "the_current_reward_share"){
    $( "#varies_by_commission_type" ).empty();
    var agent_id_temp = $("#agent_id_temp").val();
    $.ajax({
            type:'GET',
            url:'/agents/current_user_reward',
            data: { filter_value : "the_current_reward_share",id : agent_id_temp
                  },
            success:function(d){
              //I assume you want to do something on controller action execution success?
            }
          });
    $('.varies_by_commission_type').removeClass('hide');
  }

  $(document).on("click", ".openCloseDetails", function(){
    var toggle_id = $(this).data('show_modal_id');
    $(this).parent().parent().find("#"+toggle_id).toggleClass("hide");
    $(this).find(".show_selected_detail_arrow").toggleClass("hide");
  });

  $("#add_visiting_address").click(function(){
    $("#visiting_address_wrapper").removeClass("hide");
    $("#add_visiting_address_wrapper").remove();
  });

  $("#add_billing_address").click(function(){
    $("#billing_address_wrapper").removeClass("hide");
    $("#add_billing_address_wrapper").remove();
  });

  $(".addThousandSeparators").focusout(function() {
    $(this).val(addThousandSeparators($(this).val()));
  });

  $("#presentation_text").on('keyup',function(){
    $(this).css('height','auto');
    $(this).height(this.scrollHeight);
  })

  $(document).on('click', '#save_send_feedback_modal_form_btn', function(){
    var browser_data;
    var browser_parser = new UAParser();
    var browser_global_data = browser_parser.getResult();
    var screen_size;

    if(window){
      if(window.screen){
        screen_size = window.screen.width + 'x' + window.screen.height
      }
    }

    browser_data = {
                    'browser_name': browser_global_data.browser.name,
                    'browser_version': browser_global_data.browser.version,
                    'os_name': browser_global_data.os.name,
                    'os_version': browser_global_data.os.version,
                    'screen_size': screen_size,
                    'device_type': browser_global_data.device.type
                  }

    $('#get_current_user_browser_details').val(JSON.stringify(browser_data));
    $('#get_current_page_feedback_url').val(window.location.href);
    $('#save_user_feedback_form_id').closest('form').submit();
  });

  common_events();

  $(document).on("change", ".check_feedback_phase_attachment_type", function(){
    var phase_type = $(this).val();
    $('.attach_current_page_location').addClass('hide');
    $('.attach_feedback_resources').addClass('hide');
    if (phase_type == "YES"){
      $('.attach_current_page_location').removeClass('hide');
    }else{
      $('.attach_feedback_resources').removeClass('hide');
    }
  });

  $(document).on("change", ".copy_same", function(){
    $('.' + $(this).data('class_name')).val($(this).val());
    if ($(this).data('trigger_class_name')){
      $('.' + $(this).data('trigger_class_name')).trigger('change');
    }
  });

  $(document).on("click", ".unclickable", function(){
    return false;;
  });

  $(document).on("change", ".checkFile", function(){
    var reader = new FileReader();
    var fileField = $(this);
    var file = $(fileField)[0].files[0];

    reader.onload = function() {
      dataUrl = reader.result;
      checkFileIcon = $(fileField).closest('.checkFileParent').find('.checkFileIcon');
      $(checkFileIcon).removeClass('hide');
      var checkLink = $(checkFileIcon).find('a');
      $(checkLink).attr('download', file.name);
      $(checkLink).attr('href', dataUrl);
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  });
  
  $(document).on("click", ".hard_return_back", function(){
    redirectTo(window.location.href);
  });

  $(document).on("click", ".make_request", function(){
    var url = $(this).data('request_url');
    var method_type = $(this).data('method_type');
    var t;
    clearTimeout(t);
    t = setTimeout(function () {
      $.ajax({
        url: url,
        type: method_type
      });
    }, 100);
  });

  $(document).on("change", ".media-file-upload", function(){
    var id = getId(this.id);
    var reader = new FileReader();
    var parentEl = $(this).closest('.file_attachments');
    var ele = $(parentEl).find('.preview_attachments');

    if ($(parentEl).find(".saved_media_file").length > 0){
      $(parentEl).find(".destroy-media-file").val("0");
    }
    removePreviewFileEle = "<a class='remove-file remove-media-file dib' href='javascript:void(0);'><div class='remove-preview-file remove'><i class='fa fa-times'></i></div></a>";

    preview_file_ele = "<li class='form-group'><a href='javascript:void(0);'>" + this.files.item(0).name + "</a> " + removePreviewFileEle + "</li>";
    $(ele).find("li").addClass("hide");
    $(ele).append(preview_file_ele);
  });

  $(document).on("click", ".remove-media-file", function(){
    var parentEl = $(this).closest('.file_attachments');
    $(parentEl).find(".media-file-upload").val('');
    if ($(parentEl).find(".saved_media_file").length > 0){
      $(parentEl).find(".destroy-media-file").val("1");
    }
    $(parentEl).find("li").addClass("hide");
  });

  $(document).on('click', '.checkMandatory', function(e){
    var form = $(this).closest('form');
    var mandatory_fields = $(form).find('.mandatory_field')
    var isValid = checkIfAllFieldsHaveValues(mandatory_fields);
    if (!isValid){
      e.preventDefault();
      $(mandatory_fields).each(function() {
        custom_validation(this);
      });
      $(form).find(".has-error").find('input').focus();
      $('#loader-image').hide();
    }
  });

  $(document).on("change keyup", ".mandatory_field", function(){
    custom_validation(this);
  });

  $(document).on("click", ".helpIcon", function(){
    var parentEl = $(this).closest('.helpQuestion');
    unsure_check_box = parentEl.find('input')[0];
    if(unsure_check_box.value == 'false' || unsure_check_box.value == ''){
      unsure_check_box.value = 'true';
      parentEl.addClass('activeHelp');
    }
    else{
      unsure_check_box.value = 'false';
      parentEl.removeClass('activeHelp');
    }
  });

  $(document).on("click", ".helpIconBottom", function(){  
    var parentEl = $(this).closest('.helpQuestionBottom');
    unsure_check_box = parentEl.find('input')[0];
    if(unsure_check_box.value == 'false' || unsure_check_box.value == ''){
      unsure_check_box.value = 'true';
      parentEl.addClass('activeHelp');
    }
    else{
      unsure_check_box.value = 'false';
      parentEl.removeClass('activeHelp');
    }
  });

  $(document).on('keyup', '#office_logo_text',  function() {
    var value = document.getElementById('display_office_logo_text');
    value.innerText = $("#office_logo_text").val();
    var image = document.getElementById('image_display');
    if ($(this).val() == '' && $("#office_logo_url").val() != undefined) {
      image.src = $("#office_logo_url").val();
    }else {
      image.src = $("#brand_logo_url").val();  
    }
    
  });

  // scroll listing
  $('.scroll').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 20,
    nextSelector: 'a.jscroll-next:last',
    callback: common_events
  });

  //scroll listing
  $('.scroll-customer').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 20,
    nextSelector: 'a.jscroll-next-customer:last',
    callback: common_events
  });

  // scroll listing
  $('.scroll-partner').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 0,
    nextSelector: 'a.jscroll-next-partner:last',
    callback: common_events
  });

  // scroll listing
  $('.scroll-office').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 0,
    nextSelector: 'a.jscroll-next-office:last',
    callback: common_events
  }); 
 
  // scroll listing
  $('.scroll-agent').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 0,
    nextSelector: 'a.jscroll-next-agent:last',
    callback: common_events
  });

  // scroll listing
  $('.scroll-person').jscroll({
    loadingHtml: '<img src="/loading.gif" alt="Loading" />',
    autoTrigger: true,
    padding: 0,
    nextSelector: 'a.jscroll-next-person:last',
    callback: common_events
  });
  // load working office field
  if ($(".working-offices").length == 0){
    $(".addWorkingOffice").trigger('click');
    $(".nested-fields").first().find( ".removeWorkingOffice" ).css('display','none')
  }else{
    $(".working-offices").first().find( ".removeWorkingOffice" ).css('display','none')
  }

  // open remax email modal
  $(document).on('input propertychange paste click', '#user_email',  function() {
    userEmail = $(this).val();
    if (validateEmail(userEmail)) {
      $("#remaxEmailbtn").attr('disabled', false);
    }else{
      $("#remaxEmailbtn").attr('disabled', true);
    }
  })
  if ($("#user_email").val() != ""){
    $("#remaxEmailbtn").attr('disabled', false);
  }
  $(document).on('click', '#remaxEmailbtn',  function() {
    userVal = $('#user_email').val();
    msgText = $("#old_message").val();
    msgText = msgText.replace("userEmail", userVal);
    msgText = msgText.replace(/^\s+|\s+$/gm,'');
    $("#message").html(msgText);
  })

  // user/office contract until show/hide
  if ((".contract_until").length > 0) {
    $('.contract_type_time_limited, .contract_probation_true').click(function(){
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      $('#contract_until_' + id).show('slow');
    });

    $('.contract_probation_false').click(function(){
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      if(!$('#contract_type_time_limited_' + id).is(":checked")) {
        $('#contract_until_' + id).hide('slow');
      }
    });

    $('.contract_type_indefinitely_valid').click(function(){
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      if(!$('#contract_probation_true_' + id).is(":checked")) {
        $('#contract_until_' + id).hide('slow');
      }
    });

    var time_limited_contract_types = $(".contract_type_time_limited");
    for(var i=0; i<time_limited_contract_types.length; i++){
      var idArr = time_limited_contract_types[i].id.split("_");
      var id = idArr[idArr.length - 1];
      if ($("#contract_type_time_limited_" + id).is(":checked")){
        $('#contract_until_' + id).show('slow');
      }
      else{
        if ($("#contract_probation_true_" + id).is(":checked")){
          $('#contract_until_' + id).show('slow');
        }
        else {
          $('#contract_until_' + id).hide('slow');
        }
      }
    }
  }

  //reward share and fixed fee disabling
  $(".reward_only_share").click(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#only_share_share_" + id).removeAttr('disabled');
    $("#fee_share_fee_" + id).attr({'disabled': 'disabled'});
    $("#fee_share_share_" + id).attr({'disabled': 'disabled'});
  });

  $(".reward_fee_share").click(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#fee_share_fee_" + id).removeAttr('disabled');
    $("#fee_share_share_" + id).removeAttr('disabled');
    $("#only_share_share_" + id).attr({'disabled': 'disabled'});
  });

  //add aditional languages
  if ($("#add_new_language").length > 0){
    var total_added_languages = 0;
    $(document).on("click", "#add_new_language",  function() {
      var count = ++total_added_languages;
      $('#input_add_language').append('<div class="added_language" id="added_language_wrapper_' + count + '"><div class="col-xs-12 col-sm-8 col-md-10 form-group"><input type="text" id="input_add_language_'+count+'" name="languages['+ count +']" class="form-control"/></div><div class="col-xs-12 col-sm-3 col-md-2 form-group text-right pt10"><label class="remove_language"  id="remove_language_' + count + '"><a href="javascript:void(0)" class="addLink remove_fields dynamic"><i class="removeIcon"></i>Remove</a></label></div></div>')
    });
    $(document).on("click",".remove_language", function() {
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      $("#added_language_wrapper_"+ id).remove();
    });
  }

  if ($("#bank_account_details").length > 0){
    var total_added_bank_account = $("#bank_account_details").find($("input")).length/2;
    $(document).on("click", "#add_new_bank_account",  function() {
      var count = ++total_added_bank_account;
      $('#input_add_bank_account_details').append('<div class="added_bank_account" id="added_bank_account_wrapper_' + count + '"><div class="fieldRemove"><div class="row row7"><div class="col-xs-12 col-sm-6 form-group"><input type="text" id="input_add_name_'+count+'" name="setting[bank_details_'+ count +'][name]" class="form-control" placeholder = "Bank name"/></div><div class="col-xs-12 col-sm-6 form-group"><input type="text" id="input_add_bank_number_'+count+'" name="setting[bank_details_'+ count +'][number]" class="form-control" placeholder = "Bank account number" /></div></div><a href="javascript:void(0)" class="addLink remove_fields dynamic remove_bank_account_details" id="remove_bank_account_details_' + count + '"><i class="removeIcon"></i>Remove</a></div></div>')
    });
    $(document).on("click",".remove_bank_account_details", function() {
      var idArr = this.id.split("_");
      var id = idArr[idArr.length - 1];
      $("#added_bank_account_wrapper_"+ id).remove();
    });
  }

  // add and remove working area
  $(document).on("click", "#add_new_working_area", function(){
    var workingAreas = $(".working_area");
    var lastWorkingAreaIdArr = workingAreas[workingAreas.length - 1].id.split("_");
    var lastWorkingAreaId = lastWorkingAreaIdArr[lastWorkingAreaIdArr.length - 1];
    var newWorkingAreaId = (parseInt(lastWorkingAreaId) + 1).toString();
    var workingAreaHolder = $("#working_area_holder").text().trim();
    if ($("#confirm_current_city_as_wa_0").length > 0) {
      var newWorkingArea = "<div id='working_area_wrapper_" + newWorkingAreaId + "' class='form-group fieldRemove'><input type='text' name='working_areas[" + newWorkingAreaId + "]' class='working_area form-control' id='working_area_" + newWorkingAreaId + "'><a href='javascript:void(0)' class='addLink remove_working_area' id='remove_working_area_" + newWorkingAreaId + "'><i class='removeIcon'></i>Remove</a></div>"
    }
    else {
      var newWorkingArea = "<div id='working_area_wrapper_" + newWorkingAreaId + "' class='form-group fieldRemove'><input type='text' name='working_areas[" + newWorkingAreaId + "]' class='working_area form-control' id='working_area_" + newWorkingAreaId + "'><a href='javascript:void(0)' class='addLink remove_working_area' id='remove_working_area_" + newWorkingAreaId + "'><i class='removeIcon'></i>Remove</a></div>"
    }
    $("#working_areas").append(newWorkingArea);
  });

  $(document).on("click", ".remove_working_area", function(e){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 1];
    $("#working_area_wrapper_" + id).remove();
  });

  // order email
  $(function(){
    var remaxrecipient = $('#input_remax_recipient');
    var count = $('#input_remax_recipient p').size();
    $(document).on("click", "#add_recipient_for_remax_email",  function() {
      $('<p><input type="email" id="recipient_email" name="recipient_email['+ count +']" class="form-control"/><a href="#" id="removeremaxinput">Remove</a></p>').appendTo(remaxrecipient);
      count++;
      return false;
    });
    $(document).on("click","#removeremaxinput", function() {
      if( count > 1 )
        {
          $(this).parents('p').remove();
          count--;
        }
      return false;
    });
  });


  //show loader when adding responsible person
  $("#addResponsibleBtn").click(function(){
    $('#responsiblePersons').modal('toggle');
  });

  $("#addInternalResponsibleBtn").click(function(){
    $('#internalResponsiblePersons').modal('toggle');
  });

  //responsible_person nda document show/hide
  $(".responsible_role").click(function(){
    if ($("#user_role_internal").is(":checked")) {
      $("#nda_wrapper").addClass('hide');
    }
    if ($("#user_role_external").is(":checked")) {
      $("#nda_wrapper").removeClass('hide');
    }
  });

  // check for valid hours, minutes
  $(document).on( 'change', ".time_hour",function(){
    if (!($(this).val() >= parseInt("00") && $(this).val() <= 23)){
      $(this).val("");
    }
  });

  $(document).on( 'change', ".time_minute",function(){
    if (!($(this).val() >= parseInt("00") && $(this).val() <= 59)){
      $(this).val("");
    }
  });

  $(document).ready(function () {
    setTimeout(function () {
      $(".stepBtnSticky").css('height', $('.stepBtnSticky').height());
      $(".stepBtnSticky").css('position', 'sticky');
    }, 500);  
  });
  
  $(document).ready(function () {
    setTimeout(function () {
      $(".stepBtnStickymanage").css('height', $(window).height());
      $(".stepBtnStickymanage").css('position', 'sticky');
    }, 500);
  });  
  
});

function addThousandSeparators(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
  }
  return x1 + x2;
}

function setScrollPosition(selectedId) {
  $('html,body').animate({scrollTop: ($("#" + selectedId).offset().top - 2) }, 'slow');
}

function slideContent(slideFrom){
  if ($("#open_card_form").val() != 'true') {
    $('#mainWrapper').show('slide', { direction : slideFrom}, 1000);
  }
}

function fadeOutFlashMessage(id){
  $("#" + id).delay(3000).fadeOut(500);
}

function getId(id){
  var idArr = id.split("_");
  return idArr[idArr.length - 1];
}

function setFlashMessage(parentId, flashId, msg, fadeOut, animate){
  $("#" + parentId).html(getFlashMessageEle(msg, flashId));
  if (animate != false){
    SetFocusOnTopOfPage()
    //$('html, body').animate({scrollTop:$('#' + parentId).position().top}, 'slow');
  }
  if (fadeOut != false) {
    fadeOutFlashMessage(flashId);
  }
}

function getFlashMessageEle(msg, flashId){
  return "<div id='" + flashId + "' class='alert alert-dismissible alert-success'><button class='close' data-dismiss='alert' type='button'>×</button>" + msg + "</div>"
}

function common_events(){
  $( '#filterFormId, #filterFormId_agent, #filterFormIdInspector' ).on( 'change', 'select', function(){
    $("#loader-image").show();
    $( '#filterFormId' ).submit();
    $('#filterFormId_agent').submit();
    $('#filterFormIdInspector').submit();
  });
  
  $( '#filterFormId_director' ).on( 'change', 'select', function(){
    $(".pre-icon").show();
    $( '#filterFormId_director' ).submit();
  });

  $(document).on("keyup", ".search_customer_name", function(){
    $(".pre-icon").show();
    $( '#filterFormId_director' ).submit();
  });

  $(document).on('change', '.filter_check_box', function(){
    $("#loader-image").show();
    $(this).closest('form').submit();
  });

  $('.fileUploadMedia').on( 'change', function(){
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.preview_file_box').html('<img src='+e.target.result+'>');
      }
      reader.readAsDataURL(this.files[0]);
    }
  });

  initiateDatePicker();

  // virtual keyboard
  $('.container').on('cocoon:after-insert', function(e, insertedItem) {
    if ($("#pc_browser").val() != 'true') {
      $('.virtualKeyboard').attr('readonly', true);    
      $('.virtualKeyboard').keyboard({
        layout: 'custom',
        restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
        preventPaste : true,  // prevent ctrl-v and right click
        autoAccept : true, 
        keyBinding: 'mousedown touchstart',   
        position: {
          of: null, // null = attach to input/textarea; use $(sel) to attach elsewhere
          my: 'center top',
          at: 'center top',
          at2: 'center bottom', // used when "usePreview" is false
          collision: 'flipfit flipfit'
        },
        usePreview: true,
        initialFocus: true,
        reposition: true,
      });

      $('.datepickeron').datepicker({
        format: 'dd.mm.yyyy',
        weekStart: 1,
        autoclose: true,
        todayHighlight: true,
        clearBtn: true,
        disableTouchKeyboard: true,
        Readonly: true
      }).attr("readonly", "readonly");    
    }
  });

  if ($("#pc_browser").val() != 'true') {
    $('.virtualKeyboard').attr('readonly', true);
  }

  $("#flash_msg").delay(3000).fadeOut(500);

  $(".filter-btn-cls, #filter-btn, #saveMedia, #saveMediaNext").click(function(){
    $("#loader-image").show();
  });
  
  $(document).on("click", ".pre-icon-load", function(){
    $(".pre-icon").show();
  });

  $(document).on("click", ".pre-icon-load-remote", function(){
    $(".pre-icon").show();
  });

  $(document).on("submit", ".pre-load-form", function(){
    $(".pre-icon").show();
  });

  $(document).on("click", ".navbar-toggle", function(){
    $(this).toggleClass('active');
    $('.navbar-collapse').toggleClass('active');
    $('.menuOverlay').toggleClass('active');
  });
  $(document).on("click", ".menuOverlay", function(){
    $(this).removeClass('active');
    $('.navbar-collapse').toggleClass('active');
    $('.navbar-toggle').toggleClass('active');
  });

  $('.officeChoosePosition').change(function(){
    var idArr = this.id.split("_");
    var id = idArr[idArr.length - 2];
    var selected_option = document.getElementById("user_office_users_attributes_" + id + "_position");
    var position_val = selected_option[selected_option.selectedIndex].value;
    if(position_val=="INDIVIDUAL" || position_val=="NO_POSITION"){
      $("#user_office_users_attributes_"+ id +"_team_id").addClass('hide');
      $("#user_office_users_attributes_"+ id +"_team_id").val("");
    }
    else{
      $("#user_office_users_attributes_"+ id +"_team_id").removeClass('hide');
    }
  });

  $(document).on('click', '.hideShowModal', function(){
    $('.modal').modal('hide');
    var show_modal_id = $(this).data('show_modal_id');
    if ($('#' + show_modal_id).length > 0){
      setTimeout(function () {
        $("#" + show_modal_id).modal('show');
      }, 1000);
    }
  });

  $(document).on('change', '.media_file', function(e){
    var parentEl = $(this).closest('.parent');
    $.each(this.files, function() {
      showMediaFilename(this, parentEl);
    });
  });
}

function showMediaFilename(file, parentEl){
  var reader = new FileReader();
  reader.onload = function(e) {
    $(parentEl).find('.media_attachment_name').val(file.name);
  }
  reader.readAsDataURL(file);
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function showFilename(file, ele) {
  var reader = new FileReader();
  reader.onload = function(e) {
    $(ele).val(file.name);
  }
  reader.readAsDataURL(file);
}

function redirectTo(url, params){
  $.each(params, function(index, value){
    url = url + value;
  });
  window.location.replace(url);
}

function initiateDatePicker(normal = $('.datepickeron'), year = $('.datepickeron-year')){
  // date picker
  $(normal).datepicker({
    format: 'dd.mm.yyyy',
    weekStart: 1,
    autoclose: true,
    todayHighlight: true,
    clearBtn: true,
    disableTouchKeyboard: true,
    Readonly: true
  }).attr("readonly", "readonly");

  // date picker
  $(year).datepicker({
    minViewMode: 2,
    format: 'yyyy'
  }).attr("readonly", "readonly");
}

function checkIfAllFieldsHaveValues(elements) {
  var isValid = true;
  $(elements).each(function() {
    if ( !$(this).prop('disabled') && !$(this).prop('readonly') && $(this).val() === '' )
      isValid = false;
  });
  return isValid;
}

function SetFocusOnTopOfPage(){
  $(".modal").animate({ scrollTop: 0 }, "slow");
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function checkIfAllFieldsHaveUniqueValues(elements) {
  var isValid;
  var values = [];
  $(elements).each(function() {
    if ( $(this).val() != '' ) {
      values.push($(this).val())
      var check_valid = true;
      for (i=0; i<values.length; i++) {
        for (j=i+1; j<values.length; j++) {
          if (values[i]==values[j]) {
            isValid = false;
            var first_ele = $(elements)[i];
            var second_ele = $(elements)[j];
            custom_uniquness_validation(first_ele, second_ele);
            check_valid = false;
            break;
          }
        }
      }
      if (check_valid){
        var class_name = $(this).attr("data-unique");
        $('.'+class_name).parent().closest('div').removeClass('has-error');
        $('.'+class_name).parent().closest('div').find('small:eq(0)').remove();
        $('.'+class_name).parent().closest('div').find('i:eq(0)').remove();
      }
    }
  });
  return isValid;
}

function isAnyModalOpen() {
  return $('.modal.in').length > 0;
}

function display_validation_text(element,msg){
  $(element).parent().closest('div').addClass('has-error');
  $(element).parent().closest('div').find('small:eq(0)').remove();
  $(element).parent().closest('div').find('i:eq(0)').remove();
  $(element).parent().closest('div').append('<i class="form-control-feedback fa fa-remove" style="top: 0px;"></i>'); 
  $(element).parent().closest('div').append('<small class="help-block">'+msg+'</small>');

}
function remove_validation_text(element){
  $(element).parent().closest('div').removeClass('has-error');
  $(element).parent().closest('div').find('small:eq(0)').remove();
  $(element).parent().closest('div').find('i:eq(0)').remove();
}

function checkIfSumEqualToOne(elements){
  var isValid = true;
  var total_fraction = 0;
  $(elements).each(function() {
    var fraction = $(this).val();
    if (fraction.match('/') != null){
      var split = fraction.split('/');
      var result = parseInt(split[0], 10) / parseInt(split[1], 10);
      total_fraction += parseFloat(result)
    }else{
      total_fraction += (parseFloat(fraction))
    }
  });
  if (total_fraction == 1) {
    isValid = true;
  }
  else{
    isValid = false; 
  }
  return isValid;
}

function checkIfPerSumEqualToOne(elements){
  var isValid = true;
  var total_percentage = 0;
  $(elements).each(function() {
    if ( $(this).val() != '' ) {
      total_percentage += parseFloat($(this).val())
    }
  });
  if (total_percentage == 100) {
    isValid = true;
  }
  else{
    isValid = false; 
  }
  return isValid;
}

function initVirtualKeyboard(ele){
  $(ele).find('.virtualKeyboard').keyboard({
    layout: 'custom',
    restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
    preventPaste : true,  // prevent ctrl-v and right click
    autoAccept : true,
    keyBinding: 'mousedown touchstart',
    position: {
      of: null, // null = attach to input/textarea; use $(sel) to attach elsewhere
      my: 'center top',
      at: 'center top',
      at2: 'center bottom', // used when "usePreview" is false
      collision: 'flipfit flipfit'
    },
    usePreview: true,
    initialFocus: true,
    reposition: true,
  });
}

function checkIsNaNVal(val){
  val = (isNaN(val)) ? 0 : val;
  return val;
}

function checkNumericValue(number, decimal_points = 2) {
  if (number){
    return parseFloat(parseFloat(number.toString().replace(' ', '').replace(",", ".")).toFixed(decimal_points));
  }
  else{
    return 0;
  }
}

function show_formatted_number(number, decimal_points = 2, with_space = true){
  if (number){
    number = checkNumericValue(number);
    var parts = number.toString().split(".");
    if (with_space){
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return parts.join(",");
  }
  else{
    0
  }
}

function commonAddOrRemoveHideClass(check_object, match_value, type){
  var parentEl = $(check_object).closest(".parent_hide_show_class");
  var childEl = $(parentEl).find(".child_hide_show_class");
  if ($(check_object).val() == match_value){
    if (type == "hide_fields"){
      $(childEl).removeClass("hide");
    }
    if (type == "disable_fields"){
      $(childEl).find('input').attr("disabled", false);
    }
  }
  else{
    if (type == "hide_fields"){
      $(childEl).addClass("hide");
    }
    if (type == "disable_fields"){
      $(childEl).find('input').attr("disabled", true);
      $(childEl).find('input').val("");
    }
  }
}

function modify_next_elements(){
  var elements = $(".jscroll-inner")
  $(elements).each(function() {
    var added = $(this).find('.jscroll-added')
    $(this).append($(added).children('.col-xs-12'))
    $(added).children('.col-xs-12').remove()
    $(this).append($(added))
  });
}