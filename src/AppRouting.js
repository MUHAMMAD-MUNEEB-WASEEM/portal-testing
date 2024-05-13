import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import Roles from './pages/Dashboard/Roles/index.jsx';
import AddRoles from './pages/Dashboard/Roles/AddRole.jsx';
import Leads from './pages/Dashboard/Leads/index.jsx';
import LeadForm from './pages/Dashboard/Leads/LeadForm.jsx';
import LeadInfo from './pages/Dashboard/Leads/LeadInfo.jsx';
import AllLeads from './pages/Dashboard/Leads-Admin/index.jsx';
import AllLeadInfo from './pages/Dashboard/Leads-Admin/LeadInfo.jsx';
import ClientForm from './pages/Dashboard/Clients/ClientForm.jsx';
import Clientinfo from './pages/Dashboard/Clients/Clientinfo.jsx';
import ClientManagementForm from './pages/Dashboard/ClientManagement/ClientManagementForm.jsx';
import ClientManagementInfo from './pages/Dashboard/ClientManagement/ClientManagementInfo.jsx';
import ProjectForm from './pages/Dashboard/Projects/ProjectForm.jsx';
import ProjectInfo from './pages/Dashboard/Projects/ProjectInfo.jsx';
import ProjectManagementForm from './pages/Dashboard/ProjectManagement/ProjectManagementForm.jsx';
import ProjectManagementInfo from './pages/Dashboard/ProjectManagement/ProjectManagementInfo.jsx';
import InvoiceComponent from './pages/Dashboard/Invoices/index.jsx';
import InvoiceForm from './pages/Dashboard/Invoices/InvoiceForm.jsx';
import InvoiceInfo from './pages/Dashboard/Invoices/InvoiceInfo.jsx';
import BrandForm from './pages/Dashboard/BrandManagement/BrandForm.jsx';
import BrandInfo from './pages/Dashboard/BrandManagement/BrandInfo.jsx';

const DashboardLayout = React.lazy(() => import('./Layouts/DashboardLayout.js'));
const Targets = React.lazy(() => import('./pages/Dashboard/MonetaryManagement/Targets'));
const Budgets = React.lazy(() => import('./pages/Dashboard/MonetaryManagement/Budgets'));
const Acheived = React.lazy(() => import('./pages/Dashboard/MonetaryManagement/Acheived'));
const Expenses = React.lazy(() => import('./pages/Dashboard/MonetaryManagement/Expenses'));
const Chargebacks = React.lazy(() => import('./pages/Dashboard/MonetaryManagement/Chargebacks'));
const Refunds = React.lazy(() => import('./pages/Dashboard/MonetaryManagement/Refunds'));
const SetTarget = React.lazy(() => import('./pages/Dashboard/MonetaryManagement/SetTarget'));
const SetBudget = React.lazy(() => import('./pages/Dashboard/MonetaryManagement/SetBudget'));
const PaymentCancel = React.lazy(() => import('./pages/ClientInvoice/PaymentCancel'));
const ClientInvoice = React.lazy(() => import('./pages/ClientInvoice'));
const Thankyou = React.lazy(() => import('./pages/ClientInvoice/Thankyou/Thankyou.jsx'));
const UsersManagment = React.lazy(() => import('./pages/Dashboard/usersManagment'));
const ProjectManagement = React.lazy(
  () => import('./pages/Dashboard/ProjectManagement/ProjectManagement'),
);
const InvoiceManagement = React.lazy(() => import('./pages/Dashboard/InvoiceManagement'));
const InvoiceManagementInfo = React.lazy(
  () => import('./pages/Dashboard/InvoiceManagement/InvoiceManagementInfo.jsx'),
);
const InvoiceManagementForm = React.lazy(
  () => import('./pages/Dashboard/InvoiceManagement/InvoiceManagementForm.jsx'),
);
const MonetaryManagement = React.lazy(() => import('./pages/Dashboard/MonetaryManagement'));
const ClientManagement = React.lazy(() => import('./pages/Dashboard/ClientManagement'));
const BrandManagement = React.lazy(
  () => import('./pages/Dashboard/BrandManagement/BrandManagement'),
);
const UpdateUsersManagment = React.lazy(() => import('./pages/Dashboard/UpdateUsersManagment'));
const Confirmation = React.lazy(() => import('./pages/Auth/Confirmation/Confirmation'));
const Login = React.lazy(() => import('./pages/Auth/Login/Login'));
const Signup = React.lazy(() => import('./pages/Auth/Signup/Signup'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Clients = React.lazy(() => import('./pages/Dashboard/Clients'));
const Projects = React.lazy(() => import('./pages/Dashboard/Projects'));
const LandingPage = React.lazy(() => import('./pages/LandingPage/LandingPage'));
const ForgotPassword = React.lazy(() => import('./pages/Auth/ForgotPassword/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/Auth/ResetPassword/ResetPassword'));
const TermsAndConditions = React.lazy(
  () => import('./pages/TermsAndConditions/TermsAndConditions'),
);

const AppRouting = () => {
  const { user } = useAuthContext();
  const forgotUser = JSON.parse(localStorage.getItem('forgot-user'));
  const isUserEmailVerified = user?.data?.emailVerified;

  return (
    <Routes>
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route
        path="/"
        element={isUserEmailVerified ? <Navigate to="/dashboard/main" /> : <LandingPage />}
      />
      <Route
        path="/signup/:token"
        element={isUserEmailVerified ? <Navigate to="/dashboard/main" /> : <Signup />}
      />
      <Route
        path="/login"
        element={isUserEmailVerified ? <Navigate to="/dashboard/main" /> : <Login />}
      />
      <Route path="/confirmation" element={user ? <Confirmation /> : <Navigate to="/login" />} />
      <Route path="/forgotpassword" element={!user ? <ForgotPassword /> : <Navigate to="/" />} />
      {forgotUser && (
        <Route
          path={`/api/v1/users/reset-password/${forgotUser._id}`}
          element={!user ? <ResetPassword /> : <Navigate to="/" />}
        />
      )}

      <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
        <Route path="main" element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/add" element={<ClientForm />} />
        <Route path="clients/update/:id" element={<ClientForm />} />
        <Route path="clients/:id" element={<Clientinfo />} />
        <Route path="client-managment" element={<ClientManagement />} />
        <Route path="client-managment/add" element={<ClientManagementForm />} />
        <Route path="client-managment/update/:id" element={<ClientManagementForm />} />
        <Route path="client-managment/:id" element={<ClientManagementInfo />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/add" element={<ProjectForm />} />
        <Route path="projects/update/:id" element={<ProjectForm />} />
        <Route path="projects/:id" element={<ProjectInfo />} />
        <Route path="project-managment" element={<ProjectManagement />} />
        <Route path="project-managment/add" element={<ProjectManagementForm />} />
        <Route path="project-managment/update/:id" element={<ProjectManagementForm />} />
        <Route path="project-managment/:id" element={<ProjectManagementInfo />} />
        <Route path="invoices" element={<InvoiceComponent />} />
        <Route path="invoices/:id" element={<InvoiceInfo />} />
        <Route path="invoices/add" element={<InvoiceForm />} />
        <Route path="invoices/update/:id" element={<InvoiceForm />} />
        <Route path="invoice-managment" element={<InvoiceManagement />} />
        <Route path="invoice-managment/:id" element={<InvoiceManagementInfo />} />
        <Route path="invoice-managment/add" element={<InvoiceManagementForm />} />
        <Route path="invoice-managment/update/:id" element={<InvoiceManagementForm />} />
        <Route path="brand-managment" element={<BrandManagement />} />
        <Route path="brand-managment/:id" element={<BrandInfo />} />
        <Route path="brand-managment/add" element={<BrandForm />} />
        <Route path="brand-managment/update/:id" element={<BrandForm />} />
        <Route path="user-managment" element={<UsersManagment />} />
        <Route path="merchant-managment" element={<UsersManagment />} />
        <Route path="monetary-managment/targets" element={<Targets />} />
        <Route path="monetary-managment/set-target" element={<SetTarget />} />
        <Route path="monetary-managment/set-budget" element={<SetBudget />} />
        <Route path="monetary-managment/budgets" element={<Budgets />} />
        <Route path="monetary-managment/acheived" element={<Acheived />} />
        <Route path="monetary-managment/expenses" element={<Expenses />} />
        <Route path="monetary-managment/chargebacks" element={<Chargebacks />} />
        <Route path="monetary-managment/refunds" element={<Refunds />} />
        <Route path="monetary-managment" element={<MonetaryManagement />} />
        <Route path="user-managment/:id" element={<UpdateUsersManagment />} />
        <Route path="roles" element={<Roles />} />
        <Route path="roles/add" element={<AddRoles />} />
        <Route path="leads" element={<Leads />} />
        <Route path="leads/add" element={<LeadForm />} />
        <Route path="leads/update/:id" element={<LeadForm />} />
        <Route path="leads/:id" element={<LeadInfo />} />
        <Route path="all-leads" element={<AllLeads />} />
        <Route path="all-leads/add" element={<LeadForm />} />
        <Route path="all-leads/update/:id" element={<LeadForm />} />
        <Route path="all-leads/:id" element={<AllLeadInfo />} />
      </Route>

      <Route path="/invoice/payment-link/:id" element={<ClientInvoice />} />
      <Route path="/payment_success" element={<Thankyou />} />
      <Route path="/payment_cancel" element={<PaymentCancel />} />

      <Route
        path="*"
        element={
          <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Error 404! PAGE NOT FOUND</h1>
        }
      />
    </Routes>
  );
};

export default AppRouting;
