import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const Notification = () => {
    const { user } = useAuthContext()
    const [title, settitle] = useState('')
    const [description, setBatchYear] = useState('')
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!user) {
          setError('You must be logged in');
          return;
        }
        const data = { title, description};

        const response = await fetch('/api/notifications/create', {
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
          } else {
            settitle('');
            setBatchYear('');
            setError(null);
          }
        };  
return ( 
        <div className="addnoti">
        <center><h2 className="notifheading">Welcome admin</h2></center>
        <center><h1 className="notifaddheading">Add a New Notification</h1></center>
        <form onSubmit={handleSubmit} >
        <center><input className="inputnoti" type="text" placeholder="Title" value={title} required onChange={(e) => settitle(e.target.value)}></input></center>
            <center> <textarea type="text" placeholder="description" required value={description} onChange={(e) => setBatchYear(e.target.value)}></textarea></center>
            <center><button>Add Notification</button></center>
      {error && <div className="error">{error}</div>}
        </form>
        </div>
        
     );
}
 
export default Notification;
