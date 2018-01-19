$(document).ready(function() {
	// $('#create-event-btn').click(function() {
	// 	var form = $('#create-event-form');
	// 	console.dir(form);
	// 	var formData = new FormData(form[0]);
	// 	console.log(formData);
	// 		$.ajax({
	// 			type: "POST",
	// 			url: "http://192.168.31.169:3000/api/event/create", 
	// 			data: formData,
	// 			contentType: false,
	// 			processData: false
	// 		});
 // 		$('#create-event-modal').modal('close');
	// });

	$('#create-event-btn').click(function() {
		var n = $('#create-event-name').val();
		var des = $('#create-event-descp').val();
		var sd = $('#create-event-start-date')[0].value;
		var ed = $('#create-event-end-date')[0].value;
		var tSe = $('#create-event-seats').val();
		var inp = document.getElementById("inputFile");
		var tags = $('#create-event-tags').val();
		// var fReader = new FileReader();
		// fReader.readAsDataURL(inp.files[0]);
		// fReader.onloadend = function(event){
    	// $('#inputFileConvert').val(event.target.result);
		$.post("http://192.168.31.169:3000/api/event/create",
		{
			token: localStorage.getItem('token'),
			name: n,
			sDate: sd,
			eDate: ed,
			desc: des,
			// pic: $('#inputFileConvert').val(),
			tSeat: tSe,
			tag: tags
		},
			function(data, status) {
				console.dir(data);
				Materialize.toast('Event created!', 3000, 'rounded');
				$('#create-event-modal').modal('close');
			}
		)
	});


});