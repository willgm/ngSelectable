'use strict';

describe('ngSelectable', function () {

    beforeEach(module('ngSelectable'));

    describe('Selected Items Binding', function () {

        it('should inialize target when not defined yet', inject(function ($compile, $rootScope) {
            $rootScope.items = ["oi", "ola"];
            var element = angular.element('<ul selectable selectable-list="items" selectable-out="selected">' +
                                              '<li ng-repeat="item in items">{{item}}</li>' +
                                          '</ul>');
            $compile(element)($rootScope);
            $rootScope.$digest();
            element.find('li').first().addClass('ui-selected');
            element.trigger("selectablestop");
            expect($rootScope.selected.length).toBe(1);
        }));

        it('should update simple target', inject(function ($compile, $rootScope) {
            $rootScope.items = ["oi", "ola"];
            $rootScope.selected = [];
            var element = angular.element('<ul selectable selectable-list="items" selectable-out="selected">' +
                                              '<li ng-repeat="item in items">{{item}}</li>' +
                                          '</ul>');
            $compile(element)($rootScope);
            $rootScope.$digest();
            element.find('li').first().addClass('ui-selected');
            element.trigger("selectablestop");
            expect($rootScope.selected.length).toBe(1);
        }));

        it('should update complex target', inject(function ($compile, $rootScope) {
            $rootScope.items = ["oi", "ola"];
            $rootScope.selected = {
                list: []
            };
            var element = angular.element('<ul selectable selectable-list="items" selectable-out="selected.list">' +
                                              '<li ng-repeat="item in items">{{item}}</li>' +
                                          '</ul>');
            $compile(element)($rootScope);
            $rootScope.$digest();
            element.find('li').first().addClass('ui-selected');
            element.trigger("selectablestop");
            expect($rootScope.selected.list.length).toBe(1);
        }));

        it('should erase target when toggle directive off', inject(function ($compile, $rootScope) {
            $rootScope.items = ["oi", "ola"];
            $rootScope.selected = ["oi"];
            var element = $compile('<ul ng-init="var=true" selectable="var" selectable-list="items" selectable-out="selected"></ul>')($rootScope);
            $rootScope.$digest();
            $rootScope.var = false;
            $rootScope.$digest();
            expect($rootScope.selected.length).toBe(0);
        }));

    });

    describe('Directive Toggle', function () {

        beforeEach(function () {
            spyOn(angular.element.fn, 'selectable');
        });

        it('should active without parameters', inject(function($compile, $rootScope) {
            var element = $compile('<span selectable></span>')($rootScope);
            $rootScope.$digest();
            expect(element.selectable).toHaveBeenCalled();
        }));

        it('should active with a boolean true parameter', inject(function($compile, $rootScope) {
            var element = $compile('<span selectable="true"></span>')($rootScope);
            $rootScope.$digest();
            expect(element.selectable).toHaveBeenCalled();
        }));

        it('should not active with a boolean false parameter', inject(function($compile, $rootScope) {
            var element = $compile('<span selectable="false"></span>')($rootScope);
            $rootScope.$digest();
            expect(element.selectable).not.toHaveBeenCalled();
        }));

        it('should active with a truthy variable as parameter', inject(function($compile, $rootScope) {
            var element = $compile('<span ng-init="var=true" selectable="var"></span>')($rootScope);
            $rootScope.$digest();
            expect(element.selectable).toHaveBeenCalled();
        }));

        it('should not active with a falsy variable as parameter', inject(function($compile, $rootScope) {
            var element = $compile('<span ng-init="var=false" selectable="var"></span>')($rootScope);
            $rootScope.$digest();
            expect(element.selectable).not.toHaveBeenCalled();
        }));

        it('should active when the parameter variable toggle true', inject(function($compile, $rootScope) {
            var element = $compile('<span ng-init="var=false" selectable="var"></span>')($rootScope);
            $rootScope.$digest();
            expect(element.selectable).not.toHaveBeenCalled();
            $rootScope.var = true;
            $rootScope.$digest();
            expect(element.selectable).toHaveBeenCalled();
        }));

        it('should destroy when the parameter variable toggle false', inject(function($compile, $rootScope) {
            var element = $compile('<span ng-init="var=true" selectable="var"></span>')($rootScope);
            $rootScope.$digest();
            expect(element.selectable).toHaveBeenCalled();
            $rootScope.var = false;
            $rootScope.$digest();
            expect(element.selectable).toHaveBeenCalledWith("destroy");
        }));

    });

    describe('Options and Events', function () {

        it('should use options at selectable call', inject(function ($compile, $rootScope) {
            spyOn(angular.element.fn, 'selectable');
            $rootScope.myOptions = {filter:'li'};
            var element = $compile('<ul selectable selectable-options="myOptions"></ul>')($rootScope);
            $rootScope.$digest();
            expect(element.selectable).toHaveBeenCalledWith($rootScope.myOptions);
        }));

        it('should bind selectable events', inject(function ($compile, $rootScope) {
            $rootScope.callback = function () {};
            $rootScope.myEvents = {start:'callback()'};
            spyOn($rootScope, 'callback');
            var element = $compile('<ul selectable selectable-events="myEvents"></ul>')($rootScope);
            element.trigger("selectablestart");
            expect($rootScope.callback).toHaveBeenCalled();
        }));

        it('should inject working list at selectable events', inject(function ($compile, $rootScope) {
            $rootScope.callback = function () {};
            $rootScope.myEvents = {start:'callback($list)'};
            $rootScope.items = ["oi", "ola"];
            spyOn($rootScope, 'callback');
            var element = $compile('<ul selectable selectable-list="items" selectable-events="myEvents"></ul>')($rootScope);
            element.trigger("selectablestart");
            expect($rootScope.callback).toHaveBeenCalledWith($rootScope.items);
        }));

        it('should inject selected list at selectable events', inject(function ($compile, $rootScope) {
            $rootScope.callback = function () {};
            spyOn($rootScope, 'callback');
            $rootScope.myEvents = {stop:'callback($selected)'};
            $rootScope.items = ["oi", "ola"];
            var element = angular.element('<ul selectable selectable-list="items" selectable-events="myEvents">' +
                                              '<li ng-repeat="item in items">{{item}}</li>' +
                                          '</ul>');
            $compile(element)($rootScope);
            $rootScope.$digest();
            element.find('li').first().addClass('ui-selected');
            element.trigger("selectablestop");
            expect($rootScope.callback).toHaveBeenCalledWith(['oi']);
        }));

        it('should inject jquery event at selectable events', inject(function ($compile, $rootScope) {
            $rootScope.callback = function () {};
            $rootScope.myEvents = {start:'callback($event)'};
            spyOn($rootScope, 'callback');
            var element = angular.element('<ul selectable selectable-events="myEvents"></ul>');
            var event = {};
            element.bind('selectablestart', function (ev) {
                event = ev;
            });
            $compile(element)($rootScope);
            element.trigger("selectablestart");
            expect($rootScope.callback).toHaveBeenCalledWith(event);
        }));

        it('should inject jquery ui object at selectable events', inject(function ($compile, $rootScope) {
            $rootScope.callback = function () {};
            $rootScope.myEvents = {start:'callback($ui)'};
            spyOn($rootScope, 'callback');
            var element = angular.element('<ul selectable selectable-events="myEvents"></ul>');
            var jui = {};
            element.bind('selectablestart', function (ev, ui) {
                jui = ui;
            });
            $compile(element)($rootScope);
            element.trigger("selectablestart");
            expect($rootScope.callback).toHaveBeenCalledWith(jui);
        }));

    });

});
