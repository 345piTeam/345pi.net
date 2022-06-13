/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from "react";
import { Information } from "../../typings";
import { urlFor } from "../../sanity";
import Image from "next/image";
import PortableText from "react-portable-text";

interface Props {
	info: Information[];
}

const HomescreenInfo: FunctionComponent<Props> = ({ info }) => {
	return (
		<div>
			{info.map((cell, index) => {
				return (
					<div
						key={index}
						className={
							"flex justify-evenly items-center " +
							(index % 2 === 0 ? "flex-row" : "flex-row-reverse")
						}
					>
						<Image
							className="rounded-full"
							alt="Image"
							src={urlFor(cell.mainImage.asset).url()}
							width="500"
							height="500"
						/>
						<div className="flex flex-col gap-6 p-5 max-w-prose">
							<h1 className="font-bold text-6xl">{cell.title}</h1>
							<PortableText className="text-2xl" content={cell.body} />
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default HomescreenInfo;