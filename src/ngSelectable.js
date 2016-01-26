(function () {
    'use strict';
    angular.module("ngSelectable", [])
        .directive("selectable", function () {
            return function (scope, element, attr) {
                var options = scope.$eval(attr.selectableOptions) || {};

                if (attr.selectableList && attr.selectableOut) {
                    element.bind("selectablestop", function () {
                        var selectableList = scope.$eval(attr.selectableList),
                            selectableOut  = scope.$eval(attr.selectableOut), s;
                        var selected = !selectableList? [] : element.find('.ui-selected').map(function () {
                            return selectableList[$(this).index()];
                        }).get();
                        scope.$apply(function () {
                            if(selectableOut===undefined)
                                scope[attr.selectableOut] = selectableOut = [];
                            selectableOut.splice(0);
                            while(s = selected.shift())
                                selectableOut.push(s);
                        });
                    });
                }

                scope.$watch(attr.selectable, function (value, old) {
                    if (value || value===undefined)
                        return element.selectable(options);
                    if (!value && old) {
                        element.selectable("destroy");
                        element.find('.ui-selected').removeClass('ui-selected');
                        if (attr.selectableOut) {
                            scope[attr.selectableOut] = [];
                        }
                    }
                })
            }
        })
        .directive("selectableEvents", ['$parse', function ($parse) {
            return function (scope, element, attr) {
                var selectableEvents = scope.$eval(attr.selectableEvents) || {};

                $.map(selectableEvents, function(callback, eventName){
                    element.bind("selectable" + eventName, function (e, ui) {
                        if (e.preventDefault) e.preventDefault();

                        var selectableList = scope.$eval(attr.selectableList);
                        var selected = !selectableList? [] : element.find('.ui-selected').map(function () {
                            return selectableList[$(this).index()];
                        }).get();

                        var fn = $parse(callback);
                        scope.$apply(function () {
                            fn(scope, {
                                $ui: ui,
                                $event: e,
                                $list: scope.$eval(attr.selectableList),
                                $selected: selected
                            });
                        });
                    });
                });
            }
        }]);
})();
