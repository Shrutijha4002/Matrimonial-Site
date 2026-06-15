import { createContext, useContext, useReducer, useEffect, type ReactNode, useCallback } from "react";
import { profiles as mockProfiles, type Profile } from "./profiles";

type Gender = "male" | "female";
type ProfileFor = "self" | "son" | "daughter" | "sibling";
type InterestStatus = "pending" | "accepted" | "declined";
type NotifType = "interest" | "view" | "message" | "shortlist" | "system";

export interface AppUser {
  id: string;
  email: string;
  name: string;
  gender: Gender;
  profileFor: ProfileFor;
  phone: string;
  createdAt: string;
}

export interface UserProfile {
  userId: string;
  name: string;
  age: number;
  gender: string;
  height: string;
  maritalStatus: string;
  city: string;
  religion: string;
  community: string;
  motherTongue: string;
  education: string;
  employedIn: string;
  profession: string;
  income: string;
  about: string;
  photos: string[];
  familyFatherOcc: string;
  familyMotherOcc: string;
  familyBrothers: number;
  familySisters: number;
  familyType: string;
  familyValues: string;
  partnerAge: string;
  partnerHeight: string;
  partnerReligion: string;
  partnerCommunity: string;
  partnerLocation: string;
  partnerEducation: string;
  partnerProfession: string;
  partnerIncome: string;
  partnerNote: string;
  premium: boolean;
  verified: boolean;
  horoscopeDob: string;
  horoscopeTime: string;
  horoscopePlace: string;
  horoscopeManglik: string;
  horoscopeNakshatra: string;
  horoscopeRashi: string;
  horoscopeGotra: string;
  idVerified: boolean;
}

export interface Interest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: InterestStatus;
  createdAt: string;
}

export interface AppMessage {
  id: number;
  fromUserId: string;
  text: string;
  timestamp: number;
}

export interface AppNotification {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  timestamp: number;
  unread: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  gender: Gender;
  profileFor: ProfileFor;
  phone: string;
}

function uid() { return Math.random().toString(36).slice(2, 10); }
function now() { return new Date().toISOString(); }
function shortTs() { return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }

function loadJSON<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

// ─── State ────────────────────────────────────────────────────
interface StoreState {
  user: AppUser | null;
  hydrated: boolean;
  profiles: Profile[];
  myProfile: UserProfile | null;
  interests: Interest[];
  shortlistedIds: string[];
  conversations: Record<string, AppMessage[]>;
  notifications: AppNotification[];
  notifCounter: number;
  otp: string;
}

function generateOtp() {
  return String(100000 + Math.floor(Math.random() * 900000));
}

const initial: StoreState = {
  user: null,
  hydrated: false,
  profiles: mockProfiles,
  myProfile: null,
  interests: [],
  shortlistedIds: [],
  conversations: {},
  notifications: [],
  notifCounter: 6,
  otp: "",
};

// ─── Actions ───────────────────────────────────────────────────
type Action =
  | { type: "REGISTER"; user: AppUser }
  | { type: "LOGIN"; user: AppUser }
  | { type: "LOGOUT" }
  | { type: "SET_PROFILE"; profile: UserProfile }
  | { type: "ADD_INTEREST"; interest: Interest }
  | { type: "UPDATE_INTEREST"; id: string; status: InterestStatus }
  | { type: "TOGGLE_SHORTLIST"; id: string }
  | { type: "SEND_MESSAGE"; to: string; msg: AppMessage }
  | { type: "ADD_NOTIFICATION"; n: AppNotification }
  | { type: "MARK_ALL_READ" }
  | { type: "SET_OTP"; otp: string }
  | { type: "HYDRATE"; state: Partial<StoreState> };

function reducer(st: StoreState, a: Action): StoreState {
  switch (a.type) {
    case "REGISTER":
    case "LOGIN":
      return { ...st, user: a.user };
    case "LOGOUT":
      return { ...st, user: null, myProfile: null };
    case "SET_PROFILE":
      return { ...st, myProfile: a.profile };
    case "ADD_INTEREST":
      return { ...st, interests: [...st.interests, a.interest] };
    case "UPDATE_INTEREST":
      return { ...st, interests: st.interests.map(i => i.id === a.id ? { ...i, status: a.status } : i) };
    case "TOGGLE_SHORTLIST": {
      const set = new Set(st.shortlistedIds);
      if (set.has(a.id)) set.delete(a.id); else set.add(a.id);
      return { ...st, shortlistedIds: [...set] };
    }
    case "SEND_MESSAGE": {
      const conv = { ...st.conversations };
      const key = a.to;
      conv[key] = [...(conv[key] ?? []), a.msg];
      return { ...st, conversations: conv };
    }
    case "ADD_NOTIFICATION":
      return { ...st, notifications: [a.n, ...st.notifications].slice(0, 50) };
    case "MARK_ALL_READ":
      return { ...st, notifications: st.notifications.map(n => ({ ...n, unread: false })) };
    case "SET_OTP":
      return { ...st, otp: a.otp };
    case "HYDRATE":
      return { ...st, ...a.state, hydrated: true };
    default:
      return st;
  }
}

// ─── Context ───────────────────────────────────────────────────
interface StoreCtx {
  state: StoreState;
  dispatch: React.Dispatch<Action>;
  // Convenience methods
  register: (d: RegisterData) => void;
  login: (email: string, password: string) => boolean;
  verifyOtp: (code: string) => boolean;
  logout: () => void;
  updateProfile: (d: Partial<UserProfile>) => void;
  sendInterest: (toUserId: string) => void;
  respondToInterest: (id: string, status: InterestStatus) => void;
  toggleShortlist: (profileId: string) => void;
  isShortlisted: (profileId: string) => boolean;
  sendMessage: (toUserId: string, text: string) => void;
  getMessages: (userId: string) => AppMessage[];
  addNotification: (type: NotifType, title: string, body: string) => void;
  markAllRead: () => void;
  unreadCount: number;
}

const Ctx = createContext<StoreCtx>(null!);
export function useStore() { return useContext(Ctx); }

const STORAGE_KEYS = ["user", "myProfile", "interests", "shortlistedIds", "conversations", "notifications", "notifCounter", "otp"];

const DEMO_REPLIES: Record<string, string[]> = {
  default: [
    "Hey! Thanks for reaching out. I'd love to know more about you.",
    "Lovely to connect with you! 😊",
    "Thanks for your interest. Tell me a bit about yourself.",
    "Hi there! I'm glad we matched. What do you like to do in your free time?",
    "Hello! Your profile looks interesting. Let's get to know each other!",
    "Hey! Thanks for the message. I'm looking for someone kind and understanding.",
    "Hi! I appreciate you reaching out. Where are you from?",
    "Hello there! I think we might be a good match. What do you think?",
    "Thanks for messaging! I'm excited to see where this goes.",
    "Hey! How was your day?",
  ],
};

function getRandomReply(existing?: AppMessage[]): string {
  const pool = DEMO_REPLIES.default;
  if (existing && existing.length > 0) {
    const followups = [
      "That's great to know! What else should I know about you?",
      "Interesting! I feel the same way. 😊",
      "I totally get that. Family is very important to me too.",
      "That's wonderful! I'm sure we'll get along well.",
      "I see we have a lot in common! What's your ideal weekend like?",
      "That's really nice. I value honesty and trust above all.",
      "Thanks for sharing! What kind of partner are you looking for?",
      "Sounds perfect! Do you enjoy traveling?",
      "I agree completely. Communication is key in any relationship.",
      "That means a lot. I'm looking for something real too.",
    ];
    return followups[existing.length % followups.length];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial, () => {
    const hydrated: Partial<StoreState> = {};
    for (const k of STORAGE_KEYS) {
      (hydrated as any)[k] = loadJSON(`sangam_${k}`, (initial as any)[k]);
    }
    return { ...initial, ...hydrated };
  });

  // Re-hydrate from localStorage on client mount (fixes SSR hydration)
  useEffect(() => {
    const hydrated: Partial<StoreState> = {};
    for (const k of STORAGE_KEYS) {
      (hydrated as any)[k] = loadJSON(`sangam_${k}`, (initial as any)[k]);
    }
    dispatch({ type: "HYDRATE", state: hydrated });
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    for (const k of STORAGE_KEYS) {
      localStorage.setItem(`sangam_${k}`, JSON.stringify((state as any)[k]));
    }
  }, [state]);

  const register = useCallback((d: RegisterData) => {
    const user: AppUser = { id: uid(), email: d.email, name: d.name, gender: d.gender, profileFor: d.profileFor, phone: d.phone, createdAt: now() };
    const otp = generateOtp();
    localStorage.setItem("sangam_registered_user", JSON.stringify({ ...user, password: d.password }));
    localStorage.setItem("sangam_pending_otp", otp);
    dispatch({ type: "REGISTER", user });
    dispatch({ type: "SET_OTP", otp });
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const stored = loadJSON<AppUser & { password: string } | null>("sangam_registered_user", null);
    if (stored && stored.email === email && stored.password === password) {
      const { password: _, ...user } = stored;
      dispatch({ type: "LOGIN", user });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => dispatch({ type: "LOGOUT" }), []);

  const verifyOtp = useCallback((code: string): boolean => {
    const stored = loadJSON<string>("sangam_pending_otp", "");
    if (code === state.otp || code === stored) {
      localStorage.removeItem("sangam_pending_otp");
      dispatch({ type: "SET_OTP", otp: "" });
      return true;
    }
    return false;
  }, [state.otp]);

  const updateProfile = useCallback((d: Partial<UserProfile>) => {
    const existing = state.myProfile;
    const updated: UserProfile = { ...defaultProfile(state.user!), ...existing, ...d, userId: state.user!.id };
    dispatch({ type: "SET_PROFILE", profile: updated });
  }, [state.user, state.myProfile]);

  const sendInterest = useCallback((toUserId: string) => {
    const interest: Interest = { id: uid(), fromUserId: state.user!.id, toUserId, status: "pending", createdAt: now() };
    dispatch({ type: "ADD_INTEREST", interest });
    dispatch({ type: "ADD_NOTIFICATION", n: { id: state.notifCounter + 1, type: "interest", title: "Interest sent!", body: `You sent an interest. Waiting for response.`, timestamp: Date.now(), unread: true } });
  }, [state.user, state.notifCounter]);

  const respondToInterest = useCallback((id: string, status: InterestStatus) => {
    dispatch({ type: "UPDATE_INTEREST", id, status });
    const interest = state.interests.find(i => i.id === id);
    if (interest) {
      const p = state.profiles.find(x => x.id === interest.fromUserId);
      dispatch({ type: "ADD_NOTIFICATION", n: { id: Date.now(), type: "interest", title: `Interest ${status}`, body: `You ${status} interest from ${p?.name ?? "a member"}.`, timestamp: Date.now(), unread: true } });
    }
  }, [state.interests, state.profiles]);

  const toggleShortlist = useCallback((profileId: string) => {
    dispatch({ type: "TOGGLE_SHORTLIST", id: profileId });
    const isShortlisted = state.shortlistedIds.includes(profileId);
    const p = state.profiles.find(x => x.id === profileId);
    dispatch({ type: "ADD_NOTIFICATION", n: { id: Date.now(), type: "shortlist", title: isShortlisted ? "Removed from shortlist" : "Shortlisted!", body: isShortlisted ? `Removed ${p?.name ?? "profile"} from shortlist.` : `Added ${p?.name ?? "profile"} to shortlist.`, timestamp: Date.now(), unread: true } });
  }, [state.shortlistedIds, state.profiles]);

  const isShortlisted = useCallback((profileId: string) => state.shortlistedIds.includes(profileId), [state.shortlistedIds]);

  const sendMessage = useCallback((toUserId: string, text: string) => {
    const msg: AppMessage = { id: Date.now(), fromUserId: state.user!.id, text, timestamp: Date.now() };
    dispatch({ type: "SEND_MESSAGE", to: toUserId, msg });
    const profile = state.profiles.find(p => p.id === toUserId);
    const name = profile?.name ?? "User";
    setTimeout(() => {
      const allConvs = loadJSON<Record<string, AppMessage[]> | null>("sangam_conversations", null);
      const existing = allConvs?.[toUserId] ?? [];
      const replyText = getRandomReply(existing ?? []);
      const reply: AppMessage = { id: Date.now() + 1, fromUserId: toUserId, text: replyText, timestamp: Date.now() };
      dispatch({ type: "SEND_MESSAGE", to: toUserId, msg: reply });
      dispatch({ type: "ADD_NOTIFICATION", n: { id: Date.now(), type: "message", title: name, body: replyText, timestamp: Date.now(), unread: true } });
    }, 1500 + Math.random() * 2000);
  }, [state.user, state.profiles]);

  const getMessages = useCallback((userId: string) => state.conversations[userId] ?? [], [state.conversations]);

  const addNotification = useCallback((type: NotifType, title: string, body: string) => {
    dispatch({ type: "ADD_NOTIFICATION", n: { id: Date.now(), type, title, body, timestamp: Date.now(), unread: true } });
  }, []);

  const markAllRead = useCallback(() => dispatch({ type: "MARK_ALL_READ" }), []);

  const unreadCount = state.notifications.filter(n => n.unread).length;

  return (
    <Ctx.Provider value={{
      state, dispatch,
      register, login, logout, verifyOtp,
      updateProfile,
      sendInterest, respondToInterest,
      toggleShortlist, isShortlisted,
      sendMessage, getMessages,
      addNotification, markAllRead,
      unreadCount,
    }}>
      {children}
    </Ctx.Provider>
  );
}

function defaultProfile(user: AppUser): UserProfile {
  return {
    userId: user.id,
    name: user.name,
    age: 28, gender: user.gender,
    height: "5'5\"",
    maritalStatus: "never",
    city: "", religion: "", community: "", motherTongue: "",
    education: "", employedIn: "", profession: "", income: "",
    about: "",
    photos: [],
    familyFatherOcc: "", familyMotherOcc: "", familyBrothers: 0, familySisters: 0,
    familyType: "nuclear", familyValues: "moderate",
    partnerAge: "", partnerHeight: "", partnerReligion: "", partnerCommunity: "",
    partnerLocation: "", partnerEducation: "", partnerProfession: "", partnerIncome: "",
    partnerNote: "",
    premium: false, verified: false,
    horoscopeDob: "", horoscopeTime: "", horoscopePlace: "", horoscopeManglik: "",
    horoscopeNakshatra: "", horoscopeRashi: "", horoscopeGotra: "",
    idVerified: false,
  };
}
