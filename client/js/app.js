'use strict';

angular
.module('app', [
'lbServices',
'ui.router',
'ui.bootstrap',
'ui.gravatar'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
  $urlRouterProvider) {
    $stateProvider
    .state('welcome', {
      url: '/',
      templateUrl: 'js/welcome/templates/welcome.html',
      controller: 'WelcomeCtrl'
    })
    .state('instruments', {
      url: '/instruments/:id',
      templateUrl: 'js/instrument/templates/instruments.html',
      controller: 'InstrumentsCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'js/user/templates/profile.html',
      controller: 'ProfileCtrl'
    });
    $urlRouterProvider.otherwise('home');
  }]);

angular.module('ui.gravatar').config([
  'gravatarServiceProvider', function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size     : 100,
      "default": 'identicon'  // Mystery man as default for missing avatars
    };
  }
  ]);
