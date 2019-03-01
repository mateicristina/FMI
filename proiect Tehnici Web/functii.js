window.onload = function click_onguard()
{

	document.getElementById("myAnchor").addEventListener("click", function(event){
  event.preventDefault()
});

	

	var b = document.getElementById("clock");
	b.onclick=function(){
		stopClock();
	}

	var d = document.getElementsByClassName("stergClasa");
	d[0].onclick=function(){
		this.classList.remove("stergClasa");
	}

	var d = document.getElementById("dece");
	d.onclick=function(){
		this.parentElement.style.color="purple";
	}
	
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

var myVar = setInterval(myTimer, 1000, "Ora: ");

function myTimer( c ) {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("time").innerHTML = c + t;
}

function stopClock(){
	clearInterval(myVar);
}

