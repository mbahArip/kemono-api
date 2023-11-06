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

  const kemono = (kemonoData as Creator[]).filter(
    (data) =>
      data.id === id || data.name.toLowerCase().includes(id.toLowerCase())
  );
  const coomer = (coomerData as Creator[]).filter(
    (data) =>
      data.id === id || data.name.toLowerCase().includes(id.toLowerCase())
  );

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
    (data) => (data.id === id || data.name === id) && data.service === provider
  );
  const coomer = (coomerData as Creator[]).filter(
    (data) => (data.id === id || data.name === id) && data.service === provider
  );

  let data: Creator[] = [...kemono, ...coomer];

  return data.length ? data[0] : null;
}
