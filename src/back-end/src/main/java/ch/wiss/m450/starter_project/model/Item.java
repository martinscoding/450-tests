package ch.wiss.m450.starter_project.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private ItemStatus status;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id")
    private List<ItemComment> comments = new ArrayList<>();

    public Item() {
    }

    public Item(String title) {
        this(title, "", ItemStatus.OPEN);
    }

    public Item(String title, String description, ItemStatus status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ItemStatus getStatus() {
        return status;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }

    public List<ItemComment> getComments() {
        return comments;
    }

    public void setComments(List<ItemComment> comments) {
        this.comments = comments;
    }

    public void updateDescription(String description) {
        this.description = description;
    }

    public void updateStatus(ItemStatus status) {
        this.status = status;
    }

    public void addComment(String text) {
        this.comments.add(new ItemComment(text));
    }
}