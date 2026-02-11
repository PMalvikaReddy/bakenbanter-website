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
    the_forbidden_cookie_series: {
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
        description: "A perfect bite- the perfect crunch, the perfect softness. Each cookie is designed to melt, linger, and satisfy midnight cravings in the most indulgent way."
    },
    the_layered_luxe_collection: {
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
            "Salted Caramel and Butterscotch",
            "Dutch Chocolate Truffle"
        ],
        description: "Deep. Thick layers. Lavish fillings.\n Our cakes are designed around the centre — where silky ganache flows, caramel melts, Nutella folds into sponge\n Crafted for those who crave depth."
    },
    the_customized_series: {
        images: [
            "images/cricket_cookies.png",
        ],
        titles: [
            "Customized IPL Cookies"
        ],
        description: "Custom-made, hand-finished. cookies designed around your theme, colours, and occasion — made to stand out and be remembered."
    },
    the_hidden_core_collection: {
        images: [
            "images/dbc_cupcake.png",
            "images/butterscotch_cupcake.png",
            "images/chocolate_overdose.png",
            "images/mango_cupcake.jpeg"
        ],
        titles: [
            "Chocolate Truffle",
            "Salted Caramel and Butterscotch",
            "Chocolate Overdose Cupcake",
            "mango Cupcake"
        ],
        description: "Soft, cloud-like sponges hiding a lavish centre of flowing ganache, silky caramel, or velvety cream. Decadent inside and out — crafted for those who crave more than just frosting."
    },
    the_anonymous_savoury_edit: {
        images: [
            "images/veg_strips.png",
            "images/cheese_balls.png"
        ],
        titles: [
            "Veg Strips",
            "Corn Cheese Balls"
        ],
        description: "Golden Crunch. Gourmet Comfort.\n Handcrafted for that irresistible crunch — indulgent, comforting, and made for sharing."
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
    the_fudgy_collection: {
        images: [
            "images/cupcake1.jpg",
            "images/cupcake2.jpg"
        ],
        titles: [
            "Vanilla Buttercream",
            "Chocolate Truffle Cupcake"
        ],
        description: "Dense. Gooey. Deeply chocolate. \n Thick, intense, and baked for those who crave true chocolate depth."
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
