/**
 * ============================================================================
 * AKSHAYA S - PORTFOLIO INTERACTION LOGIC
 * Features: Dark/Light Mode, Animated Typing, Filter Tabs, Copy-to-Clipboard,
 * Smooth Scroll Spy, Mobile Navigation, Contact Form Validation, Toast Feedback
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. THEME SWITCHER (DARK / LIGHT MODE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Check saved theme in localStorage or system preference
  const savedTheme = localStorage.getItem('akshaya_portfolio_theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('akshaya_portfolio_theme', newTheme);
    showToast(`Switched to ${newTheme.toUpperCase()} theme`);
  });

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION MENU TOGGLE
  // --------------------------------------------------------------------------
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuOpenIcon = menuToggleBtn.querySelector('.menu-open-icon');
  const menuCloseIcon = menuToggleBtn.querySelector('.menu-close-icon');

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    menuToggleBtn.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      menuOpenIcon.style.display = 'none';
      menuCloseIcon.style.display = 'block';
    } else {
      menuOpenIcon.style.display = 'block';
      menuCloseIcon.style.display = 'none';
    }
  }

  menuToggleBtn.addEventListener('click', toggleMenu);

  // Close menu when clicking any nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. DYNAMIC HERO TYPING EFFECT
  // --------------------------------------------------------------------------
  const typedRoleElement = document.getElementById('typed-role');
  const roles = [
    'B.Tech IT Student',
    'Aspiring Software Engineer',
    'Innovation Project Coordinator',
    'Frontend Web Developer',
    'Tech Enthusiast'
  ];

  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRoles() {
    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
      typedRoleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50;
    } else {
      typedRoleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && currentCharIndex === currentRole.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeRoles, typingSpeed);
  }

  if (typedRoleElement) {
    setTimeout(typeRoles, 800);
  }

  // --------------------------------------------------------------------------
  // 4. SCROLL REVEAL & INTERSECTION OBSERVER ANIMATIONS
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .glass-card');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Animate skill bars when visible
          const skillBars = entry.target.querySelectorAll('.skill-fill');
          skillBars.forEach((bar) => {
            bar.style.width = bar.style.getPropertyValue('--target-width') || '90%';
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // --------------------------------------------------------------------------
  // 5. NAVBAR SCROLL SPY & STICKY HEADER
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header glass background intensify on scroll
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Highlight active section nav link
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  });

  // Back to top action
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. SKILLS CATEGORY FILTERING
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 7. ONE-CLICK COPY TO CLIPBOARD HELPER
  // --------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: ${textToCopy}`);
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Copied: ${text}`);
    } catch (err) {
      showToast('Could not copy to clipboard');
    }
    document.body.removeChild(tempInput);
  }

  // --------------------------------------------------------------------------
  // 8. SHARE PORTFOLIO FUNCTIONALITY
  // --------------------------------------------------------------------------
  const shareBtn = document.getElementById('share-portfolio-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Akshaya S - B.Tech IT Portfolio & Resume',
        text: 'Check out the portfolio of Akshaya S, B.Tech IT Student at Nandha Engineering College!',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // User cancelled or share failed
        }
      } else {
        fallbackCopyText(window.location.href);
        showToast('Portfolio link copied to clipboard!');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. RECRUITER CONTACT FORM INTERACTION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const orgInput = document.getElementById('user-org');
      const subjectInput = document.getElementById('user-subject');
      const messageInput = document.getElementById('user-message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      // Reset errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      formFeedback.className = 'form-feedback hidden';

      let isValid = true;

      // Validation
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name or company representative name.';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please include a message or inquiry details.';
        isValid = false;
      }

      if (!isValid) {
        showToast('Please fill all required fields correctly.');
        return;
      }

      // Construct mailto link to open recruiter's default mail client with prefilled details
      const subjectLine = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value} from ${nameInput.value.trim()}${orgInput.value ? ' (' + orgInput.value.trim() + ')' : ''}`);
      const bodyContent = encodeURIComponent(
        `Dear Akshaya,\n\n${messageInput.value.trim()}\n\n---\nSender Details:\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\nOrganization: ${orgInput.value.trim() || 'N/A'}\nSubject: ${subjectInput.value}`
      );

      const mailtoUrl = `mailto:akshayasivakumar004@gmail.com?subject=${subjectLine}&body=${bodyContent}`;

      // Open mail application
      window.location.href = mailtoUrl;

      // Display positive confirmation
      formFeedback.textContent = 'Opening your email client to send your message to akshayasivakumar004@gmail.com. Thank you!';
      formFeedback.className = 'form-feedback success';
      showToast('Opening email client...');

      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 10. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 11. FOOTER CURRENT YEAR AUTO-UPDATE
  // --------------------------------------------------------------------------
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
