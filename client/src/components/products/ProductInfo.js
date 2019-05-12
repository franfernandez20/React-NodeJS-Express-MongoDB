import React from 'react'

class ProductInfo extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      product: {}
    }
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = () => {
    let { id } = this.props;
     fetch(`http://localhost:3001/products/details/${id}`)
        .then((result) => result.json())
        .then(product => this.setState({ product }));
  };

  render() {
    let { product } = this.state;

    return (
      <div>
        {product && 
          <div>
            <h1>Name:: {product.name}</h1>
            <h2>Category: {product.category}</h2>
            <h4>description: {product.description}</h4>
            <h2>pc: {product.pc}</h2>
            <h2>pvi: {product.pvi}</h2>
            <h2>pvr: {product.pvr}</h2>
            <h2>pvp: {product.pvp}</h2>
            <h2>stock: {product.stock}</h2>
            <h2>stockMin: {product.stockMin}</h2>
            <h2>_id: {product._id}</h2>
          </div>
        }
      </div>
    );
  }
}

export default ProductInfo;