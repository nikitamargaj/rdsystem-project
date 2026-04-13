import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Rduser() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  // Form state
  const [rid, setRid] = useState(null);
  const [nm, setNm] = useState("");
  const [ad, setAd] = useState("");
  const [db, setDb] = useState("");
  const [gen, setGender] = useState("");
  const [rdt, setRdt] = useState("");
  const [amt, setAmt] = useState("");
  const [oc, setOc] = useState("");
  const [ac, setAc] = useState("");
  const [adh, setAdh] = useState("");
  const [pan, setPan] = useState("");
  const [agr, setAgr] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Fetch users
  const getUsers = () => {
    axios
      .get("http://localhost:8080/rduser")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => getUsers(), []);

  const handleShowAdd = () => {
    clearForm();
    setShow(true);
  };

  const handleShowEdit = (user) => {
    setRid(user.rid);
    setNm(user.name);
    setAd(user.addr);
    setDb(user.dob);
    setGender(user.gender);
    setRdt(user.rddate);
    setAmt(user.rdamt);
    setOc(user.occupation);
    setAc(user.acno);
    setAdh(user.adharno);
    setPan(user.panno);
    setAgr(user.agree);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    clearForm();
  };

  const clearForm = () => {
    setRid(null);
    setNm("");
    setAd("");
    setDb("");
    setGender("");
    setRdt("");
    setAmt("");
    setOc("");
    setAc("");
    setAdh("");
    setPan("");
    setAgr(false);
  };

  // Delete
  const del = (id) => {
    axios.delete(`http://localhost:8080/dlt/${id}`).then(() => {
      alert("Deleted Successfully");
      getUsers();
    });
  };

  // Save / Update
  const save = () => {
    const data = {
      name: nm,
      addr: ad,
      dob: db,
      gender: gen,
      rddate: rdt,
      rdamt: Number(amt), // ✅ FIX
      occupation: oc,
      acno: ac,
      adharno: adh,
      panno: pan,
      agree: agr,
    };

    if (rid) {
      axios
        .put("http://localhost:8080/updt", { ...data, rid }) // ✅ send rid only here
        .then(() => {
          alert("Updated Successfully ✅");
          handleClose();
          getUsers();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:8080/save", data) // ✅ no rid
        .then(() => {
          alert("Saved Successfully ✅");
          handleClose();
          getUsers();
        })
        .catch((err) => console.log(err));
    }
  };

  // Filter
  const filteredUsers = users.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="container mt-4">
        <Button variant="primary" onClick={handleShowAdd} className="mb-3">
          Add New RD User
        </Button>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          className="form-control mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <h2>RD User List</h2>

        <table className="table table-bordered text-center">
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              <th>RID</th>
              <th>Name</th>
              <th>Address</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>RD Date</th>
              <th>RD Amount</th>
              <th>Occupation</th>
              <th>Account No</th>
              <th>Aadhar No</th>
              <th>PAN No</th>
              <th>Agree</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((item) => (
              <tr key={item.rid}>
                <td>{item.rid}</td>
                <td>{item.name}</td>
                <td>{item.addr}</td>
                <td>{item.dob}</td>
                <td>{item.gender}</td>
                <td>{item.rddate}</td>
                <td>{item.rdamt}</td>
                <td>{item.occupation}</td>
                <td>{item.acno}</td>
                <td>{item.adharno}</td>
                <td>{item.panno}</td>
                <td>{item.agree ? "Yes" : "No"}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleShowEdit(item)}
                  >
                    Update
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => del(item.rid)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-3">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </Button>

          <span className="mx-3">Page {currentPage}</span>

          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLast >= filteredUsers.length}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {rid ? "Edit RD User" : "Add New RD User"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={nm}
                onChange={(e) => setNm(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Control
                type="date"
                value={db}
                onChange={(e) => setDb(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Select
                value={gen}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Control
                type="date"
                value={rdt}
                onChange={(e) => setRdt(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Control
                type="number"
                placeholder="Enter RD Amount"
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Control
                type="text"
                placeholder="Enter Occupation"
                value={oc}
                onChange={(e) => setOc(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Control
                type="text"
                placeholder="Enter Account No"
                value={ac}
                onChange={(e) => setAc(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Control
                type="text"
                placeholder="Enter Aadhar No"
                value={adh}
                onChange={(e) => setAdh(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Control
                type="text"
                placeholder="Enter PAN No"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Check
                type="checkbox"
                label="Agree Terms & Conditions"
                checked={agr}
                onChange={(e) => setAgr(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="success" onClick={save}>
            {rid ? "Update RD User" : "Add RD User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}