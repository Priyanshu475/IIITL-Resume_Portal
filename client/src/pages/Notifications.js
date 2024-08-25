import { useAuthContext } from "../hooks/useAuthContext";
import NotifiCreate from '../components/Notifications_create'
import NotifiList from "../components/Notifications_list";


const Notification = () => {
    const { user } = useAuthContext();
    
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {user.role === 'admin' && <NotifiCreate />}
            <NotifiList />
        </div>
    );
};

export default Notification;