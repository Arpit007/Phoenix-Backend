if(typeof(Storage) !== 'undefined') {
	if(localStorage.getItem('token')) {
		$('#username').text(localStorage.getItem('name'));
		$('#user-email').text(localStorage.getItem('email'));
	} else{
		window.location.assign('index.html');
	}
} else {
	document.write('Sorry cannot open app!');
}

$(document).ready(function() {
	Materialize.toast('Logged in!', 3000, 'rounded')
	$.post("http://192.168.31.169:3000/api/event/live", 
		{
			token: localStorage.getItem('token')
		}
		, 
	function(data, status) {
			console.dir(data.events);
			var lastRow;
			data.events.forEach(function(val, index) {
				var obj = add_live_event(val.name, val.description , val._id);
				if(index % 2 === 0) {
					lastRow = make_row();
					$('#live-events-cont').append(lastRow);
				}
				$(lastRow).append(obj);
				
			});
			$('.event-card').click(function() {
				$('#events-modal').modal('open');
				$.post("http://192.168.31.169:3000/api/event/event", 
					{	
						token: localStorage.getItem('token'),
						eventID : this.parentElement.children[0].value
					}, function (data1 , status1) {
						console.dir(data1.body.event);
						$('#modal-event-title').text(data1.body.event.name);
						$('#modal-event-descp').text(data1.body.event.description);
						$('#modal-total-seat').text(data1.body.event.totalSeats);
						$('#hidden-event-id').val(data1.body.event._id);
						// $('#modal-mobile-number').val(data1.body.event._id);
						var ds = new Date(data1.body.event.sDate);
						var de = new Date(data1.body.event.eDate);
						 var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
						$('#modal-event-dates').text(ds.getDate() + " " + mL[ds.getMonth()] + "-" + de.getDate() + " " + mL[de.getMonth()]);
					});
			});
		}
	);

	$('#interested-btn').click(function() {
		console.dir(this.parentElement.parentElement);
	});
	$('.modal').modal();
	$('#create-event-open-modal-btn').click(function() {
		$('#create-event-modal').modal('open');
	});
	$('.event-card').click(function() {
		$('#events-modal').modal('open');
	});
	$(".button-collapse").sideNav();
	$('#log-out-btn').click(function() {
		document.write('Please wait!');
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		localStorage.removeItem('email');
		localStorage.removeItem('userID');
		window.location.assign('index.html');
	});
	$('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15
  });

	$('#interested').click(function () {
		console.log($('#hidden-event-id').val());
		$.post("http://192.168.31.169:3000/api/event/interest",
			{
					token: localStorage.getItem('token'),
					eventID: $('#hidden-event-id').val()
			},
			function (data , status) {
				console.log(data);
				// $('#action-for-event').slideUp(200);
					$('#going').slideUp(200);
				$('#interested').slideUp(200);
			});
	});


	$('#going').click(function () {
		console.log($('#hidden-event-id').val());
		$.post("http://192.168.31.169:3000/api/event/going",
			{
					token: localStorage.getItem('token'),
					eventID: $('#hidden-event-id').val()
			},
			function (data , status) {
				console.log(data);
				$('#going').slideUp(200);
				$('#interested').slideUp(200);
			});
	});


});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Allow Location");
    }
}
function showPosition(position) {
	var mapProp = {
	  center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
	  zoom: 5,
	};
	var map = new google.maps.Map(document.getElementById("google-map"), mapProp);
}
