import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";
import type { OurFileRouter } from "@/controller/uploadThingAPI/uploadThingController";
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();