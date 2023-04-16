const TEXT_DEFINE = {
    SERVER: {
        success: "Server is running on port %s",
        error: "Sever is down",
        start: "Welcome to AZP server",
        databaseConnect: "Connected to database",
        databaseFailed: "Database connect has failed"
    },
    STATUS: {
        200: "success",
        500: "error"
    },
    ACTION: {
        200: "thành công",
        500: "thất bại",
        PRODUCT: {
            create: "Thêm sản phẩm",
            getList: "Lấy danh sách sản phẩm",
            getDetail: "Lấy chi tiết sản phẩm",
            update: "Cập nhật sản phẩm"
        },
        ATTRIBUTE: {
            create: "Thêm thuộc tính",
            getList: "Lấy danh sách thuộc tính",
            getDetail: "Lấy chi tiết thuộc tính",
            update: "Cập nhật thuộc tính"
        },
        CATEGORY: {
            create: "Thêm danh mục",
            getList: "Lấy danh sách danh mục",
            getDetail: "Lấy chi tiết danh mục",
            update: "Cập nhật danh mục"
        },
        PRODUCT_TYPE: {
            create: "Thêm phân loại sản phẩm",
            getList: "Lấy danh sách phân loại sản phẩm",
            getDetail: "Lấy chi tiết phân loại sản phẩm",
            update: "Cập nhật phân loại sản phẩm"
        },
        DISCOUNT: {
            create: "Thêm sự kiện khuyến mãi",
            getList: "Lấy danh sách sự kiện khuyến mãi",
            getDetail: "Lấy chi tiết sự kiện khuyến mãi",
            update: "Cập nhật sự kiện khuyến mãi"
        },
        UPLOAD: {
            create: "Thêm file",
            getList: "Lấy danh sách file",
            getDetail: "Lấy chi tiết file"
        },
        AUTH: {
            register: "Thêm user",
            login: "Đăng nhập",
            getList: "Lấy danh sách user",
            getDetail: "Lấy chi tiết user",
            update: "Cập nhật user"
        },
        ORDER: {
            create: "Thêm đơn hàng",
            getList: "Lấy danh sách đơn hàng",
            getDetail: "Lấy chi tiết đơn hàng",
            update: "Cập nhật đơn hàng",
            getRevenue: "Lấy thống kê đơn hàng"
        },
        NEW: {
            create: "Thêm tin tức",
            getList: "Lấy danh sách tin tức",
            getDetail: "Lấy chi tiết tin tức",
            update: "Cập nhật tin tức"
        },
        LAYOUT: {
            create: "Thêm thông tin",
            getList: "Lấy danh sách thông tin",
            getDetail: "Lấy chi tiết thông tin",
            update: "Cập nhật thông tin"
        },
    },
    ERROR: {
        invalidLogin: "Tên đăng nhập hoặc mật khẩu không trùng khớp",

    },
    VALIDATION: {
        USER: {
            name: "Họ tên không hợp lệ",
            phone: "SDT không hợp lệ",
            address: "Địa chỉ không hợp lệ",
            password: "Mật khẩu không hợp lệ",
            passwordUpperCase: "Mật khẩu phải có ít nhất 1 ký tự ghi hoa",
            passwordHasNumber: "Mật khẩu phải có ít nhất 1 ký tự số",
            passwordLength: "Mật khẩu phải có độ dài từ 4 đến 15",
            email: "Email không hợp lệ",
            unavailableEmail: "Email đã được đăng ký",
            unavailablePhone: "SDT đã được sử dụng",
            invalidUser: "Email hoặc mật khẩu không hợp lệ",
        },
        PRODUCT: {
            name: "Tên sản phẩm không hợp lệ",
            price: "Giá sản phẩm không hợp lệ",
            quantity: "Số lượng sản phẩm không hợp lệ",
            mainThumb: "Ảnh đại diện không hợp lệ",
            existing: "Tên sản phẩm đã tồn tại",
            excel: "Vui lòng nhập file excel bằng tên product"
        },
        DISCOUNT: {
            minPrice: "Giá sản phẩm phải lớn hơn 0"
        }
    },
    SCHEMA: {
        auth: "Auth",
        attribute: "Attribute",
        product: "Product",
        category: "Category",
        product_type: "Product-type",
        discount: "Discount",
        order: "Order",
        new: "New",
        social: "Social",
        store: "Store",
        layout: "Layout"
    }
}

export default TEXT_DEFINE;