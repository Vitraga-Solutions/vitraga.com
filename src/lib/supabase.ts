import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Job {
    id: number;
    title: string;
    description: string | null;
    is_active: boolean;
    fields: any[] | null;
    created_at: string;
}

export interface JobApplication {
    id: number;
    job_id: number;
    data: any;
    created_at: string;
}

// Function to fetch all active jobs
export async function getActiveJobs(): Promise<Job[]> {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }

    return data || [];
}

// Function to fetch a specific job by ID
export async function getJobById(id: number): Promise<Job | null> {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching job:', error);
        return null;
    }

    return data;
}

// Function to upload resume file
export async function uploadResume(file: File, applicationId: string): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${applicationId}-resume.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    const { error } = await supabase.storage
        .from('job-applications')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) {
        console.error('Error uploading resume:', error);
        return null;
    }

    // Get public URL
    const { data } = supabase.storage
        .from('job-applications')
        .getPublicUrl(filePath);

    return data.publicUrl;
}

// Function to submit job application
export async function submitJobApplication(jobId: number, applicationData: any): Promise<{ success: boolean; applicationId?: number; error?: string }> {
    try {
        const { data, error } = await supabase
            .from('job_applications')
            .insert({
                job_id: jobId,
                data: applicationData
            })
            .select()
            .single();

        if (error) {
            console.error('Error submitting application:', error);
            return { success: false, error: error.message };
        }

        return { success: true, applicationId: data.id };
    } catch (error) {
        console.error('Error submitting application:', error);
        return { success: false, error: 'Failed to submit application' };
    }
}
