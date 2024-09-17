let cartBody = document.getElementById('cart-body');
const deliveryFee = 500; 
function populateCart() {
    let cartTable = '';
    let grandTotal = 0; 

    for (let m = 0; m < localStorage.length; m++) {
        let key = localStorage.key(m);
        let storage = JSON.parse(localStorage.getItem(key));

        if (storage && Array.isArray(storage) && storage.length > 0) {
            let price = parseFloat(storage[0].price.replace(/[^0-9.-]+/g, "")); 
            let quantity = storage[0].quantity || 1; 
            let subtotal = price * quantity; 
            grandTotal += subtotal; 

            cartTable += `
                <tr class="product">
                    <td><img src="${storage[0].images 
                    }></td>
                    
                    
                    <td>${storage[0].title}</td>
                    <td>${price.toFixed(2)}</td>
                    <td>
                        <input type="number" value="${quantity}" min="1" onchange='updateQuantity("${key}", this.value)'>
                    </td>
                    <td>${storage[0].title}</td>
                    <td>${subtotal.toFixed(2)}</td>
                    
                   
                     <td>
                        <input type="number" value="${quantity}" min="1" onchange='updateQuantity("${key}", this.value)'>
                    </td>
                    <td><button onclick='removeItem("${key}")'>Remove</button></td>
                </tr>
            `;
        }
    }

    
    cartBody.innerHTML = cartTable;

    
    if (grandTotal > 0) {
        const totalAmount = grandTotal + deliveryFee;
        cartBody.innerHTML += `
            <tr>
                <td  ><strong>Subtotal:</strong></td>
                <td>${grandTotal.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td ><strong>Delivery Fee:</strong></td>
                <td>${deliveryFee.toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td ><strong>Total:</strong></td>
                <td>${totalAmount.toFixed(2)}</td>
                <td></td>
            </tr>
        `;
    }
}

function updateQuantity(key, quantity) {
   
    let storage = JSON.parse(localStorage.getItem(key));
    if (storage && Array.isArray(storage) && storage.length > 0) {
        storage[0].quantity = parseInt(quantity, 10);
        localStorage.setItem(key, JSON.stringify(storage));
    }
    populateCart(); 
}

function removeItem(key) {
    localStorage.removeItem(key);
    populateCart(); 
}


populateCart();