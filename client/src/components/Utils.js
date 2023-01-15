import Manufacture from '../pages/Manufacture/Manufacture'
import ThirdParty from '../pages/ThirdParty/ThirdParty'
import Receive from '../pages/Receive'
import Admin from '../pages/Admin'
import Auth from '../pages/Auth/Auth'

export const Roles = {
  Manufacture: 'Manufacture',
  ThirdParty: 'Third Party',
  DeliveryHub: 'Delivery Hub',
  Customer: 'Customer'
}

export const State = [
  'Manufactured',
  'Bought By Third Party',
  'Shipped From Manufacturer',
  'Received By Third Party',
  'Bought By Customer',
  'Shipped By Third Party',
  'Received at DeliveryHub',
  'Shipped From DeliveryHub',
  'Received By Customer'
]

export const getNavItem = (role) => {
  switch (role) {
    case Roles.Manufacture:
      return {
        page: <Manufacture />,
        navItem: [
          ['Add Product', '/add-product'],
          ['Ship Product', '/ship'],
          [null, '/update-product']
        ]
      }
    case Roles.ThirdParty:
      return {
        page: <ThirdParty />,
        navItem: [
          ['Receive Product', '/receive'],
          ['Ship Products', '/ship'],
          ['Own Products', '/own-product']
        ]
      }
    case Roles.DeliveryHub:
      return {
        page: <Receive />,
        navItem: [
          // ['Receive Product', '/receive'],
          ['Ship Product', '/ship']
        ]
      }
    case Roles.Customer:
      return {
        page: <ThirdParty />,
        navItem: [
          ['Receive Product', '/receive'],
          ['Your Products', '/own-product']
        ]
      }
    case 'admin':
      return {
        page: <Admin />,
        navItem: []
      }
    default:
      return {
        page: <Auth />,
        navItem: []
      }
  }
}

export const getProductStateName = (state) => {
  return State[state]
}

export const handleSetModalData = async (prod, contract, setModalData) => {
  const manufacture =
    prod[0][6] !== '0x' + '0'.repeat(40)
      ? await contract.methods.getCompany(prod[0][6]).call()
      : { addr: prod[0][6] }
  const thirdParty =
    prod[0][7] !== '0x' + '0'.repeat(40)
      ? await contract.methods.getCompany(prod[0][7]).call()
      : { addr: prod[0][7] }
  const deliveryHub =
    prod[1][0] !== '0x' + '0'.repeat(40)
      ? await contract.methods.getCompany(prod[1][0]).call()
      : { addr: prod[1][0] }
  await setModalData({ prod, manufacture, thirdParty, deliveryHub })
}

export const LegalType = ['TNHH', 'CTCP', 'CTHD', 'TNHH MTV']

export const redirect = (navItem, navigate) => {
  if (window.location.pathname !== '/') {
    let ownRoot = false
    navItem.forEach((element) => {
      if (element[1].includes(window.location.pathname)) ownRoot = true
    })
    return !ownRoot && navigate('/')
  }
}
