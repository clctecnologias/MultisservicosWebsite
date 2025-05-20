var menuHamburguer = document.querySelector(".menuHamburguer")
menuHamburguer.addEventListener("click", ()=> {
    document.querySelector("header").classList.toggle("ativado")
})

const links = document.querySelectorAll('.linksMenu');
links.forEach(link => {
    link.addEventListener('click', function () {
      document.querySelector("header").classList.toggle("ativado")
    });
  });

const videoPlayer = document.querySelector('.videoExplicativo');
const playPauseButton = document.querySelector('.fa-play, .fa-pause');
const backwardButton = document.querySelector('.fa-backward');
const forwardButton = document.querySelector('.fa-forward');
const fullscreenButton = document.querySelector('.fa-expand, .fa-compress'); 

videoPlayer.muted = false;
videoPlayer.volume = 1;

function togglePlayPause() {
    const isPlaying = !videoPlayer.paused && !videoPlayer.ended;

    if (isPlaying) {
        videoPlayer.pause();
        playPauseButton.classList.remove('fa-pause');
        playPauseButton.classList.add('fa-play');
    } else {
        videoPlayer.play();
        playPauseButton.classList.remove('fa-play');
        playPauseButton.classList.add('fa-pause');
    }
}

function skip(seconds) {
    videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime + seconds);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) {
            videoPlayer.msRequestFullscreen();
        }

        videoPlayer.play(); // Play automático
        playPauseButton.classList.remove('fa-play');
        playPauseButton.classList.add('fa-pause');

        fullscreenButton.classList.remove('fa-expand');
        fullscreenButton.classList.add('fa-compress');
    } else {
        // Sai do fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        fullscreenButton.classList.remove('fa-compress');
        fullscreenButton.classList.add('fa-expand');
    }
}

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenButton.classList.remove('fa-compress');
        fullscreenButton.classList.add('fa-expand');
    } else {
        fullscreenButton.classList.remove('fa-expand');
        fullscreenButton.classList.add('fa-compress');
    }
});

// Eventos
playPauseButton.addEventListener('click', togglePlayPause);
backwardButton.addEventListener('click', () => skip(-10));
forwardButton.addEventListener('click', () => skip(10));
fullscreenButton.addEventListener('click', toggleFullscreen);

videoPlayer.addEventListener('play', () => {
    playPauseButton.classList.remove('fa-play');
    playPauseButton.classList.add('fa-pause');
});

videoPlayer.addEventListener('pause', () => {
    playPauseButton.classList.remove('fa-pause');
    playPauseButton.classList.add('fa-play');
});

const carousel = document.querySelector(".contentServicos");
const cards = document.querySelectorAll(".cardServico");
const prevBtn = document.querySelector(".carousel-button.prev");
const nextBtn = document.querySelector(".carousel-button.next");

if (cards.length > 0) {
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth + 
                     parseInt(cardStyle.marginLeft) + 
                     parseInt(cardStyle.marginRight);

    let currentPosition = 0;
    const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
    const maxPosition = Math.max(0, cards.length - visibleCards);

    const updateButtons = () => {
        prevBtn.style.display = currentPosition <= 0 ? "none" : "flex";
        nextBtn.style.display = currentPosition >= maxPosition ? "none" : "flex";
    };

    const moveCarousel = () => {
        carousel.scrollTo({
            left: currentPosition * cardWidth,
            behavior: "smooth"
        });
        updateButtons();
    };

    prevBtn.addEventListener("click", () => {
        if (currentPosition > 0) {
            currentPosition--;
            moveCarousel();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentPosition < maxPosition) {
            currentPosition++;
            moveCarousel();
        }
    });

    // EU vou adicionar depois.
    // I need SLEEPEEEEEEEEEEEE
    
    updateButtons();
    moveCarousel(); 
}
