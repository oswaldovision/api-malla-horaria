var module = angular.module('app');

var controller = function ($scope, Session) {
  $scope.roles = [];
  $scope.$watch(function () {
    return Session.user;
  }, function () {
    $scope.currentUser = Session.user;
    $scope.roles = Session.user.isAuthenticated ? getRoles(Session.user.profile.roles) : [];
  }, true)

  var getRoles = function (roles) {
    return roles.map(function(rol){
      return rol.Rol;
    });
  }

  $scope.hasRole = function (role) {
    return $scope.roles.indexOf(role) != -1;
  }
}

module.component('menuComponent', {
  templateUrl : '../templates/menu.html',
  controller : ['$scope', 'Session', controller]
})