

/**
 * Class for cart
 */
class Cart {
   totalCostOfItems = 0;
   itemsInCart = [];
   foodItem = new foodItem(0,0);

   constructor(totalCost, items) {
      this.totalCost = totalCost;
      this.itemsInCart = items;
   }

   calculateCartTotal() {

   }

   addToCart() {
      
   }

//    greet() {
//       return `${this.totalCost} says hello.`;
//   }

//   freelo() {
//      return this.itemsInCart;
//   }
}

/**
 * Class for individual food items
 */
class foodItem {
   price = 0;
   qty = 0;

   constructor(price, qty) {
      this.price = price;
      this.qty = qty;
   }

   calculateItemCost() {
      return this.price * this.qty;
   }
}

// Store prices of pizza items
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

class Pizza extends foodItem {
   size = "";
   crust = "";
   doubleSausage = true;
   doubleCheese = true;
   toppings;

   constructor(price, qty, size, crust, doubleSausage, doubleChese, toppings) {
      super(price, qty);

      this.size = size;
      this.crust = crust;
      this.doubleSausage = doubleSausage;
      this.doubleCheese = doubleChese;
      this.toppings = toppings;
   }

   addToppingToPizza() {
      
   }
}

class Toppings extends foodItem{
   name = "";
   side = "";

   constructor(price, qty, name, side) {
      super(price, qty);

      this.name = name;
      this.side = side;
   }
}



window.onload = function () {
   let cart = new Cart(32, [12,34,2]);
   console.log(pizzaPrice.doubleCheese);
   // let ez = gg.greet();
   // console.log(ez);
   // let free = gg.freelo()
   // console.log(typeof(free))
   // console.log(free[0])

   // function pizza() {
   //    size: 0;
   //    crust: 0;
   //    doubleSausage: 0;
   //    doubleCheese: 0;
   //    toppings: [];
   // }

   // function topping() {
   //    name: "",
   //    side: ""

   // }

}






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

