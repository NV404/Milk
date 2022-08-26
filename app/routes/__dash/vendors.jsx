import Card from "~/components/Card";
import { getTransactions } from "utils/payments.server";
import { useLoaderData } from "@remix-run/react";
import { getUserId } from "utils/session.server";
import { getUserById } from "utils/user.server";
import { format } from "date-fns";
import { getVendors } from "utils/vendors.server";

export async function loader() {
  const vendors = await getVendors();
  return { vendors };
}

export default function Vendors() {
  const loaderData = useLoaderData();
  return (
    <div className="flex flex-col gap-4 p-10">
      <p className="font-medium">Vendors near you:</p>
      {loaderData.vendors.map((vendor) => (
        <Card key={vendor.id}>
          <div>
            <p className="font-medium">Vendor Name: {vendor.name}</p>
            <a
              href={`http://www.google.com/maps/place/${vendor.vendorLat},${vendor.vendorLng}`}
              target="_blank"
              className="text-purple-500 underline"
            >
              Address:
              {vendor.vendorAddress}
            </a>
            <p>Capacity: 100 Litre</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
