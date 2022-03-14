"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchProductGql = "query{\n    getAllProducts {\n      category\n      id\n      name\n      url\n      price\n    }\n  }\n  ";
var mutateProductGql = "mutation AddProduct( $category: String!, $name: String!, $price: Float!, $url: String!){\n    addProduct( category: $category, name: $name, price: $price, url: $url) {\n      id\n      name\n      price \n      url\n      category\n    }\n  }";

function graphQLApi(_x) {
  return _graphQLApi.apply(this, arguments);
}

function _graphQLApi() {
  _graphQLApi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
    var variables,
        promise,
        res,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            variables = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            promise = fetch(window.ENV.UI_API_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });
            _context3.next = 4;
            return promise;

          case 4:
            _context3.next = 6;
            return _context3.sent.json();

          case 6:
            res = _context3.sent;
            return _context3.abrupt("return", res.data);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _graphQLApi.apply(this, arguments);
}

var ProductTable = /*#__PURE__*/function (_React$Component) {
  _inherits(ProductTable, _React$Component);

  var _super = _createSuper(ProductTable);

  function ProductTable() {
    _classCallCheck(this, ProductTable);

    return _super.apply(this, arguments);
  }

  _createClass(ProductTable, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price $"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image"))), /*#__PURE__*/React.createElement("tbody", null, this.props.products.map(function (item) {
        return /*#__PURE__*/React.createElement("tr", {
          key: item.id
        }, /*#__PURE__*/React.createElement("td", null, item.name), /*#__PURE__*/React.createElement("td", null, item.price), /*#__PURE__*/React.createElement("td", null, item.category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
          href: item.url,
          target: "_blank"
        }, " View ")));
      })));
    }
  }]);

  return ProductTable;
}(React.Component);

var defaultState = {
  "name": "",
  "price": "$",
  "category": "",
  "url": ""
};

var ProductAdd = /*#__PURE__*/function (_React$Component2) {
  _inherits(ProductAdd, _React$Component2);

  var _super2 = _createSuper(ProductAdd);

  function ProductAdd(props) {
    var _this;

    _classCallCheck(this, ProductAdd);

    _this = _super2.call(this, props);
    _this.state = defaultState;
    return _this;
  }

  _createClass(ProductAdd, [{
    key: "onAddHandler",
    value: function onAddHandler(event) {
      event.preventDefault();

      var data = _objectSpread({}, this.state);

      data.price = parseFloat(this.state.price.slice(1, this.state.price.length));
      this.props.onAdd(_objectSpread({}, data));
      this.setState(_objectSpread({}, defaultState));
    }
  }, {
    key: "setPrice",
    value: function setPrice(val) {
      this.setState({
        price: val
      });
    }
  }, {
    key: "setCategory",
    value: function setCategory(val) {
      this.setState({
        category: val
      });
    }
  }, {
    key: "setUrl",
    value: function setUrl(val) {
      this.setState({
        url: val
      });
    }
  }, {
    key: "setName",
    value: function setName(val) {
      this.setState({
        name: val
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, " Add a new product to Inventory"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("form", {
        onSubmit: function onSubmit(event) {
          return _this2.onAddHandler(event);
        },
        className: "product-form"
      }, /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "category"
      }, "Category"), /*#__PURE__*/React.createElement("select", {
        name: "category",
        onChange: function onChange(e) {
          _this2.setCategory(e.target.value);
        },
        value: this.state.category
      }, /*#__PURE__*/React.createElement("option", {
        value: ""
      }, "---select category---"), /*#__PURE__*/React.createElement("option", {
        value: "Shirt"
      }, "Shirt"), /*#__PURE__*/React.createElement("option", {
        value: "Jeans"
      }, "Jeans"), /*#__PURE__*/React.createElement("option", {
        value: "Jacket"
      }, "Jacket"), /*#__PURE__*/React.createElement("option", {
        value: "Sweater"
      }, "Sweater"), /*#__PURE__*/React.createElement("option", {
        value: "Accessories"
      }, "Accessories"))), /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "price"
      }, "Price Per Unit"), /*#__PURE__*/React.createElement("input", {
        name: "price",
        placeholder: "$",
        onChange: function onChange(e) {
          return _this2.setPrice(e.target.value);
        },
        value: this.state.price
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "name"
      }, "Product Name"), /*#__PURE__*/React.createElement("input", {
        name: "name",
        onChange: function onChange(e) {
          _this2.setName(e.target.value);
        },
        value: this.state.name
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "url"
      }, "Image URL"), /*#__PURE__*/React.createElement("input", {
        name: "url",
        onChange: function onChange(e) {
          _this2.setUrl(e.target.value);
        },
        value: this.state.url
      })), /*#__PURE__*/React.createElement("button", {
        className: "submit-btn",
        type: "submit"
      }, "Add Product")));
    }
  }]);

  return ProductAdd;
}(React.Component);

var ProductList = /*#__PURE__*/function (_React$Component3) {
  _inherits(ProductList, _React$Component3);

  var _super3 = _createSuper(ProductList);

  function ProductList(props) {
    var _this3;

    _classCallCheck(this, ProductList);

    _this3 = _super3.call(this, props);
    _this3.state = {
      products: []
    };
    _this3.addProduct = _this3.addProduct.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(ProductList, [{
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return graphQLApi(fetchProductGql);

              case 2:
                data = _context.sent;
                this.setState({
                  products: data.getAllProducts
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "addProduct",
    value: function () {
      var _addProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(product) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return graphQLApi(mutateProductGql, product);

              case 2:
                this.loadData();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addProduct(_x2) {
        return _addProduct.apply(this, arguments);
      }

      return addProduct;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "productList"
      }, /*#__PURE__*/React.createElement("h1", null, "Product List"), /*#__PURE__*/React.createElement(ProductTable, {
        products: this.state.products
      }), /*#__PURE__*/React.createElement(ProductAdd, {
        onAdd: this.addProduct
      }));
    }
  }]);

  return ProductList;
}(React.Component);

var App = /*#__PURE__*/function (_React$Component4) {
  _inherits(App, _React$Component4);

  var _super4 = _createSuper(App);

  function App() {
    _classCallCheck(this, App);

    return _super4.apply(this, arguments);
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "rootCont"
      }, /*#__PURE__*/React.createElement("h2", null, "Company Inventory"), /*#__PURE__*/React.createElement("h3", null, "Showing all available products"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductList, null));
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));