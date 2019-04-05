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

var arr = [];
var arrPrice = [];

// Used to hold information for toppings for the pizza preview
// [0] is for double sauce
// [1] is for double cheese
// [2] is for pepperoni
// [3] is for ham
// and etc.
var toppingsArrayPreview = new Array(11);
console.log(toppingsArrayPreview.length);
console.log(toppingsArrayPreview);
toppingsArrayPreview[0] = false;
toppingsArrayPreview[1] = false;
var rowId = 1;

// Init function 
function init() {
   // Pizza image
   var pizzaPreviewBox = document.getElementById("previewBox");
   console.log(pizzaPreviewBox);

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
         toppingsArrayPreview[0] = true;
      } else {
         toppingsArrayPreview[0] = false;
      }

      // Double Cheese checkbox
      doubleCheeseCheckBox = document.getElementById("doubleCheese").checked;
      if (doubleCheeseCheckBox) {
         pizzaSummary1 += ", double cheese"
         toppingsArrayPreview[1] = true;
      } else {
         toppingsArrayPreview[1] = false;
      }
      combinePizzaItems(pizzaSummary1, pizzaSummary2);
      addImageToPreview();
   });

   var toppingsChange = document.getElementById("toppings").addEventListener("change", function () {
      pizzaSummary2 = "";

      // Pepperoni
      var pepperoni = document.getElementsByName("pepperoni");
      for (let i = 0; i < pepperoni.length; i++) {
         if (pepperoni[i].checked && pepperoni[i].value != "none") {
            pizzaSummary2 += ", pepperoni" + "(" + pepperoni[i].value + ")";

            if (pepperoni[i].value === "left") {
               toppingsArrayPreview[2] = 0;
            } else if (pepperoni[i].value === "right") {
               toppingsArrayPreview[2] = 1;
            } else {
               toppingsArrayPreview[2] = 2;
            }
         } else if(pepperoni[i].checked && pepperoni[i].value === "none") {
            toppingsArrayPreview[2] = 3;
         }
      }

      // Ham
      var ham = document.getElementsByName("ham");
      for (let i = 0; i < ham.length; i++) {
         if (ham[i].checked && ham[i].value != "none") {
            pizzaSummary2 += ", ham" + "(" + ham[i].value + ")";

            if (ham[i].value === "left") {
               toppingsArrayPreview[3] = 0;
            } else if (ham[i].value === "right") {
               toppingsArrayPreview[3] = 1;
            } else {
               toppingsArrayPreview[3] = 2;
            }
         } else if(ham[i].checked && ham[i].value === "none") {
            toppingsArrayPreview[3] = 3;
         }
      }

      // Sausage
      var sausage = document.getElementsByName("sausage");
      for (let i = 0; i < sausage.length; i++) {
         if (sausage[i].checked && sausage[i].value != "none") {
            pizzaSummary2 += ", sausage" + "(" + sausage[i].value + ")";

            if (sausage[i].value === "left") {
               toppingsArrayPreview[4] = 0;
            } else if (sausage[i].value === "right") {
               toppingsArrayPreview[4] = 1;
            } else {
               toppingsArrayPreview[4] = 2;
            }
         } else if(sausage[i].checked && sausage[i].value === "none") {
            toppingsArrayPreview[4] = 3;
         }
      }

      // Chicken
      var chicken = document.getElementsByName("chicken");
      for (let i = 0; i < chicken.length; i++) {
         if (chicken[i].checked && chicken[i].value != "none") {
            pizzaSummary2 += ", chicken" + "(" + chicken[i].value + ")";

            if (chicken[i].value === "left") {
               toppingsArrayPreview[5] = 0;
            } else if (chicken[i].value === "right") {
               toppingsArrayPreview[5] = 1;
            } else {
               toppingsArrayPreview[5] = 2;
            }
         } else if(chicken[i].checked && chicken[i].value === "none") {
            toppingsArrayPreview[5] = 3;
         }
      }

      // Mushrooms
      var mushrooms = document.getElementsByName("mushroom");
      for (let i = 0; i < mushrooms.length; i++) {
         if (mushrooms[i].checked && mushrooms[i].value != "none") {
            pizzaSummary2 += ", mushroom" + "(" + mushrooms[i].value + ")";

            if (mushrooms[i].value === "left") {
               toppingsArrayPreview[6] = 0;
            } else if (mushrooms[i].value === "right") {
               toppingsArrayPreview[6] = 1;
            } else {
               toppingsArrayPreview[6] = 2;
            }
         } else if(mushrooms[i].checked && mushrooms[i].value === "none") {
            toppingsArrayPreview[6] = 3;
         }
      }

      // Green Peppers
      var greenpepper = document.getElementsByName("greenpepper");
      for (let i = 0; i < greenpepper.length; i++) {
         if (greenpepper[i].checked && greenpepper[i].value != "none") {
            pizzaSummary2 += ", greenpepper" + "(" + greenpepper[i].value + ")";

            if (greenpepper[i].value === "left") {
               toppingsArrayPreview[7] = 0;
            } else if (greenpepper[i].value === "right") {
               toppingsArrayPreview[7] = 1;
            } else {
               toppingsArrayPreview[7] = 2;
            }
         } else if(greenpepper[i].checked && greenpepper[i].value === "none") {
            toppingsArrayPreview[7] = 3;
         }
      }

      // Onions
      var onion = document.getElementsByName("onion");
      for (let i = 0; i < onion.length; i++) {
         if (onion[i].checked && onion[i].value != "none") {
            pizzaSummary2 += ", onion" + "(" + onion[i].value + ")";

            if (onion[i].value === "left") {
               toppingsArrayPreview[8] = 0;
            } else if (onion[i].value === "right") {
               toppingsArrayPreview[8] = 1;
            } else {
               toppingsArrayPreview[8] = 2;
            }
         } else if(onion[i].checked && onion[i].value === "none") {
            toppingsArrayPreview[8] = 3;
         }
      }

      // Tomatoes
      var tomato = document.getElementsByName("tomato");
      for (let i = 0; i < tomato.length; i++) {
         if (tomato[i].checked && tomato[i].value != "none") {
            pizzaSummary2 += ", tomato" + "(" + tomato[i].value + ")";

            if (tomato[i].value === "left") {
               toppingsArrayPreview[9] = 0;
            } else if (tomato[i].value === "right") {
               toppingsArrayPreview[9] = 1;
            } else {
               toppingsArrayPreview[9] = 2;
            }
         } else if(tomato[i].checked && tomato[i].value === "none") {
            toppingsArrayPreview[9] = 3;
         }
      }

      // Jalapenos
      var jalapeno = document.getElementsByName("jalapeno");
      for (let i = 0; i < jalapeno.length; i++) {
         if (jalapeno[i].checked && jalapeno[i].value != "none") {
            pizzaSummary2 += ", jalapeno" + "(" + jalapeno[i].value + ")";

            if (jalapeno[i].value === "left") {
               toppingsArrayPreview[10] = 0;
            } else if (jalapeno[i].value === "right") {
               toppingsArrayPreview[10] = 1;
            } else {
               toppingsArrayPreview[10] = 2;
            }
         } else if(jalapeno[i].checked && jalapeno[i].value === "none") {
            toppingsArrayPreview[10] = 3;
         }
      }
      combinePizzaItems(pizzaSummary1, pizzaSummary2);
      addImageToPreview();
   });

   function addImageToPreview() {
      // Delete all child of preview box and rebuild images on top of it
      while (pizzaPreviewBox.firstChild) {
         pizzaPreviewBox.removeChild(pizzaPreviewBox.firstChild);
     }

      for (let i = 0; i < toppingsArrayPreview.length; i++) {
         if (i === 0 && toppingsArrayPreview[i] === true) {
            var toppingToAddPic = document.createElement("img");
            toppingToAddPic.setAttribute("src", "rb_doublesauce.png");
            pizzaPreviewBox.appendChild(toppingToAddPic);
         } else if (i === 1 && toppingsArrayPreview[i] === true) {
            var toppingToAddPic = document.createElement("img");
            toppingToAddPic.setAttribute("src", "rb_doublecheese.png");
            pizzaPreviewBox.appendChild(toppingToAddPic);
         } else if (i === 2) {
            if(toppingsArrayPreview[i] === 0) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_pepperoni.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if (toppingsArrayPreview[i] === 1) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_pepperoni.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(130px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if (toppingsArrayPreview[i] === 2) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_pepperoni.png");
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else {}
         } else if (i === 3) {
            if(toppingsArrayPreview[i] === 0) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_ham.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 1) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_ham.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(130px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 2) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_ham.png");
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else {}
         } else if (i === 4) {
            if(toppingsArrayPreview[i] === 0) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_sausage.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(10px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if (toppingsArrayPreview[i] === 1) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_sausage.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(120px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if (toppingsArrayPreview[i] === 2) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_sausage.png");
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else {}
         } else if (i === 5) {
            if(toppingsArrayPreview[i] === 0) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_chicken.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(20px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 1) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_chicken.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(130px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 2) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_chicken.png");
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else {}
         } else if(i === 6) {
            if(toppingsArrayPreview[i] === 0) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_mushroom.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(20px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 1) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_mushroom.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(120px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 2) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_mushroom.png");
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else {}
         } else if(i === 7) {
            if(toppingsArrayPreview[i] === 0) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_greenpepper.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(20px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if (toppingsArrayPreview[i] === 1) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_greenpepper.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(125px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 2) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_greenpepper.png");
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else {}
         } else if (i === 8) {
            if(toppingsArrayPreview[i] === 0) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_onion.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(25px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if (toppingsArrayPreview[i] === 1) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_onion.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(130px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 2) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_onion.png");
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else {}
         } else if(i === 9) {
            if(toppingsArrayPreview[i] === 0) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_tomato.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(20px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 1) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_tomato.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(115px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 2) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_tomato.png");
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else {}
         } else {
            if(toppingsArrayPreview[i] === 0) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_jalapeno.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(25px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 1) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_jalapeno.png");
               toppingToAddPic.style.width = '170px';
               toppingToAddPic.style.height = '300px';
               toppingToAddPic.style.transform = "translate(120px)";
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else if(toppingsArrayPreview[i] === 2) {
               var toppingToAddPic = document.createElement("img");
               toppingToAddPic.setAttribute("src", "rb_jalapeno.png");
               pizzaPreviewBox.appendChild(toppingToAddPic);
            } else {}
         }
      }
   }

   /**
    * Combines the pizza summary from options menu and toppings menu to make
    * a single summary
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
      deletePizzaItem.setAttribute("id", rowId);
      arr.push(rowId);
      rowId++;
      deletePizzaItem.addEventListener("click", function (e) {
         deleteRowFromTableAndUpdatePrice(e.target.id);
      });
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

      // Update arrPrice with the cost of each pizza
      if (arrPrice.length === 0) {
         arrPrice.push(cartTotalPrice);
      } else {
         arrPrice.push(cartTotalPrice - arrPrice.reduce(getSum));
      }
      cartTotal.value = "$" + cartTotalPrice;
   }

   function deleteRowFromTableAndUpdatePrice(itemId) {
      // Keeps track of what item to delete based on an array of the button IDs
      var indexOfElement = arr.indexOf(parseFloat(itemId));

      arr.splice(indexOfElement, 1);
      cartTotalPrice -= arrPrice[indexOfElement];
      cartTotal.value = "$" + cartTotalPrice;
      arrPrice.splice(indexOfElement, 1);

      cartTable.deleteRow(parseFloat(indexOfElement) + 1);
   }

   // Gets total sum of array
   function getSum(total, num) {
      return total + num;
   }
}
