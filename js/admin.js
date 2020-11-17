'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by lucasgonzalez on 27/07/16.
 */
$(document).ready(function () {
    $("#user-information-modal").on('show.bs.modal', function (ev) {
        var clicked = $(ev.relatedTarget);
        var modal = $(this);

        $('.name', modal).text(clicked.attr('data-name'));
        $('.email', modal).text(clicked.attr('data-cpf'));
        $('.cpf', modal).text(clicked.attr('data-email'));
    });
});

/**
 * Created by lucasgonzalez on 08/07/16.
 */
$(document).ready(function () {

    $('#create-donation-form').submit(function (ev) {
        ev.preventDefault();
        var form = $(this);

        var action = form.attr('action');

        var data = form.serialize();

        $(".alert.alert-danger", form).remove();

        var button = $('label[for=create-donation-form-submit]', $('#create-donation-form').parents('.modal-dialog'));

        button.button('loading');

        $.post(action, data, function (response) {
            var item = $('<tr></tr>');
            item.append($('<td></td>').text(response.id));
            item.append($('<td></td>').text(''));
            item.append($('<td></td>').text('R$ ' + parseFloat(response.amount)));
            item.append($('<td></td>').text(''));
            item.append($('<td></td>').text(response.status_name));

            window.location.reload();
        }).fail(function (response) {
            console.log(response);
            switch (response.status) {
                case 422:
                    $.each(response.responseJSON, function (key, value) {
                        $("input[name=" + key + "]", form).parent().append($('<div></div>').addClass('alert alert-danger').text(value[0]));
                    });
            }
            button.button('reset');
        });

        return false;
    });

    $('#create-donation-form [name=cpf]').mask('000.000.000-00');
    $('#create-donation-form [name=amount]').mask('0#');
    $('#create-donation-form [name=received_at]').mask('00/00/0000');

    $('#create-donation-modal').on('hidden.bs.modal', function () {
        var form = $('form', $(this));
        form[0].reset();

        $('.alert.alert-danger', form).remove();
    });
});
/*!
 DataTables 1.10.19
 ©2008-2018 SpryMedia Ltd - datatables.net/license
*/
(function (h) {
    "function" === typeof define && define.amd ? define(["jquery"], function (E) {
        return h(E, window, document);
    }) : "object" === (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ? module.exports = function (E, H) {
        E || (E = window);H || (H = "undefined" !== typeof window ? require("jquery") : require("jquery")(E));return h(H, E, E.document);
    } : h(jQuery, window, document);
})(function (h, E, H, k) {
    function Z(a) {
        var b,
            c,
            d = {};h.each(a, function (e) {
            if ((b = e.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " ")) c = e.replace(b[0], b[2].toLowerCase()), d[c] = e, "o" === b[1] && Z(a[e]);
        });a._hungarianMap = d;
    }function J(a, b, c) {
        a._hungarianMap || Z(a);var d;h.each(b, function (e) {
            d = a._hungarianMap[e];if (d !== k && (c || b[d] === k)) "o" === d.charAt(0) ? (b[d] || (b[d] = {}), h.extend(!0, b[d], b[e]), J(a[d], b[d], c)) : b[d] = b[e];
        });
    }function Ca(a) {
        var b = n.defaults.oLanguage,
            c = b.sDecimal;c && Da(c);if (a) {
            var d = a.sZeroRecords;!a.sEmptyTable && d && "No data available in table" === b.sEmptyTable && F(a, a, "sZeroRecords", "sEmptyTable");!a.sLoadingRecords && d && "Loading..." === b.sLoadingRecords && F(a, a, "sZeroRecords", "sLoadingRecords");a.sInfoThousands && (a.sThousands = a.sInfoThousands);(a = a.sDecimal) && c !== a && Da(a);
        }
    }function fb(a) {
        A(a, "ordering", "bSort");A(a, "orderMulti", "bSortMulti");A(a, "orderClasses", "bSortClasses");A(a, "orderCellsTop", "bSortCellsTop");A(a, "order", "aaSorting");A(a, "orderFixed", "aaSortingFixed");A(a, "paging", "bPaginate");A(a, "pagingType", "sPaginationType");A(a, "pageLength", "iDisplayLength");A(a, "searching", "bFilter");"boolean" === typeof a.sScrollX && (a.sScrollX = a.sScrollX ? "100%" : "");"boolean" === typeof a.scrollX && (a.scrollX = a.scrollX ? "100%" : "");if (a = a.aoSearchCols) for (var b = 0, c = a.length; b < c; b++) {
            a[b] && J(n.models.oSearch, a[b]);
        }
    }function gb(a) {
        A(a, "orderable", "bSortable");A(a, "orderData", "aDataSort");A(a, "orderSequence", "asSorting");A(a, "orderDataType", "sortDataType");var b = a.aDataSort;"number" === typeof b && !h.isArray(b) && (a.aDataSort = [b]);
    }function hb(a) {
        if (!n.__browser) {
            var b = {};n.__browser = b;var c = h("<div/>").css({ position: "fixed", top: 0, left: -1 * h(E).scrollLeft(), height: 1, width: 1,
                overflow: "hidden" }).append(h("<div/>").css({ position: "absolute", top: 1, left: 1, width: 100, overflow: "scroll" }).append(h("<div/>").css({ width: "100%", height: 10 }))).appendTo("body"),
                d = c.children(),
                e = d.children();b.barWidth = d[0].offsetWidth - d[0].clientWidth;b.bScrollOversize = 100 === e[0].offsetWidth && 100 !== d[0].clientWidth;b.bScrollbarLeft = 1 !== Math.round(e.offset().left);b.bBounding = c[0].getBoundingClientRect().width ? !0 : !1;c.remove();
        }h.extend(a.oBrowser, n.__browser);a.oScroll.iBarWidth = n.__browser.barWidth;
    }
    function ib(a, b, c, d, e, f) {
        var g,
            j = !1;c !== k && (g = c, j = !0);for (; d !== e;) {
            a.hasOwnProperty(d) && (g = j ? b(g, a[d], d, a) : a[d], j = !0, d += f);
        }return g;
    }function Ea(a, b) {
        var c = n.defaults.column,
            d = a.aoColumns.length,
            c = h.extend({}, n.models.oColumn, c, { nTh: b ? b : H.createElement("th"), sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "", aDataSort: c.aDataSort ? c.aDataSort : [d], mData: c.mData ? c.mData : d, idx: d });a.aoColumns.push(c);c = a.aoPreSearchCols;c[d] = h.extend({}, n.models.oSearch, c[d]);ka(a, d, h(b).data());
    }function ka(a, b, c) {
        var b = a.aoColumns[b],
            d = a.oClasses,
            e = h(b.nTh);if (!b.sWidthOrig) {
            b.sWidthOrig = e.attr("width") || null;var f = (e.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);f && (b.sWidthOrig = f[1]);
        }c !== k && null !== c && (gb(c), J(n.defaults.column, c), c.mDataProp !== k && !c.mData && (c.mData = c.mDataProp), c.sType && (b._sManualType = c.sType), c.className && !c.sClass && (c.sClass = c.className), c.sClass && e.addClass(c.sClass), h.extend(b, c), F(b, c, "sWidth", "sWidthOrig"), c.iDataSort !== k && (b.aDataSort = [c.iDataSort]), F(b, c, "aDataSort"));var g = b.mData,
            j = S(g),
            i = b.mRender ? S(b.mRender) : null,
            c = function c(a) {
            return "string" === typeof a && -1 !== a.indexOf("@");
        };b._bAttrSrc = h.isPlainObject(g) && (c(g.sort) || c(g.type) || c(g.filter));b._setter = null;b.fnGetData = function (a, b, c) {
            var d = j(a, b, k, c);return i && b ? i(d, b, a, c) : d;
        };b.fnSetData = function (a, b, c) {
            return N(g)(a, b, c);
        };"number" !== typeof g && (a._rowReadObject = !0);a.oFeatures.bSort || (b.bSortable = !1, e.addClass(d.sSortableNone));a = -1 !== h.inArray("asc", b.asSorting);c = -1 !== h.inArray("desc", b.asSorting);!b.bSortable || !a && !c ? (b.sSortingClass = d.sSortableNone, b.sSortingClassJUI = "") : a && !c ? (b.sSortingClass = d.sSortableAsc, b.sSortingClassJUI = d.sSortJUIAscAllowed) : !a && c ? (b.sSortingClass = d.sSortableDesc, b.sSortingClassJUI = d.sSortJUIDescAllowed) : (b.sSortingClass = d.sSortable, b.sSortingClassJUI = d.sSortJUI);
    }function $(a) {
        if (!1 !== a.oFeatures.bAutoWidth) {
            var b = a.aoColumns;Fa(a);for (var c = 0, d = b.length; c < d; c++) {
                b[c].nTh.style.width = b[c].sWidth;
            }
        }b = a.oScroll;("" !== b.sY || "" !== b.sX) && la(a);r(a, null, "column-sizing", [a]);
    }function aa(a, b) {
        var c = ma(a, "bVisible");return "number" === typeof c[b] ? c[b] : null;
    }function ba(a, b) {
        var c = ma(a, "bVisible"),
            c = h.inArray(b, c);return -1 !== c ? c : null;
    }function V(a) {
        var b = 0;h.each(a.aoColumns, function (a, d) {
            d.bVisible && "none" !== h(d.nTh).css("display") && b++;
        });return b;
    }function ma(a, b) {
        var c = [];h.map(a.aoColumns, function (a, e) {
            a[b] && c.push(e);
        });return c;
    }function Ga(a) {
        var b = a.aoColumns,
            c = a.aoData,
            d = n.ext.type.detect,
            e,
            f,
            g,
            j,
            i,
            h,
            l,
            q,
            t;e = 0;for (f = b.length; e < f; e++) {
            if (l = b[e], t = [], !l.sType && l._sManualType) l.sType = l._sManualType;else if (!l.sType) {
                g = 0;for (j = d.length; g < j; g++) {
                    i = 0;for (h = c.length; i < h; i++) {
                        t[i] === k && (t[i] = B(a, i, e, "type"));q = d[g](t[i], a);if (!q && g !== d.length - 1) break;if ("html" === q) break;
                    }if (q) {
                        l.sType = q;break;
                    }
                }l.sType || (l.sType = "string");
            }
        }
    }function jb(a, b, c, d) {
        var e,
            f,
            g,
            j,
            i,
            m,
            l = a.aoColumns;if (b) for (e = b.length - 1; 0 <= e; e--) {
            m = b[e];var q = m.targets !== k ? m.targets : m.aTargets;h.isArray(q) || (q = [q]);f = 0;for (g = q.length; f < g; f++) {
                if ("number" === typeof q[f] && 0 <= q[f]) {
                    for (; l.length <= q[f];) {
                        Ea(a);
                    }d(q[f], m);
                } else if ("number" === typeof q[f] && 0 > q[f]) d(l.length + q[f], m);else if ("string" === typeof q[f]) {
                    j = 0;for (i = l.length; j < i; j++) {
                        ("_all" == q[f] || h(l[j].nTh).hasClass(q[f])) && d(j, m);
                    }
                }
            }
        }if (c) {
            e = 0;for (a = c.length; e < a; e++) {
                d(e, c[e]);
            }
        }
    }function O(a, b, c, d) {
        var e = a.aoData.length,
            f = h.extend(!0, {}, n.models.oRow, { src: c ? "dom" : "data", idx: e });f._aData = b;a.aoData.push(f);for (var g = a.aoColumns, j = 0, i = g.length; j < i; j++) {
            g[j].sType = null;
        }a.aiDisplayMaster.push(e);b = a.rowIdFn(b);b !== k && (a.aIds[b] = f);(c || !a.oFeatures.bDeferRender) && Ha(a, e, c, d);return e;
    }function na(a, b) {
        var c;b instanceof h || (b = h(b));return b.map(function (b, e) {
            c = Ia(a, e);return O(a, c.data, e, c.cells);
        });
    }function B(a, b, c, d) {
        var e = a.iDraw,
            f = a.aoColumns[c],
            g = a.aoData[b]._aData,
            j = f.sDefaultContent,
            i = f.fnGetData(g, d, { settings: a, row: b, col: c });if (i === k) return a.iDrawError != e && null === j && (K(a, 0, "Requested unknown parameter " + ("function" == typeof f.mData ? "{function}" : "'" + f.mData + "'") + " for row " + b + ", column " + c, 4), a.iDrawError = e), j;if ((i === g || null === i) && null !== j && d !== k) i = j;else if ("function" === typeof i) return i.call(g);return null === i && "display" == d ? "" : i;
    }function kb(a, b, c, d) {
        a.aoColumns[c].fnSetData(a.aoData[b]._aData, d, { settings: a, row: b, col: c });
    }function Ja(a) {
        return h.map(a.match(/(\\.|[^\.])+/g) || [""], function (a) {
            return a.replace(/\\\./g, ".");
        });
    }function S(a) {
        if (h.isPlainObject(a)) {
            var b = {};h.each(a, function (a, c) {
                c && (b[a] = S(c));
            });return function (a, c, f, g) {
                var j = b[c] || b._;return j !== k ? j(a, c, f, g) : a;
            };
        }if (null === a) return function (a) {
            return a;
        };if ("function" === typeof a) return function (b, c, f, g) {
            return a(b, c, f, g);
        };if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
            var c = function c(a, b, f) {
                var g, j;if ("" !== f) {
                    j = Ja(f);for (var i = 0, m = j.length; i < m; i++) {
                        f = j[i].match(ca);g = j[i].match(W);if (f) {
                            j[i] = j[i].replace(ca, "");"" !== j[i] && (a = a[j[i]]);g = [];j.splice(0, i + 1);j = j.join(".");if (h.isArray(a)) {
                                i = 0;for (m = a.length; i < m; i++) {
                                    g.push(c(a[i], b, j));
                                }
                            }a = f[0].substring(1, f[0].length - 1);a = "" === a ? g : g.join(a);break;
                        } else if (g) {
                            j[i] = j[i].replace(W, "");a = a[j[i]]();continue;
                        }if (null === a || a[j[i]] === k) return k;a = a[j[i]];
                    }
                }return a;
            };return function (b, e) {
                return c(b, e, a);
            };
        }return function (b) {
            return b[a];
        };
    }
    function N(a) {
        if (h.isPlainObject(a)) return N(a._);if (null === a) return function () {};if ("function" === typeof a) return function (b, d, e) {
            a(b, "set", d, e);
        };if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
            var b = function b(a, d, e) {
                var e = Ja(e),
                    f;f = e[e.length - 1];for (var g, j, i = 0, m = e.length - 1; i < m; i++) {
                    g = e[i].match(ca);j = e[i].match(W);if (g) {
                        e[i] = e[i].replace(ca, "");a[e[i]] = [];f = e.slice();f.splice(0, i + 1);g = f.join(".");if (h.isArray(d)) {
                            j = 0;for (m = d.length; j < m; j++) {
                                f = {}, b(f, d[j], g), a[e[i]].push(f);
                            }
                        } else a[e[i]] = d;return;
                    }j && (e[i] = e[i].replace(W, ""), a = a[e[i]](d));if (null === a[e[i]] || a[e[i]] === k) a[e[i]] = {};a = a[e[i]];
                }if (f.match(W)) a[f.replace(W, "")](d);else a[f.replace(ca, "")] = d;
            };return function (c, d) {
                return b(c, d, a);
            };
        }return function (b, d) {
            b[a] = d;
        };
    }function Ka(a) {
        return D(a.aoData, "_aData");
    }function oa(a) {
        a.aoData.length = 0;a.aiDisplayMaster.length = 0;a.aiDisplay.length = 0;a.aIds = {};
    }function pa(a, b, c) {
        for (var d = -1, e = 0, f = a.length; e < f; e++) {
            a[e] == b ? d = e : a[e] > b && a[e]--;
        }-1 != d && c === k && a.splice(d, 1);
    }function da(a, b, c, d) {
        var e = a.aoData[b],
            f,
            g = function g(c, d) {
            for (; c.childNodes.length;) {
                c.removeChild(c.firstChild);
            }c.innerHTML = B(a, b, d, "display");
        };if ("dom" === c || (!c || "auto" === c) && "dom" === e.src) e._aData = Ia(a, e, d, d === k ? k : e._aData).data;else {
            var j = e.anCells;if (j) if (d !== k) g(j[d], d);else {
                c = 0;for (f = j.length; c < f; c++) {
                    g(j[c], c);
                }
            }
        }e._aSortData = null;e._aFilterData = null;g = a.aoColumns;if (d !== k) g[d].sType = null;else {
            c = 0;for (f = g.length; c < f; c++) {
                g[c].sType = null;
            }La(a, e);
        }
    }function Ia(a, b, c, d) {
        var e = [],
            f = b.firstChild,
            g,
            j,
            i = 0,
            m,
            l = a.aoColumns,
            q = a._rowReadObject,
            d = d !== k ? d : q ? {} : [],
            t = function t(a, b) {
            if ("string" === typeof a) {
                var c = a.indexOf("@");-1 !== c && (c = a.substring(c + 1), N(a)(d, b.getAttribute(c)));
            }
        },
            G = function G(a) {
            if (c === k || c === i) j = l[i], m = h.trim(a.innerHTML), j && j._bAttrSrc ? (N(j.mData._)(d, m), t(j.mData.sort, a), t(j.mData.type, a), t(j.mData.filter, a)) : q ? (j._setter || (j._setter = N(j.mData)), j._setter(d, m)) : d[i] = m;i++;
        };if (f) for (; f;) {
            g = f.nodeName.toUpperCase();if ("TD" == g || "TH" == g) G(f), e.push(f);f = f.nextSibling;
        } else {
            e = b.anCells;
            f = 0;for (g = e.length; f < g; f++) {
                G(e[f]);
            }
        }if (b = b.firstChild ? b : b.nTr) (b = b.getAttribute("id")) && N(a.rowId)(d, b);return { data: d, cells: e };
    }function Ha(a, b, c, d) {
        var e = a.aoData[b],
            f = e._aData,
            g = [],
            j,
            i,
            m,
            l,
            q;if (null === e.nTr) {
            j = c || H.createElement("tr");e.nTr = j;e.anCells = g;j._DT_RowIndex = b;La(a, e);l = 0;for (q = a.aoColumns.length; l < q; l++) {
                m = a.aoColumns[l];i = c ? d[l] : H.createElement(m.sCellType);i._DT_CellIndex = { row: b, column: l };g.push(i);if ((!c || m.mRender || m.mData !== l) && (!h.isPlainObject(m.mData) || m.mData._ !== l + ".display")) i.innerHTML = B(a, b, l, "display");m.sClass && (i.className += " " + m.sClass);m.bVisible && !c ? j.appendChild(i) : !m.bVisible && c && i.parentNode.removeChild(i);m.fnCreatedCell && m.fnCreatedCell.call(a.oInstance, i, B(a, b, l), f, b, l);
            }r(a, "aoRowCreatedCallback", null, [j, f, b, g]);
        }e.nTr.setAttribute("role", "row");
    }function La(a, b) {
        var c = b.nTr,
            d = b._aData;if (c) {
            var e = a.rowIdFn(d);e && (c.id = e);d.DT_RowClass && (e = d.DT_RowClass.split(" "), b.__rowc = b.__rowc ? qa(b.__rowc.concat(e)) : e, h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
            d.DT_RowAttr && h(c).attr(d.DT_RowAttr);d.DT_RowData && h(c).data(d.DT_RowData);
        }
    }function lb(a) {
        var b,
            c,
            d,
            e,
            f,
            g = a.nTHead,
            j = a.nTFoot,
            i = 0 === h("th, td", g).length,
            m = a.oClasses,
            l = a.aoColumns;i && (e = h("<tr/>").appendTo(g));b = 0;for (c = l.length; b < c; b++) {
            f = l[b], d = h(f.nTh).addClass(f.sClass), i && d.appendTo(e), a.oFeatures.bSort && (d.addClass(f.sSortingClass), !1 !== f.bSortable && (d.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId), Ma(a, f.nTh, b))), f.sTitle != d[0].innerHTML && d.html(f.sTitle), Na(a, "header")(a, d, f, m);
        }i && ea(a.aoHeader, g);h(g).find(">tr").attr("role", "row");h(g).find(">tr>th, >tr>td").addClass(m.sHeaderTH);h(j).find(">tr>th, >tr>td").addClass(m.sFooterTH);if (null !== j) {
            a = a.aoFooter[0];b = 0;for (c = a.length; b < c; b++) {
                f = l[b], f.nTf = a[b].cell, f.sClass && h(f.nTf).addClass(f.sClass);
            }
        }
    }function fa(a, b, c) {
        var d,
            e,
            f,
            g = [],
            j = [],
            i = a.aoColumns.length,
            m;if (b) {
            c === k && (c = !1);d = 0;for (e = b.length; d < e; d++) {
                g[d] = b[d].slice();g[d].nTr = b[d].nTr;for (f = i - 1; 0 <= f; f--) {
                    !a.aoColumns[f].bVisible && !c && g[d].splice(f, 1);
                }j.push([]);
            }d = 0;for (e = g.length; d < e; d++) {
                if (a = g[d].nTr) for (; f = a.firstChild;) {
                    a.removeChild(f);
                }f = 0;for (b = g[d].length; f < b; f++) {
                    if (m = i = 1, j[d][f] === k) {
                        a.appendChild(g[d][f].cell);for (j[d][f] = 1; g[d + i] !== k && g[d][f].cell == g[d + i][f].cell;) {
                            j[d + i][f] = 1, i++;
                        }for (; g[d][f + m] !== k && g[d][f].cell == g[d][f + m].cell;) {
                            for (c = 0; c < i; c++) {
                                j[d + c][f + m] = 1;
                            }m++;
                        }h(g[d][f].cell).attr("rowspan", i).attr("colspan", m);
                    }
                }
            }
        }
    }function P(a) {
        var b = r(a, "aoPreDrawCallback", "preDraw", [a]);if (-1 !== h.inArray(!1, b)) C(a, !1);else {
            var b = [],
                c = 0,
                d = a.asStripeClasses,
                e = d.length,
                f = a.oLanguage,
                g = a.iInitDisplayStart,
                j = "ssp" == y(a),
                i = a.aiDisplay;a.bDrawing = !0;g !== k && -1 !== g && (a._iDisplayStart = j ? g : g >= a.fnRecordsDisplay() ? 0 : g, a.iInitDisplayStart = -1);var g = a._iDisplayStart,
                m = a.fnDisplayEnd();if (a.bDeferLoading) a.bDeferLoading = !1, a.iDraw++, C(a, !1);else if (j) {
                if (!a.bDestroying && !mb(a)) return;
            } else a.iDraw++;if (0 !== i.length) {
                f = j ? a.aoData.length : m;for (j = j ? 0 : g; j < f; j++) {
                    var l = i[j],
                        q = a.aoData[l];null === q.nTr && Ha(a, l);var t = q.nTr;if (0 !== e) {
                        var G = d[c % e];q._sRowStripe != G && (h(t).removeClass(q._sRowStripe).addClass(G), q._sRowStripe = G);
                    }r(a, "aoRowCallback", null, [t, q._aData, c, j, l]);b.push(t);c++;
                }
            } else c = f.sZeroRecords, 1 == a.iDraw && "ajax" == y(a) ? c = f.sLoadingRecords : f.sEmptyTable && 0 === a.fnRecordsTotal() && (c = f.sEmptyTable), b[0] = h("<tr/>", { "class": e ? d[0] : "" }).append(h("<td />", { valign: "top", colSpan: V(a), "class": a.oClasses.sRowEmpty }).html(c))[0];r(a, "aoHeaderCallback", "header", [h(a.nTHead).children("tr")[0], Ka(a), g, m, i]);r(a, "aoFooterCallback", "footer", [h(a.nTFoot).children("tr")[0], Ka(a), g, m, i]);d = h(a.nTBody);d.children().detach();
            d.append(h(b));r(a, "aoDrawCallback", "draw", [a]);a.bSorted = !1;a.bFiltered = !1;a.bDrawing = !1;
        }
    }function T(a, b) {
        var c = a.oFeatures,
            d = c.bFilter;c.bSort && nb(a);d ? ga(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice();!0 !== b && (a._iDisplayStart = 0);a._drawHold = b;P(a);a._drawHold = !1;
    }function ob(a) {
        var b = a.oClasses,
            c = h(a.nTable),
            c = h("<div/>").insertBefore(c),
            d = a.oFeatures,
            e = h("<div/>", { id: a.sTableId + "_wrapper", "class": b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter) });a.nHolding = c[0];a.nTableWrapper = e[0];a.nTableReinsertBefore = a.nTable.nextSibling;for (var f = a.sDom.split(""), g, j, i, m, l, q, k = 0; k < f.length; k++) {
            g = null;j = f[k];if ("<" == j) {
                i = h("<div/>")[0];m = f[k + 1];if ("'" == m || '"' == m) {
                    l = "";for (q = 2; f[k + q] != m;) {
                        l += f[k + q], q++;
                    }"H" == l ? l = b.sJUIHeader : "F" == l && (l = b.sJUIFooter);-1 != l.indexOf(".") ? (m = l.split("."), i.id = m[0].substr(1, m[0].length - 1), i.className = m[1]) : "#" == l.charAt(0) ? i.id = l.substr(1, l.length - 1) : i.className = l;k += q;
                }e.append(i);e = h(i);
            } else if (">" == j) e = e.parent();else if ("l" == j && d.bPaginate && d.bLengthChange) g = pb(a);else if ("f" == j && d.bFilter) g = qb(a);else if ("r" == j && d.bProcessing) g = rb(a);else if ("t" == j) g = sb(a);else if ("i" == j && d.bInfo) g = tb(a);else if ("p" == j && d.bPaginate) g = ub(a);else if (0 !== n.ext.feature.length) {
                i = n.ext.feature;q = 0;for (m = i.length; q < m; q++) {
                    if (j == i[q].cFeature) {
                        g = i[q].fnInit(a);break;
                    }
                }
            }g && (i = a.aanFeatures, i[j] || (i[j] = []), i[j].push(g), e.append(g));
        }c.replaceWith(e);a.nHolding = null;
    }function ea(a, b) {
        var c = h(b).children("tr"),
            d,
            e,
            f,
            g,
            j,
            i,
            m,
            l,
            q,
            k;a.splice(0, a.length);f = 0;for (i = c.length; f < i; f++) {
            a.push([]);
        }f = 0;for (i = c.length; f < i; f++) {
            d = c[f];for (e = d.firstChild; e;) {
                if ("TD" == e.nodeName.toUpperCase() || "TH" == e.nodeName.toUpperCase()) {
                    l = 1 * e.getAttribute("colspan");q = 1 * e.getAttribute("rowspan");l = !l || 0 === l || 1 === l ? 1 : l;q = !q || 0 === q || 1 === q ? 1 : q;g = 0;for (j = a[f]; j[g];) {
                        g++;
                    }m = g;k = 1 === l ? !0 : !1;for (j = 0; j < l; j++) {
                        for (g = 0; g < q; g++) {
                            a[f + g][m + j] = { cell: e, unique: k }, a[f + g].nTr = d;
                        }
                    }
                }e = e.nextSibling;
            }
        }
    }function ra(a, b, c) {
        var d = [];c || (c = a.aoHeader, b && (c = [], ea(c, b)));for (var b = 0, e = c.length; b < e; b++) {
            for (var f = 0, g = c[b].length; f < g; f++) {
                if (c[b][f].unique && (!d[f] || !a.bSortCellsTop)) d[f] = c[b][f].cell;
            }
        }return d;
    }function sa(a, b, c) {
        r(a, "aoServerParams", "serverParams", [b]);if (b && h.isArray(b)) {
            var d = {},
                e = /(.*?)\[\]$/;h.each(b, function (a, b) {
                var c = b.name.match(e);c ? (c = c[0], d[c] || (d[c] = []), d[c].push(b.value)) : d[b.name] = b.value;
            });b = d;
        }var f,
            g = a.ajax,
            j = a.oInstance,
            i = function i(b) {
            r(a, null, "xhr", [a, b, a.jqXHR]);c(b);
        };if (h.isPlainObject(g) && g.data) {
            f = g.data;var m = "function" === typeof f ? f(b, a) : f,
                b = "function" === typeof f && m ? m : h.extend(!0, b, m);delete g.data;
        }m = { data: b, success: function success(b) {
                var c = b.error || b.sError;c && K(a, 0, c);a.json = b;i(b);
            }, dataType: "json", cache: !1, type: a.sServerMethod, error: function error(b, c) {
                var d = r(a, null, "xhr", [a, null, a.jqXHR]);-1 === h.inArray(!0, d) && ("parsererror" == c ? K(a, 0, "Invalid JSON response", 1) : 4 === b.readyState && K(a, 0, "Ajax error", 7));C(a, !1);
            } };a.oAjaxData = b;r(a, null, "preXhr", [a, b]);a.fnServerData ? a.fnServerData.call(j, a.sAjaxSource, h.map(b, function (a, b) {
            return { name: b, value: a };
        }), i, a) : a.sAjaxSource || "string" === typeof g ? a.jqXHR = h.ajax(h.extend(m, { url: g || a.sAjaxSource })) : "function" === typeof g ? a.jqXHR = g.call(j, b, i, a) : (a.jqXHR = h.ajax(h.extend(m, g)), g.data = f);
    }function mb(a) {
        return a.bAjaxDataGet ? (a.iDraw++, C(a, !0), sa(a, vb(a), function (b) {
            wb(a, b);
        }), !1) : !0;
    }function vb(a) {
        var b = a.aoColumns,
            c = b.length,
            d = a.oFeatures,
            e = a.oPreviousSearch,
            f = a.aoPreSearchCols,
            g,
            j = [],
            i,
            m,
            l,
            k = X(a);g = a._iDisplayStart;i = !1 !== d.bPaginate ? a._iDisplayLength : -1;var t = function t(a, b) {
            j.push({ name: a, value: b });
        };t("sEcho", a.iDraw);t("iColumns", c);t("sColumns", D(b, "sName").join(","));t("iDisplayStart", g);t("iDisplayLength", i);var G = { draw: a.iDraw, columns: [], order: [], start: g, length: i, search: { value: e.sSearch, regex: e.bRegex } };for (g = 0; g < c; g++) {
            m = b[g], l = f[g], i = "function" == typeof m.mData ? "function" : m.mData, G.columns.push({ data: i, name: m.sName, searchable: m.bSearchable, orderable: m.bSortable, search: { value: l.sSearch, regex: l.bRegex } }), t("mDataProp_" + g, i), d.bFilter && (t("sSearch_" + g, l.sSearch), t("bRegex_" + g, l.bRegex), t("bSearchable_" + g, m.bSearchable)), d.bSort && t("bSortable_" + g, m.bSortable);
        }d.bFilter && (t("sSearch", e.sSearch), t("bRegex", e.bRegex));d.bSort && (h.each(k, function (a, b) {
            G.order.push({ column: b.col, dir: b.dir });t("iSortCol_" + a, b.col);t("sSortDir_" + a, b.dir);
        }), t("iSortingCols", k.length));b = n.ext.legacy.ajax;return null === b ? a.sAjaxSource ? j : G : b ? j : G;
    }function wb(a, b) {
        var c = ta(a, b),
            d = b.sEcho !== k ? b.sEcho : b.draw,
            e = b.iTotalRecords !== k ? b.iTotalRecords : b.recordsTotal,
            f = b.iTotalDisplayRecords !== k ? b.iTotalDisplayRecords : b.recordsFiltered;if (d) {
            if (1 * d < a.iDraw) return;a.iDraw = 1 * d;
        }oa(a);a._iRecordsTotal = parseInt(e, 10);a._iRecordsDisplay = parseInt(f, 10);d = 0;for (e = c.length; d < e; d++) {
            O(a, c[d]);
        }a.aiDisplay = a.aiDisplayMaster.slice();a.bAjaxDataGet = !1;P(a);a._bInitComplete || ua(a, b);a.bAjaxDataGet = !0;C(a, !1);
    }function ta(a, b) {
        var c = h.isPlainObject(a.ajax) && a.ajax.dataSrc !== k ? a.ajax.dataSrc : a.sAjaxDataProp;return "data" === c ? b.aaData || b[c] : "" !== c ? S(c)(b) : b;
    }function qb(a) {
        var b = a.oClasses,
            c = a.sTableId,
            d = a.oLanguage,
            e = a.oPreviousSearch,
            f = a.aanFeatures,
            g = '<input type="search" class="' + b.sFilterInput + '"/>',
            j = d.sSearch,
            j = j.match(/_INPUT_/) ? j.replace("_INPUT_", g) : j + g,
            b = h("<div/>", { id: !f.f ? c + "_filter" : null, "class": b.sFilter }).append(h("<label/>").append(j)),
            f = function f() {
            var b = !this.value ? "" : this.value;b != e.sSearch && (ga(a, { sSearch: b, bRegex: e.bRegex, bSmart: e.bSmart, bCaseInsensitive: e.bCaseInsensitive }), a._iDisplayStart = 0, P(a));
        },
            g = null !== a.searchDelay ? a.searchDelay : "ssp" === y(a) ? 400 : 0,
            i = h("input", b).val(e.sSearch).attr("placeholder", d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", g ? Oa(f, g) : f).on("keypress.DT", function (a) {
            if (13 == a.keyCode) return !1;
        }).attr("aria-controls", c);h(a.nTable).on("search.dt.DT", function (b, c) {
            if (a === c) try {
                i[0] !== H.activeElement && i.val(e.sSearch);
            } catch (d) {}
        });return b[0];
    }function ga(a, b, c) {
        var d = a.oPreviousSearch,
            e = a.aoPreSearchCols,
            f = function f(a) {
            d.sSearch = a.sSearch;d.bRegex = a.bRegex;d.bSmart = a.bSmart;d.bCaseInsensitive = a.bCaseInsensitive;
        };Ga(a);if ("ssp" != y(a)) {
            xb(a, b.sSearch, c, b.bEscapeRegex !== k ? !b.bEscapeRegex : b.bRegex, b.bSmart, b.bCaseInsensitive);f(b);for (b = 0; b < e.length; b++) {
                yb(a, e[b].sSearch, b, e[b].bEscapeRegex !== k ? !e[b].bEscapeRegex : e[b].bRegex, e[b].bSmart, e[b].bCaseInsensitive);
            }zb(a);
        } else f(b);a.bFiltered = !0;r(a, null, "search", [a]);
    }function zb(a) {
        for (var b = n.ext.search, c = a.aiDisplay, d, e, f = 0, g = b.length; f < g; f++) {
            for (var j = [], i = 0, m = c.length; i < m; i++) {
                e = c[i], d = a.aoData[e], b[f](a, d._aFilterData, e, d._aData, i) && j.push(e);
            }c.length = 0;h.merge(c, j);
        }
    }function yb(a, b, c, d, e, f) {
        if ("" !== b) {
            for (var g = [], j = a.aiDisplay, d = Pa(b, d, e, f), e = 0; e < j.length; e++) {
                b = a.aoData[j[e]]._aFilterData[c], d.test(b) && g.push(j[e]);
            }a.aiDisplay = g;
        }
    }function xb(a, b, c, d, e, f) {
        var d = Pa(b, d, e, f),
            f = a.oPreviousSearch.sSearch,
            g = a.aiDisplayMaster,
            j,
            e = [];0 !== n.ext.search.length && (c = !0);j = Ab(a);if (0 >= b.length) a.aiDisplay = g.slice();else {
            if (j || c || f.length > b.length || 0 !== b.indexOf(f) || a.bSorted) a.aiDisplay = g.slice();b = a.aiDisplay;for (c = 0; c < b.length; c++) {
                d.test(a.aoData[b[c]]._sFilterRow) && e.push(b[c]);
            }a.aiDisplay = e;
        }
    }function Pa(a, b, c, d) {
        a = b ? a : Qa(a);c && (a = "^(?=.*?" + h.map(a.match(/"[^"]+"|[^ ]+/g) || [""], function (a) {
            if ('"' === a.charAt(0)) var b = a.match(/^"(.*)"$/),
                a = b ? b[1] : a;return a.replace('"', "");
        }).join(")(?=.*?") + ").*$");return RegExp(a, d ? "i" : "");
    }function Ab(a) {
        var b = a.aoColumns,
            c,
            d,
            e,
            f,
            g,
            j,
            i,
            h,
            l = n.ext.type.search;c = !1;d = 0;for (f = a.aoData.length; d < f; d++) {
            if (h = a.aoData[d], !h._aFilterData) {
                j = [];e = 0;for (g = b.length; e < g; e++) {
                    c = b[e], c.bSearchable ? (i = B(a, d, e, "filter"), l[c.sType] && (i = l[c.sType](i)), null === i && (i = ""), "string" !== typeof i && i.toString && (i = i.toString())) : i = "", i.indexOf && -1 !== i.indexOf("&") && (va.innerHTML = i, i = Wb ? va.textContent : va.innerText), i.replace && (i = i.replace(/[\r\n]/g, "")), j.push(i);
                }h._aFilterData = j;h._sFilterRow = j.join("  ");c = !0;
            }
        }return c;
    }function Bb(a) {
        return { search: a.sSearch, smart: a.bSmart, regex: a.bRegex, caseInsensitive: a.bCaseInsensitive };
    }function Cb(a) {
        return { sSearch: a.search, bSmart: a.smart, bRegex: a.regex, bCaseInsensitive: a.caseInsensitive };
    }function tb(a) {
        var b = a.sTableId,
            c = a.aanFeatures.i,
            d = h("<div/>", { "class": a.oClasses.sInfo, id: !c ? b + "_info" : null });c || (a.aoDrawCallback.push({ fn: Db, sName: "information" }), d.attr("role", "status").attr("aria-live", "polite"), h(a.nTable).attr("aria-describedby", b + "_info"));return d[0];
    }function Db(a) {
        var b = a.aanFeatures.i;if (0 !== b.length) {
            var c = a.oLanguage,
                d = a._iDisplayStart + 1,
                e = a.fnDisplayEnd(),
                f = a.fnRecordsTotal(),
                g = a.fnRecordsDisplay(),
                j = g ? c.sInfo : c.sInfoEmpty;g !== f && (j += " " + c.sInfoFiltered);j += c.sInfoPostFix;j = Eb(a, j);c = c.fnInfoCallback;null !== c && (j = c.call(a.oInstance, a, d, e, f, g, j));h(b).html(j);
        }
    }function Eb(a, b) {
        var c = a.fnFormatNumber,
            d = a._iDisplayStart + 1,
            e = a._iDisplayLength,
            f = a.fnRecordsDisplay(),
            g = -1 === e;return b.replace(/_START_/g, c.call(a, d)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a, f)).replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d / e))).replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(f / e)));
    }function ha(a) {
        var b,
            c,
            d = a.iInitDisplayStart,
            e = a.aoColumns,
            f;c = a.oFeatures;var g = a.bDeferLoading;if (a.bInitialised) {
            ob(a);lb(a);fa(a, a.aoHeader);fa(a, a.aoFooter);C(a, !0);c.bAutoWidth && Fa(a);b = 0;for (c = e.length; b < c; b++) {
                f = e[b], f.sWidth && (f.nTh.style.width = v(f.sWidth));
            }r(a, null, "preInit", [a]);T(a);e = y(a);if ("ssp" != e || g) "ajax" == e ? sa(a, [], function (c) {
                var f = ta(a, c);for (b = 0; b < f.length; b++) {
                    O(a, f[b]);
                }a.iInitDisplayStart = d;T(a);C(a, !1);ua(a, c);
            }, a) : (C(a, !1), ua(a));
        } else setTimeout(function () {
            ha(a);
        }, 200);
    }function ua(a, b) {
        a._bInitComplete = !0;(b || a.oInit.aaData) && $(a);r(a, null, "plugin-init", [a, b]);r(a, "aoInitComplete", "init", [a, b]);
    }function Ra(a, b) {
        var c = parseInt(b, 10);a._iDisplayLength = c;Sa(a);r(a, null, "length", [a, c]);
    }function pb(a) {
        for (var b = a.oClasses, c = a.sTableId, d = a.aLengthMenu, e = h.isArray(d[0]), f = e ? d[0] : d, d = e ? d[1] : d, e = h("<select/>", { name: c + "_length", "aria-controls": c, "class": b.sLengthSelect }), g = 0, j = f.length; g < j; g++) {
            e[0][g] = new Option("number" === typeof d[g] ? a.fnFormatNumber(d[g]) : d[g], f[g]);
        }var i = h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l || (i[0].id = c + "_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", e[0].outerHTML));h("select", i).val(a._iDisplayLength).on("change.DT", function () {
            Ra(a, h(this).val());P(a);
        });h(a.nTable).on("length.dt.DT", function (b, c, d) {
            a === c && h("select", i).val(d);
        });return i[0];
    }function ub(a) {
        var b = a.sPaginationType,
            c = n.ext.pager[b],
            d = "function" === typeof c,
            e = function e(a) {
            P(a);
        },
            b = h("<div/>").addClass(a.oClasses.sPaging + b)[0],
            f = a.aanFeatures;d || c.fnInit(a, b, e);f.p || (b.id = a.sTableId + "_paginate", a.aoDrawCallback.push({ fn: function fn(a) {
                if (d) {
                    var b = a._iDisplayStart,
                        i = a._iDisplayLength,
                        h = a.fnRecordsDisplay(),
                        l = -1 === i,
                        b = l ? 0 : Math.ceil(b / i),
                        i = l ? 1 : Math.ceil(h / i),
                        h = c(b, i),
                        k,
                        l = 0;for (k = f.p.length; l < k; l++) {
                        Na(a, "pageButton")(a, f.p[l], l, h, b, i);
                    }
                } else c.fnUpdate(a, e);
            }, sName: "pagination" }));return b;
    }function Ta(a, b, c) {
        var d = a._iDisplayStart,
            e = a._iDisplayLength,
            f = a.fnRecordsDisplay();0 === f || -1 === e ? d = 0 : "number" === typeof b ? (d = b * e, d > f && (d = 0)) : "first" == b ? d = 0 : "previous" == b ? (d = 0 <= e ? d - e : 0, 0 > d && (d = 0)) : "next" == b ? d + e < f && (d += e) : "last" == b ? d = Math.floor((f - 1) / e) * e : K(a, 0, "Unknown paging action: " + b, 5);b = a._iDisplayStart !== d;a._iDisplayStart = d;b && (r(a, null, "page", [a]), c && P(a));return b;
    }function rb(a) {
        return h("<div/>", { id: !a.aanFeatures.r ? a.sTableId + "_processing" : null, "class": a.oClasses.sProcessing }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0];
    }
    function C(a, b) {
        a.oFeatures.bProcessing && h(a.aanFeatures.r).css("display", b ? "block" : "none");r(a, null, "processing", [a, b]);
    }function sb(a) {
        var b = h(a.nTable);b.attr("role", "grid");var c = a.oScroll;if ("" === c.sX && "" === c.sY) return a.nTable;var d = c.sX,
            e = c.sY,
            f = a.oClasses,
            g = b.children("caption"),
            j = g.length ? g[0]._captionSide : null,
            i = h(b[0].cloneNode(!1)),
            m = h(b[0].cloneNode(!1)),
            l = b.children("tfoot");l.length || (l = null);i = h("<div/>", { "class": f.sScrollWrapper }).append(h("<div/>", { "class": f.sScrollHead }).css({ overflow: "hidden",
            position: "relative", border: 0, width: d ? !d ? null : v(d) : "100%" }).append(h("<div/>", { "class": f.sScrollHeadInner }).css({ "box-sizing": "content-box", width: c.sXInner || "100%" }).append(i.removeAttr("id").css("margin-left", 0).append("top" === j ? g : null).append(b.children("thead"))))).append(h("<div/>", { "class": f.sScrollBody }).css({ position: "relative", overflow: "auto", width: !d ? null : v(d) }).append(b));l && i.append(h("<div/>", { "class": f.sScrollFoot }).css({ overflow: "hidden", border: 0, width: d ? !d ? null : v(d) : "100%" }).append(h("<div/>", { "class": f.sScrollFootInner }).append(m.removeAttr("id").css("margin-left", 0).append("bottom" === j ? g : null).append(b.children("tfoot")))));var b = i.children(),
            k = b[0],
            f = b[1],
            t = l ? b[2] : null;if (d) h(f).on("scroll.DT", function () {
            var a = this.scrollLeft;k.scrollLeft = a;l && (t.scrollLeft = a);
        });h(f).css(e && c.bCollapse ? "max-height" : "height", e);a.nScrollHead = k;a.nScrollBody = f;a.nScrollFoot = t;a.aoDrawCallback.push({ fn: la, sName: "scrolling" });return i[0];
    }function la(a) {
        var b = a.oScroll,
            c = b.sX,
            d = b.sXInner,
            e = b.sY,
            b = b.iBarWidth,
            f = h(a.nScrollHead),
            g = f[0].style,
            j = f.children("div"),
            i = j[0].style,
            m = j.children("table"),
            j = a.nScrollBody,
            l = h(j),
            q = j.style,
            t = h(a.nScrollFoot).children("div"),
            n = t.children("table"),
            o = h(a.nTHead),
            p = h(a.nTable),
            s = p[0],
            r = s.style,
            u = a.nTFoot ? h(a.nTFoot) : null,
            x = a.oBrowser,
            U = x.bScrollOversize,
            Xb = D(a.aoColumns, "nTh"),
            Q,
            L,
            R,
            w,
            Ua = [],
            y = [],
            z = [],
            A = [],
            B,
            C = function C(a) {
            a = a.style;a.paddingTop = "0";a.paddingBottom = "0";a.borderTopWidth = "0";a.borderBottomWidth = "0";a.height = 0;
        };L = j.scrollHeight > j.clientHeight;if (a.scrollBarVis !== L && a.scrollBarVis !== k) a.scrollBarVis = L, $(a);else {
            a.scrollBarVis = L;p.children("thead, tfoot").remove();u && (R = u.clone().prependTo(p), Q = u.find("tr"), R = R.find("tr"));w = o.clone().prependTo(p);o = o.find("tr");L = w.find("tr");w.find("th, td").removeAttr("tabindex");c || (q.width = "100%", f[0].style.width = "100%");h.each(ra(a, w), function (b, c) {
                B = aa(a, b);c.style.width = a.aoColumns[B].sWidth;
            });u && I(function (a) {
                a.style.width = "";
            }, R);f = p.outerWidth();if ("" === c) {
                r.width = "100%";if (U && (p.find("tbody").height() > j.offsetHeight || "scroll" == l.css("overflow-y"))) r.width = v(p.outerWidth() - b);f = p.outerWidth();
            } else "" !== d && (r.width = v(d), f = p.outerWidth());I(C, L);I(function (a) {
                z.push(a.innerHTML);Ua.push(v(h(a).css("width")));
            }, L);I(function (a, b) {
                if (h.inArray(a, Xb) !== -1) a.style.width = Ua[b];
            }, o);h(L).height(0);u && (I(C, R), I(function (a) {
                A.push(a.innerHTML);y.push(v(h(a).css("width")));
            }, R), I(function (a, b) {
                a.style.width = y[b];
            }, Q), h(R).height(0));I(function (a, b) {
                a.innerHTML = '<div class="dataTables_sizing">' + z[b] + "</div>";a.childNodes[0].style.height = "0";a.childNodes[0].style.overflow = "hidden";a.style.width = Ua[b];
            }, L);u && I(function (a, b) {
                a.innerHTML = '<div class="dataTables_sizing">' + A[b] + "</div>";a.childNodes[0].style.height = "0";a.childNodes[0].style.overflow = "hidden";a.style.width = y[b];
            }, R);if (p.outerWidth() < f) {
                Q = j.scrollHeight > j.offsetHeight || "scroll" == l.css("overflow-y") ? f + b : f;if (U && (j.scrollHeight > j.offsetHeight || "scroll" == l.css("overflow-y"))) r.width = v(Q - b);("" === c || "" !== d) && K(a, 1, "Possible column misalignment", 6);
            } else Q = "100%";q.width = v(Q);
            g.width = v(Q);u && (a.nScrollFoot.style.width = v(Q));!e && U && (q.height = v(s.offsetHeight + b));c = p.outerWidth();m[0].style.width = v(c);i.width = v(c);d = p.height() > j.clientHeight || "scroll" == l.css("overflow-y");e = "padding" + (x.bScrollbarLeft ? "Left" : "Right");i[e] = d ? b + "px" : "0px";u && (n[0].style.width = v(c), t[0].style.width = v(c), t[0].style[e] = d ? b + "px" : "0px");p.children("colgroup").insertBefore(p.children("thead"));l.scroll();if ((a.bSorted || a.bFiltered) && !a._drawHold) j.scrollTop = 0;
        }
    }function I(a, b, c) {
        for (var d = 0, e = 0, f = b.length, g, j; e < f;) {
            g = b[e].firstChild;for (j = c ? c[e].firstChild : null; g;) {
                1 === g.nodeType && (c ? a(g, j, d) : a(g, d), d++), g = g.nextSibling, j = c ? j.nextSibling : null;
            }e++;
        }
    }function Fa(a) {
        var b = a.nTable,
            c = a.aoColumns,
            d = a.oScroll,
            e = d.sY,
            f = d.sX,
            g = d.sXInner,
            j = c.length,
            i = ma(a, "bVisible"),
            m = h("th", a.nTHead),
            l = b.getAttribute("width"),
            k = b.parentNode,
            t = !1,
            n,
            o,
            p = a.oBrowser,
            d = p.bScrollOversize;(n = b.style.width) && -1 !== n.indexOf("%") && (l = n);for (n = 0; n < i.length; n++) {
            o = c[i[n]], null !== o.sWidth && (o.sWidth = Fb(o.sWidthOrig, k), t = !0);
        }if (d || !t && !f && !e && j == V(a) && j == m.length) for (n = 0; n < j; n++) {
            i = aa(a, n), null !== i && (c[i].sWidth = v(m.eq(n).width()));
        } else {
            j = h(b).clone().css("visibility", "hidden").removeAttr("id");j.find("tbody tr").remove();var s = h("<tr/>").appendTo(j.find("tbody"));j.find("thead, tfoot").remove();j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());j.find("tfoot th, tfoot td").css("width", "");m = ra(a, j.find("thead")[0]);for (n = 0; n < i.length; n++) {
                o = c[i[n]], m[n].style.width = null !== o.sWidthOrig && "" !== o.sWidthOrig ? v(o.sWidthOrig) : "", o.sWidthOrig && f && h(m[n]).append(h("<div/>").css({ width: o.sWidthOrig, margin: 0, padding: 0, border: 0, height: 1 }));
            }if (a.aoData.length) for (n = 0; n < i.length; n++) {
                t = i[n], o = c[t], h(Gb(a, t)).clone(!1).append(o.sContentPadding).appendTo(s);
            }h("[name]", j).removeAttr("name");o = h("<div/>").css(f || e ? { position: "absolute", top: 0, left: 0, height: 1, right: 0, overflow: "hidden" } : {}).append(j).appendTo(k);f && g ? j.width(g) : f ? (j.css("width", "auto"), j.removeAttr("width"), j.width() < k.clientWidth && l && j.width(k.clientWidth)) : e ? j.width(k.clientWidth) : l && j.width(l);for (n = e = 0; n < i.length; n++) {
                k = h(m[n]), g = k.outerWidth() - k.width(), k = p.bBounding ? Math.ceil(m[n].getBoundingClientRect().width) : k.outerWidth(), e += k, c[i[n]].sWidth = v(k - g);
            }b.style.width = v(e);o.remove();
        }l && (b.style.width = v(l));if ((l || f) && !a._reszEvt) b = function b() {
            h(E).on("resize.DT-" + a.sInstance, Oa(function () {
                $(a);
            }));
        }, d ? setTimeout(b, 1E3) : b(), a._reszEvt = !0;
    }function Fb(a, b) {
        if (!a) return 0;var c = h("<div/>").css("width", v(a)).appendTo(b || H.body),
            d = c[0].offsetWidth;c.remove();return d;
    }function Gb(a, b) {
        var c = Hb(a, b);if (0 > c) return null;var d = a.aoData[c];return !d.nTr ? h("<td/>").html(B(a, c, b, "display"))[0] : d.anCells[b];
    }function Hb(a, b) {
        for (var c, d = -1, e = -1, f = 0, g = a.aoData.length; f < g; f++) {
            c = B(a, f, b, "display") + "", c = c.replace(Yb, ""), c = c.replace(/&nbsp;/g, " "), c.length > d && (d = c.length, e = f);
        }return e;
    }function v(a) {
        return null === a ? "0px" : "number" == typeof a ? 0 > a ? "0px" : a + "px" : a.match(/\d$/) ? a + "px" : a;
    }function X(a) {
        var b,
            c,
            d = [],
            e = a.aoColumns,
            f,
            g,
            j,
            i;b = a.aaSortingFixed;c = h.isPlainObject(b);var m = [];f = function f(a) {
            a.length && !h.isArray(a[0]) ? m.push(a) : h.merge(m, a);
        };h.isArray(b) && f(b);c && b.pre && f(b.pre);f(a.aaSorting);c && b.post && f(b.post);for (a = 0; a < m.length; a++) {
            i = m[a][0];f = e[i].aDataSort;b = 0;for (c = f.length; b < c; b++) {
                g = f[b], j = e[g].sType || "string", m[a]._idx === k && (m[a]._idx = h.inArray(m[a][1], e[g].asSorting)), d.push({ src: i, col: g, dir: m[a][1], index: m[a]._idx, type: j, formatter: n.ext.type.order[j + "-pre"] });
            }
        }return d;
    }function nb(a) {
        var b,
            c,
            d = [],
            e = n.ext.type.order,
            f = a.aoData,
            g = 0,
            j,
            i = a.aiDisplayMaster,
            h;Ga(a);h = X(a);b = 0;for (c = h.length; b < c; b++) {
            j = h[b], j.formatter && g++, Ib(a, j.col);
        }if ("ssp" != y(a) && 0 !== h.length) {
            b = 0;for (c = i.length; b < c; b++) {
                d[i[b]] = b;
            }g === h.length ? i.sort(function (a, b) {
                var c,
                    e,
                    g,
                    j,
                    i = h.length,
                    k = f[a]._aSortData,
                    n = f[b]._aSortData;for (g = 0; g < i; g++) {
                    if (j = h[g], c = k[j.col], e = n[j.col], c = c < e ? -1 : c > e ? 1 : 0, 0 !== c) return "asc" === j.dir ? c : -c;
                }c = d[a];e = d[b];return c < e ? -1 : c > e ? 1 : 0;
            }) : i.sort(function (a, b) {
                var c,
                    g,
                    j,
                    i,
                    k = h.length,
                    n = f[a]._aSortData,
                    o = f[b]._aSortData;for (j = 0; j < k; j++) {
                    if (i = h[j], c = n[i.col], g = o[i.col], i = e[i.type + "-" + i.dir] || e["string-" + i.dir], c = i(c, g), 0 !== c) return c;
                }c = d[a];g = d[b];return c < g ? -1 : c > g ? 1 : 0;
            });
        }a.bSorted = !0;
    }function Jb(a) {
        for (var b, c, d = a.aoColumns, e = X(a), a = a.oLanguage.oAria, f = 0, g = d.length; f < g; f++) {
            c = d[f];var j = c.asSorting;b = c.sTitle.replace(/<.*?>/g, "");var i = c.nTh;i.removeAttribute("aria-sort");c.bSortable && (0 < e.length && e[0].col == f ? (i.setAttribute("aria-sort", "asc" == e[0].dir ? "ascending" : "descending"), c = j[e[0].index + 1] || j[0]) : c = j[0], b += "asc" === c ? a.sSortAscending : a.sSortDescending);i.setAttribute("aria-label", b);
        }
    }function Va(a, b, c, d) {
        var e = a.aaSorting,
            f = a.aoColumns[b].asSorting,
            g = function g(a, b) {
            var c = a._idx;c === k && (c = h.inArray(a[1], f));return c + 1 < f.length ? c + 1 : b ? null : 0;
        };"number" === typeof e[0] && (e = a.aaSorting = [e]);c && a.oFeatures.bSortMulti ? (c = h.inArray(b, D(e, "0")), -1 !== c ? (b = g(e[c], !0), null === b && 1 === e.length && (b = 0), null === b ? e.splice(c, 1) : (e[c][1] = f[b], e[c]._idx = b)) : (e.push([b, f[0], 0]), e[e.length - 1]._idx = 0)) : e.length && e[0][0] == b ? (b = g(e[0]), e.length = 1, e[0][1] = f[b], e[0]._idx = b) : (e.length = 0, e.push([b, f[0]]), e[0]._idx = 0);T(a);"function" == typeof d && d(a);
    }function Ma(a, b, c, d) {
        var e = a.aoColumns[c];Wa(b, {}, function (b) {
            !1 !== e.bSortable && (a.oFeatures.bProcessing ? (C(a, !0), setTimeout(function () {
                Va(a, c, b.shiftKey, d);"ssp" !== y(a) && C(a, !1);
            }, 0)) : Va(a, c, b.shiftKey, d));
        });
    }function wa(a) {
        var b = a.aLastSort,
            c = a.oClasses.sSortColumn,
            d = X(a),
            e = a.oFeatures,
            f,
            g;if (e.bSort && e.bSortClasses) {
            e = 0;for (f = b.length; e < f; e++) {
                g = b[e].src, h(D(a.aoData, "anCells", g)).removeClass(c + (2 > e ? e + 1 : 3));
            }e = 0;for (f = d.length; e < f; e++) {
                g = d[e].src, h(D(a.aoData, "anCells", g)).addClass(c + (2 > e ? e + 1 : 3));
            }
        }a.aLastSort = d;
    }function Ib(a, b) {
        var c = a.aoColumns[b],
            d = n.ext.order[c.sSortDataType],
            e;d && (e = d.call(a.oInstance, a, b, ba(a, b)));for (var f, g = n.ext.type.order[c.sType + "-pre"], j = 0, i = a.aoData.length; j < i; j++) {
            if (c = a.aoData[j], c._aSortData || (c._aSortData = []), !c._aSortData[b] || d) f = d ? e[j] : B(a, j, b, "sort"), c._aSortData[b] = g ? g(f) : f;
        }
    }function xa(a) {
        if (a.oFeatures.bStateSave && !a.bDestroying) {
            var b = { time: +new Date(), start: a._iDisplayStart, length: a._iDisplayLength, order: h.extend(!0, [], a.aaSorting), search: Bb(a.oPreviousSearch),
                columns: h.map(a.aoColumns, function (b, d) {
                    return { visible: b.bVisible, search: Bb(a.aoPreSearchCols[d]) };
                }) };r(a, "aoStateSaveParams", "stateSaveParams", [a, b]);a.oSavedState = b;a.fnStateSaveCallback.call(a.oInstance, a, b);
        }
    }function Kb(a, b, c) {
        var d,
            e,
            f = a.aoColumns,
            b = function b(_b) {
            if (_b && _b.time) {
                var g = r(a, "aoStateLoadParams", "stateLoadParams", [a, _b]);if (-1 === h.inArray(!1, g) && (g = a.iStateDuration, !(0 < g && _b.time < +new Date() - 1E3 * g) && !(_b.columns && f.length !== _b.columns.length))) {
                    a.oLoadedState = h.extend(!0, {}, _b);_b.start !== k && (a._iDisplayStart = _b.start, a.iInitDisplayStart = _b.start);_b.length !== k && (a._iDisplayLength = _b.length);_b.order !== k && (a.aaSorting = [], h.each(_b.order, function (b, c) {
                        a.aaSorting.push(c[0] >= f.length ? [0, c[1]] : c);
                    }));_b.search !== k && h.extend(a.oPreviousSearch, Cb(_b.search));if (_b.columns) {
                        d = 0;for (e = _b.columns.length; d < e; d++) {
                            g = _b.columns[d], g.visible !== k && (f[d].bVisible = g.visible), g.search !== k && h.extend(a.aoPreSearchCols[d], Cb(g.search));
                        }
                    }r(a, "aoStateLoaded", "stateLoaded", [a, _b]);
                }
            }c();
        };if (a.oFeatures.bStateSave) {
            var g = a.fnStateLoadCallback.call(a.oInstance, a, b);g !== k && b(g);
        } else c();
    }function ya(a) {
        var b = n.settings,
            a = h.inArray(a, D(b, "nTable"));return -1 !== a ? b[a] : null;
    }function K(a, b, c, d) {
        c = "DataTables warning: " + (a ? "table id=" + a.sTableId + " - " : "") + c;d && (c += ". For more information about this error, please see http://datatables.net/tn/" + d);if (b) E.console && console.log && console.log(c);else if (b = n.ext, b = b.sErrMode || b.errMode, a && r(a, null, "error", [a, d, c]), "alert" == b) alert(c);else {
            if ("throw" == b) throw Error(c);"function" == typeof b && b(a, d, c);
        }
    }function F(a, b, c, d) {
        h.isArray(c) ? h.each(c, function (c, d) {
            h.isArray(d) ? F(a, b, d[0], d[1]) : F(a, b, d);
        }) : (d === k && (d = c), b[c] !== k && (a[d] = b[c]));
    }function Xa(a, b, c) {
        var d, e;for (e in b) {
            b.hasOwnProperty(e) && (d = b[e], h.isPlainObject(d) ? (h.isPlainObject(a[e]) || (a[e] = {}), h.extend(!0, a[e], d)) : a[e] = c && "data" !== e && "aaData" !== e && h.isArray(d) ? d.slice() : d);
        }return a;
    }function Wa(a, b, c) {
        h(a).on("click.DT", b, function (b) {
            h(a).blur();c(b);
        }).on("keypress.DT", b, function (a) {
            13 === a.which && (a.preventDefault(), c(a));
        }).on("selectstart.DT", function () {
            return !1;
        });
    }function z(a, b, c, d) {
        c && a[b].push({ fn: c, sName: d });
    }function r(a, b, c, d) {
        var e = [];b && (e = h.map(a[b].slice().reverse(), function (b) {
            return b.fn.apply(a.oInstance, d);
        }));null !== c && (b = h.Event(c + ".dt"), h(a.nTable).trigger(b, d), e.push(b.result));return e;
    }function Sa(a) {
        var b = a._iDisplayStart,
            c = a.fnDisplayEnd(),
            d = a._iDisplayLength;b >= c && (b = c - d);b -= b % d;if (-1 === d || 0 > b) b = 0;a._iDisplayStart = b;
    }function Na(a, b) {
        var c = a.renderer,
            d = n.ext.renderer[b];return h.isPlainObject(c) && c[b] ? d[c[b]] || d._ : "string" === typeof c ? d[c] || d._ : d._;
    }function y(a) {
        return a.oFeatures.bServerSide ? "ssp" : a.ajax || a.sAjaxSource ? "ajax" : "dom";
    }function ia(a, b) {
        var c = [],
            c = Lb.numbers_length,
            d = Math.floor(c / 2);b <= c ? c = Y(0, b) : a <= d ? (c = Y(0, c - 2), c.push("ellipsis"), c.push(b - 1)) : (a >= b - 1 - d ? c = Y(b - (c - 2), b) : (c = Y(a - d + 2, a + d - 1), c.push("ellipsis"), c.push(b - 1)), c.splice(0, 0, "ellipsis"), c.splice(0, 0, 0));c.DT_el = "span";return c;
    }function Da(a) {
        h.each({ num: function num(b) {
                return za(b, a);
            }, "num-fmt": function numFmt(b) {
                return za(b, a, Ya);
            }, "html-num": function htmlNum(b) {
                return za(b, a, Aa);
            }, "html-num-fmt": function htmlNumFmt(b) {
                return za(b, a, Aa, Ya);
            } }, function (b, c) {
            x.type.order[b + a + "-pre"] = c;b.match(/^html\-/) && (x.type.search[b + a] = x.type.search.html);
        });
    }function Mb(a) {
        return function () {
            var b = [ya(this[n.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return n.ext.internal[a].apply(this, b);
        };
    }var n = function n(a) {
        this.$ = function (a, b) {
            return this.api(!0).$(a, b);
        };this._ = function (a, b) {
            return this.api(!0).rows(a, b).data();
        };this.api = function (a) {
            return a ? new _s(ya(this[x.iApiIndex])) : new _s(this);
        };
        this.fnAddData = function (a, b) {
            var c = this.api(!0),
                d = h.isArray(a) && (h.isArray(a[0]) || h.isPlainObject(a[0])) ? c.rows.add(a) : c.row.add(a);(b === k || b) && c.draw();return d.flatten().toArray();
        };this.fnAdjustColumnSizing = function (a) {
            var b = this.api(!0).columns.adjust(),
                c = b.settings()[0],
                d = c.oScroll;a === k || a ? b.draw(!1) : ("" !== d.sX || "" !== d.sY) && la(c);
        };this.fnClearTable = function (a) {
            var b = this.api(!0).clear();(a === k || a) && b.draw();
        };this.fnClose = function (a) {
            this.api(!0).row(a).child.hide();
        };this.fnDeleteRow = function (a, b, c) {
            var d = this.api(!0),
                a = d.rows(a),
                e = a.settings()[0],
                h = e.aoData[a[0][0]];a.remove();b && b.call(this, e, h);(c === k || c) && d.draw();return h;
        };this.fnDestroy = function (a) {
            this.api(!0).destroy(a);
        };this.fnDraw = function (a) {
            this.api(!0).draw(a);
        };this.fnFilter = function (a, b, c, d, e, h) {
            e = this.api(!0);null === b || b === k ? e.search(a, c, d, h) : e.column(b).search(a, c, d, h);e.draw();
        };this.fnGetData = function (a, b) {
            var c = this.api(!0);if (a !== k) {
                var d = a.nodeName ? a.nodeName.toLowerCase() : "";return b !== k || "td" == d || "th" == d ? c.cell(a, b).data() : c.row(a).data() || null;
            }return c.data().toArray();
        };this.fnGetNodes = function (a) {
            var b = this.api(!0);return a !== k ? b.row(a).node() : b.rows().nodes().flatten().toArray();
        };this.fnGetPosition = function (a) {
            var b = this.api(!0),
                c = a.nodeName.toUpperCase();return "TR" == c ? b.row(a).index() : "TD" == c || "TH" == c ? (a = b.cell(a).index(), [a.row, a.columnVisible, a.column]) : null;
        };this.fnIsOpen = function (a) {
            return this.api(!0).row(a).child.isShown();
        };this.fnOpen = function (a, b, c) {
            return this.api(!0).row(a).child(b, c).show().child()[0];
        };
        this.fnPageChange = function (a, b) {
            var c = this.api(!0).page(a);(b === k || b) && c.draw(!1);
        };this.fnSetColumnVis = function (a, b, c) {
            a = this.api(!0).column(a).visible(b);(c === k || c) && a.columns.adjust().draw();
        };this.fnSettings = function () {
            return ya(this[x.iApiIndex]);
        };this.fnSort = function (a) {
            this.api(!0).order(a).draw();
        };this.fnSortListener = function (a, b, c) {
            this.api(!0).order.listener(a, b, c);
        };this.fnUpdate = function (a, b, c, d, e) {
            var h = this.api(!0);c === k || null === c ? h.row(b).data(a) : h.cell(b, c).data(a);(e === k || e) && h.columns.adjust();
            (d === k || d) && h.draw();return 0;
        };this.fnVersionCheck = x.fnVersionCheck;var b = this,
            c = a === k,
            d = this.length;c && (a = {});this.oApi = this.internal = x.internal;for (var e in n.ext.internal) {
            e && (this[e] = Mb(e));
        }this.each(function () {
            var e = {},
                g = 1 < d ? Xa(e, a, !0) : a,
                j = 0,
                i,
                e = this.getAttribute("id"),
                m = !1,
                l = n.defaults,
                q = h(this);if ("table" != this.nodeName.toLowerCase()) K(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);else {
                fb(l);gb(l.column);J(l, l, !0);J(l.column, l.column, !0);J(l, h.extend(g, q.data()));var t = n.settings,
                    j = 0;for (i = t.length; j < i; j++) {
                    var o = t[j];if (o.nTable == this || o.nTHead && o.nTHead.parentNode == this || o.nTFoot && o.nTFoot.parentNode == this) {
                        var s = g.bRetrieve !== k ? g.bRetrieve : l.bRetrieve;if (c || s) return o.oInstance;if (g.bDestroy !== k ? g.bDestroy : l.bDestroy) {
                            o.oInstance.fnDestroy();break;
                        } else {
                            K(o, 0, "Cannot reinitialise DataTable", 3);return;
                        }
                    }if (o.sTableId == this.id) {
                        t.splice(j, 1);break;
                    }
                }if (null === e || "" === e) this.id = e = "DataTables_Table_" + n.ext._unique++;var p = h.extend(!0, {}, n.models.oSettings, { sDestroyWidth: q[0].style.width,
                    sInstance: e, sTableId: e });p.nTable = this;p.oApi = b.internal;p.oInit = g;t.push(p);p.oInstance = 1 === b.length ? b : q.dataTable();fb(g);Ca(g.oLanguage);g.aLengthMenu && !g.iDisplayLength && (g.iDisplayLength = h.isArray(g.aLengthMenu[0]) ? g.aLengthMenu[0][0] : g.aLengthMenu[0]);g = Xa(h.extend(!0, {}, l), g);F(p.oFeatures, g, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));F(p, g, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"], ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"]]);F(p.oScroll, g, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]);F(p.oLanguage, g, "fnInfoCallback");
                z(p, "aoDrawCallback", g.fnDrawCallback, "user");z(p, "aoServerParams", g.fnServerParams, "user");z(p, "aoStateSaveParams", g.fnStateSaveParams, "user");z(p, "aoStateLoadParams", g.fnStateLoadParams, "user");z(p, "aoStateLoaded", g.fnStateLoaded, "user");z(p, "aoRowCallback", g.fnRowCallback, "user");z(p, "aoRowCreatedCallback", g.fnCreatedRow, "user");z(p, "aoHeaderCallback", g.fnHeaderCallback, "user");z(p, "aoFooterCallback", g.fnFooterCallback, "user");z(p, "aoInitComplete", g.fnInitComplete, "user");z(p, "aoPreDrawCallback", g.fnPreDrawCallback, "user");p.rowIdFn = S(g.rowId);hb(p);var u = p.oClasses;h.extend(u, n.ext.classes, g.oClasses);q.addClass(u.sTable);p.iInitDisplayStart === k && (p.iInitDisplayStart = g.iDisplayStart, p._iDisplayStart = g.iDisplayStart);null !== g.iDeferLoading && (p.bDeferLoading = !0, e = h.isArray(g.iDeferLoading), p._iRecordsDisplay = e ? g.iDeferLoading[0] : g.iDeferLoading, p._iRecordsTotal = e ? g.iDeferLoading[1] : g.iDeferLoading);var v = p.oLanguage;h.extend(!0, v, g.oLanguage);v.sUrl && (h.ajax({ dataType: "json", url: v.sUrl, success: function success(a) {
                        Ca(a);
                        J(l.oLanguage, a);h.extend(true, v, a);ha(p);
                    }, error: function error() {
                        ha(p);
                    } }), m = !0);null === g.asStripeClasses && (p.asStripeClasses = [u.sStripeOdd, u.sStripeEven]);var e = p.asStripeClasses,
                    x = q.children("tbody").find("tr").eq(0);-1 !== h.inArray(!0, h.map(e, function (a) {
                    return x.hasClass(a);
                })) && (h("tbody tr", this).removeClass(e.join(" ")), p.asDestroyStripes = e.slice());e = [];t = this.getElementsByTagName("thead");0 !== t.length && (ea(p.aoHeader, t[0]), e = ra(p));if (null === g.aoColumns) {
                    t = [];j = 0;for (i = e.length; j < i; j++) {
                        t.push(null);
                    }
                } else t = g.aoColumns;j = 0;for (i = t.length; j < i; j++) {
                    Ea(p, e ? e[j] : null);
                }jb(p, g.aoColumnDefs, t, function (a, b) {
                    ka(p, a, b);
                });if (x.length) {
                    var w = function w(a, b) {
                        return a.getAttribute("data-" + b) !== null ? b : null;
                    };h(x[0]).children("th, td").each(function (a, b) {
                        var c = p.aoColumns[a];if (c.mData === a) {
                            var d = w(b, "sort") || w(b, "order"),
                                e = w(b, "filter") || w(b, "search");if (d !== null || e !== null) {
                                c.mData = { _: a + ".display", sort: d !== null ? a + ".@data-" + d : k, type: d !== null ? a + ".@data-" + d : k, filter: e !== null ? a + ".@data-" + e : k };ka(p, a);
                            }
                        }
                    });
                }var U = p.oFeatures,
                    e = function e() {
                    if (g.aaSorting === k) {
                        var a = p.aaSorting;j = 0;for (i = a.length; j < i; j++) {
                            a[j][1] = p.aoColumns[j].asSorting[0];
                        }
                    }wa(p);U.bSort && z(p, "aoDrawCallback", function () {
                        if (p.bSorted) {
                            var a = X(p),
                                b = {};h.each(a, function (a, c) {
                                b[c.src] = c.dir;
                            });r(p, null, "order", [p, a, b]);Jb(p);
                        }
                    });z(p, "aoDrawCallback", function () {
                        (p.bSorted || y(p) === "ssp" || U.bDeferRender) && wa(p);
                    }, "sc");var a = q.children("caption").each(function () {
                        this._captionSide = h(this).css("caption-side");
                    }),
                        b = q.children("thead");b.length === 0 && (b = h("<thead/>").appendTo(q));
                    p.nTHead = b[0];b = q.children("tbody");b.length === 0 && (b = h("<tbody/>").appendTo(q));p.nTBody = b[0];b = q.children("tfoot");if (b.length === 0 && a.length > 0 && (p.oScroll.sX !== "" || p.oScroll.sY !== "")) b = h("<tfoot/>").appendTo(q);if (b.length === 0 || b.children().length === 0) q.addClass(u.sNoFooter);else if (b.length > 0) {
                        p.nTFoot = b[0];ea(p.aoFooter, p.nTFoot);
                    }if (g.aaData) for (j = 0; j < g.aaData.length; j++) {
                        O(p, g.aaData[j]);
                    } else (p.bDeferLoading || y(p) == "dom") && na(p, h(p.nTBody).children("tr"));p.aiDisplay = p.aiDisplayMaster.slice();
                    p.bInitialised = true;m === false && ha(p);
                };g.bStateSave ? (U.bStateSave = !0, z(p, "aoDrawCallback", xa, "state_save"), Kb(p, g, e)) : e();
            }
        });b = null;return this;
    },
        x,
        _s,
        o,
        u,
        Za = {},
        Nb = /[\r\n]/g,
        Aa = /<.*?>/g,
        Zb = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
        $b = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"),
        Ya = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
        M = function M(a) {
        return !a || !0 === a || "-" === a ? !0 : !1;
    },
        Ob = function Ob(a) {
        var b = parseInt(a, 10);return !isNaN(b) && isFinite(a) ? b : null;
    },
        Pb = function Pb(a, b) {
        Za[b] || (Za[b] = RegExp(Qa(b), "g"));return "string" === typeof a && "." !== b ? a.replace(/\./g, "").replace(Za[b], ".") : a;
    },
        $a = function $a(a, b, c) {
        var d = "string" === typeof a;if (M(a)) return !0;b && d && (a = Pb(a, b));c && d && (a = a.replace(Ya, ""));return !isNaN(parseFloat(a)) && isFinite(a);
    },
        Qb = function Qb(a, b, c) {
        return M(a) ? !0 : !(M(a) || "string" === typeof a) ? null : $a(a.replace(Aa, ""), b, c) ? !0 : null;
    },
        D = function D(a, b, c) {
        var d = [],
            e = 0,
            f = a.length;if (c !== k) for (; e < f; e++) {
            a[e] && a[e][b] && d.push(a[e][b][c]);
        } else for (; e < f; e++) {
            a[e] && d.push(a[e][b]);
        }return d;
    },
        ja = function ja(a, b, c, d) {
        var e = [],
            f = 0,
            g = b.length;if (d !== k) for (; f < g; f++) {
            a[b[f]][c] && e.push(a[b[f]][c][d]);
        } else for (; f < g; f++) {
            e.push(a[b[f]][c]);
        }return e;
    },
        Y = function Y(a, b) {
        var c = [],
            d;b === k ? (b = 0, d = a) : (d = b, b = a);for (var e = b; e < d; e++) {
            c.push(e);
        }return c;
    },
        Rb = function Rb(a) {
        for (var b = [], c = 0, d = a.length; c < d; c++) {
            a[c] && b.push(a[c]);
        }return b;
    },
        qa = function qa(a) {
        var b;a: {
            if (!(2 > a.length)) {
                b = a.slice().sort();for (var c = b[0], d = 1, e = b.length; d < e; d++) {
                    if (b[d] === c) {
                        b = !1;break a;
                    }c = b[d];
                }
            }b = !0;
        }if (b) return a.slice();
        b = [];var e = a.length,
            f,
            g = 0,
            d = 0;a: for (; d < e; d++) {
            c = a[d];for (f = 0; f < g; f++) {
                if (b[f] === c) continue a;
            }b.push(c);g++;
        }return b;
    };n.util = { throttle: function throttle(a, b) {
            var c = b !== k ? b : 200,
                d,
                e;return function () {
                var b = this,
                    g = +new Date(),
                    j = arguments;d && g < d + c ? (clearTimeout(e), e = setTimeout(function () {
                    d = k;a.apply(b, j);
                }, c)) : (d = g, a.apply(b, j));
            };
        }, escapeRegex: function escapeRegex(a) {
            return a.replace($b, "\\$1");
        } };var A = function A(a, b, c) {
        a[b] !== k && (a[c] = a[b]);
    },
        ca = /\[.*?\]$/,
        W = /\(\)$/,
        Qa = n.util.escapeRegex,
        va = h("<div>")[0],
        Wb = va.textContent !== k,
        Yb = /<.*?>/g,
        Oa = n.util.throttle,
        Sb = [],
        w = Array.prototype,
        ac = function ac(a) {
        var b,
            c,
            d = n.settings,
            e = h.map(d, function (a) {
            return a.nTable;
        });if (a) {
            if (a.nTable && a.oApi) return [a];if (a.nodeName && "table" === a.nodeName.toLowerCase()) return b = h.inArray(a, e), -1 !== b ? [d[b]] : null;if (a && "function" === typeof a.settings) return a.settings().toArray();"string" === typeof a ? c = h(a) : a instanceof h && (c = a);
        } else return [];if (c) return c.map(function () {
            b = h.inArray(this, e);return -1 !== b ? d[b] : null;
        }).toArray();
    };_s = function s(a, b) {
        if (!(this instanceof _s)) return new _s(a, b);var c = [],
            d = function d(a) {
            (a = ac(a)) && (c = c.concat(a));
        };if (h.isArray(a)) for (var e = 0, f = a.length; e < f; e++) {
            d(a[e]);
        } else d(a);this.context = qa(c);b && h.merge(this, b);this.selector = { rows: null, cols: null, opts: null };_s.extend(this, this, Sb);
    };n.Api = _s;h.extend(_s.prototype, { any: function any() {
            return 0 !== this.count();
        }, concat: w.concat, context: [], count: function count() {
            return this.flatten().length;
        }, each: function each(a) {
            for (var b = 0, c = this.length; b < c; b++) {
                a.call(this, this[b], b, this);
            }return this;
        }, eq: function eq(a) {
            var b = this.context;return b.length > a ? new _s(b[a], this[a]) : null;
        }, filter: function filter(a) {
            var b = [];if (w.filter) b = w.filter.call(this, a, this);else for (var c = 0, d = this.length; c < d; c++) {
                a.call(this, this[c], c, this) && b.push(this[c]);
            }return new _s(this.context, b);
        }, flatten: function flatten() {
            var a = [];return new _s(this.context, a.concat.apply(a, this.toArray()));
        }, join: w.join, indexOf: w.indexOf || function (a, b) {
            for (var c = b || 0, d = this.length; c < d; c++) {
                if (this[c] === a) return c;
            }return -1;
        }, iterator: function iterator(a, b, c, d) {
            var e = [],
                f,
                g,
                j,
                h,
                m,
                l = this.context,
                n,
                o,
                u = this.selector;"string" === typeof a && (d = c, c = b, b = a, a = !1);g = 0;for (j = l.length; g < j; g++) {
                var r = new _s(l[g]);if ("table" === b) f = c.call(r, l[g], g), f !== k && e.push(f);else if ("columns" === b || "rows" === b) f = c.call(r, l[g], this[g], g), f !== k && e.push(f);else if ("column" === b || "column-rows" === b || "row" === b || "cell" === b) {
                    o = this[g];"column-rows" === b && (n = Ba(l[g], u.opts));h = 0;for (m = o.length; h < m; h++) {
                        f = o[h], f = "cell" === b ? c.call(r, l[g], f.row, f.column, g, h) : c.call(r, l[g], f, g, h, n), f !== k && e.push(f);
                    }
                }
            }return e.length || d ? (a = new _s(l, a ? e.concat.apply([], e) : e), b = a.selector, b.rows = u.rows, b.cols = u.cols, b.opts = u.opts, a) : this;
        }, lastIndexOf: w.lastIndexOf || function (a, b) {
            return this.indexOf.apply(this.toArray.reverse(), arguments);
        }, length: 0, map: function map(a) {
            var b = [];if (w.map) b = w.map.call(this, a, this);else for (var c = 0, d = this.length; c < d; c++) {
                b.push(a.call(this, this[c], c));
            }return new _s(this.context, b);
        }, pluck: function pluck(a) {
            return this.map(function (b) {
                return b[a];
            });
        }, pop: w.pop, push: w.push, reduce: w.reduce || function (a, b) {
            return ib(this, a, b, 0, this.length, 1);
        }, reduceRight: w.reduceRight || function (a, b) {
            return ib(this, a, b, this.length - 1, -1, -1);
        }, reverse: w.reverse, selector: null, shift: w.shift, slice: function slice() {
            return new _s(this.context, this);
        }, sort: w.sort, splice: w.splice, toArray: function toArray() {
            return w.slice.call(this);
        }, to$: function to$() {
            return h(this);
        }, toJQuery: function toJQuery() {
            return h(this);
        }, unique: function unique() {
            return new _s(this.context, qa(this));
        }, unshift: w.unshift });_s.extend = function (a, b, c) {
        if (c.length && b && (b instanceof _s || b.__dt_wrapper)) {
            var d,
                e,
                f,
                g = function g(a, b, c) {
                return function () {
                    var d = b.apply(a, arguments);_s.extend(d, d, c.methodExt);return d;
                };
            };d = 0;for (e = c.length; d < e; d++) {
                f = c[d], b[f.name] = "function" === typeof f.val ? g(a, f.val, f) : h.isPlainObject(f.val) ? {} : f.val, b[f.name].__dt_wrapper = !0, _s.extend(a, b[f.name], f.propExt);
            }
        }
    };_s.register = o = function o(a, b) {
        if (h.isArray(a)) for (var c = 0, d = a.length; c < d; c++) {
            _s.register(a[c], b);
        } else for (var e = a.split("."), f = Sb, g, j, c = 0, d = e.length; c < d; c++) {
            g = (j = -1 !== e[c].indexOf("()")) ? e[c].replace("()", "") : e[c];var i;a: {
                i = 0;for (var m = f.length; i < m; i++) {
                    if (f[i].name === g) {
                        i = f[i];break a;
                    }
                }i = null;
            }i || (i = { name: g, val: {}, methodExt: [], propExt: [] }, f.push(i));c === d - 1 ? i.val = b : f = j ? i.methodExt : i.propExt;
        }
    };_s.registerPlural = u = function u(a, b, c) {
        _s.register(a, c);_s.register(b, function () {
            var a = c.apply(this, arguments);return a === this ? this : a instanceof _s ? a.length ? h.isArray(a[0]) ? new _s(a.context, a[0]) : a[0] : k : a;
        });
    };o("tables()", function (a) {
        var b;if (a) {
            b = _s;var c = this.context;if ("number" === typeof a) a = [c[a]];else var d = h.map(c, function (a) {
                return a.nTable;
            }),
                a = h(d).filter(a).map(function () {
                var a = h.inArray(this, d);return c[a];
            }).toArray();b = new b(a);
        } else b = this;return b;
    });o("table()", function (a) {
        var a = this.tables(a),
            b = a.context;return b.length ? new _s(b[0]) : a;
    });u("tables().nodes()", "table().node()", function () {
        return this.iterator("table", function (a) {
            return a.nTable;
        }, 1);
    });u("tables().body()", "table().body()", function () {
        return this.iterator("table", function (a) {
            return a.nTBody;
        }, 1);
    });u("tables().header()", "table().header()", function () {
        return this.iterator("table", function (a) {
            return a.nTHead;
        }, 1);
    });u("tables().footer()", "table().footer()", function () {
        return this.iterator("table", function (a) {
            return a.nTFoot;
        }, 1);
    });u("tables().containers()", "table().container()", function () {
        return this.iterator("table", function (a) {
            return a.nTableWrapper;
        }, 1);
    });o("draw()", function (a) {
        return this.iterator("table", function (b) {
            "page" === a ? P(b) : ("string" === typeof a && (a = "full-hold" === a ? !1 : !0), T(b, !1 === a));
        });
    });o("page()", function (a) {
        return a === k ? this.page.info().page : this.iterator("table", function (b) {
            Ta(b, a);
        });
    });o("page.info()", function () {
        if (0 === this.context.length) return k;var a = this.context[0],
            b = a._iDisplayStart,
            c = a.oFeatures.bPaginate ? a._iDisplayLength : -1,
            d = a.fnRecordsDisplay(),
            e = -1 === c;return { page: e ? 0 : Math.floor(b / c), pages: e ? 1 : Math.ceil(d / c), start: b, end: a.fnDisplayEnd(), length: c, recordsTotal: a.fnRecordsTotal(), recordsDisplay: d, serverSide: "ssp" === y(a) };
    });o("page.len()", function (a) {
        return a === k ? 0 !== this.context.length ? this.context[0]._iDisplayLength : k : this.iterator("table", function (b) {
            Ra(b, a);
        });
    });var Tb = function Tb(a, b, c) {
        if (c) {
            var d = new _s(a);
            d.one("draw", function () {
                c(d.ajax.json());
            });
        }if ("ssp" == y(a)) T(a, b);else {
            C(a, !0);var e = a.jqXHR;e && 4 !== e.readyState && e.abort();sa(a, [], function (c) {
                oa(a);for (var c = ta(a, c), d = 0, e = c.length; d < e; d++) {
                    O(a, c[d]);
                }T(a, b);C(a, !1);
            });
        }
    };o("ajax.json()", function () {
        var a = this.context;if (0 < a.length) return a[0].json;
    });o("ajax.params()", function () {
        var a = this.context;if (0 < a.length) return a[0].oAjaxData;
    });o("ajax.reload()", function (a, b) {
        return this.iterator("table", function (c) {
            Tb(c, !1 === b, a);
        });
    });o("ajax.url()", function (a) {
        var b = this.context;if (a === k) {
            if (0 === b.length) return k;b = b[0];return b.ajax ? h.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource;
        }return this.iterator("table", function (b) {
            h.isPlainObject(b.ajax) ? b.ajax.url = a : b.ajax = a;
        });
    });o("ajax.url().load()", function (a, b) {
        return this.iterator("table", function (c) {
            Tb(c, !1 === b, a);
        });
    });var ab = function ab(a, b, c, d, e) {
        var f = [],
            g,
            j,
            i,
            m,
            l,
            n;i = typeof b === 'undefined' ? 'undefined' : _typeof(b);if (!b || "string" === i || "function" === i || b.length === k) b = [b];i = 0;for (m = b.length; i < m; i++) {
            j = b[i] && b[i].split && !b[i].match(/[\[\(:]/) ? b[i].split(",") : [b[i]];l = 0;for (n = j.length; l < n; l++) {
                (g = c("string" === typeof j[l] ? h.trim(j[l]) : j[l])) && g.length && (f = f.concat(g));
            }
        }a = x.selector[a];if (a.length) {
            i = 0;for (m = a.length; i < m; i++) {
                f = a[i](d, e, f);
            }
        }return qa(f);
    },
        bb = function bb(a) {
        a || (a = {});a.filter && a.search === k && (a.search = a.filter);return h.extend({ search: "none", order: "current", page: "all" }, a);
    },
        cb = function cb(a) {
        for (var b = 0, c = a.length; b < c; b++) {
            if (0 < a[b].length) return a[0] = a[b], a[0].length = 1, a.length = 1, a.context = [a.context[b]], a;
        }a.length = 0;return a;
    },
        Ba = function Ba(a, b) {
        var c,
            d,
            e,
            f = [],
            g = a.aiDisplay;e = a.aiDisplayMaster;var j = b.search;c = b.order;d = b.page;if ("ssp" == y(a)) return "removed" === j ? [] : Y(0, e.length);if ("current" == d) {
            c = a._iDisplayStart;for (d = a.fnDisplayEnd(); c < d; c++) {
                f.push(g[c]);
            }
        } else if ("current" == c || "applied" == c) {
            if ("none" == j) f = e.slice();else if ("applied" == j) f = g.slice();else {
                if ("removed" == j) {
                    var i = {};c = 0;for (d = g.length; c < d; c++) {
                        i[g[c]] = null;
                    }f = h.map(e, function (a) {
                        return !i.hasOwnProperty(a) ? a : null;
                    });
                }
            }
        } else if ("index" == c || "original" == c) {
            c = 0;for (d = a.aoData.length; c < d; c++) {
                "none" == j ? f.push(c) : (e = h.inArray(c, g), (-1 === e && "removed" == j || 0 <= e && "applied" == j) && f.push(c));
            }
        }return f;
    };o("rows()", function (a, b) {
        a === k ? a = "" : h.isPlainObject(a) && (b = a, a = "");var b = bb(b),
            c = this.iterator("table", function (c) {
            var e = b,
                f;return ab("row", a, function (a) {
                var b = Ob(a),
                    i = c.aoData;if (b !== null && !e) return [b];f || (f = Ba(c, e));if (b !== null && h.inArray(b, f) !== -1) return [b];if (a === null || a === k || a === "") return f;if (typeof a === "function") return h.map(f, function (b) {
                    var c = i[b];return a(b, c._aData, c.nTr) ? b : null;
                });if (a.nodeName) {
                    var b = a._DT_RowIndex,
                        m = a._DT_CellIndex;if (b !== k) return i[b] && i[b].nTr === a ? [b] : [];if (m) return i[m.row] && i[m.row].nTr === a ? [m.row] : [];b = h(a).closest("*[data-dt-row]");return b.length ? [b.data("dt-row")] : [];
                }if (typeof a === "string" && a.charAt(0) === "#") {
                    b = c.aIds[a.replace(/^#/, "")];if (b !== k) return [b.idx];
                }b = Rb(ja(c.aoData, f, "nTr"));return h(b).filter(a).map(function () {
                    return this._DT_RowIndex;
                }).toArray();
            }, c, e);
        }, 1);c.selector.rows = a;c.selector.opts = b;return c;
    });o("rows().nodes()", function () {
        return this.iterator("row", function (a, b) {
            return a.aoData[b].nTr || k;
        }, 1);
    });o("rows().data()", function () {
        return this.iterator(!0, "rows", function (a, b) {
            return ja(a.aoData, b, "_aData");
        }, 1);
    });u("rows().cache()", "row().cache()", function (a) {
        return this.iterator("row", function (b, c) {
            var d = b.aoData[c];return "search" === a ? d._aFilterData : d._aSortData;
        }, 1);
    });u("rows().invalidate()", "row().invalidate()", function (a) {
        return this.iterator("row", function (b, c) {
            da(b, c, a);
        });
    });u("rows().indexes()", "row().index()", function () {
        return this.iterator("row", function (a, b) {
            return b;
        }, 1);
    });u("rows().ids()", "row().id()", function (a) {
        for (var b = [], c = this.context, d = 0, e = c.length; d < e; d++) {
            for (var f = 0, g = this[d].length; f < g; f++) {
                var h = c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);b.push((!0 === a ? "#" : "") + h);
            }
        }return new _s(c, b);
    });u("rows().remove()", "row().remove()", function () {
        var a = this;this.iterator("row", function (b, c, d) {
            var e = b.aoData,
                f = e[c],
                g,
                h,
                i,
                m,
                l;e.splice(c, 1);g = 0;for (h = e.length; g < h; g++) {
                if (i = e[g], l = i.anCells, null !== i.nTr && (i.nTr._DT_RowIndex = g), null !== l) {
                    i = 0;for (m = l.length; i < m; i++) {
                        l[i]._DT_CellIndex.row = g;
                    }
                }
            }pa(b.aiDisplayMaster, c);pa(b.aiDisplay, c);pa(a[d], c, !1);0 < b._iRecordsDisplay && b._iRecordsDisplay--;Sa(b);c = b.rowIdFn(f._aData);c !== k && delete b.aIds[c];
        });this.iterator("table", function (a) {
            for (var c = 0, d = a.aoData.length; c < d; c++) {
                a.aoData[c].idx = c;
            }
        });return this;
    });o("rows.add()", function (a) {
        var b = this.iterator("table", function (b) {
            var c,
                f,
                g,
                h = [];f = 0;for (g = a.length; f < g; f++) {
                c = a[f], c.nodeName && "TR" === c.nodeName.toUpperCase() ? h.push(na(b, c)[0]) : h.push(O(b, c));
            }return h;
        }, 1),
            c = this.rows(-1);c.pop();h.merge(c, b);return c;
    });o("row()", function (a, b) {
        return cb(this.rows(a, b));
    });o("row().data()", function (a) {
        var b = this.context;if (a === k) return b.length && this.length ? b[0].aoData[this[0]]._aData : k;var c = b[0].aoData[this[0]];c._aData = a;h.isArray(a) && c.nTr.id && N(b[0].rowId)(a, c.nTr.id);da(b[0], this[0], "data");return this;
    });o("row().node()", function () {
        var a = this.context;return a.length && this.length ? a[0].aoData[this[0]].nTr || null : null;
    });o("row.add()", function (a) {
        a instanceof h && a.length && (a = a[0]);var b = this.iterator("table", function (b) {
            return a.nodeName && "TR" === a.nodeName.toUpperCase() ? na(b, a)[0] : O(b, a);
        });return this.row(b[0]);
    });var db = function db(a, b) {
        var c = a.context;if (c.length && (c = c[0].aoData[b !== k ? b : a[0]]) && c._details) c._details.remove(), c._detailsShow = k, c._details = k;
    },
        Ub = function Ub(a, b) {
        var c = a.context;if (c.length && a.length) {
            var d = c[0].aoData[a[0]];if (d._details) {
                (d._detailsShow = b) ? d._details.insertAfter(d.nTr) : d._details.detach();var e = c[0],
                    f = new _s(e),
                    g = e.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
                0 < D(g, "_details").length && (f.on("draw.dt.DT_details", function (a, b) {
                    e === b && f.rows({ page: "current" }).eq(0).each(function (a) {
                        a = g[a];a._detailsShow && a._details.insertAfter(a.nTr);
                    });
                }), f.on("column-visibility.dt.DT_details", function (a, b) {
                    if (e === b) for (var c, d = V(b), f = 0, h = g.length; f < h; f++) {
                        c = g[f], c._details && c._details.children("td[colspan]").attr("colspan", d);
                    }
                }), f.on("destroy.dt.DT_details", function (a, b) {
                    if (e === b) for (var c = 0, d = g.length; c < d; c++) {
                        g[c]._details && db(f, c);
                    }
                }));
            }
        }
    };o("row().child()", function (a, b) {
        var c = this.context;if (a === k) return c.length && this.length ? c[0].aoData[this[0]]._details : k;if (!0 === a) this.child.show();else if (!1 === a) db(this);else if (c.length && this.length) {
            var d = c[0],
                c = c[0].aoData[this[0]],
                e = [],
                f = function f(a, b) {
                if (h.isArray(a) || a instanceof h) for (var c = 0, k = a.length; c < k; c++) {
                    f(a[c], b);
                } else a.nodeName && "tr" === a.nodeName.toLowerCase() ? e.push(a) : (c = h("<tr><td/></tr>").addClass(b), h("td", c).addClass(b).html(a)[0].colSpan = V(d), e.push(c[0]));
            };f(a, b);c._details && c._details.detach();c._details = h(e);
            c._detailsShow && c._details.insertAfter(c.nTr);
        }return this;
    });o(["row().child.show()", "row().child().show()"], function () {
        Ub(this, !0);return this;
    });o(["row().child.hide()", "row().child().hide()"], function () {
        Ub(this, !1);return this;
    });o(["row().child.remove()", "row().child().remove()"], function () {
        db(this);return this;
    });o("row().child.isShown()", function () {
        var a = this.context;return a.length && this.length ? a[0].aoData[this[0]]._detailsShow || !1 : !1;
    });var bc = /^([^:]+):(name|visIdx|visible)$/,
        Vb = function Vb(a, b, c, d, e) {
        for (var c = [], d = 0, f = e.length; d < f; d++) {
            c.push(B(a, e[d], b));
        }return c;
    };o("columns()", function (a, b) {
        a === k ? a = "" : h.isPlainObject(a) && (b = a, a = "");var b = bb(b),
            c = this.iterator("table", function (c) {
            var e = a,
                f = b,
                g = c.aoColumns,
                j = D(g, "sName"),
                i = D(g, "nTh");return ab("column", e, function (a) {
                var b = Ob(a);if (a === "") return Y(g.length);if (b !== null) return [b >= 0 ? b : g.length + b];if (typeof a === "function") {
                    var e = Ba(c, f);return h.map(g, function (b, f) {
                        return a(f, Vb(c, f, 0, 0, e), i[f]) ? f : null;
                    });
                }var k = typeof a === "string" ? a.match(bc) : "";if (k) switch (k[2]) {case "visIdx":case "visible":
                        b = parseInt(k[1], 10);if (b < 0) {
                            var n = h.map(g, function (a, b) {
                                return a.bVisible ? b : null;
                            });return [n[n.length + b]];
                        }return [aa(c, b)];case "name":
                        return h.map(j, function (a, b) {
                            return a === k[1] ? b : null;
                        });default:
                        return [];}if (a.nodeName && a._DT_CellIndex) return [a._DT_CellIndex.column];b = h(i).filter(a).map(function () {
                    return h.inArray(this, i);
                }).toArray();if (b.length || !a.nodeName) return b;b = h(a).closest("*[data-dt-column]");return b.length ? [b.data("dt-column")] : [];
            }, c, f);
        }, 1);c.selector.cols = a;c.selector.opts = b;return c;
    });u("columns().header()", "column().header()", function () {
        return this.iterator("column", function (a, b) {
            return a.aoColumns[b].nTh;
        }, 1);
    });u("columns().footer()", "column().footer()", function () {
        return this.iterator("column", function (a, b) {
            return a.aoColumns[b].nTf;
        }, 1);
    });u("columns().data()", "column().data()", function () {
        return this.iterator("column-rows", Vb, 1);
    });u("columns().dataSrc()", "column().dataSrc()", function () {
        return this.iterator("column", function (a, b) {
            return a.aoColumns[b].mData;
        }, 1);
    });u("columns().cache()", "column().cache()", function (a) {
        return this.iterator("column-rows", function (b, c, d, e, f) {
            return ja(b.aoData, f, "search" === a ? "_aFilterData" : "_aSortData", c);
        }, 1);
    });u("columns().nodes()", "column().nodes()", function () {
        return this.iterator("column-rows", function (a, b, c, d, e) {
            return ja(a.aoData, e, "anCells", b);
        }, 1);
    });u("columns().visible()", "column().visible()", function (a, b) {
        var c = this.iterator("column", function (b, c) {
            if (a === k) return b.aoColumns[c].bVisible;var f = b.aoColumns,
                g = f[c],
                j = b.aoData,
                i,
                m,
                l;if (a !== k && g.bVisible !== a) {
                if (a) {
                    var n = h.inArray(!0, D(f, "bVisible"), c + 1);i = 0;for (m = j.length; i < m; i++) {
                        l = j[i].nTr, f = j[i].anCells, l && l.insertBefore(f[c], f[n] || null);
                    }
                } else h(D(b.aoData, "anCells", c)).detach();g.bVisible = a;fa(b, b.aoHeader);fa(b, b.aoFooter);b.aiDisplay.length || h(b.nTBody).find("td[colspan]").attr("colspan", V(b));xa(b);
            }
        });a !== k && (this.iterator("column", function (c, e) {
            r(c, null, "column-visibility", [c, e, a, b]);
        }), (b === k || b) && this.columns.adjust());return c;
    });u("columns().indexes()", "column().index()", function (a) {
        return this.iterator("column", function (b, c) {
            return "visible" === a ? ba(b, c) : c;
        }, 1);
    });o("columns.adjust()", function () {
        return this.iterator("table", function (a) {
            $(a);
        }, 1);
    });o("column.index()", function (a, b) {
        if (0 !== this.context.length) {
            var c = this.context[0];if ("fromVisible" === a || "toData" === a) return aa(c, b);if ("fromData" === a || "toVisible" === a) return ba(c, b);
        }
    });o("column()", function (a, b) {
        return cb(this.columns(a, b));
    });o("cells()", function (a, b, c) {
        h.isPlainObject(a) && (a.row === k ? (c = a, a = null) : (c = b, b = null));
        h.isPlainObject(b) && (c = b, b = null);if (null === b || b === k) return this.iterator("table", function (b) {
            var d = a,
                e = bb(c),
                f = b.aoData,
                g = Ba(b, e),
                j = Rb(ja(f, g, "anCells")),
                i = h([].concat.apply([], j)),
                l,
                m = b.aoColumns.length,
                n,
                o,
                u,
                s,
                r,
                v;return ab("cell", d, function (a) {
                var c = typeof a === "function";if (a === null || a === k || c) {
                    n = [];o = 0;for (u = g.length; o < u; o++) {
                        l = g[o];for (s = 0; s < m; s++) {
                            r = { row: l, column: s };if (c) {
                                v = f[l];a(r, B(b, l, s), v.anCells ? v.anCells[s] : null) && n.push(r);
                            } else n.push(r);
                        }
                    }return n;
                }if (h.isPlainObject(a)) return a.column !== k && a.row !== k && h.inArray(a.row, g) !== -1 ? [a] : [];c = i.filter(a).map(function (a, b) {
                    return { row: b._DT_CellIndex.row, column: b._DT_CellIndex.column };
                }).toArray();if (c.length || !a.nodeName) return c;v = h(a).closest("*[data-dt-row]");return v.length ? [{ row: v.data("dt-row"), column: v.data("dt-column") }] : [];
            }, b, e);
        });var d = this.columns(b),
            e = this.rows(a),
            f,
            g,
            j,
            i,
            m;this.iterator("table", function (a, b) {
            f = [];g = 0;for (j = e[b].length; g < j; g++) {
                i = 0;for (m = d[b].length; i < m; i++) {
                    f.push({ row: e[b][g], column: d[b][i] });
                }
            }
        }, 1);var l = this.cells(f, c);h.extend(l.selector, { cols: b, rows: a, opts: c });return l;
    });u("cells().nodes()", "cell().node()", function () {
        return this.iterator("cell", function (a, b, c) {
            return (a = a.aoData[b]) && a.anCells ? a.anCells[c] : k;
        }, 1);
    });o("cells().data()", function () {
        return this.iterator("cell", function (a, b, c) {
            return B(a, b, c);
        }, 1);
    });u("cells().cache()", "cell().cache()", function (a) {
        a = "search" === a ? "_aFilterData" : "_aSortData";return this.iterator("cell", function (b, c, d) {
            return b.aoData[c][a][d];
        }, 1);
    });u("cells().render()", "cell().render()", function (a) {
        return this.iterator("cell", function (b, c, d) {
            return B(b, c, d, a);
        }, 1);
    });u("cells().indexes()", "cell().index()", function () {
        return this.iterator("cell", function (a, b, c) {
            return { row: b, column: c, columnVisible: ba(a, c) };
        }, 1);
    });u("cells().invalidate()", "cell().invalidate()", function (a) {
        return this.iterator("cell", function (b, c, d) {
            da(b, c, a, d);
        });
    });o("cell()", function (a, b, c) {
        return cb(this.cells(a, b, c));
    });o("cell().data()", function (a) {
        var b = this.context,
            c = this[0];if (a === k) return b.length && c.length ? B(b[0], c[0].row, c[0].column) : k;kb(b[0], c[0].row, c[0].column, a);da(b[0], c[0].row, "data", c[0].column);return this;
    });o("order()", function (a, b) {
        var c = this.context;if (a === k) return 0 !== c.length ? c[0].aaSorting : k;"number" === typeof a ? a = [[a, b]] : a.length && !h.isArray(a[0]) && (a = Array.prototype.slice.call(arguments));return this.iterator("table", function (b) {
            b.aaSorting = a.slice();
        });
    });o("order.listener()", function (a, b, c) {
        return this.iterator("table", function (d) {
            Ma(d, a, b, c);
        });
    });o("order.fixed()", function (a) {
        if (!a) {
            var b = this.context,
                b = b.length ? b[0].aaSortingFixed : k;return h.isArray(b) ? { pre: b } : b;
        }return this.iterator("table", function (b) {
            b.aaSortingFixed = h.extend(!0, {}, a);
        });
    });o(["columns().order()", "column().order()"], function (a) {
        var b = this;return this.iterator("table", function (c, d) {
            var e = [];h.each(b[d], function (b, c) {
                e.push([c, a]);
            });c.aaSorting = e;
        });
    });o("search()", function (a, b, c, d) {
        var e = this.context;return a === k ? 0 !== e.length ? e[0].oPreviousSearch.sSearch : k : this.iterator("table", function (e) {
            e.oFeatures.bFilter && ga(e, h.extend({}, e.oPreviousSearch, { sSearch: a + "", bRegex: null === b ? !1 : b, bSmart: null === c ? !0 : c, bCaseInsensitive: null === d ? !0 : d }), 1);
        });
    });u("columns().search()", "column().search()", function (a, b, c, d) {
        return this.iterator("column", function (e, f) {
            var g = e.aoPreSearchCols;if (a === k) return g[f].sSearch;e.oFeatures.bFilter && (h.extend(g[f], { sSearch: a + "", bRegex: null === b ? !1 : b, bSmart: null === c ? !0 : c, bCaseInsensitive: null === d ? !0 : d }), ga(e, e.oPreviousSearch, 1));
        });
    });o("state()", function () {
        return this.context.length ? this.context[0].oSavedState : null;
    });o("state.clear()", function () {
        return this.iterator("table", function (a) {
            a.fnStateSaveCallback.call(a.oInstance, a, {});
        });
    });o("state.loaded()", function () {
        return this.context.length ? this.context[0].oLoadedState : null;
    });o("state.save()", function () {
        return this.iterator("table", function (a) {
            xa(a);
        });
    });n.versionCheck = n.fnVersionCheck = function (a) {
        for (var b = n.version.split("."), a = a.split("."), c, d, e = 0, f = a.length; e < f; e++) {
            if (c = parseInt(b[e], 10) || 0, d = parseInt(a[e], 10) || 0, c !== d) return c > d;
        }return !0;
    };n.isDataTable = n.fnIsDataTable = function (a) {
        var b = h(a).get(0),
            c = !1;if (a instanceof n.Api) return !0;h.each(n.settings, function (a, e) {
            var f = e.nScrollHead ? h("table", e.nScrollHead)[0] : null,
                g = e.nScrollFoot ? h("table", e.nScrollFoot)[0] : null;if (e.nTable === b || f === b || g === b) c = !0;
        });return c;
    };n.tables = n.fnTables = function (a) {
        var b = !1;h.isPlainObject(a) && (b = a.api, a = a.visible);var c = h.map(n.settings, function (b) {
            if (!a || a && h(b.nTable).is(":visible")) return b.nTable;
        });return b ? new _s(c) : c;
    };n.camelToHungarian = J;o("$()", function (a, b) {
        var c = this.rows(b).nodes(),
            c = h(c);return h([].concat(c.filter(a).toArray(), c.find(a).toArray()));
    });h.each(["on", "one", "off"], function (a, b) {
        o(b + "()", function () {
            var a = Array.prototype.slice.call(arguments);a[0] = h.map(a[0].split(/\s/), function (a) {
                return !a.match(/\.dt\b/) ? a + ".dt" : a;
            }).join(" ");var d = h(this.tables().nodes());d[b].apply(d, a);return this;
        });
    });o("clear()", function () {
        return this.iterator("table", function (a) {
            oa(a);
        });
    });o("settings()", function () {
        return new _s(this.context, this.context);
    });o("init()", function () {
        var a = this.context;return a.length ? a[0].oInit : null;
    });o("data()", function () {
        return this.iterator("table", function (a) {
            return D(a.aoData, "_aData");
        }).flatten();
    });o("destroy()", function (a) {
        a = a || !1;return this.iterator("table", function (b) {
            var c = b.nTableWrapper.parentNode,
                d = b.oClasses,
                e = b.nTable,
                f = b.nTBody,
                g = b.nTHead,
                j = b.nTFoot,
                i = h(e),
                f = h(f),
                k = h(b.nTableWrapper),
                l = h.map(b.aoData, function (a) {
                return a.nTr;
            }),
                o;b.bDestroying = !0;r(b, "aoDestroyCallback", "destroy", [b]);a || new _s(b).columns().visible(!0);k.off(".DT").find(":not(tbody *)").off(".DT");
            h(E).off(".DT-" + b.sInstance);e != g.parentNode && (i.children("thead").detach(), i.append(g));j && e != j.parentNode && (i.children("tfoot").detach(), i.append(j));b.aaSorting = [];b.aaSortingFixed = [];wa(b);h(l).removeClass(b.asStripeClasses.join(" "));h("th, td", g).removeClass(d.sSortable + " " + d.sSortableAsc + " " + d.sSortableDesc + " " + d.sSortableNone);f.children().detach();f.append(l);g = a ? "remove" : "detach";i[g]();k[g]();!a && c && (c.insertBefore(e, b.nTableReinsertBefore), i.css("width", b.sDestroyWidth).removeClass(d.sTable), (o = b.asDestroyStripes.length) && f.children().each(function (a) {
                h(this).addClass(b.asDestroyStripes[a % o]);
            }));c = h.inArray(b, n.settings);-1 !== c && n.settings.splice(c, 1);
        });
    });h.each(["column", "row", "cell"], function (a, b) {
        o(b + "s().every()", function (a) {
            var d = this.selector.opts,
                e = this;return this.iterator(b, function (f, g, h, i, m) {
                a.call(e[b](g, "cell" === b ? h : d, "cell" === b ? d : k), g, h, i, m);
            });
        });
    });o("i18n()", function (a, b, c) {
        var d = this.context[0],
            a = S(a)(d.oLanguage);a === k && (a = b);c !== k && h.isPlainObject(a) && (a = a[c] !== k ? a[c] : a._);return a.replace("%d", c);
    });n.version = "1.10.19";n.settings = [];n.models = {};n.models.oSearch = { bCaseInsensitive: !0, sSearch: "", bRegex: !1, bSmart: !0 };n.models.oRow = { nTr: null, anCells: null, _aData: [], _aSortData: null, _aFilterData: null, _sFilterRow: null, _sRowStripe: "", src: null, idx: -1 };n.models.oColumn = { idx: null, aDataSort: null, asSorting: null, bSearchable: null, bSortable: null, bVisible: null, _sManualType: null, _bAttrSrc: !1, fnCreatedCell: null, fnGetData: null, fnSetData: null, mData: null, mRender: null, nTh: null, nTf: null,
        sClass: null, sContentPadding: null, sDefaultContent: null, sName: null, sSortDataType: "std", sSortingClass: null, sSortingClassJUI: null, sTitle: null, sType: null, sWidth: null, sWidthOrig: null };n.defaults = { aaData: null, aaSorting: [[0, "asc"]], aaSortingFixed: [], ajax: null, aLengthMenu: [10, 25, 50, 100], aoColumns: null, aoColumnDefs: null, aoSearchCols: [], asStripeClasses: null, bAutoWidth: !0, bDeferRender: !1, bDestroy: !1, bFilter: !0, bInfo: !0, bLengthChange: !0, bPaginate: !0, bProcessing: !1, bRetrieve: !1, bScrollCollapse: !1, bServerSide: !1,
        bSort: !0, bSortMulti: !0, bSortCellsTop: !1, bSortClasses: !0, bStateSave: !1, fnCreatedRow: null, fnDrawCallback: null, fnFooterCallback: null, fnFormatNumber: function fnFormatNumber(a) {
            return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
        }, fnHeaderCallback: null, fnInfoCallback: null, fnInitComplete: null, fnPreDrawCallback: null, fnRowCallback: null, fnServerData: null, fnServerParams: null, fnStateLoadCallback: function fnStateLoadCallback(a) {
            try {
                return JSON.parse((-1 === a.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + a.sInstance + "_" + location.pathname));
            } catch (b) {}
        }, fnStateLoadParams: null, fnStateLoaded: null, fnStateSaveCallback: function fnStateSaveCallback(a, b) {
            try {
                (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + a.sInstance + "_" + location.pathname, JSON.stringify(b));
            } catch (c) {}
        }, fnStateSaveParams: null, iStateDuration: 7200, iDeferLoading: null, iDisplayLength: 10, iDisplayStart: 0, iTabIndex: 0, oClasses: {}, oLanguage: { oAria: { sSortAscending: ": activate to sort column ascending", sSortDescending: ": activate to sort column descending" },
            oPaginate: { sFirst: "First", sLast: "Last", sNext: "Next", sPrevious: "Previous" }, sEmptyTable: "No data available in table", sInfo: "Showing _START_ to _END_ of _TOTAL_ entries", sInfoEmpty: "Showing 0 to 0 of 0 entries", sInfoFiltered: "(filtered from _MAX_ total entries)", sInfoPostFix: "", sDecimal: "", sThousands: ",", sLengthMenu: "Show _MENU_ entries", sLoadingRecords: "Loading...", sProcessing: "Processing...", sSearch: "Search:", sSearchPlaceholder: "", sUrl: "", sZeroRecords: "No matching records found" }, oSearch: h.extend({}, n.models.oSearch), sAjaxDataProp: "data", sAjaxSource: null, sDom: "lfrtip", searchDelay: null, sPaginationType: "simple_numbers", sScrollX: "", sScrollXInner: "", sScrollY: "", sServerMethod: "GET", renderer: null, rowId: "DT_RowId" };Z(n.defaults);n.defaults.column = { aDataSort: null, iDataSort: -1, asSorting: ["asc", "desc"], bSearchable: !0, bSortable: !0, bVisible: !0, fnCreatedCell: null, mData: null, mRender: null, sCellType: "td", sClass: "", sContentPadding: "", sDefaultContent: null, sName: "", sSortDataType: "std", sTitle: null, sType: null, sWidth: null };
    Z(n.defaults.column);n.models.oSettings = { oFeatures: { bAutoWidth: null, bDeferRender: null, bFilter: null, bInfo: null, bLengthChange: null, bPaginate: null, bProcessing: null, bServerSide: null, bSort: null, bSortMulti: null, bSortClasses: null, bStateSave: null }, oScroll: { bCollapse: null, iBarWidth: 0, sX: null, sXInner: null, sY: null }, oLanguage: { fnInfoCallback: null }, oBrowser: { bScrollOversize: !1, bScrollbarLeft: !1, bBounding: !1, barWidth: 0 }, ajax: null, aanFeatures: [], aoData: [], aiDisplay: [], aiDisplayMaster: [], aIds: {}, aoColumns: [], aoHeader: [],
        aoFooter: [], oPreviousSearch: {}, aoPreSearchCols: [], aaSorting: null, aaSortingFixed: [], asStripeClasses: null, asDestroyStripes: [], sDestroyWidth: 0, aoRowCallback: [], aoHeaderCallback: [], aoFooterCallback: [], aoDrawCallback: [], aoRowCreatedCallback: [], aoPreDrawCallback: [], aoInitComplete: [], aoStateSaveParams: [], aoStateLoadParams: [], aoStateLoaded: [], sTableId: "", nTable: null, nTHead: null, nTFoot: null, nTBody: null, nTableWrapper: null, bDeferLoading: !1, bInitialised: !1, aoOpenRows: [], sDom: null, searchDelay: null, sPaginationType: "two_button",
        iStateDuration: 0, aoStateSave: [], aoStateLoad: [], oSavedState: null, oLoadedState: null, sAjaxSource: null, sAjaxDataProp: null, bAjaxDataGet: !0, jqXHR: null, json: k, oAjaxData: k, fnServerData: null, aoServerParams: [], sServerMethod: null, fnFormatNumber: null, aLengthMenu: null, iDraw: 0, bDrawing: !1, iDrawError: -1, _iDisplayLength: 10, _iDisplayStart: 0, _iRecordsTotal: 0, _iRecordsDisplay: 0, oClasses: {}, bFiltered: !1, bSorted: !1, bSortCellsTop: null, oInit: null, aoDestroyCallback: [], fnRecordsTotal: function fnRecordsTotal() {
            return "ssp" == y(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length;
        }, fnRecordsDisplay: function fnRecordsDisplay() {
            return "ssp" == y(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length;
        }, fnDisplayEnd: function fnDisplayEnd() {
            var a = this._iDisplayLength,
                b = this._iDisplayStart,
                c = b + a,
                d = this.aiDisplay.length,
                e = this.oFeatures,
                f = e.bPaginate;return e.bServerSide ? !1 === f || -1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !f || c > d || -1 === a ? d : c;
        }, oInstance: null, sInstance: null, iTabIndex: 0, nScrollHead: null, nScrollFoot: null, aLastSort: [], oPlugins: {}, rowIdFn: null, rowId: null };n.ext = x = { buttons: {},
        classes: {}, builder: "-source-", errMode: "alert", feature: [], search: [], selector: { cell: [], column: [], row: [] }, internal: {}, legacy: { ajax: null }, pager: {}, renderer: { pageButton: {}, header: {} }, order: {}, type: { detect: [], search: {}, order: {} }, _unique: 0, fnVersionCheck: n.fnVersionCheck, iApiIndex: 0, oJUIClasses: {}, sVersion: n.version };h.extend(x, { afnFiltering: x.search, aTypes: x.type.detect, ofnSearch: x.type.search, oSort: x.type.order, afnSortData: x.order, aoFeatures: x.feature, oApi: x.internal, oStdClasses: x.classes, oPagination: x.pager });
    h.extend(n.ext.classes, { sTable: "dataTable", sNoFooter: "no-footer", sPageButton: "paginate_button", sPageButtonActive: "current", sPageButtonDisabled: "disabled", sStripeOdd: "odd", sStripeEven: "even", sRowEmpty: "dataTables_empty", sWrapper: "dataTables_wrapper", sFilter: "dataTables_filter", sInfo: "dataTables_info", sPaging: "dataTables_paginate paging_", sLength: "dataTables_length", sProcessing: "dataTables_processing", sSortAsc: "sorting_asc", sSortDesc: "sorting_desc", sSortable: "sorting", sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled", sSortableNone: "sorting_disabled", sSortColumn: "sorting_", sFilterInput: "", sLengthSelect: "", sScrollWrapper: "dataTables_scroll", sScrollHead: "dataTables_scrollHead", sScrollHeadInner: "dataTables_scrollHeadInner", sScrollBody: "dataTables_scrollBody", sScrollFoot: "dataTables_scrollFoot", sScrollFootInner: "dataTables_scrollFootInner", sHeaderTH: "", sFooterTH: "", sSortJUIAsc: "", sSortJUIDesc: "", sSortJUI: "", sSortJUIAscAllowed: "", sSortJUIDescAllowed: "", sSortJUIWrapper: "", sSortIcon: "",
        sJUIHeader: "", sJUIFooter: "" });var Lb = n.ext.pager;h.extend(Lb, { simple: function simple() {
            return ["previous", "next"];
        }, full: function full() {
            return ["first", "previous", "next", "last"];
        }, numbers: function numbers(a, b) {
            return [ia(a, b)];
        }, simple_numbers: function simple_numbers(a, b) {
            return ["previous", ia(a, b), "next"];
        }, full_numbers: function full_numbers(a, b) {
            return ["first", "previous", ia(a, b), "next", "last"];
        }, first_last_numbers: function first_last_numbers(a, b) {
            return ["first", ia(a, b), "last"];
        }, _numbers: ia, numbers_length: 7 });h.extend(!0, n.ext.renderer, { pageButton: { _: function _(a, b, c, d, e, f) {
                var g = a.oClasses,
                    j = a.oLanguage.oPaginate,
                    i = a.oLanguage.oAria.paginate || {},
                    m,
                    l,
                    n = 0,
                    o = function o(b, d) {
                    var k,
                        s,
                        u,
                        r,
                        v = function v(b) {
                        Ta(a, b.data.action, true);
                    };k = 0;for (s = d.length; k < s; k++) {
                        r = d[k];if (h.isArray(r)) {
                            u = h("<" + (r.DT_el || "div") + "/>").appendTo(b);o(u, r);
                        } else {
                            m = null;l = "";switch (r) {case "ellipsis":
                                    b.append('<span class="ellipsis">&#x2026;</span>');break;case "first":
                                    m = j.sFirst;l = r + (e > 0 ? "" : " " + g.sPageButtonDisabled);break;case "previous":
                                    m = j.sPrevious;l = r + (e > 0 ? "" : " " + g.sPageButtonDisabled);break;case "next":
                                    m = j.sNext;l = r + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);break;case "last":
                                    m = j.sLast;l = r + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);break;default:
                                    m = r + 1;l = e === r ? g.sPageButtonActive : "";}if (m !== null) {
                                u = h("<a>", { "class": g.sPageButton + " " + l, "aria-controls": a.sTableId, "aria-label": i[r], "data-dt-idx": n, tabindex: a.iTabIndex, id: c === 0 && typeof r === "string" ? a.sTableId + "_" + r : null }).html(m).appendTo(b);Wa(u, { action: r }, v);n++;
                            }
                        }
                    }
                },
                    s;try {
                    s = h(b).find(H.activeElement).data("dt-idx");
                } catch (u) {}o(h(b).empty(), d);s !== k && h(b).find("[data-dt-idx=" + s + "]").focus();
            } } });h.extend(n.ext.type.detect, [function (a, b) {
        var c = b.oLanguage.sDecimal;return $a(a, c) ? "num" + c : null;
    }, function (a) {
        if (a && !(a instanceof Date) && !Zb.test(a)) return null;var b = Date.parse(a);return null !== b && !isNaN(b) || M(a) ? "date" : null;
    }, function (a, b) {
        var c = b.oLanguage.sDecimal;return $a(a, c, !0) ? "num-fmt" + c : null;
    }, function (a, b) {
        var c = b.oLanguage.sDecimal;return Qb(a, c) ? "html-num" + c : null;
    }, function (a, b) {
        var c = b.oLanguage.sDecimal;return Qb(a, c, !0) ? "html-num-fmt" + c : null;
    }, function (a) {
        return M(a) || "string" === typeof a && -1 !== a.indexOf("<") ? "html" : null;
    }]);h.extend(n.ext.type.search, { html: function html(a) {
            return M(a) ? a : "string" === typeof a ? a.replace(Nb, " ").replace(Aa, "") : "";
        }, string: function string(a) {
            return M(a) ? a : "string" === typeof a ? a.replace(Nb, " ") : a;
        } });var za = function za(a, b, c, d) {
        if (0 !== a && (!a || "-" === a)) return -Infinity;b && (a = Pb(a, b));a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, "")));return 1 * a;
    };h.extend(x.type.order, { "date-pre": function datePre(a) {
            a = Date.parse(a);return isNaN(a) ? -Infinity : a;
        }, "html-pre": function htmlPre(a) {
            return M(a) ? "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + "";
        }, "string-pre": function stringPre(a) {
            return M(a) ? "" : "string" === typeof a ? a.toLowerCase() : !a.toString ? "" : a.toString();
        }, "string-asc": function stringAsc(a, b) {
            return a < b ? -1 : a > b ? 1 : 0;
        }, "string-desc": function stringDesc(a, b) {
            return a < b ? 1 : a > b ? -1 : 0;
        } });Da("");h.extend(!0, n.ext.renderer, { header: { _: function _(a, b, c, d) {
                h(a.nTable).on("order.dt.DT", function (e, f, g, h) {
                    if (a === f) {
                        e = c.idx;b.removeClass(c.sSortingClass + " " + d.sSortAsc + " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass);
                    }
                });
            }, jqueryui: function jqueryui(a, b, c, d) {
                h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon + " " + c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT", function (e, f, g, h) {
                    if (a === f) {
                        e = c.idx;b.removeClass(d.sSortAsc + " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass);b.find("span." + d.sSortIcon).removeClass(d.sSortJUIAsc + " " + d.sSortJUIDesc + " " + d.sSortJUI + " " + d.sSortJUIAscAllowed + " " + d.sSortJUIDescAllowed).addClass(h[e] == "asc" ? d.sSortJUIAsc : h[e] == "desc" ? d.sSortJUIDesc : c.sSortingClassJUI);
                    }
                });
            } } });var eb = function eb(a) {
        return "string" === typeof a ? a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : a;
    };n.render = { number: function number(a, b, c, d, e) {
            return { display: function display(f) {
                    if ("number" !== typeof f && "string" !== typeof f) return f;var g = 0 > f ? "-" : "",
                        h = parseFloat(f);if (isNaN(h)) return eb(f);h = h.toFixed(c);f = Math.abs(h);h = parseInt(f, 10);f = c ? b + (f - h).toFixed(c).substring(2) : "";return g + (d || "") + h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + f + (e || "");
                } };
        }, text: function text() {
            return { display: eb, filter: eb };
        } };h.extend(n.ext.internal, { _fnExternApiFunc: Mb, _fnBuildAjax: sa, _fnAjaxUpdate: mb, _fnAjaxParameters: vb, _fnAjaxUpdateDraw: wb, _fnAjaxDataSrc: ta, _fnAddColumn: Ea, _fnColumnOptions: ka, _fnAdjustColumnSizing: $, _fnVisibleToColumnIndex: aa, _fnColumnIndexToVisible: ba, _fnVisbleColumns: V, _fnGetColumns: ma, _fnColumnTypes: Ga, _fnApplyColumnDefs: jb, _fnHungarianMap: Z, _fnCamelToHungarian: J, _fnLanguageCompat: Ca, _fnBrowserDetect: hb, _fnAddData: O, _fnAddTr: na, _fnNodeToDataIndex: function _fnNodeToDataIndex(a, b) {
            return b._DT_RowIndex !== k ? b._DT_RowIndex : null;
        }, _fnNodeToColumnIndex: function _fnNodeToColumnIndex(a, b, c) {
            return h.inArray(c, a.aoData[b].anCells);
        }, _fnGetCellData: B, _fnSetCellData: kb, _fnSplitObjNotation: Ja, _fnGetObjectDataFn: S, _fnSetObjectDataFn: N, _fnGetDataMaster: Ka, _fnClearTable: oa, _fnDeleteIndex: pa, _fnInvalidate: da, _fnGetRowElements: Ia, _fnCreateTr: Ha, _fnBuildHead: lb, _fnDrawHead: fa, _fnDraw: P, _fnReDraw: T, _fnAddOptionsHtml: ob, _fnDetectHeader: ea, _fnGetUniqueThs: ra, _fnFeatureHtmlFilter: qb, _fnFilterComplete: ga, _fnFilterCustom: zb,
        _fnFilterColumn: yb, _fnFilter: xb, _fnFilterCreateSearch: Pa, _fnEscapeRegex: Qa, _fnFilterData: Ab, _fnFeatureHtmlInfo: tb, _fnUpdateInfo: Db, _fnInfoMacros: Eb, _fnInitialise: ha, _fnInitComplete: ua, _fnLengthChange: Ra, _fnFeatureHtmlLength: pb, _fnFeatureHtmlPaginate: ub, _fnPageChange: Ta, _fnFeatureHtmlProcessing: rb, _fnProcessingDisplay: C, _fnFeatureHtmlTable: sb, _fnScrollDraw: la, _fnApplyToChildren: I, _fnCalculateColumnWidths: Fa, _fnThrottle: Oa, _fnConvertToWidth: Fb, _fnGetWidestNode: Gb, _fnGetMaxLenString: Hb, _fnStringToCss: v,
        _fnSortFlatten: X, _fnSort: nb, _fnSortAria: Jb, _fnSortListener: Va, _fnSortAttachListener: Ma, _fnSortingClasses: wa, _fnSortData: Ib, _fnSaveState: xa, _fnLoadState: Kb, _fnSettingsFromNode: ya, _fnLog: K, _fnMap: F, _fnBindAction: Wa, _fnCallbackReg: z, _fnCallbackFire: r, _fnLengthOverflow: Sa, _fnRenderer: Na, _fnDataSource: y, _fnRowAttributes: La, _fnExtend: Xa, _fnCalculateEnd: function _fnCalculateEnd() {} });h.fn.dataTable = n;n.$ = h;h.fn.dataTableSettings = n.settings;h.fn.dataTableExt = n.ext;h.fn.DataTable = function (a) {
        return h(this).dataTable(a).api();
    };
    h.each(n, function (a, b) {
        h.fn.DataTable[a] = b;
    });return h.fn.dataTable;
});

/*!
 DataTables Bootstrap 3 integration
 ©2011-2015 SpryMedia Ltd - datatables.net/license
*/
(function (b) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function (a) {
        return b(a, window, document);
    }) : "object" === (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ? module.exports = function (a, d) {
        a || (a = window);if (!d || !d.fn.dataTable) d = require("datatables.net")(a, d).$;return b(d, a, a.document);
    } : b(jQuery, window, document);
})(function (b, a, d, m) {
    var f = b.fn.dataTable;b.extend(!0, f.defaults, { dom: "<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>", renderer: "bootstrap" });b.extend(f.ext.classes, { sWrapper: "dataTables_wrapper form-inline dt-bootstrap", sFilterInput: "form-control input-sm", sLengthSelect: "form-control input-sm", sProcessing: "dataTables_processing panel panel-default" });f.ext.renderer.pageButton.bootstrap = function (a, h, r, s, j, n) {
        var o = new f.Api(a),
            t = a.oClasses,
            k = a.oLanguage.oPaginate,
            u = a.oLanguage.oAria.paginate || {},
            e,
            g,
            p = 0,
            q = function q(d, f) {
            var l,
                h,
                i,
                c,
                m = function m(a) {
                a.preventDefault();!b(a.currentTarget).hasClass("disabled") && o.page() != a.data.action && o.page(a.data.action).draw("page");
            };
            l = 0;for (h = f.length; l < h; l++) {
                if (c = f[l], b.isArray(c)) q(d, c);else {
                    g = e = "";switch (c) {case "ellipsis":
                            e = "&#x2026;";g = "disabled";break;case "first":
                            e = k.sFirst;g = c + (0 < j ? "" : " disabled");break;case "previous":
                            e = k.sPrevious;g = c + (0 < j ? "" : " disabled");break;case "next":
                            e = k.sNext;g = c + (j < n - 1 ? "" : " disabled");break;case "last":
                            e = k.sLast;g = c + (j < n - 1 ? "" : " disabled");break;default:
                            e = c + 1, g = j === c ? "active" : "";}e && (i = b("<li>", { "class": t.sPageButton + " " + g, id: 0 === r && "string" === typeof c ? a.sTableId + "_" + c : null }).append(b("<a>", { href: "#",
                        "aria-controls": a.sTableId, "aria-label": u[c], "data-dt-idx": p, tabindex: a.iTabIndex }).html(e)).appendTo(d), a.oApi._fnBindAction(i, { action: c }, m), p++);
                }
            }
        },
            i;try {
            i = b(h).find(d.activeElement).data("dt-idx");
        } catch (v) {}q(b(h).empty().html('<ul class="pagination"/>').children("ul"), s);i !== m && b(h).find("[data-dt-idx=" + i + "]").focus();
    };return f;
});

/*! Summernote v0.8.12 | (c) 2013- Alan Hong and other contributors | MIT license */

!function (t, e) {
    "object" == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) && "undefined" != typeof module ? e(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], e) : e((t = t || self).jQuery);
}(undefined, function (C) {
    "use strict";
    C = C && C.hasOwnProperty("default") ? C.default : C;var i = function () {
        function t(t, e, o, n) {
            this.markup = t, this.children = e, this.options = o, this.callback = n;
        }return t.prototype.render = function (t) {
            var o = C(this.markup);if (this.options && this.options.contents && o.html(this.options.contents), this.options && this.options.className && o.addClass(this.options.className), this.options && this.options.data && C.each(this.options.data, function (t, e) {
                o.attr("data-" + t, e);
            }), this.options && this.options.click && o.on("click", this.options.click), this.children) {
                var e = o.find(".note-children-container");this.children.forEach(function (t) {
                    t.render(e.length ? e : o);
                });
            }return this.callback && this.callback(o, this.options), this.options && this.options.callback && this.options.callback(o), t && t.append(o), o;
        }, t;
    }(),
        o = function o(_o, n) {
        return function () {
            var t = "object" == _typeof(arguments[1]) ? arguments[1] : arguments[0],
                e = Array.isArray(arguments[0]) ? arguments[0] : [];return t && t.children && (e = t.children), new i(_o, e, t, n);
        };
    },
        t = o('<div class="note-editor note-frame panel panel-default"/>'),
        e = o('<div class="note-toolbar panel-heading" role="toolbar"></div></div>'),
        n = o('<div class="note-editing-area"/>'),
        r = o('<textarea class="note-codable" role="textbox" aria-multiline="true"/>'),
        s = o('<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>'),
        a = o(['<output class="note-status-output" aria-live="polite"/>', '<div class="note-statusbar" role="status">', '  <div class="note-resizebar" role="seperator" aria-orientation="horizontal" aria-label="Resize">', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', "  </div>", "</div>"].join("")),
        l = o('<div class="note-editor"/>'),
        c = o(['<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>', '<output class="note-status-output" aria-live="polite"/>'].join("")),
        d = o('<div class="note-btn-group btn-group">'),
        u = o('<ul class="dropdown-menu" role="list">', function (t, i) {
        var e = Array.isArray(i.items) ? i.items.map(function (t) {
            var e = "string" == typeof t ? t : t.value || "",
                o = i.template ? i.template(t) : t,
                n = "object" == (typeof t === 'undefined' ? 'undefined' : _typeof(t)) ? t.option : void 0;return '<li role="listitem" aria-label="' + e + '"><a href="#" ' + ('data-value="' + e + '"' + (void 0 !== n ? ' data-option="' + n + '"' : "")) + ">" + o + "</a></li>";
        }).join("") : i.items;t.html(e).attr({ "aria-label": i.title });
    }),
        h = o('<ul class="dropdown-menu note-check" role="list">', function (t, n) {
        var e = Array.isArray(n.items) ? n.items.map(function (t) {
            var e = "string" == typeof t ? t : t.value || "",
                o = n.template ? n.template(t) : t;return '<li role="listitem" aria-label="' + t + '"><a href="#" data-value="' + e + '">' + v(n.checkClassName) + " " + o + "</a></li>";
        }).join("") : n.items;t.html(e).attr({ "aria-label": n.title });
    }),
        p = o('<div class="note-color-palette"/>', function (t, e) {
        for (var o = [], n = 0, i = e.colors.length; n < i; n++) {
            for (var r = e.eventName, s = e.colors[n], a = e.colorsName[n], l = [], c = 0, d = s.length; c < d; c++) {
                var u = s[c],
                    h = a[c];l.push(['<button type="button" class="note-color-btn"', 'style="background-color:', u, '" ', 'data-event="', r, '" ', 'data-value="', u, '" ', 'title="', h, '" ', 'aria-label="', h, '" ', 'data-toggle="button" tabindex="-1"></button>'].join(""));
            }o.push('<div class="note-color-row">' + l.join("") + "</div>");
        }t.html(o.join("")), e.tooltip && t.find(".note-color-btn").tooltip({ container: e.container, trigger: "hover", placement: "bottom" });
    }),
        f = o('<div class="modal" aria-hidden="false" tabindex="-1" role="dialog"/>', function (t, e) {
        e.fade && t.addClass("fade"), t.attr({ "aria-label": e.title }), t.html(['<div class="modal-dialog">', '  <div class="modal-content">', e.title ? '    <div class="modal-header">      <button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;</button>      <h4 class="modal-title">' + e.title + "</h4>    </div>" : "", '    <div class="modal-body">' + e.body + "</div>", e.footer ? '    <div class="modal-footer">' + e.footer + "</div>" : "", "  </div>", "</div>"].join(""));
    }),
        m = o(['<div class="note-popover popover in">', '  <div class="arrow"/>', '  <div class="popover-content note-children-container"/>', "</div>"].join(""), function (t, e) {
        var o = void 0 !== e.direction ? e.direction : "bottom";t.addClass(o), e.hideArrow && t.find(".arrow").hide();
    }),
        g = o('<div class="checkbox"></div>', function (t, e) {
        t.html(["<label" + (e.id ? ' for="' + e.id + '"' : "") + ">", ' <input role="checkbox" type="checkbox"' + (e.id ? ' id="' + e.id + '"' : ""), e.checked ? " checked" : "", ' aria-checked="' + (e.checked ? "true" : "false") + '"/>', e.text ? e.text : "", "</label>"].join(""));
    }),
        v = function v(t, e) {
        return "<" + (e = e || "i") + ' class="' + t + '"/>';
    },
        b = { editor: t, toolbar: e, editingArea: n, codable: r, editable: s, statusbar: a, airEditor: l, airEditable: c, buttonGroup: d, dropdown: u, dropdownButtonContents: function dropdownButtonContents(t, e) {
            return t + " " + v(e.icons.caret, "span");
        }, dropdownCheck: h, palette: p, dialog: f, popover: m, checkbox: g, icon: v, options: {}, button: function button(t, e) {
            return o('<button type="button" class="note-btn btn btn-default btn-sm" role="button" tabindex="-1">', function (t, e) {
                e && e.tooltip && t.attr({ title: e.tooltip, "aria-label": e.tooltip }).tooltip({ container: void 0 !== e.container ? e.container : "body", trigger: "hover", placement: "bottom" }).on("click", function (t) {
                    C(t.currentTarget).tooltip("hide");
                });
            })(t, e);
        }, toggleBtn: function toggleBtn(t, e) {
            t.toggleClass("disabled", !e), t.attr("disabled", !e);
        }, toggleBtnActive: function toggleBtnActive(t, e) {
            t.toggleClass("active", e);
        }, onDialogShown: function onDialogShown(t, e) {
            t.one("shown.bs.modal", e);
        }, onDialogHidden: function onDialogHidden(t, e) {
            t.one("hidden.bs.modal", e);
        }, showDialog: function showDialog(t) {
            t.modal("show");
        }, hideDialog: function hideDialog(t) {
            t.modal("hide");
        }, createLayout: function createLayout(t, e) {
            var o = (e.airMode ? b.airEditor([b.editingArea([b.airEditable()])]) : b.editor([b.toolbar(), b.editingArea([b.codable(), b.editable()]), b.statusbar()])).render();return o.insertAfter(t), { note: t, editor: o, toolbar: o.find(".note-toolbar"), editingArea: o.find(".note-editing-area"), editable: o.find(".note-editable"), codable: o.find(".note-codable"), statusbar: o.find(".note-statusbar") };
        }, removeLayout: function removeLayout(t, e) {
            t.html(e.editable.html()), e.editor.remove(), t.show();
        } };C.summernote = C.summernote || { lang: {} }, C.extend(C.summernote.lang, { "en-US": { font: { bold: "Bold", italic: "Italic", underline: "Underline", clear: "Remove Font Style", height: "Line Height", name: "Font Family", strikethrough: "Strikethrough", subscript: "Subscript", superscript: "Superscript", size: "Font Size" }, image: { image: "Picture", insert: "Insert Image", resizeFull: "Resize full", resizeHalf: "Resize half", resizeQuarter: "Resize quarter", resizeNone: "Original size", floatLeft: "Float Left", floatRight: "Float Right", floatNone: "Remove float", shapeRounded: "Shape: Rounded", shapeCircle: "Shape: Circle", shapeThumbnail: "Shape: Thumbnail", shapeNone: "Shape: None", dragImageHere: "Drag image or text here", dropImage: "Drop image or Text", selectFromFiles: "Select from files", maximumFileSize: "Maximum file size", maximumFileSizeError: "Maximum file size exceeded.", url: "Image URL", remove: "Remove Image", original: "Original" }, video: { video: "Video", videoLink: "Video Link", insert: "Insert Video", url: "Video URL", providers: "(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)" }, link: { link: "Link", insert: "Insert Link", unlink: "Unlink", edit: "Edit", textToDisplay: "Text to display", url: "To what URL should this link go?", openInNewWindow: "Open in new window" }, table: { table: "Table", addRowAbove: "Add row above", addRowBelow: "Add row below", addColLeft: "Add column left", addColRight: "Add column right", delRow: "Delete row", delCol: "Delete column", delTable: "Delete table" }, hr: { insert: "Insert Horizontal Rule" }, style: { style: "Style", p: "Normal", blockquote: "Quote", pre: "Code", h1: "Header 1", h2: "Header 2", h3: "Header 3", h4: "Header 4", h5: "Header 5", h6: "Header 6" }, lists: { unordered: "Unordered list", ordered: "Ordered list" }, options: { help: "Help", fullscreen: "Full Screen", codeview: "Code View" }, paragraph: { paragraph: "Paragraph", outdent: "Outdent", indent: "Indent", left: "Align left", center: "Align center", right: "Align right", justify: "Justify full" }, color: { recent: "Recent Color", more: "More Color", background: "Background Color", foreground: "Foreground Color", transparent: "Transparent", setTransparent: "Set transparent", reset: "Reset", resetToDefault: "Reset to default", cpSelect: "Select" }, shortcut: { shortcuts: "Keyboard shortcuts", close: "Close", textFormatting: "Text formatting", action: "Action", paragraphFormatting: "Paragraph formatting", documentStyle: "Document Style", extraKeys: "Extra keys" }, help: { insertParagraph: "Insert Paragraph", undo: "Undoes the last command", redo: "Redoes the last command", tab: "Tab", untab: "Untab", bold: "Set a bold style", italic: "Set a italic style", underline: "Set a underline style", strikethrough: "Set a strikethrough style", removeFormat: "Clean a style", justifyLeft: "Set left align", justifyCenter: "Set center align", justifyRight: "Set right align", justifyFull: "Set full align", insertUnorderedList: "Toggle unordered list", insertOrderedList: "Toggle ordered list", outdent: "Outdent on current paragraph", indent: "Indent on current paragraph", formatPara: "Change current block's format as a paragraph(P tag)", formatH1: "Change current block's format as H1", formatH2: "Change current block's format as H2", formatH3: "Change current block's format as H3", formatH4: "Change current block's format as H4", formatH5: "Change current block's format as H5", formatH6: "Change current block's format as H6", insertHorizontalRule: "Insert horizontal rule", "linkDialog.show": "Show Link Dialog" }, history: { undo: "Undo", redo: "Redo" }, specialChar: { specialChar: "SPECIAL CHARACTERS", select: "Select Special characters" } } });var y = "function" == typeof define && define.amd;var k,
        w = navigator.userAgent,
        x = /MSIE|Trident/i.test(w);if (x) {
        var S = /MSIE (\d+[.]\d+)/.exec(w);S && (k = parseFloat(S[1])), (S = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(w)) && (k = parseFloat(S[1]));
    }var I = /Edge\/\d+/.test(w),
        T = !!window.CodeMirror,
        N = "ontouchstart" in window || 0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints,
        E = x || I ? "DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted" : "input",
        R = { isMac: -1 < navigator.appVersion.indexOf("Mac"), isMSIE: x, isEdge: I, isFF: !I && /firefox/i.test(w), isPhantom: /PhantomJS/i.test(w), isWebkit: !I && /webkit/i.test(w), isChrome: !I && /chrome/i.test(w), isSafari: !I && /safari/i.test(w), browserVersion: k, jqueryVersion: parseFloat(C.fn.jquery), isSupportAmd: y, isSupportTouch: N, hasCodeMirror: T, isFontInstalled: function isFontInstalled(t) {
            var e = "Comic Sans MS" === t ? "Courier New" : "Comic Sans MS",
                o = "mmmmmmmmmmwwwww",
                n = document.createElement("canvas").getContext("2d");n.font = "200px '" + e + "'";var i = n.measureText(o).width;return n.font = "200px '" + t + "', '" + e + "'", i !== n.measureText(o).width;
        }, isW3CRangeSupport: !!document.createRange, inputEventName: E };var L = 0;var A = { eq: function eq(e) {
            return function (t) {
                return e === t;
            };
        }, eq2: function eq2(t, e) {
            return t === e;
        }, peq2: function peq2(o) {
            return function (t, e) {
                return t[o] === e[o];
            };
        }, ok: function ok() {
            return !0;
        }, fail: function fail() {
            return !1;
        }, self: function self(t) {
            return t;
        }, not: function not(t) {
            return function () {
                return !t.apply(t, arguments);
            };
        }, and: function and(e, o) {
            return function (t) {
                return e(t) && o(t);
            };
        }, invoke: function invoke(t, e) {
            return function () {
                return t[e].apply(t, arguments);
            };
        }, uniqueId: function uniqueId(t) {
            var e = ++L + "";return t ? t + e : e;
        }, rect2bnd: function rect2bnd(t) {
            var e = $(document);return { top: t.top + e.scrollTop(), left: t.left + e.scrollLeft(), width: t.right - t.left, height: t.bottom - t.top };
        }, invertObject: function invertObject(t) {
            var e = {};for (var o in t) {
                t.hasOwnProperty(o) && (e[t[o]] = o);
            }return e;
        }, namespaceToCamel: function namespaceToCamel(t, e) {
            return (e = e || "") + t.split(".").map(function (t) {
                return t.substring(0, 1).toUpperCase() + t.substring(1);
            }).join("");
        }, debounce: function debounce(n, i, r) {
            var s;return function () {
                var t = this,
                    e = arguments,
                    o = r && !s;clearTimeout(s), s = setTimeout(function () {
                    s = null, r || n.apply(t, e);
                }, i), o && n.apply(t, e);
            };
        }, isValidUrl: function isValidUrl(t) {
            return (/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(t)
            );
        } };function F(t) {
        return t[0];
    }function P(t) {
        return t[t.length - 1];
    }function H(t) {
        return t.slice(1);
    }function D(t, e) {
        return !!(t && t.length && e) && -1 !== t.indexOf(e);
    }var B = { head: F, last: P, initial: function initial(t) {
            return t.slice(0, t.length - 1);
        }, tail: H, prev: function prev(t, e) {
            if (t && t.length && e) {
                var o = t.indexOf(e);return -1 === o ? null : t[o - 1];
            }return null;
        }, next: function next(t, e) {
            if (t && t.length && e) {
                var o = t.indexOf(e);return -1 === o ? null : t[o + 1];
            }return null;
        }, find: function find(t, e) {
            for (var o = 0, n = t.length; o < n; o++) {
                var i = t[o];if (e(i)) return i;
            }
        }, contains: D, all: function all(t, e) {
            for (var o = 0, n = t.length; o < n; o++) {
                if (!e(t[o])) return !1;
            }return !0;
        }, sum: function sum(t, o) {
            return o = o || A.self, t.reduce(function (t, e) {
                return t + o(e);
            }, 0);
        }, from: function from(t) {
            for (var e = [], o = t.length, n = -1; ++n < o;) {
                e[n] = t[n];
            }return e;
        }, isEmpty: function isEmpty(t) {
            return !t || !t.length;
        }, clusterBy: function clusterBy(t, n) {
            return t.length ? H(t).reduce(function (t, e) {
                var o = P(t);return n(P(o), e) ? o[o.length] = e : t[t.length] = [e], t;
            }, [[F(t)]]) : [];
        }, compact: function compact(t) {
            for (var e = [], o = 0, n = t.length; o < n; o++) {
                t[o] && e.push(t[o]);
            }return e;
        }, unique: function unique(t) {
            for (var e = [], o = 0, n = t.length; o < n; o++) {
                D(e, t[o]) || e.push(t[o]);
            }return e;
        } },
        z = String.fromCharCode(160);function M(t) {
        return t && C(t).hasClass("note-editable");
    }function O(e) {
        return e = e.toUpperCase(), function (t) {
            return t && t.nodeName.toUpperCase() === e;
        };
    }function U(t) {
        return t && 3 === t.nodeType;
    }function j(t) {
        return t && /^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT|^AUDIO|^VIDEO|^EMBED/.test(t.nodeName.toUpperCase());
    }function K(t) {
        return !M(t) && t && /^DIV|^P|^LI|^H[1-7]/.test(t.nodeName.toUpperCase());
    }var W = O("PRE"),
        V = O("LI");var q = O("TABLE"),
        G = O("DATA");function _(t) {
        return !(X(t) || Z(t) || Y(t) || K(t) || q(t) || J(t) || G(t));
    }function Z(t) {
        return t && /^UL|^OL/.test(t.nodeName.toUpperCase());
    }var Y = O("HR");function Q(t) {
        return t && /^TD|^TH/.test(t.nodeName.toUpperCase());
    }var J = O("BLOCKQUOTE");function X(t) {
        return Q(t) || J(t) || M(t);
    }var tt = O("A");var et = O("BODY");var ot = R.isMSIE && R.browserVersion < 11 ? "&nbsp;" : "<br>";function nt(t) {
        return U(t) ? t.nodeValue.length : t ? t.childNodes.length : 0;
    }function it(t) {
        var e = nt(t);return 0 === e || !U(t) && 1 === e && t.innerHTML === ot || !(!B.all(t.childNodes, U) || "" !== t.innerHTML);
    }function rt(t) {
        j(t) || nt(t) || (t.innerHTML = ot);
    }function st(t, e) {
        for (; t;) {
            if (e(t)) return t;if (M(t)) break;t = t.parentNode;
        }return null;
    }function at(t, e) {
        e = e || A.fail;var o = [];return st(t, function (t) {
            return M(t) || o.push(t), e(t);
        }), o;
    }function lt(t, e) {
        e = e || A.fail;for (var o = []; t && !e(t);) {
            o.push(t), t = t.nextSibling;
        }return o;
    }function ct(t, e) {
        var o = e.nextSibling,
            n = e.parentNode;return o ? n.insertBefore(t, o) : n.appendChild(t), t;
    }function dt(o, t) {
        return C.each(t, function (t, e) {
            o.appendChild(e);
        }), o;
    }function ut(t) {
        return 0 === t.offset;
    }function ht(t) {
        return t.offset === nt(t.node);
    }function pt(t) {
        return ut(t) || ht(t);
    }function ft(t, e) {
        for (; t && t !== e;) {
            if (0 !== gt(t)) return !1;t = t.parentNode;
        }return !0;
    }function mt(t, e) {
        if (!e) return !1;for (; t && t !== e;) {
            if (gt(t) !== nt(t.parentNode) - 1) return !1;t = t.parentNode;
        }return !0;
    }function gt(t) {
        for (var e = 0; t = t.previousSibling;) {
            e += 1;
        }return e;
    }function vt(t) {
        return !!(t && t.childNodes && t.childNodes.length);
    }function bt(t, e) {
        var o, n;if (0 === t.offset) {
            if (M(t.node)) return null;o = t.node.parentNode, n = gt(t.node);
        } else n = vt(t.node) ? nt(o = t.node.childNodes[t.offset - 1]) : (o = t.node, e ? 0 : t.offset - 1);return { node: o, offset: n };
    }function yt(t, e) {
        var o, n;if (nt(t.node) === t.offset) {
            if (M(t.node)) return null;o = t.node.parentNode, n = gt(t.node) + 1;
        } else n = vt(t.node) ? (o = t.node.childNodes[t.offset], 0) : (o = t.node, e ? nt(t.node) : t.offset + 1);return { node: o, offset: n };
    }function kt(t, e) {
        return t.node === e.node && t.offset === e.offset;
    }function Ct(t, e) {
        var o = e && e.isSkipPaddingBlankHTML,
            n = e && e.isNotSplitEdgePoint,
            i = e && e.isDiscardEmptySplits;if (i && (o = !0), pt(t) && (U(t.node) || n)) {
            if (ut(t)) return t.node;if (ht(t)) return t.node.nextSibling;
        }if (U(t.node)) return t.node.splitText(t.offset);var r = t.node.childNodes[t.offset],
            s = ct(t.node.cloneNode(!1), t.node);return dt(s, lt(r)), o || (rt(t.node), rt(s)), i && (it(t.node) && St(t.node), it(s)) ? (St(s), t.node.nextSibling) : s;
    }function wt(t, o, n) {
        var e = at(o.node, A.eq(t));return e.length ? 1 === e.length ? Ct(o, n) : e.reduce(function (t, e) {
            return t === o.node && (t = Ct(o, n)), Ct({ node: e, offset: t ? gt(t) : nt(e) }, n);
        }) : null;
    }function xt(t) {
        return document.createElement(t);
    }function St(t, e) {
        if (t && t.parentNode) {
            if (t.removeNode) return t.removeNode(e);var o = t.parentNode;if (!e) {
                for (var n = [], i = 0, r = t.childNodes.length; i < r; i++) {
                    n.push(t.childNodes[i]);
                }for (i = 0, r = n.length; i < r; i++) {
                    o.insertBefore(n[i], t);
                }
            }o.removeChild(t);
        }
    }var It = O("TEXTAREA");function Tt(t, e) {
        var o = It(t[0]) ? t.val() : t.html();return e ? o.replace(/[\n\r]/g, "") : o;
    }var $t = { NBSP_CHAR: z, ZERO_WIDTH_NBSP_CHAR: '\uFEFF', blank: ot, emptyPara: "<p>" + ot + "</p>", makePredByNodeName: O, isEditable: M, isControlSizing: function isControlSizing(t) {
            return t && C(t).hasClass("note-control-sizing");
        }, isText: U, isElement: function isElement(t) {
            return t && 1 === t.nodeType;
        }, isVoid: j, isPara: K, isPurePara: function isPurePara(t) {
            return K(t) && !V(t);
        }, isHeading: function isHeading(t) {
            return t && /^H[1-7]/.test(t.nodeName.toUpperCase());
        }, isInline: _, isBlock: A.not(_), isBodyInline: function isBodyInline(t) {
            return _(t) && !st(t, K);
        }, isBody: et, isParaInline: function isParaInline(t) {
            return _(t) && !!st(t, K);
        }, isPre: W, isList: Z, isTable: q, isData: G, isCell: Q, isBlockquote: J, isBodyContainer: X, isAnchor: tt, isDiv: O("DIV"), isLi: V, isBR: O("BR"), isSpan: O("SPAN"), isB: O("B"), isU: O("U"), isS: O("S"), isI: O("I"), isImg: O("IMG"), isTextarea: It, isEmpty: it, isEmptyAnchor: A.and(tt, it), isClosestSibling: function isClosestSibling(t, e) {
            return t.nextSibling === e || t.previousSibling === e;
        }, withClosestSiblings: function withClosestSiblings(t, e) {
            e = e || A.ok;var o = [];return t.previousSibling && e(t.previousSibling) && o.push(t.previousSibling), o.push(t), t.nextSibling && e(t.nextSibling) && o.push(t.nextSibling), o;
        }, nodeLength: nt, isLeftEdgePoint: ut, isRightEdgePoint: ht, isEdgePoint: pt, isLeftEdgeOf: ft, isRightEdgeOf: mt, isLeftEdgePointOf: function isLeftEdgePointOf(t, e) {
            return ut(t) && ft(t.node, e);
        }, isRightEdgePointOf: function isRightEdgePointOf(t, e) {
            return ht(t) && mt(t.node, e);
        }, prevPoint: bt, nextPoint: yt, isSamePoint: kt, isVisiblePoint: function isVisiblePoint(t) {
            if (U(t.node) || !vt(t.node) || it(t.node)) return !0;var e = t.node.childNodes[t.offset - 1],
                o = t.node.childNodes[t.offset];return !(e && !j(e) || o && !j(o));
        }, prevPointUntil: function prevPointUntil(t, e) {
            for (; t;) {
                if (e(t)) return t;t = bt(t);
            }return null;
        }, nextPointUntil: function nextPointUntil(t, e) {
            for (; t;) {
                if (e(t)) return t;t = yt(t);
            }return null;
        }, isCharPoint: function isCharPoint(t) {
            if (!U(t.node)) return !1;var e = t.node.nodeValue.charAt(t.offset - 1);return e && " " !== e && e !== z;
        }, walkPoint: function walkPoint(t, e, o, n) {
            for (var i = t; i && (o(i), !kt(i, e));) {
                i = yt(i, n && t.node !== i.node && e.node !== i.node);
            }
        }, ancestor: st, singleChildAncestor: function singleChildAncestor(t, e) {
            for (t = t.parentNode; t && 1 === nt(t);) {
                if (e(t)) return t;if (M(t)) break;t = t.parentNode;
            }return null;
        }, listAncestor: at, lastAncestor: function lastAncestor(t, e) {
            var o = at(t);return B.last(o.filter(e));
        }, listNext: lt, listPrev: function listPrev(t, e) {
            e = e || A.fail;for (var o = []; t && !e(t);) {
                o.push(t), t = t.previousSibling;
            }return o;
        }, listDescendant: function listDescendant(i, r) {
            var s = [];return r = r || A.ok, function t(e) {
                i !== e && r(e) && s.push(e);for (var o = 0, n = e.childNodes.length; o < n; o++) {
                    t(e.childNodes[o]);
                }
            }(i), s;
        }, commonAncestor: function commonAncestor(t, e) {
            for (var o = at(t), n = e; n; n = n.parentNode) {
                if (-1 < o.indexOf(n)) return n;
            }return null;
        }, wrap: function wrap(t, e) {
            var o = t.parentNode,
                n = C("<" + e + ">")[0];return o.insertBefore(n, t), n.appendChild(t), n;
        }, insertAfter: ct, appendChildNodes: dt, position: gt, hasChildren: vt, makeOffsetPath: function makeOffsetPath(t, e) {
            return at(e, A.eq(t)).map(gt).reverse();
        }, fromOffsetPath: function fromOffsetPath(t, e) {
            for (var o = t, n = 0, i = e.length; n < i; n++) {
                o = o.childNodes.length <= e[n] ? o.childNodes[o.childNodes.length - 1] : o.childNodes[e[n]];
            }return o;
        }, splitTree: wt, splitPoint: function splitPoint(t, e) {
            var o,
                n,
                i = e ? K : X,
                r = at(t.node, i),
                s = B.last(r) || t.node;n = i(s) ? (o = r[r.length - 2], s) : (o = s).parentNode;var a = o && wt(o, t, { isSkipPaddingBlankHTML: e, isNotSplitEdgePoint: e });return a || n !== t.node || (a = t.node.childNodes[t.offset]), { rightNode: a, container: n };
        }, create: xt, createText: function createText(t) {
            return document.createTextNode(t);
        }, remove: St, removeWhile: function removeWhile(t, e) {
            for (; t && !M(t) && e(t);) {
                var o = t.parentNode;St(t), t = o;
            }
        }, replace: function replace(t, e) {
            if (t.nodeName.toUpperCase() === e.toUpperCase()) return t;var o = xt(e);return t.style.cssText && (o.style.cssText = t.style.cssText), dt(o, B.from(t.childNodes)), ct(o, t), St(t), o;
        }, html: function html(t, e) {
            var o = Tt(t);e && (o = (o = o.replace(/<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g, function (t, e, o) {
                o = o.toUpperCase();var n = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(o) && !!e,
                    i = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(o);return t + (n || i ? "\n" : "");
            })).trim());return o;
        }, value: Tt, posFromPlaceholder: function posFromPlaceholder(t) {
            var e = C(t),
                o = e.offset(),
                n = e.outerHeight(!0);return { left: o.left, top: o.top + n };
        }, attachEvents: function attachEvents(e, o) {
            Object.keys(o).forEach(function (t) {
                e.on(t, o[t]);
            });
        }, detachEvents: function detachEvents(e, o) {
            Object.keys(o).forEach(function (t) {
                e.off(t, o[t]);
            });
        }, isCustomStyleTag: function isCustomStyleTag(t) {
            return t && !U(t) && B.contains(t.classList, "note-styletag");
        } },
        Nt = function () {
        function t(t, e) {
            this.ui = C.summernote.ui, this.$note = t, this.memos = {}, this.modules = {}, this.layoutInfo = {}, this.options = e, this.initialize();
        }return t.prototype.initialize = function () {
            return this.layoutInfo = this.ui.createLayout(this.$note, this.options), this._initialize(), this.$note.hide(), this;
        }, t.prototype.destroy = function () {
            this._destroy(), this.$note.removeData("summernote"), this.ui.removeLayout(this.$note, this.layoutInfo);
        }, t.prototype.reset = function () {
            var t = this.isDisabled();this.code($t.emptyPara), this._destroy(), this._initialize(), t && this.disable();
        }, t.prototype._initialize = function () {
            var e = this,
                o = C.extend({}, this.options.buttons);Object.keys(o).forEach(function (t) {
                e.memo("button." + t, o[t]);
            });var n = C.extend({}, this.options.modules, C.summernote.plugins || {});Object.keys(n).forEach(function (t) {
                e.module(t, n[t], !0);
            }), Object.keys(this.modules).forEach(function (t) {
                e.initializeModule(t);
            });
        }, t.prototype._destroy = function () {
            var e = this;Object.keys(this.modules).reverse().forEach(function (t) {
                e.removeModule(t);
            }), Object.keys(this.memos).forEach(function (t) {
                e.removeMemo(t);
            }), this.triggerEvent("destroy", this);
        }, t.prototype.code = function (t) {
            var e = this.invoke("codeview.isActivated");if (void 0 === t) return this.invoke("codeview.sync"), e ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();e ? this.layoutInfo.codable.val(t) : this.layoutInfo.editable.html(t), this.$note.val(t), this.triggerEvent("change", t, this.layoutInfo.editable);
        }, t.prototype.isDisabled = function () {
            return "false" === this.layoutInfo.editable.attr("contenteditable");
        }, t.prototype.enable = function () {
            this.layoutInfo.editable.attr("contenteditable", !0), this.invoke("toolbar.activate", !0), this.triggerEvent("disable", !1);
        }, t.prototype.disable = function () {
            this.invoke("codeview.isActivated") && this.invoke("codeview.deactivate"), this.layoutInfo.editable.attr("contenteditable", !1), this.invoke("toolbar.deactivate", !0), this.triggerEvent("disable", !0);
        }, t.prototype.triggerEvent = function () {
            var t = B.head(arguments),
                e = B.tail(B.from(arguments)),
                o = this.options.callbacks[A.namespaceToCamel(t, "on")];o && o.apply(this.$note[0], e), this.$note.trigger("summernote." + t, e);
        }, t.prototype.initializeModule = function (t) {
            var e = this.modules[t];e.shouldInitialize = e.shouldInitialize || A.ok, e.shouldInitialize() && (e.initialize && e.initialize(), e.events && $t.attachEvents(this.$note, e.events));
        }, t.prototype.module = function (t, e, o) {
            if (1 === arguments.length) return this.modules[t];this.modules[t] = new e(this), o || this.initializeModule(t);
        }, t.prototype.removeModule = function (t) {
            var e = this.modules[t];e.shouldInitialize() && (e.events && $t.detachEvents(this.$note, e.events), e.destroy && e.destroy()), delete this.modules[t];
        }, t.prototype.memo = function (t, e) {
            if (1 === arguments.length) return this.memos[t];this.memos[t] = e;
        }, t.prototype.removeMemo = function (t) {
            this.memos[t] && this.memos[t].destroy && this.memos[t].destroy(), delete this.memos[t];
        }, t.prototype.createInvokeHandlerAndUpdateState = function (e, o) {
            var n = this;return function (t) {
                n.createInvokeHandler(e, o)(t), n.invoke("buttons.updateCurrentStyle");
            };
        }, t.prototype.createInvokeHandler = function (o, n) {
            var i = this;return function (t) {
                t.preventDefault();var e = C(t.target);i.invoke(o, n || e.closest("[data-value]").data("value"), e);
            };
        }, t.prototype.invoke = function () {
            var t = B.head(arguments),
                e = B.tail(B.from(arguments)),
                o = t.split("."),
                n = 1 < o.length,
                i = n && B.head(o),
                r = n ? B.last(o) : B.head(o),
                s = this.modules[i || "editor"];return !i && this[r] ? this[r].apply(this, e) : s && s[r] && s.shouldInitialize() ? s[r].apply(s, e) : void 0;
        }, t;
    }();function Et(t, e) {
        var o,
            n,
            i = t.parentElement(),
            r = document.body.createTextRange(),
            s = B.from(i.childNodes);for (o = 0; o < s.length; o++) {
            if (!$t.isText(s[o])) {
                if (r.moveToElementText(s[o]), 0 <= r.compareEndPoints("StartToStart", t)) break;n = s[o];
            }
        }if (0 !== o && $t.isText(s[o - 1])) {
            var a = document.body.createTextRange(),
                l = null;a.moveToElementText(n || i), a.collapse(!n), l = n ? n.nextSibling : i.firstChild;var c = t.duplicate();c.setEndPoint("StartToStart", a);for (var d = c.text.replace(/[\r\n]/g, "").length; d > l.nodeValue.length && l.nextSibling;) {
                d -= l.nodeValue.length, l = l.nextSibling;
            }l.nodeValue;e && l.nextSibling && $t.isText(l.nextSibling) && d === l.nodeValue.length && (d -= l.nodeValue.length, l = l.nextSibling), i = l, o = d;
        }return { cont: i, offset: o };
    }function Rt(t) {
        var s = function s(t, e) {
            var o, n;if ($t.isText(t)) {
                var i = $t.listPrev(t, A.not($t.isText)),
                    r = B.last(i).previousSibling;o = r || t.parentNode, e += B.sum(B.tail(i), $t.nodeLength), n = !r;
            } else {
                if (o = t.childNodes[e] || t, $t.isText(o)) return s(o, 0);e = 0, n = !1;
            }return { node: o, collapseToStart: n, offset: e };
        },
            e = document.body.createTextRange(),
            o = s(t.node, t.offset);return e.moveToElementText(o.node), e.collapse(o.collapseToStart), e.moveStart("character", o.offset), e;
    }C.fn.extend({ summernote: function summernote() {
            var t = C.type(B.head(arguments)),
                e = "string" === t,
                o = "object" === t,
                i = C.extend({}, C.summernote.options, o ? B.head(arguments) : {});i.langInfo = C.extend(!0, {}, C.summernote.lang["en-US"], C.summernote.lang[i.lang]), i.icons = C.extend(!0, {}, C.summernote.options.icons, i.icons), i.tooltip = "auto" === i.tooltip ? !R.isSupportTouch : i.tooltip, this.each(function (t, e) {
                var o = C(e);if (!o.data("summernote")) {
                    var n = new Nt(o, i);o.data("summernote", n), o.data("summernote").triggerEvent("init", n.layoutInfo);
                }
            });var n = this.first();if (n.length) {
                var r = n.data("summernote");if (e) return r.invoke.apply(r, B.from(arguments));i.focus && r.invoke("editor.focus");
            }return this;
        } });var Lt = function () {
        function r(t, e, o, n) {
            this.sc = t, this.so = e, this.ec = o, this.eo = n, this.isOnEditable = this.makeIsOn($t.isEditable), this.isOnList = this.makeIsOn($t.isList), this.isOnAnchor = this.makeIsOn($t.isAnchor), this.isOnCell = this.makeIsOn($t.isCell), this.isOnData = this.makeIsOn($t.isData);
        }return r.prototype.nativeRange = function () {
            if (R.isW3CRangeSupport) {
                var t = document.createRange();return t.setStart(this.sc, this.sc.data && this.so > this.sc.data.length ? 0 : this.so), t.setEnd(this.ec, this.sc.data ? Math.min(this.eo, this.sc.data.length) : this.eo), t;
            }var e = Rt({ node: this.sc, offset: this.so });return e.setEndPoint("EndToEnd", Rt({ node: this.ec, offset: this.eo })), e;
        }, r.prototype.getPoints = function () {
            return { sc: this.sc, so: this.so, ec: this.ec, eo: this.eo };
        }, r.prototype.getStartPoint = function () {
            return { node: this.sc, offset: this.so };
        }, r.prototype.getEndPoint = function () {
            return { node: this.ec, offset: this.eo };
        }, r.prototype.select = function () {
            var t = this.nativeRange();if (R.isW3CRangeSupport) {
                var e = document.getSelection();0 < e.rangeCount && e.removeAllRanges(), e.addRange(t);
            } else t.select();return this;
        }, r.prototype.scrollIntoView = function (t) {
            var e = C(t).height();return t.scrollTop + e < this.sc.offsetTop && (t.scrollTop += Math.abs(t.scrollTop + e - this.sc.offsetTop)), this;
        }, r.prototype.normalize = function () {
            var t = function t(_t2, e) {
                if ($t.isVisiblePoint(_t2) && (!$t.isEdgePoint(_t2) || $t.isRightEdgePoint(_t2) && !e || $t.isLeftEdgePoint(_t2) && e || $t.isRightEdgePoint(_t2) && e && $t.isVoid(_t2.node.nextSibling) || $t.isLeftEdgePoint(_t2) && !e && $t.isVoid(_t2.node.previousSibling) || $t.isBlock(_t2.node) && $t.isEmpty(_t2.node))) return _t2;var o = $t.ancestor(_t2.node, $t.isBlock);if (($t.isLeftEdgePointOf(_t2, o) || $t.isVoid($t.prevPoint(_t2).node)) && !e || ($t.isRightEdgePointOf(_t2, o) || $t.isVoid($t.nextPoint(_t2).node)) && e) {
                    if ($t.isVisiblePoint(_t2)) return _t2;e = !e;
                }return (e ? $t.nextPointUntil($t.nextPoint(_t2), $t.isVisiblePoint) : $t.prevPointUntil($t.prevPoint(_t2), $t.isVisiblePoint)) || _t2;
            },
                e = t(this.getEndPoint(), !1),
                o = this.isCollapsed() ? e : t(this.getStartPoint(), !0);return new r(o.node, o.offset, e.node, e.offset);
        }, r.prototype.nodes = function (o, t) {
            o = o || A.ok;var n = t && t.includeAncestor,
                i = t && t.fullyContains,
                e = this.getStartPoint(),
                r = this.getEndPoint(),
                s = [],
                a = [];return $t.walkPoint(e, r, function (t) {
                var e;$t.isEditable(t.node) || (i ? ($t.isLeftEdgePoint(t) && a.push(t.node), $t.isRightEdgePoint(t) && B.contains(a, t.node) && (e = t.node)) : e = n ? $t.ancestor(t.node, o) : t.node, e && o(e) && s.push(e));
            }, !0), B.unique(s);
        }, r.prototype.commonAncestor = function () {
            return $t.commonAncestor(this.sc, this.ec);
        }, r.prototype.expand = function (t) {
            var e = $t.ancestor(this.sc, t),
                o = $t.ancestor(this.ec, t);if (!e && !o) return new r(this.sc, this.so, this.ec, this.eo);var n = this.getPoints();return e && (n.sc = e, n.so = 0), o && (n.ec = o, n.eo = $t.nodeLength(o)), new r(n.sc, n.so, n.ec, n.eo);
        }, r.prototype.collapse = function (t) {
            return t ? new r(this.sc, this.so, this.sc, this.so) : new r(this.ec, this.eo, this.ec, this.eo);
        }, r.prototype.splitText = function () {
            var t = this.sc === this.ec,
                e = this.getPoints();return $t.isText(this.ec) && !$t.isEdgePoint(this.getEndPoint()) && this.ec.splitText(this.eo), $t.isText(this.sc) && !$t.isEdgePoint(this.getStartPoint()) && (e.sc = this.sc.splitText(this.so), e.so = 0, t && (e.ec = e.sc, e.eo = this.eo - this.so)), new r(e.sc, e.so, e.ec, e.eo);
        }, r.prototype.deleteContents = function () {
            if (this.isCollapsed()) return this;var t = this.splitText(),
                e = t.nodes(null, { fullyContains: !0 }),
                n = $t.prevPointUntil(t.getStartPoint(), function (t) {
                return !B.contains(e, t.node);
            }),
                i = [];return C.each(e, function (t, e) {
                var o = e.parentNode;n.node !== o && 1 === $t.nodeLength(o) && i.push(o), $t.remove(e, !1);
            }), C.each(i, function (t, e) {
                $t.remove(e, !1);
            }), new r(n.node, n.offset, n.node, n.offset).normalize();
        }, r.prototype.makeIsOn = function (e) {
            return function () {
                var t = $t.ancestor(this.sc, e);return !!t && t === $t.ancestor(this.ec, e);
            };
        }, r.prototype.isLeftEdgeOf = function (t) {
            if (!$t.isLeftEdgePoint(this.getStartPoint())) return !1;var e = $t.ancestor(this.sc, t);return e && $t.isLeftEdgeOf(this.sc, e);
        }, r.prototype.isCollapsed = function () {
            return this.sc === this.ec && this.so === this.eo;
        }, r.prototype.wrapBodyInlineWithPara = function () {
            if ($t.isBodyContainer(this.sc) && $t.isEmpty(this.sc)) return this.sc.innerHTML = $t.emptyPara, new r(this.sc.firstChild, 0, this.sc.firstChild, 0);var t,
                e = this.normalize();if ($t.isParaInline(this.sc) || $t.isPara(this.sc)) return e;if ($t.isInline(e.sc)) {
                var o = $t.listAncestor(e.sc, A.not($t.isInline));t = B.last(o), $t.isInline(t) || (t = o[o.length - 2] || e.sc.childNodes[e.so]);
            } else t = e.sc.childNodes[0 < e.so ? e.so - 1 : 0];var n = $t.listPrev(t, $t.isParaInline).reverse();if ((n = n.concat($t.listNext(t.nextSibling, $t.isParaInline))).length) {
                var i = $t.wrap(B.head(n), "p");$t.appendChildNodes(i, B.tail(n));
            }return this.normalize();
        }, r.prototype.insertNode = function (t) {
            var e = this.wrapBodyInlineWithPara().deleteContents(),
                o = $t.splitPoint(e.getStartPoint(), $t.isInline(t));return o.rightNode ? o.rightNode.parentNode.insertBefore(t, o.rightNode) : o.container.appendChild(t), t;
        }, r.prototype.pasteHTML = function (t) {
            var e = C("<div></div>").html(t)[0],
                o = B.from(e.childNodes),
                n = this.wrapBodyInlineWithPara().deleteContents();return 0 < n.so && (o = o.reverse()), o = o.map(function (t) {
                return n.insertNode(t);
            }), 0 < n.so && (o = o.reverse()), o;
        }, r.prototype.toString = function () {
            var t = this.nativeRange();return R.isW3CRangeSupport ? t.toString() : t.text;
        }, r.prototype.getWordRange = function (t) {
            var e = this.getEndPoint();if (!$t.isCharPoint(e)) return this;var o = $t.prevPointUntil(e, function (t) {
                return !$t.isCharPoint(t);
            });return t && (e = $t.nextPointUntil(e, function (t) {
                return !$t.isCharPoint(t);
            })), new r(o.node, o.offset, e.node, e.offset);
        }, r.prototype.bookmark = function (t) {
            return { s: { path: $t.makeOffsetPath(t, this.sc), offset: this.so }, e: { path: $t.makeOffsetPath(t, this.ec), offset: this.eo } };
        }, r.prototype.paraBookmark = function (t) {
            return { s: { path: B.tail($t.makeOffsetPath(B.head(t), this.sc)), offset: this.so }, e: { path: B.tail($t.makeOffsetPath(B.last(t), this.ec)), offset: this.eo } };
        }, r.prototype.getClientRects = function () {
            return this.nativeRange().getClientRects();
        }, r;
    }(),
        At = { create: function create(t, e, o, n) {
            if (4 === arguments.length) return new Lt(t, e, o, n);if (2 === arguments.length) return new Lt(o = t, n = e, o, n);var i = this.createFromSelection();return i || 1 !== arguments.length ? i : (i = this.createFromNode(t)).collapse($t.emptyPara === t.innerHTML);
        }, createFromSelection: function createFromSelection() {
            var t, e, o, n;if (R.isW3CRangeSupport) {
                var i = document.getSelection();if (!i || 0 === i.rangeCount) return null;if ($t.isBody(i.anchorNode)) return null;var r = i.getRangeAt(0);t = r.startContainer, e = r.startOffset, o = r.endContainer, n = r.endOffset;
            } else {
                var s = document.selection.createRange(),
                    a = s.duplicate();a.collapse(!1);var l = s;l.collapse(!0);var c = Et(l, !0),
                    d = Et(a, !1);$t.isText(c.node) && $t.isLeftEdgePoint(c) && $t.isTextNode(d.node) && $t.isRightEdgePoint(d) && d.node.nextSibling === c.node && (c = d), t = c.cont, e = c.offset, o = d.cont, n = d.offset;
            }return new Lt(t, e, o, n);
        }, createFromNode: function createFromNode(t) {
            var e = t,
                o = 0,
                n = t,
                i = $t.nodeLength(n);return $t.isVoid(e) && (o = $t.listPrev(e).length - 1, e = e.parentNode), $t.isBR(n) ? (i = $t.listPrev(n).length - 1, n = n.parentNode) : $t.isVoid(n) && (i = $t.listPrev(n).length, n = n.parentNode), this.create(e, o, n, i);
        }, createFromNodeBefore: function createFromNodeBefore(t) {
            return this.createFromNode(t).collapse(!0);
        }, createFromNodeAfter: function createFromNodeAfter(t) {
            return this.createFromNode(t).collapse();
        }, createFromBookmark: function createFromBookmark(t, e) {
            var o = $t.fromOffsetPath(t, e.s.path),
                n = e.s.offset,
                i = $t.fromOffsetPath(t, e.e.path),
                r = e.e.offset;return new Lt(o, n, i, r);
        }, createFromParaBookmark: function createFromParaBookmark(t, e) {
            var o = t.s.offset,
                n = t.e.offset,
                i = $t.fromOffsetPath(B.head(e), t.s.path),
                r = $t.fromOffsetPath(B.last(e), t.e.path);return new Lt(i, o, r, n);
        } },
        Ft = { BACKSPACE: 8, TAB: 9, ENTER: 13, SPACE: 32, DELETE: 46, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, NUM0: 48, NUM1: 49, NUM2: 50, NUM3: 51, NUM4: 52, NUM5: 53, NUM6: 54, NUM7: 55, NUM8: 56, B: 66, E: 69, I: 73, J: 74, K: 75, L: 76, R: 82, S: 83, U: 85, V: 86, Y: 89, Z: 90, SLASH: 191, LEFTBRACKET: 219, BACKSLASH: 220, RIGHTBRACKET: 221 },
        Pt = { isEdit: function isEdit(t) {
            return B.contains([Ft.BACKSPACE, Ft.TAB, Ft.ENTER, Ft.SPACE, Ft.DELETE], t);
        }, isMove: function isMove(t) {
            return B.contains([Ft.LEFT, Ft.UP, Ft.RIGHT, Ft.DOWN], t);
        }, nameFromCode: A.invertObject(Ft), code: Ft };var Ht = function () {
        function t(t) {
            this.stack = [], this.stackOffset = -1, this.$editable = t, this.editable = t[0];
        }return t.prototype.makeSnapshot = function () {
            var t = At.create(this.editable);return { contents: this.$editable.html(), bookmark: t && t.isOnEditable() ? t.bookmark(this.editable) : { s: { path: [], offset: 0 }, e: { path: [], offset: 0 } } };
        }, t.prototype.applySnapshot = function (t) {
            null !== t.contents && this.$editable.html(t.contents), null !== t.bookmark && At.createFromBookmark(this.editable, t.bookmark).select();
        }, t.prototype.rewind = function () {
            this.$editable.html() !== this.stack[this.stackOffset].contents && this.recordUndo(), this.stackOffset = 0, this.applySnapshot(this.stack[this.stackOffset]);
        }, t.prototype.commit = function () {
            this.stack = [], this.stackOffset = -1, this.recordUndo();
        }, t.prototype.reset = function () {
            this.stack = [], this.stackOffset = -1, this.$editable.html(""), this.recordUndo();
        }, t.prototype.undo = function () {
            this.$editable.html() !== this.stack[this.stackOffset].contents && this.recordUndo(), 0 < this.stackOffset && (this.stackOffset--, this.applySnapshot(this.stack[this.stackOffset]));
        }, t.prototype.redo = function () {
            this.stack.length - 1 > this.stackOffset && (this.stackOffset++, this.applySnapshot(this.stack[this.stackOffset]));
        }, t.prototype.recordUndo = function () {
            this.stackOffset++, this.stack.length > this.stackOffset && (this.stack = this.stack.slice(0, this.stackOffset)), this.stack.push(this.makeSnapshot());
        }, t;
    }(),
        Dt = function () {
        function t() {}return t.prototype.jQueryCSS = function (o, t) {
            if (R.jqueryVersion < 1.9) {
                var n = {};return C.each(t, function (t, e) {
                    n[e] = o.css(e);
                }), n;
            }return o.css(t);
        }, t.prototype.fromNode = function (t) {
            var e = this.jQueryCSS(t, ["font-family", "font-size", "text-align", "list-style-type", "line-height"]) || {};return e["font-size"] = parseInt(e["font-size"], 10), e;
        }, t.prototype.stylePara = function (t, o) {
            C.each(t.nodes($t.isPara, { includeAncestor: !0 }), function (t, e) {
                C(e).css(o);
            });
        }, t.prototype.styleNodes = function (t, e) {
            t = t.splitText();var o = e && e.nodeName || "SPAN",
                n = !(!e || !e.expandClosestSibling),
                i = !(!e || !e.onlyPartialContains);if (t.isCollapsed()) return [t.insertNode($t.create(o))];var r = $t.makePredByNodeName(o),
                s = t.nodes($t.isText, { fullyContains: !0 }).map(function (t) {
                return $t.singleChildAncestor(t, r) || $t.wrap(t, o);
            });if (n) {
                if (i) {
                    var a = t.nodes();r = A.and(r, function (t) {
                        return B.contains(a, t);
                    });
                }return s.map(function (t) {
                    var e = $t.withClosestSiblings(t, r),
                        o = B.head(e),
                        n = B.tail(e);return C.each(n, function (t, e) {
                        $t.appendChildNodes(o, e.childNodes), $t.remove(e);
                    }), B.head(e);
                });
            }return s;
        }, t.prototype.current = function (t) {
            var e = C($t.isElement(t.sc) ? t.sc : t.sc.parentNode),
                o = this.fromNode(e);try {
                o = C.extend(o, { "font-bold": document.queryCommandState("bold") ? "bold" : "normal", "font-italic": document.queryCommandState("italic") ? "italic" : "normal", "font-underline": document.queryCommandState("underline") ? "underline" : "normal", "font-subscript": document.queryCommandState("subscript") ? "subscript" : "normal", "font-superscript": document.queryCommandState("superscript") ? "superscript" : "normal", "font-strikethrough": document.queryCommandState("strikethrough") ? "strikethrough" : "normal", "font-family": document.queryCommandValue("fontname") || o["font-family"] });
            } catch (t) {}if (t.isOnList()) {
                var n = -1 < ["circle", "disc", "disc-leading-zero", "square"].indexOf(o["list-style-type"]);o["list-style"] = n ? "unordered" : "ordered";
            } else o["list-style"] = "none";var i = $t.ancestor(t.sc, $t.isPara);if (i && i.style["line-height"]) o["line-height"] = i.style.lineHeight;else {
                var r = parseInt(o["line-height"], 10) / parseInt(o["font-size"], 10);o["line-height"] = r.toFixed(1);
            }return o.anchor = t.isOnAnchor() && $t.ancestor(t.sc, $t.isAnchor), o.ancestors = $t.listAncestor(t.sc, $t.isEditable), o.range = t, o;
        }, t;
    }(),
        Bt = function () {
        function t() {}return t.prototype.insertOrderedList = function (t) {
            this.toggleList("OL", t);
        }, t.prototype.insertUnorderedList = function (t) {
            this.toggleList("UL", t);
        }, t.prototype.indent = function (t) {
            var i = this,
                e = At.create(t).wrapBodyInlineWithPara(),
                o = e.nodes($t.isPara, { includeAncestor: !0 }),
                n = B.clusterBy(o, A.peq2("parentNode"));C.each(n, function (t, e) {
                var o = B.head(e);if ($t.isLi(o)) {
                    var n = i.findList(o.previousSibling);n ? e.map(function (t) {
                        return n.appendChild(t);
                    }) : (i.wrapList(e, o.parentNode.nodeName), e.map(function (t) {
                        return t.parentNode;
                    }).map(function (t) {
                        return i.appendToPrevious(t);
                    }));
                } else C.each(e, function (t, e) {
                    C(e).css("marginLeft", function (t, e) {
                        return (parseInt(e, 10) || 0) + 25;
                    });
                });
            }), e.select();
        }, t.prototype.outdent = function (t) {
            var n = this,
                e = At.create(t).wrapBodyInlineWithPara(),
                o = e.nodes($t.isPara, { includeAncestor: !0 }),
                i = B.clusterBy(o, A.peq2("parentNode"));C.each(i, function (t, e) {
                var o = B.head(e);$t.isLi(o) ? n.releaseList([e]) : C.each(e, function (t, e) {
                    C(e).css("marginLeft", function (t, e) {
                        return 25 < (e = parseInt(e, 10) || 0) ? e - 25 : "";
                    });
                });
            }), e.select();
        }, t.prototype.toggleList = function (o, t) {
            var n = this,
                e = At.create(t).wrapBodyInlineWithPara(),
                i = e.nodes($t.isPara, { includeAncestor: !0 }),
                r = e.paraBookmark(i),
                s = B.clusterBy(i, A.peq2("parentNode"));if (B.find(i, $t.isPurePara)) {
                var a = [];C.each(s, function (t, e) {
                    a = a.concat(n.wrapList(e, o));
                }), i = a;
            } else {
                var l = e.nodes($t.isList, { includeAncestor: !0 }).filter(function (t) {
                    return !C.nodeName(t, o);
                });l.length ? C.each(l, function (t, e) {
                    $t.replace(e, o);
                }) : i = this.releaseList(s, !0);
            }At.createFromParaBookmark(r, i).select();
        }, t.prototype.wrapList = function (t, e) {
            var o = B.head(t),
                n = B.last(t),
                i = $t.isList(o.previousSibling) && o.previousSibling,
                r = $t.isList(n.nextSibling) && n.nextSibling,
                s = i || $t.insertAfter($t.create(e || "UL"), n);return t = t.map(function (t) {
                return $t.isPurePara(t) ? $t.replace(t, "LI") : t;
            }), $t.appendChildNodes(s, t), r && ($t.appendChildNodes(s, B.from(r.childNodes)), $t.remove(r)), t;
        }, t.prototype.releaseList = function (t, c) {
            var d = this,
                u = [];return C.each(t, function (t, e) {
                var o = B.head(e),
                    n = B.last(e),
                    i = c ? $t.lastAncestor(o, $t.isList) : o.parentNode,
                    r = i.parentNode;if ("LI" === i.parentNode.nodeName) e.map(function (t) {
                    var e = d.findNextSiblings(t);r.nextSibling ? r.parentNode.insertBefore(t, r.nextSibling) : r.parentNode.appendChild(t), e.length && (d.wrapList(e, i.nodeName), t.appendChild(e[0].parentNode));
                }), 0 === i.children.length && r.removeChild(i), 0 === r.childNodes.length && r.parentNode.removeChild(r);else {
                    var s = 1 < i.childNodes.length ? $t.splitTree(i, { node: n.parentNode, offset: $t.position(n) + 1 }, { isSkipPaddingBlankHTML: !0 }) : null,
                        a = $t.splitTree(i, { node: o.parentNode, offset: $t.position(o) }, { isSkipPaddingBlankHTML: !0 });e = c ? $t.listDescendant(a, $t.isLi) : B.from(a.childNodes).filter($t.isLi), !c && $t.isList(i.parentNode) || (e = e.map(function (t) {
                        return $t.replace(t, "P");
                    })), C.each(B.from(e).reverse(), function (t, e) {
                        $t.insertAfter(e, i);
                    });var l = B.compact([i, a, s]);C.each(l, function (t, e) {
                        var o = [e].concat($t.listDescendant(e, $t.isList));C.each(o.reverse(), function (t, e) {
                            $t.nodeLength(e) || $t.remove(e, !0);
                        });
                    });
                }u = u.concat(e);
            }), u;
        }, t.prototype.appendToPrevious = function (t) {
            return t.previousSibling ? $t.appendChildNodes(t.previousSibling, [t]) : this.wrapList([t], "LI");
        }, t.prototype.findList = function (t) {
            return t ? B.find(t.children, function (t) {
                return -1 < ["OL", "UL"].indexOf(t.nodeName);
            }) : null;
        }, t.prototype.findNextSiblings = function (t) {
            for (var e = []; t.nextSibling;) {
                e.push(t.nextSibling), t = t.nextSibling;
            }return e;
        }, t;
    }(),
        zt = function () {
        function t(t) {
            this.bullet = new Bt(), this.options = t.options;
        }return t.prototype.insertTab = function (t, e) {
            var o = $t.createText(new Array(e + 1).join($t.NBSP_CHAR));(t = t.deleteContents()).insertNode(o, !0), (t = At.create(o, e)).select();
        }, t.prototype.insertParagraph = function (t, e) {
            e = (e = (e = e || At.create(t)).deleteContents()).wrapBodyInlineWithPara();var o,
                n = $t.ancestor(e.sc, $t.isPara);if (n) {
                if ($t.isEmpty(n) && $t.isLi(n)) return void this.bullet.toggleList(n.parentNode.nodeName);var i = null;if (1 === this.options.blockquoteBreakingLevel ? i = $t.ancestor(n, $t.isBlockquote) : 2 === this.options.blockquoteBreakingLevel && (i = $t.lastAncestor(n, $t.isBlockquote)), i) {
                    o = C($t.emptyPara)[0], $t.isRightEdgePoint(e.getStartPoint()) && $t.isBR(e.sc.nextSibling) && C(e.sc.nextSibling).remove();var r = $t.splitTree(i, e.getStartPoint(), { isDiscardEmptySplits: !0 });r ? r.parentNode.insertBefore(o, r) : $t.insertAfter(o, i);
                } else {
                    o = $t.splitTree(n, e.getStartPoint());var s = $t.listDescendant(n, $t.isEmptyAnchor);s = s.concat($t.listDescendant(o, $t.isEmptyAnchor)), C.each(s, function (t, e) {
                        $t.remove(e);
                    }), ($t.isHeading(o) || $t.isPre(o) || $t.isCustomStyleTag(o)) && $t.isEmpty(o) && (o = $t.replace(o, "p"));
                }
            } else {
                var a = e.sc.childNodes[e.so];o = C($t.emptyPara)[0], a ? e.sc.insertBefore(o, a) : e.sc.appendChild(o);
            }At.create(o, 0).normalize().select().scrollIntoView(t);
        }, t;
    }(),
        Mt = function Mt(t, h, p, i) {
        var f = { colPos: 0, rowPos: 0 },
            m = [],
            g = [];function v(t, e, o, n, i, r, s) {
            var a = { baseRow: o, baseCell: n, isRowSpan: i, isColSpan: r, isVirtual: s };m[t] || (m[t] = []), m[t][e] = a;
        }function b(t, e) {
            if (!m[t]) return e;if (!m[t][e]) return e;for (var o = e; m[t][o];) {
                if (o++, !m[t][o]) return o;
            }
        }function r(t, e) {
            var o = b(t.rowIndex, e.cellIndex),
                n = 1 < e.colSpan,
                i = 1 < e.rowSpan,
                r = t.rowIndex === f.rowPos && e.cellIndex === f.colPos;v(t.rowIndex, o, t, e, i, n, !1);var s = e.attributes.rowSpan ? parseInt(e.attributes.rowSpan.value, 10) : 0;if (1 < s) for (var a = 1; a < s; a++) {
                var l = t.rowIndex + a;y(l, o, e, r), v(l, o, t, e, !0, n, !0);
            }var c = e.attributes.colSpan ? parseInt(e.attributes.colSpan.value, 10) : 0;if (1 < c) for (var d = 1; d < c; d++) {
                var u = b(t.rowIndex, o + d);y(t.rowIndex, u, e, r), v(t.rowIndex, u, t, e, i, !0, !0);
            }
        }function y(t, e, o, n) {
            t === f.rowPos && f.colPos >= o.cellIndex && o.cellIndex <= e && !n && f.colPos++;
        }function k(t) {
            switch (h) {case Mt.where.Column:
                    if (t.isColSpan) return Mt.resultAction.SubtractSpanCount;break;case Mt.where.Row:
                    if (!t.isVirtual && t.isRowSpan) return Mt.resultAction.AddCell;if (t.isRowSpan) return Mt.resultAction.SubtractSpanCount;}return Mt.resultAction.RemoveCell;
        }function C(t) {
            switch (h) {case Mt.where.Column:
                    if (t.isColSpan) return Mt.resultAction.SumSpanCount;if (t.isRowSpan && t.isVirtual) return Mt.resultAction.Ignore;break;case Mt.where.Row:
                    if (t.isRowSpan) return Mt.resultAction.SumSpanCount;if (t.isColSpan && t.isVirtual) return Mt.resultAction.Ignore;}return Mt.resultAction.AddCell;
        }this.getActionList = function () {
            for (var t, e, o, n = h === Mt.where.Row ? f.rowPos : -1, i = h === Mt.where.Column ? f.colPos : -1, r = 0, s = !0; s;) {
                var a = 0 <= n ? n : r,
                    l = 0 <= i ? i : r,
                    c = m[a];if (!c) return s = !1, g;var d = c[l];if (!d) return s = !1, g;var u = Mt.resultAction.Ignore;switch (p) {case Mt.requestAction.Add:
                        u = C(d);break;case Mt.requestAction.Delete:
                        u = k(d);}g.push((t = u, e = a, o = l, { baseCell: d.baseCell, action: t, virtualTable: { rowIndex: e, cellIndex: o } })), r++;
            }return g;
        }, t && t.tagName && ("td" === t.tagName.toLowerCase() || "th" === t.tagName.toLowerCase()) ? (f.colPos = t.cellIndex, t.parentElement && t.parentElement.tagName && "tr" === t.parentElement.tagName.toLowerCase() ? f.rowPos = t.parentElement.rowIndex : console.error("Impossible to identify start Row point.", t)) : console.error("Impossible to identify start Cell point.", t), function () {
            for (var t = i.rows, e = 0; e < t.length; e++) {
                for (var o = t[e].cells, n = 0; n < o.length; n++) {
                    r(t[e], o[n]);
                }
            }
        }();
    };Mt.where = { Row: 0, Column: 1 }, Mt.requestAction = { Add: 0, Delete: 1 }, Mt.resultAction = { Ignore: 0, SubtractSpanCount: 1, RemoveCell: 2, AddCell: 3, SumSpanCount: 4 };var Ot,
        Ut = function () {
        function t() {}return t.prototype.tab = function (t, e) {
            var o = $t.ancestor(t.commonAncestor(), $t.isCell),
                n = $t.ancestor(o, $t.isTable),
                i = $t.listDescendant(n, $t.isCell),
                r = B[e ? "prev" : "next"](i, o);r && At.create(r, 0).select();
        }, t.prototype.addRow = function (t, e) {
            for (var o = $t.ancestor(t.commonAncestor(), $t.isCell), n = C(o).closest("tr"), i = this.recoverAttributes(n), r = C("<tr" + i + "></tr>"), s = new Mt(o, Mt.where.Row, Mt.requestAction.Add, C(n).closest("table")[0]).getActionList(), a = 0; a < s.length; a++) {
                var l = s[a],
                    c = this.recoverAttributes(l.baseCell);switch (l.action) {case Mt.resultAction.AddCell:
                        r.append("<td" + c + ">" + $t.blank + "</td>");break;case Mt.resultAction.SumSpanCount:
                        if ("top" === e) if ((l.baseCell.parent ? l.baseCell.closest("tr").rowIndex : 0) <= n[0].rowIndex) {
                            var d = C("<div></div>").append(C("<td" + c + ">" + $t.blank + "</td>").removeAttr("rowspan")).html();r.append(d);break;
                        }var u = parseInt(l.baseCell.rowSpan, 10);u++, l.baseCell.setAttribute("rowSpan", u);}
            }if ("top" === e) n.before(r);else {
                if (1 < o.rowSpan) {
                    var h = n[0].rowIndex + (o.rowSpan - 2);return void C(C(n).parent().find("tr")[h]).after(C(r));
                }n.after(r);
            }
        }, t.prototype.addCol = function (t, e) {
            var o = $t.ancestor(t.commonAncestor(), $t.isCell),
                n = C(o).closest("tr");C(n).siblings().push(n);for (var i = new Mt(o, Mt.where.Column, Mt.requestAction.Add, C(n).closest("table")[0]).getActionList(), r = 0; r < i.length; r++) {
                var s = i[r],
                    a = this.recoverAttributes(s.baseCell);switch (s.action) {case Mt.resultAction.AddCell:
                        "right" === e ? C(s.baseCell).after("<td" + a + ">" + $t.blank + "</td>") : C(s.baseCell).before("<td" + a + ">" + $t.blank + "</td>");break;case Mt.resultAction.SumSpanCount:
                        if ("right" === e) {
                            var l = parseInt(s.baseCell.colSpan, 10);l++, s.baseCell.setAttribute("colSpan", l);
                        } else C(s.baseCell).before("<td" + a + ">" + $t.blank + "</td>");}
            }
        }, t.prototype.recoverAttributes = function (t) {
            var e = "";if (!t) return e;for (var o = t.attributes || [], n = 0; n < o.length; n++) {
                "id" !== o[n].name.toLowerCase() && o[n].specified && (e += " " + o[n].name + "='" + o[n].value + "'");
            }return e;
        }, t.prototype.deleteRow = function (t) {
            for (var e = $t.ancestor(t.commonAncestor(), $t.isCell), o = C(e).closest("tr"), n = o.children("td, th").index(C(e)), i = o[0].rowIndex, r = new Mt(e, Mt.where.Row, Mt.requestAction.Delete, C(o).closest("table")[0]).getActionList(), s = 0; s < r.length; s++) {
                if (r[s]) {
                    var a = r[s].baseCell,
                        l = r[s].virtualTable,
                        c = a.rowSpan && 1 < a.rowSpan,
                        d = c ? parseInt(a.rowSpan, 10) : 0;switch (r[s].action) {case Mt.resultAction.Ignore:
                            continue;case Mt.resultAction.AddCell:
                            var u = o.next("tr")[0];if (!u) continue;var h = o[0].cells[n];c && (2 < d ? (d--, u.insertBefore(h, u.cells[n]), u.cells[n].setAttribute("rowSpan", d), u.cells[n].innerHTML = "") : 2 === d && (u.insertBefore(h, u.cells[n]), u.cells[n].removeAttribute("rowSpan"), u.cells[n].innerHTML = ""));continue;case Mt.resultAction.SubtractSpanCount:
                            c && (2 < d ? (d--, a.setAttribute("rowSpan", d), l.rowIndex !== i && a.cellIndex === n && (a.innerHTML = "")) : 2 === d && (a.removeAttribute("rowSpan"), l.rowIndex !== i && a.cellIndex === n && (a.innerHTML = "")));continue;case Mt.resultAction.RemoveCell:
                            continue;}
                }
            }o.remove();
        }, t.prototype.deleteCol = function (t) {
            for (var e = $t.ancestor(t.commonAncestor(), $t.isCell), o = C(e).closest("tr"), n = o.children("td, th").index(C(e)), i = new Mt(e, Mt.where.Column, Mt.requestAction.Delete, C(o).closest("table")[0]).getActionList(), r = 0; r < i.length; r++) {
                if (i[r]) switch (i[r].action) {case Mt.resultAction.Ignore:
                        continue;case Mt.resultAction.SubtractSpanCount:
                        var s = i[r].baseCell;if (s.colSpan && 1 < s.colSpan) {
                            var a = s.colSpan ? parseInt(s.colSpan, 10) : 0;2 < a ? (a--, s.setAttribute("colSpan", a), s.cellIndex === n && (s.innerHTML = "")) : 2 === a && (s.removeAttribute("colSpan"), s.cellIndex === n && (s.innerHTML = ""));
                        }continue;case Mt.resultAction.RemoveCell:
                        $t.remove(i[r].baseCell, !0);continue;}
            }
        }, t.prototype.createTable = function (t, e, o) {
            for (var n, i = [], r = 0; r < t; r++) {
                i.push("<td>" + $t.blank + "</td>");
            }n = i.join("");for (var s, a = [], l = 0; l < e; l++) {
                a.push("<tr>" + n + "</tr>");
            }s = a.join("");var c = C("<table>" + s + "</table>");return o && o.tableClassName && c.addClass(o.tableClassName), c[0];
        }, t.prototype.deleteTable = function (t) {
            var e = $t.ancestor(t.commonAncestor(), $t.isCell);C(e).closest("table").remove();
        }, t;
    }(),
        jt = function () {
        function t(t) {
            var u = this;this.context = t, this.$note = t.layoutInfo.note, this.$editor = t.layoutInfo.editor, this.$editable = t.layoutInfo.editable, this.options = t.options, this.lang = this.options.langInfo, this.editable = this.$editable[0], this.lastRange = null, this.style = new Dt(), this.table = new Ut(), this.typing = new zt(t), this.bullet = new Bt(), this.history = new Ht(this.$editable), this.context.memo("help.undo", this.lang.help.undo), this.context.memo("help.redo", this.lang.help.redo), this.context.memo("help.tab", this.lang.help.tab), this.context.memo("help.untab", this.lang.help.untab), this.context.memo("help.insertParagraph", this.lang.help.insertParagraph), this.context.memo("help.insertOrderedList", this.lang.help.insertOrderedList), this.context.memo("help.insertUnorderedList", this.lang.help.insertUnorderedList), this.context.memo("help.indent", this.lang.help.indent), this.context.memo("help.outdent", this.lang.help.outdent), this.context.memo("help.formatPara", this.lang.help.formatPara), this.context.memo("help.insertHorizontalRule", this.lang.help.insertHorizontalRule), this.context.memo("help.fontName", this.lang.help.fontName);for (var e = ["bold", "italic", "underline", "strikethrough", "superscript", "subscript", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "formatBlock", "removeFormat", "backColor"], o = 0, n = e.length; o < n; o++) {
                this[e[o]] = function (e) {
                    return function (t) {
                        u.beforeCommand(), document.execCommand(e, !1, t), u.afterCommand(!0);
                    };
                }(e[o]), this.context.memo("help." + e[o], this.lang.help[e[o]]);
            }this.fontName = this.wrapCommand(function (t) {
                return u.fontStyling("font-family", "'" + t + "'");
            }), this.fontSize = this.wrapCommand(function (t) {
                return u.fontStyling("font-size", t + "px");
            });for (o = 1; o <= 6; o++) {
                this["formatH" + o] = function (t) {
                    return function () {
                        u.formatBlock("H" + t);
                    };
                }(o), this.context.memo("help.formatH" + o, this.lang.help["formatH" + o]);
            }this.insertParagraph = this.wrapCommand(function () {
                u.typing.insertParagraph(u.editable);
            }), this.insertOrderedList = this.wrapCommand(function () {
                u.bullet.insertOrderedList(u.editable);
            }), this.insertUnorderedList = this.wrapCommand(function () {
                u.bullet.insertUnorderedList(u.editable);
            }), this.indent = this.wrapCommand(function () {
                u.bullet.indent(u.editable);
            }), this.outdent = this.wrapCommand(function () {
                u.bullet.outdent(u.editable);
            }), this.insertNode = this.wrapCommand(function (t) {
                u.isLimited(C(t).text().length) || (u.getLastRange().insertNode(t), At.createFromNodeAfter(t).select(), u.setLastRange());
            }), this.insertText = this.wrapCommand(function (t) {
                if (!u.isLimited(t.length)) {
                    var e = u.getLastRange().insertNode($t.createText(t));At.create(e, $t.nodeLength(e)).select(), u.setLastRange();
                }
            }), this.pasteHTML = this.wrapCommand(function (t) {
                if (!u.isLimited(t.length)) {
                    t = u.context.invoke("codeview.purify", t);var e = u.getLastRange().pasteHTML(t);At.createFromNodeAfter(B.last(e)).select(), u.setLastRange();
                }
            }), this.formatBlock = this.wrapCommand(function (t, e) {
                var o = u.options.callbacks.onApplyCustomStyle;o ? o.call(u, e, u.context, u.onFormatBlock) : u.onFormatBlock(t, e);
            }), this.insertHorizontalRule = this.wrapCommand(function () {
                var t = u.getLastRange().insertNode($t.create("HR"));t.nextSibling && (At.create(t.nextSibling, 0).normalize().select(), u.setLastRange());
            }), this.lineHeight = this.wrapCommand(function (t) {
                u.style.stylePara(u.getLastRange(), { lineHeight: t });
            }), this.createLink = this.wrapCommand(function (t) {
                var o = t.url,
                    e = t.text,
                    n = t.isNewWindow,
                    i = t.range || u.getLastRange(),
                    r = e.length - i.toString().length;if (!(0 < r && u.isLimited(r))) {
                    var s = i.toString() !== e;"string" == typeof o && (o = o.trim()), o = u.options.onCreateLink ? u.options.onCreateLink(o) : /^([A-Za-z][A-Za-z0-9+-.]*\:|#|\/)/.test(o) ? o : "http://" + o;var a = [];if (s) {
                        var l = (i = i.deleteContents()).insertNode(C("<A>" + e + "</A>")[0]);a.push(l);
                    } else a = u.style.styleNodes(i, { nodeName: "A", expandClosestSibling: !0, onlyPartialContains: !0 });C.each(a, function (t, e) {
                        C(e).attr("href", o), n ? C(e).attr("target", "_blank") : C(e).removeAttr("target");
                    });var c = At.createFromNodeBefore(B.head(a)).getStartPoint(),
                        d = At.createFromNodeAfter(B.last(a)).getEndPoint();At.create(c.node, c.offset, d.node, d.offset).select(), u.setLastRange();
                }
            }), this.color = this.wrapCommand(function (t) {
                var e = t.foreColor,
                    o = t.backColor;e && document.execCommand("foreColor", !1, e), o && document.execCommand("backColor", !1, o);
            }), this.foreColor = this.wrapCommand(function (t) {
                document.execCommand("styleWithCSS", !1, !0), document.execCommand("foreColor", !1, t);
            }), this.insertTable = this.wrapCommand(function (t) {
                var e = t.split("x");u.getLastRange().deleteContents().insertNode(u.table.createTable(e[0], e[1], u.options));
            }), this.removeMedia = this.wrapCommand(function () {
                var t = C(u.restoreTarget()).parent();t.parent("figure").length ? t.parent("figure").remove() : t = C(u.restoreTarget()).detach(), u.context.triggerEvent("media.delete", t, u.$editable);
            }), this.floatMe = this.wrapCommand(function (t) {
                var e = C(u.restoreTarget());e.toggleClass("note-float-left", "left" === t), e.toggleClass("note-float-right", "right" === t), e.css("float", "none" === t ? "" : t);
            }), this.resize = this.wrapCommand(function (t) {
                var e = C(u.restoreTarget());0 === (t = parseFloat(t)) ? e.css("width", "") : e.css({ width: 100 * t + "%", height: "" });
            });
        }return t.prototype.initialize = function () {
            var e = this;this.$editable.on("keydown", function (t) {
                if (t.keyCode === Pt.code.ENTER && e.context.triggerEvent("enter", t), e.context.triggerEvent("keydown", t), t.isDefaultPrevented() || (e.options.shortcuts ? e.handleKeyMap(t) : e.preventDefaultEditableShortCuts(t)), e.isLimited(1, t)) return !1;
            }).on("keyup", function (t) {
                e.setLastRange(), e.context.triggerEvent("keyup", t);
            }).on("focus", function (t) {
                e.setLastRange(), e.context.triggerEvent("focus", t);
            }).on("blur", function (t) {
                e.context.triggerEvent("blur", t);
            }).on("mousedown", function (t) {
                e.context.triggerEvent("mousedown", t);
            }).on("mouseup", function (t) {
                e.setLastRange(), e.context.triggerEvent("mouseup", t);
            }).on("scroll", function (t) {
                e.context.triggerEvent("scroll", t);
            }).on("paste", function (t) {
                e.setLastRange(), e.context.triggerEvent("paste", t);
            }), this.$editable.attr("spellcheck", this.options.spellCheck), this.$editable.html($t.html(this.$note) || $t.emptyPara), this.$editable.on(R.inputEventName, A.debounce(function () {
                e.context.triggerEvent("change", e.$editable.html(), e.$editable);
            }, 10)), this.$editor.on("focusin", function (t) {
                e.context.triggerEvent("focusin", t);
            }).on("focusout", function (t) {
                e.context.triggerEvent("focusout", t);
            }), this.options.airMode || (this.options.width && this.$editor.outerWidth(this.options.width), this.options.height && this.$editable.outerHeight(this.options.height), this.options.maxHeight && this.$editable.css("max-height", this.options.maxHeight), this.options.minHeight && this.$editable.css("min-height", this.options.minHeight)), this.history.recordUndo(), this.setLastRange();
        }, t.prototype.destroy = function () {
            this.$editable.off();
        }, t.prototype.handleKeyMap = function (t) {
            var e = this.options.keyMap[R.isMac ? "mac" : "pc"],
                o = [];t.metaKey && o.push("CMD"), t.ctrlKey && !t.altKey && o.push("CTRL"), t.shiftKey && o.push("SHIFT");var n = Pt.nameFromCode[t.keyCode];n && o.push(n);var i = e[o.join("+")];i ? !1 !== this.context.invoke(i) && t.preventDefault() : Pt.isEdit(t.keyCode) && this.afterCommand();
        }, t.prototype.preventDefaultEditableShortCuts = function (t) {
            (t.ctrlKey || t.metaKey) && B.contains([66, 73, 85], t.keyCode) && t.preventDefault();
        }, t.prototype.isLimited = function (t, e) {
            return t = t || 0, (void 0 === e || !(Pt.isMove(e.keyCode) || e.ctrlKey || e.metaKey || B.contains([Pt.code.BACKSPACE, Pt.code.DELETE], e.keyCode))) && 0 < this.options.maxTextLength && this.$editable.text().length + t >= this.options.maxTextLength;
        }, t.prototype.createRange = function () {
            return this.focus(), this.setLastRange(), this.getLastRange();
        }, t.prototype.setLastRange = function () {
            this.lastRange = At.create(this.editable);
        }, t.prototype.getLastRange = function () {
            return this.lastRange || this.setLastRange(), this.lastRange;
        }, t.prototype.saveRange = function (t) {
            t && this.getLastRange().collapse().select();
        }, t.prototype.restoreRange = function () {
            this.lastRange && (this.lastRange.select(), this.focus());
        }, t.prototype.saveTarget = function (t) {
            this.$editable.data("target", t);
        }, t.prototype.clearTarget = function () {
            this.$editable.removeData("target");
        }, t.prototype.restoreTarget = function () {
            return this.$editable.data("target");
        }, t.prototype.currentStyle = function () {
            var t = At.create();return t && (t = t.normalize()), t ? this.style.current(t) : this.style.fromNode(this.$editable);
        }, t.prototype.styleFromNode = function (t) {
            return this.style.fromNode(t);
        }, t.prototype.undo = function () {
            this.context.triggerEvent("before.command", this.$editable.html()), this.history.undo(), this.context.triggerEvent("change", this.$editable.html(), this.$editable);
        }, t.prototype.commit = function () {
            this.context.triggerEvent("before.command", this.$editable.html()), this.history.commit(), this.context.triggerEvent("change", this.$editable.html(), this.$editable);
        }, t.prototype.redo = function () {
            this.context.triggerEvent("before.command", this.$editable.html()), this.history.redo(), this.context.triggerEvent("change", this.$editable.html(), this.$editable);
        }, t.prototype.beforeCommand = function () {
            this.context.triggerEvent("before.command", this.$editable.html()), this.focus();
        }, t.prototype.afterCommand = function (t) {
            this.normalizeContent(), this.history.recordUndo(), t || this.context.triggerEvent("change", this.$editable.html(), this.$editable);
        }, t.prototype.tab = function () {
            var t = this.getLastRange();if (t.isCollapsed() && t.isOnCell()) this.table.tab(t);else {
                if (0 === this.options.tabSize) return !1;this.isLimited(this.options.tabSize) || (this.beforeCommand(), this.typing.insertTab(t, this.options.tabSize), this.afterCommand());
            }
        }, t.prototype.untab = function () {
            var t = this.getLastRange();if (t.isCollapsed() && t.isOnCell()) this.table.tab(t, !0);else if (0 === this.options.tabSize) return !1;
        }, t.prototype.wrapCommand = function (t) {
            return function () {
                this.beforeCommand(), t.apply(this, arguments), this.afterCommand();
            };
        }, t.prototype.insertImage = function (t, e) {
            var o,
                n = this;return (o = t, C.Deferred(function (t) {
                var e = C("<img>");e.one("load", function () {
                    e.off("error abort"), t.resolve(e);
                }).one("error abort", function () {
                    e.off("load").detach(), t.reject(e);
                }).css({ display: "none" }).appendTo(document.body).attr("src", o);
            }).promise()).then(function (t) {
                n.beforeCommand(), "function" == typeof e ? e(t) : ("string" == typeof e && t.attr("data-filename", e), t.css("width", Math.min(n.$editable.width(), t.width()))), t.show(), At.create(n.editable).insertNode(t[0]), At.createFromNodeAfter(t[0]).select(), n.setLastRange(), n.afterCommand();
            }).fail(function (t) {
                n.context.triggerEvent("image.upload.error", t);
            });
        }, t.prototype.insertImagesAsDataURL = function (t) {
            var i = this;C.each(t, function (t, e) {
                var n,
                    o = e.name;i.options.maximumImageFileSize && i.options.maximumImageFileSize < e.size ? i.context.triggerEvent("image.upload.error", i.lang.image.maximumFileSizeError) : (n = e, C.Deferred(function (o) {
                    C.extend(new FileReader(), { onload: function onload(t) {
                            var e = t.target.result;o.resolve(e);
                        }, onerror: function onerror(t) {
                            o.reject(t);
                        } }).readAsDataURL(n);
                }).promise()).then(function (t) {
                    return i.insertImage(t, o);
                }).fail(function () {
                    i.context.triggerEvent("image.upload.error");
                });
            });
        }, t.prototype.insertImagesOrCallback = function (t) {
            this.options.callbacks.onImageUpload ? this.context.triggerEvent("image.upload", t) : this.insertImagesAsDataURL(t);
        }, t.prototype.getSelectedText = function () {
            var t = this.getLastRange();return t.isOnAnchor() && (t = At.createFromNode($t.ancestor(t.sc, $t.isAnchor))), t.toString();
        }, t.prototype.onFormatBlock = function (t, e) {
            if (document.execCommand("FormatBlock", !1, R.isMSIE ? "<" + t + ">" : t), e && e.length && (e[0].tagName.toUpperCase() !== t.toUpperCase() && (e = e.find(t)), e && e.length)) {
                var o = e[0].className || "";if (o) {
                    var n = this.createRange();C([n.sc, n.ec]).closest(t).addClass(o);
                }
            }
        }, t.prototype.formatPara = function () {
            this.formatBlock("P");
        }, t.prototype.fontStyling = function (t, e) {
            var o = this.getLastRange();if (o) {
                var n = this.style.styleNodes(o);if (C(n).css(t, e), o.isCollapsed()) {
                    var i = B.head(n);i && !$t.nodeLength(i) && (i.innerHTML = $t.ZERO_WIDTH_NBSP_CHAR, At.createFromNodeAfter(i.firstChild).select(), this.setLastRange(), this.$editable.data("bogus", i));
                }
            }
        }, t.prototype.unlink = function () {
            var t = this.getLastRange();if (t.isOnAnchor()) {
                var e = $t.ancestor(t.sc, $t.isAnchor);(t = At.createFromNode(e)).select(), this.setLastRange(), this.beforeCommand(), document.execCommand("unlink"), this.afterCommand();
            }
        }, t.prototype.getLinkInfo = function () {
            var t = this.getLastRange().expand($t.isAnchor),
                e = C(B.head(t.nodes($t.isAnchor))),
                o = { range: t, text: t.toString(), url: e.length ? e.attr("href") : "" };return e.length && (o.isNewWindow = "_blank" === e.attr("target")), o;
        }, t.prototype.addRow = function (t) {
            var e = this.getLastRange(this.$editable);e.isCollapsed() && e.isOnCell() && (this.beforeCommand(), this.table.addRow(e, t), this.afterCommand());
        }, t.prototype.addCol = function (t) {
            var e = this.getLastRange(this.$editable);e.isCollapsed() && e.isOnCell() && (this.beforeCommand(), this.table.addCol(e, t), this.afterCommand());
        }, t.prototype.deleteRow = function () {
            var t = this.getLastRange(this.$editable);t.isCollapsed() && t.isOnCell() && (this.beforeCommand(), this.table.deleteRow(t), this.afterCommand());
        }, t.prototype.deleteCol = function () {
            var t = this.getLastRange(this.$editable);t.isCollapsed() && t.isOnCell() && (this.beforeCommand(), this.table.deleteCol(t), this.afterCommand());
        }, t.prototype.deleteTable = function () {
            var t = this.getLastRange(this.$editable);t.isCollapsed() && t.isOnCell() && (this.beforeCommand(), this.table.deleteTable(t), this.afterCommand());
        }, t.prototype.resizeTo = function (t, e, o) {
            var n;if (o) {
                var i = t.y / t.x,
                    r = e.data("ratio");n = { width: i < r ? t.x : t.y / r, height: i < r ? t.x * r : t.y };
            } else n = { width: t.x, height: t.y };e.css(n);
        }, t.prototype.hasFocus = function () {
            return this.$editable.is(":focus");
        }, t.prototype.focus = function () {
            this.hasFocus() || this.$editable.focus();
        }, t.prototype.isEmpty = function () {
            return $t.isEmpty(this.$editable[0]) || $t.emptyPara === this.$editable.html();
        }, t.prototype.empty = function () {
            this.context.invoke("code", $t.emptyPara);
        }, t.prototype.normalizeContent = function () {
            this.$editable[0].normalize();
        }, t;
    }(),
        Kt = function () {
        function t(t) {
            this.context = t, this.$editable = t.layoutInfo.editable;
        }return t.prototype.initialize = function () {
            this.$editable.on("paste", this.pasteByEvent.bind(this));
        }, t.prototype.pasteByEvent = function (t) {
            var e = t.originalEvent.clipboardData;if (e && e.items && e.items.length) {
                var o = 1 < e.items.length ? e.items[1] : B.head(e.items);"file" === o.kind && -1 !== o.type.indexOf("image/") && this.context.invoke("editor.insertImagesOrCallback", [o.getAsFile()]), this.context.invoke("editor.afterCommand");
            }
        }, t;
    }(),
        Wt = function () {
        function t(t) {
            this.context = t, this.$eventListener = C(document), this.$editor = t.layoutInfo.editor, this.$editable = t.layoutInfo.editable, this.options = t.options, this.lang = this.options.langInfo, this.documentEventHandlers = {}, this.$dropzone = C(['<div class="note-dropzone">', '  <div class="note-dropzone-message"/>', "</div>"].join("")).prependTo(this.$editor);
        }return t.prototype.initialize = function () {
            this.options.disableDragAndDrop ? (this.documentEventHandlers.onDrop = function (t) {
                t.preventDefault();
            }, this.$eventListener = this.$dropzone, this.$eventListener.on("drop", this.documentEventHandlers.onDrop)) : this.attachDragAndDropEvent();
        }, t.prototype.attachDragAndDropEvent = function () {
            var i = this,
                n = C(),
                r = this.$dropzone.find(".note-dropzone-message");this.documentEventHandlers.onDragenter = function (t) {
                var e = i.context.invoke("codeview.isActivated"),
                    o = 0 < i.$editor.width() && 0 < i.$editor.height();e || n.length || !o || (i.$editor.addClass("dragover"), i.$dropzone.width(i.$editor.width()), i.$dropzone.height(i.$editor.height()), r.text(i.lang.image.dragImageHere)), n = n.add(t.target);
            }, this.documentEventHandlers.onDragleave = function (t) {
                (n = n.not(t.target)).length || i.$editor.removeClass("dragover");
            }, this.documentEventHandlers.onDrop = function () {
                n = C(), i.$editor.removeClass("dragover");
            }, this.$eventListener.on("dragenter", this.documentEventHandlers.onDragenter).on("dragleave", this.documentEventHandlers.onDragleave).on("drop", this.documentEventHandlers.onDrop), this.$dropzone.on("dragenter", function () {
                i.$dropzone.addClass("hover"), r.text(i.lang.image.dropImage);
            }).on("dragleave", function () {
                i.$dropzone.removeClass("hover"), r.text(i.lang.image.dragImageHere);
            }), this.$dropzone.on("drop", function (t) {
                var n = t.originalEvent.dataTransfer;t.preventDefault(), n && n.files && n.files.length ? (i.$editable.focus(), i.context.invoke("editor.insertImagesOrCallback", n.files)) : C.each(n.types, function (t, e) {
                    var o = n.getData(e);-1 < e.toLowerCase().indexOf("text") ? i.context.invoke("editor.pasteHTML", o) : C(o).each(function (t, e) {
                        i.context.invoke("editor.insertNode", e);
                    });
                });
            }).on("dragover", !1);
        }, t.prototype.destroy = function () {
            var e = this;Object.keys(this.documentEventHandlers).forEach(function (t) {
                e.$eventListener.off(t.substr(2).toLowerCase(), e.documentEventHandlers[t]);
            }), this.documentEventHandlers = {};
        }, t;
    }();R.hasCodeMirror && (Ot = window.CodeMirror);var Vt = function () {
        function t(t) {
            this.context = t, this.$editor = t.layoutInfo.editor, this.$editable = t.layoutInfo.editable, this.$codable = t.layoutInfo.codable, this.options = t.options;
        }return t.prototype.sync = function () {
            this.isActivated() && R.hasCodeMirror && this.$codable.data("cmEditor").save();
        }, t.prototype.isActivated = function () {
            return this.$editor.hasClass("codeview");
        }, t.prototype.toggle = function () {
            this.isActivated() ? this.deactivate() : this.activate(), this.context.triggerEvent("codeview.toggled");
        }, t.prototype.purify = function (t) {
            if (this.options.codeviewFilter && (t = t.replace(this.options.codeviewFilterRegex, ""), this.options.codeviewIframeFilter)) {
                var i = this.options.codeviewIframeWhitelistSrc.concat(this.options.codeviewIframeWhitelistSrcBase);t = t.replace(/(<iframe.*?>.*?(?:<\/iframe>)?)/gi, function (t) {
                    if (/<.+src(?==?('|"|\s)?)[\s\S]+src(?=('|"|\s)?)[^>]*?>/i.test(t)) return "";for (var e = 0, o = i; e < o.length; e++) {
                        var n = o[e];if (new RegExp('src="(https?:)?//' + n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + '/(.+)"').test(t)) return t;
                    }return "";
                });
            }return t;
        }, t.prototype.activate = function () {
            var e = this;if (this.$codable.val($t.html(this.$editable, this.options.prettifyHtml)), this.$codable.height(this.$editable.height()), this.context.invoke("toolbar.updateCodeview", !0), this.$editor.addClass("codeview"), this.$codable.focus(), R.hasCodeMirror) {
                var o = Ot.fromTextArea(this.$codable[0], this.options.codemirror);if (this.options.codemirror.tern) {
                    var n = new Ot.TernServer(this.options.codemirror.tern);o.ternServer = n, o.on("cursorActivity", function (t) {
                        n.updateArgHints(t);
                    });
                }o.on("blur", function (t) {
                    e.context.triggerEvent("blur.codeview", o.getValue(), t);
                }), o.on("change", function (t) {
                    e.context.triggerEvent("change.codeview", o.getValue(), o);
                }), o.setSize(null, this.$editable.outerHeight()), this.$codable.data("cmEditor", o);
            } else this.$codable.on("blur", function (t) {
                e.context.triggerEvent("blur.codeview", e.$codable.val(), t);
            }), this.$codable.on("input", function (t) {
                e.context.triggerEvent("change.codeview", e.$codable.val(), e.$codable);
            });
        }, t.prototype.deactivate = function () {
            if (R.hasCodeMirror) {
                var t = this.$codable.data("cmEditor");this.$codable.val(t.getValue()), t.toTextArea();
            }var e = this.purify($t.value(this.$codable, this.options.prettifyHtml) || $t.emptyPara),
                o = this.$editable.html() !== e;this.$editable.html(e), this.$editable.height(this.options.height ? this.$codable.height() : "auto"), this.$editor.removeClass("codeview"), o && this.context.triggerEvent("change", this.$editable.html(), this.$editable), this.$editable.focus(), this.context.invoke("toolbar.updateCodeview", !1);
        }, t.prototype.destroy = function () {
            this.isActivated() && this.deactivate();
        }, t;
    }(),
        qt = function () {
        function t(t) {
            this.$document = C(document), this.$statusbar = t.layoutInfo.statusbar, this.$editable = t.layoutInfo.editable, this.options = t.options;
        }return t.prototype.initialize = function () {
            var n = this;this.options.airMode || this.options.disableResizeEditor ? this.destroy() : this.$statusbar.on("mousedown", function (t) {
                t.preventDefault(), t.stopPropagation();var o = n.$editable.offset().top - n.$document.scrollTop(),
                    e = function e(t) {
                    var e = t.clientY - (o + 24);e = 0 < n.options.minheight ? Math.max(e, n.options.minheight) : e, e = 0 < n.options.maxHeight ? Math.min(e, n.options.maxHeight) : e, n.$editable.height(e);
                };n.$document.on("mousemove", e).one("mouseup", function () {
                    n.$document.off("mousemove", e);
                });
            });
        }, t.prototype.destroy = function () {
            this.$statusbar.off(), this.$statusbar.addClass("locked");
        }, t;
    }(),
        Gt = function () {
        function t(t) {
            var e = this;this.context = t, this.$editor = t.layoutInfo.editor, this.$toolbar = t.layoutInfo.toolbar, this.$editable = t.layoutInfo.editable, this.$codable = t.layoutInfo.codable, this.$window = C(window), this.$scrollbar = C("html, body"), this.onResize = function () {
                e.resizeTo({ h: e.$window.height() - e.$toolbar.outerHeight() });
            };
        }return t.prototype.resizeTo = function (t) {
            this.$editable.css("height", t.h), this.$codable.css("height", t.h), this.$codable.data("cmeditor") && this.$codable.data("cmeditor").setsize(null, t.h);
        }, t.prototype.toggle = function () {
            this.$editor.toggleClass("fullscreen"), this.isFullscreen() ? (this.$editable.data("orgHeight", this.$editable.css("height")), this.$editable.data("orgMaxHeight", this.$editable.css("maxHeight")), this.$editable.css("maxHeight", ""), this.$window.on("resize", this.onResize).trigger("resize"), this.$scrollbar.css("overflow", "hidden")) : (this.$window.off("resize", this.onResize), this.resizeTo({ h: this.$editable.data("orgHeight") }), this.$editable.css("maxHeight", this.$editable.css("orgMaxHeight")), this.$scrollbar.css("overflow", "visible")), this.context.invoke("toolbar.updateFullscreen", this.isFullscreen());
        }, t.prototype.isFullscreen = function () {
            return this.$editor.hasClass("fullscreen");
        }, t;
    }(),
        _t = function () {
        function t(t) {
            var o = this;this.context = t, this.$document = C(document), this.$editingArea = t.layoutInfo.editingArea, this.options = t.options, this.lang = this.options.langInfo, this.events = { "summernote.mousedown": function summernoteMousedown(t, e) {
                    o.update(e.target, e) && e.preventDefault();
                }, "summernote.keyup summernote.scroll summernote.change summernote.dialog.shown": function summernoteKeyupSummernoteScrollSummernoteChangeSummernoteDialogShown() {
                    o.update();
                }, "summernote.disable": function summernoteDisable() {
                    o.hide();
                }, "summernote.codeview.toggled": function summernoteCodeviewToggled() {
                    o.update();
                } };
        }return t.prototype.initialize = function () {
            var r = this;this.$handle = C(['<div class="note-handle">', '<div class="note-control-selection">', '<div class="note-control-selection-bg"></div>', '<div class="note-control-holder note-control-nw"></div>', '<div class="note-control-holder note-control-ne"></div>', '<div class="note-control-holder note-control-sw"></div>', '<div class="', this.options.disableResizeImage ? "note-control-holder" : "note-control-sizing", ' note-control-se"></div>', this.options.disableResizeImage ? "" : '<div class="note-control-selection-info"></div>', "</div>", "</div>"].join("")).prependTo(this.$editingArea), this.$handle.on("mousedown", function (t) {
                if ($t.isControlSizing(t.target)) {
                    t.preventDefault(), t.stopPropagation();var e = r.$handle.find(".note-control-selection").data("target"),
                        o = e.offset(),
                        n = r.$document.scrollTop(),
                        i = function i(t) {
                        r.context.invoke("editor.resizeTo", { x: t.clientX - o.left, y: t.clientY - (o.top - n) }, e, !t.shiftKey), r.update(e[0]);
                    };r.$document.on("mousemove", i).one("mouseup", function (t) {
                        t.preventDefault(), r.$document.off("mousemove", i), r.context.invoke("editor.afterCommand");
                    }), e.data("ratio") || e.data("ratio", e.height() / e.width());
                }
            }), this.$handle.on("wheel", function (t) {
                t.preventDefault(), r.update();
            });
        }, t.prototype.destroy = function () {
            this.$handle.remove();
        }, t.prototype.update = function (t, e) {
            if (this.context.isDisabled()) return !1;var o = $t.isImg(t),
                n = this.$handle.find(".note-control-selection");if (this.context.invoke("imagePopover.update", t, e), o) {
                var i = C(t),
                    r = i.position(),
                    s = { left: r.left + parseInt(i.css("marginLeft"), 10), top: r.top + parseInt(i.css("marginTop"), 10) },
                    a = { w: i.outerWidth(!1), h: i.outerHeight(!1) };n.css({ display: "block", left: s.left, top: s.top, width: a.w, height: a.h }).data("target", i);var l = new Image();l.src = i.attr("src");var c = a.w + "x" + a.h + " (" + this.lang.image.original + ": " + l.width + "x" + l.height + ")";n.find(".note-control-selection-info").text(c), this.context.invoke("editor.saveTarget", t);
            } else this.hide();return o;
        }, t.prototype.hide = function () {
            this.context.invoke("editor.clearTarget"), this.$handle.children().hide();
        }, t;
    }(),
        Zt = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/]{2}|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i,
        Yt = function () {
        function t(t) {
            var o = this;this.context = t, this.events = { "summernote.keyup": function summernoteKeyup(t, e) {
                    e.isDefaultPrevented() || o.handleKeyup(e);
                }, "summernote.keydown": function summernoteKeydown(t, e) {
                    o.handleKeydown(e);
                } };
        }return t.prototype.initialize = function () {
            this.lastWordRange = null;
        }, t.prototype.destroy = function () {
            this.lastWordRange = null;
        }, t.prototype.replace = function () {
            if (this.lastWordRange) {
                var t = this.lastWordRange.toString(),
                    e = t.match(Zt);if (e && (e[1] || e[2])) {
                    var o = e[1] ? t : "http://" + t,
                        n = C("<a />").html(t).attr("href", o)[0];this.context.options.linkTargetBlank && C(n).attr("target", "_blank"), this.lastWordRange.insertNode(n), this.lastWordRange = null, this.context.invoke("editor.focus");
                }
            }
        }, t.prototype.handleKeydown = function (t) {
            if (B.contains([Pt.code.ENTER, Pt.code.SPACE], t.keyCode)) {
                var e = this.context.invoke("editor.createRange").getWordRange();this.lastWordRange = e;
            }
        }, t.prototype.handleKeyup = function (t) {
            B.contains([Pt.code.ENTER, Pt.code.SPACE], t.keyCode) && this.replace();
        }, t;
    }(),
        Qt = function () {
        function t(t) {
            var e = this;this.$note = t.layoutInfo.note, this.events = { "summernote.change": function summernoteChange() {
                    e.$note.val(t.invoke("code"));
                } };
        }return t.prototype.shouldInitialize = function () {
            return $t.isTextarea(this.$note[0]);
        }, t;
    }(),
        Jt = function () {
        function t(t) {
            var o = this;this.context = t, this.options = t.options.replace || {}, this.keys = [Pt.code.ENTER, Pt.code.SPACE, Pt.code.PERIOD, Pt.code.COMMA, Pt.code.SEMICOLON, Pt.code.SLASH], this.previousKeydownCode = null, this.events = { "summernote.keyup": function summernoteKeyup(t, e) {
                    e.isDefaultPrevented() || o.handleKeyup(e);
                }, "summernote.keydown": function summernoteKeydown(t, e) {
                    o.handleKeydown(e);
                } };
        }return t.prototype.shouldInitialize = function () {
            return !!this.options.match;
        }, t.prototype.initialize = function () {
            this.lastWord = null;
        }, t.prototype.destroy = function () {
            this.lastWord = null;
        }, t.prototype.replace = function () {
            if (this.lastWord) {
                var o = this,
                    t = this.lastWord.toString();this.options.match(t, function (t) {
                    if (t) {
                        var e = "";if ("string" == typeof t ? e = $t.createText(t) : t instanceof jQuery ? e = t[0] : t instanceof Node && (e = t), !e) return;o.lastWord.insertNode(e), o.lastWord = null, o.context.invoke("editor.focus");
                    }
                });
            }
        }, t.prototype.handleKeydown = function (t) {
            if (this.previousKeydownCode && B.contains(this.keys, this.previousKeydownCode)) this.previousKeydownCode = t.keyCode;else {
                if (B.contains(this.keys, t.keyCode)) {
                    var e = this.context.invoke("editor.createRange").getWordRange();this.lastWord = e;
                }this.previousKeydownCode = t.keyCode;
            }
        }, t.prototype.handleKeyup = function (t) {
            B.contains(this.keys, t.keyCode) && this.replace();
        }, t;
    }(),
        Xt = function () {
        function t(t) {
            var e = this;this.context = t, this.$editingArea = t.layoutInfo.editingArea, this.options = t.options, this.events = { "summernote.init summernote.change": function summernoteInitSummernoteChange() {
                    e.update();
                }, "summernote.codeview.toggled": function summernoteCodeviewToggled() {
                    e.update();
                } };
        }return t.prototype.shouldInitialize = function () {
            return !!this.options.placeholder;
        }, t.prototype.initialize = function () {
            var t = this;this.$placeholder = C('<div class="note-placeholder">'), this.$placeholder.on("click", function () {
                t.context.invoke("focus");
            }).html(this.options.placeholder).prependTo(this.$editingArea), this.update();
        }, t.prototype.destroy = function () {
            this.$placeholder.remove();
        }, t.prototype.update = function () {
            var t = !this.context.invoke("codeview.isActivated") && this.context.invoke("editor.isEmpty");this.$placeholder.toggle(t);
        }, t;
    }(),
        te = function () {
        function t(t) {
            this.ui = C.summernote.ui, this.context = t, this.$toolbar = t.layoutInfo.toolbar, this.options = t.options, this.lang = this.options.langInfo, this.invertedKeyMap = A.invertObject(this.options.keyMap[R.isMac ? "mac" : "pc"]);
        }return t.prototype.representShortcut = function (t) {
            var e = this.invertedKeyMap[t];return this.options.shortcuts && e ? (R.isMac && (e = e.replace("CMD", "⌘").replace("SHIFT", "⇧")), " (" + (e = e.replace("BACKSLASH", "\\").replace("SLASH", "/").replace("LEFTBRACKET", "[").replace("RIGHTBRACKET", "]")) + ")") : "";
        }, t.prototype.button = function (t) {
            return !this.options.tooltip && t.tooltip && delete t.tooltip, t.container = this.options.container, this.ui.button(t);
        }, t.prototype.initialize = function () {
            this.addToolbarButtons(), this.addImagePopoverButtons(), this.addLinkPopoverButtons(), this.addTablePopoverButtons(), this.fontInstalledMap = {};
        }, t.prototype.destroy = function () {
            delete this.fontInstalledMap;
        }, t.prototype.isFontInstalled = function (t) {
            return this.fontInstalledMap.hasOwnProperty(t) || (this.fontInstalledMap[t] = R.isFontInstalled(t) || B.contains(this.options.fontNamesIgnoreCheck, t)), this.fontInstalledMap[t];
        }, t.prototype.isFontDeservedToAdd = function (t) {
            return "" !== (t = t.toLowerCase()) && this.isFontInstalled(t) && -1 === ["sans-serif", "serif", "monospace", "cursive", "fantasy"].indexOf(t);
        }, t.prototype.colorPalette = function (h, t, o, n) {
            var p = this;return this.ui.buttonGroup({ className: "note-color " + h, children: [this.button({ className: "note-current-color-button", contents: this.ui.icon(this.options.icons.font + " note-recent-color"), tooltip: t, click: function click(t) {
                        var e = C(t.currentTarget);o && n ? p.context.invoke("editor.color", { backColor: e.attr("data-backColor"), foreColor: e.attr("data-foreColor") }) : o ? p.context.invoke("editor.color", { backColor: e.attr("data-backColor") }) : n && p.context.invoke("editor.color", { foreColor: e.attr("data-foreColor") });
                    }, callback: function callback(t) {
                        var e = t.find(".note-recent-color");o && (e.css("background-color", p.options.colorButton.backColor), t.attr("data-backColor", p.options.colorButton.backColor)), n ? (e.css("color", p.options.colorButton.foreColor), t.attr("data-foreColor", p.options.colorButton.foreColor)) : e.css("color", "transparent");
                    } }), this.button({ className: "dropdown-toggle", contents: this.ui.dropdownButtonContents("", this.options), tooltip: this.lang.color.more, data: { toggle: "dropdown" } }), this.ui.dropdown({ items: (o ? ['<div class="note-palette">', '  <div class="note-palette-title">' + this.lang.color.background + "</div>", "  <div>", '    <button type="button" class="note-color-reset btn btn-light" data-event="backColor" data-value="inherit">', this.lang.color.transparent, "    </button>", "  </div>", '  <div class="note-holder" data-event="backColor"/>', "  <div>", '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="backColorPicker">', this.lang.color.cpSelect, "    </button>", '    <input type="color" id="backColorPicker" class="note-btn note-color-select-btn" value="' + this.options.colorButton.backColor + '" data-event="backColorPalette">', "  </div>", '  <div class="note-holder-custom" id="backColorPalette" data-event="backColor"/>', "</div>"].join("") : "") + (n ? ['<div class="note-palette">', '  <div class="note-palette-title">' + this.lang.color.foreground + "</div>", "  <div>", '    <button type="button" class="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor">', this.lang.color.resetToDefault, "    </button>", "  </div>", '  <div class="note-holder" data-event="foreColor"/>', "  <div>", '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="foreColorPicker">', this.lang.color.cpSelect, "    </button>", '    <input type="color" id="foreColorPicker" class="note-btn note-color-select-btn" value="' + this.options.colorButton.foreColor + '" data-event="foreColorPalette">', '  <div class="note-holder-custom" id="foreColorPalette" data-event="foreColor"/>', "</div>"].join("") : ""), callback: function callback(o) {
                        o.find(".note-holder").each(function (t, e) {
                            var o = C(e);o.append(p.ui.palette({ colors: p.options.colors, colorsName: p.options.colorsName, eventName: o.data("event"), container: p.options.container, tooltip: p.options.tooltip }).render());
                        });var n = [["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]];o.find(".note-holder-custom").each(function (t, e) {
                            var o = C(e);o.append(p.ui.palette({ colors: n, colorsName: n, eventName: o.data("event"), container: p.options.container, tooltip: p.options.tooltip }).render());
                        }), o.find("input[type=color]").each(function (t, e) {
                            C(e).change(function () {
                                var t = o.find("#" + C(this).data("event")).find(".note-color-btn").first(),
                                    e = this.value.toUpperCase();t.css("background-color", e).attr("aria-label", e).attr("data-value", e).attr("data-original-title", e), t.click();
                            });
                        });
                    }, click: function click(t) {
                        t.stopPropagation();var e = C("." + h),
                            o = C(t.target),
                            n = o.data("event"),
                            i = o.attr("data-value");if ("openPalette" === n) {
                            var r = e.find("#" + i),
                                s = C(e.find("#" + r.data("event")).find(".note-color-row")[0]),
                                a = s.find(".note-color-btn").last().detach(),
                                l = r.val();a.css("background-color", l).attr("aria-label", l).attr("data-value", l).attr("data-original-title", l), s.prepend(a), r.click();
                        } else if (B.contains(["backColor", "foreColor"], n)) {
                            var c = "backColor" === n ? "background-color" : "color",
                                d = o.closest(".note-color").find(".note-recent-color"),
                                u = o.closest(".note-color").find(".note-current-color-button");d.css(c, i), u.attr("data-" + n, i), p.context.invoke("editor." + n, i);
                        }
                    } })] }).render();
        }, t.prototype.addToolbarButtons = function () {
            var n = this;this.context.memo("button.style", function () {
                return n.ui.buttonGroup([n.button({ className: "dropdown-toggle", contents: n.ui.dropdownButtonContents(n.ui.icon(n.options.icons.magic), n.options), tooltip: n.lang.style.style, data: { toggle: "dropdown" } }), n.ui.dropdown({ className: "dropdown-style", items: n.options.styleTags, title: n.lang.style.style, template: function template(t) {
                        "string" == typeof t && (t = { tag: t, title: n.lang.style.hasOwnProperty(t) ? n.lang.style[t] : t });var e = t.tag,
                            o = t.title;return "<" + e + (t.style ? ' style="' + t.style + '" ' : "") + (t.className ? ' class="' + t.className + '"' : "") + ">" + o + "</" + e + ">";
                    }, click: n.context.createInvokeHandler("editor.formatBlock") })]).render();
            });for (var t = function t(_t3, e) {
                var o = i.options.styleTags[_t3];i.context.memo("button.style." + o, function () {
                    return n.button({ className: "note-btn-style-" + o, contents: '<div data-value="' + o + '">' + o.toUpperCase() + "</div>", tooltip: n.lang.style[o], click: n.context.createInvokeHandler("editor.formatBlock") }).render();
                });
            }, i = this, e = 0, o = this.options.styleTags.length; e < o; e++) {
                t(e);
            }this.context.memo("button.bold", function () {
                return n.button({ className: "note-btn-bold", contents: n.ui.icon(n.options.icons.bold), tooltip: n.lang.font.bold + n.representShortcut("bold"), click: n.context.createInvokeHandlerAndUpdateState("editor.bold") }).render();
            }), this.context.memo("button.italic", function () {
                return n.button({ className: "note-btn-italic", contents: n.ui.icon(n.options.icons.italic), tooltip: n.lang.font.italic + n.representShortcut("italic"), click: n.context.createInvokeHandlerAndUpdateState("editor.italic") }).render();
            }), this.context.memo("button.underline", function () {
                return n.button({ className: "note-btn-underline", contents: n.ui.icon(n.options.icons.underline), tooltip: n.lang.font.underline + n.representShortcut("underline"), click: n.context.createInvokeHandlerAndUpdateState("editor.underline") }).render();
            }), this.context.memo("button.clear", function () {
                return n.button({ contents: n.ui.icon(n.options.icons.eraser), tooltip: n.lang.font.clear + n.representShortcut("removeFormat"), click: n.context.createInvokeHandler("editor.removeFormat") }).render();
            }), this.context.memo("button.strikethrough", function () {
                return n.button({ className: "note-btn-strikethrough", contents: n.ui.icon(n.options.icons.strikethrough), tooltip: n.lang.font.strikethrough + n.representShortcut("strikethrough"), click: n.context.createInvokeHandlerAndUpdateState("editor.strikethrough") }).render();
            }), this.context.memo("button.superscript", function () {
                return n.button({ className: "note-btn-superscript", contents: n.ui.icon(n.options.icons.superscript), tooltip: n.lang.font.superscript, click: n.context.createInvokeHandlerAndUpdateState("editor.superscript") }).render();
            }), this.context.memo("button.subscript", function () {
                return n.button({ className: "note-btn-subscript", contents: n.ui.icon(n.options.icons.subscript), tooltip: n.lang.font.subscript, click: n.context.createInvokeHandlerAndUpdateState("editor.subscript") }).render();
            }), this.context.memo("button.fontname", function () {
                var t = n.context.invoke("editor.currentStyle");return C.each(t["font-family"].split(","), function (t, e) {
                    e = e.trim().replace(/['"]+/g, ""), n.isFontDeservedToAdd(e) && -1 === n.options.fontNames.indexOf(e) && n.options.fontNames.push(e);
                }), n.ui.buttonGroup([n.button({ className: "dropdown-toggle", contents: n.ui.dropdownButtonContents('<span class="note-current-fontname"/>', n.options), tooltip: n.lang.font.name, data: { toggle: "dropdown" } }), n.ui.dropdownCheck({ className: "dropdown-fontname", checkClassName: n.options.icons.menuCheck, items: n.options.fontNames.filter(n.isFontInstalled.bind(n)), title: n.lang.font.name, template: function template(t) {
                        return "<span style=\"font-family: '" + t + "'\">" + t + "</span>";
                    }, click: n.context.createInvokeHandlerAndUpdateState("editor.fontName") })]).render();
            }), this.context.memo("button.fontsize", function () {
                return n.ui.buttonGroup([n.button({ className: "dropdown-toggle", contents: n.ui.dropdownButtonContents('<span class="note-current-fontsize"/>', n.options), tooltip: n.lang.font.size, data: { toggle: "dropdown" } }), n.ui.dropdownCheck({ className: "dropdown-fontsize", checkClassName: n.options.icons.menuCheck, items: n.options.fontSizes, title: n.lang.font.size, click: n.context.createInvokeHandlerAndUpdateState("editor.fontSize") })]).render();
            }), this.context.memo("button.color", function () {
                return n.colorPalette("note-color-all", n.lang.color.recent, !0, !0);
            }), this.context.memo("button.forecolor", function () {
                return n.colorPalette("note-color-fore", n.lang.color.foreground, !1, !0);
            }), this.context.memo("button.backcolor", function () {
                return n.colorPalette("note-color-back", n.lang.color.background, !0, !1);
            }), this.context.memo("button.ul", function () {
                return n.button({ contents: n.ui.icon(n.options.icons.unorderedlist), tooltip: n.lang.lists.unordered + n.representShortcut("insertUnorderedList"), click: n.context.createInvokeHandler("editor.insertUnorderedList") }).render();
            }), this.context.memo("button.ol", function () {
                return n.button({ contents: n.ui.icon(n.options.icons.orderedlist), tooltip: n.lang.lists.ordered + n.representShortcut("insertOrderedList"), click: n.context.createInvokeHandler("editor.insertOrderedList") }).render();
            });var r = this.button({ contents: this.ui.icon(this.options.icons.alignLeft), tooltip: this.lang.paragraph.left + this.representShortcut("justifyLeft"), click: this.context.createInvokeHandler("editor.justifyLeft") }),
                s = this.button({ contents: this.ui.icon(this.options.icons.alignCenter), tooltip: this.lang.paragraph.center + this.representShortcut("justifyCenter"), click: this.context.createInvokeHandler("editor.justifyCenter") }),
                a = this.button({ contents: this.ui.icon(this.options.icons.alignRight), tooltip: this.lang.paragraph.right + this.representShortcut("justifyRight"), click: this.context.createInvokeHandler("editor.justifyRight") }),
                l = this.button({ contents: this.ui.icon(this.options.icons.alignJustify), tooltip: this.lang.paragraph.justify + this.representShortcut("justifyFull"), click: this.context.createInvokeHandler("editor.justifyFull") }),
                c = this.button({ contents: this.ui.icon(this.options.icons.outdent), tooltip: this.lang.paragraph.outdent + this.representShortcut("outdent"), click: this.context.createInvokeHandler("editor.outdent") }),
                d = this.button({ contents: this.ui.icon(this.options.icons.indent), tooltip: this.lang.paragraph.indent + this.representShortcut("indent"), click: this.context.createInvokeHandler("editor.indent") });this.context.memo("button.justifyLeft", A.invoke(r, "render")), this.context.memo("button.justifyCenter", A.invoke(s, "render")), this.context.memo("button.justifyRight", A.invoke(a, "render")), this.context.memo("button.justifyFull", A.invoke(l, "render")), this.context.memo("button.outdent", A.invoke(c, "render")), this.context.memo("button.indent", A.invoke(d, "render")), this.context.memo("button.paragraph", function () {
                return n.ui.buttonGroup([n.button({ className: "dropdown-toggle", contents: n.ui.dropdownButtonContents(n.ui.icon(n.options.icons.alignLeft), n.options), tooltip: n.lang.paragraph.paragraph, data: { toggle: "dropdown" } }), n.ui.dropdown([n.ui.buttonGroup({ className: "note-align", children: [r, s, a, l] }), n.ui.buttonGroup({ className: "note-list", children: [c, d] })])]).render();
            }), this.context.memo("button.height", function () {
                return n.ui.buttonGroup([n.button({ className: "dropdown-toggle", contents: n.ui.dropdownButtonContents(n.ui.icon(n.options.icons.textHeight), n.options), tooltip: n.lang.font.height, data: { toggle: "dropdown" } }), n.ui.dropdownCheck({ items: n.options.lineHeights, checkClassName: n.options.icons.menuCheck, className: "dropdown-line-height", title: n.lang.font.height, click: n.context.createInvokeHandler("editor.lineHeight") })]).render();
            }), this.context.memo("button.table", function () {
                return n.ui.buttonGroup([n.button({ className: "dropdown-toggle", contents: n.ui.dropdownButtonContents(n.ui.icon(n.options.icons.table), n.options), tooltip: n.lang.table.table, data: { toggle: "dropdown" } }), n.ui.dropdown({ title: n.lang.table.table, className: "note-table", items: ['<div class="note-dimension-picker">', '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>', '  <div class="note-dimension-picker-highlighted"/>', '  <div class="note-dimension-picker-unhighlighted"/>', "</div>", '<div class="note-dimension-display">1 x 1</div>'].join("") })], { callback: function callback(t) {
                        t.find(".note-dimension-picker-mousecatcher").css({ width: n.options.insertTableMaxSize.col + "em", height: n.options.insertTableMaxSize.row + "em" }).mousedown(n.context.createInvokeHandler("editor.insertTable")).on("mousemove", n.tableMoveHandler.bind(n));
                    } }).render();
            }), this.context.memo("button.link", function () {
                return n.button({ contents: n.ui.icon(n.options.icons.link), tooltip: n.lang.link.link + n.representShortcut("linkDialog.show"), click: n.context.createInvokeHandler("linkDialog.show") }).render();
            }), this.context.memo("button.picture", function () {
                return n.button({ contents: n.ui.icon(n.options.icons.picture), tooltip: n.lang.image.image, click: n.context.createInvokeHandler("imageDialog.show") }).render();
            }), this.context.memo("button.video", function () {
                return n.button({ contents: n.ui.icon(n.options.icons.video), tooltip: n.lang.video.video, click: n.context.createInvokeHandler("videoDialog.show") }).render();
            }), this.context.memo("button.hr", function () {
                return n.button({ contents: n.ui.icon(n.options.icons.minus), tooltip: n.lang.hr.insert + n.representShortcut("insertHorizontalRule"), click: n.context.createInvokeHandler("editor.insertHorizontalRule") }).render();
            }), this.context.memo("button.fullscreen", function () {
                return n.button({ className: "btn-fullscreen", contents: n.ui.icon(n.options.icons.arrowsAlt), tooltip: n.lang.options.fullscreen, click: n.context.createInvokeHandler("fullscreen.toggle") }).render();
            }), this.context.memo("button.codeview", function () {
                return n.button({ className: "btn-codeview", contents: n.ui.icon(n.options.icons.code), tooltip: n.lang.options.codeview, click: n.context.createInvokeHandler("codeview.toggle") }).render();
            }), this.context.memo("button.redo", function () {
                return n.button({ contents: n.ui.icon(n.options.icons.redo), tooltip: n.lang.history.redo + n.representShortcut("redo"), click: n.context.createInvokeHandler("editor.redo") }).render();
            }), this.context.memo("button.undo", function () {
                return n.button({ contents: n.ui.icon(n.options.icons.undo), tooltip: n.lang.history.undo + n.representShortcut("undo"), click: n.context.createInvokeHandler("editor.undo") }).render();
            }), this.context.memo("button.help", function () {
                return n.button({ contents: n.ui.icon(n.options.icons.question), tooltip: n.lang.options.help, click: n.context.createInvokeHandler("helpDialog.show") }).render();
            });
        }, t.prototype.addImagePopoverButtons = function () {
            var t = this;this.context.memo("button.resizeFull", function () {
                return t.button({ contents: '<span class="note-fontsize-10">100%</span>', tooltip: t.lang.image.resizeFull, click: t.context.createInvokeHandler("editor.resize", "1") }).render();
            }), this.context.memo("button.resizeHalf", function () {
                return t.button({ contents: '<span class="note-fontsize-10">50%</span>', tooltip: t.lang.image.resizeHalf, click: t.context.createInvokeHandler("editor.resize", "0.5") }).render();
            }), this.context.memo("button.resizeQuarter", function () {
                return t.button({ contents: '<span class="note-fontsize-10">25%</span>', tooltip: t.lang.image.resizeQuarter, click: t.context.createInvokeHandler("editor.resize", "0.25") }).render();
            }), this.context.memo("button.resizeNone", function () {
                return t.button({ contents: t.ui.icon(t.options.icons.rollback), tooltip: t.lang.image.resizeNone, click: t.context.createInvokeHandler("editor.resize", "0") }).render();
            }), this.context.memo("button.floatLeft", function () {
                return t.button({ contents: t.ui.icon(t.options.icons.floatLeft), tooltip: t.lang.image.floatLeft, click: t.context.createInvokeHandler("editor.floatMe", "left") }).render();
            }), this.context.memo("button.floatRight", function () {
                return t.button({ contents: t.ui.icon(t.options.icons.floatRight), tooltip: t.lang.image.floatRight, click: t.context.createInvokeHandler("editor.floatMe", "right") }).render();
            }), this.context.memo("button.floatNone", function () {
                return t.button({ contents: t.ui.icon(t.options.icons.rollback), tooltip: t.lang.image.floatNone, click: t.context.createInvokeHandler("editor.floatMe", "none") }).render();
            }), this.context.memo("button.removeMedia", function () {
                return t.button({ contents: t.ui.icon(t.options.icons.trash), tooltip: t.lang.image.remove, click: t.context.createInvokeHandler("editor.removeMedia") }).render();
            });
        }, t.prototype.addLinkPopoverButtons = function () {
            var t = this;this.context.memo("button.linkDialogShow", function () {
                return t.button({ contents: t.ui.icon(t.options.icons.link), tooltip: t.lang.link.edit, click: t.context.createInvokeHandler("linkDialog.show") }).render();
            }), this.context.memo("button.unlink", function () {
                return t.button({ contents: t.ui.icon(t.options.icons.unlink), tooltip: t.lang.link.unlink, click: t.context.createInvokeHandler("editor.unlink") }).render();
            });
        }, t.prototype.addTablePopoverButtons = function () {
            var t = this;this.context.memo("button.addRowUp", function () {
                return t.button({ className: "btn-md", contents: t.ui.icon(t.options.icons.rowAbove), tooltip: t.lang.table.addRowAbove, click: t.context.createInvokeHandler("editor.addRow", "top") }).render();
            }), this.context.memo("button.addRowDown", function () {
                return t.button({ className: "btn-md", contents: t.ui.icon(t.options.icons.rowBelow), tooltip: t.lang.table.addRowBelow, click: t.context.createInvokeHandler("editor.addRow", "bottom") }).render();
            }), this.context.memo("button.addColLeft", function () {
                return t.button({ className: "btn-md", contents: t.ui.icon(t.options.icons.colBefore), tooltip: t.lang.table.addColLeft, click: t.context.createInvokeHandler("editor.addCol", "left") }).render();
            }), this.context.memo("button.addColRight", function () {
                return t.button({ className: "btn-md", contents: t.ui.icon(t.options.icons.colAfter), tooltip: t.lang.table.addColRight, click: t.context.createInvokeHandler("editor.addCol", "right") }).render();
            }), this.context.memo("button.deleteRow", function () {
                return t.button({ className: "btn-md", contents: t.ui.icon(t.options.icons.rowRemove), tooltip: t.lang.table.delRow, click: t.context.createInvokeHandler("editor.deleteRow") }).render();
            }), this.context.memo("button.deleteCol", function () {
                return t.button({ className: "btn-md", contents: t.ui.icon(t.options.icons.colRemove), tooltip: t.lang.table.delCol, click: t.context.createInvokeHandler("editor.deleteCol") }).render();
            }), this.context.memo("button.deleteTable", function () {
                return t.button({ className: "btn-md", contents: t.ui.icon(t.options.icons.trash), tooltip: t.lang.table.delTable, click: t.context.createInvokeHandler("editor.deleteTable") }).render();
            });
        }, t.prototype.build = function (t, e) {
            for (var o = 0, n = e.length; o < n; o++) {
                for (var i = e[o], r = Array.isArray(i) ? i[0] : i, s = Array.isArray(i) ? 1 === i.length ? [i[0]] : i[1] : [i], a = this.ui.buttonGroup({ className: "note-" + r }).render(), l = 0, c = s.length; l < c; l++) {
                    var d = this.context.memo("button." + s[l]);d && a.append("function" == typeof d ? d() : d);
                }a.appendTo(t);
            }
        }, t.prototype.updateCurrentStyle = function (t) {
            var n = this,
                e = t || this.$toolbar,
                o = this.context.invoke("editor.currentStyle");if (this.updateBtnStates(e, { ".note-btn-bold": function noteBtnBold() {
                    return "bold" === o["font-bold"];
                }, ".note-btn-italic": function noteBtnItalic() {
                    return "italic" === o["font-italic"];
                }, ".note-btn-underline": function noteBtnUnderline() {
                    return "underline" === o["font-underline"];
                }, ".note-btn-subscript": function noteBtnSubscript() {
                    return "subscript" === o["font-subscript"];
                }, ".note-btn-superscript": function noteBtnSuperscript() {
                    return "superscript" === o["font-superscript"];
                }, ".note-btn-strikethrough": function noteBtnStrikethrough() {
                    return "strikethrough" === o["font-strikethrough"];
                } }), o["font-family"]) {
                var i = o["font-family"].split(",").map(function (t) {
                    return t.replace(/[\'\"]/g, "").replace(/\s+$/, "").replace(/^\s+/, "");
                }),
                    r = B.find(i, this.isFontInstalled.bind(this));e.find(".dropdown-fontname a").each(function (t, e) {
                    var o = C(e),
                        n = o.data("value") + "" == r + "";o.toggleClass("checked", n);
                }), e.find(".note-current-fontname").text(r).css("font-family", r);
            }if (o["font-size"]) {
                var s = o["font-size"];e.find(".dropdown-fontsize a").each(function (t, e) {
                    var o = C(e),
                        n = o.data("value") + "" == s + "";o.toggleClass("checked", n);
                }), e.find(".note-current-fontsize").text(s);
            }if (o["line-height"]) {
                var a = o["line-height"];e.find(".dropdown-line-height li a").each(function (t, e) {
                    var o = C(e).data("value") + "" == a + "";n.className = o ? "checked" : "";
                });
            }
        }, t.prototype.updateBtnStates = function (o, t) {
            var n = this;C.each(t, function (t, e) {
                n.ui.toggleBtnActive(o.find(t), e());
            });
        }, t.prototype.tableMoveHandler = function (t) {
            var e,
                o = C(t.target.parentNode),
                n = o.next(),
                i = o.find(".note-dimension-picker-mousecatcher"),
                r = o.find(".note-dimension-picker-highlighted"),
                s = o.find(".note-dimension-picker-unhighlighted");if (void 0 === t.offsetX) {
                var a = C(t.target).offset();e = { x: t.pageX - a.left, y: t.pageY - a.top };
            } else e = { x: t.offsetX, y: t.offsetY };var l = Math.ceil(e.x / 18) || 1,
                c = Math.ceil(e.y / 18) || 1;r.css({ width: l + "em", height: c + "em" }), i.data("value", l + "x" + c), 3 < l && l < this.options.insertTableMaxSize.col && s.css({ width: l + 1 + "em" }), 3 < c && c < this.options.insertTableMaxSize.row && s.css({ height: c + 1 + "em" }), n.html(l + " x " + c);
        }, t;
    }(),
        ee = function () {
        function t(t) {
            this.context = t, this.$window = C(window), this.$document = C(document), this.ui = C.summernote.ui, this.$note = t.layoutInfo.note, this.$editor = t.layoutInfo.editor, this.$toolbar = t.layoutInfo.toolbar, this.$editable = t.layoutInfo.editable, this.$statusbar = t.layoutInfo.statusbar, this.options = t.options, this.isFollowing = !1, this.followScroll = this.followScroll.bind(this);
        }return t.prototype.shouldInitialize = function () {
            return !this.options.airMode;
        }, t.prototype.initialize = function () {
            var t = this;this.options.toolbar = this.options.toolbar || [], this.options.toolbar.length ? this.context.invoke("buttons.build", this.$toolbar, this.options.toolbar) : this.$toolbar.hide(), this.options.toolbarContainer && this.$toolbar.appendTo(this.options.toolbarContainer), this.changeContainer(!1), this.$note.on("summernote.keyup summernote.mouseup summernote.change", function () {
                t.context.invoke("buttons.updateCurrentStyle");
            }), this.context.invoke("buttons.updateCurrentStyle"), this.options.followingToolbar && this.$window.on("scroll resize", this.followScroll);
        }, t.prototype.destroy = function () {
            this.$toolbar.children().remove(), this.options.followingToolbar && this.$window.off("scroll resize", this.followScroll);
        }, t.prototype.followScroll = function () {
            if (this.$editor.hasClass("fullscreen")) return !1;var t = this.$editor.outerHeight(),
                e = this.$editor.width(),
                o = this.$toolbar.height(),
                n = this.$statusbar.height(),
                i = 0;this.options.otherStaticBar && (i = C(this.options.otherStaticBar).outerHeight());var r = this.$document.scrollTop(),
                s = this.$editor.offset().top,
                a = s - i,
                l = s + t - i - o - n;!this.isFollowing && a < r && r < l - o ? (this.isFollowing = !0, this.$toolbar.css({ position: "fixed", top: i, width: e }), this.$editable.css({ marginTop: this.$toolbar.height() + 5 })) : this.isFollowing && (r < a || l < r) && (this.isFollowing = !1, this.$toolbar.css({ position: "relative", top: 0, width: "100%" }), this.$editable.css({ marginTop: "" }));
        }, t.prototype.changeContainer = function (t) {
            t ? this.$toolbar.prependTo(this.$editor) : this.options.toolbarContainer && this.$toolbar.appendTo(this.options.toolbarContainer), this.followScroll();
        }, t.prototype.updateFullscreen = function (t) {
            this.ui.toggleBtnActive(this.$toolbar.find(".btn-fullscreen"), t), this.changeContainer(t);
        }, t.prototype.updateCodeview = function (t) {
            this.ui.toggleBtnActive(this.$toolbar.find(".btn-codeview"), t), t ? this.deactivate() : this.activate();
        }, t.prototype.activate = function (t) {
            var e = this.$toolbar.find("button");t || (e = e.not(".btn-codeview")), this.ui.toggleBtn(e, !0);
        }, t.prototype.deactivate = function (t) {
            var e = this.$toolbar.find("button");t || (e = e.not(".btn-codeview")), this.ui.toggleBtn(e, !1);
        }, t;
    }(),
        oe = function () {
        function t(t) {
            this.context = t, this.ui = C.summernote.ui, this.$body = C(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo, t.memo("help.linkDialog.show", this.options.langInfo.help["linkDialog.show"]);
        }return t.prototype.initialize = function () {
            var t = this.options.dialogsInBody ? this.$body : this.$editor,
                e = ['<div class="form-group note-form-group">', '<label class="note-form-label">' + this.lang.link.textToDisplay + "</label>", '<input class="note-link-text form-control note-form-control note-input" type="text" />', "</div>", '<div class="form-group note-form-group">', '<label class="note-form-label">' + this.lang.link.url + "</label>", '<input class="note-link-url form-control note-form-control note-input" type="text" value="http://" />', "</div>", this.options.disableLinkTarget ? "" : C("<div/>").append(this.ui.checkbox({ className: "sn-checkbox-open-in-new-window", text: this.lang.link.openInNewWindow, checked: !0 }).render()).html()].join(""),
                o = '<input type="button" href="#" class="btn btn-primary note-btn note-btn-primary note-link-btn" value="' + this.lang.link.insert + '" disabled>';this.$dialog = this.ui.dialog({ className: "link-dialog", title: this.lang.link.insert, fade: this.options.dialogsFade, body: e, footer: o }).render().appendTo(t);
        }, t.prototype.destroy = function () {
            this.ui.hideDialog(this.$dialog), this.$dialog.remove();
        }, t.prototype.bindEnterKey = function (t, e) {
            t.on("keypress", function (t) {
                t.keyCode === Pt.code.ENTER && (t.preventDefault(), e.trigger("click"));
            });
        }, t.prototype.toggleLinkBtn = function (t, e, o) {
            this.ui.toggleBtn(t, e.val() && o.val());
        }, t.prototype.showLinkDialog = function (s) {
            var a = this;return C.Deferred(function (e) {
                var o = a.$dialog.find(".note-link-text"),
                    n = a.$dialog.find(".note-link-url"),
                    i = a.$dialog.find(".note-link-btn"),
                    r = a.$dialog.find(".sn-checkbox-open-in-new-window input[type=checkbox]");a.ui.onDialogShown(a.$dialog, function () {
                    a.context.triggerEvent("dialog.shown"), !s.url && A.isValidUrl(s.text) && (s.url = s.text), o.on("input paste propertychange", function () {
                        s.text = o.val(), a.toggleLinkBtn(i, o, n);
                    }).val(s.text), n.on("input paste propertychange", function () {
                        s.text || o.val(n.val()), a.toggleLinkBtn(i, o, n);
                    }).val(s.url), R.isSupportTouch || n.trigger("focus"), a.toggleLinkBtn(i, o, n), a.bindEnterKey(n, i), a.bindEnterKey(o, i);var t = void 0 !== s.isNewWindow ? s.isNewWindow : a.context.options.linkTargetBlank;r.prop("checked", t), i.one("click", function (t) {
                        t.preventDefault(), e.resolve({ range: s.range, url: n.val(), text: o.val(), isNewWindow: r.is(":checked") }), a.ui.hideDialog(a.$dialog);
                    });
                }), a.ui.onDialogHidden(a.$dialog, function () {
                    o.off(), n.off(), i.off(), "pending" === e.state() && e.reject();
                }), a.ui.showDialog(a.$dialog);
            }).promise();
        }, t.prototype.show = function () {
            var e = this,
                t = this.context.invoke("editor.getLinkInfo");this.context.invoke("editor.saveRange"), this.showLinkDialog(t).then(function (t) {
                e.context.invoke("editor.restoreRange"), e.context.invoke("editor.createLink", t);
            }).fail(function () {
                e.context.invoke("editor.restoreRange");
            });
        }, t;
    }(),
        ne = function () {
        function t(t) {
            var e = this;this.context = t, this.ui = C.summernote.ui, this.options = t.options, this.events = { "summernote.keyup summernote.mouseup summernote.change summernote.scroll": function summernoteKeyupSummernoteMouseupSummernoteChangeSummernoteScroll() {
                    e.update();
                }, "summernote.disable summernote.dialog.shown": function summernoteDisableSummernoteDialogShown() {
                    e.hide();
                } };
        }return t.prototype.shouldInitialize = function () {
            return !B.isEmpty(this.options.popover.link);
        }, t.prototype.initialize = function () {
            this.$popover = this.ui.popover({ className: "note-link-popover", callback: function callback(t) {
                    t.find(".popover-content,.note-popover-content").prepend('<span><a target="_blank"></a>&nbsp;</span>');
                } }).render().appendTo(this.options.container);var t = this.$popover.find(".popover-content,.note-popover-content");this.context.invoke("buttons.build", t, this.options.popover.link);
        }, t.prototype.destroy = function () {
            this.$popover.remove();
        }, t.prototype.update = function () {
            if (this.context.invoke("editor.hasFocus")) {
                var t = this.context.invoke("editor.getLastRange");if (t.isCollapsed() && t.isOnAnchor()) {
                    var e = $t.ancestor(t.sc, $t.isAnchor),
                        o = C(e).attr("href");this.$popover.find("a").attr("href", o).html(o);var n = $t.posFromPlaceholder(e);this.$popover.css({ display: "block", left: n.left, top: n.top });
                } else this.hide();
            } else this.hide();
        }, t.prototype.hide = function () {
            this.$popover.hide();
        }, t;
    }(),
        ie = function () {
        function t(t) {
            this.context = t, this.ui = C.summernote.ui, this.$body = C(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo;
        }return t.prototype.initialize = function () {
            var t = this.options.dialogsInBody ? this.$body : this.$editor,
                e = "";if (this.options.maximumImageFileSize) {
                var o = Math.floor(Math.log(this.options.maximumImageFileSize) / Math.log(1024)),
                    n = 1 * (this.options.maximumImageFileSize / Math.pow(1024, o)).toFixed(2) + " " + " KMGTP"[o] + "B";e = "<small>" + this.lang.image.maximumFileSize + " : " + n + "</small>";
            }var i = ['<div class="form-group note-form-group note-group-select-from-files">', '<label class="note-form-label">' + this.lang.image.selectFromFiles + "</label>", '<input class="note-image-input form-control-file note-form-control note-input" ', ' type="file" name="files" accept="image/*" multiple="multiple" />', e, "</div>", '<div class="form-group note-group-image-url" style="overflow:auto;">', '<label class="note-form-label">' + this.lang.image.url + "</label>", '<input class="note-image-url form-control note-form-control note-input ', ' col-md-12" type="text" />', "</div>"].join(""),
                r = '<input type="button" href="#" class="btn btn-primary note-btn note-btn-primary note-image-btn" value="' + this.lang.image.insert + '" disabled>';this.$dialog = this.ui.dialog({ title: this.lang.image.insert, fade: this.options.dialogsFade, body: i, footer: r }).render().appendTo(t);
        }, t.prototype.destroy = function () {
            this.ui.hideDialog(this.$dialog), this.$dialog.remove();
        }, t.prototype.bindEnterKey = function (t, e) {
            t.on("keypress", function (t) {
                t.keyCode === Pt.code.ENTER && (t.preventDefault(), e.trigger("click"));
            });
        }, t.prototype.show = function () {
            var e = this;this.context.invoke("editor.saveRange"), this.showImageDialog().then(function (t) {
                e.ui.hideDialog(e.$dialog), e.context.invoke("editor.restoreRange"), "string" == typeof t ? e.options.callbacks.onImageLinkInsert ? e.context.triggerEvent("image.link.insert", t) : e.context.invoke("editor.insertImage", t) : e.context.invoke("editor.insertImagesOrCallback", t);
            }).fail(function () {
                e.context.invoke("editor.restoreRange");
            });
        }, t.prototype.showImageDialog = function () {
            var i = this;return C.Deferred(function (e) {
                var t = i.$dialog.find(".note-image-input"),
                    o = i.$dialog.find(".note-image-url"),
                    n = i.$dialog.find(".note-image-btn");i.ui.onDialogShown(i.$dialog, function () {
                    i.context.triggerEvent("dialog.shown"), t.replaceWith(t.clone().on("change", function (t) {
                        e.resolve(t.target.files || t.target.value);
                    }).val("")), o.on("input paste propertychange", function () {
                        i.ui.toggleBtn(n, o.val());
                    }).val(""), R.isSupportTouch || o.trigger("focus"), n.click(function (t) {
                        t.preventDefault(), e.resolve(o.val());
                    }), i.bindEnterKey(o, n);
                }), i.ui.onDialogHidden(i.$dialog, function () {
                    t.off(), o.off(), n.off(), "pending" === e.state() && e.reject();
                }), i.ui.showDialog(i.$dialog);
            });
        }, t;
    }(),
        re = function () {
        function t(t) {
            var e = this;this.context = t, this.ui = C.summernote.ui, this.editable = t.layoutInfo.editable[0], this.options = t.options, this.events = { "summernote.disable": function summernoteDisable() {
                    e.hide();
                } };
        }return t.prototype.shouldInitialize = function () {
            return !B.isEmpty(this.options.popover.image);
        }, t.prototype.initialize = function () {
            this.$popover = this.ui.popover({ className: "note-image-popover" }).render().appendTo(this.options.container);var t = this.$popover.find(".popover-content,.note-popover-content");this.context.invoke("buttons.build", t, this.options.popover.image);
        }, t.prototype.destroy = function () {
            this.$popover.remove();
        }, t.prototype.update = function (t, e) {
            if ($t.isImg(t)) {
                var o = $t.posFromPlaceholder(t),
                    n = $t.posFromPlaceholder(this.editable);this.$popover.css({ display: "block", left: this.options.popatmouse ? e.pageX - 20 : o.left, top: this.options.popatmouse ? e.pageY : Math.min(o.top, n.top) });
            } else this.hide();
        }, t.prototype.hide = function () {
            this.$popover.hide();
        }, t;
    }(),
        se = function () {
        function t(t) {
            var o = this;this.context = t, this.ui = C.summernote.ui, this.options = t.options, this.events = { "summernote.mousedown": function summernoteMousedown(t, e) {
                    o.update(e.target);
                }, "summernote.keyup summernote.scroll summernote.change": function summernoteKeyupSummernoteScrollSummernoteChange() {
                    o.update();
                }, "summernote.disable": function summernoteDisable() {
                    o.hide();
                } };
        }return t.prototype.shouldInitialize = function () {
            return !B.isEmpty(this.options.popover.table);
        }, t.prototype.initialize = function () {
            this.$popover = this.ui.popover({ className: "note-table-popover" }).render().appendTo(this.options.container);var t = this.$popover.find(".popover-content,.note-popover-content");this.context.invoke("buttons.build", t, this.options.popover.table), R.isFF && document.execCommand("enableInlineTableEditing", !1, !1);
        }, t.prototype.destroy = function () {
            this.$popover.remove();
        }, t.prototype.update = function (t) {
            if (this.context.isDisabled()) return !1;var e = $t.isCell(t);if (e) {
                var o = $t.posFromPlaceholder(t);this.$popover.css({ display: "block", left: o.left, top: o.top });
            } else this.hide();return e;
        }, t.prototype.hide = function () {
            this.$popover.hide();
        }, t;
    }(),
        ae = function () {
        function t(t) {
            this.context = t, this.ui = C.summernote.ui, this.$body = C(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo;
        }return t.prototype.initialize = function () {
            var t = this.options.dialogsInBody ? this.$body : this.$editor,
                e = ['<div class="form-group note-form-group row-fluid">', '<label class="note-form-label">' + this.lang.video.url + ' <small class="text-muted">' + this.lang.video.providers + "</small></label>", '<input class="note-video-url form-control note-form-control note-input" type="text" />', "</div>"].join(""),
                o = '<input type="button" href="#" class="btn btn-primary note-btn note-btn-primary note-video-btn" value="' + this.lang.video.insert + '" disabled>';this.$dialog = this.ui.dialog({ title: this.lang.video.insert, fade: this.options.dialogsFade, body: e, footer: o }).render().appendTo(t);
        }, t.prototype.destroy = function () {
            this.ui.hideDialog(this.$dialog), this.$dialog.remove();
        }, t.prototype.bindEnterKey = function (t, e) {
            t.on("keypress", function (t) {
                t.keyCode === Pt.code.ENTER && (t.preventDefault(), e.trigger("click"));
            });
        }, t.prototype.createVideoNode = function (t) {
            var e,
                o = t.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?$/),
                n = t.match(/(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/),
                i = t.match(/\/\/vine\.co\/v\/([a-zA-Z0-9]+)/),
                r = t.match(/\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/),
                s = t.match(/.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/),
                a = t.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/),
                l = t.match(/\/\/v\.qq\.com.*?vid=(.+)/),
                c = t.match(/\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/),
                d = t.match(/^.+.(mp4|m4v)$/),
                u = t.match(/^.+.(ogg|ogv)$/),
                h = t.match(/^.+.(webm)$/),
                p = t.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/);if (o && 11 === o[1].length) {
                var f = o[1],
                    m = 0;if (void 0 !== o[2]) {
                    var g = o[2].match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);if (g) for (var v = [3600, 60, 1], b = 0, y = v.length; b < y; b++) {
                        m += void 0 !== g[b + 1] ? v[b] * parseInt(g[b + 1], 10) : 0;
                    }
                }e = C("<iframe>").attr("frameborder", 0).attr("src", "//www.youtube.com/embed/" + f + (0 < m ? "?start=" + m : "")).attr("width", "640").attr("height", "360");
            } else if (n && n[0].length) e = C("<iframe>").attr("frameborder", 0).attr("src", "https://instagram.com/p/" + n[1] + "/embed/").attr("width", "612").attr("height", "710").attr("scrolling", "no").attr("allowtransparency", "true");else if (i && i[0].length) e = C("<iframe>").attr("frameborder", 0).attr("src", i[0] + "/embed/simple").attr("width", "600").attr("height", "600").attr("class", "vine-embed");else if (r && r[3].length) e = C("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("src", "//player.vimeo.com/video/" + r[3]).attr("width", "640").attr("height", "360");else if (s && s[2].length) e = C("<iframe>").attr("frameborder", 0).attr("src", "//www.dailymotion.com/embed/video/" + s[2]).attr("width", "640").attr("height", "360");else if (a && a[1].length) e = C("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("height", "498").attr("width", "510").attr("src", "//player.youku.com/embed/" + a[1]);else if (l && l[1].length || c && c[2].length) {
                var k = l && l[1].length ? l[1] : c[2];e = C("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("height", "310").attr("width", "500").attr("src", "http://v.qq.com/iframe/player.html?vid=" + k + "&amp;auto=0");
            } else if (d || u || h) e = C("<video controls>").attr("src", t).attr("width", "640").attr("height", "360");else {
                if (!p || !p[0].length) return !1;e = C("<iframe>").attr("frameborder", 0).attr("src", "https://www.facebook.com/plugins/video.php?href=" + encodeURIComponent(p[0]) + "&show_text=0&width=560").attr("width", "560").attr("height", "301").attr("scrolling", "no").attr("allowtransparency", "true");
            }return e.addClass("note-video-clip"), e[0];
        }, t.prototype.show = function () {
            var o = this,
                t = this.context.invoke("editor.getSelectedText");this.context.invoke("editor.saveRange"), this.showVideoDialog(t).then(function (t) {
                o.ui.hideDialog(o.$dialog), o.context.invoke("editor.restoreRange");var e = o.createVideoNode(t);e && o.context.invoke("editor.insertNode", e);
            }).fail(function () {
                o.context.invoke("editor.restoreRange");
            });
        }, t.prototype.showVideoDialog = function (t) {
            var n = this;return C.Deferred(function (e) {
                var o = n.$dialog.find(".note-video-url"),
                    t = n.$dialog.find(".note-video-btn");n.ui.onDialogShown(n.$dialog, function () {
                    n.context.triggerEvent("dialog.shown"), o.on("input paste propertychange", function () {
                        n.ui.toggleBtn(t, o.val());
                    }), R.isSupportTouch || o.trigger("focus"), t.click(function (t) {
                        t.preventDefault(), e.resolve(o.val());
                    }), n.bindEnterKey(o, t);
                }), n.ui.onDialogHidden(n.$dialog, function () {
                    o.off(), t.off(), "pending" === e.state() && e.reject();
                }), n.ui.showDialog(n.$dialog);
            });
        }, t;
    }(),
        le = function () {
        function t(t) {
            this.context = t, this.ui = C.summernote.ui, this.$body = C(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo;
        }return t.prototype.initialize = function () {
            var t = this.options.dialogsInBody ? this.$body : this.$editor,
                e = ['<p class="text-center">', '<a href="http://summernote.org/" target="_blank">Summernote 0.8.12</a> · ', '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ', '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>', "</p>"].join("");this.$dialog = this.ui.dialog({ title: this.lang.options.help, fade: this.options.dialogsFade, body: this.createShortcutList(), footer: e, callback: function callback(t) {
                    t.find(".modal-body,.note-modal-body").css({ "max-height": 300, overflow: "scroll" });
                } }).render().appendTo(t);
        }, t.prototype.destroy = function () {
            this.ui.hideDialog(this.$dialog), this.$dialog.remove();
        }, t.prototype.createShortcutList = function () {
            var n = this,
                i = this.options.keyMap[R.isMac ? "mac" : "pc"];return Object.keys(i).map(function (t) {
                var e = i[t],
                    o = C('<div><div class="help-list-item"/></div>');return o.append(C("<label><kbd>" + t + "</kdb></label>").css({ width: 180, "margin-right": 10 })).append(C("<span/>").html(n.context.memo("help." + e) || e)), o.html();
            }).join("");
        }, t.prototype.showHelpDialog = function () {
            var e = this;return C.Deferred(function (t) {
                e.ui.onDialogShown(e.$dialog, function () {
                    e.context.triggerEvent("dialog.shown"), t.resolve();
                }), e.ui.showDialog(e.$dialog);
            }).promise();
        }, t.prototype.show = function () {
            var t = this;this.context.invoke("editor.saveRange"), this.showHelpDialog().then(function () {
                t.context.invoke("editor.restoreRange");
            });
        }, t;
    }(),
        ce = function () {
        function t(t) {
            var o = this;this.context = t, this.ui = C.summernote.ui, this.options = t.options, this.events = { "summernote.keyup summernote.mouseup summernote.scroll": function summernoteKeyupSummernoteMouseupSummernoteScroll() {
                    o.update();
                }, "summernote.disable summernote.change summernote.dialog.shown": function summernoteDisableSummernoteChangeSummernoteDialogShown() {
                    o.hide();
                }, "summernote.focusout": function summernoteFocusout(t, e) {
                    R.isFF || e.relatedTarget && $t.ancestor(e.relatedTarget, A.eq(o.$popover[0])) || o.hide();
                } };
        }return t.prototype.shouldInitialize = function () {
            return this.options.airMode && !B.isEmpty(this.options.popover.air);
        }, t.prototype.initialize = function () {
            this.$popover = this.ui.popover({ className: "note-air-popover" }).render().appendTo(this.options.container);var t = this.$popover.find(".popover-content");this.context.invoke("buttons.build", t, this.options.popover.air);
        }, t.prototype.destroy = function () {
            this.$popover.remove();
        }, t.prototype.update = function () {
            var t = this.context.invoke("editor.currentStyle");if (t.range && !t.range.isCollapsed()) {
                var e = B.last(t.range.getClientRects());if (e) {
                    var o = A.rect2bnd(e);this.$popover.css({ display: "block", left: Math.max(o.left + o.width / 2, 0) - 20, top: o.top + o.height }), this.context.invoke("buttons.updateCurrentStyle", this.$popover);
                }
            } else this.hide();
        }, t.prototype.hide = function () {
            this.$popover.hide();
        }, t;
    }(),
        de = function () {
        function t(t) {
            var o = this;this.context = t, this.ui = C.summernote.ui, this.$editable = t.layoutInfo.editable, this.options = t.options, this.hint = this.options.hint || [], this.direction = this.options.hintDirection || "bottom", this.hints = Array.isArray(this.hint) ? this.hint : [this.hint], this.events = { "summernote.keyup": function summernoteKeyup(t, e) {
                    e.isDefaultPrevented() || o.handleKeyup(e);
                }, "summernote.keydown": function summernoteKeydown(t, e) {
                    o.handleKeydown(e);
                }, "summernote.disable summernote.dialog.shown": function summernoteDisableSummernoteDialogShown() {
                    o.hide();
                } };
        }return t.prototype.shouldInitialize = function () {
            return 0 < this.hints.length;
        }, t.prototype.initialize = function () {
            var e = this;this.lastWordRange = null, this.$popover = this.ui.popover({ className: "note-hint-popover", hideArrow: !0, direction: "" }).render().appendTo(this.options.container), this.$popover.hide(), this.$content = this.$popover.find(".popover-content,.note-popover-content"), this.$content.on("click", ".note-hint-item", function (t) {
                e.$content.find(".active").removeClass("active"), C(t.currentTarget).addClass("active"), e.replace();
            });
        }, t.prototype.destroy = function () {
            this.$popover.remove();
        }, t.prototype.selectItem = function (t) {
            this.$content.find(".active").removeClass("active"), t.addClass("active"), this.$content[0].scrollTop = t[0].offsetTop - this.$content.innerHeight() / 2;
        }, t.prototype.moveDown = function () {
            var t = this.$content.find(".note-hint-item.active"),
                e = t.next();if (e.length) this.selectItem(e);else {
                var o = t.parent().next();o.length || (o = this.$content.find(".note-hint-group").first()), this.selectItem(o.find(".note-hint-item").first());
            }
        }, t.prototype.moveUp = function () {
            var t = this.$content.find(".note-hint-item.active"),
                e = t.prev();if (e.length) this.selectItem(e);else {
                var o = t.parent().prev();o.length || (o = this.$content.find(".note-hint-group").last()), this.selectItem(o.find(".note-hint-item").last());
            }
        }, t.prototype.replace = function () {
            var t = this.$content.find(".note-hint-item.active");if (t.length) {
                var e = this.nodeFromItem(t);this.lastWordRange.insertNode(e), At.createFromNode(e).collapse().select(), this.lastWordRange = null, this.hide(), this.context.triggerEvent("change", this.$editable.html(), this.$editable[0]), this.context.invoke("editor.focus");
            }
        }, t.prototype.nodeFromItem = function (t) {
            var e = this.hints[t.data("index")],
                o = t.data("item"),
                n = e.content ? e.content(o) : o;return "string" == typeof n && (n = $t.createText(n)), n;
        }, t.prototype.createItemTemplates = function (n, t) {
            var i = this.hints[n];return t.map(function (t, e) {
                var o = C('<div class="note-hint-item"/>');return o.append(i.template ? i.template(t) : t + ""), o.data({ index: n, item: t }), o;
            });
        }, t.prototype.handleKeydown = function (t) {
            this.$popover.is(":visible") && (t.keyCode === Pt.code.ENTER ? (t.preventDefault(), this.replace()) : t.keyCode === Pt.code.UP ? (t.preventDefault(), this.moveUp()) : t.keyCode === Pt.code.DOWN && (t.preventDefault(), this.moveDown()));
        }, t.prototype.searchKeyword = function (t, e, o) {
            var n = this.hints[t];if (n && n.match.test(e) && n.search) {
                var i = n.match.exec(e);n.search(i[1], o);
            } else o();
        }, t.prototype.createGroup = function (e, t) {
            var o = this,
                n = C('<div class="note-hint-group note-hint-group-' + e + '"/>');return this.searchKeyword(e, t, function (t) {
                (t = t || []).length && (n.html(o.createItemTemplates(e, t)), o.show());
            }), n;
        }, t.prototype.handleKeyup = function (t) {
            var o = this;if (!B.contains([Pt.code.ENTER, Pt.code.UP, Pt.code.DOWN], t.keyCode)) {
                var e = this.context.invoke("editor.getLastRange").getWordRange(),
                    n = e.toString();if (this.hints.length && n) {
                    this.$content.empty();var i = A.rect2bnd(B.last(e.getClientRects()));i && (this.$popover.hide(), this.lastWordRange = e, this.hints.forEach(function (t, e) {
                        t.match.test(n) && o.createGroup(e, n).appendTo(o.$content);
                    }), this.$content.find(".note-hint-item:first").addClass("active"), "top" === this.direction ? this.$popover.css({ left: i.left, top: i.top - this.$popover.outerHeight() - 5 }) : this.$popover.css({ left: i.left, top: i.top + i.height + 5 }));
                } else this.hide();
            }
        }, t.prototype.show = function () {
            this.$popover.show();
        }, t.prototype.hide = function () {
            this.$popover.hide();
        }, t;
    }();C.summernote = C.extend(C.summernote, { version: "0.8.12", plugins: {}, dom: $t, range: At, options: { langInfo: C.summernote.lang["en-US"], modules: { editor: jt, clipboard: Kt, dropzone: Wt, codeview: Vt, statusbar: qt, fullscreen: Gt, handle: _t, hintPopover: de, autoLink: Yt, autoSync: Qt, autoReplace: Jt, placeholder: Xt, buttons: te, toolbar: ee, linkDialog: oe, linkPopover: ne, imageDialog: ie, imagePopover: re, tablePopover: se, videoDialog: ae, helpDialog: le, airPopover: ce }, buttons: {}, lang: "en-US", followingToolbar: !1, otherStaticBar: "", toolbar: [["style", ["style"]], ["font", ["bold", "underline", "clear"]], ["fontname", ["fontname"]], ["color", ["color"]], ["para", ["ul", "ol", "paragraph"]], ["table", ["table"]], ["insert", ["link", "picture", "video"]], ["view", ["fullscreen", "codeview", "help"]]], popatmouse: !0, popover: { image: [["resize", ["resizeFull", "resizeHalf", "resizeQuarter", "resizeNone"]], ["float", ["floatLeft", "floatRight", "floatNone"]], ["remove", ["removeMedia"]]], link: [["link", ["linkDialogShow", "unlink"]]], table: [["add", ["addRowDown", "addRowUp", "addColLeft", "addColRight"]], ["delete", ["deleteRow", "deleteCol", "deleteTable"]]], air: [["color", ["color"]], ["font", ["bold", "underline", "clear"]], ["para", ["ul", "paragraph"]], ["table", ["table"]], ["insert", ["link", "picture"]]] }, airMode: !1, width: null, height: null, linkTargetBlank: !0, focus: !1, tabSize: 4, styleWithSpan: !0, shortcuts: !0, textareaAutoSync: !0, hintDirection: "bottom", tooltip: "auto", container: "body", maxTextLength: 0, blockquoteBreakingLevel: 2, spellCheck: !0, styleTags: ["p", "blockquote", "pre", "h1", "h2", "h3", "h4", "h5", "h6"], fontNames: ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Helvetica Neue", "Helvetica", "Impact", "Lucida Grande", "Tahoma", "Times New Roman", "Verdana"], fontNamesIgnoreCheck: [], fontSizes: ["8", "9", "10", "11", "12", "14", "18", "24", "36"], colors: [["#000000", "#424242", "#636363", "#9C9C94", "#CEC6CE", "#EFEFEF", "#F7F7F7", "#FFFFFF"], ["#FF0000", "#FF9C00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#9C00FF", "#FF00FF"], ["#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE"], ["#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD"], ["#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5"], ["#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#3984C6", "#634AA5", "#A54A7B"], ["#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842"], ["#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]], colorsName: [["Black", "Tundora", "Dove Gray", "Star Dust", "Pale Slate", "Gallery", "Alabaster", "White"], ["Red", "Orange Peel", "Yellow", "Green", "Cyan", "Blue", "Electric Violet", "Magenta"], ["Azalea", "Karry", "Egg White", "Zanah", "Botticelli", "Tropical Blue", "Mischka", "Twilight"], ["Tonys Pink", "Peach Orange", "Cream Brulee", "Sprout", "Casper", "Perano", "Cold Purple", "Careys Pink"], ["Mandy", "Rajah", "Dandelion", "Olivine", "Gulf Stream", "Viking", "Blue Marguerite", "Puce"], ["Guardsman Red", "Fire Bush", "Golden Dream", "Chelsea Cucumber", "Smalt Blue", "Boston Blue", "Butterfly Bush", "Cadillac"], ["Sangria", "Mai Tai", "Buddha Gold", "Forest Green", "Eden", "Venice Blue", "Meteorite", "Claret"], ["Rosewood", "Cinnamon", "Olive", "Parsley", "Tiber", "Midnight Blue", "Valentino", "Loulou"]], colorButton: { foreColor: "#000000", backColor: "#FFFF00" }, lineHeights: ["1.0", "1.2", "1.4", "1.5", "1.6", "1.8", "2.0", "3.0"], tableClassName: "table table-bordered", insertTableMaxSize: { col: 10, row: 10 }, dialogsInBody: !1, dialogsFade: !1, maximumImageFileSize: null, callbacks: { onBeforeCommand: null, onBlur: null, onBlurCodeview: null, onChange: null, onChangeCodeview: null, onDialogShown: null, onEnter: null, onFocus: null, onImageLinkInsert: null, onImageUpload: null, onImageUploadError: null, onInit: null, onKeydown: null, onKeyup: null, onMousedown: null, onMouseup: null, onPaste: null, onScroll: null }, codemirror: { mode: "text/html", htmlMode: !0, lineNumbers: !0 }, codeviewFilter: !1, codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml)[^>]*?>/gi, codeviewIframeFilter: !0, codeviewIframeWhitelistSrc: [], codeviewIframeWhitelistSrcBase: ["www.youtube.com", "www.youtube-nocookie.com", "www.facebook.com", "vine.co", "instagram.com", "player.vimeo.com", "www.dailymotion.com", "player.youku.com", "v.qq.com"], keyMap: { pc: { ENTER: "insertParagraph", "CTRL+Z": "undo", "CTRL+Y": "redo", TAB: "tab", "SHIFT+TAB": "untab", "CTRL+B": "bold", "CTRL+I": "italic", "CTRL+U": "underline", "CTRL+SHIFT+S": "strikethrough", "CTRL+BACKSLASH": "removeFormat", "CTRL+SHIFT+L": "justifyLeft", "CTRL+SHIFT+E": "justifyCenter", "CTRL+SHIFT+R": "justifyRight", "CTRL+SHIFT+J": "justifyFull", "CTRL+SHIFT+NUM7": "insertUnorderedList", "CTRL+SHIFT+NUM8": "insertOrderedList", "CTRL+LEFTBRACKET": "outdent", "CTRL+RIGHTBRACKET": "indent", "CTRL+NUM0": "formatPara", "CTRL+NUM1": "formatH1", "CTRL+NUM2": "formatH2", "CTRL+NUM3": "formatH3", "CTRL+NUM4": "formatH4", "CTRL+NUM5": "formatH5", "CTRL+NUM6": "formatH6", "CTRL+ENTER": "insertHorizontalRule", "CTRL+K": "linkDialog.show" }, mac: { ENTER: "insertParagraph", "CMD+Z": "undo", "CMD+SHIFT+Z": "redo", TAB: "tab", "SHIFT+TAB": "untab", "CMD+B": "bold", "CMD+I": "italic", "CMD+U": "underline", "CMD+SHIFT+S": "strikethrough", "CMD+BACKSLASH": "removeFormat", "CMD+SHIFT+L": "justifyLeft", "CMD+SHIFT+E": "justifyCenter", "CMD+SHIFT+R": "justifyRight", "CMD+SHIFT+J": "justifyFull", "CMD+SHIFT+NUM7": "insertUnorderedList", "CMD+SHIFT+NUM8": "insertOrderedList", "CMD+LEFTBRACKET": "outdent", "CMD+RIGHTBRACKET": "indent", "CMD+NUM0": "formatPara", "CMD+NUM1": "formatH1", "CMD+NUM2": "formatH2", "CMD+NUM3": "formatH3", "CMD+NUM4": "formatH4", "CMD+NUM5": "formatH5", "CMD+NUM6": "formatH6", "CMD+ENTER": "insertHorizontalRule", "CMD+K": "linkDialog.show" } }, icons: { align: "note-icon-align", alignCenter: "note-icon-align-center", alignJustify: "note-icon-align-justify", alignLeft: "note-icon-align-left", alignRight: "note-icon-align-right", rowBelow: "note-icon-row-below", colBefore: "note-icon-col-before", colAfter: "note-icon-col-after", rowAbove: "note-icon-row-above", rowRemove: "note-icon-row-remove", colRemove: "note-icon-col-remove", indent: "note-icon-align-indent", outdent: "note-icon-align-outdent", arrowsAlt: "note-icon-arrows-alt", bold: "note-icon-bold", caret: "note-icon-caret", circle: "note-icon-circle", close: "note-icon-close", code: "note-icon-code", eraser: "note-icon-eraser", floatLeft: "note-icon-float-left", floatRight: "note-icon-float-right", font: "note-icon-font", frame: "note-icon-frame", italic: "note-icon-italic", link: "note-icon-link", unlink: "note-icon-chain-broken", magic: "note-icon-magic", menuCheck: "note-icon-menu-check", minus: "note-icon-minus", orderedlist: "note-icon-orderedlist", pencil: "note-icon-pencil", picture: "note-icon-picture", question: "note-icon-question", redo: "note-icon-redo", rollback: "note-icon-rollback", square: "note-icon-square", strikethrough: "note-icon-strikethrough", subscript: "note-icon-subscript", superscript: "note-icon-superscript", table: "note-icon-table", textHeight: "note-icon-text-height", trash: "note-icon-trash", underline: "note-icon-underline", undo: "note-icon-undo", unorderedlist: "note-icon-unorderedlist", video: "note-icon-video" } } }), C.summernote = C.extend(C.summernote, { ui: b });
});
$('.data-table').DataTable({
    language: {
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "_MENU_ resultados por página",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro encontrado",
        "sSearch": "Pesquisar",
        "oPaginate": {
            "sNext": "Próximo",
            "sPrevious": "Anterior",
            "sFirst": "Primeiro",
            "sLast": "Último"
        },
        "oAria": {
            "sSortAscending": ": Ordenar colunas de forma ascendente",
            "sSortDescending": ": Ordenar colunas de forma descendente"
        }
    }
});