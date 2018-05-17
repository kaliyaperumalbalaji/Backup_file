$('.myimages').click(function(){

   	var imgsrc = $(this).attr('src');

	$('div').removeClass('border-color');
	var getclass = $(this).closest('div').attr('class');
	$('.'+getclass).addClass('border-color');

	$('.box-img').css({"background-image":"url('"+imgsrc+"')","background-size":"100% 100%","background-repeat":"no-repeat"});

	
var a = $(this).parent().attr('class');
	$(a).css('border','10px solid pink');


});

