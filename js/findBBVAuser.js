//remove spaces, put to lower case and remove prefix
function cleanUser(usr) {
  return usr.trim().toLowerCase().replace('xe', '');
}
//filter user id against input value
function filterUsers(usr) {
  return (cleanUser(usr.USUARIO) === cleanUser($('#userId').val()));
}
//print the users
function printResult(usr) {
  $('#userResult').append("<div><strong>" + usr.NOMBRE + "</strong> <em>" + usr["CORREO INTERNO"] + "</em></div>");
}


$(function () {
  var json;

  //Get users.json file
  $.getJSON(chrome.extension.getURL('users.json'), function (jsonUsers) {
    json = jsonUsers;
  });

  //do the search
  $('#search').on("click", function (ev) {
    ev.preventDefault();

    var userId = cleanUser($('#userId').val()),
      filter = json.users.filter(filterUsers);

    $('#userResult').html('');

    if (filter.length) {
      filter.forEach(printResult);
    } else {
      $('#userResult').html("<strong class='error'>Not found</strong>"); //If no user show a message
    }

  });
});