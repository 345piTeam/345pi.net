import { ThemeProvider } from "next-themes";
import { ReactElement } from "react";
import Footer from "../components/footer/footer";
import Navbar from "../components/header/navbar";

export function DefaultLayout({ children }: { children: ReactElement }) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
}
