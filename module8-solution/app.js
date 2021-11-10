(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

let x = -1;

function FoundItems(){
  var ddo = {
    templateUrl: "menu.html",
    link: foundLink
  };

  return ddo;
}

function foundLink(scope, element, attrs, controller){
  scope.$watch('menu.foundItems', function(){
    console.log("x= " + x)
    if(x === 0){
      displayNothingFound();
    }
    else
      hideNothingFound();
  });

  function displayNothingFound(){
    //using Angular Jqlite
    let emptyElement = element.find("h4");
    emptyElement.css('display','block');
  }
  function hideNothingFound(){
    let emptyElement = element.find("h4");
    emptyElement.css('display','none');
  }
};




NarrowItDownController.$inject = ['MenuCategoriesService','$scope'];
function NarrowItDownController(MenuCategoriesService, $scope) {
  var menu = this;
  
  let searchTerm = menu.searchTerm;
  var promise = MenuCategoriesService.getMenuCategories();
  
  $scope.term = "";
  

  $scope.findIt = function(term){
    searchTerm = $scope.term;
    promise.then(function (response) {
      menu.categories = response.data;
      let items = menu.categories;
      let foundItems = [];
      if(searchTerm.length === 0)
        searchTerm = undefined;
      for(let i = 0; i < items.menu_items.length; i++){
        let text = items.menu_items[i].description;
        if(text.includes(searchTerm)){
          foundItems.push(items.menu_items[i])
        }
      }
      console.log("searchTerm = " + searchTerm)
      menu.foundItems = foundItems;
      x = foundItems.length;
    })
    .catch(function (error) {
    console.log("Something went terribly wrong.");
    });
  }
  $scope.onRemove = function(index){
    menu.foundItems.splice(index,1);
    


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