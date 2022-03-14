const fetchProductGql = `query{
    getAllProducts {
      category
      id
      name
      url
      price
    }
  }
  `;
const mutateProductGql = `mutation AddProduct( $category: String!, $name: String!, $price: Float!, $url: String!){
    addProduct( category: $category, name: $name, price: $price, url: $url) {
      id
      name
      price 
      url
      category
    }
  }`;

async function graphQLApi(query, variables = {}) {
  const promise = fetch(window.ENV.UI_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
  const res = await (await promise).json();
  return res.data;
}

class ProductTable extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price $"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image"))), /*#__PURE__*/React.createElement("tbody", null, this.props.products.map(item => /*#__PURE__*/React.createElement("tr", {
      key: item.id
    }, /*#__PURE__*/React.createElement("td", null, item.name), /*#__PURE__*/React.createElement("td", null, item.price), /*#__PURE__*/React.createElement("td", null, item.category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
      href: item.url,
      target: "_blank"
    }, " View "))))));
  }

}

const defaultState = {
  "name": "",
  "price": "$",
  "category": "",
  "url": ""
};

class ProductAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  onAddHandler(event) {
    event.preventDefault();
    const data = { ...this.state
    };
    data.price = parseFloat(this.state.price.slice(1, this.state.price.length));
    this.props.onAdd({ ...data
    });
    this.setState({ ...defaultState
    });
  }

  setPrice(val) {
    this.setState({
      price: val
    });
  }

  setCategory(val) {
    this.setState({
      category: val
    });
  }

  setUrl(val) {
    this.setState({
      url: val
    });
  }

  setName(val) {
    this.setState({
      name: val
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, " Add a new product to Inventory"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("form", {
      onSubmit: event => this.onAddHandler(event),
      className: "product-form"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-input"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "category"
    }, "Category"), /*#__PURE__*/React.createElement("select", {
      name: "category",
      onChange: e => {
        this.setCategory(e.target.value);
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
      onChange: e => this.setPrice(e.target.value),
      value: this.state.price
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-input"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Product Name"), /*#__PURE__*/React.createElement("input", {
      name: "name",
      onChange: e => {
        this.setName(e.target.value);
      },
      value: this.state.name
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-input"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "url"
    }, "Image URL"), /*#__PURE__*/React.createElement("input", {
      name: "url",
      onChange: e => {
        this.setUrl(e.target.value);
      },
      value: this.state.url
    })), /*#__PURE__*/React.createElement("button", {
      className: "submit-btn",
      type: "submit"
    }, "Add Product")));
  }

}

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.addProduct = this.addProduct.bind(this);
  }

  async loadData() {
    const data = await graphQLApi(fetchProductGql);
    this.setState({
      products: data.getAllProducts
    });
  }

  componentDidMount() {
    this.loadData();
  }

  async addProduct(product) {
    await graphQLApi(mutateProductGql, product);
    this.loadData();
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "productList"
    }, /*#__PURE__*/React.createElement("h1", null, "Product List"), /*#__PURE__*/React.createElement(ProductTable, {
      products: this.state.products
    }), /*#__PURE__*/React.createElement(ProductAdd, {
      onAdd: this.addProduct
    }));
  }

}

class App extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "rootCont"
    }, /*#__PURE__*/React.createElement("h2", null, "Company Inventory"), /*#__PURE__*/React.createElement("h3", null, "Showing all available products"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductList, null));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));