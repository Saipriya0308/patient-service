import { useState } from "react";
import Login from "./Login";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import RegisterPatient from "./pages/RegisterPatient";
import PatientList from "./pages/PatientList";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [activePage, setActivePage] = useState("dashboard");

    if (!loggedIn) {
        return <Login onLogin={() => setLoggedIn(true)} />;
    }

    const handleLogout = () => {
        setLoggedIn(false);
        setActivePage("dashboard");
    };

    return (
        <Layout
            activePage={activePage}
            onNavigate={setActivePage}
            onLogout={handleLogout}
        >
            {activePage === "dashboard" && <Dashboard />}
            {activePage === "register" && <RegisterPatient />}
            {activePage === "patients" && <PatientList />}
        </Layout>
    );
}

export default App;