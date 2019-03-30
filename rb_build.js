


class Cart {
   totalCostOfItems = 0;
   itemsInCart = [];

   constructor(totalCost, items) {
      this.totalCost = totalCost;
      this.itemsInCart = items;
   }

//    greet() {
//       return `${this.totalCost} says hello.`;
//   }

//   freelo() {
//      return this.itemsInCart;
//   }
}

var pizzaPrice = {
   size12: 11,
   size14: 13,
   size16: 16,
   toppings: 1.50,
   doubleSauce: 1.50,
   doubleCheese: 1.50,
   stuffed: 3.00,
   pan: 2.00
}


let cart = new Cart(32, [12,34,2]);
console.log(pizzaPrice.doubleCheese);
// let ez = gg.greet();
// console.log(ez);
// let free = gg.freelo()
// console.log(typeof(free))
// console.log(free[0])





/*-------------------- Custom Methods --------------------*/

/* Method added to any DOM element that removes all child nodes of element */
HTMLElement.prototype.removeChildren = function() {
   while (this.firstChild) {
      this.removeChild(this.firstChild);
   }   
};

/* Method added to the select element to return the value of the selected option */
HTMLSelectElement.prototype.selectedValue = function() {
   var sIndex = this.selectedIndex;
   return this.options[sIndex].value;
};

