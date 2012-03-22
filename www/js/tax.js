$(window).load(function(){
	var obamaPlan = new TaxPlan(irssoi, obama);
	//page1 1 chart
	var cnt =0;
	var USd1 = [
	{ label: "Income  $8.33 tr",  data: 8.33},
	{ label: "Tax $1.08 tr",  data: 1.08}
	];
	$.plot($("#page1left"), USd1, 
	{
		series: {
			pie: { 
				show: true,
				radius: 1,
				label: {
					show: true,
					radius: 3/4,
					formatter: function(label, series){
						return '<div style="font-size:12pt;text-align:center;padding:2px;color:black;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
					},
					background: { opacity: 0.1 }
				}
			}
		},
		legend: { show: true }
	});
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
			$.plot($("#page1left"), USd1, 
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
			$.plot($("#page1left"), USd1, 
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
			{ label: "quint1+2+3",  data: 1.73},
			];
			$.plot($("#page1left"), USd1, 
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
				var USd1 = [
			{ label: "Income  $8.33 tr",  data: 8.33},
			{ label: "Tax $1.08 tr",  data: 1.08}
			];
			$.plot($("#page1left"), USd1, 
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
	}
	cnt++
});
	
$('#delst').click(function() {		

});	
	var data1a = [[20, 9300], [40, 20600], [60, 34400], [80, 56400], [95, 97400] , [99, 210000], [99.88, 1117000] ];
	var data1b = [[20, 9300], [40, 20528], [60, 32672], [80, 52032], [95, 88112] , [99, 181700], [99.88, 681050] ];
	
	$('#graph').bind('pageshow', function() {
	    var plot = $.plot($("#chart"), [
	    {
	        label: "income",
	        data: data1a,
	        bars: {show: true, fill: true},
	        points: {show: true}
	    },
	    {
	        label: "after tax ncome",
	        data: data1b,
	        bars: {show: true, fill: true},
	        points: {show: true}
	    }],
	    {	    
	    	legend: { position: 'nw' }
	    });
	});	
	var data2a = [[20, 9300], [40, 20600], [60, 34400], [80, 56400], [95, 97400] , [99, 210000] ];
	var data2b = [[20, 9300], [40, 20528], [60, 32672], [80, 52032], [95, 88112] , [99, 181700] ];
	//var data2c = .5*data2b;
	//console.log(data2c);
	$('#page4').bind('pageshow', function() {
	    var plot = $.plot($("#chart2"), [
	    {
	        label: "income",
	        data: data2a,
	        bars: {show: true, fill: true},
	        points: {show: true}
	    },
	    {
	        label: "after tax ncome",
	        data: data2b,
	        bars: {show: true, fill: true},
	        points: {show: true}
	    }],
	    {	
	    	grid: { hoverable: true, clickable: true },   
	    	legend: { position: 'nw' },
			valueLabels: {show: true}
	    })	;
	});	
});//]]>  

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

$('#thelists').live('pageinit', function(event) {
    //test function by pressing get
        $('#get').click(function() {
            for (i=1; i<6; i++){
                $('#list').append('frog ');
            }
			var propRates = new OrdTax(rates);
			$('#list').append(propRates.makeTbl());

            var myTaxPlan = new TaxPlan(irssoi, obama);
            
            var myTbl = arrayObj2table(irssoi2);
             $('#list').append('<br/><br/>');
            $('#list').append(myTbl); 
            var nn =8331234555433;
            var n = addCommas(nn)
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
            $('#list').append(JSON.stringify(myTaxPlan.incomeCapGains));       
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

//irs soi data
var pop_tot = 135000000;
var pop_cum_perc = [.20, .40, .60, .80, .95, .99, .995, .999, .9999, .999997037, 1.00] ;
var pop_perc = [.20, .20, .20, .20, .15, .04, .005, .004, .0009, .000097037, .000002963] ;
var income_avg = [9300, 20600, 34400, 56400, 97400, 210000, 486395, 1021643, 4024583, 35042705, 344759000 ];
var income_perc_cap_gains = [0.02, 0.05, 0.06, .06, .10, .12, .23, .30, .45, .72, .81];
var deductions_typ = [10306, 10306, 10938, 13164, 16896, 65871, 70000, 120000, 800000, 8000000, 49390000];
var unity = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

irssoi = new Object();
irssoi.popTot = pop_tot; //# of tax filers
irssoi.popCumPerc = pop_cum_perc;
irssoi.popPerc = pop_perc;
irssoi.income = income_avg;
irssoi.incomePercCapGains = income_perc_cap_gains;
irssoi.deductionsTyp = deductions_typ; //
irssoi.unity = vplus(vmult(irssoi.income,0),1);

irssoi3 = new Object();
irssoi3.pop = vcommas(vmult(pop_perc, pop_tot));
irssoi3.popPerc = vperc(pop_perc);
irssoi3.income = vDollaCommas(income_avg);

irssoi2 = new Object();
irssoi2.capGains = vperc(income_perc_cap_gains);
irssoi2.income = vDollaCommas(income_avg);
irssoi2.incCapG = vDollaCommas(vmult(income_perc_cap_gains, income_avg))

dedu = new Object();
dedu.income=vDollaCommas(income_avg);
dedu.deductions=vDollaCommas(deductions_typ);


//rates
var new_std_deduct = 20000;
var use_std_ded = 1;
var current_cap_gains_rate = .15;
var use_cap_gains_rate =0;
var new_cap_gains_rate =.15;

var current_brackets = [8700, 35350, 85650, 178650, 388350];
var new_brackets = [87000, 135350, 200000, 400000, 2000000];
var current_rates = [.10, .15, .25, .30, .33, .35 ];
var new_rates = [.12, .15, .17, .19, .45, .55 ]; 

obama = new Object();
obama.deductions = irssoi.deductionsTyp;
obama.useStdDed = 0; //use typical deductions
obama.isCapGainsTax = 1;
obama.capGains = current_cap_gains_rate;
obama.brackets = current_brackets;
obama.marginal = current_rates;

rates = new Object();
rates.deductionStd = new_std_deduct;
rates.useStdDed = use_std_ded;
rates.isCapGainsTax = use_cap_gains_rate;
rates.capGains = new_cap_gains_rate;
rates.brackets = new_brackets;
rates.marginal = new_rates;


function TaxPlan(irssoi, taxrates){
	this.rates = taxrates;
	this.irssoi = irssoi;
	//calculated from irs soi
	this.popByPerc = vmult(this.irssoi.popPerc, this.irssoi.popTot);
	this.incomeUS = vmult(this.popByPerc, this.irssoi.income);	

	if (this.rates.useStdDed == 0){//use tytpical ded
	    this.deductionsUS = vmult(this.popByPerc, this.irssoi.deductionsTyp);
	    this.deductions =  this.irssoi.deductionsTyp;
	}else {//use (your) std deduction
	    this.deductionsUS = vmult(this.popByPerc, this.rates.deductionStd);
	    console.log(this.irssoi.unity);
	    this.deductions = vmult(this.irssoi.unity, this.rates.deductionStd);	
	}	
	this.incomeUStaxable = vminu(this.incomeUS, this.deductionsUS);
	this.incomeTaxable = vminu(this.irssoi.income, this.deductions);
			console.log(this.rates.isCapGainsTax);
	if (this.rates.isCapGainsTax ==1){
	    this.incomeUScapGains = vmult(this.incomeUS, this.irssoi.incomePercCapGains);
	    this.incomeUSord = vminu(this.incomeUS, this.incomeUScapGains);
	    this.incomeCapGains = vmult(this.irssoi.income, this.irssoi.incomePercCapGains);
	    this.incomeOrd= vminu(this.incomeTaxable, this.incomeCapGains);	
	}else{
	    this.incomeUScapGains = vmult(this.incomeUS, 0);
	    this.incomeUSord = vminu(this.incomeUS, this.deductionsUS);
	    this.incomeCapGains = vmult(this.irssoi.income, 0);
	    this.incomeOrd= this.incomeTaxable;
	}	
	this.taxCapGains = vmult(this.incomeCapGains, this.rates.capGains);
	this.taxOrd = new TaxCalcerOrd(this.incomeOrd, this.rates);
	this.taxOrd.calc();//forces the new taxOrd object to do its calculation
	this.tax = vplus(this.taxCapGains, this.taxOrd.tax);
	this.taxUS = vmult(this.tax, this.popByPerc);
	this.taxUStot = vsum(this.taxUS);
	this.taxAsPerc = vdivi(this.tax,this.irssoi.income,3);
	this.incomeKept = vminu(this.irssoi.income, this.tax);
	this.incomeUStot = vsum(this.incomeUS);
}
console.log(rates.brackets);

function TaxCalcerOrd(incomeOrd, myRates){//calculates ordinary income tax
    this.rates=myRates.marginal;//[.10, .15, .25, .30, .33, .35 ];
    this.brackets = myRates.brackets;//[8700, 35350, 85650, 178650, 388350];
    this.income=vlt(incomeOrd,0);
    this.incomeForBrackets = new Array();
    this.incomeRemainings = new Array();
    this.taxForBrackets = new Array();
    this.taxForPercByBracket =  new Array();
    this.tax =  new Array();
    this.calc = function(){
    	var incomeRemaining = this.income;   
    	var incomeForBracket =[]; 
    	var taxForBracket=[];
    	var i = 0;
        for (i=0; i<this.brackets.length; i++){
            incomeForBracket = vgt(incomeRemaining, this.brackets[i]) ;//everything between one 
            taxForBracket = vmult(incomeForBracket,this.rates[i]);
            incomeRemaining = vlt0rem(incomeRemaining, this.brackets[i]);
            this.incomeForBrackets[i]=incomeForBracket;
            this.incomeRemainings[i]=incomeRemaining;
            this.taxForBrackets[i]=taxForBracket;
        }
        console.log(this.incomeForBrackets[i-1]);//i guess i gets incremented on leaving
        this.incomeRemainings[i]=vlt(vminu(this.incomeRemainings[i-1], this.incomeForBrackets[i-1]),0);
        this.taxForBrackets[i]=vmult(this.incomeRemainings[i], this.rates[i]);
        this.taxForPercByBracket = inve(this.taxForBrackets);	
        this.tax = mplus(this.taxForPercByBracket);	
    }
} 

function OrdTax(rates){
	this.marginal = vperc(rates.marginal);
	this.brackets = vDollaCommas(rates.brackets);	 
	this.makeTbl = function(){
		var numrates = this.marginal.length;
		var htm = '<ul><li><table><tr><th>rate</th><th>bracket</th></tr>';
		var priorbr = '$0';
		var i;
		for (i=0;i<numrates -1;i++){
			htm += '<tr><td>'+this.marginal[i] +'</td><td>from '+priorbr+ ' to '+this.brackets[i]+'</td></tr>'; 
			priorbr=this.brackets[i];
		}
		htm += '<tr><td>'+this.marginal[i] +'</td><td>over '+priorbr+'</td></tr>'; 
		return htm;
	}
}