import './style.css'

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1️⃣ HIDE TOP BAR ON SCROLL
  ====================================== */
  const topBar = document.getElementById("topBar") as HTMLElement | null;
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (!topBar) return;

    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      topBar.style.transform = "translateY(-100%)";
      topBar.style.opacity = "0";
    } else {
      topBar.style.transform = "translateY(0)";
      topBar.style.opacity = "1";
    }

    lastScrollY = window.scrollY;
  });


  /* =====================================
     2️⃣ HEADER BEHAVIOR (Section Based)
  ====================================== */
  const header = document.getElementById('header') as HTMLElement | null;
  const section2 = document.getElementById('section-2') as HTMLElement | null;
  const nav = document.getElementById('mainNav') as HTMLElement | null;

  window.addEventListener('scroll', () => {
    if (!header || !topBar || !section2 || !nav) return;

    const rect = section2.getBoundingClientRect();
    const topBarHeight = topBar.offsetHeight;

    if (rect.top <= 0) {
      header.style.transform = `translateY(-${topBarHeight}px)`;
    } else {
      header.style.transform = 'translateY(0)';
      nav.classList.remove('bg-black/90', 'backdrop-blur-md');
      nav.classList.add('lg:bg-transparent');
    }
  });


  /* =====================================
     3️⃣ INFINITE IMAGE SLIDER
  ====================================== */
  const slider = document.getElementById('slider') as HTMLElement | null;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (slider && prevBtn && nextBtn) {

    const originalItems = Array.from(slider.querySelectorAll('.slide-item'));

    // Clone items for infinite effect
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      slider.appendChild(clone);
    });

    const getScrollAmount = () => {
      const firstItem = slider.querySelector('.slide-item') as HTMLElement;
      const gap = parseFloat(getComputedStyle(slider).gap) || 0;
      return firstItem.offsetWidth + gap;
    };

    const handleInfiniteScroll = (direction: 'next' | 'prev') => {
      const maxScroll = slider.scrollWidth / 2;

      if (direction === 'next' && slider.scrollLeft >= maxScroll - 5) {
        slider.classList.remove('scroll-smooth');
        slider.scrollLeft -= maxScroll;

        requestAnimationFrame(() => {
          slider.classList.add('scroll-smooth');
          slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        return true;
      }

      if (direction === 'prev' && slider.scrollLeft <= 0) {
        slider.classList.remove('scroll-smooth');
        slider.scrollLeft = maxScroll;

        requestAnimationFrame(() => {
          slider.classList.add('scroll-smooth');
          slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        return true;
      }

      return false;
    };

    prevBtn.addEventListener('click', () => {
      if (!handleInfiniteScroll('prev')) {
        slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      }
    });

    nextBtn.addEventListener('click', () => {
      if (!handleInfiniteScroll('next')) {
        slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      }
    });

    // Auto-scroll
    let scrollInterval: number;

    const startAutoScroll = () => {
      scrollInterval = window.setInterval(() => {
        if (!handleInfiniteScroll('next')) {
          slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
      }, 3000);
    };

    const stopAutoScroll = () => clearInterval(scrollInterval);

    startAutoScroll();

    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);
  }


  /* =====================================
     4️⃣ EVENTS CAROUSEL
  ====================================== */
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');

  if (slides.length > 0 && dots.length > 0) {

    let currentSlide = 0;
    let slideInterval: number;

    const updateCarousel = (index: number) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('opacity-100', i === index);
        slide.classList.toggle('opacity-0', i !== index);

        dots[i].classList.toggle('bg-white', i === index);
        dots[i].classList.toggle('bg-neutral-600', i !== index);
      });

      currentSlide = index;
    };

    const nextSlide = () => {
      const nextIndex = (currentSlide + 1) % slides.length;
      updateCarousel(nextIndex);
    };

    const startCarousel = () => {
      slideInterval = window.setInterval(nextSlide, 3000);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        updateCarousel(index);
        clearInterval(slideInterval);
        startCarousel();
      });
    });

    startCarousel();
  }

});