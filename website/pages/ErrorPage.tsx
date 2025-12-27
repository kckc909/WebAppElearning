export default function GlobalErrorPage({ status = 500, message = "Có lỗi xảy ra!" }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4">
            <h1 className="text-5xl font-bold mb-4">{status}</h1>
            <p className="text-xl mb-6">{message}</p>

            <button
                onClick={() => window.location.href = "/"}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl"
            >
                Quay về trang chủ
            </button>
        </div>
    );
}
