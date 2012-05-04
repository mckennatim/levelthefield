//data for every page
var wbrm=0;
var existingPlan = new TaxPlan(irssoi, obama);
var proposedPlan = new TaxPlan(irssoi, rates);
//page iniitialization
$('#main').live('pageinit', function(event) {    
	plotExistingTotTaxPie();
	var cnt=0;
	$('#page1graph').click(function() {	
		//page1 2 chart
		var sw = cnt % 4;
		switch (sw){
			case 0:{
					$('#p1topLabel').empty();
					$('#p1topLabel').append('<b>If you make $486,00 you pay a higher %</b>');
				var USd1 = [
				{ label: "Income",  data: 380},
				{ label: "Tax",  data: 106}
				];
				$.plot($("#existingPies"), USd1, 
				{
					series: {
						pie: { 
							show: true,
							radius: 1,
							label: {
								show: true,
								radius: 3/4,
								formatter: function(label, series){
									return '<div style="font-size:10pt;text-align:center;padding:2px;color:black;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
								},
								background: { opacity: 0.1 }
							}
						}
					},
					legend: { show: true }
				});
				break;
			}
			case 1:{
				//page1 3 chart
					$('#p1topLabel').empty();
					$('#p1topLabel').append('<b>than someone making $35,000,0,00 </b>');
				var USd1 = [
				{ label: "Income",  data: 30.8},
				{ label: "Tax",  data: 4.24}
				];
				$.plot($("#existingPies"), USd1, 
				{
					series: {
						pie: { 
							show: true,
							radius: 1,
							label: {
								show: true,
								radius: 3/4,
								formatter: function(label, series){
									return '<div style="font-size:10pt;text-align:center;padding:2px;color:black;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
								},
								background: { opacity: 0.1 }
							}
						}
					},
					legend: { show: true }
				});
				break;
			}
			case 2:{
					$('#p1topLabel').empty();
					$('#p1topLabel').append('<b>A very small portion of the population is making big$</b>');			
					var USd1 = [
				{ label: "top .1%",  data: 1.09},
				{ label: "99-99.9%",  data: .88},
				{ label: "95-99%",  data: 1.13},
				{ label: "80-95",  data: 1.97},
				{ label: "quint4",  data: 1.52},
				{ label: "quint1+2+3",  data: 1.73}
				];
				$.plot($("#existingPies"), USd1, 
				{
					series: {
						pie: { 
							show: true,
							radius: 1,
							label: {
								show: true,
								radius: 3/4,
								formatter: function(label, series){
									return '<div style="font-size:10pt;text-align:center;padding:2px;color:black;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
								},
								background: { opacity: 0.1 }
							}
						}
					},
					legend: { show: true }
				});
				break;
			}
			case 3:{
					$('#p1topLabel').empty();
					$('#p1topLabel').append('<b>Overall, income taxes are only ~ 11% of income.</b>');			
					plotExistingTotTaxPie();
				break;
			}						
		}
		cnt++;
	});	
});

$('#existing').live('pageinit', function(event) {            
    var capgTbl = arrayObj2table(irssoi2);
	$('#capg').append(capgTbl);
	var incTbl = arrayObj2table(irssoi3);
	$('#erate').append(incTbl);
	var existRates = new OrdTax(obama);
	$('#ebrackets').append(existRates.makeTbl());
	var edudTbl = arrayObj2table(dedu);
	$('#exidud').append(edudTbl);	
});

$('#decisions').live('pageinit', function(event) {            
	$('#radio-mini-2').live('change', function(){
		alert('martians have landed');
	});
});

$('#propage').live('pageinit', function(event) {    
	plotTotTaxBar();
	$("#inpAdjBr").val(ln(proposedPlan.rates.brackets[wbrm])).slider('refresh');	
	plotBrackets();
	$('body').on('click', "#butBr", function (e) { 
		e.stopImmediatePropagation();
	    e.preventDefault();
	    wbr++;
	    wbrm = wbr%numBrackets;
	    $("#inpAdjBr").val(ln(proposedPlan.rates.brackets[wbrm])).slider('refresh');	
	    plotBrackets();
	    console.log(wbrm);
	});	

	$("#inpAdjBr").change(function(e){
		proposedPlan.rates.brackets[wbrm] = rund(expo(Number($(this).val())),0);
		plotBrackets();
		console.log(proposedPlan.rates.brackets[wbrm]);
		console.log(Number($(this).val()));
		proposedPlan.refresh();
		plotTotTaxBar();
		$('#taxRaised').empty();
		$('#taxRaised').append('<b>target:  $'+addCommas(existingPlan.taxUStot) +'<br/>yourPlan: $'+addCommas(proposedPlan.taxUStot)+'</b>' );
	});		
/*
	$('body').on('click', "#but1", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();    
		dataTotTax[0][0] +=1;
		console.log(dataTotTax);
		plotTotTaxBar();
	});    
	
	$("#sliderTotTax").val(dataTotTax[0][0]).slider('refresh');

	
	$("#sliderTotTax").change(function(e){
		console.log("the sucker changed");
		dataTotTax[0][0] = Number($(this).val());
		plotTotTaxBar();
	});
	*/
	$("#inpProCG").val(proposedPlan.rates.capGains).slider('refresh');
	
	$('input[name=choProCG]').change( function(e){
		//$('input[name=choProCG]').checkboxradio("refresh");
			proposedPlan.rates.taxCGasOrd = this.value;
			proposedPlan.refresh();
			plotTotTaxBar();
			console.log(this.value);
			console.log(proposedPlan.rates.taxCGasOrd);
			$('#taxRaised').empty();
			$('#taxRaised').append('<b>target:  $'+addCommas(existingPlan.taxUStot) +'<br/>yourPlan: $'+addCommas(proposedPlan.taxUStot)+'</b>' );
			console.log(proposedPlan.taxUStot);
			console.log(existingPlan.taxUStot);
		/*	
		if (this.value==0){
			$('#fsProCG').append('<input id="inpProCG" type="range" min="0" max="35" value="'+	proposedPlan.rates.capGains*100 + 6 +'"/>').trigger("create");
			$('#inpProCG').slider("refresh");
		}*/
	});	
	
	$("#inpProCG").change(function(e){
		proposedPlan.rates.capGains = Number($(this).val())/100;
		//console.log(Number($(this).val()));
		proposedPlan.refresh();
		plotTotTaxBar();
		$('#taxRaised').empty();
		$('#taxRaised').append('<b>target:  $'+addCommas(existingPlan.taxUStot) +'<br/>yourPlan: $'+addCommas(proposedPlan.taxUStot)+'</b>' );
	});	
	
});
//event functions

//common data	

//functions
//main page functions
function plotExistingTotTaxPie(){
	var USinc =rund(existingPlan.incomeUStot/trillion,2);
	var UStax =rund(existingPlan.taxUStot/trillion,2);	
	var USd1 = [
	{ label: "Income  $8.33 tr",  data: USinc},
	{ label: "Tax $1.08 tr",  data: UStax}
	];
	$.plot($("#existingPies"), USd1, 
	{
		series: {
			pie: { 
				show: true,
				radius: 1,
				label: {
					show: true,
					radius: 3/4,
					formatter: function(label, series){
						return '<div style="font-size:9pt;text-align:center;padding:2px;color:black;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
					},
					background: { opacity: 0.1 }
				}
			}
		},
		legend: { show: true }
	});
}
//propage functions
//total tax revenue bar chart code
		

function plotTotTaxBar(){
	var dataTotTaxExist = [rund(existingPlan.taxUStot/trillion,2), 1.5];
	var dataTotTaxProp = [rund(proposedPlan.taxUStot/trillion,2), 0];
	var dataTotTax = [dataTotTaxExist, dataTotTaxProp ];
    var plot = $.plot($("#totTaxBar"), [
    {
        label: "income",
        data: dataTotTax,
        color: "rgb(200, 20, 30)", //color: "rgb(200, 20, 30)" color: "rgb(30, 180, 20)"
        bars: {show: true, fill: true , horizontal: true,  fillColor: { colors: [ {opacity: 1.0 }, { opacity: 0.1 } ] }},
        points: {show: false}
    }],
    {	
    	grid: { hoverable: true, clickable: true },   
    	legend: { position: 'nw', show:false },
		valueLabels: {show: false},
		yaxis: {show: false}
    })	;  
};

var wbr = -1;
var brackets =proposedPlan.rates.brackets;
var numBrackets = brackets.length;
    
function plotBrackets(){
	brackets =proposedPlan.rates.brackets;
	var bracketL = vDollaCommas(brackets);
	var bracketX = vln(brackets);
	var b =new Array();
	for (var j =0; j<numBrackets;j++){
		var a =new Object();
		a['label']=bracketL[j];
		a['position']=bracketX[j];
		a['row']=j;
		a['labelHAlign']='right';
		if( j==wbrm){
			a['id']="mark";
		 }
		b.push(a);		
	}
	var md = new Object(); //the marks configuration
	var mks = new Object();
	mks.show = 'true';
	md.marks = mks;
	md.data =[];
	md.markdata=b;
	
	console.log(md);
	var exp1 = [];
    for (var i = -4; i < 2.5; i += 0.1) {
        exp1.push([i, expo(i)]);
    }
    var plot = $.plot($("#brChart"), 
        			[{data: exp1}, md],{
        			yaxis: { show: false},
        			xaxis: { show: false}
					});				
};

//crosshair code on propage
var plot;
$(function () {
    var sin = [], cos = [];
    for (var i = -4; i < 2; i += 0.1) {
        sin.push([i, 1000000*Math.exp(i)]);
    }

    plot = $.plot($("#placeholder"),
    					[{data: sin, label: "exp = 0000000"}] , {
                            series: {
                                lines: { show: true }
                            },
                            crosshair: { mode: "x" },
                            grid: { hoverable: true, autoHighlight: false },
                            yaxis: { min: 0, max: 4000000 }
                        });                        
   
 var legends = $("#placeholder .legendLabel");
    legends.each(function () {
        // fix the widths so they don't jump around
        $(this).css('width', $(this).width());
    });

    var updateLegendTimeout = null;
    var latestPosition = null;
    
    function updateLegend() {
        updateLegendTimeout = null;
        
        var pos = latestPosition;
        
        var axes = plot.getAxes();
        if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
            pos.y < axes.yaxis.min || pos.y > axes.yaxis.max)
            return;

        var i, j, dataset = plot.getData();
        for (i = 0; i < dataset.length; ++i) {
            var series = dataset[i];

            // find the nearest points, x-wise
            for (j = 0; j < series.data.length; ++j)
                if (series.data[j][0] > pos.x)
                    break;
            
            // now interpolate
            var y, p1 = series.data[j - 1], p2 = series.data[j];
            if (p1 == null)
                y = p2[1];
            else if (p2 == null)
                y = p1[1];
            else
                y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);

           legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
        }
    }   
    $("#placeholder").bind("plothover",  function (event, pos, item) {
        latestPosition = pos;
        if (!updateLegendTimeout)
            updateLegendTimeout = setTimeout(updateLegend, 50);
    });
});


   
//thelists test page
$('#thelists').live('pageinit', function(event) {
    //test function by pressing get
        $('#get').click(function() {
            for (i=1; i<6; i++){
                $('#list').append('frog ');
            }
            var myTaxPlan = new TaxPlan(irssoi, obama);
            
            var rad = $('input[name=choProCG]:checked').val();
            $('#list').append('<br/><br/>');
            $('#list').append(rad);              

            console.log(myTaxPlan.taxUStot);
            $('#list').append('<br/><br/>');
            $('#list').append(myTaxPlan.taxUStot);                   
			var propRates = new OrdTax(rates);
			//$('#list').append(propRates.makeTbl());

            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(existingPlan.rates.brackets));       

            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(vln(existingPlan.rates.brackets)));                   
            
            var myTbl = arrayObj2table(irssoi2);
             $('#list').append('<br/><br/>');
            $('#list').append(myTbl); 
            var nn =8331234555433;
            var n = addCommas(nn);
             $('#list').append('<br/><br/>');
            $('#list').append(n); 
            
            

            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.incomeUStot));                
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.taxUStot));                
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.irssoi.popCumPerc));                
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.irssoi.income));       
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.deductions));       
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.irssoi.incomePercCapGains));       
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.incomeCapGains));       
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.incomeOrd));       
            $('#list').append('<br/><br/>');                    
            $('#list').append(JSON.stringify(myTaxPlan.taxOrd.tax));            
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.taxCapGains));     
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.tax));                                                         
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.taxUS));                                                         
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.taxUStot));              
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.taxAsPerc));                                                         
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.incomeKept));
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan));            
             return false; 
        }); 	   
        
});	


