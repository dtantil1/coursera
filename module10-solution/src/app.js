(function () {
'use strict';



angular.module('restaurant')
.controller('RegistrationController', RegistrationController)
.controller('ItemDetailController', ItemDetailController)
.controller('MyInfoController', MyInfoController)
.service('ShoppingListService', ShoppingListService);

RegistrationController.$inject = ['$rootScope', '$http'];
function RegistrationController($rootScope, $http) {
  var reg = this;

  $rootScope.onBlurAction = function(){
    console.log("ON BLUR")
    $rootScope.boom = true
    let menu_item = reg.user.favorite
      $http.get("https://davids-restaurant.herokuapp.com/menu_items/" + menu_item+".json")
      .then(function(response){
        console.log("response.data.name = " + response.data.name)
        $rootScope.response = response
      })
    .catch(function (err) {
      $rootScope.response = undefined
    });
      

  }

  reg.submit = function () {
    reg.completed = true;
    $rootScope.fname = reg.user.fname
    $rootScope.lname = reg.user.lname
    $rootScope.email = reg.user.email 
    $rootScope.phone = reg.user.phone
    $rootScope.favorite = reg.user.favorite
    let menu_item = reg.user.favorite
    
    console.log("fname = " + $rootScope.fname)

    $http.get("https://davids-restaurant.herokuapp.com/menu_items/" + menu_item+".json")
    .then(function(response){
      console.log(response.data.name)
      $rootScope.response = response
    })



  };
  
}

MyInfoController.$inject = ['$rootScope', '$scope'];
function MyInfoController($rootScope){
  var reg = this;
  console.log("INSIDE MyInfoController")
  console.log("FNAME IS: " + $rootScope.fname)
  
}





// Version with resolving to 1 item based on $stateParams in route config
ItemDetailController.$inject = ['$stateParams', 'items', '$scope', 'ShoppingListService', '$http'];
function ItemDetailController($stateParams, items, $scope, ShoppingListService, $http,$rootScope) {
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



ShoppingListService.$inject = ['$http']
function ShoppingListService($http) {

    let service = this;
    let baseUrl = 'https://davids-restaurant.herokuapp.com/categories.json'

    //list of items
    let items = [];
    console.log("SERVICE ACTIVATED")

    service.getItems = function (){
        let response = $http({
            method: 'GET',
            url: baseUrl
        })
        let x = response;
        console.log(x)
        return response;

    }

    service.getCategory = function (shortName){
        console.log("getCategory firing")
        let response = $http({
            method: "GET",
            url:"https://davids-restaurant.herokuapp.com/menu_items.json",
            params:{
                category:shortName
            }
        });

        return response;

    }







}






})();