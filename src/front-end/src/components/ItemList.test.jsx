import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ItemList from "./ItemList";

function createFetchMock() {
    return vi.fn((url, options = {}) => {
        if (url === "http://localhost:8080/items") {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, title: "Milch", status: "OPEN" }]),
            });
        }

        if (url === "http://localhost:8080/items/1") {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    id: 1,
                    title: "Milch",
                    description: "2 Liter",
                    status: "OPEN",
                    comments: [{ id: 1, text: "Kaufen" }],
                }),
            });
        }

        if (url === "http://localhost:8080/items/1/status" && options.method === "PATCH") {
            return Promise.resolve({ ok: true });
        }

        if (url === "http://localhost:8080/items/1/comments" && options.method === "POST") {
            return Promise.resolve({ ok: true });
        }

        return Promise.reject(new Error(`Unhandled request: ${url}`));
    });
}

describe("ItemList", () => {
    beforeEach(() => {
        global.fetch = createFetchMock();
    });

    it("shows the selected item details and comments", async () => {
        render(<ItemList refreshKey={0} onChanged={vi.fn()} />);

        expect(await screen.findByText("Milch")).toBeInTheDocument();
        expect(await screen.findByText("Item Details")).toBeInTheDocument();
        expect(await screen.findByText("Kaufen")).toBeInTheDocument();
    });

    it("updates the item status", async () => {
        const onChanged = vi.fn();
        render(<ItemList refreshKey={0} onChanged={onChanged} />);

        fireEvent.change(await screen.findByLabelText("Status"), {
            target: { value: "DONE" },
        });
        fireEvent.click(screen.getByRole("button", { name: /status speichern/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:8080/items/1/status",
                expect.objectContaining({ method: "PATCH" }),
            );
        });
        expect(onChanged).toHaveBeenCalled();
    });
});