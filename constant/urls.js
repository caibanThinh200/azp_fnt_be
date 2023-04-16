const ENDPOINT = {
    start: "/",
    upload: "/fnt-media",
    PRODUCT: {
        base: "/product",
        getDetail: "/detail/:id",
        getDetailClient: "/azp/detail/:slug"
    },
    ATTRIBUTE: {
        base: "/attribute",
        getDetail: "/detail/:id",
        all: "/all"
    },
    NEW: {
        base: "/new",
        getDetail: "/detail/:id",
        all: "/all"
    },
    DISCOUNT: {
        base: "/discount",
        getDetail: "/detail/:id",
        all: "/all"
    },
    PRODUCT_TYPE: {
        base: "/product-type",
        getDetail: "/detail/:id",
        all: "/all"
    },
    CATEGORY: {
        base: "/category",
        getDetail: "/detail/:id",
        all: "/all"
    },
    UPLOAD: {
        base: "/upload"
    },
    AUTH: {
        base: "/auth",
        register: "/register",
        login: "/login",
        getAuthToken: "/token",
        getDetail: "/detail/:id"
    },
    ORDER: {
        base: "/order",
        payment: "/payment/:id",
        getDetail: "/detail/:id",
        getRevenue: "/revenue",
        updateStatus: "/status/:id"
    },
    LAYOUT: {
        base: "/layout",
        getDetail: "/detail",
        all: "/all"
    },
}

export default ENDPOINT;