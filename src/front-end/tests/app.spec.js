import { expect, test } from "@playwright/test";

test("Item-Details werden geladen und angezeigt", async ({ page }) => {
  await page.route("http://localhost:8080/items", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([{ id: 1, title: "Milch", status: "OPEN" }]),
    });
  });

  await page.route("http://localhost:8080/items/1", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: 1,
        title: "Milch",
        description: "2 Liter",
        status: "OPEN",
        comments: [{ id: 1, text: "Heute kaufen" }],
      }),
    });
  });

  await page.goto("http://localhost:5173");

  await expect(page.getByText("Item Details")).toBeVisible();
  await expect(page.getByText("Milch")).toBeVisible();
  await expect(page.getByText("Heute kaufen")).toBeVisible();
});

test("Benutzer kann den Status ändern", async ({ page }) => {
  let patchWasCalled = false;

  await page.route("http://localhost:8080/items", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([{ id: 1, title: "Milch", status: "OPEN" }]),
    });
  });

  await page.route("http://localhost:8080/items/1", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: 1,
        title: "Milch",
        description: "2 Liter",
        status: "OPEN",
        comments: [],
      }),
    });
  });

  await page.route("http://localhost:8080/items/1/status", async (route) => {
    patchWasCalled = true;
    await route.fulfill({ status: 200, body: "" });
  });

  await page.goto("http://localhost:5173");

  await page.getByLabel("Status").selectOption("DONE");
  await page.getByRole("button", { name: /status speichern/i }).click();

  expect(patchWasCalled).toBeTruthy();
});

test("Benutzer kann Kommentare hinzufügen", async ({ page }) => {
  let commentWasCalled = false;

  await page.route("http://localhost:8080/items", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([{ id: 1, title: "Milch", status: "OPEN" }]),
    });
  });

  await page.route("http://localhost:8080/items/1", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: 1,
        title: "Milch",
        description: "2 Liter",
        status: "OPEN",
        comments: [],
      }),
    });
  });

  await page.route("http://localhost:8080/items/1/comments", async (route) => {
    commentWasCalled = true;
    await route.fulfill({ status: 201, body: "" });
  });

  await page.goto("http://localhost:5173");

  await page.getByPlaceholder("Kommentar eingeben").fill("Heute kaufen");
  await page.getByRole("button", { name: /kommentar hinzufügen/i }).click();

  expect(commentWasCalled).toBeTruthy();
});