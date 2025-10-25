import { useState } from 'react';
import Header from './components/Header';
import ItemsList from './components/ItemsList';
import SubmitItemForm from './components/SubmitItemForm';
import ItemDetails from './components/ItemDetails';
import AdminDashboard from './components/AdminDashboard';
import { Item } from './lib/types';

type View = 'home' | 'submit' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setSelectedItem(null);
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  const handleSubmitSuccess = () => {
    setCurrentView('home');
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleItemsChange = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={handleViewChange} />

      {currentView === 'home' && (
        <ItemsList onItemClick={handleItemClick} refreshTrigger={refreshTrigger} />
      )}

      {currentView === 'submit' && (
        <SubmitItemForm onSuccess={handleSubmitSuccess} />
      )}

      {currentView === 'admin' && (
        <AdminDashboard onItemsChange={handleItemsChange} />
      )}

      {selectedItem && (
        <ItemDetails item={selectedItem} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default App;
