// assets/js/back_to_top.js
document.addEventListener('DOMContentLoaded', function() {
    let backToTopButton = document.getElementById("back-to-top");

    if (backToTopButton) {
        // When the user scrolls down 200px from the top of the document, show the button
        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        }

        // When the user clicks on the button, scroll to the top of the document
        backToTopButton.addEventListener("click", function() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
    }
});