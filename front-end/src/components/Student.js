import { useEffect, useState } from "react";
import axios from "axios";

function Student() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [fee, setFee] = useState("");
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const result = await axios.get(
        "http://127.0.0.1:8000/student"
      );

      setStudents(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function save(event) {
    event.preventDefault();

    if (!name.trim() || !address.trim() || !fee) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/student",
        {
          name: name,
          address: address,
          fee: fee,
        }
      );

      alert("Student Registered Successfully");

      clearForm();
      Load();
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  }

  function editStudent(student) {
    setId(student.id);
    setName(student.name);
    setAddress(student.address);
    setFee(student.fee);
  }

  async function update(event) {
    event.preventDefault();

    if (!name.trim() || !address.trim() || !fee) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.put(
        "http://127.0.0.1:8000/student/" + id,
        {
          id: id,
          name: name,
          address: address,
          fee: fee,
        }
      );

      alert("Student Updated Successfully");

      clearForm();
      Load();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  }

  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    try {
      await axios.delete(
        "http://127.0.0.1:8000/student/" + id
      );

      alert("Student Deleted Successfully");

      Load();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setAddress("");
    setFee("");
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>Student Management System</h1>

      <div className="mb-3">
        <label>Search Student</label>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <form>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Fee</label>
          <input
            type="number"
            className="form-control"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary me-2"
          onClick={save}
        >
          Register
        </button>

        <button
          className="btn btn-warning me-2"
          onClick={update}
          disabled={!id}
        >
          Update
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={clearForm}
        >
          Clear
        </button>
      </form>

      <hr />

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Fee</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.address}</td>
                <td>{student.fee}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Students Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Student;