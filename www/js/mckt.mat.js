//functions for operating on vectors and matrices

function mplus(matrix){
	var mat = matrix;
	var numrows = mat.length;
	var vout = [];
	for (var i=0;i<numrows;i++){
		var numcols =mat[i].length;
		var subtot = 0;
		for (var j=0;j<numcols;j++){
			subtot += mat[i][j];
		}
		vout[i] = subtot;
	}
	return vout;
}

//takes a vector and returns the vector except that any entries < limit f= limit
function vlt(a,limit){
	var c = [];
    for (var i=0; i<a.length; i++){
        if (a[i]<limit) {
           	c[i]=limit;
        }else{
            c[i]=a[i];
        }		
    }
    return c;		
}

//takes a vector and if entry < limit then 0 else = entry-limit
function vlt0rem(a,limit){
	var c = [];
    for (var i=0; i<a.length; i++){
        if (a[i]<limit) {
           	c[i]=0;
        }else{
            c[i]=a[i]-limit;
        }		
    }
    return c;		
}

function vgt(a,limit){
	var c = [];
    for (var i=0; i<a.length; i++){
        if (a[i]>limit) {
           	c[i]=limit;
        }else{
            c[i]=a[i];
        }		
    }
    return c;		
}

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
    //console.log(c);
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
function vdivi(a,b,z){
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
    	if (typeOf(z)==="number") { 
    		accu = z-1;
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
    //console.log(xlen);
    var ylen = a[0].length;
    //console.log(ylen);
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
function vsum(a) {
    var ylen =a.length;
	var r = 0;
    for (var i=0; i<ylen; i++){
            r += a[i];
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

function arrayObj2table(obj){
	var x;
	var titles = [];
	var data =[];
	var i=0;
	for (x in obj){
		titles[i] = x;
		data[i] = obj[x];
		i++;
		console.log(x + " " + obj[x] );
	}
	data2 = inve(data);
	var rows = data2.length;
	var cols = data.length;
	console.log(titles);
	console.log(data);
	console.log(data2);
	var htm = '<ul><li><table><tr>';
	for (i=0;i<cols;i++){
		htm+='<th>'+titles[i].substr(0,8) +'</th>';
	}
	htm +='</tr>';

	//htm +='</table></li><li><table>';
	for (var j=0;j<rows;j++){
		htm +='<tr>';
		for (var k=0;k<cols;k++){
			htm += '<td>'+data2[j][k]+'</td>';
		}
		htm += '</tr>';
	}	
	htm += '</table></li></ul>';
	console.log(htm);
	return htm;
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function vcommas(a) {
    var ylen =a.length;
	var r = [];
    for (var i=0; i<ylen; i++){
            r[i] = addCommas(a[i]);
    }
    return r;
}
function vDollaCommas(a) {
    var ylen =a.length;
	var r = [];
    for (var i=0; i<ylen; i++){
            r[i] = '$'+addCommas(a[i]);
    }
    return r;
}
function vperc(a,d) {
    var ylen =a.length;
	var r = []
    for (var i=0; i<ylen; i++){
            r[i] = rund(a[i]*100,d)+'%';
    }
    return r;
}
function vln(a){
	var ylen =a.length;
	var r = []
    for (var i=0; i<ylen; i++){
            r[i] = ln(a[i]);
    }
    return r;
}

function ln(a){
	var r = rund(Math.log(a/1000000),4);
	return r;
}

function expo(a){
	var r = 1000000*Math.exp(a);
	return r;
}

