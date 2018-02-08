var module = angular.module('app')

module.service('sellersService', service);

function service ($http) {
  this.getAsignements = function () {
    var req = {
      method: 'GET',
      url: '/workshift/sellers'
    }
    return $http(req).then(function (data) {
      return data.data
    }).catch(function (err) {
      return err
    })
  }
  
  this.getSellersProjection = function () {
    var req = {
      method: 'GET',
      url: '/WorkShift/sellersProjection'
    }
    return $http(req).then(function (data) {
      return data.data
    }).catch(function (err) {
      return err
    })
  }
}

service.$inject = ['$http'];
