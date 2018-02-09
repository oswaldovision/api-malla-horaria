var module = angular.module('app')

var controller = function ($scope, sellersService, moment, calendarConfig) {
  //These variables MUST be set as a minimum for the calendar to work
  var self = this
  $scope.fiterValues = {
    store : '',
    seller :''
  };
  $scope.calendarView = 'month'
  $scope.viewDate = new Date()
  var actions = [{
    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    onClick: function (args) {
      alert.show('Edited', args.calendarEvent)
    }
  }, {
    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
    onClick: function (args) {
      alert.show('Deleted', args.calendarEvent)
    }
  }]

  self.$onInit = function () {
    getSellers()
  }

  $scope.cellIsOpen = false

  $scope.addEvent = function () {
    $scope.events.push({
      title: 'New event',
      startsAt: moment().startOf('day').toDate(),
      endsAt: moment().endOf('day').toDate(),
      color: calendarConfig.colorTypes.important,
      draggable: true,
      resizable: true
    })
  }

  $scope.eventClicked = function (event) {
    alert.show('Clicked', event)
  }

  $scope.eventEdited = function (event) {
    alert.show('Edited', event)
  }

  $scope.eventDeleted = function (event) {
    alert.show('Deleted', event)
  }

  $scope.eventTimesChanged = function (event) {
    // alert.show('Dropped or resized', event);
  }

  $scope.toggle = function ($event, field, event) {
    $event.preventDefault()
    $event.stopPropagation()
    event[field] = !event[field]
  }

  $scope.timespanClicked = function (date, cell) {

    if ($scope.calendarView === 'month') {
      if (($scope.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
        $scope.cellIsOpen = false
      } else {
        $scope.cellIsOpen = true
        $scope.viewDate = date
      }
    } else if ($scope.calendarView === 'year') {
      if (($scope.cellIsOpen && moment(date).startOf('month').isSame(moment($scope.viewDate).startOf('month'))) || cell.events.length === 0) {
        $scope.cellIsOpen = false
      } else {
        $scope.cellIsOpen = true
        $scope.viewDate = date
      }
    }

  }

  $scope.$watch(function () {
    return sellersService.getSellectedSeller();
  }, function () {
    $scope.fiterValues.seller = sellersService.getSellectedSeller();
    filterSeller($scope.fiterValues.seller);
  }, true)

  $scope.switchStore = function (store) {
    if (store == 'Todas'){
      $scope.events = settingProjectionSellers($scope.allSellers);
      $scope.fiterValues.store = store + ' las tiendas';
    }else{
      var filter = $scope.allSellers.filter(function (item) {
        return item.Store == store;
      })
      $scope.fiterValues.store = store;
      $scope.events = settingProjectionSellers(filter);
    }
  }

  var getSellers = function () {
    sellersService.getSellersProjection().then(function (allSellers) {
      $scope.allSellers = allSellers.recordset;
      $scope.events = settingProjectionSellers($scope.allSellers)
    })
  }

  var settingProjectionSellers = function (setSellers) {
    return setSellers.map(function (seller) {
      return {
        title: seller.SellerName,
        color: calendarConfig.colorTypes.warning,
        startsAt: moment(seller.DateShift).toDate(),
        resizable: true
      }
    })
  }

  var filterSeller = function (sellerName) {
    var filter = $scope.allSellers.filter(function (item) {
      return item.Store == sellerName;
    })
  }
}

module.component('schedule', {
  templateUrl: '../templates/schedule.html',
  controller: ['$scope', 'sellersService', 'moment', 'calendarConfig',  controller]
})