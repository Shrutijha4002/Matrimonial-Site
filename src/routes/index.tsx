import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { SearchPartner } from "@/components/site/SearchPartner";
import { SuccessStories } from "@/components/site/SuccessStories";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Communities } from "@/components/site/Communities";
import { Testimonials } from "@/components/site/Testimonials";
import { CallToAction } from "@/components/site/CallToAction";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sangam — Modern Matrimonial Platform for Meaningful Matches" },
      {
        name: "description",
        content:
          "Find your life partner on Sangam — a premium matrimonial platform with verified profiles, intelligent matchmaking, and private chat.",
      },
      { property: "og:title", content: "Sangam — Modern Matrimonial Platform" },
      {
        property: "og:description",
        content:
          "Verified profiles, intelligent matchmaking, and meaningful conversations that lead to forever.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background">
      <Navbar />
      <main>
        <Hero />
        <SearchPartner />
        <SuccessStories />
        <HowItWorks />
        <Communities />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
