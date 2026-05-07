import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import "@/styles/global.css";

function App() {
	useEffect(() => {
		const root = document.documentElement;

		const setSpotlight = (clientX: number, clientY: number) => {
			root.style.setProperty("--spot-x", `${clientX}px`);
			root.style.setProperty("--spot-y", `${clientY}px`);
		};

		const center = () =>
			setSpotlight(window.innerWidth / 2, window.innerHeight / 2);

		const onMouseMove = (e: MouseEvent) =>
			setSpotlight(e.clientX, e.clientY);

		const onTouch = (e: TouchEvent) => {
			const t = e.touches[0];
			if (t) setSpotlight(t.clientX, t.clientY);
		};

		center();
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("touchstart", onTouch, { passive: true });
		window.addEventListener("touchmove", onTouch, { passive: true });
		window.addEventListener("resize", center);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("touchstart", onTouch);
			window.removeEventListener("touchmove", onTouch);
			window.removeEventListener("resize", center);
		};
	}, []);

	return (
		<div className="app">
			<div className="site-bg" aria-hidden>
				<div className="site-bg-spotlight" />
			</div>
			<Navbar />
			<main className="main-content">
				<Home />
			</main>
		</div>
	);
}

export default App;
