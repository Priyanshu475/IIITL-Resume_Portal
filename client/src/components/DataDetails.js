import { useDatasContext } from '../hooks/useDatasContext'
import { useAuthContext } from '../hooks/useAuthContext'


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const DataDetails = ({ data }) => {
  const { dispatch } = useDatasContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/data/' + data._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_DATA', payload: json})
    }
  }
  if(user.role !== 'admin'){
  return (
    <div className="data-details">
      <h4>{data.Rollno}</h4>
      <p><strong>Batch-Year : </strong>{data.BatchYear}</p>
      <p><strong>Branch : </strong>{data.Branch}</p>
      <a href={data.ResumeLink} target="_blank" rel="noreferrer">Resume-Link</a>
      <p>{formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      
    </div>
  )
  }
  else if(user.role === 'admin'){
      return (
        <div className="data-details">
          <h4>{data.Rollno}</h4>
          <p><strong>Batch-Year : </strong>{data.BatchYear}</p>
          <p><strong>Branch : </strong>{data.Branch}</p>
          <a href={data.ResumeLink} target="_blank" rel="noreferrer">Resume-Link</a>
          <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
      )
  }
}


export default DataDetails