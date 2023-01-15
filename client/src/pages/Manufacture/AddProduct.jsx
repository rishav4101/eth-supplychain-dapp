import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Navbar from '../../components/Navbar'
import { useStyles } from '../../components/Styles'
import Grid from '@material-ui/core/Grid'
import Loader from '../../components/Loader'
import { useEth } from '../../contexts/EthContext'
import { getNavItem, redirect } from '../../components/Utils'
import { useNavigate } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import _ from 'lodash'

const AddProduct = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [formValid, setFormValid] = React.useState(false)
  const {
    state: { contract, hasRole, accounts, isAdmin }
  } = useEth()
  const [display, setDisplay] = useState(getNavItem(hasRole))
  const [form, setForm] = React.useState({
    category: '',
    name: '',
    sku: '',
    price: '',
    mfg: new Date(),
    exp: new Date()
  })

  const handleChangeMfg = (date) => {
    setForm({ ...form, mfg: date })
  }

  const handleChangeExp = (date) => {
    setForm({ ...form, exp: date })
  }

  const handleChangeForm = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitManufacturerForm = async () => {
    setLoading(true)
    if (
      form.category !== '' &&
      form.name !== '' &&
      form.sku !== '' &&
      form.price !== '' &&
      form.price !== 0 &&
      form.mfg !== '' &&
      form.exp !== ''
    ) {
      setFormValid(false)
      await contract.methods
        .makeProduct(
          form.category,
          form.name,
          form.sku,
          parseInt(form.price),
          parseInt(form.mfg / 1000),
          parseInt(form.exp / 1000)
        )
        .send({ from: accounts[0] })
        .on('transactionHash', function (hash) {
          handleSetTxhash(hash)
        })
      setForm({
        category: '',
        name: '',
        sku: '',
        price: '',
        mfg: new Date(),
        exp: new Date()
      })
    } else {
      setFormValid(true)
    }
    setLoading(false)
  }

  const handleSetTxhash = async (hash) => {
    await contract.methods
      .setTransactionHashOnProduct(hash)
      .send({ from: accounts[0] })
  }

  React.useEffect(() => {
    !_.isEmpty(display.navItem) && redirect(display.navItem, navigate)
    if (_.isEmpty(display.navItem) && isAdmin) navigate('/')
  }, [hasRole, display, navigate, isAdmin])

  useEffect(() => {
    setDisplay(getNavItem(hasRole))
  }, [hasRole, navigate])

  return (
    hasRole && (
      <>
        <Navbar pageTitle={'Manufacturer'} navItems={display.navItem}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className={classes.FormWrap}>
                <h1 className={classes.pageHeading}>Add Product</h1>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="category"
                      variant="outlined"
                      value={form.category}
                      onChange={handleChangeForm}
                      label="Category"
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="name"
                      variant="outlined"
                      value={form.name}
                      onChange={handleChangeForm}
                      label="Name"
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      name="sku"
                      variant="outlined"
                      value={form.sku}
                      onChange={handleChangeForm}
                      label="SKU"
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      name="price"
                      type="number"
                      variant="outlined"
                      value={form.price}
                      onChange={handleChangeForm}
                      label="Price"
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={6}>
                      <KeyboardDatePicker
                        required
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Manufacturing Date"
                        value={form.mfg}
                        onChange={(date) => handleChangeMfg(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                        style={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <KeyboardDatePicker
                        required
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Expire Date"
                        value={form.exp}
                        onChange={(date) => handleChangeExp(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                        style={{ width: '100%' }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <br />
                <p>
                  <b style={{ color: 'red' }}>
                    {formValid ? 'Please enter all data' : ''}
                  </b>
                </p>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitManufacturerForm}
                >
                  SUBMIT
                </Button>
              </div>
            </>
          )}
        </Navbar>
      </>
    )
  )
}

export default AddProduct
