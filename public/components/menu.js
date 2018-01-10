var module = angular.module('app');

var controller = function ($scope, Session) {
  $scope.roles = [];
  $scope.isAdminApp = false;

  $scope.$watch(function () {
    return Session.user;
  }, function () {
    $scope.currentUser = Session.user;
    $scope.authenticated = $scope.currentUser.isAuthenticated;
    // $scope.roles = Session.user ? Session.user.roles : [];
    // $scope.isAdminApp = Session.hasRoleAdmin('Admin_App');
  }, true)
}

module.component('menuComponent', {
  templateUrl : '../templates/menu.html',
  controller : ['$scope', 'Session', controller]
})