// Wait for DOM to be fully loaded
console.log('🔧 JavaScript file loaded!');
console.log('📍 Current location:', window.location.href);

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM content loaded!');
    
    // Test YouTube setup after class is defined
    setTimeout(() => {
        try {
            console.log('=== YOUTUBE API TEST ===');
            const testAPI = new YouTubeAPI();
            console.log('API Key configured:', testAPI.isConfigured());
            console.log('API Key (first 10 chars):', testAPI.apiKey.substring(0, 10) + '...');
            console.log('Channel handle:', testAPI.channelHandle);
            console.log('========================');
        } catch (e) {
            console.error('❌ Error in YouTube test:', e);
        }
    }, 100);
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        // Don't prevent default if using Formspree
        if (contactForm.action.includes('formspree.io')) {
            // Let Formspree handle the submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Re-enable button after a delay (Formspree will redirect)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
            return; // Let form submit naturally
        }
        
        // For other form handlers, prevent default and validate
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    // Form validation function
    function validateForm(name, email, subject, message) {
        let isValid = true;
        
        // Clear previous error messages
        clearErrorMessages();
        
        // Validate name
        if (name.length < 2) {
            showError('name', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (subject.length < 5) {
            showError('subject', 'Please enter a subject (at least 5 characters)');
            isValid = false;
        }
        
        // Validate message
        if (message.length < 10) {
            showError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show error message for specific field
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        
        formGroup.appendChild(errorDiv);
        
        // Add error styling to field
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        // Remove error styling on focus
        field.addEventListener('focus', function() {
            field.style.borderColor = '';
            field.style.boxShadow = '';
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        });
    }
    
    // Clear all error messages
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
        formFields.forEach(field => {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        });
    }
    
    // Show success/error message
    function showMessage(text, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.textContent = text;
        messageDiv.style.padding = '1rem';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.marginBottom = '1rem';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontSize = '0.95rem';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#dcfce7';
            messageDiv.style.color = '#166534';
            messageDiv.style.border = '1px solid #bbf7d0';
        } else {
            messageDiv.style.backgroundColor = '#fef2f2';
            messageDiv.style.color = '#dc2626';
            messageDiv.style.border = '1px solid #fecaca';
        }
        
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.portfolio-item, .achievement-item, .skill-category');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Set initial styles for animated elements
    document.querySelectorAll('.portfolio-item, .achievement-item, .skill-category').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation on page load
    animateOnScroll();
    
    // Typing animation for hero title (optional enhancement)
    function typeWriter() {
        const titleElement = document.querySelector('.hero-title .highlight');
        if (!titleElement) return;
        
        const text = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(() => {
                    titleElement.style.borderRight = 'none';
                }, 500);
            }
        }
        
        setTimeout(type, 1000);
    }
    
    // Uncomment the line below if you want the typing animation
    // typeWriter();
    
    // Portfolio item hover effects
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Skill tags interactive effects
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-link.active {
            color: var(--primary-color);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            // Scroll-dependent functions are already attached above
        });
    });
    
    // Check if YouTube section exists
    const youtubeSection = document.getElementById('youtube-videos');
    console.log('📺 YouTube section found:', !!youtubeSection);
    if (youtubeSection) {
        console.log('📺 YouTube container HTML:', youtubeSection.innerHTML.substring(0, 100) + '...');
    }
    
    // Initialize YouTube section
    console.log('🚀 About to initialize YouTube...');
    try {
        initializeYouTube();
    } catch (error) {
        console.error('❌ Error initializing YouTube:', error);
    }
    
    console.log('Personal Website Template loaded successfully! 🚀');
});

// YouTube Integration
class YouTubeAPI {
    constructor() {
        // You need to get your API key from Google Cloud Console
        // 1. Go to https://console.cloud.google.com/
        // 2. Create a new project or select existing one
        // 3. Enable YouTube Data API v3
        // 4. Create credentials (API Key)
        // 5. Restrict the API key to YouTube Data API v3
        this.apiKey = 'AIzaSyDMlpS0C0SaWbnkRoraoP-TtljEyiGFYPU'; // Replace with your actual API key
        this.channelId = null;
        this.channelHandle = '@anushajournal';
        this.baseUrl = 'https://www.googleapis.com/youtube/v3';
    }

    // Get channel ID from handle
    async getChannelId() {
        if (this.channelId) {
            console.log('📺 Using cached channel ID:', this.channelId);
            return this.channelId;
        }
        
        console.log('🔍 Searching for channel:', this.channelHandle);
        
        try {
            const searchUrl = `${this.baseUrl}/search?part=snippet&type=channel&q=${this.channelHandle}&key=${this.apiKey}`;
            console.log('🌐 API Request URL:', searchUrl);
            
            const response = await fetch(searchUrl);
            const data = await response.json();
            
            console.log('📊 Channel search response:', data);
            
            if (data.error) {
                console.error('❌ YouTube API Error:', data.error);
                return null;
            }
            
            if (data.items && data.items.length > 0) {
                this.channelId = data.items[0].snippet.channelId;
                console.log('✅ Found channel ID:', this.channelId);
                console.log('📋 Channel info:', data.items[0].snippet);
                return this.channelId;
            } else {
                console.warn('⚠️ No channel found for handle:', this.channelHandle);
            }
        } catch (error) {
            console.error('❌ Error fetching channel ID:', error);
        }
        return null;
    }

    // Get channel statistics
    async getChannelStats() {
        console.log('📊 Fetching channel statistics...');
        const channelId = await this.getChannelId();
        if (!channelId) {
            console.warn('⚠️ Cannot fetch stats - no channel ID');
            return null;
        }

        try {
            const statsUrl = `${this.baseUrl}/channels?part=statistics&id=${channelId}&key=${this.apiKey}`;
            console.log('🌐 Stats API URL:', statsUrl);
            
            const response = await fetch(statsUrl);
            const data = await response.json();
            
            console.log('📊 Channel stats response:', data);
            
            if (data.error) {
                console.error('❌ Stats API Error:', data.error);
                return null;
            }
            
            if (data.items && data.items.length > 0) {
                const stats = data.items[0].statistics;
                const processedStats = {
                    subscriberCount: parseInt(stats.subscriberCount || 0),
                    videoCount: parseInt(stats.videoCount || 0),
                    viewCount: parseInt(stats.viewCount || 0)
                };
                console.log('✅ Processed stats:', processedStats);
                return processedStats;
            } else {
                console.warn('⚠️ No stats data found');
            }
        } catch (error) {
            console.error('❌ Error fetching channel stats:', error);
        }
        return null;
    }

    // Get latest videos from channel
    async getLatestVideos(maxResults = 3) {
        console.log('🎬 Fetching latest videos...');
        const channelId = await this.getChannelId();
        if (!channelId) {
            console.warn('⚠️ Cannot fetch videos - no channel ID');
            return [];
        }

        try {
            // Get video list
            const searchUrl = `${this.baseUrl}/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${this.apiKey}`;
            console.log('🌐 Video search URL:', searchUrl);
            
            const searchResponse = await fetch(searchUrl);
            const searchData = await searchResponse.json();
            
            console.log('🎬 Video search response:', searchData);
            
            if (searchData.error) {
                console.error('❌ Video search API Error:', searchData.error);
                return [];
            }
            
            if (!searchData.items || searchData.items.length === 0) {
                console.warn('⚠️ No videos found');
                return [];
            }

            console.log(`✅ Found ${searchData.items.length} videos`);

            // Get video statistics and details
            const videoIds = searchData.items.map(item => item.id.videoId).join(',');
            const detailsUrl = `${this.baseUrl}/videos?part=statistics,contentDetails&id=${videoIds}&key=${this.apiKey}`;
            console.log('🌐 Video details URL:', detailsUrl);
            
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();
            
            console.log('📊 Video details response:', detailsData);
            
            if (detailsData.error) {
                console.error('❌ Video details API Error:', detailsData.error);
                return [];
            }

            // Combine search results with detailed statistics
            const processedVideos = searchData.items.map((item, index) => {
                const details = detailsData.items[index];
                const video = {
                    id: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.medium.url,
                    views: parseInt(details.statistics.viewCount || 0),
                    publishedAt: item.snippet.publishedAt,
                    duration: this.formatDuration(details.contentDetails.duration)
                };
                console.log(`🎬 Video ${index + 1}:`, video);
                return video;
            });
            
            console.log(`✅ Successfully processed ${processedVideos.length} videos`);
            return processedVideos;
        } catch (error) {
            console.error('❌ Error fetching videos:', error);
            return [];
        }
    }

    // Convert ISO 8601 duration to readable format
    formatDuration(duration) {
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!match) return '';
        
        const hours = parseInt(match[1] || 0);
        const minutes = parseInt(match[2] || 0);
        const seconds = parseInt(match[3] || 0);
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Check if API key is configured
    isConfigured() {
        return this.apiKey && this.apiKey !== 'YOUR_YOUTUBE_API_KEY_HERE';
    }
}

// Initialize YouTube integration
function initializeYouTube() {
    console.log('🎬 Initializing YouTube integration...');
    const youtube = new YouTubeAPI();
    
    if (!youtube.isConfigured()) {
        console.warn('❌ YouTube API key not configured. Using sample data.');
        console.log('💡 To enable live data: Replace API key in js/script.js line 352');
        // Fall back to sample data
        loadSampleData();
        return;
    }

    console.log('✅ YouTube API key detected. Loading live data...');
    // Load real data from YouTube API
    loadYouTubeData(youtube);
}

// Load real data from YouTube API
async function loadYouTubeData(youtube) {
    console.log('🚀 Loading YouTube data from API...');
    
    try {
        // Show loading state
        showLoadingState();
        
        // Load videos and stats in parallel
        console.log('🔄 Fetching videos and stats in parallel...');
        const [videos, stats] = await Promise.all([
            youtube.getLatestVideos(3),
            youtube.getChannelStats()
        ]);
        
        console.log('📊 API Results:');
        console.log('- Videos:', videos);
        console.log('- Stats:', stats);
        
        if (videos && videos.length > 0) {
            console.log(`✅ Displaying ${videos.length} videos`);
            displayVideos(videos);
        } else {
            console.warn('⚠️ No videos received, falling back to sample data');
            loadSampleData();
        }
        
        if (stats) {
            console.log('✅ Updating channel statistics');
            updateYouTubeStats(stats);
        } else {
            console.warn('⚠️ No stats received, keeping default values');
        }
        
    } catch (error) {
        console.error('❌ Error loading YouTube data:', error);
        console.log('🔄 Falling back to sample data');
        loadSampleData();
    }
}

// Load sample data as fallback
function loadSampleData() {
    const sampleVideos = [
        {
            id: 'sample1',
            title: 'Career Growth in Tech: My Journey from Beginner to Professional',
            thumbnail: createVideoThumbnail('Tech Career Tips', '#ff0000'),
            views: 1250,
            publishedAt: '2024-01-15T00:00:00Z',
            duration: '8:42'
        },
        {
            id: 'sample2',
            title: 'Salesforce Administration Best Practices and Tips',
            thumbnail: createVideoThumbnail('Salesforce Tips', '#00a1e0'),
            views: 980,
            publishedAt: '2024-02-08T00:00:00Z',
            duration: '12:15'
        },
        {
            id: 'sample3',
            title: 'Data Analysis with Power BI: Creating Professional Dashboards',
            thumbnail: createVideoThumbnail('Power BI Tutorial', '#f2c811'),
            views: 2100,
            publishedAt: '2024-02-20T00:00:00Z',
            duration: '15:30'
        }
    ];

    displayVideos(sampleVideos);
    updateYouTubeStats({
        videoCount: 15,
        subscriberCount: 500,
        viewCount: 25000
    });
}

// Show loading state
function showLoadingState() {
    const videosContainer = document.getElementById('youtube-videos');
    if (videosContainer) {
        videosContainer.innerHTML = `
            <div class="video-placeholder">
                <div class="placeholder-content">
                    <i class="fab fa-youtube loading-pulse"></i>
                    <p>Loading latest videos...</p>
                </div>
            </div>
            <div class="video-placeholder">
                <div class="placeholder-content">
                    <i class="fab fa-youtube loading-pulse"></i>
                    <p>Loading latest videos...</p>
                </div>
            </div>
            <div class="video-placeholder">
                <div class="placeholder-content">
                    <i class="fab fa-youtube loading-pulse"></i>
                    <p>Loading latest videos...</p>
                </div>
            </div>
        `;
    }
}

// Create SVG thumbnail for sample videos
function createVideoThumbnail(text, color) {
    const svg = `
        <svg width="320" height="180" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f0f0f0"/>
            <rect x="40" y="40" width="240" height="100" fill="${color}" rx="8"/>
            <polygon points="140,70 140,110 180,90" fill="white"/>
            <text x="160" y="135" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">
                ${text}
            </text>
        </svg>
    `;
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

// Format numbers for display
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

// Create video card HTML
function createVideoCard(video) {
    const videoUrl = video.id.startsWith('sample') 
        ? 'https://www.youtube.com/@anushajournal'
        : `https://www.youtube.com/watch?v=${video.id}`;
        
    return `
        <div class="video-card" onclick="window.open('${videoUrl}', '_blank')">
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" onerror="this.style.display='none'">
                <div class="video-play-overlay">
                    <i class="fas fa-play"></i>
                </div>
                ${video.duration ? `<div class="video-duration">${video.duration}</div>` : ''}
            </div>
            <div class="video-info">
                <h4 class="video-title">${video.title}</h4>
                <div class="video-stats">
                    <div class="video-views">
                        <i class="fas fa-eye"></i>
                        <span>${formatNumber(video.views)}</span>
                    </div>
                    <div class="video-date">${formatDate(video.publishedAt)}</div>
                </div>
            </div>
        </div>
    `;
}

// Display videos in the grid
function displayVideos(videos) {
    const videosContainer = document.getElementById('youtube-videos');
    if (!videosContainer) return;

    const videoCards = videos.map(video => createVideoCard(video)).join('');
    videosContainer.innerHTML = videoCards;
}

// Update YouTube channel stats
function updateYouTubeStats(stats) {
    const elements = {
        'video-count': stats.videoCount || 15,
        'subscriber-count': formatNumber(stats.subscriberCount || 500),
        'view-count': formatNumber(stats.viewCount || 25000)
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Lazy loading for images (if needed)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}