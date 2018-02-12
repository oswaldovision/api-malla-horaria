var module = angular.module('app')

var controller = function ($scope, AuthService, Session, NgTableParams, $location, rolesService) {
  $scope.rol = {
    name: '',
    description: ''
  }

  this.$onInit = function () {
    getRoles();
  }

  $scope.addRol = function (rol) {
    rolesService.addRol(rol.name,rol.description, Session.user.profile.mail).then(function (result) {
      if (result.data.returnValue == 1){
        getRoles();
        $scope.$apply();
      }
    })
  }

  var getRoles = function () {
    rolesService.getRoles(Session.user.profile.mail).then(function (allRoles) {
      $scope.roles = new NgTableParams({}, {dataset: allRoles.recordset})
    })
  }

}



module.component('roles', {
  templateUrl: './../templates/roles.html',
  controller: ['$scope', 'AuthService', 'Session', 'NgTableParams','$location','rolesService', controller]
})