import { useEffect }from 'react'
import { useDatasContext } from "../hooks/useDatasContext"
import { useAuthContext } from "../hooks/useAuthContext"
import DataDetails from '../components/DataDetails'
import DataForm from '../components/DataForm'



const Home = () => {
  const {datas, dispatch} = useDatasContext()
  const {user} = useAuthContext()


  useEffect(() => {
    if(user.role !== 'admin'){
    const fetchDatas = async () => {
      const response = await fetch('/api/data', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_DATAS', payload: json})
      }
    }
    if (user) {
      fetchDatas()
    }
    console.log('user:', user.role)
  }
  else{
    const fetchDatas = async () => {
      const response = await fetch('/api/data/admin', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      console.log(json)

      if (response.ok) {
        dispatch({type: 'SET_DATAS', payload: json})
      }
    }
    if (user) {
      fetchDatas()
    }
  }
  }, [dispatch, user])




  if(user.role !== 'admin'){
  return (
    <div className="home">
      <div className="datas">
        {datas && datas.map((data) => (
          <DataDetails key={data._id} data={data} />
        ))}
      </div>
      <DataForm />
    </div>
  )
        }
  else{
    return (
      <div className="home">
        <center><h4 className='a'>Admin Page</h4></center>
        <div className="home">
      <div className="datas">
        {datas && datas.map((data) => (
          <DataDetails  data={data} />
        ))}
      </div>
    </div>
      </div>
    )
  }
}

export default Home