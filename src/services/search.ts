import { readFile } from "fs/promises";
import path from "path";
import { Creator, Service } from "types/data";
// import coomerData from "./data/coomer.json";
// import kemonoData from "./data/kemono.json";

export async function search(id: string): Promise<{
  data: Creator[];
  length: number;
}> {
  const staticPath = path.join(process.cwd(), "static");
  const coomerData = JSON.parse(
    await readFile(path.join(staticPath, "coomer.json"), "utf-8")
  );
  const kemonoData = JSON.parse(
    await readFile(path.join(staticPath, "kemono.json"), "utf-8")
  );

  const kemono:Creator[] = (kemonoData as Creator[]).filter(
    (data) =>
      data.id === id || data.name.toLowerCase().includes(id.toLowerCase())
  ).map((item) => ({...item, url: `https://coomer.su/${item.service}/user/${item.id}`}));
  const coomer:Creator[] = (coomerData as Creator[]).filter(
    (data) =>
      data.id === id || data.name.toLowerCase().includes(id.toLowerCase())
  ).map((item) => ({...item, url: `https://coomer.su/${item.service}/user/${item.id}`}));

  let data: Creator[] = [...kemono, ...coomer];

  return { data, length: data.length };
}

export async function checkId(
  id: string,
  provider: Service
): Promise<Creator | null> {
  const staticPath = path.join(process.cwd(), "static");
  const coomerData = JSON.parse(
    await readFile(path.join(staticPath, "coomer.json"), "utf-8")
  );
  const kemonoData = JSON.parse(
    await readFile(path.join(staticPath, "kemono.json"), "utf-8")
  );

  const kemono = (kemonoData as Creator[]).filter(
    (data) => (data.id === id || data.name.toLowerCase() === id.toLowerCase()) && data.service === provider
  ).map((item) => ({...item, url: `https://coomer.su/${item.service}/user/${item.id}`}));
  const coomer = (coomerData as Creator[]).filter(
    (data) => (data.id === id || data.name.toLowerCase() === id.toLowerCase()) && data.service === provider
  ).map((item) => ({...item, url: `https://coomer.su/${item.service}/user/${item.id}`}));

  let data: Creator[] = [...kemono, ...coomer];

  return data.length ? data[0] : null;
}
