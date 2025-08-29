// Client-side file upload utilities
export interface FileUploadConfig {
    maxFileSize: number;
    allowedFileTypes: string[];
    allowMultiple?: boolean;
}

export interface FileUploadResult {
    success: boolean;
    url?: string;
    error?: string;
    fileName?: string;
}

export interface FileValidationResult {
    isValid: boolean;
    error?: string;
}


export const FILE_CONFIGS = {
    resume: {
        maxFileSize: 6 * 1024 * 1024, 
        allowedFileTypes: ['.pdf', '.doc', '.docx'],
        allowMultiple: false
    },
    document: {
        maxFileSize: 6 * 1024 * 1024,
        allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt'],
        allowMultiple: false
    },
    image: {
        maxFileSize: 5 * 1024 * 1024, 
        allowedFileTypes: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
        allowMultiple: false
    },
    portfolio: {
        maxFileSize: 6 * 1024 * 1024,
        allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
        allowMultiple: true
    }
};

/**
 * Validate a file against the specified configuration
 */
export function validateFile(file: File, config: FileUploadConfig): FileValidationResult {
    if (file.size > config.maxFileSize) {
        const maxSizeMB = (config.maxFileSize / (1024 * 1024)).toFixed(1);
        return {
            isValid: false,
            error: `File size must be less than ${maxSizeMB}MB. Current size: ${(file.size / (1024 * 1024)).toFixed(1)}MB`
        };
    }

    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!config.allowedFileTypes.includes(fileExt)) {
        return {
            isValid: false,
            error: `File type "${fileExt}" not allowed. Allowed types: ${config.allowedFileTypes.join(', ')}`
        };
    }

    return { isValid: true };
}

/**
 * Validate multiple files
 */
export function validateFiles(files: FileList | File[], config: FileUploadConfig): FileValidationResult[] {
    const results: FileValidationResult[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        results.push(validateFile(file, config));
    }

    return results;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Create a file input element with validation
 */
export function createFileInput(options: {
    fieldName: string;
    config: FileUploadConfig;
    required?: boolean;
    onFileSelect?: (files: FileList | null, validation: FileValidationResult[]) => void;
    onValidationError?: (errors: string[]) => void;
}): HTMLInputElement {

    const { fieldName, config, required = false, onFileSelect, onValidationError } = options;

    const input = document.createElement('input');
    input.type = 'file';
    input.name = fieldName;
    input.required = required;
    input.multiple = config.allowMultiple || false;
    input.accept = config.allowedFileTypes.join(',');
    input.className = 'w-full px-4 py-3 border border-gray-300 rounded-[14px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-[14px] file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100';

    // Add validation on file selection
    input.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if (files && files.length > 0) {
            const validationResults = validateFiles(files, config);
            const errors = validationResults
                .filter(result => !result.isValid)
                .map(result => result.error!);

            if (errors.length > 0) {
                // Clear the input if validation fails
                target.value = '';
                if (onValidationError) {
                    onValidationError(errors);
                }
            }

            if (onFileSelect) {
                onFileSelect(files, validationResults);
            }
        } else {
            if (onFileSelect) {
                onFileSelect(null, []);
            }
        }
    });

    return input;
}

/**
 * Show file upload progress (if needed for future enhancements)
 */
export function showUploadProgress(fileName: string, progress: number): void {
    // This could be enhanced to show actual progress bars
    console.log(`Uploading ${fileName}: ${progress}%`);
}

/**
 * Handle file upload errors gracefully
 */
export function handleFileUploadError(error: string, fileName?: string): void {
    const message = fileName
        ? `Failed to upload ${fileName}: ${error}`
        : `Upload failed: ${error}`;

    // You can customize this to show toast notifications, etc.
    console.error(message);
    alert(message);
}

/**
 * Create a file preview element
 */
export function createFilePreview(file: File): HTMLElement {
    const preview = document.createElement('div');
    preview.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg border';

    const fileInfo = document.createElement('div');
    fileInfo.className = 'flex items-center space-x-3';

    const icon = document.createElement('div');
    icon.className = 'w-8 h-8 bg-blue-100 rounded flex items-center justify-center';
    icon.innerHTML = '📄';

    const details = document.createElement('div');
    details.innerHTML = `
        <div class="text-sm font-medium text-gray-900">${file.name}</div>
        <div class="text-xs text-gray-500">${formatFileSize(file.size)}</div>
    `;

    fileInfo.appendChild(icon);
    fileInfo.appendChild(details);
    preview.appendChild(fileInfo);

    return preview;
}
