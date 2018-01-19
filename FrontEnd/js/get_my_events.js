function my_hosted_event(header, descp, attend, id, img_url) {
	var obj = "<li><input type='hidden' value=\'" + id + "\'/> <div class='collapsible-header'>" + header + "</div> <div class='collapsible-body grey lighten-5'><h5>Description:</h5><p>" + descp + "</p><h5>Attented By:</h5><p> " + attend + "</p><img class='graph center' src=\'" + img_url + "\'><a onClick='down_csv(this)' class='btn-flat'>Download CSV</a></div></li>";
	obj = $.parseHTML(obj);
	return obj;
}

function my_attend_events(header, descp, id) {
	var obj = "<li> <input type='hidden' value=\'"+ id + "\'/> <div class='collapsible-header'>" + header + "</div> <div class='collapsible-body grey lighten-5'> <h5>Description:</h5> <p>" + descp + "</p> <div class='row'> <div class='col s9'> <div class='input-field'> <textarea id='feedback-textarea' class='materialize-textarea'></textarea> <label for='feedback-textarea'>Provide feedback</label> </div> </div> <div class='col s3 valign-wrapper'> <a class='btn-floating waves-effect waves-light btn-large' onClick = 'send_feedback(this)'><i class='material-icons'>send</i></a> </div> </div> </div> </li>"; 
	obj = $.parseHTML(obj);
	return obj;
}

function down_csv(obj) {
	console.dir();
	$.post("http://192.168.31.169:3000/api/event/csv", {
		token: localStorage.getItem('token'),
		eventID: obj.parentElement.parentElement.children[0].value
	}, function(data, status) {
		console.dir(data);
		window.location.assign("http://192.168.31.220:3000" + data.path);
	});
}

function send_feedback(obj) {
	console.dir();
	var event_id = obj.parentElement.parentElement.parentElement.parentElement.children[0].value;
	var comment = obj.parentElement.parentElement.parentElement.parentElement.children[2].children[2].children[0].children[0].children[0].value;
	$.post("http://192.168.31.169:3000/api/feedback/create", {
		token: localStorage.getItem('token'),
		eventID: event_id,
		desc: comment
	}, function(data, status) {
		console.dir(data);
		obj.parentElement.parentElement.parentElement.parentElement.children[2].children[2].children[0].children[0].children[0].value = "";
	});
}

$(document).ready(function() {
	$.post("http://192.168.31.169:3000/api/event/user", {
		token: localStorage.getItem('token')
	}
	, function(data, status) {
		data.body.going.forEach(function(index) {
			$('#attented-events').append(my_attend_events(index.event.name, index.event.description, index.event._id));
		});
	});

	$.post("http://192.168.31.169:3000/api/event/organised", {
		token: localStorage.getItem('token')
	}
	, function(data, status) {
		data.body.events.forEach(function(index) {
			$.post("http://192.168.31.169:3000/api/event/graph", 
				{
					token: localStorage.getItem('token'),
					eventID: index._id
				}
			, function(data, status) {
				var img_url = data.body.path;
				$('#prev-hosted-events').append(my_hosted_event(index.name, index.description, index.going, index._id, "http://192.168.31.220:3000" + img_url));
			});
			
		});
	});

});