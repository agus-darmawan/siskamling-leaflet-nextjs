import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createReport = async (data: any): Promise<any> => {
  try {
    const { name, type, date, phone, lat, long, location, description } = data;
    console.log(name, type, date, phone, lat, long, location, description);
    const createdReport = await prisma.report.create({
      data: {
        name,
        type,
        date,
        phone,
        lat,
        long,
        location,
        description,
        status: "terlapor", 
      },
    });
    console.log("HASIL",createdReport);
    return createdReport;
  } catch (error) {
    throw new Error("Failed to create report: " + error);
  }
};

export default createReport;
