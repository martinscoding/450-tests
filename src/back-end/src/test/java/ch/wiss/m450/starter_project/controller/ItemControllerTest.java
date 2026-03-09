package ch.wiss.m450.starter_project.controller;

import ch.wiss.m450.starter_project.model.Item;
import ch.wiss.m450.starter_project.repository.ItemRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ItemControllerTest {

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private ItemController itemController;

    @Captor
    private ArgumentCaptor<Item> itemCaptor;

    @Spy
    private List<Item> spyItemList = new ArrayList<>();

    @Test
    void getItems_returnsAllItems_fromRepository() {
        Item item1 = new Item("Milch");
        item1.setId(1);

        Item item2 = new Item("Brot");
        item2.setId(2);

        spyItemList.add(item1);
        spyItemList.add(item2);

        when(itemRepository.findAll()).thenReturn(spyItemList);

        Iterable<Item> result = itemController.getItems();

        assertIterableEquals(spyItemList, result);
        verify(itemRepository, times(1)).findAll();

        verify(spyItemList, times(2)).add(any(Item.class));
        verify(spyItemList, never()).clear();
    }

    @Test
    void addItem_savesNewItem_withCorrectName() {
        itemController.addItem("Apfel");

        verify(itemRepository, times(1)).save(itemCaptor.capture());

        Item capturedItem = itemCaptor.getValue();
        assertEquals("Apfel", capturedItem.getName());
    }

    @Test
    void addItem_savesExactlyOneItem() {
        itemController.addItem("Banane");

        verify(itemRepository, times(1)).save(any(Item.class));
        verifyNoMoreInteractions(itemRepository);
    }

    @Test
    void deleteItem_callsRepositoryDeleteById() {
        itemController.deleteItem(5);

        verify(itemRepository, times(1)).deleteById(5);
    }

    @Test
    void deleteItem_callsRepositoryDeleteById_onlyOnce() {
        itemController.deleteItem(99);

        verify(itemRepository, only()).deleteById(99);
    }
}