import './App.css';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/RequireAuth'
import VerifyWorkshopPayment from './components/VerifyWorkshopPayment';
import Layout from './components/Layout';
import Missing from './components/Missing';
import AddAdmin from './components/AddAdmin'
import ChangePassword from './components/ChangePassword'
import WorkshopCashPayment from './components/WorkshopCashPayment'
import WorkshopList from './components/WorkshopList';
import EventList from './components/EventList'
import WorkshopPayments from './components/WorkshopPayments';
import Queries from './components/Queries';
import RegisterNewUser from './components/RegisterNewUser';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<LoginPage />}></Route>
     
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/register-user' element={<RegisterNewUser />}></Route>
          <Route path='/add-admin' element={<AddAdmin />}></Route>
          <Route path='/change-password' element={<ChangePassword />}></Route>
          <Route path='/verify-workshop-payment' element={<VerifyWorkshopPayment />}></Route>
          <Route path='/workshop-cash-payment' element={<WorkshopCashPayment />}></Route>
          <Route path='/event-list' element={<EventList />}></Route>
          <Route path='/workshop-list' element={<WorkshopList />}></Route>
          <Route path='/workshop-payments' element={<WorkshopPayments />}></Route>
          <Route path='/queries' element={<Queries />}></Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
