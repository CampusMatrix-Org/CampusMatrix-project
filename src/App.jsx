import Sidebar from './Components/Sidebar';
import Dashboard from './components/Dashboard';
import StatCard from './components/StatCard';
function App() {
  return (
    // main container 
    <div className="flex h-screen w-screen overflow-hidden bg-content-bg">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;