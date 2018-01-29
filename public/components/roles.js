var module = angular.module('app')

var controller = function ($scope, AuthService, Session, NgTableParams, $location, rolesService) {
  $scope.$watch(function () {
    return Session.user
  }, function () {
    if ($scope.isAdminApp){
        AuthService.getRoles().then(function (data) {
          $scope.roles = new NgTableParams({}, {dataset: data.data})
        })
    }
  }, true)

  this.$onInit = function () {
    // rolesService.getRoles().then(function (allRoles) {
    //   $scope.isAdminApp = true;
    //   $scope.roles = new NgTableParams({}, {dataset: allRoles.recordset})
    // })
  }

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
  controller: ['$scope', 'AuthService', 'Session', 'NgTableParams','$location','rolesService', controller]
})