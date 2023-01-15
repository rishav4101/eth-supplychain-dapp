import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination'
import { useStyles } from '../../components/Styles'
import clsx from 'clsx'
import Product from '../../components/Product'
import { useEth } from '../../contexts/EthContext'
import Loader from '../../components/Loader'
import { Button } from '@material-ui/core'
import { handleSetModalData, Roles } from '../../components/Utils'

const ThirdParty = () => {
  const classes = useStyles()
  const [count, setCount] = React.useState(0)
  const {
    state: { contract, accounts, hasRole }
  } = useEth()
  const [allManufacture, setAllManufacture] = React.useState([])
  const [alertText, setAlertText] = React.useState('')
  const [loading, setLoading] = React.useState(false)
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

        const purchaseState = hasRole === Roles.ThirdParty ? '0' : '3'
        if (prodState === purchaseState) {
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
        setAllManufacture(arr)
      }
    }
    setAllProduct()
    setLoading(false)
    return () => (isSubscribed = false)
  }, [count, hasRole, contract])

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
  const [modalData, setModalData] = React.useState({})

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

  const handleBuyButton = async (prod) => {
    switch (hasRole) {
      case Roles.ThirdParty:
        await contract.methods
          .purchaseByThirdParty(prod[0][0])
          .send({ from: accounts[0] })
          .on('transactionHash', function (hash) {
            handleSetTxhash(prod, hash)
          })
        break

      case Roles.Customer:
        await contract.methods
          .purchaseByCustomer(prod[0][0])
          .send({ from: accounts[0] })
          .on('transactionHash', function (hash) {
            handleSetTxhash(prod, hash)
          })
        break
      default:
        setAlertText("Cannot buy the product. Something's wrong!")
        break
    }
    setCount(0)
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Product prod={modalData} open={open} handleClose={handleClose} />
      <h1 className={classes.pageHeading}>Available Products</h1>
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
                  <TableCell className={clsx(classes.TableHead)} align="center">
                    Buy
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allManufacture.length !== 0 &&
                  allManufacture
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                              onClick={() => handleBuyButton(prod)}
                            >
                              BUY
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
            count={allManufacture.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  )
}

export default ThirdParty
