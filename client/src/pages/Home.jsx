import { useStyles } from '../components/Styles'
import Navbar from '../components/Navbar'
import { useEth } from '../contexts/EthContext'
import { getNavItem, Roles } from '../components/Utils'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const Home = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const {
    state: { hasRole, isAdmin }
  } = useEth()
  const [display, setDisplay] = useState(getNavItem(hasRole))

  React.useEffect(() => {
    setLoading(true)
    if (isAdmin) {
      navigate('/admin')
    }
    if (hasRole === Roles.DeliveryHub) {
      navigate('/receive')
    }
    setDisplay(getNavItem(hasRole))
    setLoading(false)
  }, [hasRole, isAdmin, navigate])

  return loading ? (
    <Loader />
  ) : (
    <div className={classes.pageWrap}>
      <Navbar pageTitle={hasRole ?? 'Sign Up'} navItems={display.navItem}>
        {display.page}
      </Navbar>
    </div>
  )
}

export default Home
