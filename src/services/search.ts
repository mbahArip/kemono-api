import kemonoData from "./data/kemono.json";
import coomerData from "./data/coomer.json";
import { Creator, Service } from "types/data";

export function search(id: string): Creator[] {
  const kemono = (kemonoData as Creator[]).filter(
    (data) =>
      data.id === id || data.name.toLowerCase().includes(id.toLowerCase())
  );
  const coomer = (coomerData as Creator[]).filter(
    (data) =>
      data.id === id || data.name.toLowerCase().includes(id.toLowerCase())
  );

  let data: Creator[] = [...kemono, ...coomer];

  return data;
}

export function checkId(id: string, provider: Service): Creator | null {
  const kemono = (kemonoData as Creator[]).filter(
    (data) => (data.id === id || data.name === id) && data.service === provider
  );
  const coomer = (coomerData as Creator[]).filter(
    (data) => (data.id === id || data.name === id) && data.service === provider
  );

  let data: Creator[] = [...kemono, ...coomer];

  return data.length ? data[0] : null;
}
