import Header from './components/Header';
import Footer from './components/Footer';
import Disruptions from './sections/Disruptions';
import AverageAttendance from './sections/AverageAttendance';
import Favorites from './sections/Favorites';
import './style/colors.css';
import './style/general.css';
import './style/homepage.css';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Disruptions />
        <Favorites />
        <AverageAttendance />
      </main>
      <Footer />
    </div>
  );
}

export default App;
