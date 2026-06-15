import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Send, Search, Phone, Video, MoreVertical, Smile, Paperclip, CheckCheck } from "lucide-react";
import { useState, useMemo, useEffect, type FormEvent } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProfileImage } from "@/components/site/ProfileImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profiles } from "@/lib/profiles";
import { useStore } from "@/lib/store";
import type { AppMessage } from "@/lib/store";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Messages — Sangam Matrimony" }] }),
  component: Chat,
});

function Chat() {
  const { sendMessage, getMessages, state } = useStore();
  const { user, conversations } = state;
  const { userId: urlUserId } = useSearch({ from: Route.id, shouldThrow: false }) as { userId?: string } ?? {};

  const [activeId, setActiveId] = useState(urlUserId ?? "");
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");

  const chatList = useMemo(() => {
    const all = profiles.filter(p => p.id !== user?.id);
    const convKeys = new Set(Object.keys(conversations ?? {}).filter(k => (conversations[k] ?? []).length > 0));
    const withChat: Profile[] = [];
    const without: Profile[] = [];
    for (const p of all) {
      if (convKeys.has(p.id)) withChat.push(p);
      else without.push(p);
    }
    const sorted = [...withChat, ...without];
    if (search) return sorted.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    return sorted;
  }, [profiles, conversations, search, user]);

  useEffect(() => {
    if (!activeId && chatList.length > 0) setActiveId(chatList[0].id);
  }, [chatList, activeId]);

  const active = profiles.find((p) => p.id === activeId);
  const msgs = getMessages(activeId);

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!active || !draft.trim() || !user) return;
    sendMessage(activeId, draft.trim());
    setDraft("");
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="grid h-[70vh] grid-cols-1 md:grid-cols-[320px_1fr]">
            <aside className="border-r border-border bg-muted/30">
              <div className="border-b border-border p-4">
                <h2 className="font-display text-lg font-bold">Messages</h2>
                <div className="relative mt-3">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search chats" className="pl-9" />
                </div>
              </div>
              <ul className="overflow-y-auto">
                {chatList.map((p) => {
                  const conv = getMessages(p.id);
                  const last = conv[conv.length - 1];
                  return (
                    <li key={p.id}>
                      <button
                        onClick={() => setActiveId(p.id)}
                        className={`flex w-full items-center gap-3 border-b border-border/60 p-3 text-left transition hover:bg-background ${
                          activeId === p.id ? "bg-background" : ""
                        }`}
                      >
                        <div className="relative">
                          <ProfileImage src={p.image} name={p.name} className="h-11 w-11 rounded-full object-cover" />
                          {p.premium && <span className="absolute -right-0.5 bottom-0 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="truncate text-sm font-semibold">{p.name}</p>
                            <span className="text-[10px] text-muted-foreground">{last ? new Date(last.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}</span>
                          </div>
                          <p className="truncate text-xs text-muted-foreground">{last?.text ?? "Say hi 👋"}</p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {!active ? (
              <div className="flex items-center justify-center bg-muted/30">
                <p className="text-sm text-muted-foreground">Select a conversation to start chatting.</p>
              </div>
            ) : (
            <div className="flex flex-col">
              <header className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <ProfileImage src={active.image} name={active.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{active.name}</p>
                    <p className="text-xs text-emerald-600">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                </div>
              </header>

              <div className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
                {msgs.length === 0 && (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">Send a message to start the conversation.</p>
                  </div>
                )}
                {msgs.map((m) => {
                  const isMe = m.fromUserId === user?.id;
                  return (
                    <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-soft ${
                          isMe
                            ? "rounded-br-sm bg-gradient-primary text-primary-foreground"
                            : "rounded-bl-sm bg-card"
                        }`}
                      >
                        <p>{m.text}</p>
                        <p className={`mt-1 flex items-center gap-1 text-[10px] ${isMe ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          {isMe && <CheckCheck className="h-3 w-3" />}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
                <Button type="button" variant="ghost" size="icon"><Smile className="h-4 w-4" /></Button>
                <Button type="button" variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a message…" className="flex-1" />
                <Button type="submit" className="bg-gradient-primary shadow-glow"><Send className="h-4 w-4" /></Button>
              </form>
            </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
