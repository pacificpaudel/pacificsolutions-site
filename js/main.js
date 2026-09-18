(function(){
  "use strict";

  // Theme toggle (persisted per-browser only)
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('ps-theme'); } catch(e){}
  if(stored === 'light' || stored === 'dark'){ root.setAttribute('data-theme', stored); }

  function currentTheme(){
    var attr = root.getAttribute('data-theme');
    if(attr) return attr;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setToggleIcon(btn){
    if(!btn) return;
    var isDark = currentTheme() === 'dark';
    btn.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"/></svg>';
    btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  document.addEventListener('DOMContentLoaded', function(){
    var toggle = document.querySelector('.theme-toggle');
    setToggleIcon(toggle);
    if(toggle){
      toggle.addEventListener('click', function(){
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('ps-theme', next); } catch(e){}
        setToggleIcon(toggle);
      });
    }

    // Mobile nav
    var menuBtn = document.querySelector('.menu-btn');
    var navLinks = document.querySelector('.nav-links');
    if(menuBtn && navLinks){
      menuBtn.addEventListener('click', function(){
        navLinks.classList.toggle('open');
      });
      navLinks.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
      });
    }

    // Footer year
    var yearEl = document.querySelector('[data-year]');
    if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

    // Scroll reveal
    var revealEls = document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window && revealEls.length){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add('in'); });
    }

    // Contact form: basic client-side validation feedback
    var form = document.querySelector('#contact-form');
    if(form){
      form.addEventListener('submit', function(){
        var submitBtn = form.querySelector('button[type="submit"]');
        if(submitBtn){
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending…';
        }
      });
    }
  });
})();
