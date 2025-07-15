// ==========================================
// SHREE ASTROTALKS - MAIN JAVASCRIPT FILE
// ==========================================

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeBackToTop();
    initializeScrollReveal();
    initializeOfferButtons();
    initializeServiceButtons();
    initializeLanguageToggle();
    
    // Log initialization
    console.log('Shree Astrotalks website initialized successfully!');
});

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// SCROLL EFFECTS
// ==========================================

function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // Floating animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .offer-card, .contact-item');
    
    // Add reveal class to elements
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

function initializeContactForm() {
    const form = document.getElementById('consultation-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<span class="loading"></span> Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual submission logic)
                setTimeout(() => {
                    // Generate WhatsApp message
                    const whatsappMessage = generateWhatsAppMessage(data);
                    
                    // Open WhatsApp
                    window.open(`https://wa.me/917738961658?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                    
                    // Reset form
                    form.reset();
                    
                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    
                    // Show success message
                    showNotification('Request sent successfully! We will contact you soon.', 'success');
                }, 2000);
            }
        });
    }
}

// Form validation function
function validateForm(data) {
    const errors = [];
    
    // Required fields validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.phone || data.phone.trim().length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data['birth-date']) {
        errors.push('Birth date is required');
    }
    
    if (!data.service) {
        errors.push('Please select a service');
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Generate WhatsApp message
function generateWhatsAppMessage(data) {
    const serviceNames = {
        'lucky-number': 'Lucky Mobile Number',
        'name-correction': 'Name Correction',
        'career': 'Career Guidance',
        'marriage': 'Marriage Match Making',
        'business': 'Business Consultation',
        'face-reading': 'Face Reading',
        'numerology': 'Pythagoras Numerology',
        'tarot': 'Tarot Reading',
        'rudraksha': 'Rudraksha Remedies'
    };
    
    return `🌟 *New Consultation Request - Shree Astrotalks* 🌟

📝 *Personal Details:*
• Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone}
• Birth Date: ${data['birth-date']}

🔮 *Service Requested:* ${serviceNames[data.service] || data.service}

💬 *Message:* ${data.message || 'No specific message provided'}

🙏 Thank you for choosing Shree Astrotalks for your spiritual guidance!`;
}

// ==========================================
// OFFER BUTTONS FUNCTIONALITY
// ==========================================

function initializeOfferButtons() {
    const offerButtons = document.querySelectorAll('.btn-offer');
    
    offerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.offer-card');
            const title = card.querySelector('.offer-title').textContent;
            const price = card.querySelector('.discounted-price').textContent;
            
            // Generate offer-specific WhatsApp message
            const message = `🎯 *Special Offer Request - Shree Astrotalks* 🎯

🎁 *Offer:* ${title}
💰 *Price:* ${price}

👋 Hi! I'm interested in this special offer. Please provide me with more details and booking information.

🙏 Thank you!`;
            
            // Open WhatsApp
            window.open(`https://wa.me/917738961658?text=${encodeURIComponent(message)}`, '_blank');
        });
    });
}

// ==========================================
// SERVICE BOOKING FUNCTIONALITY
// ==========================================

function initializeServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-book-btn');
    
    // Service booking links
    const serviceLinks = {
        '1': 'https://superprofile.bio/vp/670c18d9d993b30013555b0d',
        '2': 'https://superprofile.bio/vp/66cfa4430b9337001372b30b',
        '3': 'https://superprofile.bio/vp/x1_sSJXT',
        '4': 'whatsapp' // WhatsApp direct link
    };
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            
            if (serviceId === '4') {
                // WhatsApp redirect for one-to-one consultation
                const message = `🙏 *One-to-One Consultation Request - Shree Astrotalks* 🙏

Hi! I would like to book a personal consultation session with your expert astrologer.

Please let me know:
• Available time slots
• Consultation charges
• How we can proceed

Thank you for your guidance! 🌟`;
                
                window.open(`https://wa.me/917738961658?text=${encodeURIComponent(message)}`, '_blank');
            } else if (serviceLinks[serviceId]) {
                // Redirect to service booking page
                window.open(serviceLinks[serviceId], '_blank');
            }
        });
    });
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add animation styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .notification-message {
                flex: 1;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                margin-left: 0.5rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format date function
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Optimize scroll events with throttling
const optimizedScrollHandler = throttle(function() {
    // Handle scroll events here
}, 16); // ~60fps

// Optimize resize events with debouncing
const optimizedResizeHandler = debounce(function() {
    // Handle resize events here
}, 250);

// Add event listeners with optimizations
window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Focus management for mobile menu
function manageFocus() {
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');
    
    if (navMenu.classList.contains('active')) {
        navLinks[0].focus();
    }
}

// ==========================================
// INITIALIZATION COMPLETE
// ==========================================

// ==========================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ==========================================

// Translation data
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-services': 'Services',
        'nav-offers': 'Offers',
        'nav-contact': 'Contact',
        
        // Hero Section
        'hero-title-1': 'Unlock Your Destiny with',
        'hero-title-2': 'Ancient Wisdom',
        'hero-subtitle': 'Discover your true potential through expert astrology, numerology, and spiritual guidance. Let the stars illuminate your path to success and happiness.',
        'hero-btn-1': 'Explore Services',
        'hero-btn-2': 'Consult Now',
        
        // About Section
        'about-title': 'About Shree Astrotalks',
        'about-description': 'Welcome to Shree Astrotalks, your trusted guide in the mystical world of astrology, numerology, and spiritual healing. With years of experience in ancient Vedic sciences, we provide authentic guidance to help you navigate life\'s challenges and unlock your true potential.',
        'about-feature-1': '2.5K+ Consultations Done',
        'about-feature-2': 'Expert Astrologers',
        'about-feature-3': 'Worldwide Service',
        
        // Services Section
        'services-title': 'Our Sacred Services',
        'services-subtitle': 'Transform your life with our comprehensive spiritual and astrological guidance',
        'service-1-title': 'Lucky Mobile Number',
        'service-1-desc': 'Discover the perfect mobile number that aligns with your numerological vibrations for enhanced luck and prosperity.',
        'service-2-title': 'Name Correction',
        'service-2-desc': 'Optimize your name according to numerological principles to attract positive energy and success.',
        'service-3-title': 'Career Consultation',
        'service-3-desc': 'Get personalized guidance on career decisions and professional growth through astrological insights.',
        'service-4-title': 'Marriage Matching',
        'service-4-desc': 'Ensure compatibility and harmony in relationships through comprehensive astrological matching.',
        'service-5-title': 'Tarot Card Reading',
        'service-5-desc': 'Gain clarity about your future and make informed decisions with our expert tarot card readings.',
        'service-6-title': 'Face Reading',
        'service-6-desc': 'Understand your personality traits and life path through the ancient art of face reading.',
        'service-7-title': 'Spiritual Healing',
        'service-7-desc': 'Experience profound healing and balance through our spiritual cleansing and energy work.',
        'service-8-title': 'Gemstone Consultation',
        'service-8-desc': 'Discover which gemstones can enhance your life force and bring protection and prosperity.',
        'service-9-title': 'Vastu Consultation',
        'service-9-desc': 'Harmonize your living and working spaces according to ancient Vastu principles.',
        
        // Offers Section
        'offers-title': 'Special Offers',
        'offers-subtitle': 'Limited time spiritual guidance packages designed to transform your life',
        'offer-1-title': 'Complete Life Analysis',
        'offer-1-price': '₹999',
        'offer-1-original': '₹1,999',
        'offer-1-feature-1': 'Detailed Birth Chart Analysis',
        'offer-1-feature-2': 'Career & Finance Guidance',
        'offer-1-feature-3': 'Health & Wellness Predictions',
        'offer-1-feature-4': 'Lucky Numbers & Colors',
        'offer-2-title': 'Relationship Harmony',
        'offer-2-price': '₹1,499',
        'offer-2-original': '₹2,499',
        'offer-2-feature-1': 'Compatibility Analysis',
        'offer-2-feature-2': 'Marriage Timing Predictions',
        'offer-2-feature-3': 'Relationship Healing',
        'offer-2-feature-4': 'Love Life Guidance',
        'offer-3-title': 'Business Success',
        'offer-3-price': '₹1,999',
        'offer-3-original': '₹3,499',
        'offer-3-feature-1': 'Business Name Analysis',
        'offer-3-feature-2': 'Auspicious Timing',
        'offer-3-feature-3': 'Financial Growth Predictions',
        'offer-3-feature-4': 'Partnership Guidance',
        'offer-btn': 'Book Now',
        
        // Contact Section
        'contact-title': 'Connect with Us',
        'contact-subtitle': 'Ready to transform your life? Get in touch with our expert astrologers',
        'contact-form-name': 'Full Name',
        'contact-form-email': 'Email Address',
        'contact-form-phone': 'Phone Number',
        'contact-form-service': 'Service of Interest',
        'contact-form-message': 'Your Message',
        'contact-form-btn': 'Send Message',
        'contact-info-title': 'Get in Touch',
        'contact-whatsapp': 'WhatsApp',
        'contact-email': 'Email',
        'contact-usa': 'USA Office',
        'contact-website': 'Website'
    },
    hi: {
        // Navigation
        'nav-home': 'होम',
        'nav-about': 'हमारे बारे में',
        'nav-services': 'सेवाएं',
        'nav-offers': 'ऑफर',
        'nav-contact': 'संपर्क',
        
        // Hero Section
        'hero-title-1': 'प्राचीन ज्ञान से',
        'hero-title-2': 'अपना भाग्य खोलें',
        'hero-subtitle': 'विशेषज्ञ ज्योतिष, अंक ज्योतिष, और आध्यात्मिक मार्गदर्शन के माध्यम से अपनी सच्ची क्षमता खोजें। सितारों को सफलता और खुशी का रास्ता रोशन करने दें।',
        'hero-btn-1': 'सेवाएं देखें',
        'hero-btn-2': 'अभी सलाह लें',
        
        // About Section
        'about-title': 'श्री एस्ट्रोटॉक्स के बारे में',
        'about-description': 'श्री एस्ट्रोटॉक्स में आपका स्वागत है, ज्योतिष, अंक ज्योतिष, और आध्यात्मिक चिकित्सा की रहस्यमय दुनिया में आपका विश्वसनीय मार्गदर्शक। प्राचीन वैदिक विज्ञान में वर्षों के अनुभव के साथ, हम आपको जीवन की चुनौतियों से निपटने और अपनी सच्ची क्षमता को अनलॉक करने में मदद करने के लिए प्रामाणिक मार्गदर्शन प्रदान करते हैं।',
        'about-feature-1': '2.5K+ परामर्श पूर्ण',
        'about-feature-2': 'विशेषज्ञ ज्योतिषी',
        'about-feature-3': 'विश्वव्यापी सेवा',
        
        // Services Section
        'services-title': 'हमारी पवित्र सेवाएं',
        'services-subtitle': 'हमारे व्यापक आध्यात्मिक और ज्योतिषीय मार्गदर्शन से अपना जीवन बदलें',
        'service-1-title': 'भाग्यशाली मोबाइल नंबर',
        'service-1-desc': 'अपनी संख्या विज्ञान की कंपनों के साथ संरेखित करने वाला सही मोबाइल नंबर खोजें जो भाग्य और समृद्धि बढ़ाए।',
        'service-2-title': 'नाम सुधार',
        'service-2-desc': 'सकारात्मक ऊर्जा और सफलता आकर्षित करने के लिए अंक ज्योतिष के सिद्धांतों के अनुसार अपना नाम अनुकूलित करें।',
        'service-3-title': 'कैरियर परामर्श',
        'service-3-desc': 'ज्योतिषीय अंतर्दृष्टि के माध्यम से करियर निर्णयों और व्यावसायिक विकास पर व्यक्तिगत मार्गदर्शन प्राप्त करें।',
        'service-4-title': 'विवाह मिलान',
        'service-4-desc': 'व्यापक ज्योतिषीय मिलान के माध्यम से रिश्तों में संगतता और सामंजस्य सुनिश्चित करें।',
        'service-5-title': 'टैरो कार्ड रीडिंग',
        'service-5-desc': 'हमारे विशेषज्ञ टैरो कार्ड रीडिंग के साथ अपने भविष्य के बारे में स्पष्टता प्राप्त करें और सूचित निर्णय लें।',
        'service-6-title': 'चेहरा पढ़ना',
        'service-6-desc': 'चेहरा पढ़ने की प्राचीन कला के माध्यम से अपने व्यक्तित्व के लक्षणों और जीवन पथ को समझें।',
        'service-7-title': 'आध्यात्मिक उपचार',
        'service-7-desc': 'हमारे आध्यात्मिक शुद्धिकरण और ऊर्जा कार्य के माध्यम से गहरा उपचार और संतुलन का अनुभव करें।',
        'service-8-title': 'रत्न परामर्श',
        'service-8-desc': 'जानें कि कौन से रत्न आपकी जीवन शक्ति को बढ़ा सकते हैं और सुरक्षा और समृद्धि ला सकते हैं।',
        'service-9-title': 'वास्तु परामर्श',
        'service-9-desc': 'प्राचीन वास्तु सिद्धांतों के अनुसार अपने रहने और काम करने के स्थानों को सामंजस्यपूर्ण बनाएं।',
        
        // Offers Section
        'offers-title': 'विशेष प्रस्ताव',
        'offers-subtitle': 'सीमित समय के आध्यात्मिक मार्गदर्शन पैकेज जो आपके जीवन को बदलने के लिए डिज़ाइन किए गए हैं',
        'offer-1-title': 'पूर्ण जीवन विश्लेषण',
        'offer-1-price': '₹999',
        'offer-1-original': '₹1,999',
        'offer-1-feature-1': 'विस्तृत जन्म चार्ट विश्लेषण',
        'offer-1-feature-2': 'करियर और वित्त मार्गदर्शन',
        'offer-1-feature-3': 'स्वास्थ्य और कल्याण भविष्यवाणी',
        'offer-1-feature-4': 'भाग्यशाली संख्या और रंग',
        'offer-2-title': 'रिश्ता सामंजस्य',
        'offer-2-price': '₹1,499',
        'offer-2-original': '₹2,499',
        'offer-2-feature-1': 'संगतता विश्लेषण',
        'offer-2-feature-2': 'विवाह समय भविष्यवाणी',
        'offer-2-feature-3': 'रिश्ता उपचार',
        'offer-2-feature-4': 'प्रेम जीवन मार्गदर्शन',
        'offer-3-title': 'व्यापार सफलता',
        'offer-3-price': '₹1,999',
        'offer-3-original': '₹3,499',
        'offer-3-feature-1': 'व्यापार नाम विश्लेषण',
        'offer-3-feature-2': 'शुभ समय',
        'offer-3-feature-3': 'वित्तीय वृद्धि भविष्यवाणी',
        'offer-3-feature-4': 'साझेदारी मार्गदर्शन',
        'offer-btn': 'अभी बुक करें',
        
        // Contact Section
        'contact-title': 'हमसे जुड़ें',
        'contact-subtitle': 'अपना जीवन बदलने के लिए तैयार हैं? हमारे विशेषज्ञ ज्योतिषियों से संपर्क करें',
        'contact-form-name': 'पूरा नाम',
        'contact-form-email': 'ईमेल पता',
        'contact-form-phone': 'फोन नंबर',
        'contact-form-service': 'रुचि की सेवा',
        'contact-form-message': 'आपका संदेश',
        'contact-form-btn': 'संदेश भेजें',
        'contact-info-title': 'संपर्क करें',
        'contact-whatsapp': 'व्हाट्सएप',
        'contact-email': 'ईमेल',
        'contact-usa': 'यूएसए कार्यालय',
        'contact-website': 'वेबसाइट'
    }
};

function initializeLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const currentLangSpan = document.getElementById('current-lang');
    
    // Get current language from localStorage or default to English
    let currentLanguage = localStorage.getItem('language') || 'en';
    
    // Set initial language
    setLanguage(currentLanguage);
    
    // Add click event listener
    langToggle.addEventListener('click', function() {
        // Toggle language
        currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
        setLanguage(currentLanguage);
        
        // Save to localStorage
        localStorage.setItem('language', currentLanguage);
        
        // Show notification
        showNotification(
            currentLanguage === 'en' ? 'Language changed to English' : 'भाषा हिंदी में बदल गई', 
            'success'
        );
    });
}

function setLanguage(lang) {
    const currentLangSpan = document.getElementById('current-lang');
    
    // Update button text
    currentLangSpan.textContent = lang === 'en' ? 'EN' : 'हिं';
    
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-translate]');
    
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update document language attribute
    document.documentElement.lang = lang;
}



const carousel = document.querySelector('.review-carousel');
let scrollAmount = 0;

setInterval(() => {
        scrollAmount += 510;
        if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = 0;
        }
        carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}, 4000);


