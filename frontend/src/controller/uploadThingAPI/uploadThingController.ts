import {createUploadthing, type FileRouter} from "uploadthing/next";


const f = createUploadthing();

// Define the controller class
class UploadController {
    public fileRouter: FileRouter;

    constructor() {
        this.fileRouter = {
            imageUploader: f({image: {maxFileSize: "4MB", maxFileCount: 5}})
                .middleware(this.middleware)
                .onUploadComplete(this.onUploadComplete)
        } satisfies FileRouter;
    }

    // Middleware logic
    async middleware({req}: { req: Request }) {
        return {};
    }

    // Handle file upload completion
    async onUploadComplete({metadata, file}: { metadata: any; file: any }) {
        // This code runs on the server after the upload completes
        console.log("Upload complete!");

        // console.log("File URL:", file.url);
        // Optionally return some data to the client

    }
}

// Export the file router from the controller instance
const uploadController = new UploadController();
export const ourFileRouter = uploadController.fileRouter;

export type OurFileRouter = typeof ourFileRouter;
