import { Creator, ServiceEnum, ServiceKemono } from "@/types/data";
import data from "./data/kemono.json";

export function getAll(
  query: string = "",
  page: number = 1,
  itemsPerPage: number = 10
): Creator[] {
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

  return filterData.slice(dataStart, dataEnd);
}

export function getByService(
  service: ServiceKemono,
  query: string = "",
  page: number = 1,
  itemsPerPage: number = 10
): Creator[] {
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

  return filterData.slice(dataStart, dataEnd);
}

export function getById(id: string, service: ServiceKemono): Creator | null {
  let filterData: Creator[] = (data as Creator[]).filter(
    (creator) =>
      creator.service === service && (creator.id === id || creator.name === id)
  );

  return filterData[0];
}
