import React from 'react'
import Grid from '@material-ui/core/Grid';

import ProductCard from './ProductCard';


const ProductsCards = (props) => {

  const { products, onAddProduct, onProductMoreInfo } = props;
  return (
    <Grid container spacing={16}>
      {
        products.map(element => 
          <Grid key={element._id} item>
            <ProductCard
              product={element}
              onAdd={onAddProduct}
              onMoreInfo={onProductMoreInfo}
            />
          </Grid>
        )
      }
    </Grid>
  );
}

export default ProductsCards;