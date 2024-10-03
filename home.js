function getCookie() {
    var name = "email=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkLogin() {
    var email = getCookie();
    return email !== "";
}

function loginClick() {
    window.location.href = 'Login&Signup.html';
}

function deleteEmailCookie() {
    var d = new Date();
    d.setTime(d.getTime() - 1000); // Set the expiration date to the past
    var expires = "expires=" + d.toUTCString();
    document.cookie = "email=;" + expires + ";path=/";
}

// function onProfileClick() {
//     //deleteEmailCookie();
//     location.reload(); // Reload the page to update the UI
// }

$(document).ready(function() {
    if (checkLogin()) { // Call the function with parentheses
        $("#profile").show();
        $("#login").hide();
    } else {
        $("#profile").hide();
        $("#login").show();
    }
     // Toggle the dropdown menu when the profile is clicked
     $("#profile").on('click', function() {
        $("#profileDropdown").toggle();
    });

    // Logout function when "Logout" is clicked
    $("#logout").on('click', function() {
        deleteEmailCookie();
        location.reload(); // Reload the page to update the UI
    });
});
