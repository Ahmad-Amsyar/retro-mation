// assets/js/bigshowcase_search.js
document.addEventListener('DOMContentLoaded', () => {
    // Ensure allProjectsData is available from the inline script in bigshowcase.html
    if (typeof allProjectsData === 'undefined') {
        console.error("allProjectsData is not defined. Make sure it's included in bigshowcase.html");
        return;
    }
    const projects = allProjectsData; // Use the data injected by Jekyll

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

            // Construct HTML to match _includes/project_card.html structure and classes
            // This structure should now pick up the styles correctly from style.css
            const projectCardHTML = `
                <div class="project-card text-center rounded-lg" style="border-color: var(${borderColorVar});">
                    <img src="${project.imageUrl}" alt="${project.title} Preview"
                         class="object-cover mb-4"
                         style="border-bottom-color: var(${borderColorVar}); height: 200px; width: 100%;">
                    <div class="card-content">
                        <div>
                            <h3 class="mb-0.5">${project.student} - ${project.title}</h3>
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

    // Initial display
    displayProjects();
});