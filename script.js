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

        // Daily Logic: Friday is today, so group 5 is on duty.
        const referenceDay = 5; // Friday (0=Sun, ..., 6=Sat)
        const referenceGroupIndex = 4; // Group 5 (0-indexed)
        
        const today = new Date();
        const todayDayIndex = today.getDay();
        
        let dayDifference = todayDayIndex - referenceDay;
        const dutyGroupIndex = (referenceGroupIndex + dayDifference + 7) % 7; 

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
                    const isAlreadyOpen = membersList.style.maxHeight;

                    // Close all other lists in the same column
                    column.querySelectorAll('.task-group-members').forEach(list => {
                        list.style.maxHeight = null;
                        list.style.padding = "0 20px 0 40px";
                    });

                    // If it wasn't open, open it
                    if (!isAlreadyOpen) {
                        membersList.style.padding = "10px 20px 10px 40px";
                        membersList.style.maxHeight = membersList.scrollHeight + "px";
                    }
                });
            });
        });
    }

    setupTasks('daily-work');

});
