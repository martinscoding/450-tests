import { useState } from "react";
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    function refreshItems() {
        setRefreshKey((current) => current + 1);
    }

    return (
        <>
            <section className="py-4">
                <AddItem onCreated={refreshItems} />
            </section>
            <section>
                <ItemList refreshKey={refreshKey} onChanged={refreshItems} />
            </section>
        </>
    );
}

export default App;