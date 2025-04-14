document.addEventListener("DOMContentLoaded", () => {

	// Language switching
	const languageDropdown = document.querySelector(".language-dropdown")
	const languageOptions = document.querySelectorAll(".language-dropdown .dropdown-content a")
	const languageText = document.querySelector(".language-text")

	// Theme switching
	const themeDropdown = document.querySelector(".theme-dropdown")
	const themeOptions = document.querySelectorAll(".theme-dropdown .dropdown-content a")
	const themeText = document.querySelector(".theme-text")
	const moonIcon = document.querySelector(".moon-icon")
	const sunIcon = document.querySelector(".sun-icon")

	// Translations
	const translations = {
		"EN-US": {
		"night.mode": "Noite",
		"day.mode": "Dia",
		"nav.services": "Services",
		"nav.technologies": "Technologies",
		"nav.contact": "Contact",
		"cta.getInTouch": "Get in touch",
		"hero.description":
			"Your technology partner from Curitiba, Brazil. We transform your vision into robust, customized software that delivers results.",
		"hero.cta": "Get in touch",
		"services.title": "WHAT WE DO",
		
			"service.webDev.title": "Static Websites",
			"service.webDev.description": "We build static websites focused on business, portfolio, and landing pages. Our sites are fast, secure, and optimized for SEO, serving as an effective and cost-efficient tool to showcase your brand, attract leads, and provide a clean, engaging user experience.",
			"service.webApps.title": "Web Apps",
			"service.webApps.description": "We develop dynamic web applications such as dashboards, e-commerce platforms, and collaboration tools. Our solutions feature real-time data management, robust authentication systems, and scalable architecture designed to grow with your business.",
			"service.ai.title": "AI Integration",
			"service.ai.description": "We implement advanced AI integrations to streamline processes and deliver actionable insights. Examples include customer service chatbots, recommendation engines, and predictive analytics. Additionally, we build and train custom machine learning algorithms tailored to your data, enhancing decision-making and automation.",
			"service.design.title": "Mobile Apps",
			"service.design.description": "We craft intuitive and high-performing mobile applications. Our mobile solutions emphasize seamless user experiences, rapid performance, and native integration to help your app stand out in today's competitive market.",
		
		"tech.title": "TECHNOLOGIES",
		"tech.frontend": "Frontend",
		"tech.backend": "Backend",
		"tech.database": "Database",
		"projects.title": "IDEAL PROJECTS",
		"projects.description":
			"We excel at working with emerging companies looking to build innovative digital products. Our ideal projects involve creating custom web applications with modern technologies and integrating AI capabilities to solve real business problems.",
		"contact.title": "Ready to transform your vision?",
		"contact.description":
			"Let's discuss how we can help bring your ideas to life with our tailored software solutions.",
		"contact.cta": "Contact us",
		"footer.copyright": "© 2025 THE VISION. All rights reserved.",
		},
		"PT-BR": {
		"night.mode": "Noite",
		"day.mode": "Dia",
		"nav.services": "Serviços",
		"nav.technologies": "Tecnologias",
		"nav.contact": "Contato",
		"cta.getInTouch": "Entre em contato",
		"hero.description":
			"Seu parceiro de tecnologia de Curitiba, Brasil. Transformamos sua visão em software robusto e personalizado que entrega resultados.",
		"hero.cta": "Entre em contato",
		"services.title": "O QUE FAZEMOS",
		"service.webDev.title": "Sites Estáticos",
		"service.webDev.description": "Criamos sites estáticos focados em negócios, portfólios e landing pages. Nossos sites são rápidos, seguros e otimizados para SEO, servindo como uma ferramenta eficaz e econômica para apresentar sua marca, atrair clientes e oferecer uma experiência de usuário limpa e envolvente.",
		"service.webApps.title": "Aplicações Web",
		"service.webApps.description": "Desenvolvemos aplicações web dinâmicas, como painéis de controle, plataformas de e-commerce e ferramentas de colaboração. Nossas soluções apresentam gerenciamento de dados em tempo real, sistemas robustos de autenticação e uma arquitetura escalável projetada para acompanhar o crescimento do seu negócio.",
		"service.ai.title": "Integração de IA",
		"service.ai.description": "Implementamos integrações avançadas de IA para otimizar processos e fornecer insights acionáveis. Exemplos incluem chatbots para atendimento ao cliente, motores de recomendação e análises preditivas. Além disso, desenvolvemos algoritmos personalizados de aprendizado de máquina treinados com seus dados, melhorando a tomada de decisões e a automação.",
		"service.design.title": "Aplicativos Móveis",
		"service.design.description": "Criamos aplicativos móveis intuitivos e de alto desempenho. Nossas soluções móveis priorizam experiências de usuário fluídas, desempenho rápido e integração nativa, garantindo que seu aplicativo se destaque no mercado competitivo atual.",
		"tech.title": "TECNOLOGIAS",
		"tech.frontend": "Frontend",
		"tech.backend": "Backend",
		"tech.database": "Banco de Dados",
		"projects.title": "PROJETOS IDEAIS",
		"projects.description":
			"Nós nos destacamos trabalhando com empresas emergentes que buscam construir produtos digitais inovadores. Nossos projetos ideais envolvem a criação de aplicações web personalizadas com tecnologias modernas e a integração de recursos de IA para resolver problemas reais de negócios.",
		"contact.title": "Pronto para transformar sua visão?",
		"contact.description":
			"Vamos discutir como podemos ajudar a dar vida às suas ideias com nossas soluções de software personalizadas.",
		"contact.cta": "Contate-nos",
		"footer.copyright": "© 2025 THE VISION. Todos os direitos reservados.",
		},
	}

	// Elements to translate
	const translatableElements = [
		{ selector: "night-mode", key: "night.mode" },
		{ selector: "day-mode", key: "day.mode" },
		{ selector: ".nav-services", key: "nav.services" },
		{ selector: ".nav-technologies", key: "nav.technologies" },
		{ selector: ".nav-contact", key: "nav.contact" },
		{ selector: ".get-in-touch", key: "cta.getInTouch" },
		{ selector: ".hero-description", key: "hero.description" },
		{ selector: ".start-project", key: "hero.cta" },
		{ selector: ".services .section-title", key: "services.title" },
		{ selector: ".service-card:nth-child(1) .service-title", key: "service.webDev.title" },
		{ selector: ".service-card:nth-child(1) .service-description", key: "service.webDev.description" },
		{ selector: ".service-card:nth-child(2) .service-title", key: "service.webApps.title" },
		{ selector: ".service-card:nth-child(2) .service-description", key: "service.webApps.description" },
		{ selector: ".service-card:nth-child(3) .service-title", key: "service.ai.title" },
		{ selector: ".service-card:nth-child(3) .service-description", key: "service.ai.description" },
		{ selector: ".service-card:nth-child(4) .service-title", key: "service.design.title" },
		{ selector: ".service-card:nth-child(4) .service-description", key: "service.design.description" },
		{ selector: ".technologies .section-title", key: "tech.title" },
		{ selector: ".tech-category:nth-child(1) .tech-category-title", key: "tech.frontend" },
		{ selector: ".tech-category:nth-child(2) .tech-category-title", key: "tech.backend" },
		{ selector: ".tech-category:nth-child(3) .tech-category-title", key: "tech.database" },
		{ selector: ".projects .section-title", key: "projects.title" },
		{ selector: ".projects-description p", key: "projects.description" },
		{ selector: ".contact .section-title", key: "contact.title" },
		{ selector: ".contact-description", key: "contact.description" },
		{ selector: ".contact-us", key: "contact.cta" },
		{ selector: ".copyright", key: "footer.copyright" },
	]

	window.translations = translations;
	window.translatableElements = translatableElements;

	document.querySelectorAll('.dropdown-button').forEach(toggle => {
		toggle.addEventListener('click', function(e) {
		e.stopPropagation(); // Prevent the document listener from firing

		// Get the dropdown content associated with this button
		const dropdown = e.currentTarget.closest('.dropdown');
		const content = dropdown.querySelector('.dropdown-content');

		// Close all dropdowns
		document.querySelectorAll('.dropdown-content').forEach(item => {
			item.classList.add('hidden');
		});

		// Toggle the dropdown of the clicked button only if it was hidden
		if (content.classList.contains('hidden')) {
			content.classList.remove('hidden');
		}
		});
	});

	// Close all dropdowns when clicking anywhere outside
	document.addEventListener('click', function() {
		document.querySelectorAll('.dropdown-content').forEach(item => {
		item.classList.add('hidden');
		});
	});

	// Change language
	window.changeLanguage = function(lang) {
		languageText.textContent = lang;

		// Update all translatable elements
		window.translatableElements?.forEach((item) => {
		const element = document.querySelector(item.selector);
		if (element && window.translations?.[lang]?.[item.key]) {
			element.textContent = window.translations[lang][item.key];
		}
		});
		localStorage.setItem("language", lang);
	}
	

	// Set the language on page load based on user browser language
	let storedLanguage = localStorage.getItem("language");

	if (!storedLanguage) {
		const browserLang = navigator.language || navigator.userLanguage;
		
		// Basic logic: use PT-BR if browser is Portuguese
		if (browserLang.toLowerCase().startsWith("pt")) {
			storedLanguage = "PT-BR";
		} else {
			storedLanguage = "EN-US";
		}
		
		localStorage.setItem("language", storedLanguage);
	}
	window.changeLanguage(storedLanguage);


	// Language event listeners
	languageOptions.forEach((option) => {
		option.addEventListener("click", function (e) {
		e.preventDefault()
		const lang = this.getAttribute("data-lang")
		changeLanguage(lang)
		})
	})

	// Change theme
	function changeTheme(theme) {
		if (theme === "light") {
		document.body.classList.remove("dark-theme")
		themeText.textContent = "Day"
		moonIcon.classList.add("hidden")
		sunIcon.classList.remove("hidden")
		} else {
		document.body.classList.add("dark-theme")
		themeText.textContent = "Night"
		moonIcon.classList.remove("hidden")
		sunIcon.classList.add("hidden")
		}
	}

	// Theme event listeners
	themeOptions.forEach((option) => {
		option.addEventListener("click", function (e) {
		e.preventDefault()
		const theme = this.getAttribute("data-theme")
		changeTheme(theme)
		})
	})
})