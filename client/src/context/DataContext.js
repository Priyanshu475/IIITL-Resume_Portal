import { createContext, useReducer } from 'react'

export const DatasContext = createContext()

export const datasReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATAS': 
      return {
        datas: action.payload
      }
    case 'CREATE_DATA':
      return {
        datas: [action.payload, ...state.datas]
      }
    case 'DELETE_DATA':
      return {
        datas: state.datas.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const DatasContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(datasReducer, {
    datas: null
  })

  return (
    <DatasContext.Provider value={{...state, dispatch}}>
      { children }
    </DatasContext.Provider>
  )
}