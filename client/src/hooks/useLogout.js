import { useAuthContext } from './useAuthContext'
import { useDatasContext } from './useDatasContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchDatas } = useDatasContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchDatas({ type: 'SET_DATAS', payload: null })
  }

  return { logout }
}