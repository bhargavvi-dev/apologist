$(document).ready(function(){
  var t;

  $(document).on('keyup', '#search, #agent_search, .search',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $('#filterFormId').submit();
      $('#filterFormId_agent').submit();
      $("#loader-image").show();
    }, 500);
  });

  $(document).on('keyup', '#inspector_search, .search',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $('#filterFormIdInspector').submit();
      $("#add-inspector-loader").show();
    }, 500);
  });

  $(document).on('keyup', '#messageSearch',  function() {
    clearTimeout(t);
    t = setTimeout(function () {
      $("#loader-image").show();
      $.ajax({
        url: '/messages/search/user_filter',
        type: 'POST',
        data: {search : $("#messageSearch").val(), id : $("#id").val()}
      });
    }, 500);
  });

  $(document).on('keyup', '#customer_messageSearch',  function() {
    clearTimeout(t);    
    t = setTimeout(function () {
      $("#loader-image").show();
      $.ajax({
        url: '/messages/search/customer_filter',
        type: 'POST',
        data: {search : $("#customer_messageSearch").val(), id : $("#id").val()}
      });
    }, 500);
  });
});