(function () {
'use strict';



angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('customDollar',customDollarFilter);


function customDollarFilter(){
	return function(cost){
		cost = "$$$" + cost;
		return cost; 
	}

}


function ShoppingListCheckOffService(){
	let service = this;

	let toBuyList = [
		{ name : "Chickens", quantity : 3, pricePerItem : 5},
		{ name : "Cookies", quantity : 8, pricePerItem : 3},
		{ name : "Meats", quantity : 4, pricePerItem : 9},
		{ name : "Pepto Bismols", quantity : 1, pricePerItem : 15},
		{ name : "Olive Oils", quantity : 2, pricePerItem : 5.23}
	]

	let boughtList = [];


  	service.getBuyItems = function () {
    	return toBuyList;
  	};

    service.getBoughtItems = function () {
    	return boughtList;
  	};

  	service.buy = function (itemIndex) {
  		console.log(toBuyList[itemIndex])
  		boughtList.push(toBuyList[itemIndex])
    	toBuyList.splice(itemIndex, 1);
  	};



  	console.log(boughtList.length);

};


// ToBuyController #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	let showList = this;
	showList.items = ShoppingListCheckOffService.getBuyItems();

	showList.buy = function (itemIndex){
		ShoppingListCheckOffService.buy(itemIndex);
	}

};

// AlreadyBought Controller #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	let showList = this;
	showList.items = ShoppingListCheckOffService.getBoughtItems();

};



	



})();
