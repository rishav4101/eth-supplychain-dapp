import React from 'react'
import Paper from '@material-ui/core/Paper'
import Navbar from '../components/Navbar'
import CustomizedInputBase from '../components/Search'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Product from '../components/Product'
import TableRow from '@material-ui/core/TableRow'
import { Grid } from '@material-ui/core'
import _ from 'lodash'
import clsx from 'clsx'
import MapContainer from '../components/MapContainer'
import Button from '@material-ui/core/Button'
import { useStyles } from '../components/Styles'
import Loader from '../components/Loader'
import ReceiptModal from '../components/ReceiptModal'
import { useEth } from '../contexts/EthContext'
import { getNavItem, handleSetModalData, State } from '../components/Utils'

const columns = [
  { id: 'id', label: 'UUID', minWidth: 170 },
  { id: 'mname', label: 'Manufacturer', minWidth: 170 },
  { id: 'mdate', label: 'Date', minWidth: 170 },
  { id: 'pname', label: 'Product Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 170 },
  { id: 'owner', label: 'Owner', minWidth: 170 },
  { id: 'lastAction', label: 'Last Action', minWidth: 170 }
]

const Explorer = () => {
  const classes = useStyles()
  const {
    state: { hasRole, contract, web3 }
  } = useEth()
  const [productData, setProductData] = React.useState([])
  const [productHistory, setProductHistory] = React.useState([])
  const [Text, setText] = React.useState(false)
  const [modalData, setModalData] = React.useState([])
  const [manufacture, setManufacture] = React.useState()
  const [modalReceiptData, setModalReceiptData] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [openReceipt, setOpenReceipt] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [mapOpen, setMapOpen] = React.useState(false)
  const navItem = getNavItem(hasRole)

  const findProduct = async (search) => {
    var arr = []
    var temp = []
    setLoading(true)
    try {
      const a = await contract.methods
        .getProductPart1(parseInt(search), 'product', 0)
        .call()
      const b = await contract.methods
        .getProductPart2(parseInt(search), 'product', 0)
        .call()
      temp.push(a)
      temp.push(b)
      setProductData(temp)

      await handleSetModalData(temp, contract, setModalData)
      arr = []
      const l = await contract.methods
        .getProductHistoryLength(parseInt(search))
        .call()

      for (let i = 0; i < l; i++) {
        const h = await contract.methods
          .getProductPart1(parseInt(search), 'history', i)
          .call()
        const k = await contract.methods
          .getProductPart2(parseInt(search), 'history', i)
          .call()
        temp = []
        temp.push(h)
        temp.push(k)
        arr.push(temp)
      }
      setProductHistory(arr)
    } catch (e) {
      setText(true)
      console.log(e)
    }
    setMapOpen(true)
    setLoading(false)
  }

  const handleClose = () => setOpen(false)
  const handleCloseReceipt = () => setOpenReceipt(false)

  const handleClick = async (prod) => {
    setOpen(true)
  }

  const fetchTxReceipt = async (hash) => {
    web3.eth.getTransaction(hash).then((receipt) => {
      setModalReceiptData(receipt)
      setOpenReceipt(true)
    })
  }

  React.useEffect(() => {
    setLoading(true)
    const getManufacture = async () => {
      if (!_.isEmpty(productData) && contract) {
        // Get manufacture company
        const manufacture = await contract.methods
          .getCompany(productData[0][6])
          .call()
        setManufacture(manufacture)
      }
    }
    getManufacture()
    setLoading(false)
  }, [productData, contract])

  return (
    <>
      <Navbar pageTitle={hasRole} navItems={navItem.navItem}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Product prod={modalData} open={open} handleClose={handleClose} />
            <ReceiptModal
              receipt={modalReceiptData}
              openReceipt={openReceipt}
              handleCloseReceipt={handleCloseReceipt}
            />
            <h1 className={classes.pageHeading}>Search a product</h1>
            <CustomizedInputBase findProduct={findProduct} />
            {productData.length !== 0 ? (
              <>
                <Grid container className={classes.Explorerroot} spacing={3}>
                  <Grid item xs={6}>
                    <Paper className={classes.ProductPaper}>
                      <div>
                        <div className={classes.ExplorerdRow}>
                          Universal ID : {productData[0][0]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          SKU : {productData[0][1]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Owner : {productData[0][2]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Manufacturer : {productData[0][6]}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Manufacturer's Name :{' '}
                          {manufacture && manufacture['name']}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Manufacturer's Tax Code :{' '}
                          {manufacture && manufacture['code']}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Manufacturer's Longitude :{' '}
                          {manufacture && manufacture['longitude']}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Manufacturer's Latitude :{' '}
                          {manufacture && manufacture['latitude']}
                        </div>
                        <div className={classes.ExplorerdRow}>
                          Manufactured date :{' '}
                          {new Date(
                            parseInt(productData[1][1] * 1000)
                          ).toString()}
                        </div>

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          onClick={() => handleClick(productData)}
                          style={{ margin: '10px auto' }}
                        >
                          MORE DETAILS
                        </Button>
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    {mapOpen && <MapContainer modalData={modalData} />}
                  </Grid>
                </Grid>
                <br />
                <h2 className={classes.tableCount}>Product History</h2>
                <Paper className={classes.TableRoot2}>
                  <TableContainer className={classes.TableContainer}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align="center"
                              className={classes.TableHead}
                              // style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                          <TableCell
                            align="center"
                            className={classes.TableHead}
                          >
                            Details
                          </TableCell>
                          <TableCell
                            align="center"
                            className={classes.TableHead}
                          >
                            Receipt
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productHistory.length !== 0 ? (
                          productHistory.map((row, index) => {
                            const d = new Date(parseInt(row[1][8] * 1000))
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={index}
                              >
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  {row[0][0]}
                                </TableCell>
                                <TableCell
                                  className={clsx(
                                    classes.TableCell,
                                    classes.AddressCell
                                  )}
                                  align="left"
                                >
                                  {row[0][6]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  {d.toDateString() + ' ' + d.toTimeString()}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  {row[1][3]}
                                </TableCell>
                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  {row[1][2]}
                                </TableCell>
                                <TableCell
                                  className={clsx(
                                    classes.TableCell,
                                    classes.AddressCell
                                  )}
                                  align="center"
                                >
                                  {row[0][2]}
                                </TableCell>

                                <TableCell
                                  style={{ color: '#f00 !important' }}
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  {State[row[0][4]]}
                                </TableCell>

                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleClick(row)}
                                  >
                                    DETAILS
                                  </Button>
                                </TableCell>

                                <TableCell
                                  className={classes.TableCell}
                                  align="center"
                                >
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => fetchTxReceipt(row[0][5])}
                                  >
                                    RECEIPT
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })
                        ) : (
                          <></>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            ) : (
              <>{Text ? <p>Product Not Found</p> : <></>}</>
            )}
          </>
        )}
      </Navbar>
    </>
  )
}

export default Explorer
