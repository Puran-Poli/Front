import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useFetcher } from "@/context/useFetcher";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

// Component Imports
import ProductSkeleton from "@/components/products/productModal/ProductSkeleton";

// MUI Imports
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// View Imports
import DesignDetails from "@/views/products/design-details";
import SalesInventory from "@/views/products/sales-inventory";

// Hook Imports
import { useHierarchy, useOptions } from "@/hooks/products/useProducts";
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Product() {
  const router = useRouter();
  const { fetchError, fetcher } = useFetcher();
  const [productData, setProductData] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const { hierarchy, fieldOptions } = useHierarchy();
  const { colors } = useOptions();

  // Get Product ID
  const { query } = useRouter();
  const { id } = query;
  const product_id = id;

  // Check User Roles
  const { userRole, userIsLoading } = useUserRole();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchItem = async (product_id) => {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/products/${product_id}`,
      {
        method: "GET",
      }
    );

    if (fetchError) {
      toast.error("Something went wrong, please try again!", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }

    const data = await res;
    setProductData(data);
  };

  useEffect(() => {
    if (product_id) {
      fetchItem(product_id);
    }
  }, [router, product_id]);

  if (!productData || userIsLoading) {
    return <ProductSkeleton />;
  }

  const info = productData?.info;

  const canReadSales = getFeature(userRole, "sales analytics")?.read || false;

  return (
    <div className="w-full">
      <Head>
        <title>Product {info?.style_id}</title>
        <meta name="description" content="Chanakya - By Techtact.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-5 mb-4 border-b pt-6">
        <h1 className="flex items-center gap-2 pb-6 text-2xl font-medium leading-7 text-slate-700">
          Product Details{" "}
          <span className="text-xs font-light tracking-normal text-slate-500">
            - {info?.product_id}
          </span>
        </h1>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Product Tabs"
        >
          <Tab label="Design Details" {...a11yProps(0)} />
          <Tab
            label="Sales & Inventory"
            {...a11yProps(1)}
            disabled={!canReadSales}
          />
        </Tabs>
      </div>

      <TabPanel value={tabValue} index={0}>
        <DesignDetails
          info={info}
          colors={colors}
          fieldOptions={fieldOptions}
          hierarchy={hierarchy}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <SalesInventory id={product_id} />
      </TabPanel>
    </div>
  );
}
