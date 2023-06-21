import { useState } from "react"
import { useDatasContext } from "../hooks/useDatasContext"
import { useAuthContext } from '../hooks/useAuthContext'

const DataForm = () => {
  const { dispatch } = useDatasContext()
  const { user } = useAuthContext()

  const [Rollno, setRollno] = useState('')
  const [BatchYear, setBatchYear] = useState('2021')
  const [Branch, setBranch] = useState('Computer Science and Business')
  const[ResumeLink,setResumeLink]=useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      setError('You must be logged in');
      return;
    }
  
    const data = { Rollno, BatchYear, Branch,ResumeLink};
  
    // Check if the user already has datas
    const existingDatasResponse = await fetch('/api/data', {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const existingDatas = await existingDatasResponse.json();
  
    if (existingDatas.length > 0) {
      setError('Resume has already been uploaded delete it to upload a new one');
      return;
    }
  
    const response = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
  
    const json = await response.json();
  
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setRollno('');
      setBatchYear('');
      setBranch('');
      setResumeLink('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_DATA', payload: json });
    }
  };  

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h4><center>Resume Upload</center></h4>
      <center><label>Enter Your IIIT-Lucknow Roll No :</label></center>
      <center><input 
        type="text"
        onChange={(e) => setRollno(e.target.value)}
        value={Rollno}
        className={emptyFields.includes('Rollno') ? 'error' : ''} placeholder="i.e. LCB2021003"
      /></center>

<center><label>Enter Your Batch Year :</label></center>
      <center><select
        type="number"
        onChange={(e) => setBatchYear(e.target.value)}
        value={BatchYear}
        className={emptyFields.includes('load') ? 'error' : ''}>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        </select></center>

      <center><label>Branch :</label></center>
      <center><select
        type="text"
        onChange={(e) => setBranch(e.target.value)}
        value={Branch}
        className={emptyFields.includes('Branch') ? 'error' : ''}>
          <option value="Computer Science and Business">Computer Science and Business</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Computer Science and Artificial Intelligence">Computer Science and Artificial Intelligence</option>
          <option value="M.Tech in Computer Science">M.Tech in Computer Science</option>
        </select></center>
     <center><label>Resume Link :</label></center>
     <center><label>Disclaimer: Should adhere to the format provided in the link below:</label></center>
     <center><span>Don't have one ? Make one from this: </span><a href="https://www.overleaf.com/latex/templates/software-engineer-resume/gqxmqsvsbdjf">Link</a></center>
     <center><input 
        type="text"
        onChange={(e) =>setResumeLink(e.target.value)}
        value={ResumeLink}
        className={emptyFields.includes('ResumeLink') ? 'error' : ''} placeholder="i.e. https://drive.google.com/..."
      /></center>
      <center><button>Add Details</button></center>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default DataForm