window.proportion = 1;

var winSupportStyleTag = "<style> @-moz-viewport { width: 1024px; height: 704px; }@-ms-viewport { width: 1024px; height: 704px; } body, html, *{ -ms-touch-action:none; -ms-user-select:none;} html { background: none !important; background-image: -webkit-radial-gradient(center,circle farthest-side,#9ECE61 0,#669D40 100%) !important; background-image: -ms-radial-gradient(center,circle farthest-side,#9ECE61 0,#669D40 100%) !important; background-image: -moz-radial-gradient(center,circle farthest-side,#9ECE61 0,#669D40 100%) !important; }</style>";
$(document).find("head").append(winSupportStyleTag);

function ReadySupport() {
	SetMSstyles();
	if (window.navigator.msPointerEnabled) {
		console.log("MsPointer")
	}else{
	$('#item18,#item19').css('line-height','45px')
	$('#item25,#item15,#item12,#item11').css('line-height','42px')
	}
}

function SetMSstyles() {
	$("*").each(function(){
		var element = $(this);
		if (element.hasClass("question") || element.hasClass("IOContainer")) element.css({"background-image":"radial-gradient(circle farthest-side, rgb(89, 124, 165) 0px, rgb(61, 84, 133) 100%)"});
		else if (element.prop("tagName").toLowerCase() == "body") element.css({"background":"none","-ms-touch-action":"none"});
	});
}