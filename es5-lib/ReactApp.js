'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AjaxList = require('./AjaxList');

var _AjaxList2 = _interopRequireDefault(_AjaxList);

var _DropZonePlace = require('./DropZonePlace');

var _DropZonePlace2 = _interopRequireDefault(_DropZonePlace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactApp = function (_React$Component) {
  _inherits(ReactApp, _React$Component);

  function ReactApp(props) {
    _classCallCheck(this, ReactApp);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactApp).call(this, props));

    _this.state = {
      value: 'set',
      images: null
    };
    return _this;
  }

  _createClass(ReactApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadImagesAjax();
    }
  }, {
    key: 'loadImagesAjax',
    value: function loadImagesAjax() {
      var _this2 = this;

      var url = '/api/uploads/all';
      var myInit = { method: 'Get' };
      fetch(url, myInit).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setState({
          images: data.images
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { id: 'app', style: styles.container },
        _react2.default.createElement(
          'div',
          { className: 'navbar' },
          _react2.default.createElement(
            'h1',
            { style: styles.header },
            'Isomorphimg'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'uploadzone' },
          _react2.default.createElement(_DropZonePlace2.default, { updateImages: function updateImages(loadImages) {
              return _this3.loadImagesAjax();
            } })
        ),
        _react2.default.createElement(_AjaxList2.default, { images: this.state.images })
      );
    }
  }]);

  return ReactApp;
}(_react2.default.Component);

var styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
  },
  header: {
    flex: '0 1 auto'
  },
  error: {
    color: 'red'
  }

};

exports.default = ReactApp;