let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

function updateNavbar() {
    const navList = document.querySelector('.nav-list');
    navList.innerHTML = '';

    if (isLoggedIn) {
        navList.innerHTML = `
            <li><a class="nav-link" href="index.html" data-panel='<div class="hover-panel"><div class="stat-box"><h4>0</h4><p>Views Last 24h</p></div></div>'><i class="bi bi-house"></i><span class="nav-text">Home</span></a></li>
            <li><a class="nav-link" href="upload.html" data-panel='<div class="hover-panel"><div class="stat-box"><h4>Upload</h4><p>Drag & Drop</p></div><div class="stat-box"><h4>Remote</h4><p>Link Upload</p></div></div>'><i class="bi bi-upload"></i><span class="nav-text">Upload</span></a></li>
            <li><a class="nav-link" href="videos.html" data-panel='<div class="hover-panel"><div class="stat-box"><h4>0</h4><p>Videos</p></div></div>'><i class="bi bi-files"></i><span class="nav-text">File Manager</span></a></li>
            <li><a class="nav-link" href="dashboard.html" data-panel='<div class="hover-panel"><div class="stat-box"><h4>$0.00</h4><p>Balance</p></div><div class="stat-box"><h4>0</h4><p>Earnings</p></div></div>'><i class="bi bi-speedometer2"></i><span class="nav-text">Dashboard</span></a></li>
            <li><a class="nav-link" href="statistics.html" data-panel='<div class="hover-panel"><div class="stat-box"><h4>0</h4><p>Stats</p></div></div>'><i class="bi bi-bar-chart"></i><span class="nav-text">Statistics</span></a></li>
            <li><a class="nav-link" href="404.html" data-panel='<div class="hover-panel"><div class="stat-box"><h4>404</h4><p>Not Found</p></div></div>'><i class="bi bi-exclamation-triangle"></i><span class="nav-text">404</span></a></li>
            <li><a class="nav-link" href="#" onclick="logout()" data-panel='<div class="hover-panel"><div class="stat-box"><h4>Logout</h4><p>Sign Out</p></div></div>'><i class="bi bi-box-arrow-right"></i><span class="nav-text">Logout</span></a></li>
        `;
    } else {
        navList.innerHTML = `
            <li><a class="nav-link" href="login.html" data-panel='<div class="hover-panel"><div class="stat-box"><h4>Login</h4><p>Access</p></div></div>'><i class="bi bi-box-arrow-in-right"></i><span class="nav-text">Login</span></a></li>
            <li><a class="nav-link" href="register.html" data-panel='<div class="hover-panel"><div class="stat-box"><h4>Register</h4><p>Join</p></div></div>'><i class="bi bi-person-plus"></i><span class="nav-text">Register</span></a></li>
        `;
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = navList.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage || (currentPage === '404.html' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
        }
        link.addEventListener('mouseenter', () => {
            const panel = document.createElement('div');
            panel.innerHTML = link.getAttribute('data-panel');
            link.appendChild(panel);
        });
        link.addEventListener('mouseleave', () => {
            const panel = link.querySelector('.hover-panel');
            if (panel) panel.remove();
        });
    });
}

function validateRegister() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!email || !password || !confirmPassword) {
        alert('Please fill in all fields!');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    alert('Sign up successful! Please log in.');
    window.location.href = 'login.html';
}

function validateLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please fill in all fields!');
        return;
    }
    isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    updateNavbar();
    window.location.href = 'dashboard.html';
}

function logout() {
    isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    updateNavbar();
    window.location.href = 'index.html';
}

function toggleNav() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

window.onload = updateNavbar;