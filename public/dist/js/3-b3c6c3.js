webpackJsonp([3],{421:function(s,n,a){"use strict";function e(s,n){if(!(s instanceof n))throw new TypeError("Cannot call a class as a function")}function l(s,n){if(!s)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?s:n}function p(s,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);s.prototype=Object.create(n&&n.prototype,{constructor:{value:s,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(s,n):s.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function s(s,n){for(var a=0;a<n.length;a++){var e=n[a];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(s,e.key,e)}}return function(n,a,e){return a&&s(n.prototype,a),e&&s(n,e),n}}(),t=a(6),c=function(s){return s&&s.__esModule?s:{default:s}}(t),o=function(s){function n(s){return e(this,n),l(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,s))}return p(n,s),r(n,[{key:"rawMarkup",value:function(){return{__html:'<h1 id="promise-">Promise 顺序执行</h1>\n<h3 id="-">起源</h3>\n<p>JavaScript 在处理异步任务时，经常用到的手段是回调函数。奈何，面对多个需要顺序执行的异步任务很容易造成回调地狱(Callback Hell):</p>\n<pre><code className="lang-javascript">request(a, <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> {\n    request(b, <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {\n        request(c, <span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> {\n            <span class="hljs-comment">//...</span>\n        });\n    });\n});\n</code></pre>\n<p>Promise 是 Callback Hell 的一种解决方案，并且得到了非常广泛的应用,比如 axios 就是利用 Promise 编写的 http 客户端。</p>\n<h3 id="promise-">Promise 顺序执行异步任务</h3>\n<p>将异步任务改写成 Promise 的形式，然后在上一个 promise 的状态变为 resolved 调用下一个 promise。\nPromise 处理异步任务的优雅的实现方式应该是这样：</p>\n<pre><code class="lang-javascript"><span class="hljs-keyword">const</span> A = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(a, resolve));\n\n<span class="hljs-keyword">const</span> B = <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(b, resolve));\n\n<span class="hljs-keyword">const</span> C = <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(c, resolve));\n\nA(a)\n    .then(B)\n    .then(C)\n    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {\n        <span class="hljs-built_in">console</span>.log(e);\n    });\n</code></pre>\n<p>基于以上结果我们可以进一步将其封装成进行顺序处理的函数,此函数接受异步任务数组作为参数，顺序执行后返回结果。顺序处理的函数的实现方式：</p>\n<pre><code class="lang-javascript"><span class="hljs-comment">/**\n * @param {*promise任务队列} tasks\n */</span>\n<span class="hljs-keyword">const</span> sequenceTasks = <span class="hljs-function"><span class="hljs-params">tasks</span> =&gt;</span> {\n    <span class="hljs-keyword">const</span> recordValue = <span class="hljs-function">(<span class="hljs-params">results, value</span>) =&gt;</span> {\n        results.push(value);\n        <span class="hljs-keyword">return</span> results;\n    };\n    <span class="hljs-keyword">const</span> pushValue = recordValue.bind(<span class="hljs-literal">null</span>, []);\n\n    <span class="hljs-keyword">return</span> tasks.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promise, task</span>) </span>{\n        <span class="hljs-keyword">return</span> promise.then(task).then(pushValue);\n    }, <span class="hljs-built_in">Promise</span>.resolve());\n};\n\n<span class="hljs-keyword">const</span> promise1 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>\n    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> {\n        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise1 resolve"</span>);\n            resolve(<span class="hljs-string">"promise1"</span>);\n        }, <span class="hljs-number">1000</span>);\n    });\n\n<span class="hljs-keyword">const</span> promise2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>\n    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> {\n        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise2 resolve"</span>);\n            resolve(<span class="hljs-string">"promise2"</span>);\n        }, <span class="hljs-number">1</span>);\n    });\n\n<span class="hljs-keyword">const</span> tasks = [promise1, promise2];\nsequenceTasks(tasks)\n    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {\n        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"res"</span>, res);\n    })\n    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {\n        <span class="hljs-built_in">console</span>.log(e);\n    });\n<span class="hljs-comment">/**\n * 输出结果：\n * promise1 resolve\n * promise2 resolve\n * res ["promise1", "promise2"]\n */</span>\n</code></pre>\n<p>在 reduce 中第一个参数中被 return 的值,利用 reduce 方法使下一个 promise 指向 promise.then(task).then(pushValue)，从而实现 promise 链。</p>\n'}}},{key:"render",value:function(){return c.default.createElement("div",{dangerouslySetInnerHTML:this.rawMarkup()})}}]),n}(t.Component);n.default=o}});
//# sourceMappingURL=3-b3c6c3.js.map