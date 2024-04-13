import Disruptions from '../../sections/Disruptions';
import AverageAttendance from '../../sections/AverageAttendance';
import Favorites from '../../sections/Favorites';

/**
 * Home component
 * This component is the home page of the application with the disruptions, favorites and average attendance sections.
 */
function Home() {
    return (
      <>
        <Disruptions />
        <Favorites />
        <AverageAttendance />
      </>
    );
}

export default Home;