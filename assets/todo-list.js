$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var currentNote = {item: item.val()};
      $.ajax({
        type: 'POST',
        url: '/notesMemoView',
        data: currentNote,
        success: function( data ){
          location.reload();
        }
      });
      return false;
  });

  $('li').on('click', function(){
      var noteSelected = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/notesMemoView/' + noteSelected,
        success: function(data){
          location.reload();
        }
      });
  });

});
