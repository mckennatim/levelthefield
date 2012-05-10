//data for every page
var wbrm=0;
var maxE=2.5;
var lowE=-5.4;
localStorage.setItem('stobama', JSON.stringify(obama));
var stobama=JSON.parse(localStorage.getItem('stobama'));
var existingPlan = new TaxPlan(irssoi, obama);
var storedRates=JSON.parse(localStorage.getItem('rates'));
//var clobama = $.extend(true, {}, obama);//create a deepcopy clone
if (storedRates==null){
	var proposedPlan = new TaxPlan(irssoi, stobama);
}else{
	var proposedPlan = new TaxPlan(irssoi, storedRates);	
}
console.log(proposedPlan);
proposedPlan.refresh();
//page iniitialization
$('#main').live('pageinit', function(event) {    
	proposedPlan.refresh();
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

$('#bracketpg').live('pageinit', function(event) {   
	reTot();
	wbr=numBrackets-1;
	wbrm = wbr%(numBrackets+1);
	updateBr(wbrm);
    if (wbrm<numBrackets){
		$("#inpAdjBr").val(ln(proposedPlan.rates.brackets[wbrm])).slider('refresh');
	}
	$("#inpAdjPer").val(proposedPlan.rates.marginal[wbrm]*100).slider('refresh');	
	plotBrackets();
	$('#divBr').click(function() {
	    wbr++;
	    wbrm = wbr%(numBrackets+1);
	    plotBrackets();
	    if (wbrm<numBrackets){
			$("#inpAdjBr").val(ln(proposedPlan.rates.brackets[wbrm])).slider('refresh');
		}
		$("#inpAdjPer").val(proposedPlan.rates.marginal[wbrm]*100).slider('refresh');
	    //console.log(wbrm);
	});	
	$("#inpAdjBr").change(function(e){ //bracket slider
		if (wbrm<numBrackets){
			proposedPlan.rates.brackets[wbrm] = rund(expo(Number($(this).val())),0);
			updateBr(wbrm);
			console.log(proposedPlan);
			reTot();
		}
	});	
	$("#inpAdjPer").change(function(e){ //percent slider
		proposedPlan.rates.marginal[wbrm] = Number($(this).val())/100;
		updateBr(wbrm);
		console.log(proposedPlan);
		reTot();
	});		
	$('body').on('click', "#brres", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();
		console.log(obama);
		proposedPlan.rates=JSON.parse(localStorage.getItem('stobama'));
		numBrackets = proposedPlan.rates.brackets.length;
		console.log(proposedPlan.rates);
		proposedPlan.refresh();
		updateBr(numBrackets-1);;
		reTot();
	});
	$('body').on('click', "#brdel", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();
		proposedPlan.rates.brackets.splice(wbrm,1);
		proposedPlan.rates.marginal.splice(wbrm,1);	
		numBrackets = proposedPlan.rates.brackets.length;
		//console.log(proposedPlan.rates.brackets);
		proposedPlan.refresh();
		updateBr(numBrackets-1);
		reTot();
	});
	$('body').on('click', "#bradd", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();
		if (wbrm==0){
			var hiBr = proposedPlan.rates.brackets[wbrm];
			var newBr = rund((expo(lowE)+hiBr)/2,0);			
			var hiRa = proposedPlan.rates.marginal[wbrm];
			var newRa = rund(hiRa/2,2);				
			proposedPlan.rates.brackets.splice(wbrm,0, newBr);
			proposedPlan.rates.marginal.splice(wbrm,0, newRa);	
		}else if (wbrm==numBrackets){//hay no bracket value here
			var loBr = proposedPlan.rates.brackets[wbrm-1];
			var newBr = rund((loBr +expo(maxE))/2,0);			
			var hiRa = proposedPlan.rates.marginal[wbrm];
			var newRa = rund((1 +hiRa)/2,2);	
			proposedPlan.rates.brackets.splice(wbrm,0, newBr);
			proposedPlan.rates.marginal.splice(wbrm+1,0, newRa);	
		}else{
			var loBr = proposedPlan.rates.brackets[wbrm-1];
			var hiBr = proposedPlan.rates.brackets[wbrm];
			var newBr = rund((loBr +hiBr)/2,0);
			var loRa = proposedPlan.rates.marginal[wbrm-1];
			var hiRa = proposedPlan.rates.marginal[wbrm];
			var newRa = rund((loRa +hiRa)/2,2);			
			proposedPlan.rates.brackets.splice(wbrm,0, newBr);
			proposedPlan.rates.marginal.splice(wbrm,0, newRa);	
		}
		numBrackets = proposedPlan.rates.brackets.length;
		console.log(proposedPlan.rates.brackets);
		console.log(proposedPlan.rates.marginal);
		proposedPlan.refresh();
		updateBr(numBrackets-1);
		reTot();
	});			
});	

$('#unearnpg').live('pageinit', function(event) {    
	reTot();
	$("#inpProCG").val(proposedPlan.rates.capGains*100).slider('refresh');
	if(proposedPlan.rates.taxCGasOrd==1){
        $("#radProCG1").attr("checked", true).checkboxradio("refresh");
    }else{
    	$("#radProCG0").attr("checked", true).checkboxradio("refresh");
    }
    //$('input[name=choProCG]').checkboxradio("refresh");	don't need
	console.log($("#radProCG1").prop("checked")); 
	console.log(proposedPlan.rates.capGains);
	console.log(proposedPlan.rates.taxCGasOrd);
	$('input[name=choProCG]').change( function(e){ //change radio
			console.log("just changed radio");
			$('input[name=choProCG]').checkboxradio("refresh");
			//$('input:radio[name=choProCG]').filter('[value="1"]').attr('checked', true);
			proposedPlan.rates.taxCGasOrd = this.value;
			reTot();
	});	
	
	$("#inpProCG").change(function(e){ //on moving slider
		console.log(proposedPlan.rates.taxCGasOrd);
		//console.log($("#radProCG0").attr("checked")); 
		if (proposedPlan.rates.taxCGasOrd==0){		
			proposedPlan.rates.capGains = Number($(this).val())/100;
			//proposedPlan.rates.taxCGasOrd = 0;
			console.log(Number($(this).val()));
			reTot();
		}
	});	
	
});
//event functions

//common data	

//functions
//main page functions

function updateBr(wbmr){
	$('#txrt').empty();
	if (wbrm==0){
		$('#txrt').append(rund(proposedPlan.rates.marginal[wbrm]*100,0) +'% from $0 to $'+addCommas(proposedPlan.rates.brackets[wbrm]));
	}else if(wbrm==numBrackets){
		$('#txrt').append(rund(proposedPlan.rates.marginal[wbrm]*100,0) +'% over $'+addCommas(proposedPlan.rates.brackets[wbrm-1]));
	}else{
		$('#txrt').append(rund(proposedPlan.rates.marginal[wbrm]*100,0) +'% from $'+addCommas(proposedPlan.rates.brackets[wbrm-1])+' to $'+addCommas(proposedPlan.rates.brackets[wbrm]));
	}
	plotBrackets();
	var brSummary = new OrdTax(proposedPlan.rates);
	$('#brtable').empty();
	$('#brtable').append(brSummary.makeTbl());
}

function reTot(){
	proposedPlan.refresh();
	plotTotTaxBarU();
	plotTotTaxBar();
	$('#utaxRaised').empty();
	$('#utaxRaised').append('target:  $'+addCommas(existingPlan.taxUStot) +'<br/>yourPlan: $'+addCommas(proposedPlan.taxUStot) );	
	$('#taxRaised').empty();
	$('#taxRaised').append('target:  $'+addCommas(existingPlan.taxUStot) +'<br/>yourPlan: $'+addCommas(proposedPlan.taxUStot) );
	//console.log(proposedPlan);
	localStorage.setItem('rates', JSON.stringify(proposedPlan.rates));
	//console.log(existingPlan.taxUStot);
}

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
		yaxis: {show: false},
		xaxis: { min: 0, max: 1.2, position: 'top', ticks: [.9, 1.1] }
    })	;  
};
function plotTotTaxBarU(){
	var dataTotTaxExist = [rund(existingPlan.taxUStot/trillion,2), 1.5];
	var dataTotTaxProp = [rund(proposedPlan.taxUStot/trillion,2), 0];
	var dataTotTax = [dataTotTaxExist, dataTotTaxProp ];
    var plot = $.plot($("#totTaxBarU"), [
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
		yaxis: {show: false},
		xaxis: { min: 0, max: 1.2, position: 'top', ticks: [.9, 1.1] }
    })	;  
};

var wbr = -1;
var brackets =proposedPlan.rates.brackets;
var marginal =proposedPlan.rates.marginal;
var numBrackets = brackets.length;
    
function plotBrackets(){
	brackets =proposedPlan.rates.brackets;
	var marginalR = vperc(proposedPlan.rates.marginal,2);
	//console.log(marginalR);
	var bracketL = vDollaCommas(brackets);
	var bracketX = vln(brackets);
	var b =new Array();
	for (var j =0; j<numBrackets;j++){
		var a =new Object();
		a['label']=bracketL[j];
		a['position']=bracketX[j];
		a['row']=j;
		a['labelHAlign']='right';
		if( j==wbrm){a['id']="mark";}
		b.push(a);		
	}
	for (var j =0; j<=numBrackets;j++){
		var a =new Object();
		a['label']=marginalR[j];
		//console.log(marginalR[j]);
		if (j<numBrackets){
			a['position']=bracketX[j];		
			a['labelHAlign']='left';	
		}else{
			a['position']=bracketX[j-1];	
			a['labelHAlign']='right';		
		}
		a['row']=j;

		if( j==wbrm){a['id']="mark";}
		b.push(a);		
	}	
	var md = new Object(); //the marks configuration
	var mks = new Object();
	mks.show = 'true';
	mks.rowHeight = '14';
	md.marks = mks;
	md.data =[];
	md.markdata=b;
	
	//console.log(md);
	var exp1 = [];
    for (var i = lowE; i < maxE+.1; i += 0.1) {
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
            console.log(proposedPlan);
            var rad = proposedPlan.rates.marginal;
            var bad =proposedPlan.rates.brackets;
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(rad));      
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(bad));      
            proposedPlan.rates.marginal.splice(2,1);       
            proposedPlan.rates.brackets.splice(2,1); 
            proposedPlan.rates.marginal.splice(2,1);       
            proposedPlan.rates.brackets.splice(2,1); 
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(proposedPlan.rates.marginal));      
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(proposedPlan.rates.brackets));        
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


