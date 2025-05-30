document.addEventListener('DOMContentLoaded', function() {
  const countrySelect = document.querySelector('.country-select');
  const dropdown = document.getElementById('country-dropdown');
  const selectedFlag = document.getElementById('selected-flag');

  countrySelect.addEventListener('click', function(e) {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    e.stopPropagation();
  });

  document.querySelectorAll('.country-option').forEach(option => {
    option.addEventListener('click', function(e) {
      selectedFlag.src = this.dataset.flag;
      selectedFlag.alt = this.dataset.country;
      dropdown.style.display = 'none';
      e.stopPropagation();
    });
  });

  document.addEventListener('click', function() {
    dropdown.style.display = 'none';
  });

  // Sidebar toggle for mobile
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  // Show sidebar
  menuToggle.addEventListener('click', function() {
    sidebar.classList.add('open');
    overlay.style.display = 'block';
  });

  // Hide sidebar when overlay is clicked
  overlay.addEventListener('click', function() {
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
  });

  // Hide sidebar when a nav link is clicked (for mobile)
  sidebar.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.style.display = 'none';
    });
  });

  // Feature search logic
  const searchInput = document.getElementById('feature-search');
  const searchResult = document.getElementById('search-result');
  const features = ["buy airtime", "buy giftcard", "payments"];

  searchInput.addEventListener('input', function() {
    const value = searchInput.value.trim().toLowerCase();
    if (value === "") {
      searchResult.textContent = "";
      return;
    }
    const found = features.some(f => f.includes(value));
    if (found) {
      searchResult.style.color = "green";
      searchResult.textContent = "Feature found: " + features.find(f => f.includes(value));
    } else {
      searchResult.style.color = "red";
      searchResult.textContent = `"${searchInput.value}" is not available`;
    }
  });

  // Phone number validation based on selected country
  const phoneInput = document.getElementById('phone-input');
  const form = phoneInput.closest('form');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', function(e) {
    const phone = phoneInput.value.trim();
    let country = selectedFlag.alt.toLowerCase();
    let valid = false;
    let errorMsg = "";

    if (country === "rwanda") {
      valid = /^\+250\d{9}$/.test(phone);
      if (!valid) errorMsg = "Please enter a valid Rwandan Phone number starting +250";
    } else if (country === "nigeria") {
      valid = /^\+234\d{9}$/.test(phone);
      if (!valid) errorMsg = "Please enter a valid Nigerian Phone number starting +234";
    } else {
      valid = /^\+\d{7,15}$/.test(phone);
      if (!valid) errorMsg = "Please enter a valid phone number with country code";
    }

    if (!valid) {
      e.preventDefault();
      successMessage.style.color = "red";
      successMessage.textContent = errorMsg;
      phoneInput.focus();
    } else {
      e.preventDefault();
      successMessage.style.color = "green";
      successMessage.textContent = "✅ Airtime Purchase Successful!";
      setTimeout(() => {
        successMessage.textContent = "";
      }, 3000);
      form.reset();
    }
  });

  // Existing modal logic for "Activate account now"
  const activateBtn = document.querySelector('.activate-btn');
  const getStartedBtn = document.querySelector('.get-started');
  const modal = document.getElementById('activation-modal');
  const closeModal = document.getElementById('close-modal');

  if (activateBtn) {
    activateBtn.addEventListener('click', function() {
      modal.style.display = 'flex'; // Use 'flex' to enable centering
    });
  }

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function() {
      modal.style.display = 'flex'; // Use 'flex' to enable centering
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  // Optional: Close modal when clicking outside content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
