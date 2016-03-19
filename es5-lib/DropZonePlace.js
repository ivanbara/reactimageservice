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

var DropZonePlace = function (_React$Component) {
  _inherits(DropZonePlace, _React$Component);

  function DropZonePlace(props) {
    _classCallCheck(this, DropZonePlace);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DropZonePlace).call(this, props));

    _this.state = {
      file: '',
      imagePreviewUrl: ''
    };
    _this.handleImageChange = _this.handleImageChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);

    return _this;
  }

  _createClass(DropZonePlace, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      if (!this.state.file) {
        return;
      }
      var data = new FormData();
      data.append('recfile', this.state.file);
      data.append('user', 'hubot');

      fetch('http://localhost:3000/api/uploads/upload/', {
        method: 'post',
        body: data
      });

      this.setState({
        file: '',
        imagePreviewUrl: ''
      });
    }
  }, {
    key: 'handleImageChange',
    value: function handleImageChange(e) {
      var _this2 = this;

      e.preventDefault();

      var reader = new FileReader();
      var file = e.target.files[0];

      reader.onloadend = function () {
        _this2.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      };

      reader.readAsDataURL(file);
    }

    //<button type="submit" onClick={this.handleSubmit} ></button>

  }, {
    key: 'render',
    value: function render() {
      var imagePreviewUrl = this.state.imagePreviewUrl;

      var $imagePreview = null;
      var previewText = _react2.default.createElement(
        'p',
        null,
        'Click to upload images...'
      );
      if (imagePreviewUrl) {
        $imagePreview = _react2.default.createElement('img', { src: imagePreviewUrl, className: 'dropPreview' });
        previewText = null;
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'dropZone', id: 'upload-file-container' },
          $imagePreview,
          ' ',
          previewText,
          _react2.default.createElement('input', { type: 'file', name: 'file-upload', onChange: this.handleImageChange })
        ),
        _react2.default.createElement('form', { onSubmit: this.handleSubmit, encType: 'multipart/form-data', className: 'uploadForm' }),
        _react2.default.createElement(
          'a',
          { href: '', onClick: this.handleSubmit, className: 'icon-button pinterest' },
          _react2.default.createElement('i', { className: 'fa fa-cloud-upload' }),
          _react2.default.createElement('span', null)
        )
      );
    }
  }]);

  return DropZonePlace;
}(_react2.default.Component);

exports.default = DropZonePlace;