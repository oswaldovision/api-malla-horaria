var module = angular.module('app')

var controller = function ($scope, AuthService, Session, NgTableParams, $location) {
  $scope.rolesUser = []
  $scope.isAdminApp = false;
  $scope.rol = {
    name : '',
    description : ''
  }

  $scope.$watch(function () {
    return Session.user
  }, function () {
    $scope.rolesUser = Session.user ? Session.user.roles : []
    $scope.isAdminApp = Session.hasRoleAdmin('Admin_App')
    if ($scope.isAdminApp){
        AuthService.getRoles().then(function (data) {
          $scope.roles = new NgTableParams({}, {dataset: data.data})
        })
    }
  }, true)

  $scope.addRol = function (rol) {
    AuthService.addRol(rol.name,rol.description).then(function (result) {
      if (result.data.returnValue == 1){
        $scope.roles.reload();
      }

    })
  }
}

module.component('roles', {
  templateUrl: './../templates/roles.html',
  controller: ['$scope', 'AuthService', 'Session', 'NgTableParams','$location', controller]
})