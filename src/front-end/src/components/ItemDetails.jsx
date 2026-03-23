import { useEffect, useState } from "react";
import { API_URL } from "../api";

function ItemDetails({ itemId, refreshKey, onChanged = () => {} }) {
    const [item, setItem] = useState(null);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("OPEN");
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (!itemId) {
            setItem(null);
            return;
        }

        fetch(`${API_URL}/${itemId}`)
            .then((response) => response.json())
            .then((data) => {
                setItem(data);
                setDescription(data.description ?? "");
                setStatus(data.status ?? "OPEN");
            });
    }, [itemId, refreshKey]);

    function saveDescription() {
        fetch(`${API_URL}/${itemId}/description`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ description }),
        }).then((response) => {
            if (response.ok) {
                onChanged();
            }
        });
    }

    function saveStatus() {
        fetch(`${API_URL}/${itemId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }).then((response) => {
            if (response.ok) {
                onChanged();
            }
        });
    }

    function addComment() {
        fetch(`${API_URL}/${itemId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: comment }),
        }).then((response) => {
            if (response.ok) {
                setComment("");
                onChanged();
            }
        });
    }

    if (!itemId) {
        return <div className="mt-4">Bitte ein Item auswählen.</div>;
    }

    if (!item) {
        return <div className="mt-4">Lade Item-Details...</div>;
    }

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h4 className="card-title">Item Details</h4>
                <p className="mb-2"><strong>Titel:</strong> {item.title}</p>

                <label className="form-label" htmlFor="description">Beschreibung</label>
                <textarea
                    id="description"
                    className="form-control mb-2"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button className="btn btn-primary btn-sm mb-3" onClick={saveDescription}>
                    Beschreibung speichern
                </button>

                <label className="form-label" htmlFor="status">Status</label>
                <select
                    id="status"
                    className="form-select mb-2"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>
                <button className="btn btn-primary btn-sm mb-3" onClick={saveStatus}>
                    Status speichern
                </button>

                <h5>Kommentare</h5>
                <ul className="list-group mb-3">
                    {item.comments?.map((itemComment) => (
                        <li key={itemComment.id ?? itemComment.text} className="list-group-item">
                            {itemComment.text}
                        </li>
                    ))}
                </ul>

                <label className="form-label" htmlFor="comment">Neuer Kommentar</label>
                <textarea
                    id="comment"
                    className="form-control mb-2"
                    placeholder="Kommentar eingeben"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
                <button className="btn btn-primary btn-sm" onClick={addComment}>
                    Kommentar hinzufügen
                </button>
            </div>
        </div>
    );
}

export default ItemDetails;