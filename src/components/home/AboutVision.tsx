import { img1 } from "../../assets";

const AboutVision = () => {
	return (
		<section className="bg-gradient-to-tr from-secondary/20 to-primary/20 md:grid grid-cols-5">
			<img
				src={img1}
				className="col-span-2 aspect-square object-left w-full h-full"
				alt=""
			/>

			<div className="md:p-20 p-4 flex flex-col gap-4 justify-around h-full col-span-3">
				<div>
					<h3 className="md:text-3xl text-lg font-bold">About Mango Cars</h3>
					<p className="md:text-lg">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius
						corrupti incidunt doloribus similique id, unde officiis maiores
						doloremque dolorem quos deserunt qui ea repellendus reprehenderit
						ullam eaque culpa odio? Sit!
					</p>
				</div>
				<div>
					<h3 className="md:text-3xl text-lg font-bold">Our vision</h3>
					<p className="md:text-lg">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius
						corrupti incidunt doloribus similique id, unde officiis maiores
						doloremque dolorem quos deserunt qui ea repellendus reprehenderit
						ullam eaque culpa odio? Sit!
					</p>
				</div>
			</div>
		</section>
	);
};

export default AboutVision;
