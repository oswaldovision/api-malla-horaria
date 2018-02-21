var module = angular.module('app');

var controller = function ($scope, Session) {
  $scope.roles = [];
  $scope.stores = [];
  $scope.$watch(function () {
    return Session.user;
  }, function () {
    $scope.currentUser = Session.user;
    $scope.roles = Session.user.isAuthenticated ? getRoles(Session.user.profile.roles) : [];
    $scope.stores = Session.user.isAuthenticated ? getStores(Session.user.profile.roles) : [];
  }, true)

  var getRoles = function (roles) {
    return roles.map(function(rol){
      return rol.Rol;
    });
  }

  var getStores = function (stores) {
    return stores.map(function(store){
      return store.Store;
    });
  }

  $scope.hasRole = function (role) {
    return $scope.roles.indexOf(role) != -1;
  }

  $scope.hasStore = function () {
    return $scope.stores.length;
  }
}

module.component('menuComponent', {
  templateUrl : '../templates/menu.html',
  controller : ['$scope', 'Session', controller]
})