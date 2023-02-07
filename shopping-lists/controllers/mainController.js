import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const showStatistics = async () => {
  const data = {
    numOfLists: await listService.countLists(),
    numOfItems: await itemService.countItems(),
  };
  return new Response(await renderFile("main.eta", data), responseDetails);
};

export { showStatistics };
