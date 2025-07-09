document.addEventListener("DOMContentLoaded", () => {
  // Navigation
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-links li")

  if (burger) {
    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("nav-active")

      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
      })

      // Burger Animation
      burger.classList.toggle("toggle")
    })
  }

  // Scroll Navigation
  window.addEventListener("scroll", () => {
    const navigation = document.querySelector(".navigation")
    if (window.scrollY > 100) {
      navigation.classList.add("scrolled")
    } else {
      navigation.classList.remove("scrolled")
    }
  })

  // Rose petals animation
  createRosePetals()

  // Countdown Timer
  const countdownDate = new Date("July 11, 2025 00:00:00").getTime()

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = countdownDate - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById("days").innerText = days.toString().padStart(2, "0")
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0")
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0")
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0")

    if (distance < 0) {
      clearInterval(countdownInterval)
      document.getElementById("countdown").innerHTML = "<h2>Happy Birthday Anshiiii!</h2>"
    }
  }

  updateCountdown()
  const countdownInterval = setInterval(updateCountdown, 1000)

  // Love Letter Animation
  const envelope = document.querySelector(".envelope")
  if (envelope) {
    envelope.addEventListener("click", function () {
      this.classList.toggle("open")
    })
  }

  // Photo Slider
  const slider = document.querySelector(".photo-slider")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let slideIndex = 0
  const slides = document.querySelectorAll(".slide")

  if (slider && prevBtn && nextBtn && slides.length > 0) {
    function showSlide(index) {
      if (index < 0) {
        slideIndex = slides.length - 1
      } else if (index >= slides.length) {
        slideIndex = 0
      }

      slider.style.transform = `translateX(-${slideIndex * 100}%)`
    }

    prevBtn.addEventListener("click", () => {
      slideIndex--
      showSlide(slideIndex)
    })

    nextBtn.addEventListener("click", () => {
      slideIndex++
      showSlide(slideIndex)
    })

    // Auto slide
    setInterval(() => {
      slideIndex++
      showSlide(slideIndex)
    }, 5000)
  }

  // Travel Map
  const travelMap = document.getElementById("travel-map")
  if (travelMap) {
    travelMap.innerHTML = "Our World To Explore Together"

    // Add map pins animation
    const pins = [
      { top: "30%", left: "20%" },
      { top: "40%", left: "45%" },
      { top: "25%", left: "70%" },
      { top: "60%", left: "80%" },
      { top: "50%", left: "30%" },
      { top: "35%", left: "55%" },
    ]

    pins.forEach((pin) => {
      const pinElement = document.createElement("div")
      pinElement.className = "map-pin"
      pinElement.style.top = pin.top
      pinElement.style.left = pin.left
      pinElement.innerHTML = '<i class="fas fa-map-marker-alt"></i>'
      travelMap.appendChild(pinElement)
    })

    // Add map pin styles
    const mapPinStyle = document.createElement("style")
    mapPinStyle.innerHTML = `
      .map-pin {
        position: absolute;
        color: var(--primary-color);
        font-size: 1.5rem;
        animation: pinPulse 2s infinite;
        transform-origin: bottom center;
      }
      
      @keyframes pinPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
    `
    document.head.appendChild(mapPinStyle)
  }

  // Video Message Section
  const mainVideo = document.getElementById("main-video")
  const videoOverlay = document.querySelector(".video-overlay")

  if (mainVideo && videoOverlay) {
    // Fix: Add click event to both the overlay and the video container
    videoOverlay.addEventListener("click", (e) => {
      e.preventDefault() // Prevent any default behavior
      playMainVideo()
    })

    // Also add click handler to the container for better click area
    document.querySelector(".video-container").addEventListener("click", function (e) {
      // Only trigger if we didn't click on video controls
      if (e.target.closest(".video-overlay") || e.target === this) {
        e.preventDefault()
        playMainVideo()
      }
    })

    function playMainVideo() {
      // Play the video and hide overlay
      mainVideo
        .play()
        .then(() => {
          videoOverlay.style.display = "none" // Hide completely instead of just opacity
        })
        .catch((err) => {
          console.error("Error playing video:", err)
          alert("There was an issue playing the video. Make sure you've added a video file.")
        })
    }

    mainVideo.addEventListener("pause", () => {
      videoOverlay.style.display = "flex" // Show overlay when paused
    })

    mainVideo.addEventListener("ended", () => {
      videoOverlay.style.display = "flex" // Show overlay when ended
    })
  }

  // Video Gallery Modal
  const videoThumbnails = document.querySelectorAll(".video-thumbnail")
  const videoModal = document.getElementById("video-modal")
  const modalVideo = document.getElementById("modal-video")
  const modalCaption = document.getElementById("modal-caption")
  const closeModal = document.querySelector(".close-modal")

  if (videoThumbnails.length && videoModal && modalVideo && modalCaption && closeModal) {
    videoThumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function (e) {
        e.preventDefault() // Prevent default behavior

        const videoSrc = this.getAttribute("data-video")
        const caption = this.querySelector(".video-caption").textContent

        // Set the source and load the video
        modalVideo.innerHTML = `<source src="${videoSrc}" type="video/mp4">Your browser does not support the video tag.`
        modalVideo.load() // Important: reload the video with new source
        modalCaption.textContent = caption

        // Show the modal
        videoModal.style.display = "flex"

        // Play the video after a short delay to ensure it's loaded
        setTimeout(() => {
          modalVideo.play().catch((err) => {
            console.error("Error playing modal video:", err)
            alert("There was an issue playing the video. Make sure you've added the video file: " + videoSrc)
          })
        }, 100)
      })
    })

    closeModal.addEventListener("click", () => {
      modalVideo.pause()
      videoModal.style.display = "none"
    })

    window.addEventListener("click", (event) => {
      if (event.target === videoModal) {
        modalVideo.pause()
        videoModal.style.display = "none"
      }
    })
  }

  // 20 Reasons Why I Love You
  const reasons = [
    "Your eyes hold the universe in them, and I get lost in their beauty every time I look at you.",
    "The way your smile lights up even the darkest room, making my heart skip a beat.",
    "How your laughter is the most beautiful melody I've ever heard.",
    "The gentle touch of your hand that makes me feel like I'm home.",
    "Your kindness towards everyone you meet, showing the beauty of your soul.",
    "The way you understand me without words, knowing exactly what I need.",
    "How you inspire me to be a better person every single day.",
    "The strength you show when facing challenges, never giving up.",
    "Your passion for mountains and travel, which ignites my own passions.",
    "The way you make even ordinary moments feel magical and special.",
    "How your presence alone brings peace to my restless heart.",
    "The depth of your thoughts and the wisdom in your words.",
    "Your ability to see beauty in the simplest things in life.",
    "The way you care for others with such genuine compassion.",
    "How you've taught me what true love really means.",
    "The dreams we share and the future we're building together.",
    "Your patience with me, even when I don't deserve it.",
    "The way you embrace life with such joy and enthusiasm.",
    "How you've become my favorite part of every day.",
    "Simply being you - the most incredible person I've ever known and the love of my life.",
  ]

  let currentReasonIndex = 0
  const reasonsElement = document.getElementById("reasons-list")
  const nextReasonButton = document.getElementById("next-reason")
  const reasonCard = document.querySelector(".reason-card")

  function showReason(index) {
    reasonsElement.innerHTML = `<p>${index + 1}. ${reasons[index]}</p>`
    reasonsElement.style.opacity = 0
    setTimeout(() => {
      reasonsElement.style.opacity = 1
    }, 300)
  }

  if (reasonCard && reasonsElement && nextReasonButton) {
    // Initialize with first reason
    showReason(currentReasonIndex)

    // Flip card on first click
    reasonCard.addEventListener("click", function () {
      if (!this.classList.contains("flipped")) {
        this.classList.add("flipped")
      }
    })

    // Next reason button
    nextReasonButton.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent card from flipping back
      currentReasonIndex = (currentReasonIndex + 1) % reasons.length
      showReason(currentReasonIndex)
    })
  }

  // Chocolate pieces interaction
  const chocolatePieces = document.querySelectorAll(".chocolate-piece")
  chocolatePieces.forEach((piece) => {
    piece.addEventListener("click", function () {
      this.classList.toggle("flipped")
    })
  })

  // Virtual Gift
  const giftBox = document.querySelector(".gift-box")
  const giftMessage = document.querySelector(".gift-message")
  const openGiftBtn = document.getElementById("open-gift-btn")

  if (giftBox && giftMessage && openGiftBtn) {
    openGiftBtn.addEventListener("click", () => {
      giftBox.classList.add("open")
      setTimeout(() => {
        giftMessage.classList.add("visible")
        openGiftBtn.style.display = "none"
      }, 1000)
    })
  }

  // Special Message Reveal
  const revealBtn = document.getElementById("reveal-btn")
  const specialMessage = document.getElementById("special-message")

  if (revealBtn && specialMessage) {
    revealBtn.addEventListener("click", () => {
      specialMessage.classList.add("visible")
      revealBtn.style.display = "none"

      // Add floating hearts animation
      createFloatingHearts()
    })
  }

  // Music Player
  const playBtn = document.getElementById("play-btn")
  const progressBar = document.querySelector(".progress-bar")
  let audio = null
  let isPlaying = false

  if (playBtn) {
    playBtn.addEventListener("click", togglePlay)
  }

  function togglePlay() {
    if (!audio) {
      // Create audio element - user needs to add their own music file
      audio = new Audio("song.mp3") // This is a placeholder
      audio.addEventListener("timeupdate", updateProgress)
      audio.addEventListener("ended", resetPlayer)
    }

    if (isPlaying) {
      audio.pause()
      playBtn.innerHTML = '<i class="fas fa-play"></i>'
    } else {
      audio.play().catch((e) => {
        console.log("Audio play failed:", e)
        // Show a message to the user
        alert("Please add your special song file to make the music player work.")
      })
      playBtn.innerHTML = '<i class="fas fa-pause"></i>'
    }

    isPlaying = !isPlaying
  }

  function updateProgress() {
    if (audio && progressBar) {
      const progress = (audio.currentTime / audio.duration) * 100
      progressBar.style.width = progress + "%"
    }
  }

  function resetPlayer() {
    if (playBtn) {
      playBtn.innerHTML = '<i class="fas fa-play"></i>'
      isPlaying = false
    }
    if (progressBar) {
      progressBar.style.width = "0%"
    }
  }

  // Parallax effect for sections
  window.addEventListener("scroll", () => {
    const parallaxSections = document.querySelectorAll(".parallax-section")
    parallaxSections.forEach((section) => {
      const scrollPosition = window.pageYOffset
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
        const yPos = -(scrollPosition - sectionTop) / 10
        section.style.backgroundPosition = `center ${yPos}px`
      }
    })
  })

  // Helper Functions
  function createFloatingHearts() {
    const messageBox = document.querySelector(".message-box")
    if (!messageBox) return

    for (let i = 0; i < 30; i++) {
      const heart = document.createElement("div")
      heart.classList.add("floating-heart")
      heart.innerHTML = "❤️"
      heart.style.left = Math.random() * 100 + "%"
      heart.style.animationDuration = Math.random() * 3 + 2 + "s"
      heart.style.animationDelay = Math.random() * 2 + "s"
      heart.style.opacity = Math.random() * 0.5 + 0.5
      heart.style.fontSize = Math.random() * 20 + 10 + "px"

      messageBox.appendChild(heart)
    }
  }

  function createRosePetals() {
    const container = document.getElementById("rose-petals")
    if (!container) return

    const petalColors = ["#e83e8c", "#ff85a2", "#ba68c8", "#9c27b0"]
    const petalCount = 30

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement("div")
      petal.classList.add("petal")

      // Create SVG petal
      const color = petalColors[Math.floor(Math.random() * petalColors.length)]
      const petalSVG = `
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M15,0 C15,15 30,15 15,30 C0,15 15,0 15,0 Z" fill="${color}" />
        </svg>
      `

      const blob = new Blob([petalSVG], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)

      petal.style.backgroundImage = `url(${url})`
      petal.style.width = Math.random() * 20 + 10 + "px"
      petal.style.height = Math.random() * 20 + 10 + "px"
      petal.style.left = Math.random() * 100 + "vw"
      petal.style.top = -100 + "px"
      petal.style.animationDuration = Math.random() * 10 + 10 + "s"
      petal.style.animationDelay = Math.random() * 5 + "s"

      // Add animation
      const keyframes = `
        @keyframes fall-${i} {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `

      const style = document.createElement("style")
      style.innerHTML = keyframes
      document.head.appendChild(style)

      petal.style.animation = `fall-${i} linear infinite`

      container.appendChild(petal)
    }
  }
})
