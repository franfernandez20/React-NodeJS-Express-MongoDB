import React, { useState, useEffect, useRef } from 'react'
import { withStyles } from '@material-ui/core/styles';

import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UITable from '../components/UITable'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import SearchOutlined from '@material-ui/icons/SearchOutlined';

import ProductsCards from '../components/products/ProductsCards'
import ProductFormModal from '../components/products/ProductFormModal'
import ProductInfo from '../components/products/ProductInfo'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  paper: {
    // maxWidth: 400,
    margin: `${theme.spacing.unit * 3}px auto`,
    padding: theme.spacing.unit,
  },
});

const SalesPage = (props) => {

  const { classes } = props;
  
  const [products, setProducts] = useState([]);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [productInfo, setProductInfo] = useState({});

  const [cart, setCart] =  useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   fetch(`http://localhost:3001/products/`)
  //   .then((result) => result.json())
  //   .then((result) => setProducts(result.data));
  // // .then((result) => console.log(result.data));
  // },[]);

  const searchProductbyName = (name) => {
    fetch(`http://localhost:3001/products/find/?name=${name}`)
    .then((result) => result.json())
    .then((result) => setProducts(result.data));
  }
  /**
   * UITable settings 
   */
  const rows= [
    { id: 'name', numeric: false, disablePadding: true, align:'left', label: 'Nombre' },
    { id: 'category', numeric: true, disablePadding: false, align:'right', label: 'Categoría' },
    { id: 'pvp', numeric: true, disablePadding: false, align:'right', label: 'P.V.P' },
    { id: 'pvr', numeric: true, disablePadding: false, align:'right', label: 'Precio Aplicado' },
  ]

  /**
   * END UITable Settings
   */

  const handleAddProduct = (product) => {
    console.log('EL prodcuto desde fuera del componente', product);
    console.log('cart:', cart);
    setCart([...cart,product]);
  }

  const openAddProduct = () => {
    setOpenProductModal(true);
  }
  const closeAddProduct = () => {
    setOpenProductModal(false);
  }

  const handleProductMoreInfo = (product) => {
    setProductInfo(product);
    setOpenProductModal(true);
  }

  const onchange = (event) => {
    console.log('search',event.target.value);
    const name =event.target.value;
    fetch(`http://localhost:3001/products/find/?name=${name}`)
    .then((result) => result.json())
    .then((result) => setProducts(result.data));
    // searchProductbyName(event.target.value);
  } 

  return (
    <div>
      {/* <AddTodo />
      <VisibleTodoList />
      <Footer /> */}
      <Grid container spacing={16}>
        <Grid item xs={9}>
          <UITable
            rows={rows}
            // setRows={this.setRows}
            selected={selectedRows}
            setSelected={setSelectedRows}
            data={cart}
            setData={setCart}
            title="Venta"
          />
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <div className={classes.margin}>
                  <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                      <SearchOutlined />
                    </Grid>
                    <Grid item>
                      <TextField id="nameSearch" label="Nombre" onChange={onchange} />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={openAddProduct}>Open Modal</Button>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={openAddProduct}>Open Modal</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    
      {/* <ProductInfo id={'5c68513c8001db327e6ee93d'}/> */}
      <Button onClick={openAddProduct}>Open Modal</Button>
      {/* <ProductFormModal
      open={openProductModal}
      onAdd={handleAddProduct}
      onCancel={closeAddProduct}
      /> */}
      {/* <ProductFormModal 
        open={openProductModal}
        onAdd={handleAddProduct}
        onCancel={closeAddProduct}
        onClose={closeAddProduct}
        saveForm
      /> */}
      {productInfo && 
        <ProductFormModal
            product={productInfo}
            open={openProductModal}
            onAdd={handleAddProduct}
            onCancel={closeAddProduct}
            onClose={closeAddProduct}
        />
      }
      {
      products && 
        <ProductsCards
          products={products}
          onAddProduct={handleAddProduct}
          onProductMoreInfo={handleProductMoreInfo}
        />
      }
    </div>
  );
}
  
export default withStyles(styles)(SalesPage)