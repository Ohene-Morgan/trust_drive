import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  ClipboardCheck,
  GraduationCap,
  MapPin,
  Menu,
  Phone,
  Plus,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-driving.jpg";
import roadImage from "@/assets/road-journey.jpg";
import steeringImage from "@/assets/steering-lesson.jpg";
import logoImage from "@/assets/trust-driving-logo.png";
import logoImageDark from "@/assets/trust-driving-logo-dark.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trust Driving Solution | Professional Driving School" },
      { name: "description", content: "Learn to drive safely and confidently with patient instructors, structured lessons, and practical road training." },
      { property: "og:title", content: "Trust Driving Solution | Professional Driving School" },
      { property: "og:description", content: "Professional driver training built around safety, confidence, and lasting road skills." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const navItems = [
  ["About", "about"],
  ["Lessons", "lessons"],
  ["Pricing", "pricing"],
  ["Why TDS", "why-tds"],
  ["How it works", "how-it-works"],
  ["Reviews", "reviews"],
  ["FAQ", "faq"],
  ["Find us", "find-us"],
] as const;

const businessLocation = {
  address: "Oscar Road, Kwabenya, Accra, Ghana",
  phone: "+233 20 766 6778",
  phoneHref: "tel:+233207666778",
  mapsUrl: "https://maps.app.goo.gl/xpD82oLjii4THMwT8",
  mapsEmbedSrc: "https://www.google.com/maps?q=Trust+Driving+Solution,+Oscar+Road,+Kwabenya,+Accra,+Ghana&ll=5.685465,-0.2451969&z=16&output=embed",
};

const packages = [
  {
    name: "Standard",
    price: "1,250",
    tagline: "The complete foundation for new drivers.",
    features: ["Core driving lessons", "Road test preparation", "Flexible scheduling"],
    featured: false,
  },
  {
    name: "Premium",
    price: "1,650",
    tagline: "Extra practice and personal coaching.",
    features: ["Everything in Standard", "Extended on-road practice", "Mock road test with feedback", "Priority scheduling"],
    featured: true,
  },
  {
    name: "Express",
    price: "2,050",
    tagline: "An intensive route for fast results.",
    features: ["Everything in Premium", "Intensive fast-track schedule", "Focused one-on-one coaching"],
    featured: false,
  },
];

const refresher = {
  name: "Refresher",
  price: "950",
  tagline: "A short tune-up for licensed drivers — not a full course.",
  features: ["Tailored to the skills you want to rebuild", "Flexible per-session scheduling", "Ideal after a break from driving"],
};

const lessons = [
  { icon: CarFront, title: "Beginner Driving", text: "Build vehicle control and road awareness at a comfortable pace." },
  { icon: ShieldCheck, title: "Defensive Driving", text: "Develop hazard awareness and safer decisions for everyday roads." },
  { icon: ClipboardCheck, title: "Road Test Preparation", text: "Prepare with focused training and realistic mock tests." },
  { icon: RefreshCw, title: "Refresher Lessons", text: "Rebuild confidence and sharpen specific skills with a tailored plan." },
];

const reviews = [
  ["The instructors were patient, professional, and clear. I passed first time.", "Sarah K.", "Beginner driver"],
  ["Every lesson was well structured and matched my needs. Highly recommend TDS.", "Daniel T.", "Road test preparation"],
  ["I came for a refresher and left feeling calm, capable, and much more confident.", "Aisha M.", "Refresher lessons"],
];

const faqs = [
  { q: "How many lessons will I need before my test?", a: "Most learners are test-ready after 15–20 lessons, though this depends on prior experience and how often you practise. We'll give you an honest estimate after your first lesson." },
  { q: "Do you provide the car for lessons and the test?", a: "Yes. Every package includes full use of a dual-control training vehicle for lessons, and it's available for your road test too." },
  { q: "Can I reschedule or pause my lessons?", a: "Lessons can be rescheduled with at least 24 hours' notice, and packages can be paused if life gets in the way — just let your instructor know." },
  { q: "I already have a licence — is the Refresher course for me?", a: "If you're returning to driving after a break, or want to sharpen specific skills, the Refresher is built exactly for that. It's not a full course." },
  { q: "Do you help with booking the official driving test?", a: "Yes, we'll guide you through booking your test and make sure your mock results show you're ready before you sit it." },
];

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", ...navItems.map(([, id]) => id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md transition-[height,box-shadow,border-color] duration-300 ${scrolled ? "border-border shadow-[0_1px_20px_-8px_rgba(0,0,0,0.15)]" : "border-transparent"}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 lg:px-8 ${scrolled ? "h-16" : "h-20"}`}>
          <button onClick={() => scrollTo("home")} className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="Go to homepage">
            <img src={logoImage} alt="Trust Driving Solution" className={`w-auto max-w-48 object-contain transition-[height] duration-300 ${scrolled ? "h-11" : "h-14"}`} />
          </button>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navItems.map(([label, id]) => {
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`group relative px-3 py-2 text-[15px] font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {label}
                  <span className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </button>
              );
            })}
          </nav>
          <div className="hidden lg:block">
            <Button variant="dark" onClick={() => scrollTo("contact")} className="group">
              Book a lesson <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen((open) => !open)} className="lg:hidden" aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && (
          <nav className="animate-in fade-in slide-in-from-top-2 border-t border-border bg-background px-5 py-4 duration-200 lg:hidden" aria-label="Mobile navigation">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`block w-full py-2.5 text-left text-[15px] font-medium ${activeSection === id ? "text-primary" : "text-foreground"}`}
              >
                {label}
              </button>
            ))}
            <Button variant="dark" onClick={() => scrollTo("contact")} className="mt-3 w-full">Book a lesson</Button>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
          <div className="max-w-xl">
            <SectionLabel>Professional driving instruction</SectionLabel>
            <h1 className="mt-7 text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">Master the road with confidence.</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">Patient, practical driving lessons designed around your pace, your goals, and the skills you need for the road.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => scrollTo("contact")}>Book your first lesson <ArrowRight className="size-4" /></Button>
              <Button variant="secondary" size="lg" onClick={() => scrollTo("lessons")}>Explore lessons</Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-2"><Check className="size-4 text-primary" />Safety focused</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-primary" />Patient instructors</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-primary" />Flexible lessons</span>
            </div>
          </div>
          <div className="relative lg:pl-4">
            <div className="overflow-hidden rounded-2xl bg-card p-2 shadow-brand">
              <img src={heroImage} alt="Student learning to drive with a professional instructor" width={1920} height={1088} className="aspect-[4/3] w-full rounded-xl object-cover object-[65%_center]" />
              <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
                <div><p className="font-display font-semibold">Practical lessons. Lasting confidence.</p><p className="mt-1 text-sm text-muted-foreground">Learn calmly, progress clearly.</p></div>
                <ShieldCheck className="size-7 shrink-0 text-primary" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
            <img src={roadImage} alt="Car driving safely on an open country road" width={1280} height={800} loading="lazy" className="aspect-[7/5] w-full rounded-xl object-cover" />
            <div className="lg:pl-8"><SectionLabel>About TDS</SectionLabel><h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Safer habits start with better teaching.</h2><p className="mt-6 leading-7 text-muted-foreground">Driving is freedom, independence, and responsibility. We help learners develop calm judgment, sound habits, and confidence that lasts beyond the test.</p><Button variant="secondary" className="mt-8" onClick={() => scrollTo("lessons")}>Explore our lessons <ArrowRight className="size-4" /></Button></div>
          </div>
        </section>

        <section id="lessons" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionLabel>What we teach</SectionLabel><h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Lessons for every stage.</h2></div><div className="grid sm:grid-cols-2">{lessons.map(({ icon: Icon, title, text }, index) => <article key={title} className={`border-border py-7 sm:px-7 ${index < 2 ? "border-b" : ""} ${index % 2 === 1 ? "sm:border-l" : "sm:pl-0"}`}><Icon className="size-7 text-primary" /><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p><Button variant="ghost" size="sm" onClick={() => scrollTo("contact")} className="mt-4 min-h-0 px-0 text-primary hover:bg-transparent">Enquire <ArrowRight className="size-4" /></Button></article>)}</div></div>
        </section>

        <section id="why-tds" className="bg-dark-surface text-primary-foreground">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-28">
            <div><SectionLabel tone="dark">Why choose TDS</SectionLabel><h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Safety is not a module. It is the method.</h2><ul className="mt-8 grid gap-4 text-sm text-primary-foreground/75 sm:grid-cols-2">{["Experienced instructors", "Practical road training", "Personalised lesson plans", "Flexible scheduling"].map((item) => <li key={item} className="flex items-center gap-3"><Check className="size-4 text-brand-gold" />{item}</li>)}</ul></div>
            <img src={steeringImage} alt="Learner holding a steering wheel during a road lesson" width={1280} height={800} loading="lazy" className="aspect-[7/5] w-full rounded-xl object-cover" />
          </div>
        </section>

        <section id="pricing" className="border-t border-border">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Straightforward packages, no surprises.</h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {packages.map(({ name, price, tagline, features, featured }) => (
                <article key={name} className={featured ? "flex flex-col rounded-xl bg-dark-surface p-8 text-primary-foreground shadow-brand" : "flex flex-col rounded-xl border border-border p-8"}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    {featured && <span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-dark-surface">Most popular</span>}
                  </div>
                  <p className={`mt-2 text-sm leading-6 ${featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{tagline}</p>
                  <p className="mt-7 font-display text-5xl font-semibold tracking-tight">₵{price}</p>
                  <ul className={`mt-7 flex flex-col gap-3 border-t pt-7 text-sm ${featured ? "border-primary-foreground/15" : "border-border"}`}>
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3"><Check className={`size-4 shrink-0 ${featured ? "text-brand-gold" : "text-primary"}`} />{feature}</li>
                    ))}
                  </ul>
                  <Button variant={featured ? "light" : "secondary"} className="mt-8 w-full sm:w-auto sm:self-start" onClick={() => scrollTo("contact")}>Book {name}</Button>
                </article>
              ))}
            </div>
            <article className="mt-6 rounded-xl border border-border border-l-4 border-l-primary p-8 lg:px-12 lg:py-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <RefreshCw className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">{refresher.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{refresher.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:shrink-0">
                  <p className="font-display text-3xl font-semibold tracking-tight">₵{refresher.price}</p>
                  <Button variant="secondary" onClick={() => scrollTo("contact")}>Book {refresher.name}</Button>
                </div>
              </div>
              <ul className="mt-7 flex flex-col gap-3 border-t border-border pt-6 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
                {refresher.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{feature}</li>
                ))}
              </ul>
            </article>
            <p className="mt-8 text-sm text-muted-foreground">Need single lessons or something more tailored? <Button variant="ghost" size="sm" onClick={() => scrollTo("contact")} className="min-h-0 px-0 text-primary underline-offset-4 hover:bg-transparent hover:underline">Get in touch <ArrowRight className="size-4" /></Button></p>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionLabel>How it works</SectionLabel><h2 className="mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Three simple steps to the road.</h2>
          <div className="mt-12 grid border-y border-border md:grid-cols-3">{[[CalendarDays, "01", "Book your lesson", "Choose the lesson type and time that works for you."], [GraduationCap, "02", "Learn and practise", "Train on the road with a calm, experienced instructor."], [CarFront, "03", "Drive with confidence", "Prepare thoroughly and build lasting independence."]].map(([Icon, number, title, text], index) => { const StepIcon = Icon as typeof CalendarDays; return <article key={String(number)} className={`py-8 md:px-8 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : "md:pl-0"}`}><div className="flex items-center justify-between"><span className="flex size-9 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">{String(number)}</span><StepIcon className="size-6 text-primary" /></div><h3 className="mt-8 text-xl font-semibold">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{String(text)}</p></article>})}</div>
          <div id="contact" className="mt-16 flex flex-col items-start justify-between gap-8 rounded-xl bg-secondary p-8 sm:flex-row sm:items-center lg:p-12"><div><p className="text-sm font-semibold text-primary">Ready to start?</p><h3 className="mt-2 max-w-xl text-2xl font-semibold sm:text-3xl">Take the first step toward confident driving.</h3></div><Button size="lg" onClick={() => { window.location.href = "mailto:hello@trustdriving.example?subject=Lesson enquiry"; }}>Book your first lesson <ArrowRight className="size-4" /></Button></div>
        </section>

        <section id="reviews" className="border-t border-border bg-card"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><SectionLabel>Student stories</SectionLabel><h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Calm lessons. Real progress.</h2></div></div><div className="mt-12 grid gap-10 md:grid-cols-3">{reviews.map(([quote, name, course], index) => <figure key={name} className={index > 0 ? "md:border-l md:border-border md:pl-8" : ""}><blockquote className="text-lg leading-8">“{quote}”</blockquote><figcaption className="mt-7 text-sm"><p className="font-semibold">{name}</p><p className="mt-1 text-muted-foreground">{course}</p></figcaption></figure>)}</div></div></section>

        <section id="faq" className="border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Questions, answered.</h2>
            <div className="mt-12 flex flex-col gap-3">
              {faqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <div key={faq.q} className="rounded-2xl border border-border bg-card">
                    <button
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                      aria-expanded={open}
                    >
                      <span className="text-base font-semibold sm:text-lg">{faq.q}</span>
                      <span className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
                        <Plus className="size-4" />
                      </span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 text-sm leading-6 text-muted-foreground">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="find-us" className="border-t border-border bg-card">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-28">
            <div>
              <SectionLabel>Find us</SectionLabel>
              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Visit us in Kwabenya.</h2>
              <p className="mt-6 leading-7 text-muted-foreground">Come by, call ahead, or just drop us a line — we're easy to find on Oscar Road.</p>
              <div className="mt-8 flex flex-col gap-4 text-sm">
                <a href={businessLocation.mapsUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-primary">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                  {businessLocation.address}
                </a>
                <a href={businessLocation.phoneHref} className="flex items-center gap-3 hover:text-primary">
                  <Phone className="size-5 shrink-0 text-primary" />
                  {businessLocation.phone}
                </a>
              </div>
              <Button variant="secondary" className="mt-8" onClick={() => window.open(businessLocation.mapsUrl, "_blank")}>
                Get directions <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="overflow-hidden rounded-xl border border-border shadow-brand">
              <iframe
                title="Trust Driving Solution location"
                src={businessLocation.mapsEmbedSrc}
                className="h-[360px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark-surface text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-[auto_1fr_auto] sm:items-center lg:px-8">
          <img src={logoImageDark} alt="Trust Driving Solution" className="h-14 w-auto" />
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/75 sm:items-center">
            <a href={businessLocation.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary-foreground">
              <MapPin className="size-4 shrink-0" />
              {businessLocation.address}
            </a>
            <a href={businessLocation.phoneHref} className="flex items-center gap-2 hover:text-primary-foreground">
              <Phone className="size-4 shrink-0" />
              {businessLocation.phone}
            </a>
          </div>
          <div className="text-sm text-primary-foreground/60 sm:text-right">
            <p>Your safety, our business.</p>
            <p className="mt-2">© 2026 Trust Driving Solution. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-semibold ${tone === "dark" ? "text-brand-gold" : "text-primary"}`}>
      <span className="h-px w-8 bg-brand-gold" />
      {children}
    </p>
  );
}