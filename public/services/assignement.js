var module = angular.module('app')

module.service('AsignementService', service)

function service ($http, cons) {
  this.getAsignements = function () {
    var req = {
      method: 'GET',
      url: '/test'
    }
    return $http(req).then(function (data) {
      return data.data
    }).catch(function (err) {
      return err
    })
  }
}

service.$inject = ['$http','cons'];




