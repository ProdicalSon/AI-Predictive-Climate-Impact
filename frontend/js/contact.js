document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const formResponse = document.getElementById("formResponse");

    contactForm.addEventListener("submit", async(event) => {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formResponse.textContent = "Please fill in all fields.";
            formResponse.style.color = "red";
            return;
        }

        const formData = { name, email, message };

        try {
            const response = await fetch("http://127.0.0.1:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                formResponse.textContent = "Message sent successfully!";
                formResponse.style.color = "green";
                contactForm.reset();
            } else {
                formResponse.textContent = result.error || "Failed to send message.";
                formResponse.style.color = "red";
            }
        } catch (error) {
            formResponse.textContent = "An error occurred. Please try again.";
            formResponse.style.color = "red";
        }
    });
});