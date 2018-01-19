function add_live_event(title, descp , id) {
	var obj = "<div class='col s12 m6'><input type='hidden' value="+ id +" /> <div class='card z-depth-4 event-card'> <div class='card-image'> <img src='images/cover_photo.jpg'> <span class='card-title'><h1>" + title + "</h1></span> </div> <div class='card-content'> <p class='flow-text'>" + descp + "</p> </div> </div> "
	obj = $.parseHTML(obj)[0];
	return obj;
}

function make_row() {
	var obj = "<div class='row'></div>";
	obj = $.parseHTML(obj)[0];
	return obj;
}
