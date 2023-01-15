import { Button } from '@material-ui/core'
import { useState } from 'react'
import { useStyles } from '../../components/Styles'
import { Roles } from '../../components/Utils'
import RoleDetail from './RoleDetail'

const SignUp = () => {
  const classes = useStyles()
  const [role, setRole] = useState(null)
  const handleAddRole = async (_role) => {
    setRole(_role)
  }

  return !role ? (
    <div className={classes.HomeCardWrap}>
      <h1 className={classes.pageHeading}>SignUp As</h1>
      <Button
        className={classes.HomeBtn}
        value={Roles.Manufacture}
        size="large"
        variant="outlined"
        color="primary"
        onClick={
          !role
            ? () => handleAddRole(Roles.Manufacture)
            : console.log('Already SignUp')
        }
      >
        Manufacturer
      </Button>
      <Button
        className={classes.HomeBtn}
        size="large"
        variant="outlined"
        color="primary"
        onClick={
          !role
            ? () => handleAddRole(Roles.ThirdParty)
            : console.log('Already SignUp')
        }
      >
        Third party
      </Button>
      <Button
        className={classes.HomeBtn}
        size="large"
        variant="outlined"
        color="primary"
        onClick={
          !role
            ? () => handleAddRole(Roles.DeliveryHub)
            : console.log('Already SignUp')
        }
      >
        delivery hub
      </Button>
      <Button
        className={classes.HomeBtn}
        size="large"
        variant="outlined"
        color="primary"
        onClick={
          !role
            ? () => handleAddRole(Roles.Customer)
            : console.log('Already SignUp')
        }
      >
        customer
      </Button>
    </div>
  ) : (
    <RoleDetail role={role} />
  )
}

export default SignUp
