import { useState } from "react";
import { CircularProgress, Grid, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleteMainImage } from "../api/upload";

const FileDelete = ({
  regNumber,
  imageUrl,
  onDeleteSuccess,
  onDeleteError,
}) => {
  const [deleting, setDeleting] = useState(false);

  const extractDisplayNameFromUrl = () => {
    const regex = /bdpa\/([^/]+)\.(?:jpg|jpeg|png|gif|bmp|webp|tiff)$/i;
    const match = imageUrl.match(regex);
    return match ? match[1] : null;
  };

  const handleDeleteImage = async () => {
    setDeleting(true);

    try {
      const displayName = extractDisplayNameFromUrl();
      await deleteMainImage(regNumber, displayName);
      onDeleteSuccess();
    } catch (error) {
      onDeleteError(error?.response?.data);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Grid item xs={6} sm={12}>
      <IconButton color="error" onClick={handleDeleteImage} disabled={deleting}>
        {deleting ? <CircularProgress size={20} color="error" /> : <Delete />}
      </IconButton>
    </Grid>
  );
};

export default FileDelete;
