window.onload = function click_onguard()
{
	var x = document.getElementById("onguard");
	var y = document.getElementById("lavanda");
	var z = document.getElementById("menta");
	var t = document.getElementById("hide_onguard");
	var w = document.getElementById("hide_lavanda");
	var v = document.getElementById("hide_menta");
	x.onclick=function(){
		text(x);
	}
	y.onclick=function(){
		text(y);
	}
	z.onclick=function(){
		text(z);
	}
	t.onclick=function(){
		poza(t);
	}
	w.onclick=function(){
		poza(w);
	}
	v.onclick=function(){
		poza(v);
	}

	var i = 0;


	if( document.getElementById("myCheck").checked == true )
	
		
		var p = document.getElementById("createInfo");
		p.onclick=function(){
			if( document.getElementById("myCheck").checked == true )
			{
				createPara(i);
				i++;
			}
		}
		p = document.getElementById("deleteInfo");
		p.onclick=function(){
			if( document.getElementById("myCheck").checked == true )
			deletePara();
		}

	document.getElementById("submit").addEventListener("click", function(){ this.style.color="red";})
	document.getElementById("submit").addEventListener("click",function(){ Submit(); clickCounter();}, true);
	var b = document.getElementById("culoareButon");
	b.onclick=function(){
		find_color();
	}

	b = document.getElementById("alert_click");
	b.onclick=function(event){
		alert(event.target.nodeName);
	}
	b = document.getElementsByClassName("imagine");
	for ( let i = 0; i < b.legth; i++ )
	{
		b[i].onclick=function(event){
			alert(event.target.nodeName);
			stopPropagation();
		}
	}


	b=document.getElementById("tastatura");
	b.onkeydown=function(event){
		var x = event.key;
		document.getElementById("tasta").innerHTML = "Ati apasat tasta " + x;
	}

	b=document.getElementById("pagina");
	b.onclick=function(event){
		var x = event.pageX;
		var y = event.pageY;
		var coords = "X coords: " + x + " , Y coords: " + y;
		document.getElementById("coordonate").innerHTML = coords;
	}
	var myWindow;
	b = document.getElementById("myAnchor");
	b.onclick=function(){
		myWindow=window.open("https://www.doterra.com");
	}
	b=document.getElementById("notAnchor");
	b.onclick=function(){
		myWindow.close();
	}

}


function clickCounter()
{
	if( typeof(Storage) !== "undefined" )
	{
		if ( localStorage.clickcount )
			localStorage.clickcount = Number(localStorage.clickcount) + 1;
		else
			localStorage.clickcount = 1;
		document.getElementById("nrClick").innerHTML = "Ai apasat butonul Submit de "+ localStorage.clickcount + " ori.";
	}
	else
		document.getElementById("nrClick").innerHTML = "Browserul nu suporta web storage.";
}

function find_color()
{
	var elem = document.getElementById("ce_culoare");
	var a = window.getComputedStyle(elem,null).getPropertyValue("color");
	document.getElementById("culoareAscunsa").innerHTML = a;
}

function Submit()
{
	if ( document.getElementById("DA").checked == true )
	{
		document.getElementById("butoane").style.display='initial';
	}
	if(document.getElementById("NU").checked == true )
		document.getElementById("butoane").style.display='none';
}


function deletePara()
{
	var p = document.getElementById("Informatii");
	p.removeChild(p.childNodes[0]);
}

function createPara( i )
{
	var para = document.createElement("P");
	var info=["Info1","Info2","Info3","Info4"]

	var t = document.createTextNode(info[i%4]);
	para.appendChild(t);
	document.getElementById("Informatii").appendChild(para);
}

function text( a ){
	var x = document.getElementById("onguard");
	var y = document.getElementById("lavanda");
	var z = document.getElementById("menta");
	if ( a == x)//a.className == "myOnguard" )
		var t = document.getElementById("text_onguard");
	if( a == y )
		var t = document.getElementById("text_lavanda");
	if( a == z )
		var t = document.getElementById("text_menta");
	a.style.display = "none";
	t.style.display = "initial";
}

function poza( a ){
	var t = document.getElementById("hide_onguard");
	var w = document.getElementById("hide_lavanda");
	var v = document.getElementById("hide_menta");

	if( a == t )
	{
		var x = document.getElementById("onguard");
		var b = document.getElementById("text_onguard");
	}
	if( a == w )
	{
		var x = document.getElementById("lavanda");
		var b = document.getElementById("text_lavanda");
	}
	if( a == v )
	{
		var x = document.getElementById("menta");
		var b = document.getElementById("text_menta");
	}
	b.style.display = "none";
	x.style.display = "initial";
}




