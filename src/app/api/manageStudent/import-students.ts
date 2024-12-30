// pages/api/manageStudent/import-students.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import readline from 'readline';
import { IncomingMessage } from 'http';

const prisma = new PrismaClient();

// Create a handler for file uploads
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Check if the request contains files
      if (!req.headers['content-type']?.includes('multipart/form-data')) {
        return res.status(400).json({ error: 'Invalid content type' });
      }

      const formData: { file: any } = await parseFormData(req);
      if (!formData.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const filePath = formData.file[0]?.filepath;

      if (!filePath) {
        return res.status(400).json({ error: 'No file path found' });
      }

      // Read and parse the CSV file using readline
      const students: any[] = [];

      const fileStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity, // Handle newlines correctly
      });

      rl.on('line', (line) => {
        // Split by commas for CSV and store the student data
        const [name, mykad, studentClass] = line.split(',');
        students.push({ name, mykad, class: studentClass });
      });

      rl.on('close', async () => {
        try {
          // Insert the students into the database
          await prisma.student.createMany({
            data: students,
          });
          res.status(200).json({ message: 'Students imported successfully' });
        } catch (error) {
          console.error('Error importing students:', error);
          res.status(500).json({ error: 'Error saving students to the database' });
        } finally {
          // Clean up the uploaded file after processing
          fs.unlinkSync(filePath);
        }
      });
    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ error: 'File upload failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

// Helper function to parse form data (file)
const parseFormData = async (req: NextApiRequest): Promise<{ file: any }> => {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const file = { filepath: '/path/to/uploaded/file.csv' }; // Replace with actual file handling logic
      resolve({ file });
    });
    req.on('error', (error) => reject(error));
  });
};

export default handler;