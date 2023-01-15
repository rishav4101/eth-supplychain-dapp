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
import { getNavItem } from '../components/Utils'
import Company from '../components/Company'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const classes = useStyles()
  const [count, setCount] = React.useState(0)
  const navigate = useNavigate()
  const {
    state: { contract, hasRole, accounts, isAdmin }
  } = useEth()
  const [allCompany, setAllCompanies] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [display, setDisplay] = React.useState(getNavItem(hasRole))
  const [verifyChange, setVerifyChange] = React.useState('')

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

  const handleClick = async (company) => {
    setModalData(company)
    setOpen(true)
  }

  const handleVerifyButton = async (company) => {
    const status = company['status'] === 'Unverify' ? 'Verify' : 'Unverify'
    const a = await contract.methods
      .changeCompanyStatus(company['addr'], status)
      .send({ from: accounts[0] })
    if (a) {
      setVerifyChange(status)
    }
  }

  React.useEffect(() => {
    !isAdmin && navigate('/')
    let isSubscribed = true
    setLoading(true)
    const setAllCompany = async () => {
      const count =
        contract && (await contract.methods.getCompanyCount().call())
      if (isSubscribed) {
        setCount(count)
      }
      const promises = []
      // const arr = []
      for (let i = 0; i < count; i++) {
        promises.push(contract.methods.getCompanies(i).call())
      }
      if (isSubscribed) {
        Promise.all(promises)
          .then((results) => {
            setAllCompanies(results)
          })
          .catch((e) => {
            console.log('Error', e)
          })
      }
    }
    setAllCompany()
    setDisplay(getNavItem('admin'))
    setLoading(false)
    return () => (isSubscribed = false)
  }, [count, verifyChange, hasRole, contract, navigate, isAdmin])

  return loading ? (
    <Loader />
  ) : (
    <div className={classes.pageWrap}>
      <Navbar pageTitle={hasRole} navItems={display.navItem}>
        <Company company={modalData} open={open} handleClose={handleClose} />
        <h1 className={classes.pageHeading}>Company to verify</h1>

        <div>
          <Paper className={classes.TableRoot}>
            <TableContainer className={classes.TableContainer}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={clsx(classes.TableHead, classes.AddressCell)}
                      align="center"
                    >
                      Address
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Tax code
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Name
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Role
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Legal Type
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Representative
                    </TableCell>
                    <TableCell className={classes.TableHead} align="center">
                      Establishment
                    </TableCell>
                    <TableCell
                      className={clsx(classes.TableHead)}
                      align="center"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      className={clsx(classes.TableHead)}
                      align="center"
                    >
                      Verify
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCompany.length !== 0 &&
                    allCompany
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((company) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={company[0]}
                        >
                          <TableCell
                            className={clsx(
                              classes.TableCell,
                              classes.AddressCell
                            )}
                            component="th"
                            align="left"
                            scope="row"
                            onClick={() => handleClick(company)}
                          >
                            {company['addr']}
                          </TableCell>
                          <TableCell
                            className={classes.TableCell}
                            align="center"
                            onClick={() => handleClick(company)}
                          >
                            {company['code']}
                          </TableCell>
                          <TableCell
                            className={classes.TableCell}
                            align="center"
                            onClick={() => handleClick(company)}
                          >
                            {company['name']}
                          </TableCell>
                          <TableCell
                            className={classes.TableCell}
                            align="center"
                            onClick={() => handleClick(company)}
                          >
                            {company['role']}
                          </TableCell>
                          <TableCell
                            className={classes.TableCell}
                            align="center"
                            onClick={() => handleClick(company)}
                          >
                            {company['legalType']}
                          </TableCell>
                          <TableCell
                            className={classes.TableCell}
                            align="center"
                            onClick={() => handleClick(company)}
                          >
                            {company['legalRepresentative']}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={() => handleClick(company)}
                          >
                            {new Date(
                              company['startDate'] * 1000
                            ).toDateString()}
                          </TableCell>
                          <TableCell
                            className={classes.TableCell}
                            align="center"
                            // onClick={() => handleClick(company)}
                          >
                            {company['status']}
                          </TableCell>
                          <TableCell
                            className={clsx(classes.TableCell)}
                            align="center"
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              onClick={() => handleVerifyButton(company)}
                            >
                              {company['status'] === 'Unverify'
                                ? 'Verify'
                                : 'Unverify'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={allCompany.length}
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

export default Admin
