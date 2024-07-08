document.addEventListener("DOMContentLoaded", function () {
  const programsSection = document.getElementById("programs-section");

  // Function to fetch programs data from JSON
  async function fetchProgramsData() {
    try {
      const response = await fetch("programs.json");
      if (!response.ok) {
        throw new Error("Failed to fetch programs data");
      }
      const data = await response.json();
      generateProgramCards(data);
    } catch (error) {
      console.error("Error fetching programs data:", error.message);
    }
  }

  // Function to generate program cards
  function generateProgramCards(data) {
    programsSection.innerHTML = ""; // Clear previous content

    data.forEach((program) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const title = document.createElement("h3");
      const titleLink = document.createElement("a");
      titleLink.href = "#"; // Replace with actual URL
      titleLink.textContent = program.title;
      title.appendChild(titleLink);

      const content = document.createElement("p");
      content.textContent = program.content.substring(0, 100) + "...";

      const readMoreBtn = document.createElement("a");
      readMoreBtn.textContent = "Read More";
      readMoreBtn.classList.add("btn"); // Apply 'btn' class for styling
      readMoreBtn.href = "#"; // Replace with actual URL
      readMoreBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        alert(`Navigate to ${program.title}'s full page`);
        // Replace alert with actual navigation logic
      });

      card.appendChild(title);
      card.appendChild(content);
      card.appendChild(readMoreBtn);
      programsSection.appendChild(card);
    });
  }

  // Fetch and load programs data when DOM content is loaded
  fetchProgramsData();
});
