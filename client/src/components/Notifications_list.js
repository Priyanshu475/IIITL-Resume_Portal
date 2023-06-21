import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


function MyComponent() {
  const [data, setData] = useState([]);
  const {user} = useAuthContext()


  useEffect(() => {
  const fetchData = () => {
    fetch('/api/notifications', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Set the fetched data to state
        setData(data);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });

  };
  if (user) {
    fetchData()
    }
  }, [user,data]);
  const Deletefunction=((id) => {
    console.log(id)
    fetch('/api/notifications/'+id,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    .then(()=>{
        console.log('deleted')
        })
        .catch(err => {
          console.log(err)
        })
      })
  
if(user.role === 'admin'){
  return (
    <div className='notifilist'>
     <center><h2 className="notifheading">Uploaded Notifications</h2></center> 
      <ul>
        {data.map(item => (
            <div className='uploadednoti'>
                                          <h6>🔵 {item.title}</h6>
                            <p>{item.description}</p>
                            <span>Published on {item.createdAt.slice(0,10)}, {item.createdAt.slice(11,19)}</span><span>  ({formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })} )</span>
              <p><button onClick={()=>Deletefunction(item._id)} >delete</button></p>
          </div>
        ))}
      </ul>
    </div>
  );
        }
        else{
            return (
                <div>
                <center><h2 className='notifheading'>Notifications</h2></center>
                <div>
                  <ul>
                    {data.map(item => (
                        <div className='uploadednoti'>
                            <h6>🔵 {item.title}</h6>
                            <p>{item.description}</p>
                            <span>Published on {item.createdAt.slice(0,10)}, {item.createdAt.slice(11,19)}</span><span>  ({formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })} )</span>
                      </div>
                    ))}
                  </ul>
                  </div>
                </div>
              );

        }
}

export default MyComponent;

