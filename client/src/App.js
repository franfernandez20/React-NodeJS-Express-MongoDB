import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { blue, indigo, orange } from '@material-ui/core/colors'
import Bar from './components/Bar'
import SalesContainer from './components/sales/SalesContainer'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: indigo[600]
    },
    primary: {
      main: orange[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Bar>
            <Route path='/sales' component={SalesContainer} />
        </Bar>
      </Router>
    </MuiThemeProvider>
  </div>
)

export default App