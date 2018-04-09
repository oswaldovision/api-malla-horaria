var module = angular.module('app');

var controller = function ($scope,$location, sellersService, moment, calendarConfig, $window, $ocLazyLoad, Session, storesService, AsignementService,NgTableParams) {
  var self = this;

  $scope.authenticated = false;
  $scope.calendarView = 'month';
  $scope.viewDate = new Date();
  $scope.cellIsOpen = false;
  $scope.events = [];

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

  self.$onInit = function () {
    var d = new Date();
    var stringDate = ("0" + (d.getDate())).slice(-2) + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear();
    loadAsignement(stringDate,("0" + (d.getMonth() + 1)).slice(-2));
  }

  $scope.$watch(function () {
    return Session.user;
  },function () {
    $scope.currentUser = Session.user;
    $scope.authenticated = $scope.currentUser.isAuthenticated;
  },true)

  $scope.eventClicked = function (event) {
    Session.clickedSeller = event.title.split('(')[0].trim();
  }

  $scope.viewChangeClicked = function(date) {
    if (date === 'day') {
      return false;
    }
  }

  $scope.timespanClicked = function (date, cell) {
    var stringDate = ("0" + (cell.date.date())).slice(-2) + '-' + ("0" + (cell.date.month() + 1)).slice(-2) + '-' + cell.date.year();
    loadAsignement(stringDate,("0" + (cell.date.month() + 1)).slice(-2));
  }

  var loadAsignement = function (stringDay,month) {
    AsignementService.detailday(stringDay,month).then(function (data) {
      $scope.dataDay = data.recordset;
      $scope.titleDay = $scope.dataDay[0]["FriendlyDay"];
      $scope.tableParams = new NgTableParams({
        count : 8
      }, {
        counts: [],
        dataset: $scope.dataDay
      });
    })
  }
}

module.component('scheduleStaff', {
  templateUrl: '../templates/scheduleStaff.html',
  controller: ['$scope', '$location', 'sellersService', 'moment', 'calendarConfig', '$window', '$ocLazyLoad','Session','storesService','AsignementService','NgTableParams',controller]
})