import { Link } from "react-router-dom";
import { img2, person, phone } from "../assets";

const Agent = () => {
	const steps = [
		{
			title: "Sign up as a referral",
			body: "Click the signup button and embark on your journey to earn fantastic cash through referrals",
		},
		{
			title: "Get trained",
			body: "Our team will provide comprehensive training on the essentials of becoming an exceptional sales agent, covering the do's and don'ts for your success",
		},
		{
			title: "Locate and offer assistance to customers",
			body: "Harness the power of your social media platform to identify potential customers",
		},
		{
			title: "Close the deal and receive your payment",
			body: "Earn your commission for every successful transaction you bring in",
		},
	];
	return (
		<>
			<section className="bg-green-100">
				<div className="grid md:grid-cols-2 mw">
					<div className="flex flex-col md:gap-10 gap-8 justify-center text-center p-4 py-20 md:p-0 md:text-start">
						<h2 className="font-bold text-4xl md:text-5xl">
							Become our <br className="hidden md:block" /> Sales Agent
						</h2>
						<p className="max-w-lg">
							Join Mango Cars as a Direct Sales Agent and enjoy a steady monthly
							commission for every successfully closed car deal. Start your
							journey with us today!
						</p>
					</div>
					<div className="hidden md:block p-10">
						<img src={img2} className="w-full rounded-xl shadow" alt="" />
					</div>
				</div>
			</section>

			<section className="mw md:py-20 pb-10 grid md:grid-cols-7 md:gap-20 gap-0 ">
				<div className="flex justify-center items-center relative md:col-span-2 md:bg-transparent bg-secondary/20 py-5 md:py-0">
					<div className="rounded-full aspect-square h-[500px] bg-secondary/20 absolute -top-5 -left-10 hidden md:block"></div>
					<div className="rounded-full aspect-square h-[400px] bg-primary/20 absolute -bottom-5 -right-10 hidden md:block"></div>
					<img src={phone} className="relative z-10" alt="" />
				</div>
				<div className="flex flex-col justify-center gap-10 md:col-span-3 p-4 py-10 md:p-0">
					<div className=" text-center md:text-left">
						<h3 className="font-semibold text-3xl">
							How the referral program works
						</h3>
						<hr className="w-1/3 mt-2 border-2 border-secondary mx-auto md:mx-0" />
					</div>

					<ul className="flex flex-col gap-4">
						{steps.map(({ title, body }, i) => (
							<li className="flex gap-2">
								<div className="border rounded-full border-secondary h-6 aspect-square p-1">
									<div className="bg-secondary h-full w-full rounded-full"></div>
								</div>
								<div className=" w-full">
									<h4 className="font-semibold text-lg">
										Step {i + 1}: {title}
									</h4>
									<p className="">{body}</p>
								</div>
							</li>
						))}
					</ul>
					<Link
						to={"/auth/agent"}
						className="bg-secondary rounded py-4 text-lg font-semibold flex justify-center"
					>
						{" "}
						Get Started
					</Link>
				</div>
				<img src={person} className="md:col-span-2 hidden md:block" alt="" />
			</section>
		</>
	);
};

export default Agent;
