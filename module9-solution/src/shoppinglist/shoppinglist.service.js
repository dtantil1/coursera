(function () {
'use strict';

angular.module('ShoppingList')
.service('ShoppingListService', ShoppingListService);


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
