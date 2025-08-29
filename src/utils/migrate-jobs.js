// Migration script to populate Supabase with existing jobs data
// Run this once to migrate your static jobs data to Supabase

import { jobs } from '../data/jobsData.js';
import { supabase } from '../lib/supabase.js';

async function migrateJobs() {
  console.log('Starting job migration...');
  
  for (const job of jobs) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          id: job.id,
          title: job.title,
          description: job.description,
          is_active: job.is_active,
          fields: job.fields
        });

      if (error) {
        console.error(`Error inserting job ${job.id}:`, error);
      } else {
        console.log(`Successfully inserted job: ${job.title}`);
      }
    } catch (err) {
      console.error(`Failed to insert job ${job.id}:`, err);
    }
  }
  
  console.log('Migration completed!');
}

// Uncomment the line below and run this script to migrate your data
// migrateJobs();

export { migrateJobs };
