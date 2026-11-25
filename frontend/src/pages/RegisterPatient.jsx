import { useState } from "react";
import "./Form.css";

const emptyForm = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
};

function RegisterPatient() {
    const [form, setForm] = useState(emptyForm);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:8080/api/patients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, age: Number(form.age) }),
            });

            if (response.ok) {
                setIsError(false);
                setMessage("Patient registered successfully");
                setForm(emptyForm);
            } else {
                setIsError(true);
                setMessage("Could not register patient. Check the details and try again.");
            }
        } catch (err) {
            setIsError(true);
            setMessage("Cannot reach the server. Is the Spring Boot app running?");
        }
    };

    return (
        <div>
            <h1>Register Patient</h1>

            <form className="form-card" onSubmit={handleSubmit}>
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

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPatient;