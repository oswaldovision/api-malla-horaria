var module = angular.module('app')

var controller = function ($scope,$http, NgTableParams, AsignementService, Session) {
  var self = this;
  $scope.asignements = [];
  $scope.authenticated = false;

  self.$onInit = function () {
    AsignementService.getAsignements($http).then(function (allAsignements) {
      $scope.asignements = allAsignements.recordset
    })
  }

  $scope.$watch(function () {
    return Session.user;
  }, function () {
    $scope.currentUser = Session.user;
    $scope.authenticated = $scope.currentUser.isAuthenticated;
  }, true)

  $scope.switchStore = function (store) {
    if (store == 'todas'){
      $scope.tableParams = new NgTableParams({}, {dataset: $scope.asignements});
    }else {
      $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.asignements.filter(function (item) {
          return item.Store == store;
        })
      })
    }
  }
}

module.component('tableAsigments', {
  templateUrl: '../templates/tableAsigments.html',
  controller: ['$scope','$http', 'NgTableParams', 'AsignementService','Session', controller]
})