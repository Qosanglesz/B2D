import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./uploadThingController";


export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
});