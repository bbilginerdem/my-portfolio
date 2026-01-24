import Blogs from "@/components/home/Blogs";
import Contact from "@/components/home/Contact";
import Intro from "@/components/home/Intro";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
	return (
		<main className="flex flex-col items-center px-4">
			<Intro />
			<SectionDivider />
			<Projects />
			<Skills />
			<Blogs />
			<Contact />
		</main>
	);
}
