// Event Categories
export const CATEGORIES = [
  { id: "tech", label: "Technology", icon: "💻", description: "Tech meetups, hackathons, and developer conferences" },
  { id: "music", label: "Music", icon: "🎵", description: "Concerts, festivals, and live performances" },
  { id: "sports", label: "Sports", icon: "⚽", description: "Sports events, tournaments, and fitness activities" },
  { id: "art", label: "Art & Culture", icon: "🎨", description: "Art exhibitions, cultural events, and creative workshops" },
  { id: "food", label: "Food & Drink", icon: "🍕", description: "Food festivals, cooking classes, and culinary experiences" },
  { id: "business", label: "Business", icon: "💼", description: "Networking events, conferences, and startup meetups" },
  { id: "health", label: "Health & Wellness", icon: "🧘", description: "Yoga, meditation, wellness workshops, and health seminars" },
  { id: "education", label: "Education", icon: "📚", description: "Workshops, seminars, and learning experiences" },
  { id: "gaming", label: "Gaming", icon: "🎮", description: "Gaming tournaments, esports, and gaming conventions" },
  { id: "networking", label: "Networking", icon: "🤝", description: "Professional networking and community building events" },
  { id: "outdoor", label: "Outdoor & Adventure", icon: "🏕️", description: "Hiking, camping, and outdoor activities" },
  { id: "community", label: "Community", icon: "👥", description: "Local community gatherings and social events" },
  { id: "fashion", label: "Fashion", icon: "👗", description: "Fashion shows, exhibitions, and styling events" },
  { id: "film", label: "Film & Cinema", icon: "🎬", description: "Movie screenings, film festivals, and cinema events" },
  { id: "charity", label: "Charity & Fundraising", icon: "🎗️", description: "Fundraising events and community charity programs" },
  { id: "tech-talks", label: "Tech Talks", icon: "🖥️", description: "Workshops, seminars, and discussions in technology" },
  { id: "travel", label: "Travel & Adventure", icon: "✈️", description: "Travel meetups, exploration trips, and adventure tours" },
];

// Get category by ID
export const getCategoryById = (id) => {
  return CATEGORIES.find((cat) => cat.id === id);
};

// Get category label by ID
export const getCategoryLabel = (id) => {
  const category = getCategoryById(id);
  return category ? category.label : id;
};

// Get category icon by ID
export const getCategoryIcon = (id) => {
  const category = getCategoryById(id);
  return category ? category.icon : "📅";
};

// Get category description by ID
export const getCategoryDescription = (id) => {
  const category = getCategoryById(id);
  return category ? category.description : "";
};

// Get all category IDs
export const getAllCategoryIds = () => {
  return CATEGORIES.map((cat) => cat.id);
};

// Search categories by keyword in label or description
export const searchCategories = (keyword) => {
  const lowerKeyword = keyword.toLowerCase();
  return CATEGORIES.filter(
    (cat) =>
      cat.label.toLowerCase().includes(lowerKeyword) ||
      cat.description.toLowerCase().includes(lowerKeyword)
  );
};
