const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const backTop = document.querySelector('#back-top');

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
  if (backTop) backTop.hidden = window.scrollY <= 600;
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

backTop?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });
});

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const dateField = contactForm.elements.namedItem('date');
  const today = new Date();
  dateField.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  contactForm.addEventListener('input', (event) => {
    event.target.setCustomValidity?.('');
    document.querySelector('#form-status').replaceChildren();
  });
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    for (const [name, minimum] of [['name', 2], ['city', 2], ['message', 10]]) {
      const field = contactForm.elements.namedItem(name);
      field.value = field.value.trim();
      field.setCustomValidity(field.value.length < minimum ? `Preencha este campo com pelo menos ${minimum} caracteres.` : '');
    }
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const date = data.get('date') ? data.get('date').split('-').reverse().join('/') : 'A combinar';
    const message = `Olá, JM Visuals! Gostaria de solicitar um orçamento.\n\nNome: ${data.get('name')}\nServiço: ${data.get('service')}\nData: ${date}\nCidade: ${data.get('city')}\n\nSobre o projeto: ${data.get('message')}`;
    const url = `https://wa.me/5527999960198?text=${encodeURIComponent(message)}`;
    const fallback = document.createElement('a');
    fallback.href = url;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.textContent = 'Abrir a mensagem no WhatsApp';
    document.querySelector('#form-status').replaceChildren('Mensagem preparada. Se a nova aba não abriu: ', fallback);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('is-active');
  siteNav.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('is-active');
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const responsiveHero = document.querySelector('.hero-media[data-mobile][data-desktop]');

const setHeroImage = () => {
  const imagePath = window.matchMedia('(max-width: 800px)').matches
    ? responsiveHero.dataset.mobile
    : responsiveHero.dataset.desktop;
  const image = new Image();
  image.onload = () => {
    responsiveHero.style.backgroundImage = `url("${imagePath}")`;
    responsiveHero.classList.add('has-media');
  };
  image.src = imagePath;
};

if (responsiveHero) {
  setHeroImage();
  window.matchMedia('(max-width: 800px)').addEventListener('change', setHeroImage);
}

document.querySelectorAll('.placeholder-media:not(.hero-media)').forEach((element) => {
  const match = element.dataset.label?.match(/(assets\/images\/[^·]+)/);
  if (!match) return;
  const image = new Image();
  image.onload = () => {
    element.style.backgroundImage = `url("${match[1].trim()}")`;
    element.classList.add('has-media');
  };
  image.src = match[1].trim();
});

const showreel = document.querySelector('.showreel');
const showreelVideo = document.querySelector('#showreel-video');
const showreelButton = document.querySelector('.play-button');

if (showreel && showreelVideo && showreelButton) {
  const setShowreelState = (isPlaying) => {
    showreel.classList.toggle('is-playing', isPlaying);
    showreelButton.setAttribute('aria-label', isPlaying ? 'Pausar Showreel' : 'Assistir Showreel');
  };

  const toggleShowreel = async () => {
    if (showreelVideo.paused) {
      if (showreelVideo.ended) {
        showreelVideo.currentTime = 0;
      }
      setShowreelState(true);
      showreelVideo.muted = false;
      try {
        await showreelVideo.play();
      } catch (error) {
        console.warn('Showreel playback blocked:', error);
      }
      return;
    }

    showreelVideo.pause();
    setShowreelState(false);
  };

  const stopShowreel = () => {
    showreelVideo.pause();
    showreelVideo.currentTime = 0;
    setShowreelState(false);
  };

  showreelButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleShowreel();
  });

  showreelVideo.addEventListener('click', (event) => {
    event.stopPropagation();
    if (showreelVideo.paused) {
      toggleShowreel();
      return;
    }
    showreelVideo.pause();
    setShowreelState(false);
  });

  showreelVideo.addEventListener('pause', () => {
    if (!showreelVideo.ended) {
      setShowreelState(false);
    }
  });

  showreelVideo.addEventListener('ended', stopShowreel);
}


