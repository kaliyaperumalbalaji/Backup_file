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
//var ansArr = ["60","94","80","85"];
var ansArr = ["34","24","24","35"];
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
		
		$(".question, #blocker").hide();
		$('.btInfo').css({'opacity':'1'});
	}
	
function showInstruction()
{
	
	$(".question, #blocker").show();
	$('.btInfo').css({'opacity':'0.5'});
	
	$(".score").css({'display':'none'});
}

$(document).ready(function(){
    $("body").css({"-webkit-transform":"scale(0.997)"});
    
		pagecontainer = $('<div id="interactive-container" />');
		menucontainer = $('<div id="pagecontainer" />');
		page0 = $('<div id="page-0" class="page" />');
		var instruction = $("<div id=\"blocker\"></div><div class=\"question\"><div style=\"position:absolute; left:2%; top:4%; opacity:0.6;\" ><div><img src=\"images/btInfoOn.png\" width=\"25px\" height=\"27px\" /></div></div><span style=\"text-align:left; font-family:GillSansInfant; left:45px; line-height:1.4em; width:410px; position:absolute; top:45px;\">There are four addition problems. In each problem, fill in the missing numbers. Press the arrows to move to the problem before or the problem after. To check your work, tap the feedback button.</span><div class=\"closeBtn\" onclick=\"instruct()\">&#x000D7;</div></div>");
		navBtns = $('<div class="contentFeedback"><div class="pagebtnCon"><div class="pagebtn" style="left: 462px;" id="page_1_icon"></div><div class="pagebtn" style="left: 482px;" id="page_2_icon"></div><div class="pagebtn" style="left: 502px;" id="page_3_icon"></div><div class="pagebtn" style="left: 522px;" id="page_4_icon"></div></div> <div class="btReset"><div class="icoReset"></div> </div> <div class="btInfo" style="opacity:1"><div class="icoInfo"></div></div><div class="btFeedback"><div class="icoFeed inactive" id="submit"></div></div><div class="score"><div id="contCorrect"><span id="crt">0</span> <img src="images/IconCorrect.png"></div><div id="contIncorrect"><span id="incrt">0</span><img src="images/IconIncorrect.png"></div></div></div>');
		numStrip = $('<div id="numStrips"></div>')
		
		prevSubBtn = $('<div class="prevBtn1"></div>');
		nexrpre = $('<div class="nextpre"></div>');
		vkeyCont = $("<div id=\"vkeyCont\" />");
		page0.append(instruction).append(navBtns);
		page0.append(nexrpre).append(prevSubBtn);
		//page0.append(prom);
		page0.append(vkeyCont);
		page0.append(numStrip);
		
		$(".icoInfo").bind("click", showInstruction);
	        $(".icoReset").css({'opacity':'0.5'});
	        $(".icoReset").removeClass(navActiveBtnCls);
   	
	
	question_1 = $("<div class=\"slide\" id=\"slide_1\"><div class=\"inputcontainer\"><div class=\"questionSubHolder screen1_Staticbox0\" ></div><div class=\"questionSubHolder screen1_Staticbox1\">1</div><div class=\"questionSubHolder screen1_Staticbox2\">3</div><div class=\"questionSubHolder screen1_Staticbox3\">+</div><div class=\"questionSubHolder screen1_Staticbox4 screen1_Staticbox4a\">4</div><div class=\"questionSubHolder screen1_Staticbox5 screen1_Staticbox5a\">7</div><div class=\"borderTop\"></div><div class=\"questionSubHolder screen1_Staticbox6 screen1_Staticbox6a\"></div><div class=\"questionSubHolder screen1_Staticbox7 screen1_Staticbox7a\"></div></div></div>");
	
	question_2 = $("<div class=\"slide\" id=\"slide_2\"><div class=\"inputcontainer\"><div class=\"questionSubHolder screen1_Staticbox0\" ></div><div class=\"questionSubHolder screen1_Staticbox1 screen1_Staticbox1a\">3</div><div class=\"questionSubHolder screen1_Staticbox2 screen1_Staticbox2a\">5</div><div class=\"questionSubHolder screen1_Staticbox3\">+</div><div class=\"questionSubHolder screen1_Staticbox4 screen1_Staticbox4a\">5</div><div class=\"questionSubHolder screen1_Staticbox5 screen1_Staticbox5a\">9</div><div class=\"borderTop\"></div><div class=\"questionSubHolder screen1_Staticbox6 screen1_Staticbox6b\"></div><div class=\"questionSubHolder screen1_Staticbox7 screen1_Staticbox7b\"></div></div></div>");
	
	question_3 = $("<div class=\"slide\" id=\"slide_3\"><div class=\"inputcontainer\"><div class=\"questionSubHolder screen1_Staticbox0\" ></div><div class=\"questionSubHolder screen1_Staticbox1\">2</div><div class=\"questionSubHolder screen1_Staticbox2\">8</div><div class=\"questionSubHolder screen1_Staticbox3\">+</div><div class=\"questionSubHolder screen1_Staticbox4 screen1_Staticbox4a\">5</div><div class=\"questionSubHolder screen1_Staticbox5 screen1_Staticbox5a\">2</div><div class=\"borderTop\"></div><div class=\"questionSubHolder screen1_Staticbox6 screen1_Staticbox6a\"></div><div class=\"questionSubHolder screen1_Staticbox7 screen1_Staticbox7a\"></div></div></div>");
	
	question_4 = $("<div class=\"slide\" id=\"slide_4\"><div class=\"inputcontainer\"><div class=\"questionSubHolder screen1_Staticbox0\" ></div><div class=\"questionSubHolder screen1_Staticbox1 screen1_Staticbox1a\">2</div><div class=\"questionSubHolder screen1_Staticbox2 screen1_Staticbox2a\">5</div><div class=\"questionSubHolder screen1_Staticbox3\">+</div><div class=\"questionSubHolder screen1_Staticbox4 screen1_Staticbox4a\">6</div><div class=\"questionSubHolder screen1_Staticbox5 screen1_Staticbox5a\">0</div><div class=\"borderTop\"></div><div class=\"questionSubHolder screen1_Staticbox6 screen1_Staticbox6b\"></div><div class=\"questionSubHolder screen1_Staticbox7 screen1_Staticbox7b\"></div></div></div>");
	page0.append(question_1).append(question_2).append(question_3).append(question_4);
	
	nextBtn = $("<div id=\"nextBtn\"><div style=\"border: 0px solid #000; width:38px; height:46px;top: -12px;left: -12px;position: absolute;\"></div></div>");
	prevBtn = $("<div id=\"prevBtn\"><div style=\"border: 0px solid #000; width:38px; height:46px;top: -12px;left: -12px;position: absolute;\"></div></div>");
	page0.append(nextBtn).append(prevBtn).append(submitBtn);
	
	menucontainer.append(page0);
	pagecontainer.append(menucontainer);
	$("body").append(pagecontainer);
	 NumberStrip();
	 
	
	try{$(".icoReset").unbind('click',resetfn);}catch(e){}
	$('#submitBtn').hide();
	
	$(".icoReset").unbind('click',resetfn);
	$(".icoReset").removeClass('icoResetMove');
	
	nextBtn.bind(downEvent, function(){
		if (currentQuestion < 3 || previousQuestion < 3){
			currentQuestion++;
			previousQuestion++;
			loadQuestion();
			checkResetEnable();
			
		}
	});
	prevBtn.bind(downEvent, function(){
		
		if (currentQuestion > 1 || previousQuestion > 1 ) {
			currentQuestion--;
			previousQuestion--;
			loadQuestion();
			checkResetEnable();
			
		}
		
	});
    showInstruction();
    page0.css({"visibility":"hidden"});
    loadQuestion();
    page0.css({"visibility":"visible"});
	dragEnable();
	dropEnable();
	checkResetEnable();
	//checkFeedbackEnable();
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
			$('.icoReset').css('opacity',value);
			if (value == 1)
			{
			
			$(".icoReset").unbind('click',resetfn);
			$(".icoReset").bind('click',resetfn);
			}
			else{
			$(".icoReset").unbind('click',resetfn);
			}
			
		}
		else if (key=="sumbitBoxstate") {
			if (value==true) {
				$(".icoFeed").addClass('icoFeedMove')
				$(".icoFeed").bind('click',submitfn);
				
			}else{
				$(".icoFeed").removeClass('icoFeedMove')
			//$(".icoFeed").css('background-image',value)
			$(".icoFeed").unbind('click',submitfn);
			}
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
        		$('.screen1_Staticbox7,.screen1_Staticbox6,.screen1_Staticbox0').find('.dropstrip').draggable({
			zIndex: 10000,
			start: function(){
				checkResetEnable();
			},
			stop: function (){
			//$('.dropstrip').removeAttr('style');
			    $(this).remove();
			    checkFeedbackEnable();
			    checkResetEnable();
			    $('.score').hide();
			    //$('.icoReset').css({'opacity':'0.5'});
			}
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
    state = {"inputVal1":textVal1,"inputVal2":textVal2,"inputVal3":textVal3,"inputVal4":textVal4, "currentQuestion":currentQuestion,"previousQuestion":previousQuestion, "fullQuizViewed": fullQuizViewed, "resetStatus":$('.icoReset').css('opacity'),"sumbitBoxstate":$(".icoFeed").hasClass('icoFeedMove')};
    var message = {
	    type : 'state',
	    data : JSON.stringify(state)
    };
    eventBroker.publishEvent("#save", message);
    //audinst.play();

});

	//$('.pagebtn').addClass('visitedPageBtn')
	//$('.icoFeed').show()


ReadySupport()
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
		//$(".icoFeed").css({'background-image':'url(images/btFeedOn@2x.png)','cursor':'pointer'});
		$(".icoFeed").addClass("icoFeedMove")
		$(".icoFeed").addClass('submitReady');
		$(".icoFeed").unbind('click',submitfn);
		$(".icoFeed").bind('click',submitfn)
		
	}
	else{
		$(".icoFeed").removeClass("icoFeedMove")
		//$(".icoFeed").css({'background-image':'url(images/btFeedOff@2x.png)','cursor':'default'})
		$(".icoFeed").removeClass('submitReady');
		$(".icoFeed").unbind('click',submitfn)
		$('.score').hide();
	}
	
}

function checkResetEnable() {
	
	isEnabled=false;
	$('.slide').eq(currentQuestion).find('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').each(function(){
		
		if($(this).text()!=""){
			console.log('reset')
			isEnabled=true;
			}
		});
	if(isEnabled ==true) {		
		$(".icoReset").css({'opacity':'1','cursor':'pointer'})
		$(".icoReset").unbind('click',resetfn)
		$(".icoReset").bind('click',resetfn)
		}
		else{
		$(".icoReset").css({'opacity':'0.5','cursor':'default'})
		//$(".icoReset").removeClass('icoResetMove');
		$(".icoReset").unbind('click',resetfn)
		
	};
}

function submitfn() {
	if($(".icoFeed").hasClass("icoFeedMove")){
		
		console.log("enter")
        correctCount=0;
		if (($('#slide_1').find('.screen1_Staticbox6,.screen1_Staticbox7').text() == ansArr[0]) && ($('#slide_1').find('.screen1_Staticbox0').text() == 0 || $('#slide_1').find('.screen1_Staticbox0').text() == "")) {
			correctCount++;
		}
		if (($('#slide_2').find('.screen1_Staticbox6,.screen1_Staticbox7').text() == ansArr[1]) && ($('#slide_2').find('.screen1_Staticbox0').text() == 0 || $('#slide_2').find('.screen1_Staticbox0').text() == "")) {
			correctCount++;
		}
		if (($('#slide_3').find('.screen1_Staticbox6,.screen1_Staticbox7').text() == ansArr[2]) && ($('#slide_3').find('.screen1_Staticbox0').text() == 1 || $('#slide_3').find('.screen1_Staticbox0').text() == "")) {
			correctCount++;
		}
		if (($('#slide_4').find('.screen1_Staticbox6,.screen1_Staticbox7').text() == ansArr[3]) && ($('#slide_4').find('.screen1_Staticbox0').text() == 1 || $('#slide_4').find('.screen1_Staticbox0').text() == "")) {
			correctCount++;
		}
		
	contIncorrect = ansArr.length-correctCount;
	$('#crt').html(correctCount);
	$('#incrt').html(contIncorrect);
		$('.score').toggle();
	}
	
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
		    
		    }
		else
		{
		    $('#prevBtn').css({"opacity":"1","cursor":"pointer"});
		    
		}
		
	/*Hiding Next Btn in last screen*/
	if($('#slide_4').css('display')=="block"){
		    $('#nextBtn').css({"cursor":"default","opacity":"0.5"});
		  
		    
		}
		else
		{
		    $('#nextBtn').css({"opacity":"1","cursor":"pointer"});
		    $('#submitBtn').hide();
		    
		}		   
}

function dragEnable() {console.log("enter")
	$("#numStrips").css({'cursor':'pointer','z-index':'1'});
	$("#numStrips").find('.stripStyle').draggable({
		containment:"#vkeyCont",
	helper:"clone",
	revert:"invalid",
	drag:function(event,ui){
		$('.score').hide();
		if (navigator.platform.match(/iPhone|iPod|iPad/)) {
				 if (event.pageY < 5|| event.pageX >1015 ||  event.pageX < 5 || event.pageY > 765){
					return false;
				} 
			    }
				return true;
				
		
		}
	});
	$(".questionSubHolder").find('.dropstrip').draggable({
	containment : "#vkeyCont",
	stack:"#numStrips",
	//revert:"invalid",
	drag:function(event,ui){
		$('.slash2').css({'z-index':'100001'})
		$('.slash1').css({'z-index':'100001'})
		 $('.score').hide();
		
		 if (navigator.platform.match(/iPhone|iPod|iPad/)) {
					    if (event.pageY < 5|| event.pageX >1015 ||  event.pageX < 5 || event.pageY > 765){
						   //$(ui.helper).draggable("option","revert",true);
						 
						     
						return false;
					    } 
						   
				    }
				   
				  return true;
		
		}
	});
  }

function dropEnable() {
	$('.screen1_Staticbox0,.screen1_Staticbox0a,.screen1_Staticbox0b,.screen1_Staticbox6,.screen1_Staticbox7').droppable({
		drop:function(event, ui){
		$(this).html($(ui.helper).clone());
		$(this).find('.stripStyle').removeAttr('style');
		$(this).find('.stripStyle').addClass('dropstrip');
		$(this).find('.dropstrip').removeClass('stripStyle');
		$(this).children().css({'left':'0px','top':'0px'});
		$(this).find('.dropstrip').draggable({
			containment : "#vkeyCont",
			stack:"#numStrips",
			revert:"invalid",
			drag:function(event,ui){
				$('.slash2').css({'z-index':'100001'})
				$('.slash1').css({'z-index':'100001'})
				 $('.score').hide();
				 console.log(event.pageY ,event.pageX)
				
				if (event.pageY <5 || event.pageX >1015){
					$(ui.helper).trigger("mouseup");
					
				      
					}
		 if (navigator.platform.match(/iPhone|iPod|iPad/)) {
			
					   if (event.pageY <5 || event.pageX >1015){
						$(ui.helper).trigger("mouseup");
					   }
					
				      
					}
				
			},
			
					stop:function(event, ui){
							$(this).hide()
						//$("#box1").children().remove()
						$(ui.helper).remove();
						$(this).removeAttr('style');
						//$('.slash2').css({'display':'none'})
						if ($("#page_5_icon").hasClass("activePageBtn")) {
							$('#slash51').css({'display':'none'})
							
							}
						
						else if ($("#page_6_icon").hasClass("activePageBtn")) {
							$('#slash62').css({'display':'none'})
							
						}
						//$('.screen1_Staticbox0,.screen1_Staticbox0a,.screen1_Staticbox0b').html("");
						checkFeedbackEnable();
						checkResetEnable();
						$('.score').hide();
					     }
					     });
		checkFeedbackEnable();
		checkResetEnable();
		$('.score').hide();
		}
		});
  }






















//function dragEnable() {
//	
//	$("#numStrips").css({'cursor':'pointer','z-index':'2'});
//	
//	$("#numStrips").find('.stripStyle').draggable({
//	containment : "#vkeyCont",
//	helper:"clone",
//	//stack:"#numStrips",
//	revert:"invalid",
//	drag:function(event,ui){
//		
//		 $('.score').hide();
//		 if (navigator.platform.match(/iPhone|iPod|iPad/)) {
//					    if (event.pageY < 5|| event.pageX >1015 ||  event.pageX < 5 || event.pageY > 765){
//						 
//						   return false;
//					    } 
//				    }
//				   
//				    return true;
//		
//	}
//	});
//	
//	
//	$(".questionSubHolder").find('.dropstrip').draggable({
//		containment : "#vkeyCont",
//			stack:"#numStrips",
//	//revert:"invalid",
//		drag:function(event,ui){
//			 $('.score').hide();
//			 
//		//	 alert("hfghfj")
//		//	 if (navigator.platform.match(/iPhone|iPod|iPad/)) {
//					    if (event.pageY < 5|| event.pageX >1015 ||  event.pageX < 5 || event.pageY > 765){
//						$(ui.helper).remove();
//						checkFeedbackEnable();
//						checkResetEnable();
//						$('.score').hide();
//					    } 
//		//		    }
//				   
//				    //return true;
//		
//	},
//				stop:function(event, ui){
//						$(ui.helper).remove();
//						$(this).removeAttr('style');
//						checkFeedbackEnable();
//						checkResetEnable();
//						$('.score').hide();
//					     }
//					     });
//	
//  }
//
//function dropEnable() {
//	$('.screen1_Staticbox0,.screen1_Staticbox6,.screen1_Staticbox7').droppable({
//		drop:function(event, ui){
//		$(this).html($(ui.helper).clone());
//		$(this).find('.stripStyle').removeAttr('style');
//		$(this).find('.stripStyle').addClass('dropstrip');
//		$(this).find('.dropstrip').removeClass('stripStyle');
//		$(this).children().css({'left':'0px','top':'0px'});
//		dragEnable();
//		//$(this).find('.dropstrip').draggable({
//		//	containment : "#vkeyCont",
//		//	stack:"#numStrips",
//		//	drag:function(event,ui){
//		//		 $('.score').hide();
//		//		 if (event.pageY < 5|| event.pageX >1015 ||  event.pageX < 5 || event.pageY > 765){
//		//				   $(ui.helper).remove();
//		//				   return false;
//		//			    }  
//		//			    
//		//		 if (navigator.platform.match(/iPhone|iPod|iPad/)) {
//		//			    if (event.pageY < 5|| event.pageX >1015 ||  event.pageX < 5 || event.pageY > 765){
//		//				   
//		//				   return false;
//		//			    } 
//		//		    }
//		//		     return true;
//		//		
//		//	},
//		//	
//		//			stop:function(event, ui){
//		//				$(ui.helper).remove();
//		//				$(this).removeAttr('style');
//		//				checkFeedbackEnable();
//		//				checkResetEnable();
//		//				$('.score').hide();
//		//			     }
//		//			     });
//		checkFeedbackEnable();
//		checkResetEnable();
//		$('.score').hide();
//		}
//		});
//  }
function resetfn(){
	$(".icoFeed").removeClass('submitReady');
	$(".icoReset").removeClass('icoResetMove');
    var to=setTimeout(function(){
	clearInterval(to); $(".icoReset").addClass('icoResetMove');
		    },100)
		//$(".icoFeed").css({'background-image':'url(images/btFeedOff@2x.png)','cursor':'default'});
		$(".icoFeed").removeClass("icoFeedMove")
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
$(window).bind('click touchstart', function (e) {
	className = $(e.target).attr('class');
	//console.log(className);
	//console.log(e.target.id);
	if (e.target.id == "mainContainerHidden" || className == "questionSubHolder screen1_Staticbox1 screen1_Staticbox1a"|| className == "questionSubHolder screen1_Staticbox5 screen1_Staticbox5a" || className == "questionSubHolder screen1_Staticbox4 screen1_Staticbox4a"|| className == "questionSubHolder screen1_Staticbox2"  || className == "questionSubHolder" || className == "questionSubHolder screen1_Staticbox1"|| className == "borderTop" || className == "questionSubHolder screen1_Staticbox0 ui-droppable"|| className == "ui-draggable ui-draggable-dragging dropstrip"||className == "stripStyle"|| e.target.id == "nextBtn"|| e.target.id == "prevBtn" || e.target.id == "page-0" || e.target.id == "numStrips" || className == "stripStyle ui-draggable" || className == "inputcontainer" || e.target.id == "vkeyCont"  || className == "contentFeedback" || className == "questionSubHolder screen1_Staticbox2 screen1_Staticbox2a" || className == "numStrips" || e.target.tagName == "HTML" || e.target.tagName == "BODY")
	{
		$('.score').css({'display':'none'});
	}
	
}); 