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

var SearchExampleComponent = function (_React$Component) {
	_inherits(SearchExampleComponent, _React$Component);

	function SearchExampleComponent(props) {
		_classCallCheck(this, SearchExampleComponent);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SearchExampleComponent).call(this, props));

		_this.state = { searchString: '' };
		_this.handleChange = _this.handleChange.bind(_this);
		return _this;
	}

	_createClass(SearchExampleComponent, [{
		key: 'handleChange',
		value: function handleChange(e) {
			this.setState({ searchString: e.target.value });
		}
	}, {
		key: 'render',
		value: function render() {

			var libraries = this.props.items;
			var searchString = this.state.searchString.trim().toLowerCase();

			if (searchString.length > 0) {
				libraries = libraries.filter(function (l) {
					return l.name.toLowerCase().match(searchString);
				});
			}
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('input', { type: 'text', value: this.state.searchString, onChange: this.handleChange, placeholder: 'Type here' }),
				_react2.default.createElement(
					'ul',
					null,
					libraries.map(function (l) {
						return _react2.default.createElement(
							'li',
							{ key: l.name },
							l.name,
							' ',
							_react2.default.createElement(
								'a',
								{ href: l.url },
								l.url
							)
						);
					})
				)
			);
		}
	}]);

	return SearchExampleComponent;
}(_react2.default.Component);

exports.default = SearchExampleComponent;