// Store prices of pizza items
var pizzaPrice = {
   size12: 11,
   size14: 13,
   size16: 16,
   toppingsFull: 1.50,
   toppingsSide: 0.75,
   doubleSauce: 1.50,
   doubleCheese: 1.50,
   stuffed: 3.00,
   pan: 2.00
}

class Pizza {
   size = "";
   crust = "";
   doubleSauce;
   doubleCheese;
   toppings = [];

   constructor(size, crust, doubleSauce, doubleChese, toppings) {
      this.size = size;
      this.crust = crust;
      this.doubleSauce = doubleSauce;
      this.doubleCheese = doubleChese;
      this.toppings = toppings;
   }
}

class Toppings {
   name = "";
   side = "";

   constructor(name, side) {
      this.name = name;
      this.side = side;
   }
}

window.onload = init();

// Global Variables
var doubleCheeseCheckBox;
var doubleSauceCheckBox;

let cartTotal = document.getElementById("cartTotal");
let cartTotalPrice = parseFloat(cartTotal.value);
cartTotalPrice = 0;

// Init function 
function init() {
   // Pizza image
   var pizzaPreviewBox = document.getElementById("previewBox");

   // Cart Table
   var cartTable = document.querySelector("table#cartTable");

   // Pizza summary shown above quantity option
   var pizzaSummary = document.getElementById("pizzaSummary");

   var pizzaSummary1 = "14\" pizza, thin";
   var pizzaSummary2 = "";

   var pizzaOptions = document.getElementById("pizzaOptions").addEventListener("change", function () {
      pizzaSummary1 = "";
      // Pizza Size
      var pizzaSize = document.getElementById("pizzaSize").value + "\" pizza, ";
      pizzaSummary1 += pizzaSize;

      // Pizza Crust
      var pizzaCrust = document.getElementById("pizzaCrust").value;
      pizzaSummary1 += pizzaCrust;

      // Double Sauce checkbox
      doubleSauceCheckBox = document.getElementById("doubleSauce").checked;
      if (doubleSauceCheckBox) {
         pizzaSummary1 += ", double sauce"
      }

      // Double Cheese checkbox
      doubleCheeseCheckBox = document.getElementById("doubleCheese").checked;
      if (doubleCheeseCheckBox) {
         pizzaSummary1 += ", double cheese"
      }
      combinePizzaItems(pizzaSummary1, pizzaSummary2);
   });

   var toppingsChange = document.getElementById("toppings").addEventListener("change", function () {
      pizzaSummary2 = "";
      // Pepperoni
      var pepperoni = document.getElementsByName("pepperoni");
      for (let i = 0; i < pepperoni.length; i++) {
         //console.log("got here")
         if (pepperoni[i].checked && pepperoni[i].value != "none") {
            pizzaSummary2 += ", pepperoni" + "(" + pepperoni[i].value + ")";
         }
      }

      // Ham
      var ham = document.getElementsByName("ham");
      for (let i = 0; i < ham.length; i++) {
         if (ham[i].checked && ham[i].value != "none") {
            pizzaSummary2 += ", ham" + "(" + ham[i].value + ")";
         }
      }

      // Sausage
      var sausage = document.getElementsByName("sausage");
      for (let i = 0; i < sausage.length; i++) {
         if (sausage[i].checked && sausage[i].value != "none") {
            pizzaSummary2 += ", sausage" + "(" + sausage[i].value + ")";
         }
      }

      // Chicken
      var chicken = document.getElementsByName("chicken");
      for (let i = 0; i < chicken.length; i++) {
         if (chicken[i].checked && chicken[i].value != "none") {
            pizzaSummary2 += ", chicken" + "(" + chicken[i].value + ")";
         }
      }

      // Mushrooms
      var mushrooms = document.getElementsByName("mushroom");
      for (let i = 0; i < mushrooms.length; i++) {
         if (mushrooms[i].checked && mushrooms[i].value != "none") {
            pizzaSummary2 += ", mushroom" + "(" + mushrooms[i].value + ")";
         }
      }

      // Green Peppers
      var greenpepper = document.getElementsByName("greenpepper");
      for (let i = 0; i < greenpepper.length; i++) {
         if (greenpepper[i].checked && greenpepper[i].value != "none") {
            pizzaSummary2 += ", greenpepper" + "(" + greenpepper[i].value + ")";
         }
      }

      // Onions
      var onion = document.getElementsByName("onion");
      for (let i = 0; i < onion.length; i++) {
         if (onion[i].checked && onion[i].value != "none") {
            pizzaSummary2 += ", onion" + "(" + onion[i].value + ")";
         }
      }

      // Tomatoes
      var tomato = document.getElementsByName("tomato");
      for (let i = 0; i < tomato.length; i++) {
         if (tomato[i].checked && tomato[i].value != "none") {
            pizzaSummary2 += ", tomato" + "(" + tomato[i].value + ")";
         }
      }

      // Jalapenos
      var jalapeno = document.getElementsByName("jalapeno");
      for (let i = 0; i < jalapeno.length; i++) {
         if (jalapeno[i].checked && jalapeno[i].value != "none") {
            pizzaSummary2 += ", jalapeno" + "(" + jalapeno[i].value + ")";
         }
      }
      combinePizzaItems(pizzaSummary1, pizzaSummary2);
      //checkForDuplicates();
   });

   /**
    * Combines the pizza summary from options menu and toppings menu
    * @param {*} item1 Options menu 
    * @param {*} item2 Toppings menu
    */
   function combinePizzaItems(item1, item2) {
      pizzaSummary.innerHTML = item1 + item2;
   }

   // On click listener for add to cart button
   var addToCartButton = document.getElementById("addToCart").onclick = function () {
      let pizzaSummaryCopy = pizzaSummary.cloneNode(true);

      // Creates the new row elements
      let newRow = document.createElement("tr");
      let newDataItem = document.createElement("td");
      let newDataQty = document.createElement("td");
      let newDataPrice = document.createElement("td");
      let newDataDelete = document.createElement("td");

      // Item Description to be appended onto table
      let itemDescription = document.createTextNode(pizzaSummaryCopy.innerHTML);
      newDataItem.appendChild(itemDescription);

      // Pizza quantity to be appended onto table
      let pizzaQuantity = document.getElementById("pizzaQuantity").value;
      newDataQty.innerHTML = pizzaQuantity;

      // Pizza price to be appended onto table
      // Splits up the pizza summary by commas
      var pizzaPrices = pizzaSummaryCopy.innerHTML.split(",").map(item => item.trim());

      // Filters the array by seeing if each index of the array has a "("
      let stringToInclude = "(";
      let toppingsArrayBefore = pizzaPrices.filter(item => item.includes(stringToInclude));

      toppingsArray = new Array();

      // Goes through the toppings and splits it up by name, side and insert into toppings array
      for (item of toppingsArrayBefore) {
         var nameOfTopping = item.substr(0, item.indexOf("("));
         var sideOfTopping = item.substr(item.indexOf("("), item.indexOf(")"));
         toppingsArray.push(new Toppings(nameOfTopping, sideOfTopping));
      }

      // Get size and crust
      var pizzaSizeCart = document.getElementById("pizzaSize").value;
      var pizzaCrustCart = document.getElementById("pizzaCrust").value;

      // Initialize a new pizza
      var pizza = new Pizza(pizzaSizeCart, pizzaCrustCart, doubleSauceCheckBox, doubleCheeseCheckBox, toppingsArray);

      var totalPizzaPrice = 0;

      // Start calculating the price of the pizza
      // Size
      if (pizza.size === "12") {
         totalPizzaPrice += pizzaPrice.size12;
      } else if (pizza.size === "14") {
         totalPizzaPrice += pizzaPrice.size14;
      } else {
         totalPizzaPrice += pizzaPrice.size16;
      }

      // Crust
      if (pizza.crust === "stuffed") {
         totalPizzaPrice += pizzaPrice.stuffed;
      } else if (pizza.crust === "pan") {
         totalPizzaPrice += pizzaPrice.pan;
      }

      // Double Sauce
      if (typeof pizza.doubleSauce !== "undefined" && pizza.doubleSauce !== false) {
         totalPizzaPrice += pizzaPrice.doubleSauce;
      }

      // Double Cheese
      if (typeof pizza.doubleCheese !== "undefined" && pizza.doubleCheese !== false) {
         totalPizzaPrice += pizzaPrice.doubleCheese;
      }

      // Toppings
      for (let i = 0; i < pizza.toppings.length; i++) {
         if (pizza.toppings[i].side === "(full)") {
            totalPizzaPrice += pizzaPrice.toppingsFull;
         } else {
            totalPizzaPrice += pizzaPrice.toppingsSide;
         }
      }

      // Append price onto table
      let pizzaPriceTable = document.createTextNode("$" + totalPizzaPrice);
      newDataPrice.appendChild(pizzaPriceTable);

      // Delete pizza item
      let deletePizzaItem = document.createElement("button");
      deletePizzaItem.innerHTML = "x";
      newDataDelete.appendChild(deletePizzaItem);

      // Appends the item, qty, price, and delete button onto a new row
      newRow.appendChild(newDataItem);
      newRow.appendChild(newDataQty);
      newRow.appendChild(newDataPrice);
      newRow.appendChild(newDataDelete);

      // Adds the new row into the table
      cartTable.appendChild(newRow);

      // Update total
      cartTotalPrice += totalPizzaPrice * pizzaQuantity;
      cartTotal.value = "$" + cartTotalPrice;
   }
}

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
