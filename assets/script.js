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
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;
  
  if (window.scrollY > 100) {
    navbar.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'sticky');
    navbar.classList.remove('relative');
  } else {
    navbar.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'sticky');
    navbar.classList.add('relative');
  }
});

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



