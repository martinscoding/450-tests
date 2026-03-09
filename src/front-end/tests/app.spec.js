import { test, expect } from "@playwright/test";

test("Load List: geladene Items werden angezeigt", async ({ page }) => {
  await page.route("http://localhost:8080/items", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: 1, name: "Milch" },
        { id: 2, name: "Brot" }
      ])
    });
  });

  await page.goto("http://localhost:5173");

  await expect(page.getByText("Item List")).toBeVisible();
  await expect(page.getByText("Milch")).toBeVisible();
  await expect(page.getByText("Brot")).toBeVisible();
});

test("Add Item: Benutzer kann ein neues Item hinzufügen", async ({ page }) => {
  let postWasCalled = false;

  await page.route("http://localhost:8080/items", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([])
    });
  });

  await page.route("http://localhost:8080/items/Apfel", async (route) => {
    postWasCalled = true;
    await route.fulfill({
      status: 200,
      body: ""
    });
  });

  await page.goto("http://localhost:5173");

  await page.getByPlaceholder("Itemname").fill("Apfel");
  await page.getByRole("button", { name: /add/i }).click();

  expect(postWasCalled).toBeTruthy();
});

test("Delete Item: Benutzer kann ein Item löschen", async ({ page }) => {
  let deleteWasCalled = false;

  await page.route("http://localhost:8080/items", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: 1, name: "Milch" }
      ])
    });
  });

  await page.route("http://localhost:8080/items/1", async (route) => {
    deleteWasCalled = true;
    await route.fulfill({
      status: 200,
      body: ""
    });
  });

  await page.goto("http://localhost:5173");

  await expect(page.getByText("Milch")).toBeVisible();

  const deleteIcon = page.locator("svg").first();
  await deleteIcon.click();

  expect(deleteWasCalled).toBeTruthy();
});