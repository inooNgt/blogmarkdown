webpackJsonp([6],{413:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(6),p=function(e){return e&&e.__esModule?e:{default:e}}(u),c=n(107),s=[{path:"/posts/mina-app",name:"mina"},{path:"/posts/promise",name:"promise"},{path:"/posts/routing-partition",name:"routing-partition"},{path:"/posts/Three-dimensional-perspective",name:"perspective"}],f=function(e){function t(e){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return a(t,e),i(t,[{key:"render",value:function(){var e=s.map(function(e,t){return p.default.createElement(c.Link,{className:"posts-item",key:t,to:e.path},e.name)});return p.default.createElement("div",null,e)}}]),t}(u.Component);t.default=f}});
//# sourceMappingURL=6-95ff13.js.map