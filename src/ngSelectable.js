(function () {
    angular.module("ngSelectable", [])
        .directive("selectable", function () {
            return function (scope, element, attr) {
                var selectable = attr.selectable==="" || scope.$eval(attr.selectable);
                var options = scope.$eval(attr.selectableOptions) || {};
                var selectableList = scope.$eval(attr.selectableList);

                if (attr.selectableList && attr.selectableOut) {
                    oldStop = options.stop;
                    options.stop = function () {
                        if (oldStop) oldStop()
                        var selecteds = element.find('.ui-selected').map(function () {
                            return selectableList[$(this).index()];
                        }).get();
                        scope.$apply(function () {
                            scope[attr.selectableOut] = selecteds;
                        });
                    }
                }

                if (selectable) element.selectable(options);

                scope.$watch(attr.selectable, function (value, old) {
                    if (value) return element.selectable(options);
                    if (old) {
                        element.selectable("destroy");
                        element.find('.ui-selected').removeClass('ui-selected');
                        if (attr.selectableOut) {
                            scope.$apply(function () {
                                scope[attr.selectableOut] = [];
                            });
                        }
                    }
                })
            }
        })
        .directive("selectableEvents", ['$parse', function ($parse) {
            return function (scope, element, attr) {
                var selectableEvents = scope.$eval(attr.selectableEvents) || {};

                for (eventName in selectableEvents) {
                    element.bind("selectable" + eventName, function (e, ui) {
                        if (e.preventDefault) e.preventDefault();

                        var fn = $parse(selectableEvents[eventName]);
                        scope.$apply(function () {
                            fn(scope, {
                                $ui: ui,
                                $event: e,
                                $list: scope.$eval(attr.selectableList),
                                $selected: scope.$eval(attr.selectableOut)
                            });
                        });
                    });
                }
            }
        }]);
})();
