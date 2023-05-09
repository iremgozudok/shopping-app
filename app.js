const products = [
  {
    id: "1",
    fields: {
      title: "queen panel bed",
      price: 10.99,
      image:"./images/product-1.jpeg",
    },
  },
  {
    id: "2",
    fields: {
      title: "king panel bed",
      price: 12.99,
      image:"./images/product-2.jpeg",
    },
  },
  {
    id: "3",
    fields: {
      title: "single panel bed",
      price: 12.99,
      image:"./images/product-3.jpeg",
    },
  },
  {
    id: "4",
    fields: {
      title: "twin panel bed",
      price: 22.99,
      image: "./images/product-4.jpeg",
    },
  },
  {
    id: "5",
    fields: {
      title: "fridge",
      price: 88.99,
      image: "./images/product-5.jpeg",
    },
  },
  {
    id: "6",
    fields: {
      title: "dresser",
      price: 32.99,
      image: "./images/product-6.jpeg",
    },
  },
  {
    id: "7",
    fields: {
      title: "couch",
      price: 45.99,
      image: "./images/product-7.jpeg" ,
    },
  },
  {
    id: "8",
    fields: {
      title: "table",
      price: 33.99,
      image: "./images/product-8.jpeg" ,
    },
  },
]

const productContainer = document.getElementById("products")
const basketCartContent = document.querySelector(".cart-content")
const basketCart = document.querySelector(".cart")
const totalCart = document.querySelector(".cart-total")
const clearCart = document.querySelector(".clear-cart")
const closeCart = document.querySelector(".close-cart")
const cartBtn = document.querySelector(".cart-btn")
const itemValue = document.querySelector(".cart-items")

cartBtn.addEventListener("click", () => {
  basketCart.classList.add("transparentBcg", "showCart")
})

closeCart.addEventListener("click", () => {
  basketCart.classList.remove("transparentBcg", "showCart")
})

  document.addEventListener("DOMContentLoaded", () => {
    sepetiYazdir()
} )


const getProducts = () => {
    products.forEach((product) => {
        const { title, price, image } = product.fields
        const { id } = product
        getUI(id, title, price, image) 
    })
    
}

const getUI = (id, title, price, image) => {
    productContainer.innerHTML += `
    <article class="product">
      <div class="img-container">
          <img class="product-img" src="${image}" alt="product">
          <button onclick="addProductToBasket(${id})" class="bag-btn" data-id="1">
              <i class="fas fa-shopping-cart">add to bag</i>
          </button>
      </div>
      <h3>${title}</h3>
      <h4>${price}</h4>
    </article>
    `
}


getProducts()

const addProductToBasket = (id) => {
  let basketItems = JSON.parse(localStorage.getItem("basket"))
  basketItems = basketItems ? basketItems : []
  let varMi = false
  products.forEach(item => {
    if(item.id == id){
      basketItems.forEach(basketItem => {
        if(item.id == basketItem.id){
          basketItem.count++
          varMi = true
        } 
      }) 
      if(!varMi){
        item.count = 1
        basketItems.push(item)
        itemValue.innerHTML = basketItems.length
      }
      
      localStorage.setItem("basket", JSON.stringify(basketItems))
      sepetiYazdir()
      basketCart.classList.add("transparentBcg", "showCart")
//       basketCartContent.innerHTML += `
//     <div class="cart-item">
//     <img src="${item.fields.image}" alt="product">
//     <div>
//         <h4>${item.fields.title}</h4>
//         <h5>${item.fields.price}</h5>
//         <span onclick= class="remove-item">remove</span>
//     </div>
//     <div>
//         <i class="fas fa-chevron-up"></i>
//         <p class="item-amount">1</p>
//         <i class="fas fa-chevron-down"></i>
//     </div>
// </div>
//     `
//     
    }
  })
    
}

const sepetiYazdir = () => {
  let basketItems = JSON.parse(localStorage.getItem("basket"))
  basketItems = basketItems ? basketItems : []
  basketCartContent.innerHTML = ""
  if(basketItems) {
    basketItems.forEach(item => {   
      
      basketCartContent.innerHTML += `
    <div class="cart-item">
    <img src="${item.fields.image}" alt="product">
    <div>
        <h4>${item.fields.title}</h4>
        <h5>${item.fields.price}</h5>
        <span onclick="deleteItem(${item.id})" class="remove-item">remove</span>
    </div>
    <div>
        <div onclick="plus(${item.id})"><i class="fas fa-chevron-up"></i></div>
        <p class="item-amount">${item.count}</p>
        <div onclick="minus(${item.id})"><i class="fas fa-chevron-down"></i></div>
    </div>
</div>
    `
    
    })
  }
  tutarHesaplama()
  itemValue.innerHTML = basketItems.length

}

const tutarHesaplama = () => {
  let totalPrice = 0
  let basketItems = JSON.parse(localStorage.getItem("basket"))
  basketItems = basketItems ? basketItems : []
  basketItems.forEach(item => {
    totalPrice += item.fields.price * item.count   
  })
  totalCart.innerHTML = totalPrice
}

const deleteItem = (id) => {
  let basketItems = JSON.parse(localStorage.getItem("basket"))
  basketItems.forEach((item,index) => {
    if(item.id == id){
      basketItems.splice(index, 1)
    } 
  })
  localStorage.setItem("basket", JSON.stringify(basketItems))
  sepetiYazdir()
  itemValue.innerHTML = basketItems.length
}

const clearAllItems = () => {
  localStorage.clear()
  sepetiYazdir()
}

clearCart.addEventListener("click", clearAllItems)

const plus = (id) => {
  let basketItems = JSON.parse(localStorage.getItem("basket"))
  basketItems.forEach(item => {
    if(item.id == id){
      item.count++
    } 
  })
  localStorage.setItem("basket", JSON.stringify(basketItems))
  sepetiYazdir()
}

const minus = (id) => {
  let basketItems = JSON.parse(localStorage.getItem("basket"))
  basketItems.forEach(item => {
    if(item.id == id){
      item.count--
    } 
  })
  localStorage.setItem("basket", JSON.stringify(basketItems))
  sepetiYazdir()
}


