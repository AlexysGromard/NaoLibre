import DashboardSection from '../../sections/DashboardSection';
import Login from "../Login";
/**
 * Dashboard component
 * This component is the dashboard page of the application.
 */
function Dashboard(){
    function connected()  {
        if (!sessionStorage.getItem("password") || !sessionStorage.getItem("email")){
            return <Login />
        } else {
            return <DashboardSection />
        }
    }
    return connected()
}

export default Dashboard;