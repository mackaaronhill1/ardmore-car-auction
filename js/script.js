document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });
    
    // Countdown Timer
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // Set the auction date (next Monday at 7:00 PM)
        const now = new Date();
        let auctionDate = new Date();
        
        // Set to next Monday
        auctionDate.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
        
        // Set time to 7:00 PM
        auctionDate.setHours(19, 0, 0, 0);
        
        // If today is Monday and it's past 7 PM, set to next Monday
        if (now.getDay() === 1 && now.getHours() >= 19) {
            auctionDate.setDate(auctionDate.getDate() + 7);
        }
        
        function updateCountdown() {
            const now = new Date();
            const diff = auctionDate - now;
            
            // If auction date has passed, set to next Monday
            if (diff < 0) {
                auctionDate.setDate(auctionDate.getDate() + 7);
                updateCountdown();
                return;
            }
            
            // Calculate days, hours, minutes, seconds
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Update the countdown display
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        // Initial update
        updateCountdown();
        
        // Update countdown every second
        setInterval(updateCountdown, 1000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update auction date in the "Next Auction" section
    const updateAuctionDateDisplay = () => {
        const dateElement = document.querySelector('.auction-details p:first-child strong');
        if (dateElement) {
            const now = new Date();
            let nextAuctionDate = new Date();
            
            // Set to next Monday
            nextAuctionDate.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
            
            // Format date: Monday, March 18, 2025
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = nextAuctionDate.toLocaleDateString('en-US', options);
            
            // Update the date text
            dateElement.textContent = formattedDate;
        }
    };
    
    // Call the function to update the auction date
    updateAuctionDateDisplay();
});
