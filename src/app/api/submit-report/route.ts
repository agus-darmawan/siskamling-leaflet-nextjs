import { NextApiRequest, NextApiResponse } from 'next';
import createReport from '@/lib/reportService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const reportData = req.body;

  try {
    const report = await createReport(reportData);
    return res.status(201).json({ report });
  } catch (error) {
    console.error('Error creating report:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
