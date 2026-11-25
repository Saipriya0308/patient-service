import { useState } from "react";
import "./Form.css";

const API = "http://localhost:8080/api/patients";

const emptyForm = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
};

function RegisterPatient({ patient, onDone }) {
    const isEditing = patient !== null && patient !== undefined;

    const [form, setForm] = useState(
        isEditing
            ? {
                name: patient.name || "",
                age: patient.age ?? "",
                gender: patient.gender || "",
                phone: patient.phone || "",
                email: patient.email || "",
            }
            : emptyForm
    );
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const send = async (method, url, successText) => {
        setMessage("");
        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, age: Number(form.age) }),
            });

            if (response.ok) {
                setIsError(false);
                setMessage(successText);
                return true;
            }
            setIsError(true);
            setMessage("Could not save. Check the details and try again.");
        } catch (err) {
            setIsError(true);
            setMessage("Cannot reach the server. Is the Spring Boot app running?");
        }
        return false;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const ok = await send("POST", API, "Patient registered successfully");
        if (ok) {
            setForm(emptyForm);
        }
    };

    const handleUpdate = async () => {
        const ok = await send("PUT", `${API}/${patient.id}`, "Patient updated successfully");
        if (ok) {
            setTimeout(onDone, 800);
        }
    };

    return (
        <div>
            <h1>{isEditing ? `Update Patient (ID ${patient.id})` : "Register Patient"}</h1>

            <form className="form-card" onSubmit={handleRegister}>
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />

                <label>Age</label>
                <input
                    name="age"
                    type="number"
                    min="0"
                    max="120"
                    value={form.age}
                    onChange={handleChange}
                    required
                />

                <label>Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} required>
                    <option value="">Select gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                </select>

                <label>Phone</label>
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10 digit number"
                    pattern="[0-9]{10}"
                    required
                />

                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} />

                {message && (
                    <div className={isError ? "msg error-msg" : "msg success-msg"}>{message}</div>
                )}

                <div className="button-row">
                    <button type="submit" disabled={isEditing}>
                        Register
                    </button>
                    <button type="button" onClick={handleUpdate} disabled={!isEditing}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPatient;