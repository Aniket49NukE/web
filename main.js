const btn = document.getElementsByClassName('btn btn-primary');
// console.log(btn)
const products = []
//textContent = '';
for (var i = 0; i < btn.length; i++){
    let cartbtn = btn[i]
    cartbtn.addEventListener("click", () => {
        
        let product = {
            image: event.target.parentElement.parentElement.children[0].src,
            name: event.target.parentElement.parentElement.children[1].textContent,
            price: event.target.parentElement.children[2].textContent,
            totalprice:parseInt(event.target.parentElement.children[2].textContent),
            quantity: 1,
            
        }
        //console.log(product)
        addItemToLocal(product)
    })
}

 function addItemToLocal(product){

     let cartItem= JSON.parse(localStorage.getItem('prdInCart'))
     if (cartItem === null) {
         products.push(product)
         localStorage.setItem("proInCart", JSON.stringify(products))
       
     }
     else {
         cartItem.forEach(item => {
            
             if (product.name == item.name) {
                 product.quantity = item.quantity += 1;
                 product.totalprice = item.totalprice += product.totalprice;
            } else {
                products.push(item)
            }
        });
       products.push(product)
    }
    localStorage.setItem('prdInCart', JSON.stringify(products));
     window.location.reload()
 }

function dispCartItem() {
    let html = '';
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    cartItem.forEach(item => {
        html += ` <div class="cartlist">
                <img src="${item.image}" alt="">
                <h4>${item.name}</h4>
                <h4>${item.price}</h4>
                <h4>${item.totalprice}</h4>
                <h4>${item.quantity}</h4>
                 <div class="removeItem"><button>remove</button></div>
                 </div> `
    });
    document.querySelector('.cartdisp').innerHTML = html;
}
dispCartItem()

function cartNumberDisplay() {
    let cartNumbers = 0;
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    cartItem.forEach(item => {
        cartNumbers = item.quantity += cartNumbers;
    });
    console.log(cartNumbers);
    document.querySelector('#cartitem span').textContent = cartNumbers;
}


cartNumberDisplay()
 
const removeItem = document.getElementsByClassName('removeItem')
for (var i = 0; i < removeItem.length; i++){
    let removebtn = removeItem[i]
    removebtn.addEventListener('click', () => {
        let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
        console.log( event.target.parentElement.children[0].textContent);
        cartItem.forEach(item => {
            if (item.name != event.target.parentElement.parentElement.children[1].textContent) {
                products.push(item)
            }
        });
         localStorage.setItem('prdInCart', JSON.stringify(products));
         window.location.reload()
    })
}