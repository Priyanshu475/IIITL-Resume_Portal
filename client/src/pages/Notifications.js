import { useAuthContext } from "../hooks/useAuthContext";
import NotifiCreate from '../components/Notifications_create'
import NotifiList from "../components/Notifications_list";


const Notification = () => {
    const { user } = useAuthContext()
    if(user.role === 'admin'){
    return ( 
        <div>
        <NotifiCreate/>
        <NotifiList/>
        </div>
        
     );
    }
    else{
        return(
            <div>
            <NotifiList/>
            </div>
        )
    }
}
 
export default Notification;
