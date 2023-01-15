import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination'
import { useStyles } from '../components/Styles'
import clsx from 'clsx'
import Product from '../components/Product'
import { useEth } from '../contexts/EthContext'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import {
  getNavItem,
  handleSetModalData,
  redirect,
  Roles
} from '../components/Utils'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

const OwnProduct = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const {
    state: { contract, hasRole, isAdmin }
  } = useEth()
  const [count, setCount] = React.useState(0)
  const [ownProducts, setOwnProducts] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [display, setDisplay] = React.useState(getNavItem(hasRole))
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [open, setOpen] = React.useState(false)
  const [modalData, setModalData] = React.useState({})

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleClose = () => setOpen(false)

  const handleClick = async (prod) => {
    handleSetModalData(prod, contract, setModalData)
    setOpen(true)
  }

  React.useLayoutEffect(() => {
    !_.isEmpty(display.navItem) && redirect(display.navItem, navigate, isAdmin)
    if (_.isEmpty(display.navItem) && isAdmin) navigate('/')
  }, [hasRole, display, navigate, isAdmin])

  React.useEffect(() => {
    let isSubscribed = true
    setLoading(true)
    const setAllProduct = async () => {
      const count =
        contract && (await contract.methods.getProductCount().call())
      if (isSubscribed) {
        setCount(count)
      }
      const arr = []
      for (var i = 1; i < count; i++) {
        const prodState =
          contract && (await contract.methods.getProductState(i).call())
        const ownState =
          hasRole === Roles.ThirdParty
            ? '3'
            : hasRole === Roles.Customer
            ? '8'
            : ''
        if (prodState === ownState) {
          const prodData = []
          const a =
            contract &&
            (await contract.methods.getProductPart1(i, 'product', 0).call())
          const b =
            contract &&
            (await contract.methods.getProductPart2(i, 'product', 0).call())
          prodData.push(a)
          prodData.push(b)
          arr.push(prodData)
        }
      }
      if (isSubscribed) {
        setOwnProducts(arr)
      }
    }
    setAllProduct()
    setDisplay(getNavItem(hasRole))
    setLoading(false)
    return () => (isSubscribed = false)
  }, [count, hasRole, contract])

  return loading ? (
    <Loader />
  ) : (
    <div className={classes.pageWrap}>
      <Navbar pageTitle={hasRole} navItems={display.navItem}>
        <Product prod={modalData} open={open} handleClose={handleClose} />
        <h1 className={classes.pageHeading}>Own Products</h1>
        <div>
          <Paper className={classes.TableRoot}>
            <TableContainer className={classes.TableContainer}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.TableHead} align="left">
                      UUID
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      SKU
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Category
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Name
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Price
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Manufacture Date
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Status
                    </TableCell>
                    <TableCell
                      className={clsx(classes.TableHead, classes.AddressCell)}
                      align="center"
                    >
                      Owner
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ownProducts.length !== 0 &&
                    ownProducts
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((prod) => {
                        const date = new Date(parseInt(prod[1][1] * 1000))
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={prod[0][0]}
                          >
                            <TableCell
                              className={classes.TableCell}
                              component="th"
                              align="left"
                              scope="row"
                              onClick={() => handleClick(prod)}
                            >
                              {prod[0][0]}
                            </TableCell>
                            <TableCell
                              className={classes.TableCell}
                              align="center"
                              onClick={() => handleClick(prod)}
                            >
                              {prod[0][1]}
                            </TableCell>
                            <TableCell
                              className={classes.TableCell}
                              align="center"
                              onClick={() => handleClick(prod)}
                            >
                              {prod[1][4]}
                            </TableCell>
                            <TableCell
                              className={classes.TableCell}
                              align="center"
                              onClick={() => handleClick(prod)}
                            >
                              {prod[1][3]}
                            </TableCell>
                            <TableCell
                              className={classes.TableCell}
                              align="center"
                              onClick={() => handleClick(prod)}
                            >
                              {prod[1][2]} ETH
                            </TableCell>
                            <TableCell align="center">
                              {date.toDateString() + ' ' + date.toTimeString()}
                            </TableCell>
                            <TableCell
                              className={classes.TableCell}
                              align="center"
                              onClick={() => handleClick(prod)}
                            >
                              {prod[1][7]}
                            </TableCell>
                            <TableCell
                              className={clsx(
                                classes.TableCell,
                                classes.AddressCell
                              )}
                              align="left"
                              onClick={() => handleClick(prod)}
                            >
                              {prod[0][2]}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={ownProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </Navbar>
    </div>
  )
}

export default OwnProduct
