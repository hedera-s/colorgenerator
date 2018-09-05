"use strict";
		
	var displayColorHex = document.getElementById("colorHex");
	var displayColorRgb =  document.getElementById("colorRgb");
	var displayColorHsl = document.getElementById("colorHsl");
	var testParagraph = document.getElementById("test");
	var inputColor = document.querySelectorAll("input");
	var selectHarmony = document.querySelectorAll("select");
	var colorValueHex;
	var colorHarmonyTyp;
	var color1 = document.getElementById("color1");
	var color2 = document.getElementById("color2");
	var color3 = document.getElementById("color3");
	var color4 = document.getElementById("color4");
	var color5 = document.getElementById("color5");
	var colorSet = document.getElementsByClassName("colorSet");
	
	
	function ColorSet(h1,h2,h3,h4,h5,s1,s2,s3,s4,s5,l1,l2,l3,l4,l5) {
		this.color1 = `hsl(${h1},${s1}%,${l1}%)`;
		this.color2 = `hsl(${h2},${s2}%,${l2}%)`;
		this.color3 = `hsl(${h3},${s3}%,${l3}%)`;
		this.color4 = `hsl(${h4},${s4}%,${l4}%)`;
		this.color5 = `hsl(${h5},${s5}%,${l5}%)`;
	};
	
	
	
	//----------------- Select der Harmonie---------------------
	function getHarmony(){
		colorHarmonyTyp = document.getElementById("inpHarmony").value;
		
		if (colorHarmonyTyp == "mono"){
			color1.style.backgroundColor = generateMonoColors().color1;
			color2.style.backgroundColor = generateMonoColors().color2;
			color3.style.backgroundColor = generateMonoColors().color3;
			color4.style.backgroundColor = generateMonoColors().color4;
			color5.style.backgroundColor = generateMonoColors().color5;
			
			for (let i=0; i<document.getElementsByClassName("st0").length; i++) {
				document.getElementsByClassName("st0")[i].style.fill = generateMonoColors().color1;
			};
			for (let i=0; i<document.getElementsByClassName("st1").length; i++) {
				document.getElementsByClassName("st1")[i].style.fill = generateMonoColors().color2;
			};
			for (let i=0; i<document.getElementsByClassName("st2").length; i++) {
				document.getElementsByClassName("st2")[i].style.fill = generateMonoColors().color3;
			};
			for (let i=0; i<document.getElementsByClassName("st3").length; i++) {
				document.getElementsByClassName("st3")[i].style.fill = generateMonoColors().color4;
			};
			for (let i=0; i<document.getElementsByClassName("st4").length; i++) {
				document.getElementsByClassName("st4")[i].style.fill = generateMonoColors().color5;
			};
			
			
			
		} else if (colorHarmonyTyp == "adjacent") {
			color1.style.backgroundColor = generateAdjacentColors().color1;
			color2.style.backgroundColor = generateAdjacentColors().color2;
			color3.style.backgroundColor = generateAdjacentColors().color3;
			color4.style.backgroundColor = generateAdjacentColors().color4;
			color5.style.backgroundColor = generateAdjacentColors().color5;
			
			for (let i=0; i<document.getElementsByClassName("st0").length; i++) {
				document.getElementsByClassName("st0")[i].style.fill = generateAdjacentColors().color1;
			};
			for (let i=0; i<document.getElementsByClassName("st1").length; i++) {
				document.getElementsByClassName("st1")[i].style.fill = generateAdjacentColors().color2;
			};
			for (let i=0; i<document.getElementsByClassName("st2").length; i++) {
				document.getElementsByClassName("st2")[i].style.fill = generateAdjacentColors().color3;
			};
			for (let i=0; i<document.getElementsByClassName("st3").length; i++) {
				document.getElementsByClassName("st3")[i].style.fill = generateAdjacentColors().color4;
			};
			for (let i=0; i<document.getElementsByClassName("st4").length; i++) {
				document.getElementsByClassName("st4")[i].style.fill = generateAdjacentColors().color5;
			};
	
		} else {
			color1.style.backgroundColor = generateTriadeColors().color1;
			color2.style.backgroundColor = generateTriadeColors().color2;
			color3.style.backgroundColor = generateTriadeColors().color3;
			color4.style.backgroundColor = generateTriadeColors().color4;
			color5.style.backgroundColor = generateTriadeColors().color5;
			
			for (let i=0; i<document.getElementsByClassName("st0").length; i++) {
				document.getElementsByClassName("st0")[i].style.fill = generateTriadeColors().color1;
			};
			for (let i=0; i<document.getElementsByClassName("st1").length; i++) {
				document.getElementsByClassName("st1")[i].style.fill = generateTriadeColors().color2;
			};
			for (let i=0; i<document.getElementsByClassName("st2").length; i++) {
				document.getElementsByClassName("st2")[i].style.fill = generateTriadeColors().color3;
			};
			for (let i=0; i<document.getElementsByClassName("st3").length; i++) {
				document.getElementsByClassName("st3")[i].style.fill = generateTriadeColors().color4;
			};
			for (let i=0; i<document.getElementsByClassName("st4").length; i++) {
				document.getElementsByClassName("st4")[i].style.fill = generateTriadeColors().color5;
			};
	
		};
		
		return colorHarmonyTyp;
	};
	
	//----------------- Input der Farbe ------------------------
	
	function getColorHex(){  
		colorValueHex = document.getElementById("inpColor").value;
		displayColorHex.innerHTML = colorValueHex;	
		return colorValueHex;
			
		};
		
	//-------------- HEX in RGB --------------------------------
	
	function hexToRgb(){
	var colorRgb = getColorHex(); // green
	var r = parseInt(colorRgb.substr(1,2), 16); //Umrechnung HEX in dezimal
	var g = parseInt(colorRgb.substr(3,2), 16);
	var b = parseInt(colorRgb.substr(5,2), 16);
	displayColorRgb.innerHTML = [r,g,b];	
	return [r, g, b];
	
	};
	
	// ------------- RGB in HSL --------------------------------
	
	function rgbToHsl(r, g, b){
		var r = hexToRgb()[0] / 255, g = hexToRgb()[1] / 255, b = hexToRgb()[2] / 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);  // 
		var h, s, l = (max + min) / 2;

		if(max == min){
			h = s = 0; // schwarz-weiß
		}else{
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max){
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		
		h = (h * 360).toFixed(0);
		s = (s * 100).toFixed(0);
		l = (l * 100).toFixed(0);
		displayColorHsl.innerHTML = [h,s,l];
		return [h,s,l];
	};
	
	
	
	
	//----------------- Algorithmus "Ähnliche Farben" --------------------
	
	function generateAdjacentColors(h1,s1,l1){
		var h1 = Number(rgbToHsl()[0]), s1 = Number(rgbToHsl()[1]), l1 = Number(rgbToHsl()[2]);
		var h2, s2, l2;
		var h3, s3, l3;
		var h4, s4, l4;
		var h5, s5, l5;
		var hArr = [h1,h2,h3,h4,h5];
		
		for (let i=1; i<5; i++) {  // generieren alle H
		hArr[i] = hArr[i-1] + 18;
		(hArr[i] > 359) ? (hArr[i] = hArr[i]%359) : (hArr[i]); // wenn h > 359, dann am Anfang des Farbkreises
		};
		
		s2 = s3 = s4 = s5 = s1; // S bleibt unverändert
		
		if (l1 < 10 || l1 > 90) {
			l2 = l3 = l4 = l5 = l1; // zu dunkel, um Unterschied zu erkennen, L bleibt unverändert
		} else { 
			l2 = l1 - 5;
			l3 = l2 + 8;
			l4 = l2;
			l5 = l1;
		}; 
		var hsl1 = [hArr[0],s1,l1];
		h1 = hArr[0]; h2 = hArr[1]; h3 = hArr[2]; h4 = hArr[3]; h5 = hArr[4];
		 
		var currentCollection = new ColorSet(h1,h2,h3,h4,h5,s1,s2,s3,s4,s5,l1,l2,l3,l4,l5); 
		return currentCollection;
		
		
	};
	
		
		//----------------- Algorithmus "Triade" --------------------
		
		function generateTriadeColors(h1,s1,l1){
			var h1 = Number(rgbToHsl()[0]), s1 = Number(rgbToHsl()[1]), l1 = Number(rgbToHsl()[2]);
			var h2, s2, l2;
			var h3, s3, l3;
			var h4, s4, l4;
			var h5, s5, l5;
			
			
			h3 = h1; // generieren H
			h2 = h1 + 60;
			(h2 > 359) ? (h2 = h2%359) : (h2); // wenn h > 359, dann am Anfang des Farbkreises
			h4 = h5 = h2 + 144;
			(h4 > 359) ? (h5 = h4 = h4 % 359) : (h4);
			
			s2 = s3 = 100; // generieren S
			s4 = s1;
			s5 = s1 - 10;
			(s5 > 100 || s5 < 0)?(s5 = s1):(s5); 
			
			l2 = l1+20; // generieren L
			(l2>100)?(l2=100):(l2);
			l3 = l2-5;
			l4 = l1 + 10;
			(l4>100)?(l4=100):(l4);
			l5 = l1;
			
		var currentCollection = new ColorSet(h1,h2,h3,h4,h5,s1,s2,s3,s4,s5,l1,l2,l3,l4,l5); 
		return currentCollection;
		};
		
		// ------------------------ Algorithmus "Monochromatisch" -----------------
		
		function generateMonoColors(h1,s1,l1){
			var h1 = Number(rgbToHsl()[0]), s1 = Number(rgbToHsl()[1]), l1 = Number(rgbToHsl()[2]);
			var h2, s2, l2;
			var h3, s3, l3;
			var h4, s4, l4;
			var h5, s5, l5;
			
			h2 = h3 = h4 = h5 = h1; // generieren H
			
					  
			if (s1 > 10) {// generieren S
				s2 = s3 = s1 - 10;
				(s2>100)?(s2=s3=100):(s2);
			} else {
				(s2 = s3 = 0);
			};
				
			s4 = (s1/2).toFixed(0);
			s5 = s1;
			
			 
			l4 = l1 + 8;
			if (l4 > 93) {
				l4 = l1 - 8;
				l5 = l4 - 11;
				l3 = l5 - 12;
				l2 = l3 - 15;
			} else {
				l5 = l4 + 11;
				if (l5 > 93) {
					l5 = l1 - 11;
					l3 = l5 - 12;
					l2 = l3 - 15;
				} else {
					l3 = l5 + 12;
					if (l3 > 93) {
						l3 = l1 - 12;
						l2 = l3 - 15;
					} else {
						l2 = l3 + 15;
						if (l2 > 93) {
							l2 = l1 - 15;
						}
					}
				}
			};
			
		
		var currentCollection = new ColorSet(h1,h2,h3,h4,h5,s1,s2,s3,s4,s5,l1,l2,l3,l4,l5); 
		return currentCollection;
		};
		
		// --------------------------- Farben Generieren ---------------------
	function convertInputToHsl(){
		getColorHex();
		hexToRgb();
		rgbToHsl();
		if (getHarmony() == "mono"){
			color1.style.backgroundColor = generateMonoColors().color1;
			color2.style.backgroundColor = generateMonoColors().color2;
			color3.style.backgroundColor = generateMonoColors().color3;
			color4.style.backgroundColor = generateMonoColors().color4;
			color5.style.backgroundColor = generateMonoColors().color5;
		} else if (getHarmony() == "adjacent") {
			color1.style.backgroundColor = generateAdjacentColors().color1;
			color2.style.backgroundColor = generateAdjacentColors().color2;
			color3.style.backgroundColor = generateAdjacentColors().color3;
			color4.style.backgroundColor = generateAdjacentColors().color4;
			color5.style.backgroundColor = generateAdjacentColors().color5;
		} else {
			color1.style.backgroundColor = generateTriadeColors().color1;
			color2.style.backgroundColor = generateTriadeColors().color2;
			color3.style.backgroundColor = generateTriadeColors().color3;
			color4.style.backgroundColor = generateTriadeColors().color4;
			color5.style.backgroundColor = generateTriadeColors().color5;
		};
		
		
			
	};
	
	function paintPattern(){
		document.getElementsByClassName("st0").setAttribute("fill", generateTriadeColors().color5);
	};
	
	
	
	
	testParagraph.innerHTML = convertInputToHsl.name;

	getHarmony(); 
	convertInputToHsl(); // Konvertieren der Default-Farbe
	selectHarmony[0].addEventListener("change", getHarmony);
	inputColor[0].addEventListener("change", convertInputToHsl);
	
	
	