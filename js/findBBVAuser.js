$(function () {
  var json, userOk, userID;

  $.getJSON(chrome.extension.getURL('users.json'), function (jsonUsers) {
    json = jsonUsers;
  });

  function returnUser(usr) {
    var user = usr.USUARIO.trim().toLowerCase().replace('xe', '');

    if (user === userID) {
      userOk = true;
      $('.error').remove();
      $('#userResult').append("<div><strong>" + usr.NOMBRE + "</strong> <em>" + usr["CORREO INTERNO"] + "</em></div>");

    } else if (userOk === false) {
      $('#userResult').html("<strong class='error'>Not found</strong>");
    }
  }

  $('#search').on("click", function (ev) {
    ev.preventDefault();

    userOk = false;
    userID = $('#userID').val().trim().toLowerCase().replace('xe', '');

    json.users.forEach(returnUser);
  });
});