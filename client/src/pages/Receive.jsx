import React from 'react'
import Navbar from '../components/Navbar'
import Button from '@material-ui/core/Button'
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
import Loader from '../components/Loader'
import { useEth } from '../contexts/EthContext'
import {
  getNavItem,
  handleSetModalData,
  redirect,
  Roles
} from '../components/Utils'
import Product from '../components/Product'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

const Receive = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [count, setCount] = React.useState(0)
  const {
    state: { contract, hasRole, accounts, isAdmin }
  } = useEth()
  const [allReceiveProducts, setAllReceiveProducts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [display, setDisplay] = React.useState(getNavItem(hasRole))
  const [alertText, setAlertText] = React.useState('')

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const [open, setOpen] = React.useState(false)
  const [modalData, setModalData] = React.useState([])

  const handleClose = () => setOpen(false)

  const handleClick = async (prod) => {
    handleSetModalData(prod, contract, setModalData)
    setOpen(true)
  }

  const handleSetTxhash = async (prod, hash) => {
    await contract.methods
      .setTransactionHash(prod[0][0], hash)
      .send({ from: accounts[0] })
  }

  const handleReceiveButton = async (prod) => {
    switch (hasRole) {
      case Roles.ThirdParty:
        await contract.methods
          .receiveByThirdParty(parseInt(prod[0][0]))
          .send({ from: accounts[0] })
          .on('transactionHash', function (hash) {
            handleSetTxhash(prod, hash)
          })
        break
      case Roles.DeliveryHub:
        await contract.methods
          .receiveByDeliveryHub(parseInt(prod[0][0]))
          .send({ from: accounts[0] })
          .on('transactionHash', function (hash) {
            handleSetTxhash(prod, hash)
          })
        break
      case Roles.Customer:
        await contract.methods
          .receiveByCustomer(parseInt(prod[0][0]))
          .send({ from: accounts[0] })
          .on('transactionHash', function (hash) {
            handleSetTxhash(prod, hash)
          })
        break
      default:
        setAlertText('You are not the owner of the Product')
        break
    }
    setCount(0)
  }

  React.useLayoutEffect(() => {
    !_.isEmpty(display.navItem) && redirect(display.navItem, navigate)
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
        const receiveState =
          hasRole === Roles.ThirdParty
            ? '2'
            : hasRole === Roles.DeliveryHub
            ? '5'
            : '7'
        if (prodState === receiveState) {
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
        setAllReceiveProducts(arr)
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
        <h1 className={classes.pageHeading}>Products To Receive</h1>
        <div>
          <p>
            <b style={{ color: 'red' }}>
              {alertText.length !== 0 ? alertText : ''}
            </b>
          </p>
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
                    <TableCell
                      className={clsx(classes.TableHead)}
                      align="center"
                    >
                      Receive
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allReceiveProducts.length !== 0 &&
                    allReceiveProducts
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((prod) => {
                        const date = new Date(parseInt(prod[1][0] * 1000))
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
                            <TableCell
                              align="center"
                              onClick={() => handleClick(prod)}
                            >
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
                            <TableCell
                              className={clsx(classes.TableCell)}
                              align="center"
                            >
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={() => handleReceiveButton(prod)}
                              >
                                Receive
                              </Button>
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
              count={allReceiveProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>

        {/* {allReceiveProducts.length !== 0 ? (
          allReceiveProducts.map((prod) => (
            <>
              <div>
                <p>Universal ID : {prod[0][0]}</p>
                <p>SKU : {prod[0][1]}</p>
                <p>Owner : {prod[0][2]}</p>
                <p>Manufacturer : {prod[0][3]}</p>
                <p>Name of Manufacturer : {prod[0][4]}</p>
                <p>Details of Manufacturer : {prod[0][5]}</p>
                <p>Longitude of Manufature : {prod[0][6]}</p>
                <p>Latitude of Manufature : {prod[0][7]}</p>

                <p>Manufactured date : {prod[1][0]}</p>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => handleShipButton(prod[0][0])}
                >
                  SHIP
                </Button>
              </div>
            </>
          ))
        ) : (
          <> </>
        )} */}
      </Navbar>
    </div>
  )
}

export default Receive
