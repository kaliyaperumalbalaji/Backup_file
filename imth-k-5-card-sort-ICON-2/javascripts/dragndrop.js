/* ----DragNDrop.js 0.8
 * developed by Lapiz
 */

window.DragNDrop = function(Container, Details){
    this.Container = Container;
    this.Details = Details ? Details:{};
    this.SourceElem;
    this.DragElements;
    this.DestinationElems;
    this.isTouched = false;
    this.DownX = 0;
    this.DownY = 0;
    this.TouchedIndex = 0;
    this.FirstInStackClass = "firstInStack";
    this.BackInStackClass = "waitingToDrag";
    this.ElementsClass = "draggableEle";
    this.DropClass = "droppedEle";
    if (this.Container) {
        this.Manifest = this.Details.Manifest ? this.Details.Manifest:null;
        this.Options = this.Details.Manifest.Options ? this.Details.Manifest.Options:{};
    }
    this.CheckTimer;
    this.AutoRevert = this.Options.AutoRevert ? this.Options.AutoRevert:true;
    this.IsBusy = false;
    this.AniTime = 100;
    this.DragItem = false;
    if (this.Options.BoundariesId) this.Boundary = $("#"+this.Options.BoundariesId);
    if (this.Manifest && this.Container) {
        this.init();
    }
};


DragNDrop.prototype = {
    init:function(){
        try {
            var drgNdrp = this;
            var allContainers = this.Manifest.Destinations.slice(0);
            allContainers.push(this.Manifest.Source);
            this.SourceElem = $("#"+this.Manifest.Source.ContainerId);
            for (var cont=0; cont<allContainers.length; cont++) {
                var container = $("#"+allContainers[cont].ContainerId);
                var srcPos = container.css("position").toString().toLowerCase();
                if (srcPos.indexOf("fixed") < 0 && srcPos.indexOf("relative") < 0 && srcPos.indexOf("absolute") < 0)
                    container.css({"position":"relative"});
                container.css({"vertical-align":"top"});
            }
            if (this.Options.Random)
            for(var i=0; i<this.Manifest.Source.Items.length; i++){
                var a = this.Manifest.Source.Items[i];
                var randomIndex = Math.round(Math.random()*(this.Manifest.Source.Items.length-1));
                var b = this.Manifest.Source.Items[randomIndex];
                this.Manifest.Source.Items[i] = b;
                this.Manifest.Source.Items[randomIndex] = a;
            }
            this.DragElements = [];
            for(var i=0; i<this.Manifest.Source.Items.length; i++){
                var srcItem = this.Manifest.Source.Items[i];
                var item;
                if (srcItem.OuterHTML) item = $(srcItem.OuterHTML);
                else if (srcItem.InnerHTML) item = $("<div>"+srcItem.InnerHTML+"</div>");
                else item = $("<div />")
                if (this.Manifest.Source.ItemClass) item.addClass(this.Manifest.Source.ItemClass);
                if (this.Manifest.Source.FirstItemClass) this.FirstInStackClass = this.Manifest.Source.FirstItemClass;
                if (srcItem.Id) item.attr("id",srcItem.Id);
                item.addClass(this.ElementsClass);
                if (i==this.Manifest.Source.Items.length-1) item.addClass(this.FirstInStackClass);
                else item.addClass(this.BackInStackClass);
                this.SourceElem.append(item);
                var elemDetail = {
                    Element:item,
                    OrgX:0,
                    OrgY:0,
                    Value:srcItem.Value,
		    Parent:this.SourceElem,
		    prevParent:this.SourceElem,
		    prevOrgX:0,
		    prevOrgY:0
                }
                this.DragElements.push(elemDetail);
                item.attr("elementValue",srcItem.Value);
		//console.log(item)
		item.addClass(srcItem.dragClassName);
                if (this.Options.Arrangement){
                    var maxL = this.SourceElem.width()-item.width();
                    var maxT = this.SourceElem.height()-item.height();
                    if(this.Options.Arrangement.InSource.toString().indexOf("stack") >= 0){
                        var l = Math.round(Math.random() * maxL);
                        var t = Math.round(Math.random() * maxT);
                        item.css({"position":"absolute","left":l+"px","top":t+"px"});
			//item.css({"position": "absolute", "-webkit-transform": "rotateZ(" + (Math.floor(Math.random() * 10) - 5) + "deg)"});
                    }
		    else item.css({"display":"inline-block"});
                }
            }
            for (var index=this.DragElements.length-1; index>=0; index--) {
                var ele = this.DragElements[index].Element;
                if (this.Options.Arrangement)
                    if(this.Options.Arrangement.InSource.toString().indexOf("order") >= 0)
                        //ele.css({"position":"absolute","left":ele.position().left+"px","top":ele.position().top+"px","z-index":index+100}
			ele.css({"position": "absolute", "left": ele.position().left + "px", "top": ele.position().top + "px", "z-index": index + 100}
		    );
                   // else ele.css({"z-index":index+100});
                this.DragElements[index].OrgX = ele.position().left;
                this.DragElements[index].OrgY = ele.position().top;
		this.DragElements[index].prevOrgX = ele.position().left;
                this.DragElements[index].prevOrgY = ele.position().top;
                ele.bind('touchstart mousedown',function(event){ drgNdrp.onItemTouchStart(event);});
            }
            $(window).bind('touchmove mousemove',function(event){ drgNdrp.onItemTouchMove(event);});
            $(window).bind('touchend mouseup',function(event){ drgNdrp.onItemTouchEnd(event);});
            this.DestinationElems = [];
            for(var d=0; d<this.Manifest.Destinations.length; d++){
                var destDtails = {
                    Element:$("#"+this.Manifest.Destinations[d].ContainerId),
                    Value:this.Manifest.Destinations[d].Value
                }
                this.DestinationElems.push(destDtails);
            }
        } catch(e) { }
    },
    onItemTouchStart:function(event){
	var eventType = event.type;
	if (eventType != "mousedown"){
	    touchLength = event.originalEvent.touches.length;
	}else{
	    touchLength = 1;
	}
	if (touchLength == 1) {
        event.preventDefault();
        var drgNdrp = this;
        if (!this.IsBusy) {
            var element = $(event.target);
            element = $(event.target).parents("."+this.ElementsClass);
            for (var ele=0; ele<this.DragElements.length; ele++) {
                var zInd = this.DragElements[ele].Element.css("z-index");
                if(this.DragElements[ele].Element[0] == element[0]){
                    this.DragElements[ele].Element.removeClass(this.DropClass);
                    this.isTouched = true;
                    this.TouchedIndex = ele;
		    this.parentElement = element.parent();
                    var parentOffset = element.parent().offset();
		    var xVar =- $("#interactive-container").offset().left;
                    try{
			this.DownX = event.originalEvent.touches[0].pageX-xVar - element.offset().left;
			this.DownY = event.originalEvent.touches[0].pageY - element.offset().top;
		    }catch(e){
			this.DownX = event.pageX-xVar - element.offset().left ;
			this.DownY = event.pageY - element.offset().top;
		    }
		    
                    this.DragElements[ele].Element.css({"z-index":(1000 + Number(this.DragElements.length-1)),"position":"absolute"});
                    this.DragElements[ele].Element.addClass(this.FirstInStackClass);
                    this.DragElements[ele].Element.removeClass(this.BackInStackClass);
		    this.DragElements[ele].prevParent = this.parentElement;
		    this.DragElements[ele].prevOrgX = element.position().left;
		    this.DragElements[ele].prevOrgY = element.position().top;
                    if (this.Boundary)
                      this.changeContainer(this.DragElements[ele].Element,this.Boundary);
		    try {
			this.onMove(event.originalEvent.touches[0].pageX, event.originalEvent.touches[0].pageY);
		    } catch(e) {
			this.onMove(event.pageX, event.pageY);
		    }
                }
                else{
                    this.DragElements[ele].Element.css({"z-index":zInd-1});
                    this.DragElements[ele].Element.addClass(this.BackInStackClass);
                    this.DragElements[ele].Element.removeClass(this.FirstInStackClass);
                }
            }
           
        }
	}
    },
    onCheckChange:function(){
        if (this.TouchedX || this.TouchedY) {
            this.onMove(this.TouchedX, this.TouchedY);
        }
    },
    onItemTouchMove:function(event){
        var touchX;
        var touchY;
        try {
            touchX = event.originalEvent.touches[0].pageX;
            touchY = event.originalEvent.touches[0].pageY
        } catch(e) {
            touchX = event.pageX;
            touchY = event.pageY;
        }
        this.TouchedX = touchX;
        this.TouchedY = touchY;
        this.onMove(touchX, touchY);
	try {
	    var element = this.DragElements[this.TouchedIndex].Element;
	if (navigator.platform.match(/iPhone|iPod|iPad/)) {
	    if (touchY < 5 || touchX < -5 || touchX >1010) {
		element.trigger("mouseup");	// ....
	    }
	}
	} catch(e) {
	   
	}
	
	//onDropAllComplete(); 
        
    },
    onMove:function(pageX,pageY){
        if (this.isTouched && !this.IsBusy) {
            var element = this.DragElements[this.TouchedIndex].Element;
            var parentOffset = element.parent().offset();
            var l = pageX - this.DownX;
            var t = pageY - this.DownY;
            var a = true;
            if (this.Boundary)
                a = (l > 0 && l < this.Boundary.width()-element.width() && t > 0 && t < this.Boundary.height()-element.height());
            if (a) element.css({"left":l+"px", "top":t+"px"});
        }
	//onDropAllComplete(); 
    },
    onItemTouchEnd:function(event){
        if (this.isTouched) {
            this.isTouched = false;
            if(event.type == "touchend"){
		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
		var touchX = touch.pageX;
		var touchY = touch.pageY;
	    }else{
		var touchX = event.pageX;
		var touchY = event.pageY;
	    }
            var drgNdrp = this;
            drgNdrp.IsBusy = true;
            var droppedBox = -1;
            var elementObj = this.DragElements[this.TouchedIndex];
	    var oldDestEl = this.DragElements[this.TouchedIndex];
            var parentOffset = elementObj.Element.parent().offset();
            for (var d=0; d<this.DestinationElems.length; d++) {
                var destEl = this.DestinationElems[d].Element;
                if(destEl.offset().left < touchX && destEl.offset().left + destEl.width() > touchX &&	
		   destEl.offset().top < touchY+25 && destEl.offset().top + destEl.height() >= touchY-25){
		    if (destEl.children().length > 0) {
			var prevObj;
			for(var obj=0; obj<this.DragElements.length;obj++) {
			    if (this.DragElements[obj].Value == destEl.find('.dragItem').attr('elementvalue')) {
				prevObj = this.DragElements[obj];
				break;
			    }
			}
			
			prevObjParentOffset = prevObj.Element.parent().offset();
			var indexPosToMove = -1;
			var leastDistance = 0;
			var prevObjPos = {x:prevObj.Element.offset().left, y:prevObj.Element.offset().top};
			var sourceOffset = this.SourceElem.offset();
			for(var _d=0; _d<this.DragElements.length; _d++){
			    var dragItem = this.DragElements[_d];
			    var inElem = this.SourceElem.children("div[elementvalue='"+dragItem.Element.attr("elementvalue")+"']");
			    if (inElem.length <= 0) {
				var distance = this.getDistance(prevObjPos, {x:sourceOffset.left + dragItem.OrgX, y:sourceOffset.top+dragItem.OrgY});
				if (distance < leastDistance || indexPosToMove==-1) {
				    indexPosToMove = _d;
				    leastDistance = distance;
				}
			    }
			}
			this.changeContainer(prevObj.Element, prevObj.Parent);
			var prevOrg = {x:prevObj.OrgX, y:prevObj.OrgY};
			prevObj.OrgX = this.DragElements[indexPosToMove].OrgX;
			prevObj.OrgY = this.DragElements[indexPosToMove].OrgY;
			this.DragElements[indexPosToMove].OrgX = prevOrg.x;
			this.DragElements[indexPosToMove].OrgY = prevOrg.y;
			prevObj.Element.animate({"left":prevObj.OrgX+"px","top":prevObj.OrgY+"px"},{complete:function(){
			    drgNdrp.onItemChange();
			    prevObj.Element.addClass('slider');
			},duration:this.AniTime});
		    }
		    droppedBox = d;
		    drgNdrp.IsBusy = true;
		    this.changeContainer(elementObj.Element,destEl,parentOffset, true);
		    this.onChangeinDestination(elementObj.Element, destEl, true, false);
		    elementObj.Element.addClass(this.DropClass);
		    elementObj.Element.removeClass("slider");
		    resetEnable(); 
		    break;
		}
            }
            if (droppedBox == -1 && this.AutoRevert) {
		var srcEle = this.SourceElem;
		if(!(srcEle.offset().left < touchX && srcEle.offset().left + srcEle.width() > touchX &&
                   srcEle.offset().top < touchY && srcEle.offset().top + srcEle.height() > touchY)) srcEle = elementObj.Parent;
		this.changeContainer(oldDestEl.Element, srcEle, parentOffset);
		    oldDestEl.Element.animate({"left":oldDestEl.OrgX+"px","top":oldDestEl.OrgY+"px"},{complete:function(){
			drgNdrp.onItemChange();
			oldDestEl.Element.addClass('slider');
			oldDestEl.Parent = srcEle;
                    },duration:this.AniTime});
            }
            for(var d=0; d<this.DestinationElems.length; d++)
                for (var e=0; e<this.DestinationElems[d].Element.children().length; e++){
                    this.onChangeinDestination($(this.DestinationElems[d].Element.children()[e]), this.DestinationElems[d].Element, false, true);
                }
	    setTimeout(function(){drgNdrp.IsBusy = false;}, this.AniTime*1.7);
	    //checkArrow();
	    //this.updateManifest();
	    toggleSubmit();
        }
        else this.isTouched = false; 
//               this.changeContainer(elementObj.Element, elementObj.prevParent, parentOffset);
//		    elementObj.Element.animate({"left":elementObj.prevOrgX+"px","top":elementObj.prevOrgY+"px"},{complete:function(){
//			drgNdrp.onItemChange();
//			oldDestEl.Element.addClass('slider');
//                    },duration:this.AniTime});
//            }
//            for(var d=0; d<this.DestinationElems.length; d++)
//                for (var e=0; e<this.DestinationElems[d].Element.children().length; e++){
//                    this.onChangeinDestination($(this.DestinationElems[d].Element.children()[e]), this.DestinationElems[d].Element, false, true);
//                }
//	    setTimeout(function(){drgNdrp.IsBusy = false;}, this.AniTime*1.2);
//        }
//        else this.isTouched = false;

    },
    getDistance:function(point1, point2){
	return Math.sqrt(Math.pow(point1.x-point2.x, 2)+Math.pow(point1.y-point2.y, 2));
    },
    onItemChange:function(){},
    onChangeinDestination:function(Element, Destination, checkFinal, isFastMove){
        var drgNdrp = this;
        var lX = Element.position().left;
        var lY = Element.position().top;
        var yPos = 0;
        var ind = 0;
        for (var i=0; i<Destination.children().length; i++)
            if(Destination.children()[i] == Element[0]){
                ind = i
                break;
            }
        var xPos = (Element.width() * ind);
        Element.removeClass(this.BackInStackClass);
	var aniTime = this.AniTime;
	if (isFastMove) aniTime *= 0.5;
	if (Math.abs(yPos - lY) > 5 || Math.abs(xPos - lX) > 5) {
	    Element.css({"left":xPos+"px","top":yPos+"px"},{complete:function(){
		    if (checkFinal) {
			drgNdrp.onItemChange();
			drgNdrp._onAllDropComplete();
		    }
		},duration:aniTime});
	}
	else{
	    Element.css({"left":xPos+"px","top":yPos+"px"});
	    if (checkFinal) drgNdrp._onAllDropComplete();
	}
    },
    _onAllDropComplete:function(){
	//onDropAllComplete();
        var childrenCount = 0;
        for (var i=0; i<this.DestinationElems.length; i++) {
            childrenCount += this.DestinationElems[i].Element.children().length;
        }
        if (childrenCount == this.DragElements.length) {
            this.validate();
            this.OnAllDropComplete();
        }
    },
    OnAllDropComplete:function(){},
    validate:function(){
        var correct = 0;
        var incorrect = 0;
        for (var i=0; i<this.DestinationElems.length; i++) {
            for (var e=0; e<this.DestinationElems[i].Element.children().length; e++) {
                if($(this.DestinationElems[i].Element.children()[e]).attr("elementvalue") == this.DestinationElems[i].Value) correct++;
                else incorrect++;
            }
        }
        this.Correct = correct;
        this.Incorrect = incorrect;
    },
    changeContainer:function(Element,NewContainer,ParentOffset, checkDropOrder){
        if (!ParentOffset){
	    ParentOffset = Element.parent().offset();
	    var prevX = ParentOffset.left;
	    var prevY = ParentOffset.top;
	    NewContainer.append(Element);
	    ParentOffset = Element.parent().offset();
	    var currX = ParentOffset.left;
	    var currY = ParentOffset.top;
	    var objX = Element.position().left;
	    var objY = Element.position().top;
	    var l = objX + (prevX - currX);
	    var t = objY + (prevY - currY);
	    if ($(NewContainer).attr("id") === "drag_source")
		$(Element).children("div").children().val('');
		NewContainer.append(Element);
	    Element.css({"left":l+"px","top":t+"px"});
	}else {
	    var xVar = $("#interactive-container").offset().left;
            objX = Element.position().left+xVar;
            objY = Element.position().top;
            l = objX - NewContainer.offset().left;
            t = objY - NewContainer.offset().top;
            Element.css({"left": l + "px", "top": t + "px"});
            if ($(NewContainer).attr("id") === "drag_source")
                $(Element).children("div").children().val('');
            NewContainer.append(Element);
        }
        if (checkDropOrder){
            var changed = false;
            for (var i=0; i<NewContainer.children().length; i++){
                var sibling = NewContainer.children()[i];
                if (Element[0] != sibling && Element.position().left < $(sibling).position().left){
                    $(sibling).before(Element);
                    this.checkAllElementPos(NewContainer);
                    break;
                }
            }
        }
},
        checkAllElementPos:function(NewContainer){
        for (var i=0; i<NewContainer.children().length; i++){
            this.IsBusy = true;
            this.onChangeinDestination($(NewContainer.children()[i]), NewContainer, true, true);
        }
    },
     checkAllDestinationPos:function(){
	for (var d=0; d<this.DestinationElems.length; d++){
	    var NewContainer = this.DestinationElems[d].Element;
	    for (var i=0; i<NewContainer.children().length; i++){
		this.IsBusy = true;
		this.onChangeinDestination($(NewContainer.children()[i]), NewContainer, true, true);
	    }
	}
    }
};