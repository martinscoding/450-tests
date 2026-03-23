package ch.wiss.m450.starter_project.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.only;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ch.wiss.m450.starter_project.dto.AddCommentRequest;
import ch.wiss.m450.starter_project.dto.CreateItemRequest;
import ch.wiss.m450.starter_project.dto.UpdateDescriptionRequest;
import ch.wiss.m450.starter_project.dto.UpdateStatusRequest;
import ch.wiss.m450.starter_project.model.Item;
import ch.wiss.m450.starter_project.model.ItemStatus;
import ch.wiss.m450.starter_project.repository.ItemRepository;

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
        Item item1 = new Item("Milch", "2 Liter", ItemStatus.OPEN);
        item1.setId(1);

        Item item2 = new Item("Brot", "Vollkorn", ItemStatus.IN_PROGRESS);
        item2.setId(2);

        spyItemList.add(item1);
        spyItemList.add(item2);

        when(itemRepository.findAll()).thenReturn(spyItemList);

        Iterable<Item> result = itemController.getItems();

        assertIterableEquals(spyItemList, result);
        verify(itemRepository, times(1)).findAll();
    }

    @Test
    void addItem_savesNewItem_withCorrectData() {
        CreateItemRequest request = new CreateItemRequest("Apfel", "Rot", ItemStatus.OPEN);
        when(itemRepository.save(any(Item.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ResponseEntity<Item> response = itemController.addItem(request);

        verify(itemRepository, times(1)).save(itemCaptor.capture());

        Item capturedItem = itemCaptor.getValue();
        assertEquals("Apfel", capturedItem.getTitle());
        assertEquals("Rot", capturedItem.getDescription());
        assertEquals(ItemStatus.OPEN, capturedItem.getStatus());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    void getItem_returnsRequestedItem() {
        Item item = new Item("Banane", "Gelb", ItemStatus.DONE);
        when(itemRepository.findById(4)).thenReturn(Optional.of(item));

        ResponseEntity<Item> response = itemController.getItem(4);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Banane", response.getBody().getTitle());
    }

    @Test
    void updateDescription_updatesExistingItem() {
        Item item = new Item("Milch", "Alt", ItemStatus.OPEN);
        when(itemRepository.findById(1)).thenReturn(Optional.of(item));
        when(itemRepository.save(any(Item.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ResponseEntity<Item> response = itemController.updateDescription(1, new UpdateDescriptionRequest("Neu"));

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Neu", response.getBody().getDescription());
        verify(itemRepository, times(1)).save(item);
    }

    @Test
    void updateStatus_updatesExistingItem() {
        Item item = new Item("Milch", "Alt", ItemStatus.OPEN);
        when(itemRepository.findById(1)).thenReturn(Optional.of(item));
        when(itemRepository.save(any(Item.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ResponseEntity<Item> response = itemController.updateStatus(1, new UpdateStatusRequest(ItemStatus.DONE));

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(ItemStatus.DONE, response.getBody().getStatus());
        verify(itemRepository, times(1)).save(item);
    }

    @Test
    void addComment_addsCommentToItem() {
        Item item = new Item("Milch", "Alt", ItemStatus.OPEN);
        when(itemRepository.findById(1)).thenReturn(Optional.of(item));
        when(itemRepository.save(any(Item.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ResponseEntity<Item> response = itemController.addComment(1, new AddCommentRequest("Heute kaufen"));

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(1, response.getBody().getComments().size());
        assertEquals("Heute kaufen", response.getBody().getComments().getFirst().getText());
        verify(itemRepository, times(1)).save(item);
    }

    @Test
    void deleteItem_callsRepositoryDeleteById_onlyOnce() {
        itemController.deleteItem(99);

        verify(itemRepository, only()).deleteById(99);
        verifyNoMoreInteractions(itemRepository);
    }
}