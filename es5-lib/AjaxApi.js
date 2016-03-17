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

var AjaxApi = function (_React$Component) {
	_inherits(AjaxApi, _React$Component);

	function AjaxApi(props) {
		_classCallCheck(this, AjaxApi);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AjaxApi).call(this, props));

		_this.state = { apidata: {} };
		return _this;
	}

	_createClass(AjaxApi, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var url = 'https://api.github.com/users/caspyin';
			var myInit = { method: 'Get' };
			fetch(url, myInit).then(function (response) {
				if (response.status >= 200 && response.status < 300) {
					return response;
				}
			}).then(function (response) {
				return response.json();
			}).then(function (data) {
				console.log(data);
				_this2.state.apidata = data;
				_this2.setState(_this2.state);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var api = _react2.default.createElement(
				'div',
				{ className: 'picture' },
				'login:',
				this.state.apidata.login,
				', name:',
				this.state.apidata.name,
				' '
			);

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h1',
					null,
					'Github data'
				),
				_react2.default.createElement(
					'div',
					{ className: 'pictures' },
					' ',
					api,
					' '
				)
			);
		}
	}]);

	return AjaxApi;
}(_react2.default.Component);

exports.default = AjaxApi;