import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useStyles } from './Styles'
import { getProductStateName } from './Utils'

const Product = ({ prod, open, handleClose }) => {
  const classes = useStyles()
  const productState = getProductStateName(prod.prod && prod.prod[0][4])

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
          {prod.prod && (
            <>
              <h1 className={classes.pageHeading}>Details</h1>
              <div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>UUID: </div>
                  <div className={classes.dCol2}>{prod.prod[0][0]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>SKU:</div>{' '}
                  <div className={classes.dCol2}> {prod.prod[0][1]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Owner: </div>{' '}
                  <div className={classes.dCol2}>{prod.prod[0][2]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Manufacturer:</div>{' '}
                  <div className={classes.dCol2}>{prod.prod[0][6]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Manufacturer Company:</div>{' '}
                  <div className={classes.dCol2}>
                    {' '}
                    {prod.manufacture && prod.manufacture['name']}
                  </div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Manufactured Date:</div>{' '}
                  <div className={classes.dCol2}>
                    {new Date(parseInt(prod.prod[1][1] * 1000)).toDateString() +
                      ' ' +
                      new Date(parseInt(prod.prod[1][1] * 1000)).toTimeString()}
                  </div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Manufacturer Code:</div>{' '}
                  <div className={classes.dCol2}>
                    {' '}
                    {prod.manufacture && prod.manufacture['code']}
                  </div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Longitude of Manufature: </div>{' '}
                  <div className={classes.dCol2}>
                    {prod.manufacture && prod.manufacture['longitude']}
                  </div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Latitude of Manufature:</div>{' '}
                  <div className={classes.dCol2}>
                    {prod.manufacture && prod.manufacture['latitude']}
                  </div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Product Name: </div>{' '}
                  <div className={classes.dCol2}>{prod.prod[1][3]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Product Code:</div>{' '}
                  <div className={classes.dCol2}>{prod.prod[0][1]}</div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Product Price: </div>{' '}
                  <div className={classes.dCol2}>{prod.prod[1][2]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Product Mfg: </div>{' '}
                  <div className={classes.dCol2}>
                    {new Date(parseInt(prod.prod[1][5] * 1000)).toDateString()}
                  </div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Product Exp: </div>{' '}
                  <div className={classes.dCol2}>
                    {new Date(parseInt(prod.prod[1][6] * 1000)).toDateString()}
                  </div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol1}> Product Category: </div>
                  <div className={classes.dCol2}>{prod.prod[1][4]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Product State: </div>{' '}
                  <div className={classes.dCol2}>{productState}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Third Party Address: </div>{' '}
                  <div className={classes.dCol2}>
                    {prod.thirdParty && prod.thirdParty['addr']}
                  </div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Third Party Longitude: </div>{' '}
                  <div className={classes.dCol2}>
                    {prod.thirdParty && prod.thirdParty['longitude']}
                  </div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Third Party Latitude: </div>{' '}
                  <div className={classes.dCol2}>
                    {prod.thirdParty && prod.thirdParty['latitude']}
                  </div>
                </div>

                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Delivery Hub Address:</div>{' '}
                  <div className={classes.dCol2}>
                    {prod.deliveryHub && prod.deliveryHub['addr']}
                  </div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Delivery Hub Longitude: </div>{' '}
                  <div className={classes.dCol2}>
                    {prod.deliveryHub && prod.deliveryHub['longitude']}
                  </div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Delivery Hub Latitude:</div>{' '}
                  <div className={classes.dCol2}>
                    {prod.deliveryHub && prod.deliveryHub['latitude']}
                  </div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Customer Address: </div>{' '}
                  <div className={classes.dCol2}>{prod.prod[0][3]}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Tx Hash: </div>{' '}
                  <div className={classes.dCol2}>
                    {prod.prod[0][5]}
                    {/* {prod.prod[2][0].length > 40
                      ? prod.prod[2][0].substring(0, 40) + '...'
                      : prod.prod[2][0]} */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Fade>
    </Modal>
  )
}

export default Product
