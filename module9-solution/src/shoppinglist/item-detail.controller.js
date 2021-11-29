(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);

// Version with resolving to 1 item based on $stateParams in route config
ItemDetailController.$inject = ['$stateParams', 'items', '$scope', 'ShoppingListService', '$http'];
function ItemDetailController($stateParams, items, $scope, ShoppingListService, $http) {
  var categories = this;
  console.log($stateParams.itemId)

  let cat = $stateParams.itemId
  $http.get("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + cat)
    .then(function(response){
      console.log("Categories Data")
      console.log(response.data.menu_items);
      $scope.stuff = response.data

    })


}

})();
