import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import ProductForm from './ProductForm';

const styles = theme => ({
  paper: {
    position: 'absolute',
    // width: theme.spacing(100),
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(4),
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const ProductFormModal = ({ classes, open, ...props}) => {

  return (
    <Modal
      aria-labelledby="Add-Product"
      aria-describedby="Add-Product/Save-Product"
      open={open}
    >
      <div style={getModalStyle()} className={classes.paper}>
        <ProductForm {...props} />
      </div>
    </Modal>
  )
}
export default withStyles(styles)(ProductFormModal);