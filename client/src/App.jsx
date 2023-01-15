import { EthProvider } from './contexts/EthContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './components/NotFound'
import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './components/Theme'
import Admin from './pages/Admin'
import Explorer from './pages/Explorer'
import AddProduct from './pages/Manufacture/AddProduct'
import Ship from './pages/Ship'
import Receive from './pages/Receive'
import OwnProduct from './pages/OwnProduct'
import UpdateProduct from './pages/UpdateProduct'

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <EthProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/ship" element={<Ship />} />
              <Route exact path="/receive" element={<Receive />} />
              <Route exact path="/own-product" element={<OwnProduct />} />
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/add-product" element={<AddProduct />} />
              <Route
                exact
                path="/update-product/:id"
                element={<UpdateProduct />}
              />
              <Route exact path="/explorer" element={<Explorer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </EthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
