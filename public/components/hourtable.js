var module = angular.module('app');

var controller = function ($scope, NgTableParams, AsignementService, Session, storesService) {
  var self = this;
  $scope.authenticated = false;

  $scope.months = [{
    text: "Enero",
    id: 1
    },
    {
      text: "Febrero",
      id: 2
    },
    {
      text: "Marzo",
      id: 3
    },
    {
      text: "Abril",
      id: 4
    },
    {
      text: "Mayo",
      id: 5
    },
    {
      text: "Junio",
      id: 6
    },
    {
      text: "Julio",
      id: 7
    },
    {
      text: "Agosto",
      id: 8
    },
    {
      text: "Septiembre",
      id: 10
    },
    {
      text: "Noviembre",
      id: 11
    },
    {
      text: "Diciembre",
      id: 12
    }]

  self.$onInit = function () {
    $scope.loadAsignements();
  }

  $scope.$watch(function () {
    return Session.user;
  }, function () {
    $scope.currentUser = Session.user;
    $scope.authenticated = $scope.currentUser.isAuthenticated;
    $scope.roles = Session.user.isAuthenticated ? getRoles(Session.user.profile.roles) : [];
    if (Session.user.isAuthenticated && $scope.hasRole('Admin_App')){
      getAllStores();
    }else if (Session.user.isAuthenticated){
      $scope.stores = getStoresInProfile(Session.user.profile.roles)
    }
  }, true)

  $scope.loadAsignements = function () {
    var d = new Date();
    AsignementService.getDetailHour(d.getMonth() + 1).then(function (allAsignements) {
      $scope.asignements = allAsignements.recordset
      settingTable($scope.asignements);
    })
  }

  $scope.hasRole = function (role) {
    return $scope.roles.indexOf(role) != -1;
  }

  $scope.switchMonth =  function(month){
    AsignementService.getDetailHour(month).then(function (allAsignements) {
      $scope.asignements = allAsignements.recordset
      settingTable($scope.asignements);
    })
  }

  $scope.switchStore = function (store) {
    if (store == 'todas'){
      settingTable($scope.asignements);
    }else {
      settingTable($scope.asignements.filter(function (e) {
        return e.Store == store;
      }));
    }
  }

  var settingTable =function (setData) {
    $scope.tableParams = new NgTableParams({
      group: "nDay",
      count : 7
    }, {
      counts: [7,14,21,31],
      dataset: setData,
      groupOptions: {
        isExpanded: false
      }
    });
  }

  var getStoresInProfile = function (stores) {
    return stores.map(function(store){
      return store.Store;
    })
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

  var getAllStores = function () {
    storesService.getStores($scope.currentUser.profile.userPrincipalName).then(function(data){
      $scope.stores = data.recordset.map(function(store){
        return store.name;
      });
    })
  }
}

module.component('hourtable', {
  templateUrl: '../templates/hourTable.html',
  controller: ['$scope', 'NgTableParams', 'AsignementService','Session','storesService' , controller]
})