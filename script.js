// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission with validation
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');
const closeModal = document.querySelector('.close-modal');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success modal
        successModal.style.display = 'flex';
        contactForm.reset();
    });
}

// Close modal when clicking the close button
if (closeModal) {
    closeModal.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Add scroll animation for sections
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Add active class to current section in navigation
            const id = entry.target.getAttribute('id');
            document.querySelector(`.nav-links a[href="#${id}"]`)?.classList.add('active');
        } else {
            // Remove active class from navigation
            const id = entry.target.getAttribute('id');
            document.querySelector(`.nav-links a[href="#${id}"]`)?.classList.remove('active');
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Add typing effect to hero section
const heroText = document.querySelector('.hero-content p');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
}

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Blog functionality initializing");
    
    // Get DOM elements
    const addBlogBtn = document.getElementById('add-blog-btn');
    const blogGrid = document.querySelector('.blog-grid');
    const blogPostModal = document.getElementById('blog-post-modal');
    const blogPostTitle = document.getElementById('blog-post-title');
    const blogPostDate = document.getElementById('blog-post-date');
    const blogPostBody = document.getElementById('blog-post-body');
    const editPostBtn = document.getElementById('edit-post-btn');
    const deletePostBtn = document.getElementById('delete-post-btn');
    const closeBlogModal = document.querySelector('#blog-post-modal .close-modal');
    
    // Check if elements exist
    if (!blogGrid || !blogPostModal || !blogPostTitle || !blogPostDate || !blogPostBody) {
        console.error("Required blog elements not found");
        return;
    }

    // Function to open blog post modal
    function openBlogPostModal(postId) {
        // Hide all blog post contents first
        const allPosts = document.querySelectorAll('.blog-post-full');
        allPosts.forEach(post => post.style.display = 'none');
        
        // Show the selected blog post
        const selectedPost = document.getElementById(`blog-post-${postId}`);
        if (selectedPost) {
            selectedPost.style.display = 'block';
            
            // Update modal title and date
            const blogCard = document.querySelector(`.blog-card[data-post-id="${postId}"]`);
            if (blogCard) {
                blogPostTitle.textContent = blogCard.querySelector('h3').textContent;
                blogPostDate.textContent = blogCard.querySelector('.blog-date').textContent;
            }
            
            // Show the modal
            blogPostModal.style.display = 'block';
        }
    }

    // Function to close blog post modal
    function closeBlogPostModal() {
        blogPostModal.style.display = 'none';
    }

    // Add click event listeners to blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        const readMoreLink = card.querySelector('.read-more');
        readMoreLink.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = card.getAttribute('data-post-id');
            openBlogPostModal(postId);
        });
    });

    // Close modal when clicking the close button
    if (closeBlogModal) {
        closeBlogModal.addEventListener('click', closeBlogPostModal);
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === blogPostModal) {
            closeBlogPostModal();
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && blogPostModal.style.display === 'block') {
            closeBlogPostModal();
        }
    });

    // Edit and Delete buttons functionality
    if (editPostBtn) {
        editPostBtn.addEventListener('click', () => {
            alert('Edit functionality coming soon!');
        });
    }

    if (deletePostBtn) {
        deletePostBtn.addEventListener('click', () => {
            alert('Delete functionality coming soon!');
        });
    }

    // Add New Blog Post button functionality
    if (addBlogBtn) {
        addBlogBtn.addEventListener('click', () => {
            alert('Add new blog post functionality coming soon!');
        });
    }
}); 