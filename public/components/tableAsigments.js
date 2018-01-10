var module = angular.module('app')

var controller = function ($scope,$http, NgTableParams, AsignementService, Session) {
  var self = this;
  $scope.asignements = [];
  $scope.authenticated = false;

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
    AsignementService.getAsignements($http).then(function (allAsignements) {
      $scope.asignements = allAsignements.recordset;
      $scope.tableParams = new NgTableParams({}, {dataset: []});
      var today = new Date();
      var dd = formatLessNine(today.getDate());
      var mm = formatLessNine(today.getMonth()+1); //January is 0!
      var yyyy = today.getFullYear();
      $('input[type="date"]').val(mm + '-' + dd + '-' + yyyy);
    })
  }

  var formatLessNine = function(num) {
    return num.toString().length < 2 ? ('0' + num) : num
  }
}

module.component('tableAsigments', {
  templateUrl: '../templates/tableAsigments.html',
  controller: ['$scope','$http', 'NgTableParams', 'AsignementService','Session', controller]
})