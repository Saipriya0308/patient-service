import { useEffect, useState } from "react";
import "./Table.css";

const API = "http://localhost:8080/api/patients";

function PatientList({ onEdit }) {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");

    const loadPatients = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Request failed");
            }
            const data = await response.json();
            setPatients(data);
            setError("");
        } catch (err) {
            setError("Cannot load patients. Is the Spring Boot app running?");
        }
    };

    useEffect(() => {
        loadPatients(API);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (name.trim()) {
            loadPatients(`${API}/search?name=${encodeURIComponent(name.trim())}`);
        } else if (gender) {
            loadPatients(`${API}/search/gender?gender=${encodeURIComponent(gender)}`);
        } else {
            loadPatients(API);
        }
    };

    const handleClear = () => {
        setName("");
        setGender("");
        loadPatients(API);
    };

    return (
        <div>
            <h1>Patient List</h1>

            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">All genders</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                </select>

                <button type="submit">Search</button>
                <button type="button" className="secondary" onClick={handleClear}>
                    Clear
                </button>
            </form>

            <p className="hint">Double click a patient to update their details.</p>

            {error && <div className="table-error">{error}</div>}

            <table className="patient-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {patients.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="empty">
                            No patients found
                        </td>
                    </tr>
                ) : (
                    patients.map((p) => (
                        <tr
                            key={p.id}
                            className="clickable-row"
                            onDoubleClick={() => onEdit(p)}
                        >
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.age}</td>
                            <td>{p.gender}</td>
                            <td>{p.phone}</td>
                            <td>{p.email}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default PatientList;