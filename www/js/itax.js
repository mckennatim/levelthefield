//data for every page
var wbrm=0;
var maxE=2.5;
var lowE=-5.4;
var planNames ;
var taxplans;
var existingPlan;
var proposedPlan;
var taxRaisedTxt;
var win;
var currPlanName= 'duck';
var currentStored;
var numBrackets ;
console.log('beg of itax');
console.log(obama.descr);
//console.log(JSON.stringify(obama));
initTaxPlan();

function initTaxPlan(){
	taxplans =JSON.parse(localStorage.getItem('taxplans'));
	if (taxplans == null){
		console.log("taxplans is null will get obama");		
		taxplans = new Object();
		taxplans.obama = obama; //replace3 with current obama rates just to be sure
		currPlanName = 'obama';
		taxplans.current = currPlanName;
		console.log(taxplans.obama.descr);	
		localStorage.setItem('taxplans', JSON.stringify(taxplans));
	}
	//there should be a taxplan with a current name so open it
	console.log("getting current plan");	
	currPlanName = taxplans.current;
	console.log(currPlanName);
	taxplans = JSON.parse(localStorage.getItem('taxplans'));
	currentStored=taxplans[currPlanName];
	console.log(currentStored);
	proposedPlan = new TaxPlan(irssoi, jQuery.extend(true, {}, currentStored));		
	console.log(proposedPlan);
	//to do reporting you need to have a copy of the existing(obama)plan
	console.log('creating exiisting plan');
	existingPlan = new TaxPlan(irssoi, obama);
	existingPlan.refresh();
	console.log(existingPlan);
	//set some variables
	numBrackets =proposedPlan.rates.brackets.length;
	//display currentPlan
	assembleSummary();
}

//page iniitialization
$('#main').live('pageinit', function(event) {    
	plotBars();
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
	$('body').on('tap', "#mortA", function (e) { 
		$('#mortS').empty();
		$('#mortS').append('<p class="bq">A popular deduction yet "the deduction overwhelmingly favors wealthier homeowners. The limits are quite high — up to $1 million of a mortgage’s value and an additional $100,000 for home equity loans — and the amount that can be deducted does not fall as people’s incomes rise. And the deduction is not limited to a primary residence, so someone with two or three homes that fall under that $1 million limit could claim the deduction."(P.Sullivan, NY Times, 11/8/11) The "tax system gives a better treatment to residential capital than it does to corporate capital. As a result, too much of the nation’s saving ends up in the form of housing rather than in business investment, where it could have increased productivity and wages." (GREGORY MANKIW NY Times 1/21/12)</p>');
	});
	$('body').on('tap', "#mortS", function (e) { 
		$('#mortS').empty();		
	});
	$('body').on('tap', "#charA", function (e) { 
		$('#charS').empty();
		$('#charS').append('<p class="bq">This deductions seems so right, that is how we have symphony halls, museums, charter schools... Institutions and their patrons become dependent on corporate largesse. But people are not charitable because they get a deduction. If they were that would be a problem. Instead of UBS deciding which institutions to support, we as a society could fund institutions important to us through the tax system. Big corporations and the financial sector advocate shrinking government, massive privatization, tax breaks and deductions. They charitably fund charter schools as a way to break the back of the public institutions and the middle class thereby continuing the process of wealth concentration. ');
	});
	$('body').on('tap', "#charS", function (e) { 
		$('#charS').empty();		
	});	
	$('body').on('tap', "#upslA", function (e) { 
		$('#upslS').empty();
		$('#upslS').append('<p class="bq"> On a phone it is a little tricky to get the brackets just right and typing into the box is a bit problematic. The problem has to do with having the slider work right. The existing sytem has 5 brackets squeezed into the lower 1/20th of the income range. To make it work better the slider runs on an exponential scale where <i>income=10^6*e^x </i>. What you see in the box is the x value. Try adding +/-.01 to that box to nudge the income range.  ');
	});
	$('body').on('tap', "#upslS", function (e) { 
		$('#upslS').empty();		
	});	
});

$('#bracketpg').live('pageinit', function(event) {   
	plotBars();	
	if (numBrackets>0){
		wbr=numBrackets-1;	
	}else{
		wbr==0;
	}
	wbrm = wbr%(numBrackets+1);
	updateBr(wbrm);
    if (wbrm<numBrackets){
		$("#inpAdjBr").val(ln(proposedPlan.rates.brackets[wbrm])).slider('refresh');
	}
	$("#inpAdjPer").val(proposedPlan.rates.marginal[wbrm]*100).slider('refresh');	
	plotBrackets();
	assembleSummary();
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
			//console.log(proposedPlan);
			reTot();
		}
	});	
	$("#inpAdjPer").change(function(e){ //percent slider
		proposedPlan.rates.marginal[wbrm] = Number($(this).val())/100;
		updateBr(wbrm);
		//console.log(proposedPlan);
		reTot();
	});		
	$('body').on('click', "#brres", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();
		alert("This will reset your plan to existing Obama Plan");
		//console.log(obama);
		proposedPlan.rates=JSON.parse(localStorage.getItem('stobama'));
		numBrackets = proposedPlan.rates.brackets.length;
		//console.log(proposedPlan.rates);
		proposedPlan.refresh();
		updateBr(numBrackets-1);;
		reTot();
	});
	$('body').on('click', "#brdel", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();
		//console.log(proposedPlan.rates.brackets);
		//console.log(proposedPlan.rates.marginal);
		//console.log('wbrm is now ' +wbrm);
		if (wbrm==numBrackets){
			proposedPlan.rates.brackets.splice(wbrm-1,1);
			proposedPlan.rates.marginal.splice(wbrm,1);				
		}else {
			proposedPlan.rates.brackets.splice(wbrm,1);
			proposedPlan.rates.marginal.splice(wbrm,1);				
		}
		numBrackets = proposedPlan.rates.brackets.length;
		console.log(proposedPlan.rates.brackets);
		var bbb = proposedPlan.rates.brackets;
		var bbbl = bbb.length;
		//console.log(bbbl);
		//console.log(proposedPlan.rates.marginal);
		//console.log('wbrm is now ' +wbrm);
		updateBr(numBrackets-1);
		reTot();
	});
	$('body').on('click', "#bradd", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();
		//console.log(wbrm);
		if (proposedPlan.rates.brackets.length==0){
			var newBr = rund((expo(lowE)+expo(maxE))/2,0);	
			var hiRa = proposedPlan.rates.marginal[wbrm];
			var newRa = rund(hiRa/2,2);		
			proposedPlan.rates.brackets.splice(wbrm,0, newBr);
			proposedPlan.rates.marginal.splice(wbrm,0, newRa);
		}else if (wbrm==0){
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
		//console.log(proposedPlan.rates.brackets);
		//console.log(proposedPlan.rates.marginal);
		proposedPlan.refresh();
		updateBr(numBrackets-1);
		reTot();
	});			
});	
$('#unearnpg').live('pageinit', function(event) {    
	plotBars();
	$("#inpProCG").val(proposedPlan.rates.capGains*100).slider('refresh');
	if(proposedPlan.rates.taxCGasOrd==1){
        $("#radProCG1").attr("checked", true).checkboxradio("refresh");
    }else{
    	$("#radProCG0").attr("checked", true).checkboxradio("refresh");
    }
    assembleSummary();
    //$('input[name=choProCG]').checkboxradio("refresh");	don't need
	//console.log($("#radProCG1").prop("checked")); 
	//console.log(proposedPlan.rates.capGains);
	//console.log(proposedPlan.rates.taxCGasOrd);
	$('input[name=choProCG]').change( function(e){ //change radio
			//console.log("just changed radio");
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
$('#deductpg').live('pageinit', function(event) {    
	plotBars();
	if(proposedPlan.rates.useStdDed==0){
        $("#radProD0").attr("checked", true).checkboxradio("refresh");
    }else if(proposedPlan.rates.useStdDed==1){
    	$("#radProD1").attr("checked", true).checkboxradio("refresh");
    }else{
    	$("#radProD2").attr("checked", true).checkboxradio("refresh");    	
    }
	$("#inpProD").val(proposedPlan.rates.deductionStd).slider('refresh');    
	$("#inpProDM").val(proposedPlan.rates.dedMixPercStd).slider('refresh');    	
    assembleSummary();
	$('input[name=choProD]').change( function(e){ //change radio
			//console.log("just changed radio");
			$('input[name=choProD]').checkboxradio("refresh");
			//$('input:radio[name=choProCG]').filter('[value="1"]').attr('checked', true);
			proposedPlan.rates.useStdDed = this.value;
			reTot();
	});
	$("#inpProD").change(function(e){ //on moving slider
		if (proposedPlan.rates.useStdDed > 0){		
			proposedPlan.rates.deductionStd = Number($(this).val());
			//console.log(Number($(this).val()));
			reTot();
		}
	});	
		$("#inpProDM").change(function(e){ //on moving slider
		if (proposedPlan.rates.useStdDed > 0){		
			proposedPlan.rates.dedMixPercStd = Number($(this).val());
			console.log(Number($(this).val()));
			reTot();
		}
	});	    
});


$('#savepg').live('pageinit', function(event) { 
	assembleSummary();
	$('body').on('click', "#delbut", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();
		var planName  = $("#sname").val();
		delete taxplans[planName];
		currPlanName = 'temp';
		taxplans.current = currPlanName;
		console.log(taxplans);
		localStorage.setItem('taxplans', JSON.stringify(taxplans));	
		initTaxPlan();
		console.log('is already created?');
		$('#loadstuff').empty();
		repopulatePlanList();		
		reTot();
	});	   
	$('body').on('click', ".savebut", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();
		console.log('in savebut');
		/*var planName  = $("#sname").val();
		proposedPlan.rates.planName=planName;
		taxplans[planName]=proposedPlan.rates;
		localStorage.setItem('taxplans', JSON.stringify(taxplans));	//saves new plan
		reTot();//rewrite descr
		console.log(localStorage.getItem('taxplans'));
		*/
		reTot();	
		repopulatePlanList();			
	});	
	$('body').on('click', "#loadbut", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();
		repopulatePlanList();
		//reTot();
	});   
	$('body').on('change', "#selectplan", function (e) {
		var selectedPlan =$('#selectplan').val();
		$('#sname').val(selectedPlan);
		currPlanName = selectedPlan;//put it in the top text box
		taxplans.current =currPlanName;
		taxplans = JSON.parse(localStorage.getItem('taxplans'));
		currentStored=taxplans[currPlanName];
		console.log(currentStored);
		proposedPlan = new TaxPlan(irssoi, jQuery.extend(true, {}, currentStored));			
		assembleSummary();
	});	
});

$('#aboutpg').live('pageinit', function(event) {            
	$('#about').load("../README.html");
});
//event functions

//commoxxn data	

//functions
function repopulatePlanList(){
		console.log(localStorage.getItem('taxplans'));	
		var x ;
		var cumenu = '<div data-role="fieldcontain"><label for="selectplan" class="select txtOnGreen">Load Saved Plan</label><select name="selectplan" id="selectplan" data-native-menu="true" data-mini="true"><option>Saved Plans</option>';
		planNames =new Array();
		for (x in taxplans){
			console.log(x);
			if (x !='current'){
				planNames.push(x);
				cumenu+='<option value="' + x + '">' + x + '</option>';				
			}
		}
		cumenu+='</select></div>';
		$('#loadstuff').empty();
		$('#loadstuff').append(cumenu).trigger('create');	
}
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
	assembleSummary();
}

function assembleSummary(){
	if(rund(existingPlan.taxUStot/10000000000, 0)==rund(proposedPlan.taxUStot/10000000000, 0) ){
		win = 'You WIN';
		$('.txtOnGreen').css("color", "#FFFF19");		
	}else {
		win ='not quite there yet';
		$('.txtOnGreen').css("color", "#99CCFF");	
	}
	taxRaisedTxt =win + '<br/>target:  $'+addCommas(existingPlan.taxUStot) +'<br/>yourPlan: $'+addCommas(proposedPlan.taxUStot);	
	//clean for refresh
	$('#dedPgTxt').empty();
	$('#dedPgTxt2').empty();
	$('#brpg').empty();
	$('#cappg').empty();
	$('#dedpg').empty();
	$('#anno1').empty();
	$('#anno2').empty();
	$('#anno3').empty();
	$('#anno4').empty();
	//totals
	$('.taxRaised').empty();
	$('.taxRaised').append(taxRaisedTxt);
	//tables used on savepg to explain plan
	$('#anno1').append(createUnBrTxt().br);
	$('#anno2').append(createUnBrTxt().br2);
	$('#anno3').append(createUnBrTxt().cap);
	$('#anno4').append(createDedTxt().deds);	

	//for br 
	$('#brpg').append(createUnBrTxt().br);
	$('#brpg').append(createUnBrTxt().br2);
	$('#brpg').append(createUnBrTxt().cap);	
	$('#brpg').append(createDedTxt().deds);		
	//for cap	
	$('#cappg').append(createUnBrTxt().cap);
	$('#cappg').append(createUnBrTxt().br);	
	$('#cappg').append(createDedTxt().deds);	
	$('#cappg').append(createUnBrTxt().br2);	
	//for ded 
	$('#dedpg').append(createDedTxt().deds);		
	$('#dedpg').append(createUnBrTxt().cap);
	$('#dedpg').append(createUnBrTxt().br);
	$('#dedpg').append(createUnBrTxt().br2);		
	//on ded model
	$('#dedPgTxt').append(createDedTxt().ded1);
	$('#dedPgTxt2').append(createDedTxt().ded2);
	//fill in currPlanName and description
	$('#sname').val(proposedPlan.rates.planName);
	$('#tanno1').val(proposedPlan.rates.descr.intro);
	$('#tanno2').val(proposedPlan.rates.descr.brackets);
	$('#tanno3').val(proposedPlan.rates.descr.overall);
	$('#tanno4').val(proposedPlan.rates.descr.unearned);
	$('#tanno5').val(proposedPlan.rates.descr.deductions);
	$('#tanno6').val(proposedPlan.rates.descr.conclude);	
}
function createUnBrTxt(){
	var brSummary = new OrdTax(proposedPlan.rates);
	var btxt =  Object();
	if (proposedPlan.rates.taxCGasOrd==1){
		txt='<ul><li><table><tr><td>capital gains / dividends </td><td>as ordinary income</td></tr></table></li></ul>';
	}else{
		txt='<ul><li><table><tr><td>'+proposedPlan.rates.capGains*100 + '%</td><td>capital gains / dividends</td></tr>';
	}
	btxt.cap=txt;
	btxt.br=brSummary.makeTbl();	
	btxt.br2='<ul><li><table><tr><td>Overall Tax % </td><td>by income</td></tr></table></li></ul>';
	brackSummary = new Object();
	brackSummary.popPerc=vperc(proposedPlan.irssoi.popPerc, 4);
	brackSummary.income=vDollaCommas(proposedPlan.irssoi.income);
	brackSummary.tax=vDollaCommas(proposedPlan.tax);		
	brackSummary.Oba=vperc(existingPlan.taxAsPerc,0);		
	brackSummary.yourPlan=vperc(proposedPlan.taxAsPerc,0);	
	btxt.br2+=arrayObj2table(brackSummary);	;	
	return btxt;
}
function createDedTxt(){
	deduSummary = new Object();
	deduSummary.popPerc=vperc(proposedPlan.irssoi.popPerc, 4);
	deduSummary.income=vDollaCommas(proposedPlan.irssoi.income);
	deduSummary.Obama=vDollaCommas(proposedPlan.irssoi.deductionsTyp);		
	deduSummary.yourPlan=vDollaCommas(proposedPlan.rates.deductions);		
	var dtxt = "";
	var atxt = new Object();
	if (proposedPlan.rates.useStdDed == 0){//use tytpical ded
        dtxt = 'Uses current data -> (rich ded.>%)';
	}else if (proposedPlan.rates.useStdDed == 1){//use (your) std deduction
		dtxt = '$' + proposedPlan.rates.deductionStd +' avg.ded. for all incomes';
	} else {	
		dtxt = proposedPlan.rates.dedMixPercStd + '% of $' +proposedPlan.rates.deductionStd + ' deduction as fixed,  the rest at historic rates';
	}	
	atxt.ded2='<ul><li><table><tr><td>totals:</td><td>Obama</td><td>$'+addCommas(vsum(existingPlan.deductionsUS))+'</td></tr><tr><td></td><td>yourPlan</td><td>$' + addCommas(vsum(proposedPlan.deductionsUS)) + '</td></tr></table></li></ul>';	
	atxt.ded1=dtxt;
	var dedTblSum = arrayObj2table(deduSummary);	
	atxt.deds=dedTblSum;
	atxt.deds+='<ul><li><table><tr><td>totals deductions:</td><td>Obama</td><td>$'+addCommas(vsum(existingPlan.deductionsUS))+'</td></tr><tr><td></td><td>yourPlan</td><td>$' + addCommas(vsum(proposedPlan.deductionsUS)) + '</td></tr></table></li></ul>';
	atxt.deds+='<ul><li><table><tr><td>deductions</td></tr><tr><td>'+ dtxt + '</td><td></td></tr></table></li></ul>';
	return atxt;
}

function reTot(){//recalc and plot bars, check name, replace w default, get name and desc from screen into proposedPlan, save to taxplan
	console.log('now in teTot');
	console.log(taxplans.obama);
	proposedPlan.refresh();
	//check and see if sname == obama
	if ($('#sname').val()=='obama'){
		$('#sname').val('temp');
	}
	//replace unmodified desc with default
	if ($('#tanno1').val()==obama.descr.intro){
		$('#tanno1').val(descr.intro);
	}
	if ($('#tanno2').val()==obama.descr.brackets){
		$('#tanno2').val(descr.brackets);
	}
	if ($('#tanno3').val()==obama.descr.overall){
		$('#tanno3').val(descr.overall);
	}
	if ($('#tanno4').val()==obama.descr.unearned){
		$('#tanno4').val(descr.unearned);
	}
	if ($('#tanno5').val()==obama.descr.deductions){
		$('#tanno5').val(descr.deductions);
	}
	if ($('#tanno6').val()==obama.descr.conclude){
		$('#tanno6').val(descr.conclude);
	}	
	//update proposedPlan.rates
	currPlanName=$('#sname').val();
	proposedPlan.rates.planName =currPlanName ;
	proposedPlan.rates.descr.intro = $('#tanno1').val();
	proposedPlan.rates.descr.brackets = $('#tanno2').val();
	proposedPlan.rates.descr.overall = $('#tanno3').val();
	proposedPlan.rates.descr.deductions = $('#tanno5').val();
	proposedPlan.rates.descr.unearned = $('#tanno4').val();
	proposedPlan.rates.descr.conclude = $('#tanno6').val();
	//save to localStorage
	taxplans.current=currPlanName;
	taxplans[currPlanName]=jQuery.extend(true, {}, proposedPlan.rates);
	localStorage.setItem('taxplans', JSON.stringify(taxplans));
	//redisplay updated info from proposedPlan
	plotBars();
	assembleSummary();
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
function plotBars(){
	plotTotTaxBarU();
	plotTotTaxBar();
	plotTotTaxBarD();		
}
		
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
function plotTotTaxBarD(){
	var dataTotTaxExist = [rund(existingPlan.taxUStot/trillion,2), 1.5];
	var dataTotTaxProp = [rund(proposedPlan.taxUStot/trillion,2), 0];
	var dataTotTax = [dataTotTaxExist, dataTotTaxProp ];
    var plot = $.plot($("#totTaxBarD"), [
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
//var brackets =proposedPlan.rates.brackets;
//var marginal =proposedPlan.rates.marginal;
//var numBrackets = brackets.length;
    
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


/*crosshair code on propage
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
                */

           //legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
           /*
        }
    }   
    $("#placeholder").bind("plothover",  function (event, pos, item) {
        latestPosition = pos;
        if (!updateLegendTimeout)
            updateLegendTimeout = setTimeout(updateLegend, 50);
    });
});

*/
   
//thelists test page
$('#thelists').live('pageinit', function(event) {
    //test function by pressing get
        $('#geti').click(function() {
        	console.log('clicked run');
            for (i=1; i<6; i++){
                $('#list').append('frog ');
            }
            var myTaxPlan = proposedPlan;
            
            myTaxPlan.rates.deductionStd = 17400;
			myTaxPlan.rates.useStdDed = 1;
			myTaxPlan.rates.dedMixPercStd = 100;
			myTaxPlan.refresh();
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.deductions)); 
            $('#list').append(JSON.stringify(addCommas(vsum(myTaxPlan.deductionsUS)))); 
			myTaxPlan.rates.useStdDed = 0;            
			myTaxPlan.refresh();
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.deductions)); 
            $('#list').append(JSON.stringify(addCommas(vsum(myTaxPlan.deductionsUS)))); 
			myTaxPlan.rates.useStdDed = 2;            
			myTaxPlan.rates.dedMixPercStd = 50;            
			myTaxPlan.refresh();
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.deductions)); 
            $('#list').append(JSON.stringify(addCommas(vsum(myTaxPlan.deductionsUS))));             

              
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
            $('#list').append(JSON.stringify(myTaxPlan.irssoi.incomePercCapGains));       
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(myTaxPlan.incomeCapGains));         
            $('#list').append('<br/>rates<br/>');
            $('#list').append(JSON.stringify(myTaxPlan.rates.marginal));                  
            $('#list').append('<br/>incomeOrd<br/>');
            $('#list').append(JSON.stringify(vcommas(vrund(myTaxPlan.incomeOrd,0))));       
            $('#list').append('<br/>brackets<br/>');
            $('#list').append(JSON.stringify(myTaxPlan.rates.brackets));                
            $('#list').append('<br/>taxOrd.tax<br/>');                    
            $('#list').append(JSON.stringify(vcommas(vrund(myTaxPlan.taxOrd.tax, 0))));            
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
            $('#list').append('<br/><br/>');
            $('#list').append(JSON.stringify(taxplans));            
             return false; 
        }); 	   
        
});	


