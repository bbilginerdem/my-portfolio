import Image from 'next/image'
import React from 'react'
import profilePic from '@/public/images/profile.jpg'

function Intro() {
  return (
    <section>
      <div className="flex items-center justify-center">
        <div>
          <Image src={profilePic} alt="Profile Pictures" />
        </div>
      </div>
    </section>
  )
}

export default Intro