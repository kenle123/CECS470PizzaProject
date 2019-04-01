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

/**
 * Class for cart
 */
class Cart {
   totalCostOfItems = 0;
   itemsInCart = [];

   constructor(totalCost, items) {
      this.totalCost = totalCost;
      this.itemsInCart = items;
   }
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

class Pizza {
   size = "";
   crust = "";
   doubleSauce;
   doubleCheese;
   toppings = [];

   priceOfPizza = 0;

   constructor(size, crust, doubleSauce, doubleChese, toppings) {
      //super(price, qty);

      this.size = size;
      this.crust = crust;
      this.doubleSauce = doubleSauce;
      this.doubleCheese = doubleChese;
      this.toppings = toppings;
   }

   calculatePizzaPrice() {
      // Size
      if (this.size === 12) {
         priceOfPizza += pizzaPrice.size12;
      } else if (this.size === 14) {
         priceOfPizza += pizzaPrice.size14;
      } else {
         priceOfPizza += pizzaPrice.size16;
      }

      // Crust
      if (this.crust === "stuffed") {
         priceOfPizza += pizzaPrice.stuffed;
      } else if (this.crust === "pan") {
         priceOfPizza += pizzaPrice.pan;
      } else {
         // Thin and thick crust do not cost extra
      }

      // Double Cheese
      if (this.doubleCheese) {
         priceOfPizza += pizzaPrice.doubleCheese;
      }

      // Double Sauce
      if (this.doubleSauce) {
         priceOfPizza += pizzaPrice.doubleSauce;
      }

      // Toppings
      priceOfPizza += (toppings.length * pizzaPrice.toppings);
   }
}

class Toppings extends foodItem {
   name = "";
   side = "";

   constructor(price, qty, name, side) {
      super(price, qty);

      this.name = name;
      this.side = side;
   }
}

window.onload = init();

var doubleCheeseCheckBox;
var doubleSauceCheckBox;
function init() {
   // Pizza image
   var pizzaPreviewBox = document.getElementById("previewBox");

   // Cart Table
   var cartTable = document.querySelector("table#cartTable");

   // Pizza summary shown above quantity option
   var pizzaSummary = document.getElementById("pizzaSummary");

   // Pizza Options with event handler for when input changes
   var pizzaOptions = document.getElementById("pizzaOptions");
   pizzaOptions.addEventListener("input", function () {
      // Pizza Size
      var pizzaSize = document.getElementById("pizzaSize").value + "\" pizza, ";
      pizzaSummary.innerHTML = pizzaSize;

      // Pizza Crust
      var pizzaCrust = document.getElementById("pizzaCrust").value;
      pizzaSummary.innerHTML += pizzaCrust;

      // Double Sauce checkbox
      doubleSauceCheckBox = document.getElementById("doubleSauce").checked;
      if (doubleSauceCheckBox) {
         pizzaSummary.innerHTML += ", double sauce"
      }

      // Double Cheese checkbox
      doubleCheeseCheckBox = document.getElementById("doubleCheese").checked;
      if (doubleCheeseCheckBox) {
         pizzaSummary.innerHTML += ", double cheese"
      }
   });




   // console.log(pizzaSummary);
   // console.log(pizzaCrust);
   // console.log(doubleSauceCheckBox);
   //console.log(doubleCheeseCheckBox);


   // Pizza toppings with event handler for when input changes
   var pizzaToppings = document.getElementById("toppings").addEventListener("input", function () {
      // Pepperoni
      var pepperoni = document.getElementsByName("pepperoni");
      for (let i = 0; i < pepperoni.length; i++) {
         if (pepperoni[i].checked) {
            pizzaSummary += ", pepperoni " + "(" + pepperoni[i].value + ")";
         }
      }

      // Ham
      var ham = document.getElementsByName("ham");
      for (let i = 0; i < ham.length; i++) {
         if (ham[i].checked) {
            pizzaSummary += ", ham " + "(" + ham[i].value + ")";
         }
      }

      // Sausage
      var sausage = document.getElementsByName("sausage");
      for (let i = 0; i < sausage.length; i++) {
         if (sausage[i].checked) {
            pizzaSummary += ", sausage " + "(" + sausage[i].value + ")";
         }
      }

      // Chicken
      var chicken = document.getElementsByName("chicken");
      for (let i = 0; i < chicken.length; i++) {
         if (chicken[i].checked) {
            pizzaSummary += ", chicken " + "(" + chicken[i].value + ")";
         }
      }

      // Mushrooms
      var mushrooms = document.getElementsByName("mushroom");
      for (let i = 0; i < mushrooms.length; i++) {
         if (mushrooms[i].checked) {
            pizzaSummary += ", mushroom " + "(" + mushrooms[i].value + ")";
         }
      }

      // Green Peppers
      var greenpepper = document.getElementsByName("greenpepper");
      for (let i = 0; i < greenpepper.length; i++) {
         if (greenpepper[i].checked) {
            pizzaSummary += ", greenpepper " + "(" + greenpepper[i].value + ")";
         }
      }

      // Onions
      var onion = document.getElementsByName("onion");
      for (let i = 0; i < onion.length; i++) {
         if (onion[i].checked) {
            pizzaSummary += ", onion " + "(" + onion[i].value + ")";
         }
      }

      // Tomatoes
      var tomato = document.getElementsByName("tomato");
      for (let i = 0; i < tomato.length; i++) {
         if (tomato[i].checked) {
            pizzaSummary += ", tomato " + "(" + tomato[i].value + ")";
         }
      }

      // Jalapenos
      var jalapeno = document.getElementsByName("jalapeno");
      for (let i = 0; i < jalapeno.length; i++) {
         if (jalapeno[i].checked) {
            pizzaSummary += ", jalapeno " + "(" + jalapeno[i].value + ")";
         }
      }
   });

   // Initialize test pizza
   toppingsArray = new Array();
   pizza = new Pizza(14, "thin", true, true, toppingsArray);

   // On click listener for add to cart button
   var addToCartButton = document.getElementById("addToCart").onclick = function () {
      var pizzaSummaryCopy = pizzaSummary.cloneNode(true);

      var newRow = document.createElement("tr");
      var newDataItem = document.createElement("td");
      var newDataQty = document.createElement("td");
      var newDataPrice = document.createElement("td");
      var newDataDelete = document.createElement("td");

      var test = document.createTextNode(pizzaSummaryCopy.innerHTML);
      newDataItem.appendChild(test);

      // Pizza quantity
      var pizzaQuantity = document.getElementById("pizzaQuantity").value;
      newDataQty.innerHTML = pizzaQuantity;

      newRow.appendChild(newDataItem);
      newRow.appendChild(newDataQty);
      newRow.appendChild(newDataPrice);
      newRow.appendChild(newDataDelete);




      cartTable.childNodes[2].after(newRow);
   }





}

//setInterval("init()", 1000);






/*-------------------- Custom Methods --------------------*/

/* Method added to any DOM element that removes all child nodes of element */
HTMLElement.prototype.removeChildren = function () {
   while (this.firstChild) {
      this.removeChild(this.firstChild);
   }
};

/* Method added to the select element to return the value of the selected option */
HTMLSelectElement.prototype.selectedValue = function () {
   var sIndex = this.selectedIndex;
   return this.options[sIndex].value;
};
