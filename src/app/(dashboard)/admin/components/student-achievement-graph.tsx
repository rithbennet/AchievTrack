"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
    { name: "Math", achievements: 65 },
    { name: "Science", achievements: 59 },
    { name: "English", achievements: 80 },
    { name: "History", achievements: 55 },
    { name: "Art", achievements: 40 },
    { name: "Music", achievements: 37 },
];

export function StudentAchievementGraph() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Student Achievements by Subject</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ChartContainer
                    config={{
                        achievements: {
                            label: "Achievements",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="h-[300px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="achievements" fill="var(--color-achievements)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

