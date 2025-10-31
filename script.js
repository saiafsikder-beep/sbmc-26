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
    /* --- উপরের পুরনো ফাংশনটি মুছে এই নতুন ফাংশনটি বসিয়ে দাও --- */

function setupTasks(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // সহজ এবং নির্ভুল লজিক: সোমবার (দিন ১) থেকে প্রথম গ্রুপ (ইনডেক্স ০) শুরু
    const todayDayIndex = new Date().getDay(); // 0=রবি, 1=সোম, ..., 6=শনি

    // শনিবার (দিন 6) থেকে সোমবার (দিন 1) পর্যন্ত দিনের পার্থক্য গণনা করা হয়
    // এবং সেই অনুযায়ী সঠিক গ্রুপ ইনডেক্স বের করা হয়।
    // এই লজিকে শনিবার ৬ষ্ঠ গ্রুপই সিলেক্ট হবে।
    const dutyGroupIndex = (todayDayIndex + 5) % 6; // (6 + 5) % 6 = 11 % 6 = 5 (ষষ্ঠ গ্রুপ)

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

                column.querySelectorAll('.task-group-members').forEach(list => {
                    list.style.maxHeight = null;
                    list.style.padding = "0 20px 0 40px";
                });

                if (!isAlreadyOpen) {
                    membersList.style.padding = "10px 20px 10px 40px";
                    membersList.style.maxHeight = membersList.scrollHeight + "px";
                }
            });
        });
    });
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

