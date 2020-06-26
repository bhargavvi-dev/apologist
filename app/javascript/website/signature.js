$(document).ready(function(){
  $(document).on("click", ".signature", function(){
    var object_id = $(this).data("object_id");
    if (object_id){
      data = {
              'object_type': $(this).data("object_type"),
              'resource_type': $(this).data("resource_type"),
              'resource_spec': $(this).data("resource_spec"),
              'agent_office_resource': $(this).data("agent_office_resource"),
              'signature_after_close_modal': $(this).data("signature_after_close_modal")
              }
      var associate_type = $(this).data("associate_type");
      var associate_id = $(this).data("associate_id");
      if (associate_type && associate_id){
        data['associate_type'] = associate_type;
        data['associate_id'] = associate_id;
      }
      $.ajax({
        url: '/resources/'+object_id+'/get_signature',
        type: 'POST',
        data: data
      });
    }
  });

  $(document).on("click", "#signature_modal_close", function(){
    $("#signatureModal").modal("hide");
    setTimeout(function(){
      $("#" + $("#signature_after_close_modal").val()).modal("show");
    }, 500);
  });
});

function initiateSignature(dataURL){
  var canvas = document.querySelector("#signature_canvas");

  var signaturePad = new SignaturePad(canvas, {backgroundColor: "rgb(255,255,255)"});

  var image = new Image();
  image.src = "data:image/png;base64," + dataURL;
  image.onload = function () {
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  signaturePad._isEmpty = false;

  // $(window).on("orientationchange",function(){
  //   var canvas = document.querySelector("#signature_canvas");
  //   canvas.width = $(window).height() - $(window).height()/5;
  //   canvas.height = $(window).width() - $(window).width()/3;

  //   var signaturePad = new SignaturePad(canvas, {backgroundColor: "rgb(255,255,255)"});
  //   signaturePad.clear();

  //   var image = new Image();
  //   image.src = signaturePad.toDataURL("image/jpeg");
  //   image.onload = function () {
  //     canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  //   };
  //   signaturePad._isEmpty = false;
  // });

  //signaturePad.fromDataURL("data:image/png;base64," + dataURL);

  $("#clear_signature").off("click");
  $("#clear_signature").on("click", function(){
    signaturePad.clear();
  });

  $("#save_signature").off("click");
  $("#save_signature").on("click", function(){
    if (signaturePad.isEmpty()) {
      alert(I18n.t("js.general.task.provide_signature"));
    }
    else{
      $(".pre-icon").show();
      var id = $("#signature_object_id").val();
      var signatureDataURL = signaturePad.toDataURL("image/jpeg");
      data = {
                dataURL: signatureDataURL,
                object_type: $("#signature_object_type").val(),
                resource_type: $("#signature_resource_type").val(),
                resource_spec: $("#signature_resource_spec").val(),
                agent_office_resource: $("#signature_agent_office_resource").val()
              }
      var associate_type = $("#signature_associate_type").val();
      var associate_id = $("#signature_associate_id").val();
      if (associate_type && associate_id){
        data['associate_type'] = associate_type;
        data['associate_id'] = associate_id;
      }
      $.ajax({
        url: '/resources/'+id+'/save_signature',
        type: 'POST',
        data: data
      });
    }
  })
}