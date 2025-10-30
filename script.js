document.addEventListener('DOMContentLoaded', () => {

    // --- Homepage Student Card Door Open Effect ---
    const doorCards = document.querySelectorAll('.door-card');
    if (doorCards.length) {
        doorCards.forEach(card => {
            card.addEventListener('click', () => {
                // optional: close other cards when one is opened
                // doorCards.forEach(c => { if (c !== card) c.classList.remove('is-open'); });
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

    // --- Tasks Page Accordion ---
    const taskGroupHeaders = document.querySelectorAll('.task-group-header');
    if (taskGroupHeaders.length) {
        taskGroupHeaders.forEach(header => {
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

    // --- Task Scheduling Logic ---
    function setDailyTask() {
        const referenceDay = 3; // Wednesday
        const referenceGroupIndex = 1; // Group 2
        
        const today = new Date();
        const todayDayIndex = today.getDay();
        
        let dayDifference = todayDayIndex - referenceDay;
        let todaysGroupIndex = (referenceGroupIndex + dayDifference + 6) % 6;

        const dailyTaskGroups = document.querySelectorAll('#daily-work .task-group-item');
        if (dailyTaskGroups.length > todaysGroupIndex) {
            dailyTaskGroups[todaysGroupIndex].classList.add('on-duty');
        }
    }

    function setSpecialTask() {
        const startDate = new Date('2025-10-27');
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const currentWeek = Math.floor(diffDays / 7);
        const todaysGroupIndex = currentWeek % 6;

        const specialTaskGroups = document.querySelectorAll('#special-duty .task-group-item');
        if (specialTaskGroups.length > todaysGroupIndex) {
            specialTaskGroups[todaysGroupIndex].classList.add('on-duty');
        }
    }

    if (document.getElementById('daily-work')) {
        setDailyTask();
        setSpecialTask();
    }
    
    // --- Memory Tree Modal ---
    const leaves = document.querySelectorAll('.leaf');
    const modal = document.getElementById('quoteModal');
    const closeModal = document.querySelector('.close-btn');
    const modalQuote = document.getElementById('modalQuote');
    const modalAuthor = document.getElementById('modalAuthor');

    if (leaves.length) {
        leaves.forEach(leaf => {
            leaf.addEventListener('click', () => {
                const quote = leaf.dataset.quote;
                const author = leaf.dataset.author;
                
                modalQuote.textContent = `"${quote}"`;
                modalAuthor.textContent = `- ${author}`;
                modal.style.display = 'block';
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});
