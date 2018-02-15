var module = angular.module('app')

var controller = function ($scope, NgTableParams, AsignementService, Session) {
  var self = this;
  $scope.asignements = [];
  $scope.authenticated = false;
  $scope.start = new Date();
  $scope.end = new Date();

  self.$onInit = function () {
    $scope.loadAsignements();
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

  $scope.range = function (start, end) {
    var dateStart = start.getFullYear() + '-' + formatLessNine(start.getMonth() + 1) + '-' + formatLessNine(start.getDate());
    var dateEnd = end.getFullYear() + '-' + formatLessNine(end.getMonth() + 1) + '-' + formatLessNine(end.getDate());

    AsignementService.getAsignementsRange(dateStart, dateEnd).then(function (allAsignements) {
      $scope.asignements = allAsignements.recordset;
      $scope.tableParams = new NgTableParams({}, {dataset: $scope.asignements});
    })
  }

  $scope.loadAsignements = function () {
    $scope.start = new Date();
    $scope.end = new Date();
    AsignementService.getAsignements().then(function (allAsignements) {
      $scope.asignements = allAsignements.recordset;
      $scope.tableParams = new NgTableParams({}, {dataset: []});
    })
  }

  var formatLessNine = function(num) {
    return num.toString().length < 2 ? ('0' + num) : num
  }
}

module.component('tableAsigments', {
  templateUrl: '../templates/tableAsigments.html',
  controller: ['$scope', 'NgTableParams', 'AsignementService','Session', controller]
})