// assets/js/bigshowcase_search.js

// Helper function to convert a string to Title Case, handling leading symbols
function toTitleCase(str) {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(function(word) {
        if (word.length === 0) return '';
        
        let firstCharIndex = 0;
        // Find the first alphabetic character
        for (let i = 0; i < word.length; i++) {
            if (word[i].match(/[a-z]/i)) { // Check if it's a letter (case-insensitive)
                firstCharIndex = i;
                break;
            }
             // If no letter found, it means the word is all symbols, return as is (after toLowerCase)
            if (i === word.length -1) return word;
        }
        
        const prefix = word.substring(0, firstCharIndex);
        const charToCap = word.charAt(firstCharIndex);
        const restOfWord = word.substring(firstCharIndex + 1);
        
        return prefix + charToCap.toUpperCase() + restOfWord;
    }).join(' ');
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof allProjectsData === 'undefined') {
        console.error("allProjectsData is not defined. Make sure it's included in bigshowcase.html");
        return;
    }
    const projects = allProjectsData;

    const projectListContainer = document.getElementById('project-list');
    const searchInput = document.getElementById('search-input');

    function displayProjects(query = '') {
        if (!projectListContainer) return;
        projectListContainer.innerHTML = '';

        const lowerCaseQuery = query.toLowerCase();

        const filteredProjects = projects.filter(project => {
            return (project.title?.toLowerCase() || '').includes(lowerCaseQuery) ||
                   (project.student?.toLowerCase() || '').includes(lowerCaseQuery) ||
                   (project.category?.toLowerCase() || '').includes(lowerCaseQuery) ||
                   (project.description?.toLowerCase() || '').includes(lowerCaseQuery);
        });

        if (filteredProjects.length === 0) {
            projectListContainer.innerHTML = '<p style="text-align: center; font-size: 1.5rem; color: var(--retro-text);" class="col-span-full">No projects found matching your search.</p>';
            return;
        }

        filteredProjects.forEach(project => {
            let borderColorVar = '--retro-neon-cyan'; // Default
            if (project.category === 'animation') borderColorVar = '--retro-accent';
            else if (project.category === 'film') borderColorVar = '--retro-neon-cyan';
            else if (project.category === 'game') borderColorVar = '--retro-neon-yellow';

            const titleCasedStudentName = toTitleCase(project.student);
            const titleCasedProjectTitle = toTitleCase(project.title);

            const projectCardHTML = `
                <div class="project-card text-center rounded-lg" style="border-color: var(${borderColorVar});">
                    <img src="${project.imageUrl}" alt="${titleCasedProjectTitle} Preview"
                         class="object-cover mb-4"
                         style="border-bottom-color: var(${borderColorVar}); height: 200px; width: 100%;">
                    <div class="card-content">
                        <div>
                            <h3 class="mb-0.5">${titleCasedStudentName} - ${titleCasedProjectTitle}</h3>
                            <p class="text-sm mb-4 project-card-description-gallery">${(project.description || '').substring(0, 100)}${(project.description || '').length > 100 ? '...' : ''}</p>
                        </div>
                        <a href="${project.pageUrl}" class="view-project-button">View</a>
                    </div>
                </div>
            `;
            projectListContainer.innerHTML += projectCardHTML;
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value;
            displayProjects(query);
        });
    }

    displayProjects();
});