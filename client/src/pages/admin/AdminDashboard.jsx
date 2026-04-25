import React from "react";
import {
  Users,
  UserCheck,
  ShieldAlert,
  DollarSign,
  Clock,
  CheckCircle,
  CreditCard,
  TrendingUp,
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
import {
  REVENUE_DATA,
  SERVICE_DISTRIBUTION,
  RECENT_ACTIVITIES,
} from "./mockdatas/mockDataDashboard";

const activityConfig = {
  USER_NEW: {
    icon: <Users size={14} />,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  OWNER_APPROVED: {
    icon: <CheckCircle size={14} />,
    color: "text-[#004D40]",
    bg: "bg-[#E0F2F1]",
  },
  PAYMENT: {
    icon: <CreditCard size={14} />,
    color: "text-[#FFAB40]",
    bg: "bg-[#FFAB40]/10",
  },
};

const AdminDashboard = () => {
  const stats = [
    {
      title: "Tổng Users",
      value: "4,200",
      icon: <Users />,
      percent: "+12%",
      isUp: true,
    },
    {
      title: "Tổng Owners",
      value: "101",
      icon: <UserCheck />,
      percent: "+5%",
      isUp: true,
    },
    {
      title: "Chờ duyệt",
      value: "24",
      icon: <ShieldAlert />,
      percent: "Cần xử lý",
      isUp: false,
    },
    {
      title: "Doanh thu",
      value: "32.5tr",
      icon: <DollarSign />,
      percent: "+43%",
      isUp: true,
    },
  ];

  const totalServices = SERVICE_DISTRIBUTION.reduce(
    (sum, i) => sum + i.value,
    0,
  );

  return (
    <div className="space-y-6 font-jakarta animate-in fade-in duration-500">
      {/* 1. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur-[10px] p-5 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-xl rounded-br-xl border border-white/40 shadow-sm hover:-translate-y-1 transition-all duration-300 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[#E0F2F1] rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md text-[#004D40] group-hover:text-white group-hover:bg-[#004D40] transition-all">
                {React.cloneElement(s.icon, { size: 20 })}
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.isUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {s.percent}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                {s.title}
              </p>
              <h2 className="text-2xl font-extrabold mt-1 text-[#004D40]">
                {s.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. REVENUE LINE CHART */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl border border-white/40 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#004D40] flex items-center gap-2">
              <TrendingUp size={18} /> Doanh thu hệ thống
            </h3>
            <select className="text-xs border-none bg-gray-50 rounded-lg p-1 outline-none font-medium">
              <option>6 tháng gần nhất</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af" }}
                  dy={10}
                />
                <YAxis
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af" }}
                  tickFormatter={(v) => v / 1000000 + "m"}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                  formatter={(v) => v.toLocaleString() + " VNĐ"}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#004D40"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    fill: "#FFAB40",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. SERVICE PIE CHART */}
        <div className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl border border-white/40 shadow-sm">
          <h3 className="font-bold text-[#004D40] mb-2">Phân bổ dịch vụ</h3>
          <p className="text-xs text-gray-400 mb-6">
            Dữ liệu thực tế trên toàn hệ thống
          </p>
          <div className="h-60 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SERVICE_DISTRIBUTION}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {SERVICE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={index} fill={entry.color} cornerRadius={10} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-[#004D40]">
                {totalServices}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                Tổng
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {SERVICE_DISTRIBUTION.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center p-3 bg-[#F5F5F5]/70 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-bold text-gray-600">
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-black text-[#004D40]">
                  {Math.round((item.value / totalServices) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. RECENT ACTIVITIES */}
      <div className="bg-white/80 backdrop-blur-[10px] p-6 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-2xl rounded-br-2xl border border-white/40 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-[#004D40] flex items-center gap-2">
            <Clock size={18} /> Nhật ký hoạt động
          </h3>
          <button className="text-xs font-bold text-[#FFAB40] hover:underline">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECENT_ACTIVITIES.map((act) => {
            const config = activityConfig[act.type] || {};

            return (
              <div
                key={act.id}
                className="bg-[#F5F5F5]/60 border border-white/40 p-4 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md flex items-start gap-4 hover:bg-white hover:shadow-sm transition-all group cursor-default"
              >
                <div
                  className={`p-2.5 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md ${config.bg} ${config.color} group-hover:scale-110 transition-transform`}
                >
                  {config.icon}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-[#004D40] text-sm font-bold">
                      {act.title}
                    </p>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">
                      {act.time}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1 font-medium">
                    {act.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
