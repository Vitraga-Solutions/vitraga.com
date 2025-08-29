// Test script to verify Supabase Storage configuration
// Run this in your browser console on the careers page to test

import { checkStorageBucketConfig } from '../lib/supabase.js';

async function testStorageConfig() {
    console.log('Testing storage bucket configuration...');
    
    const result = await checkStorageBucketConfig();
    
    if (result.isConfigured) {
        console.log('✅ Storage bucket is properly configured!');
    } else {
        console.error('❌ Storage bucket configuration issue:', result.error);
        console.log('Please run the SQL commands in supabase-storage-setup.sql');
    }
    
    return result;
}

// Auto-run the test
testStorageConfig();
