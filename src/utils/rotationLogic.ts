const cropGroups = {
  legumes: ['soybeans', 'peas', 'beans', 'clover', 'alfalfa'],
  grains: ['corn', 'wheat', 'barley', 'oats', 'rye'],
  vegetables: ['tomatoes', 'peppers', 'potatoes', 'carrots', 'broccoli', 'onions'],
  leafyGreens: ['lettuce', 'spinach', 'kale', 'cabbage', 'mustard greens'],
  rootVegetables: ['carrots', 'radishes', 'beets', 'turnips'], // Added root vegetables
  fruitVegetables: ['tomatoes', 'peppers', 'cucumbers', 'squash'], // Added fruit vegetables
  brassicas: ['broccoli', 'cabbage', 'cauliflower', 'kale'], // Added brassicas
};

// Helper function to get a random element from an array
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to get a random crop from a different group
function getRandomCropFromDifferentGroup(currentCrop: string, groups: { [key: string]: string[] }): string {
  const currentGroup = Object.keys(groups).find(group =>
    groups[group].map(crop => crop.toLowerCase()).includes(currentCrop.toLowerCase())
  );

  if (!currentGroup || Object.keys(groups).length < 2) {
    // Fallback to a random legume if current group not found or only one group exists
    return getRandomElement(groups.legumes);
  }

  const otherGroups = Object.keys(groups).filter(group => group !== currentGroup);
  const randomGroupKey = getRandomElement(otherGroups);
  return getRandomElement(groups[randomGroupKey]);
}

export function generateRotation(currentCrop: string): string[] {
  const rotation: string[] = [currentCrop];
  const numberOfYears = 4; // Generate a 4-year rotation

  for (let i = 1; i < numberOfYears; i++) {
    const previousCrop = rotation[rotation.length - 1];
    let nextCrop: string;

    const isLegume = cropGroups.legumes.includes(previousCrop.toLowerCase());
    const isGrain = cropGroups.grains.includes(previousCrop.toLowerCase());
    const isVegetable = [...cropGroups.vegetables, ...cropGroups.leafyGreens, ...cropGroups.rootVegetables, ...cropGroups.fruitVegetables, ...cropGroups.brassicas].includes(previousCrop.toLowerCase());

    if (isLegume) {
      // After a legume, a grain or a vegetable is often beneficial
      nextCrop = getRandomElement([...cropGroups.grains, ...cropGroups.vegetables, ...cropGroups.leafyGreens, ...cropGroups.rootVegetables, ...cropGroups.fruitVegetables, ...cropGroups.brassicas]);
    } else if (isGrain) {
      // After a grain, consider a legume to improve soil nitrogen
      nextCrop = getRandomElement(cropGroups.legumes);
    } else if (isVegetable) {
      // Rotate with grains or legumes, or a different type of vegetable
      nextCrop = getRandomElement([...cropGroups.grains, ...cropGroups.legumes, ...Object.values(cropGroups).flat().filter(crop => ![...cropGroups.vegetables, ...cropGroups.leafyGreens, ...cropGroups.rootVegetables, ...cropGroups.fruitVegetables, ...cropGroups.brassicas].includes(crop.toLowerCase()))]);
    } else {
      // Default case: try to rotate to a different group
      nextCrop = getRandomCropFromDifferentGroup(previousCrop, cropGroups);
    }

    rotation.push(nextCrop);
  }

  return rotation;
}