var module = angular.module('app')

var controller = function ($http, NgTableParams, AsignementService) {
  var self = this
  self.asignements = []

  self.$onInit = function () {
    AsignementService.getAsignements($http).then(function (allAsignements) {
      self.asignements = allAsignements.recordset
    })
  }

  self.switchStore = function (store) {
    if (store == 'todas'){
      self.tableParams = new NgTableParams({}, {dataset: self.asignements});
    }else {
      self.tableParams = new NgTableParams({}, {
        dataset: self.asignements.filter(function (item) {
          return item.Store == store;
        })
      })
    }
  }

}

module.component('tableAsigments', {
  templateUrl: '../templates/tableAsigments.html',
  controllerAs: 'self',
  controller: ['$http', 'NgTableParams', 'AsignementService', controller]
})