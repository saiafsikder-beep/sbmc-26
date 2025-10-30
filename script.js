document.addEventListener('DOMContentLoaded', () => {

    // --- Homepage Student Card Door Open Effect ---
    const doorCards = document.querySelectorAll('.door-card');
    if (doorCards.length) {
        doorCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('is-open');
            });
        });
    }

    // --- Tasks Page Accordion and Duty Highlighting ---
    function setupTasks(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Daily Logic
        const referenceDay = 3; // Wednesday (0=Sun, 1=Mon, ..., 6=Sat)
        const referenceGroupIndex = 1; // Group 2 (0-indexed)
        const todayDayIndex = new Date().getDay();
        let dayDifference = todayDayIndex - referenceDay;
        const dutyGroupIndex = (referenceGroupIndex + dayDifference + 6) % 6;

        const taskGroups = container.querySelectorAll('.task-group-item');
        if (taskGroups.length === 0) return;
        
        taskGroups.forEach((group) => {
            const groupId = parseInt(group.dataset.groupId, 10);
            if (groupId === dutyGroupIndex) {
                group.classList.add('on-duty');
            }
            const header = group.querySelector('.task-group-header');
            header.addEventListener('click', () => {
                const membersList = header.nextElementSibling;
                if (membersList.style.maxHeight) {
                    membersList.style.maxHeight = null;
                } else {
                    membersList.style.maxHeight = membersList.scrollHeight + "px";
                }
            });
        });
    }

    setupTasks('daily-work');

});
