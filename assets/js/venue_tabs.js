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
                selectedSection.style.display = 'block'; // Or 'flex' if the section itself is a flex container
                 // Special handling for mobile floor map layout
                if (tabId === 'floor-map' && selectedSection.querySelector('.floor-map-mobile-container')) {
                    selectedSection.style.display = 'block'; // Keep it block, internal flex handles layout
                    // equalizeMobileFloorMapHeights(); // Call height equalization
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
    const floorMapImageWrappers = document.querySelectorAll('#floor-map-content .floor-map-image-wrapper');
    const pageModal = document.getElementById('page-image-modal');
    const enlargedPageImage = document.getElementById('enlarged-page-image');
    const closePageModalButton = document.getElementById('close-page-image-modal');

    if (pageModal && enlargedPageImage && closePageModalButton) {
        function openPageModal(imageUrl) {
            enlargedPageImage.src = imageUrl;
            pageModal.classList.add('visible');
        }

        function closePageModal() {
            pageModal.classList.remove('visible');
            enlargedPageImage.src = '';
        }

        floorMapImageWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', () => {
                const imgElement = wrapper.querySelector('.floor-map-image');
                if (imgElement && imgElement.dataset.src) {
                    openPageModal(imgElement.dataset.src);
                } else if (imgElement) {
                    openPageModal(imgElement.src); // Fallback to src if data-src not found
                }
            });
        });

        closePageModalButton.addEventListener('click', closePageModal);

        pageModal.addEventListener('click', (event) => {
            if (event.target === pageModal) { // Click on overlay itself
                closePageModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (pageModal.classList.contains('visible') && event.key === 'Escape') {
                closePageModal();
            }
        });
    }

    // --- Optional: Equalize heights for mobile floor map (can be tricky) ---
    // function equalizeMobileFloorMapHeights() {
    //     const mobileContainer = document.querySelector('.floor-map-mobile-container');
    //     if (!mobileContainer || window.innerWidth >= 768) return; // Only run on mobile

    //     const leftMapImage = mobileContainer.querySelector('.floor-map-mobile-left .floor-map-main-mobile');
    //     const rightListWrappers = mobileContainer.querySelectorAll('.floor-map-mobile-right .floor-map-list-mobile-wrapper');

    //     if (leftMapImage && rightListWrappers.length > 0) {
    //         // Ensure images are loaded to get correct height, or use a fixed aspect ratio for left image
    //         // This might need to be called after images are loaded, or rely on CSS aspect ratios
    //         const leftHeight = leftMapImage.offsetHeight;
            
    //         if (leftHeight > 0) {
    //             const perListHeight = leftHeight / rightListWrappers.length;
    //             rightListWrappers.forEach(wrapper => {
    //                 wrapper.style.height = `${perListHeight}px`;
    //                 // The img inside will be object-fit: cover/contain as per CSS
    //             });
    //         }
    //     }
    // }
    // // Call it on load and resize, potentially debounced
    // window.addEventListener('resize', equalizeMobileFloorMapHeights);
    // // Initial call might need to be delayed or tied to tab switch if display:none affects offsetHeight
});