package ch.wiss.m450.starter_project.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.wiss.m450.starter_project.dto.AddCommentRequest;
import ch.wiss.m450.starter_project.dto.CreateItemRequest;
import ch.wiss.m450.starter_project.dto.UpdateDescriptionRequest;
import ch.wiss.m450.starter_project.dto.UpdateStatusRequest;
import ch.wiss.m450.starter_project.model.Item;
import ch.wiss.m450.starter_project.model.ItemStatus;
import ch.wiss.m450.starter_project.repository.ItemRepository;

@RestController
@RequestMapping("/items")
@CrossOrigin
public class ItemController {
    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping
    public Iterable<Item> getItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<Item> getItem(@PathVariable int itemId) {
        return itemRepository.findById(itemId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Item> addItem(@RequestBody CreateItemRequest request) {
        Item newItem = new Item(
                request.title(),
                Optional.ofNullable(request.description()).orElse(""),
                Optional.ofNullable(request.status()).orElse(ItemStatus.OPEN));
        return ResponseEntity.status(HttpStatus.CREATED).body(itemRepository.save(newItem));
    }

    @PatchMapping("/{itemId}/description")
    public ResponseEntity<Item> updateDescription(
            @PathVariable int itemId,
            @RequestBody UpdateDescriptionRequest request) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    item.updateDescription(Optional.ofNullable(request.description()).orElse(""));
                    return ResponseEntity.ok(itemRepository.save(item));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{itemId}/status")
    public ResponseEntity<Item> updateStatus(
            @PathVariable int itemId,
            @RequestBody UpdateStatusRequest request) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    item.updateStatus(Optional.ofNullable(request.status()).orElse(ItemStatus.OPEN));
                    return ResponseEntity.ok(itemRepository.save(item));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{itemId}/comments")
    public ResponseEntity<Item> addComment(
            @PathVariable int itemId,
            @RequestBody AddCommentRequest request) {
        return itemRepository.findById(itemId)
                .map(item -> {
                    item.addComment(Optional.ofNullable(request.text()).orElse(""));
                    return ResponseEntity.status(HttpStatus.CREATED).body(itemRepository.save(item));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{itemId}")
    public void deleteItem(@PathVariable int itemId) {
        itemRepository.deleteById(itemId);
    }
}