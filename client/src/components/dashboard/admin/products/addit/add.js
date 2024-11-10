import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../../hoc/dashboardLayout";
import {PicUpload} from "./upload";  // Ensure correct import path
import { useFormik } from "formik";
import { errorHelper } from "../../../../../utils/tools";
import Loader from "../../../../../utils/loader";
import { validation } from "./formValues";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../../../../../store/actions/brands.actions";
import { productAdd } from "../../../../../store/actions/product.actions";
import {
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";

const AddProduct = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const brands = useSelector((state) => state.brands);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      model: "",
      brand: "",
      frets: "",
      woodtype: "",
      description: "",
      price: "",
      available: "",
      shipping: false,
      images: [],
    },
    validationSchema: validation,
    onSubmit: (values) => {
      console.log("Submitting values: ", values);
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(productAdd(values));
  };

  const handlePicValue = (pic) => {
    console.log("Received pic:", pic);  // Debug the received pic
    const picArray = formik.values.images;
    picArray.push(pic.url);
    formik.setFieldValue("images", picArray);
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push("/dashboard/admin/admin_products");
    }
    if (notifications && notifications.error) {
      setLoading(false);
    }
  }, [notifications, props.history]);

  useEffect(() => {
    console.log("Fetching brands...");
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    console.log("Brands data:", brands.all);
  }, [brands]);

  return (
    <DashboardLayout title="Add product">
      {loading ? (
        <Loader />
      ) : (
        <>
          <PicUpload picValue={handlePicValue} />

          <Divider className="mt-3 mb-3" />
          <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="frets"
                label="Enter the amount of frets"
                variant="outlined"
                type="number"
                {...formik.getFieldProps("frets")}
                {...errorHelper(formik, "frets")}
              />
            </div>

            {/* Other form fields go here */}

            <Button variant="contained" color="primary" type="submit">
              Add product
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default AddProduct;
