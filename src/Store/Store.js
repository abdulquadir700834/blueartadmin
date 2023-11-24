import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl='http://localhost:6005/'
const baseUrl = `${process.env.REACT_APP_BACKEND_URL}`;
const token = sessionStorage.getItem("myToken");

export const getUserDetails = createApi({
  reducerPath: "Dashboard",
  tagTypes: ["category"],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    loginMutation: builder.mutation({
      query: (newPost) => (
        console.log("my credentials", newPost),
        {
          url: `Authentication`,
          method: "POST",
          body: newPost,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      ),
    }),
    verifyTOFA: builder.mutation({
      query: (newPost) => (
        console.log("my credentials", newPost),
        {
          url: `Verify2FA`,
          method: "POST",
          body: newPost,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      ),
    }),
    forgotPasswordMutation: builder.mutation({
      query: (newPost) => ({
        url: `ForgotPassword`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),
    resetpasswordMutation: builder.mutation({
      query: (newPost) => ({
        url: `ResetPassword`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),
    getSiteSettingsQuery: builder.query({
      query: () => ({
        url: `GetSiteSettings`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOneAdminInfo: builder.mutation({
      query: (id) => ({
        url: "/GetOneAdminInfo",
        method: "POST",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateProjectDetailsMutation: builder.mutation({
      query: (formValue) => ({
        url: "/UpdateProjectDetailsSettings",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateSocialMediaSettingsMutation: builder.mutation({
      query: (formValue) => ({
        url: "/UpdateSocialMediaSettings",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateEmailSettingsMutation: builder.mutation({
      query: (formValue) => ({
        url: "/UpdateEmailSettings",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateModuleEnableSettingMutation: builder.mutation({
      query: (formValue) => ({
        url: "/UpdateModuleEnableSettings",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateCaptchaSettingMutation: builder.mutation({
      query: (formValue) => ({
        url: "/UpdateCaptchaSettings",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    UpdateFooterLinkDetails: builder.mutation({
      query: (formValue) => ({
        url: "/UpdateFooterLinkDetails",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAdminListQuery: builder.query({
      query: ({page = 1, search}) => ({
        url: `/GetAdminList?page=${page}&limit=10&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
    }),
    updateAdminMutation: builder.mutation({
      query: (formValue) => ({
        url: "/UpdateAdmin",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    AddAdminMutation: builder.mutation({
      query: (formValue) => ({
        url: "/AddAdmin",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAdminRoleQuery: builder.query({
      query: ({ page = 1,search }) => ({
        url: `/GetAdminRoleList?page=${page}&limit=10&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "adminrole", page }],
    }),
    getAdminRoleQuerys: builder.query({
      query: () => ({
        url: `/GetAdminRoleLists`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAdminOneRole: builder.mutation({
      query: (formValue) => ({
        url: `/GetOneAdminRoleInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAdminOneAdmin: builder.mutation({
      query: (formValue) => ({
        url: `/GetOneAdminInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addAdminRoleMutation: builder.mutation({
      query: (formValue) => ({
        url: `/AddAdminRole`,
        method: "Post",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateAdminRoleMutation: builder.mutation({
      query: (formValue) => ({
        url: `/EditAdminRole`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getAdminEmailTemplate: builder.query({
      query: ({page = 1, search}) => ({
        url: `/GetEmailTemplates?page=${page}&limit=10&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "user", page }],
    }),
    getUpdateEmailTemplateMutation: builder.mutation({
      query: (formvalue) => ({
        url: `/UpdateEmailTemplates`,
        method: "POST",
        body: formvalue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOneEmailTemplateMutation: builder.mutation({
      query: (formvalue) => ({
        url: `/GetOneEmailTemplateInfo`,
        method: "POST",
        body: formvalue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getKycDetilsQuery: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetUserList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "user", page }],
    }),

    getUserlistDetails: builder.query({
      query: () => ({
        url: `/UserList`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags:["user"],
    }),

    getChooseArtistMutation: builder.mutation({
      query: (formvalue) => ({
        url: `/ChooseArtist`,
        method: "POST",
        body: formvalue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getOnePersonalInfoMutation: builder.mutation({
      query: (formvalue) => ({
        url: `/GetPersonalInfo`,
        method: "POST",
        body: formvalue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOneKycDoc: builder.mutation({
      query: (formvalue) => ({
        url: `/GetKycDoc`,
        method: "POST",
        body: formvalue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateKycStatus: builder.mutation({
      query: (formvalue) => ({
        url: `/UpdateKycStatus`,
        method: "POST",
        body: formvalue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateAccountStatus: builder.mutation({
      query: (formvalue) => ({
        url: `/UpdateAccountStatus`,
        method: "POST",
        body: formvalue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getActivitiesQuery: builder.query({
      query: ({page = 1, search}) => ({
        url: `/GetActivities?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "activities", page }],
    }),
    getBlockListQuery: builder.query({
      query: () => ({
        url: `/GetBlackList`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getMedium: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetMediumList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "medium", page }],
    }),
    addMedium: builder.mutation({
      query: (formValue) => ({
        url: "AddMedium",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["category"],
    }),
    updateMediumSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneMedium`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["medium"],
    }),
    editMedium: builder.mutation({
      query: (formValue) => ({
        url: `EditMedium`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["category"],
    }),

    getStyle: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetStylesList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "style", page }],
    }),
    addStyle: builder.mutation({
      query: (formValue) => ({
        url: "AddStyles",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["style"],
    }),
    updateStyleSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneStyles`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["style"],
    }),
    editStyle: builder.mutation({
      query: (formValue) => ({
        url: `EditStyles`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["style"],
    }),

    getMaterial: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetMaterialList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "material", page }],
    }),

    getArtProductMaterial: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtProductMaterialList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artproductmaterial", page }],
    }),

    getArtProductBrand: builder.query({
      query: ({page = 1, search}) => ({
        url: `/GetArtProductBrandList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artproductbrand", page }],
    }),

    getArtProductFabric: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtProductFabricList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artproductfabric", page }],
    }),

    getArtProductType: builder.query({
      query: () => ({
        url: "/GetArtProductTypeList",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["artproducttype"],
    }),

    getArtProductTechnique: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtProductTechniqueList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artproducttechnique", page }],
    }),

    getArtProductShape: builder.query({
      query: ({page = 1, search}) => ({
        url: `/GetArtProductShapeList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artproductshape", page }],
    }),

    getArtProductSize: builder.query({
      query: ({page = 1, search , limit}) => ({
        url: `/GetArtProductSizeList?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artproductsize", page }],
    }),

    getArtProductCategory: builder.query({
      query: ({page = 1,search,limit=10}) => ({
        url: `/GetArtProductCategoryList?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artproductcategory", page }],
    }),

    getArtProductStyle: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtProductStyleList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artproductstyle", page }],
    }),

    getArtProductNameList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtProductNameList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artproductname", page }],
    }),

    addMaterial: builder.mutation({
      query: (formValue) => ({
        url: "AddMaterial",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["material"],
    }),

    addArtProductMaterial: builder.mutation({
      query: (formValue) => ({
        url: "AddArtProductMaterial",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductmaterial"],
    }),

    addArtProductBrand: builder.mutation({
      query: (formValue) => ({
        url: "AddArtProductBrand",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductbrand"],
    }),

    addArtProductFabric: builder.mutation({
      query: (formValue) => ({
        url: "AddArtProductFabric",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductfabric"],
    }),

    addArtProductCategory: builder.mutation({
      query: (formValue) => ({
        url: "AddArtProductCategory",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductcategory"],
    }),

    addArtProductName: builder.mutation({
      query: (formValue) => ({
        url: "AddArtProductName",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductname"],
    }),

    addArtProductType: builder.mutation({
      query: (formValue) => ({
        url: "AddArtProductType",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproducttype"],
    }),

    addArtProductShape: builder.mutation({
      query: (formValue) => ({
        url: "AddArtProductShape",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductshape"],
    }),

    addArtProductStyle: builder.mutation({
      query: (formValue) => ({
        url: "AddArtProductStyle",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductstyle"],
    }),

    addArtProductSize: builder.mutation({
      query: (formValue) => ({
        url: "AddArtProductSize",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductsize"],
    }),

    addArtProductTechnique: builder.mutation({
      query: (formValue) => ({
        url: "AddArtProductTechnique",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproducttechnique"],
    }),

    updateMaterialSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneMaterial`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["material"],
    }),

    updateArtProductMaterialSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtProductMaterial`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductmaterial"],
    }),

    updateArtProductBrandSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtProductBrand`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductbrand"],
    }),

    updateArtProductFabricSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtProductFabric`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductfabric"],
    }),

    updateArtProductCategorySection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtProductCategory`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductcategory"],
    }),

    updateArtProductCategoryName: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtProductName`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductname"],
    }),

    updateArtProductShapeSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtProductShape`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductshape"],
    }),

    updateArtProductSizeSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtProductSize`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductsize"],
    }),

    updateArtProductTechniqueSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtProductTechnique`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproducttechnique"],
    }),

    updateArtProductStyleSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtProductStyle`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductstyle"],
    }),

    updateArtProductTypeSection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtProductType`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproducttype"],
    }),

    editMaterial: builder.mutation({
      query: (formValue) => ({
        url: `EditMaterial`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["material"],
    }),

    editArtProductMaterial: builder.mutation({
      query: (formValue) => ({
        url: `EditArtproductMaterial`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductmaterial"],
    }),

    editArtProductBrand: builder.mutation({
      query: (formValue) => ({
        url: `EditArtproductBrand`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductbrand"],
    }),

    editArtProductFabric: builder.mutation({
      query: (formValue) => ({
        url: `EditArtproductFabric`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductfabric"],
    }),

    editArtProductCategory: builder.mutation({
      query: (formValue) => ({
        url: `EditArtproductCategory`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductcategory"],
    }),

    editArtProductCategoryName: builder.mutation({
      query: (formValue) => ({
        url: `EditArtproductName`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductname"],
    }),

    editArtProductShape: builder.mutation({
      query: (formValue) => ({
        url: `EditArtproductShape`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductshape"],
    }),

    editArtProductSize: builder.mutation({
      query: (formValue) => ({
        url: `EditArtproductSize`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductsize"],
    }),

    editArtProductType: builder.mutation({
      query: (formValue) => ({
        url: `EditArtproductType`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproducttype"],
    }),

    editArtProductTechnique: builder.mutation({
      query: (formValue) => ({
        url: `EditArtproductTechnique`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproducttechnique"],
    }),

    editArtProductStyle: builder.mutation({
      query: (formValue) => ({
        url: `EditArtproductStyle`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artproductstyle"],
    }),

    getArtistCategoryList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtistCategoryList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artistcategory", page }],
    }),
    getOneArtistCategory: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtistCategory`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistcategory"],
    }),
    editArtistCategory: builder.mutation({
      query: (formValue) => ({
        url: `EditArtistCategory`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistcategory"],
    }),
    addArtistCategory: builder.mutation({
      query: (formValue) => ({
        url: "AddArtistCategory",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistcategory"],
    }),

    getArtistStyleList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtistStyleList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artistcatestyle", page }],
    }),
    getOneArtistStyle: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtistStyle`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistcatestyle"],
    }),
    editArtistStyle: builder.mutation({
      query: (formValue) => ({
        url: `EditArtistStyle`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistcatestyle"],
    }),
    AddArtistStyle: builder.mutation({
      query: (formValue) => ({
        url: "AddArtistStyle",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistcatestyle"],
    }),

    getNotifications: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetNotifications?page=${page}&limit=5&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 5);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "notifications", page }],
    }),

    getArtistMediumList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtistMediumList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artistcatemediumlist", page }],
    }),
    getOneArtistMedium: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtistMedium`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistcatemediumlist"],
    }),
    editArtistMedium: builder.mutation({
      query: (formValue) => ({
        url: `EditArtistMedium`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistcatemediumlist"],
    }),
    addArtistMedium: builder.mutation({
      query: (formValue) => ({
        url: "AddArtistMedium",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistcatemediumlist"],
    }),

    getArtistLabelList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtistLabelList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artistlabels", page }],
    }),

    getOneArtistLabel: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtistLabel`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistlabels"],
    }),

    editArtistLabel: builder.mutation({
      query: (formValue) => ({
        url: `EditArtistLabel`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistlabels"],
    }),

    addArtistLabel: builder.mutation({
      query: (formValue) => ({
        url: "AddArtistLabel",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artistlabels"],
    }),

    getBannerdetailsList: builder.query({
      query: () => ({
        url: `/GetBannerDetails`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["banner"],
    }),

    getInnerBannerdetailsList: builder.query({
      query: () => ({
        url: `/GetInnerBannerDetails`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["banner"],
    }),


    getKeywordList: builder.query({
      query: ({page=1, search}) => ({
        url: `/GetKeywordList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "keyword", page }],
    }),
    getOneKeyword: builder.mutation({
      query: (formValue) => ({
        url: `GetOneKeyword`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["keyword"],
    }),
    editKeyword: builder.mutation({
      query: (formValue) => ({
        url: `EditKeyword`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["keyword"],
    }),
    addKeyword: builder.mutation({
      query: (formValue) => ({
        url: "AddKeyword",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["keyword"],
    }),

    getFeaturesList: builder.query({
      query: ({ page = 1,search }) => ({
        url: `/GetFeaturesList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "features", page }],
    }),

    getOneFeatures: builder.mutation({
      query: (formValue) => ({
        url: `GetOneFeatures`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["features"],
    }),

    AddFeatures: builder.mutation({
      query: (formValue) => ({
        url: "AddFeatures",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["features"],
    }),

    EditFeatures: builder.mutation({
      query: (formValue) => ({
        url: `EditFeatures`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["features"],
    }),

    getEventsList: builder.query({
      query: ({ page = 1,search}) => ({
        url: `/GetEventsList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "events", page }],
    }),

    getTeamsList: builder.query({
      query: ({ page = 1 , search}) => ({
        url: `/GetTeamList?page=${page}&limit=10&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "teams", page }],
    }),

    getOneTeam: builder.mutation({
      query: (formValue) => ({
        url: `GetOneTeamMember`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["teams"],
    }),

    AddTeam: builder.mutation({
      query: (formValue) => ({
        url: "AddTeamMember",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["teams"],
    }),

    EditTeam: builder.mutation({
      query: (formValue) => ({
        url: `EditTeamMember`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["teams"],
    }),

    getOneEvents: builder.mutation({
      query: (formValue) => ({
        url: `GetOneEvents`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["events"],
    }),

    AddEvents: builder.mutation({
      query: (formValue) => ({
        url: "AddEvents",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["events"],
    }),

    EditEvents: builder.mutation({
      query: (formValue) => ({
        url: `EditEvents`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["events"],
    }),

    getNewsList: builder.query({
      query: ({ page = 1, search }) => ({
        url: `/GetNewsList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "news", page }],
    }),
    getOneNews: builder.mutation({
      query: (formValue) => ({
        url: `GetOneNews`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["news"],
    }),
    EditNews: builder.mutation({
      query: (formValue) => ({
        url: `EditNews`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["news"],
    }),
    AddNews: builder.mutation({
      query: (formValue) => ({
        url: "AddNews",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["news"],
    }),

    getNewsListAuthor: builder.query({
      query: ({page =1,search ,limit }) => ({
        url: `/GetNewsAuthorList?page=${page}&limit=0&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "news", page }],
    }),
    getOneNewsAuthor: builder.mutation({
      query: (formValue) => ({
        url: `GetOneNewsAuthor`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["news"],
    }),
    EditNewsAuthor: builder.mutation({
      query: (formValue) => ({
        url: `EditNewsAuthor`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["news"],
    }),
    AddNewsAuthor: builder.mutation({
      query: (formValue) => ({
        url: "AddNewsAuthor",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["news"],
    }),

    getNFTBlockchainInfoList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetNFTBlockchainInfoList?page=${page}&limit=10&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "nftblockchain", page }],
    }),

   getOneNFTBlockchainInfo: builder.mutation({
      query: (formValue) => ({
        url: `GetOneNFTBlockchainInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["nftblockchain"],
    }),
    editNFTBlockchainInfo: builder.mutation({
      query: (formValue) => ({
        url: `EditNFTBlockchainInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["nftblockchain"],
    }),
    addNFTBlockchainInfo: builder.mutation({
      query: (formValue) => ({
        url: "AddNFTBlockchainInfo",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["nftblockchain"],
    }),

    getCmsPagesList: builder.query({
      query: ({page = 1, search}) => ({
        url: `/GetCMSList?page=${page}&limit=10&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "cms", page }],
    }),

    getOneCmsPageinInfo: builder.mutation({
      query: (formValue) => ({
        url: `GetOneCms`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["cms"],
    }),

    editCmsPagesinInfo: builder.mutation({
      query: (formValue) => ({
        url: `EditCms`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["cms"],
    }),

    getCMSPageDetailData: builder.query({
      query: () => ({
        url: `/GetAboutusPageDetails`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["cms"],
    }),

    updateAboutcms: builder.mutation({
      query: (formValue) => ({
        url: `UpdateAboutusCMS`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["cms"],
    }),

    getCollections: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetCollectionList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "collection", page }],
    }),
    getCollectionsMoreInfo: builder.mutation({
      query: (formValue) => ({
        url: `GetOneCollection`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["collection"],
    }),

    getArtwork: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtworkList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artwork", page }],
    }),
    getArtworksMoreInfo: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtwork`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artwork"],
    }),

    getBulkArtworkApproval: builder.mutation({
      query: (formValue) => ({
        url: `BulkArtItemApprove`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artwork"],
    }),

    getArtEditionMoreInfo: builder.mutation({
      query: (formValue,page = 1) => ({
        url: `GetArtEdition?page=${page}&limit=10`,
        method: "POST",
        body:   formValue, 
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artwork", page }],
    }),

    getEditartItemAccountMoreInfo: builder.mutation({
      query: (formValue) => ({
        url: `EditArtItemAccountStatus`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artwork"],
    }),

    getArtProductList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtproductList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "artwork", page }],
    }),

    getNetwork: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetNetworkList?page=${page}&limit=10&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "network", page }],
    }),

    getNetworkOne: builder.mutation({
      query: (formValue) => ({
        url: `/GetOneNetwork`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    networkOtpdetail: builder.query({
      query: () => ({
        url: `/Network2FA`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["network"],
    }),

    getNetworkverify: builder.mutation({
      query: (formValue) => ({
        url: `/VerifyNetwork2FA`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateNetwork: builder.mutation({
      query: (formValue) => ({
        url: `/EditNetwork`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getHistory: builder.query({
      query: ({ page = 1 }) => ({
        url: `/GetHistoryList?page=${page}&limit=10`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "history", page }],
    }),
    getGiftNFTHistoryList: builder.query({
      query: ({page = 1}) => ({
        url: `/GetGiftNFTHistoryList?page=${page}&limit=10`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "gifthistory", page }],
    }),

    getMediaListQuery: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetMediaLimitList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "gifthistory", page }],
    }),

    getCountryList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetCountryList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "countrylist", page }],
    }),

    getEditCountrylist: builder.mutation({
      query: (formValue) => ({
        url: `UpdateCountryStatus`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["countrylist"],
    }),

    getOneMediaLimit: builder.mutation({
      query: (formValue) => ({
        url: `GetOneMediaLimit`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["gifthistory"],
    }),

    editMediumlimit: builder.mutation({
      query: (formValue) => ({
        url: `EditMediaLimit`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["gifthistory"],
    }),

    getBidList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetBidList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "bid", page }],
    }),
    getBioList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetBioList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "user", page }],
    }),
    getBioListMoreInfo: builder.mutation({
      query: (formValue) => ({
        url: `GetOneBioInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["bio"],
    }),
    updateBiolist: builder.mutation({
      query: (formValue) => ({
        url: `/EditBioStatus`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["bio"],
    }),
    getTestimonial: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetTestimonial?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "testimonial", page }],
    }),
    getTestimonialMoreInfo: builder.mutation({
      query: (formValue) => ({
        url: `GetOneTestimonialInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["testimonial"],
    }),
    updateTestimonial: builder.mutation({
      query: (formValue) => ({
        url: `/EditTestimonialStatus`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["testimonial"],
    }),
    getExhibition: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetExhibition?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "exhibition", page }],
    }),
    getExhibitionMoreInfo: builder.mutation({
      query: (formValue) => ({
        url: `GetOneExhibitionInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["exhibition"],
    }),
    updateExhibition: builder.mutation({
      query: (formValue) => ({
        url: `/EditExhibtionStatus`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["exhibition"],
    }),

    getArtfairList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetArtfairList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "user", page }],
    }),
    getArtfairMoreInfo: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtfairInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artfair"],
    }),

    getArtcollectionList: builder.query({
      query: ({page = 1}) => ({
        url: `/GetArtcollectionList?page=${page}&limit=10`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "user", page }]
    }),
    getOneArtcollectionInfo: builder.mutation({
      query: (formValue) => ({
        url: `GetOneArtcollectionInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["artcollection"],
    }),

    getMediasList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetMedias?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "media", page }],
    }),
    getOneMediasInfo: builder.mutation({
      query: (formValue) => ({
        url: `GetOneMediasInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["media"],
    }),
    updateMedia: builder.mutation({
      query: (formValue) => ({
        url: `/EditMediaStatus`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["media"],
    }),

    getUserRoleInfo: builder.query({
      query: ({page = 1}) => ({
        url: `/GetUserRoleInfo?page=${page}&limit=10`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
       providesTags: (result, error, page) => [{ type: "user", page }],
    }),
    getOneUserRoleInfo: builder.mutation({
      query: (formValue) => ({
        url: `/GetOneUserRoleInfo`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["userrole"],
    }),
    editUserAgreement: builder.mutation({
      query: (formValue) => ({
        url: `EditUserAgreement`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["userrole"],
    }),

    getCategory: builder.query({
      query: ({page = 1, search }) => ({
        url: `/GetCategoryList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "category", page }],
    }),

    addCategory: builder.mutation({
      query: (formValue) => ({
        url: "AddCategory",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (category_id) => ({
        url: "/category/delete",
        method: "DELETE",
        body: category_id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.query({
      query: (category_id) => ({
        url: `category/detail/?category_id=${category_id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["category"],
    }),
    updateCategorySection: builder.mutation({
      query: (formValue) => ({
        url: `GetOneCategory`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["category"],
    }),
    editCategory: builder.mutation({
      query: (formValue) => ({
        url: `EditCategory`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["category"],
    }),
    getCollection: builder.query({
      query: () => ({
        url: `collection/fulllist/?page=1`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["category"],
    }),

    getBalanceDetails: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetAdminBalanceDetails?page=${page}&limit=10&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "balance", page }],
    }),

    withdrawHistory: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetWithdrawHistoryList?page=${page}&limit=10&search=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "balance", page }],
    }),

    withdrawAdminbalance: builder.mutation({
      query: (formValue) => ({
        url: `WithdrawAdminBalance`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["balance"],
    }),

    singleUserDetails: builder.query({
      query: (id) => ({
        url: `user/profile/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getTermsAndConditions: builder.query({
      query: (id) => ({
        url: `menu/gettermsconditions`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["terms"],
    }),
    addTermsAndConditions: builder.mutation({
      query: (formValue) => ({
        url: "menu/addtermsconditions",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["terms"],
    }),
    getSingleTerms: builder.query({
      query: (id) => ({
        url: `menu/gettermsconditions/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["terms"],
    }),
    editTerms: builder.mutation({
      query: (formValue) => ({
        url: `menu/edittermsconditions`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["terms"],
    }),
    deleteTerms: builder.mutation({
      query: (id) => ({
        url: "menu/deletetermsconditions",
        method: "DELETE",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["terms"],
    }),
    getcommision: builder.query({
      query: (id) => ({
        url: `settings/getoptions?name=admin_commission`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["commision"],
    }),
    editCommision: builder.mutation({
      query: (formValue) => ({
        url: `https://nugennftapi.stsblockchain.xyz/settings/setoptions`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["commison"],
    }),
    getItems: builder.query({
      query: () => ({
        url: `/item/list?user=admin&=&page=1`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getItemsList: builder.query({
      query: (id) => ({
        url: `/item/list?type=view&item_id=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getGeneralSettings: builder.query({
      query: () => ({
        url: `setting/getGeneralSettings`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["generalsettings"],
    }),
    editGeneralSettings: builder.mutation({
      query: (formValue) => ({
        url: `setting/updateGeneralSettings`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["generalsettings"],
    }),
    getHomePageBanner: builder.query({
      query: () => ({
        url: `/menu/gethomepagebanner`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["homepage"],
    }),
    addHomePageBanner: builder.mutation({
      query: (formValue) => ({
        url: "menu/addhomepagebanner",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["homepage"],
    }),
    getSingleHomePageBanner: builder.query({
      query: (id) => ({
        url: `menu/gethomepagebannerbyid/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["homepage"],
    }),
    editHomePageBanner: builder.mutation({
      query: (formValue) => ({
        url: `menu/edithomepagebanner`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["homepage"],
    }),
    deleteHomePageBanner: builder.mutation({
      query: (id) => ({
        url: "menu/deletehomepagebanner",
        method: "DELETE",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["homepage"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: `menu/getprivacypolicy`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["privacy"],
    }),
    addPrivacyPolicy: builder.mutation({
      query: (formValue) => ({
        url: "menu/addprivacypolicy",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["privacy"],
    }),
    getSinglePrivacyPolicy: builder.query({
      query: (id) => ({
        url: `menu/getprivacypolicybyid/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["privacy"],
    }),
    editPrivacyPolicy: builder.mutation({
      query: (formValue) => ({
        url: `/menu/editprivacypolicy`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["privacy"],
    }),
    deletePrivacyAndPolicy: builder.mutation({
      query: (id) => ({
        url: "menu/deleteprivacypolicy",
        method: "DELETE",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["privacy"],
    }),
    getHelpCenter: builder.query({
      query: () => ({
        url: `/menu/gethelpcenter`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["helpcenter"],
    }),
    addHelpCenter: builder.mutation({
      query: (formValue) => ({
        url: "menu/addhelpcenter",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["helpcenter"],
    }),

    getSingleHelpCenter: builder.query({
      query: (id) => ({
        url: `menu/gethelpcenterbyid/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["helpcenter"],
    }),
    editHelpCenter: builder.mutation({
      query: (formValue) => ({
        url: `menu/edithelpcenter`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["helpcenter"],
    }),
    deleteHelpCenter: builder.mutation({
      query: (id) => ({
        url: "menu/deletehelpcenter",
        method: "DELETE",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["helpcenter"],
    }),
    getCareer: builder.query({
      query: () => ({
        url: `menu/getcareers`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["career"],
    }),
    addCareer: builder.mutation({
      query: (formValue) => ({
        url: "menu/addcareers",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["career"],
    }),
    getSingleCareer: builder.query({
      query: (id) => ({
        url: `menu/getcareersbyid/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["career"],
    }),
    editCareer: builder.mutation({
      query: (formValue) => ({
        url: `menu/editcareers`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["career"],
    }),
    deleteCareer: builder.mutation({
      query: (id) => ({
        url: "menu/deletecareers",
        method: "DELETE",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["career"],
    }),
    getContactUs: builder.query({
      query: () => ({
        url: `menu/getcontactus`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["contact"],
    }),

    addContactUs: builder.mutation({
      query: (formValue) => ({
        url: "menu/addcontactus",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["contact"],
    }),
    getSingleContactUs: builder.query({
      query: (id) => ({
        url: `menu/getcontactusbyid/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["contact"],
    }),

    editContactUs: builder.mutation({
      query: (formValue) => ({
        url: `menu/editcontactus`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContactUs: builder.mutation({
      query: (id) => ({
        url: "menu/deletecontactus",
        method: "DELETE",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["contact"],
    }),
    getBlogs: builder.query({
      query: () => ({
        url: `menu/getblogs`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["blog"],
    }),
    addBlogs: builder.mutation({
      query: (formValue) => ({
        url: "menu/addblogs",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["blog"],
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/menu/getblogsbyid/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["blog"],
    }),

    editBlogs: builder.mutation({
      query: (formValue) => ({
        url: `menu/editblogs`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlogs: builder.mutation({
      query: (id) => ({
        url: "menu/deleteblogs",
        method: "DELETE",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["blog"],
    }),
    getFaq: builder.query({
      query: () => ({
        url: `menu/getfaq`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["faq"],
    }),
    addFaq: builder.mutation({
      query: (formValue) => ({
        url: "menu/addfaq",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["faq"],
    }),
    getSingleFaq: builder.query({
      query: (id) => ({
        url: `/menu/getfaqbyid/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["faq"],
    }),

    editFaq: builder.mutation({
      query: (formValue) => ({
        url: `menu/editfaq`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["faq"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: "menu/deletefaq",
        method: "DELETE",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["faq"],
    }),
    getSocialMediaLinks: builder.query({
      query: () => ({
        url: `setting/getSocialLink`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["socialmedia"],
    }),
    addSocialMedia: builder.mutation({
      query: (formValue) => ({
        url: "setting/socialLink",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["socialmedia"],
    }),
    getEmailSettings: builder.query({
      query: () => ({
        url: `setting/getEmailSettings`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["emailsettings"],
    }),
    addEmailSettings: builder.mutation({
      query: (formValue) => ({
        url: "setting/emailsettings",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["emailsettings"],
    }),

    getOffer: builder.query({
      query: ({page = 1,search}) => ({
        url: `GetOfferList?page=${page}&limit=10search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
    }),

    createUser: builder.mutation({
      query: (formValue) => ({
        url: "user/createuser",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (formValue) => ({
        url: "user/updateuser",
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["users"],
    }),

    getFooterList: builder.query({
      query: () => ({
        url: `menu/footerfulllist`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["footer"],
    }),
    addFooter: builder.mutation({
      query: (formValue) => ({
        url: "menu/addfootermenu",
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["footer"],
    }),
    getFooterListById: builder.query({
      query: (id) => ({
        url: `menu/footerListbyid/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["footer"],
    }),
    deleteFooter: builder.mutation({
      query: (id) => ({
        url: "menu/deletefootermenu",
        method: "DELETE",
        body: id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["footer"],
    }),

    editFooter: builder.mutation({
      query: (formValue) => ({
        url: `menu/editfootermenu`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["footer"],
    }),
    getActivityList: builder.query({
      query: () => ({
        url: `item/history`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["activity"],
    }),
    getTensales: builder.query({
      query: () => ({
        url: `item/last-ten-day`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["activity"],
    }),
    getSuspendedUserList: builder.query({
      query: () => ({
        url: `user/suspended-user`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["user"],
    }),
    getDeletedUserList: builder.query({
      query: () => ({
        url: `user/deleted-user`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["user"],
    }),
    getEmailTemplate: builder.query({
      query: () => ({
        url: `menu/getemailtemplate`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["emailTemplate"],
    }),

    editEmailTemplate: builder.mutation({
      query: (formValue) => ({
        url: `/menu/editemailtemplate`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["emailTemplate"],
    }),
    getEmailTemplateById: builder.query({
      query: (id) => ({
        url: `menu/getemailtemplatebyid/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["footer"],
    }),

    profileUpload: builder.mutation({
      query: (formValue) => ({
        url: `/media/avatar`,
        method: "PUT",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["emailTemplate"],
    }),

    actionsItems: builder.mutation({
      query: (formValue) => ({
        url: `/item/allActions`,
        method: "POST",
        body: formValue,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["emailTemplate"],
    }),

    getItemTopPrice: builder.query({
      query: () => ({
        url: `item/topprice`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["price"],
    }),
    getLiveAuction: builder.query({
      query: () => ({
        url: `item/liveActions`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),
    getmonthlylogin: builder.query({
      query: () => ({
        url: `GetProfileViewsByMonth`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),
    getItemViewsByMonth: builder.query({
      query: () => ({
        url: `GetItemViewsByMonth`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),
    getVisitors: builder.query({
      query: () => ({
        url: `GetVisitors`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),

    getsalesDetail: builder.query({
      query: () => ({
        url: `GetSalesDetail`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),

    getUserDetailQuery: builder.query({
      query: () => ({
        url: `GetUserDetail`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),

    getItemDetailQuery: builder.query({
      query: () => ({
        url: `GetItemDetail`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),


    getartProductDetail: builder.query({
      query: () => ({
        url: `GetArtProductItemDetail`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),

    getProfileViewsByCountry: builder.query({
      query: () => ({
        url: `GetProfileViewsByCountry`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),
    getItemViewsByCountry: builder.query({
      query: () => ({
        url: `GetItemViewsByCountry`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),

    getPriceHistory: builder.query({
      query: () => ({
        url: `item/price-history`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["auction"],
    }),
    changeAdmin: builder.mutation({
      query: (newPost) => ({
        url: `/collection/updateAdmin`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAdminCahnge: builder.query({
      query: () => ({
        url: `collection/getAdmin`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      editorPicks: builder.mutation({
        query: (newPost) => ({
          url: `/item/update-home`,
          method: "POST",
          body: newPost,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      }),
    }),
    AddGiftNft: builder.mutation({
      query: (newPost) => ({
        url: `/AddGiftNft`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    GetGiftNFTList: builder.query({
      query: ({page = 1,search}) => ({
        url: `/GetGiftNFTList?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
    }),
    GetOneGiftNFT: builder.mutation({
      query: (newPost) => ({
        url: `/GetOneGiftNFT`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    EditGiftNft: builder.mutation({
      query: (newPost) => ({
        url: `/EditGiftNft`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    MintGiftNft: builder.mutation({
      query: (newPost) => ({
        url: `/MintGiftNft`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    csvSampleList: builder.query({
      query: ({page = 1, search}) => ({
        url: `/GetCsvSamples?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        const data = response.info;
        const count = response.count;
        const totalPages = Math.ceil(count / 10);
        return { data, count, totalPages };
      },
      providesTags: (result, error, page) => [{ type: "csvsample", page }],
    }),

    uploadCsvSample: builder.mutation({
      query: (newPost) => ({
        url: `/UploadCsvSamples`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateCsvSample: builder.mutation({
      query: (newPost) => ({
        url: `/UpdateCsvSamples`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutationMutation,
  useForgotPasswordMutationMutation,
  useResetpasswordMutationMutation,
  useGetSiteSettingsQueryQuery,
  useGetOneAdminInfoMutation,
  useUpdateProjectDetailsMutationMutation,
  useUpdateSocialMediaSettingsMutationMutation,
  useUpdateEmailSettingsMutationMutation,
  useUpdateModuleEnableSettingMutationMutation,
  useUpdateCaptchaSettingMutationMutation,
  useUpdateFooterLinkDetailsMutation,
  useAddAdminMutationMutation,
  useGetAdminListQueryQuery,
  useUpdateAdminMutationMutation,
  useGetAdminRoleQueryQuery,
  useUpdateAdminRoleMutationMutation,
  useAddAdminRoleMutationMutation,
  useGetAdminOneAdminMutation,
  useGetAdminOneRoleMutation,
  useGetAdminEmailTemplateQuery,
  useGetUpdateEmailTemplateMutationMutation,
  useGetOneEmailTemplateMutationMutation,
  useGetKycDetilsQueryQuery,
  useGetUserlistDetailsQuery,
  useGetOneKycDocMutation,
  useGetOnePersonalInfoMutationMutation,
  useUpdateAccountStatusMutation,
  useUpdateKycStatusMutation,
  useGetActivitiesQueryQuery,
  useGetBlockListQueryQuery,
  useGetChooseArtistMutationMutation,

  useGetMediumQuery,
  useAddMediumMutation,
  useUpdateMediumSectionMutation,
  useEditMediumMutation,

  useGetStyleQuery,
  useAddStyleMutation,
  useUpdateStyleSectionMutation,
  useEditStyleMutation,

  useGetMaterialQuery,
  useAddMaterialMutation,
  useUpdateMaterialSectionMutation,
  useEditMaterialMutation,

  useGetArtProductMaterialQuery,
  useAddArtProductMaterialMutation,
  useUpdateArtProductMaterialSectionMutation,
  useEditArtProductMaterialMutation,

  useGetArtProductCategoryQuery,
  useAddArtProductCategoryMutation,
  useUpdateArtProductCategorySectionMutation,
  useEditArtProductCategoryMutation,

  useGetArtProductNameListQuery,
  useAddArtProductNameMutation,
  useUpdateArtProductCategoryNameMutation,
  useEditArtProductCategoryNameMutation,

  useGetArtProductBrandQuery,
  useAddArtProductBrandMutation,
  useUpdateArtProductBrandSectionMutation,
  useEditArtProductBrandMutation,

  useGetArtProductFabricQuery,
  useAddArtProductFabricMutation,
  useUpdateArtProductFabricSectionMutation,
  useEditArtProductFabricMutation,

  useGetArtProductShapeQuery,
  useAddArtProductShapeMutation,
  useUpdateArtProductShapeSectionMutation,
  useEditArtProductShapeMutation,

  useGetArtProductSizeQuery,
  useAddArtProductSizeMutation,
  useUpdateArtProductSizeSectionMutation,
  useEditArtProductSizeMutation,

  useGetArtProductStyleQuery,
  useAddArtProductStyleMutation,
  useUpdateArtProductStyleSectionMutation,
  useEditArtProductStyleMutation,

  useGetArtProductTypeQuery,
  useAddArtProductTypeMutation,
  useUpdateArtProductTypeSectionMutation,
  useEditArtProductTypeMutation,

  useGetArtProductTechniqueQuery,
  useAddArtProductTechniqueMutation,
  useUpdateArtProductTechniqueSectionMutation,
  useEditArtProductTechniqueMutation,

  useGetArtistCategoryListQuery,
  useGetOneArtistCategoryMutation,
  useEditArtistCategoryMutation,
  useAddArtistCategoryMutation,

  useGetArtistStyleListQuery,
  useGetOneArtistStyleMutation,
  useEditArtistStyleMutation,
  useAddArtistStyleMutation,

  useGetArtistMediumListQuery,
  useGetOneArtistMediumMutation,
  useEditArtistMediumMutation,
  useAddArtistMediumMutation,

  useGetArtistLabelListQuery,
  useGetOneArtistLabelMutation,
  useEditArtistLabelMutation,
  useAddArtistLabelMutation,

  useGetBannerdetailsListQuery,
  useGetInnerBannerdetailsListQuery,

  useGetNotificationsQuery,

  useGetKeywordListQuery,
  useGetOneKeywordMutation,
  useEditKeywordMutation,
  useAddKeywordMutation,

  useGetNewsListQuery,
  useGetOneNewsMutation,
  useEditNewsMutation,
  useAddNewsMutation,

  useGetFeaturesListQuery,
  useGetOneFeaturesMutation,
  useAddFeaturesMutation,
  useEditFeaturesMutation,

  useGetTeamsListQuery,
  useGetOneTeamMutation,
  useAddTeamMutation,
  useEditTeamMutation,

  useGetEventsListQuery,
  useGetOneEventsMutation,
  useAddEventsMutation,
  useEditEventsMutation,

  useGetNewsListAuthorQuery,
  useGetOneNewsAuthorMutation,
  useEditNewsAuthorMutation,
  useAddNewsAuthorMutation,

  useGetNFTBlockchainInfoListQuery,
  useGetOneNFTBlockchainInfoMutation,
  useEditNFTBlockchainInfoMutation,
  useAddNFTBlockchainInfoMutation,

  useGetCmsPagesListQuery,
  useGetOneCmsPageinInfoMutation,
  useEditCmsPagesinInfoMutation,

  useGetCMSPageDetailDataQuery,
  useUpdateAboutcmsMutation,

  useGetCollectionsQuery,
  useGetCollectionsMoreInfoMutation,

  useGetArtworkQuery,
  useGetArtworksMoreInfoMutation,
  useGetEditartItemAccountMoreInfoMutation,
  useGetBulkArtworkApprovalMutation,

  useGetArtEditionMoreInfoMutation,

  useGetArtProductListQuery,

  useGetNetworkQuery,
  useGetNetworkOneMutation,
  useUpdateNetworkMutation,
  useNetworkOtpdetailQuery,
  useGetNetworkverifyMutation,

  useGetHistoryQuery,
  useGetGiftNFTHistoryListQuery,

  useGetMediaListQueryQuery,
  useGetOneMediaLimitMutation,
  useEditMediumlimitMutation,

  useGetBidListQuery,

  useGetBioListQuery,
  useGetBioListMoreInfoMutation,
  useUpdateBiolistMutation,

  useGetTestimonialQuery,
  useGetTestimonialMoreInfoMutation,
  useUpdateTestimonialMutation,

  useGetExhibitionQuery,
  useGetExhibitionMoreInfoMutation,
  useUpdateExhibitionMutation,

  useGetArtfairListQuery,
  useGetArtfairMoreInfoMutation,

  useGetArtcollectionListQuery,
  useGetOneArtcollectionInfoMutation,

  useGetMediasListQuery,
  useGetOneMediasInfoMutation,
  useUpdateMediaMutation,

  useGetCategoryQuery,
  useGetUserRoleInfoQuery,
  useGetOneUserRoleInfoMutation,
  useEditUserAgreementMutation,

  useGetBalanceDetailsQuery,
  useWithdrawAdminbalanceMutation,
  useWithdrawHistoryQuery,

  useGetCountryListQuery,
  useGetEditCountrylistMutation,

  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryQuery,
  useUpdateCategorySectionMutation,
  useEditCategoryMutation,
  useGetCollectionQuery,
  useUserDetailsQuery,
  useSingleUserDetailsQuery,
  useGetTermsAndConditionsQuery,
  useAddTermsAndConditionsMutation,
  useGetSingleTermsQuery,
  useEditTermsMutation,
  useDeleteTermsMutation,
  useGetcommisionQuery,
  useGetItemsQuery,
  useGetItemsListQuery,
  useGetGeneralSettingsQuery,
  useGetHomePageBannerQuery,
  useAddHomePageBannerMutation,
  useGetSingleHomePageBannerQuery,
  useEditHomePageBannerMutation,
  useDeleteHomePageBannerMutation,
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
  useGetSinglePrivacyPolicyQuery,
  useEditPrivacyPolicyMutation,
  useDeletePrivacyAndPolicyMutation,
  useGetHelpCenterQuery,
  useAddHelpCenterMutation,
  useGetSingleHelpCenterQuery,
  useEditHelpCenterMutation,
  useDeleteHelpCenterMutation,
  useGetCareerQuery,
  useAddCareerMutation,
  useGetSingleCareerQuery,
  useEditCareerMutation,
  useDeleteCareerMutation,
  useGetContactUsQuery,
  useAddContactUsMutation,
  useGetSingleContactUsQuery,
  useEditContactUsMutation,
  useDeleteContactUsMutation,
  useGetBlogsQuery,
  useAddBlogsMutation,
  useGetSingleBlogQuery,
  useEditBlogsMutation,
  useDeleteBlogsMutation,
  useGetFaqQuery,
  useAddFaqMutation,
  useGetSingleFaqQuery,
  useEditFaqMutation,
  useDeleteFaqMutation,
  useGetSocialMediaLinksQuery,
  useAddSocialMediaMutation,
  useGetEmailSettingsQuery,
  useAddEmailSettingsMutation,
  useGetOfferQuery,
  useEditGeneralSettingsMutation,
  useGetEmailPendingQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetFooterListQuery,
  useAddFooterMutation,
  useGetFooterListByIdQuery,
  useDeleteFooterMutation,
  useGetActivityListQuery,
  useEditFooterMutation,
  useGetSuspendedUserListQuery,
  useGetDeletedUserListQuery,
  useGetEmailTemplateQuery,
  useEditEmailTemplateMutation,
  useGetEmailTemplateByIdQuery,
  useProfileUploadMutation,
  useActionsItemsMutation,
  useEditCommisionMutation,
  useGetItemTopPriceQuery,
  useGetLiveAuctionQuery,
  useGetTensalesQuery,
  useGetPriceHistoryQuery,
  useGetmonthlyloginQuery,
  useGetItemViewsByMonthQuery,
  useGetProfileViewsByCountryQuery,
  useGetItemViewsByCountryQuery,
  useChangeAdminMutation,
  useGetAdminCahngeQuery,
  useGetVisitorsQuery,
  useGetsalesDetailQuery,
  useGetUserDetailQueryQuery,
  useGetItemDetailQueryQuery,
  useGetartProductDetailQuery,
  useEditorPicksMutation,
  useVerifyTOFAMutation,
  useAddGiftNftMutation,
  useGetGiftNFTListQuery,
  useGetOneGiftNFTMutation,
  useEditGiftNftMutation,
  useMintGiftNftMutation,
  useGetAdminRoleQuerysQuery,
  useCsvSampleListQuery,
  useUploadCsvSampleMutation,
  useUpdateCsvSampleMutation,
} = getUserDetails;