import type React from "react";

type SectionHeadingProps = {
	mb: keyof MbVariable;
	children: React.ReactNode;
};

interface MbVariable {
	mb8: string;
	mb6: string;
	mb4: string;
}

export default function SectionHeading({
	mb,
	children,
}: Readonly<SectionHeadingProps>) {
	const mbVariants: MbVariable = {
		mb8: "mb-8",
		mb6: "mb-6",
		mb4: "mb-4",
	};

	return (
		<h2
			className={`${mbVariants[mb]} text-center font-medium text-3xl capitalize`}
		>
			{children}
		</h2>
	);
}
