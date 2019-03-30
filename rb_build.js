

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
   doubleSauce;
   doubleCheese;
   toppings;

   priceOfPizza = 0;

   constructor(price, qty, size, crust, doubleSauce, doubleChese, toppings) {
      super(price, qty);

      this.size = size;
      this.crust = crust;
      this.doubleSauce = doubleSauce;
      this.doubleCheese = doubleChese;
      this.toppings = toppings;
   }

   addToppingToPizza(toppingToAdd) {
      toppings.push(toppingToAdd);
   }

   calculatePizzaPrice() {
      // Size
      if(this.size === 12) {
         priceOfPizza += pizzaPrice.size12;
      }
      else if(this.size === 14) {
         priceOfPizza += pizzaPrice.size14;
      }
      else {
         priceOfPizza += pizzaPrice.size16;
      }

      // Crust
      if(this.crust === "stuffed") {
         priceOfPizza += pizzaPrice.stuffed;
      }
      else if(this.crust === "pan") {
         priceOfPizza += pizzaPrice.pan;
      }
      else {
         // Thin and thick crust do not cost extra
      }

      // Double Cheese
      if(this.doubleCheese) {
         priceOfPizza += pizzaPrice.doubleCheese;
      }

      // Double Sauce
      if(this.doubleSauce) {
         priceOfPizza += pizzaPrice.doubleSauce;
      }

      // Toppings
      priceOfPizza += (toppings.length * pizzaPrice.toppings);

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

