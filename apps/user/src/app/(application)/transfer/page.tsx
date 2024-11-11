import WalletTransfer from "@/components/WalletTransfer";
import { formatDate, getAmount } from "@repo/common/utils";
import { getOnRampTransactions } from "@repo/db/getOnRampTransaction";
import { auth } from "@/auth";
async function AccountPage() {
	return (
		<>
			<WalletTransfer OnRampLists={<RampTransactionsList />}></WalletTransfer>
		</>
	);
}
async function RampTransactionsList() {
	const session = await auth();
	if (!session) return "Loading...";
	if (!session.user.id) return "User Id doesn't exists";
	const rampTxns = await getOnRampTransactions(session.user.id);
	return (
		<>
			{rampTxns.map((txn) => (
				<div key={txn.id} className="flex pt-1 justify-between ">
					<div className="flex flex-col  font-semibold leading-4">
						<p className="text-sm">Recieved NPR.</p>
						<span className="text-zinc-500 text-xs ">
							{formatDate(txn.startTime)}
						</span>
					</div>
					<div className="inline-flex items-center text-neutral-700 tracking-tight font-semibold">+Rs {getAmount(txn.amount)}</div>
				</div>
			))}
		</>
	);
}
export default AccountPage;
