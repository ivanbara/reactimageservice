'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AjaxList = function (_React$Component) {
  _inherits(AjaxList, _React$Component);

  function AjaxList(props) {
    _classCallCheck(this, AjaxList);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AjaxList).call(this, props));

    _this.state = { pictures: [] };
    return _this;
  }

  _createClass(AjaxList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var url = this.props.url;
      var myInit = { method: 'Get' };
      fetch(url, myInit).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setState({
          pictures: data.images
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var pictures = this.state.pictures.map(function (p) {
        return _react2.default.createElement(
          'a',
          { href: 'http://localhost:3000/api/uploads/images/' + p.imageName.split(".")[0], key: p.imageName },
          _react2.default.createElement('img', { src: p.imageURL, className: 'picture', title: p.imageName })
        );
      });

      if (!pictures.length) {
        pictures = _react2.default.createElement(
          'p',
          { className: 'pictures' },
          'Loading images..'
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Server pics'
        ),
        _react2.default.createElement(
          'div',
          { className: 'pictures' },
          ' ',
          pictures,
          ' '
        )
      );
    }
  }]);

  return AjaxList;
}(_react2.default.Component);

exports.default = AjaxList;