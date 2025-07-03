document.addEventListener("DOMContentLoaded", () => {
  // Add this function at the beginning of the file
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // System theme detection - no manual toggle needed
  const htmlElement = document.documentElement

  // Detect system theme preference
  function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      htmlElement.setAttribute("data-theme", "dark")
    } else {
      htmlElement.setAttribute("data-theme", "light")
    }
  }

  // Initial theme detection
  detectSystemTheme()

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", detectSystemTheme)
  }

  // Typing effect
  const typingElement = document.querySelector(".typing")
  const phrases = [
    "Computer Science Major",
    "Applied Mathematics Major",
    "Business Minor",
    "AWS Certified",
    "WICS President at FSU",
  ]
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function typeText() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true
      typingSpeed = 1500 // Pause at the end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typingSpeed = 500 // Pause before typing next phrase
    }

    setTimeout(typeText, typingSpeed)
  }

  // Start the typing animation
  setTimeout(typeText, 1000)

  // Scroll animations
  const revealElements = document.querySelectorAll(".fade-in, .reveal-text")
  const revealText = document.querySelector(".reveal-text")

  function checkScroll() {
    const windowHeight = window.innerHeight
    const revealPoint = 150

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active")
      }
    })
  }

  // Initial check and add active class to hero text
  window.addEventListener("load", () => {
    if (revealText) {
      revealText.classList.add("active")
    }
    checkScroll()
  })

  window.addEventListener("scroll", checkScroll)

  // Tab Navigation
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Show corresponding content
      const tabId = button.getAttribute("data-tab")
      document.getElementById(`${tabId}-content`).classList.add("active")
    })
  })

  // Chatbot functionality
  const chatbot = document.getElementById("chatbot")
  const chatbotIcon = document.getElementById("chatbot-icon")
  const chatbotWindow = document.getElementById("chatbot-window")
  const chatbotBubble = document.getElementById("chatbot-bubble")
  const pupils = document.querySelectorAll(".pupil")
  const chatbotMouth = document.querySelector(".chatbot-mouth")
  const closeChatbot = document.getElementById("close-chatbot")
  const userMessageInput = document.getElementById("user-message")
  const sendMessageBtn = document.getElementById("send-message")
  const messagesContainer = document.getElementById("chatbot-messages")

  // Make the chatbot follow the mouse with eyes
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY

    pupils.forEach((pupil) => {
      const rect = chatbot.getBoundingClientRect()
      const chatbotX = rect.left + rect.width / 2
      const chatbotY = rect.top + rect.height / 2

      // Calculate angle between mouse and chatbot
      const angle = Math.atan2(mouseY - chatbotY, mouseX - chatbotX)

      // Calculate pupil position (limited movement)
      const maxMove = 3
      const pupilX = Math.cos(angle) * maxMove + 3
      const pupilY = Math.sin(angle) * maxMove + 3

      pupil.style.left = pupilX + "px"
      pupil.style.top = pupilY + "px"
    })

    // Change mouth expression based on mouse position
    const windowHeight = window.innerHeight
    const smileAmount = 1 - mouseY / windowHeight

    // Adjust mouth curvature based on mouse Y position
    chatbotMouth.style.height = `${8 + smileAmount * 8}px`
    chatbotMouth.style.borderRadius = `0 0 ${10 + smileAmount * 10}px ${10 + smileAmount * 10}px`
  })

  // Toggle chatbot window
  chatbotIcon.addEventListener("click", () => {
    chatbotWindow.classList.toggle("active")
    chatbotBubble.classList.remove("active")

    // Happy expression when clicked
    if (chatbotWindow.classList.contains("active")) {
      chatbotMouth.style.height = "16px"
      chatbotMouth.style.borderRadius = "0 0 20px 20px"
    } else {
      chatbotMouth.style.height = "12px"
      chatbotMouth.style.borderRadius = "0 0 12px 12px"
    }
  })

  // Close chatbot window
  closeChatbot.addEventListener("click", () => {
    chatbotWindow.classList.remove("active")
  })

  // Update the initial chatbot message
  setTimeout(() => {
    if (!chatbotWindow.classList.contains("active")) {
      chatbotBubble.classList.add("active")

      // Vary the initial message
      const initialMessages = [
        "Hey there! 👋 Got questions?",
        "Hi! Want to know about Darya? 🚀",
        "Hello! I'm here to help! ✨",
        "Hey! Ask me anything about Darya! 💻",
      ]

      const randomMessage = initialMessages[Math.floor(Math.random() * initialMessages.length)]
      chatbotBubble.querySelector("p").textContent = randomMessage

      // Hide bubble after 5 seconds
      setTimeout(() => {
        chatbotBubble.classList.remove("active")
      }, 5000)
    }
  }, 3000)

  // Update the chatbot responses database with more variety
  const chatbotResponses = {
    greeting: [
      "Hello! 👋 How can I help you today?",
      "Hi there! What would you like to know about Darya?",
      "Hey! I'm Darya's virtual assistant. What can I do for you?",
      "Greetings! Ready to learn about an amazing computer scientist? 🚀",
      "Welcome! I'm here to tell you all about Darya's journey in tech! ✨",
    ],
    about: [
      "Darya is a B.S./M.S. Computer Science student at FSU on a fast-track 5-year program. She's passionate about systems, algorithms, and data-driven technologies!",
      "She's currently conducting research through UROP and DIS, focusing on algorithmic optimization and AI performance. Pretty cool, right? 🔬",
      "As WiCS President, Darya leads technical workshops and mentorship programs. She's all about making tech more accessible! 💪",
    ],
    contact: [
      "You can reach Darya via email at daryap101@gmail.com or by phone at +1 941-275-0410.",
      "Want to connect with Darya? Email her at daryap101@gmail.com or call +1 941-275-0410. She's always excited to chat about tech! 📞",
      "Best way to reach her is daryap101@gmail.com - she usually responds pretty quickly! ⚡",
    ],
    github: [
      "Check out Darya's GitHub at github.com/lldaryall to see her coding projects!",
      "Her GitHub is where the magic happens: github.com/lldaryall 🎩✨",
      "Want to see some code? Head over to github.com/lldaryall - warning: you might get inspired! 💻",
    ],
    linkedin: [
      "Connect with Darya professionally on LinkedIn: linkedin.com/in/darya-pylypenko-24288b207",
      "For professional networking, find Darya on LinkedIn. She loves connecting with fellow tech enthusiasts! 🤝",
      "LinkedIn is great for staying updated on her latest achievements: linkedin.com/in/darya-pylypenko-24288b207",
    ],
    education: [
      "Darya is pursuing a B.S./M.S. in Computer Science at FSU with a Business minor, graduating in 2027. She's on the fast track! 🎓",
      "Florida State University is where she's mastering the art of computer science. 3.7 GPA and counting! 📚",
      "She's in the 5-year combined program at FSU - efficiency at its finest! Plus she's a UROP Scholar. 🌟",
    ],
    projects: [
      "Darya's working on some amazing projects! From C++ games to e-commerce sites to MIPS assembly - she does it all! 🛠️",
      "Her projects range from PokéSim games to AWS certification tools. And yes, you're looking at one of her projects right now! 😄",
      "Check out her portfolio - she's built everything from terminal games to full-stack websites. Quite the range! 🎯",
    ],
    languages: [
      "Darya speaks English, Ukrainian, Italian, Russian, and Spanish. Talk about multilingual! 🌍",
      "Five languages! She can probably debug code in multiple languages too. 😉",
      "Ukrainian, Italian, Russian, Spanish, and English - she's basically a human Google Translate! 🗣️",
    ],
    certification: [
      "Darya has her AWS Cloud Practitioner certification - she knows her way around the cloud! ☁️",
      "AWS certified and ready to scale! Her cloud skills are definitely not just hot air. 💨",
      "She's AWS Cloud Practitioner certified, which is pretty impressive for a student! 🏆",
    ],
    wics: [
      "As WiCS President at FSU, Darya leads initiatives to support women in tech. She's making a real difference! 👩‍💻",
      "She's the President of Women in Computer Science - leading the charge for diversity in tech! 🚀",
      "WiCS President and proud of it! She organizes workshops, mentorship, and networking events. 💪",
    ],
    research: [
      "Darya's doing research through UROP and DIS on algorithmic optimization and systems-level computing. Fancy stuff! 🔬",
      "Her research focuses on AI performance and algorithmic optimization. She's literally making computers smarter! 🧠",
      "UROP Scholar working on cutting-edge research in algorithms and systems. The future is bright! ✨",
    ],
    skills: [
      "She's proficient in C++, Python, MIPS, JavaScript, and more. Plus she's exploring Rust and CUDA! 💻",
      "From low-level MIPS to high-level web dev, she's got the full stack covered! 📚",
      "Her tech stack is impressive: C++, Python, AWS, React, and she's diving into GPU computing! ⚡",
    ],
    funny: [
      "Fun fact: She built this website you're looking at right now! Meta, right? 🤯",
      "She can lift weights AND write code. Talk about full-stack development! 💪💻",
      "She speaks 5 languages but still argues with her compiler in English. 😅",
    ],
    default: [
      "I'm here to help! Feel free to ask about Darya's education, projects, skills, or contact information.",
      "Not sure what you're looking for? Try asking about her research, projects, or how to get in touch! 🤔",
      "I'd be happy to tell you more about Darya! You can ask about her background, skills, or anything else! 😊",
      "Hmm, I'm not sure about that one. But I can tell you about Darya's amazing journey in computer science! 🚀",
    ],
  }

  // Handle sending messages
  function sendMessage() {
    const userMessage = userMessageInput.value.trim()

    if (userMessage) {
      // Add user message to chat
      const userMessageElement = document.createElement("div")
      userMessageElement.className = "message user-message"
      userMessageElement.innerHTML = `<p>${userMessage}</p>`
      messagesContainer.appendChild(userMessageElement)

      // Clear input
      userMessageInput.value = ""

      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight

      // Simulate assistant typing
      setTimeout(() => {
        // Add assistant response
        const assistantResponse = getChatbotResponse(userMessage)
        const assistantMessageElement = document.createElement("div")
        assistantMessageElement.className = "message bot-message"
        assistantMessageElement.innerHTML = `<p>${assistantResponse}</p>`
        messagesContainer.appendChild(assistantMessageElement)

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }, 1000)
    }
  }

  // Improve the response selection logic
  function getChatbotResponse(message) {
    message = message.toLowerCase()

    // More sophisticated keyword matching
    let category = "default"
    const responsePool = []

    // Check for multiple categories and combine responses
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey") ||
      message.includes("greetings") ||
      message.includes("sup")
    ) {
      category = "greeting"
    } else if (message.includes("about") || message.includes("who is") || message.includes("tell me about")) {
      category = "about"
    } else if (
      message.includes("contact") ||
      message.includes("email") ||
      message.includes("phone") ||
      message.includes("reach") ||
      message.includes("call")
    ) {
      category = "contact"
    } else if (message.includes("github") || message.includes("code") || message.includes("repository")) {
      category = "github"
    } else if (message.includes("linkedin") || message.includes("professional") || message.includes("network")) {
      category = "linkedin"
    } else if (
      message.includes("education") ||
      message.includes("study") ||
      message.includes("university") ||
      message.includes("college") ||
      message.includes("fsu") ||
      message.includes("school")
    ) {
      category = "education"
    } else if (
      message.includes("project") ||
      message.includes("work") ||
      message.includes("portfolio") ||
      message.includes("build") ||
      message.includes("made")
    ) {
      category = "projects"
    } else if (message.includes("language") || message.includes("speak") || message.includes("multilingual")) {
      category = "languages"
    } else if (
      message.includes("certification") ||
      message.includes("aws") ||
      message.includes("cloud") ||
      message.includes("certified")
    ) {
      category = "certification"
    } else if (message.includes("wics") || message.includes("women") || message.includes("president")) {
      category = "wics"
    } else if (message.includes("research") || message.includes("urop") || message.includes("algorithm")) {
      category = "research"
    } else if (
      message.includes("skill") ||
      message.includes("technology") ||
      message.includes("programming") ||
      message.includes("tech")
    ) {
      category = "skills"
    } else if (
      message.includes("funny") ||
      message.includes("joke") ||
      message.includes("fun") ||
      message.includes("cool") ||
      message.includes("awesome")
    ) {
      category = "funny"
    }

    // Get responses from the selected category
    const responses = chatbotResponses[category]

    // Add some randomness and personality
    let selectedResponse = responses[Math.floor(Math.random() * responses.length)]

    // Add occasional follow-up suggestions
    if (Math.random() < 0.3) {
      const suggestions = [
        " Want to know more about her projects?",
        " Curious about her research?",
        " Ask me about her skills!",
        " Want her contact info?",
        " Interested in her background?",
      ]
      selectedResponse += suggestions[Math.floor(Math.random() * suggestions.length)]
    }

    return selectedResponse
  }

  // Send message on button click
  sendMessageBtn.addEventListener("click", sendMessage)

  // Send message on Enter key
  userMessageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  // Random blinking for the chatbot
  function blinkEyes() {
    const eyes = document.querySelectorAll(".eye")

    eyes.forEach((eye) => {
      eye.style.height = "1px"
      eye.style.transform = "translateY(3px)"
    })

    setTimeout(() => {
      eyes.forEach((eye) => {
        eye.style.height = "12px"
        eye.style.transform = "translateY(0)"
      })
    }, 150)

    // Random blink interval
    const nextBlink = Math.random() * 5000 + 2000
    setTimeout(blinkEyes, nextBlink)
  }

  // Start blinking
  setTimeout(blinkEyes, 3000)

  // Add animated characters
  const animatedCharacters = document.querySelector(".animated-characters")
  const characters = [
    "⚡",
    "✨",
    "💻",
    "🚀",
    "🔍",
    "📊",
    "🌟",
    "💡",
    "🎓",
    "📱",
    "🎯",
    "🔮",
    "🎨",
    "🎭",
    "🎬",
    "🎧",
    "📚",
    "🧠",
    "💭",
    "💬",
  ]

  // Add many more characters for visibility
  for (let i = 0; i < 50; i++) {
    const character = document.createElement("div")
    character.className = "floating-character"

    // Random character
    character.textContent = characters[Math.floor(Math.random() * characters.length)]

    // Random position
    character.style.left = `${Math.random() * 100}%`
    character.style.top = `${Math.random() * 100}%`

    // Random size - make them larger for visibility
    character.style.fontSize = `${Math.random() * 30 + 20}px`

    // Random animation duration
    character.style.animationDuration = `${Math.random() * 30 + 20}s`

    // Random delay
    character.style.animationDelay = `${Math.random() * 5}s`

    // Higher opacity for visibility
    character.style.opacity = Math.random() * 0.5 + 0.3

    // Add to container
    animatedCharacters.appendChild(character)
  }

  // Add animated dots
  for (let i = 0; i < 100; i++) {
    const dot = document.createElement("div")
    dot.className = "animated-dot"

    // Random size between 4px and 12px - larger for visibility
    const size = Math.random() * 8 + 4
    dot.style.width = `${size}px`
    dot.style.height = `${size}px`

    // Random position
    dot.style.left = `${Math.random() * 100}%`
    dot.style.top = `${Math.random() * 100}%`

    // Random animation duration
    dot.style.animationDuration = `${Math.random() * 20 + 20}s`

    // Random delay
    dot.style.animationDelay = `${Math.random() * 5}s`

    // Higher opacity for visibility
    dot.style.opacity = Math.random() * 0.5 + 0.3

    // Random color - either accent or secondary color
    dot.style.backgroundColor = Math.random() > 0.5 ? "var(--accent-color)" : "var(--secondary-color)"

    // Add to container
    animatedCharacters.appendChild(dot)
  }

  // Create emoji rain effect
  const emojiRain = document.getElementById("emoji-rain")
  const emojis = [
    "💻",
    "🚀",
    "⚡",
    "✨",
    "🌟",
    "💡",
    "🎓",
    "📱",
    "🎯",
    "🔮",
    "🎨",
    "🎭",
    "🎬",
    "🎧",
    "📚",
    "🧠",
    "💭",
    "💬",
    "🔍",
    "📊",
  ]

  // Function to create a new falling emoji
  function createEmoji() {
    const emoji = document.createElement("div")
    emoji.className = "emoji"
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]

    // Random horizontal position
    emoji.style.left = `${Math.random() * 100}%`

    // Start above the viewport
    emoji.style.top = "-50px"

    // Random size
    emoji.style.fontSize = `${Math.random() * 30 + 20}px`

    // Random animation duration
    emoji.style.animationDuration = `${Math.random() * 10 + 5}s`

    // Random opacity
    emoji.style.opacity = Math.random() * 0.7 + 0.3

    // Add to container
    emojiRain.appendChild(emoji)

    // Remove after animation completes
    setTimeout(() => {
      emoji.remove()
    }, 15000)
  }

  // Create emojis periodically
  setInterval(createEmoji, 500)

  // Create initial batch of emojis
  for (let i = 0; i < 20; i++) {
    setTimeout(createEmoji, i * 200)
  }

  // Avatar placeholder
  const avatarImg = document.getElementById("avatar-img")

  // Set a placeholder image if no image is provided
  if (avatarImg.getAttribute("src") === "avatar-placeholder.jpg") {
    // Create a canvas for a placeholder avatar
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 200
    canvas.height = 200

    // Draw different backgrounds based on theme
    function updateAvatarPlaceholder() {
      const currentTheme = htmlElement.getAttribute("data-theme")

      if (currentTheme === "dark") {
        // Futuristic tech pattern for dark theme
        ctx.fillStyle = "#121212"
        ctx.fillRect(0, 0, 200, 200)

        // Draw some tech-looking lines
        ctx.strokeStyle = "#00ffaa"
        ctx.lineWidth = 2

        // Circuit pattern
        for (let i = 0; i < 10; i++) {
          ctx.beginPath()
          ctx.moveTo(Math.random() * 200, Math.random() * 200)
          ctx.lineTo(Math.random() * 200, Math.random() * 200)
          ctx.stroke()
        }

        // Draw DP initials
        ctx.font = "bold 60px Space Grotesk"
        ctx.fillStyle = "#00ffaa"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("DP", 100, 100)
      } else {
        // Cute pattern for light theme
        ctx.fillStyle = "#ffeef5"
        ctx.fillRect(0, 0, 200, 200)

        // Draw some cute patterns
        ctx.fillStyle = "#ff6b9d"

        // Draw small hearts
        for (let i = 0; i < 15; i++) {
          const x = Math.random() * 180 + 10
          const y = Math.random() * 180 + 10
          const size = Math.random() * 10 + 5

          drawHeart(ctx, x, y, size)
        }

        // Draw DP initials
        ctx.font = "bold 60px Quicksand"
        ctx.fillStyle = "#ff6b9d"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("DP", 100, 100)
      }

      // Update the avatar image
      avatarImg.src = canvas.toDataURL()
    }

    // Helper function to draw a heart
    function drawHeart(ctx, x, y, size) {
      ctx.beginPath()
      ctx.moveTo(x, y + size / 4)
      ctx.quadraticCurveTo(x, y, x + size / 4, y)
      ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4)
      ctx.quadraticCurveTo(x + size / 2, y, x + (size * 3) / 4, y)
      ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4)
      ctx.quadraticCurveTo(x + size, y + size / 2, x + size / 2, y + (size * 3) / 4)
      ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4)
      ctx.fill()
    }

    // Initial avatar creation
    updateAvatarPlaceholder()

    // Update avatar when theme changes
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateAvatarPlaceholder)
    }
  }

  // Initialize - show all fade-in elements
  revealElements.forEach((element) => {
    element.classList.add("active")
  })

  // Scroll to top function
  const logo = document.querySelector(".logo")
  if (logo) {
    logo.addEventListener("click", scrollToTop)
  }
})
