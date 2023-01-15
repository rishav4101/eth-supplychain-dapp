import React, { useReducer, useCallback, useEffect } from 'react'
import Web3 from 'web3'
import Loader from '../../components/Loader'
import EthContext from './EthContext'
import { reducer, actions, initialState } from './state'

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = React.useState(false)

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')
      const accounts = await web3.eth.requestAccounts()
      const networkID = await web3.eth.net.getId()
      const { abi } = artifact
      let address, contract, hasRole, isAdmin
      try {
        address = artifact.networks[networkID].address
        contract = new web3.eth.Contract(abi, address)
        hasRole = await contract.methods.hasRole(accounts[0]).call()
        isAdmin = accounts[0] === (await contract.methods.owner().call())
      } catch (err) {
        console.error(err)
      }
      dispatch({
        type: actions.init,
        data: {
          artifact,
          web3,
          accounts,
          networkID,
          contract,
          isAdmin,
          hasRole
        }
      })
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    const tryInit = async () => {
      try {
        const artifact = require('../../contracts/SupplyChain.json')
        init(artifact)
      } catch (err) {
        console.error(err)
      }
    }

    tryInit()
    setLoading(false)
  }, [init])

  useEffect(() => {
    setLoading(true)
    const events = ['chainChanged', 'accountsChanged']
    const handleChange = () => {
      init(state.artifact)
    }
    try {
      events.forEach((e) => window.ethereum.on(e, handleChange))
    } catch (error) {
      console.clear()
      return
    }
    setLoading(false)
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange))
    }
  }, [init, state.artifact])

  return loading ? (
    <Loader />
  ) : (
    <EthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </EthContext.Provider>
  )
}

export default EthProvider
