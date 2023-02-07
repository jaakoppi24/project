import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";
const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return redirectTo("/lists");
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.findAllActive(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const nonCollected1 = await itemService.findAllNonCollected(urlParts[2]);
  const collected1 = await itemService.findAllCollected(urlParts[2]);

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  const data = {
    list: await listService.findById(urlParts[2]),
    nonCollected: nonCollected1.sort(compare),
    collected: collected1.sort(compare),
  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  await listService.deactivate(urlParts[2]);

  return redirectTo("/lists");
};

export { addList, deactivateList, viewList, viewLists };
