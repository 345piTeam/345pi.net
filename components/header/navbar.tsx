import Link from "next/link";
import Image from "next/image";
import pi345_logo from "../../public/345pi_logo.png";
import pi345_logo_dark from "../../public/345pi_logo_darkMode.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import ThemeToggle from "./themeChanger";

export default function Navbar() {
	const router = useRouter();
	const { resolvedTheme } = useTheme();

	const NavbarItem = (name: string, path: string) => {
		let cName =
			"text-2xl grow hover:underline underline-offset-8 leading-[5] uppercase";
		cName =
			router.asPath === path || (router.asPath === "/" && path === "/home")
				? cName + " underline"
				: cName;
		return (
			<Link href={path}>
				<h2 className={cName}>{name}</h2>
			</Link>
		);
	};

	return (
		<div className="flex flex-row w-[96%] items-center mb-5">
			<Link href="/">
				<a>
					{resolvedTheme === "light" ? (
						<Image
							className="scale-75 -translate-x-8 cursor-pointer"
							alt="345pi Logo"
							src={pi345_logo}
						/>
					) : (
						<Image
							className="scale-75 -translate-x-8 cursor-pointer"
							alt="345pi Logo"
							src={pi345_logo_dark}
						/>
					)}
				</a>
			</Link>
			<div className="flex flex-row justify-between w-fit grow text-center align-middle cursor-pointer">
				{NavbarItem("home", "/")}
				{NavbarItem("about", "/about")}
				{NavbarItem("whitepaper", "/whitepaper")}
				{NavbarItem("news", "/news")}
			</div>
			<a href="https://345pi.us/" target="_blank" rel="noreferrer">
				<div className="flex justify-center items-center cursor-pointer bg-green-600 hover:bg-green-700 px-8 h-12 rounded-full">
					<h2 className="text-white text-sm lg:text-lg">Launch App</h2>
				</div>
			</a>
			<ThemeToggle />
		</div>
	);
}