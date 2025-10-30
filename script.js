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

        // Daily Logic: Thursday is the 5th group's turn.
        // Day indices: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
        // Group indices: Group 1=0, Group 2=1, ..., Group 6=5
        const referenceDay = 4; // Thursday
        const referenceGroupIndex = 4; // Group 5 (0-indexed)
        
        const today = new Date();
        const todayDayIndex = today.getDay();
        
        let dayDifference = todayDayIndex - referenceDay;
        const dutyGroupIndex = (referenceGroupIndex + dayDifference + 6) % 6;

        const taskColumns = container.querySelectorAll('.task-column');
        if (taskColumns.length === 0) return;
        
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
