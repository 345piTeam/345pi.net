import { useState, useEffect, useRef } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const ScrollToTop = () => {
	const [scrollPosition, setScrollPosition] = useState(0);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (buttonRef && buttonRef.current) {
			scrollPosition >= 500
				? buttonRef.current.classList.remove("translate-y-16")
				: buttonRef.current.classList.add("translate-y-16");
		}
	}, [scrollPosition]);

	return (
		<button
			ref={buttonRef}
			onClick={() => {
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}}
			className="fixed bottom-2 right-2 text-2xl md:text-4xl translate-y-16 duration-200 ease-linear"
		>
			<BsFillArrowUpCircleFill />
		</button>
	);
};

export default ScrollToTop;