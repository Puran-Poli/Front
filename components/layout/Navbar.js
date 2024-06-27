import Link from "next/link";

// MUI Imports
import Tooltip from "@mui/material/Tooltip";

// Components imports
import DashboardIcon from "@/components/icons/Dashboard";
import ProductsIcon from "@/components/icons/Products";
import AnalyticsSalesIcon from "@/components/icons/AnalyticsSalesIcon";
import { AccountMenu } from "@/components/base/Menu";

function NavItems() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* <Link href="/">
        <DashboardIcon />
      </Link> */}
      <Tooltip title="Products Listing Page" placement="right" arrow>
        <Link href="/products">
          <ProductsIcon />
        </Link>
      </Tooltip>
      {/* <Tooltip title="Sales Analytics" placement="right" arrow>
        <Link href="/analytics/sales">
          <AnalyticsSalesIcon />
        </Link>
      </Tooltip> */}
    </div>
  );
}

function Navbar({ user }) {
  return (
    <div className="fixed bottom-0 left-0 top-0 flex h-full flex-col items-center justify-between bg-[#091e42] p-4">
      <NavItems />
      <div className="flex flex-col items-center gap-5">
        <AccountMenu />
      </div>
    </div>
  );
}

export default Navbar;
