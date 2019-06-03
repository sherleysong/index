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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(2);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * 
 */

const matrixToolkit = {
    makeRow(v = 0) {
        const array = new Array(9);
        return array.fill(v)
    },
    makeMatrix(v = 0) {
        return Array.from({
            length: 9
        }, () => this.makeRow(v))
    },
    shuffle(array) {
        for (let i = 0; i < array.length; i++) {
            const j = Math.floor(Math.random() * 8);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    /**
     * 检查当前空格是否可以填写本元素n: 1~9 。
     */
    checkFillable(matrix, n, rowIndex, colIndex) {

        const row = matrix[rowIndex];
        // matrix 每一列 的数据 
        const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
        // 获取对应宫格内的坐标对象值
        const boxIndex = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        // 获取对应宫格内的一组数据 
        const box = boxToolkit.getBoxCell(matrix, boxIndex.box_x);
        // 判断行内，列内，宫格内，不含n 
        for (let i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n) {
                return false;
            }
        }
        return true
    }
}


/**
 * 坐标系工具
 */

const boxToolkit = {
    // 获取matrix中第x个宫格的数组
    getBoxCell(matrix, x) {
        const result = [];
        for (let i = 0; i < 9; i++) {
            const rowIndex = Math.floor(x / 3) * 3 + Math.floor(i / 3);
            const colIndex = x % 3 * 3 + i % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
    // 获取matrix中第colIndex列的数组
    getColumn(matrix, colIndex) {
        const result = [];
        for (let i = 0; i < 9; i++) {
            result.push(matrix[i][colIndex]);
        }
        return result;
    },
    // 行列转换成宫格
    convertToBoxIndex(rowIndex, colIndex) {
        return {
            box_x: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            box_y: rowIndex % 3 * 3 + colIndex % 3
        }
    },
    // 宫格转成行列
    convertfromBoxIndex(box_x, box_y) {
        return {
            rowIndex: Math.floor(box_x / 3) * 3 + Math.floor(box_y / 3),
            colIndex: box_x % 3 * 3 + box_y % 3
        }
    }
}

// 工具集
module.exports = class Toolkit {
    static get matrix() {
        return matrixToolkit
    }
    static get box() {
        return boxToolkit
    }
};

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_grid__ = __webpack_require__(9);
__webpack_require__(7);



const grid = new __WEBPACK_IMPORTED_MODULE_0__js_grid__["a" /* default */]($('#container'));

grid.build();

let targetCell;

$('#container').on("click", "span:not(.fixed)", e => {
    const $cell = $(e.target);
    if($cell[0].nodeName == 'I'){
        // $cell = $cell.parentNode?????/
    }
    $('#container').find('span').removeClass('focus');
    $cell.addClass('focus');
    targetCell = $cell;
})

$('#fillNumbers').on('click', 'span', e => {
    grid.fill(targetCell, e);
})

$('#check').on('click', e => {
    $('#container').find('span').removeClass('focus');
    console.log(grid.check());
    if (grid.check()) {
        alert('成功');
    }
})
$('#reset').on('click', e => {
    $('#container').find('span').removeClass('focus');
    grid.reset();
})
$('#rebuild1').on('click', e => {
    grid.rebuild(1);
})
$('#rebuild2').on('click', e => {
    grid.rebuild(2);
})
$('#rebuild3').on('click', e => {
    grid.rebuild(3);
})
$('#help').on('click', e => {
    grid.help();
})

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(8);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./index.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "body {\n  margin: 0 auto;\n  width: 300px;\n  text-align: center; }\n\nh1 {\n  color: red;\n  margin: 20px; }\n\n.container, .keyboard {\n  border: 2px solid #ca151e;\n  width: 100%;\n  padding: 0; }\n  .container div, .keyboard div {\n    display: flex;\n    border-bottom: 1px solid #333333; }\n    .container div:nth-child(3n), .keyboard div:nth-child(3n) {\n      border-bottom: 2px solid #ca151e; }\n    .container div:last-child, .keyboard div:last-child {\n      border-bottom: none; }\n    .container div span, .keyboard div span {\n      flex: 1;\n      position: relative;\n      width: 30px;\n      height: 30px;\n      line-height: 30px;\n      font-size: 18px;\n      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\n      border-right: 1px solid #333333; }\n      .container div span:nth-child(3n), .keyboard div span:nth-child(3n) {\n        border-right: 2px solid #ca151e; }\n      .container div span:last-child, .keyboard div span:last-child {\n        border-right: none; }\n      .container div span.fixed, .keyboard div span.fixed {\n        background-color: #DDD;\n        font-weight: bold; }\n      .container div span.focus, .keyboard div span.focus {\n        background-color: rgba(243, 11, 11, 0.3); }\n      .container div span i, .keyboard div span i {\n        font-size: 10px;\n        line-height: 10px;\n        text-align: center;\n        position: absolute;\n        height: 10px;\n        width: 10px; }\n        .container div span i.pos_1, .keyboard div span i.pos_1 {\n          top: 0;\n          left: 0; }\n        .container div span i.pos_2, .keyboard div span i.pos_2 {\n          top: 0;\n          left: 10px; }\n        .container div span i.pos_3, .keyboard div span i.pos_3 {\n          top: 0;\n          left: 20px; }\n        .container div span i.pos_4, .keyboard div span i.pos_4 {\n          top: 10px;\n          left: 0; }\n        .container div span i.pos_5, .keyboard div span i.pos_5 {\n          top: 10px;\n          left: 10px; }\n        .container div span i.pos_6, .keyboard div span i.pos_6 {\n          top: 10px;\n          left: 20px; }\n        .container div span i.pos_7, .keyboard div span i.pos_7 {\n          top: 20px;\n          left: 0; }\n        .container div span i.pos_8, .keyboard div span i.pos_8 {\n          top: 20px;\n          left: 10px; }\n        .container div span i.pos_9, .keyboard div span i.pos_9 {\n          top: 20px;\n          left: 20px; }\n\n.keyboard {\n  margin-top: 20px;\n  background-color: rgba(0, 255, 0, 0.3); }\n  .keyboard div span:nth-child(3n) {\n    border-right: 1px solid #333333; }\n\n.dashboard {\n  margin-top: 20px; }\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolkit__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolkit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__toolkit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__check__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__check___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__check__);


const Sudoku = __webpack_require__(11)
const sudoku = new Sudoku();

class Grid {
    constructor(DOM) {
        this._DOM = DOM;
    }
    build(level = 2) {
        sudoku.make(level);
        const matrix = sudoku.puzzleMatrix;
        const cells = matrix.map(rowValues => rowValues
            .map(cellValue => {
                return $('<span>')
                    .text(cellValue == 0 ? '' : cellValue)
                    .addClass(cellValue == 0 ? '' : 'fixed');
            })
        )
        const DOMContent = cells.map(m => {
            return $('<div>').append(m)
        })
        this._DOM.empty().append(DOMContent)
    }
    fill(targetCell, e) {
        if (!targetCell) return;
        const $cell = targetCell;
        const $span = $(e.target);
        if ($span.hasClass('clear')) {
            $cell.text('');
            return
        }
        $cell.text($span.text())
    }
    check() {
        const data = this._DOM.children('div')
            .map((rowIndex, div) => {
                return $(div).children()
                    .map((colIndex, span) => $(span).text())
            })
            .toArray()
            .map($data => $data.toArray())
        const checker = new __WEBPACK_IMPORTED_MODULE_1__check___default.a(data);
        checker.check();
        const marks = checker._matrixMarks;
        let _boolean = true;
        marks.forEach((rows, i) => {
            rows.forEach((cell, j) => {
                // 检查不成功，进行标记
                if (!cell) {
                    this._DOM.children().eq(i).children().eq(j).addClass('focus');
                    _boolean = false;
                }
            })
        })
        if(_boolean) return _boolean
    }
    reset() {
        this._DOM.find("span:not(.fixed)").text('')
    }
    rebuild(level) {
        this.build(level);
    }
    help() {
        console.log('help start ...');
        const pm = sudoku.puzzleMatrix;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let cellValue = pm[i][j];

                //对没有填数据的地方进行填充

                if (cellValue == 0) {
                    // 当前单元格可以填的数字
                    let possibleNumbers = []

                    const colArr = __WEBPACK_IMPORTED_MODULE_0__toolkit___default.a.box.getColumn(pm, j)
                    const boxArr = __WEBPACK_IMPORTED_MODULE_0__toolkit___default.a.box.getBoxCell(pm, __WEBPACK_IMPORTED_MODULE_0__toolkit___default.a.box.convertToBoxIndex(i, j).box_x)

                    for (var x = 1; x <= 9; x++) {
                        // 非当前单元格所在行列宫的数字
                        if (colArr.indexOf(x) == -1 && boxArr.indexOf(x) == -1 && pm[i].indexOf(x) == -1) {
                            possibleNumbers.push(x);
                        }
                    }
                    if (possibleNumbers.length > 1) {

                        for (let _i = 0; _i < possibleNumbers.length; _i++) {
                            possibleNumbers[_i] = '<i class="pos_' + possibleNumbers[_i] + '" > ' + possibleNumbers[_i] + '</i>'
                        }
                    }
                    this._DOM.find('div').eq(i).find('span').eq(j).html(possibleNumbers.join(''))
                }
            }
        }

    }

}

/* harmony default export */ __webpack_exports__["a"] = (Grid);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

function checkArray(array) {
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);
    for (let i = 0; i < length; i++) {
        if (!marks[i]) {
            continue;
        }
        
        if (array[i].length > 1) {
            marks[i] = false;
            continue
        }

        const v = array[i];


        if (!v) {
            marks[i] = false;
            continue
        }

        for (let j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false
            }
        }
    }
    return marks
}

const Tookit = __webpack_require__(3)
/**
 * 输入： matrix 数独数据
 * 处理： 对matrix 行/列/宫分别检查写入marks
 * 输出： 检查是否成功/marks
 */

module.exports = class Checker {
    constructor(matrix) {
        this._matrix = matrix;
        this._matrixMarks = Tookit.matrix.makeMatrix(true)
    }

    check() {
        console.log('check start ... ')
        this.checkRows();
        this.checkColums();
        this.checkCells();
    }

    checkRows() {
        console.log('checkRows ... ')
        this._matrix.forEach((element, i) => {
            this._matrixMarks[i] = checkArray(element);
        })
    }

    checkColums() {
        console.log('checkColums ... ')
        // var _result = [];
        for (let i = 0; i < 9; i++) {
            var col = [];
            for (let j = 0; j < 9; j++) {
                col.push(this._matrix[j][i]);
            }
            checkArray(col).forEach((element, n) => {
                if (!element) {
                    this._matrixMarks[n][i] = element
                }
            })
        }
        
    }

    checkCells() {
        console.log('check Cells ..... ');
        for (let i = 0; i < 9; i++) {
            checkArray(Tookit.box.getBoxCell(this._matrix, i)).forEach((element, n) => {
                if (!element) {
                    const arr = Tookit.box.convertfromBoxIndex(i, n)
                    this._matrixMarks[arr.rowIndex][arr.colIndex] = element
                }
            })
        }
    }

}


// const Generator = require('./generator')
// const gen = new Generator();
// gen.generate();
// const matrix = gen.matrix;
// matrix[0][0] = matrix[1][1];
// const checker = new Checker(matrix);
// checker.check();

// console.log('checker._matrix');
// console.log(checker._matrix);
// console.log('checker._matrixMarks')
// console.log(checker._matrixMarks)
// console.log(test1);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Generator = __webpack_require__(12)
module.exports = class sudoku {
    constructor() {
        const gen = new Generator();
        gen.generate();
        this.solutionMatrix = gen.matrix
    }

    make(level = 2) {
        const pullMatrix = this.solutionMatrix.map(row => {
            return row.map(cell => Math.random() * 9 < level*2 ? '0' : cell)
        });
        this.puzzleMatrix = pullMatrix
    }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const Toolkit = __webpack_require__(3);

module.exports = class Generator {
    generate() {
        while (!this.internalGenerate()) {
        }
    }

    internalGenerate() {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Toolkit.matrix.shuffle(row));

        for (let i = 1; i <= 9; i++) {
            if (!this.fillNumber(i))
                return false
        }
        return true;
    };

    fillNumber(n) {
        return this.fillRow(n, 0);
    }
    fillRow(n, rowIndex) {
        if (rowIndex > 8) return true;
        const row = this.matrix[rowIndex];
        for (let i = 0; i < 9; i++) {
            const colIndex = this.orders[rowIndex][i];
            // 如果当前位置有值了，
            if (row[colIndex]) continue;
            // 如果检查行/列/宫已有，
            if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) continue;
            // 把n写进去
            row[colIndex] = n;

            // 去下一行填n，如果没填进去，就继续寻找当前行下一个位置
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue
            }
            return true
        }
        return false
    }
};

// const gen = new Generator();
// gen.generate();
// const matrix = gen.matrix;
// console.log(matrix);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTUyOGQ1MmNiZjI1NDNjOWE1M2YiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9zdWRva3UvanMvdG9vbGtpdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Vkb2t1L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdWRva3Uvc2Nzcy9pbmRleC5zY3NzPzhmMTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1ZG9rdS9zY3NzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1ZG9rdS9qcy9ncmlkLmpzIiwid2VicGFjazovLy8uL3NyYy9zdWRva3UvanMvY2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1ZG9rdS9qcy9zdWRva3UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1ZG9rdS9qcy9nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7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QUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDdFhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNI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QUVBLGVBQWUsbUJBQU8sQ0FBQyxDQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQSwyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQjs7Ozs7O0FDdEdBLGtCQUFrQixtQkFBTyxDQUFDLEVBQWE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQzs7Ozs7O0FDZEEsZ0JBQWdCLG1CQUFPLENBQUMsQ0FBVzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixRQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUIiLCJmaWxlIjoic3Vkb2t1L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTUyOGQ1MmNiZjI1NDNjOWE1M2YiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKipcbiAqIFxuICovXG5cbmNvbnN0IG1hdHJpeFRvb2xraXQgPSB7XG4gICAgbWFrZVJvdyh2ID0gMCkge1xuICAgICAgICBjb25zdCBhcnJheSA9IG5ldyBBcnJheSg5KTtcbiAgICAgICAgcmV0dXJuIGFycmF5LmZpbGwodilcbiAgICB9LFxuICAgIG1ha2VNYXRyaXgodiA9IDApIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oe1xuICAgICAgICAgICAgbGVuZ3RoOiA5XG4gICAgICAgIH0sICgpID0+IHRoaXMubWFrZVJvdyh2KSlcbiAgICB9LFxuICAgIHNodWZmbGUoYXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAgICAgW2FycmF5W2ldLCBhcnJheVtqXV0gPSBbYXJyYXlbal0sIGFycmF5W2ldXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDmo4Dmn6XlvZPliY3nqbrmoLzmmK/lkKblj6/ku6XloavlhpnmnKzlhYPntKBuOiAxfjkg44CCXG4gICAgICovXG4gICAgY2hlY2tGaWxsYWJsZShtYXRyaXgsIG4sIHJvd0luZGV4LCBjb2xJbmRleCkge1xuXG4gICAgICAgIGNvbnN0IHJvdyA9IG1hdHJpeFtyb3dJbmRleF07XG4gICAgICAgIC8vIG1hdHJpeCDmr4/kuIDliJcg55qE5pWw5o2uIFxuICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLm1ha2VSb3coKS5tYXAoKHYsIGkpID0+IG1hdHJpeFtpXVtjb2xJbmRleF0pO1xuICAgICAgICAvLyDojrflj5blr7nlupTlrqvmoLzlhoXnmoTlnZDmoIflr7nosaHlgLxcbiAgICAgICAgY29uc3QgYm94SW5kZXggPSBib3hUb29sa2l0LmNvbnZlcnRUb0JveEluZGV4KHJvd0luZGV4LCBjb2xJbmRleCk7XG4gICAgICAgIC8vIOiOt+WPluWvueW6lOWuq+agvOWGheeahOS4gOe7hOaVsOaNriBcbiAgICAgICAgY29uc3QgYm94ID0gYm94VG9vbGtpdC5nZXRCb3hDZWxsKG1hdHJpeCwgYm94SW5kZXguYm94X3gpO1xuICAgICAgICAvLyDliKTmlq3ooYzlhoXvvIzliJflhoXvvIzlrqvmoLzlhoXvvIzkuI3lkKtuIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJvd1tpXSA9PT0gbiB8fCBjb2x1bW5baV0gPT09IG4gfHwgYm94W2ldID09PSBuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxufVxuXG5cbi8qKlxuICog5Z2Q5qCH57O75bel5YW3XG4gKi9cblxuY29uc3QgYm94VG9vbGtpdCA9IHtcbiAgICAvLyDojrflj5ZtYXRyaXjkuK3nrKx45Liq5a6r5qC855qE5pWw57uEXG4gICAgZ2V0Qm94Q2VsbChtYXRyaXgsIHgpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3dJbmRleCA9IE1hdGguZmxvb3IoeCAvIDMpICogMyArIE1hdGguZmxvb3IoaSAvIDMpO1xuICAgICAgICAgICAgY29uc3QgY29sSW5kZXggPSB4ICUgMyAqIDMgKyBpICUgMztcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG1hdHJpeFtyb3dJbmRleF1bY29sSW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgLy8g6I635Y+WbWF0cml45Lit56ysY29sSW5kZXjliJfnmoTmlbDnu4RcbiAgICBnZXRDb2x1bW4obWF0cml4LCBjb2xJbmRleCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG1hdHJpeFtpXVtjb2xJbmRleF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICAvLyDooYzliJfovazmjaLmiJDlrqvmoLxcbiAgICBjb252ZXJ0VG9Cb3hJbmRleChyb3dJbmRleCwgY29sSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJveF94OiBNYXRoLmZsb29yKHJvd0luZGV4IC8gMykgKiAzICsgTWF0aC5mbG9vcihjb2xJbmRleCAvIDMpLFxuICAgICAgICAgICAgYm94X3k6IHJvd0luZGV4ICUgMyAqIDMgKyBjb2xJbmRleCAlIDNcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8g5a6r5qC86L2s5oiQ6KGM5YiXXG4gICAgY29udmVydGZyb21Cb3hJbmRleChib3hfeCwgYm94X3kpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvd0luZGV4OiBNYXRoLmZsb29yKGJveF94IC8gMykgKiAzICsgTWF0aC5mbG9vcihib3hfeSAvIDMpLFxuICAgICAgICAgICAgY29sSW5kZXg6IGJveF94ICUgMyAqIDMgKyBib3hfeSAlIDNcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8g5bel5YW36ZuGXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFRvb2xraXQge1xuICAgIHN0YXRpYyBnZXQgbWF0cml4KCkge1xuICAgICAgICByZXR1cm4gbWF0cml4VG9vbGtpdFxuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGJveCgpIHtcbiAgICAgICAgcmV0dXJuIGJveFRvb2xraXRcbiAgICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N1ZG9rdS9qcy90b29sa2l0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vc2Nzcy9pbmRleC5zY3NzJyk7XG5cbmltcG9ydCBHcmlkIGZyb20gJy4vanMvZ3JpZCc7XG5cbmNvbnN0IGdyaWQgPSBuZXcgR3JpZCgkKCcjY29udGFpbmVyJykpO1xuXG5ncmlkLmJ1aWxkKCk7XG5cbmxldCB0YXJnZXRDZWxsO1xuXG4kKCcjY29udGFpbmVyJykub24oXCJjbGlja1wiLCBcInNwYW46bm90KC5maXhlZClcIiwgZSA9PiB7XG4gICAgY29uc3QgJGNlbGwgPSAkKGUudGFyZ2V0KTtcbiAgICBpZigkY2VsbFswXS5ub2RlTmFtZSA9PSAnSScpe1xuICAgICAgICAvLyAkY2VsbCA9ICRjZWxsLnBhcmVudE5vZGU/Pz8/Py9cbiAgICB9XG4gICAgJCgnI2NvbnRhaW5lcicpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgICAkY2VsbC5hZGRDbGFzcygnZm9jdXMnKTtcbiAgICB0YXJnZXRDZWxsID0gJGNlbGw7XG59KVxuXG4kKCcjZmlsbE51bWJlcnMnKS5vbignY2xpY2snLCAnc3BhbicsIGUgPT4ge1xuICAgIGdyaWQuZmlsbCh0YXJnZXRDZWxsLCBlKTtcbn0pXG5cbiQoJyNjaGVjaycpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICQoJyNjb250YWluZXInKS5maW5kKCdzcGFuJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgY29uc29sZS5sb2coZ3JpZC5jaGVjaygpKTtcbiAgICBpZiAoZ3JpZC5jaGVjaygpKSB7XG4gICAgICAgIGFsZXJ0KCfmiJDlip8nKTtcbiAgICB9XG59KVxuJCgnI3Jlc2V0Jykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgJCgnI2NvbnRhaW5lcicpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgICBncmlkLnJlc2V0KCk7XG59KVxuJCgnI3JlYnVpbGQxJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgZ3JpZC5yZWJ1aWxkKDEpO1xufSlcbiQoJyNyZWJ1aWxkMicpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgIGdyaWQucmVidWlsZCgyKTtcbn0pXG4kKCcjcmVidWlsZDMnKS5vbignY2xpY2snLCBlID0+IHtcbiAgICBncmlkLnJlYnVpbGQoMyk7XG59KVxuJCgnI2hlbHAnKS5vbignY2xpY2snLCBlID0+IHtcbiAgICBncmlkLmhlbHAoKTtcbn0pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3Vkb2t1L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N1ZG9rdS9zY3NzL2luZGV4LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuaDEge1xcbiAgY29sb3I6IHJlZDtcXG4gIG1hcmdpbjogMjBweDsgfVxcblxcbi5jb250YWluZXIsIC5rZXlib2FyZCB7XFxuICBib3JkZXI6IDJweCBzb2xpZCAjY2ExNTFlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAwOyB9XFxuICAuY29udGFpbmVyIGRpdiwgLmtleWJvYXJkIGRpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzMzMzMzOyB9XFxuICAgIC5jb250YWluZXIgZGl2Om50aC1jaGlsZCgzbiksIC5rZXlib2FyZCBkaXY6bnRoLWNoaWxkKDNuKSB7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNjYTE1MWU7IH1cXG4gICAgLmNvbnRhaW5lciBkaXY6bGFzdC1jaGlsZCwgLmtleWJvYXJkIGRpdjpsYXN0LWNoaWxkIHtcXG4gICAgICBib3JkZXItYm90dG9tOiBub25lOyB9XFxuICAgIC5jb250YWluZXIgZGl2IHNwYW4sIC5rZXlib2FyZCBkaXYgc3BhbiB7XFxuICAgICAgZmxleDogMTtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgd2lkdGg6IDMwcHg7XFxuICAgICAgaGVpZ2h0OiAzMHB4O1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgICBmb250LWZhbWlseTogJ0dpbGwgU2FucycsICdHaWxsIFNhbnMgTVQnLCBDYWxpYnJpLCAnVHJlYnVjaGV0IE1TJywgc2Fucy1zZXJpZjtcXG4gICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMzMzMzMzOyB9XFxuICAgICAgLmNvbnRhaW5lciBkaXYgc3BhbjpudGgtY2hpbGQoM24pLCAua2V5Ym9hcmQgZGl2IHNwYW46bnRoLWNoaWxkKDNuKSB7XFxuICAgICAgICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCAjY2ExNTFlOyB9XFxuICAgICAgLmNvbnRhaW5lciBkaXYgc3BhbjpsYXN0LWNoaWxkLCAua2V5Ym9hcmQgZGl2IHNwYW46bGFzdC1jaGlsZCB7XFxuICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7IH1cXG4gICAgICAuY29udGFpbmVyIGRpdiBzcGFuLmZpeGVkLCAua2V5Ym9hcmQgZGl2IHNwYW4uZml4ZWQge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0RERDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuICAgICAgLmNvbnRhaW5lciBkaXYgc3Bhbi5mb2N1cywgLmtleWJvYXJkIGRpdiBzcGFuLmZvY3VzIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQzLCAxMSwgMTEsIDAuMyk7IH1cXG4gICAgICAuY29udGFpbmVyIGRpdiBzcGFuIGksIC5rZXlib2FyZCBkaXYgc3BhbiBpIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxMHB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xcbiAgICAgICAgd2lkdGg6IDEwcHg7IH1cXG4gICAgICAgIC5jb250YWluZXIgZGl2IHNwYW4gaS5wb3NfMSwgLmtleWJvYXJkIGRpdiBzcGFuIGkucG9zXzEge1xcbiAgICAgICAgICB0b3A6IDA7XFxuICAgICAgICAgIGxlZnQ6IDA7IH1cXG4gICAgICAgIC5jb250YWluZXIgZGl2IHNwYW4gaS5wb3NfMiwgLmtleWJvYXJkIGRpdiBzcGFuIGkucG9zXzIge1xcbiAgICAgICAgICB0b3A6IDA7XFxuICAgICAgICAgIGxlZnQ6IDEwcHg7IH1cXG4gICAgICAgIC5jb250YWluZXIgZGl2IHNwYW4gaS5wb3NfMywgLmtleWJvYXJkIGRpdiBzcGFuIGkucG9zXzMge1xcbiAgICAgICAgICB0b3A6IDA7XFxuICAgICAgICAgIGxlZnQ6IDIwcHg7IH1cXG4gICAgICAgIC5jb250YWluZXIgZGl2IHNwYW4gaS5wb3NfNCwgLmtleWJvYXJkIGRpdiBzcGFuIGkucG9zXzQge1xcbiAgICAgICAgICB0b3A6IDEwcHg7XFxuICAgICAgICAgIGxlZnQ6IDA7IH1cXG4gICAgICAgIC5jb250YWluZXIgZGl2IHNwYW4gaS5wb3NfNSwgLmtleWJvYXJkIGRpdiBzcGFuIGkucG9zXzUge1xcbiAgICAgICAgICB0b3A6IDEwcHg7XFxuICAgICAgICAgIGxlZnQ6IDEwcHg7IH1cXG4gICAgICAgIC5jb250YWluZXIgZGl2IHNwYW4gaS5wb3NfNiwgLmtleWJvYXJkIGRpdiBzcGFuIGkucG9zXzYge1xcbiAgICAgICAgICB0b3A6IDEwcHg7XFxuICAgICAgICAgIGxlZnQ6IDIwcHg7IH1cXG4gICAgICAgIC5jb250YWluZXIgZGl2IHNwYW4gaS5wb3NfNywgLmtleWJvYXJkIGRpdiBzcGFuIGkucG9zXzcge1xcbiAgICAgICAgICB0b3A6IDIwcHg7XFxuICAgICAgICAgIGxlZnQ6IDA7IH1cXG4gICAgICAgIC5jb250YWluZXIgZGl2IHNwYW4gaS5wb3NfOCwgLmtleWJvYXJkIGRpdiBzcGFuIGkucG9zXzgge1xcbiAgICAgICAgICB0b3A6IDIwcHg7XFxuICAgICAgICAgIGxlZnQ6IDEwcHg7IH1cXG4gICAgICAgIC5jb250YWluZXIgZGl2IHNwYW4gaS5wb3NfOSwgLmtleWJvYXJkIGRpdiBzcGFuIGkucG9zXzkge1xcbiAgICAgICAgICB0b3A6IDIwcHg7XFxuICAgICAgICAgIGxlZnQ6IDIwcHg7IH1cXG5cXG4ua2V5Ym9hcmQge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMjU1LCAwLCAwLjMpOyB9XFxuICAua2V5Ym9hcmQgZGl2IHNwYW46bnRoLWNoaWxkKDNuKSB7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICMzMzMzMzM7IH1cXG5cXG4uZGFzaGJvYXJkIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvc3Vkb2t1L3Njc3MvaW5kZXguc2Nzc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgVG9vbGtpdCBmcm9tICcuL3Rvb2xraXQnXG5pbXBvcnQgQ2hlY2tlciBmcm9tICcuL2NoZWNrJ1xuY29uc3QgU3Vkb2t1ID0gcmVxdWlyZSgnLi9zdWRva3UnKVxuY29uc3Qgc3Vkb2t1ID0gbmV3IFN1ZG9rdSgpO1xuXG5jbGFzcyBHcmlkIHtcbiAgICBjb25zdHJ1Y3RvcihET00pIHtcbiAgICAgICAgdGhpcy5fRE9NID0gRE9NO1xuICAgIH1cbiAgICBidWlsZChsZXZlbCA9IDIpIHtcbiAgICAgICAgc3Vkb2t1Lm1ha2UobGV2ZWwpO1xuICAgICAgICBjb25zdCBtYXRyaXggPSBzdWRva3UucHV6emxlTWF0cml4O1xuICAgICAgICBjb25zdCBjZWxscyA9IG1hdHJpeC5tYXAocm93VmFsdWVzID0+IHJvd1ZhbHVlc1xuICAgICAgICAgICAgLm1hcChjZWxsVmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAkKCc8c3Bhbj4nKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChjZWxsVmFsdWUgPT0gMCA/ICcnIDogY2VsbFZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoY2VsbFZhbHVlID09IDAgPyAnJyA6ICdmaXhlZCcpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICBjb25zdCBET01Db250ZW50ID0gY2VsbHMubWFwKG0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuICQoJzxkaXY+JykuYXBwZW5kKG0pXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuX0RPTS5lbXB0eSgpLmFwcGVuZChET01Db250ZW50KVxuICAgIH1cbiAgICBmaWxsKHRhcmdldENlbGwsIGUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRDZWxsKSByZXR1cm47XG4gICAgICAgIGNvbnN0ICRjZWxsID0gdGFyZ2V0Q2VsbDtcbiAgICAgICAgY29uc3QgJHNwYW4gPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgaWYgKCRzcGFuLmhhc0NsYXNzKCdjbGVhcicpKSB7XG4gICAgICAgICAgICAkY2VsbC50ZXh0KCcnKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgICRjZWxsLnRleHQoJHNwYW4udGV4dCgpKVxuICAgIH1cbiAgICBjaGVjaygpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX0RPTS5jaGlsZHJlbignZGl2JylcbiAgICAgICAgICAgIC5tYXAoKHJvd0luZGV4LCBkaXYpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChkaXYpLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoY29sSW5kZXgsIHNwYW4pID0+ICQoc3BhbikudGV4dCgpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAgIC5tYXAoJGRhdGEgPT4gJGRhdGEudG9BcnJheSgpKVxuICAgICAgICBjb25zdCBjaGVja2VyID0gbmV3IENoZWNrZXIoZGF0YSk7XG4gICAgICAgIGNoZWNrZXIuY2hlY2soKTtcbiAgICAgICAgY29uc3QgbWFya3MgPSBjaGVja2VyLl9tYXRyaXhNYXJrcztcbiAgICAgICAgbGV0IF9ib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgbWFya3MuZm9yRWFjaCgocm93cywgaSkgPT4ge1xuICAgICAgICAgICAgcm93cy5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g5qOA5p+l5LiN5oiQ5Yqf77yM6L+b6KGM5qCH6K6wXG4gICAgICAgICAgICAgICAgaWYgKCFjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0RPTS5jaGlsZHJlbigpLmVxKGkpLmNoaWxkcmVuKCkuZXEoaikuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAgICAgICAgICAgICAgIF9ib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYoX2Jvb2xlYW4pIHJldHVybiBfYm9vbGVhblxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5fRE9NLmZpbmQoXCJzcGFuOm5vdCguZml4ZWQpXCIpLnRleHQoJycpXG4gICAgfVxuICAgIHJlYnVpbGQobGV2ZWwpIHtcbiAgICAgICAgdGhpcy5idWlsZChsZXZlbCk7XG4gICAgfVxuICAgIGhlbHAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZWxwIHN0YXJ0IC4uLicpO1xuICAgICAgICBjb25zdCBwbSA9IHN1ZG9rdS5wdXp6bGVNYXRyaXg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDk7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsVmFsdWUgPSBwbVtpXVtqXTtcblxuICAgICAgICAgICAgICAgIC8v5a+55rKh5pyJ5aGr5pWw5o2u55qE5Zyw5pa56L+b6KGM5aGr5YWFXG5cbiAgICAgICAgICAgICAgICBpZiAoY2VsbFZhbHVlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5b2T5YmN5Y2V5YWD5qC85Y+v5Lul5aGr55qE5pWw5a2XXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NzaWJsZU51bWJlcnMgPSBbXVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbEFyciA9IFRvb2xraXQuYm94LmdldENvbHVtbihwbSwgailcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm94QXJyID0gVG9vbGtpdC5ib3guZ2V0Qm94Q2VsbChwbSwgVG9vbGtpdC5ib3guY29udmVydFRvQm94SW5kZXgoaSwgaikuYm94X3gpXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDE7IHggPD0gOTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpnZ7lvZPliY3ljZXlhYPmoLzmiYDlnKjooYzliJflrqvnmoTmlbDlrZdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xBcnIuaW5kZXhPZih4KSA9PSAtMSAmJiBib3hBcnIuaW5kZXhPZih4KSA9PSAtMSAmJiBwbVtpXS5pbmRleE9mKHgpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVOdW1iZXJzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3NpYmxlTnVtYmVycy5sZW5ndGggPiAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCBwb3NzaWJsZU51bWJlcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVOdW1iZXJzW19pXSA9ICc8aSBjbGFzcz1cInBvc18nICsgcG9zc2libGVOdW1iZXJzW19pXSArICdcIiA+ICcgKyBwb3NzaWJsZU51bWJlcnNbX2ldICsgJzwvaT4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fRE9NLmZpbmQoJ2RpdicpLmVxKGkpLmZpbmQoJ3NwYW4nKS5lcShqKS5odG1sKHBvc3NpYmxlTnVtYmVycy5qb2luKCcnKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHcmlkO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N1ZG9rdS9qcy9ncmlkLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGNoZWNrQXJyYXkoYXJyYXkpIHtcbiAgICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgY29uc3QgbWFya3MgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBtYXJrcy5maWxsKHRydWUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFtYXJrc1tpXSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChhcnJheVtpXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBtYXJrc1tpXSA9IGZhbHNlO1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHYgPSBhcnJheVtpXTtcblxuXG4gICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgbWFya3NbaV0gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKHYgPT09IGFycmF5W2pdKSB7XG4gICAgICAgICAgICAgICAgbWFya3NbaV0gPSBtYXJrc1tqXSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcmtzXG59XG5cbmNvbnN0IFRvb2tpdCA9IHJlcXVpcmUoJy4vdG9vbGtpdCcpXG4vKipcbiAqIOi+k+WFpe+8miBtYXRyaXgg5pWw54us5pWw5o2uXG4gKiDlpITnkIbvvJog5a+5bWF0cml4IOihjC/liJcv5a6r5YiG5Yir5qOA5p+l5YaZ5YWlbWFya3NcbiAqIOi+k+WHuu+8miDmo4Dmn6XmmK/lkKbmiJDlip8vbWFya3NcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIENoZWNrZXIge1xuICAgIGNvbnN0cnVjdG9yKG1hdHJpeCkge1xuICAgICAgICB0aGlzLl9tYXRyaXggPSBtYXRyaXg7XG4gICAgICAgIHRoaXMuX21hdHJpeE1hcmtzID0gVG9va2l0Lm1hdHJpeC5tYWtlTWF0cml4KHRydWUpXG4gICAgfVxuXG4gICAgY2hlY2soKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVjayBzdGFydCAuLi4gJylcbiAgICAgICAgdGhpcy5jaGVja1Jvd3MoKTtcbiAgICAgICAgdGhpcy5jaGVja0NvbHVtcygpO1xuICAgICAgICB0aGlzLmNoZWNrQ2VsbHMoKTtcbiAgICB9XG5cbiAgICBjaGVja1Jvd3MoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja1Jvd3MgLi4uICcpXG4gICAgICAgIHRoaXMuX21hdHJpeC5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tYXRyaXhNYXJrc1tpXSA9IGNoZWNrQXJyYXkoZWxlbWVudCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2hlY2tDb2x1bXMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja0NvbHVtcyAuLi4gJylcbiAgICAgICAgLy8gdmFyIF9yZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjb2wgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgOTsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29sLnB1c2godGhpcy5fbWF0cml4W2pdW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoZWNrQXJyYXkoY29sKS5mb3JFYWNoKChlbGVtZW50LCBuKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdHJpeE1hcmtzW25dW2ldID0gZWxlbWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgY2hlY2tDZWxscygpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrIENlbGxzIC4uLi4uICcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICAgICAgY2hlY2tBcnJheShUb29raXQuYm94LmdldEJveENlbGwodGhpcy5fbWF0cml4LCBpKSkuZm9yRWFjaCgoZWxlbWVudCwgbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnIgPSBUb29raXQuYm94LmNvbnZlcnRmcm9tQm94SW5kZXgoaSwgbilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0cml4TWFya3NbYXJyLnJvd0luZGV4XVthcnIuY29sSW5kZXhdID0gZWxlbWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4vLyBjb25zdCBHZW5lcmF0b3IgPSByZXF1aXJlKCcuL2dlbmVyYXRvcicpXG4vLyBjb25zdCBnZW4gPSBuZXcgR2VuZXJhdG9yKCk7XG4vLyBnZW4uZ2VuZXJhdGUoKTtcbi8vIGNvbnN0IG1hdHJpeCA9IGdlbi5tYXRyaXg7XG4vLyBtYXRyaXhbMF1bMF0gPSBtYXRyaXhbMV1bMV07XG4vLyBjb25zdCBjaGVja2VyID0gbmV3IENoZWNrZXIobWF0cml4KTtcbi8vIGNoZWNrZXIuY2hlY2soKTtcblxuLy8gY29uc29sZS5sb2coJ2NoZWNrZXIuX21hdHJpeCcpO1xuLy8gY29uc29sZS5sb2coY2hlY2tlci5fbWF0cml4KTtcbi8vIGNvbnNvbGUubG9nKCdjaGVja2VyLl9tYXRyaXhNYXJrcycpXG4vLyBjb25zb2xlLmxvZyhjaGVja2VyLl9tYXRyaXhNYXJrcylcbi8vIGNvbnNvbGUubG9nKHRlc3QxKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdWRva3UvanMvY2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IEdlbmVyYXRvciA9IHJlcXVpcmUoJy4vZ2VuZXJhdG9yJylcbm1vZHVsZS5leHBvcnRzID0gY2xhc3Mgc3Vkb2t1IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3QgZ2VuID0gbmV3IEdlbmVyYXRvcigpO1xuICAgICAgICBnZW4uZ2VuZXJhdGUoKTtcbiAgICAgICAgdGhpcy5zb2x1dGlvbk1hdHJpeCA9IGdlbi5tYXRyaXhcbiAgICB9XG5cbiAgICBtYWtlKGxldmVsID0gMikge1xuICAgICAgICBjb25zdCBwdWxsTWF0cml4ID0gdGhpcy5zb2x1dGlvbk1hdHJpeC5tYXAocm93ID0+IHtcbiAgICAgICAgICAgIHJldHVybiByb3cubWFwKGNlbGwgPT4gTWF0aC5yYW5kb20oKSAqIDkgPCBsZXZlbCoyID8gJzAnIDogY2VsbClcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHV6emxlTWF0cml4ID0gcHVsbE1hdHJpeFxuICAgIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdWRva3UvanMvc3Vkb2t1LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBUb29sa2l0ID0gcmVxdWlyZSgnLi90b29sa2l0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgR2VuZXJhdG9yIHtcbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgICAgd2hpbGUgKCF0aGlzLmludGVybmFsR2VuZXJhdGUoKSkge1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW50ZXJuYWxHZW5lcmF0ZSgpIHtcbiAgICAgICAgdGhpcy5tYXRyaXggPSBUb29sa2l0Lm1hdHJpeC5tYWtlTWF0cml4KCk7XG4gICAgICAgIHRoaXMub3JkZXJzID0gVG9vbGtpdC5tYXRyaXgubWFrZU1hdHJpeCgpXG4gICAgICAgICAgICAubWFwKHJvdyA9PiByb3cubWFwKCh2LCBpKSA9PiBpKSlcbiAgICAgICAgICAgIC5tYXAocm93ID0+IFRvb2xraXQubWF0cml4LnNodWZmbGUocm93KSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gOTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlsbE51bWJlcihpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgZmlsbE51bWJlcihuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGxSb3cobiwgMCk7XG4gICAgfVxuICAgIGZpbGxSb3cobiwgcm93SW5kZXgpIHtcbiAgICAgICAgaWYgKHJvd0luZGV4ID4gOCkgcmV0dXJuIHRydWU7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMubWF0cml4W3Jvd0luZGV4XTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbEluZGV4ID0gdGhpcy5vcmRlcnNbcm93SW5kZXhdW2ldO1xuICAgICAgICAgICAgLy8g5aaC5p6c5b2T5YmN5L2N572u5pyJ5YC85LqG77yMXG4gICAgICAgICAgICBpZiAocm93W2NvbEluZGV4XSkgY29udGludWU7XG4gICAgICAgICAgICAvLyDlpoLmnpzmo4Dmn6XooYwv5YiXL+Wuq+W3suacie+8jFxuICAgICAgICAgICAgaWYgKCFUb29sa2l0Lm1hdHJpeC5jaGVja0ZpbGxhYmxlKHRoaXMubWF0cml4LCBuLCByb3dJbmRleCwgY29sSW5kZXgpKSBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIOaKim7lhpnov5vljrtcbiAgICAgICAgICAgIHJvd1tjb2xJbmRleF0gPSBuO1xuXG4gICAgICAgICAgICAvLyDljrvkuIvkuIDooYzloatu77yM5aaC5p6c5rKh5aGr6L+b5Y6777yM5bCx57un57ut5a+75om+5b2T5YmN6KGM5LiL5LiA5Liq5L2N572uXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlsbFJvdyhuLCByb3dJbmRleCArIDEpKSB7XG4gICAgICAgICAgICAgICAgcm93W2NvbEluZGV4XSA9IDA7XG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxufTtcblxuLy8gY29uc3QgZ2VuID0gbmV3IEdlbmVyYXRvcigpO1xuLy8gZ2VuLmdlbmVyYXRlKCk7XG4vLyBjb25zdCBtYXRyaXggPSBnZW4ubWF0cml4O1xuLy8gY29uc29sZS5sb2cobWF0cml4KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdWRva3UvanMvZ2VuZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9