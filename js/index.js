document.addEventListener('DOMContentLoaded', () => {
	// Sliders
	const initializeSwiper = (selector, bulletsClass, navigationSelectors) => {
		return new Swiper(selector, {
			lazy: true,
			speed: 1000,
			spaceBetween: 80,
			autoplay: { delay: 8000 },
			navigation: navigationSelectors,
			on: {
				init() {
					createBullets(this, bulletsClass);
				},
				slideChange() {
					updateActiveBullet(this, bulletsClass);
				},
			},
		});
	};
	// For new slider add new config by example
	const swiperConfig = [
		{ selector: '.slider-saas', bulletsClass: '.slider-navigation__bullets', navigation: { nextEl: '.slider-saas__arrow_next', prevEl: '.slider-saas__arrow_prev' } },
		{ selector: '.slider-cases', bulletsClass: '.slider-cases__bullets', navigation: { nextEl: '.slider-cases__arrow_next', prevEl: '.slider-cases__arrow_prev' } },
	];
	swiperConfig.forEach(({ selector, bulletsClass, navigation }) => {
		initializeSwiper(selector, bulletsClass, navigation);
	});
	function createBullets(swiper, className) {
		swiper.slides.forEach((slide, slideIndex) => {
			const bulletsContainer = slide.querySelector(className);
			if (bulletsContainer) {
				swiper.slides.forEach((_, bulletIndex) => {
					const bullet = document.createElement('div');
					bullet.classList.add('bullet');
					if (bulletIndex === slideIndex) bullet.classList.add('active');
					bullet.addEventListener('click', () => swiper.slideTo(bulletIndex));
					bulletsContainer.appendChild(bullet);
				});
			}
		});
	}
	function updateActiveBullet(swiper, className) {
		swiper.slides.forEach((slide) => {
			const bullets = slide.querySelectorAll(`${className}.bullet`);
			bullets.forEach((bullet, bulletIndex) => {
				bullet.classList.toggle('active', bulletIndex === swiper.activeIndex);
			});
		});
	}
	// From validator
	const form = document.querySelector('.form');
	const inputs = document.querySelectorAll('.form__input');
	const validateField = (input) => {
		const label = input.nextElementSibling;
		const value = input.value.trim();
		if (!value) {
			setError(input, label, 'This field is required');
			return false;
		}
		clearError(input, label);
		if (input.type === 'email' && !validateEmail(value)) {
			setError(input, label, 'Invalid email format');
			return false;
		}
		if (input.name === 'number' && !validatePhoneNumber(value)) {
			setError(input, label, 'Invalid phone number');
			return false;
		}
		return true;
	};
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const isValid = Array.from(inputs).every(validateField);
		if (isValid) form.submit();
	});
	inputs.forEach((input) => {
		input.addEventListener('input', () => validateField(input));
	});
	function setError(input, label, message) {
		input.classList.add('error');
		label.textContent = message;
		label.style.opacity = '1';
	}
	function clearError(input, label) {
		input.classList.remove('error');
		label.textContent = '';
		label.style.opacity = '0';
	}
	function validateEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
	function validatePhoneNumber(number) {
		const phoneRegex = /^[+]?[\d]{3,}$/;
		return phoneRegex.test(number);
	}
	// Menu
	const toggleMenu = () => {
		const burger = document.querySelector('.burger');
		const menu = document.querySelector('#menu');
		const body = document.body;
		burger.classList.toggle('active');
		menu.classList.toggle('show');
		body.classList.toggle('lock');
	};
	document.querySelector('.menu__close').addEventListener('click', toggleMenu);
	document.querySelector('.burger').addEventListener('click', toggleMenu);
	const progressBar = document.querySelector('.progress-bar__line span');
	const header = document.querySelector('.header');
	const progressBarContainer = document.querySelector('.progress-bar');
	let headerHeight = header?.offsetHeight || 0;
	let progressBarHeight = progressBarContainer?.offsetHeight || 0;
	const updateProgressBar = () => {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrollPercentage = (scrollTop / docHeight) * 100;
		progressBar.style.width = `${scrollPercentage}%`;
	};
	const updateMenuLinks = () => {
		const links = document.querySelectorAll('.progress-bar__link');
		const sections = document.querySelectorAll('section');
		links.forEach((link) => link.classList.remove('active'));
		sections.forEach((section) => {
			if (window.scrollY >= section.offsetTop) {
				const sectionId = section.getAttribute('id');
				const activeLink = document.querySelector(`.progress-bar__link[href="#${sectionId}"]`);
				if (activeLink) activeLink.classList.add('active');
			}
		});
	};
	const toggleHeaderProgress = () => {
		if (window.scrollY > 250) {
			header.classList.add('progress');
			document.body.style.paddingTop = `${headerHeight - progressBarHeight}px`;
		} else {
			header.classList.remove('progress');
			document.body.style.paddingTop = '0';
		}
	};
	window.addEventListener('scroll', () => {
		updateProgressBar();
		updateMenuLinks();
		toggleHeaderProgress();
	});
	document.addEventListener('DOMContentLoaded', () => {
		headerHeight = header?.offsetHeight || 0;
		progressBarHeight = progressBarContainer?.offsetHeight || 0;
	});
});
