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

function updateSuggestions(mood) {
    const container = document.getElementById('suggestions');
    if (!container) return;
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
}

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
        document.getElementById('todayMood').textContent = mood;
    }
    if (stress) {
        document.getElementById('todayStress').textContent = stress + '/10';
    }
    if (activityCount !== null) {
        document.getElementById('todayActivities').textContent = activityCount + ' activities';
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
    }
}

// Placeholder functions for history tables and charts
function loadMoodHistory() {
    // TODO: fetch mood data from backend and populate table/chart
    const table = document.getElementById('moodTable');
    if (table) {
        // example row
        table.querySelector('tbody').innerHTML =
            '<tr><td>2026-03-05</td><td>Happy</td><td>3</td></tr>';
    }
    const ctx = document.getElementById('moodChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5'],
                datasets: [{
                    label: 'Stress Level',
                    data: [5, 4, 6, 3, 3],
                    borderColor: '#5BC0BE',
                    backgroundColor: 'rgba(91,192,190,0.2)'
                }]
            }
        });
    }
}

function loadActivityHistory() {
    const table = document.getElementById('activityTable');
    if (table) {
        table.querySelector('tbody').innerHTML =
            '<tr><td>2026-03-05</td><td>Exercise, Reading</td></tr>';
    }
}

// When history pages load
document.addEventListener('DOMContentLoaded', function () {
    // Set current date on dashboard
    setCurrentDate();
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

