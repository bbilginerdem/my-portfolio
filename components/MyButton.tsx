interface MyButtonProps {
    className: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    ariaLabel?: string;
    children?: React.ReactNode;
    type?: "submit" | "button" | "reset";
}

const MyButton: React.FC<MyButtonProps> = ({
    onClick,
    className,
    ariaLabel,
    children,
    type = "button", // Default to 'button'
}) => {
    // Your button component logic here
    return (
        <button
            className={className}
            onClick={onClick}
            aria-label={ariaLabel}
            type={type}
        >
            {children}
        </button>
    );
};

export default MyButton;
