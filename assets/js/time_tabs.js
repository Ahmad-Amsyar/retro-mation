document.addEventListener('DOMContentLoaded', () => {
    const dayButtons = document.querySelectorAll('.day-button');
    const scheduleContainers = document.querySelectorAll('.schedule-table-container');

    function showSchedule(day) {
        scheduleContainers.forEach(container => {
            container.classList.remove('active');
        });

        const selectedContainer = document.getElementById(`${day}-schedule`);
        if (selectedContainer) {
            selectedContainer.classList.add('active');
        }

        dayButtons.forEach(button => {
            if (button.dataset.day === day) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            const day = button.dataset.day;
            showSchedule(day);
        });
    });

    // Initially show the first day's schedule if buttons exist
    if (dayButtons.length > 0) {
        const firstDay = dayButtons[0].dataset.day;
        showSchedule(firstDay);
    }
});