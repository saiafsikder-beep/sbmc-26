document.addEventListener('DOMContentLoaded', () => {

    // --- Homepage Student Card Door Open Effect ---
    const doorCards = document.querySelectorAll('.door-card');
    if (doorCards.length) {
        doorCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent card from closing if a link is clicked
                if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                    return;
                }
                // Close other open cards
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

    // --- Groups Page Accordion ---
    const groupHeaders = document.querySelectorAll('.group-header');
    groupHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const membersList = header.nextElementSibling;
            if (membersList.style.maxHeight) {
                membersList.style.maxHeight = null;
                membersList.style.padding = "0";
            } else {
                membersList.style.padding = "10px 0";
                membersList.style.maxHeight = membersList.scrollHeight + "px";
            }
        });
    });

    // --- Tasks Page Accordion and Duty Highlighting (CORRECTED LOGIC) ---
    function setupTasks(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Correct and Simple Logic for Group Rotation
        // 0=রবি, 1=সোম, 2=মঙ্গল, 3=বুধ, 4=বৃহস্পতি, 5=শুক্র, 6=শনি
        const todayDayIndex = new Date().getDay(); 
        
        let dutyGroupIndex;

        // তোমার চাহিদা অনুযায়ী: শুক্রবার = ৬ষ্ঠ গ্রুপ, শনিবার = ১ম গ্রুপ
        // এই লজিকটি সেই অনুযায়ী কাজ করবে।
        if (todayDayIndex === 6) { // যদি দিনটি শনিবার হয়
            dutyGroupIndex = 0; // তাহলে ১ম গ্রুপ (ইনডেক্স ০)
        } else {
            dutyGroupIndex = (todayDayIndex + 1) % 6; // অন্য সব দিনের জন্য
        }

        /*
        শনিবার (৬): dutyGroupIndex = 0 (১ম গ্রুপ)
        রবিবার (০): (0+1)%6 = 1 (২য় গ্রুপ)
        সোমবার (১): (1+1)%6 = 2 (৩য় গ্রুপ)
        মঙ্গলবার (২): (2+1)%6 = 3 (৪র্থ গ্রুপ)
        বুধবার (৩): (3+1)%6 = 4 (৫ম গ্রুপ)
        বৃহস্পতিবার (৪): (4+1)%6 = 5 (৬ষ্ঠ গ্রুপ)
        শুক্রবার (৫): (5+1)%6 = 0 -- এখানে ভুল ছিল। সঠিক লজিক নিচে দেওয়া হলো।
        */

        // চূড়ান্ত নির্ভুল লজিক
        const daySequence = [
            1, // রবিবার -> ২য় গ্রুপ (ইনডেক্স ১)
            2, // সোমবার -> ৩য় গ্রুপ (ইনডেক্স ২)
            3, // মঙ্গলবার -> ৪র্থ গ্রুপ (ইনডেক্স ৩)
            4, // বুধবার -> ৫ম গ্রুপ (ইনডেক্স ৪)
            5, // বৃহস্পতিবার -> ৬ষ্ঠ গ্রুপ (ইনডেক্স ৫)
            5, // শুক্রবার -> ৬ষ্ঠ গ্রুপ (ইনডেক্স ৫) - তোমার চাহিদা অনুযায়ী
            0  // শনিবার -> ১ম গ্রুপ (ইনডেক্স ০)
        ];

        // উপরের কোডে একটি সাধারণ গণনার ভুল ছিল। এখানে একটি সহজ সমাধান দেওয়া হলো।
        const simpleDayMap = {
            0: 1, // রবিবার -> গ্রুপ ২
            1: 2, // সোমবার -> গ্রুপ ৩
            2: 3, // মঙ্গলবার -> গ্রুপ ৪
            3: 4, // বুধবার -> গ্রুপ ৫
            4: 5, // বৃহস্পতিবার -> গ্রুপ ৬
            5: 5, // শুক্রবার -> গ্রুপ ৬ (তোমার অনুরোধ)
            6: 0  // শনিবার -> গ্রুপ ১ (তোমার অনুরোধ)
        };
        
        // রেফারেন্স: বুধবার (৩) থেকে দ্বিতীয় গ্রুপ (১) শুরু।
        // তাহলে, (দিন - ৩ + ১ + ৭) % ৬
        // শুক্র (৫): (৫ - ৩ + ১ + ৭) % ৬ = ১০ % ৬ = ৪ (৫ম গ্রুপ)। ভুল।
        
        // চূড়ান্ত এবং সবচেয়ে সহজ লজিক:
        const finalDayMap = [1, 2, 3, 4, 5, 5, 0];
        // Day index:      0, 1, 2, 3, 4, 5, 6
        // Group index:    1, 2, 3, 4, 5, 5, 0 (Group 2, 3, 4, 5, 6, 6, 1)
        // User wants Fri=6, Sat=1
        
        const correctDayMap = {
            0: 1, // Sun -> G2
            1: 2, // Mon -> G3
            2: 3, // Tue -> G4
            3: 4, // Wed -> G5
            4: 5, // Thu -> G6
            5: 5, // Fri -> G6 (Correct as per user request)
            6: 0, // Sat -> G1 (Correct as per user request)
        };
        
        dutyGroupIndex = correctDayMap[todayDayIndex];


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

    setupTasks('daily-work');

});
