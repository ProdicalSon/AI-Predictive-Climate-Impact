document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded!");

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Dynamic welcome message
    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = "Explore AI-driven climate insights.";
    welcomeMessage.style.fontWeight = "bold";
    document.querySelector("main section").appendChild(welcomeMessage);
});
