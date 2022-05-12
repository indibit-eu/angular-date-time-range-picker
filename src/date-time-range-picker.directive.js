angular
    .module('dateTimeRangePicker', [])
    .directive('dateTimeRangePicker', [
        function () {
            return {
                restrict: 'E',         // Element
                replace: true,
                scope: {
                    start: '=',
                    end: '=',
                    ngDisabled: '<',
                    changed: '&'
                },
                templateUrl: 'src/date-time-range-picker.html',
                controller: [
                    '$scope',
                    function ($scope) {

                        $scope.state = {
                            date: undefined,
                            timeStart: undefined,
                            timeEnd: undefined,
                            endTimeValid: true
                        }

                        $scope.dateOptions = {}

                        $scope.onDateOrTimeChanged = function () {
                            // Datum und Zeit zu einem Objekt zusammensetzen
                            if ($scope.state.date) {
                                var mDate = moment.utc($scope.state.date);
                                if ($scope.state.timeStart) {
                                    var mTimeStart = moment.utc($scope.state.timeStart);
                                    $scope.start = moment.utc([
                                        mDate.get('year'), mDate.get('month'), mDate.date(),
                                        mTimeStart.get('hour'), mTimeStart.get('minute')
                                    ]).toDate()
                                }
                                if ($scope.state.timeEnd) {
                                    var mTimeEnd = moment.utc($scope.state.timeEnd);
                                    $scope.end = moment.utc([
                                        mDate.get('year'), mDate.get('month'), mDate.date(),
                                        mTimeEnd.get('hour'), mTimeEnd.get('minute')
                                    ]).toDate()
                                }
                            }
                        }

                        $scope.$watch('start', function (newVal) {
                            if (newVal) {
                                $scope.state.date = newVal;
                                $scope.state.timeStart = newVal;
                            }
                        });

                        $scope.$watch('end', function (newVal) {
                            if (newVal) {
                                $scope.state.timeEnd = newVal;
                                if ($scope.changed) {
                                    $scope.changed()
                                }
                            }
                        });

                    }
                ]
            };
        }
    ]);
