import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';
import { 
  Add,
  CheckBox,
  CheckBoxOutlineBlank,
  MoreHoriz,
  ArrowDropDown,
  ArrowDropUp,
  NotInterested,
  LooksOneOutlined, LooksTwoOutlined, Looks3Outlined, Looks4Outlined, Looks5Outlined, Looks6Outlined, ExposureZero,
  Filter7, Filter8, Filter9, Filter9Plus,
} from '@material-ui/icons'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
  card: {
    // maxWidth: 250,
    // height:250,
    // marginBottom: '6px',
    // maxheight: 10,
  },
  media: {
    height: 25,
    background: theme.palette.primary.main
  },
  actions: {
    display: 'float',
  },
  content: {
    // flex: '1 0 auto',
    height:70
  },
  buttonHeader: {
    // height: 50,
    // width: 50,
    // color: "secondary",
    margin: '-20px',
    // borderStyle: 'solid',
    // borderColor: 'black'
  },
  price: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
  category: {
    color: 'orange',
  },
  iconHeader: {
    // color: 'rgba(0, 0, 0, 0.7)',
    // fontSize: 35
  },
  iconStock: {
    marginLeft: 'auto',
  },
  opacitySpans: {
    color: 'rgba(0, 0, 0, 0.6)',
  }
});

function ProductCard(props) {
  const { classes, product } = props;
  let { onAdd, onMoreInfo } = props;
  const [expand, setExpand] = useState(false);
  
  if (typeof onAdd !== 'function') {
    console.warn('ProductCard: onAdd() is not defined')
    onAdd = (id) => { console.log(`Trying to add product: ${id}`)}
  }
  if (typeof onMoreInfo !== 'function') {
    console.warn('ProductCard: onMoreInfo() is not defined')
    onMoreInfo = (id) => { console.log(`Trying to see more info of product: ${id}`)}
  }

  const getStockIcon = (n) => {
    if (n <= 0) return <ExposureZero color="error"/>;
    switch (n) {
      case 1: return <LooksOneOutlined/>;
      case 2: return <LooksTwoOutlined/>;
      case 3: return <Looks3Outlined/>;
      case 4: return <Looks4Outlined/>;
      case 5: return <Looks5Outlined/>;
      case 6: return <Looks6Outlined/>;
      case 7: return <Filter7/>;
      case 8: return <Filter8/>;
      case 9: return <Filter9/>;
      default: return <Filter9Plus/>;
    }
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.media}
        action={
          <Fab color="primary" aria-label="Add" className={classes.buttonHeader}  onClick={() => onAdd(product)}>
            <AddIcon className={classes.iconHeader}/>
          </Fab>
        }
      />
      <CardContent>
        <div className={classes.content}>
          <Typography variant={product.name.length < 13 ? 'h4' : 'h6'} component="h2">
            {product.name}
          </Typography>
          <Typography className={classes.category} variant="subtitle1" >
            {product.category}
          </Typography>
          <Typography className={classes.price} aling='right' variant="h5" >
            {product.pvp} €
          </Typography>
        </div>
        <Collapse in={expand}>
          <Divider/>
          <Tooltip title="Precio de coste" placement="left">
            <Typography variant="subtitle2" >
              <span className={classes.opacitySpans}>Coste: </span> {product.pc} €
            </Typography>
          </Tooltip>
          <Tooltip title="Precio venta ideal" placement="left">
            <Typography variant="subtitle2" >
              <span className={classes.opacitySpans}>P.ideal: </span> {product.pvi} €
            </Typography>
          </Tooltip>
          <Tooltip title="Último precio de venta" placement="left">
            <Typography variant="subtitle2" >
              <span className={classes.opacitySpans}>Últ. precio: </span> {product.pvr} €
            </Typography>
          </Tooltip>
        </Collapse>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton aria-label="More" onClick={() => onMoreInfo(product)}>
          <MoreHoriz />
        </IconButton>
        <IconButton
          aria-label="Show more"
          onClick={() => setExpand(!expand)}
        >
          {expand ? <ArrowDropUp /> : <ArrowDropDown />}
        </IconButton>
        <Typography className={classes.iconStock} component="h4" >
          {product.stoked ? getStockIcon(product.stock) : <NotInterested/>}
        </Typography>
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
  onMoreInfo: PropTypes.func
};

ProductCard.defaultProps = {
  product: {}
}

export default withStyles(styles)(ProductCard);