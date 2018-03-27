var pageContainer, menuContainer, page0, dragContainer, dragActivity,eventBroker, saveContainer;
var randomManifest = ["manifest1","manifest2","manifest4","manifest5","manifest6","manifest7","manifest8","manifest9"];
var eventType = "click";
var rowDetails=[{"rowIndex":"#row_3","Top":57}];	
var currIndex="";
var maxWidth=null;
var manifestName="manifest3";
var downEvent = "mousedown";
var activityName = "imth-k-5-card-sort-ICON-2";
var activityVersion = "1.0";
//var audinst = new Audio('audio/instruction.mp3');
var audinst = new Howl({urls: ['./audio/instruction.mp3'],autoplay: false})
var audinst1 = new Howl({urls: ['./audio/Goodjob.mp3'],autoplay: false})
//var audinst1 = new Audio('audio/Goodjob.mp3');
var Iscompleted=Istaped=false;
var savedDraggableElements = null;
var correctCount=0;
var sumCount=3;
var tableHeight=110;
var rowTop=57;
var isLoaded=true;
var manifest1={
    Source:{
	ContainerId:"div_source",
	ItemClass:"dragItem slider",
	FirstItemClass:"firstInStack",
	Items:[
	    {InnerHTML:"<div id=\"item1\" class=\"innerDiv\">1 + 1</div>", Value:"1", dragClassName:"drag_box2 drag_box3"},
	    {InnerHTML:"<div id=\"item2\" class=\"innerDiv\">1 + 2</div>", Value:"2", dragClassName:"drag_box3 drag_box4"},
	    {InnerHTML:"<div id=\"item4\" class=\"innerDiv\">1 + 3</div>", Value:"3", dragClassName:"drag_box3"},
	    {InnerHTML:"<div id=\"item3\" class=\"innerDiv\">1 + 4</div>", Value:"4", dragClassName:"drag_box1"},
	    {InnerHTML:"<div id=\"item5\" class=\"innerDiv\">1 + 5</div>", Value:"5", dragClassName:"drag_box1"},
	    {InnerHTML:"<div id=\"item6\" class=\"innerDiv\">1 + 6</div>", Value:"6", dragClassName:"drag_box2"},
	    {InnerHTML:"<div id=\"item7\" class=\"innerDiv\">1 + 7</div>", Value:"7", dragClassName:"drag_box3 drag_box4"},
	    {InnerHTML:"<div id=\"item8\" class=\"innerDiv\">1 + 8</div>", Value:"8", dragClassName:"drag_box1 drag_box4"},
	    {InnerHTML:"<div id=\"item9\" class=\"innerDiv\">1 + 9</div>", Value:"9", dragClassName:"drag_box1 drag_box4"},
	]
    },
    Destinations:[
	{ContainerId:"droppableArea19", Value:"19"},
	{ContainerId:"droppableArea20", Value:"20"},
	{ContainerId:"droppableArea21", Value:"21"},
	{ContainerId:"droppableArea22", Value:"22"},
	{ContainerId:"droppableArea23", Value:"23"},
	{ContainerId:"droppableArea24", Value:"24"},
	{ContainerId:"droppableArea25", Value:"25"},
	{ContainerId:"droppableArea26", Value:"26"},
	{ContainerId:"droppableArea27", Value:"27"}
    ],
   Options:{
	BoundariesId:"DragActivity",
	AutoRevert:true,
	FixOnDrop:false,
	Random:true,
	Arrangement:{
	    InSource:"order",
	    InDestination:"order", 
	}
    }
}

var manifest2={
    Source:{
	ContainerId:"div_source",
	ItemClass:"dragItem slider",
	FirstItemClass:"firstInStack",
	Items:[
	    {InnerHTML:"<div id=\"item1\" class=\"innerDiv\">2 + 1</div>", Value:"1", dragClassName:"drag_box2 drag_box3"},
	    {InnerHTML:"<div id=\"item2\" class=\"innerDiv\">2 + 2</div>", Value:"2", dragClassName:"drag_box3 drag_box4"},
	    {InnerHTML:"<div id=\"item4\" class=\"innerDiv\">2 + 3</div>", Value:"3", dragClassName:"drag_box3"},
	    {InnerHTML:"<div id=\"item3\" class=\"innerDiv\">2 + 4</div>", Value:"4", dragClassName:"drag_box1"},
	    {InnerHTML:"<div id=\"item5\" class=\"innerDiv\">2 + 5</div>", Value:"5", dragClassName:"drag_box1"},
	    {InnerHTML:"<div id=\"item6\" class=\"innerDiv\">2 + 6</div>", Value:"6", dragClassName:"drag_box2"},
	    {InnerHTML:"<div id=\"item7\" class=\"innerDiv\">2 + 7</div>", Value:"7", dragClassName:"drag_box3 drag_box4"},
	    {InnerHTML:"<div id=\"item8\" class=\"innerDiv\">2 + 8</div>", Value:"8", dragClassName:"drag_box1 drag_box4"},
	]
    },
    Destinations:[
	{ContainerId:"droppableArea10", Value:"10"},
	{ContainerId:"droppableArea11", Value:"11"},
	{ContainerId:"droppableArea12", Value:"12"},
	{ContainerId:"droppableArea13", Value:"13"},
	{ContainerId:"droppableArea14", Value:"14"},
	{ContainerId:"droppableArea15", Value:"15"},
	{ContainerId:"droppableArea16", Value:"16"},
	{ContainerId:"droppableArea17", Value:"17"},
	{ContainerId:"droppableArea18", Value:"18"},
    ],
   Options:{
	BoundariesId:"DragActivity",
	AutoRevert:true,
	FixOnDrop:false,
	Random:true,
	Arrangement:{
	    InSource:"order",
	    InDestination:"order", 
	}
    }
}

var manifest3={
    Source:{
	ContainerId:"div_source",
	ItemClass:"dragItem slider",
	FirstItemClass:"firstInStack",
	Items:[
	    {InnerHTML:"<div id=\"item1\" class=\"innerDiv\">3 + 1</div>", Value:"1", dragClassName:"drag_box2 drag_box3"},
	    {InnerHTML:"<div id=\"item2\" class=\"innerDiv\">3 + 2</div>", Value:"2", dragClassName:"drag_box3 drag_box4"},
	    {InnerHTML:"<div id=\"item4\" class=\"innerDiv\">3 + 3</div>", Value:"3", dragClassName:"drag_box3"},
	    {InnerHTML:"<div id=\"item3\" class=\"innerDiv\">3 + 4</div>", Value:"4", dragClassName:"drag_box1"},
	    {InnerHTML:"<div id=\"item5\" class=\"innerDiv\">3 + 5</div>", Value:"5", dragClassName:"drag_box1"},
	    {InnerHTML:"<div id=\"item6\" class=\"innerDiv\">3 + 6</div>", Value:"6", dragClassName:"drag_box2"},
	    {InnerHTML:"<div id=\"item7\" class=\"innerDiv\">3 + 7</div>", Value:"7", dragClassName:"drag_box3 drag_box4"},
	]
    },
    Destinations:[
	{ContainerId:"droppableArea1", Value:"1"},
	{ContainerId:"droppableArea2", Value:"2"},
	{ContainerId:"droppableArea3", Value:"3"},
	{ContainerId:"droppableArea4", Value:"4"},
	{ContainerId:"droppableArea5", Value:"5"},
	{ContainerId:"droppableArea6", Value:"6"},
	{ContainerId:"droppableArea7", Value:"7"},
	{ContainerId:"droppableArea8", Value:"8"},
	{ContainerId:"droppableArea9", Value:"9"},
    ],
   Options:{
	BoundariesId:"DragActivity",
	AutoRevert:true,
	FixOnDrop:false,
	Random:true,
	Arrangement:{
	    InSource:"order",
	    InDestination:"order", 
	}
    }
}


var manifest4={
    Source:{
	ContainerId:"div_source",
	ItemClass:"dragItem slider",
	FirstItemClass:"firstInStack",
	Items:[
	    {InnerHTML:"<div id=\"item1\" class=\"innerDiv\">4 + 1</div>", Value:"1", dragClassName:"drag_box2 drag_box3"},
	    {InnerHTML:"<div id=\"item2\" class=\"innerDiv\">4 + 2</div>", Value:"2", dragClassName:"drag_box3 drag_box4"},
	    {InnerHTML:"<div id=\"item4\" class=\"innerDiv\">4 + 3</div>", Value:"3", dragClassName:"drag_box3"},
	    {InnerHTML:"<div id=\"item3\" class=\"innerDiv\">4 + 4</div>", Value:"4", dragClassName:"drag_box1"},
	    {InnerHTML:"<div id=\"item5\" class=\"innerDiv\">4 + 5</div>", Value:"5", dragClassName:"drag_box1"},
	    {InnerHTML:"<div id=\"item6\" class=\"innerDiv\">4 + 6</div>", Value:"6", dragClassName:"drag_box2"},
	]
    },
    Destinations:[
	{ContainerId:"droppableArea28", Value:"28"},
	{ContainerId:"droppableArea29", Value:"29"},
	{ContainerId:"droppableArea30", Value:"30"},
	{ContainerId:"droppableArea31", Value:"31"},
	{ContainerId:"droppableArea32", Value:"32"},
	{ContainerId:"droppableArea33", Value:"33"},
	{ContainerId:"droppableArea34", Value:"34"},
	{ContainerId:"droppableArea35", Value:"35"},
	{ContainerId:"droppableArea36", Value:"36"},
    ],
   Options:{
	BoundariesId:"DragActivity",
	AutoRevert:true,
	FixOnDrop:false,
	Random:true,
	Arrangement:{
	    InSource:"order",
	    InDestination:"order", 
	}
    }
}

var manifest5={
    Source:{
	ContainerId:"div_source",
	ItemClass:"dragItem slider",
	FirstItemClass:"firstInStack",
	Items:[
	    {InnerHTML:"<div id=\"item1\" class=\"innerDiv\">5 + 1</div>", Value:"1", dragClassName:"drag_box2 drag_box3"},
	    {InnerHTML:"<div id=\"item2\" class=\"innerDiv\">5 + 2</div>", Value:"2", dragClassName:"drag_box3 drag_box4"},
	    {InnerHTML:"<div id=\"item4\" class=\"innerDiv\">5 + 3</div>", Value:"3", dragClassName:"drag_box3"},
	    {InnerHTML:"<div id=\"item3\" class=\"innerDiv\">5 + 4</div>", Value:"4", dragClassName:"drag_box1"},
	    {InnerHTML:"<div id=\"item5\" class=\"innerDiv\">5 + 5</div>", Value:"5", dragClassName:"drag_box1"},
	]
    },
    Destinations:[
	{ContainerId:"droppableArea37", Value:"37"},
	{ContainerId:"droppableArea38", Value:"38"},
	{ContainerId:"droppableArea39", Value:"39"},
	{ContainerId:"droppableArea40", Value:"40"},
	{ContainerId:"droppableArea41", Value:"41"},
	{ContainerId:"droppableArea42", Value:"42"},
	{ContainerId:"droppableArea43", Value:"43"},
	{ContainerId:"droppableArea44", Value:"44"},
	{ContainerId:"droppableArea45", Value:"45"},
    ],
   Options:{
	BoundariesId:"DragActivity",
	AutoRevert:true,
	FixOnDrop:false,
	Random:true,
	Arrangement:{
	    InSource:"order",
	    InDestination:"order", 
	}
    }
}


var manifest6={
    Source:{
	ContainerId:"div_source",
	ItemClass:"dragItem slider",
	FirstItemClass:"firstInStack",
	Items:[
	    {InnerHTML:"<div id=\"item1\" class=\"innerDiv\">6 + 1</div>", Value:"1", dragClassName:"drag_box2 drag_box3"},
	    {InnerHTML:"<div id=\"item2\" class=\"innerDiv\">6 + 2</div>", Value:"2", dragClassName:"drag_box3 drag_box4"},
	    {InnerHTML:"<div id=\"item4\" class=\"innerDiv\">6 + 3</div>", Value:"3", dragClassName:"drag_box3"},
	    {InnerHTML:"<div id=\"item3\" class=\"innerDiv\">6 + 4</div>", Value:"4", dragClassName:"drag_box1"},
	]
    },
    Destinations:[
	{ContainerId:"droppableArea46", Value:"46"},
	{ContainerId:"droppableArea47", Value:"47"},
	{ContainerId:"droppableArea48", Value:"48"},
	{ContainerId:"droppableArea49", Value:"49"},
	{ContainerId:"droppableArea50", Value:"50"},
	{ContainerId:"droppableArea51", Value:"51"},
	{ContainerId:"droppableArea52", Value:"52"},
	{ContainerId:"droppableArea53", Value:"53"},
	{ContainerId:"droppableArea54", Value:"54"},
    ],
   Options:{
	BoundariesId:"DragActivity",
	AutoRevert:true,
	FixOnDrop:false,
	Random:true,
	Arrangement:{
	    InSource:"order",
	    InDestination:"order", 
	}
    }
}

var manifest7={
    Source:{
	ContainerId:"div_source",
	ItemClass:"dragItem slider",
	FirstItemClass:"firstInStack",
	Items:[
	    {InnerHTML:"<div id=\"item1\" class=\"innerDiv\">7 + 1</div>", Value:"1", dragClassName:"drag_box2 drag_box3"},
	    {InnerHTML:"<div id=\"item2\" class=\"innerDiv\">7 + 2</div>", Value:"2", dragClassName:"drag_box3 drag_box4"},
	    {InnerHTML:"<div id=\"item4\" class=\"innerDiv\">7 + 3</div>", Value:"3", dragClassName:"drag_box3"},
	]
    },
    Destinations:[
	{ContainerId:"droppableArea55", Value:"55"},
	{ContainerId:"droppableArea56", Value:"56"},
	{ContainerId:"droppableArea57", Value:"57"},
	{ContainerId:"droppableArea58", Value:"58"},
	{ContainerId:"droppableArea59", Value:"59"},
	{ContainerId:"droppableArea60", Value:"60"},
	{ContainerId:"droppableArea61", Value:"61"},
	{ContainerId:"droppableArea62", Value:"62"},
	{ContainerId:"droppableArea63", Value:"63"},
    ],
   Options:{
	BoundariesId:"DragActivity",
	AutoRevert:true,
	FixOnDrop:false,
	Random:true,
	Arrangement:{
	    InSource:"order",
	    InDestination:"order", 
	}
    }
}

var manifest8={
    Source:{
	ContainerId:"div_source",
	ItemClass:"dragItem slider",
	FirstItemClass:"firstInStack",
	Items:[
	    {InnerHTML:"<div id=\"item1\" class=\"innerDiv\">8 + 1</div>", Value:"1", dragClassName:"drag_box2 drag_box3"},
	    {InnerHTML:"<div id=\"item2\" class=\"innerDiv\">8 + 2</div>", Value:"2", dragClassName:"drag_box3 drag_box4"},
	]
    },
    Destinations:[
	{ContainerId:"droppableArea64", Value:"64"},
	{ContainerId:"droppableArea65", Value:"65"},
	{ContainerId:"droppableArea66", Value:"66"},
	{ContainerId:"droppableArea67", Value:"67"},
	{ContainerId:"droppableArea68", Value:"68"},
	{ContainerId:"droppableArea69", Value:"69"},
	{ContainerId:"droppableArea70", Value:"70"},
	{ContainerId:"droppableArea71", Value:"71"},
	{ContainerId:"droppableArea72", Value:"72"},
    ],
   Options:{
	BoundariesId:"DragActivity",
	AutoRevert:true,
	FixOnDrop:false,
	Random:true,
	Arrangement:{
	    InSource:"order",
	    InDestination:"order", 
	}
    }
}


var manifest9={
    Source:{
	ContainerId:"div_source",
	ItemClass:"dragItem slider",
	FirstItemClass:"firstInStack",
	Items:[
	    {InnerHTML:"<div id=\"item1\" class=\"innerDiv\">9 + 1</div>", Value:"1", dragClassName:"drag_box2 drag_box3"},
	]
    },
    Destinations:[
	{ContainerId:"droppableArea73", Value:"73"},
	{ContainerId:"droppableArea74", Value:"74"},
	{ContainerId:"droppableArea75", Value:"75"},
	{ContainerId:"droppableArea76", Value:"76"},
	{ContainerId:"droppableArea77", Value:"77"},
	{ContainerId:"droppableArea78", Value:"78"},
	{ContainerId:"droppableArea79", Value:"79"},
	{ContainerId:"droppableArea80", Value:"80"},
	{ContainerId:"droppableArea81", Value:"81"},
    ],
   Options:{
	BoundariesId:"DragActivity",
	AutoRevert:true,
	FixOnDrop:false,
	Random:true,
	Arrangement:{
	    InSource:"order",
	    InDestination:"order", 
	}
    }
}

$(document).ready(
    function(){
	
	setTimeout(function(){
	    if (navigator.msPointerEnabled) {
		$(".innerDiv").css("font-family","GillSansReg");
	    }
	    $('body').css({'-webkit-transform':'scale(1)'});
	    },500);
	
	setTimeout(function(){
	    $('body').css({'visibility':'visible'});
	    if (navigator.msPointerEnabled) {
	    $(".innerDiv").css("font-family","GillSansReg");
	    }
	},500);
	if ('ontouchstart' in document.documentElement) {
		eventType = "touchstart";
	}
	 var instruction = $('<div id="blocker"></div><div id="questionid" class="question"><div style="position:absolute; left:2%; top:4%; opacity:0.6;"><div><img src="images/btInfoOn.png" width="30px" height="30px"></div></div><span style="text-align:left; left:53px; line-height:1.4em; width:725px; position:absolute; font-family:GillSansReg; top:45px; font-size: 30px; ">Move each card to the column that shows its sum. <br>When you have placed all the cards in a group, tap the target button to check your work.<br>If the cards are correct, a new group of cards will appear. <br>If any cards are incorrect, drag the cards to the correct places and check your work again. <br>When no new group of cards appears, tap the target button to organize the table.</span><i style="font-size: 35px;padding: 0px;float: right;" class="closeBtn icon icon-emove" onclick="instruct()">&times;</i><div id="audioplay" onclick="AudioState()" style="left:0px;right:0px;margin:auto; width:60px; height:59px; position:absolute; top:395px; background-image:url(images/audioICON.png); z-index:2500;"></div></div>');
        pageContainer = $("<div id=\"interactive-container\" />");
	nav = ("<div class=\"contentHolder\"><div class=\"container\"><div class=\"contentFeedback\"><div class=\"btReset\" ><div class=\"icoReset\"></div></div><div class=\"btInfo\" onclick=\"openInst()\" ><div class=\"icoInfo\"></div></div><div class=\"btFeedback\"><div class=\"icoFeed inactive\"style=\"cursor: default\"></div></div></div></div></div></div>")
        menuContainer = $("<div id=\"page-container\" />");
        page0 = $("<div id=\"page-0\" class=\"page\" />");
      	dragContainer = $("<div id=\"DragActivity\" style=\"width:100%; height:100%;\" />");
	prom = $("<div class=\"promp\"></div>");
	page0.append(dragContainer);
        menuContainer.append(page0);
	$('body').append(instruction);
	page0.append(nav);
	page0.append('<div id="bottomDiv"></div><div id="submit" class="tick"></div><div id="blocker1" style="display: none;"></div><div id="questionid1" class="question1" ><span style="text-align:left; left:53px; line-height:1.4em; width:627px; position:absolute; font-family:GillSansReg; top:45px; font-size: 30px; ">Good job! Now put the rows of the table in order. <br/>Tap a row to highlight it. <br/>Then tap the up or down arrow to move the row.</span><i style="font-size: 35px;padding: 0px;float: right;" class="closeBtn icon icon-emove" onclick="instruct1()">&times;</i><div id="audioplay1" onclick="AudioState1()" style="left:0px;right:0px;margin:auto; width:60px; height:59px; position:absolute; top:181px; background-image:url(images/audioICON.png); z-index:2500;"></div></div><div id="upArrow" class="arrow"></div><div id="downArrow" class="arrow"></div>');
        pageContainer.append(menuContainer);
        $('body').append(pageContainer);
	dragContainer.append("<div id=\"div_source\"/></div>");
	dragContainer.append('<div id=\"table-container\"><div id="staticDiv_1" class="staticDiv">2</div><div id="staticDiv_2" class="staticDiv">3</div><div id="staticDiv_3" class="staticDiv">4</div><div id="staticDiv_4" class="staticDiv">5</div><div id="staticDiv_5" class="staticDiv">6</div><div id="staticDiv_6" class="staticDiv">7</div><div id="staticDiv_7" class="staticDiv">8</div><div id="staticDiv_8" class="staticDiv">9</div><div id="staticDiv_9" class="staticDiv">10</div><div id="row_1" class="row"><div class="droppableArea drop_box19" id="droppableArea19" value="19"></div> <div class="droppableArea drop_box20" id="droppableArea20" value="20"></div>  <div class="droppableArea drop_box21" id="droppableArea21" value="21"></div><div class="droppableArea drop_box22" id="droppableArea22" value="22"></div><div class="droppableArea drop_box23" id="droppableArea23" value="23"></div><div class="droppableArea drop_box24" id="droppableArea24" value="24"></div><div class="droppableArea drop_box25" id="droppableArea25" value="25"></div> <div class="droppableArea drop_box26" id="droppableArea26" value="26"></div><div class="droppableArea drop_box27" id="droppableArea27" value="27"></div></div><div id="row_2" class="row"><div class="droppableArea drop_box10" id="droppableArea10" value="10"></div> <div class="droppableArea drop_box11" id="droppableArea11" value="11"></div>  <div class="droppableArea drop_box12" id="droppableArea12" value="12"></div><div class="droppableArea drop_box13" id="droppableArea13" value="13"></div><div class="droppableArea drop_box14" id="droppableArea14" value="14"></div><div class="droppableArea drop_box15" id="droppableArea15" value="15"></div><div class="droppableArea drop_box16" id="droppableArea16" value="16"></div> <div class="droppableArea drop_box17" id="droppableArea17" value="17"></div><div class="droppableArea drop_box18" id="droppableArea18" value="18"></div></div><div id="row_3" class="row"><div class="droppableArea drop_box1" id="droppableArea1" value="1"></div> <div class="droppableArea drop_box2" id="droppableArea2" value="2"></div>  <div class="droppableArea drop_box3" id="droppableArea3" value="3"></div><div class="droppableArea drop_box4" id="droppableArea4" value="4"></div><div class="droppableArea drop_box5" id="droppableArea5" value="5"></div><div class="droppableArea drop_box6" id="droppableArea6" value="6"></div><div class="droppableArea drop_box7" id="droppableArea7" value="7"></div> <div class="droppableArea drop_box8" id="droppableArea8" value="8"></div><div class="droppableArea drop_box9" id="droppableArea9" value="9"></div></div><div id="row_4" class="row"><div class="droppableArea drop_box28" id="droppableArea28" value="28"></div> <div class="droppableArea drop_box29" id="droppableArea29" value="29"></div>  <div class="droppableArea drop_box30" id="droppableArea30" value="30"></div><div class="droppableArea drop_box31" id="droppableArea31" value="31"></div><div class="droppableArea drop_box32" id="droppableArea32" value="32"></div><div class="droppableArea drop_box33" id="droppableArea33" value="33"></div><div class="droppableArea drop_box34" id="droppableArea34" value="34"></div> <div class="droppableArea drop_box35" id="droppableArea35" value="35"></div><div class="droppableArea drop_box36" id="droppableArea36" value="36"></div></div><div id="row_5" class="row"><div class="droppableArea drop_box37" id="droppableArea37" value="37"></div> <div class="droppableArea drop_box38" id="droppableArea38" value="38"></div>  <div class="droppableArea drop_box39" id="droppableArea39" value="39"></div><div class="droppableArea drop_box40" id="droppableArea40" value="40"></div><div class="droppableArea drop_box41" id="droppableArea41" value="41"></div><div class="droppableArea drop_box42" id="droppableArea42" value="42"></div><div class="droppableArea drop_box43" id="droppableArea43" value="43"></div> <div class="droppableArea drop_box44" id="droppableArea44" value="44"></div><div class="droppableArea drop_box45" id="droppableArea45" value="45"></div></div><div id="row_6" class="row"><div class="droppableArea drop_box46" id="droppableArea46" value="46"></div> <div class="droppableArea drop_box47" id="droppableArea47" value="47"></div>  <div class="droppableArea drop_box48" id="droppableArea48" value="48"></div><div class="droppableArea drop_box49" id="droppableArea49" value="49"></div><div class="droppableArea drop_box50" id="droppableArea50" value="50"></div><div class="droppableArea drop_box51" id="droppableArea51" value="51"></div><div class="droppableArea drop_box52" id="droppableArea52" value="52"></div> <div class="droppableArea drop_box53" id="droppableArea53" value="53"></div><div class="droppableArea drop_box54" id="droppableArea54" value="54"></div></div><div id="row_7" class="row"><div class="droppableArea drop_box55" id="droppableArea55" value="55"></div> <div class="droppableArea drop_box56" id="droppableArea56" value="56"></div>  <div class="droppableArea drop_box57" id="droppableArea57" value="57"></div><div class="droppableArea drop_box58" id="droppableArea58" value="58"></div><div class="droppableArea drop_box59" id="droppableArea59" value="59"></div><div class="droppableArea drop_box60" id="droppableArea60" value="60"></div><div class="droppableArea drop_box61" id="droppableArea61" value="61"></div> <div class="droppableArea drop_box62" id="droppableArea62" value="62"></div><div class="droppableArea drop_box63" id="droppableArea63" value="63"></div></div><div id="row_8" class="row"><div class="droppableArea drop_box64" id="droppableArea64" value="64"></div> <div class="droppableArea drop_box65" id="droppableArea65" value="65"></div>  <div class="droppableArea drop_box66" id="droppableArea66" value="66"></div><div class="droppableArea drop_box67" id="droppableArea67" value="67"></div><div class="droppableArea drop_box68" id="droppableArea68" value="68"></div><div class="droppableArea drop_box69" id="droppableArea69" value="69"></div><div class="droppableArea drop_box70" id="droppableArea70" value="70"></div> <div class="droppableArea drop_box71" id="droppableArea71" value="71"></div><div class="droppableArea drop_box72" id="droppableArea72" value="72"></div></div><div id="row_9" class="row"><div class="droppableArea drop_box73" id="droppableArea73" value="73"></div> <div class="droppableArea drop_box74" id="droppableArea74" value="74"></div>  <div class="droppableArea drop_box75" id="droppableArea75" value="75"></div><div class="droppableArea drop_box76" id="droppableArea76" value="76"></div><div class="droppableArea drop_box77" id="droppableArea77" value="77"></div><div class="droppableArea drop_box78" id="droppableArea78" value="78"></div><div class="droppableArea drop_box79" id="droppableArea79" value="79"></div> <div class="droppableArea drop_box80" id="droppableArea80" value="80"></div><div class="droppableArea drop_box81" id="droppableArea81" value="81"></div></div></div>');
  $(".icoReset").css({'opacity':'0.5','cursor':'Default'});	   
    $(".icoReset").unbind('click',reset);
     $(".icoInfo").click(function () {
    toggleClassButton($(this),'icoInfoMove');
    })
    dragActivity = new DragNDrop(dragContainer,{Manifest:eval(manifestName)});
    audinst.play();
    $('#submit').bind(eventType,validateFunc);
    
   
    // Retrive Saved State Start  
    eventBroker = _({}).extend(require('chaplin/lib/event_broker'));
    eventBroker.publishEvent("#fetch", { type : 'state' }, function(state) {
	if (state) {
	    var drop1=drop2=drop3=drop4=drop5=drop6=drop7=drop8=drop9=drop10=drop11=drop12=drop13=0;
	    _.each(JSON.parse(state), function(value, key, list) {
		if(key == "variableDetails"){
		    correctCount=value[0];
		    sumCount=value[1];
		    rowTop=value[2];
		    isLoaded=value[3];
		    Iscompleted=value[4];
		    Istaped=value[5];
		    randomManifest=value[6];
		    currIndex=value[7];
		    maxWidth=value[8];
		}
		else if (key=="rowDetails") {
		    rowDetails = value;
		}
		else if(key == "tableContainer"){
		    $('#table-container').html(value.content);
		    tableHeight = value.height;
		    $('#table-container').css('height', (tableHeight)+'px');
		    for(var row=0; row<rowDetails.length; row++){
			$(rowDetails[row].rowIndex).show();
		    }
		    if (Iscompleted == false) {
			$(rowDetails[rowDetails.length-1].rowIndex).find('.droppableArea').html("");
		    }
		    else{
			$('#div_source').html('');
			$('.arrow').show();
		    }
		}
		else if (key == "manifestName") {
		    manifestName=value;
		    $('#div_source').html('');
		    if (Iscompleted == false) {
			$('#div_source').css({'width':maxWidth+'px'});
			dragActivity = new DragNDrop(dragContainer,{Manifest:eval(manifestName)});
		    }
		    else{
			$('#div_source').html('');
			$('.arrow').show();
		    }
		}
		else if(key == "items"){
		    for(var item=0; item<value.length; item++)
		    {
			$('#' + value[item].ParentID).append($('#' + value[item].ElementID).parent());
			$('#' + value[item].ParentID).find('#' + value[item].ElementID).parent().css({'left':'0px', 'top':"0px"});
			//$('#div_source').find('#' + value[item].ElementID).parent().remove();
			$('.droppableArea').find('.dragItem').removeClass('slider');
		    }
		}
		else if (key == "draggableElements") {
		    savedDraggableElements = value;
		    for(var item=0; item<savedDraggableElements.length; item++){
			$('#div_source .dragItem[elementvalue="'+savedDraggableElements[item].Value+'"]').attr("style", savedDraggableElements[item].style);
			for(var dragItem=0; dragItem<dragActivity.DragElements.length;dragItem++){
			    if (dragActivity.DragElements[dragItem].Value == savedDraggableElements[item].Value) {
				dragActivity.DragElements[dragItem].OrgX = savedDraggableElements[item].OrgX;
				dragActivity.DragElements[dragItem].OrgY = savedDraggableElements[item].OrgY;
				dragActivity.DragElements[dragItem].prevOrgX = savedDraggableElements[item].prevOrgX;
				dragActivity.DragElements[dragItem].prevOrgY = savedDraggableElements[item].prevOrgY;
			    }
			}
			
		    }
		}
		else if (key == "icoReset") {
		    $(".icoReset").css({'opacity':value,'cursor':'pointer'});	   
		    if (value == 1) {
			$(".icoReset").bind('click',reset);
		    }
		    
		}
		
	    });
	}
	toggleSubmit();
	
    });
    setTimeout(function(){
    if (navigator.msPointerEnabled) {
    $(".innerDiv").css("font-family","GillSansReg");
    }
    },100);


    eventBroker.subscribeEvent('#doSave', function(state) {
	var state = {};
	var items = [];
	for(var ele=0; ele<dragActivity.DragElements.length; ele++){
	    var areaID = $(dragActivity.DragElements[ele].Element).parent().attr('id');
	    items.push({"ElementID":$(dragActivity.DragElements[ele].Element).find('.innerDiv').attr('id'), "ParentID":areaID});
	}
	var variableDetails=[correctCount,sumCount,rowTop,isLoaded,Iscompleted,Istaped,randomManifest,currIndex,maxWidth];
	var draggableElements = [];
	for(var ele=0; ele<dragActivity.DragElements.length; ele++){
	    draggableElements.push({"Value":dragActivity.DragElements[ele].Value, "style":$(dragActivity.DragElements[ele].Element).attr('style'), "OrgX":dragActivity.DragElements[ele].OrgX, "OrgY":dragActivity.DragElements[ele].OrgY, "prevOrgX":dragActivity.DragElements[ele].prevOrgX, "prevOrgY":dragActivity.DragElements[ele].prevOrgY});
	}
	state = {"variableDetails":variableDetails,"rowDetails":rowDetails, "tableContainer":{content:$('#table-container').html(), height:tableHeight},"manifestName":manifestName,"items":items,"draggableElements":draggableElements,"icoReset": $(".icoReset").css('opacity')};
	var message = {
		type : 'state',
		data : JSON.stringify(state)
	};
	eventBroker.publishEvent("#save", message);
    });
    
    $('#downArrow').bind(eventType,InterChaningRowdown);
    $('#upArrow').bind(eventType,InterChaningRowup);
    //$('.arrow').bind(eventType,InterChaningRow);
    $('.row').bind(eventType,tapSelected);
    if (navigator.msPointerEnabled) {
			$(".innerDiv").css("font-family","GillSansReg");
			$(".staticDiv").css({"font-family":"GillSansReg","padding-top": "3.125px"});
			
		}
		else{$(".staticDiv").css({"padding-top": "0px"});}
   ReadySupport(); 
   });



function instruct(){
    $('.icoInfo').removeClass('icoInfoMove');
    $('.icoInfo').css({'opacity':'1'});
	$('.question,#blocker').hide();
	try {
            audinst.stop();
            audinst.unload();
            } catch(e) {}
	try {
		$('#instructions-button-container').unbind('click',openInst);
	} catch(e){}
		$('#instructions-button-container').bind('click',openInst);
		$('.row').bind(eventType,tapSelected);
}

function instruct1(){
     $('#blocker1,.question1').hide();
  try {
            audinst1.stop();
            audinst1.unload();
            } catch(e) {}
   
$('.row').bind(eventType,tapSelected);
}



function openInst(){
	audinst = new Howl({urls: ['audio/instruction.mp3'],autoplay: false})
	audinst.play();
	$('.question,#blocker').show();
	$('.icoInfo').css({'opacity':'0.5'});
}

/* NAV */
function toggleClassButton(element,className){
	var currentButton=element;
	if(!currentButton.hasClass(className)){
		currentButton.addClass(className);
	}else
	{
		currentButton.removeClass(className);	
	}
}
function  resetEnable() {
  $(".icoReset").css({'opacity':'1','cursor':'pointer'});
  $(".icoReset").bind('click',reset);
   }
var resett=true;
function reset() {
    if (resett) {
	resett=false;
	setTimeout(function(){resett=true},1000);
    var current=$(this);
    current.removeClass('icoResetMove');
    var to=setTimeout(function(){
	clearInterval(to);
	current.addClass('icoResetMove');				
    })
	$("#div_source").html("");
	$('.droppableArea').children().remove();
	correctCount=0;
	sumCount=3;
	tableHeight=110;
	rowTop=57;
	isLoaded=true;
	Iscompleted=false;
	Istaped=false;
	manifestName="manifest3";
	randomManifest = ["manifest1","manifest2","manifest4","manifest5","manifest6","manifest7","manifest8","manifest9"];
	rowDetails=[];
	rowDetails=[{"rowIndex":"#row_3","Top":57}];
	$("#table-container").css({'height':'110px'});
	for (var i=1; i<=$('.row').length;i++) {
	    if (i==3){
		$("#row_"+i).css({'display':'block','top':'57px'});
		$("#row_"+i).removeClass('selected');
	    }
	    else {
		$("#row_"+i).css({'display':'none'});
		$("#row_"+i).removeClass('selected');
	    }
	}
	$('.droppableArea').css({'border':'1px dashed #fff','outline': 'none'});
	$('#submit').css({"background":"url('./images/submit.png') no-repeat","background-size": "contain","opacity":"0.5"});
	$('.arrow').hide();
	maxWidth = eval(manifestName).Source.Items.length*88;
	$('#div_source').css({'width':maxWidth+'px'});
	dragActivity = new DragNDrop(dragContainer,{Manifest:eval(manifestName)});
	setTimeout(function(){
	    $(".icoReset").css({'opacity':'.5','cursor':'default'});
	    $(".icoReset").unbind('click',reset);
	},500);
	if (navigator.msPointerEnabled) {
			$(".innerDiv").css("font-family","GillSansReg");
		}
	console.log("sadf");
}
}
function saveFunction() {
    eventBroker.publishEvent("#doSave");
}
	
	
function AudioState() {
	audinst.stop();
	audinst.unload();
	audinst = new Howl({urls: ['audio/instruction.mp3'],autoplay: false});
	audinst.play();
}




function validateFunc(){
    if ($('#submit').css('opacity')==1 && isLoaded == true) {
	correctCount=0;
	for (var i=0;i<$('.staticDiv').length;i++) {
	    if (eval($("#row_"+sumCount).find('.droppableArea').eq(i).text()) != undefined) {
		if ($('.staticDiv').eq(i).text() == eval($("#row_"+sumCount).find('.droppableArea').eq(i).text())) correctCount++;
	    }
	}
	if ($("#row_"+sumCount).find('.innerDiv').length == correctCount) {
	    $('#submit').css({"background":"url('./images/tick.png') no-repeat","background-size": "contain"});
	    manifestName=randomManifest[Math.floor(Math.random()*randomManifest.length)];
	    rowTop+=52;
	    for (var i=1;i<=$('.row').length;i++) {
		if (manifestName == "manifest"+i) {
		    $("#row_"+i).css({'display':'block','top':rowTop+'px'});
		    sumCount=i;
		}
	    }
	    dragActivity.DragElements=[];
	    isLoaded=false;
	    if (randomManifest.length>0) {
		tableHeight+=52;
		$("#table-container").css({'height':tableHeight+'px'});
		maxWidth = eval(manifestName).Source.Items.length*88;
		$('#div_source').css({'width':maxWidth+'px'});
		dragActivity = new DragNDrop(dragContainer,{Manifest:eval(manifestName)});
		randomManifest.splice(randomManifest.indexOf(manifestName),1)
		if (navigator.msPointerEnabled) {
		$(".innerDiv").css("font-family","GillSansReg");
		}
		var findIndexNo=manifestName;
		var rowId = "#row_"+(findIndexNo.slice(findIndexNo.length-1));
		//$(rowDetails[rowDetails.length-1].rowIndex).css({'background':'#3093c7','padding-top':'3px','padding-bottom':'45px'});
		rowDetails.push({"rowIndex":rowId,"Top":rowTop});
		setTimeout(function(){
		    $('#submit').css({"background":"url('./images/submit.png') no-repeat","background-size": "contain","opacity":"0.5"});
		    isLoaded=true;
		},500)
	    }
	    else{
		setTimeout(function(){
		$('#submit').css({"background":"url('./images/submit.png') no-repeat","background-size": "contain","opacity":"1"});
		    isLoaded=false;
		    Iscompleted=true;
		},500)
	    }
	    
	}
	else{
	    $('#submit').css({"background":"url('./images/wrong.png') no-repeat","background-size": "contain"});
	}
    }
    else if ($('#submit').css('opacity')==1 && Iscompleted == true) {
		$('#blocker1,.question1').show();
		$('.arrow').show();
		$('#submit').hide();
		audinst1 = new Howl({urls: ['audio/Goodjob.mp3'],autoplay: false});
		audinst1.play();
    }
   
}


function toggleSubmit() {
    $('#row_'+sumCount).find('.droppableArea').each(function(){
	if ($(this).children().length > 0) {
	    $(this).css({'border':'1px solid #fff','outline': '#fff solid thin'});
	    
	}
	else{
	    $(this).css({'border':'1px dashed #fff','outline': 'none'});
	}
	
    });
    if ($("#div_source").children().length >0) {
	$('#submit').css({"background":"url('./images/submit.png') no-repeat","background-size": "contain","opacity":"0.5"});
    }
    else {
	$('#submit').css({"background":"url('./images/submit.png') no-repeat","background-size": "contain","opacity":"1"});
    }
    
}


function AudioState1() {
	audinst1.stop();
	audinst1.unload();
	audinst1 = new Howl({urls: ['audio/Goodjob.mp3'],autoplay: false});
	audinst1.play();
}


/*
function InterChaningRow() {
    if ( Iscompleted == true && Istaped==true && $('.arrow').css('display') == "block") {
	if (this.id == "upArrow") {
	    for (var i=0;i<rowDetails.length;i++) {
		if(rowDetails[i].rowIndex == currIndex){
		    if (i>0) {
			var prevId = currIndex;
			$(rowDetails[i-1].rowIndex).css({'top':($(currIndex).position().top+"px")});
			$(currIndex).css({'top':rowDetails[i-1].Top});
			rowDetails[i].rowIndex=rowDetails[i-1].rowIndex;
			rowDetails[i-1].rowIndex=prevId;
			break;
		    }
		}
	    }
    	}
	if (this.id == "downArrow") {
	    for (var i=0;i<rowDetails.length;i++) {
		if(rowDetails[i].rowIndex == currIndex){
		    if (i<(rowDetails.length-1)) {
			var prevId = currIndex;
			$(rowDetails[i+1].rowIndex).css({'top':($(currIndex).position().top+"px")});
			$(currIndex).css({'top':rowDetails[i+1].Top});
			rowDetails[i].rowIndex=rowDetails[i+1].rowIndex;
			rowDetails[i+1].rowIndex=prevId;
			break;
		    }
		}
	    }
	    
	}	
    }
    
}

*/
var feed=true;
function tapSelected(){
    if (feed) {
	feed=false;
	$("#inp1").val("");
	
	setTimeout(function(){
	    feed=true;
	    $("#inp1").val("incming");
	    },300);
    if ($('.arrow').css('display') == "block") {
	Iscompleted = true;
    }
    if ( Iscompleted == true && $('.arrow').css('display') == "block") {
	Istaped=true;
	//if (!($("#"+this.id).hasClass('selected'))) {
	//    for (var i=1;i<=$('.row').length;i++) {
	//	$("#row_"+i).removeClass('selected');
	//    }
	//    $("#"+this.id).addClass('selected');
	//    currIndex = "#"+this.id;
	//}
	    for (var i=1;i<=$('.row').length;i++) {
		$("#row_"+i).removeClass('selected');
	    }
	    
	    $("#"+this.id).addClass('selected');
	    currIndex = "#"+this.id;
    }
}
}

function InterChaningRowdown(){
    if (Istaped==true && $('.arrow').css('display') == "block") {
	    for (var i=0;i<rowDetails.length;i++) {
		if(rowDetails[i].rowIndex == currIndex){
		    if (i<(rowDetails.length-1)) {
			var prevId = currIndex;
			$(rowDetails[i+1].rowIndex).css({'top':($(currIndex).position().top+"px")});
			$(currIndex).css({'top':rowDetails[i+1].Top});
			rowDetails[i].rowIndex=rowDetails[i+1].rowIndex;
			rowDetails[i+1].rowIndex=prevId;
			break;
		    }
		}
	    }
	    
	}	
}
function InterChaningRowup(){
    if (Istaped==true && $('.arrow').css('display') == "block") {
	    for (var i=0;i<rowDetails.length;i++) {
		if(rowDetails[i].rowIndex == currIndex){
		    if (i>0) {
			var prevId = currIndex;
			$(rowDetails[i-1].rowIndex).css({'top':($(currIndex).position().top+"px")});
			$(currIndex).css({'top':rowDetails[i-1].Top});
			rowDetails[i].rowIndex=rowDetails[i-1].rowIndex;
			rowDetails[i-1].rowIndex=prevId;
			break;
		    }
		}
	    }	
}
}