import type React from "react";
import { cn } from "@/lib/utils";

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
	className,
	children,
	...props
}) => {
	return (
		<button
			className={cn(
				"transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default MyButton;
