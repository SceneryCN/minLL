import { useEffect } from "react";
import CursorAura from "@/components/CursorAura";
import SiteBgMotion from "@/components/SiteBgMotion";
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

		let raf = 0;
		const onMouseMove = (e: MouseEvent) => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() =>
				setSpotlight(e.clientX, e.clientY),
			);
		};

		const onTouch = (e: TouchEvent) => {
			const t = e.touches[0];
			if (t) {
				cancelAnimationFrame(raf);
				raf = requestAnimationFrame(() =>
					setSpotlight(t.clientX, t.clientY),
				);
			}
		};

		center();
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("touchstart", onTouch, { passive: true });
		window.addEventListener("touchmove", onTouch, { passive: true });
		window.addEventListener("resize", center);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("touchstart", onTouch);
			window.removeEventListener("touchmove", onTouch);
			window.removeEventListener("resize", center);
		};
	}, []);

	return (
		<div className="app">
			<div className="site-bg" aria-hidden>
				<SiteBgMotion />
				<div className="site-bg-spotlight" />
				<div className="site-bg-spotlight site-bg-spotlight--flare" />
			</div>
			<CursorAura />
			<Navbar />
			<main className="main-content">
				<Home />
			</main>
		</div>
	);
}

export default App;
