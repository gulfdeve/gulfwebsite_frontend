import {
  Square,
  Plus,
  Waves,
  Shield,
  Building2,
  Landmark,
  Dumbbell,
  Wifi,
  Car,
  TreePine,
  Utensils,
  Coffee,
  Tv,
  Wind,
  AirVent,
  SmartphoneNfc,
  PawPrint,
  Bed,
  Bath,
  DoorOpen,
  GlassWater,
  Home,
  Sprout,
  Sun,
  Users,
  ChefHat,
  ShoppingCart,
  Stethoscope,
  GraduationCap,
  Bus,
  Ship,
  Plane,
  Zap,
  Flame,
  Gamepad2,
  Wine,
  Shirt,
  Activity,
  Flower2,
  Briefcase,
  Laptop,
  Flag,
  ArrowUpDown,
  Eye,
  Sparkles,
  Building,
  BookOpen,
  HeartHandshake,
  Accessibility,
  Box,
  Sparkle,
} from "lucide-react";

export const getIconForAmenity = (amenity: string): any => {
  const lowerAmenity = amenity.toLowerCase().trim();

  // Air Conditioning & Heating
  if (lowerAmenity.includes("air conditioning") || lowerAmenity.includes("central a/c") || lowerAmenity.includes("central ac") || lowerAmenity === "ac") {
    return AirVent;
  }
  if (lowerAmenity.includes("heating")) {
    return Wind;
  }

  // Internet & Technology
  if (lowerAmenity.includes("internet") || lowerAmenity.includes("wifi") || lowerAmenity.includes("fiber")) {
    return Wifi;
  }
  if (lowerAmenity.includes("smart home") || lowerAmenity.includes("home automation") || lowerAmenity.includes("smart lighting") || lowerAmenity.includes("voice control") || lowerAmenity.includes("smart security") || lowerAmenity.includes("video intercom") || lowerAmenity.includes("remote access") || lowerAmenity.includes("mobile app") || lowerAmenity.includes("smart locks") || lowerAmenity.includes("energy management") || lowerAmenity.includes("climate control") || lowerAmenity.includes("automated blinds")) {
    return SmartphoneNfc;
  }
  if (lowerAmenity.includes("satellite") || lowerAmenity.includes("tv") || lowerAmenity.includes("television")) {
    return Tv;
  }

  // Furnishing
  if (lowerAmenity.includes("furnished") || lowerAmenity.includes("furnishing")) {
    return Home;
  }

  // Parking
  if (lowerAmenity.includes("parking") || lowerAmenity.includes("garage")) {
    return Car;
  }
  if (lowerAmenity.includes("ev charging") || lowerAmenity.includes("electric vehicle")) {
    return Zap;
  }

  // Pools & Water
  if (lowerAmenity.includes("pool") || lowerAmenity.includes("jacuzzi") || lowerAmenity.includes("hot tub") || lowerAmenity.includes("waterfall") || lowerAmenity.includes("water feature") || lowerAmenity.includes("fountain")) {
    return Waves;
  }
  if (lowerAmenity.includes("waterfront") || lowerAmenity.includes("beach") || lowerAmenity.includes("marina") || lowerAmenity.includes("boat") || lowerAmenity.includes("dock") || lowerAmenity.includes("pier") || lowerAmenity.includes("water sports") || lowerAmenity.includes("view of water")) {
    return Waves;
  }
  if (lowerAmenity.includes("deck") || lowerAmenity.includes("sun deck") || lowerAmenity.includes("pool deck") || lowerAmenity.includes("sunset deck") || lowerAmenity.includes("observation deck")) {
    return Sun;
  }

  // Security
  if (lowerAmenity.includes("security") || lowerAmenity.includes("cctv") || lowerAmenity.includes("surveillance") || lowerAmenity.includes("gated") || lowerAmenity.includes("access control") || lowerAmenity.includes("biometric") || lowerAmenity.includes("panic room") || lowerAmenity.includes("safe room") || lowerAmenity.includes("fire safety") || lowerAmenity.includes("smoke detector")) {
    return Shield;
  }
  if (lowerAmenity.includes("backup power") || lowerAmenity.includes("generator")) {
    return Zap;
  }

  // Fitness & Wellness
  if (lowerAmenity.includes("gym") || lowerAmenity.includes("fitness") || lowerAmenity.includes("training")) {
    return Dumbbell;
  }
  if (lowerAmenity.includes("yoga") || lowerAmenity.includes("pilates")) {
    return Activity;
  }
  if (lowerAmenity.includes("spa") || lowerAmenity.includes("wellness") || lowerAmenity.includes("massage") || lowerAmenity.includes("beauty") || lowerAmenity.includes("barbershop")) {
    return Flower2;
  }
  if (lowerAmenity.includes("sauna") || lowerAmenity.includes("steam room") || lowerAmenity.includes("hammam") || lowerAmenity.includes("turkish bath")) {
    return GlassWater;
  }

  // Recreation & Entertainment
  if (lowerAmenity.includes("children") || lowerAmenity.includes("kids") || lowerAmenity.includes("play area") || lowerAmenity.includes("playground")) {
    return Users;
  }
  if (lowerAmenity.includes("tennis") || lowerAmenity.includes("basketball") || lowerAmenity.includes("squash") || lowerAmenity.includes("badminton") || lowerAmenity.includes("padel") || lowerAmenity.includes("jogging") || lowerAmenity.includes("running") || lowerAmenity.includes("cycling") || lowerAmenity.includes("track")) {
    return Activity;
  }
  if (lowerAmenity.includes("bbq") || lowerAmenity.includes("barbecue")) {
    return Flame;
  }
  if (lowerAmenity.includes("theater") || lowerAmenity.includes("cinema") || lowerAmenity.includes("media room")) {
    return Tv;
  }
  if (lowerAmenity.includes("wine cellar") || lowerAmenity.includes("wine storage") || lowerAmenity.includes("bar") || lowerAmenity.includes("wet bar")) {
    return Wine;
  }
  if (lowerAmenity.includes("game room") || lowerAmenity.includes("gaming") || lowerAmenity.includes("billiards") || lowerAmenity.includes("karaoke")) {
    return Gamepad2;
  }
  if (lowerAmenity.includes("fireplace") || lowerAmenity.includes("fire pit")) {
    return Flame;
  }

  // Building Features
  if (lowerAmenity.includes("elevator")) {
    return ArrowUpDown;
  }
  if (lowerAmenity.includes("lobby") || lowerAmenity.includes("concierge") || lowerAmenity.includes("butler")) {
    return DoorOpen;
  }
  if (lowerAmenity.includes("retail") || lowerAmenity.includes("shopping mall") || lowerAmenity.includes("community center")) {
    return Building2;
  }
  if (lowerAmenity.includes("business center") || lowerAmenity.includes("co-working") || lowerAmenity.includes("meeting room") || lowerAmenity.includes("conference")) {
    return Briefcase;
  }
  if (lowerAmenity.includes("library") || lowerAmenity.includes("reading room")) {
    return BookOpen;
  }
  if (lowerAmenity.includes("prayer") || lowerAmenity.includes("mosque")) {
    return Landmark;
  }

  // Outdoor Spaces
  if (lowerAmenity.includes("balcony") || lowerAmenity.includes("terrace") || lowerAmenity.includes("rooftop")) {
    return Square;
  }
  if (lowerAmenity.includes("garden") || lowerAmenity.includes("landscaped") || lowerAmenity.includes("desert garden") || lowerAmenity.includes("date palm") || lowerAmenity.includes("oasis") || lowerAmenity.includes("walking trail") || lowerAmenity.includes("jogging path")) {
    return TreePine;
  }
  if (lowerAmenity.includes("view") || lowerAmenity.includes("park view") || lowerAmenity.includes("sea view") || lowerAmenity.includes("city view") || lowerAmenity.includes("golf course view") || lowerAmenity.includes("desert view") || lowerAmenity.includes("sunset view") || lowerAmenity.includes("burj khalifa") || lowerAmenity.includes("palm") || lowerAmenity.includes("dubai marina") || lowerAmenity.includes("jbr")) {
    return Eye;
  }
  if (lowerAmenity.includes("sky garden") || lowerAmenity.includes("sky lounge")) {
    return Sprout;
  }

  // Rooms & Storage
  if (lowerAmenity.includes("maid") || lowerAmenity.includes("servant") || lowerAmenity.includes("staff") || lowerAmenity.includes("driver") || lowerAmenity.includes("caretaker") || lowerAmenity.includes("guest room") || lowerAmenity.includes("guest suite") || lowerAmenity.includes("guest house") || lowerAmenity.includes("pool house")) {
    return Bed;
  }
  if (lowerAmenity.includes("storage") || lowerAmenity.includes("wardrobe") || lowerAmenity.includes("closet") || lowerAmenity.includes("ski storage") || lowerAmenity.includes("bike storage")) {
    return Box;
  }
  if (lowerAmenity.includes("pantry") || lowerAmenity.includes("breakfast nook") || lowerAmenity.includes("breakfast bar")) {
    return ChefHat;
  }
  if (lowerAmenity.includes("bathroom") || lowerAmenity.includes("bath") || lowerAmenity.includes("powder room")) {
    return Bath;
  }
  if (lowerAmenity.includes("study") || lowerAmenity.includes("home office")) {
    return Laptop;
  }
  if (lowerAmenity.includes("suite") || lowerAmenity.includes("master")) {
    return Home;
  }
  if (lowerAmenity.includes("dining room") || lowerAmenity.includes("formal dining")) {
    return Utensils;
  }
  if (lowerAmenity.includes("mud room")) {
    return DoorOpen;
  }

  // Kitchen & Appliances
  if (lowerAmenity.includes("kitchen") || lowerAmenity.includes("appliance") || lowerAmenity.includes("dishwasher") || lowerAmenity.includes("refrigerator") || lowerAmenity.includes("oven") || lowerAmenity.includes("microwave") || lowerAmenity.includes("stove") || lowerAmenity.includes("coffee machine") || lowerAmenity.includes("ice maker") || lowerAmenity.includes("water heater") || lowerAmenity.includes("outdoor kitchen")) {
    return Utensils;
  }

  // Services & Facilities
  if (lowerAmenity.includes("restaurant") || lowerAmenity.includes("fine dining")) {
    return Utensils;
  }
  if (lowerAmenity.includes("café") || lowerAmenity.includes("cafe") || lowerAmenity.includes("coffee shop")) {
    return Coffee;
  }
  if (lowerAmenity.includes("supermarket") || lowerAmenity.includes("grocery")) {
    return ShoppingCart;
  }
  if (lowerAmenity.includes("pharmacy") || lowerAmenity.includes("medical") || lowerAmenity.includes("clinic") || lowerAmenity.includes("hospital")) {
    return Stethoscope;
  }
  if (lowerAmenity.includes("school") || lowerAmenity.includes("nursery") || lowerAmenity.includes("international school")) {
    return GraduationCap;
  }
  if (lowerAmenity.includes("transport") || lowerAmenity.includes("metro") || lowerAmenity.includes("bus stop") || lowerAmenity.includes("taxi stand")) {
    return Bus;
  }
  if (lowerAmenity.includes("laundry") || lowerAmenity.includes("dry cleaning") || lowerAmenity.includes("housekeeping")) {
    return Shirt;
  }

  // Pet Policy
  if (lowerAmenity.includes("pet") || lowerAmenity.includes("pets allowed")) {
    return PawPrint;
  }

  // Luxury Features
  if (lowerAmenity.includes("golf")) {
    return Flag;
  }
  if (lowerAmenity.includes("equestrian") || lowerAmenity.includes("horse") || lowerAmenity.includes("camel") || lowerAmenity.includes("desert safari") || lowerAmenity.includes("falconry")) {
    return Activity;
  }
  if (lowerAmenity.includes("helipad")) {
    return Plane;
  }
  if (lowerAmenity.includes("fishing")) {
    return Ship;
  }
  if (lowerAmenity.includes("outdoor shower") || lowerAmenity.includes("outdoor dining") || lowerAmenity.includes("outdoor living")) {
    return Sun;
  }

  // UAE-Specific
  if (lowerAmenity.includes("arabic") || lowerAmenity.includes("traditional") || lowerAmenity.includes("majlis") || lowerAmenity.includes("islamic art") || lowerAmenity.includes("courtyard")) {
    return Building;
  }

  // Premium Building Features
  if (lowerAmenity.includes("window") || lowerAmenity.includes("glazing") || lowerAmenity.includes("soundproofing") || lowerAmenity.includes("insulation") || lowerAmenity.includes("ceiling")) {
    return Building2;
  }
  if (lowerAmenity.includes("door") && !lowerAmenity.includes("mud room")) {
    return DoorOpen;
  }
  if (lowerAmenity.includes("energy") || lowerAmenity.includes("solar") || lowerAmenity.includes("green building") || lowerAmenity.includes("leed")) {
    return Sparkles;
  }

  // Accessibility
  if (lowerAmenity.includes("accessibility") || lowerAmenity.includes("wheelchair") || lowerAmenity.includes("ramp") || lowerAmenity.includes("grab bar")) {
    return Accessibility;
  }

  // Services
  if (lowerAmenity.includes("room service") || lowerAmenity.includes("car wash") || lowerAmenity.includes("pet care") || lowerAmenity.includes("childcare") || lowerAmenity.includes("elderly care") || lowerAmenity.includes("medical emergency") || lowerAmenity.includes("maintenance") || lowerAmenity.includes("property management")) {
    return HeartHandshake;
  }

  // Luxury Lifestyle
  if (lowerAmenity.includes("beach club") || lowerAmenity.includes("yacht club") || lowerAmenity.includes("country club") || lowerAmenity.includes("social club") || lowerAmenity.includes("membership club") || lowerAmenity.includes("vip lounge") || lowerAmenity.includes("private lounge") || lowerAmenity.includes("lounge") || lowerAmenity.includes("poolside bar") || lowerAmenity.includes("beach bar")) {
    return Sparkle;
  }

  // Default
  return Plus;
};