import { useState, useCallback, Suspense, lazy, useOptimistic } from 'react';
import { useUploadFile } from 'better-upload/client';
import { UploadButton } from '@/components/ui/upload-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trans } from '@lingui/react/macro';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { User } from 'lucide-react';
import { toast } from 'sonner';

const AvatarCropDialog = lazy(() =>
    import('@/components/ui/avatar-crop-dialog').then((module) => ({
        default: module.AvatarCropDialog,
    })),
);

interface AvatarUploadProps {
    currentImage?: string;
    onUploadSuccess?: (url: string) => void;
    onUploadError?: (error: string) => void;
}

// Helper function to ensure we have a full URL for avatars
const getFullAvatarUrl = (imageUrl: string | null | undefined): string | null => {
    if (!imageUrl) return null;

    // If it's already a full URL, return as-is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    // If it looks like an S3 object key, construct the full URL
    if (imageUrl.startsWith('avatars/')) {
        return `${import.meta.env.VITE_S3_PUBLIC_URL}/${imageUrl}`;
    }

    // For any other case, return as-is (might be a relative URL or base64)
    return imageUrl;
};

export function AvatarUpload({ currentImage, onUploadSuccess, onUploadError }: AvatarUploadProps) {
    const fullCurrentImageUrl = getFullAvatarUrl(currentImage);
    const [previousUrl, setPreviousUrl] = useState<string | null>(fullCurrentImageUrl);
    const [cropDialogOpen, setCropDialogOpen] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
    const { _ } = useLingui();

    // Optimistic avatar URL for immediate preview
    const [optimisticAvatarUrl, setOptimisticAvatarUrl] = useOptimistic(
        fullCurrentImageUrl,
        (_currentUrl, newUrl: string | null) => newUrl,
    );

    const { control } = useUploadFile({
        api: `${import.meta.env.VITE_AUTH_URL}/api/upload`,
        route: 'avatar',
        onUploadComplete: (data) => {
            const uploadedFile = data.file;
            if (uploadedFile) {
                // Use the full URL if provided by the server, otherwise construct it
                const fileUrl =
                    (uploadedFile as any).url || `${import.meta.env.VITE_S3_PUBLIC_URL}/${uploadedFile.objectKey}`;

                setOptimisticAvatarUrl(fileUrl);
                setPreviousUrl(fileUrl); // Update previous URL to new uploaded image
                onUploadSuccess?.(fileUrl);
                toast.success(_(msg`Avatar uploaded successfully`));
            }
        },
    });

    const handleFileSelection = useCallback(
        (file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setSelectedImageSrc(result);
                setPreviousUrl(optimisticAvatarUrl);
                setOptimisticAvatarUrl(result);
                setCropDialogOpen(true);
            };
            reader.readAsDataURL(file);
        },
        [optimisticAvatarUrl],
    );

    const handleCropComplete = useCallback(
        (croppedFile: File) => {
            // Show optimistic preview of cropped image immediately
            const reader = new FileReader();
            reader.onload = (e) => {
                const croppedImageUrl = e.target?.result as string;
                setOptimisticAvatarUrl(croppedImageUrl);
            };
            reader.readAsDataURL(croppedFile);

            // Upload the cropped file
            control.upload(croppedFile).catch((error) => {
                console.error('Avatar upload error:', error);
                let errorMessage = error.message || _(msg`Upload failed`);

                // Handle authentication errors specifically
                if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
                    errorMessage = _(msg`Authentication required. Please log in again.`);
                }

                // Revert optimistic update on upload failure
                setOptimisticAvatarUrl(previousUrl);

                onUploadError?.(errorMessage);
                toast.error(errorMessage);
            });
        },
        [control, _, previousUrl, onUploadError, setOptimisticAvatarUrl],
    );

    const handleCropCancel = useCallback(() => {
        setSelectedImageSrc(null);
        // Revert to previous avatar
        setOptimisticAvatarUrl(previousUrl);
    }, [previousUrl, setOptimisticAvatarUrl]);

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={optimisticAvatarUrl || undefined} alt="Avatar" />
                    <AvatarFallback className="text-xl">
                        <User className="h-8 w-8" />
                    </AvatarFallback>
                </Avatar>

                {control.isPending && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center space-y-2">
                <UploadButton
                    control={control}
                    accept="image/jpeg,image/png,image/webp"
                    uploadOverride={(file) => {
                        handleFileSelection(file);
                        // Don't upload immediately, let the crop dialog handle it
                        return Promise.resolve();
                    }}
                />
                <p className="text-xs text-muted-foreground text-center">
                    <Trans>JPG, PNG or WebP. Max 2MB.</Trans>
                </p>
            </div>

            {selectedImageSrc && (
                <Suspense
                    fallback={
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                <span className="text-sm">
                                    <Trans>Loading image editor...</Trans>
                                </span>
                            </div>
                        </div>
                    }
                >
                    <AvatarCropDialog
                        open={cropDialogOpen}
                        onOpenChange={setCropDialogOpen}
                        imageSrc={selectedImageSrc}
                        onCropComplete={handleCropComplete}
                        onCancel={handleCropCancel}
                    />
                </Suspense>
            )}
        </div>
    );
}
