import { Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { getRecentlyViewed } from "@/api/consulting/analytics";



export const RecentlyViewed = () => {
  const [items,setItems]=useState([])
 const getTimeAgo = (isoDate) => {
  const now = new Date();
  const createdAt = new Date(isoDate);
  const diffInMs = now.getTime() - createdAt.getTime();

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getRecentlyViewed();

      const latestByUser = new Map();

      data.forEach(item => {
        const userId = item.profile.user;
        const existing = latestByUser.get(userId);

        if (!existing || new Date(item.log.createdAt) > new Date(existing.log.createdAt)) {
          latestByUser.set(userId, item);
        }
      });

      setItems(Array.from(latestByUser.values()));
    } catch (err) {
      // alert('Failed to load recently viewed items');
      console.log('Failed to load recently viewed items')
    }
  };

  fetchData();
}, []);

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
          {items.map((item,index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={`http://localhost:5000${item.profile.profilePicture}`} />
                <AvatarFallback>{item.profile.firstName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium uppercase">{item.profile.firstName}{' '}{item.profile.lastName}</h3>
                <h4 className="font-normal text-sm">{item.profile.bio}</h4>
                <p className="text-sm text-muted-foreground capitalize">
                  {'portfolio'} • {getTimeAgo(item.log.createdAt)}
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
