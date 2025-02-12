document.addEventListener("DOMContentLoaded", function() {
    // Initially hide the header, main content, and footer
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    
    header.style.display = "none";
    main.style.display = "none";
    footer.style.display = "none";

    let timer;
    let showElements = false;

    // Function to show elements after 3 seconds
    function showAfterDelay() {
        if (showElements) return; // Prevent multiple triggers
        showElements = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
            header.style.display = "block";
            main.style.display = "block";
            footer.style.display = "block";
        }, 3000);
    }

    // Event listeners for mouse click and movement
    document.addEventListener("click", showAfterDelay);
    document.addEventListener("mousemove", showAfterDelay);
});
