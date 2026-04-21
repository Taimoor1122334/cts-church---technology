 document.querySelectorAll('.dropdown').forEach(function (dropdown) {
            const btn = dropdown.querySelector('.dropdown-btn');
            const body = dropdown.querySelector('.dropdown-body');
            let isOpen = false;

            function openDropdown() {
                body.style.maxHeight = body.scrollHeight + 'px';
                body.style.opacity = '1';
                isOpen = true;
                btn.textContent = 'Read Less';
                btn.classList.add('btn-outline');
            }

            function closeDropdown() {
                body.style.maxHeight = '0';
                body.style.opacity = '0';
                isOpen = false;
                btn.textContent = 'Read More';
                btn.classList.remove('btn-outline');
            }

            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                isOpen ? closeDropdown() : openDropdown();
            });

            dropdown.addEventListener('click', function (e) {
                if (!body.contains(e.target)) {
                    isOpen ? closeDropdown() : openDropdown();
                }
            });
        });




// Mobile menu toggle (global for inline onclick)
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const nav = mobileMenu ? mobileMenu.querySelector('nav') : null;
  const menuIconPath = document.getElementById('menuIconPath');
  if (!mobileMenu) return;

  const isHidden = mobileMenu.classList.contains('hidden');
  if (isHidden) {
    mobileMenu.classList.remove('hidden');
    if (nav) {
      nav.classList.remove('opacity-0', 'scale-y-0');
      nav.classList.add('opacity-100', 'scale-y-100');
    }
    if (menuIconPath) menuIconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
  } else {
    mobileMenu.classList.add('hidden');
    if (nav) {
      nav.classList.remove('opacity-100', 'scale-y-100');
      nav.classList.add('opacity-0', 'scale-y-0');
    }
    if (menuIconPath) menuIconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
  }
}

// Expose for inline onclick usage
window.toggleMenu = toggleMenu;

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    const mm = document.getElementById('mobileMenu');
    const mip = document.getElementById('menuIconPath');
    if (mm) mm.classList.add('hidden');
    if (mip) mip.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
  });
});



// Mobile dropdown toggles
document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const currentSubmenu = toggle.nextElementSibling;
    if (!currentSubmenu || !currentSubmenu.classList.contains('mobile-submenu')) return;

    // Close other open submenus
    document.querySelectorAll('.mobile-submenu').forEach(menu => {
      if (menu !== currentSubmenu) {
        menu.style.maxHeight = '0px';
        menu.classList.add('hidden');
      }
    });

    // Toggle current submenu
    const isOpen = currentSubmenu.style.maxHeight && currentSubmenu.style.maxHeight !== '0px';
    if (isOpen) {
      currentSubmenu.style.maxHeight = '0px';
      // hide after transition ends to avoid layout gap
      currentSubmenu.addEventListener('transitionend', function handle() {
        currentSubmenu.classList.add('hidden');
        currentSubmenu.removeEventListener('transitionend', handle);
      });
      toggle.querySelector('svg')?.classList.remove('rotate-180');
    } else {
      currentSubmenu.classList.remove('hidden');
      // Let browser compute height, then animate to content height
      requestAnimationFrame(() => {
        currentSubmenu.style.maxHeight = currentSubmenu.scrollHeight + 'px';
      });
      toggle.querySelector('svg')?.classList.add('rotate-180');
    }
  });
});


// Navbar Fixed on Scroll
// Navbar Fixed on Scroll
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('mainNavbar');
  const header = navbar ? navbar.closest('header') : null;
  if (!navbar) return;

  // Use a fixed scroll threshold instead of percentage for consistency across pages
  const scrollThreshold = 300; // pixels from top

  if (window.scrollY > scrollThreshold) {
    navbar.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'z-50', 'animate__animated', 'animate__fadeInDown', 'sticky');
    navbar.classList.remove('relative');

    // Add padding-top to header to prevent content shift
    if (header) {
      // Use a fixed height or calculate navbar height more reliably
      const navbarHeight = navbar.offsetHeight || 80; // fallback to 80px if calculation fails
      header.style.paddingTop = navbarHeight + 'px';
    }
  } else {
    navbar.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'z-50', 'animate__animated', 'animate__fadeInDown' );
    navbar.classList.add('relative');

    // Remove padding-top when navbar returns to relative
    if (header) {
      header.style.paddingTop = '0px';
    }
  }
});

// Highlight nav links when scrolling into sections
(function() {
  const navLinks = document.querySelectorAll('nav .nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (!navLinks.length || !sections.length) return;

  const offset = 120; // approximate height of fixed header

  function updateActiveLink() {
    let current = sections[0];
    const scrollPos = window.scrollY;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop - offset) {
        current = sec;
      }
    });
    navLinks.forEach(link => link.removeAttribute('id'));
    const selector = `nav .nav-link[data-link="${current.id}"]`;
    const activeLink = document.querySelector(selector);
    if (activeLink) activeLink.id = 'active';
  }

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('resize', updateActiveLink);
  document.addEventListener('DOMContentLoaded', updateActiveLink);
  updateActiveLink();
})();

// Hero slider: pagination only (2 dots), no arrows
(function () {
  const slideBg = document.querySelectorAll('.hero-slide-bg');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slideBg.length || !dots.length) return;

  function goToSlide(index) {
    index = Math.max(0, Math.min(index, slideBg.length - 1));
    slideBg.forEach(function (el, i) {
      el.classList.toggle('active', i === index);
    });
    dots.forEach(function (el, i) {
      el.classList.toggle('active-dot', i === index);
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      goToSlide(slideIndex);
    });
  });

  goToSlide(0);
})();

document.querySelectorAll('.dropdown-container').forEach(container => {
    const menu = container.querySelector('.dropdown-menu');
    let timeoutId;
    
    container.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        menu.classList.remove('hidden');
    });
    
    container.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => {
            menu.classList.add('hidden');
        }, 150); // Small delay to prevent flickering
    });

    
});




  /* ── Slider State ── */
  // let current = 0;
  // const total = 2;
  // let autoTimer = null;

  // const track      = document.getElementById('slidesTrack');
  // const dots       = document.querySelectorAll('.dot');
  // const allContent = document.querySelectorAll('.hero-content');

  function goToSlide(index) {
    if (index === current) return;

    /* hide current content */
    allContent[current].style.display = 'none';
    document.getElementById('slide-' + current).classList.remove('is-active');

    current = index;

    /* move track */
    // track.style.transform = `translateX(-${current * 50}%)`;
    // track.className = `slides-track at-${current}`;

    /* show new content with fade */
    const nextContent = allContent[current];
    nextContent.style.display = 'block';
    nextContent.style.opacity = '0';
    nextContent.style.transform = 'translateY(22px)';
    document.getElementById('slide-' + current).classList.add('is-active');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nextContent.style.transition = 'opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s';
        nextContent.style.opacity    = '1';
        nextContent.style.transform  = 'translateY(0)';
      });
    });

    /* update dots */
    dots.forEach((d, i) => d.classList.toggle('active', i === current));

    // check for video in newly-active slide
    const currentVideo = document.querySelector(`#slide-${current} video`);
    if (currentVideo) {
      // make sure the video starts fresh
      currentVideo.loop = false;
      currentVideo.currentTime = 0;
      // some browsers won't autoplay unless play() is called when visible
      currentVideo.play().catch(() => {/* ignore playback failures */});
      // remove any previous end handler to avoid duplicates
      currentVideo.onended = nextSlide;
      clearInterval(autoTimer);
    } else {
      resetAutoPlay();
    }
  }

  function nextSlide() {
    goToSlide((current + 1) % total);
  }

  function resetAutoPlay() {
    clearInterval(autoTimer);
    autoTimer = setInterval(nextSlide, 5500);
  }

  /* kick off auto-play (but video listener may override) */
  resetAutoPlay();

  // if first slide contains a video, attach end handler and start playback
  // const firstVideo = document.querySelector('#slide-0 video');
  // if (firstVideo) {
  //   firstVideo.loop = false;
  //   firstVideo.onended = nextSlide;
  //   firstVideo.currentTime = 0;
  //   firstVideo.play().catch(() => {});
  //   clearInterval(autoTimer);
  // }

  

  /* ── Mobile menu toggle ── */
  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const path = document.getElementById('menuIconPath');
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    path.setAttribute('d', isOpen
      ? 'M4 6h16M4 12h16M4 18h16'
      : 'M6 18L18 6M6 6l12 12');
  }



  