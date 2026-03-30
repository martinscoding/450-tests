export const API_URL = 'http://localhost:8080/items';

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return null;
}

export async function getItems() {
  const response = await fetch(API_URL);
  return handleResponse(response);
}

export async function getItem(itemId) {
  const response = await fetch(`${API_URL}/${itemId}`);
  return handleResponse(response);
}

export async function createItem(item) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  return handleResponse(response);
}

export async function deleteItem(itemId) {
  const response = await fetch(`${API_URL}/${itemId}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
}

export async function updateItemDescription(itemId, description) {
  const response = await fetch(`${API_URL}/${itemId}/description`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  return handleResponse(response);
}

export async function updateItemStatus(itemId, status) {
  const response = await fetch(`${API_URL}/${itemId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  return handleResponse(response);
}

export async function createComment(itemId, text) {
  const response = await fetch(`${API_URL}/${itemId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  return handleResponse(response);
}
