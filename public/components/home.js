var module = angular.module('app')

var controller = function ($scope,Session) {
  $scope.currentUser = {};
  $scope.authenticated = false;

  $scope.$watch(function () {
    return Session.user;
  }, function () {
    $scope.currentUser = Session.user;
    $scope.authenticated = $scope.currentUser.isAuthenticated;
  }, true)
}


module.component('home', {
  templateUrl : './../templates/home.html',
  controller : ['$scope','Session',controller]
})