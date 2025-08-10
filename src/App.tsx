// App.tsx
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import DashboardLayout from './components/Dashboard'
import UserProfile from './components/UserProfileCom'
import PostTable from './components/CommentComp'
import './App.css'
import { UserProvider } from "./context/UserContext";
import DefaultDashboard from "./components/DefaultDashboard";

export default function App() {



  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Parent Route */}
          <Route path="/" element={<Navigate to="/dashboard/comments" replace />} />
          <Route path="/dashboard" element={<DashboardLayout/>}>
            {/* Nested Routes */}
            <Route path="profile" element={<UserProfile />} />
            <Route path="comments" element={<PostTable />} />
            <Route path="" element={<DefaultDashboard />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}


