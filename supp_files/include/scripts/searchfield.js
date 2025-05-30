/* Setting search term into URL - some systems are set up to set the search term into the URL - this simulates that action so the student can use the getQueryParam plugin to populate external tracking code into s.campaign */

cookie_name = "dataCookie";
var YouEntered;

function putCookie() {

if(document.cookie != document.cookie)
{index = document.cookie.indexOf(cookie_name);}
else
{ index = -1;}

if (index == -1)
{
YouEntered=document.cf.searchfield.value;document.cookie=cookie_name+"="+YouEntered+"; expires=Monday, 04-Apr-2015 05:00:00 GMT";
}

}


cookie_name = "dataCookie";
var YouWrote;

function getName() {
if(document.cookie)
{
index = document.cookie.indexOf(cookie_name);
if (index != -1)
{
namestart = (document.cookie.indexOf("=", index) + 1);
nameend = document.cookie.indexOf(";", index);
if (nameend == -1) {nameend = document.cookie.length;}
YouWrote = document.cookie.substring(namestart, nameend);
//alert(YouWrote);
return YouWrote;
}
}
}

YouWrote=getName();
if (YouWrote == "dataCookie")
{YouWrote = "Nothing_Entered"}




/* 

	SEARCHFIELD
	written by Alen Grakalic, provided by Css Globe (cssglobe.com)
	please visit http://cssglobe.com/post/1202/style-your-websites-search-field-with-jscss/ for more info
	
*/

this.searchfield = function(){
	
	// CONFIG 
	
	// this is id of the search field you want to add this script to. 
	// You can use your own id just make sure that it matches the search field in your html file.
	var id = "searchfield";
	
	// Text you want to set as a default value of your search field.
	var defaultText = "Search Geometrixx...";	
	
	// set to either true or false
	// when set to true it will generate search suggestions list for search field based on content of variable below
	var suggestion = true;
	
	// static list of suggestion options, separated by comma
	// replace with your own
	var suggestionText = "Abstract Silk Print Dress,Activewear,Adobe,Adobe Analytics,Adobe Audience Manager,Adobe Campaign,Adobe Experience Manager,Adobe Media Optimizer,Adobe Primetime,Adobe Social,Adobe Target,Angelina Brie,Apparel,Athletic,Basic Fleece Pants,Bella McCartney,black dress,bomber flight jacket,Boots,Canvas,Chole Street,Citizens,Clutches,coat,conversion,corduroy blazer,Couture,Cropped Leather Jacket,Danielle Spears,Denim,Dresses,dusty gray print skirt,El Mac,Ella Blue,Escape,Esq,Evening,exotic shell clutch,Femby Wool Jacket,Fine Apparel,Fleece Hooded Sweatshirt,Flutter Sleep Top,Footwear,forever runway metallic clutch,Front-Zip Ski Jacket,Fuel,Fur Trim Ski Jacket,gaucho pants,geometrixx,gifts,gold blocks,golf,green,gypsy leather pink hobo,Handbags,Hobos,Hosiery,InDesign,Illustrator,Ireland Couture,Izzy,Jackets,jalapenos,Jason says hello,jewelry,Kol Hans,kneck tie,kryptonite,krusty,Leather,Lidia Culture,Liquid Couture,Long Down Ski Jacket,Long-Sleeve Crewneck,Marc James,Mary Caterina,Mia Sport,Milla,Milly Milano,military jacket,Motorcycle Leather Jacket,Nine,Novelle,One for All,orange,Outerwear,Pants,Perrier,Photoshop,Pleated Cropped Blouse,Print Halter Swimsuit,Puff Sleeve Top,quail eggs,quicksand,Quilted Down Vest,Racei Denim,red dress,Report Builder,Rockin Jewels,Sandals,Scoopneck Top,Scrunched Leg Cargo Pants,Shearling Jacket,Shirts,Shoes,Shorts,Shoulder,Ski,Skirts,Sleepwear,Sleepwear,St.Stephen,steaks,sweatshirts,swimwear,targets,Tommy Hillman,Tops,Tori Tate,tie,Tie-Waist Puffer Jacket,Totes,traffic,trended graph,tuxedo,ultimate,uppercrust,vanity,vivacious verde skirt,vogue,Women,Woolberry,Woolberry Quilted Jacket,x-axis,xylophone,yelow,yellow dress,youth,Zip-Front Hoodie,Zoey Ryan";  
	
	// END CONFIG (do not edit below this line, well unless you really, really want to change something :) )
	
	// Peace, 
	// Alen

	var field = document.getElementById(id);	
	var classInactive = "sf_inactive";
	var classActive = "sf_active";
	var classText = "sf_text";
	var classSuggestion = "sf_suggestion";
	this.safari = ((parseInt(navigator.productSub)>=20020000)&&(navigator.vendor.indexOf("Apple Computer")!=-1));
	if(field && !safari){
		field.value = defaultText;
		field.c = field.className;		
		field.className = field.c + " " + classInactive;
		field.onfocus = function(){
			this.className = this.c + " "  + classActive;
			this.value = (this.value == "" || this.value == defaultText) ?  "" : this.value;
		};
		field.onblur = function(){
			this.className = (this.value != "" && this.value != defaultText) ? this.c + " " +  classText : this.c + " " +  classInactive;
			this.value = (this.value != "" && this.value != defaultText) ?  this.value : defaultText;
			clearList();
		};
		if (suggestion){
			
			var selectedIndex = 0;
						
			field.setAttribute("autocomplete", "off");
			var div = document.createElement("div");
			var list = document.createElement("ul");
			list.style.display = "none";
			div.className = classSuggestion;
			list.style.width = field.offsetWidth + "px";
			div.appendChild(list);
			field.parentNode.appendChild(div);	

			field.onkeypress = function(e){
				
				var key = getKeyCode(e);
		
				if(key == 13){ // enter
					selectList();
					selectedIndex = 0;
					return false;
				};	
			};
				
			field.onkeyup = function(e){
			
				var key = getKeyCode(e);
		
				switch(key){
				case 13:
					return false;
					break;			
				case 27:  // esc
					field.value = "";
					selectedIndex = 0;
					clearList();
					break;				
				case 38: // up
					navList("up");
					break;
				case 40: // down
					navList("down");		
					break;
				default:
					startList();			
					break;
				};
			};
			
			this.startList = function(){
				var arr = getListItems(field.value);
				if(field.value.length > 0){
					createList(arr);
				} else {
					clearList();
				};	
			};
			
			this.getListItems = function(value){
				var arr = new Array();
				var src = suggestionText;
				var src = src.replace(/, /g, ",");
				var arrSrc = src.split(",");
				for(i=0;i<arrSrc.length;i++){
					if(arrSrc[i].substring(0,value.length).toLowerCase() == value.toLowerCase()){
						arr.push(arrSrc[i]);
					};
				};				
				return arr;
			};
			
			this.createList = function(arr){				
				resetList();			
				if(arr.length > 0) {
					for(i=0;i<arr.length;i++){				
						li = document.createElement("li");
						a = document.createElement("a");
						a.href = "javascript:void(0);";
						a.i = i+1;
						a.innerHTML = arr[i];
						li.i = i+1;
						li.onmouseover = function(){
							navListItem(this.i);
						};
						a.onmousedown = function(){
							selectedIndex = this.i;
							selectList(this.i);		
							return false;
						};					
						li.appendChild(a);
						list.setAttribute("tabindex", "-1");
						list.appendChild(li);	
					};	
					list.style.display = "block";				
				} else {
					clearList();
				};
			};	
			
			this.resetList = function(){
				var li = list.getElementsByTagName("li");
				var len = li.length;
				for(var i=0;i<len;i++){
					list.removeChild(li[0]);
				};
			};
			
			this.navList = function(dir){			
				selectedIndex += (dir == "down") ? 1 : -1;
				li = list.getElementsByTagName("li");
				if (selectedIndex < 1) selectedIndex =  li.length;
				if (selectedIndex > li.length) selectedIndex =  1;
				navListItem(selectedIndex);
			};
			
			this.navListItem = function(index){	
				selectedIndex = index;
				li = list.getElementsByTagName("li");
				for(var i=0;i<li.length;i++){
					li[i].className = (i==(selectedIndex-1)) ? "selected" : "";
				};
			};
			
			this.selectList = function(){
				li = list.getElementsByTagName("li");	
				a = li[selectedIndex-1].getElementsByTagName("a")[0];
				field.value = a.innerHTML;
				clearList();
			};			
			
		};
	};
	
	this.clearList = function(){
		if(list){
			list.style.display = "none";
			selectedIndex = 0;
		};
	};		
	this.getKeyCode = function(e){
		var code;
		if (!e) var e = window.event;
		if (e.keyCode) code = e.keyCode;
		return code;
	};
	
};

// script initiates on page load. 

this.addEvent = function(obj,type,fn){
	if(obj.attachEvent){
		obj['e'+type+fn] = fn;
		obj[type+fn] = function(){obj['e'+type+fn](window.event );}
		obj.attachEvent('on'+type, obj[type+fn]);
	} else {
		obj.addEventListener(type,fn,false);
	};
};
addEvent(window,"load",searchfield);

