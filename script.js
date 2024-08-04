document.addEventListener('DOMContentLoaded', function() {
    // Audio control variables
    var audio = document.getElementById('weddingAudio');
    var toggleMuteButton = document.getElementById('toggleMuteButton');
    var audioIcon = document.getElementById('audioIcon');
    var isMuted = false;

    // Function to toggle mute/unmute
    function toggleMute() {
        if (audio.paused || isMuted) {
            audio.play();
            audioIcon.src = 'images/volume-button.png'; // Set the icon to unmute
        } else {
            audio.pause();
            audioIcon.src = 'images/mute-option.png'; // Set the icon to mute
        }
        isMuted = !isMuted;
    }

    // Initialize mute button
    if (toggleMuteButton && audio && audioIcon) {
        toggleMuteButton.addEventListener('click', toggleMute);

        // Initialize the icon based on the initial state of the audio
        if (audio.paused) {
            audioIcon.src = 'images/mute-option.png'; // Initial state as muted
            isMuted = true;
        }
    } else {
        console.error('Required elements not found.');
    }

    // Slideshow logic
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

    // Form submission handling
    const form = document.getElementById('rsvpForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/thank-you.html'; // Redirect to thank-you page
                } else {
                    alert('There was a problem with your submission.');
                }
            })
            .catch(error => {
                alert('There was a problem with your submission.');
            });
        });
    } else {
        console.error('Form element not found.');
    }
});
