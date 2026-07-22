function ApplyLeave() {
  return (
    <div className="container mt-4">
      <h2>Apply Leave</h2>

      <form>
        <div className="mb-3">
          <label className="form-label">Leave Type</label>
          <select className="form-select">
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Earned Leave</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input type="date" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input type="date" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea className="form-control" rows="4"></textarea>
        </div>

        <button className="btn btn-primary">
          Apply Leave
        </button>
      </form>
    </div>
  );
}

export default ApplyLeave;