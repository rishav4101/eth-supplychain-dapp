import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { useState } from 'react'
import Loader from '../../components/Loader'
import { useStyles } from '../../components/Styles'
import { LegalType, Roles } from '../../components/Utils'
import { useEth } from '../../contexts/EthContext'

const RoleDetail = ({ role }) => {
  const classes = useStyles()
  const {
    state: { contract, accounts }
  } = useEth()
  const [loading, setLoading] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const isCustomer = role === Roles.Customer
  const [companyForm, setCompanyForm] = useState({
    code: '',
    name: '',
    type: '',
    representative: '',
    date: new Date(),
    longitude: '',
    latitude: ''
  })
  const [customerForm, setCustomerForm] = useState({
    cid: '',
    name: '',
    address: '',
    phoneNumber1: '',
    phoneNumber2: '',
    email: ''
  })

  const handleChangeDate = (date) => {
    setCompanyForm({ ...companyForm, date: date })
  }

  const handleChangeForm = async (e) => {
    !isCustomer
      ? setCompanyForm({
          ...companyForm,
          [e.target.name]: e.target.value
        })
      : setCustomerForm({
          ...customerForm,
          [e.target.name]: e.target.value
        })
  }

  const handleSubmitCompanyForm = async () => {
    setLoading(true)
    if (
      companyForm.code !== '' &&
      companyForm.name !== '' &&
      companyForm.type !== '' &&
      companyForm.representative !== '' &&
      companyForm.date !== '' &&
      companyForm.longitude !== '' &&
      companyForm.latitude !== ''
    ) {
      setFormValid(false)
      await contract.methods
        .addCompany(
          companyForm.code,
          companyForm.name,
          companyForm.type,
          companyForm.representative,
          parseInt(companyForm.date / 1000),
          companyForm.longitude,
          companyForm.latitude,
          role
        )
        .send({ from: accounts[0] })
      setCompanyForm({
        code: '',
        name: '',
        type: '',
        representative: '',
        date: new Date(),
        longitude: '',
        latitude: ''
      })
      window.location.reload()
    } else {
      setFormValid(true)
    }
    setLoading(false)
  }
  const handleSubmitCustomerForm = async () => {
    setLoading(true)
    if (
      customerForm.cid !== '' &&
      customerForm.name !== '' &&
      customerForm.address !== '' &&
      customerForm.phoneNumber1 !== '' &&
      customerForm.phoneNumber2 !== '' &&
      customerForm.email !== ''
    ) {
      setFormValid(false)
      await contract.methods
        .addCustomer(
          customerForm.cid,
          customerForm.name,
          customerForm.address,
          customerForm.phoneNumber1,
          customerForm.phoneNumber2,
          customerForm.email
        )
        .send({ from: accounts[0] })
      setCustomerForm({
        cid: '',
        name: '',
        address: '',
        phoneNumber1: '',
        phoneNumber2: '',
        email: ''
      })
      window.location.reload()
    } else {
      setFormValid(true)
    }
    setLoading(false)
  }

  return loading ? (
    <Loader />
  ) : (
    <div className={classes.FormWrap}>
      <h1 className={classes.pageHeading}>{role ?? 'Company'} Profile</h1>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            name={!isCustomer ? 'code' : 'cid'}
            variant="outlined"
            value={!isCustomer ? companyForm.code : customerForm.cid}
            onChange={handleChangeForm}
            label={!isCustomer ? 'Business Code' : 'Citizen ID'}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="name"
            variant="outlined"
            value={!isCustomer ? companyForm.name : customerForm.name}
            onChange={handleChangeForm}
            label={!isCustomer ? 'Company Name' : 'Full Name'}
            style={{ width: '100%' }}
          />
        </Grid>
        {!isCustomer ? (
          <Grid item xs={6}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel id="select-type">Legal Type *</InputLabel>
              <Select
                required
                labelId="select-type"
                id="demo-simple-select-required"
                name="type"
                value={companyForm.type}
                label="Legal Type *"
                onChange={handleChangeForm}
              >
                {LegalType.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TextField
              required
              name={'address'}
              variant="outlined"
              value={customerForm.address}
              onChange={handleChangeForm}
              label={'Address'}
              style={{ width: '100%' }}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <TextField
            required
            name={!isCustomer ? 'representative' : 'phoneNumber1'}
            variant="outlined"
            value={
              !isCustomer
                ? companyForm.representative
                : customerForm.phoneNumber1
            }
            onChange={handleChangeForm}
            label={!isCustomer ? 'Legal Representative' : '1st Phone Number'}
            style={{ width: '100%' }}
          />
        </Grid>
        {!isCustomer ? (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={6}>
              <KeyboardDatePicker
                required
                variant="inline"
                margin="normal"
                id="date-picker-dialog"
                format="MM/dd/yyyy"
                name="date"
                label="Date of Establishment"
                value={companyForm.date}
                onChange={(date) => handleChangeDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                style={{ width: '100%' }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        ) : (
          <Grid item xs={6}>
            <TextField
              required
              type="tel"
              name="phoneNumber2"
              variant="outlined"
              value={customerForm.phoneNumber2}
              onChange={handleChangeForm}
              label={'2nd Phone Number'}
              style={{ width: '100%' }}
            />
          </Grid>
        )}
        {!isCustomer ? (
          <>
            <Grid item xs={6}>
              <TextField
                required
                name="longitude"
                variant="outlined"
                value={companyForm.longitude}
                onChange={handleChangeForm}
                label="Longitude"
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="latitude"
                variant="outlined"
                value={companyForm.latitude}
                onChange={handleChangeForm}
                label="Latitude"
                style={{ width: '100%' }}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={getCoordinate}
              >
                Get Coordinates
              </Button>
            </Grid> */}
          </>
        ) : (
          <Grid item xs={12}>
            <TextField
              required
              name="email"
              variant="outlined"
              value={customerForm.mail}
              onChange={handleChangeForm}
              label="Email"
              style={{ width: '100%' }}
            />
          </Grid>
        )}
      </Grid>
      <p>
        <b style={{ color: 'red' }}>
          {formValid ? 'Please enter all data' : ''}
        </b>
      </p>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={
          !isCustomer ? handleSubmitCompanyForm : handleSubmitCustomerForm
        }
      >
        SUBMIT
      </Button>
    </div>
  )
}

export default RoleDetail
