import { Link } from "react-router-dom";
import {
	banner1,
	banner2,
	banner3,
	become,
	benefit1,
	benefit2,
	benefit3,
	dealer1,
	dealer2,
} from "../assets";
import { StarIcon } from "@heroicons/react/20/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { generateArray } from "../functions/moneyFormat";

const Dealers = () => {
	const benefits = [
		{ title: "Get Visibility", description: "", image: benefit1 },
		{ title: "Quick Turnovers", description: "", image: benefit2 },
		{ title: "Earn Fast Cash", description: "", image: benefit3 },
	];
	return (
		<>
			<section className="md:h-screen grid md:grid-cols-2 mw p-4 py-10 md:p-0">
				<div className="flex flex-col justify-center text-center md:text-left">
					<h1 className="md:text-7xl text-3xl font-semibold">
						Make ‘hooge’ sales <br className="md:hidden" /> with us
					</h1>
					<p className="max-w-sm mt-5">
						Register as a dealer and post your cars to reach millions of buyers
						across the World.
					</p>
					<Link
						to={"/auth/dealer"}
						className="rounded bg-secondary hidden md:block py-2 px-20 text-lg font-semibold mt-10 text-center md:w-max"
					>
						Join us now
					</Link>
				</div>
				<div className="relative">
					<img
						src={dealer1}
						alt=""
						className="md:absolute -mb-20 md:mb-0 top-10 right-20"
					/>
					<img
						src={banner1}
						alt=""
						className="md:absolute  md:h-50 bottom-20"
					/>
					<img
						src={dealer2}
						alt=""
						className="absolute bottom-0 h-2/3 md:h-auto md:bottom-20 left-0"
					/>

					<img
						src={dealer2}
						alt=""
						className="absolute bottom-0 h-2/3 md:h-auto md:bottom-20 right-0 md:right-10 rotate-45"
					/>
				</div>
				<Link
					to={"/auth/dealer"}
					className="rounded block md:hidden bg-secondary py-2 px-20 text-lg font-semibold mt-10 text-center md:w-max"
				>
					Join us now
				</Link>
			</section>

			<section className="bg-yellow-100 p-4 md:p-0">
				<div className="mw py-10 md:py-20 ">
					<h2 className="border-b-2 border-b-secondary text-2xl font-semibold mx-auto w-max mb-10 md:mb-20">
						What You'll Enjoy
					</h2>
					<div className="md:grid flex flex-wrap justify-center text-center md:text-left  md:grid-cols-3 gap-5">
						{benefits.map(({ title, image }) => (
							<div className="w-40">
								<img src={image} alt="" className="aspect-[4/3] rounded" />
								<h3 className="text-lg font-semibold mt-5">{title}</h3>
								<p className="md:text-base text-xs">
									Lorem ipsum dolor sit, amet consectetur adipisicing elit.
									Earum natus esse doloribus, facilis labore accusamus, et
									dolorum.
								</p>
							</div>
						))}
					</div>
					<div className="grid md:grid-cols-3 gap-5 mt-10">
						<Link
							to={"/auth/dealer"}
							className="w-full px-20 md:col-start-2 bg-secondary font-semibold text-lg rounded py-4 flex justify-center"
						>
							Become a Dealer
						</Link>
					</div>
				</div>
			</section>
			<section className="md:py-20 py-10 mw">
				<h2 className="border-b-2 border-b-secondary text-2xl font-semibold mx-auto w-max mb-5 md:mb-20">
					Becoming a Dealer
				</h2>
				<div className="grid gap-4 md:gap-0 md:grid-cols-2 p-4 md:p-0">
					<div className="flex flex-col justify-center">
						<h4 className="text-2xl font-semibold mb-4 md:mb-10">
							Become a dealer in 4 simple steps
						</h4>
						<ol className="flex flex-col gap-4 list-decimal pl-4 text-lg">
							<li>Fill the Application form</li>
							<li>Expect a call from our manager</li>
							<li>Orepare for the onboarding session</li>
							<li>Post your cars and earn</li>
						</ol>
					</div>
					<img src={become} alt="" className="rounded aspect-[4/3]" />
				</div>
			</section>
			<section className="md:py-20 pb-10 mw">
				<h2 className="border-b-2 border-b-secondary text-2xl font-semibold mx-auto w-max mb-5 md:mb-20">
					What our dealers are saying
				</h2>
				<div className="grid md:grid-cols-3 gap-5 p-4 md:p-0">
					{[1, 2, 3].map(() => (
						<div className="rounded shadow-xl p-5">
							<h4 className="text-lg font-semibold">John Doe</h4>
							<div className="flex justify-between -mt-1 mb-2">
								<p className="text-zinc-500">CEO John Motors</p>
								<p className="text-zinc-500 flex items-center gap-1">
									<MapPinIcon className="h-5" /> Lugbe, Abuja
								</p>
							</div>
							<div className="flex">
								{generateArray(5).map((i) => (
									<StarIcon
										className={`h-4 ${
											i <= 4 ? "text-amber-500" : "text-zinc-300"
										}`}
									/>
								))}
							</div>

							<p className="py-5">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Excepturi omnis quisquam quasi ut dicta. Quasi architecto hic
								repellat natus unde earum beatae error, sunt inventore?
								Inventore consequuntur obcaecati nesciunt a!
							</p>

							<small className="text-zinc-500">25, Nov 2024</small>
						</div>
					))}
				</div>
			</section>
			<section className="bg-green-100 py-10">
				<div className="mw p-4 md:p-0">
					<div className="grid md:grid-cols-3 gap-5 mt-10">
						<Link
							to={"/auth/dealer"}
							className="w-full md:px-20 md:col-start-2 bg-primary text-white font-semibold text-lg rounded py-4 mb-10 flex justify-center"
						>
							Join other successful dealers
						</Link>
					</div>
					<div className="grid grid-cols-3">
						<img src={banner1} alt="" />
						<img src={banner2} alt="" />
						<img src={banner3} alt="" />
					</div>
				</div>
			</section>
		</>
	);
};

export default Dealers;
