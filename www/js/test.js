//If you'd like to manipulate a page's contents before the pageinit event fires and widgets are auto-initialized, you can instead bind to the pagebeforecreate event:
//If you'd like to manipulate a page's contents after the pageinit event fires and widgets are auto-initialized, you can instead bind to the pageinit event:
$( document ).delegate("#graph", "pageinit", function() {
  console.log('A page with an ID of "graph" was just created by jQuery Mobile!');
});

$( document ).delegate("#graph", "pagebeforecreate", function() {
  console.log('A page with an ID of "graph" is about to be created by jQuery Mobile!');
});

var data2cx = [[143, 0], [123, 1.5] ];
var data2dx = [[94, 0], [145, 1.5] ];		
var data2x = data2dx;

$('#propage').live('pageinit', function(event) {    
	plotIt();

	$('body').on('click', "#but1", function (e) { 
		e.stopImmediatePropagation();
		e.preventDefault();    
		data2x[0][0] +=1;
		console.log(data2x);
		plotIt();
	});    
	
	$("#inp1").val(data2x[0][0]).slider('refresh');

	
	$("#inp1").change(function(e){
		console.log("the sucker changed");
		data2x[0][0] = Number($(this).val());
		plotIt();
	})
	
});
	
var plot;
$(function () {
    var sin = [], cos = [];
    for (var i = 0; i < 14; i += 0.1) {
        sin.push([i, Math.sin(i)]);
        cos.push([i, Math.cos(i)]);
    }

    plot = $.plot($("#placeholder"),
                      [ { data: sin, label: "sin(x) = -0.00"},
                        { data: cos, label: "cos(x) = -0.00" } ], {
                            series: {
                                lines: { show: true }
                            },
                            crosshair: { mode: "x" },
                            grid: { hoverable: true, autoHighlight: false },
                            yaxis: { min: -1.2, max: 1.2 }
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
function setit(){
	return 27;
}

function plotIt(){
    var plot = $.plot($("#chart2"), [
    {
        label: "income",
        data: data2,
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
   



//For example, if a block of HTML markup (say a login form) was loaded in through Ajax, trigger the create event to automatically transform all the widgets it contains (inputs and buttons in this case) into the enhanced versions. The code for this scenario would be:

//$( ...new markup that contains widgets... ).appendTo( ".ui-page" ).trigger( "create" );
