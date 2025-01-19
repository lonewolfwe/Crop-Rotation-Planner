const cropGroups = {
  legumes: ['soybeans', 'peas', 'beans', 'clover'],
  grains: ['corn', 'wheat', 'barley', 'oats'],
  vegetables: ['tomatoes', 'peppers', 'potatoes', 'carrots'],
  leafyGreens: ['lettuce', 'spinach', 'kale', 'cabbage'],
};

export function generateRotation(currentCrop: string): string[] {
  // Simple rotation logic for MVP
  const rotation = [];
  
  // Start with current crop
  rotation.push(currentCrop);
  
  // Add three years of rotation
  if (cropGroups.legumes.includes(currentCrop.toLowerCase())) {
    rotation.push('corn');
    rotation.push('wheat');
    rotation.push('soybeans');
  } else if (cropGroups.grains.includes(currentCrop.toLowerCase())) {
    rotation.push('soybeans');
    rotation.push('wheat');
    rotation.push('corn');
  } else {
    rotation.push('soybeans');
    rotation.push('corn');
    rotation.push('wheat');
  }
  
  return rotation;
}
