import { Routes, Route } from 'react-router-dom';
import WalletHandler from './pages/WalletHandler';

function App() {
  return (
    <Routes>
      {/* هنا بنستقبل الـ slug من اللينك زي user-1 */}
      <Route path="/users/:slug" element={<WalletHandler />} />
    </Routes>
  );
}

export default App;