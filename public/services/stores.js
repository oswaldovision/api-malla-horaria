var module = angular.module('app')

module.service('storesService', service);

function service ($http, $location) {
  this.getStores= function (user) {
    var req = {
      method: 'GET',
      url: '/stores/' + user
    }
    return $http(req).then(function (data) {
      return data.data
    }).catch(function (err) {
      $location.path('/unauthorized');
      return err
    })
  }

  this.addStore = function (name, phone, address,user) {
    let config = {
      url : '/stores',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      method: "POST",
      data: { name, phone, address,user}
    }
    return $http(config).then(function (data) {
      return data;
    }).catch(function (err) {
      console.log('Ha fallado adicionando tienda '+ err.message)
    })

  }
}

service.$inject = ['$http', '$location'];
