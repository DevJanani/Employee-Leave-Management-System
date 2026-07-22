function Login() {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Employee Login</h2>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
        />

        <button className="btn btn-primary w-100">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;