export default function Dashboard({ user, onLogout }) {
  return (
    <div className="card">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p>You are logged in with a valid JWT.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
