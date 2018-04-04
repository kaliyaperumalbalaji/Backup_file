var pagecontainer, menucontainer, page0, navBtns, nextBtn, prevBtn, submitBtn, submitBlocker, prevSubBtn, numStrip;
var question_1, question_2, question_3, question_4;
var navActiveBtnCls = "navActiveBtn";
var downEvent = "mousedown";
var version = "1.1";
var fullQuizViewed = 0;
var reviewScreen = false;
var numKeypad;
var currentQuestion = 0;
var previousQuestion = 1;
var submitEnable = 0;
var submitBlock=false;
//var answerArr = ["34","24","24","35"];
var ansArr = ["60","94","80","85"];
var audinst= new Audio('audio/instruct.mp3');
var questAudio= new Audio('audio/questAudio.mp3');
var eventType = "click";
var totNum = 10;
var correctCount = 0;
var contIncorrect = 0;
var len=0;
//eventBroker = _({}).extend(require('chaplin/lib/event_broker'));

function instruct()
	{
		//try{audinst.currentTime = 0;}catch(e){}
		//try{audinst.pause();}catch(e){}
		$(".question, #blocker").hide();
		$('.btInfo').css({'opacity':'1'});
	}
	
function showInstruction()
{
	//try{questAudio.pause()}catch(e){}
	//try{questAudio.currentTime = 0}catch(e){};
	//audinst.play();
	$(".question, #blocker").show();
	$('.btInfo').css({'opacity':'0.5'});
	//try{numKeypad.hidePad()}catch(e){}
	$(".score").css({'display':'none'});
}

$(document).ready(function(){
   
    $("body").css({"-webkit-transform":"scale(0.997)"});
    loadBasic();
    showInstruction();
    page0.css({"visibility":"hidden"});
    loadQuestion();
    page0.css({"visibility":"visible"});
	dragEnable();
	dropEnable();
	checkResetEnable();
	checkFeedbackEnable();
  $(".icoInfo").bind("click", showInstruction);
  //fetch functionality
    	eventBroker = _({}).extend(require('chaplin/lib/event_broker'));
	eventBroker.publishEvent("#fetch", { type : 'state' }, function(state) {
		if (state) {
			_.each(JSON.parse(state), function(value, key, list) {
			    if (key == "inputVal1") {
				$("#slide_1").html(value);
		}
		else if (key == "inputVal2") {
				$("#slide_2").html(value);
		}
		else if (key == "inputVal3") {
				$("#slide_3").html(value);
		}
		else if (key == "inputVal4") {
				$("#slide_4").html(value);
		}
		else if (key=="currentQuestion") {
			    currentQuestion = value;
			    loadQuestion();
			}else if (key == "previousQuestion") {
			    previousQuestion = value;
		}
		else if (key=="resetStatus") {
			$('.icoReset').css('opacity',value)
			$(".icoReset").unbind('click',resetfn);
			$(".icoReset").bind('click',resetfn);
		}
		else if (key=="sumbitBoxstate") {
			$(".icoFeed").css('background-image',value)
			$(".icoFeed").unbind('click',submitfn);
			$(".icoFeed").bind('click',submitfn);
			//try{$('#sumbitBox').bind('click',submit);}catch(e){}
		}
		else if (key == "fullQuizViewed"){
			    fullQuizViewed = value;
			    
			    for(var i = 0; i < fullQuizViewed; i++){
				$(".pagebtn").eq(i).addClass("visitedPages");
			    }
			}
			});
		}
				dragEnable();
				dropEnable();
		$('.screen1_Staticbox7,.screen1_Staticbox6 ').find('ui-droppable').draggable("destroy");
        		$('.screen1_Staticbox7,.screen1_Staticbox6').find('.dropstrip').draggable({
			zIndex: 10000,
			stop: function (){
				//$('.dropstrip').removeAttr('style');
			    $(this).remove();
			    checkFeedbackEnable();
			    $('.icoReset').css({'opacity':'0.5'});
			}
		    });
	});
});

/*Save Functionality*/
eventBroker = _({}).extend(require('chaplin/lib/event_broker'));
eventBroker.subscribeEvent('#doSave', function(state) {
    var state = {};
    /*Change here for each interactive*/
    /* var textVal = new Array(); 
	    var boxLength = $('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').length;
	    for(var i=0; i<boxLength; i++){
		textVal.push($('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').eq(i).text());
			    }
			  */
    console.log(currentQuestion,"currentQuestion")
    var textVal1 = $("#slide_1").html();
    var textVal2 = $("#slide_2").html();
    var textVal3 = $("#slide_3").html();
    var textVal4 = $("#slide_4").html();
    
 fullQuizViewed = $(".visitedPages").length;
    state = {"inputVal1":textVal1,"inputVal2":textVal2,"inputVal3":textVal3,"inputVal4":textVal4, "currentQuestion":currentQuestion,"previousQuestion":previousQuestion, "fullQuizViewed": fullQuizViewed, "resetStatus":$('.icoReset').css('opacity'),"sumbitBoxstate":$(".icoFeed").css('background-image')};
    var message = {
	    type : 'state',
	    data : JSON.stringify(state)
    };
    eventBroker.publishEvent("#save", message);
    //audinst.play();

});
function NumberStrip(){
	for (var i=0;i<totNum;i++ ){
	{
        $('#numStrips').append('<div class="stripStyle">'+ i +'</div>');
	}
	}
}

function checkFeedbackEnable() {
	if(($('#slide_1').find('.screen1_Staticbox6').text()!="")&&($('#slide_1').find('.screen1_Staticbox7').text()!="")&&($('#slide_2').find('.screen1_Staticbox6').text()!="")&&($('#slide_2').find('.screen1_Staticbox7').text()!="")&&($('#slide_3').find('.screen1_Staticbox6').text()!="")&&($('#slide_3').find('.screen1_Staticbox7').text()!="")&&($('#slide_4').find('.screen1_Staticbox6').text()!="")&&($('#slide_4').find('.screen1_Staticbox7').text()!="")){
		$(".icoFeed").css({'background-image':'url(images/btFeedOn@2x.png)','cursor':'pointer'});
		$(".icoFeed").unbind('click',submitfn);
		$(".icoFeed").bind('click',submitfn)
	}
	else{
		
		$(".icoFeed").css({'background-image':'url(images/btFeedOff@2x.png)','cursor':'default'})
		$(".icoFeed").unbind('click',submitfn)
		$('.score').hide();
	}
	
}

//function checkResetEnable() {
//	if(currentQuestion==0){
//		console.log($('.slide').find('.screen1_Staticbox6').text()=="")
//	}
//	
//}
function checkResetEnable() {
	
	isEnabled=false;
	$('.slide').eq(currentQuestion).find('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').each(function(){
		
		if($(this).text()!=""){
			isEnabled=true;
			}
		});
	if(isEnabled ==true) {
		
		$(".icoReset").css({'opacity':'1','cursor':'pointer'})
		$(".icoReset").bind('click',resetfn)
		}
		else{
		$(".icoReset").css({'opacity':'0.5','cursor':'default'})
		//$(".icoReset").removeClass('icoResetMove');
		$(".icoReset").unbind('click',resetfn)
	};
	
}

function submitfn() {
	//var inpVal = $('#slide_'+(ans+1)).find('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').text();
	//var outVal = ansArr[ans];
	var getImageNameUrl = $(".icoFeed").css("background-image").split("/");
	var getImageName = getImageNameUrl[getImageNameUrl.length -1].replace(")","");
	if(getImageName == "btFeedOn@2x.png"){
        correctCount=0;
	for (var ans=1;ans<=ansArr.length;ans++) {
		if ($('#slide_'+(ans)).find('.screen1_Staticbox6,.screen1_Staticbox7').text() == ansArr[ans-1]) {
			correctCount++;
		}
	}
	contIncorrect = ansArr.length-correctCount;
	$('#crt').html(correctCount);
	$('#incrt').html(contIncorrect);
	$('.score').toggle();
	}
	
}
function loadBasic()
{
		pagecontainer = $('<div id="interactive-container" />');
		menucontainer = $('<div id="pagecontainer" />');
		page0 = $('<div id="page-0" class="page" />');
		var instruction = $("<div id=\"blocker\" onclick=\"instruct()\" ></div><div class=\"question\" onclick=\"instruct()\"><div style=\"position:absolute; left:2%; top:4%; opacity:0.6;\" ><div><img src=\"images/btInfoOn.png\" width=\"25px\" height=\"27px\" /></div></div><span style=\"text-align:left; font-family:myFontfamily; left:45px; line-height:1.4em; width:410px; position:absolute; top:45px;\">There are four addition problems. In each problem, fill in the missing numbers. Press the arrows to move to the problem before or the problem after. To check your work, tap the feedback button.</span><div class=\"closeBtn\" >&#x000D7;</div></div>");
		navBtns = $('<div class="contentFeedback"><div class="pagebtnCon"><div class="pagebtn" style="left: 462px;" id="page_1_icon"></div><div class="pagebtn" style="left: 482px;" id="page_2_icon"></div><div class="pagebtn" style="left: 502px;" id="page_3_icon"></div><div class="pagebtn" style="left: 522px;" id="page_4_icon"></div></div> <div class="btReset"><div class="icoReset"></div> </div> <div class="btInfo" style="opacity:1"><div class="icoInfo"></div></div><div class="btFeedback"><div class="icoFeed inactive" id="submit"></div></div><div class="score"><div id="contCorrect"><span id="crt">0</span> <img src="images/IconCorrect.png"></div><div id="contIncorrect"><span id="incrt">0</span><img src="images/IconIncorrect.png"></div></div></div>');
		numStrip = $('<div id="numStrips"></div>')
		//prom = $("<div id=\"nextPage\" class=\"next\"></div><div id=\"submit\" class=\"sub_nav\"></div>");
		prevSubBtn = $('<div class="prevBtn1"></div>');/*<div id="sumbitBox"></div>*/
		nexrpre = $('<div class="nextpre"></div>');
		vkeyCont = $("<div id=\"vkeyCont\" />");
		page0.append(instruction).append(navBtns);
		page0.append(nexrpre).append(prevSubBtn);
		//page0.append(prom);
		page0.append(vkeyCont);
		page0.append(numStrip);
		//page0.append('<div id="popup"><button type="submit" value="Ok" class="alertOkBtn">OK</button><div id="crtTxt"></div><div id="correct"></div><div id="Incorrect"></div><div id="IncrtTxt"></div><div id="inCorrect"></div></div><div id="blocker1"></div>');
		$(".icoInfo").bind("click", showInstruction);
	        $(".icoReset").css({'opacity':'0.5'});
	        $(".icoReset").removeClass(navActiveBtnCls);
   	//$(".icoFeed").bind(downEvent, validate);
	
	question_1 = $("<div class=\"slide\" id=\"slide_1\"><div class=\"inputcontainer\"><div class=\"questionSubHolder screen1_Staticbox0\" ></div><div class=\"questionSubHolder screen1_Staticbox1\">1</div><div class=\"questionSubHolder screen1_Staticbox2\">3</div><div class=\"questionSubHolder screen1_Staticbox3\">+</div><div class=\"questionSubHolder screen1_Staticbox4\">4</div><div class=\"questionSubHolder screen1_Staticbox5\">7</div><div class=\"borderTop\"></div><div class=\"questionSubHolder screen1_Staticbox6\"></div><div class=\"questionSubHolder screen1_Staticbox7\"></div></div></div>");
	
	question_2 = $("<div class=\"slide\" id=\"slide_2\"><div class=\"inputcontainer\"><div class=\"questionSubHolder screen1_Staticbox0\" ></div><div class=\"questionSubHolder screen1_Staticbox1\">3</div><div class=\"questionSubHolder screen1_Staticbox2\">5</div><div class=\"questionSubHolder screen1_Staticbox3\">+</div><div class=\"questionSubHolder screen1_Staticbox4\">5</div><div class=\"questionSubHolder screen1_Staticbox5\">9</div><div class=\"borderTop\"></div><div class=\"questionSubHolder screen1_Staticbox6\"></div><div class=\"questionSubHolder screen1_Staticbox7\"></div></div></div>");
	
	question_3 = $("<div class=\"slide\" id=\"slide_3\"><div class=\"inputcontainer\"><div class=\"questionSubHolder screen1_Staticbox0\" ></div><div class=\"questionSubHolder screen1_Staticbox1\">2</div><div class=\"questionSubHolder screen1_Staticbox2\">8</div><div class=\"questionSubHolder screen1_Staticbox3\">+</div><div class=\"questionSubHolder screen1_Staticbox4\">5</div><div class=\"questionSubHolder screen1_Staticbox5\">2</div><div class=\"borderTop\"></div><div class=\"questionSubHolder screen1_Staticbox6\"></div><div class=\"questionSubHolder screen1_Staticbox7\"></div></div></div>");
	
	question_4 = $("<div class=\"slide\" id=\"slide_4\"><div class=\"inputcontainer\"><div class=\"questionSubHolder screen1_Staticbox0\" ></div><div class=\"questionSubHolder screen1_Staticbox1\">2</div><div class=\"questionSubHolder screen1_Staticbox2\">5</div><div class=\"questionSubHolder screen1_Staticbox3\">+</div><div class=\"questionSubHolder screen1_Staticbox4\">6</div><div class=\"questionSubHolder screen1_Staticbox5\">0</div><div class=\"borderTop\"></div><div class=\"questionSubHolder screen1_Staticbox6\"></div><div class=\"questionSubHolder screen1_Staticbox7\"></div></div></div>");
	
	//question_2 = $("<div class=\"slide\" id=\"slide_3\"><div class=\"inputcontainer\"></div><input id=\"input3\" class=\"numTxt\" readonly=\"true\" / ><input id=\"input4\" class=\"numTxt\" readonly=\"true\"><div class=\"questionSubHolder\" style=\"margin-left:384px; margin-top:104px; \">+</div><div class=\"questionSubHolder\" style=\"margin-left:468px; margin-top:104px;\">3</div><div class=\"questionSubHolder\" style=\"margin-left:550px; margin-top:104px;\">5</div><div class=\"borderTop\"></div><div class=\"questionSubHolder\" style=\"margin-left:468px; margin-top:210px;\">5</div><div class=\"questionSubHolder\" style=\"margin-left:550px; margin-top:210px;\">9</div></div>");
	
	//question_3 = $("<div class=\"slide\" id=\"slide_3\"><div class=\"inputcontainer\"></div><div class=\"questionSubHolder\" style=\"margin-left:468px; margin-top:22px;\">2</div><div class=\"questionSubHolder\" style=\"margin-left:550px; margin-top:22px;\">8</div><div class=\"questionSubHolder\" style=\"margin-left:384px; margin-top:104px; \">+</div><input id=\"input5\" class=\"numTxt\" readonly=\"true\" / ><input id=\"input6\" class=\"numTxt\" readonly=\"true\"><div class=\"borderTop\"></div><div class=\"questionSubHolder\" style=\"margin-left:468px; margin-top:210px;\" >5</div><div class=\"questionSubHolder\" style=\"margin-left:550px; margin-top:210px; \">2</div></div>");
	
	//question_4 = $("<div class=\"slide\" id=\"slide_4\"><div class=\"inputcontainer\"></div><input id=\"input7\" class=\"numTxt\" readonly=\"true\" / ><input id=\"input8\" class=\"numTxt\" readonly=\"true\"><div class=\"questionSubHolder\" style=\"margin-left:384px; margin-top:104px;\">+</div><div class=\"questionSubHolder\" style=\"margin-left:468px; margin-top:104px;\">2</div><div class=\"questionSubHolder\" style=\"margin-left:550px; margin-top:104px; \">5</div><div class=\"borderTop\"></div><div class=\"questionSubHolder\" style=\"margin-left:468px; margin-top:210px;\" >6</div><div class=\"questionSubHolder\" style=\"margin-left:550px; margin-top:210px; \">0</div></div>");
	
	page0.append(question_1).append(question_2).append(question_3).append(question_4);
	
	nextBtn = $("<div id=\"nextBtn\"></div>");
	prevBtn = $("<div id=\"prevBtn\"></div>");
	page0.append(nextBtn).append(prevBtn).append(submitBtn);
	
	menucontainer.append(page0);
	pagecontainer.append(menucontainer);
	$("body").append(pagecontainer);
	 NumberStrip();
	 
	//numKeypad = new vKeyPad(".numTxt");	
	//$(".keypadHolder").draggable({containment: "#vkeyCont"});
	try{$(".icoReset").unbind('click',resetfn);}catch(e){}
	$('#submitBtn').hide();
	/*$('#tapAudio').bind('click', questionAudio);
	$("input").focus(function() {
	    $(this).css({"background-image":"-webkit-radial-gradient(left, rgba(200, 219, 182, 0.99), #ccc)"});
	    if ($('.score').css('display') == 'block') {
		$('.score').hide();
		$(".icoFeed").addClass("icoFeedMove")
	    }
	});
	$("input").focusout(function() {
	    $(".numTxt").removeClass("focused");
	    $(".keypadHolder").css({'visibility':'hidden'});
	});
	$(".vkBtn").click(function() {
	    if ($('.score').css('display') == 'block') {
		$('.score').hide();
		$(".icoFeed").addClass("icoFeedMove")
	    }
	    value_appears = false;
	    for(var i=0; i<$('.numTxt').length; i++){
		if ($('.numTxt').eq(i).val() != "") {
		    value_appears = true;
		}
	    }
	    if (value_appears == true) {
		if ($(".icoReset").css('opacity')=='0.5') {
		    $(".icoReset").css({'opacity':'1','cursor':'pointer'})
		    $(".icoReset").bind('click',resetfn)
		}
	    }
	    else {
		$(".icoReset").css({'opacity':'0.5','cursor':'default'})
		$(".icoReset").removeClass('icoResetMove');
		$(".icoReset").unbind('click',resetfn)
	    }
	    value_appears = true;
	    for(var i=0; i<$('.numTxt').length; i++){
		if ($('.numTxt').eq(i).val() == "") {
		    value_appears = false;
		}
	    }
	    if (value_appears == true) {
		if ($(".icoFeed").hasClass("icoFeedMove")==false) {
		    
		$("#sumbitBox").css("opacity","1");
		try{$('#sumbitBox').bind('click',submit);}catch(e){}
		}
	    }
	    else {
		//$(".icoFeed").removeClass("icoFeedMove")
		$("#sumbitBox").css("opacity","0.5");
		try{$('#sumbitBox').unbind('click',submit);}catch(e){}
		//$(".icoFeed").unbind('click',submitfn);
	    }
	});
	$(".vkBtnBS").click(function() {
	    if ($('.score').css('display') == 'block') {
		$('.score').hide();
		$(".icoFeed").addClass("icoFeedMove")
	    }
	    value_appears = false;
	    for(var i=0; i<$('.numTxt').length; i++){
		if ($('.numTxt').eq(i).val() != "") {
		    value_appears = true;
		}
	    }
	    if (value_appears == true) {
		if ($(".icoReset").css('opacity')=='0.5') {
		    $(".icoReset").css({'opacity':'1','cursor':'pointer'})
		    $(".icoReset").bind('click',resetfn)
		}
	    }
	    else {
		$(".icoReset").css({'opacity':'0.5','cursor':'default'})
		$(".icoReset").removeClass('icoResetMove');
		$(".icoReset").unbind('click',resetfn)
	    }
	    
	    value_appears = true;
	    for(var i=0; i<$('.numTxt').length; i++){
		if ($('.numTxt').eq(i).val() == "") {
		    value_appears = false;
		}
	    }
	    if (value_appears == true) {
		if ($(".icoFeed").hasClass("icoFeedMove")==false) {
		    $(".icoFeed").addClass("icoFeedMove")
		   
		}
	    }
	    else {
		//$(".icoFeed").removeClass("icoFeedMove")
		$("#sumbitBox").css("opacity","0.5");
		try{$('#sumbitBox').unbind('click',submit);}catch(e){}
		//$(".icoFeed").unbind('click',submitfn);
	    }
	//    for(var i=1; i<=3; i++){
	//	for (var j=3; j<=8; j++) {
	//	    row1 = $("#r"+i+"c"+j)[0].innerHTML
	//	    if (row1.indexOf("<br") != -1) {
	//		$("#r"+i+"c"+j)[0].innerHTML = row1.substring(0,row1.indexOf("<br"))
	//	    }
	//	}
	//    }
	});*/
	$(".icoReset").unbind('click',resetfn);
	$(".icoReset").removeClass('icoResetMove');
	
	nextBtn.bind(downEvent, function(){
		if (currentQuestion < 3 || previousQuestion < 3){
			currentQuestion++;
			previousQuestion++;
			loadQuestion();
			checkResetEnable();
			//checkFeedbackEnable();
		}
	});
	prevBtn.bind(downEvent, function(){
		
		if (currentQuestion > 1 || previousQuestion > 1 ) {
			currentQuestion--;
			previousQuestion--;
			loadQuestion();
			checkResetEnable();
			//checkFeedbackEnable();
		}
		
	});
}

function beginPage() {
     $('#submitBlocker').css({'display':'none'});
     $('.prevBtn1').css({'display':'none'});
	for (var i=1;i<=4;i++) {
	    $('#page_'+i+'_icon').addClass('pagebtn');
	}
	$("#page_"+(currentQuestion+1)+"_icon").addClass("activePageBtn");
	$("#page_"+(previousQuestion-1)+"_icon").addClass("visitedPageBtn");
	loadQuestion();
}
function loadQuestion() {
	$(".pagebtn").removeClass("activePageBtn");
	$("#page_"+(previousQuestion+1)+"_icon").removeClass("visitedPageBtn");
	$(".pagebtn:lt("+currentQuestion+")").addClass("visitedPageBtn");
	$(".pagebtn:eq("+currentQuestion+")").addClass("activePageBtn");
	$("#page_"+(currentQuestion+1)+"_icon").addClass("activePageBtn").removeClass("visitedPageBtn").addClass("visitedPages");
	$("#page_"+(previousQuestion-1)+"_icon").addClass("visitedPageBtn");
	$(".slide").hide();
	$("#slide_"+(currentQuestion+1)).show();
	//var text = $("#drag_source"+(currentQuestion+1)).eq().text();
	var text = $("#drag_source"+(currentQuestion+1)).children().text()
	
	
	if (text != "123456,") {
	    //resetEnable();
	}else if (currentQuestion == "0") {
	    $(".icoReset").css({'opacity':'0.5','cursor':'default'});
	    $(".icoReset").unbind('click');
	}
	else {
	    $(".icoReset").css({'opacity':'0.5','cursor':'default'});
	    $(".icoReset").unbind('click');
	}
	
	/*Hiding Previous Btn in first screen*/
	if($('#slide_1').css('display')=="block"){
		    $('#prevBtn').css({"cursor":"default","opacity":"0.5"});
		    //prevBtn.unbind(downEvent);
		    }
		else
		{
		    $('#prevBtn').css({"opacity":"1","cursor":"pointer"});
		     // prevBtn.bind(downEvent);
		}
		
	/*Hiding Next Btn in last screen*/
	if($('#slide_4').css('display')=="block"){
		    $('#nextBtn').css({"cursor":"default","opacity":"0.5"});
		    //nextBtn.unbind(downEvent);
		    //$('#submitBtn').show();
		    
		}
		else
		{
		    $('#nextBtn').css({"opacity":"1","cursor":"pointer"});
		    $('#submitBtn').hide();
		    //nextBtn.bind(downEvent);
		}		   
}
function dragEnable() {
	$("#numStrips").css({'cursor':'pointer','z-index':'1'});
	$("#numStrips").find('.stripStyle').draggable({
	helper:"clone",
	revert:"invalid",
	drag:function(event,ui){
		$('.score').hide();
	}
	});
  }

function dropEnable() {
	$('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').droppable({
		drop:function(event, ui){
		$(this).html($(ui.helper).clone());
		$(this).find('.stripStyle').removeAttr('style');
		$(this).find('.stripStyle').addClass('dropstrip');
		$(this).find('.dropstrip').removeClass('stripStyle');
		$(this).children().css({'left':'0px','top':'0px'});
		$(this).find('.dropstrip').draggable({
					stop:function(event, ui){
						$(ui.helper).remove();
						$('.dropstrip').removeAttr('style');
						checkFeedbackEnable();
						checkResetEnable();
						
					     }
					     });
		checkFeedbackEnable();
		checkResetEnable();
		$('.score').hide();
		}
		});
  }
function resetfn(){
	$(".icoReset").removeClass('icoResetMove');
    var to=setTimeout(function(){
	clearInterval(to); $(".icoReset").addClass('icoResetMove');
		    },100)
		$(".icoFeed").css({'background-image':'url(images/btFeedOff@2x.png)','cursor':'default'});
		$(".icoFeed").unbind('click',submitfn);
		$('.score').hide();
		if (currentQuestion==0) {
		$('#slide_1').find('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').html("");
		$('.icoReset').css({'opacity':'0.5'});
		$(".icoReset").unbind('click',resetfn);
		}
		if (currentQuestion==1) {
		$('#slide_2').find('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').html("");
		$('.icoReset').css({'opacity':'0.5'});
		$(".icoReset").unbind('click',resetfn);
		}
		if (currentQuestion==2) {
		$('#slide_3').find('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').html("");   
		$('.icoReset').css({'opacity':'0.5'});
		$(".icoReset").unbind('click',resetfn);
		}
		if (currentQuestion==3) {
		$('#slide_4').find('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').html(""); 
		$('.icoReset').css({'opacity':'0.5'});
		$(".icoReset").unbind('click',resetfn);
		}
	//checkResetEnable();
}
function changeColr() {
	if(resetBlock){
		$('.icoReset').css({'opacity':'1'});
		try{$(".icoReset").unbind('click',resetfn);}catch(e){}
		$(".icoReset").bind('click',resetfn);
	}
}
function saveFunction(){
 eventBroker.publishEvent("#doSave");
}
function AudioState() {
    if (audinst.paused == false) {
	audinst.pause();
	audinst.currentTime = 0;
	audinst.play();
    }
    else{
	audinst.play()
    }
}
function questionAudio() {
    if (questAudio.paused == false) {
	questAudio.pause();
	questAudio.currentTime = 0;
	questAudio.play();
    }
    else{
	questAudio.play();
    }
}