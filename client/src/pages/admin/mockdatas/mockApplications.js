const mockApplications = [
  {
    id: "APP-001",
    user: "Nguyễn Văn A",
    businessName: "Mây Trắng Homestay",
    phone: "0901234567",
    email: "vana@gmail.com",
    address: "123 Trần Phú, Phường 4, Đà Lạt, Lâm Đồng",
    status: "PENDING",
    date: "2026-04-15",
    bank: {
      name: "VNPay",
      accountName: "Nguyễn Văn A",
      number: "1234567890",
    },
    docs: [
      {
        type: "CCCD",
        title: "CCCD mặt trước",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      },
      {
        type: "CCCD",
        title: "CCCD mặt sau",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55?w=800",
      },
      {
        type: "BUSINESS_LICENSE",
        title: "Giấy phép kinh doanh",
        description: "Giấy phép kinh doanh của Mây Trắng Homestay",
        url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      },
      {
        type: "SERVICE_IMAGE",
        description: "Ảnh chụp mặt tiền homestay",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      },
    ],
  },
  {
    id: "APP-002",
    user: "Trần Thị B",
    businessName: "Biển Xanh Hotel",
    phone: "0912345678",
    email: "thib@gmail.com",
    address: "456 Trần Hưng Đạo, Nha Trang, Khánh Hòa",
    status: "APPROVED",
    date: "2026-04-18",
    bank: {
      name: "VNPay",
      accountName: "Trần Thị B",
      number: "0987654321",
    },
    docs: [
      {
        type: "CCCD",
        title: "CCCD mặt trước",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      },
      {
        type: "CCCD",
        title: "CCCD mặt sau",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55?w=800",
      },
      {
        type: "BUSINESS_LICENSE",
        title: "Giấy phép kinh doanh",
        description: "Giấy phép kinh doanh khách sạn",
        url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      },
    ],
  },
  {
    id: "APP-003",
    user: "Lê Văn C",
    businessName: "Sunrise Villa",
    phone: "0933333333",
    email: "vanc@gmail.com",
    address: "789 Bạch Đằng, Phú Quốc, Kiên Giang",
    status: "REJECTED",
    date: "2026-04-10",
    adminNotes: "Giấy tờ không hợp lệ, cần bổ sung thêm giấy phép kinh doanh.",
    bank: {
      name: "VNPay",
      accountName: "Lê Văn C",
      number: "0123456789",
    },
    docs: [
      {
        type: "CCCD",
        title: "CCCD mặt trước",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      },
      {
        type: "CCCD",
        title: "CCCD mặt sau",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55?w=800",
      },
    ],
  },
  {
    id: "APP-004",
    user: "Phạm Thị D",
    businessName: "Ocean View Resort",
    phone: "0944444444",
    email: "thid@gmail.com",
    address: "321 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng",
    status: "PENDING",
    date: "2026-04-20",
    bank: {
      name: "VNPay",
      accountName: "Phạm Thị D",
      number: "1122334455",
    },
    docs: [
      {
        type: "CCCD",
        title: "CCCD mặt trước",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      },
      {
        type: "CCCD",
        title: "CCCD mặt sau",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55?w=800",
      },
      {
        type: "BUSINESS_LICENSE",
        title: "Giấy phép kinh doanh",
        description: "GPKD Resort cao cấp",
        url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      },
      {
        type: "SERVICE_IMAGE",
        description: "Hình ảnh resort",
        url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      },
    ],
  },
  {
    id: "APP-005",
    user: "Hoàng Văn E",
    businessName: "Mountain Lodge",
    phone: "0955555555",
    email: "vane@gmail.com",
    address: "654 Lê Lợi, Sa Pa, Lào Cai",
    status: "APPROVED",
    date: "2026-04-12",
    bank: {
      name: "VNPay",
      accountName: "Hoàng Văn E",
      number: "9988776655",
    },
    docs: [
      {
        type: "CCCD",
        title: "CCCD mặt trước",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      },
      {
        type: "CCCD",
        title: "CCCD mặt sau",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55?w=800",
      },
      {
        type: "BUSINESS_LICENSE",
        title: "Giấy phép kinh doanh",
        description: "GPKD Lodge núi",
        url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      },
    ],
  },
  {
    id: "APP-006",
    user: "Võ Thị F",
    businessName: "Riverside Boutique",
    phone: "0966666666",
    email: "thif@gmail.com",
    address: "147 Nguyễn Huệ, Hội An, Quảng Nam",
    status: "PENDING",
    date: "2026-04-22",
    bank: {
      name: "VNPay",
      accountName: "Võ Thị F",
      number: "5544332211",
    },
    docs: [
      {
        type: "CCCD",
        title: "CCCD mặt trước",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      },
      {
        type: "CCCD",
        title: "CCCD mặt sau",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55?w=800",
      },
      {
        type: "BUSINESS_LICENSE",
        title: "Giấy phép kinh doanh",
        description: "GPKD Boutique Hotel",
        url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      },
    ],
  },
];

export default mockApplications;