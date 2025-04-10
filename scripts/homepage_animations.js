document.addEventListener("DOMContentLoaded", () => {
    // Animated logo
    const logoText = document.querySelector(".animated-logo")
    const logoLetters = logoText.textContent.split("")

    logoText.innerHTML = ""
    logoLetters.forEach((letter, index) => {
        const span = document.createElement("span")
        span.textContent = letter === " " ? "\u00A0" : letter;
        span.style.display = "inline-block"
        span.style.animation = `letterChange 1s ${Math.random() * 0.5}s`
        logoText.appendChild(span)
    })

    // Animated text typing effect
    const heroDescription = document.querySelector(".hero-description")
    const originalText = heroDescription.textContent
    heroDescription.textContent = ""

    let i = 0
    function typeWriter() {
        if (i < originalText.length) {
        heroDescription.textContent += originalText.charAt(i)
        i++
        setTimeout(typeWriter, 10) // Typing speed
        }
    }

    // Start animations
    setTimeout(typeWriter, 500)
})