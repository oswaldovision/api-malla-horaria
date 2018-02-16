var module = angular.module('app')

var controller = function ($scope, Session, NgTableParams, storesService) {
  $scope.store = {
    name: '',
    phone: '',
    address : '',
    state : 0
  }

  this.$onInit = function () {
    getStores();
  }

  $scope.addStore = function (store) {
    storesService.addStore(store.name,store.phone,store.address, Session.user.profile.userPrincipalName).then(function (result) {
      if (result.data.returnValue == 1){
        getStores();
      }
    })
  }

  var getStores = function () {
    storesService.getStores(Session.user.profile.userPrincipalName).then(function (allStores) {
      $scope.stores = new NgTableParams({}, {dataset: allStores.recordset})
    })
  }

}

module.component('stores', {
  templateUrl: './../templates/stores.html',
  controller: ['$scope', 'Session', 'NgTableParams','storesService', controller]
})