"use client"

import { Fragment } from 'react'
import SectionHeading from './SectionHeader'
import { projectsData } from '@/lib/data'
import Project from './Project'
import { useSectionInView } from '@/lib/hooks'

function Projects() {
  const { ref } = useSectionInView("Projects", 0.5)

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My Projects</SectionHeading>
      <div>
        {
          projectsData.map((project, index) => (
            <Fragment key={index}>
              <Project {...project} />
            </Fragment>
          ))
        }
      </div>
    </section>
  )
}

export default Projects