import React from 'react'
import SectionHeading from './SectionHeader'
import { projectsData } from '@/lib/data'
import Project from './Project'

function Projects() {
  return (
    <section>
      <SectionHeading>My Projects</SectionHeading>
      <div>
        {
          projectsData.map((project, index) => (
            <React.Fragment key={index}>
              <Project {...project} />
            </React.Fragment>
          ))
        }
      </div>
    </section>
  )
}

export default Projects