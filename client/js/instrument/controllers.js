'use strict';

angular
.module('app')
.controller('InstrumentsCtrl', ['$scope', '$state', '$stateParams', 'Instrument', 'Subject', 'User', function($scope,
  $state, $stateParams, Instrument, Subject, User) {

    $scope.newSubject = {};
    $scope.subjects = [];
    $scope.instruments = [];

    $scope.preview = true;
    $scope.user = User.getCurrent();

    $scope.$watch('preview', function(oldValue, newValue) {
      if (oldValue && !newValue)
        $scope.updateInstrument();
    });

    function checkPermissions() {
      console.log($scope.user);
    }

    function getInstrumentFromUrl() {
      if (!$stateParams.id) {
        Instrument
        .find({})
        .$promise
        .then(function(results) {
          $scope.instrument = results[0];
          $scope.getSubjects();

          checkPermissions();
        });
        return;
      }

      Instrument
      .findOne({ id: $stateParams.id })
      .$promise
      .then(function(result) {
        $scope.instrument = result;
        getInstruments();
        $scope.getSubjects();

        checkPermissions();
      });

    }

    $scope.updateInstrument = function() {
      Instrument
      .upsert($scope.instrument)
      .$promise
      .then(function(result) {
        console.log(result);
      });
    };

    $scope.getSubjects = function() {
      Subject
      .find({ instrumentId: $scope.instrument.id })
      .$promise
      .then(function(results) {
        $scope.subjects = results;
        $scope.instrument.subjects_count = results.length;
      });

    };

    $scope.addSubject = function() {
      $scope.newSubject.instrumentId = $scope.instrument.id;

      console.log($scope.newSubject)

      Subject
      .create($scope.newSubject)
      .$promise
      .then(function(subject) {
        $scope.newSubject = '';
        $scope.subjectsForm.name.$setPristine();
        $scope.subjectsForm.description.$setPristine();
        $('.focus').focus(); //JQuery hack for refocusing text input
        $scope.getSubjects();
      });
    };

    $scope.removeSubject = function(item) {
      Subject
      .deleteById(item)
      .$promise
      .then(function() {
        $scope.getSubjects();
      });
    };

    getInstrumentFromUrl();
  }]);
