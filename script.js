const products = [
  {
    name: 'Sony Playstation 5',
    url: 'images/playstation_5.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'images/samsung_galaxy.png',
    category: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'images/cannon_eos_camera.png',
    category: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'images/sony_a7_camera.png',
    category: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'images/lg_tv.png',
    category: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'images/nintendo_switch.png',
    category: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'images/xbox_series_x.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'images/samsung_tv.png',
    category: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'images/google_pixel.png',
    category: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'images/sony_zv1f_camera.png',
    category: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'images/toshiba_tv.png',
    category: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'images/iphone_14.png',
    category: 'smartphones',
    price: 999.99,
  },
];

// Get DOM elements

const productsWrapper = document.getElementById('products-wrapper');
const checkBoxes = document.querySelectorAll('.check');
const filterContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cartCount');

let cartItemCount = 0;

// initialize product element array

const productElementArray = [];
// event listener for filter

filterContainer.addEventListener("change", filterProduct)
searchInput.addEventListener("input", filterProduct)


// loop over products and create an element
products.forEach((product) => {
  const productElement = createProductElement(product);
productElementArray.push(productElement);
productsWrapper.appendChild(productElement);
})

// create product element 

function createProductElement(product){
  const productElement = document.createElement('div');
  productElement.className = 'item space-y-2'
  productElement.innerHTML = 
  `<div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
  <img src="${product.url}" alt="${product.name}" class="w-full h-full object-cover">
  <button
    class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">Add
    to cart</button>
  </div>
  <p class="text-xl">${product.name}</p>
  <strong>$${product.price.toLocaleString()}</strong>
  `
productElement.querySelector(".status").addEventListener("click", updateCart)

  return productElement
}
// update Cart

function updateCart(e) {
const statusElement = e.target
if(statusElement.classList.contains("added")){
  statusElement.classList.remove("added")
  statusElement.innerText = "Add From Cart"
  statusElement.classList.remove("bg-red-800")  
  statusElement.classList.add("bg-gray-800")
  cartItemCount--
  }else{
  statusElement.classList.add("added")
  statusElement.innerText = "Remove From Cart"
  statusElement.classList.remove("bg-gray-800")  
  statusElement.classList.add("bg-red-800")
    cartItemCount++
}
// updateCartItemCount
cartCount.innerText = cartItemCount.toString();

}
// filterProduct
function filterProduct() {
   const searchTerm = searchInput.value.trim().toLowerCase();
  //  get checked categories
  const checkedCategories = Array.from(checkBoxes).filter((check) => check.checked).map((check) => check.id)

  // loop over and check for matches

  productElementArray.forEach((productElement, index) => {
    const product = products[index]

    // check to see if the product are checked

    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const isinCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category);

    // show or hide products

    if(matchesSearchTerm && isinCheckedCategory) {
      productElement.classList.remove("hidden")
    }
      else{
        productElement.classList.add("hidden")
      }
    }
  )
}