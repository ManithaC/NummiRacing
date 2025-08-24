// Global variables
let websiteData = {
    drivers: [],
    crew: [],
    schedule: [],
    gallery: [],
    merch: [],
    sponsors: [],
    socialLinks: {},
    nextRaceDate: null
};



// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Clear storage to force reload of new data structure
    localStorage.clear();
    sessionStorage.clear();
    
    // Updated splash screen sequence for smoother, more welcoming experience:
    // 1. Black screen (0.2s) - slightly longer for anticipation
    // 2. "Welcome to" text fades in (0.3s) - starting at 0.2s, more graceful
    // 3. Hero logo fades in (0.6s) - starting at 0.5s, more welcoming timing
    // 4. Fade black away (0.5s) - starting at 1.1s, ending at 1.6s
    // 5. Lower z-index of hero content to go under navigation (at 1.6s)
    
    // Start logo animation after splash text is fully visible
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const heroLogo = document.querySelector('.hero-logo');
        if (heroContent) {
            heroContent.style.opacity = '1';
        }
        if (heroLogo) {
            // Animate logo with welcoming effect
            setTimeout(() => {
                heroLogo.style.opacity = '1';
                heroLogo.style.transform = 'scale(1) translateY(0)';
            }, 100); // Small delay for smooth transition
        }
    }, 500); // Logo starts appearing at 0.5s
    
    // Fade out splash screen and adjust z-index
    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        if (splashScreen) {
            splashScreen.classList.add('fade-out');
            // Remove splash screen from DOM after fade transition
            setTimeout(() => {
                splashScreen.remove();
                
                // Lower the z-index of hero content so it goes under the navigation menu
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.zIndex = '999';
                }
            }, 500);
        }
    }, 1100); // Start fade out at 1.1s, z-index changes after 1.6s

    initializeWebsite();
    setupEventListeners();
    loadWebsiteData();
    startCountdown();
    setupScrollAnimations();

});

// Initialize website components
function initializeWebsite() {
    // Load data from localStorage or use default data
    const savedData = localStorage.getItem('nummiRacingData');
    if (savedData) {
        websiteData = JSON.parse(savedData);
    } else {
        loadDefaultData();
    }
    
    // Render all sections
    renderDrivers();
    renderCrew();
    renderSchedule();
    renderGallery();
    renderMerch();
    renderSponsors();
    renderSocialLinks();
}

// Load default data structure - now using actual team data
function loadDefaultData() {
    websiteData = {
        drivers: [
            {
                id: 1,
                name: "Vinh Pham",
                role: "Driver",
                image: "images/vinh.jpg",
                bio: "Racing enthusiast with a passion for precision driving and team coordination.",
                instagram: "vphamracing"
            },
            {
                id: 2,
                name: "Patrick Alex",
                role: "Driver", 
                image: "images/patrick.jpg",
                bio: "Experienced driver focused on consistency and performance optimization.",
                instagram: "patrick.drives"
            },
            {
                id: 3,
                name: "Hung Nguyen",
                role: "Driver",
                image: "images/hung.jpg", 
                bio: "Dedicated team member bringing technical expertise to the track.",
                instagram: "frdriver"
            },
            {
                id: 4,
                name: "Nick Maitland",
                role: "Driver",
                image: "images/nick.jpg",
                bio: "Competitive driver with strong analytical skills and race strategy.",
                instagram: "heavymanufacturing"
            },
            {
                id: 5,
                name: "Jason Li",
                role: "Guest Driver",
                image: "images/jason.jpg",
                bio: "Guest driver contributing fresh perspectives and racing experience.",
                instagram: "driven.by.jay"
            },
            {
                id: 6,
                name: "Paul Joakim",
                role: "Guest Driver", 
                image: "images/paul.jpg",
                bio: "Visiting driver sharing knowledge and expanding team capabilities.",
                instagram: "paul_joakim"
            }
        ],
        crew: [
            {
                id: 1,
                name: "Adam Mann",
                role: "Chief Mechanic",
                image: "images/adam.jpg",
                bio: "Lead mechanic ensuring peak vehicle performance and reliability.",
                instagram: "mann.motorsport"
            },
            {
                id: 2,
                name: "Joseph Yang",
                role: "Data Analyst",
                image: "images/joseph.jpg",
                bio: "Performance analyst optimizing race strategy through data insights.",
                instagram: "jsph.yang"
            },
            {
                id: 3,
                name: "Luke Pham",
                role: "Crew",
                image: "images/luke.jpg",
                bio: "Essential crew member supporting all team operations and logistics.",
                instagram: "lukephamracing"
            },
            {
                id: 4,
                name: "Manitha Chandrasena",
                role: "Intern",
                image: "images/manitha.jpg",
                bio: "Learning the ropes and contributing to team success through dedication.",
                instagram: "manitha_c"
            }
        ],
        schedule: [
            {
                id: 1,
                date: "2025-09-26T13:00:00",
                location: "Shannonville Motorsports Park",
                event: "Enduro Elite Race 8",
                status: "upcoming"
            },
            {
                id: 2,
                date: "2025-11-15T12:00:00",
                location: "Ozarks International Raceway",
                event: "NASA 25hrs of Ozarks",
                status: "upcoming"
            }
        ],
        gallery: [],
        merch: [],
        sponsors: [
            {
                id: 1,
                name: "XIII Motorsports",
                logo: "images/xiii-motorsports.jpg",
                description: "Performance parts and racing support"
            },
            {
                id: 2,
                name: "SpeedAcademy",
                logo: "images/speedacademy.jpg",
                description: "Driver training and education"
            },
            {
                id: 3,
                name: "JRP",
                logo: "images/jrp.jpg",
                description: "Technical consulting and support"
            },
            {
                id: 4,
                name: "BSquared",
                logo: "images/bsquared.jpg",
                description: "Racing equipment and gear"
            }
        ],
        socialLinks: {
            facebook: "https://www.facebook.com/nummi.racing/",
            instagram: "https://www.instagram.com/nummi_racing/#",
            youtube: "https://www.youtube.com/@NUMMIRacing",
            email: "mailto:nummi.racing45@gmail.com"
        }
    };
    
    saveWebsiteData();
}

// Save data to localStorage
function saveWebsiteData() {
    localStorage.setItem('nummiRacingData', JSON.stringify(websiteData));
}

// Setup event listeners
function setupEventListeners() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });


    
    // Gallery filters
    setupGalleryFilters();
    
    // Setup flip card interactions
    setupFlipCards();
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    
    if (darkModeToggle && darkModeIcon) {
        // Check for saved dark mode preference
        const darkMode = localStorage.getItem('darkMode');
                        if (darkMode === 'light') {
                    document.body.classList.add('light-mode');
                    switchThemeIcon(darkModeIcon, true);
                } else {
                    switchThemeIcon(darkModeIcon, false);
                }
        
        // Toggle dark/light mode
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
                            if (document.body.classList.contains('light-mode')) {
                    localStorage.setItem('darkMode', 'light');
                    switchThemeIcon(darkModeIcon, true);
                } else {
                    localStorage.setItem('darkMode', 'dark');
                    switchThemeIcon(darkModeIcon, false);
                }
        });
        
        // Function to switch theme icons
        function switchThemeIcon(iconElement, isLightMode) {
            if (isLightMode) {
                iconElement.textContent = '☀'; // Sun for light mode
            } else {
                iconElement.textContent = '☾'; // Moon for dark mode
            }
        }
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
}

// Setup admin panel functionality
function setupAdminPanel() {
    const loadContentBtn = document.getElementById('load-content');
    const saveContentBtn = document.getElementById('save-content');
    const editSection = document.getElementById('edit-section');
    const contentTextarea = document.getElementById('content-textarea');
    const uploadImagesBtn = document.getElementById('upload-images');
    const updateCountdownBtn = document.getElementById('update-countdown');
    const updateSocialsBtn = document.getElementById('update-socials');

    // Load content for editing
    loadContentBtn.addEventListener('click', function() {
        const section = editSection.value;
        loadContentForEditing(section);
    });

    // Save content changes
    saveContentBtn.addEventListener('click', function() {
        const section = editSection.value;
        const content = contentTextarea.value;
        saveContentChanges(section, content);
    });

    // Upload images
    uploadImagesBtn.addEventListener('click', function() {
        const imageSection = document.getElementById('image-section').value;
        const fileInput = document.getElementById('image-upload');
        handleImageUpload(imageSection, fileInput.files);
    });

    // Update countdown
    updateCountdownBtn.addEventListener('click', function() {
        const nextRaceDate = document.getElementById('next-race-date').value;
        updateNextRaceDate(nextRaceDate);
    });

    // Update social links
    updateSocialsBtn.addEventListener('click', function() {
        updateSocialMediaLinks();
    });
}

// Setup admin security
function setupAdminSecurity() {
    const adminToggle = document.getElementById('admin-toggle');
    const adminPanel = document.getElementById('admin-panel');
    
    // Check if admin is already logged in (from session)
    const savedLogin = sessionStorage.getItem('adminLoggedIn');
    if (savedLogin === 'true') {
        isAdminLoggedIn = true;
        showAdminPanel();
    }
    
    // Add click handler for admin toggle
    adminToggle.addEventListener('click', function() {
        if (isAdminLoggedIn) {
            adminPanel.classList.toggle('open');
        } else {
            showLoginPrompt();
        }
    });
}

// Show login prompt
function showLoginPrompt() {
    const password = prompt("Enter admin password:");
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
        showNotification('Admin access granted!', 'success');
    } else if (password !== null) {
        showNotification('Incorrect password!', 'error');
    }
}

// Show admin panel
function showAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.classList.add('open');
}

// Logout function
function logoutAdmin() {
    isAdminLoggedIn = false;
    sessionStorage.removeItem('adminLoggedIn');
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.classList.remove('open');
    showNotification('Logged out successfully', 'info');
}

// Load content for editing
function loadContentForEditing(section) {
    const textarea = document.getElementById('content-textarea');
    
    switch(section) {
        case 'about':
            textarea.value = document.querySelector('.about-text').innerHTML;
            break;
        case 'drivers':
            textarea.value = JSON.stringify(websiteData.drivers, null, 2);
            break;
        case 'crew':
            textarea.value = JSON.stringify(websiteData.crew, null, 2);
            break;
        case 'car':
            textarea.value = document.querySelector('.car-details').innerHTML;
            break;
        case 'schedule':
            textarea.value = JSON.stringify(websiteData.schedule, null, 2);
            break;
        case 'merch':
            textarea.value = JSON.stringify(websiteData.merch, null, 2);
            break;
        case 'sponsors':
            textarea.value = JSON.stringify(websiteData.sponsors, null, 2);
            break;
        case 'contact':
            textarea.value = JSON.stringify(websiteData.socialLinks, null, 2);
            break;
    }
}

// Save content changes
function saveContentChanges(section, content) {
    try {
        switch(section) {
            case 'about':
                document.querySelector('.about-text').innerHTML = content;
                break;
            case 'drivers':
                websiteData.drivers = JSON.parse(content);
                renderDrivers();
                break;
            case 'crew':
                websiteData.crew = JSON.parse(content);
                renderCrew();
                break;
            case 'car':
                document.querySelector('.car-details').innerHTML = content;
                break;
            case 'schedule':
                websiteData.schedule = JSON.parse(content);
                renderSchedule();
                break;
            case 'merch':
                websiteData.merch = JSON.parse(content);
                renderMerch();
                break;
            case 'sponsors':
                websiteData.sponsors = JSON.parse(content);
                renderSponsors();
                break;
            case 'contact':
                websiteData.socialLinks = JSON.parse(content);
                renderSocialLinks();
                break;
        }
        
        saveWebsiteData();
        showNotification('Content updated successfully!', 'success');
    } catch (error) {
        showNotification('Error updating content. Please check your input.', 'error');
    }
}

// Handle image upload
function handleImageUpload(section, files) {
    if (files.length === 0) {
        showNotification('Please select images to upload.', 'warning');
        return;
    }

    // In a real application, you would upload to a server
    // For now, we'll simulate the process
    showNotification(`Processing ${files.length} images for ${section}...`, 'info');
    
    // Simulate upload delay
    setTimeout(() => {
        showNotification('Images uploaded successfully! (Demo mode)', 'success');
        // Refresh the relevant section
        switch(section) {
            case 'gallery':
                renderGallery();
                break;
            case 'drivers':
                renderDrivers();
                break;
            case 'crew':
                renderCrew();
                break;
            case 'car':
                // Refresh car images
                break;
        }
    }, 2000);
}



// Update next race date
function updateNextRaceDate(dateString) {
    if (!dateString) {
        showNotification('Please select a date and time.', 'warning');
        return;
    }
    
    websiteData.nextRaceDate = dateString;
    saveWebsiteData();
    startCountdown();
    showNotification('Countdown updated successfully!', 'success');
}

// Update social media links
function updateSocialMediaLinks() {
    const facebook = document.getElementById('facebook-url').value;
    const instagram = document.getElementById('instagram-url').value;
    const twitter = document.getElementById('twitter-url').value;
    const youtube = document.getElementById('youtube-url').value;
    
    websiteData.socialLinks = {
        facebook: facebook || websiteData.socialLinks.facebook,
        instagram: instagram || websiteData.socialLinks.instagram,
        twitter: twitter || websiteData.socialLinks.twitter,
        youtube: youtube || websiteData.socialLinks.youtube
    };
    
    saveWebsiteData();
    renderSocialLinks();
    showNotification('Social media links updated!', 'success');
}

// Setup gallery filters
function setupGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterGallery(filter);
        });
    });
}

// Filter gallery images
function filterGallery(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-race') === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Setup flip card interactions for mobile
function setupFlipCards() {
    // Remove existing event listeners first
    const driverCards = document.querySelectorAll('.driver-card');
    const crewCards = document.querySelectorAll('.crew-card');
    
    [...driverCards, ...crewCards].forEach(card => {
        // Clone the card to remove all event listeners
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
    });
    
    // Re-select cards after cloning
    const newDriverCards = document.querySelectorAll('.driver-card');
    const newCrewCards = document.querySelectorAll('.crew-card');
    
    [...newDriverCards, ...newCrewCards].forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't prevent default if clicking on a link
            if (e.target.closest('.instagram-link')) {
                return; // Allow the link to work normally
            }
            
            e.preventDefault();
            // Toggle flipped class
            this.classList.toggle('flipped');
        });
        
        // Only remove flipped class on mouseleave for devices with hover capability
        card.addEventListener('mouseleave', function() {
            if (window.matchMedia('(hover: hover)').matches) {
                this.classList.remove('flipped');
            }
        });
    });
}

// Render drivers section
function renderDrivers() {
    const driversGrid = document.getElementById('drivers-grid');
    if (!driversGrid) return;
    
    driversGrid.innerHTML = websiteData.drivers.map(driver => `
        <div class="driver-card fade-in">
            <div class="flip-card">
                <div class="flip-card-front">
                    <img src="${driver.image}" alt="${driver.name}" class="driver-image" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22><rect width=%22200%22 height=%22200%22 fill=%22%237A9292%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2218%22>No Image</text></svg>';">
                    <div class="driver-info-front">
                        <h3 class="driver-name">${driver.name}</h3>
                        <p class="driver-role">${driver.role}</p>
                    </div>
                </div>
                <div class="flip-card-back">
                    <div class="back-top-content">
                        <img src="${driver.image}" alt="${driver.name}" class="driver-image-small" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%237A9292%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2212%22>No Image</text></svg>';">
                        <h3 class="driver-name">${driver.name}</h3>
                        <p class="about-label">About ${driver.name.split(' ')[0]}:</p>
                    </div>
                    <div class="back-content-area">
                        <!-- Blank space for future content -->
                    </div>
                    <div class="back-bottom-content">
                        <a href="https://www.instagram.com/${driver.instagram}/" target="_blank" rel="noopener" class="instagram-link">
                            <i class="fab fa-instagram"></i>
                            @${driver.instagram}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Setup flip interactions after rendering drivers
    setupFlipCards();
}

// Render crew section
function renderCrew() {
    const crewGrid = document.getElementById('crew-grid');
    if (!crewGrid) return;
    
    crewGrid.innerHTML = websiteData.crew.map(member => `
        <div class="crew-card fade-in">
            <div class="flip-card">
                <div class="flip-card-front">
                    <img src="${member.image}" alt="${member.name}" class="crew-image" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22><rect width=%22200%22 height=%22200%22 fill=%22%237A9292%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2218%22>No Image</text></svg>';">
                    <div class="crew-info-front">
                        <h3 class="crew-name">${member.name}</h3>
                        <p class="crew-role">${member.role}</p>
                    </div>
                </div>
                <div class="flip-card-back">
                    <div class="back-top-content">
                        <img src="${member.image}" alt="${member.name}" class="crew-image-small" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%237A9292%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2212%22>No Image</text></svg>';">
                        <h3 class="crew-name">${member.name}</h3>
                        <p class="about-label">About ${member.name.split(' ')[0]}:</p>
                    </div>
                    <div class="back-content-area">
                        <!-- Blank space for future content -->
                    </div>
                    <div class="back-bottom-content">
                        <a href="https://www.instagram.com/${member.instagram}/" target="_blank" rel="noopener" class="instagram-link">
                            <i class="fab fa-instagram"></i>
                            @${member.instagram}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Setup flip interactions after rendering crew
    setupFlipCards();
}

// Render schedule section
function renderSchedule() {
    const upcomingRaces = document.getElementById('upcoming-races');
    const previousResults = document.getElementById('previous-results');
    
    if (upcomingRaces) {
        const upcoming = websiteData.schedule.filter(race => race.status === 'upcoming');
        upcomingRaces.innerHTML = upcoming.map(race => `
            <div class="race-item">
                <div class="race-date">${formatDate(race.date)}</div>
                <div class="race-location">${race.location}</div>
                <div class="race-event">${race.event}</div>
                <span class="race-status ${race.status}">Upcoming</span>
            </div>
        `).join('');
    }
    
    if (previousResults) {
        const completed = websiteData.schedule.filter(race => race.status === 'completed');
        previousResults.innerHTML = completed.map(race => `
            <div class="result-item">
                <div class="result-date">${formatDate(race.date)}</div>
                <div class="result-location">${race.location}</div>
                <div class="result-event">${race.event}</div>
                <span class="result-position ${getResultClass(race.result)}">${race.result}</span>
            </div>
        `).join('');
    }
}

// Render gallery section
function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = websiteData.gallery.map(item => `
        <div class="gallery-item fade-in" data-race="${item.race}">
            <img src="${item.image}" alt="Gallery Image" onerror="this.src='images/placeholder.jpg'">
            <div class="gallery-overlay">
                <p>${item.caption}</p>
            </div>
        </div>
    `).join('');
}

// Render merch section
function renderMerch() {
    const merchGrid = document.getElementById('merch-grid');
    if (!merchGrid) return;
    
    merchGrid.innerHTML = websiteData.merch.map(item => `
        <div class="merch-item fade-in">
            <img src="${item.image}" alt="${item.name}" class="merch-image" onerror="this.src='images/placeholder.jpg'">
            <div class="merch-info">
                <h3 class="merch-name">${item.name}</h3>
                <p class="merch-price">${item.price}</p>
                <p class="merch-description">${item.description}</p>
                <button class="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Render sponsors section
function renderSponsors() {
    const sponsorsGrid = document.getElementById('sponsors-grid');
    if (!sponsorsGrid) return;
    
    sponsorsGrid.innerHTML = websiteData.sponsors.map(sponsor => `
        <div class="sponsor-item fade-in">
            <img src="${sponsor.logo}" alt="${sponsor.name}" class="sponsor-logo" onerror="this.src='images/placeholder.jpg'">
            <h3 class="sponsor-name">${sponsor.name}</h3>
            <p class="sponsor-description">${sponsor.description}</p>
        </div>
    `).join('');
}

// Render social links
function renderSocialLinks() {
    const socialLinks = ['facebook', 'instagram', 'twitter', 'youtube'];
    
    socialLinks.forEach(platform => {
        const link = document.getElementById(`${platform}-link`);
        const footerLink = document.getElementById(`footer-${platform}`);
        
        if (link && websiteData.socialLinks[platform]) {
            link.href = websiteData.socialLinks[platform];
        }
        
        if (footerLink && websiteData.socialLinks[platform]) {
            footerLink.href = websiteData.socialLinks[platform];
        }
    });
}

// Start countdown timer for dual races
function startCountdown() {
    // Race 1: Enduro Elite Race 8 - September 26, 2025 at 1:00 PM
    const race1Date = new Date('2025-09-26T13:00:00').getTime();
    
    // Race 2: NASA 25hrs of Ozarks - November 15, 2025 at 12:00 PM
    const race2Date = new Date('2025-11-15T12:00:00').getTime();
    
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        
        // Calculate time for Race 1
        const distance1 = race1Date - now;
        if (distance1 > 0) {
            const days1 = Math.floor(distance1 / (1000 * 60 * 60 * 24));
            const hours1 = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes1 = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60));
            const seconds1 = Math.floor((distance1 % (1000 * 60)) / 1000);
            
            document.getElementById('days1').textContent = days1.toString().padStart(2, '0');
            document.getElementById('hours1').textContent = hours1.toString().padStart(2, '0');
            document.getElementById('minutes1').textContent = minutes1.toString().padStart(2, '0');
            document.getElementById('seconds1').textContent = seconds1.toString().padStart(2, '0');
        } else {
            document.getElementById('countdown-race1').innerHTML = '<h3>Race 1 Complete!</h3>';
        }
        
        // Calculate time for Race 2
        const distance2 = race2Date - now;
        if (distance2 > 0) {
            const days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
            const hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
            const seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);
            
            document.getElementById('days2').textContent = days2.toString().padStart(2, '0');
            document.getElementById('hours2').textContent = hours2.toString().padStart(2, '0');
            document.getElementById('minutes2').textContent = minutes2.toString().padStart(2, '0');
            document.getElementById('seconds2').textContent = seconds2.toString().padStart(2, '0');
        } else {
            document.getElementById('countdown-race2').innerHTML = '<h3>Race 2 Complete!</h3>';
        }
        
        // Stop countdown if both races are complete
        if (distance1 < 0 && distance2 < 0) {
            clearInterval(countdown);
        }
    }, 1000);
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getResultClass(result) {
    if (result.includes('1st') || result.includes('First')) return 'first';
    if (result.includes('2nd') || result.includes('Second')) return 'second';
    if (result.includes('3rd') || result.includes('Third')) return 'third';
    return '';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Load website data (placeholder for future server integration)
function loadWebsiteData() {
    // In a real application, this would fetch data from a server
    // For now, we're using the default data loaded in initializeWebsite()
    console.log('Website data loaded');
}

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    // Close mobile menu if screen becomes large
    if (window.innerWidth > 768) {
        document.getElementById('nav-menu').classList.remove('active');
    }
    

});

// Add loading states for better UX
function showLoading(element) {
    element.classList.add('loading');
    element.innerHTML = '<div class="spinner"></div>';
}

function hideLoading(element, content) {
    element.classList.remove('loading');
    element.innerHTML = content;
}

// Export functions for potential external use
window.NummiRacing = {
    getData: () => websiteData
};
