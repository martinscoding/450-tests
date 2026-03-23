import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AddItem from "./AddItem";

describe("AddItem", () => {
    beforeEach(() => {
        global.fetch = vi.fn(() => Promise.resolve({ ok: true }));
    });

    it("sends title, description and status to the backend", async () => {
        const onCreated = vi.fn();
        render(<AddItem onCreated={onCreated} />);

        fireEvent.change(screen.getByPlaceholderText("Titel"), {
            target: { value: "Milch" },
        });
        fireEvent.change(screen.getByPlaceholderText("Beschreibung"), {
            target: { value: "2 Liter" },
        });
        fireEvent.change(screen.getByLabelText("Status auswählen"), {
            target: { value: "DONE" },
        });

        fireEvent.click(screen.getByRole("button", { name: /add/i }));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:8080/items",
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }),
        );
        expect(onCreated).toHaveBeenCalledTimes(1);
    });
});