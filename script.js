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

    // --- Tasks Page Tab Functionality ---
    const taskNavButtons = document.querySelectorAll('.task-nav button');
    const taskContents = document.querySelectorAll('.task-content');
    if (taskNavButtons.length) {
        taskNavButtons.forEach(button => {
            button.addEventListener('click', () => {
                taskNavButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                taskContents.forEach(content => content.classList.remove('active'));
                document.getElementById(button.dataset.tab).classList.add('active');
            });
        });
    }

    // --- Tasks Page Accordion and Duty Highlighting ---
    function setupTasks(containerId, isWeekly) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const taskGroups = container.querySelectorAll('.task-group-item');
        if (taskGroups.length === 0) return;

        let dutyGroupIndex;
        if (isWeekly) {
            // Weekly Logic
            const startDate = new Date('2025-10-27'); // A reference Monday
            const today = new Date();
            const diffTime = Math.abs(today - startDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const currentWeek = Math.floor(diffDays / 7);
            dutyGroupIndex = currentWeek % 6;
        } else {
            // Daily Logic
            const referenceDay = 3; // Wednesday (0=Sun, 1=Mon, ..., 6=Sat)
            const referenceGroupIndex = 1; // Group 2 (0-indexed)
            const todayDayIndex = new Date().getDay();
            let dayDifference = todayDayIndex - referenceDay;
            dutyGroupIndex = (referenceGroupIndex + dayDifference + 6) % 6;
        }

        taskGroups.forEach((group, index) => {
            if (index === dutyGroupIndex) {
                group.classList.add('on-duty');
            }
            const header = group.querySelector('.task-group-header');
            header.addEventListener('click', () => {
                const membersList = header.nextElementSibling;
                if (membersList.style.maxHeight) {
                    membersList.style.maxHeight = null;
                    membersList.style.paddingTop = '0';
                    membersList.style.paddingBottom = '0';

                } else {
                    membersList.style.maxHeight = membersList.scrollHeight + "px";
                    membersList.style.padding = '0 20px 20px 40px';
                }
            });
        });
    }

    setupTasks('daily-work', false);
    setupTasks('special-duty', true);

    // --- Memory Album Hover Effect (handled by CSS) ---
    // No JS needed for the album card flip effect, it's CSS-based for simplicity.
});
