document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.portfolio-filters .filter');
    const portfolioItems = document.querySelectorAll('.portfolio-grid .item');
    
    // Set up filter functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active button
        document.querySelector('.portfolio-filters .active').classList.remove('active');
        this.parentElement.classList.add('active');
        
        const filterValue = this.getAttribute('data-group');
        
        // Filter items
        portfolioItems.forEach(item => {
          const groups = JSON.parse(item.getAttribute('data-groups').replace(/'/g, '"'));
          
          if (groups.includes(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Set up modal functionality
    const modal = document.getElementById('portfolioModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalLink = document.getElementById('modalLink');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when clicking on portfolio items
    portfolioItems.forEach(item => {
      item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const title = this.querySelector('.portfolio-item-details h4').textContent;
        const category = this.querySelector('.portfolio-item-details .category').textContent;
        const link = this.querySelector('.external-link');
        
        modalImage.src = img.src;
        modalTitle.textContent = title;
        modalCategory.textContent = category;
        
        if (link) {
          modalLink.href = link.href;
          modalLink.style.display = 'inline-block';
        } else {
          modalLink.style.display = 'none';
        }
        
        modal.style.display = 'flex';
        setTimeout(() => {
          modal.classList.add('show');
        }, 10);
      });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    });
  });