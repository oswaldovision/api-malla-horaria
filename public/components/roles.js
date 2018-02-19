var module = angular.module('app')

var controller = function ($scope, AuthService, Session, NgTableParams, $location, rolesService, storesService) {
  $scope.stores = [];
  $scope.selectedStore = angular.copy($scope.stores[0]);
  $scope.store = {}

  $scope.rol = {
    name: '',
    description: ''
  }

  $scope.isVisible = false;
  $scope.showHide = function () {
    $scope.isVisible = $scope.showStores;
  }

  this.$onInit = function () {
    getRoles();
    getStores();
  }

  $scope.addRol = function (rol) {
    let idStore = $scope.selectedStore ? $scope.selectedStore.id_store : 0;
    rolesService.addRol(rol.name,rol.description, idStore,Session.user.profile.userPrincipalName).then(function (result) {
      if (result.data.returnValue == 1){
        getRoles();
      }
    })
  }

  var getRoles = function () {
    rolesService.getRoles(Session.user.profile.userPrincipalName).then(function (allRoles) {
      $scope.roles = new NgTableParams({}, {dataset: allRoles.recordset})
    })
  }

  var getStores = function () {
    storesService.getStores(Session.user.profile.userPrincipalName).then(function (allStores) {
      $scope.stores = allStores.recordset;
    })
  }
}

module.component('roles', {
  templateUrl: './../templates/roles.html',
  controller: ['$scope', 'AuthService', 'Session', 'NgTableParams','$location','rolesService', 'storesService', controller]
})