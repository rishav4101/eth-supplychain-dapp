import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link, useNavigate } from 'react-router-dom'
import { useEth } from '../contexts/EthContext'
import { Button } from '@material-ui/core'
import { useEffect } from 'react'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#09126d',
    color: '#fff'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
    // marginLeft: -drawerWidth
  },
  marginLeft: {
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}))

const Navbar = ({ pageTitle, navItems, children }) => {
  const {
    state: { accounts, isAdmin, hasRole }
  } = useEth()
  let navigate = useNavigate()
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const navigateToAdmin = () => {
    navigate('/admin')
  }

  useEffect(() => {
    if (hasRole || isAdmin) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [hasRole, isAdmin])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          {hasRole && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            style={{ display: 'flex', alignItems: 'center', flexGrow: '1' }}
          >
            <img
              alt="."
              src="/logo.png"
              style={{ height: '45px', width: 'auto' }}
            />
            &nbsp;SCM
          </Typography>
          {!isAdmin && !accounts ? (
            <Typography>Not Found</Typography>
          ) : !isAdmin && accounts ? (
            <Typography>{accounts}</Typography>
          ) : isAdmin ? (
            <Button color="inherit" onClick={navigateToAdmin}>
              Admin
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      {(hasRole || isAdmin) && (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <ListItemText>
              <b>{isAdmin ? 'Admin' : pageTitle}</b>
            </ListItemText>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon style={{ color: '#fff' }} />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <List>
            <ListItem>
              <ListItemText>
                <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                  Home
                </Link>
              </ListItemText>
            </ListItem>

            <ListItem>
              <Link
                to="/explorer"
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <ListItemText>Explorer</ListItemText>
              </Link>
            </ListItem>
          </List>
          <List>
            {navItems.length !== 0 &&
              navItems.map((item) => (
                <ListItem button key={item[0]}>
                  <Link
                    key={item}
                    to={item[1]}
                    style={{ textDecoration: 'none', color: '#fff' }}
                  >
                    <ListItemText primary={item[0]} />
                  </Link>
                </ListItem>
              ))}
          </List>
          {/* <div
            style={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}
          >
            <div
              style={{
                width: '100%',
                height: '70px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 500,
                fontSize: 17,
                borderTop: '1px solid #44a'
              }}
            >
              By Team Akatsuki &nbsp;&nbsp;
              <a
                style={{ textDecoration: 'none' }}
                href="https://github.com/rishav4101/eth-supplychain-dapp"
              >
                <GitHubIcon style={{ color: '#fff' }} />
              </a>
            </div>
          </div> */}
        </Drawer>
      )}
      <main
        className={clsx(
          classes.content,
          {
            [classes.contentShift]: open
          },
          hasRole && classes.marginLeft
        )}
      >
        <div className={classes.drawerHeader} />
        <div style={{ margin: '0 auto' }}>{children}</div>
      </main>
    </div>
  )
}

export default Navbar
