// Check login state from localStorage (or default to false)
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Function to update navbar
function updateNavbar() {
    const navList = document.querySelector('.navbar-nav');
    navList.innerHTML = ''; // Clear current links

    if (isLoggedIn) {
        // Logged-in navbar
        navList.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="upload.html">Upload</a></li>
            <li class="nav-item"><a class="nav-link" href="videos.html">Videos</a></li>
            <li class="nav-item"><a class="nav-link" href="profile.html">Profile</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
        `;
    } else {
        // Logged-out navbar
        navList.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
        `;
    }

    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = navList.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Login function
function login() {
    isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true'); // Save state
    updateNavbar();
    window.location.href = 'profile.html'; // Redirect
}

// Logout function
function logout() {
    isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false'); // Clear state
    updateNavbar();
    window.location.href = 'index.html';
}

// Run on page load
window.onload = updateNavbar;
// Validate registration form
function validateRegister() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!email || !password || !confirmPassword) {
        alert('Please fill in all fields!');
        return false;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
    return false; // Prevent form reload
}

// Validate login form
function validateLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please fill in all fields!');
        return false;
    }
    login(); // Call the login function if valid
    return false; // Prevent form reload
}