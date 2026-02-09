const carousel = document.querySelector('.carousel');
const leftBtn = document.querySelector('.arrow.left');
const rightBtn = document.querySelector('.arrow.right');
const dots = document.querySelectorAll('.dot');

const items = document.querySelectorAll('.carousel-item');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeBtn = document.querySelector('.close');

const bestsellerImages = document.querySelectorAll('.bestsellers .card img');
// bestsellers modals
bestsellerImages.forEach(img => {
    img.addEventListener('click', () => {
        // Hide modal arrows
        document.querySelector(".modal-arrow.left").style.visibility = "hidden";
        document.querySelector(".modal-arrow.right").style.visibility = "hidden";
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalTitle.textContent = img.dataset.title;
        modalDesc.textContent = img.dataset.description;
        document.body.style.overflow = "hidden";
    });
});

// modal scrolling images
const categories = {
    forbidden_bites: {
        images: [
            "images/teddy_cookie.png",
            "images/nankatai_cookies.png",
            "images/almond_chocolate_cookie.png",
            "images/stick_cookies.jpeg",
            "images/karachi_cookies.jpeg"
        ],
        titles: [
            "Teddy Cookies",
            "Nankatai Cookies",
            "Almond Dark Chocolate Cookies",
            "Chocolate Crunch Stick Cookies [Dark/ White/ Pineapple/ Mango]",
            "Karachi Cookies"
        ],
        description: "Rich, gooey and baked fresh with premium cocoa."
    },
    artisan_celebration_cake: {
        images: [
            "images/chocolate_overdose_cake.png",
            "images/chocolate_cake.jpeg",
            "images/nutella_cake.jpeg",
            "images/butterscotch_cake.png",
            "images/chocolate_cake2.png"
        ],
        titles: [
            "Chocolate Overdose",
            "Nutella Chocolate",
            "Hazelnut Nutella Mousse",
            "Premium Butterscotch",
            "Dutch Chocolate Truffle"
        ],
        description: "Soft, fluffy and topped with silky frosting."
    },
    personalised_confections: {
        images: [
            "images/cricket_cookies.png",
        ],
        titles: [
            "Customized IPL Cookies"
        ],
        description: "Soft, fluffy and topped with silky frosting."
    },
    the_petit_collection: {
        images: [
            "images/dbc_cupcake.png",
            "images/butterscotch_cupcake.png",
            "images/chocolate_overdose.png",
            "images/mango_cupcake.jpeg"
        ],
        titles: [
            "Chocolate Truffle",
            "Butterscotch",
            "Chocolate Overdose Cupcake",
            "mango Cupcake"
        ],
        description: "Soft, fluffy and topped with silky frosting."
    },
    the_anonymous_savoury_edit: {
        images: [
            "images/cheese_balls.png",
            "images/veg_strips.png"
        ],
        titles: [
            "Corn Cheese Balls",
            "Veg Strips"
        ],
        description: "Soft, fluffy and topped with silky frosting."
    },
    the_conscious_collection: {
        images: [
            "images/oat_cookie.png",
            "images/cupcake2.jpg"
        ],
        titles: [
            "Chocochip Oat Cookies",
            "Chocolate Truffle Cupcake"
        ],
        description: "Soft, fluffy and topped with silky frosting."
    },
    the_fudge_affair: {
        images: [
            "images/cupcake1.jpg",
            "images/cupcake2.jpg"
        ],
        titles: [
            "Vanilla Buttercream",
            "Chocolate Truffle Cupcake"
        ],
        description: "Soft, fluffy and topped with silky frosting."
    },
    the_bombolini_bar: {
        images: [
            "images/cupcake1.jpg",
            "images/cupcake2.jpg"
        ],
        titles: [
            "Vanilla Buttercream",
            "Chocolate Truffle Cupcake"
        ],
        description: "Soft, fluffy and topped with silky frosting."
    }
};
let currentCategory = null;
let currentIndex = 0;
items.forEach(item => {
    item.addEventListener("click", () => {
        currentCategory = item.dataset.category;
        currentIndex = 0;
        openModal();
    });
});
function updateModal() {
    const category = categories[currentCategory];
    modalImg.src = category.images[currentIndex];
    modalTitle.textContent = category.titles[currentIndex];
    modalDesc.textContent = category.description;

    // Disable arrows if at start/end
    document.querySelector(".modal-arrow.left").style.visibility = currentIndex === 0 ? "hidden" : "visible";
    document.querySelector(".modal-arrow.right").style.visibility = currentIndex === category.images.length - 1 ? "hidden" : "visible";
}
function openModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    updateModal();
}
document.querySelector(".modal-arrow.right")
    .addEventListener("click", () => {

        const category = categories[currentCategory];
        currentIndex = (currentIndex + 1) % category.images.length;

        updateModal();
    });
// arrow controls inside modal
document.querySelector(".modal-arrow.left")
    .addEventListener("click", () => {

        const category = categories[currentCategory];
        currentIndex =
            (currentIndex - 1 + category.images.length) %
            category.images.length;

        updateModal();
    });

// modal scrolling images

// moments scrolling arrows
rightBtn.addEventListener('click', () => {
    carousel.scrollBy({
        left: 350,
        behavior: 'smooth'
    });
});

leftBtn.addEventListener('click', () => {
    carousel.scrollBy({
        left: -350,
        behavior: 'smooth'
    });
});

// dots scroll
carousel.addEventListener('scroll', () => {
    const scrollPosition = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    let index = 0;

    if (scrollPosition < maxScroll / 3) {
        index = 0;
    } else if (scrollPosition < (2 * maxScroll) / 3) {
        index = 1;
    } else {
        index = 2;
    }

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
});

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

// navbar in mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// close navbar when options is selected
const navItems = navLinks.querySelectorAll('a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
