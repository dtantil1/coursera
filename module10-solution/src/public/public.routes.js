(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.signup', {
      url: '/',
      templateUrl: 'src/public/home/signup.html'
    })
    .state('public.myinfo', {
      url: '/',
      templateUrl: 'src/public/home/myinfo.html'
    })


    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html'
    });
}
})();
