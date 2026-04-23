import React from "react";
import {
  Users,
  UserCheck,
  ShieldAlert,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// 1. DATA BIỂU ĐỒ DOANH THU (Line Chart)
const revenueData = [
  { month: "Th1", revenue: 4000000 },
  { month: "Th2", revenue: 3000000 },
  { month: "Th3", revenue: 5000000 },
  { month: "Th4", revenue: 4500000 },
  { month: "Th5", revenue: 6000000 },
  { month: "Th6", revenue: 8000000 },
];

// 2. DATA TỶ LỆ USER VS OWNER (Pie Chart)
const serviceTypeData = [
  { name: "Khách sạn", value: 470, color: "#6366f1" }, // Indigo
  { name: "Nhà hàng", value: 330, color: "#10b981" }, // Emerald
  { name: "Hoạt động", value: 200, color: "#f59e0b" }, // Amber (Tham quan, Thuê xe...)
];

// 3. DATA HOẠT ĐỘNG GẦN ĐÂY (Recent Activities)
const recentActivities = [
  {
    id: 1,
    type: "USER_REG",
    title: "User mới đăng ký",
    desc: "Lê Văn Tám (levan8@gmail.com)",
    time: "5 phút trước",
    icon: <Users size={14} />,
    color: "text-blue-400",
  },
  {
    id: 2,
    type: "OWNER_APP",
    title: "Owner vừa được duyệt",
    desc: "Homestay Mây Trắng - Đà Lạt",
    time: "12 phút trước",
    icon: <CheckCircle size={14} />,
    color: "text-green-400",
  },
  {
    id: 3,
    type: "PAYMENT",
    title: "Giao dịch gần nhất",
    desc: "Mua Gói VIP - $499.00",
    time: "1 giờ trước",
    icon: <CreditCard size={14} />,
    color: "text-indigo-400",
  },
];

const AdminDashboard = () => {
  const stats = [
    {
      title: "Tổng Users",
      value: "4,200",
      icon: <Users size={20} />,
      percent: "+12%",
      isUp: true,
    },
    {
      title: "Tổng Owners",
      value: "101",
      icon: <UserCheck size={20} />,
      percent: "+5%",
      isUp: true,
    },
    {
      title: "Dịch vụ chờ duyệt",
      value: "24",
      icon: <ShieldAlert size={20} />,
      percent: "Cần xử lý",
      isUp: false,
    },
    {
      title: "Doanh thu hôm nay",
      value: "$1,240",
      icon: <DollarSign size={20} />,
      percent: "+43%",
      isUp: true,
    },
  ];

  const total = serviceTypeData.reduce((sum, i) => sum + i.value, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. CARDS THỐNG KÊ NHANH */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-[#1a1c2e] p-5 rounded-2xl border border-slate-800 shadow-lg group hover:border-indigo-500/50 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-slate-900 rounded-xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                {s.icon}
              </div>
              <div
                className={`px-2 py-1 rounded text-[10px] font-bold ${s.isUp ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
              >
                {s.percent}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                {s.title}
              </p>
              <h2 className="text-2xl font-black mt-1 text-white">{s.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. BIỂU ĐỒ DOANH THU (Line Chart) */}
        <div className="lg:col-span-2 bg-[#1a1c2e] p-6 rounded-2xl border border-slate-800">
          <h3 className="font-bold text-lg text-white mb-6">
            Doanh thu theo tháng
          </h3>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => value / 1_000_000 + " tr"}
                />
                <Tooltip
                  formatter={(value) =>
                    (value / 1_000_000).toFixed(1) + " triệu VNĐ"
                  }
                  contentStyle={{
                    backgroundColor: "#1e213a",
                    border: "none",
                    borderRadius: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={4}
                  dot={{ r: 6, fill: "#6366f1" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. TỶ LỆ SERVICE TYPES (Pie Chart) */}
        <div className="bg-[#1a1c2e] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex flex-col mb-6">
            <h3 className="font-bold text-lg text-white">Phân bổ dịch vụ</h3>
            <p className="text-xs text-slate-500 italic">
              Khách sạn, Nhà hàng & Hoạt động
            </p>
          </div>

          <div className="h-55">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceTypeData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {serviceTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      cornerRadius={4}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e213a",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chú thích (Legend) */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {serviceTypeData.map((item) => (
              <div
                key={item.name}
                className="flex flex-col p-2 rounded-lg bg-slate-900/40 border border-slate-800"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.name}
                  </span>
                </div>
                <div className="flex justify-between items-end mt-1">
                  <span className="text-sm font-bold text-white">
                    {item.value}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {Math.round((item.value / total) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. RECENT ACTIVITIES */}
      <div className="bg-[#1a1c2e] p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="text-indigo-400" size={20} />
          <h3 className="font-bold text-lg text-white">
            Hoạt động hệ thống gần đây
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-start gap-3 hover:bg-slate-800/50 transition cursor-default"
            >
              <div className={`mt-1 ${act.color}`}>{act.icon}</div>
              <div>
                <p className="text-white text-sm font-bold">{act.title}</p>
                <p className="text-slate-400 text-xs mt-1 line-clamp-1">
                  {act.desc}
                </p>
                <p className="text-slate-600 text-[10px] mt-2 font-medium uppercase">
                  {act.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;