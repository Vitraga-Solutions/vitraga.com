// Utility functions for form validation and data processing

export interface FieldDefinition {
    name: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
}

export function validateApplicationData(data: any, fields: FieldDefinition[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const field of fields) {
        const value = data[field.name];

        // Check required fields
        if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
            errors.push(`${field.label} is required`);
            continue;
        }

        // Type-specific validations
        switch (field.type) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    errors.push(`${field.label} must be a valid email address`);
                }
                break;

            case 'number':
                if (value && isNaN(Number(value))) {
                    errors.push(`${field.label} must be a valid number`);
                }
                break;

            case 'file':
                if (field.name === 'resume' && value && value instanceof File) {
                    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                    if (!validTypes.includes(value.type)) {
                        errors.push(`${field.label} must be a PDF, DOC, or DOCX file`);
                    }

                    // Check file size (5MB limit)
                    if (value.size > 5 * 1024 * 1024) {
                        errors.push(`${field.label} must be smaller than 5MB`);
                    }
                }
                break;

            case 'select':
            case 'radio':
                if (value && field.options && !field.options.includes(value)) {
                    errors.push(`${field.label} must be one of the available options`);
                }
                break;

            case 'checkbox':
                if (value && field.options) {
                    const values = Array.isArray(value) ? value : [value];
                    const invalidValues = values.filter(v => !field.options!.includes(v));
                    if (invalidValues.length > 0) {
                        errors.push(`${field.label} contains invalid options: ${invalidValues.join(', ')}`);
                    }
                }
                break;
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export function sanitizeApplicationData(data: any, fields: FieldDefinition[]): any {
    const sanitized: any = {};

    for (const field of fields) {
        const value = data[field.name];

        if (value !== undefined && value !== null) {
            switch (field.type) {
                case 'text':
                case 'email':
                case 'textarea':
                    sanitized[field.name] = typeof value === 'string' ? value.trim() : String(value).trim();
                    break;

                case 'number':
                    sanitized[field.name] = Number(value);
                    break;

                case 'checkbox':
                    sanitized[field.name] = Array.isArray(value) ? value : [value];
                    break;

                default:
                    sanitized[field.name] = value;
                    break;
            }
        }
    }

    return sanitized;
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function formatApplicationData(data: any): any {
    // Convert any File objects to strings (for storage)
    const formatted = { ...data };

    for (const key in formatted) {
        if (formatted[key] instanceof File) {
            formatted[key] = `[File: ${formatted[key].name}]`;
        }
    }

    return formatted;
}
