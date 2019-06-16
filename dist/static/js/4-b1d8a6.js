webpackJsonp([4],{356:function(s,n,a){"use strict";function l(s){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(s){return typeof s}:function(s){return s&&"function"==typeof Symbol&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s})(s)}function e(s,n){if(!(s instanceof n))throw new TypeError("Cannot call a class as a function")}function p(s,n){for(var a=0;a<n.length;a++){var l=n[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(s,l.key,l)}}function r(s,n,a){return n&&p(s.prototype,n),a&&p(s,a),s}function c(s,n){return!n||"object"!==l(n)&&"function"!=typeof n?o(s):n}function o(s){if(void 0===s)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function t(s){return(t=Object.setPrototypeOf?Object.getPrototypeOf:function(s){return s.__proto__||Object.getPrototypeOf(s)})(s)}function h(s,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");s.prototype=Object.create(n&&n.prototype,{constructor:{value:s,writable:!0,configurable:!0}}),n&&i(s,n)}function i(s,n){return(i=Object.setPrototypeOf||function(s,n){return s.__proto__=n,s})(s,n)}Object.defineProperty(n,"__esModule",{value:!0});var j=a(6),u=a.n(j),d=function(s){function n(s){return e(this,n),c(this,t(n).call(this,s))}return h(n,s),r(n,[{key:"rawMarkup",value:function(){return{__html:'<h1 id="promise">Promise</h1>\n<h3 id="-">起源</h3>\n<p>JavaScript 在处理异步任务时，经常用到的手段是回调函数。奈何，面对多个需要顺序执行的异步任务很容易造成回调地狱(Callback Hell):</p>\n<pre><code className="lang-javascript">request(a, <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> {\n    request(b, <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {\n        request(c, <span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> {\n            <span class="hljs-comment">//...</span>\n        });\n    });\n});\n</code></pre>\n<p>Promise 是 Callback Hell 的一种解决方案，并且得到了非常广泛的应用,比如 axios 就是利用 Promise 编写的 http 客户端。</p>\n<h3 id="-">概念</h3>\n<p>所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。\nPromise 的特点：</p>\n<ol>\n<li>对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。</li>\n<li>一旦状态改变，不可逆转。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。</li>\n</ol>\n<h3 id="promise-">Promise 顺序执行异步任务</h3>\n<p>将异步任务改写成 Promise 的形式，然后在上一个 promise 的状态变为 resolved 调用下一个 promise。\nPromise 处理异步任务的优雅的实现方式应该是这样：</p>\n<pre><code class="lang-javascript"><span class="hljs-keyword">const</span> A = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(a, resolve));\n\n<span class="hljs-keyword">const</span> B = <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(b, resolve));\n\n<span class="hljs-keyword">const</span> C = <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(c, resolve));\n\nA(a)\n    .then(B)\n    .then(C)\n    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {\n        <span class="hljs-built_in">console</span>.log(e);\n    });\n</code></pre>\n<p>基于以上结果我们可以进一步将其封装成进行顺序处理的函数,此函数接受异步任务数组作为参数，顺序执行后返回结果。顺序处理的函数的实现方式：</p>\n<pre><code class="lang-javascript"><span class="hljs-comment">/**\n * @param {*promise任务队列} tasks\n */</span>\n<span class="hljs-keyword">const</span> sequenceTasks = <span class="hljs-function"><span class="hljs-params">tasks</span> =&gt;</span> {\n    <span class="hljs-keyword">const</span> recordValue = <span class="hljs-function">(<span class="hljs-params">results, value</span>) =&gt;</span> {\n        results.push(value);\n        <span class="hljs-keyword">return</span> results;\n    };\n    <span class="hljs-keyword">const</span> pushValue = recordValue.bind(<span class="hljs-literal">null</span>, []);\n\n    <span class="hljs-keyword">return</span> tasks.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promise, task</span>) </span>{\n        <span class="hljs-keyword">return</span> promise.then(task).then(pushValue);\n    }, <span class="hljs-built_in">Promise</span>.resolve());\n};\n\n<span class="hljs-keyword">const</span> promise1 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>\n    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> {\n        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise1 resolve"</span>);\n            resolve(<span class="hljs-string">"promise1"</span>);\n        }, <span class="hljs-number">1000</span>);\n    });\n\n<span class="hljs-keyword">const</span> promise2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>\n    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> {\n        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise2 resolve"</span>);\n            resolve(<span class="hljs-string">"promise2"</span>);\n        }, <span class="hljs-number">1</span>);\n    });\n\n<span class="hljs-keyword">const</span> tasks = [promise1, promise2];\nsequenceTasks(tasks)\n    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {\n        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"res"</span>, res);\n    })\n    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {\n        <span class="hljs-built_in">console</span>.log(e);\n    });\n<span class="hljs-comment">/**\n * 输出结果：\n * promise1 resolve\n * promise2 resolve\n * res ["promise1", "promise2"]\n */</span>\n</code></pre>\n<p>在 reduce 中第一个参数中被 return 的值,利用 reduce 方法使下一个 promise 指向 promise.then(task).then(pushValue)，从而实现 promise 链。</p>\n<h3 id="promise-">Promise 的实现</h3>\n<p>Promise 和观察者模式十分接近，通过 new Promise 生成 观察者实例(observable)，resolve/reject 相当于 发布(publish )，then 相当于 订阅(subscribe )。</p>\n<pre><code class="lang-javascript"><span class="hljs-comment">//  Promise 的三种状态</span>\n<span class="hljs-keyword">const</span> PENDING = <span class="hljs-number">0</span>;\n<span class="hljs-keyword">const</span> FULFILLED = <span class="hljs-number">1</span>;\n<span class="hljs-keyword">const</span> REJECTED = <span class="hljs-number">2</span>;\n\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Promise</span>(<span class="hljs-params">fn</span>) </span>{\n    <span class="hljs-comment">// 存储该 Promise 的状态信息</span>\n    <span class="hljs-keyword">let</span> state = PENDING;\n\n    <span class="hljs-comment">// 存储 FULFILLED 或 REJECTED 时带来的数据</span>\n    <span class="hljs-keyword">let</span> value = <span class="hljs-literal">null</span>;\n\n    <span class="hljs-comment">// 存储 then 或 done 时调用的成功或失败回调</span>\n    <span class="hljs-keyword">let</span> handlers = [];\n\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fulfill</span>(<span class="hljs-params">result</span>) </span>{\n        state = FULFILLED;\n        handlers.forEach(handle);\n        handlers = <span class="hljs-literal">null</span>;\n    }\n\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reject</span>(<span class="hljs-params">error</span>) </span>{\n        state = REJECTED;\n        value = error;\n        handlers.forEach(handle);\n        handlers = <span class="hljs-literal">null</span>;\n    }\n\n    <span class="hljs-comment">// resolve函数实现一种更高级的状态改变方式，作为对外开放的接口</span>\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">result</span>) </span>{\n        <span class="hljs-keyword">try</span> {\n            <span class="hljs-keyword">let</span> then = getThen(result);\n            <span class="hljs-keyword">if</span> (then) {\n                <span class="hljs-comment">// 递归 resolve 待解析的 Promise</span>\n                doResolve(then.bind(result), resolve, reject);\n                <span class="hljs-keyword">return</span>;\n            }\n            fulfill(result);\n        } <span class="hljs-keyword">catch</span> (e) {\n            reject(e);\n        }\n    }\n\n    <span class="hljs-comment">// 保证 done 中回调的执行</span>\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle</span>(<span class="hljs-params">handler</span>) </span>{\n        <span class="hljs-keyword">if</span> (state === PENDING) {\n            handlers.push(handler);\n        } <span class="hljs-keyword">else</span> {\n            <span class="hljs-keyword">if</span> (\n                state === FULFILLED &amp;&amp;\n                <span class="hljs-keyword">typeof</span> handler.onFulfilled === <span class="hljs-string">"function"</span>\n            ) {\n                handler.onFulfilled(value);\n            }\n            <span class="hljs-keyword">if</span> (\n                state === REJECTED &amp;&amp;\n                <span class="hljs-keyword">typeof</span> handler.onRejected === <span class="hljs-string">"function"</span>\n            ) {\n                handler.onRejected(value);\n            }\n        }\n    }\n\n    <span class="hljs-comment">// done 保证onFulfilled 与 onRejected 二者只有一个被调用</span>\n    <span class="hljs-keyword">this</span>.done = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFulfilled, onRejected</span>) </span>{\n        <span class="hljs-comment">// 保证 done 总是异步执行</span>\n        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{\n            handle({\n                <span class="hljs-attr">onFulfilled</span>: onFulfilled,\n                <span class="hljs-attr">onRejected</span>: onRejected\n            });\n        }, <span class="hljs-number">0</span>);\n    };\n\n    <span class="hljs-comment">// then 能够返回一个新的 Promise</span>\n    <span class="hljs-keyword">this</span>.then = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">onFulfilled, onRejected</span>) </span>{\n        <span class="hljs-keyword">const</span> _this = <span class="hljs-keyword">this</span>;\n        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{\n            <span class="hljs-keyword">return</span> _this.done(\n                <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{\n                    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> onFulfilled === <span class="hljs-string">"function"</span>) {\n                        <span class="hljs-keyword">try</span> {\n                            <span class="hljs-keyword">return</span> resolve(onFulfilled(result));\n                        } <span class="hljs-keyword">catch</span> (ex) {\n                            <span class="hljs-keyword">return</span> reject(ex);\n                        }\n                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> resolve(result);\n                },\n                <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{\n                    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> onRejected === <span class="hljs-string">"function"</span>) {\n                        <span class="hljs-keyword">try</span> {\n                            <span class="hljs-keyword">return</span> resolve(onRejected(error));\n                        } <span class="hljs-keyword">catch</span> (ex) {\n                            <span class="hljs-keyword">return</span> reject(ex);\n                        }\n                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> reject(error);\n                }\n            );\n        });\n    };\n\n    <span class="hljs-comment">// todo</span>\n    <span class="hljs-keyword">this</span>.catch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">erroe</span>) </span>{};\n\n    doResolve(fn, resolve, reject);\n}\n<span class="hljs-comment">/**\n * 检查一个值是否为 Promise\n * 若为 Promise 则返回该 Promise 的 then 方法\n *\n * @param {Promise|Any} value\n * @return {Function|Null}\n */</span>\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getThen</span>(<span class="hljs-params">value</span>) </span>{\n    <span class="hljs-keyword">let</span> t = <span class="hljs-keyword">typeof</span> value;\n    <span class="hljs-keyword">if</span> (value &amp;&amp; (t === <span class="hljs-string">"object"</span> || t === <span class="hljs-string">"function"</span>)) {\n        <span class="hljs-keyword">const</span> then = value.then;\n        <span class="hljs-comment">// 可能需要更复杂的 thenable 判断</span>\n        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> then === <span class="hljs-string">"function"</span>) <span class="hljs-keyword">return</span> then;\n    }\n    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;\n}\n\n<span class="hljs-comment">/**\n * 传入一个需被 resolve 的函数，该函数可能存在不确定行为\n * 确保 onFulfilled 与 onRejected 只会被调用一次\n * 在此不保证该函数一定会被异步执行\n *\n * @param {Function} fn 不能信任的回调函数\n * @param {Function} onFulfilled\n * @param {Function} onRejected\n */</span>\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doResolve</span>(<span class="hljs-params">fn, onFulfilled, onRejected</span>) </span>{\n    <span class="hljs-keyword">let</span> done = <span class="hljs-literal">false</span>;\n    <span class="hljs-keyword">try</span> {\n        fn(\n            <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{\n                <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>;\n                done = <span class="hljs-literal">true</span>;\n                <span class="hljs-comment">// 执行由 resolve 传入的 resolve 回调</span>\n                onFulfilled(value);\n            },\n            <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason</span>) </span>{\n                <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>;\n                done = <span class="hljs-literal">true</span>;\n                onRejected(reason);\n            }\n        );\n    } <span class="hljs-keyword">catch</span> (ex) {\n        <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>;\n        done = <span class="hljs-literal">true</span>;\n        onRejected(ex);\n    }\n}\n</code></pre>\n'}}},{key:"render",value:function(){return u.a.createElement("div",{dangerouslySetInnerHTML:this.rawMarkup()})}}]),n}(j.Component);n.default=d}});