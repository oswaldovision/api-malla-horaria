var module = angular.module('app')

var controller = function ($scope,$location, sellersService, moment, calendarConfig, $window, $ocLazyLoad, Session, storesService) {
  //These variables MUST be set as a minimum for the calendar to work
  var self = this
  $scope.authenticated = false;
  $scope.fiterValues = {
    stores : '',
    seller :''
  };
  $scope.calendarView = 'month';
  $scope.viewDate = new Date();

  var originali18n = angular.copy(calendarConfig.i18nStrings);
  calendarConfig.i18nStrings.weekNumber = 'Semana {week}';

  calendarConfig.dateFormatter = 'moment';
  $window.moment = $window.moment || moment;
  $ocLazyLoad.load('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/locale/es.js').then(function() {
    moment.locale('es', {
      week: {
        dow: 1 // Monday is the first day of the week
      }
    });
    moment.locale('es'); // change the locale to french
  });


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
    Session.clickedSeller = event.title.split('(')[0].trim();
    $location.path('/asignements')
    // alert.show('Clicked', event)
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
    return Session.user;
  },function () {
    $scope.currentUser = Session.user;
    $scope.authenticated = $scope.currentUser.isAuthenticated;
    $scope.roles = Session.user.isAuthenticated ? getRoles(Session.user.profile.roles) : [];
    if (Session.user.isAuthenticated && $scope.hasRole('Admin_App')){
      getAllStores();
    }else if (Session.user.isAuthenticated){
      $scope.stores = getStoresInProfile(Session.user.profile.roles)
    }

  },true)

  $scope.$watch(function () {
    return sellersService.getSellectedSeller();
  }, function () {
    $scope.fiterValues.seller = sellersService.getSellectedSeller();
    filterProjection($scope.fiterValues.seller);
  }, true)

  $scope.hasRole = function (role) {
    return $scope.roles.indexOf(role) != -1;
  }

  $scope.switchStore = function (store) {
    $scope.fiterValues.stores = store;
    filterProjection();
  }

  $scope.clean = function () {
    cleanFilter();
  }

  $scope.changeMonth = function () {
    getSellers();
  }

  var getSellers = function () {

    $scope.fiterValues.seller = '';
    $scope.fiterValues.stores = '';
    $scope.$broadcast('angucomplete-alt:clearInput');
    sellersService.setSellectedSeller('');

    if (Session.user.isAuthenticated){
      sellersService.getSellersProjection($scope.viewDate.getMonth() + 1).then(function (allSellers) {
        $scope.allSellers = $scope.hasRole('Admin_App') ? allSellers.recordset : filterAssignementsByRol(allSellers.recordset);
        $scope.events = settingProjectionSellers($scope.allSellers)
      })
    }
  }

  var settingProjectionSellers = function (setSellers) {
    return setSellers.map(function (seller) {
      return {
        title: seller.SellerName + ' (' + seller.Store + ')' ,
        color: setColorState(seller.State),
        startsAt: moment(seller.DateShift).toDate(),
        resizable: true
      }
    })
  }

  var filterProjection = function() {
    var setFiltered = $scope.allSellers ? $scope.allSellers : [];

    if ($scope.fiterValues.stores){
      if ($scope.fiterValues.stores !== 'Todas'){
        setFiltered = setFiltered.filter(function (item) {
          return item.Store == $scope.fiterValues.stores;
        })
      }
    }

    if ($scope.fiterValues.seller){
      setFiltered = setFiltered.filter(function (item) {
        return item.SellerName == $scope.fiterValues.seller;
      })
    }
     $scope.events = settingProjectionSellers(setFiltered);
  }

  var cleanFilter = function () {
    $scope.fiterValues.seller = '';
    $scope.fiterValues.stores = '';
    sellersService.setSellectedSeller('');
    $scope.$broadcast('angucomplete-alt:clearInput');
    $scope.events = settingProjectionSellers($scope.allSellers);
  }

  var setColorState = function (state) {
    switch (state) {
      case "Vacaciones":
        return calendarConfig.colorTypes.warning
        break;
      // case "Calamidad":
      //   return calendarConfig.colorTypes.special
      //   break;
      // case "Incapacidad":
      //   return calendarConfig.colorTypes.important
      //   break;
      default:
        return calendarConfig.colorTypes.success
    }
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
}

module.component('schedule', {
  templateUrl: '../templates/schedule.html',
  controller: ['$scope', '$location', 'sellersService', 'moment', 'calendarConfig', '$window', '$ocLazyLoad','Session','storesService',controller]
})