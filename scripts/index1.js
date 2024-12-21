

function displayItems(){
let itemsContainerElement = document.querySelector('.items_container');
if(!itemsContainerElement){
    return; 
}
let innerHTML ='';
items.forEach(item =>{
    innerHTML += `<div class="item_container">
                <img class="item_image" src="${item.image}">
                <div class="rating"> ${item.rating.stars}⭐ |${item.rating.count}</div>
                <div class="company_name">${item.company}</div>
                <div class="item_name">${item.item_name}</div>
                <div class="price">
                    <span class="current_price">Rs.${item.current_price}</span>
                    <span class="original_price">Rs.${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}%OFF)</span>
                </div>
                <button class="btn_add_bag" onclick="addtobag(${item.id})">Add To Bag</button>
            </div>`
});  

itemsContainerElement.innerHTML = innerHTML;
}

let bagItems; 
onLoad();
function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : []; 
    displayBagCount();
    displayItems();   
    
}

function addtobag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagCount();
}

function displayBagCount(){
 let bagCountElement = document.querySelector('.bag_item_count');
 if(bagItems.length > 0){
    bagCountElement.style.visibility = "visible";
    bagCountElement.innerText = bagItems.length;
 } else{
    bagCountElement.style.visibility = 'hidden';
 } 
}