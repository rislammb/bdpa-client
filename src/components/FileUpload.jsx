import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Slider,
  Button,
  Grid,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { uploadMainImage } from "../api/upload";
import Cropper from "react-easy-crop";

const FileUpload = ({ regNumber, onUploadSuccess, onUploadError }) => {
  const [uploading, setUploading] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith("blob:"))
        URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name || "");
    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCropDialogOpen(true);
    // Reset input so the same file can be selected again later
    event.target.value = null;
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (e) => reject(e));
      img.setAttribute("crossOrigin", "anonymous");
      img.src = url;
    });

  const getCroppedBlob = useCallback(
    async (imageUrl, cropPixels, outputWidth = 900, outputHeight = 900) => {
      const image = await createImage(imageUrl);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      // Enforce portrait 3:4 output size
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Draw the cropped area from source to the fixed-size canvas
      const { x, y, width, height } = cropPixels;
      ctx.drawImage(
        image,
        x,
        y,
        width,
        height,
        0,
        0,
        outputWidth,
        outputHeight
      );

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.9
        );
      });
    },
    []
  );

  const handleCropCancel = () => {
    if (imageSrc && imageSrc.startsWith("blob:")) URL.revokeObjectURL(imageSrc);
    setImageSrc(null);
    setCropDialogOpen(false);
  };

  const handleCropConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setUploading(true);
      const blob = await getCroppedBlob(imageSrc, croppedAreaPixels, 900, 900);
      const croppedFile = new File(
        [blob],
        fileName.replace(/\.[^.]+$/, "") + "_portrait.jpg",
        {
          type: "image/jpeg",
        }
      );

      const formData = new FormData();
      formData.append("image", croppedFile);

      const result = await uploadMainImage(regNumber, formData);
      onUploadSuccess?.(result?.data?.imageUrl);
      handleCropCancel();
    } catch (err) {
      onUploadError?.(err?.response?.data?.message ?? "Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Grid item xs={6} sm={12}>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <label htmlFor="file-upload">
        <IconButton
          component="span"
          color="info"
          title="Supported: Images (JPG, PNG, GIF). Max size: 5MB"
        >
          {uploading ? <CircularProgress size={20} /> : <CloudUpload />}
        </IconButton>
      </label>

      <Dialog
        open={cropDialogOpen}
        onClose={handleCropCancel}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent
          sx={{ position: "relative", height: 380, bgcolor: "#000" }}
        >
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              showGrid={false}
              objectFit="contain"
            />
          )}
        </DialogContent>
        <Box sx={{ px: 3, py: 1.5 }}>
          <Slider
            aria-label="Zoom"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, v) => setZoom(v)}
            color="info"
          />
        </Box>
        <DialogActions>
          <Button onClick={handleCropCancel} disabled={uploading} color="info">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCropConfirm}
            disabled={uploading}
          >
            {uploading ? <CircularProgress size={18} /> : "Crop & Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default FileUpload;
