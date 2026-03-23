package ch.wiss.m450.starter_project.dto;

import ch.wiss.m450.starter_project.model.ItemStatus;

public record UpdateStatusRequest(ItemStatus status) {
}