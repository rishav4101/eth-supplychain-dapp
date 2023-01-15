import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
import { useStyles } from '../components/Styles'
import Grid from '@material-ui/core/Grid'
import Loader from '../components/Loader'
import { useEth } from '../contexts/EthContext'
import { getNavItem, redirect } from '../components/Utils'
import { useNavigate, useParams } from 'react-router-dom'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import _ from 'lodash'

const UpdateProduct = () => {
  const classes = useStyles()
  const params = useParams()
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

  const handleSubmitUpdateForm = async () => {
    setLoading(true)
    if (
      form.category !== '' &&
      form.name !== '' &&
      form.sku !== '' &&
      form.price !== 0 &&
      form.price !== '' &&
      form.mfg !== '' &&
      form.exp !== ''
    ) {
      setFormValid(false)
      await contract.methods
        .updateProduct(
          params.id,
          form.category,
          form.name,
          form.sku,
          parseInt(form.price),
          parseInt(form.mfg / 1000),
          parseInt(form.exp / 1000)
        )
        .send({ from: accounts[0] })
    } else {
      setFormValid(true)
    }
    setLoading(false)
  }

  React.useLayoutEffect(() => {
    !_.isEmpty(display.navItem) && redirect(display.navItem, navigate)
    if (_.isEmpty(display.navItem) && isAdmin) navigate('/')
  }, [hasRole, display, navigate, isAdmin])

  useEffect(() => {
    let isSubscribed = true
    setLoading(true)
    const setProduct = async () => {
      const prodData = []
      const a =
        contract &&
        (await contract.methods.getProductPart1(params.id, 'product', 0).call())
      const b =
        contract &&
        (await contract.methods.getProductPart2(params.id, 'product', 0).call())
      prodData.push(a)
      prodData.push(b)
      if (isSubscribed) {
        setForm({
          category: prodData[1][4],
          name: prodData[1][3],
          sku: prodData[0][1],
          price: prodData[1][2],
          mfg: new Date(parseInt(prodData[1][5] * 1000)).toDateString(),
          exp: new Date(parseInt(prodData[1][6] * 1000)).toDateString()
        })
      }
    }
    setProduct()
    setDisplay(getNavItem(hasRole))
    setLoading(false)
    return () => (isSubscribed = false)
  }, [params.id, hasRole, contract])

  // useEffect(() => {
  //   setDisplay(getNavItem(hasRole))
  // }, [hasRole, navigate])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar pageTitle={'Manufacturer'} navItems={display.navItem}>
        <>
          <div className={classes.FormWrap}>
            <h1 className={classes.pageHeading}>Update Product</h1>
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
                  type="number"
                  name="price"
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
              onClick={handleSubmitUpdateForm}
            >
              SUBMIT
            </Button>
          </div>
        </>
      </Navbar>
    </>
  )
}

export default UpdateProduct
