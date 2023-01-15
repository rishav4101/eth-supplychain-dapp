import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useStyles } from './Styles'

const ReceiptModal = ({ receipt, openReceipt, handleCloseReceipt }) => {
  const classes = useStyles()
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openReceipt}
      onClose={handleCloseReceipt}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={openReceipt}>
        <div className={classes.ReceiptPaper}>
          <h1 className={classes.pageHeading}>Receipt</h1>
          <div>
            {receipt !== null ? (
              <>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Tx hash: </div>
                  <div className={classes.dCol2}>{receipt.hash}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Block hash: </div>
                  <div className={classes.dCol2}>{receipt.blockHash}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Block Number: </div>
                  <div className={classes.dCol2}>{receipt.blockNumber}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>From: </div>
                  <div className={classes.dCol2}>{receipt.from}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>To: </div>
                  <div className={classes.dCol2}>{receipt.to}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Nonce: </div>
                  <div className={classes.dCol2}>{receipt.nonce}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Input: </div>
                  <div className={classes.dCol2}>{receipt.input}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Gas: </div>
                  <div className={classes.dCol2}>{receipt.gas}</div>
                </div>
                <div className={classes.dRow}>
                  <div className={classes.dCol1}>Value: </div>
                  <div className={classes.dCol2}>{receipt.value}</div>
                </div>
              </>
            ) : (
              <> </>
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default ReceiptModal
