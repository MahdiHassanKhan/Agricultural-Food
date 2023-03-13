// Define products
const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 10.00
    },
    {
        id: 2,
        name: 'Product 2',
        price: 15.00
    },
    {
        id: 3,
        name: 'Product 3',
        price: 20.00
    }
];

// Define cart variable
let cart = [];

// Define functions
function getProductById(id) {
    return products.find(product => product.id === id);
}

function displayCart() {
    const cartItems = document.querySelector('#cart-items');
    let html = '';
    cart.forEach(item => {
        const product = getProductById(item.id);
        html += `
        <tr>
          <td>${product.name}</td>
          <td>$${product.price.toFixed(2)}</td>
        <td>
          <button class="btn btn-secondary decrement-from-cart" data-id="${product.id}">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">+</button>
        </td>
          <td>$${(item.quantity * product.price).toFixed(2)}</td>
          <td><button class="btn btn-danger remove-from-cart" data-id="${product.id}">Remove</button></td>
        </tr>
      `;
    });
    cartItems.innerHTML = html;

    // Remove existing event listeners before attaching new ones
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.removeEventListener('click', removeFromCart);
        button.addEventListener('click', removeFromCart);
    });

    attachRemoveEventListeners();
    attachDecrementEventListeners();
    updateCartTotal();
}


function updateCartTotal() {
    const cartTotal = document.querySelector('#cart-total');
    const total = cart.reduce((acc, item) => {
        const product = getProductById(item.id);
        return acc + (item.quantity * product.price);
    }, 0);
    cartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function removeFromCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1);
    }
    displayCart();
}

function decrementFromCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
        const cartItem = cart[cartItemIndex];
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            cart.splice(cartItemIndex, 1);
        }
    }
    updateCartTable();
}


// Attach the event listener for the remove button
function attachRemoveEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function attachDecrementEventListeners() {
    const decrementButtons = document.querySelectorAll('.decrement-from-cart');
    decrementButtons.forEach(button => {
        button.addEventListener('click', decrementFromCart);
    });
}


// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Display cart
    displayCart();

    // Add to cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }
            displayCart();
        });
    });

    // Attach the event listener for the remove button
    attachRemoveEventListeners();
    attachDecrementEventListeners();
});


// // Add event listeners
// document.addEventListener('DOMContentLoaded', () => {
//     // Display cart
//     displayCart();

//     // Add to cart
//     const addToCartButtons = document.querySelectorAll('.add-to-cart');
//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             const productId = parseInt(button.dataset.id);
//             const cartItem = cart.find(item => item.id === productId);
//             if (cartItem) {
//                 cartItem.quantity++;
//             } else {
//                 cart.push({ id: productId, quantity: 1 });
//             }
//             localStorage.setItem('cart', JSON.stringify(cart));
//             displayCart();
//         });
//     });

//     // Remove from cart
//     const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
//     removeFromCartButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             const productId = parseInt(button.dataset.id);
//             const cartItemIndex = cart.findIndex(item => item.id === productId);
//             if (cartItemIndex !== -1) {
//                 cart.splice(cartItemIndex, 1);
//             }
//             localStorage.setItem('cart', JSON.stringify(cart));
//             displayCart();
//         });
//     });
// });
