/* ============================================
   Location Data - Nambiar District 25 Phase 2
   Location advantages and nearby landmarks
   ============================================ */

// Icon colors matching the design
export const LOCATION_COLORS = {
  gold: '#C9A227',
  green: '#4CAF50',
  purple: '#9C27B0',
  orange: '#FF9800',
  pink: '#E91E63',
  red: '#F44336',
  teal: '#009688',
  blue: '#2196F3',
};

// Project location details
export const projectLocation = {
  name: 'Nambiar District 25 Phase 2',
  address: 'Thanisandra Main Road, Near Manyata Tech Park',
  city: 'Bangalore',
  state: 'Karnataka',
  pincode: '560064',
  area: 'North Bangalore',
  googleMapsUrl: 'https://maps.google.com/?q=13.0545,77.6224',
  coordinates: {
    lat: 13.0545,
    lng: 77.6224,
  },
};

// Location categories
export const locationCategories = [
  {
    id: 'tech-parks',
    name: 'Tech Parks',
    icon: 'mdi:office-building',
    color: LOCATION_COLORS.blue,
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'mdi:school-outline',
    color: LOCATION_COLORS.green,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'mdi:hospital-box-outline',
    color: LOCATION_COLORS.red,
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: 'mdi:shopping-outline',
    color: LOCATION_COLORS.purple,
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: 'mdi:train',
    color: LOCATION_COLORS.orange,
  },
];

// Nearby landmarks with distances
export const nearbyLandmarks = [
  // Tech Parks
  {
    id: 1,
    name: 'Manyata Tech Park',
    category: 'tech-parks',
    distance: '3.5 km',
    distanceValue: 3.5,
    driveTime: '8 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: true,
  },
  {
    id: 2,
    name: 'Kirloskar Business Park',
    category: 'tech-parks',
    distance: '5 km',
    distanceValue: 5,
    driveTime: '12 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: false,
  },
  {
    id: 3,
    name: 'Bhartiya City Tech Park',
    category: 'tech-parks',
    distance: '4 km',
    distanceValue: 4,
    driveTime: '10 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: true,
  },
  {
    id: 4,
    name: 'Embassy Manyata',
    category: 'tech-parks',
    distance: '4.5 km',
    distanceValue: 4.5,
    driveTime: '10 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: false,
  },

  // Education
  {
    id: 5,
    name: 'Ryan International School',
    category: 'education',
    distance: '2 km',
    distanceValue: 2,
    driveTime: '5 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: true,
  },
  {
    id: 6,
    name: 'Candor International School',
    category: 'education',
    distance: '3 km',
    distanceValue: 3,
    driveTime: '7 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: true,
  },
  {
    id: 7,
    name: 'Vibgyor High School',
    category: 'education',
    distance: '4 km',
    distanceValue: 4,
    driveTime: '10 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: false,
  },
  {
    id: 8,
    name: 'CMR University',
    category: 'education',
    distance: '6 km',
    distanceValue: 6,
    driveTime: '15 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: false,
  },

  // Healthcare
  {
    id: 9,
    name: 'Columbia Asia Hospital',
    category: 'healthcare',
    distance: '5 km',
    distanceValue: 5,
    driveTime: '12 mins',
    icon: 'mdi:hospital-box-outline',
    iconColor: LOCATION_COLORS.red,
    featured: true,
  },
  {
    id: 10,
    name: 'Manipal Hospital',
    category: 'healthcare',
    distance: '6 km',
    distanceValue: 6,
    driveTime: '15 mins',
    icon: 'mdi:hospital-box-outline',
    iconColor: LOCATION_COLORS.red,
    featured: true,
  },
  {
    id: 11,
    name: 'Aster CMI Hospital',
    category: 'healthcare',
    distance: '7 km',
    distanceValue: 7,
    driveTime: '18 mins',
    icon: 'mdi:hospital-box-outline',
    iconColor: LOCATION_COLORS.red,
    featured: false,
  },

  // Shopping
  {
    id: 12,
    name: 'Elements Mall',
    category: 'shopping',
    distance: '4 km',
    distanceValue: 4,
    driveTime: '10 mins',
    icon: 'mdi:shopping-outline',
    iconColor: LOCATION_COLORS.purple,
    featured: true,
  },
  {
    id: 13,
    name: 'Phoenix Marketcity',
    category: 'shopping',
    distance: '8 km',
    distanceValue: 8,
    driveTime: '20 mins',
    icon: 'mdi:shopping-outline',
    iconColor: LOCATION_COLORS.purple,
    featured: true,
  },
  {
    id: 14,
    name: 'Esteem Mall',
    category: 'shopping',
    distance: '5 km',
    distanceValue: 5,
    driveTime: '12 mins',
    icon: 'mdi:shopping-outline',
    iconColor: LOCATION_COLORS.purple,
    featured: false,
  },

  // Transport
  {
    id: 15,
    name: 'Upcoming Metro Station',
    category: 'transport',
    distance: '600 m',
    distanceValue: 0.6,
    driveTime: '2 mins',
    icon: 'mdi:train',
    iconColor: LOCATION_COLORS.orange,
    featured: true,
    highlight: true,
  },
  {
    id: 16,
    name: 'Hebbal Flyover',
    category: 'transport',
    distance: '4 km',
    distanceValue: 4,
    driveTime: '10 mins',
    icon: 'mdi:road',
    iconColor: LOCATION_COLORS.orange,
    featured: true,
  },
  {
    id: 17,
    name: 'Kempegowda International Airport',
    category: 'transport',
    distance: '20 km',
    distanceValue: 20,
    driveTime: '30 mins',
    icon: 'mdi:airplane',
    iconColor: LOCATION_COLORS.orange,
    featured: true,
  },
  {
    id: 18,
    name: 'Bangalore City Railway Station',
    category: 'transport',
    distance: '12 km',
    distanceValue: 12,
    driveTime: '25 mins',
    icon: 'mdi:train-variant',
    iconColor: LOCATION_COLORS.orange,
    featured: false,
  },
];

// Key connectivity highlights
export const connectivityHighlights = [
  {
    id: 1,
    title: '600m from Upcoming Metro',
    description: 'Direct metro connectivity for hassle-free commute',
    icon: 'mdi:train',
    iconColor: LOCATION_COLORS.orange,
    highlight: true,
  },
  {
    id: 2,
    title: '30 mins to Airport',
    description: 'Quick access to Kempegowda International Airport',
    icon: 'mdi:airplane',
    iconColor: LOCATION_COLORS.blue,
    highlight: false,
  },
  {
    id: 3,
    title: 'IT Corridor Access',
    description: 'Close to major IT parks and business hubs',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.purple,
    highlight: false,
  },
  {
    id: 4,
    title: 'ORR Connectivity',
    description: 'Excellent connectivity via Outer Ring Road',
    icon: 'mdi:road',
    iconColor: LOCATION_COLORS.green,
    highlight: false,
  },
];

// Location advantages for display
export const locationAdvantages = [
  {
    id: 1,
    title: "Bangalore's Most Promising Location",
    description: 'Strategically located in the rapidly developing North Bangalore corridor',
    icon: 'mdi:map-marker-star',
    iconColor: LOCATION_COLORS.gold,
  },
  {
    id: 2,
    title: 'Excellent Infrastructure',
    description: 'Well-developed roads, metro connectivity, and social infrastructure',
    icon: 'mdi:highway',
    iconColor: LOCATION_COLORS.blue,
  },
  {
    id: 3,
    title: 'Appreciating Property Values',
    description: 'North Bangalore witnesses consistent property value appreciation',
    icon: 'mdi:trending-up',
    iconColor: LOCATION_COLORS.green,
  },
  {
    id: 4,
    title: 'Employment Hub',
    description: 'Proximity to major tech parks ensures job opportunities nearby',
    icon: 'mdi:briefcase-outline',
    iconColor: LOCATION_COLORS.purple,
  },
];

// Get landmarks by category
export const getLandmarksByCategory = (categoryId) => {
  return nearbyLandmarks.filter((landmark) => landmark.category === categoryId);
};

// Get featured landmarks
export const getFeaturedLandmarks = () => {
  return nearbyLandmarks.filter((landmark) => landmark.featured);
};

// Get highlighted landmarks (metro, etc.)
export const getHighlightedLandmarks = () => {
  return nearbyLandmarks.filter((landmark) => landmark.highlight);
};

export default {
  projectLocation,
  locationCategories,
  nearbyLandmarks,
  connectivityHighlights,
  locationAdvantages,
  getLandmarksByCategory,
  getFeaturedLandmarks,
  getHighlightedLandmarks,
  LOCATION_COLORS,
};
