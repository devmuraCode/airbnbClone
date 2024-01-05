import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    if (!listingId) {
      return null;
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    const formattedListing = formatListing(listing);

    return formattedListing;
  } catch (error: any) {
    throw new Error(error);
  }
}

function formatListing(listing: any) {
  return {
    ...listing,
    createdAt: listing.createdAt.toString(),
    user: formatUser(listing.user),
  };
}

function formatUser(user: any) {
  return {
    ...user,
    createdAt: user.createdAt.toString(),
    updatedAt: user.updatedAt.toString(),
    emailVerified: user.emailVerified?.toString() || null,
  };
}
