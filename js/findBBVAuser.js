$(function () {
  var json,
    //remove spaces, put to lower case and remove prefix
    cleanUser   = function (usr) {
      return usr.trim().toLowerCase().replace('xe', '');
    },
    //filter user id against input value
    filterUsers = function (usr) {
      return (cleanUser(usr.USUARIO) === cleanUser($('#userId').val()));
    },
    //print the users
    printResult = function (usr) {
      $('#userResult').append("<div><strong>" + usr.NOMBRE + "</strong> <em>" + usr["CORREO INTERNO"] + "</em></div>");
    };

  //get users.json file
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
      $('#userResult').html("<strong class='error'>Not found</strong>"); //if no user show a message
    }
  });
});