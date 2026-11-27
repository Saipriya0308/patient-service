import { useEffect, useState } from "react";
import "./Form.css";
import "./Table.css";
import "./Visits.css";

const PATIENTS_API = "http://localhost:8080/api/patients";
const VISITS_API = "http://localhost:8080/api/visits";

const emptyForm = {
    patientId: "",
    visitType: "OUTPATIENT",
    visitDateTime: "",
    doctorName: "",
    reason: "",
    ward: "",
    roomNumber: "",
    admissionDate: "",
    dischargeDate: "",
};

function Visits() {
    const [patients, setPatients] = useState([]);
    const [visits, setVisits] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [filter, setFilter] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const isInpatient = form.visitType === "INPATIENT";

    const loadVisits = async (type) => {
        const url = type ? `${VISITS_API}/type?visitType=${type}` : VISITS_API;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Request failed");
            }
            setVisits(await response.json());
        } catch (err) {
            setIsError(true);
            setMessage("Cannot load visits. Is the Spring Boot app running?");
        }
    };

    const loadPatients = async () => {
        try {
            const response = await fetch(PATIENTS_API);
            if (response.ok) {
                setPatients(await response.json());
            }
        } catch (err) {
            setIsError(true);
            setMessage("Cannot load patients. Is the Spring Boot app running?");
        }
    };

    useEffect(() => {
        loadPatients();
        loadVisits("");
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const body = {
            patient: { id: Number(form.patientId) },
            visitType: form.visitType,
            visitDateTime: form.visitDateTime,
            doctorName: form.doctorName,
            reason: form.reason,
            ward: isInpatient ? form.ward : null,
            roomNumber: isInpatient ? form.roomNumber : null,
            admissionDate: isInpatient && form.admissionDate ? form.admissionDate : null,
            dischargeDate: isInpatient && form.dischargeDate ? form.dischargeDate : null,
        };

        try {
            const response = await fetch(VISITS_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setIsError(false);
                setMessage("Visit recorded successfully");
                setForm(emptyForm);
                loadVisits(filter);
            } else {
                setIsError(true);
                setMessage("Could not record the visit. Check the details and try again.");
            }
        } catch (err) {
            setIsError(true);
            setMessage("Cannot reach the server. Is the Spring Boot app running?");
        }
    };

    const handleFilter = (e) => {
        setFilter(e.target.value);
        loadVisits(e.target.value);
    };

    const formatDateTime = (value) => (value ? value.replace("T", " ").slice(0, 16) : "");

    return (
        <div>
            <h1>Patient Visits</h1>

            <form className="form-card visit-form" onSubmit={handleSubmit}>
                <label>Patient</label>
                <select name="patientId" value={form.patientId} onChange={handleChange} required>
                    <option value="">Select patient</option>
                    {patients.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name} (ID {p.id})
                        </option>
                    ))}
                </select>

                <label>Visit type</label>
                <select name="visitType" value={form.visitType} onChange={handleChange}>
                    <option value="OUTPATIENT">Outpatient</option>
                    <option value="INPATIENT">Inpatient</option>
                </select>

                <label>Visit date and time</label>
                <input
                    type="datetime-local"
                    name="visitDateTime"
                    value={form.visitDateTime}
                    onChange={handleChange}
                    required
                />

                <label>Doctor</label>
                <input name="doctorName" value={form.doctorName} onChange={handleChange} required />

                <label>Reason for visit</label>
                <input name="reason" value={form.reason} onChange={handleChange} required />

                {isInpatient && (
                    <>
                        <label>Ward</label>
                        <input name="ward" value={form.ward} onChange={handleChange} required />

                        <label>Room number</label>
                        <input name="roomNumber" value={form.roomNumber} onChange={handleChange} />

                        <label>Admission date</label>
                        <input
                            type="date"
                            name="admissionDate"
                            value={form.admissionDate}
                            onChange={handleChange}
                        />

                        <label>Discharge date</label>
                        <input
                            type="date"
                            name="dischargeDate"
                            value={form.dischargeDate}
                            onChange={handleChange}
                        />
                    </>
                )}

                {message && (
                    <div className={isError ? "msg error-msg" : "msg success-msg"}>{message}</div>
                )}

                <button type="submit">Record visit</button>
            </form>

            <div className="visit-filter">
                <label>Show</label>
                <select value={filter} onChange={handleFilter}>
                    <option value="">All visits</option>
                    <option value="OUTPATIENT">Outpatient only</option>
                    <option value="INPATIENT">Inpatient only</option>
                </select>
            </div>

            <table className="patient-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Type</th>
                    <th>Date and time</th>
                    <th>Doctor</th>
                    <th>Reason</th>
                    <th>Ward and room</th>
                </tr>
                </thead>
                <tbody>
                {visits.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="empty">
                            No visits found
                        </td>
                    </tr>
                ) : (
                    visits.map((v) => (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.patient ? v.patient.name : ""}</td>
                            <td>
                  <span className={v.visitType === "INPATIENT" ? "tag tag-in" : "tag tag-out"}>
                    {v.visitType === "INPATIENT" ? "Inpatient" : "Outpatient"}
                  </span>
                            </td>
                            <td>{formatDateTime(v.visitDateTime)}</td>
                            <td>{v.doctorName}</td>
                            <td>{v.reason}</td>
                            <td>{v.ward ? `${v.ward} ${v.roomNumber || ""}` : "-"}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Visits;