import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";
import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as mainController from "./controllers/mainController.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await mainController.showStatistics();
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await listController.viewList(request);
  } else if (
    url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") &&
    request.method === "POST"
  ) {
    return await itemController.collectItem(request);
  } else if (
    url.pathname.match("/lists/[0-9]+/items") && request.method === "POST"
  ) {
    return await itemController.createItem(request);
  } else if (url.pathname.match("/lists/[0-9]+/deactivate")) {
    return await listController.deactivateList(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
