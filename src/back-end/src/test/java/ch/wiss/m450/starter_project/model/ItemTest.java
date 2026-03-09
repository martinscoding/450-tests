package ch.wiss.m450.starter_project.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ItemTest {

    @Test
    void constructor_setsName() {
        Item item = new Item("Brot");
        assertEquals("Brot", item.getName());
    }

    @Test
    void settersAndGetters_work() {
        Item item = new Item();
        item.setId(3);
        item.setName("Apfel");

        assertEquals(3, item.getId());
        assertEquals("Apfel", item.getName());
    }
}