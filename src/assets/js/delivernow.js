// Country code input list initalizer
var input = document.querySelector("#CountryCode");
window.intlTelInput(input, {
    separateDialCode: true
});

// Password show hide function 
$(".toggle-password").click(function () {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
