import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { LinearProgress } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: '',
    // verticalAlign: 'middle'
    // paddingTop: '300px'
    width: '100%'
  }
}))

export default function Loader() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <LinearProgress color="primary" />
    </div>
  )
}
