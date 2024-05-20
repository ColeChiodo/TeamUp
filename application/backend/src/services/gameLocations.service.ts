import prisma from "../client";

const listGameLocations = async () => {
  return await prisma.gameLocation.findMany({});
};

const getGameLocationById = async (id: number) => {
  return await prisma.gameLocation.findUnique({
    where: { id: id },
  });
};

export default {
  listGameLocations,
  getGameLocationById,
};
