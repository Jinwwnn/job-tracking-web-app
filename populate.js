import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/UserModel.js';

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('MongoDB Connected...');
  
  const user = await User.findOne({ email: 'john@gmail.com' });
  console.log('User query result:', user);
  
  if (!user) {
    console.log('No user found with email: john@gmail.com');
    console.log('MONGO_URL:', process.env.MONGO_URL); // Check which database we're connecting to
    process.exit(1);
  }
  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}