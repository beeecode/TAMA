/**
 * The faces the marketing pages use.
 *
 * Photography lives in `public/photos`. Each entry keeps its initials and
 * colour so `Avatar` still has something to fall back on if an image fails to
 * load, and so the same person reads consistently in the product screens where
 * a photo would be too heavy.
 */
export interface FeaturedPerson {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  photo: string;
}

export const featuredPeople: FeaturedPerson[] = [
  {
    id: "rosa",
    name: "Rosa Mendel",
    role: "Head of Operations, Solstice Health",
    initials: "RM",
    color: "#5F63C9",
    photo: "/photos/person-rosa.jpg",
  },
  {
    id: "devin",
    name: "Devin Okafor",
    role: "Delivery Lead, Harbour",
    initials: "DO",
    color: "#2F9E6B",
    photo: "/photos/person-devin.jpg",
  },
  {
    id: "ada",
    name: "Ada Kowalski",
    role: "Studio Producer, Arcform",
    initials: "AK",
    color: "#8B5CF6",
    photo: "/photos/person-ada.jpg",
  },
  {
    id: "freya",
    name: "Freya Lindqvist",
    role: "Programme Manager, Kestrel",
    initials: "FL",
    color: "#0D9488",
    photo: "/photos/person-freya.jpg",
  },
  {
    id: "lena",
    name: "Lena Brandt",
    role: "Operations, Northline",
    initials: "LB",
    color: "#EC4899",
    photo: "/photos/person-lena.jpg",
  },
];

export function getFeaturedPerson(id: string): FeaturedPerson {
  return featuredPeople.find((person) => person.id === id) ?? featuredPeople[0];
}

/** Scene photography, for the panels that want a room rather than a face. */
export const scenes = {
  bright: "/photos/team-bright.jpg",
  studio: "/photos/team-studio.jpg",
  ops: "/photos/team-ops.jpg",
  cheer: "/photos/team-cheer.jpg",
  devices: "/photos/team-devices.jpg",
  pair: "/photos/pair-laptop.jpg",
} as const;
