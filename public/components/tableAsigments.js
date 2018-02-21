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
    $scope.roles = Session.user.isAuthenticated ? getRoles(Session.user.profile.roles) : [];
    $scope.stores = Session.user.isAuthenticated ? getStores(Session.user.profile.roles) : [];
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
      $scope.asignements = $scope.hasRole('Admin_App') ? allAsignements.recordset : filterAssignementsByRol(allAsignements.recordset);;
      $scope.tableParams = new NgTableParams({}, {dataset: $scope.asignements});
    })
  }

  $scope.loadAsignements = function () {
    $scope.start = new Date();
    $scope.end = new Date();
    AsignementService.getAsignements().then(function (allAsignements) {
      $scope.asignements = $scope.hasRole('Admin_App') ? allAsignements.recordset : filterAssignementsByRol(allAsignements.recordset);
      $scope.tableParams = new NgTableParams({}, {dataset: []});
    })
  }

  $scope.hasRole = function (role) {
    return $scope.roles.indexOf(role) != -1;
  }

  var formatLessNine = function(num) {
    return num.toString().length < 2 ? ('0' + num) : num
  }

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

  var filterAssignementsByRol = function (assignements) {
    var result = [];
    $scope.stores.forEach(function (store) {
      result = result.concat(assignements.filter(function (ele) {
        return ele.Store == store;
      }))
    })
    return result;
  }
}

module.component('tableAsigments', {
  templateUrl: '../templates/tableAsigments.html',
  controller: ['$scope', 'NgTableParams', 'AsignementService','Session', controller]
})