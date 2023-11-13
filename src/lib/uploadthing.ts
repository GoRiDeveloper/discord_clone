'use client';

import { generateComponents } from '@uploadthing/react';
import type { OurFileRouter } from '../../app/api/uploadthing/core';

// Uploadthing components.
export const { UploadButton, UploadDropzone, Uploader } =
    generateComponents<OurFileRouter>();
