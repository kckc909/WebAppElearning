import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SuperAdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:4000/accounts/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const accFound = await res.json();
            console.log(accFound)

            if (!res.ok) {
                setError(accFound.message || "Sai tài khoản hoặc mật khẩu");
            }

            if (!(accFound.role === -1)) {
                setError("Bạn không có quyền đăng nhập vào trang này!")
            }

            // localStorage.setItem("superadmin_token", data.token);
            localStorage.setItem('Account', accFound)
            navigate("/superadmin/dashboard");
        } catch (error) {
            setError("Không thể kết nối server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Super Admin</h2>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                )}

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Tài khoản</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Nhập tài khoản..."
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-medium">Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Nhập mật khẩu..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
            </form>
        </div>
    );
};

export default SuperAdminLogin;
