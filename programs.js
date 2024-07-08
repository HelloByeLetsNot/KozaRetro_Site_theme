document.addEventListener("DOMContentLoaded", function () {
    const programsSection = document.getElementById("programs-section");

    function fetchProgramData() {
        fetch('programs.json')
            .then(response => response.json())
            .then(programs => {
                generateProgramCards(programs);
            })
            .catch(error => console.error('Error fetching program data:', error));
    }

    function generateProgramCards(programs) {
        programsSection.innerHTML = ""; // Clear previous content

        programs.forEach((program, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const title = document.createElement("h3");
            title.textContent = program.title;

            if (program.image) {
                const img = document.createElement("img");
                img.src = program.image;
                img.alt = program.title;
                img.classList.add("card-image");
                card.appendChild(img);
            }

            const content = document.createElement("p");
            content.classList.add("preview");
            content.textContent = program.content.substring(0, 100) + "..."; // Show preview

            const fullContent = document.createElement("div");
            fullContent.classList.add("full-content");
            fullContent.innerHTML = `<p>${program.content}</p>`; // Full content

            const btnContainer = document.createElement("div");
            btnContainer.classList.add("btn-container");

            const readMoreBtn = document.createElement("button");
            readMoreBtn.textContent = "Read More";
            readMoreBtn.classList.add("btn");
            readMoreBtn.addEventListener("click", () => {
                if (!card.classList.contains("fullscreen")) {
                    card.classList.add("fullscreen");
                    fullContent.style.display = "block";
                    readMoreBtn.textContent = "Show Less";
                    content.style.display = "none"; // Hide preview content
                } else {
                    card.classList.remove("fullscreen");
                    fullContent.style.display = "none";
                    readMoreBtn.textContent = "Read More";
                    content.style.display = "block"; // Show preview content
                }
            });

            btnContainer.appendChild(readMoreBtn);
            card.appendChild(title);
            card.appendChild(content);
            card.appendChild(fullContent);
            card.appendChild(btnContainer);

            // Add a clickable link if provided
            if (program.url) {
                const link = document.createElement("a");
                link.href = program.url;
                link.textContent = "Learn More";
                link.classList.add("btn");
                btnContainer.appendChild(link);
            }

            programsSection.appendChild(card);
        });
    }

    fetchProgramData();
});