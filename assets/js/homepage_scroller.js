document.addEventListener('DOMContentLoaded', () => {
    const highlightsContainer = document.getElementById('highlights-container');
    if (!highlightsContainer) {
        console.error("Highlights container not found!");
        return;
    }

    let autoScrollInterval = null;
    const scrollAmountPixels = 1; // Scroll 1 pixel at a time for smooth effect
    const cardsToDuplicate = parseInt(document.body.dataset.cardsToDuplicateScroller || '5', 10); // Get from _config.yml via data attribute

    function getCardTotalWidth() {
        const card = highlightsContainer.querySelector('.project-card');
        if (!card) return 0;
        const cardStyle = window.getComputedStyle(card);
        const cardWidth = card.offsetWidth;
        const cardMarginRight = parseFloat(cardStyle.marginRight) || 0;
        return cardWidth + cardMarginRight;
    }

    function autoScroll() {
        if (!highlightsContainer) return;
        const cardTotalWidth = getCardTotalWidth();
        if (cardTotalWidth === 0) return; // No cards or width not calculable

        highlightsContainer.scrollLeft += scrollAmountPixels;

        const originalContentStartScroll = cardsToDuplicate * cardTotalWidth;
        // The scrollWidth is the total width of content, including parts not visible.
        // Duplicated end section starts after original content + start duplicates - end duplicates width
        // Or simpler: scrollWidth - (width of one duplicate set)
        const duplicatedEndStartScroll = highlightsContainer.scrollWidth - (cardsToDuplicate * cardTotalWidth) - cardTotalWidth; // Approximation

         if (highlightsContainer.scrollLeft >= duplicatedEndStartScroll) {
             highlightsContainer.scrollLeft = originalContentStartScroll;
         }
    }

    function startAutoScroll() {
        stopAutoScroll(); // Clear any existing interval

        const cardTotalWidth = getCardTotalWidth();
        if (cardTotalWidth > 0 && highlightsContainer) {
            highlightsContainer.scrollLeft = cardsToDuplicate * cardTotalWidth; // Start after pre-pended duplicates
        }
        
        autoScrollInterval = setInterval(autoScroll, 20); // Scroll every 20ms
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }

    window.manualScroll = function(direction) { // Make it global for onclick
        stopAutoScroll();
        if (!highlightsContainer) return;

        const cardTotalWidth = getCardTotalWidth();
        if (cardTotalWidth === 0) return;

        const scrollAmount = cardTotalWidth * 3; // Scroll by 3 cards
        highlightsContainer.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
    }

    const scrollWrapper = document.querySelector('.scroll-wrapper');
    if (scrollWrapper) {
        scrollWrapper.addEventListener('mouseenter', stopAutoScroll);
        scrollWrapper.addEventListener('mouseleave', startAutoScroll);
    }

    // Check if there are cards before starting autoscroll
    if (highlightsContainer.querySelector('.project-card')) {
        startAutoScroll();
    } else {
        console.log("No project cards found in highlights container to autoscroll.");
    }
    
    window.addEventListener('resize', () => {
         if (scrollWrapper && !scrollWrapper.matches(':hover')) {
             // Recalculate and restart
             stopAutoScroll();
             if (highlightsContainer.querySelector('.project-card')) {
                startAutoScroll();
             }
         }
    });
});

// Add cards_to_duplicate_for_scroller to body data attribute in default.html:
// <body data-cards-to-duplicate-scroller="{{ site.cards_to_duplicate_for_scroller | default: 5 }}" class="container mx-auto p-4 md:p-8">