let demo = document.getElementById('demo');

const apiUrl = 'https://dummyjson.com/products';
let results = '';

async function fetchData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('data: ', data);
    for (let i = 0; i < data.products.length; i++) {
        let ans = data.products[i];
        results += `
            <div class="product">
                <img src="${ans.images[0]}" alt="product" >
                <p class="title">${ans.title}</p>
                <p class="brand">${ans.brand}</p>
                <p class="price">${ans.price}</p>

                <div class="button-container">
                <button onclick='addToCart("${ans.title}", "${ans.brand}", "${ans.price}")'>Add to cart</button>
                </div>
            </div>
        `;
    }
    demo.innerHTML = results;
  }
  fetchData();
  
  
  function addToCart(title, brand, price) {
    let cart = document.getElementById('cart');
    let product = { title, brand, price };
    let products = []
    products.push(product);
    console.log(products);
    localStorage.setItem(title, JSON.stringify(products));
    cart.innerHTML = localStorage.length    
}
