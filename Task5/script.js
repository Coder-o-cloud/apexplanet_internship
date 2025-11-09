// Initialize Vanta.js 3D Background
VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x6366f1,
    backgroundColor: 0x0f172a,
    points: 10.00,
    maxDistance: 20.00,
    spacing: 15.00
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Product Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Shopping Cart
let cart = [];
let cartCount = 0;
let cartTotal = 0;

const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartBadge = document.querySelector('.cart-icon .badge');
const cartItems = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');

// Open cart
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

// Close cart
closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Add to cart
document.querySelectorAll('.add-to-cart').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('.product-image img').src;

        // Add to cart
        cart.push({
            name: productName,
            price: parseFloat(productPrice.replace('$', '').replace(',', '')),
            image: productImage
        });

        cartCount++;
        cartBadge.textContent = cartCount;

        updateCart();

        // Show feedback
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-shopping-cart"></i>';
            btn.style.background = '';
        }, 1000);
    });
});

function updateCart() {
    cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = '$' + cartTotal.toFixed(2);

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item" style="
                display: flex;
                gap: 1rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                margin-bottom: 1rem;
            ">
                <img src="${item.image}" alt="${item.name}" style="
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 10px;
                ">
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.5rem; font-size: 1rem;">${item.name}</h4>
                    <p style="color: var(--accent-color); font-weight: bold;">$${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="
                    background: none;
                    border: none;
                    color: var(--danger-color);
                    cursor: pointer;
                    font-size: 1.2rem;
                ">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    cartCount--;
    cartBadge.textContent = cartCount;
    updateCart();
}

// Countdown Timer for Deals
function updateCountdown() {
    const dealDate = new Date('2025-12-31T23:59:59').getTime();
    const now = new Date().getTime();
    const distance = dealDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .category-card, .feature-card').forEach(el => {
    observer.observe(el);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}!`);
    e.target.reset();
});

// Add particle effect on mouse move
let particles = [];
document.addEventListener('mousemove', (e) => {
    if (particles.length < 30 && Math.random() > 0.9) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.borderRadius = '50%';
        particle.style.background = `rgba(${99 + Math.random() * 40}, ${102 + Math.random() * 40}, 241, 0.6)`;
        particle.style.pointerEvents = 'none';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.zIndex = '9999';
        particle.style.transition = 'all 0.5s ease-out';
        
        document.body.appendChild(particle);
        particles.push(particle);

        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0) translateY(-50px)';
        }, 50);

        setTimeout(() => {
            particle.remove();
            particles = particles.filter(p => p !== particle);
        }, 550);
    }
});

console.log('%c🛒 Welcome to TechShop!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c💎 Premium electronics at your fingertips', 'color: #22d3ee; font-size: 16px;');
