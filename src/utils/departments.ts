export const departments: { [key: string]: string } = {
  "sales-team": "Sales Team",
  "operations-team": "Operations Team",
  "marketing-and-media-creatives": "Marketing and Media Creatives",
  "logistic": "Logistic",
};

export const getDepartmentName = (slug: string): string => {
  return departments[slug] || slug;
};
