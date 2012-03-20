$('#thelists').live('pageinit', function(event) {
	//test function by pressing get
		$('#get').click(function() {
			for (i=1; i<6; i++){
				$('#list').append('frog ');
			}


			$('#list').append(JSON.stringify(taxUScapGains));
			$('#list').append('<br/>');
			$('#list').append(JSON.stringify(taxCapGains));
			$('#list').append('<br/><br/>');
			$('#list').append(JSON.stringify(irssoi));
			$('#list').append('dot make weapons');
			
			return false; 
		}); 	   
		
});		

//irs soi data
var pop_tot = 135000000;
var pop_cum_perc = [.20, .40, .60, .80, .95, .99, .995, .999, .9999, .999997037, 100] ;
var pop_perc = [.20, .20, .20, .20, .15, .04, .005, .004, .0009, .000097037, .000002963] ;
var income_avg = [9300, 20600, 34400, 56400, 97400, 210000, 486395, 1021643, 4024583, 35042705, 344759000 ];
var income_perc_cap_gains = [0, .02, .02, .03, .035, .07, .12, .24, .45, .72, .81];
var deductions_typ = [10306, 10306, 10938, 13164, 16896, 65871, 70000, 120000, 800000, 8000000, 49390000];
var unity = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

irssoi = new Object();
irssoi.popTot = pop_tot; //# of tax filers
irssoi.popCumPerc = pop_cum_perc;
irssoi.popPerc = pop_perc;
irssoi.incomeAvg = income_avg;
irssoi.incomePercCapGains = income_perc_cap_gains;
irssoi.deductionsTyp = deductions_typ; //

//rates
var std_deduct = 20000;
var use_std_ded = 0;
var cap_gains_rate = .150;
var use_cap_gains_rate =1;

rates = new Object();
rates.deductionStd =std_deduct;
rates.useStdDed = use_std_ded;
rates.capGains = cap_gains_rate;
rates.isCapGainsTax = use_cap_gains_rate;

//calculated from irs soi
var popByPerc = vmult(irssoi.popPerc, irssoi.popTot);
var incomeUS = vmult(popByPerc, irssoi.incomeAvg);

if (rates.useStdDed == 0){//use tytpical ded
	var deductionsUS = vmult(popByPerc, irssoi.deductionsTyp);
    var deductions =  irssoi.deductionsTyp;
}else {//use (your) std deduction
	var deductionsUS = vmult(popByPerc, rates.deductionStd);
	var deductions = vmult(unity, rates.deductionStd);	
}
var incomeUStaxable = vminu(incomeUS, deductionsUS);
var incomeTaxable = vminu(irssoi.incomeAvg, deductions);


if (rates.isCapGainsTax ==1){
	var incomeUScapGains = vmult(incomeUS, irssoi.incomePercCapGains);
	var incomeUSord = vminu(incomeUS, incomeUScapGains);
	var incomeCapGains = vmult(irssoi.incomeAvg, irssoi.incomePercCapGains);
	var incomeOrd= vminu(irssoi.incomeAvg, incomeCapGains);	
}else{
	var incomeUScapGains = vmult(incomeUS, 0);
	var incomeUSord = incomeUS;
	var incomeCapGains = vmult(irssoi.incomeAvg, 0);
	var incomeOrd= irssoi.incomeAvg;
}

var taxUScapGains = vmult(incomeUScapGains, rates.capGains);
var taxCapGains = vmult(incomeUScapGains, rates.capGains)

function vplus(a,b){
	//check if b is # if not, use shorter length
	var le;
	if (typeOf(b)==="number") {
		le = a.length;		
	}else{
		le = (a.length > b.length)  ? b.length : a.length;
	}
	var c=[];
	for (var i=0; i<le; i++){
		if (typeOf(b)==="number") {
			var accu= acc(a[i], b);
			var r = a[i] + b;
		}else{
			var accu= acc(a[i], b[i]);
			var r = a[i] + b[i];	
		}		
		c[i] = rund(r, accu);
	}
	console.log(c);
	return c;			
}  
function vminu(a,b){
	//check if b is # if not, use shorter length
	var le;
	if (typeOf(b)==="number") {
		le = a.length;		
	}else{
		le = (a.length > b.length)  ? b.length : a.length;
	}
	var c=[];
	for (var i=0; i<le; i++){
		if (typeOf(b)==="number") {
			var accu= acc(a[i], b);
			var r = a[i] - b;
		}else{
			var accu= acc(a[i], b[i]);
			var r = a[i] - b[i];	
		}		
		c[i] = rund(r, accu);
	}
	return c;			
} 
function vmult(a,b){
	//check if b is # if not, use shorter length
	var le;
	if (typeOf(b)==="number") {
		le = a.length;		
	}else{
		le = (a.length > b.length)  ? b.length : a.length;
	}
	var c=[];
	for (var i=0; i<le; i++){
		if (typeOf(b)==="number") {
			var accu= acc(a[i], b);
			var r = a[i] * b;
		}else{
			var accu= acc(a[i], b[i]);
			var r = a[i] * b[i];	
		}		
		c[i] = rund(r, accu+1);
	}
	return c;			
} 
function vdivi(a,b){
	var le;
	if (typeOf(b)==="number") {
		le = a.length;		
	}else{
		le = (a.length > b.length)  ? b.length : a.length;
	}
	var c=[];
	for (var i=0; i<le; i++){
		if (typeOf(b)==="number") {
			var accu= acc(a[i], b);
			var r = a[i] / b;
		}else{
			var accu= acc(a[i], b[i]);
			var r = a[i] / b[i];	
		}		
		c[i] = rund(r, accu+1);//.toFixed(accu);		
	}
	return c;			
} 
// vcat takes two arrays and combines them by joining each of their elements
function vcat(a,b){
	//check length, use shorter length
	var le = (a.length > b.length)  ? b.length : a.length;
		var c=[];
	for (var i=0; i<le; i++){
		if (typeOf(a[i])==="array") {
			var r =a[i];
		}else {
			var r =[a[i]];
		}
		r= r.concat(b[i]);
		c[i] = r;
	}
	return c;			
}
function inve(a) {
	var xlen =a.length;
	var ylen = a[0].length;
	var r =[];
	for (var k=0; k<ylen;k++){
		r[k] =[ ];//necessary to declare each row as an array otherwise undefined
	}
	for (var i=0; i<xlen; i++){
		for (var j=0; j<ylen; j++){
			r[j][i]=a[i][j];
		}
	}
	return r;
}
//or use n.tofixed(2)
function rund(number, digits) {
    var multiple = Math.pow(10, digits);
    var rndedNum = Math.round(number * multiple) / multiple;
    return rndedNum;
}		
// use dec_sep for internationalization
function ndec(x)
{
	var tmp=new String();
	var dec_sep = ".";
	tmp=x+'';
	if (tmp.indexOf(dec_sep)>-1)
		return tmp.length-tmp.indexOf(dec_sep)-1;
	else
		return 0;
}     	
/* Rounding Rules
Addition and Subtraction
The number of decimal places in the result equals the smallest number of decimal places in the input numbers.
100% for a series of up to 9 numbers

Multiplication Division
The number of significant figures in the result equals one plus the smallest number of significant figures 
in the input numbers.
*/
function acc(a,b){
	//as accurate as the least accurate
	var ac = (ndec(a) > ndec(b))  ? ndec(b) : ndec(a);
	return ac; 
}	
// from: http://javascript.crockford.com/remedial.html Douglas Crockford
function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (Object.prototype.toString.call(value) == '[object Array]') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}