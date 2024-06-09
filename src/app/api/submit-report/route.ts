import createReport from '@/lib/reportService';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method === 'POST') {
    const reportData = req.body;
    try {
      const report = await createReport(reportData);
      return res.status(201).json({ report });
    } catch (error) {
      console.error('Error creating report:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
