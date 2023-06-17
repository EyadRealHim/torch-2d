/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("\nconst canvas = document.querySelector(\"canvas\");\nconst gl = canvas.getContext(\"webgl\");\nif (!gl)\n    throw new Error(\"Webgl isnt supported\");\nlet height;\nlet width;\n{\n    gl.canvas.height = window.innerHeight;\n    gl.canvas.width = window.innerWidth;\n    const isElem = gl.canvas instanceof HTMLCanvasElement;\n    height = isElem ? gl.canvas.clientHeight : gl.canvas.height;\n    width = isElem ? gl.canvas.clientWidth : gl.canvas.width;\n    gl.viewport(0, 0, width, height);\n}\n\n\n//# sourceURL=webpack://learn-webgl/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;