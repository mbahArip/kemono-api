# Kemono API

Public API to search or check creators page on `kemono.su`.

UPDATE NOVEMBER 2023:
So Kemono provided their own API, you can check it here: `https://kemono.su/api/schema`.
But the creators data are the txt JSON file, and there is no search or pagination.
If you **want to search or check creators**, you can use this API.
But if you want to check the posts and other things, you can use their API.
I also added scripts to update the creators data from their API, so it would be up to date.

tldr: This API is for searching creators only, not for checking posts.

## Available Endpoints

| Method | Endpoint               | Pagination |
| :----: | :--------------------- | :--------: |
|  GET   | `/kemono`              |     ✅     |
|  GET   | `/kemono/:service`     |     ✅     |
|  GET   | `/kemono/:service/:id` |            |
|  GET   | `/search/:id`          |            |

### Pagination Query

| Query        | Default |
| :----------- | :-----: |
| page         |    1    |
| itemsPerPage |   10    |
| keyword      |         |

## Available Services

### Kemono

| Key           | Name          |
| :------------ | :------------ |
| patreon       | Patreon       |
| fanbox        | Pixiv Fanbox  |
| discord       | Discord       |
| fantia        | Fantia        |
| afdian        | Afdian        |
| boosty        | Boosty        |
| dlsite        | DLsite        |
| gumroad       | Gumroad       |
| subscribestar | SubscribeStar |

## Return Data

```ts
interface Creator {
  favorited: number;
  id: string;
  indexed: number;
  name: string;
  service: Service;
  updated: number;
}
```

### Success

```ts
interface ResponseOK {
  message: string; // Either OK or error message
  timestamp: number; // Date number from Date.now()
  data: Creator[];
  pagination: {
    currentPage: number,
    itemsPerPage: number,
    totalPages: number,
    totalItems: number,
    isNextPage: boolean,
    isPrevPage: boolean;
}
```

### Error

```ts
interface ResponseError {
  message: string;
  timestamp: number;
}
```

## Example

### Get all fanbox creators

```ts
const data = await axios.get<Creator[]>(
  "https://kemono-api.mbaharip.com/kemono/fanbox"
);
```

### Use of pagination

```ts
const data = await axios.get<Creator[]>(
  "https://kemono-api.mbaharip.com/kemono?page=2&itemsPerPage=25"
);
```

### Search query

#### Service Search

Only search from kemono creators.  
If you search it via `/kemono/patreon?keyword=vici`, it only search from patreon service.

```ts
const data = await axios.get<Creator[]>(
  "https://kemono-api.mbaharip.com/kemono?keyword=vici"
);
```

#### Global search

It search keyword from kemono creators.

```ts
const data = await axios.get<Creator[]>(
  "https://kemono-api.mbaharip.com/search?keyword=vici"
);
```
