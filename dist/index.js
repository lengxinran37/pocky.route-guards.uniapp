module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module) {

module.exports = JSON.parse("{\"a\":\"1.0.4\"}");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ lib_uniRouteGuards; });

// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__(0);

// CONCATENATED MODULE: ./src/lib/install.js
/**
 * Vue.use 插件安装
 * @param {Object} Vue
 * @param {*} opts
 */
function install(Vue, opts = {}) {}

// CONCATENATED MODULE: ./src/lib/hackRoute.js
/**
 * hack uniapp的路由函数b
 * @param {Function} callback
 * @return {never}
 */
const hackUniRoute = function (callback) {
    // 路由跳转的函数key值
    const UNI_ROUTE_ACTIONS = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab', 'navigateBack'];

    // 函数缓存容器
    const cacheFunc = {};

    // 保存原函数引用
    UNI_ROUTE_ACTIONS.forEach((key) => {
        cacheFunc[key] = uni[key];
    });

    // 重写方法
    UNI_ROUTE_ACTIONS.forEach((key) => {
        uni[key] = (opts, routeGuardsOpts) => {
            // 取消拦截并直接运行
            if (routeGuardsOpts === false) {
                cacheFunc[key](opts);
            } else {
                // 处理所有钩子
                const defaultOpts = { action: key };
                const newOpts = Object.assign(defaultOpts, opts);
                const actionFunc = function (customOpts) {
                    const lastOpts = Object.assign(newOpts, customOpts);

                    cacheFunc[lastOpts.action](lastOpts);
                };

                callback.call(this, newOpts, actionFunc);
            }
        };
    });
};

// CONCATENATED MODULE: ./src/lib/utils.js
/**
 * 控制台打印内容
 * @param {string} msg 内容
 * @param {string} action ['log'] 打印类型
 * @param {never}
 */
const print = function (msg, action = 'log') {
    console[action]('[route-guards] ' + msg);
};

/**
 * 判断错误对象是否是由`Error`对象实例化出来的
 * @param {Error|Object} errObj
 * @return {boolean}
 */
const isError = function (errObj) {
    return Object.prototype.toString.call(errObj).includes('Error');
};

/**
 * 获取并封装当前路由栈的信息
 * @return {Object}
 */
const getCurStack = function () {
    const stackAll = getCurrentPages();
    const stackLen = stackAll.length;

    // 跳过路由栈为空的情况(App端)
    if (stackLen === 0) {
        return false;
    }

    const curStack = stackAll[stackLen - 1];
    const from = { url: '/' + curStack.route };

    return from;
};

/**
 * 注册 钩子
 * @param {Function[]} list 钩子列表
 * @param {Function} callback 回调函数
 * @returns {Function} 用于注销当前注册钩子的闭包函数
 */
const registerHook = function (list, callback) {
    list.push(callback);

    return () => {
        const index = list.indexOf(callback);

        if (index !== -1) list.splice(index, 1);
    };
};

// CONCATENATED MODULE: ./src/lib/handleHooks.js


/**
 * 处理 全局钩子队列
 * @param {Object} to
 * @param {Function} uniRunRoute 被hack的uniapp路由方法
 */
const handleGlobalHooksQueue = function (to, uniRunRoute) {
    // 跳过 h5环境中, 调用系统的tabbar功能('tabbar')或系统的navbar上的返回功能('backbutton'), 会触发uni的路由方法
    if (['tabBar', 'backbutton'].includes(to.from)) return uniRunRoute();

    // 获取当前路由栈信息
    const from = getCurStack();

    // 跳过 app端 首次进入页面会调用uni路由方法, 导致获取当前路由栈(from)为空，所有直接运行，不进行拦截
    if (from === false) return uniRunRoute();

    iteratorHook(
        this.beforeHooks,
        handleNextPipe.bind(this),
        () => {
            uniRunRoute();
            this.handleAfterHook.call(this, to, from);
        },
        {
            to,
            from,
            uniRunRoute
        }
    );
};

/**
 * 处理 全局后置钩子
 * @param {Object} to
 * @param {Object} from
 */
const handleAfterHook = function (to, from) {
    this.afterHooks.forEach((hook) => {
        hook(to, from);
    });
};

/**
 * 处理 错误信息
 * @param {Object|string} err 错误信息、错误栈
 */
const handleAbort = function (err) {
    if (this.errorCbs.length > 0) {
        this.errorCbs.forEach((cb) => {
            cb(err);
        });
    } else {
        print('error:' + err, 'error');
    }
};

/**
 * 遍历并运行 钩子
 * @param {Function[]} hookQueue 钩子队列
 * @param {Function} everyCb 每次遍历都会运行的回调函数
 * @param {Function} endCb 队列运行结束后运行的回调函数
 * @param {Object} hookOpts 钩子运行需要的参数
 */
const iteratorHook = function (hookQueue, everyCb, endCb, hookOpts) {
    const step = (i) => {
        // 队列运行结束，运行回调函数
        if (i >= hookQueue.length) {
            endCb.call(this);
        } else {
            // 遍历运行钩子
            everyCb.call(this, hookQueue[i], hookOpts, (val) => {
                // 结束钩子遍历
                if (val === false) return;

                step(++i);
            });
        }
    };

    step(0);
};

/**
 * 处理 有next参数的钩子(前置钩子)
 * @param {Function} hookCb 钩子函数
 * @param {Object} hookOpts 钩子运行需要的参数
 * @param {Function} iteratorNextHook 运行下一个钩子
 */
const handleNextPipe = function (hookCb, hookOpts, iteratorNextHook) {
    hookCb(hookOpts.to, hookOpts.from, (nextVal) => {
        try {
            // next(false) or next(new Error('xxx')) 中断当前的路径跳转，或中断且注册错误回调
            if (nextVal === false || isError(nextVal)) {
                handleAbort.call(this, nextVal);
            }

            // next('/pages/a') or next({ url: '/pages/a' }) 修改 路由
            else if (
                typeof nextVal === 'string' ||
                (typeof nextVal === 'object' && typeof nextVal.url === 'string')
            ) {
                // 处理字符串路径
                typeof nextVal === 'string' && (nextVal = { url: nextVal });

                hookOpts.uniRunRoute(nextVal);
                handleAfterHook.call(this, hookOpts.to, hookOpts.from);

                // 更新引用，替换原来的`url`字段数据
                hookOpts.to = Object.assign(hookOpts.to, nextVal);

                // 结束钩子遍历
                iteratorNextHook(false);
            }

            // next() 运行下一个管道(next)
            else {
                iteratorNextHook();
            }
        } catch (err) {
            handleAbort.call(this, err);
        }
    });
};

// CONCATENATED MODULE: ./src/lib/index.js






class lib_uniRouteGuards {
    constructor() {
        // 打印当前插件版本号
        print('version: ' + package_0["a" /* version */]);

        // 初始化数据
        this.beforeHooks = [];
        this.afterHooks = [];
        this.errorCbs = [];
        hackUniRoute.call(this, handleGlobalHooksQueue);
    }

    /**
     * 注册 全局前置守卫
     * @param {Function} callback 回调函数
     */
    beforeEach(callback) {
        return registerHook(this.beforeHooks, callback);
    }

    /**
     * 注册 全局后置守卫
     * @param {Function} callback 回调函数
     */
    afterEach(callback) {
        return registerHook(this.afterHooks, callback);
    }

    /**
     * 注册 错误回调
     * @param {Function} errCb 错误回调函数
     */
    onError(errCb) {
        return registerHook(this.errorCbs, errCb);
    }
}

// 添加 Vue.use 功能
lib_uniRouteGuards.install = install;


/***/ })
/******/ ]);