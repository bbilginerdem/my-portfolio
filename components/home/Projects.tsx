"use client";

import { Fragment } from "react";

import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

import Project from "./Project";
import SectionHeading from "../ui/SectionHeader";

function Projects() {
	const { ref } = useSectionInView("Projects", 0.5);

	return (
		<section ref={ref} id="projects" className="mb-28 scroll-mt-28">
			<SectionHeading mb="mb8">My Projects</SectionHeading>
			<div>
				{projectsData.map((project) => (
					<Fragment key={project.title}>
						<Project {...project} />
					</Fragment>
				))}
			</div>
		</section>
	);
}

export default Projects;
