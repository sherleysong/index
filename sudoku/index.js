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
/* 1 */,
/* 2 */,
/* 3 */
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
/* 4 */
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

var	fixUrls = __webpack_require__(5);

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
/* 5 */
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
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
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

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./index.scss", function() {
		var newContent = require("!!../../../node_modules/_css-loader@0.28.9@css-loader/index.js!../../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!./index.scss");

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

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "body {\n  margin: 0 auto;\n  width: 300px;\n  text-align: center; }\n\nh1 {\n  color: red;\n  margin: 20px; }\n\n.container, .keyboard {\n  border: 2px solid #ca151e;\n  width: 100%;\n  padding: 0; }\n  .container div, .keyboard div {\n    display: flex;\n    border-bottom: 1px solid #333333; }\n    .container div:nth-child(3n), .keyboard div:nth-child(3n) {\n      border-bottom: 2px solid #ca151e; }\n    .container div:last-child, .keyboard div:last-child {\n      border-bottom: none; }\n    .container div span, .keyboard div span {\n      flex: 1;\n      position: relative;\n      width: 30px;\n      height: 30px;\n      line-height: 30px;\n      font-size: 18px;\n      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\n      border-right: 1px solid #333333; }\n      .container div span:nth-child(3n), .keyboard div span:nth-child(3n) {\n        border-right: 2px solid #ca151e; }\n      .container div span:last-child, .keyboard div span:last-child {\n        border-right: none; }\n      .container div span.fixed, .keyboard div span.fixed {\n        background-color: #DDD;\n        font-weight: bold; }\n      .container div span.focus, .keyboard div span.focus {\n        background-color: rgba(243, 11, 11, 0.3); }\n      .container div span i, .keyboard div span i {\n        font-size: 10px;\n        line-height: 10px;\n        text-align: center;\n        position: absolute;\n        height: 10px;\n        width: 10px; }\n        .container div span i.pos_1, .keyboard div span i.pos_1 {\n          top: 0;\n          left: 0; }\n        .container div span i.pos_2, .keyboard div span i.pos_2 {\n          top: 0;\n          left: 10px; }\n        .container div span i.pos_3, .keyboard div span i.pos_3 {\n          top: 0;\n          left: 20px; }\n        .container div span i.pos_4, .keyboard div span i.pos_4 {\n          top: 10px;\n          left: 0; }\n        .container div span i.pos_5, .keyboard div span i.pos_5 {\n          top: 10px;\n          left: 10px; }\n        .container div span i.pos_6, .keyboard div span i.pos_6 {\n          top: 10px;\n          left: 20px; }\n        .container div span i.pos_7, .keyboard div span i.pos_7 {\n          top: 20px;\n          left: 0; }\n        .container div span i.pos_8, .keyboard div span i.pos_8 {\n          top: 20px;\n          left: 10px; }\n        .container div span i.pos_9, .keyboard div span i.pos_9 {\n          top: 20px;\n          left: 20px; }\n\n.keyboard {\n  margin-top: 20px;\n  background-color: rgba(0, 255, 0, 0.3); }\n  .keyboard div span:nth-child(3n) {\n    border-right: 1px solid #333333; }\n\n.dashboard {\n  margin-top: 20px; }\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toolkit__ = __webpack_require__(0);
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

const Tookit = __webpack_require__(0)
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

const Toolkit = __webpack_require__(0);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmFmMTk0ZTlmM2U4ZjY2ODE4NDIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1ZG9rdS9qcy90b29sa2l0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fY3NzLWxvYWRlckAwLjI4LjlAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL19zdHlsZS1sb2FkZXJAMC4yMC4xQHN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fc3R5bGUtbG9hZGVyQDAuMjAuMUBzdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1ZG9rdS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Vkb2t1L3Njc3MvaW5kZXguc2Nzcz8yM2QyIiwid2VicGFjazovLy8uL3NyYy9zdWRva3Uvc2Nzcy9pbmRleC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zdWRva3UvanMvZ3JpZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Vkb2t1L2pzL2NoZWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9zdWRva3UvanMvc3Vkb2t1LmpzIiwid2VicGFjazovLy8uL3NyYy9zdWRva3UvanMvZ2VuZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hE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akM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQsa0RBQWtELHNCQUFzQjtBQUN4RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNB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QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCOzs7Ozs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDOzs7Ozs7QUNkQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QiIsImZpbGUiOiJzdWRva3UvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiYWYxOTRlOWYzZThmNjY4MTg0MiIsIi8qKlxuICogXG4gKi9cblxuY29uc3QgbWF0cml4VG9vbGtpdCA9IHtcbiAgICBtYWtlUm93KHYgPSAwKSB7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gbmV3IEFycmF5KDkpO1xuICAgICAgICByZXR1cm4gYXJyYXkuZmlsbCh2KVxuICAgIH0sXG4gICAgbWFrZU1hdHJpeCh2ID0gMCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh7XG4gICAgICAgICAgICBsZW5ndGg6IDlcbiAgICAgICAgfSwgKCkgPT4gdGhpcy5tYWtlUm93KHYpKVxuICAgIH0sXG4gICAgc2h1ZmZsZShhcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICBbYXJyYXlbaV0sIGFycmF5W2pdXSA9IFthcnJheVtqXSwgYXJyYXlbaV1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOajgOafpeW9k+WJjeepuuagvOaYr+WQpuWPr+S7peWhq+WGmeacrOWFg+e0oG46IDF+OSDjgIJcbiAgICAgKi9cbiAgICBjaGVja0ZpbGxhYmxlKG1hdHJpeCwgbiwgcm93SW5kZXgsIGNvbEluZGV4KSB7XG5cbiAgICAgICAgY29uc3Qgcm93ID0gbWF0cml4W3Jvd0luZGV4XTtcbiAgICAgICAgLy8gbWF0cml4IOavj+S4gOWIlyDnmoTmlbDmja4gXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMubWFrZVJvdygpLm1hcCgodiwgaSkgPT4gbWF0cml4W2ldW2NvbEluZGV4XSk7XG4gICAgICAgIC8vIOiOt+WPluWvueW6lOWuq+agvOWGheeahOWdkOagh+WvueixoeWAvFxuICAgICAgICBjb25zdCBib3hJbmRleCA9IGJveFRvb2xraXQuY29udmVydFRvQm94SW5kZXgocm93SW5kZXgsIGNvbEluZGV4KTtcbiAgICAgICAgLy8g6I635Y+W5a+55bqU5a6r5qC85YaF55qE5LiA57uE5pWw5o2uIFxuICAgICAgICBjb25zdCBib3ggPSBib3hUb29sa2l0LmdldEJveENlbGwobWF0cml4LCBib3hJbmRleC5ib3hfeCk7XG4gICAgICAgIC8vIOWIpOaWreihjOWGhe+8jOWIl+WGhe+8jOWuq+agvOWGhe+8jOS4jeWQq24gXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocm93W2ldID09PSBuIHx8IGNvbHVtbltpXSA9PT0gbiB8fCBib3hbaV0gPT09IG4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG59XG5cblxuLyoqXG4gKiDlnZDmoIfns7vlt6XlhbdcbiAqL1xuXG5jb25zdCBib3hUb29sa2l0ID0ge1xuICAgIC8vIOiOt+WPlm1hdHJpeOS4reesrHjkuKrlrqvmoLznmoTmlbDnu4RcbiAgICBnZXRCb3hDZWxsKG1hdHJpeCwgeCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0luZGV4ID0gTWF0aC5mbG9vcih4IC8gMykgKiAzICsgTWF0aC5mbG9vcihpIC8gMyk7XG4gICAgICAgICAgICBjb25zdCBjb2xJbmRleCA9IHggJSAzICogMyArIGkgJSAzO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobWF0cml4W3Jvd0luZGV4XVtjb2xJbmRleF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICAvLyDojrflj5ZtYXRyaXjkuK3nrKxjb2xJbmRleOWIl+eahOaVsOe7hFxuICAgIGdldENvbHVtbihtYXRyaXgsIGNvbEluZGV4KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobWF0cml4W2ldW2NvbEluZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIC8vIOihjOWIl+i9rOaNouaIkOWuq+agvFxuICAgIGNvbnZlcnRUb0JveEluZGV4KHJvd0luZGV4LCBjb2xJbmRleCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYm94X3g6IE1hdGguZmxvb3Iocm93SW5kZXggLyAzKSAqIDMgKyBNYXRoLmZsb29yKGNvbEluZGV4IC8gMyksXG4gICAgICAgICAgICBib3hfeTogcm93SW5kZXggJSAzICogMyArIGNvbEluZGV4ICUgM1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyDlrqvmoLzovazmiJDooYzliJdcbiAgICBjb252ZXJ0ZnJvbUJveEluZGV4KGJveF94LCBib3hfeSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm93SW5kZXg6IE1hdGguZmxvb3IoYm94X3ggLyAzKSAqIDMgKyBNYXRoLmZsb29yKGJveF95IC8gMyksXG4gICAgICAgICAgICBjb2xJbmRleDogYm94X3ggJSAzICogMyArIGJveF95ICUgM1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyDlt6Xlhbfpm4Zcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgVG9vbGtpdCB7XG4gICAgc3RhdGljIGdldCBtYXRyaXgoKSB7XG4gICAgICAgIHJldHVybiBtYXRyaXhUb29sa2l0XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgYm94KCkge1xuICAgICAgICByZXR1cm4gYm94VG9vbGtpdFxuICAgIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3Vkb2t1L2pzL3Rvb2xraXQuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2Nzcy1sb2FkZXJAMC4yOC45QGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL19zdHlsZS1sb2FkZXJAMC4yMC4xQHN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX3N0eWxlLWxvYWRlckAwLjIwLjFAc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vc2Nzcy9pbmRleC5zY3NzJyk7XG5cbmltcG9ydCBHcmlkIGZyb20gJy4vanMvZ3JpZCc7XG5cbmNvbnN0IGdyaWQgPSBuZXcgR3JpZCgkKCcjY29udGFpbmVyJykpO1xuXG5ncmlkLmJ1aWxkKCk7XG5cbmxldCB0YXJnZXRDZWxsO1xuXG4kKCcjY29udGFpbmVyJykub24oXCJjbGlja1wiLCBcInNwYW46bm90KC5maXhlZClcIiwgZSA9PiB7XG4gICAgY29uc3QgJGNlbGwgPSAkKGUudGFyZ2V0KTtcbiAgICBpZigkY2VsbFswXS5ub2RlTmFtZSA9PSAnSScpe1xuICAgICAgICAvLyAkY2VsbCA9ICRjZWxsLnBhcmVudE5vZGU/Pz8/Py9cbiAgICB9XG4gICAgJCgnI2NvbnRhaW5lcicpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgICAkY2VsbC5hZGRDbGFzcygnZm9jdXMnKTtcbiAgICB0YXJnZXRDZWxsID0gJGNlbGw7XG59KVxuXG4kKCcjZmlsbE51bWJlcnMnKS5vbignY2xpY2snLCAnc3BhbicsIGUgPT4ge1xuICAgIGdyaWQuZmlsbCh0YXJnZXRDZWxsLCBlKTtcbn0pXG5cbiQoJyNjaGVjaycpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICQoJyNjb250YWluZXInKS5maW5kKCdzcGFuJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgY29uc29sZS5sb2coZ3JpZC5jaGVjaygpKTtcbiAgICBpZiAoZ3JpZC5jaGVjaygpKSB7XG4gICAgICAgIGFsZXJ0KCfmiJDlip8nKTtcbiAgICB9XG59KVxuJCgnI3Jlc2V0Jykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgJCgnI2NvbnRhaW5lcicpLmZpbmQoJ3NwYW4nKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgICBncmlkLnJlc2V0KCk7XG59KVxuJCgnI3JlYnVpbGQxJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgZ3JpZC5yZWJ1aWxkKDEpO1xufSlcbiQoJyNyZWJ1aWxkMicpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgIGdyaWQucmVidWlsZCgyKTtcbn0pXG4kKCcjcmVidWlsZDMnKS5vbignY2xpY2snLCBlID0+IHtcbiAgICBncmlkLnJlYnVpbGQoMyk7XG59KVxuJCgnI2hlbHAnKS5vbignY2xpY2snLCBlID0+IHtcbiAgICBncmlkLmhlbHAoKTtcbn0pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3Vkb2t1L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvX2Nzcy1sb2FkZXJAMC4yOC45QGNzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL19zYXNzLWxvYWRlckA2LjAuNkBzYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL19zdHlsZS1sb2FkZXJAMC4yMC4xQHN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL19jc3MtbG9hZGVyQDAuMjguOUBjc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9fc2Fzcy1sb2FkZXJANi4wLjZAc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2luZGV4LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvX2Nzcy1sb2FkZXJAMC4yOC45QGNzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL19zYXNzLWxvYWRlckA2LjAuNkBzYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vaW5kZXguc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N1ZG9rdS9zY3NzL2luZGV4LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9fY3NzLWxvYWRlckAwLjI4LjlAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHdpZHRoOiAzMDBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblxcbmgxIHtcXG4gIGNvbG9yOiByZWQ7XFxuICBtYXJnaW46IDIwcHg7IH1cXG5cXG4uY29udGFpbmVyLCAua2V5Ym9hcmQge1xcbiAgYm9yZGVyOiAycHggc29saWQgI2NhMTUxZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMDsgfVxcbiAgLmNvbnRhaW5lciBkaXYsIC5rZXlib2FyZCBkaXYge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMzMzMzMzsgfVxcbiAgICAuY29udGFpbmVyIGRpdjpudGgtY2hpbGQoM24pLCAua2V5Ym9hcmQgZGl2Om50aC1jaGlsZCgzbikge1xcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjY2ExNTFlOyB9XFxuICAgIC5jb250YWluZXIgZGl2Omxhc3QtY2hpbGQsIC5rZXlib2FyZCBkaXY6bGFzdC1jaGlsZCB7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTsgfVxcbiAgICAuY29udGFpbmVyIGRpdiBzcGFuLCAua2V5Ym9hcmQgZGl2IHNwYW4ge1xcbiAgICAgIGZsZXg6IDE7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIHdpZHRoOiAzMHB4O1xcbiAgICAgIGhlaWdodDogMzBweDtcXG4gICAgICBsaW5lLWhlaWdodDogMzBweDtcXG4gICAgICBmb250LXNpemU6IDE4cHg7XFxuICAgICAgZm9udC1mYW1pbHk6ICdHaWxsIFNhbnMnLCAnR2lsbCBTYW5zIE1UJywgQ2FsaWJyaSwgJ1RyZWJ1Y2hldCBNUycsIHNhbnMtc2VyaWY7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzMzMzMzMzsgfVxcbiAgICAgIC5jb250YWluZXIgZGl2IHNwYW46bnRoLWNoaWxkKDNuKSwgLmtleWJvYXJkIGRpdiBzcGFuOm50aC1jaGlsZCgzbikge1xcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgI2NhMTUxZTsgfVxcbiAgICAgIC5jb250YWluZXIgZGl2IHNwYW46bGFzdC1jaGlsZCwgLmtleWJvYXJkIGRpdiBzcGFuOmxhc3QtY2hpbGQge1xcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lOyB9XFxuICAgICAgLmNvbnRhaW5lciBkaXYgc3Bhbi5maXhlZCwgLmtleWJvYXJkIGRpdiBzcGFuLmZpeGVkIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNEREQ7XFxuICAgICAgICBmb250LXdlaWdodDogYm9sZDsgfVxcbiAgICAgIC5jb250YWluZXIgZGl2IHNwYW4uZm9jdXMsIC5rZXlib2FyZCBkaXYgc3Bhbi5mb2N1cyB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0MywgMTEsIDExLCAwLjMpOyB9XFxuICAgICAgLmNvbnRhaW5lciBkaXYgc3BhbiBpLCAua2V5Ym9hcmQgZGl2IHNwYW4gaSB7XFxuICAgICAgICBmb250LXNpemU6IDEwcHg7XFxuICAgICAgICBsaW5lLWhlaWdodDogMTBweDtcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIGhlaWdodDogMTBweDtcXG4gICAgICAgIHdpZHRoOiAxMHB4OyB9XFxuICAgICAgICAuY29udGFpbmVyIGRpdiBzcGFuIGkucG9zXzEsIC5rZXlib2FyZCBkaXYgc3BhbiBpLnBvc18xIHtcXG4gICAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgICBsZWZ0OiAwOyB9XFxuICAgICAgICAuY29udGFpbmVyIGRpdiBzcGFuIGkucG9zXzIsIC5rZXlib2FyZCBkaXYgc3BhbiBpLnBvc18yIHtcXG4gICAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgICBsZWZ0OiAxMHB4OyB9XFxuICAgICAgICAuY29udGFpbmVyIGRpdiBzcGFuIGkucG9zXzMsIC5rZXlib2FyZCBkaXYgc3BhbiBpLnBvc18zIHtcXG4gICAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgICBsZWZ0OiAyMHB4OyB9XFxuICAgICAgICAuY29udGFpbmVyIGRpdiBzcGFuIGkucG9zXzQsIC5rZXlib2FyZCBkaXYgc3BhbiBpLnBvc180IHtcXG4gICAgICAgICAgdG9wOiAxMHB4O1xcbiAgICAgICAgICBsZWZ0OiAwOyB9XFxuICAgICAgICAuY29udGFpbmVyIGRpdiBzcGFuIGkucG9zXzUsIC5rZXlib2FyZCBkaXYgc3BhbiBpLnBvc181IHtcXG4gICAgICAgICAgdG9wOiAxMHB4O1xcbiAgICAgICAgICBsZWZ0OiAxMHB4OyB9XFxuICAgICAgICAuY29udGFpbmVyIGRpdiBzcGFuIGkucG9zXzYsIC5rZXlib2FyZCBkaXYgc3BhbiBpLnBvc182IHtcXG4gICAgICAgICAgdG9wOiAxMHB4O1xcbiAgICAgICAgICBsZWZ0OiAyMHB4OyB9XFxuICAgICAgICAuY29udGFpbmVyIGRpdiBzcGFuIGkucG9zXzcsIC5rZXlib2FyZCBkaXYgc3BhbiBpLnBvc183IHtcXG4gICAgICAgICAgdG9wOiAyMHB4O1xcbiAgICAgICAgICBsZWZ0OiAwOyB9XFxuICAgICAgICAuY29udGFpbmVyIGRpdiBzcGFuIGkucG9zXzgsIC5rZXlib2FyZCBkaXYgc3BhbiBpLnBvc184IHtcXG4gICAgICAgICAgdG9wOiAyMHB4O1xcbiAgICAgICAgICBsZWZ0OiAxMHB4OyB9XFxuICAgICAgICAuY29udGFpbmVyIGRpdiBzcGFuIGkucG9zXzksIC5rZXlib2FyZCBkaXYgc3BhbiBpLnBvc185IHtcXG4gICAgICAgICAgdG9wOiAyMHB4O1xcbiAgICAgICAgICBsZWZ0OiAyMHB4OyB9XFxuXFxuLmtleWJvYXJkIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDI1NSwgMCwgMC4zKTsgfVxcbiAgLmtleWJvYXJkIGRpdiBzcGFuOm50aC1jaGlsZCgzbikge1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMzMzMzMzOyB9XFxuXFxuLmRhc2hib2FyZCB7XFxuICBtYXJnaW4tdG9wOiAyMHB4OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvX2Nzcy1sb2FkZXJAMC4yOC45QGNzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvX3Nhc3MtbG9hZGVyQDYuMC42QHNhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvc3Vkb2t1L3Njc3MvaW5kZXguc2Nzc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgVG9vbGtpdCBmcm9tICcuL3Rvb2xraXQnXG5pbXBvcnQgQ2hlY2tlciBmcm9tICcuL2NoZWNrJ1xuY29uc3QgU3Vkb2t1ID0gcmVxdWlyZSgnLi9zdWRva3UnKVxuY29uc3Qgc3Vkb2t1ID0gbmV3IFN1ZG9rdSgpO1xuXG5jbGFzcyBHcmlkIHtcbiAgICBjb25zdHJ1Y3RvcihET00pIHtcbiAgICAgICAgdGhpcy5fRE9NID0gRE9NO1xuICAgIH1cbiAgICBidWlsZChsZXZlbCA9IDIpIHtcbiAgICAgICAgc3Vkb2t1Lm1ha2UobGV2ZWwpO1xuICAgICAgICBjb25zdCBtYXRyaXggPSBzdWRva3UucHV6emxlTWF0cml4O1xuICAgICAgICBjb25zdCBjZWxscyA9IG1hdHJpeC5tYXAocm93VmFsdWVzID0+IHJvd1ZhbHVlc1xuICAgICAgICAgICAgLm1hcChjZWxsVmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAkKCc8c3Bhbj4nKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChjZWxsVmFsdWUgPT0gMCA/ICcnIDogY2VsbFZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoY2VsbFZhbHVlID09IDAgPyAnJyA6ICdmaXhlZCcpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICBjb25zdCBET01Db250ZW50ID0gY2VsbHMubWFwKG0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuICQoJzxkaXY+JykuYXBwZW5kKG0pXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuX0RPTS5lbXB0eSgpLmFwcGVuZChET01Db250ZW50KVxuICAgIH1cbiAgICBmaWxsKHRhcmdldENlbGwsIGUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRDZWxsKSByZXR1cm47XG4gICAgICAgIGNvbnN0ICRjZWxsID0gdGFyZ2V0Q2VsbDtcbiAgICAgICAgY29uc3QgJHNwYW4gPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgaWYgKCRzcGFuLmhhc0NsYXNzKCdjbGVhcicpKSB7XG4gICAgICAgICAgICAkY2VsbC50ZXh0KCcnKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgICRjZWxsLnRleHQoJHNwYW4udGV4dCgpKVxuICAgIH1cbiAgICBjaGVjaygpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX0RPTS5jaGlsZHJlbignZGl2JylcbiAgICAgICAgICAgIC5tYXAoKHJvd0luZGV4LCBkaXYpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChkaXYpLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoY29sSW5kZXgsIHNwYW4pID0+ICQoc3BhbikudGV4dCgpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAgIC5tYXAoJGRhdGEgPT4gJGRhdGEudG9BcnJheSgpKVxuICAgICAgICBjb25zdCBjaGVja2VyID0gbmV3IENoZWNrZXIoZGF0YSk7XG4gICAgICAgIGNoZWNrZXIuY2hlY2soKTtcbiAgICAgICAgY29uc3QgbWFya3MgPSBjaGVja2VyLl9tYXRyaXhNYXJrcztcbiAgICAgICAgbGV0IF9ib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgbWFya3MuZm9yRWFjaCgocm93cywgaSkgPT4ge1xuICAgICAgICAgICAgcm93cy5mb3JFYWNoKChjZWxsLCBqKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8g5qOA5p+l5LiN5oiQ5Yqf77yM6L+b6KGM5qCH6K6wXG4gICAgICAgICAgICAgICAgaWYgKCFjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0RPTS5jaGlsZHJlbigpLmVxKGkpLmNoaWxkcmVuKCkuZXEoaikuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAgICAgICAgICAgICAgIF9ib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYoX2Jvb2xlYW4pIHJldHVybiBfYm9vbGVhblxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5fRE9NLmZpbmQoXCJzcGFuOm5vdCguZml4ZWQpXCIpLnRleHQoJycpXG4gICAgfVxuICAgIHJlYnVpbGQobGV2ZWwpIHtcbiAgICAgICAgdGhpcy5idWlsZChsZXZlbCk7XG4gICAgfVxuICAgIGhlbHAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZWxwIHN0YXJ0IC4uLicpO1xuICAgICAgICBjb25zdCBwbSA9IHN1ZG9rdS5wdXp6bGVNYXRyaXg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDk7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsVmFsdWUgPSBwbVtpXVtqXTtcblxuICAgICAgICAgICAgICAgIC8v5a+55rKh5pyJ5aGr5pWw5o2u55qE5Zyw5pa56L+b6KGM5aGr5YWFXG5cbiAgICAgICAgICAgICAgICBpZiAoY2VsbFZhbHVlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5b2T5YmN5Y2V5YWD5qC85Y+v5Lul5aGr55qE5pWw5a2XXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NzaWJsZU51bWJlcnMgPSBbXVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbEFyciA9IFRvb2xraXQuYm94LmdldENvbHVtbihwbSwgailcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm94QXJyID0gVG9vbGtpdC5ib3guZ2V0Qm94Q2VsbChwbSwgVG9vbGtpdC5ib3guY29udmVydFRvQm94SW5kZXgoaSwgaikuYm94X3gpXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDE7IHggPD0gOTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpnZ7lvZPliY3ljZXlhYPmoLzmiYDlnKjooYzliJflrqvnmoTmlbDlrZdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xBcnIuaW5kZXhPZih4KSA9PSAtMSAmJiBib3hBcnIuaW5kZXhPZih4KSA9PSAtMSAmJiBwbVtpXS5pbmRleE9mKHgpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVOdW1iZXJzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3NpYmxlTnVtYmVycy5sZW5ndGggPiAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IF9pID0gMDsgX2kgPCBwb3NzaWJsZU51bWJlcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVOdW1iZXJzW19pXSA9ICc8aSBjbGFzcz1cInBvc18nICsgcG9zc2libGVOdW1iZXJzW19pXSArICdcIiA+ICcgKyBwb3NzaWJsZU51bWJlcnNbX2ldICsgJzwvaT4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fRE9NLmZpbmQoJ2RpdicpLmVxKGkpLmZpbmQoJ3NwYW4nKS5lcShqKS5odG1sKHBvc3NpYmxlTnVtYmVycy5qb2luKCcnKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHcmlkO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N1ZG9rdS9qcy9ncmlkLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGNoZWNrQXJyYXkoYXJyYXkpIHtcbiAgICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgY29uc3QgbWFya3MgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBtYXJrcy5maWxsKHRydWUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFtYXJrc1tpXSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChhcnJheVtpXS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBtYXJrc1tpXSA9IGZhbHNlO1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHYgPSBhcnJheVtpXTtcblxuXG4gICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgbWFya3NbaV0gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKHYgPT09IGFycmF5W2pdKSB7XG4gICAgICAgICAgICAgICAgbWFya3NbaV0gPSBtYXJrc1tqXSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcmtzXG59XG5cbmNvbnN0IFRvb2tpdCA9IHJlcXVpcmUoJy4vdG9vbGtpdCcpXG4vKipcbiAqIOi+k+WFpe+8miBtYXRyaXgg5pWw54us5pWw5o2uXG4gKiDlpITnkIbvvJog5a+5bWF0cml4IOihjC/liJcv5a6r5YiG5Yir5qOA5p+l5YaZ5YWlbWFya3NcbiAqIOi+k+WHuu+8miDmo4Dmn6XmmK/lkKbmiJDlip8vbWFya3NcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIENoZWNrZXIge1xuICAgIGNvbnN0cnVjdG9yKG1hdHJpeCkge1xuICAgICAgICB0aGlzLl9tYXRyaXggPSBtYXRyaXg7XG4gICAgICAgIHRoaXMuX21hdHJpeE1hcmtzID0gVG9va2l0Lm1hdHJpeC5tYWtlTWF0cml4KHRydWUpXG4gICAgfVxuXG4gICAgY2hlY2soKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVjayBzdGFydCAuLi4gJylcbiAgICAgICAgdGhpcy5jaGVja1Jvd3MoKTtcbiAgICAgICAgdGhpcy5jaGVja0NvbHVtcygpO1xuICAgICAgICB0aGlzLmNoZWNrQ2VsbHMoKTtcbiAgICB9XG5cbiAgICBjaGVja1Jvd3MoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja1Jvd3MgLi4uICcpXG4gICAgICAgIHRoaXMuX21hdHJpeC5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tYXRyaXhNYXJrc1tpXSA9IGNoZWNrQXJyYXkoZWxlbWVudCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2hlY2tDb2x1bXMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja0NvbHVtcyAuLi4gJylcbiAgICAgICAgLy8gdmFyIF9yZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjb2wgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgOTsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29sLnB1c2godGhpcy5fbWF0cml4W2pdW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoZWNrQXJyYXkoY29sKS5mb3JFYWNoKChlbGVtZW50LCBuKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdHJpeE1hcmtzW25dW2ldID0gZWxlbWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgY2hlY2tDZWxscygpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrIENlbGxzIC4uLi4uICcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICAgICAgY2hlY2tBcnJheShUb29raXQuYm94LmdldEJveENlbGwodGhpcy5fbWF0cml4LCBpKSkuZm9yRWFjaCgoZWxlbWVudCwgbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnIgPSBUb29raXQuYm94LmNvbnZlcnRmcm9tQm94SW5kZXgoaSwgbilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0cml4TWFya3NbYXJyLnJvd0luZGV4XVthcnIuY29sSW5kZXhdID0gZWxlbWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4vLyBjb25zdCBHZW5lcmF0b3IgPSByZXF1aXJlKCcuL2dlbmVyYXRvcicpXG4vLyBjb25zdCBnZW4gPSBuZXcgR2VuZXJhdG9yKCk7XG4vLyBnZW4uZ2VuZXJhdGUoKTtcbi8vIGNvbnN0IG1hdHJpeCA9IGdlbi5tYXRyaXg7XG4vLyBtYXRyaXhbMF1bMF0gPSBtYXRyaXhbMV1bMV07XG4vLyBjb25zdCBjaGVja2VyID0gbmV3IENoZWNrZXIobWF0cml4KTtcbi8vIGNoZWNrZXIuY2hlY2soKTtcblxuLy8gY29uc29sZS5sb2coJ2NoZWNrZXIuX21hdHJpeCcpO1xuLy8gY29uc29sZS5sb2coY2hlY2tlci5fbWF0cml4KTtcbi8vIGNvbnNvbGUubG9nKCdjaGVja2VyLl9tYXRyaXhNYXJrcycpXG4vLyBjb25zb2xlLmxvZyhjaGVja2VyLl9tYXRyaXhNYXJrcylcbi8vIGNvbnNvbGUubG9nKHRlc3QxKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdWRva3UvanMvY2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IEdlbmVyYXRvciA9IHJlcXVpcmUoJy4vZ2VuZXJhdG9yJylcbm1vZHVsZS5leHBvcnRzID0gY2xhc3Mgc3Vkb2t1IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc3QgZ2VuID0gbmV3IEdlbmVyYXRvcigpO1xuICAgICAgICBnZW4uZ2VuZXJhdGUoKTtcbiAgICAgICAgdGhpcy5zb2x1dGlvbk1hdHJpeCA9IGdlbi5tYXRyaXhcbiAgICB9XG5cbiAgICBtYWtlKGxldmVsID0gMikge1xuICAgICAgICBjb25zdCBwdWxsTWF0cml4ID0gdGhpcy5zb2x1dGlvbk1hdHJpeC5tYXAocm93ID0+IHtcbiAgICAgICAgICAgIHJldHVybiByb3cubWFwKGNlbGwgPT4gTWF0aC5yYW5kb20oKSAqIDkgPCBsZXZlbCoyID8gJzAnIDogY2VsbClcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHV6emxlTWF0cml4ID0gcHVsbE1hdHJpeFxuICAgIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdWRva3UvanMvc3Vkb2t1LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBUb29sa2l0ID0gcmVxdWlyZSgnLi90b29sa2l0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgR2VuZXJhdG9yIHtcbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgICAgd2hpbGUgKCF0aGlzLmludGVybmFsR2VuZXJhdGUoKSkge1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW50ZXJuYWxHZW5lcmF0ZSgpIHtcbiAgICAgICAgdGhpcy5tYXRyaXggPSBUb29sa2l0Lm1hdHJpeC5tYWtlTWF0cml4KCk7XG4gICAgICAgIHRoaXMub3JkZXJzID0gVG9vbGtpdC5tYXRyaXgubWFrZU1hdHJpeCgpXG4gICAgICAgICAgICAubWFwKHJvdyA9PiByb3cubWFwKCh2LCBpKSA9PiBpKSlcbiAgICAgICAgICAgIC5tYXAocm93ID0+IFRvb2xraXQubWF0cml4LnNodWZmbGUocm93KSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gOTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlsbE51bWJlcihpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgZmlsbE51bWJlcihuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGxSb3cobiwgMCk7XG4gICAgfVxuICAgIGZpbGxSb3cobiwgcm93SW5kZXgpIHtcbiAgICAgICAgaWYgKHJvd0luZGV4ID4gOCkgcmV0dXJuIHRydWU7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMubWF0cml4W3Jvd0luZGV4XTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbEluZGV4ID0gdGhpcy5vcmRlcnNbcm93SW5kZXhdW2ldO1xuICAgICAgICAgICAgLy8g5aaC5p6c5b2T5YmN5L2N572u5pyJ5YC85LqG77yMXG4gICAgICAgICAgICBpZiAocm93W2NvbEluZGV4XSkgY29udGludWU7XG4gICAgICAgICAgICAvLyDlpoLmnpzmo4Dmn6XooYwv5YiXL+Wuq+W3suacie+8jFxuICAgICAgICAgICAgaWYgKCFUb29sa2l0Lm1hdHJpeC5jaGVja0ZpbGxhYmxlKHRoaXMubWF0cml4LCBuLCByb3dJbmRleCwgY29sSW5kZXgpKSBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIOaKim7lhpnov5vljrtcbiAgICAgICAgICAgIHJvd1tjb2xJbmRleF0gPSBuO1xuXG4gICAgICAgICAgICAvLyDljrvkuIvkuIDooYzloatu77yM5aaC5p6c5rKh5aGr6L+b5Y6777yM5bCx57un57ut5a+75om+5b2T5YmN6KGM5LiL5LiA5Liq5L2N572uXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlsbFJvdyhuLCByb3dJbmRleCArIDEpKSB7XG4gICAgICAgICAgICAgICAgcm93W2NvbEluZGV4XSA9IDA7XG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxufTtcblxuLy8gY29uc3QgZ2VuID0gbmV3IEdlbmVyYXRvcigpO1xuLy8gZ2VuLmdlbmVyYXRlKCk7XG4vLyBjb25zdCBtYXRyaXggPSBnZW4ubWF0cml4O1xuLy8gY29uc29sZS5sb2cobWF0cml4KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdWRva3UvanMvZ2VuZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9