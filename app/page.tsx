import Blogs from "@/components/home/Blogs";
import Contact from "@/components/home/Contact";
import Intro from "@/components/home/Intro";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";
import SectionDivider from "@/components/ui/SectionDivider";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
	const posts = await getAllPosts();
	const latestPosts = posts.slice(0, 3);

	return (
		<main className="flex flex-col items-center px-4">
			<Intro />
			<SectionDivider />
			<Projects />
			<Skills />
			<Blogs posts={latestPosts} />
			<Contact />
		</main>
	);
}
