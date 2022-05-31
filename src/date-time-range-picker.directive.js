angular
    .module('dateTimeRangePicker', [])
    .directive('dateTimeRangePicker', [
        function () {
            return {
                restrict: 'E',         // Element
                replace: true,
                scope: {
                    start: '=',         // Startdatum + -uhrzeit
                    end: '=',           // Enddatum + -uhrzeit (nur die Uhrzeit unterscheidet sich vom Startdatum)
                    ngDisabled: '<',
                    changed: '&'
                },
                template: `
<div class="row">
    <div class="col-sm-5">
        <div class="input-group">
            <input type="text" class="form-control"
                   uib-datepicker-popup="dd.MM.yyyy"
                   ng-model="state.date" ng-change="onDateOrTimeChanged()"
                   ng-disabled="ngDisabled"
                   is-open="state.popupOpen" datepicker-options="dateOptions" close-text="Schließen" current-text="Heute" clear-text="Leeren"
                   alt-input-formats="altInputFormats" />
            <span class="input-group-btn">
                <button type="button" class="btn btn-default" ng-click="state.popupOpen = !state.popupOpen"><i class="glyphicon glyphicon-calendar"></i></button>
            </span>
        </div>
    </div>
    <div class="col-sm-3">
        <div uib-timepicker ng-model="state.timeStart" ng-change="onDateOrTimeChanged()"
             ng-disabled="ngDisabled"
             minute-step="15" show-meridian="false" show-spinners="false"></div>
    </div>
    <div class="col-sm-1 text-center"><p class="form-control-static">&mdash;</p></div>
    <div class="col-sm-3">
        <div uib-timepicker ng-model="state.timeEnd" ng-change="onDateOrTimeChanged()"
             ng-disabled="ngDisabled"
             minute-step="15" show-meridian="false" show-spinners="false"></div>
    </div>
</div>`,
                controller: [
                    '$scope',
                    function ($scope) {

                        $scope.state = {
                            date: undefined,            // Datum (Tag)
                            timeStart: undefined,       // Uhrzeit Anfang
                            timeEnd: undefined,         // Uhrzeit Ende
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
                                if ($scope.changed) {
                                    $scope.changed()
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
                            }
                        });

                    }
                ]
            };
        }
    ]);
