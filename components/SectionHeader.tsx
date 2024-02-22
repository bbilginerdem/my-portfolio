import React from "react"

type SectionHeadingProps = {
  mb: keyof mbVariable
  children: React.ReactNode
}

interface mbVariable {
  mb8: string
  mb6: string
  mb4: string
}

export default function SectionHeading({ mb, children }: SectionHeadingProps) {
  const mbVariants: mbVariable = {
    mb8: "mb-8",
    mb6: "mb-6",
    mb4: "mb-4",
  }

  return (
    <h2
      className={`${mbVariants[mb]} text-center text-3xl font-medium capitalize`}
    >
      {children}
    </h2>
  )
}
