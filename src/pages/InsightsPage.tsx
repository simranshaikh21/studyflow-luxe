import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingOrbs from "@/components/FloatingOrbs";
import DeepWorkOverlay from "@/components/DeepWorkOverlay";
import BackButton from "@/components/BackButton";
import ScrollToTop from "@/components/ScrollToTop";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, Zap, Target, Calendar, Flame, Award } from "lucide-react";

const weeklyData = [
  { day: "Mon", hours: 4.2, sessions: 8 },
  { day: "Tue", hours: 5.8, sessions: 11 },
  { day: "Wed", hours: 3.1, sessions: 6 },
  { day: "Thu", hours: 6.4, sessions: 12 },
  { day: "Fri", hours: 5.0, sessions: 10 },
  { day: "Sat", hours: 7.2, sessions: 14 },
  { day: "Sun", hours: 4.5, sessions: 9 },
];

const monthlyData = [
  { week: "W1", hours: 28 },
  { week: "W2", hours: 34 },
  { week: "W3", hours: 31 },
  { week: "W4", hours: 38 },
];

const streakData = [
  { label: "Current Streak", value: "14 days", icon: Flame, color: "text-primary" },
  { label: "Best Streak", value: "21 days", icon: Award, color: "text-success" },
  { label: "Total Sessions", value: "284", icon: Target, color: "text-secondary" },
  { label: "This Month", value: "131h", icon: Calendar, color: "text-primary" },
];

const InsightsPage = () => (
  <div className="min-h-screen bg-background relative">
    <FloatingOrbs />
    <Navbar />
    <DeepWorkOverlay />
    <BackButton />
    <ScrollToTop />
    <div className="pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-3">
            Study <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-muted-foreground tracking-wide">
            Deep dive into your study habits and streaks
          </p>
        </div>

        {/* Streak cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {streakData.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all group">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3 group-hover:animate-bounce-gentle`} />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Weekly focus bar chart */}
          <div className="glass-card rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-bold text-foreground mb-1">Weekly Focus Hours</h3>
            <p className="text-xs text-muted-foreground tracking-wide mb-6">Hours spent in deep work</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 16%)" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(220 14% 60%)", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220 14% 60%)", fontSize: 12 }} unit="h" />
                  <Tooltip
                    contentStyle={{ background: "hsl(220 25% 8% / 0.9)", border: "1px solid hsl(220 20% 20%)", borderRadius: "12px" }}
                    labelStyle={{ color: "hsl(220 14% 92%)" }}
                    itemStyle={{ color: "hsl(298 36% 53%)" }}
                  />
                  <Bar dataKey="hours" radius={[8, 8, 0, 0]} fill="hsl(298 36% 53%)" fillOpacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly trend */}
          <div className="glass-card rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-bold text-foreground mb-1">Monthly Trend</h3>
            <p className="text-xs text-muted-foreground tracking-wide mb-6">Total focus hours by week</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 16%)" vertical={false} />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "hsl(220 14% 60%)", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220 14% 60%)", fontSize: 12 }} unit="h" />
                  <Tooltip
                    contentStyle={{ background: "hsl(220 25% 8% / 0.9)", border: "1px solid hsl(220 20% 20%)", borderRadius: "12px" }}
                    labelStyle={{ color: "hsl(220 14% 92%)" }}
                  />
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200 100% 37%)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(200 100% 37%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="hours" stroke="hsl(200 100% 37%)" fill="url(#colorHours)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sessions per day */}
          <div className="glass-card rounded-3xl p-6 md:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-lg font-bold text-foreground mb-1">Pomodoro Sessions</h3>
            <p className="text-xs text-muted-foreground tracking-wide mb-6">Number of focus sessions completed</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 16%)" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(220 14% 60%)", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220 14% 60%)", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: "hsl(220 25% 8% / 0.9)", border: "1px solid hsl(220 20% 20%)", borderRadius: "12px" }}
                    labelStyle={{ color: "hsl(220 14% 92%)" }}
                  />
                  <Line type="monotone" dataKey="sessions" stroke="hsl(56 92% 71%)" strokeWidth={2} dot={{ fill: "hsl(56 92% 71%)", r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default InsightsPage;
