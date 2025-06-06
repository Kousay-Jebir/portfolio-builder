// components/RecentlyViewed.tsx
import { Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentItems = [
  {
    id: 1,
    name: "Marketing Manager Resume",
    type: "resume",
    viewed: "2 hours ago",
    avatar: "/documents/resume.png",
  },
  {
    id: 2,
    name: "Software Engineer Portfolio",
    type: "portfolio",
    viewed: "1 day ago",
    avatar: "/documents/portfolio.png",
  },
  {
    id: 3,
    name: "Product Designer Template",
    type: "template",
    viewed: "3 days ago",
    avatar: "/documents/template.png",
  },
];

export const RecentlyViewed = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-600" />
          <CardTitle>Recently Viewed</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={item.avatar} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {item.type} • {item.viewed}
                </p>
              </div>
              <button className="text-sm font-medium text-orange-600 hover:text-orange-800">
                Open
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
