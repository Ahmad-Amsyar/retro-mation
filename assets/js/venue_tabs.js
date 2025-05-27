// assets/js/venue_tabs.js
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.venue-tab-button');
    const contentSections = document.querySelectorAll('.venue-content-section');

    if (tabButtons.length === 0 || contentSections.length === 0) {
        return; // Do nothing if buttons or sections aren't found
    }

    function showContent(tabId) {
        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none'; // Ensure it's hidden
        });

        // Show the selected content section
        const selectedSection = document.getElementById(`${tabId}-content`);
        if (selectedSection) {
            selectedSection.classList.add('active');
            selectedSection.style.display = 'block'; // Ensure it's shown
        }

        // Update active button state
        tabButtons.forEach(button => {
            if (button.dataset.tab === tabId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Add click listeners to the buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab; // Get the data-tab attribute value
            showContent(tabId);
        });
    });

    // Initially show the 'how-to-get-here' content
    // (or the first tab if 'how-to-get-here' doesn't exist for some reason)
    const initialTab = document.querySelector('.venue-tab-button.active') || tabButtons[0];
    if (initialTab) {
        showContent(initialTab.dataset.tab);
    }
});