const ENDPOINT = {
    start: "/",
    upload: "/fnt-media",
    PRODUCT: {
        base: "/product",
        getDetail: "/detail/:id"
    },
    ATTRIBUTE: {
        base: "/attribute",
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
    }
}

export default ENDPOINT;