"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", performance: 80 },
  { month: "Feb", performance: 85 },
  { month: "Mar", performance: 82 },
  { month: "Apr", performance: 88 },
  { month: "May", performance: 90 },
  { month: "Jun", performance: 92 },
];

export function TeacherPerformanceGraph() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Teacher Performance Over Time</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            performance: {
              label: "Performance",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="var(--color-performance)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
