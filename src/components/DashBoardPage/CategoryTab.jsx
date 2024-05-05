import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/AxiosInstance";
import { enqueueSnackbar } from "notistack";
import { Add } from "@mui/icons-material";
import CategoryCard from "./CategoryTab/CategoryCard";

const HeaderSection = ({ setCategories }) => {
  const handleCreateCategory = async () => {
    try {
      const category = {
        name: "Edit me.",
      };
      const response = await axiosInstance.post("/categories/", category);
      const { data } = response;

      setCategories((prev) => {
        return [...prev, data];
      });

      enqueueSnackbar(<Typography>Category created successfully</Typography>, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(<Typography>Something went wrong</Typography>, {
        variant: "error",
      });
      console.error(error);
    }
  };

  return (
    <Box display={"flex"} justifyContent={"end"}>
      <IconButton onClick={handleCreateCategory}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default function CategoryTab() {
  const [categories, setCategories] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories/");
      const { data } = response;
      setCategories(data);
    } catch (error) {
      alert("Error fetching products");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box>
      <HeaderSection setCategories={setCategories} />
      <Grid container spacing={1}>
        {categories ? (
          categories.map((x) => (
            <Grid key={x.id} item xs={12} sm={6} md={4} lg={3}>
              <CategoryCard
                category={x}
                setCategory={(newCategory) =>
                  setCategories((prev) => {
                    const newCategories = [];
                    prev.forEach((p) => {
                      if (p.id === x.id) {
                        newCategory && newCategories.push(newCategory);
                      } else {
                        newCategories.push(p);
                      }
                    });
                    return newCategories;
                  })
                }
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography mt={20}>Loading...</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
