import { useState } from "react";
import { API_URL } from "../api";

function AddItem({ onCreated = () => {} }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("OPEN");

  function addClicked(event) {
    event.preventDefault();

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
      }),
    }).then((response) => {
      if (response.ok) {
        setTitle("");
        setDescription("");
        setStatus("OPEN");
        onCreated();
      }
    });
  }

  return (
      <>
        <h3>Add Item</h3>
        <form className="row g-2">
          <div className="col-12 col-md-4">
            <input
                type="text"
                className="form-control"
                placeholder="Titel"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-4">
            <input
                type="text"
                className="form-control"
                placeholder="Beschreibung"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-2">
            <select
                className="form-select"
                aria-label="Status auswählen"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
            >
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
          <div className="col-12 col-md-2">
            <button className="btn btn-primary w-100" onClick={addClicked}>
              Add
            </button>
          </div>
        </form>
      </>
  );
}

export default AddItem;