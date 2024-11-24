export function getAmount(amount: number) {
	return amount / 1000;
}
export function setAmount(amount: number) {
	return amount * 1000;
}
export function formatDate(date: Date | string) {
	if (!(date instanceof Date)) {
		date = new Date(date); // Convert string to Date if necessary
		if (isNaN(date.getTime())) {
			throw new Error("Invalid date"); // Handle invalid date format
		}
	}
	return date.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}
