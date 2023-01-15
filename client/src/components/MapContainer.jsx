import _ from 'lodash'
import { Map, Marker } from 'pigeon-maps'
import React from 'react'
import Company from './Company'

const MapContainer = ({ modalData }) => {
  const [open, setOpen] = React.useState(false)
  const [point, setPoint] = React.useState([])
  const [company, setCompany] = React.useState({})

  const handleClose = () => setOpen(false)

  const handleClick = async (company) => {
    setCompany(company)
    console.log(company)
    setOpen(true)
  }

  React.useEffect(() => {
    setPoint([
      modalData.manufacture,
      modalData.thirdParty,
      modalData.deliveryHub
    ])
  }, [modalData])

  return (
    <>
      <Company company={company} open={open} handleClose={handleClose} />
      <Map
        defaultHeight={300}
        defaultCenter={[
          parseFloat(
            !_.isEmpty(modalData) && modalData.manufacture['latitude']
          ),
          parseFloat(
            !_.isEmpty(modalData) && modalData.manufacture['longitude']
          )
        ]}
        defaultZoom={10}
      >
        {point
          .filter((store) => store['addr'] !== '0x' + '0'.repeat(40))
          .map((store, index) => {
            return (
              <Marker
                width={40}
                key={index}
                id={index}
                color="#09126d"
                anchor={[
                  parseFloat(store['latitude']),
                  parseFloat(store['longitude'])
                ]}
                onClick={() => handleClick(store)}
              />
            )
          })}
      </Map>
    </>
  )
}

export default MapContainer
