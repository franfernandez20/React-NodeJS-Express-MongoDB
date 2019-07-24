import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import productServer from './../../servers/productServer'

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { Cancel, AddCircleOutline } from '@material-ui/icons';
import { Typography } from '@material-ui/core';


/*
* Asegurarse que cuando se le pasa la prop product este rellena desde el primer momente
* ya que se la estamos asignando al state y le asignara su primer valor
*/
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    margin: 'auto',
    // marginBottom: theme.spacing(3)
    marginBottom: theme.spacing.unit * 3
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  select: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: '150px'
  },
  textAreaField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  numberField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  prices: {
    // display: 'inline',
  },
  options2: {
    // display: 'inline-block'
  },
  buttons: {
    marginTop: 40,
    marginBottom: 30
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const categories = [
  {
    name: 'Taller',
    label: '$',
  },
  {
    name: 'Ropa',
    label: '€',
  },
  {
    name: 'Accesorios',
    label: '฿',
  },
  {
    name: 'Cadenas',
    label: '¥',
  },
];
class ProductForm extends React.Component {
  
  constructor(props) {
    const { product } = props;
    super(props);
    this.state = {
      ...product
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  hanldeAddProduct = (id) => {
    console.log('ProductForm Adding a product, id : ' + id)
  } 
  handleMoreInfoProduct = (id) => {
    console.log('ProductForm showing a product, id : ' + id)
  } 

  fetchProduct = () => {
    let { products } = this.props;
    console.log('Productos--' + products);
  };

  handleAdd = () => {
    const product = this.state;
    const { onAdd, onClose } = this.props;

    if( typeof onAdd === 'function') {
      onAdd(product);
      onClose();
    }
  }

  handleSave = () => {
    const { saveForm, onClose } = this.props;

    if(saveForm) {
      productServer.save()
        .then(response => console.log('Success:', JSON.stringify(response))) //TBD mensaje SUCCESS
        .catch(error => console.error('Error:', error));
    }
    if (typeof onClose === 'function') onClose();
  }

  handleDelete(id) {
    console.log('deleting',id)
    productServer.deleteById(id).then((result) => console.log('SUCCESS', result)).catch()
    this.props.onClose();
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    if (typeof onCancel === 'function') {
      onCancel();
    } 
  }

  returnTitle() {
    const { classes,saveForm, product } = this.props;
    let title = '';
    if (saveForm) {
      title = ' Guardar Nuevo Producto '
    } else if (product && product._id) {
      title = ' Añadir Producto'
    } else {
      title = 'Añadir Nuevo Producto'
    }
    
    return (
      <Typography className={classes.title} variant="h2">
        {title}
      </Typography>
    );
  }
  

  render() {
    const { classes, saveForm } = this.props;
    const {
      _id,
      name,
      pvr,
      pvp,
      pvi,
      pc,
      stock,
      stockMin,
      category,
      description
    } = this.state;

    return (
      <div className={classes.container}>
        {this.returnTitle()}
        <TextField
          id="name"
          label="Nombre"
          required
          className={classes.textField}
          fullWidth
          value={name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <Grid container spacing={8}>
          <Grid item>
            <TextField
              id="pvr"
              label="Precio"
              required
              value={pvr}
              onChange={this.handleChange('pvr')}
              type="number"
              className={classes.numberField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="pvp"
              label="P.V.P"
              value={pvp}
              onChange={this.handleChange('pvp')}
              type="number"
              className={classes.numberField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="P. venta ideal"
              label="Precio"
              value={pvi}
              onChange={this.handleChange('pvi')}
              type="number"
              className={classes.numberField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="pc"
              label="Precio Coste"
              value={pc}
              onChange={this.handleChange('pc')}
              type="number"
              className={classes.numberField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item>
            <TextField
              id="category"
              select
              label={category ? '' : 'Categoría'}
              required
              className={classes.select}
              value={category ? category : 'Category'}
              onChange={this.handleChange('category')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              // helperText="Please select your currency"
              margin="normal"
              variant="outlined"
            >
              {categories.map(option => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="description"
              label="Descripción"
              value={description}
              onChange={this.handleChange('description')}
              multiline
              rows="4"
              className={classes.textAreaField}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item>
            <TextField
              id="stock"
              label="Stock"
              value={stock}
              onChange={this.handleChange('stock')}
              type="number"
              className={classes.numberField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="stockMin"
              label="StockMin"
              value={stockMin}
              onChange={this.handleChange('stockMin')}
              type="number"
              className={classes.numberField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid className={classes.buttons} container spacing={16}>
          <Grid item xs={2}>
            <Grow in={typeof _id !== 'undefined'}>
              <Button onClick={() => this.handleDelete(_id)} variant="contained" color="secondary" className={classes.button}>
                Eliminar
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            </Grow>
          </Grid>
          <Grid item xs={2}>
            {false &&
              <Button variant="contained" color="default" className={classes.button}>
                Upload
                <CloudUploadIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
              </Button>
            }
          </Grid>
          <Grid item xs={2}>
            {saveForm ?
              <Button onClick={this.handleSave} variant="contained" color="default" className={classes.button}>
                <SaveIcon className={classes.leftIcon} />
                Guardar
              </Button>
              :
              <Button onClick={this.handleAdd} variant="contained" color="default" className={classes.button}>
                <AddCircleOutline className={classes.leftIcon} />
                Añadir
              </Button>
            }
          </Grid>
          <Grid item xs={2}>
            <Button onClick={this.handleCancel} variant="contained" color="default" className={classes.button}>
              Cancelar
              <Cancel className={classes.rightIcon} />
            </Button>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ProductForm.propTypes = {
    classes: PropTypes.object.isRequired,
    onAdd: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
}

ProductForm.defaultProps = {
    product: {},
    saveForm: false
}

export default withStyles(styles)(ProductForm);