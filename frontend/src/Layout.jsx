import "./Layout.css";

const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "register", label: "Register Patient" },
    { key: "patients", label: "Patient List" },
    { key: "visits", label: "Visits" },
];

function Layout({ activePage, onNavigate, onLogout, children }) {
    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="brand">HMIS Portal</div>

                <nav>
                    {menuItems.map((item) => (
                        <button
                            key={item.key}
                            className={activePage === item.key ? "menu-item active" : "menu-item"}
                            onClick={() => onNavigate(item.key)}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button className="logout" onClick={onLogout}>
                    Log out
                </button>
            </aside>

            <main className="content">{children}</main>
        </div>
    );
}

export default Layout;