const CONVENIENCE_FEES = 99;
let bagItemObjects = [];
onLoad();

function onLoad(){
    loadBagItemsObjects();
    displayBagItems();
    updateBagCount();
    displayBagSummary();
}


function displayBagSummary(){
  let bagSummaryElement = document.querySelector('.bag-summary'); 
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;
 
  bagItemObjects.forEach(bagItem =>{
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  })
 
  finalPayment =totalMRP-totalDiscount + CONVENIENCE_FEES;

  bagSummaryElement.innerHTML = ` 
          <div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${totalItem}Items) </div>
            <div class="price-item">
              <span class="price-item-tag">RS.${totalMRP}</span>
              <span class="price-item-value">RS.${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">RS.${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">RS.${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}
function loadBagItemsObjects(){
    bagItemObjects = [];
    console.log(bagItems);

    bagItems.forEach(itemId => {
        for(let i=0; i<items.length; i++){ 
            if(itemId == items[i].id){
                bagItemObjects.push(items[i]);
            }
        }
    });
    console.log(bagItemObjects);
}

function removeFromBag(itemId){
  bagItems =  bagItems.filter(bagItemId => bagItemId !== itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemsObjects();
  displayBagItems();
  updateBagCount();
  displayBagSummary();
}

function displayBagItems(){
    let containerElement = document.querySelector('.bag-items-container');
    let innerHTML ='';
    if(bagItemObjects.length > 0)
      {
    bagItemObjects.forEach(bagItem =>
      {
      innerHTML +=  generateItemHTML(bagItem); 
      });
      }
    else{
    "<p>No Elements Present.</p>";
  }  
  containerElement.innerHTML = innerHTML;
}
function generateItemHTML(item){
        return `<div class="bag-items-container">
        <div class="bag-item-container">
          <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}">
          </div>
          <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
              <span class="current-price">Rs${item.current_price}</span>
              <span class="original-price">Rs${item.original_price}</span>
              <span class="discount-percentage">(${item.discount_percentage} %OFF)</span>
            </div>
            <div class="return-period">
              <span class="return-period-days">${item.return_period}days</span> return available
            </div>
            <div class="delivery-details">
              Delivery by
              <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
          </div>

          <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
        </div>

      </div>`
}

function updateBagCount() {
  let bagCountElement = document.querySelector('.bag_item_count');  // Assuming there's an element with class 'bag-count'
  bagCountElement.textContent = bagItems.length;  // Update with the number of items in the bag
}


