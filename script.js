var audio = document.getElementById('weddingAudio');
        var toggleMuteButton = document.getElementById('toggleMuteButton');
        var isMuted = false;

        function toggleMute() {
            if (audio.paused || isMuted) {
                audio.play();
                toggleMuteButton.textContent = 'Mute Music';
            } else {
                audio.pause();
                toggleMuteButton.textContent = 'Play Music';
            }
            isMuted = !isMuted;
        }

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => slide.style.opacity = 0);
        
        // Show the nth slide with a fade effect
        slides[n].style.opacity = 1;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Swipe detection for mobile-like experience
    let touchstartX = 0;
    let touchendX = 0;

    document.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchendX < touchstartX) {
            nextSlide();
        }
        if (touchendX > touchstartX) {
            prevSlide();
        }
    }

    // Start slideshow automatically
    setInterval(nextSlide, 5000); // Change slide every 5 seconds (5000 milliseconds)
    
    // Initial slide show
    showSlide(currentSlide);

    // Countdown timer
    const weddingDate = new Date('2024-11-29').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        document.getElementById('countdown').innerHTML = `${days} days left`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
