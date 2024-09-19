import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react';

export const { useUploadThing, uploadFiles, createUpload, getRouteConfig } =
  generateReactHelpers<OurFileRouter>();
