import { useState } from "react";
import Login from "./Login";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import RegisterPatient from "./pages/RegisterPatient";
import PatientList from "./pages/PatientList";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [activePage, setActivePage] = useState("dashboard");
    const [editingPatient, setEditingPatient] = useState(null);

    if (!loggedIn) {
        return <Login onLogin={() => setLoggedIn(true)} />;
    }

    const handleLogout = () => {
        setLoggedIn(false);
        setActivePage("dashboard");
        setEditingPatient(null);
    };

    const handleNavigate = (page) => {
        // opening Register Patient from the sidebar always starts a new, empty form
        if (page === "register") {
            setEditingPatient(null);
        }
        setActivePage(page);
    };

    const handleEdit = (patient) => {
        setEditingPatient(patient);
        setActivePage("register");
    };

    return (
        <Layout
            activePage={activePage}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
        >
            {activePage === "dashboard" && <Dashboard />}
            {activePage === "register" && (
                <RegisterPatient
                    patient={editingPatient}
                    onDone={() => {
                        setEditingPatient(null);
                        setActivePage("patients");
                    }}
                />
            )}
            {activePage === "patients" && <PatientList onEdit={handleEdit} />}
        </Layout>
    );
}

export default App;