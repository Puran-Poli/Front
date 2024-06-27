import { useState } from "react";

// Component Imports
import ProductCostTable from "@/components/products/productModal/productCostHistory/ProductCostTable";

// MUI Imports
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Hook Imports
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";

export default function ProductCostHistory({ info }) {
  const { userRole, userIsLoading } = useUserRole();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (userIsLoading) return null;

  const canReadCost = getFeature(userRole, "product cost")?.read;

  return (
    <>
      {canReadCost && (
        <>
          <div className="col-span-full">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <h3 className="tracking-wide text-slate-700">
                  Product&apos;s Cost History
                </h3>
              </AccordionSummary>
              <AccordionDetails>
                <ProductCostTable info={info} />
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      )}
    </>
  );
}
