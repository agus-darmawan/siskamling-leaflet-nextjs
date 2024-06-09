import { NextResponse, NextRequest } from 'next/server';
import createReport from '@/lib/reportService';

export async function POST(req: NextRequest, res: NextResponse) {
  const reportData = req.body;
  try {
    const report = await createReport(reportData);
    return NextResponse.json({
      success: true,
      message: 'Welcome to Agus Darmawan Website!',
      data: report
    });
  }catch (e) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again',
    });
  }
}
