
//Data Storage --
// Memory(temporery)
//database
//browser - local Storage, Session Storage

// Local storage e joma korbo data

//local Storage
// -- data premitive hishebe joma hoy

// const data = 30;
// localStorage.setItem('ourVal' , data);
// console.log(localStorage.getItem('ourVal'));


// complex Data hoile premitive e convert kore nite hobe

// const data = [{
//     name: 'Leemon'
// },
// {
//     age: 32
// }]
// localStorage.setItem('ourVal' , JSON.stringify(data));
// console.log(JSON.parse(localStorage.getItem('ourVal')));


(function () {
    const formElm = document.querySelector('form');
const nameInputElm = document.querySelector('.product-name');
const priceInputElm = document.querySelector('.product-price');
const listGroupElm = document.querySelector('.list-group');
const filterElm = document.querySelector('#filter');




//tracking Item
// Data Store thakbe, shekhane shob data thakbe

let products = [];

function inIt() {

    formElm.addEventListener('submit',(evt)=>{

        // prevent default - reloading browser
        evt.preventDefault();
    
        //receiving input
        const {nameInput , priceInput} = receiveInputs();
    
        //validate Input
    
        const isErrors = validateInput(nameInput,priceInput);
        // console.log(isErrors);
        if (isErrors) {
            alert('Please Provide Valid Input')
            return;
        }
        if (!isErrors) {
            const id = products.length;
            const product = {
                id: id,
                name : nameInput,
                price: priceInput
            }
            //Add Item to data source
            products.push(product)
            //  Add item to the (UI) user interface
            addItemToUI(id,nameInput , priceInput);

            // add item to LocalStorage

            addItemToStorage(product)
            // console.log(products);
            //reset the input
            resetInput()
    
        }
        
    //   console.log(inputValues);
      // inputValues = {nameInput: 'wewe', priceInput: '34'}  log korle  eta dekhabe
      
    })

    function addItemToStorage(product){
        let products;
        if (localStorage.getItem('storeProduct')) {
             products = JSON.parse(localStorage.getItem('storeProduct'))
            products.push(product)
            //update to local Storage
            localStorage.setItem('storeProduct', JSON.stringify(products));
        } else {
            let products = [];
        products.push(product);
        localStorage.setItem('storeProduct', JSON.stringify(products));
        }
    }

    filterElm.addEventListener('keyup',(evt) =>{

        // filter Depend on this Value
        const filterValue = evt.target.value
        const filteredArr = products.filter((product) =>
            product.name.includes(filterValue)
        )
        showAllItemstoUi(filteredArr)
    })

    // Deleting Item ( Event Delegation)
listGroupElm.addEventListener('click', evt => {
    if (evt.target.classList.contains('delete_item')) {
        const id = getItemId(evt.target); 
        // delete item from UI and array
        removeItemfromUi(id);
        // delete item from array
        removeItemfromDataStore(id);
        // delete item from Local storage
        removeProductFromStorage(id);

    } else if (evt.target.classList.contains('edit_item')){
        //pick the edit item id
        const id = getItemId(evt.target); 
        // console.log(id);
        // find the item
        const foundProduct = products.find(product => product.id === id)
        console.log(foundProduct);
        // populate the item data to ui
        // show updated button
        // updating the data from user
        // updating data should be updated to UI
        // updating data should be updated to Data Store
        // updating data should be updated to LocalStorage
    }

})
document.addEventListener('DOMContentLoaded', e => {
    // checking item of local storage
    if (localStorage.getItem('storeProduct')) {
        const products = JSON.parse(localStorage.getItem('storeProduct'))
         showAllItemstoUi(products)
        // console.log(products);
    }
})

}

inIt();

function removeProductFromStorage(id){
    //  const products = updateAfterRemove(id)
    // pick from local storage
    const products =JSON.parse(localStorage.getItem('storeProduct'))
    // filter 
  const productsAfterRemove =  updateAfterRemove(products , id)
    // save Data to Local Storage
    localStorage.setItem('storeProduct', JSON.stringify( productsAfterRemove))

}


function showAllItemstoUi(filteredArr) {
    listGroupElm.innerHTML = '';
    filteredArr.forEach(item => {
        const listElm = `<li class="list-group-item item-${item.id} collection-item">
        <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
        <i class="fa fa-trash delete_item float-right"></i>
    <i class="fa fa-pencil-alt mr-2 edit_item float-right"></i>

    </li>`
    
    listGroupElm.insertAdjacentHTML('afterbegin',listElm);
    });
}

function updateAfterRemove(products, id){
    return products.filter(product => product.id !== id)
}

function removeItemfromDataStore(id){

    const productAfterDelete = updateAfterRemove( products, id) ;
   products = productAfterDelete;
};

function removeItemfromUi(id){
    document.querySelector(`.item-${id}`).remove();
}

function getItemId(elem) {
   const liElm = elem.parentElement;
   return Number(liElm.classList[1].split('-')[1]);
}


function resetInput(){
    nameInputElm.value = '';
    priceInputElm.value = '';
}

function addItemToUI(id , name , price){
    //generate id
    // const id = 
    const listElm = `<li class="list-group-item item-${id} collection-item">
    <strong>${name}</strong>- <span class="price">$${price}</span>
    <i class="fa fa-trash delete_item float-right"></i>
    <i class="fa fa-pencil-alt mr-2 edit_item float-right"></i>

</li>`

listGroupElm.insertAdjacentHTML('afterbegin',listElm);
}


function validateInput(name, price) {
    let isError = false;
    if (!name || name.length < 2) {
        isError=true;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
        isError=true;

    }
    return isError;
}


// single responsibility principel
// ekta function er ekta responisibility thakbe


function receiveInputs() {
    //ekhane duita jinish return korte hobe so, 

    const nameInput = nameInputElm.value;
    const priceInput = priceInputElm.value;
    // ekhon duita variable ke return korte hobe ektu complex way te\
    // array or object hishebe ba group kore

    return {
        // nameInput : nameInput,
        // eta object and object er khetre key value similar hole ekta likhlei hoye jay
        nameInput,
        priceInput
    }
}

})();


