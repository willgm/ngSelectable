# [AngularJS](https://angularjs.org/) ngSelectable directive

Allows you to easy select multiples items individually or in a group.

## Requirements

- JQuery
- JQueryUI
- AngularJS

**Notes:**
> JQuery must be included before AngularJS.
> JQueryUI dependecies include [core](http://api.jqueryui.com/category/ui-core/), [widget](http://api.jqueryui.com/jQuery.widget/), [mouse](http://api.jqueryui.com/mouse/) & [selectable](http://api.jqueryui.com/selectable/). Creating a [custom build](http://jqueryui.com/download/#!version=1.10&components=1110000100000000000000000000000000) will greatly reduce the required file size. ([CDN](http://www.jsdelivr.com/) links for comparison: [full](http://cdn.jsdelivr.net/g/jquery.ui@1.10) vs  [minimal](http://cdn.jsdelivr.net/g/jquery.ui@1.10%28jquery.ui.core.min.js+jquery.ui.widget.min.js+jquery.ui.mouse.min.js+jquery.ui.selectable.min.js%29))

## Examples

- [Simple Demo](http://codepen.io/willgm/pen/wGhpt)
- [Full API Demo](http://codepen.io/willgm/pen/sHgum/)

## Usage

Install the bower package (or just copy the source):

```
bower install ngSelectable --save
```

Load the script file: ngSelectable.js in your application:

```html
<script type="text/javascript" src="ngSelectable.js"></script>
```

Add the selectable module as a dependency to your application module:

```js
var myAppModule = angular.module('MyApp', ['ngSelectable'])
```

Apply the directive to your selectable list:

```html
<ul selectable selectable-list="items">
  <li ng-repeat="item in items">{{item}}</li>
</ul>
```

### Selected Items Binding

```html
Selected: <span ng-repeat="item in selected">{{item}}</span>
<ul selectable selectable-list="items" selectable-out="selected">
  <li ng-repeat="item in items">{{item}}</li>
</ul>
```

### Directive Toggle

```html
<label>
  <input type="checkbox" ng-model="selection" /> Active Selection
</label>
<ul selectable="selection">
  <li ng-repeat="item in items">{{item}}</li>
</ul>
```

### Options

All the [jQueryUI Selectable options](http://api.jqueryui.com/selectable/#options) can be passed through _selectable-options_.

```html
<ul selectable selectable-options="{filter:'li'}">
  <li ng-repeat="item in items">{{item}}</li>
</ul>
```

### Events

All the [jQueryUI Selectable events](http://api.jqueryui.com/selectable/#events) can be passed through _selectable-events_ with all the angular injections like $index and $event. You can also get the working list ($list), the selected items ($selected) and the JqueryUI object ($ui).

```html
<ul selectable selectable-events="{start:'myMethod($event, $ui, $selected, $list)'}">
  <li ng-repeat="item in items">{{item}}</li>
</ul>
```
