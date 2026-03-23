function ItemRow({ item, isSelected, onSelect, onDelete }) {
  function removeItem(event) {
    event.preventDefault();
    onDelete(item.id);
  }

  return (
      <div className={`row py-2 border-bottom align-items-center ${isSelected ? "bg-light" : ""}`}>
        <div className="col-1">{item.id}</div>
        <div className="col-4">{item.title}</div>
        <div className="col-3">{item.status}</div>
        <div className="col-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => onSelect(item.id)}>
            Details
          </button>
        </div>
        <div className="col-2">
          <button className="btn btn-outline-danger btn-sm" onClick={removeItem}>
            Delete
          </button>
        </div>
      </div>
  );
}

export default ItemRow;