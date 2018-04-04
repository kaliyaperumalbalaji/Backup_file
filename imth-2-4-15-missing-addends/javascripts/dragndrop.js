/* ----DragNDrop.js 1.0
 * developed by Lapiz
 * 17.05.14
*/

window.DragNDrop = function(Container, Details, customOptions){
    this.Container = Container;
    this.Details = Details ? Details:{};
    customOptions = customOptions ? customOptions:{};
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
    this.AniTime = 300;
    this.DragItem = false;
    this.downElementIndex = 0;
    if (this.Options.BoundariesId) this.Boundary = $("#"+this.Options.BoundariesId);
    this.Options.dropSize = customOptions.dropSize ? customOptions.dropSize : 0;
    this.Options.verticalPlacement = customOptions.verticalPlacement ? true : false;
    this.Options.elementPadding = customOptions.elementPadding ? customOptions.elementPadding : 10;
    this.Options.initPos = customOptions.initPos ? customOptions.initPos : 10;
    if (this.Manifest && this.Container) this.init();
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
		    Parent: this.SourceElem
                }
                this.DragElements.push(elemDetail);
                item.attr("elementValue",srcItem.Value);
                if (this.Options.Arrangement){
                    var maxL = this.SourceElem.width()-item.width();
                    var maxT = this.SourceElem.height()-item.height();
                    if(this.Options.Arrangement.InSource.toString().indexOf("stack") >= 0){
                        var l = Math.round(Math.random() * maxL);
                        var t = Math.round(Math.random() * maxT);
                        item.css({"position":"absolute","left":l+"px","top":t+"px"});
                    }
		    else item.css({"display":"inline-block"});
                }
            }
            for (var index=0; index<this.DragElements.length; index++) {
                var ele = this.DragElements[index].Element;
                if (this.Options.Arrangement)
                    if(this.Options.Arrangement.InSource.toString().indexOf("order") >= 0){
			var newPos = this.positionElement(ele);
                        ele.css({"position":"absolute","left":newPos.x+"px","top":newPos.y+"px","z-index":index+100});
                    }
                    else ele.css({"z-index":index+100});
                this.DragElements[index].OrgX = ele.position().left;
                this.DragElements[index].OrgY = ele.position().top;
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
	    for(var i=0; i<this.Manifest.Source.Items.length; i++){
		var srcItem = this.Manifest.Source.Items[i];
		var drgElem = this.DragElements[i];
		if (srcItem.ParentId && drgElem) {
		    if (srcItem.ParentId != this.SourceElem.attr("id")) {
			var destination = $("#"+srcItem.ParentId);
			$(destination).append(drgElem.Element);
			this.onChangeinDestination(drgElem.Element, destination, false, true, drgElem);
		    }
		}
	    }
	    this.updateManifest();
        } catch(e) { }
    },
    updateManifest:function(){
	for(var i=0; i<this.Manifest.Source.Items.length; i++){
	    var srcItem = this.Manifest.Source.Items[i];
	    var drgElem = this.DragElements[i];
	    var parentId = "";
	    if (drgElem.Parent) parentId = drgElem.Parent.attr("id");
	    srcItem.ParentId = parentId;
	}
    },
    onItemTouchStart:function(event){
        event.preventDefault();
        var drgNdrp = this;
        if (!this.IsBusy) {
	    this.downElementIndex = -1;
            var element = $(event.target);
            element = $(event.target).parents("."+this.ElementsClass);
            for (var ele=0; ele<this.DragElements.length; ele++) {
                var zInd = this.DragElements[ele].Element.css("z-index");
                if(this.DragElements[ele].Element[0] == element[0]){
		    this.downElementIndex = ele;
                    this.DragElements[ele].Element.removeClass(this.DropClass);
                    this.isTouched = true;
                    this.TouchedIndex = ele;
                    var parentOffset = element.parent().offset();
                    try{
			this.DownX = event.originalEvent.touches[0].pageX - element.position().left - parentOffset.left;
			this.DownY = event.originalEvent.touches[0].pageY - element.position().top - parentOffset.top;
		    }catch(e){
			this.DownX = event.pageX - element.position().left - parentOffset.left;
			this.DownY = event.pageY - element.position().top - parentOffset.top;
		    }
                    this.DragElements[ele].Element.css({"z-index":(1000 + Number(this.DragElements.length-1)),"position":"absolute"});
                    this.DragElements[ele].Element.addClass(this.FirstInStackClass);
                    this.DragElements[ele].Element.removeClass(this.BackInStackClass);
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
	this.updateManifest();
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
        
    },
    onMove:function(pageX,pageY){
        if (this.isTouched && !this.IsBusy) {
            var element = this.DragElements[this.TouchedIndex].Element;
            var parentOffset = element.parent().offset();
            var l = pageX - parentOffset.left - this.DownX;
            var t = pageY - parentOffset.top - this.DownY;
            var a = true;
            if (this.Boundary)
                a = (l > 0 && l < this.Boundary.width()-element.width() && t > 0 && t < this.Boundary.height()-element.height());
            if (a) element.css({"left":l+"px", "top":t+"px"});
        }
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
            var parentOffset = elementObj.Element.parent().offset();
            for (var d=0; d<this.DestinationElems.length; d++) {
                var destEl = this.DestinationElems[d].Element;
		var desetElLeft = destEl.offset().left;
		var desetElTop = destEl.offset().top;
                if(desetElLeft < touchX && desetElLeft + destEl.width() > touchX &&
                   desetElTop < touchY && desetElTop + destEl.height() > touchY){
                    droppedBox = d;
		    if (this.Options.dropSize > 0)
			if(destEl.children().length >= this.Options.dropSize){
			    droppedBox = -1;
			    break;
			}
		    resetEnable();
                    drgNdrp.IsBusy = true;
                    this.changeContainer(elementObj.Element,destEl,parentOffset, true);
                    this.onChangeinDestination(elementObj.Element, destEl, true, false, elementObj);
                    elementObj.Element.addClass(this.DropClass);
                    break;
                }
            }
            if (droppedBox == -1 && this.AutoRevert) {
                this.changeContainer(elementObj.Element, this.SourceElem, parentOffset, false, true);
		elementObj.Parent = this.SourceElem;
		drgNdrp.onItemChange();
		/*elementObj.Element.animate({"left":elementObj.OrgX+"px","top":elementObj.OrgY+"px"},{complete:function(){
		    
		},duration:this.AniTime});*/
            }
            for(var d=0; d<this.DestinationElems.length; d++)
                for (var e=0; e<this.DestinationElems[d].Element.children().length; e++){
                    this.onChangeinDestination($(this.DestinationElems[d].Element.children()[e]), this.DestinationElems[d].Element, false, true);
                }
	    setTimeout(function(){drgNdrp.IsBusy = false; this.downElementIndex=-1;}, this.AniTime*1.2);
	    this.updateManifest();
        }
        else this.isTouched = false; 
    },
    onItemChange:function(){},
    onChangeinDestination:function(Element, Destination, checkFinal, isFastMove, ElementSource){
        var drgNdrp = this;
	if (!ElementSource) {
	    for(var elemIndx=0; elemIndx<drgNdrp.DragElements.length; elemIndx++){
		var srcElem = drgNdrp.DragElements[elemIndx];
		if (srcElem.Element[0] == Element[0]) {
		    ElementSource = srcElem;
		    break;
		}
	    }
	}
	ElementSource.Parent = Destination;
	var newPos = this.positionElement(Element);
	var xPos = newPos.x, yPos = newPos.y;
	var lX = newPos.orgX, lY = newPos.orgY;
	
        Element.removeClass(this.BackInStackClass);
	
	var aniTime = this.AniTime;
	if (isFastMove) aniTime *= 0.5;
	if (Math.abs(yPos - lY) > 5 || Math.abs(xPos - lX) > 5) {
	    Element.animate({"left":xPos+"px","top":yPos+"px"},{complete:function(){
		    if (checkFinal) drgNdrp._onAllDropComplete();
		},duration:aniTime});
	}
	else{
	    Element.css({"left":xPos+"px","top":yPos+"px"});
	    if (checkFinal) drgNdrp._onAllDropComplete();
	}
    },
    positionElement:function(Element){
	var lX = Element.position().left;
        var lY = Element.position().top;
	var Destination = Element.parent();
        var ind = 0;
	var xPos, yPos;
	if (this.Options.verticalPlacement) yPos = (Destination.height() - Element.outerHeight(true))/2;
	else xPos = (Destination.width() - Element.outerWidth(true))/2;
	var sumX = this.Options.initPos, sumY = this.Options.initPos;
        for (var i=0; i<Destination.children().length; i++)
            if(Destination.children()[i] == Element[0]){
                ind = i;
                break;
            }
	    else {
		sumX += Destination.children().eq(i).outerWidth(true)+this.Options.elementPadding;
		sumY += Destination.children().eq(i).outerHeight(true)+this.Options.elementPadding;
	    }
	if (this.Options.verticalPlacement) xPos = sumX;
        else yPos = sumY;
	return {x: xPos, y: yPos, orgX: lX, orgY: lY};
    },
    _onAllDropComplete:function(){
	if (this.isAllDropped()) this.OnAllDropComplete();
    },
    isAllDropped:function(){
	var result = false;
	var childrenCount = 0;
        for (var i=0; i<this.DestinationElems.length; i++) {
            childrenCount += this.DestinationElems[i].Element.children().length;
        }
        if (childrenCount == this.DragElements.length) {
            this.validate();
	    result = true;
        }
	return result;
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
    changeContainer:function(Element,NewContainer,ParentOffset, checkDropOrder, isRevert){
        if (!ParentOffset) ParentOffset = Element.parent().offset();
        var prevX = ParentOffset.left;
        var prevY = ParentOffset.top;
	
	if (isRevert && this.downElementIndex >= 0 && NewContainer.children().length > this.downElementIndex) {
	    if (this.downElementIndex > 0) Element.insertAfter(NewContainer.children().eq(this.downElementIndex-1));
	    else Element.insertBefore(NewContainer.children().eq(0));
	}
	else NewContainer.append(Element);
        ParentOffset = Element.parent().offset();
        var currX = ParentOffset.left;
        var currY = ParentOffset.top;
        var objX = Element.position().left;
        var objY = Element.position().top;
        var l = objX + (prevX - currX);
        var t = objY + (prevY - currY);
        Element.css({"left":l+"px","top":t+"px"});
        if (checkDropOrder){
            var changed = false;
            for (var i=0; i<NewContainer.children().length; i++){
                var sibling = NewContainer.children()[i];
                if (Element[0] != sibling){
		    var pass = false;
		    if (!this.Options.verticalPlacement && Element.position().top < $(sibling).position().top) pass = true;
		    if (this.Options.verticalPlacement && Element.position().left < $(sibling).position().left) pass = true;
		    if (pass) {
			$(sibling).before(Element);
			this.checkAllElementPos(NewContainer);
			break;
		    }
                }
            }
        }
    },
    checkAllElementPos:function(NewContainer){
        for (var i=0; i<NewContainer.children().length; i++){
            this.IsBusy = true;
            this.onChangeinDestination($(NewContainer.children()[i]), NewContainer, true, true);
        }
    }
};