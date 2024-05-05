import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const CategoryDialog = ({ category, setCategory, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Dialog
      open={!!category}
      onClose={() => setCategory(null)}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        component: "form",
        noValidate: true,
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>Edit category</DialogTitle>
      <DialogContent>
        <TextField
          {...register("name", { required: "required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
          label="Category name"
          required
          variant="outlined"
          margin="normal"
          size="small"
          InputProps={{ sx: { borderRadius: 0 } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCategory(null)} color="error">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;
