'use client';

import { Fragment } from 'react';
import SectionHeading from './SectionHeader';
import { projectsData } from '@/lib/data';
import Project from './Project';
import { useSectionInView } from '@/lib/hooks';

function Projects() {
  const { ref } = useSectionInView('Projects', 0.5);

  return (
    <section ref={ref} id='projects' className='mb-28 scroll-mt-28'>
      <SectionHeading mb='mb8'>My Projects</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <Fragment key={index}>
            <Project {...project} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default Projects;
