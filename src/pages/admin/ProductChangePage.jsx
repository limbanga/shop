  // import { Button, Container, Paper, TextField, Typography } from "@mui/material";
  // import React, { useState } from "react";

  // import { useForm } from "react-hook-form";

  // import { CategorySelectBox } from "../../components/CategorySelectBox";
  // import { axiosInstance } from "../../api/AxiosInstance";
  // import { ArrowBack } from "@mui/icons-material";
  // import { Link as RouterLink } from "react-router-dom";

  // export const ProductChangePage = () => {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     defaultValues: {
  //       name: "",
  //       code: "",
  //     },
  //   });
  //   const [categoryId, setCategoryId] = useState(null);

  //   const onSubmit = async (data) => {
  //     if (!categoryId) {
  //       console.log("Category is required");
  //       return;
  //     }
  //     const postData = { ...data, category: { id: categoryId } };
  //     console.log(postData);
  //     try {
  //       const response = await axiosInstance.post("/products/", postData);
  //       // console.log(response);
  //       alert("Product created");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   return (
  //     <Container sx={{ mt: "5rem" }}>
  //       <Button
  //         LinkComponent={RouterLink}
  //         to="/admin/"
  //         color="dark"
  //         startIcon={<ArrowBack />}
  //       >
  //         Back
  //       </Button>
  //       <Paper
  //         component={"form"}
  //         noValidate
  //         onSubmit={handleSubmit(onSubmit)}
  //         variant="outlined"
  //         square
  //         sx={{ width: "400px", mx: "auto", p: "1rem" }}
  //       >
  //         <Typography variant="h5" textAlign="center" gutterBottom>
  //           Create product
  //         </Typography>
  //         {/* name */}
  //         <TextField
  //           {...register("name", { required: "Name is required" })}
  //           error={!!errors.name}
  //           helperText={errors.name?.message}
  //           label="Product name"
  //           required
  //           fullWidth
  //           size="small"
  //           color="dark"
  //           margin="normal"
  //           InputProps={{ sx: { borderRadius: 0 } }}
  //         />
  //         {/* code */}
  //         <TextField
  //           {...register("code", { required: "Code is required" })}
  //           error={!!errors.code}
  //           helperText={errors.code?.message}
  //           label="Code"
  //           required
  //           fullWidth
  //           size="small"
  //           color="dark"
  //           margin="normal"
  //           InputProps={{ sx: { borderRadius: 0 } }}
  //         />
  //         <CategorySelectBox setCategoryId={setCategoryId} />
  //         <Button
  //           type="submit"
  //           variant="contained"
  //           color="dark"
  //           disableElevation
  //           fullWidth
  //           sx={{ my: "1rem" }}
  //         >
  //           Save
  //         </Button>
  //       </Paper>
  //     </Container>
  //   );
  // };


