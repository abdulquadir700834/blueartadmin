import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const loginToken = sessionStorage.getItem("loginToken");

export const Apilist = createApi({
    reducerPath: 'Apilist',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_USERPANEL_URL }),
    endpoints: (builder) => ({
        getSiteSetting: builder.query({
            query: () => `/GetSiteSettings`,
        }),
        registerAPI: builder.mutation({
            query: (data) => ({
                url: `/Register`,
                method: 'POST',
                body: data,
            }),
        }),
        emailOTPverification: builder.mutation({
            query: (data) => ({
                url: `/VerifyOTP`,
                method: 'POST',
                body: data,
            }),
        }),
        resendRegistrationOTP: builder.mutation({
            query: (data) => ({
                url: `/ResendRegisterVerifyOTP`,
                method: 'POST',
                body: data,
            }),
        }),
        selectRoleRegistration: builder.mutation({
            query: (data) => ({
                url: `/SelectRole`,
                method: 'POST',
                body: data,
            }),
        }),
        getCounties: builder.query({
            query: (data) => ({
                url: `/GetCountries`,
                method: 'GET',
            }),
        }),
        addressUpdateRegistration: builder.mutation({
            query: (data) => ({
                url: `/UpdateAddress`,
                method: 'POST',
                body: data,
            }),
        }),
        AgreementAccept: builder.mutation({
            query: (data) => ({
                url: `/AgreementAcceptance`,
                method: 'POST',
                body: data,
            }),
        }),
        KycRegistration: builder.mutation({
            query: (data) => ({
                url: `/UpdateKyc`,
                method: 'POST',
                body: data,
            }),
        }),
        LoginAPI: builder.mutation({
            query: (data) => ({
                url: `/Login`,
                method: 'POST',
                body: data,
            }),
        }),
        ForgotPasswordAPI: builder.mutation({
            query: (data) => ({
                url: `/ForgotPassword`,
                method: 'POST',
                body: data,
            }),
        }),
        ResetPasswordAPI: builder.mutation({
            query: (data) => ({
                url: `/ResetPassword`,
                method: 'POST',
                body: data,
            }),
        }),
        ConnectWalletAPI: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("loginToken")}`
                },
                url: `/ConnectWallet`,
                method: 'POST',
                body: data,
            }),
        }),
        CreateCollection: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/CreateCollection`,
                method: 'POST',
                body: data,
            }),
        }),
        getCollection: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetCollection`,
                method: 'GET',
            }),
        }),

        updateCollection: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/UpdateCollection`,
                method: 'POST',
                body: data,
            }),
        }),
        getCollectionInfo: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetCollectionInfo`,
                method: 'POST',
                body: data,
            }),
        }),
        getStyles: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetStyles`,
                method: 'GET',
            }),
        }),
        getMedium: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetMedium`,
                method: 'GET',
            }),
        }),
        getMaterials: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetMaterials`,
                method: 'GET',
            }),
        }),
        getKeywords: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetKeywords`,
                method: 'GET',
            }),
        }),
        getCategory: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetCategories`,
                method: 'GET',
            }),
        }),
        CreateItem: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/CreateItem`,
                method: 'POST',
                body: data,
            }),
        }),
        updateItem: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/UpdateItem`,
                method: 'POST',
                body: data,
            }),
        }),
        getCollectionBasedItem: builder.mutation({
            query: (data) => ({
                url: `/GetCollectionBasedItem`,
                method: 'POST',
                body: data,
            }),
        }),
        getLandingPage: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/LandingPageInfo`,
                method: 'GET',
            }),
        }),
        getRolebasedUsers: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/RoleBasedUsers`,
                method: 'POST',
                body: data,
            }),
        }),
        getAllCollection: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetAllCollection`,
                method: 'GET',
            }),
        }),
        getAllArtItems: builder.query({
            query: (data) => ({
                url: `/GetAllItem`,
                method: 'GET',
            }),
        }),
        getItemInfo: builder.mutation({
            query: (data) => ({
                url: `/GetItemInfo`,
                method: 'POST',
                body: data,
            }),
        }),
        ItemPublish: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/ItemPublish`,
                method: 'POST',
                body: data,
            }),
        }),

        SellItem: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/ItemList`,
                method: 'POST',
                body: data,
            }),
        }),
        AddtoCart: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/AddtoCart`,
                method: 'POST',
                body: data,
            }),
        }),
        getCartItems: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetCartItem`,
                method: 'POST',
                body: data,
            }),
        }),
        purchaseItem: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/PurchaseItem`,
                method: 'POST',
                body: data,
            }),
        }),
        MakeOffer: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/AddOffer`,
                method: 'POST',
                body: data,
            }),
        }),
        OfferlistBasedItem: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/OfferItemBasedList`,
                method: 'POST',
                body: data,
            }),
        }),
        AcceptOffer: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/Offerstatus`,
                method: 'POST',
                body: data,
            }),
        }),
        Removecart: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/RemoveFromCart`,
                method: 'POST',
                body: data,
            }),
        }),
        itemOwnerList: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetItemOwnerListInfo`,
                method: 'POST',
                body: data,
            }),
        }),
        itemHistoryList: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetItemHistoryListInfo`,
                method: 'POST',
                body: data,
            }),
        }),
        AuthorItemlist: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetAuthoredItemList`,
                method: 'GET',
            }),
        }),
        OwnedItemlist: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetOwnedItemList`,
                method: 'GET',
            }),
        }),
        GetProfileInfo: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetProfileInfo`,
                method: 'GET',
            }),
        }),
        GetArtistList: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/RoleBasedUsers`,
                method: 'POST',
                body: data,
            }),
        }),
        GetArtistInfo: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetArtistInfo`,
                method: 'POST',
                body: data,
            }),
        }),
        GoogleRegister: builder.mutation({
            query: (data) => ({
                url: `/GoogleRegister`,
                method: 'POST',
                body: data,
            }),
        }),
        GoogleLogin: builder.mutation({
            query: (data) => ({
                url: `/GoogleLogin`,
                method: 'POST',
                body: data,
            }),
        }),
        FacebookRegister: builder.mutation({
            query: (data) => ({
                url: `/FacebookRegister`,
                method: 'POST',
                body: data,
            }),
        }),
        FacebookLogin: builder.mutation({
            query: (data) => ({
                url: `/FacebookLogin`,
                method: 'POST',
                body: data,
            }),
        }),
        GetArtistCategories: builder.query({
            query: (data) => ({
                url: `/GetArtistCategories`,
                method: 'GET',
            }),
        }),
        CreateArtworkGeneral: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/CreateArtworkGeneral`,
                method: 'POST',
                body: data,
            }),
        }),
        CreateArtworkArtistDetail: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/CreateArtworkArtistDetail`,
                method: 'POST',
                body: data,
            }),
        }),
        CreateArtworkPriceDetail: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/CreateArtworkPriceDetail`,
                method: 'POST',
                body: data,
            }),
        }),
        CreateArtworkLogisticDetail: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/CreateArtworkLogisticDetail`,
                method: 'POST',
                body: data,
            }),
        }),
        CreateArtworkImageDetail: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/CreateArtworkImageDetail`,
                method: 'POST',
                body: data,
            }),
        }),
        GetAllPhysicalArt: builder.query({
            query: (data) => ({
                url: `/GetAllPhysicalArt`,
                method: 'GET',
            }),
        }),
        SellNFT: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/SellNFT`,
                method: 'POST',
                body: data,
            }),
        }),
        AddBid: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/AddBid`,
                method: 'POST',
                body: data,
            }),
        }),
        GetAllAuctionItem: builder.query({
            query: (data) => ({
                url: `/GetAllAuctionItem`,
                method: 'GET',
            }),
        }),
        GetUserRoleInfo: builder.mutation({
            query: (data) => ({
                url: `/GetUserRoleInfo`,
                method: 'POST',
                body: data,
            }),
        }),
        AddEditBio: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/AddEditBio`,
                method: 'POST',
                body: data,
            }),
        }),
        GetBio: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetBio`,
                method: 'GET',
            }),
        }),
        CommonImageUpload: builder.mutation({
            query: (imageData) => ({
                url: '/CommonImageUpload',
                method: 'POST',
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", "multipart/form-data");
                    return headers;
                },
                headers: {                  
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                body: imageData,
                formData: true,
            }),
        }),
        AddExhibition: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/AddExhibition`,
                method: 'POST',
                body: data,
            }),
        }),
        GetExhibitions: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetExhibitions`,
                method: 'GET',
            }),
        }),
        DeleteExhibition: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/DeleteExhibition`,
                method: 'POST',
                body: data,
            }),
        }),
        GetOneExhibition: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetOneExhibition`,
                method: 'POST',
                body: data,
            }),
        }),
        EditExhibition: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/EditExhibition`,
                method: 'POST',
                body: data,
            }),
        }),
        AddMediaPublications: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/AddMediaPublications`,
                method: 'POST',
                body: data,
            }),
        }),
        GetMediaPublications: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetMediaPublications`,
                method: 'GET',
            }),
        }),
        DeleteMediaPublications: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/DeleteMediaPublications`,
                method: 'POST',
                body: data,
            }),
        }),
        EditMediaPublications: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/EditMediaPublications`,
                method: 'POST',
                body: data,
            }),
        }),
        AddTestimonial: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/AddTestimonial`,
                method: 'POST',
                body: data,
            }),
        }),
        EditTestimonial: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/EditTestimonial`,
                method: 'POST',
                body: data,
            }),
        }),
        GetTestimonials: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetTestimonials`,
                method: 'GET',
            }),
        }),
        DeleteTestimonial: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/DeleteTestimonial`,
                method: 'POST',
                body: data,
            }),
        }),
        GetNewsList: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetNewsList`,
                method: 'GET',
            }),
        }),
        GetNFTBlockchainInfoList: builder.query({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetNFTBlockchainInfoList`,
                method: 'GET',
            }),
        }),
        GetItemDetailedInfo: builder.mutation({
            query: (data) => ({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("wallettoken")}`
                },
                url: `/GetItemDetailedInfo`,
                method: 'POST',
                body: data,
            }),
        }),
        
    }),
})

export const {
    useGetSiteSettingQuery,
    useRegisterAPIMutation,
    useEmailOTPverificationMutation,
    useResendRegistrationOTPMutation,
    useSelectRoleRegistrationMutation,
    useGetCountiesQuery,
    useAddressUpdateRegistrationMutation,
    useKycRegistrationMutation,
    useLoginAPIMutation,
    useCreateCollectionMutation,
    useGetCollectionQuery,
    useConnectWalletAPIMutation,
    useAgreementAcceptMutation,
    useUpdateCollectionMutation,
    useGetCollectionInfoMutation,
    useForgotPasswordAPIMutation,
    useResetPasswordAPIMutation,
    useGetStylesQuery,
    useGetMediumQuery,
    useGetMaterialsQuery,
    useCreateItemMutation,
    useGetCategoryQuery,
    useGetCollectionBasedItemMutation,
    useGetLandingPageQuery,
    useGetRolebasedUsersMutation,
    useGetAllCollectionQuery,
    useGetAllArtItemsQuery,
    useGetItemInfoMutation,
    useItemPublishMutation,
    useUpdateItemMutation,
    useSellItemMutation,
    useAddtoCartMutation,
    useGetCartItemsMutation,
    usePurchaseItemMutation,
    useMakeOfferMutation,
    useOfferlistBasedItemMutation,
    useAcceptOfferMutation,
    useRemovecartMutation,
    useItemOwnerListMutation,
    useItemHistoryListMutation,
    useAuthorItemlistQuery,
    useOwnedItemlistQuery,
    useGetProfileInfoQuery,
    useGetArtistListMutation,
    useGetArtistInfoMutation,
    useGoogleRegisterMutation,
    useFacebookRegisterMutation,
    useFacebookLoginMutation,
    useGoogleLoginMutation,
    useGetArtistCategoriesQuery,
    useCreateArtworkGeneralMutation,
    useCreateArtworkArtistDetailMutation,
    useCreateArtworkPriceDetailMutation,
    useCreateArtworkLogisticDetailMutation,
    useCreateArtworkImageDetailMutation,
    useGetKeywordsQuery,
    useGetAllPhysicalArtQuery,
    useSellNFTMutation,
    useAddBidMutation,
    useGetAllAuctionItemQuery,
    useGetUserRoleInfoMutation,
    useAddEditBioMutation,
    useGetBioQuery,
    useCommonImageUploadMutation,
    useAddExhibitionMutation,
    useGetExhibitionsQuery,
    useDeleteExhibitionMutation,
    useGetOneExhibitionMutation,
    useEditExhibitionMutation,
    useAddMediaPublicationsMutation,
    useGetMediaPublicationsQuery,
    useDeleteMediaPublicationsMutation,
    useEditMediaPublicationsMutation,
    useAddTestimonialMutation,
    useEditTestimonialMutation,
    useDeleteTestimonialMutation,
    useGetTestimonialsQuery,
    useGetNewsListQuery,
    useGetNFTBlockchainInfoListQuery,
    useGetItemDetailedInfoMutation,
    
} = Apilist

