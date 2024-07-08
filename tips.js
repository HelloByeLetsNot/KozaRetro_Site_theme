document.addEventListener("DOMContentLoaded", function () {
    const tipsSection = document.getElementById("tips-section");

    function fetchTipData() {
        fetch('tips.json')
            .then(response => response.json())
            .then(tipPosts => {
                generateTipCards(tipPosts);
            })
            .catch(error => console.error('Error fetching tip data:', error));
    }

    function generateTipCards(tipPosts) {
        tipsSection.innerHTML = ""; // Clear previous content

        tipPosts.forEach((post, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const title = document.createElement("h3");
            title.textContent = post.title;

            const content = document.createElement("p");
            content.classList.add("preview");
            content.textContent = post.content.substring(0, 100) + "..."; // Show preview

            const fullContent = document.createElement("p");
            fullContent.classList.add("full-content");
            fullContent.textContent = post.content;
            fullContent.style.display = "none"; // Hide full content initially

            const readMoreBtn = document.createElement("button");
            readMoreBtn.textContent = "Read More";
            readMoreBtn.classList.add("btn");
            readMoreBtn.addEventListener("click", () => {
                if (fullContent.style.display === "none") {
                    fullContent.style.display = "block";
                    readMoreBtn.textContent = "Show Less";
                } else {
                    fullContent.style.display = "none";
                    readMoreBtn.textContent = "Read More";
                }
            });

            card.appendChild(title);
            card.appendChild(content);
            card.appendChild(fullContent);
            card.appendChild(readMoreBtn);
            tipsSection.appendChild(card);
        });
    }

    fetchTipData();
});
