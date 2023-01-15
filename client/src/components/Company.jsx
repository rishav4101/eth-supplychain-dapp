import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useStyles } from './Styles'

const Company = ({ company, open, handleClose }) => {
  const classes = useStyles()
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {company && (
            <>
              <h1 className={classes.pageHeading}>Details</h1>
              <div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Address: </div>
                  <div className={classes.dCol2}>{company['addr']}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Tax code: </div>{' '}
                  <div className={classes.dCol2}> {company['code']}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Company Name: </div>{' '}
                  <div className={classes.dCol2}> {company['name']}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Company Role: </div>{' '}
                  <div className={classes.dCol2}>{company['role']}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Legal Type: </div>{' '}
                  <div className={classes.dCol2}> {company['legalType']}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Legal Representative: </div>{' '}
                  <div className={classes.dCol2}>
                    {' '}
                    {company['legalRepresentative']}
                  </div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Establishment Date: </div>{' '}
                  <div className={classes.dCol2}>
                    {new Date(
                      parseInt(company['startDate'] * 1000)
                    ).toDateString()}
                  </div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Status: </div>{' '}
                  <div className={classes.dCol2}>{company['status']}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Longitude: </div>{' '}
                  <div className={classes.dCol2}>{company['longitude']}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Latitude :</div>{' '}
                  <div className={classes.dCol2}>{company['latitude']}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </Fade>
    </Modal>
  )
}

export default Company
