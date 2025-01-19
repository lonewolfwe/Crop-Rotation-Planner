export interface Field {
  id: string;
  name: string;
  size: number;
  soilType: string;
  currentCrop: string;
  pH: number;
}

export interface RotationPlan {
  id: string;
  fieldId: string;
  createdAt: string;
  years: {
    year: number;
    crop: string;
  }[];
}
