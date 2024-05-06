import prisma from "../client";

const listGameLocations = async () => {
  return await prisma.gameLocation.findMany({});
};

export default {
  listGameLocations,
};
