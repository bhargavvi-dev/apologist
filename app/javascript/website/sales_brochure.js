$(document).ready(function(){
  $(document).on('click', '.sb_img_div', function(){
    is_selected = $(this).hasClass('selected');
    $('.sb_img_div').removeClass('selected');
    if (!is_selected) {
      $(this).addClass('selected');
    }
  });

  $(document).on("change", ".brochure_picture_check", function(){
    is_checked = $(this).is(':checked');
    $('.select_brochure_picture').find('.brochure_picture_check').prop('checked', false);
    $('.select_brochure_picture').find('.select_text').removeClass('hide');
    $('.select_brochure_picture').find('.unselect_text').addClass('hide');
    if (is_checked){
      $(this).prop('checked', true);
      $(this).closest(".select_brochure_picture").find(".select_text").addClass('hide');
      $(this).closest(".select_brochure_picture").find(".unselect_text").removeClass('hide');
    }
  });

  $(document).on('click', '#addPitctureBtn', function(){
    if ($("#currentSalesBrochureOperation").val() == "ADD_PICTURE"){
      updateBasedOnCompletedOperation('')
    }
    else{
      updateBasedOnCompletedOperation('ADD_PICTURE')
    }
    addNewBrochurePicture();
  });

  $(document).on("click", ".operation_btn", function(){
    var not_selected = $(this).hasClass('redBgBox');
    $('.operation_btn').removeClass('redBgBox');
    $(this).addClass('redBgBox');
    $(this).removeClass('btn-default');
    if(not_selected){
      $(this).removeClass('redBgBox');
    }
  });

  $(document).on("click", "#DragResizePitctureBtn", function(){
    if ($("#currentSalesBrochureOperation").val() == "CHANGE_PICTURE_PLACE"){
      updateBasedOnCompletedOperation('');
    }
    else{
      updateBasedOnCompletedOperation('CHANGE_PICTURE_PLACE');
    }
    $('.sb_img_div').toggleClass('sb_resize_drag');
  });

  $(document).on("click", "#removePitctureBtn", function(){
    if ($("#currentSalesBrochureOperation").val() == "REMOVE_PICTURE"){
      updateBasedOnCompletedOperation('')
    }
    else{
      updateBasedOnCompletedOperation('REMOVE_PICTURE')
    }
    $('.sb_img_div').toggleClass('sb_remove_resource');
  });

  $(document).on("click", "#changePagePlaceBtn", function(){
    if ($("#currentSalesBrochureOperation").val() == "CHANGE_PAGE_PLACE"){
      updateBasedOnCompletedOperation('');
      makeSalesBrochureSortable('.change_sb_page_place', false);
    }
    else{
      updateBasedOnCompletedOperation('CHANGE_PAGE_PLACE');
      makeSalesBrochureSortable('.change_sb_page_place', true);
    }
    $('.sb_img_div').toggleClass('sb_remove_resource');
  });

  $(document).on("click", ".sb_remove_resource", function(){
    var parentEl = $(this).closest('.sb_img_div');
    var id = $(parentEl).attr('id');
    var idArr = id.split('_');
    var page_no = idArr[idArr.length - 2];
    var picture_no = idArr[idArr.length - 1];
    var removing_picture = $(parentEl).find('.resource_id').val();
    var commission_id = $("#commission_id").val();
    if (removing_picture){
      var t;
      clearTimeout(t);
      t = setTimeout(function () {
        $('.pre-icon').hide()
        $.ajax({
          url: "/agent_office/commissions/"+ commission_id +"/remove_brochure_picture",
          type: 'PUT',
          data: {page_no : page_no, picture_no : picture_no, removing_picture: removing_picture, show_modal: 'marketingMaterialSalesBrochure', notice_id: 'marketing_material_sales_brochure'}
        });
      }, 100);
    }
  });

  $(document).on("click", ".sb_resize_drag", function(){
    var mainParentEl = $('.stepSlideBoxFull');
    var parentEl = $(this).closest('.sb_img_div');
    $('.sb_img_div').css({'border': '0px'});
    $(parentEl).css({'border': '3px dotted'});
    var id = $(parentEl).attr('id');
    var idArr = id.split('_');
    var page_no = idArr[idArr.length - 2];
    var picture_no = idArr[idArr.length - 1];
    var cropping_picture = $(parentEl).find('.resource_id').val();
    if (cropping_picture){
      $(parentEl).draggable({
        addClasses: false,
        containment: ".slideStep",
        drag: function(e, ui) {
          childleftPosition  = $(parentEl).css("left")
          childtopPosition   = $(parentEl).css("top")
          parenttopPosition = $(mainParentEl).height();
          parentleftPosition = $(mainParentEl).width();
          $('.sb_img_div').css({'z-index': 3});
          $(parentEl).css({'z-index': 4, 'border': '3px dotted'});
          v1 = (checkNumericValue(childleftPosition) / checkNumericValue(parentleftPosition));
          v2 = (checkNumericValue(childtopPosition) / checkNumericValue(parenttopPosition));

          v1 = (v1*100).toFixed(2);
          v2 = (v2*100).toFixed(2);

          $(parentEl).find('.left_position').val(v1);
          $(parentEl).find('.top_position').val(v2);
        }
      }).resizable({
        minHeight: 134,
        minWidth: 238,
        containment: '.slideStep',
        start: function( event, ui ) {
          checkParentElHeight(parentEl, ui)
        },
        resize: function( event, ui ) {
          checkParentElHeight(parentEl, ui)
        },
        stop: function( event, ui ) {
          $(parentEl).find('.picture_height').val(height);
          $(parentEl).find('.picture_width').val(width);
          parentHeight = $(parentEl).height();
          parentWidth = $(parentEl).width();
          heightValue = ((checkNumericValue(height) / checkNumericValue(parentHeight))*100).toFixed(2);
          widthValue = ((checkNumericValue(height) / checkNumericValue(parentWidth))*100).toFixed(2);
          $(parentEl).find('.picture_height_in_percent').val(heightValue);
          $(parentEl).find('.picture_width_in_percent').val(widthValue);
          checkParentElHeight(parentEl, ui)
        }
      });
    }
  });

  displaySalesBrochurePictures();

});

function checkParentElHeight(parentEl, ui){
   $(parentEl).css({'border': '3px dotted'});
  height = ui.size.height
  width = ui.size.width
  $(parentEl).children().first().css({'height': height, 'width': width})
}

function makeSalesBrochureSortable(ele, enabled){
  if(enabled){
    $(ele).sortable({});
    $(ele).disableSelection();
  }
  else{
    $(ele).sortable("disable");
  }
}

function updateBasedOnCompletedOperation(current_operation){
  $('#completedSalesBrochureOperation').val($('#currentSalesBrochureOperation').val());
  $('#currentSalesBrochureOperation').val(current_operation);
  if (current_operation == "CHANGE_PAGE_PLACE"){
    $("#saleBrochurePageSortArea").removeClass('hide');
    $("#saleBrochurePictureArea").addClass('hide');
  }
  else{
    $("#saleBrochurePageSortArea").addClass('hide');
    $("#saleBrochurePictureArea").removeClass('hide');
  }
  if ($("#completedSalesBrochureOperation").val() == "CHANGE_PICTURE_PLACE" || $("#completedSalesBrochureOperation").val() == "CHANGE_PAGE_PLACE" || $("#completedSalesBrochureOperation").val() == "ADD_PICTURE"){
    $("#save_sales_brochure_completed_operation").click();
  }
}

function resetSalesBrochureOperations(){
  $('#completedSalesBrochureOperation').val('');
  $('#currentSalesBrochureOperation').val('');
}

function displaySalesBrochurePictures(){
  $(".sales_brochure_page li").each(function(){
    var parentEl = $(this).closest('.sb_img_div');
    var left = $(parentEl).find('.left_position').val();
    var top = $(parentEl).find('.top_position').val();
    var height = $(parentEl).find('.picture_height').val();
    var width = $(parentEl).find('.picture_width').val();
    var percentHeight = $(parentEl).find('.picture_height_in_percent').val();
    var percentWidth = $(parentEl).find('.picture_width_in_percent').val();
    var ele = $(parentEl).find('.draggable');
    $(ele).css({"height": height, "width": width});
    $(parentEl).css({"top": top+'%', "left": left+'%', "height": height, "width": width});
  });
}

function addNewBrochurePicture(){
  var page_no = $('#sales_brochure_current_page').text().trim();
  var parentEl = $('#sales_brochure_page_'+page_no).find('.sb_img_div')
  var ele = $('ul#sales_brochure_page_'+page_no).children('li').last();
  var id = $(ele).attr('id');
  if (id){
    $('.modal').modal('hide');
    setTimeout(function(){
      $("#chooseBrochurePictureTypeModal").modal("show");
    }, 500);
    $("#chooseBrochurePictureTypeModalBack").attr("data-show_modal_id", "marketingMaterialSalesBrochure");
    var idArr = id.split('_');
    var picture_no = idArr[idArr.length - 1];
    picture_no = parseInt(picture_no)+1;
    $(".add_brochure_picture_page_no").val(page_no);
    $(".add_brochure_picture_picture_no").val(picture_no);
    $(".add_brochure_picture_old_resource_id").val(picture_no);
    var url = $(".change_marketing_picture_url_photograph").attr('data-temp_url');
    $(".change_marketing_picture_url_photograph").attr('href', url.replace(/replace_folder_type/g, "partner_photographs_print").replace(/replace_page_no/g, page_no).replace(/replace_picture_no/g, picture_no).replace(/replace_resource_id/g, picture_no).replace(/replace_channel_type/g, "SALES_BROCHURE").replace(/replace_back_show_modal_id/g, "marketingMaterialSalesBrochure"));
    var url = $(".change_marketing_picture_url_ground_floor").attr('data-temp_url');
    $(".change_marketing_picture_url_ground_floor").attr('href', url.replace(/replace_folder_type/g, "partner_ground_floor_print").replace(/replace_page_no/g, page_no).replace(/replace_picture_no/g, picture_no).replace(/replace_resource_id/g, picture_no).replace(/replace_channel_type/g, "SALES_BROCHURE").replace(/replace_back_show_modal_id/g, "marketingMaterialSalesBrochure"));
  }
}