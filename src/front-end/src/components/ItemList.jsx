import { useEffect, useState } from "react";
import { API_URL } from "../api";
import ItemDetails from "./ItemDetails";
import ItemRow from "./ItemRow";

function ItemList({ refreshKey, onChanged = () => {} }) {
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => (response.ok && response.json()) || Promise.reject(response))
            .then((data) => {
                setItems(data);
                if (data.length > 0 && !data.some((item) => item.id === selectedItemId)) {
                    setSelectedItemId(data[0].id);
                }
                if (data.length === 0) {
                    setSelectedItemId(null);
                }
            })
            .catch((error) => console.error(error));
    }, [refreshKey, selectedItemId]);

    function deleteItem(itemId) {
        fetch(`${API_URL}/${itemId}`, {
            method: "DELETE",
        }).then((response) => {
            if (response.ok) {
                if (selectedItemId === itemId) {
                    setSelectedItemId(null);
                }
                onChanged();
            }
        });
    }

    return (
        <>
            <h3>Item List</h3>
            <div className="container">
                {items.map((item) => (
                    <ItemRow
                        key={item.id}
                        item={item}
                        isSelected={item.id === selectedItemId}
                        onSelect={setSelectedItemId}
                        onDelete={deleteItem}
                    />
                ))}
                <ItemDetails itemId={selectedItemId} refreshKey={refreshKey} onChanged={onChanged} />
            </div>
        </>
    );
}

export default ItemList;