import { Clear, FilterAltOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useStoreState } from "easy-peasy";
import { useState } from "react";
import FilterByJobDepartment from "./FilterByJobDepartment";
import FilterByLocation from "./FilterByLocation";
import Search from "./shared/Search";

const FilterGroup = () => {
  const { language } = useStoreState((state) => state.ui);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isBn = language === "BN" ? true : false;

  const handleFilterToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const temporaryJSX = (
    <Box
      sx={{
        ml: 2,
        mr: -1,
      }}
    >
      <Box
        sx={{
          textAlign: "right",
          mr: 2,
        }}
      >
        <IconButton
          sx={{ background: "rgba(127,127,127,0.13)" }}
          onClick={handleFilterToggle}
        >
          {mobileOpen ? <Clear /> : <FilterAltOutlined />}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          height: mobileOpen ? "290px" : 0,
          transition: "all 0.35s ease-in-out",
          overflow: mobileOpen ? "inherit" : "hidden",
          mb: 1.5,
        }}
      >
        <FilterByLocation />
        <FilterByJobDepartment />
      </Box>
      <Search
        label={isBn ? "ফার্মাসিস্ট অনুসন্ধান" : "Search Pharmacist"}
        title={
          isBn
            ? "নাম, নিবন্ধন, আইডি, ইমেইল বা কর্মস্থল"
            : "Name, Registration, ID, Email or Posting"
        }
        placeholder={
          isBn
            ? "নাম, নিবন্ধন, আইডি, ইমেইল বা কর্মস্থল"
            : "Name, Registration, ID, Email or Posting"
        }
        sx={{
          ml: -2.3,
          mt: mobileOpen && 4,
          width: "100%",
        }}
      />
    </Box>
  );

  const permanentJSX = (
    <Box
      sx={{
        display: "flex",
        ml: 2,
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <FilterByLocation />
      <FilterByJobDepartment />
      <Search
        label={isBn ? "ফার্মাসিস্ট অনুসন্ধান" : "Search Pharmacist"}
        title={
          isBn
            ? "নাম, নিবন্ধন, আইডি, ইমেইল বা কর্মস্থল"
            : "Name, Registration, ID, Email or Posting"
        }
        placeholder={
          isBn
            ? "নাম, নিবন্ধন, আইডি, ইমেইল বা কর্মস্থল"
            : "Name, Registration, ID, Email or Posting"
        }
        sx={{
          ml: -1.3,
          width: "100%",
          maxWidth: "330px",
        }}
      />
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {temporaryJSX}
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        {permanentJSX}
      </Box>
    </Box>
  );
};

export default FilterGroup;
