'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.isNumber = isNumber;
exports.formatTimeItem = formatTimeItem;
exports.validateTimeAndCursor = validateTimeAndCursor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_COLON = ':';
var DEFAULT_VALUE_SHORT = '00' + DEFAULT_COLON + '00';
var DEFAULT_VALUE_FULL = '00' + DEFAULT_COLON + '00' + DEFAULT_COLON + '00';

function isNumber(value) {
  var number = Number(value);
  return !isNaN(number) && String(value) === String(number);
}

function formatTimeItem(value) {
  return ((value || '') + '00').substr(0, 2);
}

function validateTimeAndCursor() {
  var showSeconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var colon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_COLON;
  var cursorPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  var _defaultValue$split = defaultValue.split(colon),
      _defaultValue$split2 = _slicedToArray(_defaultValue$split, 3),
      oldH = _defaultValue$split2[0],
      oldM = _defaultValue$split2[1],
      oldS = _defaultValue$split2[2];

  var newCursorPosition = Number(cursorPosition);

  var _String$split = String(value).split(colon),
      _String$split2 = _slicedToArray(_String$split, 3),
      newH = _String$split2[0],
      newM = _String$split2[1],
      newS = _String$split2[2];

  newH = formatTimeItem(newH);
  if (Number(newH[0]) > 2) {
    newH = oldH;
    newCursorPosition -= 1;
  } else if (Number(newH[0]) === 2) {
    if (Number(oldH[0]) === 2 && Number(newH[1]) > 4) {
      newH = '2' + oldH[1];
      newCursorPosition -= 2;
    } else if (Number(newH[1]) > 4) {
      newH = '23';
    } else if (Number(newH[1]) === 4) {
      newM = '00';
    }
  }

  newM = formatTimeItem(newM);
  if (Number(newM[0]) > 5) {
    newM = oldM;
    newCursorPosition -= 1;
  }

  if (showSeconds) {
    newS = formatTimeItem(newS);
    if (Number(newS[0]) > 5) {
      newS = oldS;
      newCursorPosition -= 1;
    }
  }

  var validatedValue = showSeconds ? '' + newH + colon + newM + colon + newS : '' + newH + colon + newM;

  return [validatedValue, newCursorPosition];
}

var TimeField = function (_React$Component) {
  _inherits(TimeField, _React$Component);

  function TimeField(props) {
    var _ref;

    _classCallCheck(this, TimeField);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = TimeField.__proto__ || Object.getPrototypeOf(TimeField)).call.apply(_ref, [this, props].concat(args)));

    _this.configure(props);

    var _validateTimeAndCurso = validateTimeAndCursor(_this._showSeconds, _this.props.value, _this._defaultValue, _this._colon),
        _validateTimeAndCurso2 = _slicedToArray(_validateTimeAndCurso, 1),
        validatedTime = _validateTimeAndCurso2[0];

    _this.state = {
      value: validatedTime
    };

    _this.onInputChange = _this.onInputChange.bind(_this);
    return _this;
  }

  _createClass(TimeField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = this.props.value;


      this.configure(nextProps);

      if (value !== nextProps.value) {
        var _validateTimeAndCurso3 = validateTimeAndCursor(this._showSeconds, nextProps.value, this._defaultValue, this._colon),
            _validateTimeAndCurso4 = _slicedToArray(_validateTimeAndCurso3, 1),
            validatedTime = _validateTimeAndCurso4[0];

        this.setState({
          value: validatedTime
        });
      }
    }
  }, {
    key: 'configure',
    value: function configure(props) {
      this._colon = props.colon && props.colon.length === 1 ? props.colon : DEFAULT_COLON;
      this._showSeconds = Boolean(props.showSeconds);
      this._defaultValue = this._showSeconds ? DEFAULT_VALUE_FULL : DEFAULT_VALUE_SHORT;
      this._maxLength = this._defaultValue.length;
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(event, callback) {
      var oldValue = this.state.value;
      var inputEl = event.target;
      var inputValue = inputEl.value;
      var position = inputEl.selectionEnd;
      var isTyped = inputValue.length > oldValue.length;
      var cursorCharacter = inputValue[position - 1];
      var addedCharacter = isTyped ? cursorCharacter : null;
      var removedCharacter = isTyped ? null : oldValue[position];
      var replacedSingleCharacter = inputValue.length === oldValue.length ? oldValue[position - 1] : null;
      var colon = this._colon;

      var newValue = oldValue;
      var newPosition = position;

      if (addedCharacter !== null) {
        if (position > this._maxLength) {
          newPosition = this._maxLength;
        } else if ((position === 3 || position === 6) && addedCharacter === colon) {
          newValue = '' + inputValue.substr(0, position - 1) + colon + inputValue.substr(position + 1);
        } else if ((position === 3 || position === 6) && isNumber(addedCharacter)) {
          newValue = '' + inputValue.substr(0, position - 1) + colon + addedCharacter + inputValue.substr(position + 2);
          newPosition = position + 1;
        } else if (isNumber(addedCharacter)) {
          // user typed a number
          newValue = inputValue.substr(0, position - 1) + addedCharacter + inputValue.substr(position + 1);
          if (position === 2 || position === 5) {
            newPosition = position + 1;
          }
        } else {
          // if user typed NOT a number, then keep old value & position
          newPosition = position - 1;
        }
      } else if (replacedSingleCharacter !== null) {
        // user replaced only a single character
        if (isNumber(cursorCharacter)) {
          if (position - 1 === 2 || position - 1 === 5) {
            newValue = '' + inputValue.substr(0, position - 1) + colon + inputValue.substr(position);
          } else {
            newValue = inputValue;
          }
        } else {
          // user replaced a number on some non-number character
          newValue = oldValue;
          newPosition = position - 1;
        }
      } else if (typeof cursorCharacter !== 'undefined' && cursorCharacter !== colon && !isNumber(cursorCharacter)) {
        // set of characters replaced by non-number
        newValue = oldValue;
        newPosition = position - 1;
      } else if (removedCharacter !== null) {
        if ((position === 2 || position === 5) && removedCharacter === colon) {
          newValue = inputValue.substr(0, position - 1) + '0' + colon + inputValue.substr(position);
          newPosition = position - 1;
        } else {
          // user removed a number
          newValue = inputValue.substr(0, position) + '0' + inputValue.substr(position);
        }
      }

      var _validateTimeAndCurso5 = validateTimeAndCursor(this._showSeconds, newValue, oldValue, colon, newPosition),
          _validateTimeAndCurso6 = _slicedToArray(_validateTimeAndCurso5, 2),
          validatedTime = _validateTimeAndCurso6[0],
          validatedCursorPosition = _validateTimeAndCurso6[1];

      this.setState({ value: validatedTime }, function () {
        inputEl.selectionStart = validatedCursorPosition;
        inputEl.selectionEnd = validatedCursorPosition;
        callback(validatedTime);
      });

      event.persist();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var value = this.state.value;

      var _props = this.props,
          onChange = _props.onChange,
          style = _props.style,
          showSeconds = _props.showSeconds,
          input = _props.input,
          colon = _props.colon,
          props = _objectWithoutProperties(_props, ['onChange', 'style', 'showSeconds', 'input', 'colon']); //eslint-disable-line no-unused-vars


      var onChangeHandler = function onChangeHandler(event) {
        return _this2.onInputChange(event, function (v) {
          return onChange && onChange(v);
        });
      };

      if (input) {
        return _react2.default.cloneElement(input, _extends({}, props, {
          value: value,
          style: style,
          onChange: onChangeHandler
        }));
      }

      return _react2.default.createElement('input', _extends({
        type: 'text'
      }, props, {
        value: value,
        onChange: onChangeHandler,
        style: _extends({ width: showSeconds ? 54 : 35 }, style)
      }));
    }
  }]);

  return TimeField;
}(_react2.default.Component);

TimeField.propTypes = {
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  showSeconds: _propTypes2.default.bool,
  input: _propTypes2.default.element,
  colon: _propTypes2.default.string,
  style: _propTypes2.default.object
};
TimeField.defaultProps = {
  showSeconds: false,
  input: null,
  style: {},
  colon: DEFAULT_COLON
};
exports.default = TimeField;