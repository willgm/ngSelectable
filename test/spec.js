
describe('ngSelectable', function () {

    beforeEach(module('ngSelectable'));

    describe('Directive Toggle', function () {

        beforeEach(function () {
            spyOn(angular.element.fn, 'selectable');
        });

        it('should active without parameters', inject(function($compile, $rootScope) {
            var element = $compile('<span selectable></span>')($rootScope);
            expect(element.selectable).toHaveBeenCalled();
        }));

        it('should active with a boolean true parameter', inject(function($compile, $rootScope) {
            var element = $compile('<span selectable="true"></span>')($rootScope);
            expect(element.selectable).toHaveBeenCalled();
        }));

        it('should not active with a boolean false parameter', inject(function($compile, $rootScope) {
            var element = $compile('<span selectable="false"></span>')($rootScope);
            expect(element.selectable).not.toHaveBeenCalled();
        }));

        it('should active with a truthy variable as parameter', inject(function($compile, $rootScope) {
            var element = $compile('<span ng-init="var=true" selectable="var"></span>')($rootScope);
            expect(element.selectable).toHaveBeenCalled();
        }));

        it('should active with a falsy variable as parameter', inject(function($compile, $rootScope) {
            var element = $compile('<span ng-init="var=false" selectable="var"></span>')($rootScope);
            expect(element.selectable).not.toHaveBeenCalled();
        }));

        it('should active when the parameter variable toggle true', inject(function($compile, $rootScope) {
            var element = $compile('<span ng-init="var=false" selectable="var"></span>')($rootScope);
            expect(element.selectable).not.toHaveBeenCalled();
            $rootScope.$apply(function () {
                $rootScope.var = true;
            });
            expect(element.selectable).toHaveBeenCalled();
        }));

        it('should destroy when the parameter variable toggle false', inject(function($compile, $rootScope) {
            var element = $compile('<span ng-init="var=true" selectable="var"></span>')($rootScope);
            expect(element.selectable).toHaveBeenCalled();
            $rootScope.$digest();
            $rootScope.var = false;
            $rootScope.$digest();
            expect(element.selectable).toHaveBeenCalledWith("destroy");
        }));

    });

});