import PrismaClient from "@repo/db/client";
export default async function Home() {
	const user = await PrismaClient.user.findMany({});
	console.log(user);
	return (
		<>
			<h1>Hi from the Home Page.</h1>
			<h2>{user.length}</h2>
		</>
	);
}
