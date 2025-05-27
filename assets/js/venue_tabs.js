// assets/js/venue_tabs.js
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.venue-tab-button');
    const contentSections = document.querySelectorAll('.venue-content-section');

    // --- Tab Functionality ---
    if (tabButtons.length > 0 && contentSections.length > 0) {
        function showContent(tabId) {
            contentSections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });

            const selectedSection = document.getElementById(`${tabId}-content`);
            if (selectedSection) {
                selectedSection.classList.add('active');
                // Determine display type based on whether it's the floor map for responsive layouts
                if (tabId === 'floor-map' && selectedSection.querySelector('.floor-map-container')) {
                     selectedSection.style.display = 'block'; // Main container is block
                } else {
                    selectedSection.style.display = 'block'; // Default for other tabs
                }
            }

            tabButtons.forEach(button => {
                button.classList.toggle('active', button.dataset.tab === tabId);
            });
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                showContent(tabId);
            });
        });

        const initialTab = document.querySelector('.venue-tab-button.active') || tabButtons[0];
        if (initialTab) {
            showContent(initialTab.dataset.tab);
        }
    }

    // --- Floor Map Image Modal Functionality ---
    const floorMapImageElements = document.querySelectorAll('#floor-map-content .floor-map-image');
    const pageModal = document.getElementById('page-image-modal');
    const enlargedPageImage = document.getElementById('enlarged-page-image');
    const closePageModalButton = document.getElementById('close-page-image-modal');
    const prevPageImageButton = document.getElementById('prev-page-image'); // Get Prev button
    const nextPageImageButton = document.getElementById('next-page-image'); // Get Next button

    const floorMapImageSources = [];
    let currentFloorMapImageIndex = 0;

    // Populate floorMapImageSources array
    floorMapImageElements.forEach(imgElement => {
        if (imgElement.dataset.src) {
            floorMapImageSources.push(imgElement.dataset.src);
        } else {
            floorMapImageSources.push(imgElement.src); // Fallback
        }
    });
    // Remove duplicates if any image source appears multiple times (e.g. main map in desktop and mobile)
    const uniqueFloorMapImageSources = [...new Set(floorMapImageSources)];


    if (pageModal && enlargedPageImage && closePageModalButton && prevPageImageButton && nextPageImageButton) {
        function openPageModal(imageUrl, index) {
            enlargedPageImage.src = imageUrl;
            currentFloorMapImageIndex = index;
            pageModal.classList.add('visible');
            // Show/hide nav buttons based on whether there are multiple images
            if (uniqueFloorMapImageSources.length > 1) {
                prevPageImageButton.style.display = 'flex';
                nextPageImageButton.style.display = 'flex';
            } else {
                prevPageImageButton.style.display = 'none';
                nextPageImageButton.style.display = 'none';
            }
        }

        function closePageModal() {
            pageModal.classList.remove('visible');
            enlargedPageImage.src = '';
        }

        function showPrevPageImage() {
            if (uniqueFloorMapImageSources.length === 0) return;
            currentFloorMapImageIndex = (currentFloorMapImageIndex - 1 + uniqueFloorMapImageSources.length) % uniqueFloorMapImageSources.length;
            enlargedPageImage.src = uniqueFloorMapImageSources[currentFloorMapImageIndex];
        }

        function showNextPageImage() {
            if (uniqueFloorMapImageSources.length === 0) return;
            currentFloorMapImageIndex = (currentFloorMapImageIndex + 1) % uniqueFloorMapImageSources.length;
            enlargedPageImage.src = uniqueFloorMapImageSources[currentFloorMapImageIndex];
        }

        // Add click listeners to image wrappers (or images themselves)
        document.querySelectorAll('#floor-map-content .floor-map-image-wrapper').forEach(wrapper => {
            wrapper.addEventListener('click', () => {
                const imgElement = wrapper.querySelector('.floor-map-image');
                let clickedSrc = '';
                if (imgElement && imgElement.dataset.src) {
                    clickedSrc = imgElement.dataset.src;
                } else if (imgElement) {
                    clickedSrc = imgElement.src;
                }
                
                const index = uniqueFloorMapImageSources.indexOf(clickedSrc);
                if (index !== -1) {
                    openPageModal(clickedSrc, index);
                }
            });
        });

        closePageModalButton.addEventListener('click', closePageModal);
        prevPageImageButton.addEventListener('click', showPrevPageImage);
        nextPageImageButton.addEventListener('click', showNextPageImage);

        pageModal.addEventListener('click', (event) => {
            if (event.target === pageModal) {
                closePageModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (pageModal.classList.contains('visible')) {
                if (event.key === 'Escape') {
                    closePageModal();
                } else if (event.key === 'ArrowLeft' && uniqueFloorMapImageSources.length > 1) {
                    showPrevPageImage();
                } else if (event.key === 'ArrowRight' && uniqueFloorMapImageSources.length > 1) {
                    showNextPageImage();
                }
            }
        });
    }
});