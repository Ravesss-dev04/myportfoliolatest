import { About } from "@/components/sections/About";
import { ContactCta } from "@/components/sections/ContactCta";
import { Experience } from "@/components/sections/Experience";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";

export default function HomePage() {
  
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedWork />
      <Experience />
      <Services />
      <ContactCta />
    </>
  );
}
