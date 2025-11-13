"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* From:
    http://difnet.com.br/opensource/unicode_hack.js
    It has been significantly modified.
    Modifications are copyright 2014 Makyen and released under the MPL 2.0.
        This Source Code Form is subject to the terms of the Mozilla Public
        License, v. 2.0. If a copy of the MPL was not distributed with this
        file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
/*! unicode_hack.js
    Copyright (C) 2010-2012  Marcelo Gibson de Castro Gonçalves. All rights reserved.

    Copying and distribution of this file, with or without modification,
    are permitted in any medium without royalty provided the copyright
    notice and this notice are preserved.  This file is offered as-is,
    without any warranty.
*/
/*
Actual values adapted from https://github.com/slevithan/xregexp/blob/master/tools/output/categories.js
*/
var Unicode = {
  /* Strings to match Unicode characters in the BMP according to their Unicode category.
     Extracted from Unicode specification, version 5.0.0, source:
     http://unicode.org/versions/Unicode5.0.0/
  */
  /*
      Abbr    Long                Description
      Lu  Uppercase_Letter        an uppercase letter
      Ll  Lowercase_Letter        a lowercase letter
      Lt  Titlecase_Letter        a digraphic character, with first part uppercase
      LC  Cased_Letter            Lu | Ll | Lt
      Lm  Modifier_Letter         a modifier letter
      Lo  Other_Letter            other letters, including syllables and ideographs
      L   Letter                  Lu | Ll | Lt | Lm | Lo
      Mn  Nonspacing_Mark         a nonspacing combining mark (zero advance width)
      Mc  Spacing_Mark            a spacing combining mark (positive advance width)
      Me  Enclosing_Mark          an enclosing combining mark
      M   Mark                    Mn | Mc | Me
      Nd  Decimal_Number          a decimal digit
      Nl  Letter_Number           a letterlike numeric character
      No  Other_Number            a numeric character of other type
      N   Number                  Nd | Nl | No
      Pc  Connector_Punctuation   a connecting punctuation mark, like a tie
      Pd  Dash_Punctuation        a dash or hyphen punctuation mark
      Ps  Open_Punctuation        an opening punctuation mark (of a pair)
      Pe  Close_Punctuation       a closing punctuation mark (of a pair)
      Pi  Initial_Punctuation     an initial quotation mark
      Pf  Final_Punctuation       a final quotation mark
      Po  Other_Punctuation       a punctuation mark of other type
      P   Punctuation             Pc | Pd | Ps | Pe | Pi | Pf | Po
      Sm  Math_Symbol             a symbol of mathematical use
      Sc  Currency_Symbol         a currency sign
      Sk  Modifier_Symbol         a non-letterlike modifier symbol
      So  Other_Symbol            a symbol of other type
      S   Symbol                  Sm | Sc | Sk | So
      Zs  Space_Separator         a space character (of various non-zero widths)
      Zl  Line_Separator          U+2028 LINE SEPARATOR only
      Zp  Paragraph_Separator     U+2029 PARAGRAPH SEPARATOR only
      Z   Separator               Zs | Zl | Zp
      Cc  Control                 a C0 or C1 control code
      Cf  Format                  a format control character
      Cs  Surrogate               a surrogate code point
      Co  Private_Use             a private-use character
      Cn  Unassigned              a reserved unassigned code point or a noncharacter
      C   Other                   Cc | Cf | Cs | Co | Cn
  */
  /* Alpha Sorted
      Abbr    Long                Description
      C   Other                   Cc | Cf | Cs | Co | Cn
      Cc  Control                 a C0 or C1 control code
      Cf  Format                  a format control character
      Cn  Unassigned              a reserved unassigned code point or a noncharacter
      Co  Private_Use             a private-use character
      Cs  Surrogate               a surrogate code point
      L   Letter                  Lu | Ll | Lt | Lm | Lo
      LC  Cased_Letter            Lu | Ll | Lt
      Ll  Lowercase_Letter        a lowercase letter
      Lm  Modifier_Letter         a modifier letter
      Lo  Other_Letter            other letters, including syllables and ideographs
      Lt  Titlecase_Letter        a digraphic character, with first part uppercase
      Lu  Uppercase_Letter        an uppercase letter
      M   Mark                    Mn | Mc | Me
      Mc  Spacing_Mark            a spacing combining mark (positive advance width)
      Me  Enclosing_Mark          an enclosing combining mark
      Mn  Nonspacing_Mark         a nonspacing combining mark (zero advance width)
      N   Number                  Nd | Nl | No
      Nd  Decimal_Number          a decimal digit
      Nl  Letter_Number           a letterlike numeric character
      No  Other_Number            a numeric character of other type
      P   Punctuation             Pc | Pd | Ps | Pe | Pi | Pf | Po
      Pc  Connector_Punctuation   a connecting punctuation mark, like a tie
      Pd  Dash_Punctuation        a dash or hyphen punctuation mark
      Pe  Close_Punctuation       a closing punctuation mark (of a pair)
      Pf  Final_Punctuation       a final quotation mark
      Pi  Initial_Punctuation     an initial quotation mark
      Po  Other_Punctuation       a punctuation mark of other type
      Ps  Open_Punctuation        an opening punctuation mark (of a pair)
      S   Symbol                  Sm | Sc | Sk | So
      Sc  Currency_Symbol         a currency sign
      Sk  Modifier_Symbol         a non-letterlike modifier symbol
      Sm  Math_Symbol             a symbol of mathematical use
      So  Other_Symbol            a symbol of other type
      Z   Separator               Zs | Zl | Zp
      Zl  Line_Separator          U+2028 LINE SEPARATOR only
      Zp  Paragraph_Separator     U+2029 PARAGRAPH SEPARATOR only
      Zs  Space_Separator         a space character (of various non-zero widths)
  */
  Cc: "\\0-\\x1F\\x7F-\\x9F",
  Cf: "\\xAD\\u0600-\\u0605\\u061C\\u06DD\\u070F\\u08E2\\u180E\\u200B-\\u200F\\u202A-\\u202E\\u2060-\\u2064\\u2066-\\u206F\\uFEFF\\uFFF9-\\uFFFB",
  Co: "\\uE000-\\uF8FF",
  Cs: "\\uD800-\\uDFFF",
  Ll: "a-z\\xB5\\xDF-\\xF6\\xF8-\\xFF\\u0101\\u0103\\u0105\\u0107\\u0109\\u010B\\u010D\\u010F\\u0111\\u0113\\u0115\\u0117\\u0119\\u011B\\u011D\\u011F\\u0121\\u0123\\u0125\\u0127\\u0129\\u012B\\u012D\\u012F\\u0131\\u0133\\u0135\\u0137\\u0138\\u013A\\u013C\\u013E\\u0140\\u0142\\u0144\\u0146\\u0148\\u0149\\u014B\\u014D\\u014F\\u0151\\u0153\\u0155\\u0157\\u0159\\u015B\\u015D\\u015F\\u0161\\u0163\\u0165\\u0167\\u0169\\u016B\\u016D\\u016F\\u0171\\u0173\\u0175\\u0177\\u017A\\u017C\\u017E-\\u0180\\u0183\\u0185\\u0188\\u018C\\u018D\\u0192\\u0195\\u0199-\\u019B\\u019E\\u01A1\\u01A3\\u01A5\\u01A8\\u01AA\\u01AB\\u01AD\\u01B0\\u01B4\\u01B6\\u01B9\\u01BA\\u01BD-\\u01BF\\u01C6\\u01C9\\u01CC\\u01CE\\u01D0\\u01D2\\u01D4\\u01D6\\u01D8\\u01DA\\u01DC\\u01DD\\u01DF\\u01E1\\u01E3\\u01E5\\u01E7\\u01E9\\u01EB\\u01ED\\u01EF\\u01F0\\u01F3\\u01F5\\u01F9\\u01FB\\u01FD\\u01FF\\u0201\\u0203\\u0205\\u0207\\u0209\\u020B\\u020D\\u020F\\u0211\\u0213\\u0215\\u0217\\u0219\\u021B\\u021D\\u021F\\u0221\\u0223\\u0225\\u0227\\u0229\\u022B\\u022D\\u022F\\u0231\\u0233-\\u0239\\u023C\\u023F\\u0240\\u0242\\u0247\\u0249\\u024B\\u024D\\u024F-\\u0293\\u0295-\\u02AF\\u0371\\u0373\\u0377\\u037B-\\u037D\\u0390\\u03AC-\\u03CE\\u03D0\\u03D1\\u03D5-\\u03D7\\u03D9\\u03DB\\u03DD\\u03DF\\u03E1\\u03E3\\u03E5\\u03E7\\u03E9\\u03EB\\u03ED\\u03EF-\\u03F3\\u03F5\\u03F8\\u03FB\\u03FC\\u0430-\\u045F\\u0461\\u0463\\u0465\\u0467\\u0469\\u046B\\u046D\\u046F\\u0471\\u0473\\u0475\\u0477\\u0479\\u047B\\u047D\\u047F\\u0481\\u048B\\u048D\\u048F\\u0491\\u0493\\u0495\\u0497\\u0499\\u049B\\u049D\\u049F\\u04A1\\u04A3\\u04A5\\u04A7\\u04A9\\u04AB\\u04AD\\u04AF\\u04B1\\u04B3\\u04B5\\u04B7\\u04B9\\u04BB\\u04BD\\u04BF\\u04C2\\u04C4\\u04C6\\u04C8\\u04CA\\u04CC\\u04CE\\u04CF\\u04D1\\u04D3\\u04D5\\u04D7\\u04D9\\u04DB\\u04DD\\u04DF\\u04E1\\u04E3\\u04E5\\u04E7\\u04E9\\u04EB\\u04ED\\u04EF\\u04F1\\u04F3\\u04F5\\u04F7\\u04F9\\u04FB\\u04FD\\u04FF\\u0501\\u0503\\u0505\\u0507\\u0509\\u050B\\u050D\\u050F\\u0511\\u0513\\u0515\\u0517\\u0519\\u051B\\u051D\\u051F\\u0521\\u0523\\u0525\\u0527\\u0529\\u052B\\u052D\\u052F\\u0560-\\u0588\\u10D0-\\u10FA\\u10FD-\\u10FF\\u13F8-\\u13FD\\u1C80-\\u1C88\\u1D00-\\u1D2B\\u1D6B-\\u1D77\\u1D79-\\u1D9A\\u1E01\\u1E03\\u1E05\\u1E07\\u1E09\\u1E0B\\u1E0D\\u1E0F\\u1E11\\u1E13\\u1E15\\u1E17\\u1E19\\u1E1B\\u1E1D\\u1E1F\\u1E21\\u1E23\\u1E25\\u1E27\\u1E29\\u1E2B\\u1E2D\\u1E2F\\u1E31\\u1E33\\u1E35\\u1E37\\u1E39\\u1E3B\\u1E3D\\u1E3F\\u1E41\\u1E43\\u1E45\\u1E47\\u1E49\\u1E4B\\u1E4D\\u1E4F\\u1E51\\u1E53\\u1E55\\u1E57\\u1E59\\u1E5B\\u1E5D\\u1E5F\\u1E61\\u1E63\\u1E65\\u1E67\\u1E69\\u1E6B\\u1E6D\\u1E6F\\u1E71\\u1E73\\u1E75\\u1E77\\u1E79\\u1E7B\\u1E7D\\u1E7F\\u1E81\\u1E83\\u1E85\\u1E87\\u1E89\\u1E8B\\u1E8D\\u1E8F\\u1E91\\u1E93\\u1E95-\\u1E9D\\u1E9F\\u1EA1\\u1EA3\\u1EA5\\u1EA7\\u1EA9\\u1EAB\\u1EAD\\u1EAF\\u1EB1\\u1EB3\\u1EB5\\u1EB7\\u1EB9\\u1EBB\\u1EBD\\u1EBF\\u1EC1\\u1EC3\\u1EC5\\u1EC7\\u1EC9\\u1ECB\\u1ECD\\u1ECF\\u1ED1\\u1ED3\\u1ED5\\u1ED7\\u1ED9\\u1EDB\\u1EDD\\u1EDF\\u1EE1\\u1EE3\\u1EE5\\u1EE7\\u1EE9\\u1EEB\\u1EED\\u1EEF\\u1EF1\\u1EF3\\u1EF5\\u1EF7\\u1EF9\\u1EFB\\u1EFD\\u1EFF-\\u1F07\\u1F10-\\u1F15\\u1F20-\\u1F27\\u1F30-\\u1F37\\u1F40-\\u1F45\\u1F50-\\u1F57\\u1F60-\\u1F67\\u1F70-\\u1F7D\\u1F80-\\u1F87\\u1F90-\\u1F97\\u1FA0-\\u1FA7\\u1FB0-\\u1FB4\\u1FB6\\u1FB7\\u1FBE\\u1FC2-\\u1FC4\\u1FC6\\u1FC7\\u1FD0-\\u1FD3\\u1FD6\\u1FD7\\u1FE0-\\u1FE7\\u1FF2-\\u1FF4\\u1FF6\\u1FF7\\u210A\\u210E\\u210F\\u2113\\u212F\\u2134\\u2139\\u213C\\u213D\\u2146-\\u2149\\u214E\\u2184\\u2C30-\\u2C5E\\u2C61\\u2C65\\u2C66\\u2C68\\u2C6A\\u2C6C\\u2C71\\u2C73\\u2C74\\u2C76-\\u2C7B\\u2C81\\u2C83\\u2C85\\u2C87\\u2C89\\u2C8B\\u2C8D\\u2C8F\\u2C91\\u2C93\\u2C95\\u2C97\\u2C99\\u2C9B\\u2C9D\\u2C9F\\u2CA1\\u2CA3\\u2CA5\\u2CA7\\u2CA9\\u2CAB\\u2CAD\\u2CAF\\u2CB1\\u2CB3\\u2CB5\\u2CB7\\u2CB9\\u2CBB\\u2CBD\\u2CBF\\u2CC1\\u2CC3\\u2CC5\\u2CC7\\u2CC9\\u2CCB\\u2CCD\\u2CCF\\u2CD1\\u2CD3\\u2CD5\\u2CD7\\u2CD9\\u2CDB\\u2CDD\\u2CDF\\u2CE1\\u2CE3\\u2CE4\\u2CEC\\u2CEE\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\uA641\\uA643\\uA645\\uA647\\uA649\\uA64B\\uA64D\\uA64F\\uA651\\uA653\\uA655\\uA657\\uA659\\uA65B\\uA65D\\uA65F\\uA661\\uA663\\uA665\\uA667\\uA669\\uA66B\\uA66D\\uA681\\uA683\\uA685\\uA687\\uA689\\uA68B\\uA68D\\uA68F\\uA691\\uA693\\uA695\\uA697\\uA699\\uA69B\\uA723\\uA725\\uA727\\uA729\\uA72B\\uA72D\\uA72F-\\uA731\\uA733\\uA735\\uA737\\uA739\\uA73B\\uA73D\\uA73F\\uA741\\uA743\\uA745\\uA747\\uA749\\uA74B\\uA74D\\uA74F\\uA751\\uA753\\uA755\\uA757\\uA759\\uA75B\\uA75D\\uA75F\\uA761\\uA763\\uA765\\uA767\\uA769\\uA76B\\uA76D\\uA76F\\uA771-\\uA778\\uA77A\\uA77C\\uA77F\\uA781\\uA783\\uA785\\uA787\\uA78C\\uA78E\\uA791\\uA793-\\uA795\\uA797\\uA799\\uA79B\\uA79D\\uA79F\\uA7A1\\uA7A3\\uA7A5\\uA7A7\\uA7A9\\uA7AF\\uA7B5\\uA7B7\\uA7B9\\uA7BB\\uA7BD\\uA7BF\\uA7C3\\uA7C8\\uA7CA\\uA7F6\\uA7FA\\uAB30-\\uAB5A\\uAB60-\\uAB68\\uAB70-\\uABBF\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFF41-\\uFF5A",
  Lm: "\\u02B0-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0374\\u037A\\u0559\\u0640\\u06E5\\u06E6\\u07F4\\u07F5\\u07FA\\u081A\\u0824\\u0828\\u0971\\u0E46\\u0EC6\\u10FC\\u17D7\\u1843\\u1AA7\\u1C78-\\u1C7D\\u1D2C-\\u1D6A\\u1D78\\u1D9B-\\u1DBF\\u2071\\u207F\\u2090-\\u209C\\u2C7C\\u2C7D\\u2D6F\\u2E2F\\u3005\\u3031-\\u3035\\u303B\\u309D\\u309E\\u30FC-\\u30FE\\uA015\\uA4F8-\\uA4FD\\uA60C\\uA67F\\uA69C\\uA69D\\uA717-\\uA71F\\uA770\\uA788\\uA7F8\\uA7F9\\uA9CF\\uA9E6\\uAA70\\uAADD\\uAAF3\\uAAF4\\uAB5C-\\uAB5F\\uAB69\\uFF70\\uFF9E\\uFF9F",
  Lo: "\\xAA\\xBA\\u01BB\\u01C0-\\u01C3\\u0294\\u05D0-\\u05EA\\u05EF-\\u05F2\\u0620-\\u063F\\u0641-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u0800-\\u0815\\u0840-\\u0858\\u0860-\\u086A\\u08A0-\\u08B4\\u08B6-\\u08C7\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0972-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u09FC\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60\\u0C61\\u0C80\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D04-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D54-\\u0D56\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E45\\u0E81\\u0E82\\u0E84\\u0E86-\\u0E8A\\u0E8C-\\u0EA3\\u0EA5\\u0EA7-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u1100-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16F1-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17DC\\u1820-\\u1842\\u1844-\\u1878\\u1880-\\u1884\\u1887-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C77\\u1CE9-\\u1CEC\\u1CEE-\\u1CF3\\u1CF5\\u1CF6\\u1CFA\\u2135-\\u2138\\u2D30-\\u2D67\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u3006\\u303C\\u3041-\\u3096\\u309F\\u30A1-\\u30FA\\u30FF\\u3105-\\u312F\\u3131-\\u318E\\u31A0-\\u31BF\\u31F0-\\u31FF\\u3400-\\u4DBF\\u4E00-\\u9FFC\\uA000-\\uA014\\uA016-\\uA48C\\uA4D0-\\uA4F7\\uA500-\\uA60B\\uA610-\\uA61F\\uA62A\\uA62B\\uA66E\\uA6A0-\\uA6E5\\uA78F\\uA7F7\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA8FE\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9E0-\\uA9E4\\uA9E7-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA6F\\uAA71-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB\\uAADC\\uAAE0-\\uAAEA\\uAAF2\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF66-\\uFF6F\\uFF71-\\uFF9D\\uFFA0-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC",
  Lt: "\\u01C5\\u01C8\\u01CB\\u01F2\\u1F88-\\u1F8F\\u1F98-\\u1F9F\\u1FA8-\\u1FAF\\u1FBC\\u1FCC\\u1FFC",
  Lu: "A-Z\\xC0-\\xD6\\xD8-\\xDE\\u0100\\u0102\\u0104\\u0106\\u0108\\u010A\\u010C\\u010E\\u0110\\u0112\\u0114\\u0116\\u0118\\u011A\\u011C\\u011E\\u0120\\u0122\\u0124\\u0126\\u0128\\u012A\\u012C\\u012E\\u0130\\u0132\\u0134\\u0136\\u0139\\u013B\\u013D\\u013F\\u0141\\u0143\\u0145\\u0147\\u014A\\u014C\\u014E\\u0150\\u0152\\u0154\\u0156\\u0158\\u015A\\u015C\\u015E\\u0160\\u0162\\u0164\\u0166\\u0168\\u016A\\u016C\\u016E\\u0170\\u0172\\u0174\\u0176\\u0178\\u0179\\u017B\\u017D\\u0181\\u0182\\u0184\\u0186\\u0187\\u0189-\\u018B\\u018E-\\u0191\\u0193\\u0194\\u0196-\\u0198\\u019C\\u019D\\u019F\\u01A0\\u01A2\\u01A4\\u01A6\\u01A7\\u01A9\\u01AC\\u01AE\\u01AF\\u01B1-\\u01B3\\u01B5\\u01B7\\u01B8\\u01BC\\u01C4\\u01C7\\u01CA\\u01CD\\u01CF\\u01D1\\u01D3\\u01D5\\u01D7\\u01D9\\u01DB\\u01DE\\u01E0\\u01E2\\u01E4\\u01E6\\u01E8\\u01EA\\u01EC\\u01EE\\u01F1\\u01F4\\u01F6-\\u01F8\\u01FA\\u01FC\\u01FE\\u0200\\u0202\\u0204\\u0206\\u0208\\u020A\\u020C\\u020E\\u0210\\u0212\\u0214\\u0216\\u0218\\u021A\\u021C\\u021E\\u0220\\u0222\\u0224\\u0226\\u0228\\u022A\\u022C\\u022E\\u0230\\u0232\\u023A\\u023B\\u023D\\u023E\\u0241\\u0243-\\u0246\\u0248\\u024A\\u024C\\u024E\\u0370\\u0372\\u0376\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E\\u038F\\u0391-\\u03A1\\u03A3-\\u03AB\\u03CF\\u03D2-\\u03D4\\u03D8\\u03DA\\u03DC\\u03DE\\u03E0\\u03E2\\u03E4\\u03E6\\u03E8\\u03EA\\u03EC\\u03EE\\u03F4\\u03F7\\u03F9\\u03FA\\u03FD-\\u042F\\u0460\\u0462\\u0464\\u0466\\u0468\\u046A\\u046C\\u046E\\u0470\\u0472\\u0474\\u0476\\u0478\\u047A\\u047C\\u047E\\u0480\\u048A\\u048C\\u048E\\u0490\\u0492\\u0494\\u0496\\u0498\\u049A\\u049C\\u049E\\u04A0\\u04A2\\u04A4\\u04A6\\u04A8\\u04AA\\u04AC\\u04AE\\u04B0\\u04B2\\u04B4\\u04B6\\u04B8\\u04BA\\u04BC\\u04BE\\u04C0\\u04C1\\u04C3\\u04C5\\u04C7\\u04C9\\u04CB\\u04CD\\u04D0\\u04D2\\u04D4\\u04D6\\u04D8\\u04DA\\u04DC\\u04DE\\u04E0\\u04E2\\u04E4\\u04E6\\u04E8\\u04EA\\u04EC\\u04EE\\u04F0\\u04F2\\u04F4\\u04F6\\u04F8\\u04FA\\u04FC\\u04FE\\u0500\\u0502\\u0504\\u0506\\u0508\\u050A\\u050C\\u050E\\u0510\\u0512\\u0514\\u0516\\u0518\\u051A\\u051C\\u051E\\u0520\\u0522\\u0524\\u0526\\u0528\\u052A\\u052C\\u052E\\u0531-\\u0556\\u10A0-\\u10C5\\u10C7\\u10CD\\u13A0-\\u13F5\\u1C90-\\u1CBA\\u1CBD-\\u1CBF\\u1E00\\u1E02\\u1E04\\u1E06\\u1E08\\u1E0A\\u1E0C\\u1E0E\\u1E10\\u1E12\\u1E14\\u1E16\\u1E18\\u1E1A\\u1E1C\\u1E1E\\u1E20\\u1E22\\u1E24\\u1E26\\u1E28\\u1E2A\\u1E2C\\u1E2E\\u1E30\\u1E32\\u1E34\\u1E36\\u1E38\\u1E3A\\u1E3C\\u1E3E\\u1E40\\u1E42\\u1E44\\u1E46\\u1E48\\u1E4A\\u1E4C\\u1E4E\\u1E50\\u1E52\\u1E54\\u1E56\\u1E58\\u1E5A\\u1E5C\\u1E5E\\u1E60\\u1E62\\u1E64\\u1E66\\u1E68\\u1E6A\\u1E6C\\u1E6E\\u1E70\\u1E72\\u1E74\\u1E76\\u1E78\\u1E7A\\u1E7C\\u1E7E\\u1E80\\u1E82\\u1E84\\u1E86\\u1E88\\u1E8A\\u1E8C\\u1E8E\\u1E90\\u1E92\\u1E94\\u1E9E\\u1EA0\\u1EA2\\u1EA4\\u1EA6\\u1EA8\\u1EAA\\u1EAC\\u1EAE\\u1EB0\\u1EB2\\u1EB4\\u1EB6\\u1EB8\\u1EBA\\u1EBC\\u1EBE\\u1EC0\\u1EC2\\u1EC4\\u1EC6\\u1EC8\\u1ECA\\u1ECC\\u1ECE\\u1ED0\\u1ED2\\u1ED4\\u1ED6\\u1ED8\\u1EDA\\u1EDC\\u1EDE\\u1EE0\\u1EE2\\u1EE4\\u1EE6\\u1EE8\\u1EEA\\u1EEC\\u1EEE\\u1EF0\\u1EF2\\u1EF4\\u1EF6\\u1EF8\\u1EFA\\u1EFC\\u1EFE\\u1F08-\\u1F0F\\u1F18-\\u1F1D\\u1F28-\\u1F2F\\u1F38-\\u1F3F\\u1F48-\\u1F4D\\u1F59\\u1F5B\\u1F5D\\u1F5F\\u1F68-\\u1F6F\\u1FB8-\\u1FBB\\u1FC8-\\u1FCB\\u1FD8-\\u1FDB\\u1FE8-\\u1FEC\\u1FF8-\\u1FFB\\u2102\\u2107\\u210B-\\u210D\\u2110-\\u2112\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u2130-\\u2133\\u213E\\u213F\\u2145\\u2183\\u2C00-\\u2C2E\\u2C60\\u2C62-\\u2C64\\u2C67\\u2C69\\u2C6B\\u2C6D-\\u2C70\\u2C72\\u2C75\\u2C7E-\\u2C80\\u2C82\\u2C84\\u2C86\\u2C88\\u2C8A\\u2C8C\\u2C8E\\u2C90\\u2C92\\u2C94\\u2C96\\u2C98\\u2C9A\\u2C9C\\u2C9E\\u2CA0\\u2CA2\\u2CA4\\u2CA6\\u2CA8\\u2CAA\\u2CAC\\u2CAE\\u2CB0\\u2CB2\\u2CB4\\u2CB6\\u2CB8\\u2CBA\\u2CBC\\u2CBE\\u2CC0\\u2CC2\\u2CC4\\u2CC6\\u2CC8\\u2CCA\\u2CCC\\u2CCE\\u2CD0\\u2CD2\\u2CD4\\u2CD6\\u2CD8\\u2CDA\\u2CDC\\u2CDE\\u2CE0\\u2CE2\\u2CEB\\u2CED\\u2CF2\\uA640\\uA642\\uA644\\uA646\\uA648\\uA64A\\uA64C\\uA64E\\uA650\\uA652\\uA654\\uA656\\uA658\\uA65A\\uA65C\\uA65E\\uA660\\uA662\\uA664\\uA666\\uA668\\uA66A\\uA66C\\uA680\\uA682\\uA684\\uA686\\uA688\\uA68A\\uA68C\\uA68E\\uA690\\uA692\\uA694\\uA696\\uA698\\uA69A\\uA722\\uA724\\uA726\\uA728\\uA72A\\uA72C\\uA72E\\uA732\\uA734\\uA736\\uA738\\uA73A\\uA73C\\uA73E\\uA740\\uA742\\uA744\\uA746\\uA748\\uA74A\\uA74C\\uA74E\\uA750\\uA752\\uA754\\uA756\\uA758\\uA75A\\uA75C\\uA75E\\uA760\\uA762\\uA764\\uA766\\uA768\\uA76A\\uA76C\\uA76E\\uA779\\uA77B\\uA77D\\uA77E\\uA780\\uA782\\uA784\\uA786\\uA78B\\uA78D\\uA790\\uA792\\uA796\\uA798\\uA79A\\uA79C\\uA79E\\uA7A0\\uA7A2\\uA7A4\\uA7A6\\uA7A8\\uA7AA-\\uA7AE\\uA7B0-\\uA7B4\\uA7B6\\uA7B8\\uA7BA\\uA7BC\\uA7BE\\uA7C2\\uA7C4-\\uA7C7\\uA7C9\\uA7F5\\uFF21-\\uFF3A",
  M: "\\u0300-\\u036F\\u0483-\\u0489\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u07FD\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u08D3-\\u08E1\\u08E3-\\u0903\\u093A-\\u093C\\u093E-\\u094F\\u0951-\\u0957\\u0962\\u0963\\u0981-\\u0983\\u09BC\\u09BE-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CD\\u09D7\\u09E2\\u09E3\\u09FE\\u0A01-\\u0A03\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81-\\u0A83\\u0ABC\\u0ABE-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AE2\\u0AE3\\u0AFA-\\u0AFF\\u0B01-\\u0B03\\u0B3C\\u0B3E-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B55-\\u0B57\\u0B62\\u0B63\\u0B82\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD7\\u0C00-\\u0C04\\u0C3E-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0C81-\\u0C83\\u0CBC\\u0CBE-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CE2\\u0CE3\\u0D00-\\u0D03\\u0D3B\\u0D3C\\u0D3E-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4D\\u0D57\\u0D62\\u0D63\\u0D81-\\u0D83\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F3E\\u0F3F\\u0F71-\\u0F84\\u0F86\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102B-\\u103E\\u1056-\\u1059\\u105E-\\u1060\\u1062-\\u1064\\u1067-\\u106D\\u1071-\\u1074\\u1082-\\u108D\\u108F\\u109A-\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B4-\\u17D3\\u17DD\\u180B-\\u180D\\u1885\\u1886\\u18A9\\u1920-\\u192B\\u1930-\\u193B\\u1A17-\\u1A1B\\u1A55-\\u1A5E\\u1A60-\\u1A7C\\u1A7F\\u1AB0-\\u1AC0\\u1B00-\\u1B04\\u1B34-\\u1B44\\u1B6B-\\u1B73\\u1B80-\\u1B82\\u1BA1-\\u1BAD\\u1BE6-\\u1BF3\\u1C24-\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE8\\u1CED\\u1CF4\\u1CF7-\\u1CF9\\u1DC0-\\u1DF9\\u1DFB-\\u1DFF\\u20D0-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F-\\uA672\\uA674-\\uA67D\\uA69E\\uA69F\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA823-\\uA827\\uA82C\\uA880\\uA881\\uA8B4-\\uA8C5\\uA8E0-\\uA8F1\\uA8FF\\uA926-\\uA92D\\uA947-\\uA953\\uA980-\\uA983\\uA9B3-\\uA9C0\\uA9E5\\uAA29-\\uAA36\\uAA43\\uAA4C\\uAA4D\\uAA7B-\\uAA7D\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uAAEB-\\uAAEF\\uAAF5\\uAAF6\\uABE3-\\uABEA\\uABEC\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE2F",
  Mc: "\\u0903\\u093B\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u094F\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u1A19\\u1A1A\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1BE7\\u1BEA-\\u1BEC\\u1BEE\\u1BF2\\u1BF3\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF7\\u302E\\u302F\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BE-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uAA7D\\uAAEB\\uAAEE\\uAAEF\\uAAF5\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC",
  Me: "\\u0488\\u0489\\u1ABE\\u20DD-\\u20E0\\u20E2-\\u20E4\\uA670-\\uA672",
  Mn: "\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u07FD\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u08D3-\\u08E1\\u08E3-\\u0902\\u093A\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0957\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u09FE\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0AFA-\\u0AFF\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B55\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C00\\u0C04\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0C81\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D00\\u0D01\\u0D3B\\u0D3C\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0D81\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B4\\u17B5\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u1885\\u1886\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A1B\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1AB0-\\u1ABD\\u1ABF\\u1AC0\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1BAB-\\u1BAD\\u1BE6\\u1BE8\\u1BE9\\u1BED\\u1BEF-\\u1BF1\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1CF4\\u1CF8\\u1CF9\\u1DC0-\\u1DF9\\u1DFB-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302D\\u3099\\u309A\\uA66F\\uA674-\\uA67D\\uA69E\\uA69F\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA82C\\uA8C4\\uA8C5\\uA8E0-\\uA8F1\\uA8FF\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uA9BD\\uA9E5\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAA7C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uAAEC\\uAAED\\uAAF6\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE2F",
  Nd: "0-9\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0DE6-\\u0DEF\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uA9F0-\\uA9F9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19",
  Nl: "\\u16EE-\\u16F0\\u2160-\\u2182\\u2185-\\u2188\\u3007\\u3021-\\u3029\\u3038-\\u303A\\uA6E6-\\uA6EF",
  No: "\\xB2\\xB3\\xB9\\xBC-\\xBE\\u09F4-\\u09F9\\u0B72-\\u0B77\\u0BF0-\\u0BF2\\u0C78-\\u0C7E\\u0D58-\\u0D5E\\u0D70-\\u0D78\\u0F2A-\\u0F33\\u1369-\\u137C\\u17F0-\\u17F9\\u19DA\\u2070\\u2074-\\u2079\\u2080-\\u2089\\u2150-\\u215F\\u2189\\u2460-\\u249B\\u24EA-\\u24FF\\u2776-\\u2793\\u2CFD\\u3192-\\u3195\\u3220-\\u3229\\u3248-\\u324F\\u3251-\\u325F\\u3280-\\u3289\\u32B1-\\u32BF\\uA830-\\uA835",
  Pc: "_\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F",
  Pd: "\\-\\u058A\\u05BE\\u1400\\u1806\\u2010-\\u2015\\u2E17\\u2E1A\\u2E3A\\u2E3B\\u2E40\\u301C\\u3030\\u30A0\\uFE31\\uFE32\\uFE58\\uFE63\\uFF0D",
  Pe: "\\)\\]\\}\\u0F3B\\u0F3D\\u169C\\u2046\\u207E\\u208E\\u2309\\u230B\\u232A\\u2769\\u276B\\u276D\\u276F\\u2771\\u2773\\u2775\\u27C6\\u27E7\\u27E9\\u27EB\\u27ED\\u27EF\\u2984\\u2986\\u2988\\u298A\\u298C\\u298E\\u2990\\u2992\\u2994\\u2996\\u2998\\u29D9\\u29DB\\u29FD\\u2E23\\u2E25\\u2E27\\u2E29\\u3009\\u300B\\u300D\\u300F\\u3011\\u3015\\u3017\\u3019\\u301B\\u301E\\u301F\\uFD3E\\uFE18\\uFE36\\uFE38\\uFE3A\\uFE3C\\uFE3E\\uFE40\\uFE42\\uFE44\\uFE48\\uFE5A\\uFE5C\\uFE5E\\uFF09\\uFF3D\\uFF5D\\uFF60\\uFF63",
  Pf: "\\xBB\\u2019\\u201D\\u203A\\u2E03\\u2E05\\u2E0A\\u2E0D\\u2E1D\\u2E21",
  Pi: "\\xAB\\u2018\\u201B\\u201C\\u201F\\u2039\\u2E02\\u2E04\\u2E09\\u2E0C\\u2E1C\\u2E20",
  Po: "!-#%-'\\*,\\.\\/:;\\?@\\xA1\\xA7\\xB6\\xB7\\xBF\\u037E\\u0387\\u055A-\\u055F\\u0589\\u05C0\\u05C3\\u05C6\\u05F3\\u05F4\\u0609\\u060A\\u060C\\u060D\\u061B\\u061E\\u061F\\u066A-\\u066D\\u06D4\\u0700-\\u070D\\u07F7-\\u07F9\\u0830-\\u083E\\u085E\\u0964\\u0965\\u0970\\u09FD\\u0A76\\u0AF0\\u0C77\\u0C84\\u0DF4\\u0E4F\\u0E5A\\u0E5B\\u0F04-\\u0F12\\u0F14\\u0F85\\u0FD0-\\u0FD4\\u0FD9\\u0FDA\\u104A-\\u104F\\u10FB\\u1360-\\u1368\\u166E\\u16EB-\\u16ED\\u1735\\u1736\\u17D4-\\u17D6\\u17D8-\\u17DA\\u1800-\\u1805\\u1807-\\u180A\\u1944\\u1945\\u1A1E\\u1A1F\\u1AA0-\\u1AA6\\u1AA8-\\u1AAD\\u1B5A-\\u1B60\\u1BFC-\\u1BFF\\u1C3B-\\u1C3F\\u1C7E\\u1C7F\\u1CC0-\\u1CC7\\u1CD3\\u2016\\u2017\\u2020-\\u2027\\u2030-\\u2038\\u203B-\\u203E\\u2041-\\u2043\\u2047-\\u2051\\u2053\\u2055-\\u205E\\u2CF9-\\u2CFC\\u2CFE\\u2CFF\\u2D70\\u2E00\\u2E01\\u2E06-\\u2E08\\u2E0B\\u2E0E-\\u2E16\\u2E18\\u2E19\\u2E1B\\u2E1E\\u2E1F\\u2E2A-\\u2E2E\\u2E30-\\u2E39\\u2E3C-\\u2E3F\\u2E41\\u2E43-\\u2E4F\\u2E52\\u3001-\\u3003\\u303D\\u30FB\\uA4FE\\uA4FF\\uA60D-\\uA60F\\uA673\\uA67E\\uA6F2-\\uA6F7\\uA874-\\uA877\\uA8CE\\uA8CF\\uA8F8-\\uA8FA\\uA8FC\\uA92E\\uA92F\\uA95F\\uA9C1-\\uA9CD\\uA9DE\\uA9DF\\uAA5C-\\uAA5F\\uAADE\\uAADF\\uAAF0\\uAAF1\\uABEB\\uFE10-\\uFE16\\uFE19\\uFE30\\uFE45\\uFE46\\uFE49-\\uFE4C\\uFE50-\\uFE52\\uFE54-\\uFE57\\uFE5F-\\uFE61\\uFE68\\uFE6A\\uFE6B\\uFF01-\\uFF03\\uFF05-\\uFF07\\uFF0A\\uFF0C\\uFF0E\\uFF0F\\uFF1A\\uFF1B\\uFF1F\\uFF20\\uFF3C\\uFF61\\uFF64\\uFF65",
  Ps: "\\(\\[\\{\\u0F3A\\u0F3C\\u169B\\u201A\\u201E\\u2045\\u207D\\u208D\\u2308\\u230A\\u2329\\u2768\\u276A\\u276C\\u276E\\u2770\\u2772\\u2774\\u27C5\\u27E6\\u27E8\\u27EA\\u27EC\\u27EE\\u2983\\u2985\\u2987\\u2989\\u298B\\u298D\\u298F\\u2991\\u2993\\u2995\\u2997\\u29D8\\u29DA\\u29FC\\u2E22\\u2E24\\u2E26\\u2E28\\u2E42\\u3008\\u300A\\u300C\\u300E\\u3010\\u3014\\u3016\\u3018\\u301A\\u301D\\uFD3F\\uFE17\\uFE35\\uFE37\\uFE39\\uFE3B\\uFE3D\\uFE3F\\uFE41\\uFE43\\uFE47\\uFE59\\uFE5B\\uFE5D\\uFF08\\uFF3B\\uFF5B\\uFF5F\\uFF62",
  Sc: "\\$\\xA2-\\xA5\\u058F\\u060B\\u07FE\\u07FF\\u09F2\\u09F3\\u09FB\\u0AF1\\u0BF9\\u0E3F\\u17DB\\u20A0-\\u20BF\\uA838\\uFDFC\\uFE69\\uFF04\\uFFE0\\uFFE1\\uFFE5\\uFFE6",
  Sk: "\\^`\\xA8\\xAF\\xB4\\xB8\\u02C2-\\u02C5\\u02D2-\\u02DF\\u02E5-\\u02EB\\u02ED\\u02EF-\\u02FF\\u0375\\u0384\\u0385\\u1FBD\\u1FBF-\\u1FC1\\u1FCD-\\u1FCF\\u1FDD-\\u1FDF\\u1FED-\\u1FEF\\u1FFD\\u1FFE\\u309B\\u309C\\uA700-\\uA716\\uA720\\uA721\\uA789\\uA78A\\uAB5B\\uAB6A\\uAB6B\\uFBB2-\\uFBC1\\uFF3E\\uFF40\\uFFE3",
  Sm: "\\+<->\\|~\\xAC\\xB1\\xD7\\xF7\\u03F6\\u0606-\\u0608\\u2044\\u2052\\u207A-\\u207C\\u208A-\\u208C\\u2118\\u2140-\\u2144\\u214B\\u2190-\\u2194\\u219A\\u219B\\u21A0\\u21A3\\u21A6\\u21AE\\u21CE\\u21CF\\u21D2\\u21D4\\u21F4-\\u22FF\\u2320\\u2321\\u237C\\u239B-\\u23B3\\u23DC-\\u23E1\\u25B7\\u25C1\\u25F8-\\u25FF\\u266F\\u27C0-\\u27C4\\u27C7-\\u27E5\\u27F0-\\u27FF\\u2900-\\u2982\\u2999-\\u29D7\\u29DC-\\u29FB\\u29FE-\\u2AFF\\u2B30-\\u2B44\\u2B47-\\u2B4C\\uFB29\\uFE62\\uFE64-\\uFE66\\uFF0B\\uFF1C-\\uFF1E\\uFF5C\\uFF5E\\uFFE2\\uFFE9-\\uFFEC",
  So: "\\xA6\\xA9\\xAE\\xB0\\u0482\\u058D\\u058E\\u060E\\u060F\\u06DE\\u06E9\\u06FD\\u06FE\\u07F6\\u09FA\\u0B70\\u0BF3-\\u0BF8\\u0BFA\\u0C7F\\u0D4F\\u0D79\\u0F01-\\u0F03\\u0F13\\u0F15-\\u0F17\\u0F1A-\\u0F1F\\u0F34\\u0F36\\u0F38\\u0FBE-\\u0FC5\\u0FC7-\\u0FCC\\u0FCE\\u0FCF\\u0FD5-\\u0FD8\\u109E\\u109F\\u1390-\\u1399\\u166D\\u1940\\u19DE-\\u19FF\\u1B61-\\u1B6A\\u1B74-\\u1B7C\\u2100\\u2101\\u2103-\\u2106\\u2108\\u2109\\u2114\\u2116\\u2117\\u211E-\\u2123\\u2125\\u2127\\u2129\\u212E\\u213A\\u213B\\u214A\\u214C\\u214D\\u214F\\u218A\\u218B\\u2195-\\u2199\\u219C-\\u219F\\u21A1\\u21A2\\u21A4\\u21A5\\u21A7-\\u21AD\\u21AF-\\u21CD\\u21D0\\u21D1\\u21D3\\u21D5-\\u21F3\\u2300-\\u2307\\u230C-\\u231F\\u2322-\\u2328\\u232B-\\u237B\\u237D-\\u239A\\u23B4-\\u23DB\\u23E2-\\u2426\\u2440-\\u244A\\u249C-\\u24E9\\u2500-\\u25B6\\u25B8-\\u25C0\\u25C2-\\u25F7\\u2600-\\u266E\\u2670-\\u2767\\u2794-\\u27BF\\u2800-\\u28FF\\u2B00-\\u2B2F\\u2B45\\u2B46\\u2B4D-\\u2B73\\u2B76-\\u2B95\\u2B97-\\u2BFF\\u2CE5-\\u2CEA\\u2E50\\u2E51\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u2FF0-\\u2FFB\\u3004\\u3012\\u3013\\u3020\\u3036\\u3037\\u303E\\u303F\\u3190\\u3191\\u3196-\\u319F\\u31C0-\\u31E3\\u3200-\\u321E\\u322A-\\u3247\\u3250\\u3260-\\u327F\\u328A-\\u32B0\\u32C0-\\u33FF\\u4DC0-\\u4DFF\\uA490-\\uA4C6\\uA828-\\uA82B\\uA836\\uA837\\uA839\\uAA77-\\uAA79\\uFDFD\\uFFE4\\uFFE8\\uFFED\\uFFEE\\uFFFC\\uFFFD",
  Zl: "\\u2028",
  Zp: "\\u2029",
  Zs: " \\xA0\\u1680\\u2000-\\u200A\\u202F\\u205F\\u3000"
};
Unicode.C = Unicode.Cc + Unicode.Cf + Unicode.Cs + Unicode.Co;
//+ Unicode.Cn ; //This is not defined.

Unicode.L = Unicode.Lu + Unicode.Ll + Unicode.Lt + Unicode.Lm + Unicode.Mn +
//Added 2014-05-29 due to some letters in names not being recognized.
//This is where accent marks are individually combined instead of using an explicit character.
Unicode.Lo;
Unicode.LC = Unicode.Lu + Unicode.Ll + Unicode.Lt;
Unicode.M = Unicode.Mn + Unicode.Mc + Unicode.Me;
Unicode.N = Unicode.Nd + Unicode.Nl + Unicode.No;
Unicode.P = Unicode.Pc + Unicode.Pd + Unicode.Ps + Unicode.Pe + Unicode.Pi + Unicode.Pf + Unicode.Po;
Unicode.S = Unicode.Sm + Unicode.Sc + Unicode.Sk + Unicode.So;
Unicode.Z = Unicode.Zs + Unicode.Zl + Unicode.Zp;

//Not in Unicode spec:
Unicode.w = "_" + Unicode.L + Unicode.N;

//A Unicode based word boundry built with non-capturing parentheses
Unicode.b = "(?:[" + Unicode.w + "](?:[^" + Unicode.w + "]|$)" + "|(?:^|[^" + Unicode.w + "])[" + Unicode.w + "]" + ")";

//A Unicode based word boundry build with non-capturing parentheses
Unicode.bOut = "(?=[^" + Unicode.w + "]|$)";

//A Unicode based word boundry build with non-capturing parentheses
//JavaScript does not have a non-consuming look-behind.
//This makes a direct replacement for \b not possible as we may consume
// part of the string to make this test.
Unicode.bIn = "(?:^|[^" + Unicode.w + "])";

//A possible work-around is to use a capture and replace it.
Unicode.bInCapture = "(?:^|([^" + Unicode.w + "]))";

//A Unicode based non-word boundry build with non-capturing parentheses
Unicode.B = "(?:[" + Unicode.w + "][" + Unicode.w + "]" + "|[^" + Unicode.w + "][^" + Unicode.w + "]" + ")";
Unicode.d = Unicode.N;
var Sk = {};
Sk.exportSymbol = function (name, module) {
  var parts = name.split(".");
  var submodule = Sk;
  var i;
  for (i = 1; i < parts.length - 1; i++) {
    if (!(parts[i] in submodule)) {
      submodule[parts[i]] = {};
    }
  }
  submodule[parts[i]] = module;
};
Sk.configure = function (options) {};
Sk.builtin = {
  SyntaxError: function SyntaxError(message, filename, text, lineno, offset, end_lineno, end_offset) {
    this.message = message;
    this.filename = filename;
    this.text = text;
    this.lineno = lineno;
    this.offset = offset;
    this.end_lineno = end_lineno;
    this.end_offset = end_offset;
  },
  str: function str(x) {
    if (x instanceof Sk.builtin.str) {
      return x;
    }
    if (!(this instanceof Sk.builtin.str)) {
      return new Sk.builtin.str(x);
    }
    // TODO: Should we handle more casting situations?
    this.v = x;
  },
  int_: function int_(n) {
    this.v = n;
  },
  float_: function float_(n) {
    this.v = n;
  },
  bool: {
    "true$": {
      v: true
    },
    "false$": {
      v: true
    }
  },
  none: {
    "none$": {
      v: null
    }
  }
};
Sk.builtin.int_.threshold$ = Infinity;
Sk.builtin.str.prototype.sq$concat = function (other) {
  return new Sk.builtin.str(this.v + other.v);
};
Sk.builtin.str.prototype.$jsstr = function () {
  return this.v;
};
Sk.__future__ = {
  print_function: true,
  division: true,
  absolute_import: null,
  unicode_literals: true,
  // skulpt specific
  python3: true,
  set_repr: true,
  class_repr: true,
  inherit_from_object: true,
  super_args: true,
  octal_number_literal: true,
  bankers_rounding: true,
  python_version: true,
  dunder_next: true,
  dunder_round: true,
  list_clear: true,
  exceptions: true,
  no_long_type: true,
  ceil_floor_int: true,
  l_suffix: false,
  silent_octal_literal: false
};
Sk.asserts = {
  assert: function assert(condition) {
    if (!condition) {
      console.error(condition);
    }
  }
};
Sk.ffi = {
  remapToJs: function remapToJs(data) {
    return data.v;
  }
};

/* File automatically generated by asdl_js.py. */

/* Object that holds all nodes */
Sk.astnodes = {};

/* ----- expr_context ----- */
/** @constructor */
Sk.astnodes.Load = function Load() {};
/** @constructor */
Sk.astnodes.Store = function Store() {};
/** @constructor */
Sk.astnodes.Del = function Del() {};
/** @constructor */
Sk.astnodes.AugLoad = function AugLoad() {};
/** @constructor */
Sk.astnodes.AugStore = function AugStore() {};
/** @constructor */
Sk.astnodes.Param = function Param() {};

/* ----- boolop ----- */
/** @constructor */
Sk.astnodes.And = function And() {};
/** @constructor */
Sk.astnodes.Or = function Or() {};

/* ----- operator ----- */
/** @constructor */
Sk.astnodes.Add = function Add() {};
/** @constructor */
Sk.astnodes.Sub = function Sub() {};
/** @constructor */
Sk.astnodes.Mult = function Mult() {};
/** @constructor */
Sk.astnodes.MatMult = function MatMult() {};
/** @constructor */
Sk.astnodes.Div = function Div() {};
/** @constructor */
Sk.astnodes.Mod = function Mod() {};
/** @constructor */
Sk.astnodes.Pow = function Pow() {};
/** @constructor */
Sk.astnodes.LShift = function LShift() {};
/** @constructor */
Sk.astnodes.RShift = function RShift() {};
/** @constructor */
Sk.astnodes.BitOr = function BitOr() {};
/** @constructor */
Sk.astnodes.BitXor = function BitXor() {};
/** @constructor */
Sk.astnodes.BitAnd = function BitAnd() {};
/** @constructor */
Sk.astnodes.FloorDiv = function FloorDiv() {};

/* ----- unaryop ----- */
/** @constructor */
Sk.astnodes.Invert = function Invert() {};
/** @constructor */
Sk.astnodes.Not = function Not() {};
/** @constructor */
Sk.astnodes.UAdd = function UAdd() {};
/** @constructor */
Sk.astnodes.USub = function USub() {};

/* ----- cmpop ----- */
/** @constructor */
Sk.astnodes.Eq = function Eq() {};
/** @constructor */
Sk.astnodes.NotEq = function NotEq() {};
/** @constructor */
Sk.astnodes.Lt = function Lt() {};
/** @constructor */
Sk.astnodes.LtE = function LtE() {};
/** @constructor */
Sk.astnodes.Gt = function Gt() {};
/** @constructor */
Sk.astnodes.GtE = function GtE() {};
/** @constructor */
Sk.astnodes.Is = function Is() {};
/** @constructor */
Sk.astnodes.IsNot = function IsNot() {};
/** @constructor */
Sk.astnodes.In = function In() {};
/** @constructor */
Sk.astnodes.NotIn = function NotIn() {};

/* ---------------------- */
/* constructors for nodes */
/* ---------------------- */

/** @constructor */
Sk.astnodes.Module = function Module(/* {asdl_seq *} */body, /* {string} */
docstring) {
  this.body = body;
  this.docstring = docstring;
  return this;
};

/** @constructor */
Sk.astnodes.Interactive = function Interactive(/* {asdl_seq *} */body) {
  this.body = body;
  return this;
};

/** @constructor */
Sk.astnodes.Expression = function Expression(/* {expr_ty} */body) {
  this.body = body;
  return this;
};

/** @constructor */
Sk.astnodes.Suite = function Suite(/* {asdl_seq *} */body) {
  this.body = body;
  return this;
};

/** @constructor */
Sk.astnodes.FunctionDef = function FunctionDef(/* {identifier} */name,
/*
{arguments__ty} */
args,
/*
{asdl_seq *} */
body,
/*
{asdl_seq *} */
decorator_list,
/*
{expr_ty} */
returns,
/*
{string} */
docstring,
/*
{int} */
lineno,
/* {int}
*/
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.name = name;
  this.args = args;
  this.body = body;
  this.decorator_list = decorator_list;
  this.returns = returns;
  this.docstring = docstring;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.AsyncFunctionDef = function AsyncFunctionDef(/* {identifier} */
name,
/*
{arguments__ty}
*/
args,
/*
{asdl_seq *} */
body,
/*
{asdl_seq *} */
decorator_list, /* {expr_ty} */
returns,
/*
{string} */
docstring,
/*
{int} */
lineno, /* {int} */
col_offset,
/*
{int} */
end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.name = name;
  this.args = args;
  this.body = body;
  this.decorator_list = decorator_list;
  this.returns = returns;
  this.docstring = docstring;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.ClassDef = function ClassDef(/* {identifier} */name,
/* {asdl_seq
*} */
bases, /* {asdl_seq *} */
keywords, /* {asdl_seq *} */
body, /* {asdl_seq *} */
decorator_list, /* {string} */
docstring, /* {int} */lineno,
/*
{int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.name = name;
  this.bases = bases;
  this.keywords = keywords;
  this.body = body;
  this.decorator_list = decorator_list;
  this.docstring = docstring;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Return = function Return(/* {expr_ty} */value, /* {int} */lineno, /* {int} */col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Delete = function Delete(/* {asdl_seq *} */targets, /* {int} */
lineno, /* {int} */col_offset,
/*
{int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.targets = targets;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Assign = function Assign(/* {asdl_seq *} */targets,
/* {expr_ty}
*/
value, /* {int} */lineno,
/*
{int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.targets = targets;
  this.value = value;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.AugAssign = function AugAssign(/* {expr_ty} */target,
/*
{operator_ty} */
op,
/*
{expr_ty} */
value, /* {int} */
lineno, /* {int} */col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.target = target;
  this.op = op;
  this.value = value;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.AnnAssign = function AnnAssign(/* {expr_ty} */target,
/* {expr_ty}
*/
annotation, /* {expr_ty} */
value, /* {int} */simple,
/*
{int} */
lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.target = target;
  this.annotation = annotation;
  this.value = value;
  this.simple = simple;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.For = function For(/* {expr_ty} */target, /* {expr_ty} */iter,
/*
{asdl_seq *} */
body, /* {asdl_seq *} */
orelse, /* {int} */lineno, /* {int} */
col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.target = target;
  this.iter = iter;
  this.body = body;
  this.orelse = orelse;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.AsyncFor = function AsyncFor(/* {expr_ty} */target,
/* {expr_ty}
*/
iter, /* {asdl_seq *} */body, /* {asdl_seq *} */orelse,
/*
{int} */
lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.target = target;
  this.iter = iter;
  this.body = body;
  this.orelse = orelse;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.While = function While(/* {expr_ty} */test, /* {asdl_seq *} */
body, /* {asdl_seq *} */orelse,
/*
{int} */
lineno, /* {int} */
col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.test = test;
  this.body = body;
  this.orelse = orelse;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.If = function If(/* {expr_ty} */test, /* {asdl_seq *} */body,
/*
{asdl_seq *} */
orelse, /* {int} */lineno, /* {int} */col_offset, /* {int} */
end_lineno, /* {int} */end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.test = test;
  this.body = body;
  this.orelse = orelse;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.With = function With(/* {asdl_seq *} */items, /* {asdl_seq *} */
body, /* {int} */lineno, /* {int} */
col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.items = items;
  this.body = body;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.AsyncWith = function AsyncWith(/* {asdl_seq *} */items,
/*
{asdl_seq *} */
body,
/* {int}
*/
lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.items = items;
  this.body = body;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Raise = function Raise(/* {expr_ty} */exc, /* {expr_ty} */cause, /* {expr_ty} */inst, /* {expr_ty} */
tback, /* {int} */lineno, /* {int} */
col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.exc = exc;
  this.cause = cause;
  this.inst = inst;
  this.tback = tback;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Try = function Try(/* {asdl_seq *} */body, /* {asdl_seq *} */
handlers, /* {asdl_seq *} */orelse,
/*
{asdl_seq *} */
finalbody, /* {int} */
lineno, /* {int} */col_offset, /* {int} */
end_lineno, /* {int} */end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.body = body;
  this.handlers = handlers;
  this.orelse = orelse;
  this.finalbody = finalbody;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Assert = function Assert(/* {expr_ty} */test, /* {expr_ty} */msg, /* {int} */lineno, /* {int} */
col_offset, /* {int} */end_lineno, /* {int} */end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.test = test;
  this.msg = msg;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Import = function Import(/* {asdl_seq *} */names, /* {int} */
lineno, /* {int} */col_offset,
/*
{int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.names = names;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.ImportFrom = function ImportFrom(/* {identifier} */module,
/*
{asdl_seq *} */
names,
/*
{int} */
level, /* {int} */
lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.module = module;
  this.names = names;
  this.level = level;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Global = function Global(/* {asdl_seq *} */names, /* {int} */
lineno, /* {int} */col_offset,
/*
{int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.names = names;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Nonlocal = function Nonlocal(/* {asdl_seq *} */names, /* {int} */
lineno, /* {int} */col_offset, /* {int} */end_lineno,
/* {int}
*/
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.names = names;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Expr = function Expr(/* {expr_ty} */value, /* {int} */lineno,
/*
{int} */
col_offset, /* {int} */
end_lineno, /* {int} */end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Pass = function Pass(/* {int} */lineno, /* {int} */col_offset,
/*
{int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Break = function Break(/* {int} */lineno, /* {int} */col_offset, /* {int} */end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Continue = function Continue(/* {int} */lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Print = function Print(/* {expr_ty} */dest, /* {asdl_seq *} */
values, /* {int} */nl, /* {int} */
lineno, /* {int} */col_offset,
/*
{int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.dest = dest;
  this.values = values;
  this.nl = nl;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Debugger = function Debugger(/* {int} */lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.BoolOp = function BoolOp(/* {boolop_ty} */op, /* {asdl_seq *} */
values, /* {int} */lineno,
/* {int}
*/
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.op = op;
  this.values = values;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.BinOp = function BinOp(/* {expr_ty} */left, /* {operator_ty} */
op, /* {expr_ty} */right, /* {int} */
lineno, /* {int} */col_offset,
/*
{int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.left = left;
  this.op = op;
  this.right = right;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.UnaryOp = function UnaryOp(/* {unaryop_ty} */op, /* {expr_ty} */
operand, /* {int} */lineno,
/*
{int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.op = op;
  this.operand = operand;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Lambda = function Lambda(/* {arguments__ty} */args,
/* {expr_ty}
*/
body, /* {int} */lineno,
/* {int}
*/
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.args = args;
  this.body = body;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.IfExp = function IfExp(/* {expr_ty} */test, /* {expr_ty} */body, /* {expr_ty} */orelse, /* {int} */
lineno, /* {int} */col_offset,
/*
{int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.test = test;
  this.body = body;
  this.orelse = orelse;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Dict = function Dict(/* {asdl_seq *} */keys, /* {asdl_seq *} */
values, /* {int} */lineno, /* {int} */
col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.keys = keys;
  this.values = values;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Set = function Set(/* {asdl_seq *} */elts, /* {int} */lineno,
/*
{int} */
col_offset, /* {int} */
end_lineno, /* {int} */end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.elts = elts;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.ListComp = function ListComp(/* {expr_ty} */elt,
/* {asdl_seq *}
*/
generators, /* {int} */
lineno, /* {int} */col_offset, /* {int} */end_lineno,
/* {int}
*/
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.elt = elt;
  this.generators = generators;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.SetComp = function SetComp(/* {expr_ty} */elt, /* {asdl_seq *} */
generators, /* {int} */lineno,
/*
{int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.elt = elt;
  this.generators = generators;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.DictComp = function DictComp(/* {expr_ty} */key, /* {expr_ty} */
value, /* {asdl_seq *} */
generators, /* {int} */lineno, /* {int} */col_offset,
/* {int}
*/
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.key = key;
  this.value = value;
  this.generators = generators;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.GeneratorExp = function GeneratorExp(/* {expr_ty} */elt,
/*
{asdl_seq *} */
generators, /* {int} */
lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.elt = elt;
  this.generators = generators;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Await = function Await(/* {expr_ty} */value, /* {int} */lineno, /* {int} */col_offset, /* {int} */
end_lineno, /* {int} */end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Yield = function Yield(/* {expr_ty} */value, /* {int} */lineno, /* {int} */col_offset, /* {int} */
end_lineno, /* {int} */end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.YieldFrom = function YieldFrom(/* {expr_ty} */value, /* {int} */
lineno, /* {int} */col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Compare = function Compare(/* {expr_ty} */left,
/* {asdl_int_seq
*} */
ops, /* {asdl_seq *} */
comparators, /* {int} */lineno,
/*
{int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.left = left;
  this.ops = ops;
  this.comparators = comparators;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Call = function Call(/* {expr_ty} */func, /* {asdl_seq *} */args, /* {asdl_seq *} */keywords, /* {int} */
lineno, /* {int} */col_offset,
/* {int}
*/
end_lineno, /* {int} */end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.func = func;
  this.args = args;
  this.keywords = keywords;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Num = function Num(/* {object} */n, /* {int} */lineno,
/* {int}
*/
col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.n = n;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Str = function Str(/* {string} */s, /* {int} */lineno,
/* {int}
*/
col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.s = s;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.FormattedValue = function FormattedValue(/* {expr_ty} */value,
/*
{int} */
conversion, /* {expr_ty} */
format_spec,
/* {int}
*/
lineno,
/* {int}
*/
col_offset,
/*
{int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.conversion = conversion;
  this.format_spec = format_spec;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.JoinedStr = function JoinedStr(/* {asdl_seq *} */values,
/* {int}
*/
lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.values = values;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Bytes = function Bytes(/* {bytes} */s, /* {int} */lineno,
/*
{int} */
col_offset, /* {int} */
end_lineno, /* {int} */end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.s = s;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.NameConstant = function NameConstant(/* {singleton} */value,
/*
{int} */
lineno,
/* {int}
*/
col_offset,
/* {int}
*/
end_lineno,
/* {int}
*/
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Ellipsis = function Ellipsis(/* {int} */lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Constant = function Constant(/* {constant} */value, /* {int} */
lineno, /* {int} */col_offset, /* {int} */end_lineno,
/* {int}
*/
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Attribute = function Attribute(/* {expr_ty} */value,
/*
{identifier} */
attr,
/*
{expr_context_ty} */
ctx,
/*
{int} */
lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.attr = attr;
  this.ctx = ctx;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Subscript = function Subscript(/* {expr_ty} */value,
/* {slice_ty}
*/
slice,
/* {expr_context_ty}
*/
ctx, /* {int} */lineno,
/*
{int} */
col_offset,
/* {int}
*/
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.slice = slice;
  this.ctx = ctx;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Starred = function Starred(/* {expr_ty} */value,
/*
{expr_context_ty} */
ctx,
/* {int}
*/
lineno, /* {int} */col_offset, /* {int} */end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.value = value;
  this.ctx = ctx;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Name = function Name(/* {identifier} */id, /* {expr_context_ty} */
ctx, /* {int} */lineno, /* {int} */
col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.id = id;
  this.ctx = ctx;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.List = function List(/* {asdl_seq *} */elts,
/* {expr_context_ty}
*/
ctx, /* {int} */lineno, /* {int} */
col_offset, /* {int} */end_lineno,
/*
{int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.elts = elts;
  this.ctx = ctx;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Tuple = function Tuple(/* {asdl_seq *} */elts,
/*
{expr_context_ty} */
ctx, /* {int} */
lineno, /* {int} */col_offset,
/*
{int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.elts = elts;
  this.ctx = ctx;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.Slice = function Slice(/* {expr_ty} */lower, /* {expr_ty} */
upper, /* {expr_ty} */step) {
  this.lower = lower;
  this.upper = upper;
  this.step = step;
  return this;
};

/** @constructor */
Sk.astnodes.ExtSlice = function ExtSlice(/* {asdl_seq *} */dims) {
  this.dims = dims;
  return this;
};

/** @constructor */
Sk.astnodes.Index = function Index(/* {expr_ty} */value) {
  this.value = value;
  return this;
};

/** @constructor */
Sk.astnodes.comprehension = function comprehension(/* {expr_ty} */target,
/*
{expr_ty} */
iter,
/*
{asdl_seq *} */
ifs,
/*
{int} */
is_async) {
  this.target = target;
  this.iter = iter;
  this.ifs = ifs;
  this.is_async = is_async;
  return this;
};

/** @constructor */
Sk.astnodes.ExceptHandler = function ExceptHandler(/* {expr_ty} */type,
/*
{identifier} */
name, /* {asdl_seq *} */
body, /* {int} */
lineno, /* {int} */
col_offset, /* {int} */
end_lineno, /* {int} */
end_col_offset) {
  Sk.asserts.assert(lineno !== null && lineno !== undefined);
  Sk.asserts.assert(col_offset !== null && col_offset !== undefined);
  Sk.asserts.assert(end_lineno !== null && end_lineno !== undefined);
  Sk.asserts.assert(end_col_offset !== null && end_col_offset !== undefined);
  this.type = type;
  this.name = name;
  this.body = body;
  this.lineno = lineno;
  this.col_offset = col_offset;
  this.end_lineno = end_lineno;
  this.end_col_offset = end_col_offset;
  return this;
};

/** @constructor */
Sk.astnodes.arguments_ = function arguments_(/* {asdl_seq *} */args,
/*
{arg_ty} */
vararg,
/*
{asdl_seq *} */
kwonlyargs, /* {asdl_seq *} */
kw_defaults, /* {arg_ty} */
kwarg, /* {asdl_seq *} */
defaults) {
  this.args = args;
  this.vararg = vararg;
  this.kwonlyargs = kwonlyargs;
  this.kw_defaults = kw_defaults;
  this.kwarg = kwarg;
  this.defaults = defaults;
  return this;
};

/** @constructor */
Sk.astnodes.arg = function arg(/* {identifier} */arg, /* {expr_ty} */
annotation) {
  this.arg = arg;
  this.annotation = annotation;
  return this;
};

/** @constructor */
Sk.astnodes.keyword = function keyword(/* {identifier} */arg, /* {expr_ty} */
value) {
  this.arg = arg;
  this.value = value;
  return this;
};

/** @constructor */
Sk.astnodes.alias = function alias(/* {identifier} */name, /* {identifier} */
asname) {
  this.name = name;
  this.asname = asname;
  return this;
};

/** @constructor */
Sk.astnodes.withitem = function withitem(/* {expr_ty} */context_expr,
/*
{expr_ty} */
optional_vars) {
  this.context_expr = context_expr;
  this.optional_vars = optional_vars;
  return this;
};
Sk.astnodes.Module.prototype._astname = "Module";
Sk.astnodes.Module.prototype._fields = ["body", function (n) {
  return n.body;
}, "docstring", function (n) {
  return n.docstring;
}];
Sk.astnodes.Interactive.prototype._astname = "Interactive";
Sk.astnodes.Interactive.prototype._fields = ["body", function (n) {
  return n.body;
}];
Sk.astnodes.Expression.prototype._astname = "Expression";
Sk.astnodes.Expression.prototype._fields = ["body", function (n) {
  return n.body;
}];
Sk.astnodes.Suite.prototype._astname = "Suite";
Sk.astnodes.Suite.prototype._fields = ["body", function (n) {
  return n.body;
}];
Sk.astnodes.FunctionDef.prototype._astname = "FunctionDef";
Sk.astnodes.FunctionDef.prototype._fields = ["name", function (n) {
  return n.name;
}, "args", function (n) {
  return n.args;
}, "body", function (n) {
  return n.body;
}, "decorator_list", function (n) {
  return n.decorator_list;
}, "returns", function (n) {
  return n.returns;
}, "docstring", function (n) {
  return n.docstring;
}];
Sk.astnodes.AsyncFunctionDef.prototype._astname = "AsyncFunctionDef";
Sk.astnodes.AsyncFunctionDef.prototype._fields = ["name", function (n) {
  return n.name;
}, "args", function (n) {
  return n.args;
}, "body", function (n) {
  return n.body;
}, "decorator_list", function (n) {
  return n.decorator_list;
}, "returns", function (n) {
  return n.returns;
}, "docstring", function (n) {
  return n.docstring;
}];
Sk.astnodes.ClassDef.prototype._astname = "ClassDef";
Sk.astnodes.ClassDef.prototype._fields = ["name", function (n) {
  return n.name;
}, "bases", function (n) {
  return n.bases;
}, "keywords", function (n) {
  return n.keywords;
}, "body", function (n) {
  return n.body;
}, "decorator_list", function (n) {
  return n.decorator_list;
}, "docstring", function (n) {
  return n.docstring;
}];
Sk.astnodes.Return.prototype._astname = "Return";
Sk.astnodes.Return.prototype._fields = ["value", function (n) {
  return n.value;
}];
Sk.astnodes.Delete.prototype._astname = "Delete";
Sk.astnodes.Delete.prototype._fields = ["targets", function (n) {
  return n.targets;
}];
Sk.astnodes.Assign.prototype._astname = "Assign";
Sk.astnodes.Assign.prototype._fields = ["targets", function (n) {
  return n.targets;
}, "value", function (n) {
  return n.value;
}];
Sk.astnodes.AugAssign.prototype._astname = "AugAssign";
Sk.astnodes.AugAssign.prototype._fields = ["target", function (n) {
  return n.target;
}, "op", function (n) {
  return n.op;
}, "value", function (n) {
  return n.value;
}];
Sk.astnodes.AnnAssign.prototype._astname = "AnnAssign";
Sk.astnodes.AnnAssign.prototype._fields = ["target", function (n) {
  return n.target;
}, "annotation", function (n) {
  return n.annotation;
}, "value", function (n) {
  return n.value;
}, "simple", function (n) {
  return n.simple;
}];
Sk.astnodes.For.prototype._astname = "For";
Sk.astnodes.For.prototype._fields = ["target", function (n) {
  return n.target;
}, "iter", function (n) {
  return n.iter;
}, "body", function (n) {
  return n.body;
}, "orelse", function (n) {
  return n.orelse;
}];
Sk.astnodes.AsyncFor.prototype._astname = "AsyncFor";
Sk.astnodes.AsyncFor.prototype._fields = ["target", function (n) {
  return n.target;
}, "iter", function (n) {
  return n.iter;
}, "body", function (n) {
  return n.body;
}, "orelse", function (n) {
  return n.orelse;
}];
Sk.astnodes.While.prototype._astname = "While";
Sk.astnodes.While.prototype._fields = ["test", function (n) {
  return n.test;
}, "body", function (n) {
  return n.body;
}, "orelse", function (n) {
  return n.orelse;
}];
Sk.astnodes.If.prototype._astname = "If";
Sk.astnodes.If.prototype._fields = ["test", function (n) {
  return n.test;
}, "body", function (n) {
  return n.body;
}, "orelse", function (n) {
  return n.orelse;
}];
Sk.astnodes.With.prototype._astname = "With";
Sk.astnodes.With.prototype._fields = ["items", function (n) {
  return n.items;
}, "body", function (n) {
  return n.body;
}];
Sk.astnodes.AsyncWith.prototype._astname = "AsyncWith";
Sk.astnodes.AsyncWith.prototype._fields = ["items", function (n) {
  return n.items;
}, "body", function (n) {
  return n.body;
}];
Sk.astnodes.Raise.prototype._astname = "Raise";
Sk.astnodes.Raise.prototype._fields = ["exc", function (n) {
  return n.exc;
}, "cause", function (n) {
  return n.cause;
}, "inst", function (n) {
  return n.inst;
}, "tback", function (n) {
  return n.tback;
}];
Sk.astnodes.Try.prototype._astname = "Try";
Sk.astnodes.Try.prototype._fields = ["body", function (n) {
  return n.body;
}, "handlers", function (n) {
  return n.handlers;
}, "orelse", function (n) {
  return n.orelse;
}, "finalbody", function (n) {
  return n.finalbody;
}];
Sk.astnodes.Assert.prototype._astname = "Assert";
Sk.astnodes.Assert.prototype._fields = ["test", function (n) {
  return n.test;
}, "msg", function (n) {
  return n.msg;
}];
Sk.astnodes.Import.prototype._astname = "Import";
Sk.astnodes.Import.prototype._fields = ["names", function (n) {
  return n.names;
}];
Sk.astnodes.ImportFrom.prototype._astname = "ImportFrom";
Sk.astnodes.ImportFrom.prototype._fields = ["module", function (n) {
  return n.module;
}, "names", function (n) {
  return n.names;
}, "level", function (n) {
  return n.level;
}];
Sk.astnodes.Global.prototype._astname = "Global";
Sk.astnodes.Global.prototype._fields = ["names", function (n) {
  return n.names;
}];
Sk.astnodes.Nonlocal.prototype._astname = "Nonlocal";
Sk.astnodes.Nonlocal.prototype._fields = ["names", function (n) {
  return n.names;
}];
Sk.astnodes.Expr.prototype._astname = "Expr";
Sk.astnodes.Expr.prototype._fields = ["value", function (n) {
  return n.value;
}];
Sk.astnodes.Pass.prototype._astname = "Pass";
Sk.astnodes.Pass.prototype._fields = [];
Sk.astnodes.Break.prototype._astname = "Break";
Sk.astnodes.Break.prototype._fields = [];
Sk.astnodes.Continue.prototype._astname = "Continue";
Sk.astnodes.Continue.prototype._fields = [];
Sk.astnodes.Print.prototype._astname = "Print";
Sk.astnodes.Print.prototype._fields = ["dest", function (n) {
  return n.dest;
}, "values", function (n) {
  return n.values;
}, "nl", function (n) {
  return n.nl;
}];
Sk.astnodes.Debugger.prototype._astname = "Debugger";
Sk.astnodes.Debugger.prototype._fields = [];
Sk.astnodes.BoolOp.prototype._astname = "BoolOp";
Sk.astnodes.BoolOp.prototype._fields = ["op", function (n) {
  return n.op;
}, "values", function (n) {
  return n.values;
}];
Sk.astnodes.BinOp.prototype._astname = "BinOp";
Sk.astnodes.BinOp.prototype._fields = ["left", function (n) {
  return n.left;
}, "op", function (n) {
  return n.op;
}, "right", function (n) {
  return n.right;
}];
Sk.astnodes.UnaryOp.prototype._astname = "UnaryOp";
Sk.astnodes.UnaryOp.prototype._fields = ["op", function (n) {
  return n.op;
}, "operand", function (n) {
  return n.operand;
}];
Sk.astnodes.Lambda.prototype._astname = "Lambda";
Sk.astnodes.Lambda.prototype._fields = ["args", function (n) {
  return n.args;
}, "body", function (n) {
  return n.body;
}];
Sk.astnodes.IfExp.prototype._astname = "IfExp";
Sk.astnodes.IfExp.prototype._fields = ["test", function (n) {
  return n.test;
}, "body", function (n) {
  return n.body;
}, "orelse", function (n) {
  return n.orelse;
}];
Sk.astnodes.Dict.prototype._astname = "Dict";
Sk.astnodes.Dict.prototype._fields = ["keys", function (n) {
  return n.keys;
}, "values", function (n) {
  return n.values;
}];
Sk.astnodes.Set.prototype._astname = "Set";
Sk.astnodes.Set.prototype._fields = ["elts", function (n) {
  return n.elts;
}];
Sk.astnodes.ListComp.prototype._astname = "ListComp";
Sk.astnodes.ListComp.prototype._fields = ["elt", function (n) {
  return n.elt;
}, "generators", function (n) {
  return n.generators;
}];
Sk.astnodes.SetComp.prototype._astname = "SetComp";
Sk.astnodes.SetComp.prototype._fields = ["elt", function (n) {
  return n.elt;
}, "generators", function (n) {
  return n.generators;
}];
Sk.astnodes.DictComp.prototype._astname = "DictComp";
Sk.astnodes.DictComp.prototype._fields = ["key", function (n) {
  return n.key;
}, "value", function (n) {
  return n.value;
}, "generators", function (n) {
  return n.generators;
}];
Sk.astnodes.GeneratorExp.prototype._astname = "GeneratorExp";
Sk.astnodes.GeneratorExp.prototype._fields = ["elt", function (n) {
  return n.elt;
}, "generators", function (n) {
  return n.generators;
}];
Sk.astnodes.Await.prototype._astname = "Await";
Sk.astnodes.Await.prototype._fields = ["value", function (n) {
  return n.value;
}];
Sk.astnodes.Yield.prototype._astname = "Yield";
Sk.astnodes.Yield.prototype._fields = ["value", function (n) {
  return n.value;
}];
Sk.astnodes.YieldFrom.prototype._astname = "YieldFrom";
Sk.astnodes.YieldFrom.prototype._fields = ["value", function (n) {
  return n.value;
}];
Sk.astnodes.Compare.prototype._astname = "Compare";
Sk.astnodes.Compare.prototype._fields = ["left", function (n) {
  return n.left;
}, "ops", function (n) {
  return n.ops;
}, "comparators", function (n) {
  return n.comparators;
}];
Sk.astnodes.Call.prototype._astname = "Call";
Sk.astnodes.Call.prototype._fields = ["func", function (n) {
  return n.func;
}, "args", function (n) {
  return n.args;
}, "keywords", function (n) {
  return n.keywords;
}];
Sk.astnodes.Num.prototype._astname = "Num";
Sk.astnodes.Num.prototype._fields = ["n", function (n) {
  return n.n;
}];
Sk.astnodes.Str.prototype._astname = "Str";
Sk.astnodes.Str.prototype._fields = ["s", function (n) {
  return n.s;
}];
Sk.astnodes.FormattedValue.prototype._astname = "FormattedValue";
Sk.astnodes.FormattedValue.prototype._fields = ["value", function (n) {
  return n.value;
}, "conversion", function (n) {
  return n.conversion;
}, "format_spec", function (n) {
  return n.format_spec;
}];
Sk.astnodes.JoinedStr.prototype._astname = "JoinedStr";
Sk.astnodes.JoinedStr.prototype._fields = ["values", function (n) {
  return n.values;
}];
Sk.astnodes.Bytes.prototype._astname = "Bytes";
Sk.astnodes.Bytes.prototype._fields = ["s", function (n) {
  return n.s;
}];
Sk.astnodes.NameConstant.prototype._astname = "NameConstant";
Sk.astnodes.NameConstant.prototype._fields = ["value", function (n) {
  return n.value;
}];
Sk.astnodes.Ellipsis.prototype._astname = "Ellipsis";
Sk.astnodes.Ellipsis.prototype._fields = [];
Sk.astnodes.Constant.prototype._astname = "Constant";
Sk.astnodes.Constant.prototype._fields = ["value", function (n) {
  return n.value;
}];
Sk.astnodes.Attribute.prototype._astname = "Attribute";
Sk.astnodes.Attribute.prototype._fields = ["value", function (n) {
  return n.value;
}, "attr", function (n) {
  return n.attr;
}, "ctx", function (n) {
  return n.ctx;
}];
Sk.astnodes.Subscript.prototype._astname = "Subscript";
Sk.astnodes.Subscript.prototype._fields = ["value", function (n) {
  return n.value;
}, "slice", function (n) {
  return n.slice;
}, "ctx", function (n) {
  return n.ctx;
}];
Sk.astnodes.Starred.prototype._astname = "Starred";
Sk.astnodes.Starred.prototype._fields = ["value", function (n) {
  return n.value;
}, "ctx", function (n) {
  return n.ctx;
}];
Sk.astnodes.Name.prototype._astname = "Name";
Sk.astnodes.Name.prototype._fields = ["id", function (n) {
  return n.id;
}, "ctx", function (n) {
  return n.ctx;
}];
Sk.astnodes.List.prototype._astname = "List";
Sk.astnodes.List.prototype._fields = ["elts", function (n) {
  return n.elts;
}, "ctx", function (n) {
  return n.ctx;
}];
Sk.astnodes.Tuple.prototype._astname = "Tuple";
Sk.astnodes.Tuple.prototype._fields = ["elts", function (n) {
  return n.elts;
}, "ctx", function (n) {
  return n.ctx;
}];
Sk.astnodes.Load.prototype._astname = "Load";
Sk.astnodes.Load.prototype._isenum = true;
Sk.astnodes.Store.prototype._astname = "Store";
Sk.astnodes.Store.prototype._isenum = true;
Sk.astnodes.Del.prototype._astname = "Del";
Sk.astnodes.Del.prototype._isenum = true;
Sk.astnodes.AugLoad.prototype._astname = "AugLoad";
Sk.astnodes.AugLoad.prototype._isenum = true;
Sk.astnodes.AugStore.prototype._astname = "AugStore";
Sk.astnodes.AugStore.prototype._isenum = true;
Sk.astnodes.Param.prototype._astname = "Param";
Sk.astnodes.Param.prototype._isenum = true;
Sk.astnodes.Slice.prototype._astname = "Slice";
Sk.astnodes.Slice.prototype._fields = ["lower", function (n) {
  return n.lower;
}, "upper", function (n) {
  return n.upper;
}, "step", function (n) {
  return n.step;
}];
Sk.astnodes.ExtSlice.prototype._astname = "ExtSlice";
Sk.astnodes.ExtSlice.prototype._fields = ["dims", function (n) {
  return n.dims;
}];
Sk.astnodes.Index.prototype._astname = "Index";
Sk.astnodes.Index.prototype._fields = ["value", function (n) {
  return n.value;
}];
Sk.astnodes.And.prototype._astname = "And";
Sk.astnodes.And.prototype._isenum = true;
Sk.astnodes.Or.prototype._astname = "Or";
Sk.astnodes.Or.prototype._isenum = true;
Sk.astnodes.Add.prototype._astname = "Add";
Sk.astnodes.Add.prototype._isenum = true;
Sk.astnodes.Sub.prototype._astname = "Sub";
Sk.astnodes.Sub.prototype._isenum = true;
Sk.astnodes.Mult.prototype._astname = "Mult";
Sk.astnodes.Mult.prototype._isenum = true;
Sk.astnodes.MatMult.prototype._astname = "MatMult";
Sk.astnodes.MatMult.prototype._isenum = true;
Sk.astnodes.Div.prototype._astname = "Div";
Sk.astnodes.Div.prototype._isenum = true;
Sk.astnodes.Mod.prototype._astname = "Mod";
Sk.astnodes.Mod.prototype._isenum = true;
Sk.astnodes.Pow.prototype._astname = "Pow";
Sk.astnodes.Pow.prototype._isenum = true;
Sk.astnodes.LShift.prototype._astname = "LShift";
Sk.astnodes.LShift.prototype._isenum = true;
Sk.astnodes.RShift.prototype._astname = "RShift";
Sk.astnodes.RShift.prototype._isenum = true;
Sk.astnodes.BitOr.prototype._astname = "BitOr";
Sk.astnodes.BitOr.prototype._isenum = true;
Sk.astnodes.BitXor.prototype._astname = "BitXor";
Sk.astnodes.BitXor.prototype._isenum = true;
Sk.astnodes.BitAnd.prototype._astname = "BitAnd";
Sk.astnodes.BitAnd.prototype._isenum = true;
Sk.astnodes.FloorDiv.prototype._astname = "FloorDiv";
Sk.astnodes.FloorDiv.prototype._isenum = true;
Sk.astnodes.Invert.prototype._astname = "Invert";
Sk.astnodes.Invert.prototype._isenum = true;
Sk.astnodes.Not.prototype._astname = "Not";
Sk.astnodes.Not.prototype._isenum = true;
Sk.astnodes.UAdd.prototype._astname = "UAdd";
Sk.astnodes.UAdd.prototype._isenum = true;
Sk.astnodes.USub.prototype._astname = "USub";
Sk.astnodes.USub.prototype._isenum = true;
Sk.astnodes.Eq.prototype._astname = "Eq";
Sk.astnodes.Eq.prototype._isenum = true;
Sk.astnodes.NotEq.prototype._astname = "NotEq";
Sk.astnodes.NotEq.prototype._isenum = true;
Sk.astnodes.Lt.prototype._astname = "Lt";
Sk.astnodes.Lt.prototype._isenum = true;
Sk.astnodes.LtE.prototype._astname = "LtE";
Sk.astnodes.LtE.prototype._isenum = true;
Sk.astnodes.Gt.prototype._astname = "Gt";
Sk.astnodes.Gt.prototype._isenum = true;
Sk.astnodes.GtE.prototype._astname = "GtE";
Sk.astnodes.GtE.prototype._isenum = true;
Sk.astnodes.Is.prototype._astname = "Is";
Sk.astnodes.Is.prototype._isenum = true;
Sk.astnodes.IsNot.prototype._astname = "IsNot";
Sk.astnodes.IsNot.prototype._isenum = true;
Sk.astnodes.In.prototype._astname = "In";
Sk.astnodes.In.prototype._isenum = true;
Sk.astnodes.NotIn.prototype._astname = "NotIn";
Sk.astnodes.NotIn.prototype._isenum = true;
Sk.astnodes.comprehension.prototype._astname = "comprehension";
Sk.astnodes.comprehension.prototype._fields = ["target", function (n) {
  return n.target;
}, "iter", function (n) {
  return n.iter;
}, "ifs", function (n) {
  return n.ifs;
}, "is_async", function (n) {
  return n.is_async;
}];
Sk.astnodes.ExceptHandler.prototype._astname = "ExceptHandler";
Sk.astnodes.ExceptHandler.prototype._fields = ["type", function (n) {
  return n.type;
}, "name", function (n) {
  return n.name;
}, "body", function (n) {
  return n.body;
}];
Sk.astnodes.arguments_.prototype._astname = "arguments";
Sk.astnodes.arguments_.prototype._fields = ["args", function (n) {
  return n.args;
}, "vararg", function (n) {
  return n.vararg;
}, "kwonlyargs", function (n) {
  return n.kwonlyargs;
}, "kw_defaults", function (n) {
  return n.kw_defaults;
}, "kwarg", function (n) {
  return n.kwarg;
}, "defaults", function (n) {
  return n.defaults;
}];
Sk.astnodes.arg.prototype._astname = "arg";
Sk.astnodes.arg.prototype._fields = ["arg", function (n) {
  return n.arg;
}, "annotation", function (n) {
  return n.annotation;
}];
Sk.astnodes.keyword.prototype._astname = "keyword";
Sk.astnodes.keyword.prototype._fields = ["arg", function (n) {
  return n.arg;
}, "value", function (n) {
  return n.value;
}];
Sk.astnodes.alias.prototype._astname = "alias";
Sk.astnodes.alias.prototype._fields = ["name", function (n) {
  return n.name;
}, "asname", function (n) {
  return n.asname;
}];
Sk.astnodes.withitem.prototype._astname = "withitem";
Sk.astnodes.withitem.prototype._fields = ["context_expr", function (n) {
  return n.context_expr;
}, "optional_vars", function (n) {
  return n.optional_vars;
}];
Sk.exportSymbol("Sk.astnodes", Sk.astnodes);

//"""Token constants (from somewhere)."""

var __all__ = ["tok_name", "ISTERMINAL", "ISNONTERMINAL", "ISEOF"];

// #  This file is automatically generated; please don't muck it up!
// #
// #  To update the symbols in this file, 'cd' to the top directory of
// #  the python source tree after building the interpreter and run:
// #
// #    ./python Lib/token.py

// #--start constants--
var tokens = {
  T_ENDMARKER: 0,
  T_NAME: 1,
  T_NUMBER: 2,
  T_STRING: 3,
  T_NEWLINE: 4,
  T_INDENT: 5,
  T_DEDENT: 6,
  T_LPAR: 7,
  T_RPAR: 8,
  T_LSQB: 9,
  T_RSQB: 10,
  T_COLON: 11,
  T_COMMA: 12,
  T_SEMI: 13,
  T_PLUS: 14,
  T_MINUS: 15,
  T_STAR: 16,
  T_SLASH: 17,
  T_VBAR: 18,
  T_AMPER: 19,
  T_LESS: 20,
  T_GREATER: 21,
  T_EQUAL: 22,
  T_DOT: 23,
  T_PERCENT: 24,
  T_LBRACE: 25,
  T_RBRACE: 26,
  T_EQEQUAL: 27,
  T_NOTEQUAL: 28,
  T_LESSEQUAL: 29,
  T_GREATEREQUAL: 30,
  T_TILDE: 31,
  T_CIRCUMFLEX: 32,
  T_LEFTSHIFT: 33,
  T_RIGHTSHIFT: 34,
  T_DOUBLESTAR: 35,
  T_PLUSEQUAL: 36,
  T_MINEQUAL: 37,
  T_STAREQUAL: 38,
  T_SLASHEQUAL: 39,
  T_PERCENTEQUAL: 40,
  T_AMPEREQUAL: 41,
  T_VBAREQUAL: 42,
  T_CIRCUMFLEXEQUAL: 43,
  T_LEFTSHIFTEQUAL: 44,
  T_RIGHTSHIFTEQUAL: 45,
  T_DOUBLESTAREQUAL: 46,
  T_DOUBLESLASH: 47,
  T_DOUBLESLASHEQUAL: 48,
  T_AT: 49,
  T_ATEQUAL: 50,
  T_RARROW: 51,
  T_ELLIPSIS: 52,
  T_OP: 53,
  T_AWAIT: 54,
  T_ASYNC: 55,
  T_ERRORTOKEN: 56,
  //special cases
  T_NT_OFFSET: 256,
  T_N_TOKENS: 60,
  //taken from tokenize.py
  T_COMMENT: 57,
  T_NL: 58,
  T_ENCODING: 59
};
// #--end constants--

var EXACT_TOKEN_TYPES = {
  "!=": tokens.T_NOTEQUAL,
  "%": tokens.T_PERCENT,
  "%=": tokens.T_PERCENTEQUAL,
  "&": tokens.T_AMPER,
  "&=": tokens.T_AMPEREQUAL,
  "(": tokens.T_LPAR,
  ")": tokens.T_RPAR,
  "*": tokens.T_STAR,
  "**": tokens.T_DOUBLESTAR,
  "**=": tokens.T_DOUBLESTAREQUAL,
  "*=": tokens.T_STAREQUAL,
  "+": tokens.T_PLUS,
  "+=": tokens.T_PLUSEQUAL,
  ",": tokens.T_COMMA,
  "-": tokens.T_MINUS,
  "-=": tokens.T_MINEQUAL,
  "->": tokens.T_RARROW,
  ".": tokens.T_DOT,
  "...": tokens.T_ELLIPSIS,
  "/": tokens.T_SLASH,
  "//": tokens.T_DOUBLESLASH,
  "//=": tokens.T_DOUBLESLASHEQUAL,
  "/=": tokens.T_SLASHEQUAL,
  ":": tokens.T_COLON,
  // ":=": tokens.T_COLONEQUAL, // currently not listed in tokens
  ";": tokens.T_SEMI,
  "<": tokens.T_LESS,
  "<<": tokens.T_LEFTSHIFT,
  "<<=": tokens.T_LEFTSHIFTEQUAL,
  "<=": tokens.T_LESSEQUAL,
  "=": tokens.T_EQUAL,
  "==": tokens.T_EQEQUAL,
  ">": tokens.T_GREATER,
  ">=": tokens.T_GREATEREQUAL,
  ">>": tokens.T_RIGHTSHIFT,
  ">>=": tokens.T_RIGHTSHIFTEQUAL,
  "@": tokens.T_AT,
  "@=": tokens.T_ATEQUAL,
  "[": tokens.T_LSQB,
  "]": tokens.T_RSQB,
  "^": tokens.T_CIRCUMFLEX,
  "^=": tokens.T_CIRCUMFLEXEQUAL,
  "{": tokens.T_LBRACE,
  "|": tokens.T_VBAR,
  "|=": tokens.T_VBAREQUAL,
  "}": tokens.T_RBRACE,
  "~": tokens.T_TILDE
};
var tok_name = {};
(function () {
  for (var i in tokens) {
    tok_name[tokens[i]] = i;
  }
})();
__all__.concat(Object.keys(tok_name).map(function (k) {
  return tok_name[k];
}));
function ISTERMINAL(x) {
  return x < tokens.T_NT_OFFSET;
}
function ISNONTERMINAL(x) {
  return x >= tokens.T_NT_OFFSET;
}
function ISEOF(x) {
  return x == tokens.T_ENDMARKER;
}
Sk.token = {};
Sk.token.tokens = tokens;
Sk.token.tok_name = tok_name;
Sk.token.EXACT_TOKEN_TYPES = EXACT_TOKEN_TYPES;
Sk.token.ISTERMINAL = ISTERMINAL;
Sk.token.ISNONTERMINAL = ISNONTERMINAL;
Sk.token.ISEOF = ISEOF;
Sk.exportSymbol("Sk.token", Sk.token);
Sk.exportSymbol("Sk.token.tokens", Sk.token.tokens);
Sk.exportSymbol("Sk.token.tok_name", Sk.token.tok_name);
Sk.exportSymbol("Sk.token.EXACT_TOKEN_TYPES");
Sk.exportSymbol("Sk.token.ISTERMINAL", Sk.token.ISTERMINAL);
Sk.exportSymbol("Sk.token.ISNONTERMINAL", Sk.token.ISNONTERMINAL);
Sk.exportSymbol("Sk.token.ISEOF", Sk.token.ISEOF);

// generated by pgen/main.py
Sk.OpMap = {
  "(": Sk.token.tokens.T_LPAR,
  ")": Sk.token.tokens.T_RPAR,
  "[": Sk.token.tokens.T_LSQB,
  "]": Sk.token.tokens.T_RSQB,
  ":": Sk.token.tokens.T_COLON,
  ",": Sk.token.tokens.T_COMMA,
  ";": Sk.token.tokens.T_SEMI,
  "+": Sk.token.tokens.T_PLUS,
  "-": Sk.token.tokens.T_MINUS,
  "*": Sk.token.tokens.T_STAR,
  "/": Sk.token.tokens.T_SLASH,
  "|": Sk.token.tokens.T_VBAR,
  "&": Sk.token.tokens.T_AMPER,
  "<": Sk.token.tokens.T_LESS,
  ">": Sk.token.tokens.T_GREATER,
  "=": Sk.token.tokens.T_EQUAL,
  ".": Sk.token.tokens.T_DOT,
  "%": Sk.token.tokens.T_PERCENT,
  "`": Sk.token.tokens.T_BACKQUOTE,
  "{": Sk.token.tokens.T_LBRACE,
  "}": Sk.token.tokens.T_RBRACE,
  "@": Sk.token.tokens.T_AT,
  "@=": Sk.token.tokens.T_ATEQUAL,
  "==": Sk.token.tokens.T_EQEQUAL,
  "!=": Sk.token.tokens.T_NOTEQUAL,
  "<>": Sk.token.tokens.T_NOTEQUAL,
  "<=": Sk.token.tokens.T_LESSEQUAL,
  ">=": Sk.token.tokens.T_GREATEREQUAL,
  "~": Sk.token.tokens.T_TILDE,
  "^": Sk.token.tokens.T_CIRCUMFLEX,
  "<<": Sk.token.tokens.T_LEFTSHIFT,
  ">>": Sk.token.tokens.T_RIGHTSHIFT,
  "**": Sk.token.tokens.T_DOUBLESTAR,
  "+=": Sk.token.tokens.T_PLUSEQUAL,
  "-=": Sk.token.tokens.T_MINEQUAL,
  "*=": Sk.token.tokens.T_STAREQUAL,
  "/=": Sk.token.tokens.T_SLASHEQUAL,
  "%=": Sk.token.tokens.T_PERCENTEQUAL,
  "&=": Sk.token.tokens.T_AMPEREQUAL,
  "|=": Sk.token.tokens.T_VBAREQUAL,
  "^=": Sk.token.tokens.T_CIRCUMFLEXEQUAL,
  "<<=": Sk.token.tokens.T_LEFTSHIFTEQUAL,
  ">>=": Sk.token.tokens.T_RIGHTSHIFTEQUAL,
  "**=": Sk.token.tokens.T_DOUBLESTAREQUAL,
  "//": Sk.token.tokens.T_DOUBLESLASH,
  "//=": Sk.token.tokens.T_DOUBLESLASHEQUAL,
  "->": Sk.token.tokens.T_RARROW,
  "...": Sk.token.tokens.T_ELLIPSIS
};
Sk.ParseTables = {
  sym: {
    and_expr: 257,
    and_test: 258,
    annassign: 259,
    arglist: 260,
    argument: 261,
    arith_expr: 262,
    assert_stmt: 263,
    async_funcdef: 264,
    async_stmt: 265,
    atom: 266,
    atom_expr: 267,
    augassign: 268,
    break_stmt: 269,
    classdef: 270,
    comp_for: 271,
    comp_if: 272,
    comp_iter: 273,
    comp_op: 274,
    comparison: 275,
    compound_stmt: 276,
    continue_stmt: 277,
    debugger_stmt: 278,
    decorated: 279,
    decorator: 280,
    decorators: 281,
    del_stmt: 282,
    dictorsetmaker: 283,
    dotted_as_name: 284,
    dotted_as_names: 285,
    dotted_name: 286,
    encoding_decl: 287,
    eval_input: 288,
    except_clause: 289,
    expr: 290,
    expr_stmt: 291,
    exprlist: 292,
    factor: 293,
    file_input: 294,
    flow_stmt: 295,
    for_stmt: 296,
    funcdef: 297,
    global_stmt: 298,
    if_stmt: 299,
    import_as_name: 300,
    import_as_names: 301,
    import_from: 302,
    import_name: 303,
    import_stmt: 304,
    lambdef: 305,
    lambdef_nocond: 306,
    nonlocal_stmt: 307,
    not_test: 308,
    or_test: 309,
    parameters: 310,
    pass_stmt: 311,
    power: 312,
    print_stmt: 313,
    raise_stmt: 314,
    return_stmt: 315,
    shift_expr: 316,
    simple_stmt: 317,
    single_input: 256,
    sliceop: 318,
    small_stmt: 319,
    star_expr: 320,
    stmt: 321,
    subscript: 322,
    subscriptlist: 323,
    suite: 324,
    term: 325,
    test: 326,
    test_nocond: 327,
    testlist: 328,
    testlist_comp: 329,
    testlist_star_expr: 330,
    tfpdef: 331,
    trailer: 332,
    try_stmt: 333,
    typedargslist: 334,
    varargslist: 335,
    vfpdef: 336,
    while_stmt: 337,
    with_item: 338,
    with_stmt: 339,
    xor_expr: 340,
    yield_arg: 341,
    yield_expr: 342,
    yield_stmt: 343
  },
  number2symbol: {
    256: 'single_input',
    257: 'and_expr',
    258: 'and_test',
    259: 'annassign',
    260: 'arglist',
    261: 'argument',
    262: 'arith_expr',
    263: 'assert_stmt',
    264: 'async_funcdef',
    265: 'async_stmt',
    266: 'atom',
    267: 'atom_expr',
    268: 'augassign',
    269: 'break_stmt',
    270: 'classdef',
    271: 'comp_for',
    272: 'comp_if',
    273: 'comp_iter',
    274: 'comp_op',
    275: 'comparison',
    276: 'compound_stmt',
    277: 'continue_stmt',
    278: 'debugger_stmt',
    279: 'decorated',
    280: 'decorator',
    281: 'decorators',
    282: 'del_stmt',
    283: 'dictorsetmaker',
    284: 'dotted_as_name',
    285: 'dotted_as_names',
    286: 'dotted_name',
    287: 'encoding_decl',
    288: 'eval_input',
    289: 'except_clause',
    290: 'expr',
    291: 'expr_stmt',
    292: 'exprlist',
    293: 'factor',
    294: 'file_input',
    295: 'flow_stmt',
    296: 'for_stmt',
    297: 'funcdef',
    298: 'global_stmt',
    299: 'if_stmt',
    300: 'import_as_name',
    301: 'import_as_names',
    302: 'import_from',
    303: 'import_name',
    304: 'import_stmt',
    305: 'lambdef',
    306: 'lambdef_nocond',
    307: 'nonlocal_stmt',
    308: 'not_test',
    309: 'or_test',
    310: 'parameters',
    311: 'pass_stmt',
    312: 'power',
    313: 'print_stmt',
    314: 'raise_stmt',
    315: 'return_stmt',
    316: 'shift_expr',
    317: 'simple_stmt',
    318: 'sliceop',
    319: 'small_stmt',
    320: 'star_expr',
    321: 'stmt',
    322: 'subscript',
    323: 'subscriptlist',
    324: 'suite',
    325: 'term',
    326: 'test',
    327: 'test_nocond',
    328: 'testlist',
    329: 'testlist_comp',
    330: 'testlist_star_expr',
    331: 'tfpdef',
    332: 'trailer',
    333: 'try_stmt',
    334: 'typedargslist',
    335: 'varargslist',
    336: 'vfpdef',
    337: 'while_stmt',
    338: 'with_item',
    339: 'with_stmt',
    340: 'xor_expr',
    341: 'yield_arg',
    342: 'yield_expr',
    343: 'yield_stmt'
  },
  dfas: {
    256: [[[[1, 1], [2, 1], [3, 2]], [[0, 1]], [[2, 1]]], {
      2: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
      19: 1,
      20: 1,
      21: 1,
      22: 1,
      23: 1,
      24: 1,
      25: 1,
      26: 1,
      27: 1,
      28: 1,
      29: 1,
      30: 1,
      31: 1,
      32: 1,
      33: 1,
      34: 1,
      35: 1,
      36: 1,
      37: 1,
      38: 1,
      39: 1,
      40: 1,
      41: 1,
      42: 1,
      43: 1
    }],
    257: [[[[44, 1]], [[45, 0], [0, 1]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    258: [[[[46, 1]], [[47, 0], [0, 1]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    259: [[[[48, 1]], [[49, 2]], [[50, 3], [0, 2]], [[49, 4]], [[0, 4]]], {
      48: 1
    }],
    260: [[[[51, 1]], [[52, 2], [0, 1]], [[51, 1], [0, 2]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      15: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1,
      53: 1
    }],
    261: [[[[49, 1], [15, 2], [53, 2]], [[50, 2], [54, 3], [0, 1]], [[49, 3]], [[0, 3]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      15: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1,
      53: 1
    }],
    262: [[[[55, 1]], [[30, 0], [43, 0], [0, 1]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    263: [[[[24, 1]], [[49, 2]], [[52, 3], [0, 2]], [[49, 4]], [[0, 4]]], {
      24: 1
    }],
    264: [[[[10, 1]], [[56, 2]], [[0, 2]]], {
      10: 1
    }],
    265: [[[[10, 1]], [[57, 2], [56, 2], [58, 2]], [[0, 2]]], {
      10: 1
    }],
    266: [[[[6, 1], [25, 1], [33, 1], [9, 1], [11, 1], [12, 2], [35, 3], [38, 4], [19, 1], [7, 5]], [[0, 1]], [[59, 1], [60, 6]], [[61, 1], [62, 7], [63, 7]], [[64, 1], [63, 8]], [[7, 5], [0, 5]], [[59, 1]], [[61, 1]], [[64, 1]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      25: 1,
      33: 1,
      35: 1,
      38: 1
    }],
    267: [[[[29, 1], [65, 2]], [[65, 2]], [[66, 2], [0, 2]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      25: 1,
      29: 1,
      33: 1,
      35: 1,
      38: 1
    }],
    268: [[[[67, 1], [68, 1], [69, 1], [70, 1], [71, 1], [72, 1], [73, 1], [74, 1], [75, 1], [76, 1], [77, 1], [78, 1], [79, 1]], [[0, 1]]], {
      67: 1,
      68: 1,
      69: 1,
      70: 1,
      71: 1,
      72: 1,
      73: 1,
      74: 1,
      75: 1,
      76: 1,
      77: 1,
      78: 1,
      79: 1
    }],
    269: [[[[39, 1]], [[0, 1]]], {
      39: 1
    }],
    270: [[[[13, 1]], [[25, 2]], [[48, 3], [35, 4]], [[80, 5]], [[61, 6], [81, 7]], [[0, 5]], [[48, 3]], [[61, 6]]], {
      13: 1
    }],
    271: [[[[10, 1], [34, 2]], [[34, 2]], [[82, 3]], [[83, 4]], [[84, 5]], [[85, 6], [0, 5]], [[0, 6]]], {
      10: 1,
      34: 1
    }],
    272: [[[[37, 1]], [[86, 2]], [[85, 3], [0, 2]], [[0, 3]]], {
      37: 1
    }],
    273: [[[[87, 1], [54, 1]], [[0, 1]]], {
      10: 1,
      34: 1,
      37: 1
    }],
    274: [[[[88, 1], [89, 1], [8, 2], [90, 1], [88, 1], [83, 1], [91, 1], [92, 3], [93, 1], [94, 1]], [[0, 1]], [[83, 1]], [[8, 1], [0, 3]]], {
      8: 1,
      83: 1,
      88: 1,
      89: 1,
      90: 1,
      91: 1,
      92: 1,
      93: 1,
      94: 1
    }],
    275: [[[[95, 1]], [[96, 0], [0, 1]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    276: [[[[97, 1], [98, 1], [58, 1], [99, 1], [57, 1], [100, 1], [56, 1], [101, 1], [102, 1]], [[0, 1]]], {
      4: 1,
      10: 1,
      13: 1,
      20: 1,
      21: 1,
      34: 1,
      37: 1,
      41: 1,
      42: 1
    }],
    277: [[[[40, 1]], [[0, 1]]], {
      40: 1
    }],
    278: [[[[17, 1]], [[0, 1]]], {
      17: 1
    }],
    279: [[[[103, 1]], [[56, 2], [104, 2], [99, 2]], [[0, 2]]], {
      41: 1
    }],
    280: [[[[41, 1]], [[105, 2]], [[2, 4], [35, 3]], [[61, 5], [81, 6]], [[0, 4]], [[2, 4]], [[61, 5]]], {
      41: 1
    }],
    281: [[[[106, 1]], [[106, 1], [0, 1]]], {
      41: 1
    }],
    282: [[[[27, 1]], [[82, 2]], [[0, 2]]], {
      27: 1
    }],
    283: [[[[49, 1], [107, 2], [53, 3]], [[48, 4], [54, 5], [52, 6], [0, 1]], [[54, 5], [52, 6], [0, 2]], [[95, 7]], [[49, 7]], [[0, 5]], [[49, 8], [107, 8], [0, 6]], [[54, 5], [52, 9], [0, 7]], [[52, 6], [0, 8]], [[49, 10], [53, 11], [0, 9]], [[48, 12]], [[95, 13]], [[49, 13]], [[52, 9], [0, 13]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      15: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1,
      53: 1
    }],
    284: [[[[105, 1]], [[108, 2], [0, 1]], [[25, 3]], [[0, 3]]], {
      25: 1
    }],
    285: [[[[109, 1]], [[52, 0], [0, 1]]], {
      25: 1
    }],
    286: [[[[25, 1]], [[110, 0], [0, 1]]], {
      25: 1
    }],
    287: [[[[25, 1]], [[0, 1]]], {
      25: 1
    }],
    288: [[[[111, 1]], [[2, 1], [112, 2]], [[0, 2]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    289: [[[[113, 1]], [[49, 2], [0, 1]], [[108, 3], [52, 3], [0, 2]], [[49, 4]], [[0, 4]]], {
      113: 1
    }],
    290: [[[[114, 1]], [[115, 0], [0, 1]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    291: [[[[116, 1]], [[117, 2], [50, 3], [118, 4], [0, 1]], [[111, 4], [62, 4]], [[116, 5], [62, 5]], [[0, 4]], [[50, 3], [0, 5]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      15: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    292: [[[[95, 1], [107, 1]], [[52, 2], [0, 1]], [[95, 1], [107, 1], [0, 2]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      15: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    293: [[[[119, 2], [30, 1], [22, 1], [43, 1]], [[120, 2]], [[0, 2]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    294: [[[[2, 0], [112, 1], [121, 0]], [[0, 1]]], {
      2: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
      19: 1,
      20: 1,
      21: 1,
      22: 1,
      23: 1,
      24: 1,
      25: 1,
      26: 1,
      27: 1,
      28: 1,
      29: 1,
      30: 1,
      31: 1,
      32: 1,
      33: 1,
      34: 1,
      35: 1,
      36: 1,
      37: 1,
      38: 1,
      39: 1,
      40: 1,
      41: 1,
      42: 1,
      43: 1,
      112: 1
    }],
    295: [[[[122, 1], [123, 1], [124, 1], [125, 1], [126, 1]], [[0, 1]]], {
      5: 1,
      23: 1,
      31: 1,
      39: 1,
      40: 1
    }],
    296: [[[[34, 1]], [[82, 2]], [[83, 3]], [[111, 4]], [[48, 5]], [[80, 6]], [[127, 7], [0, 6]], [[48, 8]], [[80, 9]], [[0, 9]]], {
      34: 1
    }],
    297: [[[[4, 1]], [[25, 2]], [[128, 3]], [[48, 4], [129, 5]], [[80, 6]], [[49, 7]], [[0, 6]], [[48, 4]]], {
      4: 1
    }],
    298: [[[[26, 1]], [[25, 2]], [[52, 1], [0, 2]]], {
      26: 1
    }],
    299: [[[[37, 1]], [[49, 2]], [[48, 3]], [[80, 4]], [[127, 5], [130, 1], [0, 4]], [[48, 6]], [[80, 7]], [[0, 7]]], {
      37: 1
    }],
    300: [[[[25, 1]], [[108, 2], [0, 1]], [[25, 3]], [[0, 3]]], {
      25: 1
    }],
    301: [[[[131, 1]], [[52, 2], [0, 1]], [[131, 1], [0, 2]]], {
      25: 1
    }],
    302: [[[[36, 1]], [[105, 2], [19, 3], [110, 3]], [[32, 4]], [[105, 2], [19, 3], [32, 4], [110, 3]], [[132, 5], [15, 5], [35, 6]], [[0, 5]], [[132, 7]], [[61, 5]]], {
      36: 1
    }],
    303: [[[[32, 1]], [[133, 2]], [[0, 2]]], {
      32: 1
    }],
    304: [[[[134, 1], [135, 1]], [[0, 1]]], {
      32: 1,
      36: 1
    }],
    305: [[[[14, 1]], [[48, 2], [136, 3]], [[49, 4]], [[48, 2]], [[0, 4]]], {
      14: 1
    }],
    306: [[[[14, 1]], [[48, 2], [136, 3]], [[86, 4]], [[48, 2]], [[0, 4]]], {
      14: 1
    }],
    307: [[[[18, 1]], [[25, 2]], [[52, 1], [0, 2]]], {
      18: 1
    }],
    308: [[[[8, 1], [137, 2]], [[46, 2]], [[0, 2]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    309: [[[[138, 1]], [[139, 0], [0, 1]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    310: [[[[35, 1]], [[61, 2], [140, 3]], [[0, 2]], [[61, 2]]], {
      35: 1
    }],
    311: [[[[28, 1]], [[0, 1]]], {
      28: 1
    }],
    312: [[[[141, 1]], [[53, 2], [0, 1]], [[120, 3]], [[0, 3]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      25: 1,
      29: 1,
      33: 1,
      35: 1,
      38: 1
    }],
    313: [[[[16, 1]], [[49, 2], [142, 3], [0, 1]], [[52, 4], [0, 2]], [[49, 5]], [[49, 2], [0, 4]], [[52, 6], [0, 5]], [[49, 7]], [[52, 8], [0, 7]], [[49, 7], [0, 8]]], {
      16: 1
    }],
    314: [[[[5, 1]], [[49, 2], [0, 1]], [[36, 3], [52, 3], [0, 2]], [[49, 4]], [[52, 5], [0, 4]], [[49, 6]], [[0, 6]]], {
      5: 1
    }],
    315: [[[[23, 1]], [[111, 2], [0, 1]], [[0, 2]]], {
      23: 1
    }],
    316: [[[[143, 1]], [[144, 0], [142, 0], [0, 1]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    317: [[[[145, 1]], [[2, 2], [146, 3]], [[0, 2]], [[145, 1], [2, 2]]], {
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
      19: 1,
      22: 1,
      23: 1,
      24: 1,
      25: 1,
      26: 1,
      27: 1,
      28: 1,
      29: 1,
      30: 1,
      31: 1,
      32: 1,
      33: 1,
      35: 1,
      36: 1,
      38: 1,
      39: 1,
      40: 1,
      43: 1
    }],
    318: [[[[48, 1]], [[49, 2], [0, 1]], [[0, 2]]], {
      48: 1
    }],
    319: [[[[147, 1], [148, 1], [149, 1], [150, 1], [151, 1], [152, 1], [153, 1], [154, 1], [155, 1], [156, 1]], [[0, 1]]], {
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
      19: 1,
      22: 1,
      23: 1,
      24: 1,
      25: 1,
      26: 1,
      27: 1,
      28: 1,
      29: 1,
      30: 1,
      31: 1,
      32: 1,
      33: 1,
      35: 1,
      36: 1,
      38: 1,
      39: 1,
      40: 1,
      43: 1
    }],
    320: [[[[15, 1]], [[95, 2]], [[0, 2]]], {
      15: 1
    }],
    321: [[[[1, 1], [3, 1]], [[0, 1]]], {
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
      19: 1,
      20: 1,
      21: 1,
      22: 1,
      23: 1,
      24: 1,
      25: 1,
      26: 1,
      27: 1,
      28: 1,
      29: 1,
      30: 1,
      31: 1,
      32: 1,
      33: 1,
      34: 1,
      35: 1,
      36: 1,
      37: 1,
      38: 1,
      39: 1,
      40: 1,
      41: 1,
      42: 1,
      43: 1
    }],
    322: [[[[49, 1], [48, 2]], [[48, 2], [0, 1]], [[49, 3], [157, 4], [0, 2]], [[157, 4], [0, 3]], [[0, 4]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1,
      48: 1
    }],
    323: [[[[158, 1]], [[52, 2], [0, 1]], [[158, 1], [0, 2]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1,
      48: 1
    }],
    324: [[[[1, 1], [2, 2]], [[0, 1]], [[159, 3]], [[121, 4]], [[160, 1], [121, 4]]], {
      2: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 1,
      18: 1,
      19: 1,
      22: 1,
      23: 1,
      24: 1,
      25: 1,
      26: 1,
      27: 1,
      28: 1,
      29: 1,
      30: 1,
      31: 1,
      32: 1,
      33: 1,
      35: 1,
      36: 1,
      38: 1,
      39: 1,
      40: 1,
      43: 1
    }],
    325: [[[[120, 1]], [[161, 0], [15, 0], [162, 0], [41, 0], [163, 0], [0, 1]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    326: [[[[84, 1], [164, 2]], [[37, 3], [0, 1]], [[0, 2]], [[84, 4]], [[127, 5]], [[49, 2]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    327: [[[[165, 1], [84, 1]], [[0, 1]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    328: [[[[49, 1]], [[52, 2], [0, 1]], [[49, 1], [0, 2]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    329: [[[[49, 1], [107, 1]], [[54, 2], [52, 3], [0, 1]], [[0, 2]], [[49, 4], [107, 4], [0, 3]], [[52, 3], [0, 4]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      15: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    330: [[[[49, 1], [107, 1]], [[52, 2], [0, 1]], [[49, 1], [107, 1], [0, 2]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      15: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    331: [[[[25, 1]], [[48, 2], [0, 1]], [[49, 3]], [[0, 3]]], {
      25: 1
    }],
    332: [[[[35, 1], [110, 2], [38, 3]], [[61, 4], [81, 5]], [[25, 4]], [[166, 6]], [[0, 4]], [[61, 4]], [[64, 4]]], {
      35: 1,
      38: 1,
      110: 1
    }],
    333: [[[[20, 1]], [[48, 2]], [[80, 3]], [[167, 4], [168, 5]], [[48, 6]], [[48, 7]], [[80, 8]], [[80, 9]], [[167, 4], [127, 10], [168, 5], [0, 8]], [[0, 9]], [[48, 11]], [[80, 12]], [[168, 5], [0, 12]]], {
      20: 1
    }],
    334: [[[[15, 1], [169, 2], [53, 3]], [[169, 4], [52, 5], [0, 1]], [[50, 6], [52, 7], [0, 2]], [[169, 8]], [[52, 5], [0, 4]], [[169, 9], [53, 3], [0, 5]], [[49, 10]], [[15, 11], [169, 2], [53, 3], [0, 7]], [[52, 12], [0, 8]], [[50, 13], [52, 5], [0, 9]], [[52, 7], [0, 10]], [[169, 14], [52, 15], [0, 11]], [[0, 12]], [[49, 4]], [[52, 15], [0, 14]], [[169, 16], [53, 3], [0, 15]], [[50, 17], [52, 15], [0, 16]], [[49, 14]]], {
      15: 1,
      25: 1,
      53: 1
    }],
    335: [[[[15, 1], [53, 2], [170, 3]], [[170, 5], [52, 4], [0, 1]], [[170, 6]], [[50, 7], [52, 8], [0, 3]], [[53, 2], [170, 9], [0, 4]], [[52, 4], [0, 5]], [[52, 10], [0, 6]], [[49, 11]], [[15, 12], [53, 2], [170, 3], [0, 8]], [[50, 13], [52, 4], [0, 9]], [[0, 10]], [[52, 8], [0, 11]], [[52, 15], [170, 14], [0, 12]], [[49, 5]], [[52, 15], [0, 14]], [[53, 2], [170, 16], [0, 15]], [[50, 17], [52, 15], [0, 16]], [[49, 14]]], {
      15: 1,
      25: 1,
      53: 1
    }],
    336: [[[[25, 1]], [[0, 1]]], {
      25: 1
    }],
    337: [[[[21, 1]], [[49, 2]], [[48, 3]], [[80, 4]], [[127, 5], [0, 4]], [[48, 6]], [[80, 7]], [[0, 7]]], {
      21: 1
    }],
    338: [[[[49, 1]], [[108, 2], [0, 1]], [[95, 3]], [[0, 3]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    339: [[[[42, 1]], [[171, 2]], [[48, 3], [52, 1]], [[80, 4]], [[0, 4]]], {
      42: 1
    }],
    340: [[[[172, 1]], [[173, 0], [0, 1]]], {
      6: 1,
      7: 1,
      9: 1,
      11: 1,
      12: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      38: 1,
      43: 1
    }],
    341: [[[[111, 2], [36, 1]], [[49, 2]], [[0, 2]]], {
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      11: 1,
      12: 1,
      14: 1,
      19: 1,
      22: 1,
      25: 1,
      29: 1,
      30: 1,
      33: 1,
      35: 1,
      36: 1,
      38: 1,
      43: 1
    }],
    342: [[[[31, 1]], [[174, 2], [0, 1]], [[0, 2]]], {
      31: 1
    }],
    343: [[[[62, 1]], [[0, 1]]], {
      31: 1
    }]
  },
  states: [[[[1, 1], [2, 1], [3, 2]], [[0, 1]], [[2, 1]]], [[[44, 1]], [[45, 0], [0, 1]]], [[[46, 1]], [[47, 0], [0, 1]]], [[[48, 1]], [[49, 2]], [[50, 3], [0, 2]], [[49, 4]], [[0, 4]]], [[[51, 1]], [[52, 2], [0, 1]], [[51, 1], [0, 2]]], [[[49, 1], [15, 2], [53, 2]], [[50, 2], [54, 3], [0, 1]], [[49, 3]], [[0, 3]]], [[[55, 1]], [[30, 0], [43, 0], [0, 1]]], [[[24, 1]], [[49, 2]], [[52, 3], [0, 2]], [[49, 4]], [[0, 4]]], [[[10, 1]], [[56, 2]], [[0, 2]]], [[[10, 1]], [[57, 2], [56, 2], [58, 2]], [[0, 2]]], [[[6, 1], [25, 1], [33, 1], [9, 1], [11, 1], [12, 2], [35, 3], [38, 4], [19, 1], [7, 5]], [[0, 1]], [[59, 1], [60, 6]], [[61, 1], [62, 7], [63, 7]], [[64, 1], [63, 8]], [[7, 5], [0, 5]], [[59, 1]], [[61, 1]], [[64, 1]]], [[[29, 1], [65, 2]], [[65, 2]], [[66, 2], [0, 2]]], [[[67, 1], [68, 1], [69, 1], [70, 1], [71, 1], [72, 1], [73, 1], [74, 1], [75, 1], [76, 1], [77, 1], [78, 1], [79, 1]], [[0, 1]]], [[[39, 1]], [[0, 1]]], [[[13, 1]], [[25, 2]], [[48, 3], [35, 4]], [[80, 5]], [[61, 6], [81, 7]], [[0, 5]], [[48, 3]], [[61, 6]]], [[[10, 1], [34, 2]], [[34, 2]], [[82, 3]], [[83, 4]], [[84, 5]], [[85, 6], [0, 5]], [[0, 6]]], [[[37, 1]], [[86, 2]], [[85, 3], [0, 2]], [[0, 3]]], [[[87, 1], [54, 1]], [[0, 1]]], [[[88, 1], [89, 1], [8, 2], [90, 1], [88, 1], [83, 1], [91, 1], [92, 3], [93, 1], [94, 1]], [[0, 1]], [[83, 1]], [[8, 1], [0, 3]]], [[[95, 1]], [[96, 0], [0, 1]]], [[[97, 1], [98, 1], [58, 1], [99, 1], [57, 1], [100, 1], [56, 1], [101, 1], [102, 1]], [[0, 1]]], [[[40, 1]], [[0, 1]]], [[[17, 1]], [[0, 1]]], [[[103, 1]], [[56, 2], [104, 2], [99, 2]], [[0, 2]]], [[[41, 1]], [[105, 2]], [[2, 4], [35, 3]], [[61, 5], [81, 6]], [[0, 4]], [[2, 4]], [[61, 5]]], [[[106, 1]], [[106, 1], [0, 1]]], [[[27, 1]], [[82, 2]], [[0, 2]]], [[[49, 1], [107, 2], [53, 3]], [[48, 4], [54, 5], [52, 6], [0, 1]], [[54, 5], [52, 6], [0, 2]], [[95, 7]], [[49, 7]], [[0, 5]], [[49, 8], [107, 8], [0, 6]], [[54, 5], [52, 9], [0, 7]], [[52, 6], [0, 8]], [[49, 10], [53, 11], [0, 9]], [[48, 12]], [[95, 13]], [[49, 13]], [[52, 9], [0, 13]]], [[[105, 1]], [[108, 2], [0, 1]], [[25, 3]], [[0, 3]]], [[[109, 1]], [[52, 0], [0, 1]]], [[[25, 1]], [[110, 0], [0, 1]]], [[[25, 1]], [[0, 1]]], [[[111, 1]], [[2, 1], [112, 2]], [[0, 2]]], [[[113, 1]], [[49, 2], [0, 1]], [[108, 3], [52, 3], [0, 2]], [[49, 4]], [[0, 4]]], [[[114, 1]], [[115, 0], [0, 1]]], [[[116, 1]], [[117, 2], [50, 3], [118, 4], [0, 1]], [[111, 4], [62, 4]], [[116, 5], [62, 5]], [[0, 4]], [[50, 3], [0, 5]]], [[[95, 1], [107, 1]], [[52, 2], [0, 1]], [[95, 1], [107, 1], [0, 2]]], [[[119, 2], [30, 1], [22, 1], [43, 1]], [[120, 2]], [[0, 2]]], [[[2, 0], [112, 1], [121, 0]], [[0, 1]]], [[[122, 1], [123, 1], [124, 1], [125, 1], [126, 1]], [[0, 1]]], [[[34, 1]], [[82, 2]], [[83, 3]], [[111, 4]], [[48, 5]], [[80, 6]], [[127, 7], [0, 6]], [[48, 8]], [[80, 9]], [[0, 9]]], [[[4, 1]], [[25, 2]], [[128, 3]], [[48, 4], [129, 5]], [[80, 6]], [[49, 7]], [[0, 6]], [[48, 4]]], [[[26, 1]], [[25, 2]], [[52, 1], [0, 2]]], [[[37, 1]], [[49, 2]], [[48, 3]], [[80, 4]], [[127, 5], [130, 1], [0, 4]], [[48, 6]], [[80, 7]], [[0, 7]]], [[[25, 1]], [[108, 2], [0, 1]], [[25, 3]], [[0, 3]]], [[[131, 1]], [[52, 2], [0, 1]], [[131, 1], [0, 2]]], [[[36, 1]], [[105, 2], [19, 3], [110, 3]], [[32, 4]], [[105, 2], [19, 3], [32, 4], [110, 3]], [[132, 5], [15, 5], [35, 6]], [[0, 5]], [[132, 7]], [[61, 5]]], [[[32, 1]], [[133, 2]], [[0, 2]]], [[[134, 1], [135, 1]], [[0, 1]]], [[[14, 1]], [[48, 2], [136, 3]], [[49, 4]], [[48, 2]], [[0, 4]]], [[[14, 1]], [[48, 2], [136, 3]], [[86, 4]], [[48, 2]], [[0, 4]]], [[[18, 1]], [[25, 2]], [[52, 1], [0, 2]]], [[[8, 1], [137, 2]], [[46, 2]], [[0, 2]]], [[[138, 1]], [[139, 0], [0, 1]]], [[[35, 1]], [[61, 2], [140, 3]], [[0, 2]], [[61, 2]]], [[[28, 1]], [[0, 1]]], [[[141, 1]], [[53, 2], [0, 1]], [[120, 3]], [[0, 3]]], [[[16, 1]], [[49, 2], [142, 3], [0, 1]], [[52, 4], [0, 2]], [[49, 5]], [[49, 2], [0, 4]], [[52, 6], [0, 5]], [[49, 7]], [[52, 8], [0, 7]], [[49, 7], [0, 8]]], [[[5, 1]], [[49, 2], [0, 1]], [[36, 3], [52, 3], [0, 2]], [[49, 4]], [[52, 5], [0, 4]], [[49, 6]], [[0, 6]]], [[[23, 1]], [[111, 2], [0, 1]], [[0, 2]]], [[[143, 1]], [[144, 0], [142, 0], [0, 1]]], [[[145, 1]], [[2, 2], [146, 3]], [[0, 2]], [[145, 1], [2, 2]]], [[[48, 1]], [[49, 2], [0, 1]], [[0, 2]]], [[[147, 1], [148, 1], [149, 1], [150, 1], [151, 1], [152, 1], [153, 1], [154, 1], [155, 1], [156, 1]], [[0, 1]]], [[[15, 1]], [[95, 2]], [[0, 2]]], [[[1, 1], [3, 1]], [[0, 1]]], [[[49, 1], [48, 2]], [[48, 2], [0, 1]], [[49, 3], [157, 4], [0, 2]], [[157, 4], [0, 3]], [[0, 4]]], [[[158, 1]], [[52, 2], [0, 1]], [[158, 1], [0, 2]]], [[[1, 1], [2, 2]], [[0, 1]], [[159, 3]], [[121, 4]], [[160, 1], [121, 4]]], [[[120, 1]], [[161, 0], [15, 0], [162, 0], [41, 0], [163, 0], [0, 1]]], [[[84, 1], [164, 2]], [[37, 3], [0, 1]], [[0, 2]], [[84, 4]], [[127, 5]], [[49, 2]]], [[[165, 1], [84, 1]], [[0, 1]]], [[[49, 1]], [[52, 2], [0, 1]], [[49, 1], [0, 2]]], [[[49, 1], [107, 1]], [[54, 2], [52, 3], [0, 1]], [[0, 2]], [[49, 4], [107, 4], [0, 3]], [[52, 3], [0, 4]]], [[[49, 1], [107, 1]], [[52, 2], [0, 1]], [[49, 1], [107, 1], [0, 2]]], [[[25, 1]], [[48, 2], [0, 1]], [[49, 3]], [[0, 3]]], [[[35, 1], [110, 2], [38, 3]], [[61, 4], [81, 5]], [[25, 4]], [[166, 6]], [[0, 4]], [[61, 4]], [[64, 4]]], [[[20, 1]], [[48, 2]], [[80, 3]], [[167, 4], [168, 5]], [[48, 6]], [[48, 7]], [[80, 8]], [[80, 9]], [[167, 4], [127, 10], [168, 5], [0, 8]], [[0, 9]], [[48, 11]], [[80, 12]], [[168, 5], [0, 12]]], [[[15, 1], [169, 2], [53, 3]], [[169, 4], [52, 5], [0, 1]], [[50, 6], [52, 7], [0, 2]], [[169, 8]], [[52, 5], [0, 4]], [[169, 9], [53, 3], [0, 5]], [[49, 10]], [[15, 11], [169, 2], [53, 3], [0, 7]], [[52, 12], [0, 8]], [[50, 13], [52, 5], [0, 9]], [[52, 7], [0, 10]], [[169, 14], [52, 15], [0, 11]], [[0, 12]], [[49, 4]], [[52, 15], [0, 14]], [[169, 16], [53, 3], [0, 15]], [[50, 17], [52, 15], [0, 16]], [[49, 14]]], [[[15, 1], [53, 2], [170, 3]], [[170, 5], [52, 4], [0, 1]], [[170, 6]], [[50, 7], [52, 8], [0, 3]], [[53, 2], [170, 9], [0, 4]], [[52, 4], [0, 5]], [[52, 10], [0, 6]], [[49, 11]], [[15, 12], [53, 2], [170, 3], [0, 8]], [[50, 13], [52, 4], [0, 9]], [[0, 10]], [[52, 8], [0, 11]], [[52, 15], [170, 14], [0, 12]], [[49, 5]], [[52, 15], [0, 14]], [[53, 2], [170, 16], [0, 15]], [[50, 17], [52, 15], [0, 16]], [[49, 14]]], [[[25, 1]], [[0, 1]]], [[[21, 1]], [[49, 2]], [[48, 3]], [[80, 4]], [[127, 5], [0, 4]], [[48, 6]], [[80, 7]], [[0, 7]]], [[[49, 1]], [[108, 2], [0, 1]], [[95, 3]], [[0, 3]]], [[[42, 1]], [[171, 2]], [[48, 3], [52, 1]], [[80, 4]], [[0, 4]]], [[[172, 1]], [[173, 0], [0, 1]]], [[[111, 2], [36, 1]], [[49, 2]], [[0, 2]]], [[[31, 1]], [[174, 2], [0, 1]], [[0, 2]]], [[[62, 1]], [[0, 1]]]],
  labels: [[0, 'EMPTY'], [317, null], [4, null], [276, null], [1, 'def'], [1, 'raise'], [1, 'True'], [3, null], [1, 'not'], [1, 'null'], [55, null], [2, null], [25, null], [1, 'class'], [1, 'lambda'], [16, null], [1, 'print'], [1, 'debugger'], [1, 'nonlocal'], [52, null], [1, 'try'], [1, 'while'], [31, null], [1, 'return'], [1, 'assert'], [1, null], [1, 'global'], [1, 'del'], [1, 'pass'], [54, null], [15, null], [1, 'yield'], [1, 'import'], [1, 'False'], [1, 'for'], [7, null], [1, 'from'], [1, 'if'], [9, null], [1, 'break'], [1, 'continue'], [49, null], [1, 'with'], [14, null], [316, null], [19, null], [308, null], [1, 'and'], [11, null], [326, null], [22, null], [261, null], [12, null], [35, null], [271, null], [325, null], [297, null], [339, null], [296, null], [26, null], [283, null], [8, null], [342, null], [329, null], [10, null], [266, null], [332, null], [45, null], [38, null], [40, null], [50, null], [46, null], [41, null], [42, null], [36, null], [43, null], [48, null], [44, null], [37, null], [39, null], [324, null], [260, null], [292, null], [1, 'in'], [309, null], [273, null], [327, null], [272, null], [28, null], [21, null], [27, null], [29, null], [1, 'is'], [30, null], [20, null], [290, null], [274, null], [333, null], [299, null], [270, null], [337, null], [279, null], [265, null], [281, null], [264, null], [286, null], [280, null], [320, null], [1, 'as'], [284, null], [23, null], [328, null], [0, null], [1, 'except'], [340, null], [18, null], [330, null], [268, null], [259, null], [312, null], [293, null], [321, null], [269, null], [277, null], [314, null], [315, null], [343, null], [1, 'else'], [310, null], [51, null], [1, 'elif'], [300, null], [301, null], [285, null], [303, null], [302, null], [335, null], [275, null], [258, null], [1, 'or'], [334, null], [267, null], [34, null], [262, null], [33, null], [319, null], [13, null], [295, null], [263, null], [291, null], [311, null], [307, null], [313, null], [282, null], [298, null], [304, null], [278, null], [318, null], [322, null], [5, null], [6, null], [47, null], [17, null], [24, null], [305, null], [306, null], [323, null], [289, null], [1, 'finally'], [331, null], [336, null], [338, null], [257, null], [32, null], [341, null]],
  keywords: {
    'False': 33,
    'null': 9,
    'True': 6,
    'and': 47,
    'as': 108,
    'assert': 24,
    'break': 39,
    'class': 13,
    'continue': 40,
    'debugger': 17,
    'def': 4,
    'del': 27,
    'elif': 130,
    'else': 127,
    'except': 113,
    'finally': 168,
    'for': 34,
    'from': 36,
    'global': 26,
    'if': 37,
    'import': 32,
    'in': 83,
    'is': 92,
    'lambda': 14,
    'nonlocal': 18,
    'not': 8,
    'or': 139,
    'pass': 28,
    'print': 16,
    'raise': 5,
    'return': 23,
    'try': 20,
    'while': 21,
    'with': 42,
    'yield': 31
  },
  tokens: {
    0: 112,
    1: 25,
    2: 11,
    3: 7,
    4: 2,
    5: 159,
    6: 160,
    7: 35,
    8: 61,
    9: 38,
    10: 64,
    11: 48,
    12: 52,
    13: 146,
    14: 43,
    15: 30,
    16: 15,
    17: 162,
    18: 115,
    19: 45,
    20: 94,
    21: 89,
    22: 50,
    23: 110,
    24: 163,
    25: 12,
    26: 59,
    27: 90,
    28: 88,
    29: 91,
    30: 93,
    31: 22,
    32: 173,
    33: 144,
    34: 142,
    35: 53,
    36: 74,
    37: 78,
    38: 68,
    39: 79,
    40: 69,
    41: 72,
    42: 73,
    43: 75,
    44: 77,
    45: 67,
    46: 71,
    47: 161,
    48: 76,
    49: 41,
    50: 70,
    51: 129,
    52: 19,
    54: 29,
    55: 10
  },
  start: 256
};
var tokens = Sk.token.tokens;
var TokenError = Sk.builtin.SyntaxError;
var IndentationError = Sk.builtin.IndentationError;

/**
 *
 * @constructor
 * @param {number} type
 * @param {string} string
 * @param {Array<number>} start
 * @param {Array<number>} end
 * @param {string} line
 */
function TokenInfo(type, string, start, end, line) {
  this.type = type;
  this.string = string;
  this.start = start;
  this.end = end;
  this.line = line;
}
TokenInfo.prototype.exact_type = function () {
  if (this.type == tokens.T_OP && this.string in Sk.token.EXACT_TOKEN_TYPES) {
    return Sk.token.EXACT_TOKEN_TYPES[this.string];
  } else {
    return this.type;
  }
};

/** @param {...*} x */
function group(x) {
  var args = Array.prototype.slice.call(arguments);
  return "(" + args.join("|") + ")";
}

/** @param {...*} x */
function any(x) {
  return group.apply(null, arguments) + "*";
}

/** @param {...*} x */
function maybe(x) {
  return group.apply(null, arguments) + "?";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
  reHasRegExpChar = RegExp(reRegExpChar.source);
function regexEscape(string) {
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
}

/**
 * Iterable contains
 * @template T
 * @param {T} a
 * @param {T} obj
 */
function contains(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}
function rstrip(input, what) {
  var i;
  for (i = input.length; i > 0; --i) {
    if (what.indexOf(input.charAt(i - 1)) === -1) {
      break;
    }
  }
  return input.substring(0, i);
}
var Lu = Unicode.Lu,
  Ll = Unicode.Ll,
  Lt = Unicode.Lt,
  Lm = Unicode.Lm,
  Lo = Unicode.Lo,
  Nl = Unicode.Nl,
  Mn = Unicode.Mn,
  Mc = Unicode.Mc,
  Nd = Unicode.Nd,
  Pc = Unicode.Pc;
var the_underscore = "_";
var Other_ID_Start = "\\u1885-\\u1886\\u2118\\u212E\\u309B-\\u309C";
var Other_ID_Continue = "\\u00B7\\u0387\\u1369-\\u1371\\u19DA";
var id_start = Lu + Ll + Lt + Lm + Lo + Nl + the_underscore + Other_ID_Start;
var id_continue = id_start + Mn + Mc + Nd + Pc + Other_ID_Continue;
var IDENTIFIER = "[" + id_start + "]+[" + id_continue + "]*";
var IS_IDENTIFIER_REGEX = new RegExp("^" + IDENTIFIER + "$");

/**
 * test if string is an identifier
 *
 * @param {str} string
 * @returns {boolean}
 */
function isidentifier(str) {
  var normalized = str.normalize('NFKC');
  return IS_IDENTIFIER_REGEX.test(normalized);
}
Sk.token.isIdentifier = isidentifier;

/* we have to use string and ctor to be able to build patterns up. + on /.../
 * does something strange.
 * Note: we use unicode matching for names ("\w") but ascii matching for
 * number literals.
 *
 * I don't know if the comment above is still actually correct */
var Whitespace = "[ \\f\\t]*";
var Comment_ = "#[^\\r\\n]*";
var Ignore = Whitespace + any("\\\\\\r?\\n" + Whitespace) + maybe(Comment_);
var Name = IDENTIFIER; // this differs form tokenize.py (\w+) which isn't valid for python identifiers

var Exponent = "[eE][-+]?[0-9](?:_?[0-9])*";
var Pointfloat = group("[0-9](?:_?[0-9])*\\.(?:[0-9](?:_?[0-9])*)?", "\\.[0-9](?:_?[0-9])*") + maybe(Exponent);
var Expfloat = "[0-9](?:_?[0-9])*" + Exponent;
var Floatnumber = group(Pointfloat, Expfloat);
var Imagnumber = group("[0-9](?:_?[0-9])*[jJ]", Floatnumber + "[jJ]");

// Return the empty string, plus all of the valid string prefixes.
function _all_string_prefixes() {
  return ['', 'FR', 'RF', 'Br', 'BR', 'Fr', 'r', 'B', 'R', 'b', 'bR', 'f', 'rb', 'rB', 'F', 'Rf', 'U', 'rF', 'u', 'RB', 'br', 'fR', 'fr', 'rf', 'Rb'];
}

// Note that since _all_string_prefixes includes the empty string,
//  StringPrefix can be the empty string (making it optional).
var StringPrefix = group.apply(null, _all_string_prefixes());

// these regexes differ from python because .exec doesn't do the
// same thing as .match in python. It's more like .search.
// .match matches from the start of the string.
// to get the same behaviour we can add a ^ to the start of the
// regex
// Tail end of ' string.
var Single = "^[^'\\\\]*(?:\\\\.[^'\\\\]*)*'";
// Tail end of " string.
var Double = '^[^"\\\\]*(?:\\\\.[^"\\\\]*)*"';
// Tail end of ''' string.
var Single3 = "^[^'\\\\]*(?:(?:\\\\.|'(?!''))[^'\\\\]*)*'''";
// Tail end of """ string.
var Double3 = '^[^"\\\\]*(?:(?:\\\\.|"(?!""))[^"\\\\]*)*"""';
var Triple = group(StringPrefix + "'''", StringPrefix + '"""');
// Single-line ' or " string.
var String_ = group(StringPrefix + "'[^\\n'\\\\]*(?:\\\\.[^\\n'\\\\]*)*'", StringPrefix + '"[^\\n"\\\\]*(?:\\\\.[^\\n"\\\\]*)*"');

// Sorting in reverse order puts the long operators before their prefixes.
// Otherwise if = came before ==, == would get recognized as two instances
// of =.
var EXACT_TOKENS_SORTED;
var Special;
var Funny;
function setupTokens(py3) {
  // recompute the above two lines
  // <> should be included in py2 mode
  if (py3) {
    delete Sk.token.EXACT_TOKEN_TYPES["<>"];
  } else {
    Sk.token.EXACT_TOKEN_TYPES["<>"] = Sk.token.tokens.T_NOTEQUAL;
  }
  EXACT_TOKENS_SORTED = Object.keys(Sk.token.EXACT_TOKEN_TYPES).sort();
  Special = group.apply(this, EXACT_TOKENS_SORTED.reverse().map(function (t) {
    return regexEscape(t);
  }));
  Funny = group("\\r?\\n", Special);
}
setupTokens(true);
Sk.token.setupTokens = setupTokens;

// these aren't actually used
// var PlainToken = group(Number_, Funny, String_, Name);
// var Token = Ignore + PlainToken;

// First (or only) line of ' or " string.
var ContStr = group(StringPrefix + "'[^\\n'\\\\]*(?:\\\\.[^\\n'\\\\]*)*" + group("'", '\\\\\\r?\\n'), StringPrefix + '"[^\\n"\\\\]*(?:\\\\.[^\\n"\\\\]*)*' + group('"', '\\\\\\r?\\n'));
var PseudoExtras = group('\\\\\\r?\\n|$', Comment_, Triple);

// For a given string prefix plus quotes, endpats maps it to a regex
//  to match the remainder of that string. _prefix can be empty, for
//  a normal single or triple quoted string (with no prefix).
var endpats = {};
var prefixes = _all_string_prefixes();
var _iterator = _createForOfIteratorHelper(prefixes),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var _prefix = _step.value;
    endpats[_prefix + "'"] = RegExp(Single);
    endpats[_prefix + "\""] = RegExp(Double);
    endpats[_prefix + "'''"] = RegExp(Single3);
    endpats[_prefix + "\"\"\""] = RegExp(Double3);
  }

  // A set of all of the single and triple quoted string prefixes,
  //  including the opening quotes.
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
var single_quoted = [];
var triple_quoted = [];
var _iterator2 = _createForOfIteratorHelper(prefixes),
  _step2;
try {
  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    var t = _step2.value;
    single_quoted.push(t + '"');
    single_quoted.push(t + "'");
    triple_quoted.push(t + '"""');
    triple_quoted.push(t + "'''");
  }
} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}
var tabsize = 8;
var PseudoTokenRegex;
function _setupTokenRegexes() {
  // we make these regexes here because they can
  // be changed by the configuration.
  var LSuffix = !Sk.__future__.python3 ? '(?:L?)' : '';
  var Hexnumber = '0[xX](?:_?[0-9a-fA-F])+' + LSuffix;
  var Binnumber = '0[bB](?:_?[01])+' + LSuffix;
  var Octnumber = '0([oO])(?:_?[0-7])+' + LSuffix;
  var SilentOctnumber = '0([oO]?)(?:_?[0-7])+' + LSuffix;
  var Decnumber = '(?:0(?:_?0)*|[1-9](?:_?[0-9])*)' + LSuffix;
  var Intnumber = group(Hexnumber, Binnumber, Sk.__future__.silent_octal_literal ? SilentOctnumber : Octnumber, Decnumber);
  var Number_ = group(Imagnumber, Floatnumber, Intnumber);
  var PseudoToken = Whitespace + group(PseudoExtras, Number_, Funny, ContStr, Name);
  PseudoTokenRegex = new RegExp(PseudoToken);
}
Sk._setupTokenRegexes = _setupTokenRegexes;
Sk.exportSymbol("Sk._setupTokenRegexes", Sk._setupTokenRegexes);

/**
 * internal tokenize function
 *
 * @param {function(): string} readline
 * @param {string} encoding
 * @param {function(TokenInfo): void} yield_
 */
function _tokenize(readline, encoding, yield_, filename) {
  var lnum = 0,
    parenlev = 0,
    continued = 0,
    numchars = '0123456789',
    contstr = '',
    needcont = 0,
    contline = null,
    indents = [0],
    spos = [0, 0],
    epos = [0, 0],
    capos = null,
    endprog = undefined,
    strstart = undefined,
    end = undefined,
    pseudomatch = undefined;
  if (encoding !== undefined) {
    if (encoding == "utf-8-sig") {
      // BOM will already have been stripped.
      encoding = "utf-8";
    }
    yield_(new TokenInfo(tokens.T_ENCODING, encoding, [0, 0], [0, 0], ""));
  }
  var last_line = "";
  var line = "";
  while (true) {
    // loop over lines in stream
    try {
      // We capture the value of the line variable here because
      // readline uses the empty string '' to signal end of input,
      // hence `line` itself will always be overwritten at the end
      // of this loop.
      last_line = line;
      line = readline();
    } catch (Exception) {
      line = "";
    }

    // lets pretend this doesn't exist for now.
    // if encoding is not None:
    //     line = line.decode(encoding)
    lnum += 1;
    var pos = 0;
    var max = line.length;
    if (contstr) {
      // continued string
      if (!line) {
        //throw new TokenError("EOF in multi-line string", strstart);
        throw _construct(TokenError, ["EOF in multi-line string", filename, last_line].concat(_toConsumableArray(spos), _toConsumableArray(epos)));
      }
      endprog.lastIndex = 0;
      var endmatch = endprog.exec(line);
      if (endmatch) {
        pos = end = endmatch[0].length;
        yield_(new TokenInfo(tokens.T_STRING, contstr + line.substring(0, end), strstart, [lnum, end], contline + line));
        contstr = "";
        needcont = 0;
        contline = null;
      } else if (needcont && line.substring(line.length - 2) !== "\\\n" && line.substring(line.length - 3) !== "\\\r\n") {
        yield_(new TokenInfo(tokens.T_ERRORTOKEN, contstr + line, strstart, [lnum, line.length], contline));
        contstr = "";
        contline = null;
        continue;
      } else {
        contstr = contstr + line;
        contline = contline + line;
        continue;
      }
    } else if (parenlev == 0 && !continued) {
      // new statement
      if (!line) {
        break;
      }
      var column = 0;
      while (pos < max) {
        // measure leading whitespace
        if (line[pos] == " ") {
          column += 1;
        } else if (line[pos] == "\t") {
          column = Math.floor(column / tabsize + 1) * tabsize;
        } else if (line[pos] == "\f") {
          column = 0;
        } else {
          break;
        }
        ;
        pos += 1;
      }
      if (pos == max) {
        break;
      }
      if (contains("#\r\n", line[pos])) {
        // skip comments or blank lines
        if (line[pos] == "#") {
          var comment_token = rstrip(line.substring(pos), "\r\n");
          yield_(new TokenInfo(tokens.T_COMMENT, comment_token, [lnum, pos], [lnum, pos + comment_token.length], line));
          pos += comment_token.length;
        }
        yield_(new TokenInfo(tokens.T_NL, line.substring(pos), [lnum, pos], [lnum, line.length], line));
        continue;
      }
      if (column > indents[indents.length - 1]) {
        // count indents or dedents
        indents.push(column);
        yield_(new TokenInfo(tokens.T_INDENT, line.substring(pos), [lnum, 0], [lnum, pos], line));
      }
      while (column < indents[indents.length - 1]) {
        if (!contains(indents, column)) {
          throw _construct(IndentationError, ["unindent does not match any outer indentation level", filename, spos[0]].concat(_toConsumableArray(spos), _toConsumableArray(epos))); //["<tokenize>", lnum, pos, line]);
        }
        indents = indents.slice(0, -1);
        yield_(new TokenInfo(tokens.T_DEDENT, "", [lnum, pos], [lnum, pos], line));
      }
    } else {
      // continued statement
      if (!line) {
        //throw new TokenError("EOF in multi-line statement", [lnum, 0]);
        throw _construct(TokenError, ["EOF in multi-line statement", filename, last_line].concat(_toConsumableArray(spos), _toConsumableArray(epos)));
      }
      continued = 0;
    }
    while (pos < max) {
      //console.log("pos:"+pos+":"+max);
      // js regexes don't return any info about matches, other than the
      // content. we'd like to put a \w+ before pseudomatch, but then we
      // can't get any data
      capos = line.charAt(pos);
      while (capos === " " || capos === "\f" || capos === "\t") {
        pos += 1;
        capos = line.charAt(pos);
      }
      pseudomatch = PseudoTokenRegex.exec(line.substring(pos));
      if (pseudomatch) {
        // scan for tokens
        var start = pos;
        var end = start + pseudomatch[1].length;
        spos = [lnum, start];
        epos = [lnum, end];
        var pos = end;
        if (start == end) {
          continue;
        }
        var token = line.substring(start, end);
        var initial = line[start];
        //console.log("token:",token, "initial:",initial, start, end);
        if (contains(numchars, initial) ||
        // ordinary number
        initial == "." && token != "." && token != "...") {
          yield_(new TokenInfo(tokens.T_NUMBER, token, spos, epos, line));
        } else if (contains("\r\n", initial)) {
          if (parenlev > 0) {
            yield_(new TokenInfo(tokens.T_NL, token, spos, epos, line));
          } else {
            yield_(new TokenInfo(tokens.T_NEWLINE, token, spos, epos, line));
          }
        } else if (initial == "#") {
          //assert not token.endswith("\n")
          yield_(new TokenInfo(tokens.T_COMMENT, token, spos, epos, line));
        } else if (contains(triple_quoted, token)) {
          endprog = endpats[token];
          endmatch = endprog.exec(line.substring(pos));
          if (endmatch) {
            // all on one line
            pos = endmatch[0].length + pos;
            token = line.substring(start, pos);
            yield_(new TokenInfo(tokens.T_STRING, token, spos, [lnum, pos], line));
          } else {
            strstart = [lnum, start]; // multiple lines
            contstr = line.substring(start);
            contline = line;
            break;
          }
          // Check up to the first 3 chars of the token to see if
          //  they're in the single_quoted set. If so, they start
          //  a string.
          // We're using the first 3, because we're looking for
          //  "rb'" (for example) at the start of the token. If
          //  we switch to longer prefixes, this needs to be
          //  adjusted.
          // Note that initial == token[:1].
          // Also note that single quote checking must come after
          //  triple quote checking (above).
        } else if (contains(single_quoted, initial) || contains(single_quoted, token.substring(0, 2)) || contains(single_quoted, token.substring(0, 3))) {
          if (token[token.length - 1] == "\n") {
            // continued string
            strstart = [lnum, start];
            // Again, using the first 3 chars of the
            //  token. This is looking for the matching end
            //  regex for the correct type of quote
            //  character. So it's really looking for
            //  endpats["'"] or endpats['"'], by trying to
            //  skip string prefix characters, if any.
            endprog = endpats[initial] || endpats[token[1]] || endpats[token[2]];
            contstr = line.substring(start);
            needcont = 1;
            contline = line;
            break;
          } else {
            // ordinary string
            yield_(new TokenInfo(tokens.T_STRING, token, spos, epos, line));
          }
        } else if (isidentifier(initial)) {
          // ordinary name
          yield_(new TokenInfo(tokens.T_NAME, token, spos, epos, line));
        } else if (initial == "\\") {
          // continued stmt
          continued = 1;
        } else {
          if (contains("([{", initial)) {
            parenlev += 1;
          } else if (contains(")]}", initial)) {
            parenlev -= 1;
          }
          yield_(new TokenInfo(tokens.T_OP, token, spos, epos, line));
        }
      } else {
        yield_(new TokenInfo(tokens.T_ERRORTOKEN, line[pos], [lnum, pos], [lnum, pos + 1], line));
        pos += 1;
      }
    }
  }

  // Add an implicit NEWLINE if the input doesn't end in one
  if (last_line && !contains("\r\n", last_line[last_line.length - 1])) {
    yield_(new TokenInfo(tokens.T_NEWLINE, "", [lnum - 1, last_line.length], [lnum - 1, last_line.length + 1], ""));
  }
  for (var i in indents.slice(1)) {
    // pop remaining indent levels
    yield_(new TokenInfo(tokens.T_DEDENT, "", [lnum, 0], [lnum, 0], ""));
  }
  yield_(new TokenInfo(tokens.T_ENDMARKER, "", [lnum, 0], [lnum, 0], ""));
}
Sk._tokenize = _tokenize;
// we use this in ast
Sk._tokenize.Floatnumber = Floatnumber;
Sk.exportSymbol("Sk._tokenize", Sk._tokenize);
// low level parser to a concrete syntax tree, derived from cpython's lib2to3

/**
 *
 * @constructor
 * @param {Object} grammar
 *
 * p = new Parser(grammar);
 * p.setup([start]);
 * foreach input token:
 *     if p.addtoken(...):
 *         break
 * root = p.rootnode
 *
 * can throw SyntaxError
 */
function Parser(filename, grammar) {
  this.filename = filename;
  this.grammar = grammar;
  this.comments = {};
  this.p_flags = 0;
  return this;
}

// all possible parser flags
Parser.FUTURE_PRINT_FUNCTION = "print_function";
Parser.FUTURE_UNICODE_LITERALS = "unicode_literals";
Parser.FUTURE_DIVISION = "division";
Parser.FUTURE_ABSOLUTE_IMPORT = "absolute_import";
Parser.FUTURE_WITH_STATEMENT = "with_statement";
Parser.FUTURE_NESTED_SCOPES = "nested_scopes";
Parser.FUTURE_GENERATORS = "generators";
Parser.CO_FUTURE_PRINT_FUNCTION = 0x10000;
Parser.CO_FUTURE_UNICODE_LITERALS = 0x20000;
Parser.CO_FUTURE_DIVISON = 0x2000;
Parser.CO_FUTURE_ABSOLUTE_IMPORT = 0x4000;
Parser.CO_FUTURE_WITH_STATEMENT = 0x8000;
Parser.prototype.setup = function (start) {
  var stackentry;
  var newnode;
  start = start || this.grammar.start;
  //print("START:"+start);

  newnode = {
    type: start,
    value: null,
    context: null,
    children: []
  };
  stackentry = {
    dfa: this.grammar.dfas[start],
    state: 0,
    node: newnode
  };
  this.stack = [stackentry];
  this.used_names = {};
  Sk._setupTokenRegexes();
};
function findInDfa(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i][0] === obj[0] && a[i][1] === obj[1]) {
      return true;
    }
  }
  return false;
}

// Add a comment
Parser.prototype.addcomment = function (value, start, end, line) {
  if (start[1] != line.search(/\S/)) start[1] = line.search(/\S/);
  this.comments[start] = value;
};

// Add a token; return true if we're done
Parser.prototype.addtoken = function (type, value, context) {
  var errline;
  var itsfirst;
  var itsdfa;
  var state;
  var v;
  var t;
  var newstate;
  var i;
  var a;
  var arcs;
  var first;
  var states;
  var tp;
  var ilabel = this.classify(type, value, context);
  //print("ilabel:"+ilabel);

  OUTERWHILE: while (true) {
    tp = this.stack[this.stack.length - 1];
    states = tp.dfa[0];
    first = tp.dfa[1];
    arcs = states[tp.state];

    // look for a state with this label
    for (a = 0; a < arcs.length; ++a) {
      i = arcs[a][0];
      newstate = arcs[a][1];
      t = this.grammar.labels[i][0];
      v = this.grammar.labels[i][1];
      if (ilabel === i) {
        // look it up in the list of labels
        Sk.asserts.assert(t < 256);
        // shift a token; we're done with it
        this.shift(type, value, newstate, context);
        // pop while we are in an accept-only state
        state = newstate;
        //print("before:"+JSON.stringify(states[state]) + ":state:"+state+":"+JSON.stringify(states[state]));
        /* jshint ignore:start */
        while (states[state].length === 1 && states[state][0][0] === 0 && states[state][0][1] === state) {
          // states[state] == [(0, state)])
          this.pop();
          //print("in after pop:"+JSON.stringify(states[state]) + ":state:"+state+":"+JSON.stringify(states[state]));
          if (this.stack.length === 0) {
            // done!
            return true;
          }
          tp = this.stack[this.stack.length - 1];
          state = tp.state;
          states = tp.dfa[0];
          first = tp.dfa[1];
          //print(JSON.stringify(states), JSON.stringify(first));
          //print("bottom:"+JSON.stringify(states[state]) + ":state:"+state+":"+JSON.stringify(states[state]));
        }
        /* jshint ignore:end */
        // done with this token
        //print("DONE, return false");
        return false;
      } else if (t >= 256) {
        itsdfa = this.grammar.dfas[t];
        itsfirst = itsdfa[1];
        if (itsfirst.hasOwnProperty(ilabel)) {
          // push a symbol
          this.push(t, this.grammar.dfas[t], newstate, context);
          continue OUTERWHILE;
        }
      }
    }

    //print("findInDfa: " + JSON.stringify(arcs)+" vs. " + tp.state);
    if (findInDfa(arcs, [0, tp.state])) {
      // an accepting state, pop it and try something else
      //print("WAA");
      this.pop();
      if (this.stack.length === 0) {
        throw _construct(Sk.builtin.SyntaxError, ["too much input", this.filename].concat(_toConsumableArray(flatten_context(context))));
      }
    } else {
      // no transition
      throw _construct(Sk.builtin.SyntaxError, ["bad input", this.filename].concat(_toConsumableArray(flatten_context(context))));
    }
  }
};
function flatten_context(context) {
  return [context[2], context[0][0], context[0][1], context[1][0], context[1][1]];
}

// turn a token into a label
Parser.prototype.classify = function (type, value, context) {
  var ilabel;
  if (type === Sk.token.tokens.T_NAME) {
    this.used_names[value] = true;
    ilabel = this.grammar.keywords.hasOwnProperty(value) && this.grammar.keywords[value];

    /* Check for handling print as a builtin function */
    if (value === "print" && (this.p_flags & Parser.CO_FUTURE_PRINT_FUNCTION || Sk.__future__.print_function === true)) {
      ilabel = false; // ilabel determines if the value is a keyword
    }
    if (ilabel) {
      //print("is keyword");
      return ilabel;
    }
  }
  ilabel = this.grammar.tokens.hasOwnProperty(type) && this.grammar.tokens[type];
  if (!ilabel) {
    // throw new Sk.builtin.SyntaxError("bad token", type, value, context);
    // Questionable modification to put line number in position 2
    // like everywhere else and filename in position 1.
    var descr = "#" + type;
    for (var i in Sk.token.tokens) {
      if (Sk.token.tokens[i] == type) {
        descr = i;
        break;
      }
    }
    throw _construct(Sk.builtin.SyntaxError, ["bad token " + descr, this.filename].concat(_toConsumableArray(flatten_context(context))));
  }
  return ilabel;
};

// shift a token
Parser.prototype.shift = function (type, value, newstate, context) {
  var dfa = this.stack[this.stack.length - 1].dfa;
  var state = this.stack[this.stack.length - 1].state;
  var node = this.stack[this.stack.length - 1].node;
  //print("context", context);
  var newnode = {
    type: type,
    value: value,
    lineno: context[0][0],
    col_offset: context[0][1],
    end_lineno: context[1][0],
    end_col_offset: context[1][1],
    children: null
  };
  if (newnode) {
    node.children.push(newnode);
  }
  this.stack[this.stack.length - 1] = {
    dfa: dfa,
    state: newstate,
    node: node
  };
};

// push a nonterminal
Parser.prototype.push = function (type, newdfa, newstate, context) {
  var dfa = this.stack[this.stack.length - 1].dfa;
  var node = this.stack[this.stack.length - 1].node;
  var newnode = {
    type: type,
    value: null,
    lineno: context[0][0],
    col_offset: context[0][1],
    end_lineno: context[1][0],
    end_col_offset: context[1][1],
    children: []
  };
  this.stack[this.stack.length - 1] = {
    dfa: dfa,
    state: newstate,
    node: node
  };
  this.stack.push({
    dfa: newdfa,
    state: 0,
    node: newnode
  });
};

//var ac = 0;
//var bc = 0;

// pop a nonterminal
Parser.prototype.pop = function () {
  var node;
  var pop = this.stack.pop();
  var newnode = pop.node;
  //print("POP");
  if (newnode) {
    //print("A", ac++, newnode.type);
    //print("stacklen:"+this.stack.length);
    if (this.stack.length !== 0) {
      //print("B", bc++);
      node = this.stack[this.stack.length - 1].node;
      node.children.push(newnode);
    } else {
      //print("C");
      this.rootnode = newnode;
      this.rootnode.used_names = this.used_names;
    }
  }
};

/**
 * parser for interactive input. returns a function that should be called with
 * lines of input as they are entered. the function will return false
 * until the input is complete, when it will return the rootnode of the parse.
 *
 * @param {string} filename
 * @param {string=} style root of parse tree (optional)
 */
function makeParser(filename, style) {
  if (style === undefined) {
    style = "file_input";
  }
  var p = new Parser(filename, Sk.ParseTables);
  // for closure's benefit
  if (style === "file_input") {
    p.setup(Sk.ParseTables.sym.file_input);
  } else {
    Sk.asserts.fail("todo;");
  }
  return p;
}
Sk.parse = function parse(filename, input) {
  var T_COMMENT = Sk.token.tokens.T_COMMENT;
  var T_NL = Sk.token.tokens.T_NL;
  var T_OP = Sk.token.tokens.T_OP;
  var T_ENDMARKER = Sk.token.tokens.T_ENDMARKER;
  var T_ENCODING = Sk.token.tokens.T_ENCODING;
  var endmarker_seen = false;
  var parser = makeParser(filename);
  var totalLines = 0;

  /**
   * takes a string splits it on '\n' and returns a function that returns
   * @param {Array<string>} input
   * @returns {function(): string}
   */
  function readline(input) {
    var lines = input.split("\n");
    Sk.parse.linecache[filename] = lines.slice();
    lines = lines.reverse();
    totalLines = lines.length;
    return function () {
      if (lines.length === 0) {
        throw new Sk.builtin.Exception("EOF");
      }
      return lines.pop() + "\n";
    };
  }
  Sk._tokenize(readline(input), "utf-8", function (tokenInfo) {
    var s_lineno = tokenInfo.start[0];
    var s_column = tokenInfo.start[1];
    var type = null;
    var prefix, lineno, column;

    /* I don't know
     if (s_lineno !== lineno && s_column !== column)
     {
     // todo; update prefix and line/col
     }
     */

    if (tokenInfo.type === T_COMMENT || tokenInfo.type === T_NL || tokenInfo.type === T_ENCODING) {
      prefix += tokenInfo.value;
      lineno = tokenInfo.end[0];
      column = tokenInfo.end[1];
      if (tokenInfo.string[tokenInfo.string.length - 1] === "\n") {
        lineno += 1;
        column = 0;
      }
      if (tokenInfo.type === T_COMMENT) {
        parser.addcomment(tokenInfo.string, tokenInfo.start, tokenInfo.end, tokenInfo.line);
      }
    } else {
      if (tokenInfo.type === T_OP) {
        type = Sk.OpMap[tokenInfo.string];
      }
      parser.addtoken(type || tokenInfo.type, tokenInfo.string, [tokenInfo.start, tokenInfo.end, tokenInfo.line]);
      if (tokenInfo.type === T_ENDMARKER) {
        endmarker_seen = true;
      }
    }
  }, filename);
  if (!endmarker_seen) {
    throw new Sk.builtin.SyntaxError("incomplete input", this.filename, "", 0, 0, totalLines, 0);
  }

  /**
   * Small adjustments here in order to return th flags and the cst
   */
  var result = {
    "cst": parser.rootnode,
    "flags": parser.p_flags,
    "comments": parser.comments
  };
  return result;
};
Sk.parse.linecache = {};
Sk.parseTreeDump = function parseTreeDump(n, indent) {
  //return JSON.stringify(n, null, 2);
  var i;
  var ret;
  indent = indent || "";
  ret = "";
  ret += indent;
  if (n.type >= 256) {
    // non-term
    ret += Sk.ParseTables.number2symbol[n.type] + "\n";
    for (i = 0; i < n.children.length; ++i) {
      ret += Sk.parseTreeDump(n.children[i], indent + "  ");
    }
  } else {
    ret += Sk.token.tok_name[n.type] + ": " + new Sk.builtin.str(n.value)["$r"]().v + "\n";
  }
  return ret;
};
Sk.exportSymbol("Sk.Parser", Parser);
Sk.exportSymbol("Sk.parse", Sk.parse);
Sk.exportSymbol("Sk.parseTreeDump", Sk.parseTreeDump);
Sk.exportSymbol("Sk.parse.linecache", Sk.parse.linecache);
//
// This is pretty much a straight port of ast.c from CPython 3.7.3
// (with a few leftovers from 2.6.5).
//
// The previous version was easier to work with and more JS-ish, but having a
// somewhat different ast structure than cpython makes testing more difficult.
//
// This way, we can use a dump from the ast module on any arbitrary python
// code and know that we're the same up to ast level, at least.
//

var SYM = Sk.ParseTables.sym;
var TOK = Sk.token.tokens;
var COMP_GENEXP = 0;
var COMP_LISTCOMP = 1;
var COMP_SETCOMP = 2;
var NULL = null;
var _slice_kind = {
  Slice_kind: 1,
  ExtSlice_kind: 2,
  Index_kind: 3
};
var _expr_kind = {
  BoolOp_kind: 1,
  NamedExpr_kind: 2,
  BinOp_kind: 3,
  UnaryOp_kind: 4,
  Lambda_kind: 5,
  IfExp_kind: 6,
  Dict_kind: 7,
  Set_kind: 8,
  ListComp_kind: 9,
  SetComp_kind: 10,
  DictComp_kind: 11,
  GeneratorExp_kind: 12,
  Await_kind: 13,
  Yield_kind: 14,
  YieldFrom_kind: 15,
  Compare_kind: 16,
  Call_kind: 17,
  FormattedValue_kind: 18,
  JoinedStr_kind: 19,
  Constant_kind: 20,
  Attribute_kind: 21,
  Subscript_kind: 22,
  Starred_kind: 23,
  Name_kind: 24,
  List_kind: 25,
  Tuple_kind: 26
};

/** @constructor */
function Compiling(encoding, filename, c_flags) {
  this.c_encoding = encoding;
  this.c_filename = filename;
  this.c_flags = c_flags || 0;
}

/**
 * @return {number}
 */
function NCH(n) {
  Sk.asserts.assert(n !== undefined, "node must be defined");
  if (n.children === null) {
    return 0;
  }
  return n.children.length;
}
function CHILD(n, i) {
  Sk.asserts.assert(n !== undefined, "node must be defined");
  Sk.asserts.assert(i !== undefined, "index of child must be specified");
  return n.children[i];
}
function REQ(n, type) {
  Sk.asserts.assert(n.type === type, "node wasn't expected type");
}
function TYPE(n) {
  return n.type;
}
function LINENO(n) {
  return n.lineno;
}
function STR(ch) {
  return ch.value;
}
function ast_error(c, n, msg) {
  throw _construct(Sk.builtin.SyntaxError, [msg, c.c_filename].concat(_toConsumableArray(get_context(n))));
}
function strobj(s) {
  Sk.asserts.assert(typeof s === "string", "expecting string, got " + _typeof(s));
  return new Sk.builtin.str(s);
}

/** @return {number} */
function numStmts(n) {
  var ch;
  var i;
  var cnt;
  switch (n.type) {
    case SYM.single_input:
      if (CHILD(n, 0).type === TOK.T_NEWLINE) {
        return 0;
      } else {
        return numStmts(CHILD(n, 0));
      }
    case SYM.file_input:
      cnt = 0;
      for (i = 0; i < NCH(n); ++i) {
        ch = CHILD(n, i);
        if (ch.type === SYM.stmt) {
          cnt += numStmts(ch);
        }
      }
      return cnt;
    case SYM.stmt:
      return numStmts(CHILD(n, 0));
    case SYM.compound_stmt:
      return 1;
    case SYM.simple_stmt:
      return Math.floor(NCH(n) / 2);
    // div 2 is to remove count of ;s
    case SYM.suite:
      if (NCH(n) === 1) {
        return numStmts(CHILD(n, 0));
      } else {
        cnt = 0;
        for (i = 2; i < NCH(n) - 1; ++i) {
          cnt += numStmts(CHILD(n, i));
        }
        return cnt;
      }
      break;
    default:
      Sk.asserts.fail("Non-statement found");
  }
  return 0;
}
function forbiddenCheck(c, n, x, lineno) {
  if (x instanceof Sk.builtin.str) {
    x = x.v;
  }
  if (x === "None") {
    throw _construct(Sk.builtin.SyntaxError, ["assignment to None", c.c_filename].concat(_toConsumableArray(get_context(n))));
  }
  if (x === "True" || x === "False") {
    throw _construct(Sk.builtin.SyntaxError, ["assignment to True or False is forbidden", c.c_filename].concat(_toConsumableArray(get_context(n))));
  }
}
function get_context(n) {
  // TODO: The first element should be the actual line of code!
  return ["", n.lineno, n.col_offset || 0, n.end_lineno || n.lineno, n.end_col_offset || 0];
}

/**
 * Set the context ctx for e, recursively traversing e.
 *
 * Only sets context for expr kinds that can appear in assignment context as
 * per the asdl file.
 */
function setContext(c, e, ctx, n) {
  var i;
  var exprName;
  var s;
  Sk.asserts.assert(ctx !== Sk.astnodes.AugStore && ctx !== Sk.astnodes.AugLoad, "context not AugStore or AugLoad");
  s = null;
  exprName = null;
  switch (e.constructor) {
    case Sk.astnodes.Attribute:
    case Sk.astnodes.Name:
      if (ctx === Sk.astnodes.Store) {
        forbiddenCheck(c, n, e.attr, n.lineno);
      }
      e.ctx = ctx;
      break;
    case Sk.astnodes.Starred:
      e.ctx = ctx;
      setContext(c, e.value, ctx, n);
      break;
    case Sk.astnodes.Subscript:
      e.ctx = ctx;
      break;
    case Sk.astnodes.List:
      e.ctx = ctx;
      s = e.elts;
      break;
    case Sk.astnodes.Tuple:
      if (e.elts.length === 0) {
        throw _construct(Sk.builtin.SyntaxError, ["can't assign to ()", c.c_filename].concat(_toConsumableArray(get_context(n))));
      }
      e.ctx = ctx;
      s = e.elts;
      break;
    case Sk.astnodes.Lambda:
      exprName = "lambda";
      break;
    case Sk.astnodes.Call:
      exprName = "function call";
      break;
    case Sk.astnodes.BoolOp:
    case Sk.astnodes.BinOp:
    case Sk.astnodes.UnaryOp:
      exprName = "operator";
      break;
    case Sk.astnodes.GeneratorExp:
      exprName = "generator expression";
      break;
    case Sk.astnodes.Yield:
      exprName = "yield expression";
      break;
    case Sk.astnodes.ListComp:
      exprName = "list comprehension";
      break;
    case Sk.astnodes.SetComp:
      exprName = "set comprehension";
      break;
    case Sk.astnodes.DictComp:
      exprName = "dict comprehension";
      break;
    case Sk.astnodes.Dict:
    case Sk.astnodes.Set:
    case Sk.astnodes.Num:
    case Sk.astnodes.Str:
      exprName = "literal";
      break;
    case Sk.astnodes.NameConstant:
      exprName = "True, False or None";
      break;
    case Sk.astnodes.Compare:
      exprName = "comparison";
      break;
    case Sk.astnodes.Repr:
      exprName = "repr";
      break;
    case Sk.astnodes.IfExp:
      exprName = "conditional expression";
      break;
    default:
      Sk.asserts.fail("unhandled expression in assignment");
  }
  if (exprName) {
    throw _construct(Sk.builtin.SyntaxError, ["can't " + (ctx === Sk.astnodes.Store ? "assign to" : "delete") + " " + exprName, c.c_filename].concat(_toConsumableArray(get_context(n))));
  }
  if (s) {
    for (i = 0; i < s.length; ++i) {
      setContext(c, s[i], ctx, n);
    }
  }
}
var operatorMap = {};
(function () {
  operatorMap[TOK.T_VBAR] = Sk.astnodes.BitOr;
  operatorMap[TOK.T_CIRCUMFLEX] = Sk.astnodes.BitXor;
  operatorMap[TOK.T_AMPER] = Sk.astnodes.BitAnd;
  operatorMap[TOK.T_LEFTSHIFT] = Sk.astnodes.LShift;
  operatorMap[TOK.T_RIGHTSHIFT] = Sk.astnodes.RShift;
  operatorMap[TOK.T_PLUS] = Sk.astnodes.Add;
  operatorMap[TOK.T_MINUS] = Sk.astnodes.Sub;
  operatorMap[TOK.T_STAR] = Sk.astnodes.Mult;
  operatorMap[TOK.T_SLASH] = Sk.astnodes.Div;
  operatorMap[TOK.T_DOUBLESLASH] = Sk.astnodes.FloorDiv;
  operatorMap[TOK.T_PERCENT] = Sk.astnodes.Mod;
})();
Sk.setupOperators = function (py3) {
  if (py3) {
    operatorMap[TOK.T_AT] = Sk.astnodes.MatMult;
  } else {
    if (operatorMap[TOK.T_AT]) {
      delete operatorMap[TOK.T_AT];
    }
  }
};
Sk.exportSymbol("Sk.setupOperators", Sk.setupOperators);
function getOperator(n) {
  if (operatorMap[n.type] === undefined) {
    throw _construct(Sk.builtin.SyntaxError, ["invalid syntax", n.type].concat(_toConsumableArray(get_context(n))));
  }
  return operatorMap[n.type];
}
function new_identifier(n, c) {
  if (n.value) {
    return new Sk.builtin.str(n.value);
  }
  return new Sk.builtin.str(n);
}
function astForCompOp(c, n) {
  /* comp_op: '<'|'>'|'=='|'>='|'<='|'!='|'in'|'not' 'in'|'is'
   |'is' 'not'
   */
  REQ(n, SYM.comp_op);
  if (NCH(n) === 1) {
    n = CHILD(n, 0);
    switch (n.type) {
      case TOK.T_LESS:
        return Sk.astnodes.Lt;
      case TOK.T_GREATER:
        return Sk.astnodes.Gt;
      case TOK.T_EQEQUAL:
        return Sk.astnodes.Eq;
      case TOK.T_LESSEQUAL:
        return Sk.astnodes.LtE;
      case TOK.T_GREATEREQUAL:
        return Sk.astnodes.GtE;
      case TOK.T_NOTEQUAL:
        return Sk.astnodes.NotEq;
      case TOK.T_NAME:
        if (n.value === "in") {
          return Sk.astnodes.In;
        }
        if (n.value === "is") {
          return Sk.astnodes.Is;
        }
    }
  } else if (NCH(n) === 2) {
    if (CHILD(n, 0).type === TOK.T_NAME) {
      if (CHILD(n, 1).value === "in") {
        return Sk.astnodes.NotIn;
      }
      if (CHILD(n, 0).value === "is") {
        return Sk.astnodes.IsNot;
      }
    }
  }
  Sk.asserts.fail("invalid comp_op");
}
function copy_location(e, n) {
  if (e) {
    e.lineno = LINENO(n);
    e.col_offset = n.col_offset;
    e.end_lineno = n.end_lineno;
    e.end_col_offset = n.end_col_offset;
  }
  return e;
}
function seq_for_testlist(c, n) {
  /* testlist: test (',' test)* [',']
     testlist_star_expr: test|star_expr (',' test|star_expr)* [',']
  */
  var i;
  var seq = [];
  Sk.asserts.assert(n.type === SYM.testlist || n.type === SYM.testlist_star_expr || n.type === SYM.listmaker || n.type === SYM.testlist_comp || n.type === SYM.testlist_safe || n.type === SYM.testlist1, "node type must be listlike");
  for (i = 0; i < NCH(n); i += 2) {
    Sk.asserts.assert(CHILD(n, i).type === SYM.test || CHILD(n, i).type === SYM.old_test || CHILD(n, i).type === SYM.star_expr);
    seq[i / 2] = ast_for_expr(c, CHILD(n, i));
  }
  return seq;
}
function astForSuite(c, n) {
  /* suite: simple_stmt | NEWLINE INDENT stmt+ DEDENT */
  var j;
  var num;
  var i;
  var end;
  var ch;
  var pos;
  var seq;
  REQ(n, SYM.suite);
  seq = [];
  pos = 0;
  if (CHILD(n, 0).type === SYM.simple_stmt) {
    n = CHILD(n, 0);
    /* simple_stmt always ends with an NEWLINE and may have a trailing
     * SEMI. */
    end = NCH(n) - 1;
    if (CHILD(n, end - 1).type === TOK.T_SEMI) {
      end -= 1;
    }
    for (i = 0; i < end; i += 2) {
      // by 2 to skip ;
      seq[pos++] = astForStmt(c, CHILD(n, i));
    }
  } else {
    for (i = 2; i < NCH(n) - 1; ++i) {
      ch = CHILD(n, i);
      REQ(ch, SYM.stmt);
      num = numStmts(ch);
      if (num === 1) {
        // small_stmt or compound_stmt w/ only 1 child
        seq[pos++] = astForStmt(c, ch);
      } else {
        ch = CHILD(ch, 0);
        REQ(ch, SYM.simple_stmt);
        for (j = 0; j < NCH(ch); j += 2) {
          if (NCH(CHILD(ch, j)) === 0) {
            Sk.asserts.assert(j + 1 === NCH(ch));
            break;
          }
          seq[pos++] = astForStmt(c, CHILD(ch, j));
        }
      }
    }
  }
  Sk.asserts.assert(pos === numStmts(n));
  return seq;
}
function astForExceptClause(c, exc, body) {
  /* except_clause: 'except' [test [(',' | 'as') test]] */
  var e;
  REQ(exc, SYM.except_clause);
  REQ(body, SYM.suite);
  if (NCH(exc) === 1) {
    return new Sk.astnodes.ExceptHandler(null, null, astForSuite(c, body), exc.lineno, exc.col_offset, exc.end_lineno, exc.end_col_offset);
  } else if (NCH(exc) === 2) {
    return new Sk.astnodes.ExceptHandler(ast_for_expr(c, CHILD(exc, 1)), null, astForSuite(c, body), exc.lineno, exc.col_offset, exc.end_lineno, exc.end_col_offset);
  } else if (NCH(exc) === 4) {
    if (Sk.__future__.python3 && CHILD(exc, 2).value == ",") {
      ast_error(c, exc, "Old-style 'except' clauses are not supported in Python 3");
    }
    var expression = ast_for_expr(c, CHILD(exc, 1));
    e = ast_for_expr(c, CHILD(exc, 3));
    setContext(c, e, Sk.astnodes.Store, CHILD(exc, 3));
    return new Sk.astnodes.ExceptHandler(ast_for_expr(c, CHILD(exc, 1)), e, astForSuite(c, body), exc.lineno, exc.col_offset, exc.end_lineno, exc.end_col_offset);
  }
  Sk.asserts.fail("wrong number of children for except clause");
}
function astForTryStmt(c, n) {
  var exceptSt;
  var i;
  var handlers = [];
  var nc = NCH(n);
  var nexcept = (nc - 3) / 3;
  var body,
    orelse = [],
    finally_ = null;
  REQ(n, SYM.try_stmt);
  body = astForSuite(c, CHILD(n, 2));
  if (CHILD(n, nc - 3).type === TOK.T_NAME) {
    if (CHILD(n, nc - 3).value === "finally") {
      if (nc >= 9 && CHILD(n, nc - 6).type === TOK.T_NAME) {
        /* we can assume it's an "else",
         because nc >= 9 for try-else-finally and
         it would otherwise have a type of except_clause */
        orelse = astForSuite(c, CHILD(n, nc - 4));
        nexcept--;
      }
      finally_ = astForSuite(c, CHILD(n, nc - 1));
      nexcept--;
    } else {
      /* we can assume it's an "else",
       otherwise it would have a type of except_clause */
      orelse = astForSuite(c, CHILD(n, nc - 1));
      nexcept--;
    }
  } else if (CHILD(n, nc - 3).type !== SYM.except_clause) {
    throw _construct(Sk.builtin.SyntaxError, ["malformed 'try' statement", c.c_filename].concat(_toConsumableArray(get_context(n))));
  }
  if (nexcept > 0) {
    /* process except statements to create a try ... except */
    for (i = 0; i < nexcept; i++) {
      handlers[i] = astForExceptClause(c, CHILD(n, 3 + i * 3), CHILD(n, 5 + i * 3));
    }
  }
  Sk.asserts.assert(!!finally_ || handlers.length != 0);
  return new Sk.astnodes.Try(body, handlers, orelse, finally_, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
}
function astForDottedName(c, n) {
  var i;
  var e;
  var id;
  var col_offset;
  var lineno;
  REQ(n, SYM.dotted_name);
  lineno = n.lineno;
  col_offset = n.col_offset;
  id = strobj(CHILD(n, 0).value);
  e = new Sk.astnodes.Name(id, Sk.astnodes.Load, lineno, col_offset, n.end_lineno, n.end_col_offset);
  for (i = 2; i < NCH(n); i += 2) {
    id = strobj(CHILD(n, i).value);
    e = new Sk.astnodes.Attribute(e, id, Sk.astnodes.Load, lineno, col_offset, n.end_lineno, n.end_col_offset);
  }
  return e;
}
function astForDecorator(c, n) {
  /* decorator: '@' dotted_name [ '(' [arglist] ')' ] NEWLINE */
  var nameExpr;
  REQ(n, SYM.decorator);
  REQ(CHILD(n, 0), TOK.T_AT);
  REQ(CHILD(n, NCH(n) - 1), TOK.T_NEWLINE);
  nameExpr = astForDottedName(c, CHILD(n, 1));
  if (NCH(n) === 3) {
    // no args
    return nameExpr;
  } else if (NCH(n) === 5) {
    // call with no args
    return new Sk.astnodes.Call(nameExpr, [], [], n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  } else {
    return ast_for_call(c, CHILD(n, 3), nameExpr);
  }
}
function astForDecorators(c, n) {
  var i;
  var decoratorSeq;
  REQ(n, SYM.decorators);
  decoratorSeq = [];
  for (i = 0; i < NCH(n); ++i) {
    decoratorSeq[i] = astForDecorator(c, CHILD(n, i));
  }
  return decoratorSeq;
}
function ast_for_decorated(c, n) {
  /* decorated: decorators (classdef | funcdef | async_funcdef) */
  var thing = null;
  var decorator_seq = null;
  REQ(n, SYM.decorated);
  decorator_seq = astForDecorators(c, CHILD(n, 0));
  Sk.asserts.assert(TYPE(CHILD(n, 1)) == SYM.funcdef || TYPE(CHILD(n, 1)) == SYM.async_funcdef || TYPE(CHILD(n, 1)) == SYM.classdef);
  if (TYPE(CHILD(n, 1)) == SYM.funcdef) {
    thing = ast_for_funcdef(c, CHILD(n, 1), decorator_seq);
  } else if (TYPE(CHILD(n, 1)) == SYM.classdef) {
    thing = astForClassdef(c, CHILD(n, 1), decorator_seq);
  } else if (TYPE(CHILD(n, 1)) == SYM.async_funcdef) {
    thing = ast_for_async_funcdef(c, CHILD(n, 1), decorator_seq);
  }
  /* we count the decorators in when talking about the class' or
      * function's line number */
  if (thing) {
    thing.lineno = LINENO(n);
    thing.col_offset = n.col_offset;
  }
  return thing;
}

/* with_item: test ['as' expr] */
function ast_for_with_item(c, n) {
  var context_expr, optional_vars;
  REQ(n, SYM.with_item);
  context_expr = ast_for_expr(c, CHILD(n, 0));
  if (NCH(n) == 3) {
    optional_vars = ast_for_expr(c, CHILD(n, 2));
    setContext(c, optional_vars, Sk.astnodes.Store, n);
  }
  return new Sk.astnodes.withitem(context_expr, optional_vars);
}

/* with_stmt: 'with' with_item (',' with_item)* ':' suite */
function ast_for_with_stmt(c, n0, is_async) {
  var n = is_async ? CHILD(n0, 1) : n0;
  var i;
  var items = [],
    body;
  REQ(n, SYM.with_stmt);
  for (i = 1; i < NCH(n) - 2; i += 2) {
    var item = ast_for_with_item(c, CHILD(n, i));
    items[(i - 1) / 2] = item;
  }
  body = astForSuite(c, CHILD(n, NCH(n) - 1));
  if (is_async) {
    return new Sk.astnodes.AsyncWith(items, body, LINENO(n0), n0.col_offset, n0.end_lineno, n0.end_col_offset);
  } else {
    return new Sk.astnodes.With(items, body, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
  }
}
function astForExecStmt(c, n) {
  var expr1,
    globals = null,
    locals = null;
  var nchildren = NCH(n);
  Sk.asserts.assert(nchildren === 2 || nchildren === 4 || nchildren === 6);

  /* exec_stmt: 'exec' expr ['in' test [',' test]] */
  REQ(n, SYM.exec_stmt);
  expr1 = ast_for_expr(c, CHILD(n, 1));
  if (nchildren >= 4) {
    globals = ast_for_expr(c, CHILD(n, 3));
  }
  if (nchildren === 6) {
    locals = ast_for_expr(c, CHILD(n, 5));
  }
  return new Sk.astnodes.Exec(expr1, globals, locals, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
}
function astForIfStmt(c, n) {
  /* if_stmt: 'if' test ':' suite ('elif' test ':' suite)*
   ['else' ':' suite]
   */
  var off;
  var i;
  var orelse;
  var hasElse;
  var nElif;
  var decider;
  var s;
  REQ(n, SYM.if_stmt);
  if (NCH(n) === 4) {
    return new Sk.astnodes.If(ast_for_expr(c, CHILD(n, 1)), astForSuite(c, CHILD(n, 3)), [], n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  }
  s = CHILD(n, 4).value;
  decider = s.charAt(2); // elSe or elIf
  if (decider === "s") {
    return new Sk.astnodes.If(ast_for_expr(c, CHILD(n, 1)), astForSuite(c, CHILD(n, 3)), astForSuite(c, CHILD(n, 6)), n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  } else if (decider === "i") {
    nElif = NCH(n) - 4;
    hasElse = false;
    orelse = [];

    /* must reference the child nElif+1 since 'else' token is third, not
     * fourth child from the end. */
    if (CHILD(n, nElif + 1).type === TOK.T_NAME && CHILD(n, nElif + 1).value.charAt(2) === "s") {
      hasElse = true;
      nElif -= 3;
    }
    nElif /= 4;
    if (hasElse) {
      orelse = [new Sk.astnodes.If(ast_for_expr(c, CHILD(n, NCH(n) - 6)), astForSuite(c, CHILD(n, NCH(n) - 4)), astForSuite(c, CHILD(n, NCH(n) - 1)), CHILD(n, NCH(n) - 6).lineno, CHILD(n, NCH(n) - 6).col_offset, CHILD(n, NCH(n) - 6).end_lineno, CHILD(n, NCH(n) - 6).end_col_offset)];
      nElif--;
    }
    for (i = 0; i < nElif; ++i) {
      off = 5 + (nElif - i - 1) * 4;
      orelse = [new Sk.astnodes.If(ast_for_expr(c, CHILD(n, off)), astForSuite(c, CHILD(n, off + 2)), orelse, CHILD(n, off).lineno, CHILD(n, off).col_offset, CHILD(n, NCH(n) - 6).end_lineno, CHILD(n, NCH(n) - 6).end_col_offset)];
    }
    return new Sk.astnodes.If(ast_for_expr(c, CHILD(n, 1)), astForSuite(c, CHILD(n, 3)), orelse, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  }
  Sk.asserts.fail("unexpected token in 'if' statement");
}
function ast_for_exprlist(c, n, context) {
  var e;
  var i;
  var seq;
  REQ(n, SYM.exprlist);
  seq = [];
  for (i = 0; i < NCH(n); i += 2) {
    e = ast_for_expr(c, CHILD(n, i));
    seq[i / 2] = e;
    if (context) {
      setContext(c, e, context, CHILD(n, i));
    }
  }
  return seq;
}
function astForDelStmt(c, n) {
  /* del_stmt: 'del' exprlist */
  REQ(n, SYM.del_stmt);
  return new Sk.astnodes.Delete(ast_for_exprlist(c, CHILD(n, 1), Sk.astnodes.Del), n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
}
function astForGlobalStmt(c, n) {
  /* global_stmt: 'global' NAME (',' NAME)* */
  var i;
  var s = [];
  REQ(n, SYM.global_stmt);
  for (i = 1; i < NCH(n); i += 2) {
    s[(i - 1) / 2] = strobj(CHILD(n, i).value);
  }
  return new Sk.astnodes.Global(s, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
}
function astForAssertStmt(c, n) {
  /* assert_stmt: 'assert' test [',' test] */
  REQ(n, SYM.assert_stmt);
  if (NCH(n) === 2) {
    return new Sk.astnodes.Assert(ast_for_expr(c, CHILD(n, 1)), null, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  } else if (NCH(n) === 4) {
    return new Sk.astnodes.Assert(ast_for_expr(c, CHILD(n, 1)), ast_for_expr(c, CHILD(n, 3)), n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  }
  Sk.asserts.fail("improper number of parts to assert stmt");
}
function aliasForImportName(c, n) {
  /*
   import_as_name: NAME ['as' NAME]
   dotted_as_name: dotted_name ['as' NAME]
   dotted_name: NAME ('.' NAME)*
   */

  var i;
  var a;
  var name;
  var str;
  loop: while (true) {
    switch (n.type) {
      case SYM.import_as_name:
        str = null;
        name = strobj(CHILD(n, 0).value);
        if (NCH(n) === 3) {
          str = CHILD(n, 2).value;
        }
        return new Sk.astnodes.alias(name, str == null ? null : strobj(str));
      case SYM.dotted_as_name:
        if (NCH(n) === 1) {
          n = CHILD(n, 0);
          continue loop;
        } else {
          a = aliasForImportName(c, CHILD(n, 0));
          Sk.asserts.assert(!a.asname);
          a.asname = strobj(CHILD(n, 2).value);
          return a;
        }
        break;
      case SYM.dotted_name:
        if (NCH(n) === 1) {
          return new Sk.astnodes.alias(strobj(CHILD(n, 0).value), null);
        } else {
          // create a string of the form a.b.c
          str = "";
          for (i = 0; i < NCH(n); i += 2) {
            str += CHILD(n, i).value + ".";
          }
          return new Sk.astnodes.alias(strobj(str.substr(0, str.length - 1)), null);
        }
        break;
      case TOK.T_STAR:
        return new Sk.astnodes.alias(strobj("*"), null);
      default:
        throw _construct(Sk.builtin.SyntaxError, ["unexpected import name", c.c_filename].concat(_toConsumableArray(get_context(n))));
    }
    break;
  }
}
function astForImportStmt(c, n) {
  /*
   import_stmt: import_name | import_from
   import_name: 'import' dotted_as_names
   import_from: 'from' ('.'* dotted_name | '.') 'import'
   ('*' | '(' import_as_names ')' | import_as_names)
   */
  var modname;
  var idx;
  var nchildren;
  var ndots;
  var mod;
  var i;
  var aliases;
  var col_offset;
  var lineno;
  var end_lineno;
  var end_col_offset;
  REQ(n, SYM.import_stmt);
  lineno = n.lineno;
  col_offset = n.col_offset;
  end_lineno = n.end_lineno;
  end_col_offset = n.end_col_offset;
  n = CHILD(n, 0);
  if (n.type === SYM.import_name) {
    n = CHILD(n, 1);
    REQ(n, SYM.dotted_as_names);
    aliases = [];
    for (i = 0; i < NCH(n); i += 2) {
      aliases[i / 2] = aliasForImportName(c, CHILD(n, i));
    }
    return new Sk.astnodes.Import(aliases, lineno, col_offset, end_lineno, end_col_offset);
  } else if (n.type === SYM.import_from) {
    mod = null;
    ndots = 0;
    for (idx = 1; idx < NCH(n); ++idx) {
      if (CHILD(n, idx).type === SYM.dotted_name) {
        mod = aliasForImportName(c, CHILD(n, idx));
        idx++;
        break;
      } else if (CHILD(n, idx).type === TOK.T_DOT) {
        ndots++;
      } else if (CHILD(n, idx).type === TOK.T_ELLIPSIS) {
        ndots += 3;
      } else {
        break;
      }
    }
    ++idx; // skip the import keyword
    switch (CHILD(n, idx).type) {
      case TOK.T_STAR:
        // from ... import
        n = CHILD(n, idx);
        nchildren = 1;
        break;
      case TOK.T_LPAR:
        // from ... import (x, y, z)
        n = CHILD(n, idx + 1);
        nchildren = NCH(n);
        break;
      case SYM.import_as_names:
        // from ... import x, y, z
        n = CHILD(n, idx);
        nchildren = NCH(n);
        if (nchildren % 2 === 0) {
          throw _construct(Sk.builtin.SyntaxError, ["trailing comma not allowed without surrounding parentheses", c.c_filename].concat(_toConsumableArray(get_context(n))));
        }
        break;
      default:
        throw _construct(Sk.builtin.SyntaxError, ["Unexpected node-type in from-import", c.c_filename].concat(_toConsumableArray(get_context(n))));
    }
    aliases = [];
    if (n.type === TOK.T_STAR) {
      aliases[0] = aliasForImportName(c, n);
    } else {
      for (i = 0; i < NCH(n); i += 2) {
        aliases[i / 2] = aliasForImportName(c, CHILD(n, i));
      }
    }
    modname = mod ? mod.name.v : "";
    return new Sk.astnodes.ImportFrom(strobj(modname), aliases, ndots, lineno, col_offset, end_lineno, end_col_offset);
  }
  throw _construct(Sk.builtin.SyntaxError, ["unknown import statement", c.c_filename].concat(_toConsumableArray(get_context(n))));
}
function ast_for_testlistComp(c, n) {
  /* testlist_comp: test ( comp_for | (',' test)* [','] ) */
  /* argument: test [comp_for] */
  Sk.asserts.assert(n.type === SYM.testlist_comp || n.type === SYM.argument);
  if (NCH(n) > 1 && CHILD(n, 1).type === SYM.comp_for) {
    return ast_for_gen_expr(c, n);
  }
  return ast_for_testlist(c, n);
}
function ast_for_genexp(c, n) {
  Sk.asserts.assert(TYPE(n) == SYM.testlist_comp || TYPE(n) == SYM.argument);
  return ast_for_itercomp(c, n, COMP_GENEXP);
}
function ast_for_listcomp(c, n) {
  Sk.asserts.assert(TYPE(n) == SYM.testlist_comp);
  return ast_for_itercomp(c, n, COMP_LISTCOMP);
}
function astForFactor(c, n) {
  /* some random peephole thing that cpy does */
  var expression;
  var pnum;
  var patom;
  var ppower;
  var pfactor;
  if (CHILD(n, 0).type === TOK.T_MINUS && NCH(n) === 2) {
    pfactor = CHILD(n, 1);
    if (pfactor.type === SYM.factor && NCH(pfactor) === 1) {
      ppower = CHILD(pfactor, 0);
      if (ppower.type === SYM.power && NCH(ppower) === 1) {
        patom = CHILD(ppower, 0);
        if (patom.type === SYM.atom) {
          pnum = CHILD(patom, 0);
          if (pnum.type === TOK.T_NUMBER) {
            pnum.value = "-" + pnum.value;
            return ast_for_atom(c, patom);
          }
        }
      }
    }
  }
  expression = ast_for_expr(c, CHILD(n, 1));
  switch (CHILD(n, 0).type) {
    case TOK.T_PLUS:
      return new Sk.astnodes.UnaryOp(Sk.astnodes.UAdd, expression, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
    case TOK.T_MINUS:
      return new Sk.astnodes.UnaryOp(Sk.astnodes.USub, expression, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
    case TOK.T_TILDE:
      return new Sk.astnodes.UnaryOp(Sk.astnodes.Invert, expression, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  }
  Sk.asserts.fail("unhandled factor");
}
function astForForStmt(c, n) {
  /* for_stmt: 'for' exprlist 'in' testlist ':' suite ['else' ':' suite] */
  var target;
  var _target;
  var nodeTarget;
  var seq = [];
  REQ(n, SYM.for_stmt);
  if (NCH(n) === 9) {
    seq = astForSuite(c, CHILD(n, 8));
  }
  nodeTarget = CHILD(n, 1);
  _target = ast_for_exprlist(c, nodeTarget, Sk.astnodes.Store);
  if (NCH(nodeTarget) === 1) {
    target = _target[0];
  } else {
    target = new Sk.astnodes.Tuple(_target, Sk.astnodes.Store, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  }
  return new Sk.astnodes.For(target, ast_for_testlist(c, CHILD(n, 3)), astForSuite(c, CHILD(n, 5)), seq, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
}
function ast_for_call(c, n, func, allowgen) {
  /*
    arglist: argument (',' argument)*  [',']
    argument: ( test [comp_for] | '*' test | test '=' test | '**' test )
  */

  var i, nargs, nkeywords;
  var ndoublestars;
  var args;
  var keywords;
  REQ(n, SYM.arglist);
  nargs = 0;
  nkeywords = 0;
  for (i = 0; i < NCH(n); i++) {
    var ch = CHILD(n, i);
    if (TYPE(ch) == SYM.argument) {
      if (NCH(ch) == 1) {
        nargs++;
      } else if (TYPE(CHILD(ch, 1)) == SYM.comp_for) {
        nargs++;
        if (!allowgen) {
          ast_error(c, ch, "invalid syntax");
        }
        if (NCH(n) > 1) {
          ast_error(c, ch, "Generator expression must be parenthesized");
        }
      } else if (TYPE(CHILD(ch, 0)) == TOK.T_STAR) {
        nargs++;
      } else {
        /* TYPE(CHILD(ch, 0)) == DOUBLESTAR or keyword argument */
        nkeywords++;
      }
    }
  }
  args = [];
  keywords = [];
  nargs = 0; /* positional arguments + iterable argument unpackings */
  nkeywords = 0; /* keyword arguments + keyword argument unpackings */
  ndoublestars = 0; /* just keyword argument unpackings */
  for (i = 0; i < NCH(n); i++) {
    ch = CHILD(n, i);
    if (TYPE(ch) == SYM.argument) {
      var e;
      var chch = CHILD(ch, 0);
      if (NCH(ch) == 1) {
        /* a positional argument */
        if (nkeywords) {
          if (ndoublestars) {
            ast_error(c, chch, "positional argument follows " + "keyword argument unpacking");
          } else {
            ast_error(c, chch, "positional argument follows " + "keyword argument");
          }
        }
        e = ast_for_expr(c, chch);
        if (!e) {
          return NULL;
        }
        args[nargs++] = e;
      } else if (TYPE(chch) == TOK.T_STAR) {
        /* an iterable argument unpacking */
        var starred;
        if (ndoublestars) {
          ast_error(c, chch, "iterable argument unpacking follows " + "keyword argument unpacking");
          return NULL;
        }
        e = ast_for_expr(c, CHILD(ch, 1));
        if (!e) {
          return NULL;
        }
        starred = new Sk.astnodes.Starred(e, Sk.astnodes.Load, LINENO(chch), chch.col_offset, chch.end_lineno, chch.end_col_offset);
        args[nargs++] = starred;
      } else if (TYPE(chch) == TOK.T_DOUBLESTAR) {
        /* a keyword argument unpacking */
        var kw;
        i++;
        e = ast_for_expr(c, CHILD(ch, 1));
        if (!e) {
          return NULL;
        }
        kw = new Sk.astnodes.keyword(NULL, e);
        keywords[nkeywords++] = kw;
        ndoublestars++;
      } else if (TYPE(CHILD(ch, 1)) == SYM.comp_for) {
        /* the lone generator expression */
        e = ast_for_genexp(c, ch);
        if (!e) {
          return NULL;
        }
        args[nargs++] = e;
      } else {
        /* a keyword argument */
        var kw;
        var key, tmp;
        var k;

        /* chch is test, but must be an identifier? */
        e = ast_for_expr(c, chch);
        if (!e) {
          return NULL;
        }
        /* f(lambda x: x[0] = 3) ends up getting parsed with
         * LHS test = lambda x: x[0], and RHS test = 3.
         * SF bug 132313 points out that complaining about a keyword
         * then is very confusing.
         */
        if (e.constructor === Sk.astnodes.Lambda) {
          ast_error(c, chch, "lambda cannot contain assignment");
          return NULL;
        } else if (e.constructor !== Sk.astnodes.Name) {
          ast_error(c, chch, "keyword can't be an expression");
          return NULL;
        } else if (forbiddenCheck(c, e.id, ch, 1)) {
          return NULL;
        }
        key = e.id;
        for (k = 0; k < nkeywords; k++) {
          tmp = keywords[k].arg;
          if (tmp && tmp === key) {
            ast_error(c, chch, "keyword argument repeated");
            return NULL;
          }
        }
        e = ast_for_expr(c, CHILD(ch, 2));
        if (!e) {
          return NULL;
        }
        kw = new Sk.astnodes.keyword(key, e);
        keywords[nkeywords++] = kw;
      }
    }
  }
  return new Sk.astnodes.Call(func, args, keywords, func.lineno, func.col_offset, func.end_lineno, func.end_col_offset);
}
function ast_for_trailer(c, n, left_expr) {
  /* trailer: '(' [arglist] ')' | '[' subscriptlist ']' | '.' NAME
     subscriptlist: subscript (',' subscript)* [',']
     subscript: '.' '.' '.' | test | [test] ':' [test] [sliceop]
   */
  REQ(n, SYM.trailer);
  if (TYPE(CHILD(n, 0)) == TOK.T_LPAR) {
    if (NCH(n) == 2) {
      return new Sk.astnodes.Call(left_expr, NULL, NULL, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
    } else {
      return ast_for_call(c, CHILD(n, 1), left_expr, true);
    }
  } else if (TYPE(CHILD(n, 0)) == TOK.T_DOT) {
    var attr_id = new_identifier(CHILD(n, 1));
    if (!attr_id) {
      return NULL;
    }
    return new Sk.astnodes.Attribute(left_expr, attr_id, Sk.astnodes.Load, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
  } else {
    REQ(CHILD(n, 0), TOK.T_LSQB);
    REQ(CHILD(n, 2), TOK.T_RSQB);
    n = CHILD(n, 1);
    if (NCH(n) == 1) {
      var slc = astForSlice(c, CHILD(n, 0));
      if (!slc) {
        return NULL;
      }
      return new Sk.astnodes.Subscript(left_expr, slc, Sk.astnodes.Load, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
    } else {
      /* The grammar is ambiguous here. The ambiguity is resolved
         by treating the sequence as a tuple literal if there are
         no slice features.
      */
      var j;
      var slc;
      var e;
      var simple = 1;
      var slices = [],
        elts;
      for (j = 0; j < NCH(n); j += 2) {
        slc = astForSlice(c, CHILD(n, j));
        if (!slc) {
          return NULL;
        }
        if (slc.kind != _slice_kind.Index_kind) {
          simple = 0;
        }
        slices[j / 2] = slc;
      }
      if (!simple) {
        return new Sk.astnodes.Subscript(left_expr, new Sk.astnodes.ExtSlice(slices), Sk.astnodes.Load, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      }
      /* extract Index values and put them in a Tuple */
      elts = [];
      for (j = 0; j < slices.length; ++j) {
        // @meredydd any idea how we reach this?
        slc = slices[j];
        Sk.asserts.assert(slc.kind == _slice_kind.Index_kind && slc.v.Index.value);
        elts[j] = slc.v.Index.value;
      }
      e = new Sk.astnodes.Tuple(elts, Sk.astnodes.Load, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      return new Sk.astnodes.Subscript(left_expr, new Sk.astnodes.Index(e), Sk.astnodes.Load, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
    }
  }
}
function ast_for_flow_stmt(c, n) {
  /*
    flow_stmt: break_stmt | continue_stmt | return_stmt | raise_stmt
               | yield_stmt
    break_stmt: 'break'
    continue_stmt: 'continue'
    return_stmt: 'return' [testlist]
    yield_stmt: yield_expr
    yield_expr: 'yield' testlist | 'yield' 'from' test
    raise_stmt: 'raise' [test [',' test [',' test]]]
  */
  var ch;
  REQ(n, SYM.flow_stmt);
  ch = CHILD(n, 0);
  switch (TYPE(ch)) {
    case SYM.break_stmt:
      return new Sk.astnodes.Break(LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
    case SYM.continue_stmt:
      return new Sk.astnodes.Continue(LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
    case SYM.yield_stmt:
      {
        /* will reduce to yield_expr */
        var exp = ast_for_expr(c, CHILD(ch, 0));
        if (!exp) {
          return null;
        }
        return new Sk.astnodes.Expr(exp, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      }
    case SYM.return_stmt:
      if (NCH(ch) == 1) {
        return new Sk.astnodes.Return(null, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      } else {
        var expression = ast_for_testlist(c, CHILD(ch, 1));
        if (!expression) {
          return null;
        }
        return new Sk.astnodes.Return(expression, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      }
    case SYM.raise_stmt:
      // This is tricky and Skulpt-specific, because we need to handle
      // both Python 3-style and Python 2-style 'raise' statements
      if (NCH(ch) == 1) {
        return new Sk.astnodes.Raise(null, null, null, null, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      } else if (NCH(ch) >= 2) {
        var cause = null;
        var expression = ast_for_expr(c, CHILD(ch, 1));
        var inst = null,
          tback = null;

        // raise [expression] from [cause]
        if (NCH(ch) == 4 && CHILD(ch, 2).value == "from") {
          if (!Sk.__future__.python3) {
            ast_error(c, CHILD(ch, 2), "raise ... from ... is not available in Python 2");
          }
          cause = ast_for_expr(c, CHILD(ch, 3));
        } else if (NCH(ch) >= 4 && CHILD(ch, 2).value == ",") {
          if (Sk.__future__.python3) {
            ast_error(c, n, "Old raise syntax is not available in Python 3");
          }
          // raise [exception_type], [instantiation value] [, [traceback]]
          // NB traceback isn't implemented in Skulpt yet
          inst = ast_for_expr(c, CHILD(ch, 3));
          if (NCH(ch) == 6) {
            tback = ast_for_expr(c, CHILD(ch, 5));
          }
        }
        return new Sk.astnodes.Raise(expression, cause, inst, tback, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      }
    /* fall through */
    default:
      Sk.asserts.fail("unexpected flow_stmt: ", TYPE(ch));
      return null;
  }
}
function astForArg(c, n) {
  var name;
  var annotation = null;
  var ch;
  Sk.asserts.assert(n.type === SYM.tfpdef || n.type === SYM.vfpdef);
  ch = CHILD(n, 0);
  forbiddenCheck(c, ch, ch.value, ch.lineno);
  name = strobj(ch.value);
  if (NCH(n) == 3 && CHILD(n, 1).type === TOK.T_COLON) {
    annotation = ast_for_expr(c, CHILD(n, 2));
  }
  return new Sk.astnodes.arg(name, annotation, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
}

/* returns -1 if failed to handle keyword only arguments
   returns new position to keep processing if successful
               (',' tfpdef ['=' test])*
                     ^^^
   start pointing here
 */
function handleKeywordonlyArgs(c, n, start, kwonlyargs, kwdefaults) {
  var argname;
  var ch;
  var expression;
  var annotation;
  var arg;
  var i = start;
  var j = 0; /* index for kwdefaults and kwonlyargs */

  if (!kwonlyargs) {
    ast_error(c, CHILD(n, start), "named arguments must follow bare *");
  }
  Sk.asserts.assert(kwdefaults);
  while (i < NCH(n)) {
    ch = CHILD(n, i);
    switch (ch.type) {
      case SYM.vfpdef:
      case SYM.tfpdef:
        if (i + 1 < NCH(n) && CHILD(n, i + 1).type == TOK.T_EQUAL) {
          kwdefaults[j] = ast_for_expr(c, CHILD(n, i + 2));
          i += 2; /* '=' and test */
        } else {
          /* setting NULL if no default value exists */
          kwdefaults[j] = null;
        }
        if (NCH(ch) == 3) {
          /* ch is NAME ':' test */
          annotation = ast_for_expr(c, CHILD(ch, 2));
        } else {
          annotation = null;
        }
        ch = CHILD(ch, 0);
        forbiddenCheck(c, ch, ch.value, ch.lineno);
        argname = strobj(ch.value);
        kwonlyargs[j++] = new Sk.astnodes.arg(argname, annotation, ch.lineno, ch.col_offset, ch.end_lineno, ch.end_col_offset);
        i += 2; /* the name and the comma */
        break;
      case TOK.T_DOUBLESTAR:
        return i;
      default:
        ast_error(c, ch, "unexpected node");
    }
  }
  return i;
}
function astForArguments(c, n) {
  var k;
  var j;
  var i;
  var foundDefault;
  var posargs = [];
  var posdefaults = [];
  var kwonlyargs = [];
  var kwdefaults = [];
  var vararg = null;
  var kwarg = null;
  var ch = null;

  /* This function handles both typedargslist (function definition)
     and varargslist (lambda definition).
      parameters: '(' [typedargslist] ')'
     typedargslist: (tfpdef ['=' test] (',' tfpdef ['=' test])* [',' [
             '*' [tfpdef] (',' tfpdef ['=' test])* [',' ['**' tfpdef [',']]]
           | '**' tfpdef [',']]]
       | '*' [tfpdef] (',' tfpdef ['=' test])* [',' ['**' tfpdef [',']]]
       | '**' tfpdef [','])
     tfpdef: NAME [':' test]
     varargslist: (vfpdef ['=' test] (',' vfpdef ['=' test])* [',' [
             '*' [vfpdef] (',' vfpdef ['=' test])* [',' ['**' vfpdef [',']]]
           | '**' vfpdef [',']]]
       | '*' [vfpdef] (',' vfpdef ['=' test])* [',' ['**' vfpdef [',']]]
       | '**' vfpdef [',']
     )
     vfpdef: NAME
   */
  if (n.type === SYM.parameters) {
    if (NCH(n) === 2) {
      // () as arglist
      return new Sk.astnodes.arguments_([], null, [], [], null, []);
    }
    n = CHILD(n, 1);
  }
  Sk.asserts.assert(n.type === SYM.varargslist || n.type === SYM.typedargslist);

  // Skulpt note: the "counting numbers of args" section
  // from ast.c is omitted because JS arrays autoexpand

  /* tfpdef: NAME [':' test]
     vfpdef: NAME
  */
  i = 0;
  j = 0; /* index for defaults */
  k = 0; /* index for args */
  while (i < NCH(n)) {
    ch = CHILD(n, i);
    switch (ch.type) {
      case SYM.tfpdef:
      case SYM.vfpdef:
        /* XXX Need to worry about checking if TYPE(CHILD(n, i+1)) is
           anything other than EQUAL or a comma? */
        /* XXX Should NCH(n) check be made a separate check? */
        if (i + 1 < NCH(n) && CHILD(n, i + 1).type == TOK.T_EQUAL) {
          posdefaults[j++] = ast_for_expr(c, CHILD(n, i + 2));
          i += 2;
          foundDefault = 1;
        } else if (foundDefault) {
          throw _construct(Sk.builtin.SyntaxError, ["non-default argument follows default argument", c.c_filename].concat(_toConsumableArray(get_context(n))));
        }
        posargs[k++] = astForArg(c, ch);
        i += 2; /* the name and the comma */
        break;
      case TOK.T_STAR:
        if (i + 1 >= NCH(n) || i + 2 == NCH(n) && CHILD(n, i + 1).type == TOK.T_COMMA) {
          throw _construct(Sk.builtin.SyntaxError, ["named arguments must follow bare *", c.c_filename].concat(_toConsumableArray(get_context(n))));
        }
        ch = CHILD(n, i + 1); /* tfpdef or COMMA */
        if (ch.type == TOK.T_COMMA) {
          i += 2; /* now follows keyword only arguments */
          i = handleKeywordonlyArgs(c, n, i, kwonlyargs, kwdefaults);
        } else {
          vararg = astForArg(c, ch);
          i += 3;
          if (i < NCH(n) && (CHILD(n, i).type == SYM.tfpdef || CHILD(n, i).type == SYM.vfpdef)) {
            i = handleKeywordonlyArgs(c, n, i, kwonlyargs, kwdefaults);
          }
        }
        break;
      case TOK.T_DOUBLESTAR:
        ch = CHILD(n, i + 1); /* tfpdef */
        Sk.asserts.assert(ch.type == SYM.tfpdef || ch.type == SYM.vfpdef);
        kwarg = astForArg(c, ch);
        i += 3;
        break;
      default:
        Sk.asserts.fail("unexpected node in varargslist");
        return;
    }
  }
  return new Sk.astnodes.arguments_(posargs, vararg, kwonlyargs, kwdefaults, kwarg, posdefaults);
}
function ast_for_async_funcdef(c, n, decorator_seq) {
  /* async_funcdef: 'async' funcdef */
  REQ(n, SYM.async_funcdef);
  REQ(CHILD(n, 0), TOK.T_NAME);
  Sk.asserts.assert(STR(CHILD(n, 0) === "async"));
  REQ(CHILD(n, 1), SYM.funcdef);
  return ast_for_funcdef_impl(c, n, decorator_seq, true /* is_async */);
}
function ast_for_funcdef(c, n, decorator_seq) {
  /* funcdef: 'def' NAME parameters ['->' test] ':' suite */
  return ast_for_funcdef_impl(c, n, decorator_seq, false /* is_async */);
}
function ast_for_funcdef_impl(c, n0, decorator_seq, is_async) {
  /* funcdef: 'def' NAME parameters ['->' test] ':' [TYPE_COMMENT] suite */
  var n = is_async ? CHILD(n0, 1) : n0;
  var name;
  var args;
  var body;
  var returns = NULL;
  var name_i = 1;
  var end_lineno, end_col_offset;
  var tc;
  var type_comment = NULL;
  if (is_async && c.c_feature_version < 5) {
    ast_error(c, n, "Async functions are only supported in Python 3.5 and greater");
    return NULL;
  }
  REQ(n, SYM.funcdef);
  name = new_identifier(CHILD(n, name_i));
  if (forbiddenCheck(c, name, CHILD(n, name_i), 0)) {
    return NULL;
  }
  args = astForArguments(c, CHILD(n, name_i + 1));
  if (!args) {
    return NULL;
  }
  if (TYPE(CHILD(n, name_i + 2)) == TOK.T_RARROW) {
    returns = ast_for_expr(c, CHILD(n, name_i + 3));
    if (!returns) {
      return NULL;
    }
    name_i += 2;
  }
  if (TYPE(CHILD(n, name_i + 3)) == TOK.T_TYPE_COMMENT) {
    type_comment = TOK.T_NEW_TYPE_COMMENT(CHILD(n, name_i + 3));
    if (!type_comment) {
      return NULL;
    }
    name_i += 1;
  }
  body = astForSuite(c, CHILD(n, name_i + 3));
  if (!body) {
    return NULL;
  }
  // get_last_end_pos(body, &end_lineno, &end_col_offset);

  if (NCH(CHILD(n, name_i + 3)) > 1) {
    /* Check if the suite has a type comment in it. */
    tc = CHILD(CHILD(n, name_i + 3), 1);
    if (TYPE(tc) == TOK.T_TYPE_COMMENT) {
      if (type_comment != NULL) {
        ast_error(c, n, "Cannot have two type comments on def");
        return NULL;
      }
      type_comment = TOK.T_NEW_TYPE_COMMENT(tc);
      if (!type_comment) {
        return NULL;
      }
    }
  }
  if (is_async) {
    return new Sk.astnodes.AsyncFunctionDef(name, args, body, decorator_seq, returns, type_comment, LINENO(n0), n0.col_offset, n0.end_lineno, n0.end_col_offset);
  } else {
    return new Sk.astnodes.FunctionDef(name, args, body, decorator_seq, returns, type_comment, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
  }
}
function astForClassBases(c, n) {
  /* testlist: test (',' test)* [','] */
  Sk.asserts.assert(NCH(n) > 0);
  REQ(n, SYM.testlist);
  if (NCH(n) === 1) {
    return [ast_for_expr(c, CHILD(n, 0))];
  }
  return seq_for_testlist(c, n);
}
function astForClassdef(c, n, decoratorSeq) {
  /* classdef: 'class' NAME ['(' arglist ')'] ':' suite */
  var classname;
  var call;
  var s;
  REQ(n, SYM.classdef);
  if (NCH(n) == 4) {
    /* class NAME ':' suite */
    s = astForSuite(c, CHILD(n, 3));
    classname = new_identifier(CHILD(n, 1).value);
    forbiddenCheck(c, CHILD(n, 3), classname, n.lineno);
    return new Sk.astnodes.ClassDef(classname, [], [], s, decoratorSeq, /*TODO docstring*/null, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
  }
  if (TYPE(CHILD(n, 3)) === TOK.T_RPAR) {
    /* class NAME '(' ')' ':' suite */
    s = astForSuite(c, CHILD(n, 5));
    classname = new_identifier(CHILD(n, 1).value);
    forbiddenCheck(c, CHILD(n, 3), classname, CHILD(n, 3).lineno);
    return new Sk.astnodes.ClassDef(classname, [], [], s, decoratorSeq, /*TODO docstring*/null, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
  }

  /* class NAME '(' arglist ')' ':' suite */
  /* build up a fake Call node so we can extract its pieces */
  {
    var dummy_name;
    var dummy;
    dummy_name = new_identifier(CHILD(n, 1));
    dummy = new Sk.astnodes.Name(dummy_name, Sk.astnodes.Load, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
    call = ast_for_call(c, CHILD(n, 3), dummy, false);
  }
  s = astForSuite(c, CHILD(n, 6));
  classname = new_identifier(CHILD(n, 1).value);
  forbiddenCheck(c, CHILD(n, 1), classname, CHILD(n, 1).lineno);
  return new Sk.astnodes.ClassDef(classname, call.args, call.keywords, s, decoratorSeq, /*TODO docstring*/null, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
}
function astForLambdef(c, n) {
  /* lambdef: 'lambda' [varargslist] ':' test */
  var args;
  var expression;
  if (NCH(n) === 3) {
    args = new Sk.astnodes.arguments_([], null, null, []);
    expression = ast_for_expr(c, CHILD(n, 2));
  } else {
    args = astForArguments(c, CHILD(n, 1));
    expression = ast_for_expr(c, CHILD(n, 3));
  }
  return new Sk.astnodes.Lambda(args, expression, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
}
function astForComprehension(c, n) {
  /* testlist_comp: test ( comp_for | (',' test)* [','] )
     argument: test [comp_for] | test '=' test       # Really [keyword '='] test */

  var j;
  var ifs;
  var nifs;
  var ge;
  var expression;
  var t;
  var forch;
  var i;
  var ch;
  var genexps;
  var nfors;
  var elt;
  var comps;
  var comp;
  function countCompFors(c, n) {
    var nfors = 0;
    count_comp_for: while (true) {
      nfors++;
      REQ(n, SYM.comp_for);
      if (NCH(n) === 5) {
        n = CHILD(n, 4);
      } else {
        return nfors;
      }
      count_comp_iter: while (true) {
        REQ(n, SYM.comp_iter);
        n = CHILD(n, 0);
        if (n.type === SYM.comp_for) {
          continue count_comp_for;
        } else if (n.type === SYM.comp_if) {
          if (NCH(n) === 3) {
            n = CHILD(n, 2);
            continue count_comp_iter;
          } else {
            return nfors;
          }
        }
        break;
      }
      break;
    }
    Sk.asserts.fail("logic error in countCompFors");
  }
  function countCompIfs(c, n) {
    var nifs = 0;
    while (true) {
      REQ(n, SYM.comp_iter);
      if (CHILD(n, 0).type === SYM.comp_for) {
        return nifs;
      }
      n = CHILD(n, 0);
      REQ(n, SYM.comp_if);
      nifs++;
      if (NCH(n) === 2) {
        return nifs;
      }
      n = CHILD(n, 2);
    }
  }
  nfors = countCompFors(c, n);
  comps = [];
  for (i = 0; i < nfors; ++i) {
    REQ(n, SYM.comp_for);
    forch = CHILD(n, 1);
    t = ast_for_exprlist(c, forch, Sk.astnodes.Store);
    expression = ast_for_expr(c, CHILD(n, 3));
    if (NCH(forch) === 1) {
      comp = new Sk.astnodes.comprehension(t[0], expression, []);
    } else {
      comp = new Sk.astnodes.comprehension(new Sk.astnodes.Tuple(t, Sk.astnodes.Store, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset), expression, []);
    }
    if (NCH(n) === 5) {
      n = CHILD(n, 4);
      nifs = countCompIfs(c, n);
      ifs = [];
      for (j = 0; j < nifs; ++j) {
        REQ(n, SYM.comp_iter);
        n = CHILD(n, 0);
        REQ(n, SYM.comp_if);
        expression = ast_for_expr(c, CHILD(n, 1));
        ifs[j] = expression;
        if (NCH(n) === 3) {
          n = CHILD(n, 2);
        }
      }
      if (n.type === SYM.comp_iter) {
        n = CHILD(n, 0);
      }
      comp.ifs = ifs;
    }
    comps[i] = comp;
  }
  return comps;
}
function astForIterComp(c, n, type) {
  var elt, comps;
  Sk.asserts.assert(NCH(n) > 1);
  elt = ast_for_expr(c, CHILD(n, 0));
  comps = astForComprehension(c, CHILD(n, 1));
  if (type === COMP_GENEXP) {
    return new Sk.astnodes.GeneratorExp(elt, comps, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  } else if (type === COMP_SETCOMP) {
    return new Sk.astnodes.SetComp(elt, comps, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  }
}

/*
   Count the number of 'for' loops in a comprehension.
   Helper for ast_for_comprehension().
*/
function count_comp_fors(c, n) {
  var n_fors = 0;
  var is_async;
  count_comp_for: while (true) {
    // @meredydd needs new grammar
    // REQ(n, SYM.comp_for);
    // if (NCH(n) === 2) {
    //     REQ(CHILD(n, 0), TOK.T_ASYNC);
    //     n = CHILD(n, 1);
    // } else if (NCH(n) === 1) {
    //     n = CHILD(n, 0);
    // } else {
    //     Sk.asserts.fail("logic error in count_comp_fors");
    // }
    // if (NCH(n) == (5)) {
    //     n = CHILD(n, 4);
    // } else {
    //     return n_fors;
    // }
    is_async = 0;
    n_fors++;
    REQ(n, SYM.comp_for);
    if (TYPE(CHILD(n, 0)) == TOK.T_ASYNC) {
      is_async = 1;
    }
    if (NCH(n) == 5 + is_async) {
      n = CHILD(n, 4 + is_async);
    } else {
      return n_fors;
    }
    count_comp_iter: while (true) {
      REQ(n, SYM.comp_iter);
      n = CHILD(n, 0);
      if (TYPE(n) === SYM.comp_for) {
        continue count_comp_for;
      } else if (TYPE(n) === SYM.comp_if) {
        if (NCH(n) === 3) {
          n = CHILD(n, 2);
          continue count_comp_iter;
        } else {
          return n_fors;
        }
      }
      break;
    }
    break;
  }
}
function count_comp_ifs(c, n) {
  var n_ifs = 0;
  while (true) {
    REQ(n, SYM.comp_iter);
    if (TYPE(CHILD(n, 0)) == SYM.comp_for) {
      return n_ifs;
    }
    n = CHILD(n, 0);
    REQ(n, SYM.comp_if);
    n_ifs++;
    if (NCH(n) == 2) {
      return n_ifs;
    }
    n = CHILD(n, 2);
  }
}
function ast_for_comprehension(c, n) {
  var i, n_fors;
  var comps = [];
  n_fors = count_comp_fors(c, n);
  for (i = 0; i < n_fors; i++) {
    var comp;
    var t;
    var expression, first;
    var for_ch;
    var is_async = 0;
    if (TYPE(CHILD(n, 0)) == TOK.T_ASYNC) {
      is_async = 1;
    }
    for_ch = CHILD(n, 1 + is_async);
    t = ast_for_exprlist(c, for_ch, Sk.astnodes.Store);
    if (!t) {
      return null;
    }
    expression = ast_for_expr(c, CHILD(n, 3 + is_async));
    if (!expression) {
      return null;
    }

    // again new grammar needed
    // REQ(n, SYM.comp_for);

    // if (NCH(n) == 2) {
    //     is_async = 1;
    //     REQ(CHILD(n, 0), TOK.T_ASYNC);
    //     sync_n = CHILD(n, 1);
    // }
    // else {
    //     sync_n = CHILD(n, 0);
    // }
    // REQ(sync_n, SYM.sync_comp_for);

    // /* Async comprehensions only allowed in Python 3.6 and greater */
    // /* @meredydd see below for the joys of the future! */
    // if (is_async && c.c_feature_version < 6) {
    //     ast_error(c, n,
    //               "Async comprehensions are only supported in Python 3.6 and greater");
    //     return null;
    // }

    // for_ch = CHILD(sync_n, 1);
    // t = ast_for_exprlist(c, for_ch, Sk.astnodes.Store);

    // expression = ast_for_expr(c, CHILD(sync_n, 3));

    /* Check the # of children rather than the length of t, since
       (x for x, in ...) has 1 element in t, but still requires a Tuple. */
    first = t[0];
    if (NCH(for_ch) == 1) {
      comp = new Sk.astnodes.comprehension(first, expression, null, is_async);
    } else {
      comp = new Sk.astnodes.comprehension(new Sk.astnodes.Tuple(t, Sk.astnodes.Store, first.lineno, first.col_offset, for_ch.end_lineno, for_ch.end_col_offset), expression, null, is_async);
    }
    if (NCH(n) == 5 + is_async) {
      var j, n_ifs;
      var ifs = [];
      n = CHILD(n, 4 + is_async);
      n_ifs = count_comp_ifs(c, n);
      if (n_ifs == -1) {
        return null;
      }
      for (j = 0; j < n_ifs; j++) {
        REQ(n, SYM.comp_iter);
        n = CHILD(n, 0);
        REQ(n, SYM.comp_if);
        expression = ast_for_expr(c, CHILD(n, 1));
        if (!expression) {
          return null;
        }
        ifs[j] = expression;
        if (NCH(n) == 3) {
          n = CHILD(n, 2);
        }
      }
      /* on exit, must guarantee that n is a comp_for */
      if (TYPE(n) == SYM.comp_iter) {
        n = CHILD(n, 0);
      }
      comp.ifs = ifs;
    }
    // if (NCH(sync_n) == 5) {
    //     var j, n_ifs;
    //     var ifs = [];

    //     n = CHILD(sync_n, 4);
    //     n_ifs = count_comp_ifs(c, n);

    //     for (j = 0; j < n_ifs; j++) {
    //         REQ(n, comp_iter);
    //         n = CHILD(n, 0);
    //         REQ(n, comp_if);

    //         expression = ast_for_expr(c, CHILD(n, 1));
    //         if (!expression) {
    //             return null;
    //         }

    //         ifs[j] = expression;
    //         if (NCH(n) == 3) {
    //             n = CHILD(n, 2);
    //         }
    //     }
    //     /* on exit, must guarantee that n is a comp_for */
    //     if (TYPE(n) == SYM.comp_iter) {
    //         n = CHILD(n, 0);
    //     }
    //     comp.ifs = ifs;
    // }
    comps[i] = comp;
  }
  return comps;
}
function ast_for_itercomp(c, n, type) {
  /* testlist_comp: (test|star_expr)
   *                ( comp_for | (',' (test|star_expr))* [','] ) */
  var elt;
  var comps;
  var ch;
  Sk.asserts.assert(NCH(n) > 1);
  ch = CHILD(n, 0);
  elt = ast_for_expr(c, ch);
  if (elt.constructor === Sk.astnodes.Starred) {
    ast_error(c, ch, "iterable unpacking cannot be used in comprehension");
    return NULL;
  }
  comps = ast_for_comprehension(c, CHILD(n, 1));
  if (type == COMP_GENEXP) {
    return new Sk.astnodes.GeneratorExp(elt, comps, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
  } else if (type == COMP_LISTCOMP) {
    return new Sk.astnodes.ListComp(elt, comps, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
  } else if (type == COMP_SETCOMP) {
    return new Sk.astnodes.SetComp(elt, comps, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
  } else {
    /* Should never happen */
    return null;
  }
}

/* Fills in the key, value pair corresponding to the dict element.  In case
 * of an unpacking, key is NULL.  *i is advanced by the number of ast
 * elements.  Iff successful, nonzero is returned.
 */
function ast_for_dictelement(c, n, i) {
  var expression;
  if (TYPE(CHILD(n, i)) == TOK.T_DOUBLESTAR) {
    Sk.asserts.assert(NCH(n) - i >= 2);
    expression = ast_for_expr(c, CHILD(n, i + 1));
    return {
      key: null,
      value: expression,
      i: i + 2
    };
  } else {
    Sk.asserts.assert(NCH(n) - i >= 3);
    expression = ast_for_expr(c, CHILD(n, i));
    if (!expression) {
      return 0;
    }
    var key = expression;
    REQ(CHILD(n, i + 1), TOK.T_COLON);
    expression = ast_for_expr(c, CHILD(n, i + 2));
    if (!expression) {
      return false;
    }
    var value = expression;
    return {
      key: key,
      value: value,
      i: i + 3
    };
  }
}
function ast_for_dictcomp(c, n) {
  var key, value;
  var comps = [];
  Sk.asserts.assert(NCH(n) > 3);
  REQ(CHILD(n, 1), TOK.T_COLON);
  key = ast_for_expr(c, CHILD(n, 0));
  value = ast_for_expr(c, CHILD(n, 2));
  comps = astForComprehension(c, CHILD(n, 3));
  return new Sk.astnodes.DictComp(key, value, comps, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
}
function ast_for_dictdisplay(c, n) {
  var i;
  var j;
  var keys = [],
    values = [];
  j = 0;
  for (i = 0; i < NCH(n); i++) {
    var res = ast_for_dictelement(c, n, i);
    i = res.i;
    keys[j] = res.key;
    values[j] = res.value;
    j++;
  }
  return new Sk.astnodes.Dict(keys, values, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
}
function ast_for_gen_expr(c, n) {
  Sk.asserts.assert(n.type === SYM.testlist_comp || n.type === SYM.argument);
  return astForIterComp(c, n, COMP_GENEXP);
}
function ast_for_setcomp(c, n) {
  Sk.asserts.assert(n.type === SYM.dictorsetmaker);
  return astForIterComp(c, n, COMP_SETCOMP);
}
function astForWhileStmt(c, n) {
  /* while_stmt: 'while' test ':' suite ['else' ':' suite] */
  REQ(n, SYM.while_stmt);
  if (NCH(n) === 4) {
    return new Sk.astnodes.While(ast_for_expr(c, CHILD(n, 1)), astForSuite(c, CHILD(n, 3)), [], n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  } else if (NCH(n) === 7) {
    return new Sk.astnodes.While(ast_for_expr(c, CHILD(n, 1)), astForSuite(c, CHILD(n, 3)), astForSuite(c, CHILD(n, 6)), n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  }
  Sk.asserts.fail("wrong number of tokens for 'while' stmt");
}
function astForAugassign(c, n) {
  REQ(n, SYM.augassign);
  n = CHILD(n, 0);
  switch (n.value.charAt(0)) {
    case "+":
      return Sk.astnodes.Add;
    case "-":
      return Sk.astnodes.Sub;
    case "/":
      if (n.value.charAt(1) === "/") {
        return Sk.astnodes.FloorDiv;
      }
      return Sk.astnodes.Div;
    case "%":
      return Sk.astnodes.Mod;
    case "<":
      return Sk.astnodes.LShift;
    case ">":
      return Sk.astnodes.RShift;
    case "&":
      return Sk.astnodes.BitAnd;
    case "^":
      return Sk.astnodes.BitXor;
    case "|":
      return Sk.astnodes.BitOr;
    case "*":
      if (n.value.charAt(1) === "*") {
        return Sk.astnodes.Pow;
      }
      return Sk.astnodes.Mult;
    case "@":
      if (Sk.__future__.python3) {
        return Sk.astnodes.MatMult;
      }
    default:
      Sk.asserts.fail("invalid augassign");
  }
}
function astForBinop(c, n) {
  /* Must account for a sequence of expressions.
   How should A op B op C by represented?
   BinOp(BinOp(A, op, B), op, C).
   */
  var tmp;
  var newoperator;
  var nextOper;
  var i;
  var result = new Sk.astnodes.BinOp(ast_for_expr(c, CHILD(n, 0)), getOperator(CHILD(n, 1)), ast_for_expr(c, CHILD(n, 2)), n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  var nops = (NCH(n) - 1) / 2;
  for (i = 1; i < nops; ++i) {
    nextOper = CHILD(n, i * 2 + 1);
    newoperator = getOperator(nextOper);
    tmp = ast_for_expr(c, CHILD(n, i * 2 + 2));
    result = new Sk.astnodes.BinOp(result, newoperator, tmp, nextOper.lineno, nextOper.col_offset, nextOper.end_lineno, nextOper.end_col_offset);
  }
  return result;
}
function ast_for_testlist(c, n) {
  /* testlist_comp: test (',' comp_for | (',' test)* [',']) */
  /* testlist: test (',' test)* [','] */
  Sk.asserts.assert(NCH(n) > 0);
  if (n.type === SYM.testlist_comp) {
    if (NCH(n) > 1) {
      Sk.asserts.assert(CHILD(n, 1).type !== SYM.comp_for);
    }
  } else {
    Sk.asserts.assert(n.type === SYM.testlist || n.type === SYM.testlist_star_expr);
  }
  if (NCH(n) === 1) {
    return ast_for_expr(c, CHILD(n, 0));
  } else {
    return new Sk.astnodes.Tuple(seq_for_testlist(c, n), Sk.astnodes.Load, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset /*, c.c_arena */);
  }
}
function ast_for_exprStmt(c, n) {
  var expression;
  var value;
  var e;
  var i;
  var targets;
  var expr2;
  var varName;
  var expr1;
  var ch;
  var ann;
  var simple;
  var deep;
  var expr3;
  REQ(n, SYM.expr_stmt);
  /* expr_stmt: testlist_star_expr (annassign | augassign (yield_expr|testlist) |
                          ('=' (yield_expr|testlist_star_expr))*)
     annassign: ':' test ['=' test]
     testlist_star_expr: (test|star_expr) (',' test|star_expr)* [',']
     augassign: '+=' | '-=' | '*=' | '@=' | '/=' | '%=' | '&=' | '|=' | '^='
              | '<<=' | '>>=' | '**=' | '//='
     test: ... here starts the operator precedence dance
   */
  if (NCH(n) === 1) {
    return new Sk.astnodes.Expr(ast_for_testlist(c, CHILD(n, 0)), n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  } else if (CHILD(n, 1).type === SYM.augassign) {
    ch = CHILD(n, 0);
    expr1 = ast_for_testlist(c, ch);
    setContext(c, expr1, Sk.astnodes.Store, ch);
    switch (expr1.constructor) {
      case Sk.astnodes.Name:
        varName = expr1.id;
        forbiddenCheck(c, ch, varName, n.lineno);
        break;
      case Sk.astnodes.Attribute:
      case Sk.astnodes.Subscript:
        break;
      case Sk.astnodes.GeneratorExp:
        throw _construct(Sk.builtin.SyntaxError, ["augmented assignment to generator expression not possible", c.c_filename].concat(_toConsumableArray(get_context(n))));
      case Sk.astnodes.Yield:
        throw _construct(Sk.builtin.SyntaxError, ["augmented assignment to yield expression not possible", c.c_filename].concat(_toConsumableArray(get_context(n))));
      default:
        throw _construct(Sk.builtin.SyntaxError, ["illegal expression for augmented assignment", c.c_filename].concat(_toConsumableArray(get_context(n))));
    }
    ch = CHILD(n, 2);
    if (ch.type === SYM.testlist) {
      expr2 = ast_for_testlist(c, ch);
    } else {
      expr2 = ast_for_expr(c, ch);
    }
    return new Sk.astnodes.AugAssign(expr1, astForAugassign(c, CHILD(n, 1)), expr2, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  } else if (CHILD(n, 1).type === SYM.annassign) {
    if (!Sk.__future__.python3) {
      throw _construct(Sk.builtin.SyntaxError, ["Annotated assignment is not supported in Python 2"].concat(_toConsumableArray(get_context(n))));
    }
    // annotated assignment
    ch = CHILD(n, 0);
    ann = CHILD(n, 1);
    simple = 1;
    deep = ch;
    while (NCH(deep) == 1) {
      deep = CHILD(deep, 0);
    }
    if (NCH(deep) > 0 && TYPE(CHILD(deep, 0)) == TOK.T_LPAR) {
      simple = 0;
    }
    expr1 = ast_for_testlist(c, ch);
    switch (expr1.constructor) {
      case Sk.astnodes.Name:
        varName = expr1.id;
        forbiddenCheck(c, ch, varName, n.lineno);
        setContext(c, expr1, Sk.astnodes.Store, ch);
        break;
      case Sk.astnodes.Attribute:
        varName = expr1.attr;
        forbiddenCheck(c, ch, varName, n.lineno);
        setContext(c, expr1, Sk.astnodes.Store, ch);
        break;
      case Sk.astnodes.Subscript:
        setContext(c, expr1, Sk.astnodes.Store, ch);
        break;
      case Sk.astnodes.List:
        throw _construct(Sk.builtin.SyntaxError, ["only single target (not list) can be annotated", c.c_filename].concat(_toConsumableArray(get_context(n))));
      case Sk.astnodes.Tuple:
        throw _construct(Sk.builtin.SyntaxError, ["only single target (not tuple) can be annotated", c.c_filename].concat(_toConsumableArray(get_context(n))));
      default:
        throw _construct(Sk.builtin.SyntaxError, ["illegal target for annotation", c.c_filename].concat(_toConsumableArray(get_context(n))));
    }
    if (expr1.constructor != Sk.astnodes.Name) {
      simple = 0;
    }
    ch = CHILD(ann, 1);
    expr2 = ast_for_expr(c, ch);
    if (NCH(ann) == 2) {
      return new Sk.astnodes.AnnAssign(expr1, expr2, null, simple, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
    } else {
      ch = CHILD(ann, 3);
      expr3 = ast_for_expr(c, ch);
      return new Sk.astnodes.AnnAssign(expr1, expr2, expr3, simple, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
    }
  } else {
    // normal assignment
    REQ(CHILD(n, 1), TOK.T_EQUAL);
    targets = [];
    for (i = 0; i < NCH(n) - 2; i += 2) {
      ch = CHILD(n, i);
      if (ch.type === SYM.yield_expr) {
        throw _construct(Sk.builtin.SyntaxError, ["assignment to yield expression not possible", c.c_filename].concat(_toConsumableArray(get_context(n))));
      }
      e = ast_for_testlist(c, ch);
      setContext(c, e, Sk.astnodes.Store, CHILD(n, i));
      targets[i / 2] = e;
    }
    value = CHILD(n, NCH(n) - 1);
    if (value.type === SYM.testlist_star_expr) {
      expression = ast_for_testlist(c, value);
    } else {
      expression = ast_for_expr(c, value);
    }
    return new Sk.astnodes.Assign(targets, expression, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  }
}
function astForIfexpr(c, n) {
  /* test: or_test 'if' or_test 'else' test */
  Sk.asserts.assert(NCH(n) === 5);
  return new Sk.astnodes.IfExp(ast_for_expr(c, CHILD(n, 2)), ast_for_expr(c, CHILD(n, 0)), ast_for_expr(c, CHILD(n, 4)), n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
}

/**
 * s is a python-style string literal, including quote characters and u/r/b
 * prefixes. Returns [decoded string object, is-an-fstring]
 */
function parsestr(c, n, s) {
  var quote = s.charAt(0);
  var rawmode = false;
  var unicode = false;
  var fmode = false;
  var bytesmode = false;
  var decodeEscape = function decodeEscape(s, quote) {
    var d3;
    var d2;
    var d1;
    var d0;
    var ch;
    var i;
    var len = s.length;
    var ret = "";
    for (i = 0; i < len; ++i) {
      ch = s.charAt(i);
      if (ch === "\\") {
        ++i;
        ch = s.charAt(i);
        if (ch === "n") {
          ret += "\n";
        } else if (ch === "\\") {
          ret += "\\";
        } else if (ch === "t") {
          ret += "\t";
        } else if (ch === "r") {
          ret += "\r";
        } else if (ch === "b") {
          ret += "\b";
        } else if (ch === "f") {
          ret += "\f";
        } else if (ch === "v") {
          ret += "\v";
        } else if (ch === "0") {
          ret += "\0";
        } else if (ch === "\"") {
          ret += "\"";
        } else if (ch === "'") {
          ret += "'";
        } else if (ch === "\n") /* escaped newline, join lines */{} else if (ch === "x") {
          if (i + 2 >= len) {
            ast_error(c, n, "Truncated \\xNN escape");
          }
          ret += String.fromCharCode(parseInt(s.substr(i + 1, 2), 16));
          i += 2;
        } else if (!bytesmode && ch === "u") {
          if (i + 4 >= len) {
            ast_error(c, n, "Truncated \\uXXXX escape");
          }
          ret += String.fromCharCode(parseInt(s.substr(i + 1, 4), 16));
          i += 4;
        } else if (!bytesmode && ch === "U") {
          if (i + 8 >= len) {
            ast_error(c, n, "Truncated \\UXXXXXXXX escape");
          }
          ret += String.fromCodePoint(parseInt(s.substr(i + 1, 8), 16));
          i += 8;
        } else {
          // Leave it alone
          ret += "\\" + ch;
          // Sk.asserts.fail("unhandled escape: '" + ch.charCodeAt(0) + "'");
        }
      } else if (bytesmode && ch.charCodeAt(0) > 0x7f) {
        ast_error(c, n, "bytes can only contain ASCII literal characters");
      } else {
        ret += ch;
      }
    }
    return ret;
  };

  //console.log("parsestr", s);

  // treats every sequence as unicodes even if they are not treated with uU prefix
  // kinda hacking though working for most purposes
  if (c.c_flags & Sk.Parser.CO_FUTURE_UNICODE_LITERALS || Sk.__future__.unicode_literals === true) {
    unicode = true;
  }
  var seenflags = {};
  while (true) {
    if (quote === "u" || quote === "U") {
      unicode = true;
    } else if (quote === "r" || quote === "R") {
      rawmode = true;
    } else if (quote === "b" || quote === "B") {
      bytesmode = true;
    } else if (quote === "f" || quote === "F") {
      fmode = true;
    } else {
      break;
    }
    s = s.substr(1);
    quote = s.charAt(0);
  }
  Sk.asserts.assert(quote === "'" || quote === "\"" && s.charAt(s.length - 1) === quote);
  s = s.substr(1, s.length - 2);
  if (s.length >= 4 && s.charAt(0) === quote && s.charAt(1) === quote) {
    Sk.asserts.assert(s.charAt(s.length - 1) === quote && s.charAt(s.length - 2) === quote);
    s = s.substr(2, s.length - 4);
  }
  if (rawmode || s.indexOf("\\") === -1) {
    if (bytesmode) {
      for (var i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) > 0x7f) {
          ast_error(c, n, "bytes can only contain ASCII literal characters");
        }
      }
    }
    return [strobj(s), fmode, bytesmode];
  }
  return [strobj(decodeEscape(s, quote)), fmode, bytesmode];
}
function fstring_compile_expr(str, expr_start, expr_end, c, n) {
  Sk.asserts.assert(expr_end >= expr_start);
  Sk.asserts.assert(str.charAt(expr_start - 1) == "{");
  Sk.asserts.assert(str.charAt(expr_end) == "}" || str.charAt(expr_end) == "!" || str.charAt(expr_end) == ":");
  var s = str.substring(expr_start, expr_end);

  /* If the substring is all whitespace, it's an error.  We need to catch this
     here, and not when we call PyParser_SimpleParseStringFlagsFilename,
     because turning the expression '' in to '()' would go from being invalid
     to valid. */
  if (/^\s*$/.test(s)) {
    ast_error(c, n, "f-string: empty expression not allowed");
  }
  s = "(" + s + ")";
  var ast;
  try {
    var parsed = Sk.parse("<fstring>", s);
    ast = Sk.astFromParse(parsed.cst, "<fstring>", parsed.flags);
  } catch (e) {
    if (e.traceback && e.traceback[0]) {
      var tb = e.traceback[0];
      tb.lineno = (tb.lineno || 1) - 1 + LINENO(n);
      tb.filename = c.c_filename;
    }
    throw e;
  }

  // TODO fstring_fix_node_location

  Sk.asserts.assert(ast.body.length == 1 && ast.body[0].constructor === Sk.astnodes.Expr);
  return ast.body[0].value;
}
function fstring_find_expr(str, start, end, raw, recurse_lvl, c, n) {
  var i = start;
  Sk.asserts.assert(str.charAt(i) == "{");
  i++;
  var expr_start = i;
  /* null if we're not in a string, else the quote char we're trying to
     match (single or double quote). */
  var quote_char = null;
  /* If we're inside a string, 1=normal, 3=triple-quoted. */
  var string_type = 0;
  /* Keep track of nesting level for braces/parens/brackets in
     expressions. */
  var nested_depth = 0;
  var format_spec, conversion;
  var unexpected_end_of_string = function unexpected_end_of_string() {
    return ast_error(c, n, "f-string: expecting '}'");
  };
  Sk.asserts.assert(i <= end);
  for (; i < end; i++) {
    var ch = str.charAt(i);

    /* Nowhere inside an expression is a backslash allowed. */
    if (ch == "\\") {
      /* Error: can't include a backslash character, inside
         parens or strings or not. */
      ast_error(c, n, "f-string expression part cannot include a backslash");
    }
    if (quote_char) {
      /* We're inside a string. See if we're at the end. */
      /* This code needs to implement the same non-error logic
         as tok_get from tokenizer.c, at the letter_quote
         label. To actually share that code would be a
         nightmare. But, it's unlikely to change and is small,
         so duplicate it here. Note we don't need to catch all
         of the errors, since they'll be caught when parsing the
         expression. We just need to match the non-error
         cases. Thus we can ignore \n in single-quoted strings,
         for example. Or non-terminated strings. */
      if (ch == quote_char) {
        /* Does this match the string_type (single or triple
           quoted)? */
        if (string_type == 3) {
          if (i + 2 < end && str.charAt(i + 1) == ch && str.charAt(i + 2) == ch) {
            /* We're at the end of a triple quoted string. */
            i += 2;
            string_type = 0;
            quote_char = 0;
            continue;
          }
        } else {
          /* We're at the end of a normal string. */
          quote_char = 0;
          string_type = 0;
          continue;
        }
      }
    } else if (ch == "'" || ch == "\"") {
      /* Is this a triple quoted string? */
      if (i + 2 < end && str.charAt(i + 1) == ch && str.charAt(i + 2) == ch) {
        string_type = 3;
        i += 2;
      } else {
        /* Start of a normal string. */
        string_type = 1;
      }
      /* Start looking for the end of the string. */
      quote_char = ch;
    } else if (ch == "[" || ch == "{" || ch == "(") {
      nested_depth++;
    } else if (nested_depth != 0 && (ch == "]" || ch == "}" || ch == ")")) {
      nested_depth--;
    } else if (ch == "#") {
      /* Error: can't include a comment character, inside parens
         or not. */
      ast_error(c, n, "f-string expression part cannot include '#'");
    } else if (nested_depth == 0 && (ch == "!" || ch == ":" || ch == "}")) {
      /* First, test for the special case of "!=". Since '=' is
         not an allowed conversion character, nothing is lost in
         this test. */
      if (ch == "!" && i + 1 < end && str.charAt(i + 1) == "=") {
        /* This isn't a conversion character, just continue. */
        continue;
      }
      /* Normal way out of this loop. */
      break;
    } else {
      /* Just consume this char and loop around. */
    }
  }

  /* If we leave this loop in a string or with mismatched parens, we
     don't care. We'll get a syntax error when compiling the
     expression. But, we can produce a better error message, so
     let's just do that.*/
  if (quote_char) {
    ast_error(c, n, "f-string: unterminated string");
  }
  if (nested_depth) {
    ast_error(c, n, "f-string: mismatched '(', '{', or '['");
  }
  var expr_end = i;

  /* Compile the expression as soon as possible, so we show errors
     related to the expression before errors related to the
     conversion or format_spec. */
  var simple_expression = fstring_compile_expr(str, expr_start, expr_end, c, n);

  /* Check for a conversion char, if present. */
  if (str.charAt(i) == "!") {
    i++;
    if (i >= end) {
      unexpected_end_of_string();
    }
    conversion = str.charAt(i);
    i++;

    /* Validate the conversion. */
    if (!(conversion == "s" || conversion == "r" || conversion == "a")) {
      ast_error(c, n, "f-string: invalid conversion character: expected 's', 'r', or 'a'");
    }
  }

  /* Check for the format spec, if present. */
  if (i >= end) {
    unexpected_end_of_string();
  }
  if (str.charAt(i) == ":") {
    i++;
    if (i >= end) {
      unexpected_end_of_string();
    }

    /* Parse the format spec. */
    var _fstring_parse = fstring_parse(str, i, end, raw, recurse_lvl + 1, c, n);
    var _fstring_parse2 = _slicedToArray(_fstring_parse, 2);
    format_spec = _fstring_parse2[0];
    i = _fstring_parse2[1];
  }
  if (i >= end || str.charAt(i) != "}") {
    unexpected_end_of_string();
  }

  /* We're at a right brace. Consume it. */
  i++;

  /* And now create the FormattedValue node that represents this
     entire expression with the conversion and format spec. */
  var expr = new Sk.astnodes.FormattedValue(simple_expression, conversion, format_spec, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
  return [expr, i];
}
function fstring_parse(str, start, end, raw, recurse_lvl, c, n) {
  var values = [];
  var idx = start;
  var addLiteral = function addLiteral(literal) {
    if (literal.indexOf("}") !== -1) {
      // We need to error out on any lone }s, and
      // replace doubles with singles.
      if (/(^|[^}])}(}})*($|[^}])/.test(literal)) {
        throw _construct(Sk.builtin.SyntaxError, ["f-string: single '}' is not allowed", c.c_filename].concat(_toConsumableArray(get_context(n))));
      }
      literal = literal.replace(/}}/g, "}");
    }
    values.push(new Sk.astnodes.Str(new Sk.builtin.str(literal), LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset));
  };
  while (idx < end) {
    var bidx = str.indexOf("{", idx);
    if (recurse_lvl !== 0) {
      // If there's a closing brace before the next open brace,
      // that's our end-of-expression
      var cbidx = str.indexOf("}", idx);
      if (cbidx !== -1) {
        if (bidx === -1) {
          end = cbidx;
        } else if (bidx > cbidx) {
          bidx = -1;
          end = cbidx;
        }
      }
    }
    if (bidx === -1) {
      addLiteral(str.substring(idx, end));
      idx = end;
      break;
    } else if (bidx + 1 < end && str.charAt(bidx + 1) === "{") {
      // Swallow the double {{
      addLiteral(str.substring(idx, bidx + 1));
      idx = bidx + 2;
      continue;
    } else {
      addLiteral(str.substring(idx, bidx));
      idx = bidx;

      // And now parse the f-string expression itself
      var _fstring_find_expr = fstring_find_expr(str, bidx, end, raw, recurse_lvl, c, n),
        _fstring_find_expr2 = _slicedToArray(_fstring_find_expr, 2),
        expr = _fstring_find_expr2[0],
        endIdx = _fstring_find_expr2[1];
      values.push(expr);
      idx = endIdx;
    }
  }
  return [new Sk.astnodes.JoinedStr(values, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset), idx];
}
function parsestrplus(c, n) {
  var strs = [];
  var lastStrNode;
  var bytesmode;
  for (var i = 0; i < NCH(n); ++i) {
    var chstr = CHILD(n, i).value;
    var r = parsestr(c, CHILD(n, i), chstr);
    var str = r[0];
    var fmode = r[1];
    var this_bytesmode = r[2];

    /* Check that we're not mixing bytes with unicode. */
    if (i != 0 && bytesmode !== this_bytesmode) {
      ast_error(c, n, "cannot mix bytes and nonbytes literals");
    }
    bytesmode = this_bytesmode;
    if (fmode) {
      if (!Sk.__future__.python3) {
        throw _construct(Sk.builtin.SyntaxError, ["invalid string (f-strings are not supported in Python 2)", c.c_filename].concat(_toConsumableArray(get_context(CHILD(n, i)))));
      }
      var jss = str.$jsstr();
      var _fstring_parse3 = fstring_parse(jss, 0, jss.length, false, 0, c, CHILD(n, i)),
        _fstring_parse4 = _slicedToArray(_fstring_parse3, 2),
        astnode = _fstring_parse4[0],
        _ = _fstring_parse4[1];
      strs.push.apply(strs, astnode.values);
      lastStrNode = null;
    } else {
      if (lastStrNode) {
        lastStrNode.s = lastStrNode.s.sq$concat(str);
      } else {
        var type = bytesmode ? Sk.astnodes.Bytes : Sk.astnodes.Str;
        lastStrNode = new type(str, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
        strs.push(lastStrNode);
      }
    }
  }
  if (strs.length === 1 && strs[0].constructor === Sk.astnodes.Str) {
    return strs[0];
  } else {
    return new Sk.astnodes.JoinedStr(strs, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
  }
}
var FLOAT_RE = new RegExp(Sk._tokenize.Floatnumber);
var underscore = /_/g;
function parsenumber(c, s, lineno) {
  s = s.replace(underscore, ""); // we already know that we have a valid underscore number from the tokenizer

  var end = s[s.length - 1];
  // we know it's just a single floating point imaginary complex number
  if (end === "j" || end === "J") {
    return new Sk.builtin.complex(0, parseFloat(s.slice(0, -1)));
  }

  // use the tokenizer float test
  if (FLOAT_RE.test(s)) {
    return new Sk.builtin.float_(parseFloat(s));
  }
  var start = s[0];
  // python 2 compatiblity
  if (start === "0" && s !== "0" && s.charCodeAt(1) < 65 /** i.e. the second char is a digit and not a base */) {
    s = "0o" + s.substring(1); // silent octal
  }
  // python2 makes no guarantee about the size of a long
  // so only make the int literal a long if it has an L suffix
  var isInt = true;
  if (end === "l" || end === "L") {
    s = s.slice(0, -1);
    isInt = false;
  }

  // we know it's a valid octal, hex, binary or decimal so let Number do its thing
  var val = Number(s); // we can rely on this since we know s is positive and is already a valid int literal
  if (val > Number.MAX_SAFE_INTEGER) {
    return isInt ? new Sk.builtin.int_(JSBI.BigInt(s)) : new Sk.builtin.lng(JSBI.BigInt(s));
  }
  return isInt ? new Sk.builtin.int_(val) : new Sk.builtin.lng(val);
}
function astForSlice(c, n) {
  var n2;
  var step;
  var upper;
  var lower;
  var ch;
  REQ(n, SYM.subscript);

  /*
   subscript: '.' '.' '.' | test | [test] ':' [test] [sliceop]
   sliceop: ':' [test]
   */
  ch = CHILD(n, 0);
  lower = null;
  upper = null;
  step = null;
  if (ch.type === TOK.T_DOT) {
    return new Sk.astnodes.Ellipsis();
  }
  if (NCH(n) === 1 && ch.type === SYM.test) {
    return new Sk.astnodes.Index(ast_for_expr(c, ch));
  }
  if (ch.type === SYM.test) {
    lower = ast_for_expr(c, ch);
  }
  if (ch.type === TOK.T_COLON) {
    if (NCH(n) > 1) {
      n2 = CHILD(n, 1);
      if (n2.type === SYM.test) {
        upper = ast_for_expr(c, n2);
      }
    }
  } else if (NCH(n) > 2) {
    n2 = CHILD(n, 2);
    if (n2.type === SYM.test) {
      upper = ast_for_expr(c, n2);
    }
  }
  ch = CHILD(n, NCH(n) - 1);
  if (ch.type === SYM.sliceop) {
    if (NCH(ch) === 1) {
      ch = CHILD(ch, 0);
      step = new Sk.astnodes.NameConstant(Sk.builtin.none.none$, Sk.astnodes.Load, ch.lineno, ch.col_offset, ch.end_lineno, ch.end_col_offset);
    } else {
      ch = CHILD(ch, 1);
      if (ch.type === SYM.test) {
        step = ast_for_expr(c, ch);
      }
    }
  }
  return new Sk.astnodes.Slice(lower, upper, step);
}
function ast_for_atom(c, n) {
  /* atom: '(' [yield_expr|testlist_comp] ')' | '[' [testlist_comp] ']'
     | '{' [dictmaker|testlist_comp] '}' | NAME | NUMBER | STRING+
     | '...' | 'None' | 'True' | 'False'
  */
  var ch = CHILD(n, 0);
  switch (TYPE(ch)) {
    case TOK.T_NAME:
      {
        var name;
        var s = STR(ch);
        if (s.length >= 4 && s.length <= 5) {
          if (s === "None") {
            return new Sk.astnodes.NameConstant(Sk.builtin.none.none$, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
          }
          if (s === "True") {
            return new Sk.astnodes.NameConstant(Sk.builtin.bool.true$, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
          }
          if (s === "False") {
            return new Sk.astnodes.NameConstant(Sk.builtin.bool.false$, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
          }
        }
        name = new_identifier(s, c);
        /* All names start in Load context, but may later be changed. */
        return new Sk.astnodes.Name(name, Sk.astnodes.Load, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      }
    case TOK.T_STRING:
      return parsestrplus(c, n);
    case TOK.T_NUMBER:
      return new Sk.astnodes.Num(parsenumber(c, ch.value, n.lineno), n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
    case TOK.T_ELLIPSIS:
      /* Ellipsis */
      return new Sk.astnodes.Ellipsis(LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
    case TOK.T_LPAR:
      /* some parenthesized expressions */
      ch = CHILD(n, 1);
      if (TYPE(ch) == TOK.T_RPAR) {
        return new Sk.astnodes.Tuple([], Sk.astnodes.Load, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      }
      if (TYPE(ch) == SYM.yield_expr) {
        return ast_for_expr(c, ch);
      }

      /* testlist_comp: test ( comp_for | (',' test)* [','] ) */
      if (NCH(ch) == 1) {
        return ast_for_testlist(c, ch);
      }
      if (TYPE(CHILD(ch, 1)) == SYM.comp_for) {
        return copy_location(ast_for_genexp(c, ch), n);
      } else {
        return copy_location(ast_for_testlist(c, ch), n);
      }
    case TOK.T_LSQB:
      /* list (or list comprehension) */
      ch = CHILD(n, 1);
      if (TYPE(ch) == TOK.T_RSQB) {
        return new Sk.astnodes.List([], Sk.astnodes.Load, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      }
      REQ(ch, SYM.testlist_comp);
      if (NCH(ch) == 1 || TYPE(CHILD(ch, 1)) == TOK.T_COMMA) {
        var elts = seq_for_testlist(c, ch);
        if (!elts) {
          return null;
        }
        return new Sk.astnodes.List(elts, Sk.astnodes.Load, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
      } else {
        return copy_location(ast_for_listcomp(c, ch), n);
      }
    case TOK.T_LBRACE:
      {
        /* dictorsetmaker: ( ((test ':' test | '**' test)
        *                    (comp_for | (',' (test ':' test | '**' test))* [','])) |
        *                   ((test | '*' test)
        *                    (comp_for | (',' (test | '*' test))* [','])) ) */
        var res;
        ch = CHILD(n, 1);
        if (TYPE(ch) == TOK.T_RBRACE) {
          /* It's an empty dict. */
          return new Sk.astnodes.Dict(null, null, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
        } else {
          var is_dict = TYPE(CHILD(ch, 0)) == TOK.T_DOUBLESTAR;
          if (NCH(ch) == 1 || NCH(ch) > 1 && TYPE(CHILD(ch, 1)) == TOK.T_COMMA) {
            /* It's a set display. */
            res = ast_for_setdisplay(c, ch);
          } else if (NCH(ch) > 1 && TYPE(CHILD(ch, 1)) == SYM.comp_for) {
            /* It's a set comprehension. */
            res = ast_for_setcomp(c, ch);
          } else if (NCH(ch) > 3 - is_dict && TYPE(CHILD(ch, 3 - is_dict)) == SYM.comp_for) {
            /* It's a dictionary comprehension. */
            if (is_dict) {
              ast_error(c, n, "dict unpacking cannot be used in dict comprehension");
              return null;
            }
            res = ast_for_dictcomp(c, ch);
          } else {
            /* It's a dictionary display. */
            res = ast_for_dictdisplay(c, ch);
          }
          return copy_location(res, n);
        }
      }
    default:
      Sk.asserts.fail("unhandled atom " + TYPE(ch));
      return null;
  }
}
function ast_for_setdisplay(c, n) {
  var i;
  var elts = [];
  Sk.asserts.assert(TYPE(n) === SYM.dictorsetmaker);
  for (i = 0; i < NCH(n); i += 2) {
    var expression;
    expression = ast_for_expr(c, CHILD(n, i));
    elts[i / 2] = expression;
  }
  return new Sk.astnodes.Set(elts, LINENO(n), n.col_offset, n.end_lineno, n.end_col_offset);
}
function astForAtomExpr(c, n) {
  var i,
    nch,
    start = 0;
  var e, tmp;
  REQ(n, SYM.atom_expr);
  nch = NCH(n);
  if (CHILD(n, 0).type === TOK.T_AWAIT) {
    start = 1;
    Sk.asserts.assert(nch > 1);
  }
  e = ast_for_atom(c, CHILD(n, start));
  if (!e) {
    return null;
  }
  if (nch === 1) {
    return e;
  }
  if (start && nch === 2) {
    return new Sk.astnodes.Await(e, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset /*, c->c_arena*/);
  }
  for (i = start + 1; i < nch; i++) {
    var ch = CHILD(n, i);
    if (ch.type !== SYM.trailer) {
      break;
    }
    tmp = ast_for_trailer(c, ch, e);
    if (!tmp) {
      return null;
    }
    tmp.lineno = e.lineno;
    tmp.col_offset = e.col_offset;
    e = tmp;
  }
  if (start) {
    /* there was an AWAIT */
    return new Sk.astnodes.Await(e, n.line, n.col_offset, n.end_lineno, n.end_col_offset /*, c->c_arena*/);
  } else {
    return e;
  }
}
function astForPower(c, n) {
  /* power: atom trailer* ('**' factor)*
   */
  var f;
  var tmp;
  var ch;
  var i;
  var e;
  REQ(n, SYM.power);
  e = astForAtomExpr(c, CHILD(n, 0));
  if (NCH(n) === 1) {
    return e;
  }
  if (CHILD(n, NCH(n) - 1).type === SYM.factor) {
    f = ast_for_expr(c, CHILD(n, NCH(n) - 1));
    e = new Sk.astnodes.BinOp(e, Sk.astnodes.Pow, f, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
  }
  return e;
}
function astForStarred(c, n) {
  REQ(n, SYM.star_expr);

  /* The Load context is changed later */
  return new Sk.astnodes.Starred(ast_for_expr(c, CHILD(n, 1)), Sk.astnodes.Load, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset /*, c.c_arena */);
}
function ast_for_expr(c, n) {
  /*
   handle the full range of simple expressions
   test: or_test ['if' or_test 'else' test] | lambdef
   test_nocond: or_test | lambdef_nocond
   or_test: and_test ('or' and_test)*
   and_test: not_test ('and' not_test)*
   not_test: 'not' not_test | comparison
   comparison: expr (comp_op expr)*
   expr: xor_expr ('|' xor_expr)*
   xor_expr: and_expr ('^' and_expr)*
   and_expr: shift_expr ('&' shift_expr)*
   shift_expr: arith_expr (('<<'|'>>') arith_expr)*
   arith_expr: term (('+'|'-') term)*
   term: factor (('*'|'/'|'%'|'//') factor)*
   factor: ('+'|'-'|'~') factor | power
   power: atom_expr ['**' factor]
   atom_expr: [AWAIT] atom trailer*
   yield_expr: 'yield' [yield_arg]
  */

  var exp;
  var cmps;
  var ops;
  var i;
  var seq;
  LOOP: while (true) {
    switch (n.type) {
      case SYM.test:
      case SYM.test_nocond:
        if (CHILD(n, 0).type === SYM.lambdef || CHILD(n, 0).type === SYM.lambdef_nocond) {
          return astForLambdef(c, CHILD(n, 0));
        } else if (NCH(n) > 1) {
          return astForIfexpr(c, n);
        }
      // fallthrough
      case SYM.or_test:
      case SYM.and_test:
        if (NCH(n) === 1) {
          n = CHILD(n, 0);
          continue LOOP;
        }
        seq = [];
        for (i = 0; i < NCH(n); i += 2) {
          seq[i / 2] = ast_for_expr(c, CHILD(n, i));
        }
        if (CHILD(n, 1).value === "and") {
          return new Sk.astnodes.BoolOp(Sk.astnodes.And, seq, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset /*, c.c_arena*/);
        }
        Sk.asserts.assert(CHILD(n, 1).value === "or");
        return new Sk.astnodes.BoolOp(Sk.astnodes.Or, seq, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
      case SYM.not_test:
        if (NCH(n) === 1) {
          n = CHILD(n, 0);
          continue LOOP;
        } else {
          return new Sk.astnodes.UnaryOp(Sk.astnodes.Not, ast_for_expr(c, CHILD(n, 1)), n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
        }
        break;
      case SYM.comparison:
        if (NCH(n) === 1) {
          n = CHILD(n, 0);
          continue LOOP;
        } else {
          ops = [];
          cmps = [];
          for (i = 1; i < NCH(n); i += 2) {
            ops[(i - 1) / 2] = astForCompOp(c, CHILD(n, i));
            cmps[(i - 1) / 2] = ast_for_expr(c, CHILD(n, i + 1));
          }
          return new Sk.astnodes.Compare(ast_for_expr(c, CHILD(n, 0)), ops, cmps, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
        }
        break;
      case SYM.star_expr:
        return astForStarred(c, n);
      /* The next fize cases all handle BinOps  The main body of code
         is the same in each case, but the switch turned inside out to
         reuse the code for each type of operator
       */
      case SYM.expr:
      case SYM.xor_expr:
      case SYM.and_expr:
      case SYM.shift_expr:
      case SYM.arith_expr:
      case SYM.term:
        if (NCH(n) === 1) {
          n = CHILD(n, 0);
          continue LOOP;
        }
        return astForBinop(c, n);
      case SYM.yield_expr:
        var an;
        var en;
        var is_from = false;
        exp = null;
        if (NCH(n) > 1) {
          an = CHILD(n, 1); /* yield_arg */
        }
        if (an) {
          en = CHILD(an, NCH(an) - 1);
          if (NCH(an) == 2) {
            is_from = true;
            exp = ast_for_expr(c, en);
          } else {
            exp = ast_for_testlist(c, en);
          }
        }
        if (is_from) {
          return new Sk.astnodes.YieldFrom(exp, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
        }
        return new Sk.astnodes.Yield(exp, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
      case SYM.factor:
        if (NCH(n) === 1) {
          n = CHILD(n, 0);
          continue LOOP;
        }
        return astForFactor(c, n);
      case SYM.power:
        return astForPower(c, n);
      default:
        Sk.asserts.fail("unhandled expr", "n.type: %d", n.type);
    }
    break;
  }
}
function astForNonLocalStmt(c, n) {
  ast_error(c, n, "Not implemented: nonlocal");
}
function astForAsyncStmt(c, n) {
  ast_error(c, n, "Not implemented: async");
}

// This is only used for Python 2 support.
function astForPrintStmt(c, n) {
  if (Sk.__future__.print_function) {
    ast_error(c, n, "Missing parentheses in call to 'print'");
  }

  /* print_stmt: 'print' ( [ test (',' test)* [','] ]
   | '>>' test [ (',' test)+ [','] ] )
   */
  var nl;
  var i, j;
  var seq;
  var start = 1;
  var dest = null;
  REQ(n, SYM.print_stmt);
  if (NCH(n) >= 2 && CHILD(n, 1).type === TOK.T_RIGHTSHIFT) {
    dest = ast_for_expr(c, CHILD(n, 2));
    start = 4;
  }
  seq = [];
  for (i = start, j = 0; i < NCH(n); i += 2, ++j) {
    seq[j] = ast_for_expr(c, CHILD(n, i));
  }
  nl = CHILD(n, NCH(n) - 1).type === TOK.T_COMMA ? false : true;
  return new Sk.astnodes.Print(dest, seq, nl, n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
}
function astForStmt(c, n) {
  var ch;
  if (n.type === SYM.stmt) {
    Sk.asserts.assert(NCH(n) === 1);
    n = CHILD(n, 0);
  }
  if (n.type === SYM.simple_stmt) {
    Sk.asserts.assert(numStmts(n) === 1);
    n = CHILD(n, 0);
  }
  if (n.type === SYM.small_stmt) {
    n = CHILD(n, 0);
    /* small_stmt: expr_stmt | del_stmt | pass_stmt | flow_stmt
               | import_stmt | global_stmt | nonlocal_stmt | assert_stmt
               | debugger_stmt (skulpt special)
    */
    switch (n.type) {
      case SYM.expr_stmt:
        return ast_for_exprStmt(c, n);
      case SYM.del_stmt:
        return astForDelStmt(c, n);
      case SYM.pass_stmt:
        return new Sk.astnodes.Pass(n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
      case SYM.flow_stmt:
        return ast_for_flow_stmt(c, n);
      case SYM.import_stmt:
        return astForImportStmt(c, n);
      case SYM.global_stmt:
        return astForGlobalStmt(c, n);
      case SYM.nonlocal_stmt:
        return astForNonLocalStmt(c, n);
      case SYM.assert_stmt:
        return astForAssertStmt(c, n);
      case SYM.print_stmt:
        return astForPrintStmt(c, n);
      case SYM.debugger_stmt:
        return new Sk.astnodes.Debugger(n.lineno, n.col_offset, n.end_lineno, n.end_col_offset);
      default:
        Sk.asserts.fail("unhandled small_stmt");
    }
  } else {
    /* compound_stmt: if_stmt | while_stmt | for_stmt | try_stmt
                    | funcdef | classdef | decorated | async_stmt
    */
    ch = CHILD(n, 0);
    REQ(n, SYM.compound_stmt);
    switch (ch.type) {
      case SYM.if_stmt:
        return astForIfStmt(c, ch);
      case SYM.while_stmt:
        return astForWhileStmt(c, ch);
      case SYM.for_stmt:
        return astForForStmt(c, ch);
      case SYM.try_stmt:
        return astForTryStmt(c, ch);
      case SYM.with_stmt:
        return ast_for_with_stmt(c, ch);
      case SYM.funcdef:
        return ast_for_funcdef(c, ch, []);
      case SYM.classdef:
        return astForClassdef(c, ch, []);
      case SYM.decorated:
        return ast_for_decorated(c, ch);
      case SYM.async_stmt:
        return astForAsyncStmt(c, ch);
      default:
        Sk.asserts.assert("unhandled compound_stmt");
    }
  }
}
;
Sk.astFromParse = function (n, filename, c_flags) {
  var j;
  var num;
  var ch;
  var i;
  var c = new Compiling("utf-8", filename, c_flags);
  var stmts = [];
  var k = 0;
  switch (n.type) {
    case SYM.file_input:
      for (i = 0; i < NCH(n) - 1; ++i) {
        ch = CHILD(n, i);
        if (ch.type === TOK.T_NEWLINE) {
          continue;
        }
        REQ(ch, SYM.stmt);
        num = numStmts(ch);
        if (num === 1) {
          stmts[k++] = astForStmt(c, ch);
        } else {
          ch = CHILD(ch, 0);
          REQ(ch, SYM.simple_stmt);
          for (j = 0; j < num; ++j) {
            stmts[k++] = astForStmt(c, CHILD(ch, j * 2));
          }
        }
      }
      return new Sk.astnodes.Module(stmts);
    case SYM.eval_input:
      Sk.asserts.fail("todo;");
    case SYM.single_input:
      Sk.asserts.fail("todo;");
    default:
      Sk.asserts.fail("todo;");
  }
};
Sk.astDump = function (node) {
  var spaces = function spaces(n) {
    // todo; blurgh
    var i;
    var ret = "";
    for (i = 0; i < n; ++i) {
      ret += " ";
    }
    return ret;
  };
  var _format2 = function _format(node, indent) {
    var ret;
    var elemsstr;
    var x;
    var elems;
    var fieldstr;
    var field;
    var attrs;
    var fieldlen;
    var b;
    var a;
    var i;
    var fields;
    var namelen;
    if (node === null) {
      return indent + "None";
    } else if (node.prototype && node.prototype._astname !== undefined && node.prototype._isenum) {
      return indent + node.prototype._astname + "()";
    } else if (node._astname !== undefined) {
      namelen = spaces(node._astname.length + 1);
      fields = [];
      for (i = 0; i < node._fields.length; i += 2) {
        // iter_fields
        a = node._fields[i]; // field name
        b = node._fields[i + 1](node); // field getter func
        fieldlen = spaces(a.length + 1);
        fields.push([a, _format2(b, indent + namelen + fieldlen)]);
      }
      attrs = [];
      for (i = 0; i < fields.length; ++i) {
        field = fields[i];
        attrs.push(field[0] + "=" + field[1].replace(/^\s+/, ""));
      }
      fieldstr = attrs.join(",\n" + indent + namelen);
      return indent + node._astname + "(" + fieldstr + ")";
    } else if (Sk.isArrayLike(node)) {
      //Sk.debugout("arr", node.length);
      elems = [];
      for (i = 0; i < node.length; ++i) {
        x = node[i];
        elems.push(_format2(x, indent + " "));
      }
      elemsstr = elems.join(",\n");
      return indent + "[" + elemsstr.replace(/^\s+/, "") + "]";
    } else {
      if (node === true) {
        ret = "True";
      } else if (node === false) {
        ret = "False";
      } else if (node instanceof Sk.builtin.lng) {
        ret = node.tp$str().v;
      } else if (node instanceof Sk.builtin.str) {
        ret = node["$r"]().v;
      } else {
        ret = "" + node;
      }
      return indent + ret;
    }
  };
  return _format2(node, "");
};
Sk.INHERITANCE_MAP = {
  "mod": [Sk.astnodes.Module, Sk.astnodes.Interactive, Sk.astnodes.Expression, Sk.astnodes.Suite],
  "stmt": [Sk.astnodes.FunctionDef, Sk.astnodes.AsyncFunctionDef, Sk.astnodes.ClassDef, Sk.astnodes.Return, Sk.astnodes.Delete, Sk.astnodes.Assign, Sk.astnodes.AugAssign, Sk.astnodes.AnnAssign, Sk.astnodes.For, Sk.astnodes.AsyncFor, Sk.astnodes.While, Sk.astnodes.If, Sk.astnodes.With, Sk.astnodes.AsyncWith, Sk.astnodes.Raise, Sk.astnodes.Try, Sk.astnodes.Assert, Sk.astnodes.Import, Sk.astnodes.ImportFrom, Sk.astnodes.Global, Sk.astnodes.Nonlocal, Sk.astnodes.Expr, Sk.astnodes.Pass, Sk.astnodes.Break, Sk.astnodes.Continue, Sk.astnodes.Print, Sk.astnodes.Debugger],
  "expr": [Sk.astnodes.BoolOp, Sk.astnodes.BinOp, Sk.astnodes.UnaryOp, Sk.astnodes.Lambda, Sk.astnodes.IfExp, Sk.astnodes.Dict, Sk.astnodes.Set, Sk.astnodes.ListComp, Sk.astnodes.SetComp, Sk.astnodes.DictComp, Sk.astnodes.GeneratorExp, Sk.astnodes.Await, Sk.astnodes.Yield, Sk.astnodes.YieldFrom, Sk.astnodes.Compare, Sk.astnodes.Call, Sk.astnodes.Num, Sk.astnodes.Str, Sk.astnodes.FormattedValue, Sk.astnodes.JoinedStr, Sk.astnodes.Bytes, Sk.astnodes.Ellipsis, Sk.astnodes.NameConstant, Sk.astnodes.Constant, Sk.astnodes.Attribute, Sk.astnodes.Subscript, Sk.astnodes.Starred, Sk.astnodes.Name, Sk.astnodes.List, Sk.astnodes.Tuple],
  "expr_context": [Sk.astnodes.Load, Sk.astnodes.Store, Sk.astnodes.Del, Sk.astnodes.AugLoad, Sk.astnodes.AugStore, Sk.astnodes.Param],
  "slice": [Sk.astnodes.Slice, Sk.astnodes.ExtSlice, Sk.astnodes.Index],
  "boolop": [Sk.astnodes.And, Sk.astnodes.Or],
  "operator": [Sk.astnodes.Add, Sk.astnodes.Sub, Sk.astnodes.Mult, Sk.astnodes.MatMult, Sk.astnodes.Div, Sk.astnodes.Mod, Sk.astnodes.Pow, Sk.astnodes.LShift, Sk.astnodes.RShift, Sk.astnodes.BitOr, Sk.astnodes.BitXor, Sk.astnodes.BitAnd, Sk.astnodes.FloorDiv],
  "unaryop": [Sk.astnodes.Invert, Sk.astnodes.Not, Sk.astnodes.UAdd, Sk.astnodes.USub],
  "cmpop": [Sk.astnodes.Eq, Sk.astnodes.NotEq, Sk.astnodes.Lt, Sk.astnodes.LtE, Sk.astnodes.Gt, Sk.astnodes.GtE, Sk.astnodes.Is, Sk.astnodes.IsNot, Sk.astnodes.In, Sk.astnodes.NotIn],
  "comprehension": [],
  "excepthandler": [Sk.astnodes.ExceptHandler],
  "arguments_": [],
  "arg": [],
  "keyword": [],
  "alias": [],
  "withitem": []
};
Sk.exportSymbol("Sk.astFromParse", Sk.astFromParse);
Sk.exportSymbol("Sk.astDump", Sk.astDump);
Sk.exportSymbol("Sk.INHERITANCE_MAP", Sk.INHERITANCE_MAP);