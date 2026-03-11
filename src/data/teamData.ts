// data/teamData.ts
export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface TeamGroup {
  title: string;
  members: TeamMember[];
}

export const teamData: TeamGroup[] = [
  {
    title: "Sales Team",
    members: [
      {
        name: "James Reid",
        role: "Head of Sales",
        image: "/images/team/james.webp",
      },
      {
        name: "Talal Shibib",
        role: "Director International Business",
        image: "/images/team/talal.webp",
      },
      {
        name: "Michael Photiou",
        role: "Senior International Property Advisor",
        image: "/images/team/michael.webp",
      },
      {
        name: "Maximilien Photiou",
        role: "Senior Property Advisor",
        image: "/images/team/maximilien.webp",
      },
      {
        name: "Neha Sharma",
        role: "Senior Property Advisor",
        image: "/images/team/neha.webp",
      },
      {
        name: "Mohamed Essawy",
        role: "Senior Property Advisor",
        image: "/images/team/essawy.webp",
      },
      {
        name: "Jasmina Obradov",
        role: "Property Advisor",
        image: "/images/team/jasmina.webp",
      },
      {
        name: "Maria Matos",
        role: "Property Advisor",
        image: "/images/team/maria.webp",
      },
      {
        name: "Massiel Cowley",
        role: "Property Advisor",
        image: "/images/team/massiel.webp",
      },
      {
        name: "Athanasios Ioannidis",
        role: "Property Advisor",
        image: "/images/team/athanasios.webp",
      },
      {
        name: "Fabio Giovany",
        role: "Property Advisor",
        image: "/images/team/fabio.webp",
      },
      {
        name: "Jeremy Lau",
        role: "Property Advisor",
        image: "/images/team/jeremy.webp",
      },
      {
        name: "Julio Barros",
        role: "Property Advisor",
        image: "/images/team/julio.webp",
      },
      {
        name: "Kingsley Onu",
        role: "Property Advisor",
        image: "/images/team/kingsley.webp",
      },
      {
        name: "Marios Dionysopoulos",
        role: "Property Advisor",
        image: "/images/team/marios.webp",
      },
      {
        name: "ROLAND KHALIFE",
        role: "Sales Director",
        image: "/images/team/roland.webp",
      },
      {
        name: "AHMED SAYED",
        role: "Senior Property Advisor",
        image: "/images/team/ahmed.webp",
      },
      {
        name: "FARES EL CHOUFI",
        role: "Property Advisor",
        image: "/images/team/fares.webp",
      },
    ],
  },
  {
    title: "Operations Team",
    members: [
      {
        name: "Emad Sadek",
        role: "Sales Assistant",
        image: "/images/team/emad.webp",
      },
    ],
  },
  {
    title: "Marketing and Media Creatives",
    members: [
      {
        name: "Jan Leo Vincent Ong",
        role: "Marketing Manager",
        image: "/images/team/jan.webp",
      },
      {
        name: "Leariza Mendoza",
        role: "Graphic Designer",
        image: "/images/team/leariza.webp",
      },
      {
        name: "Shivam Sharma",
        role: "Cinematographer",
        image: "/images/team/shivam.webp",
      },
    ],
  },
  {
    title: "Logistic",
    members: [
      {
        name: "Jessie Franco",
        role: "Captain",
        image: "/images/team/jessie.webp",
      },
      {
        name: "Roemelle Santos",
        role: "Captain",
        image: "/images/team/roemelle.webp",
      },
    ],
  },
];
