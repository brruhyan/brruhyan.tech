// Portfolio website script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.header-right a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate sections
                if (entry.target.classList.contains('animate-section')) {
                    entry.target.classList.add('visible');
                    
                    // Animate titles with delay
                    const title = entry.target.querySelector('.animate-title');
                    if (title) {
                        setTimeout(() => {
                            title.classList.add('visible');
                        }, 200);
                    }
                    
                    // Animate tech logos with staggered timing
                    const logos = entry.target.querySelectorAll('.animate-logo');
                    logos.forEach((logo, index) => {
                        setTimeout(() => {
                            logo.classList.add('visible');
                        }, 400 + (index * 100));
                    });
                    
                    // Animate experience items with staggered timing
                    const experiences = entry.target.querySelectorAll('.animate-experience');
                    experiences.forEach((exp, index) => {
                        setTimeout(() => {
                            exp.classList.add('visible');
                        }, 400 + (index * 200));
                    });
                    
                    // Animate projects with staggered timing
                    const projects = entry.target.querySelectorAll('.animate-project');
                    projects.forEach((project, index) => {
                        setTimeout(() => {
                            project.classList.add('visible');
                        }, 400 + (index * 200));
                    });
                }
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and elements for animation
    const sectionsToAnimate = document.querySelectorAll('.animate-section');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
    
    // Project modal functionality
    const modal = document.getElementById('project-modal');
    const projectLinks = document.querySelectorAll('.project-link');
    const closeModal = document.querySelector('.modal-close');
    const projectDetails = document.querySelectorAll('.project-details');
    
    // Open modal when clicking "See More"
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            
            // Hide all project details
            projectDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            
            // Show the selected project details
            const selectedProject = document.getElementById(projectId + '-details');
            if (selectedProject) {
                selectedProject.classList.add('active');
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Start modal animation sequence
                setTimeout(() => {
                    modal.classList.add('modal-opening');
                    
                    // Animate modal container
                    const modalContent = modal.querySelector('.animate-modal');
                    if (modalContent) {
                        setTimeout(() => modalContent.classList.add('modal-visible'), 50);
                    }
                    
                    // Animate close button
                    const closeBtn = modal.querySelector('.animate-close');
                    if (closeBtn) {
                        setTimeout(() => closeBtn.classList.add('modal-visible'), 200);
                    }
                    
                    // Animate image section
                    const imageSection = selectedProject.querySelector('.animate-modal-image');
                    if (imageSection) {
                        setTimeout(() => imageSection.classList.add('modal-visible'), 300);
                    }
                    
                    // Animate content section
                    const contentSection = selectedProject.querySelector('.animate-modal-content');
                    if (contentSection) {
                        setTimeout(() => contentSection.classList.add('modal-visible'), 400);
                    }
                    
                    // Animate title
                    const title = selectedProject.querySelector('.animate-modal-title');
                    if (title) {
                        setTimeout(() => title.classList.add('modal-visible'), 600);
                    }
                    
                    // Animate description
                    const desc = selectedProject.querySelector('.animate-modal-desc');
                    if (desc) {
                        setTimeout(() => desc.classList.add('modal-visible'), 700);
                    }
                    
                    // Animate role section
                    const role = selectedProject.querySelector('.animate-modal-role');
                    if (role) {
                        setTimeout(() => role.classList.add('modal-visible'), 800);
                    }
                    
                    // Animate details grid
                    const details = selectedProject.querySelector('.animate-modal-details');
                    if (details) {
                        setTimeout(() => details.classList.add('modal-visible'), 900);
                    }
                    
                    // Animate button
                    const button = selectedProject.querySelector('.animate-modal-button');
                    if (button) {
                        setTimeout(() => button.classList.add('modal-visible'), 1000);
                    }
                }, 10);
            }
        });
    });
    
    // Close modal
    function closeProjectModal() {
        // Remove animation classes
        const animatedElements = modal.querySelectorAll('.modal-visible');
        animatedElements.forEach(el => el.classList.remove('modal-visible'));
        modal.classList.remove('modal-opening');
        
        // Close after animation
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            projectDetails.forEach(detail => {
                detail.classList.remove('active');
            });
        }, 300);
    }
    
    // Close modal when clicking X
    closeModal.addEventListener('click', closeProjectModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeProjectModal();
        }
    });
    
    // Jump to Screens button functionality
    const jumpButtons = document.querySelectorAll('.jump-to-screens');
    jumpButtons.forEach(button => {
        button.addEventListener('click', function() {
            // You can implement this to scroll to a screens section or open another modal
            console.log('Jump to screens clicked');
            // For now, just close the modal
            closeProjectModal();
        });
    });

    // Dynamic name scaling function - DISABLED in favor of CSS clamp()
    /*
    function scaleName() {
        const nameElement = document.querySelector('#main-name span');
        if (!nameElement) {
            console.log('Name element not found');
            return;
        }
        
        const container = nameElement.closest('.hero-section');
        if (!container) {
            console.log('Container not found');
            return;
        }
        
        // Get container width minus padding
        const containerWidth = Math.min(container.offsetWidth - 60, window.innerWidth - 60); // More conservative padding
        
        // Start with a reasonable font size based on screen width
        let fontSize = Math.max(Math.min(containerWidth * 0.08, 80), 24); // Between 24px and 80px
        nameElement.style.fontSize = fontSize + 'px';
        nameElement.style.visibility = 'visible'; // Ensure it's visible
        nameElement.style.opacity = '1'; // Ensure it's not transparent
        
        // Keep reducing font size until the text fits, but don't go below 18px
        let attempts = 0;
        while (nameElement.scrollWidth > containerWidth && fontSize > 18 && attempts < 20) {
            fontSize -= 1;
            nameElement.style.fontSize = fontSize + 'px';
            attempts++;
        }
        
        console.log(`Name scaled to ${fontSize}px for container width ${containerWidth}px, element width: ${nameElement.scrollWidth}px`);
    }
    
    // Scale name on load and resize with delay to ensure DOM is ready
    setTimeout(scaleName, 100);
    window.addEventListener('resize', function() {
        setTimeout(scaleName, 50);
    });
    window.addEventListener('orientationchange', function() {
        setTimeout(scaleName, 200); // Longer delay for orientation change
    });
    */
});
