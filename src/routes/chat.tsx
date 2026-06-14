import { createFileRoute } from "@tanstack/react-router";
import { Send, Search, Phone, Video, MoreVertical, Smile, Paperclip, CheckCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { profiles } from "@/lib/profiles";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Messages — Sangam Matrimony" }] }),
  component: Chat,
});

type Msg = { id: number; from: "me" | "them"; text: string; at: string };

const initial: Record<string, Msg[]> = {
  SG1001: [
    { id: 1, from: "them", text: "Hi Aanya, lovely to connect 🙂", at: "10:14 AM" },
    { id: 2, from: "me", text: "Hi! Thanks for the kind words. How was your weekend?", at: "10:16 AM" },
    { id: 3, from: "them", text: "Quiet and book-filled. You?", at: "10:17 AM" },
  ],
  SG1002: [{ id: 1, from: "them", text: "Looking forward to chatting!", at: "Yesterday" }],
  SG1003: [{ id: 1, from: "me", text: "Hey, our families seem to have a lot in common 🙏", at: "Mon" }],
};

function Chat() {
  const chatList = profiles.slice(0, 6);
  const [activeId, setActiveId] = useState(chatList[0].id);
  const [allMsgs, setAllMsgs] = useState(initial);
  const [draft, setDraft] = useState("");

  const active = profiles.find((p) => p.id === activeId)!;
  const msgs = allMsgs[activeId] ?? [];

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const next: Msg = { id: Date.now(), from: "me", text: draft.trim(), at: "Now" };
    setAllMsgs({ ...allMsgs, [activeId]: [...msgs, next] });
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
                  <Input placeholder="Search chats" className="pl-9" />
                </div>
              </div>
              <ul className="overflow-y-auto">
                {chatList.map((p, i) => {
                  const last = (allMsgs[p.id] ?? [])[ (allMsgs[p.id]?.length ?? 1) - 1 ];
                  return (
                    <li key={p.id}>
                      <button
                        onClick={() => setActiveId(p.id)}
                        className={`flex w-full items-center gap-3 border-b border-border/60 p-3 text-left transition hover:bg-background ${
                          activeId === p.id ? "bg-background" : ""
                        }`}
                      >
                        <div className="relative">
                          <img src={p.image} alt="" className="h-11 w-11 rounded-full object-cover" />
                          {i % 3 === 0 && <span className="absolute -right-0.5 bottom-0 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="truncate text-sm font-semibold">{p.name}</p>
                            <span className="text-[10px] text-muted-foreground">{last?.at ?? ""}</span>
                          </div>
                          <p className="truncate text-xs text-muted-foreground">{last?.text ?? "Say hi 👋"}</p>
                        </div>
                        {i === 1 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">2</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <div className="flex flex-col">
              <header className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <img src={active.image} alt="" className="h-10 w-10 rounded-full object-cover" />
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
                {msgs.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-soft ${
                        m.from === "me"
                          ? "rounded-br-sm bg-gradient-primary text-primary-foreground"
                          : "rounded-bl-sm bg-card"
                      }`}
                    >
                      <p>{m.text}</p>
                      <p className={`mt-1 flex items-center gap-1 text-[10px] ${m.from === "me" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {m.at} {m.from === "me" && <CheckCheck className="h-3 w-3" />}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
                <Button type="button" variant="ghost" size="icon"><Smile className="h-4 w-4" /></Button>
                <Button type="button" variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a message…" className="flex-1" />
                <Button type="submit" className="bg-gradient-primary shadow-glow"><Send className="h-4 w-4" /></Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
