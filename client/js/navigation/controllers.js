'use strict';

angular
.module('app')
.controller('NavigationCtrl', ['$scope', '$state', '$modal', 'User', function($scope,
  $state, $modal, User) {
    $scope.user = '';
    $scope.loggedInUser = '';
    $scope.isAuthenticated = User.isAuthenticated();
    $scope.showError = false;

    if ($scope.isAuthenticated) {
      User.getCurrent().$promise.then(function(user) {
        $scope.loggedInUser = user;
      })
    }

    $scope.login = function(user) {
      User
      .login({rememberMe: true}, user, function(result) {
        $scope.isAuthenticated = User.isAuthenticated();
        $scope.loggedInUser = result.user;
        $state.reload();

      }, function (err) {
        $scope.isAuthenticated = User.isAuthenticated();
        $scope.showError = true;
        $scope.message = "Login failed. Did you use the right username and password?";
      });
    };

    $scope.logout = function() {
      User
      .logout()
      .$promise
      .then(function(result) {
        $scope.isAuthenticated = User.isAuthenticated();
        $state.reload();
      });
    };

    $scope.hideError = function() {
      $scope.showError = false;
    };

    $scope.register = function(user) {
      User
      .create(user, function(result) {
        $scope.showError = true;
        $scope.message = "Your account has been successfully created!";
      }, function(err) {
        $scope.isAuthenticated = User.isAuthenticated();
        $scope.showError = true;
        $scope.message = "The email has already been used to register another account";
      });
    };

}]);
