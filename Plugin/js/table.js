(function() {
  this.Modal = function() {
	
	
	var defaults = {
      tableHead: [],
	  arr: [],
      row: '',
	  colum: '',
	  headerHeight: '',
	  Width: '',
	  Height: '',
	  closeImgWidth: '',
      divId: ''
	}
	
	// plugIn code start
	if(arguments[0] && typeof arguments[0] === "object"){
		 this.options = extendDefaults(defaults, arguments[0]);		
	}	
	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
		  if (properties.hasOwnProperty(property)) {
			source[property] = properties[property];
		  }
		}
		return source;
	}
	// plugIn code end
	
	
	
	// My function Start
	this.load = function(){
		var tabBody = document.getElementsByTagName("body")[0];
		var createTable = document.createElement('table');
		createTable.setAttribute('id','tab');
		createTable.style.width = this.options.Width+'px';
		createTable.style.height = this.options.Height+'px';
		createTable.setAttribute('border','0');
		
		var thead = document.createElement('thead');
		createTable.appendChild(thead);
		
		for(k=0;k<this.options.colum;k++){
			var th = document.createElement('th');
			thead.appendChild(th);
			th.innerHTML = this.options.tableHead[k];
			th.style.backgroundColor = '#42eef4';
			th.style.height = this.options.headerHeight+'px';
			
			var b = this.options.tableHead[k].replace(/\s/g, "_");
			window[b[k]] = [];
			console.log(window[b[k]]);
		}
		
		var tbody = document.createElement('tbody');
		
		var count=0;
		for(i=0;i<this.options.row;i++){
				var trow = document.createElement('tr');
				trow.setAttribute('id','name'+i+'');
				
				
			for(j=0;j<this.options.colum;j++){
				var tcolum = document.createElement('td');
				tcolum.setAttribute('class','tabTd');
				tcolum.innerHTML = this.options.arr[count];
				count++;
				trow.appendChild(tcolum);
			}
			
			var tcolum_1 = document.createElement('td');
			tcolum_1.innerHTML = '<img onclick="closeBtn(this)" style="width:12px;height:auto;margin-top:7px;cursor:pointer;" src="images/wrong.png" />';
			trow.appendChild(tcolum_1);
			tcolum_1.style.backgroundColor = "#fff";
			tbody.appendChild(trow);
			tcolum_1.style.width = this.options.closeImgWidth+'px';
			
		}
		
		
		
		
		
		var tableFinal = tabBody.appendChild(createTable);
		var divID = this.options.divId;
		document.getElementById(divID).appendChild(tableFinal);
		createTable.appendChild(tbody);
		
		
		
	}
	// My function End
	
	
	}
	

	
}());

function closeBtn(tableRow){
	var deleteTr = tableRow.parentNode.parentNode.rowIndex;
    document.getElementById("tab").deleteRow(deleteTr);
}

