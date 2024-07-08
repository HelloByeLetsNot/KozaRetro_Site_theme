document.addEventListener('DOMContentLoaded', function() {
    const sections = [
        { sectionId: 'programs-section', jsonFile: 'programs.json', pageUrl: 'programs.html', title: 'Latest Programs' }
        // Add other sections as needed
    ];

    // Function to fetch and display recent posts
    function loadRecentPosts(sectionId, jsonFile, pageUrl, title) {
        fetch(jsonFile) // Adjust path as necessary
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const post = data[0]; // Get the most recent post

                    // Create card element
                    const card = document.createElement('div');
                    card.classList.add('card');

                    // Set card content
                    const cardContent = `
                        <h3>${title}</h3>
                        <img src="${post.image}" alt="${title}" class="card-image">
                        <p>${post.content.substring(0, 100)}...</p>
                        <a href="${pageUrl}" class="btn">Read More</a>
                    `;
                    card.innerHTML = cardContent.trim();

                    // Append card to section
                    document.getElementById(sectionId).appendChild(card);
                }
            })
            .catch(error => {
                console.error(`Error fetching ${jsonFile}:`, error);
            });
    }

    // Load recent posts for each section
    sections.forEach(section => {
        loadRecentPosts(section.sectionId, section.jsonFile, section.pageUrl, section.title);
    });
});
