/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	$(document).ready(function () {

		$('i.unlogged').on('tap', function () {
			location.href = '/login';
		});
		$('.fy-item-cover .like-icon').on('tap', function (e) {
			e.stopPropagation();
			var _thisJq = $(this);
			if (_thisJq.hasClass('do-like')) {
				_thisJq.removeClass('do-like').addClass('donot-like');
			} else if (_thisJq.hasClass('donot-like')) {
				_thisJq.removeClass('donot-like').addClass('do-like');
			}
		});

		$('.fy-item').on('tap', function () {
			var path = "/single/single?id=" + $(this).data('id');
			location.href = path;
		});
	});

/***/ }
/******/ ]);