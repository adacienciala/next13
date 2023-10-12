import { type User } from "@clerk/nextjs/server";

export const getUserEmail = (user: User) => {
	return user?.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;
};
