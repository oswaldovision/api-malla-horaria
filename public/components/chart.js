var module = angular.module('app')

var chartController = function ($scope, $http) {
  $scope.stores = []
  $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  $scope.series = ['Series A', 'Series B']
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ]
  $scope.onClick = function (points, evt) {
    // console.log(points, evt)
    $http.get('/test').then( function (result) {
      $scope.stores = result.data.recordset
    }).catch(function (err) {
      $scope.stores = []
      console.log(err)
    })
  }
  $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}]
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  }
}

module.component('chartComp', {
  templateUrl: '../templates/chart.html',
  controller: ['$scope', '$http',chartController]
})