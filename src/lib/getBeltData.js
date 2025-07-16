import { notFound } from "next/navigation";

const VALID_BELTS = new Set([
  "white",
  "yellow",
  "orange",
  "green",
  "blue",
  "brown",
  "black",
]);

async function getBeltContent(belt) {
  if (!VALID_BELTS.has(belt)) return null;

  try {
    const beltModule = await import(`@/data/sections/${belt}`);
    const contentKey = `${belt}BeltContent`;
    return beltModule[contentKey] || null;
  } catch (error) {
    console.error(`Failed to load content for belt: ${belt}`, error);
    return null;
  }
}

export async function getBeltData(belt) {
  const beltContent = await getBeltContent(belt);

  if (!beltContent) {
    notFound();
  }

  return { beltContent };
}

export { VALID_BELTS };
