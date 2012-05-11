//irs soi data
var pop_tot = 135000000;
var pop_cum_perc = [.20, .40, .60, .80, .95, .99, .995, .999, .9999, .999997037, 1.00] ;
var pop_perc = [.20, .20, .20, .20, .15, .04, .005, .004, .0009, .000097037, .000002963] ;
var income_avg = [9300, 20600, 34400, 56400, 97400, 210000, 486395, 1021643, 4024583, 35042705, 344759000 ];
var income_perc_cap_gains = [0.02, 0.05, 0.06, .06, .10, .12, .23, .30, .45, .72, .81];
var deductions_typ = [10306, 10306, 10938, 13164, 16896, 65871, 70000, 120000, 800000, 8000000, 49390000];
var unity = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var trillion =1000000000000;
var billion =100000000;
var million = 1000000;

var irssoi = new Object();
irssoi.popTot = pop_tot; //# of tax filers
irssoi.popCumPerc = pop_cum_perc;
irssoi.popPerc = pop_perc;
irssoi.income = income_avg;
irssoi.incomePercCapGains = income_perc_cap_gains;
irssoi.deductionsTyp = deductions_typ; //
irssoi.unity = vplus(vmult(irssoi.income,0),1);

irssoi3 = new Object();
irssoi3.pop = vcommas(vmult(pop_perc, pop_tot));
irssoi3.popPerc = vperc(pop_perc, 0);
irssoi3.income = vDollaCommas(income_avg);

irssoi2 = new Object();
irssoi2.capGains = vperc(income_perc_cap_gains, 0);
irssoi2.income = vDollaCommas(income_avg);
irssoi2.incCapG = vDollaCommas(vmult(income_perc_cap_gains, income_avg))

dedu = new Object();
dedu.income=vDollaCommas(income_avg);
dedu.deductions=vDollaCommas(deductions_typ);


//rates
var new_std_deduct = 20000;
var use_std_ded = 1;
var current_cap_gains_rate = .15;
var tax_cap_gains_as_ord =0;
var new_cap_gains_rate =.15;

var current_brackets = [8700, 35350, 85650, 178650, 388350];
//var new_brackets = [87000, 135350, 200000, 400000, 2000000];
var current_rates = [.10, .15, .25, .30, .33, .35 ];
//var new_rates = [.12, .15, .17, .19, .45, .55 ]; 
var new_brackets = [8700, 35350, 85650, 178650, 388350];
var new_rates = [.10, .15, .25, .30, .33, .35 ]; 

//current Obama/Bush plan
var obama = new Object();
obama.deductions = irssoi.deductionsTyp;
obama.useStdDed = 0; //use typical deductions
obama.taxCGasOrd = 0;
obama.capGains = .15;
obama.brackets = [8700, 35350, 85650, 178650, 388350];
obama.marginal = [.10, .15, .25, .30, .33, .35 ];

//starting point for proposed
var rates = new Object();
rates.deductionStd = 20000;
rates.useStdDed = 1;
rates.taxCGasOrd = 1;
rates.capGains = 0;
rates.brackets =  [87000, 135350, 200000, 400000, 2000000];
rates.marginal = [.12, .15, .17, .19, .45, .55 ];


function TaxPlan(irssoi, taxrates){
	this.rates = taxrates;
	this.irssoi = irssoi;
	//calculated from irs soi
	this.popByPerc = vmult(this.irssoi.popPerc, this.irssoi.popTot);
	this.incomeUS = vmult(this.popByPerc, this.irssoi.income);	
    this.calcDeductions =function(){
		if (this.rates.useStdDed == 0){//use tytpical ded
		    this.deductionsUS = vmult(this.popByPerc, this.irssoi.deductionsTyp);
		    this.deductions =  this.irssoi.deductionsTyp;
		}else {//use (your) std deduction
		    this.deductionsUS = vmult(this.popByPerc, this.rates.deductionStd);
		    this.deductions = vmult(this.irssoi.unity, this.rates.deductionStd);	
		}    	
		this.incomeUStaxable = vminu(this.incomeUS, this.deductionsUS);
		this.incomeTaxable = vminu(this.irssoi.income, this.deductions);
    }
    this.calcDeductions();
	this.calcCapGains =function(){
		if (this.rates.taxCGasOrd==0){
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
	}
	this.calcCapGains();
	//console.log(this.incomeOrd);

	this.refresh =function(){
		this.calcDeductions();
		this.calcCapGains()
		this.taxOrd = new TaxCalcerOrd(this.incomeOrd, this.rates);
		this.taxOrd.calc();//forces the new taxOrd object to do its calculation
		this.tax = vplus(this.taxCapGains, this.taxOrd.tax);
		this.taxUS = vmult(this.tax, this.popByPerc);
		this.taxUStot = vsum(this.taxUS);
		this.taxAsPerc = vdivi(this.tax,this.irssoi.income,3);
		this.incomeKept = vminu(this.irssoi.income, this.tax);
		this.incomeUStot = vsum(this.incomeUS);		
	}
	this.refresh();
}
//.log(rates.brackets);

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
    	if (this.brackets.length==0){//flat tax
    		console.log('no brackets');
    		console.log(this.income);
    		console.log(this.rates[0]);
    		this.tax = vmult(this.income,this.rates[0]);
    	}else{
	         for (i=0; i<this.brackets.length; i++){
	            incomeForBracket = vgt(incomeRemaining, this.brackets[i]) ;//everything between one 
	            taxForBracket = vmult(incomeForBracket,this.rates[i]);
	            incomeRemaining = vlt0rem(incomeRemaining, this.brackets[i]);
	            this.incomeForBrackets[i]=incomeForBracket;
	            this.incomeRemainings[i]=incomeRemaining;
	            this.taxForBrackets[i]=taxForBracket;
	        }
	        this.taxForBrackets[i]=vmult(this.incomeRemainings[i-1], this.rates[i]);
	        this.taxForPercByBracket = inve(this.taxForBrackets);	
	        this.tax = mplus(this.taxForPercByBracket);	
	        //console.log(this.incomeForBrackets);
	        //console.log(this.incomeRemainings);
	        //console.log(this.taxForBrackets);
	        //console.log(this.taxForPercByBracket); 		
    	}
    	//console.log(this.tax);     
    }
} 

function OrdTax(rates){
	this.marginal = vperc(rates.marginal,0);
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