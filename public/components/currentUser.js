var module = angular.module('app');

var controller = function($scope,$auth,$location, $rootScope) {

  $scope.isAuthenticate = function () {
    return  $auth.isAuthenticated();
  }

  $scope.logOut = function () {
    $rootScope.currentUser = '';
    $auth.logout();
    $location.path('login');
  }

  $scope.$watch(function () {
    return $rootScope.currentUser;
  }, function () {
    $scope.currentUser = $rootScope.currentUser
  },true)
}

module.component('currentUser', {
  templateUrl: "../templates/currentUser.html",
  controller : [ '$scope','$auth','$location','$rootScope', controller]
})