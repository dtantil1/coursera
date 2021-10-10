(function () {

angular.module('LunchCheck',['ngSanitize'])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope, ngSanitize){

	$scope.message = "<span class='red-message'>Please enter data first</span>";
	$scope.list = "";

	$scope.CheckList = function(list){
		
		let words = $scope.list.split(",");
		/*
		  below code was referenced from: 
		  https://stackoverflow.com/questions/35476948/
		  remove-empty-or-whitespace-strings-from-array-javascript
		  words = words.filter(entry => entry.trim() != '');
		*/
		words = words.filter(entry => entry.trim() != '');
		console.log(words.length);
		console.log(words);

		if (words[0] === "" || words.length === 0){
			$scope.message = "<span class='red-message'>Please enter data first</span>";

		}

		else if (words.length <= 3)
			$scope.message = "<span class='green-message'>Enjoy!</span>";
		else
			$scope.message = "<span class='green-message'>Too much!</span>";

	};
};



})();