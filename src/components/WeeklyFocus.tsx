import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Clock } from "lucide-react";

const focusData = [
  { day: "Mon", hours: 4.2 },
  { day: "Tue", hours: 5.8 },
  { day: "Wed", hours: 3.1 },
  { day: "Thu", hours: 6.4 },
  { day: "Fri", hours: 5.0 },
  { day: "Sat", hours: 7.2 },
  { day: "Sun", hours: 4.5 },
];

const totalHours = focusData.reduce((sum, d) => sum + d.hours, 0);
const avgHours = (totalHours / 7).toFixed(1);
const bestDay = focusData.reduce((max, d) => (d.hours > max.hours ? d : max));

const WeeklyFocus = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Weekly Focus
          </h2>
          <p className="text-muted-foreground tracking-wide">
            Your deep work hours this week
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{totalHours.toFixed(1)}h</p>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">Total Focus</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{avgHours}h</p>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">Daily Average</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4 text-success" />
                <p className="text-2xl font-bold text-foreground">{bestDay.day}</p>
              </div>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">Best Day</p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={focusData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 16%)" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(220 14% 60%)", fontSize: 12, fontFamily: "Roboto" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(220 14% 60%)", fontSize: 12, fontFamily: "Roboto" }}
                  unit="h"
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(220 25% 8% / 0.9)",
                    border: "1px solid hsl(220 20% 20%)",
                    borderRadius: "12px",
                    backdropFilter: "blur(20px)",
                    fontFamily: "Roboto",
                  }}
                  labelStyle={{ color: "hsl(220 14% 92%)" }}
                  itemStyle={{ color: "hsl(298 36% 53%)" }}
                  formatter={(value: number) => [`${value}h`, "Focus"]}
                />
                <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                  {focusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry === bestDay ? "hsl(56 92% 71%)" : "hsl(298 36% 53%)"}
                      fillOpacity={entry === bestDay ? 1 : 0.7}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground tracking-wide">
              Updated in real-time during focus sessions
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyFocus;
