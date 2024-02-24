import { Creator, ServiceCoomer } from "@/types/data";
// import data from "static/coomer.json";
import { readFile } from "fs/promises";
import path from "path";

export async function getAll(
  query: string = "",
  page: number = 1,
  itemsPerPage: number = 10
): Promise<{
  data: Creator[];
  length: number;
}> {
  const staticPath = path.join(process.cwd(), "static");
  const data = JSON.parse(
    await readFile(path.join(staticPath, "coomer.json"), "utf-8")
  );

  const dataStart = (page - 1) * itemsPerPage;
  const dataEnd = dataStart + itemsPerPage;
  let filterData: Creator[] = (data as Creator[]).sort(
    (a, b) => b.favorited - a.favorited
  );
  const dataLength = filterData.length;
  const totalPage = Math.ceil(dataLength / itemsPerPage);
  if (page > totalPage) {
    throw new Error("Page are out of range, please check your page number");
  }

  if (query) {
    filterData = (data as Creator[]).filter((creator: Creator) => {
      return (
        creator.name.toLowerCase().includes(query.toLowerCase()) ||
        creator.id.toLowerCase().includes(query.toLowerCase()) ||
        creator.service.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  return { data: filterData.slice(dataStart, dataEnd), length: dataLength };
}

export async function getByService(
  service: ServiceCoomer,
  query: string = "",
  page: number = 1,
  itemsPerPage: number = 10
): Promise<{
  data: Creator[];
  length: number;
}> {
  const staticPath = path.join(process.cwd(), "static");
  const data = JSON.parse(
    await readFile(path.join(staticPath, "coomer.json"), "utf-8")
  );

  const dataStart = (page - 1) * itemsPerPage;
  const dataEnd = dataStart + itemsPerPage;
  let filterData: Creator[] = (data as Creator[])
    .sort((a, b) => b.favorited - a.favorited)
    .filter((creator: Creator) => {
      return creator.service === service;
    });

  const dataLength = filterData.length;
  const totalPage = Math.ceil(dataLength / itemsPerPage);
  if (page > totalPage) {
    throw new Error("Page are out of range, please check your page number");
  }

  if (query) {
    filterData = (data as Creator[]).filter((creator: Creator) => {
      return (
        creator.name.toLowerCase().includes(query.toLowerCase()) ||
        creator.id.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  return { data: filterData.slice(dataStart, dataEnd), length: dataLength };
}

export async function getById(
  id: string,
  service: ServiceCoomer
): Promise<Creator | null> {
  const staticPath = path.join(process.cwd(), "static");
  const data = JSON.parse(
    await readFile(path.join(staticPath, "coomer.json"), "utf-8")
  );

  let filterData: Creator[] = (data as Creator[]).filter(
    (creator) => creator.service === service && creator.id === id
  );

  return filterData[0];
}
