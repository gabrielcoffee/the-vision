document.addEventListener("DOMContentLoaded", () => {
    // Contact form handling
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    const lang = localStorage.getItem("language") || "EN-US";

    const localizedContent = {
    "EN-US": {
        greeting: "Hi",
        messageLine: "Thank you for reaching out to us! We have received your request and we'll do our best to process it within 3 business days.",
        signature: "Best regards,<br />The Vision",
        subject: "We've received your message — The Vision"
    },
    "PT-BR": {
        greeting: "Olá",
        messageLine: "Obrigado por entrar em contato! Recebemos sua solicitação e faremos o possível para processá-la em até 3 dias úteis.",
        signature: "Atenciosamente,<br />The Vision",
        subject: "Recebemos sua mensagem — The Vision"
    }
    };

	const sanitize = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

	["name", "email", "phone", "message"].forEach(id => {
		const el = document.getElementById(id);
		el.value = sanitize(el.value.trim());
	});

    // Fill hiddden fields with localized text
    document.getElementById("formLang").value = lang;
    document.getElementById("formGreeting").value = localizedContent[lang].greeting;
    document.getElementById("formMessageLine").value = localizedContent[lang].messageLine;
    document.getElementById("formSignature").value = localizedContent[lang].signature;
    document.getElementById("formSubject").value = localizedContent[lang].subject;

    emailjs.init(window.ENV.EMAILJS_PUBLIC_KEY); // Replace with your EmailJS public key

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevents the page from reloading on submit
        
		// First: send notification to your company
		emailjs.sendForm(window.ENV.SERVICE_ID, window.ENV.NOTIFY_COMPANY_TEMPLATE, contactForm)
		.then(() => {
			// Then: send auto-reply to client
			return emailjs.sendForm(window.ENV.SERVICE_ID, window.ENV.TEMPLATE_ID, contactForm);
		})
		.then(() => {
			successMessage.style.display = "block";
			errorMessage.style.display = "none";
			contactForm.reset();

			setTimeout(() => {
			successMessage.style.display = "none";
			}, 5000);
		})
		.catch(() => {
			errorMessage.style.display = "block";
			successMessage.style.display = "none";
		});
    });

    
    // Additional translations for contact page
    const additionalTranslations = {
      "EN-US": {
        "contact.page.title": "Get in Touch",
        "contact.page.title.2": "Or simply fill out this form",
        "contact.page.description": "We'll get back to you as soon as possible.",
        "contact.form.name": "Name",
        "contact.form.email": "Email",
        "contact.form.phone": "Phone",
        "contact.form.message": "Project Description",
        "contact.form.submit": "Send Message",
        "contact.form.success": "Your message has been sent successfully. We'll get back to you soon!",
        "contact.form.error": "There was an error sending your message. Please try again."
      },
      "PT-BR": {
        "contact.page.title": "Entre em Contato",
        "contact.page.title.2": "Ou apenas preencha este formulário",
        "contact.page.description": "Entraremos em contato o mais breve possível.",
        "contact.form.name": "Nome",
        "contact.form.email": "Email",
        "contact.form.phone": "Telefone",
        "contact.form.message": "Descrição do Projeto",
        "contact.form.submit": "Enviar Mensagem",
        "contact.form.success": "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!",
        "contact.form.error": "Houve um erro ao enviar sua mensagem. Por favor, tente novamente."
      }
    };
    
    // Add contact page translations to the main translations object
    if (window.translations) {
      for (const lang in additionalTranslations) {
        for (const key in additionalTranslations[lang]) {
          window.translations[lang][key] = additionalTranslations[lang][key];
        }
      }
    }
    
    // Additional translatable elements for contact page
    const additionalTranslatableElements = [
      { selector: ".contact-page-title", key: "contact.page.title" },
      { selector: ".contact-page-title-2", key: "contact.page.title.2" },
      { selector: ".contact-page-description", key: "contact.page.description" },
      { selector: "label[for='name']", key: "contact.form.name" },
      { selector: "label[for='email']", key: "contact.form.email" },
      { selector: "label[for='phone']", key: "contact.form.phone" },
      { selector: "label[for='message']", key: "contact.form.message" },
      { selector: ".form-submit", key: "contact.form.submit" },
      { selector: "#successMessage", key: "contact.form.success" },
      { selector: "#errorMessage", key: "contact.form.error" }
    ];
    
    // Add contact page elements to the main translatable elements array
    if (window.translatableElements) {
      window.translatableElements = window.translatableElements.concat(additionalTranslatableElements);
    }
    
    // Update form submit button with icon when language changes
    const updateFormSubmitButton = (lang) => {
      const submitButton = document.querySelector(".form-submit");
      if (submitButton) {
        submitButton.innerHTML = `
          ${lang === "PT-BR" ? additionalTranslations["PT-BR"]["contact.form.submit"] : additionalTranslations["EN-US"]["contact.form.submit"]}
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        `;
      }
    };
    
    // Override the changeLanguage function to include our custom handler
    const originalChangeLanguage = window.changeLanguage;
    if (originalChangeLanguage) {
      window.changeLanguage = function(lang) {
        originalChangeLanguage(lang);
        updateFormSubmitButton(lang);
      };
    }
    
    // Check if there's a stored theme/language preference
    const storedTheme = localStorage.getItem('theme');
    const storedLanguage = localStorage.getItem('language');
    
    if (storedTheme) {
      document.body.classList.toggle('dark-theme', storedTheme === 'dark');
      document.querySelector('.theme-text').textContent = storedTheme === 'dark' ? 'Night' : 'Day';
      document.querySelector('.moon-icon').classList.toggle('hidden', storedTheme !== 'dark');
      document.querySelector('.sun-icon').classList.toggle('hidden', storedTheme === 'dark');
    }
    
    if (storedLanguage && window.changeLanguage) {
      window.changeLanguage(storedLanguage);
    }
});