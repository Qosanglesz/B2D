import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/controller/uploadThingAPI/uploadThingController";


export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
});