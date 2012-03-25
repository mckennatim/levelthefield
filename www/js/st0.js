var data =87;

$('#page2').live('pageinit', function(event) {    
    $("#inp1").val(data).trigger('create');

	$("#but1").click( function (e) {    
		data +=1;
		console.log(data);
		$("#txthere").append(data+'<br/>');
	});    

	
	$("#inp1").change( function(e){
		data = Number($(this).val());
		console.log(data);
		$("#txthere").append(data+'<br/>');
	});
		
});
