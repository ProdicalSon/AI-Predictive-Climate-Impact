document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const formResponse = document.getElementById("formResponse");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from refreshing page

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formResponse.textContent = "Please fill in all fields.";
            formResponse.style.color = "red";
            return;
        }

        // Simulating form submission
        setTimeout(() => {
            formResponse.textContent = "Message sent successfully!";
            formResponse.style.color = "green";

            // Clear form
            contactForm.reset();
        }, 1000);
    });
});
