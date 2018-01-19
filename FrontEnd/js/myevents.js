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
$(document).ready(function(){
  $('.collapsible').collapsible();
  $('#log-out-btn').click(function() {
		document.write('Please wait!');
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		localStorage.removeItem('email');
		localStorage.removeItem('userID');
		window.location.assign('index.html');
	});
});