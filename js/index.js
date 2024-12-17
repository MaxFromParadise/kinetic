document.addEventListener('DOMContentLoaded', () => {
	const swiperSaas = new Swiper('.slider-saas', {
		speed: 1000,
		spaceBetween: 80,
		on: {
			init: function () {
				createBullets(this, '.slider-navigation__bullets');
			},
			slideChange: function () {
				updateActiveBullet(this, '.slider-navigation__bullets');
			},
		},
		// pagination: {
		// 	el: '.slider-saas__bullets',
		// 	clickable: true,
		// },
		autoplay: {
			delay: 8000,
		},
		navigation: {
			nextEl: '.slider-saas__arrow_next',
			prevEl: '.slider-saas__arrow_prev',
		},
	});
	const swiperCases = new Swiper('.slider-cases', {
		speed: 1000,
		spaceBetween: 80,
		slidesPerView: 1,
		// pagination: {
		// 	el: '.slider-saas__bullets',
		// 	clickable: true,
		// },
		on: {
			init: function () {
				createBullets(this, '.slider-cases__bullets');
			},
			slideChange: function () {
				updateActiveBullet(this, '.slider-cases__bullets');
			},
		},
		autoplay: {
			delay: 8000,
		},
		navigation: {
			nextEl: '.slider-cases__arrow_next',
			prevEl: '.slider-cases__arrow_prev',
		},
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
		swiper.slides.forEach((slide, slideIndex) => {
			const bullets = slide.querySelectorAll(`${className} .bullet`);
			bullets.forEach((bullet, bulletIndex) => {
				bullet.classList.toggle('active', bulletIndex === swiper.activeIndex);
			});
		});
	}

	const form = document.querySelector('.form');
	const inputs = document.querySelectorAll('.form__input');

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let isValid = true;

		inputs.forEach((input) => {
			const label = input.nextElementSibling;

			if (!input.value.trim()) {
				input.classList.add('error');
				label.textContent = 'This field is required';
				label.style.opacity = '1';
				isValid = false;
			} else {
				input.classList.remove('error');
				label.textContent = '';
				label.style.opacity = '0';

				if (input.type === 'email' && !validateEmail(input.value)) {
					input.classList.add('error');
					label.textContent = 'Invalid email format';
					label.style.opacity = '1';
					isValid = false;
				}

				if (input.name === 'number' && !validatePhoneNumber(input.value)) {
					input.classList.add('error');
					label.textContent = 'Invalid phone number';
					label.style.opacity = '1';
					isValid = false;
				}
			}
		});

		if (isValid) {
			form.submit();
		}
	});

	inputs.forEach((input) => {
		input.addEventListener('input', () => {
			const label = input.nextElementSibling;

			if (input.value.trim()) {
				input.classList.remove('error');
				label.textContent = '';
				label.style.opacity = '0';

				if (input.type === 'email' && !validateEmail(input.value)) {
					label.textContent = 'Invalid email format';
					label.style.opacity = '1';
				}

				if (input.name === 'number' && !validatePhoneNumber(input.value)) {
					label.textContent = 'Invalid phone number';
					label.style.opacity = '1';
				}
			}
		});
	});

	function validateEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function validatePhoneNumber(number) {
		const phoneRegex = /^[+]?\d{3,}$/;
		return phoneRegex.test(number);
	}
	function toggleMenu() {
		const burger = document.querySelector('.burger');
		const menu = document.querySelector('#menu');
		const body = document.body;

		burger.classList.toggle('active');

		menu.classList.toggle('show');
		body.classList.toggle('lock');
	}

	// Привязываем функцию toggleMenu к кнопке burger
	document.querySelector('.burger').addEventListener('click', toggleMenu);
});
document.addEventListener('DOMContentLoaded', () => {
	const img = document.querySelector('picture img');
	console.log('Текущее изображение:', img.currentSrc);
	console.log('Ширина окна:', window.innerWidth);
	console.log('devicePixelRatio:', window.devicePixelRatio);
});
