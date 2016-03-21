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

var style = {
  background: 'red'
};

var DropZonePlace = function (_React$Component) {
  _inherits(DropZonePlace, _React$Component);

  function DropZonePlace(props) {
    _classCallCheck(this, DropZonePlace);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DropZonePlace).call(this, props));

    _this.state = {
      imagePreviewUrl: '',
      status: _react2.default.createElement(
        'p',
        null,
        'Click or drop files here to upload...'
      ),
      style: {}
    };
    _this.uploadFile = '';
    _this.handleImageChange = _this.handleImageChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.onDragOver = _this.onDragOver.bind(_this);
    _this.onDragLeave = _this.onDragLeave.bind(_this);

    return _this;
  }

  _createClass(DropZonePlace, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      if (!this.uploadFile) {
        return;
      }
      var data = new FormData();
      data.append('recfile', this.uploadFile);
      data.append('user', 'guestUser');

      fetch('http://localhost:3000/api/uploads/upload/', {
        method: 'post',
        body: data
      }).then(function (res) {
        _this2.setState({
          status: _react2.default.createElement(
            'p',
            null,
            'Uploading...'
          )
        });
        return res.json();
      }).then(function (val) {
        if (val.message == 'ok') {
          _this2.setState({
            status: _react2.default.createElement(
              'p',
              { id: 'checkMark' },
              _react2.default.createElement('i', { className: 'fa fa-check' })
            )
          });
          console.log(val);
        };
      });
      this.uploadFile = '';
      this.setState({
        imagePreviewUrl: ''
      });
    }
  }, {
    key: 'handleImageChange',
    value: function handleImageChange(e) {
      var _this3 = this;

      e.preventDefault();

      var reader = new FileReader();
      var file = e.target.files[0];

      reader.onloadend = function () {
        _this3.setState({
          imagePreviewUrl: reader.result,
          style: { background: '' }
        });
        _this3.uploadFile = file;
      };

      reader.readAsDataURL(file);
    }
  }, {
    key: 'onDragOver',
    value: function onDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        style: { background: '#c5e0ff', border: 'solid 3px black' }
      });
    }
  }, {
    key: 'onDragLeave',
    value: function onDragLeave(e) {
      e.preventDefault();
      this.setState({
        style: { background: '', border: 'dashed' }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var imagePreviewUrl = this.state.imagePreviewUrl;

      var imagePreview = this.state.status;
      if (imagePreviewUrl) {
        imagePreview = _react2.default.createElement('img', { src: imagePreviewUrl, className: 'dropPreview' });
      }
      return _react2.default.createElement(
        'div',
        {
          onDragOver: this.onDragOver,
          onDragLeave: this.onDragLeave
        },
        _react2.default.createElement(
          'div',
          { className: 'dropZone', id: 'upload-file-container', style: this.state.style },
          imagePreview,
          _react2.default.createElement('input', { type: 'file', name: 'file-upload', onChange: this.handleImageChange })
        ),
        _react2.default.createElement(
          'a',
          { href: '', onClick: this.handleSubmit, className: 'icon-button cloudicon' },
          _react2.default.createElement('i', { className: 'fa fa-cloud-upload' }),
          _react2.default.createElement('span', null)
        )
      );
    }
  }]);

  return DropZonePlace;
}(_react2.default.Component);

DropZonePlace.propTypes = {
  onDrop: _react2.default.PropTypes.func,
  onDragOver: _react2.default.PropTypes.func,
  onDragLeave: _react2.default.PropTypes.func
};

exports.default = DropZonePlace;