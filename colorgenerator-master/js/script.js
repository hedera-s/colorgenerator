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
	var colors = document.getElementsByClassName("colorSet");
	
	//--------------- Objektkonstruktor "Farbe in HSL" ------------
	//----------------Resultat als "hsl(123,12%,12%)"--------------
	
	function ColorSet(h1,h2,h3,h4,h5,s1,s2,s3,s4,s5,l1,l2,l3,l4,l5) { 
		this[0] = `hsl(${h1},${s1}%,${l1}%)`;
		this[1] = `hsl(${h2},${s2}%,${l2}%)`;
		this[2] = `hsl(${h3},${s3}%,${l3}%)`;
		this[3] = `hsl(${h4},${s4}%,${l4}%)`;
		this[4] = `hsl(${h5},${s5}%,${l5}%)`;
	};
	
	//----------------- Input der Farbe ---------------------------
	//-------------------------------------------------------------
	
	function getColorHex(){  
		colorValueHex = document.getElementById("inpColor").value;
		//displayColorHex.innerHTML = colorValueHex;	
		return colorValueHex;
			
		};
		
	//-------------- HEX in RGB --------------------------------
	//----------------------------------------------------------
	// Extract the RGB components of the hex color notation.

	function hexToRgb(){
	var colorRgb = getColorHex(); 
	var r = parseInt(colorRgb.substr(1,2), 16); //Umrechnung HEX in dezimal
	var g = parseInt(colorRgb.substr(3,2), 16);
	var b = parseInt(colorRgb.substr(5,2), 16);
	//displayColorRgb.innerHTML = [r,g,b];	
	return [r, g, b];
	
	};
	
	// ------------- RGB in HSL ------------------------------------
	//--------------------------------------------------------------
	
	//The byte (0-255) representation of  color.
	//Used the formulae from the Wikipedia article to calculate hue https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
	
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
		//displayColorHsl.innerHTML = [h,s,l];
		return [h,s,l];
	};
	
	
	
	
	//----------------- Algorithm "Ähnliche Farben" --------------------
	//--------------------------------------------------------------------
	//---h2 = h1+18, h3=h3+18 usw ----------------------------------------
    //---alle S sind gleich
	
	function generateAdjacentColors(){
		var h1 = Number(rgbToHsl()[0]), s1 = Number(rgbToHsl()[1]), l1 = Number(rgbToHsl()[2]);
		var h2, s2, l2, h3, s3, l3, h4, s4, l4, h5, s5, l5;
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
	
		
		//----------------- Algorithm "Triade" --------------------
		//-----------------------------------------------------------
		//
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
		
		// ------------------------ Algorithm "Monochromatisch" -----------------
		//-------------------------------------------------------------------------
		
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
			
			 
			l4 = l1 + 8; // wenn L mehr als 93 ist, dann zu hell
			if (l4 > 93) { // und L soll von L1 substrahiert werden
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
	//--------------------------------------------------------------------
    // wenn Benutzer Angabe mit Farbfeld macht
		
	function convertInputToHsl(){ 
		getColorHex();
		hexToRgb();
		rgbToHsl();
		if (getHarmony() == "mono"){
			paintSwatchesMono();
		} else if (getHarmony() == "adjacent") {
			paintSwatchesAdjacent();
		} else {
			paintSwatchesTriade();
		};
	};
	
	//------------------------ Select der Harmonie---------------------
	//-----------------------------------------------------------------
    //wenn Benutzer eine Harmonie auswählt

	function getHarmony(){
		colorHarmonyTyp = document.getElementById("inpHarmony").value; 
		if (colorHarmonyTyp == "mono"){
			paintSwatchesMono();
			paintPatternMono();
		} else if (colorHarmonyTyp == "adjacent") {
			paintSwatchesAdjacent();
			paintPatternAdjacent();
		} else {
			paintSwatchesTriade();
			paintPatternTriade();
		};
		
		return colorHarmonyTyp;
	};
	
	
	
	//-------------------- Farbfelder colorieren -------------------------
	//--------------------------------------------------------------------
	
	function paintSwatchesMono() {
		var mono = generateMonoColors();
		
		for (let i=0; i<=4; i++) {
			colors[i].style.backgroundColor = mono[i];
			colors[i].innerHTML = mono[i];
		};
	
	};
	
	function paintSwatchesAdjacent() {
		var adjacent = generateAdjacentColors();
		
		for (let i=0; i<=4; i++) {
			colors[i].style.backgroundColor = adjacent[i];
			colors[i].innerHTML = adjacent[i];
		};
	
		
	};
	
	function paintSwatchesTriade() {
		var triade = generateTriadeColors();
		
		for (let i=0; i<=4; i++) {
			colors[i].style.backgroundColor = triade[i];
			colors[i].innerHTML = triade[i];
		};
	};
	

	
	//------------------------Muster colorieren -------------------------------
	//-------------------------------------------------------------------------
	
	function paintPatternMono(){
		var mono = generateMonoColors();
		
		for (let i=0; i<document.getElementsByClassName("st0").length; i++) {   
				document.getElementsByClassName("st0")[i].style.fill = mono[0];  
			};
		for (let i=0; i<document.getElementsByClassName("st1").length; i++) {
				document.getElementsByClassName("st1")[i].style.fill = mono[1];
			};
		for (let i=0; i<document.getElementsByClassName("st2").length; i++) {
				document.getElementsByClassName("st2")[i].style.fill = mono[2];
			};
		for (let i=0; i<document.getElementsByClassName("st3").length; i++) {
				document.getElementsByClassName("st3")[i].style.fill = mono[3];
			};
		for (let i=0; i<document.getElementsByClassName("st4").length; i++) {
				document.getElementsByClassName("st4")[i].style.fill = mono[4];
			};
	};
	
	function paintPatternAdjacent() {
		var adjacent = generateAdjacentColors();
		for (let i=0; i<document.getElementsByClassName("st0").length; i++) {
				document.getElementsByClassName("st0")[i].style.fill = adjacent[0];
			};
			for (let i=0; i<document.getElementsByClassName("st1").length; i++) {
				document.getElementsByClassName("st1")[i].style.fill = adjacent[1];
			};
			for (let i=0; i<document.getElementsByClassName("st2").length; i++) {
				document.getElementsByClassName("st2")[i].style.fill = adjacent[2];
			};
			for (let i=0; i<document.getElementsByClassName("st3").length; i++) {
				document.getElementsByClassName("st3")[i].style.fill = adjacent[3];
			};
			for (let i=0; i<document.getElementsByClassName("st4").length; i++) {
				document.getElementsByClassName("st4")[i].style.fill = adjacent[4];
			};
	};
	
	function paintPatternTriade() {
		var triade = generateTriadeColors();
		for (let i=0; i<document.getElementsByClassName("st0").length; i++) {
				document.getElementsByClassName("st0")[i].style.fill = triade[0];
			};
			for (let i=0; i<document.getElementsByClassName("st1").length; i++) {
				document.getElementsByClassName("st1")[i].style.fill = triade[1];
			};
			for (let i=0; i<document.getElementsByClassName("st2").length; i++) {
				document.getElementsByClassName("st2")[i].style.fill = triade[2];
			};
			for (let i=0; i<document.getElementsByClassName("st3").length; i++) {
				document.getElementsByClassName("st3")[i].style.fill = triade[3];
			};
			for (let i=0; i<document.getElementsByClassName("st4").length; i++) {
				document.getElementsByClassName("st4")[i].style.fill = triade[4];
			};
	};
	
	
	

	//---------------------- HSL in HEX --------------------------------
	//------ für Ausgabe des Farbcodes ---------------------------------
	
	function hslToHex(h, s, l) {
		h /= 360;
		s /= 100;
		l /= 100;
		let r, g, b;
		if (s === 0) {
			r = g = b = l; // achromatic
		} else {
			const hue2rgb = (p, q, t) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}
		const toHex = x => {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
		};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
	
	
	
	getHarmony(); 
	convertInputToHsl(); // Konvertieren der Default-Farbe
	selectHarmony[0].addEventListener("change", getHarmony);
	inputColor[0].addEventListener("change", convertInputToHsl);
	
	
	