var module = angular.module('app');

var controller = function ($scope, NgTableParams, AsignementService, Session, storesService) {
  var self = this;

  self.$onInit = function () {
    $scope.loadAsignements();
  }

  $scope.$watch(function () {
    return Session.user;
  }, function () {
    $scope.currentUser = Session.user;
    $scope.authenticated = $scope.currentUser.isAuthenticated;
    $scope.roles = Session.user.isAuthenticated ? getRoles(Session.user.profile.roles) : [];
  }, true)

  $scope.loadAsignements = function () {
    AsignementService.getDetailHour(4).then(function (allAsignements) {
      $scope.asignements = allAsignements.recordset //$scope.hasRole('Admin_App') ? allAsignements.recordset : filterAssignementsByRol(allAsignements.recordset);

      // if (Session.clickedSeller){
      //   $scope.asignements = $scope.asignements.filter(function (seller) {
      //     return seller.SellerName == Session.clickedSeller;
      //   });
      //   Session.clickedSeller = '';
      // }

      $scope.tableParams = new NgTableParams({
        group: "nDay",//{ "nDay" : "asc" },
        count : 7
      }, {
        counts: [7,14,21,31],
        dataset: $scope.asignements,
        groupOptions: {
          isExpanded: false,

        }
      });
    })
  }

  $scope.hasRole = function (role) {
    return $scope.roles.indexOf(role) != -1;
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

  var getRoles = function (roles) {
    return roles.map(function(rol){
      return rol.Rol;
    });
  }
}

module.component('hourtable', {
  templateUrl: '../templates/hourTable.html',
  controller: ['$scope', 'NgTableParams', 'AsignementService','Session','storesService' , controller]
})