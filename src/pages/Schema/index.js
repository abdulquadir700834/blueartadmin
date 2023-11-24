import * as Yup from "yup";

export const addUserSchema = Yup.object({
  UserName: Yup.string().min(2).max(25).required("Please enter your username name"),
  Email: Yup.string().email().required("Please enter your email"),
  Password: Yup.string().min(6).required("Please enter your password"),
  ConfirmPassword: Yup.string()
  .oneOf([Yup.ref("Password"), null], "Password must match").required("Please enter your password"),
});
export const cmsSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter name"),
  url: Yup.string().min(2).max(25).required("Please enter your url "),
  status: Yup.string().min(2).max(25).required("Please select your status "),
});
export const cmsBannerSchema = Yup.object({
  banner_image: Yup.string().min(2).max(25).required("Please enter banner image name"),
  banner_title: Yup.string().min(2).max(25).required("Please enter your banner title  "),
  banner_description: Yup.string().min(2).max(25).required("Please enter your banner description"),
  status: Yup.string().min(2).max(25).required("Please select your status "),
});
export const cmsContactSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter name"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.string().min(10).max(10).required("Please enter phone number"),
  address: Yup.string().min(2).max(25).required("Please enter your address "),
});
export const cmsFooter = Yup.object({
  menutype: Yup.string().min(2).max(25).required("Please enter menu type"),
  menu: Yup.string().min(2).max(25).required("Please enter menu"),
  link: Yup.string().min(2).max(25).required("Please enter link"),
  section: Yup.string().min(1).max(25).required("Please enter section"),
  status: Yup.string().min(2).max(25).required("Please select your status"),
});
export const settingSchema = Yup.object({
  fullname: Yup.string().min(2).max(25).required("Please enter your full name"),
  email: Yup.string().email().required("Please enter your email"),
  username: Yup.string().min(2).max(25).required("Please enter your username"),
  password: Yup.string().min(6).required("Please enter your password"),
});
export const categorySchema = Yup.object({
  title: Yup.string().min(2).max(25).required("Please enter your title"),
  status: Yup.string().min(2).max(25).required("Please select your status "),
  category_image:Yup.string().required("Please upload the image"),
});


