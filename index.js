'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var useComponentSize = _interopDefault(require('@rehooks/component-size'));
var classcat = _interopDefault(require('classcat'));
var isToday = _interopDefault(require('date-fns/is_today'));
var isPast = _interopDefault(require('date-fns/is_past'));
var addDays = _interopDefault(require('date-fns/add_days'));
var addHours = _interopDefault(require('date-fns/add_hours'));
var format = _interopDefault(require('date-fns/format'));
var isDateEqual = _interopDefault(require('date-fns/is_equal'));
var en = _interopDefault(require('date-fns/locale/en'));
var ja = _interopDefault(require('date-fns/locale/ja'));
var startOfDay = _interopDefault(require('date-fns/start_of_day'));
var invariant = _interopDefault(require('invariant'));
var isEqual = _interopDefault(require('lodash/isEqual'));
var times = _interopDefault(require('lodash/times'));
var scrollIntoView = _interopDefault(require('scroll-into-view-if-needed'));
var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var Mousetrap = _interopDefault(require('mousetrap'));
var clamp = _interopDefault(require('lodash/clamp'));
var floor = _interopDefault(require('lodash/floor'));
var round = _interopDefault(require('lodash/round'));
var addMinutes = _interopDefault(require('date-fns/add_minutes'));
var compareAsc = _interopDefault(require('date-fns/compare_asc'));
var endOfDay = _interopDefault(require('date-fns/end_of_day'));
var isBefore = _interopDefault(require('date-fns/is_before'));
var min = _interopDefault(require('date-fns/min'));
var range = _interopDefault(require('lodash/range'));
var differenceInDays = _interopDefault(require('date-fns/difference_in_days'));
var differenceInMinutes = _interopDefault(require('date-fns/difference_in_minutes'));
var setDay = _interopDefault(require('date-fns/set_day'));
var getMinutes = _interopDefault(require('date-fns/get_minutes'));
var Resizable = _interopDefault(require('re-resizable'));
var Draggable = _interopDefault(require('react-draggable'));
var VisuallyHidden = _interopDefault(require('@reach/visually-hidden'));
var isSameDay = _interopDefault(require('date-fns/is_same_day'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var DefaultEventRootComponent = /*#__PURE__*/React__default.memo( /*#__PURE__*/
React__default.forwardRef(function DefaultEventRootComponent(_ref,












ref)
{var isActive = _ref.isActive,handleDelete = _ref.handleDelete,cellIndex = _ref.cellIndex,classes = _ref.classes,disabled = _ref.disabled,ranges = _ref.ranges,rangeIndex = _ref.rangeIndex,meetingDuration = _ref.meetingDuration,onChange = _ref.onChange,props = _objectWithoutProperties(_ref, ["isActive", "handleDelete", "cellIndex", "classes", "disabled", "ranges", "rangeIndex", "meetingDuration", "onChange"]);
  return /*#__PURE__*/React__default.createElement("div", _extends({ ref: ref, "aria-disabled": disabled }, props));
}));


DefaultEventRootComponent.displayName = 'DefaultEventRootComponent';

var createPageMapCoordsToContainer = function createPageMapCoordsToContainer(container) {
  return function (event) {
    var clientX;
    var clientY;
    var pageX;
    var pageY;

    if ('changedTouches' in event) {var _event$changedTouches =
      event.changedTouches[0];clientX = _event$changedTouches.clientX;clientY = _event$changedTouches.clientY;pageX = _event$changedTouches.pageX;pageY = _event$changedTouches.pageY;
    } else {
      clientX = event.clientX;clientY = event.clientY;pageX = event.pageX;pageY = event.pageY;
    }var _container$getBoundin =
    container.getBoundingClientRect(),top = _container$getBoundin.top,left = _container$getBoundin.left;

    return {
      clientX: clientX,
      clientY: clientY,
      pageX: pageX,
      pageY: pageY,
      top: top,
      left: left,
      x: clientX - left,
      y: clientY - top };

  };
};

var prevent = /*#__PURE__*/operators.tap(function (e) {
  e.preventDefault();
  e.stopPropagation();
});

function useClickAndDrag(
ref,
isDisabled)
{var _useState =
  React.useState({
    transform: 'translate(0, 0)',
    width: 0,
    height: 0 }),_useState2 = _slicedToArray(_useState, 2),style = _useState2[0],setStyle = _useState2[1];var _useState3 =

  React.useState(null),_useState4 = _slicedToArray(_useState3, 2),box = _useState4[0],setBox = _useState4[1];var _useState5 =
  React.useState(false),_useState6 = _slicedToArray(_useState5, 2),isDragging = _useState6[0],setIsDragging = _useState6[1];var _useState7 =
  React.useState(false),_useState8 = _slicedToArray(_useState7, 2),hasFinishedDragging = _useState8[0],setHasFinishedDragging = _useState8[1];
  var container = ref.current;

  React.useEffect(function () {
    if (!container || isDisabled) {
      return;
    }

    var mapCoordsToContainer = createPageMapCoordsToContainer(container);

    var touchMove$ = rxjs.fromEvent(window, 'touchmove', {
      passive: false }).
    pipe(prevent);

    var touchEnd$ = rxjs.fromEvent(window, 'touchend', {
      passive: true });


    var touchStart$ = rxjs.fromEvent(container, 'touchstart', {
      passive: false });


    var touchStartWithDelay$ = touchStart$.pipe(
    operators.mergeMap(function (start) {return (
        rxjs.of(start).pipe(operators.delay(300), operators.takeUntil(touchMove$), prevent));}));



    var mouseDown$ = rxjs.fromEvent(container, 'mousedown', {
      passive: true }).
    pipe(operators.filter(function (event) {return event.which === 1;}));

    var mouseMove$ = rxjs.fromEvent(window, 'mousemove', {
      passive: true });


    var mouseUp$ = rxjs.fromEvent(window, 'mouseup', {
      passive: true });


    var dragStart$ = rxjs.merge(mouseDown$, touchStartWithDelay$).pipe(
    operators.map(mapCoordsToContainer));


    var dragEnd$ = rxjs.merge(mouseUp$, touchEnd$).pipe(
    operators.map(mapCoordsToContainer),
    operators.tap(function () {
      setIsDragging(false);
      setHasFinishedDragging(true);
    }));


    var move$ = rxjs.merge(mouseMove$, touchMove$).pipe(operators.map(mapCoordsToContainer));

    var box$ = dragStart$.pipe(
    operators.tap(function () {
      setIsDragging(true);
      setHasFinishedDragging(false);
    }),
    operators.mergeMap(function (down) {
      return move$.pipe(
      operators.startWith(down),
      operators.map(
      function (move) {
        var startX = Math.max(down.x, 0);
        var startY = Math.max(down.y, 0);
        var endX = Math.min(move.x, container.scrollWidth);
        var endY = Math.min(move.y, container.scrollHeight);
        var top = Math.min(startY, endY);
        var bottom = Math.max(startY, endY);
        var left = Math.min(startX, endX);
        var right = Math.max(startX, endX);
        var source = '';
        var title = '';

        return {
          startX: startX,
          startY: startY,
          endX: endX,
          endY: endY,
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          width: right - left,
          height: bottom - top,
          source: source,
          title: title };

      }),

      operators.takeUntil(dragEnd$));

    }),
    operators.map(function (rect) {
      return rect.width === 0 && rect.height === 0 ? null : rect;
    }));


    var style$ = box$.pipe(
    operators.map(function (rect) {
      if (rect !== null) {var
        width = rect.width,height = rect.height,left = rect.left,top = rect.top;
        return {
          transform: "translate(".concat(left, "px, ").concat(top, "px)"),
          width: width,
          height: height };

      }

      return { display: 'none' };
    }));


    var boxSubscriber = box$.subscribe(setBox);
    var styleSubscriber = style$.subscribe(setStyle);

    return function () {
      boxSubscriber.unsubscribe();
      styleSubscriber.unsubscribe();
    };
  }, [container, isDisabled]);

  var cancel = React.useCallback(function () {
    setIsDragging(false);
    setHasFinishedDragging(false);
    setBox(null);
  }, []);

  return { style: style, box: box, isDragging: isDragging, cancel: cancel, hasFinishedDragging: hasFinishedDragging };
}

/**
 * Use mousetrap hook
 *
 * @param handlerKey - A key, key combo or array of combos according to Mousetrap documentation.
 * @param  handlerCallback - A function that is triggered on key combo catch.
 */
function useMousetrap(
handlerKey,
handlerCallback,
elementOrElementRef)
{
  var actionRef = React.useRef(null);
  actionRef.current = handlerCallback;
  var element =
  'current' in elementOrElementRef ? elementOrElementRef.current : document;

  React.useEffect(function () {
    var instance = new Mousetrap(element);

    instance.bind(handlerKey, function (e, combo) {
      typeof actionRef.current === 'function' && actionRef.current(e, combo);
    });

    return function () {
      instance.unbind(handlerKey);
    };
  }, [handlerKey, element]);
}

var getSpan = function getSpan(x1, x2) {return 1 + Math.abs(x2 - x1);};

var createGrid = function createGrid(_ref)









{var totalHeight = _ref.totalHeight,totalWidth = _ref.totalWidth,numVerticalCells = _ref.numVerticalCells,numHorizontalCells = _ref.numHorizontalCells;
  var cellHeight = totalHeight / numVerticalCells;
  var cellWidth = totalWidth / numHorizontalCells;

  return {
    totalHeight: totalHeight,
    totalWidth: totalWidth,
    numVerticalCells: numVerticalCells,
    numHorizontalCells: numHorizontalCells,
    cellWidth: cellWidth,
    cellHeight: cellHeight,

    getRectFromCell: function getRectFromCell(data) {var
      endX = data.endX,startX = data.startX,endY = data.endY,startY = data.startY,spanX = data.spanX,spanY = data.spanY,source = data.source,title = data.title;
      var bottom = endY * this.cellHeight;
      var top = startY * this.cellHeight;
      var left = startX * this.cellWidth;
      var right = endX * this.cellWidth;
      var height = spanY * this.cellHeight;
      var width = spanX * this.cellWidth;

      return {
        bottom: bottom,
        top: top,
        left: left,
        right: right,
        height: height,
        width: width,
        source: source,
        title: title,

        // @TODO: check the math
        startX: startX * this.cellWidth,
        endX: endX * this.cellWidth,
        startY: startY * this.cellHeight,
        endY: endY * this.cellHeight };

    },

    getCellFromRect: function getCellFromRect(data) {
      var startX = clamp(
      floor(data.left / this.cellWidth),
      0,
      numHorizontalCells - 1);

      var startY = clamp(
      round(data.top / this.cellHeight),
      0,
      numVerticalCells - 1);

      var endX = clamp(
      floor(data.right / this.cellWidth),
      0,
      numHorizontalCells - 1);

      var endY = clamp(
      round(data.bottom / this.cellHeight),
      0,
      numVerticalCells - 1);

      var spanX = clamp(getSpan(startX, endX), 1, numHorizontalCells);
      var spanY = clamp(getSpan(startY, endY), 1, numVerticalCells);
      var source = data.source;
      var title = data.title;

      return {
        spanX: spanX,
        spanY: spanY,
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        source: source,
        title: title };

    } };

};

var cellToDate = function cellToDate(_ref) {var
  startX = _ref.startX,
  startY = _ref.startY,
  toMin = _ref.toMin,
  originDate = _ref.originDate;return (






    addMinutes(addDays(originDate, startX), toMin(startY)));};

var createMapCellInfoToRecurringTimeRange = function createMapCellInfoToRecurringTimeRange(_ref) {var
  toMin = _ref.fromY,
  toDay = _ref.fromX,
  originDate = _ref.originDate;return (
    function (_ref2) {var startX = _ref2.startX,startY = _ref2.startY,endX = _ref2.endX,spanY = _ref2.spanY,source = _ref2.source,title = _ref2.title;
      var result = range(startX, endX + 1).
      map(function (i) {
        var startDate = cellToDate({
          startX: i,
          startY: startY,
          toMin: toMin,
          toDay: toDay,
          originDate: originDate });

        var endDate = min(
        addMinutes(startDate, toMin(spanY)),
        endOfDay(startDate));


        var range = isBefore(startDate, endDate) ?
        [startDate, endDate, source, title] :
        [endDate, startDate, source, title];

        return range;
      }).
      sort(function (range1, range2) {return compareAsc(range1[0], range2[0]);});

      return result;
    });};

var createMapDateRangeToCells = function createMapDateRangeToCells(_ref) {var _ref$toX = _ref.
  toX,toX = _ref$toX === void 0 ? function (x) {return x;} : _ref$toX,
  toY = _ref.toY,
  numVerticalCells = _ref.numVerticalCells,
  originDate = _ref.originDate;return (






    function (_ref2) {var _ref3 = _slicedToArray(_ref2, 4),start = _ref3[0],end = _ref3[1],source = _ref3[2],title = _ref3[3];
      var originOfThisDay = startOfDay(start);
      var _startX = toX(differenceInDays(start, originDate));
      var _startY = toY(differenceInMinutes(start, originOfThisDay));
      var _endX = toX(differenceInDays(end, originDate));
      var _endY = toY(differenceInMinutes(end, startOfDay(end))) - 1;

      var cells = range(_startX, _endX + 1).map(function (i) {
        var startX = i;
        var endX = i;
        var atStart = i === _startX;
        var atEnd = i === _endX;
        var startY = !atStart ? 0 : _startY;
        var endY = !atEnd ? numVerticalCells - 1 : _endY;
        var spanX = getSpan(startX, endX);
        var spanY = getSpan(startY, endY);

        return {
          startX: startX,
          startY: startY,
          endX: endX,
          endY: endY,
          spanX: spanX,
          spanY: spanY,
          source: source,
          title: title };

      });

      if (isDateEqual(end, startOfDay(end))) {
        cells.pop();
      }

      return cells;
    });};

function getEarliestTimeRange(
ranges)
{
  return _toConsumableArray(ranges).sort(function (_ref, _ref2) {var _ref3 = _slicedToArray(_ref, 1),startA = _ref3[0];var _ref4 = _slicedToArray(_ref2, 1),startB = _ref4[0];return (
      compareAsc(setDay(startA, 0), setDay(startB, 0)));})[
  0];
}

var Cell = /*#__PURE__*/React__default.memo(function Cell(_ref)











{var timeIndex = _ref.timeIndex,children = _ref.children,classes = _ref.classes,getDateRangeForVisualGrid = _ref.getDateRangeForVisualGrid,onClick = _ref.onClick;var _getDateRangeForVisua =
  getDateRangeForVisualGrid({
    startX: 0,
    startY: timeIndex,
    endX: 0,
    endY: timeIndex + 1,
    spanX: 1,
    spanY: 1,
    source: '',
    title: '' }),_getDateRangeForVisua2 = _slicedToArray(_getDateRangeForVisua, 1),_getDateRangeForVisua3 = _slicedToArray(_getDateRangeForVisua2[0], 1),start = _getDateRangeForVisua3[0];


  var isHourStart = getMinutes(start) === 0;

  return /*#__PURE__*/(
    React__default.createElement("div", { role: "button", onClick: onClick, className: classcat([classes.cell]) },
    children && children({ start: start, isHourStart: isHourStart })));


});

var SchedulerContext = /*#__PURE__*/React.createContext({ locale: en });

var formatTemplate = 'ddd h:mma';

var dropSame = function dropSame(
dates,
template)



{var takeSecond = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var locale = arguments.length > 3 ? arguments[3] : undefined;var title = arguments.length > 4 ? arguments[4] : undefined;var _dates$map =
  dates.map(function (date) {return format(date, template, { locale: locale });}),_dates$map2 = _slicedToArray(_dates$map, 2),first = _dates$map2[0],second = _dates$map2[1];
  if (first !== second || title) {
    return [first, second];
  }

  if (takeSecond) {
    return ['', second];
  }

  return [first, ''];
};

var formatHour = function formatHour(
date,
locale)
{
  if (getMinutes(date) === 0) {
    return format(date, 'h', { locale: locale });
  }

  return format(date, 'h:mm', { locale: locale });
};










var getFormattedComponentsForDateRange = function getFormattedComponentsForDateRange(_ref)






{var dateRange = _ref.dateRange,locale = _ref.locale,template = _ref.template,template2 = _ref.template2,_ref$includeDayIfSame = _ref.includeDayIfSame,includeDayIfSame = _ref$includeDayIfSame === void 0 ? true : _ref$includeDayIfSame,title = _ref.title;
  var start = dateRange[0];
  var end = dateRange[1];

  if (isSameDay(start, end) && !template) {var _dropSame =
    dropSame([start, end], 'a', true, locale, title),_dropSame2 = _slicedToArray(_dropSame, 2),firstM = _dropSame2[0],secondM = _dropSame2[1];
    var day = includeDayIfSame ? "".concat(format(start, 'ddd', { locale: locale }), " ") : '';
    return ["".concat(
    day).concat(formatHour(start, {
      locale: locale })).concat(
    firstM), "".concat(
    formatHour(end, { locale: locale })).concat(secondM)];

  }

  var startDateStr = format(start, template || formatTemplate, { locale: locale });
  var endDateStr = format(end, template2 || formatTemplate, { locale: locale });

  return [startDateStr, endDateStr];
};

var getTextForDateRange = function getTextForDateRange(options) {
  return getFormattedComponentsForDateRange(options).join(' – ');
};

var EventContent = /*#__PURE__*/React__default.memo(function EventContent(_ref)








{var _ref2;var width = _ref.width,height = _ref.height,classes = _ref.classes,dateRange = _ref.dateRange,isStart = _ref.isStart,isEnd = _ref.isEnd,title = _ref.title,numberOfConflicts = _ref.numberOfConflicts;var _useContext =
  React.useContext(SchedulerContext),locale = _useContext.locale;var _getFormattedComponen =
  getFormattedComponentsForDateRange({
    dateRange: dateRange,
    locale: locale,
    includeDayIfSame: false,
    title: title }),_getFormattedComponen2 = _slicedToArray(_getFormattedComponen, 2),start = _getFormattedComponen2[0],end = _getFormattedComponen2[1];

  var isFifteenMinuteMeeting = height < 25 ? '0 10px' : '';

  return /*#__PURE__*/(
    React__default.createElement("div", {
      style: {
        width: width - 4,
        height: height - 4,
        padding: isFifteenMinuteMeeting },

      className: classcat([
      classes['event-content'], (_ref2 = {}, _defineProperty(_ref2,

      classes['external-meeting'], title), _defineProperty(_ref2,
      classes['hide-separator'], numberOfConflicts > 2), _ref2)]) }, /*#__PURE__*/



    React__default.createElement(VisuallyHidden, null,
    getTextForDateRange({ dateRange: dateRange, locale: locale, title: title })),

    numberOfConflicts < 4 && /*#__PURE__*/
    React__default.createElement(React__default.Fragment, null, /*#__PURE__*/
    React__default.createElement("span", { "aria-hidden": true, className: classes.start },
    isStart && start),

    numberOfConflicts < 3 && /*#__PURE__*/
    React__default.createElement("span", { "aria-hidden": true, className: classes.end },
    title ? title : isEnd && end))));






});

var RangeBox = /*#__PURE__*/React__default.memo(function RangeBox(_ref2)
































{var _ref4;var classes = _ref2.classes,grid = _ref2.grid,rangeIndex = _ref2.rangeIndex,cellIndex = _ref2.cellIndex,cellArray = _ref2.cellArray,cell = _ref2.cell,className = _ref2.className,onChange = _ref2.onChange,cellInfoToDateRange = _ref2.cellInfoToDateRange,isResizable = _ref2.isResizable,moveAxis = _ref2.moveAxis,onActiveChange = _ref2.onActiveChange,onClick = _ref2.onClick,getIsActive = _ref2.getIsActive,_ref2$eventContentCom = _ref2.eventContentComponent,EventContentComponent = _ref2$eventContentCom === void 0 ? EventContent : _ref2$eventContentCom,_ref2$eventRootCompon = _ref2.eventRootComponent,EventRootComponent = _ref2$eventRootCompon === void 0 ? DefaultEventRootComponent : _ref2$eventRootCompon,disabled = _ref2.disabled,numberOfConflicts = _ref2.numberOfConflicts,meetingPosition = _ref2.meetingPosition,ranges = _ref2.ranges,meetingDuration = _ref2.meetingDuration;
  var ref = React.useRef(null);var _useState =
  React.useState(cell),_useState2 = _slicedToArray(_useState, 2),modifiedCell = _useState2[0],setModifiedCell = _useState2[1];
  var originalRect = React.useMemo(function () {return grid.getRectFromCell(cell);}, [cell, grid]);
  var rect = React.useMemo(function () {return grid.getRectFromCell(modifiedCell);}, [
  modifiedCell,
  grid]);


  React.useEffect(function () {
    setModifiedCell(cell);
  }, [cell]);

  var modifiedDateRange = React.useMemo(function () {return cellInfoToDateRange(modifiedCell);}, [
  cellInfoToDateRange,
  modifiedCell]);var


  top = rect.top,left = rect.left,width = rect.width,height = rect.height;
  width = width / numberOfConflicts;

  var isStart = cellIndex === 0;
  var isEnd = cellIndex === cellArray.length - 1;

  var handleStop = React.useCallback(function () {
    if (!onChange || disabled) {
      return;
    }

    onChange(cellInfoToDateRange(modifiedCell), rangeIndex);
  }, [modifiedCell, rangeIndex, disabled, cellInfoToDateRange, onChange]);

  var isActive = React.useMemo(function () {return getIsActive({ cellIndex: cellIndex, rangeIndex: rangeIndex });}, [
  cellIndex,
  rangeIndex,
  getIsActive]);


  useMousetrap(
  'up',
  function () {
    if (!onChange || disabled || !isActive) {
      return;
    }

    if (moveAxis === 'none' || moveAxis === 'x') {
      return;
    }

    if (modifiedCell.startY === 0) {
      return;
    }

    var newCell = _objectSpread2(_objectSpread2({},
    modifiedCell), {}, {
      startY: modifiedCell.startY - 1,
      endY: modifiedCell.endY - 1 });


    onChange(cellInfoToDateRange(newCell), rangeIndex);
  },
  ref);


  useMousetrap(
  'shift+up',
  function () {
    if (!onChange || !isResizable || disabled || !isActive) {
      return;
    }

    if (
    modifiedCell.endY === modifiedCell.startY ||
    modifiedCell.spanY === 0)
    {
      return;
    }

    var newCell = _objectSpread2(_objectSpread2({},
    modifiedCell), {}, {
      endY: modifiedCell.endY - 1,
      spanY: modifiedCell.spanY - 1 });


    onChange(cellInfoToDateRange(newCell), rangeIndex);
  },
  ref);


  useMousetrap(
  'down',
  function () {
    if (!onChange || disabled || !isActive) {
      return;
    }

    if (moveAxis === 'none' || moveAxis === 'x') {
      return;
    }

    if (Math.round(modifiedCell.endY) >= grid.numVerticalCells - 1) {
      return;
    }

    var newCell = _objectSpread2(_objectSpread2({},
    modifiedCell), {}, {
      startY: modifiedCell.startY + 1,
      endY: modifiedCell.endY + 1 });


    onChange(cellInfoToDateRange(newCell), rangeIndex);
  },
  ref);


  useMousetrap(
  'shift+down',
  function () {
    if (!onChange || !isResizable || disabled || !isActive) {
      return;
    }

    if (moveAxis === 'none' || moveAxis === 'x') {
      return;
    }

    if (Math.round(modifiedCell.endY) >= grid.numVerticalCells - 1) {
      return;
    }

    var newCell = _objectSpread2(_objectSpread2({},
    modifiedCell), {}, {
      spanY: modifiedCell.spanY + 1,
      endY: modifiedCell.endY + 1 });


    onChange(cellInfoToDateRange(newCell), rangeIndex);
  },
  ref);


  var handleDrag = React.useCallback(
  function (event, _ref3) {var y = _ref3.y,x = _ref3.x;
    if (moveAxis === 'none' || disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    var newRect = _objectSpread2({},
    rect);


    if (moveAxis === 'both' || moveAxis === 'y') {
      var startOrEnd1 = y;
      var startOrEnd2 = startOrEnd1 + rect.height;
      var newTop = Math.min(startOrEnd1, startOrEnd2);
      var newBottom = newTop + rect.height;
      newRect.bottom = newBottom;
      newRect.top = newTop;
    }

    if (moveAxis === 'both' || moveAxis === 'x') {
      var _startOrEnd = x;
      var _startOrEnd2 = _startOrEnd + rect.width;
      var newLeft = Math.min(_startOrEnd, _startOrEnd2);
      var newRight = newLeft + rect.width;
      newRect.right = newRight;
      newRect.left = newLeft;
    }var _grid$getCellFromRect =

    grid.getCellFromRect(newRect),startY = _grid$getCellFromRect.startY,startX = _grid$getCellFromRect.startX;

    var newCell = _objectSpread2(_objectSpread2({},
    cell), {}, {
      startX: moveAxis === 'y' ? cell.startX : startX,
      endX: moveAxis === 'x' ? startX + cell.spanX - 1 : cell.endX,
      startY: moveAxis === 'x' ? cell.startY : startY,
      endY: moveAxis === 'y' ? startY + cell.spanY - 1 : cell.endY });


    invariant(
    newCell.spanY === cell.spanY && newCell.spanX === cell.spanX, "Expected the dragged time cell to have the same dimensions");



    setModifiedCell(newCell);
  },
  [grid, rect, moveAxis, disabled, cell, setModifiedCell]);


  var handleResize = React.useCallback(
  function (event, direction, _ref, delta) {
    if (!isResizable || disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (delta.height === 0) {
      return;
    }

    var newSize = {
      height: delta.height + rect.height,
      width: delta.width + rect.width + 20 };


    var newRect = _objectSpread2(_objectSpread2({},
    originalRect),
    newSize);


    if (direction.includes('top')) {
      newRect.top -= delta.height;
    } else if (direction.includes('bottom')) {
      newRect.bottom += delta.height;
    }var _grid$getCellFromRect2 =

    grid.getCellFromRect(newRect),spanY = _grid$getCellFromRect2.spanY,startY = _grid$getCellFromRect2.startY,endY = _grid$getCellFromRect2.endY;
    var newCell = _objectSpread2(_objectSpread2({},
    cell), {}, {
      spanY: spanY,
      startY: startY,
      endY: endY });


    setModifiedCell(newCell);
  },
  [grid, rect, disabled, isResizable, setModifiedCell, cell, originalRect]);


  var handleDelete = React.useCallback(function () {
    if (!onChange || disabled) {
      return;
    }

    onChange(undefined, rangeIndex);
  }, [onChange, disabled, rangeIndex]);

  var handleOnFocus = React.useCallback(function () {
    if (!onActiveChange || disabled) {
      return;
    }

    onActiveChange([rangeIndex, cellIndex]);
  }, [onActiveChange, disabled, rangeIndex, cellIndex]);

  var handleOnClick = React.useCallback(function () {
    if (!onClick || disabled || !isActive) {
      return;
    }

    onClick([rangeIndex, cellIndex]);
  }, [onClick, rangeIndex, disabled, isActive, cellIndex]);

  useMousetrap('enter', handleOnClick, ref);

  var cancelClasses = React.useMemo(
  function () {return (
      classes.handle ?
      classes.handle.
      split(' ').
      map(function (className) {return ".".concat(className);}).
      join(', ') :
      undefined);},
  [classes.handle]);


  return /*#__PURE__*/(
    React__default.createElement(Draggable, {
      axis: moveAxis,
      bounds: {
        top: 0,
        bottom: grid.totalHeight - height,
        left: 0,
        right: grid.totalWidth / numberOfConflicts },

      position: { x: left, y: top },
      onDrag: handleDrag,
      onStop: handleStop,
      cancel: cancelClasses,
      disabled: disabled }, /*#__PURE__*/

    React__default.createElement(EventRootComponent, {
      role: "button",
      disabled: disabled,
      onFocus: handleOnFocus,
      onClick: handleOnClick,
      handleDelete: handleDelete,
      cellIndex: cellIndex,
      ranges: ranges,
      rangeIndex: rangeIndex,
      meetingDuration: meetingDuration,
      onChange: onChange,
      isActive: isActive,
      classes: classes,
      className: classcat([
      classes.event,
      classes['range-boxes'],
      className, (_ref4 = {}, _defineProperty(_ref4,

      classes['is-draggable'], !disabled && moveAxis !== 'none'), _defineProperty(_ref4,
      classes['is-disabled'], disabled), _ref4)]),


      ref: ref,
      style: {
        width: width - 4,
        height: height - 4,
        marginLeft:
        numberOfConflicts === 1 ?
        '2px' : "".concat(
        width * meetingPosition - width + 2, "px"),
        marginTop: '2px' } }, /*#__PURE__*/


    React__default.createElement(Resizable, {
      size: _objectSpread2(_objectSpread2({},
      originalRect), {}, {
        width: originalRect.width / numberOfConflicts - 4 }),

      key: "".concat(rangeIndex, ".").concat(cellIndex, ".").concat(cellArray.length, ".").concat(originalRect.top, ".").concat(originalRect.left),
      onResize: handleResize,
      onResizeStop: handleStop,
      handleWrapperClass: classes['handle-wrapper'],
      enable:
      isResizable && !disabled ?
      {
        top: true,
        bottom: true } :

      {},

      handleClasses: {
        bottom: classcat([classes.handle, classes.bottom]),
        bottomLeft: classes.handle,
        bottomRight: classes.handle,
        left: classes.handle,
        right: classes.handle,
        top: classcat([classes.handle, classes.top]),
        topLeft: classes.handle,
        topRight: classes.handle } }, /*#__PURE__*/


    React__default.createElement(EventContentComponent, {
      width: width,
      height: height,
      classes: classes,
      dateRange: modifiedDateRange,
      isStart: isStart,
      isEnd: isEnd,
      title: cell.title,
      numberOfConflicts: numberOfConflicts })))));





});

var Schedule = /*#__PURE__*/React__default.memo(function Schedule(_ref)





















{var classes = _ref.classes,ranges = _ref.ranges,grid = _ref.grid,className = _ref.className,onChange = _ref.onChange,isResizable = _ref.isResizable,isDeletable = _ref.isDeletable,moveAxis = _ref.moveAxis,cellInfoToDateRange = _ref.cellInfoToDateRange,dateRangeToCells = _ref.dateRangeToCells,onActiveChange = _ref.onActiveChange,eventContentComponent = _ref.eventContentComponent,eventRootComponent = _ref.eventRootComponent,onClick = _ref.onClick,getIsActive = _ref.getIsActive,meetingDuration = _ref.meetingDuration;
  var overlappingMeetings = [];

  ranges.map(function (currentMeeting, currentMeetingIndex) {
    ranges.map(function (otherMeeting, otherMeetingIndex) {
      var sameIndex = currentMeetingIndex === otherMeetingIndex;
      var timeRangeOverlaps =
      currentMeeting[0] < otherMeeting[1] &&
      currentMeeting[1] > otherMeeting[0];
      if (!sameIndex && timeRangeOverlaps) {
        overlappingMeetings.push(_defineProperty({},
        currentMeetingIndex, otherMeetingIndex.toString()));

      }
    });
  });

  var meetingConflicts = overlappingMeetings.reduce(
  function (accum, obj) {
    for (var key in obj) {
      accum[key] = accum[key] ? [].concat(_toConsumableArray(accum[key]), [obj[key]]) : [obj[key]];
    }
    return accum;
  },
  []);


  var countUnique = function countUnique(iterable) {
    return new Set(iterable).size;
  };

  var calculateMeetingPlacement = function calculateMeetingPlacement(rangeIndex) {
    var numberOfConflicts = 1;
    var meetingPosition = 1;

    if (!meetingConflicts.hasOwnProperty(rangeIndex)) {
      return { numberOfConflicts: numberOfConflicts, meetingPosition: meetingPosition };
    }

    meetingConflicts[rangeIndex].map(function (currentMeeting) {
      if (
      currentMeeting !== rangeIndex &&
      meetingConflicts[rangeIndex].length > 1)
      {
        var totalConflicts = [];
        var positionArray = [];

        meetingConflicts[rangeIndex].map(function (range) {
          positionArray.push(rangeIndex > range);
          meetingConflicts[rangeIndex].map(function (currentConflict) {
            totalConflicts.push.apply(totalConflicts, _toConsumableArray(meetingConflicts[currentConflict]));
          });

          numberOfConflicts =
          countUnique(
          totalConflicts.filter(function (index) {return index !== currentMeeting;})) +
          1;
        });
        meetingPosition = positionArray.filter(function (c) {return c === true;}).length + 1;
      } else {
        numberOfConflicts = 2;
        var numberOfExistingOverlaps = meetingConflicts[rangeIndex][0];

        if (meetingConflicts[numberOfExistingOverlaps].length > 2) {
          meetingPosition =
          meetingConflicts[numberOfExistingOverlaps].length + 1;
        } else {
          meetingPosition =
          rangeIndex < Number.apply(void 0, _toConsumableArray(meetingConflicts[rangeIndex])) ? 1 : 2;
        }

        numberOfConflicts = Math.max(
        2,
        meetingConflicts[numberOfExistingOverlaps].length + 1);

      }
    });

    return { numberOfConflicts: numberOfConflicts, meetingPosition: meetingPosition };
  };

  return /*#__PURE__*/(
    React__default.createElement("div", { className: classes['range-boxes'] },
    ranges.map(function (dateRange, rangeIndex) {
      var isPast = isBefore(dateRange[1], new Date());
      return /*#__PURE__*/(
        React__default.createElement("span", { key: rangeIndex },
        dateRangeToCells(dateRange).map(function (cell, cellIndex, cellArray) {var _ref2;
          var isGoogleEvent = cell.source === 'google';var _calculateMeetingPlac =



          calculateMeetingPlacement(rangeIndex),numberOfConflicts = _calculateMeetingPlac.numberOfConflicts,meetingPosition = _calculateMeetingPlac.meetingPosition;

          return /*#__PURE__*/(
            React__default.createElement(RangeBox, {
              classes: classes,
              onActiveChange: onActiveChange,
              key: "".concat(rangeIndex, ".").concat(ranges.length, ".").concat(cellIndex, ".").concat(cellArray.length),
              isResizable: isResizable,
              moveAxis: moveAxis,
              isDeletable: isDeletable,
              cellInfoToDateRange: cellInfoToDateRange,
              cellArray: cellArray,
              cellIndex: cellIndex,
              rangeIndex: rangeIndex,
              ranges: ranges,
              meetingDuration: meetingDuration,
              className: classcat([
              className, (_ref2 = {}, _defineProperty(_ref2,

              classes['is-past'], isPast), _defineProperty(_ref2,
              classes['is-google'], isGoogleEvent), _ref2)]),


              onChange: onChange,
              onClick: onClick,
              grid: grid,
              cell: cell,
              getIsActive: getIsActive,
              eventContentComponent: eventContentComponent,
              eventRootComponent: eventRootComponent,
              disabled: isGoogleEvent,
              numberOfConflicts: numberOfConflicts,
              meetingPosition: meetingPosition }));


        })));


    })));


});

var IndicatorLine = /*#__PURE__*/React__default.memo(function IndicatorLine(_ref)







{var classes = _ref.classes,grid = _ref.grid,cell = _ref.cell,_ref$eventRootCompone = _ref.eventRootComponent,EventRootComponent = _ref$eventRootCompone === void 0 ? DefaultEventRootComponent : _ref$eventRootCompone;
  var rect = React.useMemo(function () {return grid.getRectFromCell(cell);}, [cell, grid]);var
  top = rect.top,left = rect.left,width = rect.width,height = rect.height;

  return /*#__PURE__*/(
    React__default.createElement(Draggable, {
      bounds: {
        top: 0,
        bottom: grid.totalHeight - height,
        left: 0,
        right: grid.totalWidth },

      position: { x: left, y: top },
      key: "draggable-".concat(width, ".").concat(height, ".").concat(top, ".").concat(left) }, /*#__PURE__*/

    React__default.createElement(EventRootComponent, {
      className: classcat([classes.indicator]),
      style: {
        width: width,
        height: 2 },

      key: "eventroot-".concat(width, ".").concat(height, ".").concat(top, ".").concat(left) })));



});

var TimeIndicator = /*#__PURE__*/React__default.memo(function TimeIndicator(_ref)












{var classes = _ref.classes,currentTime = _ref.currentTime,grid = _ref.grid,className = _ref.className,cellInfoToDateRange = _ref.cellInfoToDateRange,dateRangeToCells = _ref.dateRangeToCells,eventRootComponent = _ref.eventRootComponent;
  // const [cellInfo, setCellInfo] = useState(dateRangeToCells(currentTime));

  // useEffect(() => {
  //   setCellInfo(dateRangeToCells(currentTime));
  //   console.log(currentTime);
  // }, [currentTime]);

  return /*#__PURE__*/(
    React__default.createElement("div", null,
    dateRangeToCells(currentTime).map(function (cell, index) {
      return /*#__PURE__*/(
        React__default.createElement(IndicatorLine, {
          key: "indicator-".concat(index),
          classes: classes,
          cellInfoToDateRange: cellInfoToDateRange,
          className: classcat([className]),
          grid: grid,
          cell: cell,
          eventRootComponent: eventRootComponent }));


    })));


});

var MINS_IN_DAY = 24 * 60;
var horizontalPrecision = 1;
var toDay = function toDay(x) {return x * horizontalPrecision;};
var toX = function toX(days) {return days / horizontalPrecision;};
var DELETE_KEYS = ['del', 'backspace'];

var TimeGridScheduler = /*#__PURE__*/React__default.memo(function TimeGridScheduler(_ref)





































































{var _ref$verticalPrecisio = _ref.verticalPrecision,verticalPrecision = _ref$verticalPrecisio === void 0 ? 15 : _ref$verticalPrecisio,_ref$visualGridVertic = _ref.visualGridVerticalPrecision,visualGridVerticalPrecision = _ref$visualGridVertic === void 0 ? 30 : _ref$visualGridVertic,_ref$cellClickPrecisi = _ref.cellClickPrecision,cellClickPrecision = _ref$cellClickPrecisi === void 0 ? visualGridVerticalPrecision : _ref$cellClickPrecisi,style = _ref.style,schedule = _ref.schedule,_ref$originDate = _ref.originDate,_originDate = _ref$originDate === void 0 ? new Date() : _ref$originDate,_ref$defaultHours = _ref.defaultHours,defaultHours = _ref$defaultHours === void 0 ? [9, 18] : _ref$defaultHours,classes = _ref.classes,className = _ref.className,onChange = _ref.onChange,onEventClick = _ref.onEventClick,eventContentComponent = _ref.eventContentComponent,eventRootComponent = _ref.eventRootComponent,disabled = _ref.disabled,localization = _ref.localization,isMobile = _ref.isMobile,currentTime = _ref.currentTime,meetingDuration = _ref.meetingDuration;
  var locale = localization === 'ja' ? ja : en;
  var numberOfDays = isMobile ? 1 : 7;
  var originDate = React.useMemo(function () {return startOfDay(_originDate);}, [_originDate]);
  var numVerticalCells = MINS_IN_DAY / verticalPrecision;
  var numHorizontalCells = numberOfDays / horizontalPrecision;
  var toMin = React.useCallback(function (y) {return y * verticalPrecision;}, [
  verticalPrecision]);

  var toY = React.useCallback(function (mins) {return mins / verticalPrecision;}, [
  verticalPrecision]);


  var cellInfoToDateRanges = React.useMemo(function () {
    return createMapCellInfoToRecurringTimeRange({
      originDate: originDate,
      fromY: toMin,
      fromX: toDay });

  }, [toMin, originDate]);

  var cellInfoToSingleDateRange = React.useCallback(
  function (cell) {var _cellInfoToDateRanges =
    cellInfoToDateRanges(cell),_cellInfoToDateRanges2 = _toArray(_cellInfoToDateRanges),first = _cellInfoToDateRanges2[0],rest = _cellInfoToDateRanges2.slice(1);
    invariant(
    rest.length === 0, "Expected \"cellInfoToSingleDateRange\" to return a single date range, found ".concat(
    rest.length, "\n        additional ranges instead. This is a bug in @remotelock/react-week-scheduler"));



    return first;
  },
  [cellInfoToDateRanges]);


  var dateRangeToCells = React.useMemo(function () {
    return createMapDateRangeToCells({
      originDate: originDate,
      numVerticalCells: numVerticalCells,
      numHorizontalCells: numHorizontalCells,
      toX: toX,
      toY: toY });

  }, [toY, numVerticalCells, numHorizontalCells, originDate]);

  var root = React.useRef(null);
  var parent = React.useRef(null);

  var size = useComponentSize(parent);var _useClickAndDrag =






  useClickAndDrag(parent, disabled),dragBoxStyle = _useClickAndDrag.style,box = _useClickAndDrag.box,isDragging = _useClickAndDrag.isDragging,hasFinishedDragging = _useClickAndDrag.hasFinishedDragging,cancel = _useClickAndDrag.cancel;var _useState =



  React.useState(null),_useState2 = _slicedToArray(_useState, 2),pendingCreation = _useState2[0],setPendingCreation = _useState2[1];var _useState3 =

  React.useState([0, 0]),_useState4 = _slicedToArray(_useState3, 2),_useState4$ = _slicedToArray(_useState4[0], 2),totalHeight = _useState4$[0],totalWidth = _useState4$[1],setDimensions = _useState4[1];

  var numVisualVerticalCells = 24 * 60 / visualGridVerticalPrecision;

  React.useEffect(
  function updateGridDimensionsOnSizeOrCellCountChange() {
    if (!parent.current) {
      setDimensions([0, 0]);
      return;
    }

    setDimensions([parent.current.scrollHeight, parent.current.scrollWidth]);
  },
  [size, numVisualVerticalCells]);


  var grid = React.useMemo(function () {
    if (totalHeight === null || totalWidth === null) {
      return null;
    }

    return createGrid({
      totalHeight: totalHeight,
      totalWidth: totalWidth,
      numHorizontalCells: numHorizontalCells,
      numVerticalCells: numVerticalCells });

  }, [totalHeight, totalWidth, numHorizontalCells, numVerticalCells]);

  React.useEffect(
  function updatePendingCreationOnDragBoxUpdate() {
    if (grid === null || box === null) {
      setPendingCreation(null);
      return;
    }

    var cell = grid.getCellFromRect(box);
    var dateRanges = cellInfoToDateRanges(cell);
    var event = dateRanges;
    setPendingCreation(event);
  },
  [box, grid, cellInfoToDateRanges, toY]);var _useState5 =


  React.useState(

  [null, null]),_useState6 = _slicedToArray(_useState5, 2),_useState6$ = _slicedToArray(_useState6[0], 2),activeRangeIndex = _useState6$[0],activeCellIndex = _useState6$[1],setActive = _useState6[1];

  React.useEffect(
  function updateScheduleAfterDraggingFinished() {
    if (disabled) {
      return;
    }

    if (hasFinishedDragging) {
      if (pendingCreation) {
        onChange([].concat(_toConsumableArray(schedule), _toConsumableArray(pendingCreation)));
      }
      setPendingCreation(null);
    }
  },
  [
  hasFinishedDragging,
  disabled,
  onChange,
  setPendingCreation,
  pendingCreation,
  schedule]);



  React.useEffect(
  function clearActiveBlockAfterCreation() {
    if (pendingCreation === null) {
      setActive([null, null]);
    }
  },
  [pendingCreation]);


  var handleEventChange = React.useCallback(
  function (newDateRange, rangeIndex) {
    if (disabled) {
      return;
    }

    if (!schedule && newDateRange) {
      onChange([newDateRange]);

      return;
    }

    var newSchedule = _toConsumableArray(schedule);

    if (!newDateRange) {
      newSchedule.splice(rangeIndex, 1);
    } else {
      if (
      isDateEqual(newDateRange[0], newSchedule[rangeIndex][0]) &&
      isDateEqual(newDateRange[1], newSchedule[rangeIndex][1]))
      {
        return;
      }
      newSchedule[rangeIndex] = newDateRange;
    }

    onChange(newSchedule);
  },
  [schedule, onChange, disabled]);


  useMousetrap(
  'esc',
  function cancelOnEsc() {
    if (pendingCreation) {
      cancel();
    }
  },
  document);


  var getIsActive = React.useCallback(
  function (_ref2) {var rangeIndex = _ref2.rangeIndex,cellIndex = _ref2.cellIndex;
    return rangeIndex === activeRangeIndex && cellIndex === activeCellIndex;
  },
  [activeCellIndex, activeRangeIndex]);


  var handleDelete = React.useCallback(
  function (e) {
    if (activeRangeIndex === null || disabled) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    handleEventChange(undefined, activeRangeIndex);
  },
  [activeRangeIndex, disabled, handleEventChange]);


  useMousetrap(DELETE_KEYS, handleDelete, root);

  React.useEffect(
  function cancelPendingCreationOnSizeChange() {
    cancel();
  },
  [size, cancel]);


  var getDateRangeForVisualGrid = React.useMemo(function () {
    return createMapCellInfoToRecurringTimeRange({
      originDate: originDate,
      fromX: toDay,
      fromY: function fromY(y) {return y * visualGridVerticalPrecision;}
      // source,
      // title,
    });
  }, [visualGridVerticalPrecision, originDate]);

  React.useEffect(
  function scrollToActiveTimeBlock() {
    if (!document.activeElement) {
      return;
    }

    if (!root.current || !root.current.contains(document.activeElement)) {
      return;
    }

    scrollIntoView(document.activeElement, {
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest' });

  },
  [schedule]);var _useState7 =


  React.useState(
  false),_useState8 = _slicedToArray(_useState7, 2),wasInitialScrollPerformed = _useState8[0],setWasInitialScrollPerformed = _useState8[1];


  React.useEffect(
  function performInitialScroll() {
    if (wasInitialScrollPerformed || !root.current || !grid) {
      return;
    }

    var range = dateRangeToCells(
    getEarliestTimeRange(schedule) || [
    addHours(originDate, defaultHours[0]),
    addHours(originDate, defaultHours[1]),
    '',
    '']);



    if (range[0] === undefined) {
      return;
    }
    var rect = grid.getRectFromCell(range[0]);var
    top = rect.top,bottom = rect.bottom;

    if (top === 0 && bottom === 0) {
      return;
    }

    // IE, Edge do not support it
    if (!('scrollBy' in root.current)) {
      return;
    }

    root.current.scrollBy(0, top);

    setWasInitialScrollPerformed(true);
  },
  [
  wasInitialScrollPerformed,
  grid,
  schedule,
  defaultHours,
  originDate,
  dateRangeToCells]);



  var handleBlur = React.useCallback(
  function (event) {
    if (!event.target.contains(document.activeElement)) {
      setActive([null, null]);
    }
  },
  [setActive]);


  var handleCellClick = React.useCallback(
  function (dayIndex, timeIndex) {return function (event) {
      if (!grid || disabled) {
        return;
      }

      var spanY = toY(cellClickPrecision);
      var cell = {
        startX: dayIndex,
        startY: timeIndex,
        endX: dayIndex,
        endY: spanY + timeIndex,
        spanY: spanY,
        spanX: getSpan(dayIndex, dayIndex),
        source: '',
        title: '' };


      var dateRanges = cellInfoToDateRanges(cell);

      setPendingCreation(dateRanges);

      event.stopPropagation();
      event.preventDefault();
    };},
  [grid, disabled, toY, cellClickPrecision, cellInfoToDateRanges]);


  return /*#__PURE__*/(
    React__default.createElement("div", {
      ref: root,
      style: style,
      onBlur: handleBlur,
      "touch-action": isDragging ? 'none' : undefined,
      className: classcat([
      classes.root,
      classes.theme,
      className, _defineProperty({},
      classes['no-scroll'], isDragging)]) }, /*#__PURE__*/


    React__default.createElement("div", { className: classes['grid-root'] }, /*#__PURE__*/
    React__default.createElement("div", {
      "aria-hidden": true,
      className: classcat([classes.timeline, classes['sticky-left']]) }, /*#__PURE__*/

    React__default.createElement("div", { className: classes.header }, /*#__PURE__*/
    React__default.createElement("div", { className: classes['day-column'] }, /*#__PURE__*/
    React__default.createElement("div", { className: classcat([classes.cell, classes.title]) }, "T"))), /*#__PURE__*/


    React__default.createElement("div", { className: classes.calendar }, /*#__PURE__*/
    React__default.createElement("div", { className: classes['day-column'] }, /*#__PURE__*/
    React__default.createElement("div", { className: classes['day-hours'] },
    times(numVisualVerticalCells).map(function (timeIndex) {
      return /*#__PURE__*/(
        React__default.createElement(Cell, {
          classes: classes,
          getDateRangeForVisualGrid: getDateRangeForVisualGrid,
          key: timeIndex,
          timeIndex: timeIndex },

        function (_ref4) {var start = _ref4.start;
          return /*#__PURE__*/(
            React__default.createElement("div", { className: classes.time },
            format(start, 'hh:mm', { locale: locale })));


        }));


    }))))), /*#__PURE__*/




    React__default.createElement("div", {
      className: classcat([
      classes['sticky-top'],
      classes['day-header-row']]) }, /*#__PURE__*/


    React__default.createElement("div", {
      role: "presentation",
      className: classcat([classes.calendar, classes.header]) },

    times(numberOfDays).map(function (i) {return /*#__PURE__*/(
        React__default.createElement("div", {
          key: i,
          role: "presentation",
          className: classes['day-column'] }, /*#__PURE__*/

        React__default.createElement("div", {
          className: classcat([
          classes.cell,
          classes.title, _defineProperty({},
          classes['is-past'], isPast(addDays(originDate, i))), _defineProperty({},

          classes['is-current'], isToday(addDays(originDate, i)))]) }, /*#__PURE__*/



        React__default.createElement("span", null,
        format(addDays(originDate, i), 'ddd ', { locale: locale })), /*#__PURE__*/

        React__default.createElement("span", null,
        format(addDays(originDate, i), 'MMM ', { locale: locale })), /*#__PURE__*/

        React__default.createElement("span", { className: classes.date },
        format(addDays(originDate, i), 'D', { locale: locale })))));}))), /*#__PURE__*/






    React__default.createElement("div", { className: classes['layer-container'] },
    isDragging && /*#__PURE__*/
    React__default.createElement("div", { className: classes['drag-box'], style: dragBoxStyle },
    hasFinishedDragging && /*#__PURE__*/React__default.createElement("div", { className: classes.popup })),


    grid && pendingCreation && isDragging && /*#__PURE__*/
    React__default.createElement(Schedule, {
      classes: classes,
      dateRangeToCells: dateRangeToCells,
      cellInfoToDateRange: cellInfoToSingleDateRange,
      className: classes['is-pending-creation'],
      ranges: [].concat(_toConsumableArray(schedule), _toConsumableArray(pendingCreation)),
      meetingDuration: meetingDuration,
      grid: grid,
      moveAxis: "none",
      eventContentComponent: eventContentComponent,
      getIsActive: getIsActive }),


    grid && !pendingCreation && /*#__PURE__*/
    React__default.createElement(Schedule, {
      classes: classes,
      onActiveChange: setActive,
      dateRangeToCells: dateRangeToCells,
      cellInfoToDateRange: cellInfoToSingleDateRange,
      isResizable: true,
      moveAxis: "y",
      isDeletable: true,
      onChange: handleEventChange,
      onClick: onEventClick,
      ranges: schedule,
      meetingDuration: meetingDuration,
      grid: grid,
      eventContentComponent: eventContentComponent,
      eventRootComponent: eventRootComponent,
      getIsActive: getIsActive,
      disabled: disabled }),


    grid && /*#__PURE__*/
    React__default.createElement(TimeIndicator, {
      key: "time-".concat(currentTime),
      classes: classes,
      dateRangeToCells: dateRangeToCells,
      cellInfoToDateRange: cellInfoToSingleDateRange,
      currentTime:
      currentTime,

      grid: grid }), /*#__PURE__*/



    React__default.createElement("div", { ref: parent, role: "grid", className: classes.calendar },
    times(numberOfDays).map(function (dayIndex) {
      var isPassed = isPast(addDays(originDate, dayIndex + 1));
      return /*#__PURE__*/(
        React__default.createElement("div", {
          role: "gridcell",
          key: dayIndex,
          className: classes['day-column'] }, /*#__PURE__*/

        React__default.createElement("div", {
          className: classcat([
          classes['day-hours'], _defineProperty({},

          classes['is-past'], isPassed)]) },



        times(numVisualVerticalCells).map(function (timeIndex) {
          return /*#__PURE__*/(
            React__default.createElement(Cell, {
              classes: classes,
              onClick:
              !isPassed ?
              handleCellClick(
              dayIndex,
              timeIndex * (
              numVerticalCells / numVisualVerticalCells)) :

              undefined,

              getDateRangeForVisualGrid: getDateRangeForVisualGrid,
              key: timeIndex,
              timeIndex: timeIndex }));


        }))));



    }))))));





}, isEqual);

var styles_module = {"no-scroll":"styles-module_no-scroll__3IUv5","theme":"styles-module_theme__1FIRA","root":"styles-module_root__2iNXQ","grid-root":"styles-module_grid-root__2ktzS","debug":"styles-module_debug__2eCNx","debug-active":"styles-module_debug-active__QqNIZ","calendar":"styles-module_calendar__tGgRK","react-draggable":"styles-module_react-draggable__3LVqd","handle-wrapper":"styles-module_handle-wrapper__26Eew","handle":"styles-module_handle__LTyBN","top":"styles-module_top__3D7og","bottom":"styles-module_bottom__daw_j","layer-container":"styles-module_layer-container__1wxVL","day-hours":"styles-module_day-hours__1E9lT","is-past":"styles-module_is-past__uYDtP","cell":"styles-module_cell__sVJZY","event":"styles-module_event__1PixZ","drag-box":"styles-module_drag-box__3w784","draggable":"styles-module_draggable__1Z1sE","button-reset":"styles-module_button-reset__1EwGq","is-draggable":"styles-module_is-draggable__176XM","tooltip":"styles-module_tooltip__255C3","icon":"styles-module_icon__28xum","is-pending-creation":"styles-module_is-pending-creation__3Qr4x","is-disabled":"styles-module_is-disabled__2JPDR","is-google":"styles-module_is-google__1c54q","indicator":"styles-module_indicator__37i_p","hours-container":"styles-module_hours-container__2srEU","day-column":"styles-module_day-column__30McI","time":"styles-module_time__LJQW4","title":"styles-module_title__2VBFp","header":"styles-module_header__10uIZ","is-current":"styles-module_is-current__19oIX","date":"styles-module_date__a2LvS","day-header-row":"styles-module_day-header-row__27lss","sticky-top":"styles-module_sticky-top__2dSgb","sticky-left":"styles-module_sticky-left__3tNLK","first":"styles-module_first__IeNvS","popup":"styles-module_popup__2iu0Y","range-boxes":"styles-module_range-boxes__ib1Nb","event-content":"styles-module_event-content__3sakH","hide-separator":"styles-module_hide-separator__3lgW-","start":"styles-module_start__3CzHL","external-meeting":"styles-module_external-meeting__UUOM9","end":"styles-module_end__2L7Oy","status":"styles-module_status__3TugN","timeline":"styles-module_timeline__1hCLT","layout":"styles-module_layout__32BdV","modal":"styles-module_modal__2N8Vl","slideIn":"styles-module_slideIn__34P6y","modal-wrapper":"styles-module_modal-wrapper__3CXDG","fadeIn":"styles-module_fadeIn__2rVIy","is-opened":"styles-module_is-opened__1MCV_","remove-btn":"styles-module_remove-btn__3Q93c","modal-body":"styles-module_modal-body__1sGvV","time-row":"styles-module_time-row__3nibL","dropdown-label":"styles-module_dropdown-label__16g2W","input-error":"styles-module_input-error__1gEsN","input-container":"styles-module_input-container__2c1BO","time-input":"styles-module_time-input__2Xc2G","dropdown":"styles-module_dropdown__1W5Os","dropdown-select":"styles-module_dropdown-select__3Mukm","notice":"styles-module_notice__1ZpBi","notice-warning":"styles-module_notice-warning__S_Wp3","save-btn":"styles-module_save-btn__24-8V","close":"styles-module_close__pJeAC","show":"styles-module_show__22b6d","show-up-to-desktops":"styles-module_show-up-to-desktops__344s0","show-up-to-laptops":"styles-module_show-up-to-laptops__3-bhY","show-up-to-tablets":"styles-module_show-up-to-tablets__2hfuV","show-up-to-phones":"styles-module_show-up-to-phones__1I7h-","hide":"styles-module_hide__36pml","fadeOut":"styles-module_fadeOut__2044B","slideOut":"styles-module_slideOut__38r8O"};

exports.DefaultEventRootComponent = DefaultEventRootComponent;
exports.SchedulerContext = SchedulerContext;
exports.TimeGridScheduler = TimeGridScheduler;
exports.classes = styles_module;
exports.getFormattedTimeRangeComponents = getFormattedComponentsForDateRange;
exports.getTextForDateRange = getTextForDateRange;
exports.useMousetrap = useMousetrap;
//# sourceMappingURL=index.js.map
