import React, { useState, useEffect, useRef } from 'react'

import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import UITable from '../components/UITable'
import ProductsCards from '../components/products/ProductsCards'
import ProductFormModal from '../components/products/ProductFormModal'
import ProductInfo from '../components/products/ProductInfo'



const SalesPage = () => {
  
    const [products, setProducts] = useState([]);
    const [openProductModal, setOpenProductModal] = useState(false);
    const [productInfo, setProductInfo] = useState({});

    const [cart, setCart] =  useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [count, setCount] = useState(0);
  
    useEffect(() => {
      fetch(`http://localhost:3001/products/`)
      .then((result) => result.json())
      .then((result) => setProducts(result.data));
    // .then((result) => console.log(result.data));
    },[]);
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

    return (
      <div>
        {/* <AddTodo />
        <VisibleTodoList />
        <Footer /> */}
        
        <UITable
          rows={rows}
          // setRows={this.setRows}
          selected={selectedRows}
          setSelected={setSelectedRows}
          data={cart}
          setData={setCart}
          title="Venta"
        />
      
        {/* <ProductInfo id={'5c68513c8001db327e6ee93d'}/> */}
        <Button onClick={openAddProduct}>Open Modal</Button>
        <Divider/>
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
  
  export default SalesPage