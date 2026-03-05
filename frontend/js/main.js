// Main JavaScript for Mental Wellness Check System
// Handles form validation, dynamic suggestion updates,
// and placeholders for backend integration.

// Utility function for email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show error message on login form
function showLoginError(message) {
    const err = document.getElementById('loginError');
    err.textContent = message;
    err.classList.remove('d-none');
    err.classList.add('shake');
    err.addEventListener('animationend', () => {
        err.classList.remove('shake');
    }, { once: true });
}

// Login form validation and submit handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        let valid = true;
        if (!email.value || !isValidEmail(email.value)) {
            email.classList.add('is-invalid');
            valid = false;
        } else {
            email.classList.remove('is-invalid');
        }
        if (!password.value) {
            password.classList.add('is-invalid');
            valid = false;
        } else {
            password.classList.remove('is-invalid');
        }
        if (!valid) return;

        // TODO: Integrate with backend authentication
        // For now simulate successful login
        console.log('Logging in', email.value);
        // Redirect to dashboard on success
        window.location.href = 'dashboard.html';
    });
}

// Registration form validation
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('regName');
        const email = document.getElementById('regEmail');
        const password = document.getElementById('regPassword');
        const dept = document.getElementById('regDept');
        let valid = true;
        if (!name.value.trim()) {
            name.classList.add('is-invalid');
            valid = false;
        } else {
            name.classList.remove('is-invalid');
        }
        if (!email.value || !isValidEmail(email.value)) {
            email.classList.add('is-invalid');
            valid = false;
        } else {
            email.classList.remove('is-invalid');
        }
        if (!password.value || password.value.length < 6) {
            password.classList.add('is-invalid');
            valid = false;
        } else {
            password.classList.remove('is-invalid');
        }
        if (!dept.value.trim()) {
            dept.classList.add('is-invalid');
            valid = false;
        } else {
            dept.classList.remove('is-invalid');
        }
        if (!valid) return;

        // TODO: Send registration data to backend
        const msg = document.getElementById('registerMessage');
        msg.textContent = 'Registration successful!';
        msg.classList.remove('d-none');
        msg.classList.add('highlight-pulse');
        msg.addEventListener('animationend', () => msg.classList.remove('highlight-pulse'), { once: true });
        registerForm.reset();
        // Redirect to login after a short delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
}

// Suggestions logic based on mood
const suggestionMap = {
    Happy: ['Keep smiling!', 'Share your joy with others.'],
    Sad: ['Talk to a friend.', 'Listen to calming music.'],
    Stressed: ['Practice deep breathing.', 'Take a short walk.'],
    Calm: ['Maintain your peace.', 'Continue positive habits.'],
    Tired: ['Get some rest.', 'Try relaxing activities.']
};

// updateSuggestions function with animation is defined later after helpers

// Mood form submit handler
const moodForm = document.getElementById('moodForm');
if (moodForm) {
    moodForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // collect values
        const mood = document.getElementById('moodSelect').value;
        const stress = document.getElementById('stressLevel').value;
        // TODO: send to backend
        console.log('Mood submitted', mood, stress);
        updateSuggestions(mood);
        // Update summary
        updateTodaySummary(mood, stress, null);
        // Show success message
        alert('Mood submitted successfully!');
    });
    const moodSelect = document.getElementById('moodSelect');
    moodSelect.addEventListener('change', function () {
        updateSuggestions(this.value);
    });
}

// Activities form submit handler
const activitiesForm = document.getElementById('activitiesForm');
if (activitiesForm) {
    activitiesForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const checked = Array.from(document.querySelectorAll('#activitiesForm input[type=checkbox]:checked'))
            .map(cb => cb.value);
        // TODO: send to backend
        console.log('Activities submitted', checked);
        // Update summary
        updateTodaySummary(null, null, checked.length);
        // Show success message
        alert('Activities submitted successfully!');
    });
}

// Profile form validation
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('profileName');
        const email = document.getElementById('profileEmail');
        const dept = document.getElementById('profileDept');
        let valid = true;
        if (!name.value.trim()) {
            name.classList.add('is-invalid');
            valid = false;
        } else {
            name.classList.remove('is-invalid');
        }
        if (!email.value || !isValidEmail(email.value)) {
            email.classList.add('is-invalid');
            valid = false;
        } else {
            email.classList.remove('is-invalid');
        }
        if (!dept.value.trim()) {
            dept.classList.add('is-invalid');
            valid = false;
        } else {
            dept.classList.remove('is-invalid');
        }
        if (!valid) return;
        // TODO: submit profile update to backend
        console.log('Profile updated');
        // Show success message
        alert('Profile updated successfully!');
    });
}

// Update today's summary cards
function updateTodaySummary(mood, stress, activityCount) {
    if (mood) {
        const node = document.getElementById('todayMood');
        node.textContent = mood;
        node.classList.add('highlight-pulse');
        node.addEventListener('animationend', () => node.classList.remove('highlight-pulse'), { once: true });
    }
    if (stress) {
        const node = document.getElementById('todayStress');
        node.textContent = stress + '/10';
        node.classList.add('highlight-pulse');
        node.addEventListener('animationend', () => node.classList.remove('highlight-pulse'), { once: true });
    }
    if (activityCount !== null) {
        const node = document.getElementById('todayActivities');
        node.textContent = activityCount + ' activities';
        node.classList.add('highlight-pulse');
        node.addEventListener('animationend', () => node.classList.remove('highlight-pulse'), { once: true });
    }
}

// Daily tips array
const dailyTips = [
    "Take deep breaths and appreciate the present moment.",
    "Practice gratitude by noting three things you're thankful for.",
    "Take a short walk in nature to clear your mind.",
    "Connect with a loved one for emotional support.",
    "Try a new hobby or activity to spark joy.",
    "Meditate for 5 minutes to center yourself.",
    "Write down your thoughts and feelings in a journal.",
    "Listen to calming music and relax.",
    "Do something kind for someone else today.",
    "Focus on what you can control and let go of the rest."
];

// Change daily tip
function changeTip() {
    const tipElement = document.getElementById('dailyTip');
    if (tipElement) {
        const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
        tipElement.textContent = '"' + randomTip + '"';
    }
}

// Set current date
function setCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
        // slight expand animation on load
        dateElement.classList.add('expand-in');
    }
}

// Placeholder functions for history tables and charts
function loadMoodHistory() {
    // TODO: fetch mood data from backend and populate table/chart
    const table = document.getElementById('moodTable');
    if (table) {
        // add sample mood history rows
        const rows = [
            { date: '2026-03-05', mood: 'Happy', stress: '3' },
            { date: '2026-03-04', mood: 'Calm', stress: '2' },
            { date: '2026-03-03', mood: 'Stressed', stress: '7' },
            { date: '2026-03-02', mood: 'Sad', stress: '5' },
            { date: '2026-03-01', mood: 'Calm', stress: '3' }
        ];
        let html = '';
        rows.forEach(row => {
            const moodClass = 'mood-' + row.mood.toLowerCase();
            const icon = row.mood === 'Happy' ? 'fa-smile' : row.mood === 'Calm' ? 'fa-spa' : row.mood === 'Stressed' ? 'fa-exclamation' : 'fa-frown';
            html += `<tr><td>${row.date}</td><td><span class="${moodClass}"><i class="fas ${icon}"></i> ${row.mood}</span></td><td>${row.stress}/10</td></tr>`;
        });
        table.querySelector('tbody').innerHTML = html;
    }
    
    // Initialize chart
    const ctx = document.getElementById('moodChart');
    if (ctx && typeof Chart !== 'undefined') {
        setTimeout(() => {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5'],
                    datasets: [{
                        label: 'Stress Level (0-10)',
                        data: [3, 5, 7, 2, 3],
                        borderColor: '#4fc3f7',
                        backgroundColor: 'rgba(79,195,247,0.15)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointBackgroundColor: '#81c784',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: true,
                            labels: { 
                                font: { size: 14, weight: 'bold' },
                                color: '#2c3e50',
                                padding: 15
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,
                            ticks: { color: '#2c3e50', font: { size: 12 } },
                            grid: { color: 'rgba(0,0,0,0.1)', drawBorder: true }
                        },
                        x: {
                            ticks: { color: '#2c3e50', font: { size: 12 } },
                            grid: { color: 'rgba(0,0,0,0.1)' }
                        }
                    }
                }
            });
        }, 200);
    }
}

function loadActivityHistory() {
    const table = document.getElementById('activityTable');
    if (table) {
        // add sample activity history rows
        const rows = [
            { date: '2026-03-05', activities: ['Exercise', 'Reading'] },
            { date: '2026-03-04', activities: ['Meditation', 'Music'] },
            { date: '2026-03-03', activities: ['Friends'] },
            { date: '2026-03-02', activities: ['Journaling'] },
            { date: '2026-03-01', activities: ['Exercise'] }
        ];
        let html = '';
        rows.forEach(row => {
            const icons = {
                'Exercise': 'fa-dumbbell activity-exercise',
                'Reading': 'fa-book activity-reading',
                'Meditation': 'fa-spa activity-meditation',
                'Music': 'fa-music activity-music',
                'Friends': 'fa-users activity-friends',
                'Journaling': 'fa-pen activity-journaling'
            };
            const activities = row.activities.map(a => {
                const icon = icons[a] || 'fa-star';
                return `<i class="fas ${icon}"></i> ${a}`;
            }).join(', ');
            html += `<tr><td>${row.date}</td><td>${activities}</td></tr>`;
        });
        table.querySelector('tbody').innerHTML = html;
    }
}

// When history pages load

// --- Animation helpers and event wiring ---
// Apply fade-in to cards/tables/charts on page load
function applyPageLoadAnimations() {
    document.querySelectorAll('.card, table, canvas, .suggestion-list').forEach(el => {
        el.classList.add('fade-in');
    });
}

// Add interactive animations to buttons/sliders/dropdowns/icons
function setupInteractiveAnimations() {
    // buttons: hover and click pulse animation
    document.querySelectorAll('.btn-soft').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('btn-animate');
        });
        btn.addEventListener('animationend', () => {
            btn.classList.remove('btn-animate');
        });
        btn.addEventListener('click', () => {
            // brief scale effect also triggered by btn-animate
            btn.classList.add('btn-animate');
        });
    });

    // sliders: pulse when value changes
    document.querySelectorAll('input[type=range]').forEach(slider => {
        slider.addEventListener('input', () => {
            slider.classList.add('slider-animate');
        });
        slider.addEventListener('animationend', () => {
            slider.classList.remove('slider-animate');
        });
    });

    // select dropdowns: animate on focus and change
    document.querySelectorAll('select').forEach(sel => {
        sel.addEventListener('focus', () => {
            sel.classList.add('dropdown-animate');
        });
        sel.addEventListener('change', () => {
            sel.classList.add('dropdown-animate');
        });
        sel.addEventListener('animationend', () => {
            sel.classList.remove('dropdown-animate');
        });
    });

    // icons spin on click if they have class .icon-action
    document.querySelectorAll('.icon-action').forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.add('icon-spin');
            icon.addEventListener('animationend', () => {
                icon.classList.remove('icon-spin');
            }, { once: true });
        });
    });
}

// updateSuggestions now includes animation trigger
function updateSuggestions(mood) {
    const container = document.getElementById('suggestions');
    if (!container) return;
    // animate out existing suggestions before updating
    container.classList.add('fade-out');
    setTimeout(() => {
        container.classList.remove('fade-out');
        container.innerHTML = '';
        if (!mood || !suggestionMap[mood]) {
            container.textContent = 'Select a mood to see suggestions.';
            return;
        }
        const list = document.createElement('ul');
        suggestionMap[mood].forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
        container.appendChild(list);
        container.classList.add('fade-in'); // fade into new content
    }, 500);
}

// End of animation helpers

// When history pages load

// make page fade in after content is ready
function showPage() {
    document.body.classList.remove('page-hidden');
    document.body.classList.add('page-visible');
}

document.addEventListener('DOMContentLoaded', function () {
    // Set current date on dashboard
    setCurrentDate();

    // initial page visibility animation
    showPage();

    // apply page-load animations and interactive listeners
    applyPageLoadAnimations();
    setupInteractiveAnimations();
    animateProgressBars();
    animateTableRows();
    setupSmoothScroll();
    setupFormValidationAnimations();

    if (document.getElementById('moodTable')) {
        loadMoodHistory();
    }
    if (document.getElementById('activityTable')) {
        loadActivityHistory();
    }
    // Admin panel forms
    const activityAdminForm = document.getElementById('activityAdminForm');
    if (activityAdminForm) {
        activityAdminForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input.value.trim()) {
                alert('Activity added: ' + input.value);
                input.value = '';
            }
        });
    }
    const suggestionAdminForm = document.getElementById('suggestionAdminForm');
    if (suggestionAdminForm) {
        suggestionAdminForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input.value.trim()) {
                alert('Suggestion added: ' + input.value);
                input.value = '';
            }
        });
    }
});

