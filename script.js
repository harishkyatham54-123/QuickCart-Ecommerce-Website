const products = [
    {
        id: 1,
        name: "Headphones",
        price: 1500,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2500,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        name: "Keyboard",
        price: 1200,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
    },
    {
        id: 4,
        name: "Mouse",
        price: 800,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"
    }
];

let cart = [];
let wishlist = [];

const productContainer =
    document.getElementById("products");


function displayProducts() {

    productContainer.innerHTML = "";

    products.forEach(product => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <img 
                src="${product.image}" 
                alt="${product.name}"
            >

            <div class="card-content">

                <h3>${product.name}</h3>

                <p class="price">
                    ₹${product.price}
                </p>

                <button onclick="addToCart(${product.id})">
                    Add To Cart
                </button>

                <button
                    onclick="moveToWishlist(${product.id})"
                    class="wishlist-btn">
                    ❤️ Wishlist
                </button>

            </div>
        `;

        productContainer.appendChild(card);
    });
}


function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    cart.push(product);

    updateCart();
}


function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const li =
            document.createElement("li");

        li.innerHTML = `
            <span>
                ${item.name} - ₹${item.price}
            </span>

            <div>

                <button
                    onclick="moveCartItemToWishlist(${index})"
                    class="wishlist-btn">
                    ❤️
                </button>

                <button
                    onclick="removeItem(${index})"
                    class="remove-btn">
                    Remove
                </button>

            </div>
        `;

        cartItems.appendChild(li);
    });


    document.getElementById("cart-count")
        .textContent = cart.length;

    document.getElementById("total")
        .textContent = total;
}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


function moveToWishlist(id) {

    const product =
        products.find(item => item.id === id);

    const exists =
        wishlist.find(item => item.id === id);

    if (!exists) {

        wishlist.push(product);

        updateWishlist();
    }
}


function moveCartItemToWishlist(index) {

    const product = cart[index];

    const exists =
        wishlist.find(item => item.id === product.id);

    if (!exists) {

        wishlist.push(product);
    }

    cart.splice(index, 1);

    updateCart();

    updateWishlist();
}


function updateWishlist() {

    const wishlistItems =
        document.getElementById("wishlist-items");

    wishlistItems.innerHTML = "";

    wishlist.forEach((item, index) => {

        const li =
            document.createElement("li");

        li.innerHTML = `
            <span>
                ${item.name} - ₹${item.price}
            </span>

            <button
                onclick="removeWishlistItem(${index})"
                class="remove-btn">
                Remove
            </button>
        `;

        wishlistItems.appendChild(li);
    });


    document.getElementById("wishlist-count")
        .textContent = wishlist.length;
}


function removeWishlistItem(index) {

    wishlist.splice(index, 1);

    updateWishlist();
}


displayProducts();
