const Button = ({ children, buttonRef }) => {
    return (
        <button className="text-xl font-bold border-none cursor-pointer rounded-[0.75em] bg-gray-900 relative w-full" ref={buttonRef}>
            <span className="block box-border border-2 border-black rounded-[0.75em] px-6 py-3 bg-[#e8e8e8] text-black translate-y-[-0.2em] transition-transform duration-100 ease-linear hover:translate-y-[-0.33em] active:translate-y-0">
                {children}
            </span>
        </button>
    );
};

export default Button;