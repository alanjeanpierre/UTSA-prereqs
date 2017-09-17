// Delay loading any function until the html dom has loaded. All functions are
// defined in this top level function to ensure private scope.
jQuery(document).ready(function () {

  // Installs error handling.
  jQuery.ajaxSetup({
  error: function(resp, e) {
    if (resp.status == 0){
      alert('You are offline!!\n Please Check Your Network.');
      } else if (resp.status == 404){
        alert('Requested URL not found.');
      } else if (resp.status == 500){
        alert('Internel Server Error:\n\t' + resp.responseText);
      } else if (e == 'parsererror') {
        alert('Error.\nParsing JSON Request failed.');
      } else if (e == 'timeout') {
        alert('Request timeout.');
      } else {
        alert('Unknown Error.\n' + resp.responseText);
      }
    }
  });  // error:function()


  var generate_btn = jQuery('#generate_btn');

  var svg_div = jQuery('#graphviz_svg_div');
  var graphviz_data_textarea = jQuery('#graphviz_data');

  function InsertGraphvizText(text) {
    graphviz_data_textarea.val(text);
  }

  var g = buildGraph();

  document.getElementById('dw').onchange = function(){

	  var file = this.files[0];
	  var transcript = document.createElement('html');

	  var reader = new FileReader();
	  reader.onload = function(progressEvent){
		  
		transcript.innerHTML = this.result;
		var coursePattern = /\d\d\d\d/i;
		var courses = transcript.querySelectorAll(".dddefault");
		
		g.transmarked = [];
		
		for (var i = 0; i < courses.length; i++) {
			var disc = courses[i].innerHTML;
			if (courses[i+1] != null && coursePattern.test(courses[i+1].innerHTML)) {
				var num = courses[i+1].innerHTML;
				var c = disc + " " + num;
				var node = g.getNode(c);
				if (node && courses[i+4] != null && courses[i+4].innerHTML != "F" && courses[i+4].innerHTML[0] != "D") {
					//console.log(node.name);
					g.transmarked.push(node.name);
				}
			}
		}
	  };
	  reader.readAsText(file);
  };



  
  function UpdateGraphviz() {
	svg_div.html("");
	var name = document.getElementById("course").value;
	name = name.toUpperCase();
	var node = g.getNode(name);
	var renderer;
	if (node == null) {
		svg_div.html("Unkown Course");
	}
	else {
		var data;
		if(!document.getElementById("showall").checked) {
			data = bfs(g, node); 
			renderer = "dot";
		}
		else {
			data = dfs(g);
			renderer = "twopi";
		}
		console.log(data);
		// Generate the Visualization of the Graph into "svg".
		var svg = Viz(data, {format:"svg", engine:renderer});
		svg_div.html("<hr>"+svg);
	}
    
  }
  
  document.getElementById('core').onchange = function(){
	  
	  if (!document.getElementById('core').checked) {
		  g.coremarked = [];
		  return;
	  }
	  core = [
		"AIS 1203",
		"WRC 1013",
		"WRC 1023",
		"MAT 1023",
		"MAT 1033",
		"MAT 1043",
		"MAT 1073",
		"MAT 1093",
		"MAT 1193",
		"MAT 1214",
		"STA 1053",
		"ANT 2033",
		"AST 1013",
		"AST 1033",
		"BIO 1233",
		"BIO 1243",
		"BIO 1404",
		"BIO 1414",
		"ES 1113",
		"ES 1123",
		"ES 1213",
		"ES 2013",
		"ES 2023",
		"GEO 1013",
		"GEO 1123",
		"GRG 2613",
		"PHY 1013",
		"PHY 1943",
		"PHY 1963",
		"AAS 2013",
		"AAS 2113",
		"ANT 2063",
		"ARA 1014",
		"ARC 1113",
		"ARC 1413",
		"CHN 1014",
		"CLA 2013",
		"CLA 2023",
		"CLA 2323",
		"CSH 1103",
		"CSH 1113",
		"CSH 1213",
		"CSH 2113",
		"ENG 2013",
		"ENG 2213",
		"ENG 2383",
		"ENG 2423",
		"FRN 1014",
		"FRN 2333",
		"GER 1014",
		"GER 2333",
		"GLA 1013",
		"GRG 1023",
		"GRK 1114",
		"HIS 2123",
		"HIS 2133",
		"HIS 2533",
		"HIS 2543",
		"HIS 2553",
		"HIS 2573",
		"HIS 2583",
		"HUM 2093",
		"ITL 1014",
		"ITL 2333",
		"JPN 1014",
		"LAT 1114",
		"MAS 2013",
		"PHI 1043",
		"PHI 2023",
		"PHI 2033",
		"PHI 2123",
		"RUS 1014",
		"RUS 2333",
		"SPN 1014",
		"SPN 2333",
		"WS 2013",
		"WS 2023",
		"AHC 1113",
		"AHC 1123",
		"AHC 1133",
		"ARC 1214",
		"ARC 1513",
		"ART 1103",
		"ART 1143",
		"CLA 2033",
		"DAN 2003",
		"ENG 1113",
		"HUM 2023",
		"HUM 2033",
		"HUM 2053",
		"MAS 2023",
		"MUS 2243",
		"MUS 2623",
		"MUS 2633",
		"MUS 2663",
		"MUS 2673",
		"MUS 2683",
		"MUS 2693",
		"MUS 2743",
		"PHI 2073",
		"HIS 1043",
		"HIS 1053",
		"HIS 2053",
		"POL 1013",
		"POL 1133",
		"POL 1213",
		"AMS 2043",
		"ANT 1013",
		"ANT 2043",
		"ANT 2053",
		"BBL 2003",
		"BBL 2243",
		"BIO 1033",
		"CRJ 1113",
		"ECO 2003",
		"ECO 2013",
		"ECO 2023",
		"EGR 1343",
		"GRG 1013",
		"GRG 2623",
		"HTH 2413",
		"HTH 2513",
		"IDS 2113",
		"PSY 1013",
		"SOC 1013",
		"SOC 2013",
		"SOC 2023",
		"COM 2113",
		"CS 1173",
		"EGR 1403",
		"ENG 2413",
		"PAD 1113",
		"PHI 2043"
	];
	
	g.coremarked = [];
	
	for(var i = 0; i < core.length; i++) {
		g.coremarked.push(core[i]);
	}
	
  }
  
  


  // Startup function: call UpdateGraphviz
  jQuery(function() {
	// The buttons are disabled, enable them now that this script
	// has loaded.
    generate_btn.removeAttr("disabled")
                .text("Generate Graph!");
  });

  // Bind actions to form buttons.
  generate_btn.click(UpdateGraphviz);

});
