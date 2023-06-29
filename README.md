# Kemono API

Public API to search or check gallery page on `kemono.party` / `coomer.party`.

## Available Endpoints

| Method | Endpoint               | Pagination |
| :----: | :--------------------- | :--------: |
|  GET   | `/kemono`              |     ✅     |
|  GET   | `/kemono/:service`     |     ✅     |
|  GET   | `/kemono/:service/:id` |            |
|  GET   | `/coomer`              |     ✅     |
|  GET   | `/coomer/:service`     |     ✅     |
|  GET   | `/coomer/:service/:id` |            |
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

### Coomer

| Key      | Name     |
| :------- | :------- |
| onlyfans | OnlyFans |
| fansly   | Fansly   |

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

Only search from kemono / coomer creators.  
If you search it via `/kemono/patreon?keyword=vici`, it only search from patreon service.

```ts
const data = await axios.get<Creator[]>(
  "https://kemono-api.mbaharip.com/kemono?keyword=vici"
);
```

#### Global search

It search keyword from kemono & coomer creators.

```ts
const data = await axios.get<Creator[]>(
  "https://kemono-api.mbaharip.com/search?keyword=vici"
);
```
