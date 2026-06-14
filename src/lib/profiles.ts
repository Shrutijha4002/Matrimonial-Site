export type Profile = {
  id: string;
  name: string;
  age: number;
  height: string;
  city: string;
  religion: string;
  community: string;
  profession: string;
  education: string;
  income: string;
  about: string;
  image: string;
  premium?: boolean;
  verified?: boolean;
};

const photos = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&q=80",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
];

const names = [
  "Aanya Sharma","Rohan Mehta","Ishita Kapoor","Arjun Verma","Priya Iyer","Karan Patel",
  "Meera Nair","Vikram Singh","Sneha Reddy","Aditya Joshi","Ananya Das","Rahul Khanna",
];
const cities = ["Mumbai","Delhi","Bengaluru","Hyderabad","Pune","Chennai","Kolkata","Jaipur","Ahmedabad","Chandigarh","Lucknow","Goa"];
const religions = ["Hindu","Muslim","Christian","Sikh","Jain","Buddhist"];
const communities = ["Brahmin","Agarwal","Khatri","Maratha","Iyer","Reddy","Nair","Sindhi","Punjabi","Bengali","Marwari","Gujarati"];
const professions = ["Software Engineer","Doctor","Architect","Chartered Accountant","Product Designer","Investment Banker","Entrepreneur","Marketing Lead","Civil Engineer","Lawyer","Professor","Data Scientist"];
const educations = ["B.Tech","MBA","MBBS","M.Sc","CA","M.Tech","Ph.D","BBA","B.Arch","LLB","M.Des","B.Com"];

export const profiles: Profile[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `SG${1001 + i}`,
  name: names[i],
  age: 24 + (i % 9),
  height: `${5 + (i % 2)}'${3 + (i % 8)}"`,
  city: cities[i],
  religion: religions[i % religions.length],
  community: communities[i],
  profession: professions[i],
  education: educations[i],
  income: `${8 + i * 2} LPA`,
  about:
    "Warm, family-oriented, and passionate about life. Loves travel, books, and meaningful conversations over coffee. Looking for a kind, ambitious partner to build a beautiful future together.",
  image: photos[i],
  premium: i % 3 === 0,
  verified: i % 2 === 0,
}));

export const getProfile = (id: string) => profiles.find((p) => p.id === id);
