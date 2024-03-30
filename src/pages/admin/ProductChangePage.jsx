import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { CategorySelectBox } from "../../components/CategorySelectBox";
import { axiosInstance } from "../../api/AxiosInstance";

export const ProductChangePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
    },
  });
  const [categoryId, setCategoryId] = useState(null);

  const onSubmit = async (data) => {
    if (!categoryId) {
      console.log("Category is required");
      return;
    }
    const postData = { ...data, category: { id: categoryId } };
    console.log(postData);
    try {
      const response = await axiosInstance.post("/products/", postData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ mt: "5rem" }}>
      <Paper
        component={"form"}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        variant="outlined"
        square
        sx={{ width: "400px", mx: "auto", p: "1rem" }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Create product
        </Typography>
        {/* name */}
        <TextField
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          label="Product name"
          required
          fullWidth
          size="small"
          color="dark"
          margin="normal"
          InputProps={{ sx: { borderRadius: 0 } }}
        />
        {/* code */}
        <TextField
          {...register("code", { required: "Code is required" })}
          error={!!errors.code}
          helperText={errors.code?.message}
          label="Code"
          required
          fullWidth
          size="small"
          color="dark"
          margin="normal"
          InputProps={{ sx: { borderRadius: 0 } }}
        />
        <CategorySelectBox setCategoryId={setCategoryId} />
        <Button
          type="submit"
          variant="contained"
          color="dark"
          disableElevation
          fullWidth
          sx={{ my: "1rem" }}
        >
          Save
        </Button>
      </Paper>
    </Container>
  );
};

/*
 <Container sx={{ mt: "5rem" }}>
      <Grid container spacing={2} sx={{ display: "flex", bgcolor: "" }}>
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: "", height: "100%" }}>
            <Typography variant="h5" textAlign="center" gutterBottom>
              Product infomation
            </Typography>
            <TextField
              value={productForm.name}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, name: e.target.value }))
              }
              label="Product name"
              required
              fullWidth
              margin="normal"
              sx={{ mt: 0 }}
            />
            <TextField
              value={productForm.price}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, price: e.target.value }))
              }
              label="Price"
              required
              fullWidth
              margin="normal"
              type="number"
            />
            <CategorySelectBox setCategoryId={setCategoryId} />
            <Box sx={{ my: ".5rem", display: "flex", justifyContent: "end" }}>
              <Button onClick={handleSaveForm} endIcon={<ArrowForwardIcon />}>
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: "100%", bgcolor: "" }}>
            <Typography variant="h5" gutterBottom>
              Create variant colors
            </Typography>
            <Grid container spacing={2} sx={{}}>
              <Grid item>
                <Paper
                  variant="outlined"
                  sx={{
                    p: "1rem",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button disableElevation endIcon={<AddIcon />}>
                    Create variants
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>

*/
