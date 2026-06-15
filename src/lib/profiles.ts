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
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&q=80",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
];

const data: { name: string; age: number; height: string; city: string; religion: string; community: string; profession: string; education: string; income: string }[] = [
  { name: "Aanya Sharma", age: 26, height: "5'4\"", city: "Mumbai", religion: "Hindu", community: "Brahmin", profession: "Software Engineer", education: "B.Tech", income: "18 LPA" },
  { name: "Rohan Mehta", age: 28, height: "5'10\"", city: "Delhi", religion: "Hindu", community: "Agarwal", profession: "Doctor", education: "MBBS", income: "24 LPA" },
  { name: "Ishita Kapoor", age: 25, height: "5'3\"", city: "Bengaluru", religion: "Sikh", community: "Khatri", profession: "Architect", education: "B.Arch", income: "14 LPA" },
  { name: "Arjun Verma", age: 30, height: "5'9\"", city: "Hyderabad", religion: "Hindu", community: "Maratha", profession: "Chartered Accountant", education: "CA", income: "28 LPA" },
  { name: "Priya Iyer", age: 27, height: "5'2\"", city: "Pune", religion: "Hindu", community: "Iyer", profession: "Product Designer", education: "M.Des", income: "16 LPA" },
  { name: "Karan Patel", age: 31, height: "6'0\"", city: "Chennai", religion: "Jain", community: "Marwari", profession: "Investment Banker", education: "MBA", income: "35 LPA" },
  { name: "Meera Nair", age: 24, height: "5'5\"", city: "Kolkata", religion: "Hindu", community: "Nair", profession: "Marketing Lead", education: "MBA", income: "12 LPA" },
  { name: "Vikram Singh", age: 29, height: "5'11\"", city: "Jaipur", religion: "Sikh", community: "Punjabi", profession: "Entrepreneur", education: "BBA", income: "40 LPA" },
  { name: "Sneha Reddy", age: 26, height: "5'4\"", city: "Ahmedabad", religion: "Hindu", community: "Reddy", profession: "Civil Engineer", education: "M.Tech", income: "15 LPA" },
  { name: "Aditya Joshi", age: 32, height: "5'8\"", city: "Chandigarh", religion: "Hindu", community: "Brahmin", profession: "Lawyer", education: "LLB", income: "22 LPA" },
  { name: "Ananya Das", age: 23, height: "5'1\"", city: "Lucknow", religion: "Buddhist", community: "Bengali", profession: "Professor", education: "Ph.D", income: "13 LPA" },
  { name: "Rahul Khanna", age: 34, height: "5'10\"", city: "Goa", religion: "Christian", community: "Sindhi", profession: "Data Scientist", education: "M.Sc", income: "30 LPA" },
  { name: "Zara Sheikh", age: 27, height: "5'6\"", city: "Mumbai", religion: "Muslim", community: "Kashmiri", profession: "Fashion Designer", education: "NIFT", income: "20 LPA" },
  { name: "Amit Khurana", age: 33, height: "5'9\"", city: "Delhi", religion: "Hindu", community: "Punjabi", profession: "Business Analyst", education: "BBA", income: "20 LPA" },
  { name: "Neha Gupta", age: 25, height: "5'3\"", city: "Bengaluru", religion: "Hindu", community: "Agarwal", profession: "UX Researcher", education: "M.Sc", income: "14 LPA" },
  { name: "Farhan Ali", age: 29, height: "5'11\"", city: "Hyderabad", religion: "Muslim", community: "Hyderabadi", profession: "Surgeon", education: "MS", income: "36 LPA" },
  { name: "Divya Krishnan", age: 26, height: "5'2\"", city: "Chennai", religion: "Hindu", community: "Iyer", profession: "Dancer", education: "B.Com", income: "10 LPA" },
  { name: "Gurpreet Singh", age: 30, height: "6'1\"", city: "Chandigarh", religion: "Sikh", community: "Jatt", profession: "Army Officer", education: "NCC", income: "25 LPA" },
  { name: "Fatima Khan", age: 24, height: "5'4\"", city: "Lucknow", religion: "Muslim", community: "Mughal", profession: "Journalist", education: "M.A.", income: "11 LPA" },
  { name: "Ravi Shankar", age: 35, height: "5'8\"", city: "Kolkata", religion: "Hindu", community: "Bengali", profession: "Civil Servant", education: "IAS", income: "30 LPA" },
  { name: "Pooja Jain", age: 28, height: "5'5\"", city: "Jaipur", religion: "Jain", community: "Marwari", profession: "Chartered Accountant", education: "CA", income: "22 LPA" },
  { name: "Chris D'Souza", age: 27, height: "5'10\"", city: "Goa", religion: "Christian", community: "Goan", profession: "Hotel Manager", education: "HMCT", income: "16 LPA" },
  { name: "Lakshmi Devi", age: 29, height: "5'3\"", city: "Ahmedabad", religion: "Hindu", community: "Gujarati", profession: "Teacher", education: "B.Ed", income: "8 LPA" },
  { name: "Mohammad Rizwan", age: 31, height: "5'7\"", city: "Pune", religion: "Muslim", community: "Pathan", profession: "Software Architect", education: "M.Tech", income: "32 LPA" },
  { name: "Kavita Joshi", age: 22, height: "5'0\"", city: "Pune", religion: "Hindu", community: "Brahmin", profession: "Graphic Designer", education: "B.Des", income: "9 LPA" },
  { name: "David Thomas", age: 33, height: "5'9\"", city: "Bengaluru", religion: "Christian", community: "Kerala Catholic", profession: "Product Manager", education: "MBA", income: "26 LPA" },
  { name: "Sana Mirza", age: 25, height: "5'5\"", city: "Delhi", religion: "Muslim", community: "Lucknawi", profession: "Lawyer", education: "LLB", income: "12 LPA" },
  { name: "Rajesh Patel", age: 36, height: "5'6\"", city: "Ahmedabad", religion: "Hindu", community: "Patel", profession: "Business Owner", education: "B.Com", income: "50 LPA" },
  { name: "Simran Kaur", age: 26, height: "5'6\"", city: "Chandigarh", religion: "Sikh", community: "Jatt", profession: "HR Manager", education: "MBA", income: "15 LPA" },
  { name: "Vivek Saxena", age: 28, height: "5'10\"", city: "Lucknow", religion: "Hindu", community: "Kayastha", profession: "Pilot", education: "B.Sc", income: "28 LPA" },
  { name: "Maria Joseph", age: 24, height: "5'4\"", city: "Chennai", religion: "Christian", community: "Tamil Christian", profession: "Nurse", education: "B.Sc Nursing", income: "8 LPA" },
  { name: "Deepika Rathore", age: 30, height: "5'7\"", city: "Jaipur", religion: "Hindu", community: "Rajput", profession: "Police Officer", education: "IPS", income: "28 LPA" },
  { name: "Imran Qureshi", age: 27, height: "5'8\"", city: "Hyderabad", religion: "Muslim", community: "Memoni", profession: "Doctor", education: "MBBS", income: "20 LPA" },
  { name: "Shreya Mukherjee", age: 23, height: "5'2\"", city: "Kolkata", religion: "Hindu", community: "Bengali", profession: "Classical Singer", education: "Sangeet Visharad", income: "7 LPA" },
  { name: "Harpreet Singh", age: 32, height: "6'0\"", city: "Delhi", religion: "Sikh", community: "Saini", profession: "Engineer", education: "B.Tech", income: "24 LPA" },
  { name: "Nisha Agarwal", age: 27, height: "5'3\"", city: "Mumbai", religion: "Hindu", community: "Agarwal", profession: "Investment Analyst", education: "CFA", income: "25 LPA" },
  { name: "Joseph Fernandes", age: 29, height: "5'9\"", city: "Goa", religion: "Christian", community: "Mangalorean", profession: "Chef", education: "Diploma", income: "14 LPA" },
  { name: "Pallavi Deshmukh", age: 31, height: "5'4\"", city: "Pune", religion: "Hindu", community: "Maratha", profession: "Professor", education: "Ph.D", income: "18 LPA" },
  { name: "Suresh Reddy", age: 34, height: "5'7\"", city: "Hyderabad", religion: "Hindu", community: "Reddy", profession: "Real Estate Developer", education: "B.Tech", income: "45 LPA" },
  { name: "Ayesha Noor", age: 25, height: "5'5\"", city: "Bengaluru", religion: "Muslim", community: "Keralite", profession: "Content Writer", education: "M.A.", income: "10 LPA" },
  { name: "Rohit Yadav", age: 28, height: "5'10\"", city: "Mumbai", religion: "Hindu", community: "Yadav", profession: "Actor", education: "NSD", income: "35 LPA" },
  { name: "Sonia Mehta", age: 32, height: "5'2\"", city: "Delhi", religion: "Jain", community: "Oswal", profession: "Financial Advisor", education: "MBA", income: "20 LPA" },
  { name: "Anil Kumar", age: 35, height: "5'6\"", city: "Chennai", religion: "Buddhist", community: "Mahar", profession: "Social Worker", education: "MSW", income: "9 LPA" },
  { name: "Ritu Agarwal", age: 24, height: "5'1\"", city: "Ahmedabad", religion: "Hindu", community: "Vaishnav", profession: "Fashion Blogger", education: "B.A.", income: "8 LPA" },
  { name: "Manoj Pillai", age: 30, height: "5'8\"", city: "Kolkata", religion: "Hindu", community: "Nair", profession: "Banker", education: "MBA", income: "22 LPA" },
  { name: "Samira Hassan", age: 26, height: "5'4\"", city: "Lucknow", religion: "Muslim", community: "Syed", profession: "Doctor", education: "MBBS", income: "18 LPA" },
  { name: "Kiran Raj", age: 29, height: "5'9\"", city: "Bengaluru", religion: "Hindu", community: "Vokkaliga", profession: "Tech Lead", education: "M.Tech", income: "28 LPA" },
  { name: "Tanya Kapoor", age: 25, height: "5'3\"", city: "Chandigarh", religion: "Hindu", community: "Khatri", profession: "Psychologist", education: "M.A.", income: "12 LPA" },
];

export const profiles: Profile[] = data.map((d, i) => ({
  id: `SG${2001 + i}`,
  ...d,
  about: i % 3 === 0
    ? "Warm, family-oriented, and passionate about life. Loves travel, books, and meaningful conversations over coffee. Looking for a kind, ambitious partner to build a beautiful future together."
    : i % 3 === 1
    ? "Simple and down-to-earth person who values traditions yet embraces modernity. Enjoys cooking, trekking, and spending time with family. Seeking a respectful and understanding life partner."
    : "Ambitious professional with a love for adventure and culture. Believes in equality, mutual respect, and growing together. Looking for someone with a great sense of humor and a kind heart.",
  image: photos[i % photos.length],
  premium: i % 4 === 0,
  verified: i % 2 === 0,
}));

export const getProfile = (id: string) => profiles.find((p) => p.id === id);
