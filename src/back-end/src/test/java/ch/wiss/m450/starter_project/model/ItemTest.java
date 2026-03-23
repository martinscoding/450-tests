package ch.wiss.m450.starter_project.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class ItemTest {

    @Test
    void constructor_setsDefaultValues() {
        Item item = new Item("Brot");

        assertEquals("Brot", item.getTitle());
        assertEquals("", item.getDescription());
        assertEquals(ItemStatus.OPEN, item.getStatus());
        assertEquals(0, item.getComments().size());
    }

    @Test
    void updateMethodsAndComments_work() {
        Item item = new Item();
        item.setId(3);
        item.setTitle("Apfel");
        item.updateDescription("Frische Äpfel kaufen");
        item.updateStatus(ItemStatus.DONE);

        assertEquals(3, item.getId());
        assertEquals("Apfel", item.getTitle());
        assertEquals("Frische Äpfel kaufen", item.getDescription());
        assertEquals(ItemStatus.DONE, item.getStatus());
    }
}