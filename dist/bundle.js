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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************************!*\
  !*** ./src/commons/constants.js ***!
  \**********************************/
/*! exports provided: BOARD */
/*! exports used: BOARD */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("const BOARD = {\r\n\tWIDTH: 850,\r\n\tHEIGHT: 500\r\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = BOARD;\n\r\n\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb21tb25zL2NvbnN0YW50cy5qcz85MzNjIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBCT0FSRCA9IHtcclxuXHRXSURUSDogODUwLFxyXG5cdEhFSUdIVDogNTAwXHJcbn1cclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21tb25zL2NvbnN0YW50cy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_constants__ = __webpack_require__(/*! ./commons/constants */ 0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_player__ = __webpack_require__(/*! ./modules/player */ 2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commons_socket__ = __webpack_require__(/*! ./commons/socket */ 4);\n\r\n\r\n\r\n\r\nconst CANVAS = document.getElementById('game');\r\n\r\nconst sw = __WEBPACK_IMPORTED_MODULE_2__commons_socket__[\"a\" /* default */].getInstance();\r\nlet players = [],\r\n\tme = __WEBPACK_IMPORTED_MODULE_1__modules_player__[\"a\" /* default */].generatePlayer,\r\n\tonMove;\r\n\r\nsw.onopen = () => {\r\n\tsw.send(JSON.stringify({type: 'NEW_PLAYER', payload: me}));\r\n}\r\n\r\nsw.onmessage = ({data}) => {\r\n\tconst parsedData = typeof data === 'string' ? JSON.parse(data) : data;\r\n\tconsole.log(\"parsedData\", parsedData);\r\n\r\n\tswitch(parsedData.type) {\r\n\t\tcase 'GET_PLAYERS':\r\n\t\t\tplayers = parsedData.payload;\r\n\t\t\tbreak;\r\n\t\tcase 'GET_ME':\r\n\t\t\tme = parsedData.payload;\r\n\t\t\tconsole.log(\"me\", me);\r\n\t\tdefault:\r\n\t}\r\n\r\n\tconsole.log('Socket type -', parsedData);\r\n}\r\n\r\nlet ctx, img;\r\n\r\nlet MOVEMENT = {\r\n\tLEFT: false,\r\n\tRIGHT: false,\r\n\tTOP: false,\r\n\tBOTTOM: false\r\n}\r\n\r\n\r\nconst move = () => {\r\n\tif(MOVEMENT.LEFT) {\r\n\t\tme.x -= me.speed;\r\n\t}\r\n\tif(MOVEMENT.RIGHT) {\r\n\t\tme.x += me.speed;\r\n\t}\r\n\tif(MOVEMENT.TOP) {\r\n\t\tme.y += me.speed;\r\n\t}\r\n\tif(MOVEMENT.BOTTOM) {\r\n\t\tme.y -= me.speed;\r\n\t}\r\n\r\n\tif(sw.readyState === sw.OPEN && (MOVEMENT.LEFT || MOVEMENT.RIGHT || MOVEMENT.TOP || MOVEMENT.BOTTOM)) {\r\n\t\t//console.log('opened');\r\n\t\tsw.send(JSON.stringify({type:'PLAYER_MOVE', payload: me}));\r\n\t} else {\r\n\t\t//console.log('not opened');\r\n\t}\r\n}\r\n\r\nwindow.onload = () => {\r\n\tCANVAS.width = __WEBPACK_IMPORTED_MODULE_0__commons_constants__[\"a\" /* BOARD */].WIDTH;\r\n\tCANVAS.height = __WEBPACK_IMPORTED_MODULE_0__commons_constants__[\"a\" /* BOARD */].HEIGHT;\r\n\tctx = CANVAS.getContext('2d');\r\n\r\n\timg = new Image();\r\n\timg.src = 'assets/images/player.png';\r\n\timg.onload = function() {\r\n\r\n\t\tupdate();\r\n\t}\r\n}\r\n\r\ndocument.onkeydown = function(e) {\r\n\tif(e.keyCode === 37) MOVEMENT.LEFT = true;\r\n\tif(e.keyCode === 39) MOVEMENT.RIGHT = true;\r\n\tif(e.keyCode === 38) MOVEMENT.BOTTOM = true;\r\n\tif(e.keyCode === 40) MOVEMENT.TOP = true;\r\n}\r\n\r\ndocument.onkeyup = function(e) {\r\n\tif(e.keyCode === 37) MOVEMENT.LEFT = false;\r\n\tif(e.keyCode === 39) MOVEMENT.RIGHT = false;\r\n\tif(e.keyCode === 38) MOVEMENT.BOTTOM = false;\r\n\tif(e.keyCode === 40) MOVEMENT.TOP = false;\r\n}\r\n\r\n\r\nfunction drawPlayers() {\r\n\t\tconsole.log(\"players\", players);\r\n\tplayers.forEach(player => {\r\n\t\t__WEBPACK_IMPORTED_MODULE_1__modules_player__[\"a\" /* default */].drawPlayer(ctx, img, player);\r\n\t})\r\n}\r\n\r\nconst update = () => {\r\n\r\n//console.log(\"players\", players);\r\n\tclearScreen();\r\n\t//draw();\r\n\tdrawPlayers();\r\n\tmove();\r\n\trequestAnimationFrame(update);\r\n}\r\n\r\n\r\n\r\n\r\nconst clearScreen = () => ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9hcHAuanM/N2FjOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0JPQVJEfSBmcm9tICcuL2NvbW1vbnMvY29uc3RhbnRzJztcclxuaW1wb3J0IHBseXIgZnJvbSAnLi9tb2R1bGVzL3BsYXllcic7XHJcbmltcG9ydCBzb2NrZXQgZnJvbSAnLi9jb21tb25zL3NvY2tldCc7XHJcblxyXG5jb25zdCBDQU5WQVMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xyXG5cclxuY29uc3Qgc3cgPSBzb2NrZXQuZ2V0SW5zdGFuY2UoKTtcclxubGV0IHBsYXllcnMgPSBbXSxcclxuXHRtZSA9IHBseXIuZ2VuZXJhdGVQbGF5ZXIsXHJcblx0b25Nb3ZlO1xyXG5cclxuc3cub25vcGVuID0gKCkgPT4ge1xyXG5cdHN3LnNlbmQoSlNPTi5zdHJpbmdpZnkoe3R5cGU6ICdORVdfUExBWUVSJywgcGF5bG9hZDogbWV9KSk7XHJcbn1cclxuXHJcbnN3Lm9ubWVzc2FnZSA9ICh7ZGF0YX0pID0+IHtcclxuXHRjb25zdCBwYXJzZWREYXRhID0gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShkYXRhKSA6IGRhdGE7XHJcblx0Y29uc29sZS5sb2coXCJwYXJzZWREYXRhXCIsIHBhcnNlZERhdGEpO1xyXG5cclxuXHRzd2l0Y2gocGFyc2VkRGF0YS50eXBlKSB7XHJcblx0XHRjYXNlICdHRVRfUExBWUVSUyc6XHJcblx0XHRcdHBsYXllcnMgPSBwYXJzZWREYXRhLnBheWxvYWQ7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAnR0VUX01FJzpcclxuXHRcdFx0bWUgPSBwYXJzZWREYXRhLnBheWxvYWQ7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwibWVcIiwgbWUpO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHR9XHJcblxyXG5cdGNvbnNvbGUubG9nKCdTb2NrZXQgdHlwZSAtJywgcGFyc2VkRGF0YSk7XHJcbn1cclxuXHJcbmxldCBjdHgsIGltZztcclxuXHJcbmxldCBNT1ZFTUVOVCA9IHtcclxuXHRMRUZUOiBmYWxzZSxcclxuXHRSSUdIVDogZmFsc2UsXHJcblx0VE9QOiBmYWxzZSxcclxuXHRCT1RUT006IGZhbHNlXHJcbn1cclxuXHJcblxyXG5jb25zdCBtb3ZlID0gKCkgPT4ge1xyXG5cdGlmKE1PVkVNRU5ULkxFRlQpIHtcclxuXHRcdG1lLnggLT0gbWUuc3BlZWQ7XHJcblx0fVxyXG5cdGlmKE1PVkVNRU5ULlJJR0hUKSB7XHJcblx0XHRtZS54ICs9IG1lLnNwZWVkO1xyXG5cdH1cclxuXHRpZihNT1ZFTUVOVC5UT1ApIHtcclxuXHRcdG1lLnkgKz0gbWUuc3BlZWQ7XHJcblx0fVxyXG5cdGlmKE1PVkVNRU5ULkJPVFRPTSkge1xyXG5cdFx0bWUueSAtPSBtZS5zcGVlZDtcclxuXHR9XHJcblxyXG5cdGlmKHN3LnJlYWR5U3RhdGUgPT09IHN3Lk9QRU4gJiYgKE1PVkVNRU5ULkxFRlQgfHwgTU9WRU1FTlQuUklHSFQgfHwgTU9WRU1FTlQuVE9QIHx8IE1PVkVNRU5ULkJPVFRPTSkpIHtcclxuXHRcdC8vY29uc29sZS5sb2coJ29wZW5lZCcpO1xyXG5cdFx0c3cuc2VuZChKU09OLnN0cmluZ2lmeSh7dHlwZTonUExBWUVSX01PVkUnLCBwYXlsb2FkOiBtZX0pKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly9jb25zb2xlLmxvZygnbm90IG9wZW5lZCcpO1xyXG5cdH1cclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuXHRDQU5WQVMud2lkdGggPSBCT0FSRC5XSURUSDtcclxuXHRDQU5WQVMuaGVpZ2h0ID0gQk9BUkQuSEVJR0hUO1xyXG5cdGN0eCA9IENBTlZBUy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRpbWcgPSBuZXcgSW1hZ2UoKTtcclxuXHRpbWcuc3JjID0gJ2Fzc2V0cy9pbWFnZXMvcGxheWVyLnBuZyc7XHJcblx0aW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHVwZGF0ZSgpO1xyXG5cdH1cclxufVxyXG5cclxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24oZSkge1xyXG5cdGlmKGUua2V5Q29kZSA9PT0gMzcpIE1PVkVNRU5ULkxFRlQgPSB0cnVlO1xyXG5cdGlmKGUua2V5Q29kZSA9PT0gMzkpIE1PVkVNRU5ULlJJR0hUID0gdHJ1ZTtcclxuXHRpZihlLmtleUNvZGUgPT09IDM4KSBNT1ZFTUVOVC5CT1RUT00gPSB0cnVlO1xyXG5cdGlmKGUua2V5Q29kZSA9PT0gNDApIE1PVkVNRU5ULlRPUCA9IHRydWU7XHJcbn1cclxuXHJcbmRvY3VtZW50Lm9ua2V5dXAgPSBmdW5jdGlvbihlKSB7XHJcblx0aWYoZS5rZXlDb2RlID09PSAzNykgTU9WRU1FTlQuTEVGVCA9IGZhbHNlO1xyXG5cdGlmKGUua2V5Q29kZSA9PT0gMzkpIE1PVkVNRU5ULlJJR0hUID0gZmFsc2U7XHJcblx0aWYoZS5rZXlDb2RlID09PSAzOCkgTU9WRU1FTlQuQk9UVE9NID0gZmFsc2U7XHJcblx0aWYoZS5rZXlDb2RlID09PSA0MCkgTU9WRU1FTlQuVE9QID0gZmFsc2U7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBkcmF3UGxheWVycygpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwicGxheWVyc1wiLCBwbGF5ZXJzKTtcclxuXHRwbGF5ZXJzLmZvckVhY2gocGxheWVyID0+IHtcclxuXHRcdHBseXIuZHJhd1BsYXllcihjdHgsIGltZywgcGxheWVyKTtcclxuXHR9KVxyXG59XHJcblxyXG5jb25zdCB1cGRhdGUgPSAoKSA9PiB7XHJcblxyXG4vL2NvbnNvbGUubG9nKFwicGxheWVyc1wiLCBwbGF5ZXJzKTtcclxuXHRjbGVhclNjcmVlbigpO1xyXG5cdC8vZHJhdygpO1xyXG5cdGRyYXdQbGF5ZXJzKCk7XHJcblx0bW92ZSgpO1xyXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBjbGVhclNjcmVlbiA9ICgpID0+IGN0eC5jbGVhclJlY3QoMCwgMCwgQ0FOVkFTLndpZHRoLCBDQU5WQVMuaGVpZ2h0KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commons_constants__ = __webpack_require__(/*! ../commons/constants */ 0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commons_utils__ = __webpack_require__(/*! ../commons/utils */ 3);\n\r\n\r\n\r\nconst generatePlayer = {\r\n\tx: Object(__WEBPACK_IMPORTED_MODULE_1__commons_utils__[\"a\" /* randomBetween */])(__WEBPACK_IMPORTED_MODULE_0__commons_constants__[\"a\" /* BOARD */].WIDTH),\r\n\ty: Object(__WEBPACK_IMPORTED_MODULE_1__commons_utils__[\"a\" /* randomBetween */])(__WEBPACK_IMPORTED_MODULE_0__commons_constants__[\"a\" /* BOARD */].HEIGHT),\r\n\tspeed: 5\r\n}\r\n\r\nconst drawPlayer = function(ctx, img, player) {\r\n\tctx.drawImage(img, player.x, player.y, 50, 50);\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"a\"] = ({\r\n\tgeneratePlayer,\r\n\tdrawPlayer\r\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL3BsYXllci5qcz9hYWQ3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Qk9BUkR9IGZyb20gJy4uL2NvbW1vbnMvY29uc3RhbnRzJztcclxuaW1wb3J0IHtyYW5kb21CZXR3ZWVufSBmcm9tICcuLi9jb21tb25zL3V0aWxzJztcclxuXHJcbmNvbnN0IGdlbmVyYXRlUGxheWVyID0ge1xyXG5cdHg6IHJhbmRvbUJldHdlZW4oQk9BUkQuV0lEVEgpLFxyXG5cdHk6IHJhbmRvbUJldHdlZW4oQk9BUkQuSEVJR0hUKSxcclxuXHRzcGVlZDogNVxyXG59XHJcblxyXG5jb25zdCBkcmF3UGxheWVyID0gZnVuY3Rpb24oY3R4LCBpbWcsIHBsYXllcikge1xyXG5cdGN0eC5kcmF3SW1hZ2UoaW1nLCBwbGF5ZXIueCwgcGxheWVyLnksIDUwLCA1MCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRnZW5lcmF0ZVBsYXllcixcclxuXHRkcmF3UGxheWVyXHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb2R1bGVzL3BsYXllci5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/*!******************************!*\
  !*** ./src/commons/utils.js ***!
  \******************************/
/*! exports provided: randomBetween */
/*! exports used: randomBetween */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("const randomBetween = (max, min = 0) => Math.floor(Math.random() * max) + min;\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = randomBetween;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb21tb25zL3V0aWxzLmpzPzhmZTYiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHJhbmRvbUJldHdlZW4gPSAobWF4LCBtaW4gPSAwKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbW1vbnMvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/*!*******************************!*\
  !*** ./src/commons/socket.js ***!
  \*******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("const socket = (function() {\r\n\tlet instance;\r\n\r\n\tfunction createInstance() {\r\n\t\tif(window.ReconnectingWebSocket) {\r\n\t\t\treturn new window.ReconnectingWebSocket(`ws://is-offline:8082`);\r\n\t\t} else if(window.WebSocket) {\r\n\t\t\treturn new window.WebSocket(`ws://is-offline:8082`);\r\n\t\t} else {\r\n\t\t\treturn {};\r\n\t\t}\r\n\t}\r\n\r\n\treturn {\r\n\t\tgetInstance: function() {\r\n\t\t\tif(!instance) {\r\n\t\t\t\tinstance = createInstance();\r\n\t\t\t}\r\n\t\t\treturn instance;\r\n\t\t}\r\n\t}\r\n})();\r\n\r\n/* harmony default export */ __webpack_exports__[\"a\"] = (socket);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb21tb25zL3NvY2tldC5qcz8yZThmIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNvY2tldCA9IChmdW5jdGlvbigpIHtcclxuXHRsZXQgaW5zdGFuY2U7XHJcblxyXG5cdGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKCkge1xyXG5cdFx0aWYod2luZG93LlJlY29ubmVjdGluZ1dlYlNvY2tldCkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IHdpbmRvdy5SZWNvbm5lY3RpbmdXZWJTb2NrZXQoYHdzOi8vaXMtb2ZmbGluZTo4MDgyYCk7XHJcblx0XHR9IGVsc2UgaWYod2luZG93LldlYlNvY2tldCkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IHdpbmRvdy5XZWJTb2NrZXQoYHdzOi8vaXMtb2ZmbGluZTo4MDgyYCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4ge307XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0SW5zdGFuY2U6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZighaW5zdGFuY2UpIHtcclxuXHRcdFx0XHRpbnN0YW5jZSA9IGNyZWF0ZUluc3RhbmNlKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGluc3RhbmNlO1xyXG5cdFx0fVxyXG5cdH1cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNvY2tldDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21tb25zL3NvY2tldC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///4\n");

/***/ })
/******/ ]);