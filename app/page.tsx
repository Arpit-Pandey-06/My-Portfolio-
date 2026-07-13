import { AmbientField } from '@/components/AmbientField';
import { CustomCursor } from '@/components/CustomCursor';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Inspector } from '@/components/Inspector';
import { StackGraph } from '@/components/StackGraph';
import { Services } from '@/components/Services';
import { CommitLog } from '@/components/CommitLog';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <AmbientField />
      <CustomCursor />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <Inspector />
        <StackGraph />
        <Services />
        <CommitLog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
