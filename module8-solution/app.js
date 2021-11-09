(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('menuListDirective', MenuListDirective);


function MenuListDirective




NarrowItDownController.$inject = ['MenuCategoriesService','$scope'];
function NarrowItDownController(MenuCategoriesService, $scope) {
  var menu = this;
  menu.searchTerm = "chicken";
  let searchTerm = menu.searchTerm;
  var promise = MenuCategoriesService.getMenuCategories();

  $scope.term = "";
  console.log("SCOPE: " + $scope.term);

  $scope.findIt = function(term){
    searchTerm = $scope.term;
  promise.then(function (response) {
    menu.categories = response.data;
    let items = menu.categories;
    let foundItems = [];
    for(let i = 0; i < items.menu_items.length; i++){
      let text = items.menu_items[i].description;
      if(text.includes(searchTerm)){
        foundItems.push(items.menu_items[i])
        
      }
    }
    console.log(foundItems)
    menu.foundItems = foundItems;
    
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
}
  $scope.onRemove = function(index){
    console.log("REMOVE Index:" + index)
  };

  



}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };

}

})();