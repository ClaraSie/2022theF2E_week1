$(document).ready(function () {
    $('.ham-icon').click(function(e) {
        e.preventDefault();
        $('#header-dropdown').toggleClass('active')
    })
    $('#header-dropdown').click(function(e) {
        $('#header-dropdown').removeClass('active')
    })
});