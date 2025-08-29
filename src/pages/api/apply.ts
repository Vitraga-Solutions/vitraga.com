import type { APIRoute } from 'astro';
import { getJobById, submitJobApplication, supabase, uploadResume } from '../../lib/supabase';
import { formatApplicationData, sanitizeApplicationData, validateApplicationData } from '../../utils/validation';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();

        // Extract job_id and other form fields
        const jobId = parseInt(formData.get('job_id') as string);
        const resume = formData.get('resume') as File;

        if (!jobId) {
            return new Response(JSON.stringify({ error: 'Job ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get job details for validation
        const job = await getJobById(jobId);
        if (!job) {
            return new Response(JSON.stringify({ error: 'Job not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Build application data object
        const rawData: any = {};

        // Process all form fields except the resume file
        for (const [key, value] of formData.entries()) {
            if (key !== 'resume' && key !== 'job_id') {
                // Handle multiple values for checkboxes
                if (rawData[key]) {
                    if (Array.isArray(rawData[key])) {
                        rawData[key].push(value);
                    } else {
                        rawData[key] = [rawData[key], value];
                    }
                } else {
                    rawData[key] = value;
                }
            }
        }

        // Add resume to validation data if present
        if (resume && resume.size > 0) {
            rawData.resume = resume;
        }

        // Validate the application data
        const validation = validateApplicationData(rawData, job.fields || []);
        if (!validation.isValid) {
            return new Response(JSON.stringify({
                error: 'Validation failed',
                details: validation.errors
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Sanitize the data
        const sanitizedData = sanitizeApplicationData(rawData, job.fields || []);
        const applicationData = formatApplicationData(sanitizedData);

        // First, submit the application to get an ID
        const applicationResult = await submitJobApplication(jobId, applicationData);

        if (!applicationResult.success) {
            return new Response(JSON.stringify({ error: applicationResult.error }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        let resumeUrl = null;

        // If resume is provided, upload it
        if (resume && resume.size > 0) {
            resumeUrl = await uploadResume(resume, applicationResult.applicationId!.toString());

            if (resumeUrl) {
                // Update the application with the resume URL
                const { error: updateError } = await supabase
                    .from('job_applications')
                    .update({
                        data: {
                            ...applicationData,
                            resume_url: resumeUrl
                        }
                    })
                    .eq('id', applicationResult.applicationId);

                if (updateError) {
                    console.error('Error updating application with resume URL:', updateError);
                }
            }
        }

        return new Response(JSON.stringify({
            success: true,
            applicationId: applicationResult.applicationId,
            resumeUrl
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error processing application:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
