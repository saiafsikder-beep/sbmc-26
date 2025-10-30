document.addEventListener('DOMContentLoaded', () => {

    // --- Homepage Student Card Door Open Effect ---
    const doorCards = document.querySelectorAll('.door-card');
    if (doorCards.length) {
        doorCards.forEach(card => {
            card.addEventListener('click', () => {
                // Close other open cards before opening the new one
                doorCards.forEach(c => {
                    if (c !== card && c.classList.contains('is-open')) {
                        c.classList.remove('is-open');
                    }
                });
                // Toggle the clicked card
                card.classList.toggle('is-open');
            });
        });
    }

    // --- Tasks Page Accordion and Duty Highlighting ---
    function setupTasks(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Daily Logic: Friday is the 5th group's turn.
        const referenceDay = 5; // Friday (0=Sun, ..., 6=Sat)
        const referenceGroupIndex = 4; // Group 5 (0-indexed)
        
        const today = new Date();
        const todayDayIndex = today.getDay();
        
        let dayDifference = todayDayIndex - referenceDay;
        const dutyGroupIndex = (referenceGroupIndex + dayDifference + 7) % 6; // Use 7 to handle negative mods

        const taskColumns = container.querySelectorAll('.task-column');
        
        taskColumns.forEach(column => {
            const taskGroups = column.querySelectorAll('.task-group-item');
            taskGroups.forEach((group, index) => {
                if (index === dutyGroupIndex) {
                    group.classList.add('on-duty');
                }
                const header = group.querySelector('.task-group-header');
                header.addEventListener('click', () => {
                    const membersList = header.nextElementSibling;
                    if (membersList.style.maxHeight) {
                        membersList.style.maxHeight = null;
                        membersList.style.padding = "0 20px 0 40px";
                    } else {
                        membersList.style.padding = "10px 20px 10px 40px";
                        membersList.style.maxHeight = membersList.scrollHeight + "px";
                    }
                });
            });
        });
    }

    setupTasks('daily-work');

});
