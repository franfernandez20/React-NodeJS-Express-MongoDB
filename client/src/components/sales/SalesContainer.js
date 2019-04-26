import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UITable from '../UITable';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12,1fr)',
    gripGap: `${theme.spacing.unit * 3}px`,
  },
  actionsButtons: {
    // minHeight: '100%',
    backgroundColor: 'red',
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

class SalesContainer extends React.Component {

  state = {
    rows: [
      { id: 'name', numeric: false, disablePadding: true, align:'left', label: 'Dessert (100g serving)' },
			{ id: 'calories', numeric: true, disablePadding: false, align:'right', label: 'Calories' },
			{ id: 'fat', numeric: true, disablePadding: false, align:'right', label: 'Fat (g)' },
			{ id: 'carbs', numeric: false, disablePadding: true, align:'left', label: 'Caddddrbs    (g)' },
			{ id: 'protein', numeric: true, disablePadding: false, align:'right', label: 'Protein (g)' },
    ],
    selectedRows: [],
    data: []
  }

  componentDidMount() {
    this.generateData();
  }

  generateRow() {
		const rows = [
			{ id: 'name', numeric: false, disablePadding: true, align:'left', label: 'Dessert (100g serving)' },
			{ id: 'calories', numeric: true, disablePadding: false, align:'right', label: 'Calories' },
			{ id: 'fat', numeric: true, disablePadding: false, align:'right', label: 'Fat (g)' },
			{ id: 'carbs', numeric: false, disablePadding: true, align:'left', label: 'Caddddrbs    (g)' },
			{ id: 'protein', numeric: true, disablePadding: false, align:'right', label: 'Protein (g)' },
		];
		return rows; 
	}

  generateData() {
    this.setState({
      data: [
        {
            "id": 1,
            "name": "Cupcake",
            "calories": 305,
            "fat": 3.7,
            "carbs": 67,
            "protein": 4.3
        },
        {
            "id": 2,
            "name": "Donut",
            "calories": 452,
            "fat": 25,
            "carbs": 51,
            "protein": 4.9
        },
        {
            "id": 3,
            "name": "Eclair",
            "calories": 262,
            "fat": 16,
            "carbs": 24,
            "protein": 6
        },
        {
            "id": 4,
            "name": "Frozen yoghurt",
            "calories": 159,
            "fat": 6,
            "carbs": 24,
            "protein": 4
        },
        {
            "id": 5,
            "name": "Gingerbread",
            "calories": 356,
            "fat": 16,
            "carbs": 49,
            "protein": 3.9
        },
        {
            "id": 6,
            "name": "Honeycomb",
            "calories": 408,
            "fat": 3.2,
            "carbs": 87,
            "protein": 6.5
        },
        {
            "id": 7,
            "name": "Ice cream sandwich",
            "calories": 237,
            "fat": 9,
            "carbs": 37,
            "protein": 4.3
        },
        {
            "id": 8,
            "name": "Jelly Bean",
            "calories": 375,
            "fat": 0,
            "carbs": 94,
            "protein": 0
        },
        {
            "id": 9,
            "name": "KitKat",
            "calories": 518,
            "fat": 26,
            "carbs": 65,
            "protein": 7
        },
        {
            "id": 10,
            "name": "Lollipop",
            "calories": 392,
            "fat": 0.2,
            "carbs": 98,
            "protein": 0
        },
        {
            "id": 11,
            "name": "Marshmallow",
            "calories": 318,
            "fat": 0,
            "carbs": 81,
            "protein": 2
        },
        {
            "id": 12,
            "name": "Nougat",
            "calories": 360,
            "fat": 19,
            "carbs": 9,
            "protein": 37
        },
        {
            "id": 13,
            "name": "Oreo",
            "calories": 437,
            "fat": 18,
            "carbs": 63,
            "protein": 4
        }
      ]
    });
  }

  setData = (data) => {
    this.setState({data});
  }

  setRows = (rows) => {
    this.setState({rows});
  }

  setSelectedRows = (selected) => {
    this.setState({selectedRows: selected});
  }
    
  render() {
    const { classes } = this.props;
    const { data, rows, selectedRows } = this.state;
    // const data = this.generateData(); //  Meter en state 

    return (
      <div>
        <Grid id="top-row" container spacing={24}>
          <Grid item  xs={8}>
            <UITable
              rows={rows}
              setRows={this.setRows}
              selected={selectedRows}
              setSelected={this.setSelectedRows}
              data={data}
              setData={this.setData}
              title="Titulo"
            />
          </Grid>
          <Grid  container direction="column" alignItems="center" spacing={0} xs={4}>

            <Grid item xs={6} >
              <Paper className={classes.paper}>Grid cell 2, 1</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Grid cell 2, 1</Paper>
            </Grid>
            
          </Grid>
        </Grid>
        <Grid id="bottom-row" container spacing={24}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Grid cell 1, 2</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Grid cell 2, 2</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Grid cell 2, 2</Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(SalesContainer);