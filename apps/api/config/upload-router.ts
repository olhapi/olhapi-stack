import { type Router, route } from 'better-upload/server';
import { bucketName, publicBucketName, s3Client } from './s3.ts';

// Unified upload router with declarative configuration
export const uploadRouter: Router = {
    client: s3Client,
    bucketName, // Default to private bucket
    routes: {
        avatar: route({
            multipleFiles: false,
            maxFileSize: 1024 * 1024 * 2, // 2MB
            fileTypes: ['image/jpeg', 'image/png', 'image/webp'],
            onBeforeUpload: async ({ file }) => {
                return {
                    bucketName: publicBucketName, // Use public bucket for avatars
                    generateObjectInfo: () => ({
                        key: `avatars/${crypto.randomUUID()}-${file.name}`,
                    }),
                };
            },
        }),
        documents: route({
            // Uses default private bucket
            multipleFiles: false,
            maxFileSize: 1024 * 1024 * 25, // 25MB
            fileTypes: [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ],
            onBeforeUpload: async ({ file }) => {
                return {
                    bucketName, // Ensure using private bucket for documents
                    generateObjectInfo: () => ({
                        key: `documents/${crypto.randomUUID()}-${file.name}`,
                    }),
                };
            },
        }),
    },
};
