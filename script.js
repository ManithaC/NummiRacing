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

    // Initialize track canvases after a delay to ensure DOM is ready
    setTimeout(() => {
        initializeTrackCanvases();
    }, 2000);
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
    
    // Setup easter eggs after a small delay to ensure DOM is ready
    setTimeout(() => {
        console.log('Delayed easter egg setup...');
        setupEasterEggs();
    }, 1000);
    
    // Setup digital counter animations
    setTimeout(() => {
        setupDigitalCounters();
    }, 1500);
}

// Load default data structure - now using actual team data
function loadDefaultData() {
    websiteData = {
        drivers: [
            {
                id: 1,
                name: "Vinh Pham",
                role: "Team Principal, Driver",
                image: "images/vinh.jpg",
                bio: "Over 30 years of motorsports experience from karts to international FIA eRallys, Targa Newfoundland, autocross, time attacks and Formula SAE, Vinh is an academically trained engineer (University of Toronto), father of two boys and leader at Toyota Canada Inc. With over 20 years of automotive industry experience from manufacturing, quality, government relations, PR & public speaking, dealership liaison, product planning, marketing and inventory management, Vinh's breadth in the auto industry helps nummi racing operate with precision. Vinh daily drives a GR Supra & Toyota Land Cruiser.",
                instagram: "vphamracing"
            },
            {
                id: 2,
                name: "Patrick Alex",
                role: "Driver", 
                image: "images/patrick.jpg",
                bio: "",
                instagram: "patrick.drives"
            },
            {
                id: 3,
                name: "Hung Nguyen",
                role: "Driver",
                image: "images/hung.jpg", 
                bio: "",
                instagram: "frdriver"
            },
            {
                id: 4,
                name: "Nick Maitland",
                role: "Driver",
                image: "images/nick.jpg",
                bio: "",
                instagram: "heavymanufacturing"
            },
            {
                id: 5,
                name: "Jason Li",
                role: "Guest Driver",
                image: "images/jason.jpg",
                bio: "",
                instagram: "driven.by.jay"
            },
            {
                id: 6,
                name: "Paul Joakim",
                role: "Guest Driver", 
                image: "images/paul.jpg",
                bio: "",
                instagram: "paul_joakim"
            }
        ],
        crew: [
            {
                id: 1,
                name: "Adam Mann",
                role: "Technical Director",
                image: "images/adam.jpg?v=3",
                bio: "Tinkering with cars from a small age, Adam has been building winning race cars for over a decade. Father of two girls and Tech Support in the Product Quality area of Toyota Canada Inc. Adam has a busy schedule ensuring all things run smoothly at nummi racing. With decades of experience as a technician and shop foreman, Adam's prowess turning wrenches and problem solving are key to the wisdom gained on the 86 chassis. An agile and straight forward thinker, Adam's no stranger to tough motorsport challenges. He enjoys endurance and sportscar racing while relaxing by the campfire. Adam daily drives a Toyota Tundra & Toyota Prius PHEV.",
                instagram: "mann.motorsport"
            },
            {
                id: 2,
                name: "Joseph Yang",
                role: "Race Engineer",
                image: "images/joseph.jpg",
                bio: "",
                instagram: "jsph.yang"
            },
            {
                id: 3,
                name: "Amando Widjaja",
                role: "Race Strategy",
                image: "images/amando_web.jpg",
                bio: "",
                instagram: "amandowidjaja"
            },
            {
                id: 4,
                name: "Manitha Chandrasena",
                role: "Systems Engineer",
                image: "images/manitha.jpg",
                bio: "",
                instagram: "manitha_c"
            },
            {
                id: 5,
                name: "Luke Pham",
                role: "Crew",
                image: "images/luke.jpg",
                bio: "",
                instagram: "lukephamracing"
            }
        ],
        schedule: [
            {
                id: 1,
                date: "2025-09-26T13:00:00",
                location: "Shannonville Motorsports Park",
                event: "Enduro Elite Race 8",
                status: "upcoming",
                link: "https://enduroelite.ca/schedule"
            },
            {
                id: 2,
                date: "2025-11-15T12:00:00",
                location: "Ozarks International Raceway",
                event: "NASA 25hrs of Ozarks",
                status: "upcoming",
                link: "https://drivenasa.com/25-hour/"
            }
        ],
        gallery: [],
        merch: [],
        sponsors: [
            {
                id: 1,
                name: "BSQUARED",
                logo: "images/bsquared.png",
                website: "https://b-squared.io"
            },
            {
                id: 2,
                name: "BuildRegistry",
                logo: "images/buildregistry_web.png",
                website: "https://www.buildregistry.co"
            },
            {
                id: 3,
                name: "MannMotorsports",
                logo: "images/mann.jpg",
                website: "https://www.instagram.com/mann.motorsport/"
            },
            {
                id: 4,
                name: "VP Engineering & Electrical",
                logo: "images/vpsponsor.png",
                website: "https://www.instagram.com/vphamracing/"
            },
            {
                id: 5,
                name: "SPEEDACADEMY",
                logo: "images/speedacademy.png",
                website: "http://speed.academy/"
            },
            {
                id: 6,
                name: "JRP",
                logo: "images/jrp.png",
                website: "https://www.jrponline.com/"
            },
            {
                id: 7,
                name: "OCTANE VISION",
                logo: "images/octane.png",
                website: "https://www.youtube.com/@Octane.Vision"
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
    
    // Setup sponsor form functionality
    setupSponsorForm();
    

    
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
        <div class="driver-card fade-in" data-driver="${driver.name.toLowerCase()}">
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
                        <img src="${driver.image}" alt="${driver.name}" class="driver-image-small" data-driver="${driver.name.toLowerCase()}" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%237A9292%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2212%22>No Image</text></svg>';">
                        <h3 class="driver-name">${driver.name}</h3>
                    </div>
                    <div class="back-content-area">
                        ${driver.bio ? `<p class="driver-bio">${driver.bio}</p>` : ''}
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
        <div class="crew-card fade-in" data-crew="${member.name.toLowerCase()}">
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
                        <img src="${member.image}" alt="${member.name}" class="crew-image-small" data-crew="${member.name.toLowerCase()}" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%237A9292%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2212%22>No Image</text></svg>';">
                        <h3 class="crew-name">${member.name}</h3>
                    </div>
                    <div class="back-content-area">
                        ${member.bio ? `<p class="crew-bio">${member.bio}</p>` : ''}
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
            <a href="${race.link}" target="_blank" rel="noopener noreferrer" class="race-item">
                <div class="race-date">${formatDate(race.date)}</div>
                <div class="race-location">${race.location}</div>
                <div class="race-event">${race.event}</div>

            </a>
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
            <img src="${item.image}" alt="Gallery Image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
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
            <img src="${item.image}" alt="${item.name}" class="merch-image" onerror="this.style.display='none'; this.parentElement.querySelector('.merch-info').style.marginTop='20px';">
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
        <a href="${sponsor.website}" class="sponsor-item fade-in" target="_blank" rel="noopener">
            <img src="${sponsor.logo}" alt="${sponsor.name}" class="sponsor-logo" onerror="this.style.display='none'; this.nextElementSibling.style.marginTop='10px';">
        </a>
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
    // Race 1: Enduro Elite Race 8 - September 26, 2025 at 1:00 PM EST
    const race1Date = new Date('2025-09-26T18:00:00Z').getTime(); // 1:00 PM EST = 6:00 PM UTC
    
    // Race 2: NASA 25hrs of Ozarks - November 15, 2025 at 11:00 AM CT
    const race2Date = new Date('2025-11-15T17:00:00Z').getTime(); // 11:00 AM CT = 5:00 PM UTC
    
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        
        // Calculate time for Race 1
        const distance1 = race1Date - now;
        if (distance1 > 0) {
            const months1 = Math.floor(distance1 / (1000 * 60 * 60 * 24 * 30.44)); // Average month length
            const days1 = Math.floor((distance1 % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
            const hours1 = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes1 = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60));
            const seconds1 = Math.floor((distance1 % (1000 * 60)) / 1000);
            
            document.getElementById('months1').textContent = months1.toString().padStart(2, '0');
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
            const months2 = Math.floor(distance2 / (1000 * 60 * 60 * 24 * 30.44)); // Average month length
            const days2 = Math.floor((distance2 % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
            const hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
            const seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);
            
            document.getElementById('months2').textContent = months2.toString().padStart(2, '0');
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

// Setup sponsor form functionality
function setupSponsorForm() {
    const becomeSponsorBtn = document.getElementById('become-sponsor-btn');
    const sponsorForm = document.getElementById('sponsor-form');
    const cancelBtn = document.getElementById('cancel-sponsor-btn');
    const contactForm = document.getElementById('sponsor-contact-form');
    
    if (!becomeSponsorBtn || !sponsorForm || !cancelBtn || !contactForm) return;
    
    // Toggle form visibility
    becomeSponsorBtn.addEventListener('click', function() {
        const isVisible = sponsorForm.style.display !== 'none';
        
        if (isVisible) {
            sponsorForm.style.display = 'none';
            becomeSponsorBtn.classList.remove('active');
        } else {
            sponsorForm.style.display = 'block';
            becomeSponsorBtn.classList.add('active');
            // Smooth scroll to form
            sponsorForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    
    // Cancel button
    cancelBtn.addEventListener('click', function() {
        sponsorForm.style.display = 'none';
        becomeSponsorBtn.classList.remove('active');
        contactForm.reset();
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('sponsor-email').value;
        const company = document.getElementById('sponsor-company').value;
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate required fields
        if (!email.trim() || !company.trim()) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Submit form data to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                sponsorForm.style.display = 'none';
                becomeSponsorBtn.classList.remove('active');
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try again or contact us directly.', 'error');
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Setup easter eggs
function setupEasterEggs() {
    console.log('Setting up easter eggs...');
    
    // Vinh's card easter egg - 5 flips in 5 seconds changes image to vpee
    let vinhTapCount = 0;
    let vinhTapTimer = null;
    let vinhOriginalImage = null;
    let vinhCard = null;
    
    // Find Vinh's card (both in drivers and crew sections)
    const vinhDriverCard = document.querySelector('.driver-card[data-driver="vinh pham"]');
    const vinhCrewCard = document.querySelector('.crew-card[data-crew="vinh pham"]');
    
    console.log('Vinh driver card found:', vinhDriverCard);
    console.log('Vinh crew card found:', vinhCrewCard);
    
    if (vinhDriverCard) {
        vinhCard = vinhDriverCard;
        vinhOriginalImage = vinhDriverCard.querySelector('img').src;
        console.log('Setting up easter egg for Vinh driver card');
        setupVinhEasterEgg(vinhDriverCard, vinhOriginalImage);
    }
    
    if (vinhCrewCard) {
        vinhCard = vinhCrewCard;
        vinhOriginalImage = vinhCrewCard.querySelector('img').src;
        console.log('Setting up easter egg for Vinh crew card');
        setupVinhEasterEgg(vinhCrewCard, vinhOriginalImage);
    }
    
    console.log('Easter egg setup complete');
}

function setupVinhEasterEgg(card, originalImage) {
    let flipCount = 0;
    let flipTimer = null;
    
    console.log('=== SETUP VINH EASTER EGG ===');
    console.log('Setting up Vinh easter egg for card:', card);
    console.log('Original image:', originalImage);
    console.log('Card element:', card.outerHTML);
    
    // Watch for actual card flips by monitoring the flipped class
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isFlipped = card.classList.contains('flipped');
                if (isFlipped) {
                    flipCount++;
                    console.log('Vinh card flipped! Flip count:', flipCount);
                    
                    // Clear existing timer
                    if (flipTimer) {
                        clearTimeout(flipTimer);
                    }
                    
                    // Set timer to reset flip count after 5 seconds
                    flipTimer = setTimeout(() => {
                        console.log('5 seconds passed, resetting flip count');
                        flipCount = 0;
                    }, 5000);
                    
                    // Every 5th flip triggers the easter egg
                    if (flipCount === 5) {
                        console.log('5th flip! Triggering easter egg...');
                        const img = card.querySelector('img');
                        console.log('Current image src:', img.src);
                        
                        if (img.src.includes('vinh.jpg')) {
                            console.log('Changing to vpee image...');
                            // Change to vpee image
                            img.src = 'images/VPEE.jpg';
                            img.alt = 'Vpee Easter Egg';
                            
                            // Reset after 5 seconds
                            setTimeout(() => {
                                console.log('Resetting to original image...');
                                img.src = originalImage;
                                img.alt = 'Vinh Pham';
                            }, 5000);
                        } else {
                            console.log('Image is not vinh.jpg, current src:', img.src);
                        }
                        flipCount = 0; // Reset counter after easter egg
                    }
                }
            }
        });
    });
    
    // Start observing the card for class changes
    observer.observe(card, { attributes: true });
}

// Setup digital counter animations
function setupDigitalCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const animationOrder = [1, 5, 16, 250, 33]; // Order we want them to animate
    let currentAnimationIndex = 0;
    let animationStarted = false;
    
    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1200; // 1.2 seconds (reduced from 2 seconds)
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                // Special case for hours racing - show 250+ at the end
                if (target === 250) {
                    counter.textContent = '250+';
                } else {
                    counter.textContent = target;
                }
                
                // When this counter finishes, start the next one
                currentAnimationIndex++;
                if (currentAnimationIndex < animationOrder.length) {
                    startNextAnimation();
                }
            }
        };
        
        // Store the update function for later use
        counter.updateCounter = updateCounter;
    });
    
    // Function to start the next animation in sequence
    function startNextAnimation() {
        const nextTarget = animationOrder[currentAnimationIndex];
        const nextCounter = Array.from(counters).find(counter => 
            parseInt(counter.getAttribute('data-target')) === nextTarget
        );
        
        if (nextCounter && nextCounter.updateCounter) {
            nextCounter.updateCounter();
        }
    }
    
    // Start animation when element comes into view and user has scrolled to it
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted) {
                // Only start the first animation (Championship Win = 1) when scrolled to
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (target === 1) {
                    animationStarted = true;
                    entry.target.updateCounter();
                }
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Track drawing functionality for results page
function initializeTrackCanvases() {
    // SMP Pro track coordinates (from the path file)
    const smpProCoordinates = [
        [-77.15940169908536, 44.22500133703493],
        [-77.15985781230157, 44.22489946628535],
        [-77.16028172929077, 44.22476491974215],
        [-77.16060905759886, 44.2246745811763],
        [-77.16105980477722, 44.22466112648443],
        [-77.16157762742854, 44.22468803586509],
        [-77.1618003179988, 44.22479567326485],
        [-77.16228594442312, 44.22512242845135],
        [-77.16235033687718, 44.225293493678606],
        [-77.16276083877177, 44.22594699671136],
        [-77.16291108783123, 44.226154578509394],
        [-77.1631954878366, 44.22622377227941],
        [-77.16379648407442, 44.22629488801382],
        [-77.16434650295278, 44.22629488801382],
        [-77.16488310673654, 44.22627758959984],
        [-77.16521043504464, 44.22626221322759],
        [-77.16633730299057, 44.22617764310843],
        [-77.16669951054459, 44.22613728005419],
        [-77.16708318225, 44.226179565157956],
        [-77.16738368036891, 44.22633525096],
        [-77.16754734452294, 44.22650631266277],
        [-77.16762246905267, 44.22671965858425],
        [-77.16756075961754, 44.226900329300435],
        [-77.16749368414457, 44.22719439853564],
        [-77.16744538980404, 44.227528828429456],
        [-77.16749636716351, 44.227669134658186],
        [-77.16847298604995, 44.22802085976149],
        [-77.16867152944994, 44.22809197332477],
        [-77.16876543511212, 44.228211136400375],
        [-77.16875470303643, 44.22830146953885],
        [-77.16859372190132, 44.22835336298123],
        [-77.16814834076077, 44.22843024207105],
        [-77.16115470804822, 44.22943734887378],
        [-77.16075829427837, 44.229364314990505],
        [-77.16073683012704, 44.229337407747515],
        [-77.16056511691623, 44.22922593475261],
        [-77.16031291313784, 44.22896454897114],
        [-77.15982460369463, 44.228583999949414],
        [-77.15946507915949, 44.22818999458198],
        [-77.1593658074595, 44.227972810007934],
        [-77.15942751689464, 44.227767156619514],
        [-77.15947312821626, 44.22762877262664],
        [-77.15948386029193, 44.22742504004506],
        [-77.15945434708384, 44.227227072804425],
        [-77.15938458859193, 44.22704063702729],
        [-77.1592869186891, 44.22673503483701],
        [-77.1592278922729, 44.22646210575352],
        [-77.15919569604587, 44.22628527778444],
        [-77.15909910736477, 44.225977749616526],
        [-77.15880934132156, 44.22598159372853],
        [-77.15836932621886, 44.22602772305314],
        [-77.15799906960807, 44.22595468493917],
        [-77.15785418658645, 44.2257586348167],
        [-77.15790248092698, 44.225577960596304],
        [-77.15806346206213, 44.22535500015567],
        [-77.15837469225669, 44.22527042873315],
        [-77.1593996054837, 44.22500133703493]
    ];

    // Mosport GP track coordinates (from the mosport.txt file)
    const mosportCoordinates = [
        [-78.67389462399622, 44.05426044773033],
        [-78.6736505478353, 44.054199726588124],
        [-78.67330846292313, 44.054113945820795],
        [-78.67311394405152, 44.05406768198457],
        [-78.67287917989611, 44.05401852661901],
        [-78.67242038366099, 44.05384792826901],
        [-78.67229025724343, 44.05375732781555],
        [-78.67197231950153, 44.05347588722497],
        [-78.67192536667045, 44.05340938223252],
        [-78.67183951006507, 44.05324456519018],
        [-78.67179658176237, 44.05310769922747],
        [-78.67179658176237, 44.05303637458632],
        [-78.67178316666778, 44.052871556505885],
        [-78.67178719119616, 44.05278095455869],
        [-78.67182475346102, 44.0526614368844],
        [-78.67187036478265, 44.052534208127355],
        [-78.67192268365156, 44.05243493095287],
        [-78.67207561572991, 44.05218914694075],
        [-78.67219098554344, 44.05207444738602],
        [-78.67225940252585, 44.051999266044746],
        [-78.67248745913398, 44.05171492549354],
        [-78.67256660819206, 44.05160215276126],
        [-78.67270545214568, 44.05143540294308],
        [-78.67277789365649, 44.051333232302305],
        [-78.67288789743215, 44.05120792844561],
        [-78.67299521818892, 44.051094190869264],
        [-78.67316156536188, 44.05090527034445],
        [-78.67344864838618, 44.050537066365294],
        [-78.67365792386185, 44.05024404376192],
        [-78.67369816914564, 44.0501592211588],
        [-78.67375987858078, 44.05004355377696],
        [-78.67378402575106, 44.04995294750339],
        [-78.67382963707266, 44.04983535192038],
        [-78.67382695405374, 44.04972739511402],
        [-78.6738054899024, 44.04954425365319],
        [-78.67375719556185, 44.04936496725351],
        [-78.67370890122133, 44.049289782472805],
        [-78.67363914272943, 44.0491625464726],
        [-78.67358279933214, 44.04906037191094],
        [-78.67347279555648, 44.04890614582368],
        [-78.67338157291323, 44.04880782648344],
        [-78.67305961064298, 44.04856684701814],
        [-78.67297375403756, 44.048514795324884],
        [-78.67281008988351, 44.048464671428874],
        [-78.67256593516188, 44.04838177412316],
        [-78.67215811628625, 44.0483104437905],
        [-78.67169127099436, 44.0482776703656],
        [-78.67124320683493, 44.048237185521586],
        [-78.6708273389025, 44.04821212346143],
        [-78.67022365964574, 44.048188989242625],
        [-78.66968437284308, 44.04813308150991],
        [-78.66948582944308, 44.04806560658981],
        [-78.66918533132416, 44.04789209929943],
        [-78.66909679169986, 44.04779570614071],
        [-78.66905118037823, 44.04772437510227],
        [-78.66901361811335, 44.04764147676048],
        [-78.66897068981066, 44.04755279468502],
        [-78.66896264075389, 44.04745254522242],
        [-78.6689492256593, 44.04732337739549],
        [-78.66895727471608, 44.04722698331128],
        [-78.66898142188633, 44.047113238090105],
        [-78.6690323992458, 44.0469782858495],
        [-78.6691021577377, 44.04687803541459],
        [-78.66916118415391, 44.046802847477075],
        [-78.66926313887281, 44.04668331773891],
        [-78.66934631245931, 44.04659077842113],
        [-78.66945095019713, 44.04648088779348],
        [-78.66960924831334, 44.0463459341122],
        [-78.6698051086944, 44.04623411511481],
        [-78.67039805587548, 44.04590251270896],
        [-78.6705858671998, 44.04578876494449],
        [-78.67096148984844, 44.04556898050966],
        [-78.6715249238214, 44.04522580669124],
        [-78.67204274647273, 44.0449269739379],
        [-78.6722386068538, 44.04480551245242],
        [-78.67237544081866, 44.04466477105462],
        [-78.67257398421866, 44.04442763068278],
        [-78.67273228233488, 44.04421555312338],
        [-78.6728771653565, 44.043945635131536],
        [-78.67291472762133, 44.04382609962792],
        [-78.67296033894296, 44.04367764390866],
        [-78.6729522898862, 44.04351954779854],
        [-78.67294155781055, 44.04328047483066],
        [-78.6728905804511, 44.04307996127491],
        [-78.6728530181862, 44.042800397973174],
        [-78.67279667478891, 44.04251504924265],
        [-78.67281545592134, 44.042372374361975],
        [-78.67291741064028, 44.042229699137714],
        [-78.67302741441596, 44.042169929684896],
        [-78.67320181064565, 44.04212172846933],
        [-78.67337084083753, 44.042090879670766],
        [-78.67355328612402, 44.04208316746865],
        [-78.6737357314105, 44.04208509551927],
        [-78.67386988235646, 44.042114016271206],
        [-78.67393427481049, 44.042241267411946],
        [-78.67395573896185, 44.04241671929412],
        [-78.67395573896185, 44.042617235094646],
        [-78.67396915405645, 44.042829318375915],
        [-78.67400939934024, 44.04301248059874],
        [-78.67415696538077, 44.04331903505201],
        [-78.67430721444022, 44.043546539847206],
        [-78.6744896597267, 44.043750907816616],
        [-78.67478210878885, 44.044036250594495],
        [-78.67523285596722, 44.044429558657114],
        [-78.67540725219695, 44.04460114812119],
        [-78.6757721427699, 44.0448961266001],
        [-78.6761558144753, 44.04522387874283],
        [-78.67653948618069, 44.045541989382485],
        [-78.67672729750501, 44.04571357562435],
        [-78.67699023335905, 44.04592179196943],
        [-78.67723438808068, 44.04620519637423],
        [-78.67743024846175, 44.046417266810614],
        [-78.67791319186715, 44.04696093482484],
        [-78.67833710885631, 44.04749881422626],
        [-78.67878517301574, 44.04801933802873],
        [-78.67916884472115, 44.048489733382155],
        [-78.67928153151574, 44.04868637295546],
        [-78.67943982963193, 44.04890421799504],
        [-78.67956861454005, 44.04921074195938],
        [-78.6797161805806, 44.04947678034067],
        [-78.67985033152654, 44.04982185733036],
        [-78.68019375794813, 44.05068357712334],
        [-78.6802876636103, 44.05094189784022],
        [-78.68044322768365, 44.05129082179589],
        [-78.6805076201377, 44.051485524325074],
        [-78.68054518240255, 44.051641671435455],
        [-78.68057201259175, 44.05189227704838],
        [-78.68055323145931, 44.05209083305027],
        [-78.68048078994852, 44.05226432804099],
        [-78.68033054088906, 44.05251300330795],
        [-78.68026078239717, 44.052597822540065],
        [-78.68018297484852, 44.052694207883626],
        [-78.68009980126202, 44.05278288226113],
        [-78.67988515974851, 44.05292938746353],
        [-78.67964100502691, 44.05305661537162],
        [-78.6793378238891, 44.05315685534908],
        [-78.6790963521864, 44.053201192208064],
        [-78.6787851219918, 44.05324360134649],
        [-78.67836388802156, 44.05327251665072],
        [-78.67804192575129, 44.05334191332329],
        [-78.67772532951886, 44.05350383857634],
        [-78.6775723974405, 44.053632992925046],
        [-78.67749995592969, 44.053792989712704],
        [-78.6773738540405, 44.053997322331064],
        [-78.67728799743509, 44.05423442439129],
        [-78.67722360498105, 44.054330807071224],
        [-78.67712165026212, 44.05451007843867],
        [-78.67702774459997, 44.054596822453874],
        [-78.67688822761619, 44.05468163870145],
        [-78.67661455968647, 44.054781875928356],
        [-78.67642674836215, 44.05476838246537],
        [-78.67625235213244, 44.05474332316884],
        [-78.67607527288378, 44.05472019150112],
        [-78.67586063137027, 44.05467007285669],
        [-78.67389329261056, 44.054261411557505]
    ];

    // Track data mapping with existing coordinates
    const trackData = {
        'smp-pro': smpProCoordinates,
        'mosport': mosportCoordinates
    };

    // Load track coordinates from files and initialize all canvases
    loadTrackCoordinates().then(fileTrackData => {
        // Merge file data with existing data
        const mergedTrackData = { ...trackData, ...fileTrackData };
        
        // Draw track on all canvases and setup dot animations
        const trackCanvases = document.querySelectorAll('.track-canvas');
        trackCanvases.forEach(canvas => {
            const trackType = canvas.getAttribute('data-track');
            const coordinates = mergedTrackData[trackType];
            
            if (coordinates && coordinates.length > 0) {
                drawTrackOnCanvas(canvas, coordinates);
            } else {
                console.warn(`No coordinates found for track type: ${trackType}`);
            }
        });
    }).catch(error => {
        console.error('Error loading track coordinates:', error);
        // Fallback to existing coordinates only
        const trackCanvases = document.querySelectorAll('.track-canvas');
        trackCanvases.forEach(canvas => {
            const trackType = canvas.getAttribute('data-track');
            const coordinates = trackData[trackType];
            
            if (coordinates) {
                drawTrackOnCanvas(canvas, coordinates);
            }
        });
    });
}

// Function to load track coordinates from text files
async function loadTrackCoordinates() {
    console.log('=== STARTING TRACK COORDINATE LOADING ===');
    
    const trackFiles = {
        'smp-long': 'smp-long.txt',
        'calabogie': 'calabogie.txt'
    };
    
    const trackData = {};
    
    console.log('Track files to load:', trackFiles);
    
    for (const [trackType, filename] of Object.entries(trackFiles)) {
        try {
            console.log(`\n--- Loading ${trackType} from ${filename} ---`);
            const response = await fetch(filename);
            console.log(`${trackType} response status:`, response.status);
            console.log(`${trackType} response ok:`, response.ok);
            
            if (response.ok) {
                const text = await response.text();
                console.log(`${trackType} file content length:`, text.length);
                console.log(`${trackType} file content (first 200 chars):`, text.substring(0, 200));
                
                const coordinates = parseTrackCoordinates(text);
                console.log(`${trackType}: Parsed ${coordinates.length} coordinates`);
                
                if (coordinates.length > 0) {
                    trackData[trackType] = coordinates;
                    console.log(`${trackType}: SUCCESS - Added to trackData`);
                    console.log(`${trackType}: First coordinate:`, coordinates[0]);
                    console.log(`${trackType}: Last coordinate:`, coordinates[coordinates.length - 1]);
                } else {
                    console.warn(`${trackType}: FAILED - No coordinates parsed from file`);
                }
            } else {
                console.error(`FAILED to load ${filename}: HTTP ${response.status}`);
            }
        } catch (error) {
            console.error(`ERROR loading ${filename}:`, error);
        }
    }
    
    console.log('\n=== FINAL TRACK DATA ===');
    console.log('trackData keys:', Object.keys(trackData));
    console.log('trackData:', trackData);
    return trackData;
}

// Function to parse track coordinates from text file
function parseTrackCoordinates(text) {
    const lines = text.trim().split('\n');
    const coordinates = [];
    
    // Look for the line that contains the actual coordinates
    let coordinateLine = '';
    for (const line of lines) {
        if (line.includes('Latitude,Longitude pairs:')) {
            // Get the next line which contains the coordinates
            const index = lines.indexOf(line);
            if (index + 1 < lines.length) {
                coordinateLine = lines[index + 1];
                break;
            }
        }
    }
    
    if (coordinateLine) {
        // Split by spaces and process each coordinate pair
        const pairs = coordinateLine.trim().split(/\s+/);
        
        for (const pair of pairs) {
            if (pair.includes(',')) {
                const [lng, lat] = pair.split(',');
                const longitude = parseFloat(lng);
                const latitude = parseFloat(lat);
                
                if (!isNaN(longitude) && !isNaN(latitude)) {
                    coordinates.push([longitude, latitude]);
                }
            }
        }
    }
    
    console.log(`Parsed ${coordinates.length} coordinates from track file`);
    return coordinates;
}

function drawTrackOnCanvas(canvas, coordinates) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate bounds
    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    coordinates.forEach(coord => {
        minLat = Math.min(minLat, coord[1]);
        maxLat = Math.max(maxLat, coord[1]);
        minLng = Math.min(minLng, coord[0]);
        maxLng = Math.max(maxLng, coord[0]);
    });
    
    // Add minimal padding to prevent cutoff
    const latPadding = (maxLat - minLat) * 0.05;
    const lngPadding = (maxLng - minLng) * 0.05;
    minLat -= latPadding;
    maxLat += latPadding;
    minLng -= lngPadding;
    maxLng += lngPadding;
    
    // Calculate scale based on the larger dimension to ensure consistent sizing
    const latRange = maxLat - minLat;
    const lngRange = maxLng - minLng;
    const maxRange = Math.max(latRange, lngRange);
    
    // Use other tracks as the reference size, make Mosport 15% smaller
    const trackType = canvas.getAttribute('data-track');
    let scale;
    
    if (trackType === 'mosport') {
        // Mosport size - reduced by 5% to prevent cutoff
        scale = (Math.min(width, height) * 1.045) / maxRange; // Smaller size
        console.log(`Mosport scaling: ${scale.toFixed(2)} (15% smaller than other tracks)`);
    } else {
        // All other tracks at full size
        scale = (Math.min(width, height) * 1.3) / maxRange; // Moderate size
        console.log(`${trackType} scaling: ${scale.toFixed(2)} (full size)`);
    }
    
    // Log the scaling information for debugging
    console.log(`${trackType}: latRange=${latRange.toFixed(6)}, lngRange=${lngRange.toFixed(6)}, scale=${scale.toFixed(2)}`);
    
    // Calculate offset to center
    const offsetX = (width - lngRange * scale) / 2;
    const offsetY = (height - latRange * scale) / 2;
    
    // Draw track path
    ctx.strokeStyle = '#808080'; // 50% grey
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    coordinates.forEach((coord, index) => {
        const x = (coord[0] - minLng) * scale + offsetX;
        // Flip Y coordinate: canvas Y increases downward, but we want latitude to increase upward
        const y = height - ((coord[1] - minLat) * scale + offsetY);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw start/finish line perpendicular to track
    if (coordinates.length > 1) {
        const startCoord = coordinates[0];
        const nextCoord = coordinates[1];
        
        const startX = (startCoord[0] - minLng) * scale + offsetX;
        const startY = height - ((startCoord[1] - minLat) * scale + offsetY);
        const nextX = (nextCoord[0] - minLng) * scale + offsetX;
        const nextY = height - ((nextCoord[1] - minLat) * scale + offsetY);
        
        // Calculate track direction
        const trackDx = nextX - startX;
        const trackDy = nextY - startY;
        const trackLength = Math.sqrt(trackDx * trackDx + trackDy * trackDy);
        
        if (trackLength > 0) {
            // Normalize track direction
            const trackUnitX = trackDx / trackLength;
            const trackUnitY = trackDy / trackLength;
            
            // Calculate perpendicular direction (rotate 90 degrees)
            const perpX = -trackUnitY;
            const perpY = trackUnitX;
            
            // Draw white finish line perpendicular to track
            const lineLength = 20;
            ctx.strokeStyle = '#808080'; // 50% grey
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(startX + perpX * lineLength, startY + perpY * lineLength);
            ctx.lineTo(startX - perpX * lineLength, startY - perpY * lineLength);
            ctx.stroke();
        }
    }
    
    // Start the moving dot animation
    startTrackAnimation(canvas, coordinates, minLat, minLng, maxLat, maxLng, scale, offsetX, offsetY, width, height);
}

// Animation function for moving dot on track
function startTrackAnimation(canvas, coordinates, minLat, minLng, maxLat, maxLng, scale, offsetX, offsetY, width, height) {
    if (!coordinates || coordinates.length < 2) return;
    
    // Stop any existing animation
    if (canvas.animationId) {
        cancelAnimationFrame(canvas.animationId);
    }
    
    // Get track type from canvas data attributes
    const trackType = canvas.getAttribute('data-track') || 'unknown';
    
    // Define lap times for each track (in seconds)
    const lapTimes = {
        'mosport': 95,      // 1:35
        'calabogie': 145,   // 2:25
        'smp-long': 118,    // 1:58
        'smp-pro': 98       // 1:38
    };
    
    const lapTimeSeconds = lapTimes[trackType] || 30;
    const dotRadius = 5;
    
    // Calculate total track distance in pixels and segment distances
    let totalDistance = 0;
    const segmentDistances = [];
    const canvasCoordinates = [];
    
    // Convert all coordinates to canvas coordinates and calculate distances
    for (let i = 0; i < coordinates.length; i++) {
        const coord = coordinates[i];
        const canvasX = (coord[0] - minLng) * scale + offsetX;
        const canvasY = height - ((coord[1] - minLat) * scale + offsetY);
        canvasCoordinates.push({ x: canvasX, y: canvasY });
        
        if (i > 0) {
            const prevCoord = canvasCoordinates[i - 1];
            const distance = Math.sqrt(
                Math.pow(canvasX - prevCoord.x, 2) + 
                Math.pow(canvasY - prevCoord.y, 2)
            );
            segmentDistances.push(distance);
            totalDistance += distance;
        }
    }
    
    // Add distance from last point back to first to complete the loop
    const lastToFirst = Math.sqrt(
        Math.pow(canvasCoordinates[0].x - canvasCoordinates[canvasCoordinates.length - 1].x, 2) + 
        Math.pow(canvasCoordinates[0].y - canvasCoordinates[canvasCoordinates.length - 1].y, 2)
    );
    segmentDistances.push(lastToFirst);
    totalDistance += lastToFirst;
    
    // Speed in pixels per frame (60 fps) - make it slower for smoother animation
    const pixelsPerFrame = totalDistance / (lapTimeSeconds * 60);
    
    console.log(`${trackType}: Lap time ${lapTimeSeconds}s, total distance: ${totalDistance.toFixed(2)}px, speed: ${pixelsPerFrame.toFixed(2)}px/frame`);
    
    let currentDistance = 0;
    let lastTime = performance.now();
    
    function animate(currentTime) {
        // Calculate time-based movement for smooth animation
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        // Speed in pixels per millisecond
        const pixelsPerMs = totalDistance / (lapTimeSeconds * 1000);
        const distanceIncrement = pixelsPerMs * deltaTime;
        
        // Clear previous dot by redrawing the track
        redrawTrack(canvas, coordinates, minLat, minLng, maxLat, maxLng, scale, offsetX, offsetY, width, height);
        
        // Find current position based on distance traveled
        let accumulatedDistance = 0;
        let currentSegment = 0;
        
        // Find which segment we're in
        while (currentSegment < segmentDistances.length && 
               accumulatedDistance + segmentDistances[currentSegment] < currentDistance) {
            accumulatedDistance += segmentDistances[currentSegment];
            currentSegment++;
        }
        
        // Handle wrap-around
        if (currentSegment >= segmentDistances.length) {
            currentSegment = 0;
            currentDistance = 0;
            accumulatedDistance = 0;
        }
        
        // Calculate position within current segment
        const segmentProgress = segmentDistances[currentSegment] > 0 ? 
            (currentDistance - accumulatedDistance) / segmentDistances[currentSegment] : 0;
        
        // Get current and next canvas coordinates
        const currentCoord = canvasCoordinates[currentSegment];
        const nextCoord = canvasCoordinates[(currentSegment + 1) % canvasCoordinates.length];
        
        // Interpolate position with sub-pixel precision
        const x = currentCoord.x + (nextCoord.x - currentCoord.x) * segmentProgress;
        const y = currentCoord.y + (nextCoord.y - currentCoord.y) * segmentProgress;
        
        // Draw animated dot
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ff0000'; // Bright red
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add red glow effect
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Add white border
        ctx.strokeStyle = '#808080'; // 50% grey
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Update distance traveled based on actual time elapsed
        currentDistance += distanceIncrement;
        
        // Reset when completing a lap
        if (currentDistance >= totalDistance) {
            currentDistance = 0;
        }
        
        // Continue animation
        canvas.animationId = requestAnimationFrame(animate);
    }
    
    // Start the animation
    animate(performance.now());
}

// Function to stop animation for a specific canvas
function stopTrackAnimation(canvas) {
    if (canvas.animationId) {
        cancelAnimationFrame(canvas.animationId);
        canvas.animationId = null;
    }
}

// Function to stop all track animations
function stopAllTrackAnimations() {
    const canvases = document.querySelectorAll('.track-canvas');
    canvases.forEach(canvas => stopTrackAnimation(canvas));
}

// Calculate corner angles for each point on the track
function calculateCornerAngles(coordinates) {
    const angles = [];
    
    for (let i = 0; i < coordinates.length; i++) {
        const prevIndex = (i - 1 + coordinates.length) % coordinates.length;
        const nextIndex = (i + 1) % coordinates.length;
        
        const prev = coordinates[prevIndex];
        const curr = coordinates[i];
        const next = coordinates[nextIndex];
        
        // Calculate vectors
        const v1 = [curr[0] - prev[0], curr[1] - prev[1]];
        const v2 = [next[0] - curr[0], next[1] - curr[1]];
        
        // Calculate angle between vectors (in radians)
        const dot = v1[0] * v2[0] + v1[1] * v2[1];
        const mag1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
        const mag2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
        
        if (mag1 > 0 && mag2 > 0) {
            const cosAngle = dot / (mag1 * mag2);
            const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle))); // Clamp to prevent NaN
            angles.push(angle);
        } else {
            angles.push(0); // Straight line
        }
    }
    
    return angles;
}

// Calculate speed multiplier based on corner angle
function calculateSpeedMultiplier(angle) {
    // Convert angle to degrees for easier understanding
    const degrees = angle * (180 / Math.PI);
    
    // More subtle speed characteristics:
    // - Straight sections (170-180°): 100% speed
    // - Fast corners (160-170°): 85% speed (gentle sweepers)
    // - Medium-fast corners (140-160°): 75% speed
    // - Medium corners (120-140°): 65% speed
    // - Tight corners (100-120°): 55% speed
    // - Hairpins (< 100°): 50% speed (minimum corner speed)
    
    if (degrees >= 170) {
        return 1.0; // Full speed on straights
    } else if (degrees >= 160) {
        return 0.85; // Fast sweeping corners
    } else if (degrees >= 140) {
        return 0.75; // Medium-fast corners
    } else if (degrees >= 120) {
        return 0.65; // Medium corners
    } else if (degrees >= 100) {
        return 0.55; // Tight corners
    } else {
        return 0.50; // Minimum speed for hairpins
    }
}

// Helper function to redraw just the track without the moving dot
function redrawTrack(canvas, coordinates, minLat, minLng, maxLat, maxLng, scale, offsetX, offsetY, width, height) {
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw track path
    ctx.strokeStyle = '#808080'; // 50% grey
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    coordinates.forEach((coord, index) => {
        const x = (coord[0] - minLng) * scale + offsetX;
        const y = height - ((coord[1] - minLat) * scale + offsetY);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw start/finish line perpendicular to track
    if (coordinates.length > 1) {
        const startCoord = coordinates[0];
        const nextCoord = coordinates[1];
        
        const startX = (startCoord[0] - minLng) * scale + offsetX;
        const startY = height - ((startCoord[1] - minLat) * scale + offsetY);
        const nextX = (nextCoord[0] - minLng) * scale + offsetX;
        const nextY = height - ((nextCoord[1] - minLat) * scale + offsetY);
        
        // Calculate track direction
        const trackDx = nextX - startX;
        const trackDy = nextY - startY;
        const trackLength = Math.sqrt(trackDx * trackDx + trackDy * trackDy);
        
        if (trackLength > 0) {
            // Normalize track direction
            const trackUnitX = trackDx / trackLength;
            const trackUnitY = trackDy / trackLength;
            
            // Calculate perpendicular direction (rotate 90 degrees)
            const perpX = -trackUnitY;
            const perpY = trackUnitX;
            
            // Draw white finish line perpendicular to track
            const lineLength = 20;
            ctx.strokeStyle = '#808080'; // 50% grey
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(startX + perpX * lineLength, startY + perpY * lineLength);
            ctx.lineTo(startX - perpX * lineLength, startY - perpY * lineLength);
            ctx.stroke();
        }
    }
}
