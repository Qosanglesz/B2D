import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "4MB",maxFileCount:5 } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This middleware now skips auth and allows uploads without validation
            // If you want some logic here, like rate-limiting or other checks, you can add it
            return {};  // No metadata needed if you don't have authentication
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after the upload completes
            console.log("Upload complete!");

            console.log("file url", file.url);

            // Optionally return any data you'd like to the client
            return { uploadedFile: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
