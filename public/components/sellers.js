var module = angular.module('app')

var controller = function ($scope,sellersService) {
  var self = this;
  $scope.sellers = [];
  $scope.selectedSeller = function (seller) {
    $scope.name = seller ? seller.originalObject.SellerName : '';
    sellersService.setSellectedSeller($scope.name);
  };

  self.$onInit = function () {
    sellersService.getAsignements().then(function (allSellers) {
      $scope.sellers = allSellers.recordset;
    })
  }
}

module.component('sellers',{
  templateUrl : "../templates/sellers.html",
  controller : ['$scope', 'sellersService', controller]
})