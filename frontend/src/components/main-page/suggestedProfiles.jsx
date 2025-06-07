import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  Crown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState,useEffect } from "react";
import { MessagePopup } from "./messageDialog";
import { getSuggestedPortfolios } from "@/api/consulting/analytics";
import { getSubscriptionState } from "@/api/main/user";
import { useNavigate } from "react-router";
import { getPortfoliosOfUser } from "@/api/consulting/user";

export const SuggestedProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [items,setItems]=useState([])
  const navigate=useNavigate()

  const handleViewPortfolio = async (userId) => {
      try {
        console.log("viewing", userId);
        const data = await getPortfoliosOfUser(userId);
        if (!data || data.length === 0) {
          alert("No portfolios found.");
          return;
        }
  
        const latestPortfolio = data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )[0];
  
        navigate(`/portfolio/${latestPortfolio.id}`);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        alert("Failed to fetch portfolio");
      }
    };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSuggestedPortfolios();
  
        const addSubscriptionStatus = async (items) => {
          return await Promise.all(
            items.map(async (item) => {
              const subStatus = await getSubscriptionState(item.user);
              return {
                ...item,
                isSubscribed: subStatus === 'subscribed',
              };
            })
          );
        };
  
        const suggestedWithSub = await addSubscriptionStatus(data);
  
        setItems(suggestedWithSub);
      
  
      } catch (err) {
        // alert('Failed to load  items');
        console.log('err')
      }
    };
  
    fetchData();
  }, []);
  // useEffect(()=>{
  //   console.log('suggested',items)
  // },[items])
  return (
    <>
      <Card className="bg-orange-200 shadow-md border-orange-100">
        <CardHeader>
          <CardTitle className="text-orange-700">Suggested Profiles</CardTitle>
          <p className="text-sm text-black-700/80">
            Profiles that match your interests
          </p>
         
        </CardHeader>
        <CardContent>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <div className="relative">
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white shadow-md border border-orange-200 hover:bg-orange-50 text-orange-600">
                <ChevronLeft className="h-4 w-4" />
              </CarouselPrevious>
              <CarouselContent className="-ml-1 py-4">
                {items.map((profile,index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4"
                  >
                    <div className="relative flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-all h-full">
                      {/* Premium Crown */}
                      {profile.isSubscribed && (
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          <Crown className="text-yellow-500 h-4 w-4 fill-yellow-400" />
                        </div>
                      )}

                      <div className="relative">
                        <Avatar className="h-16 w-16 border-2 border-orange-200">
                          <AvatarImage src={`http://localhost:5000${profile.profilePicture}`} />
                          <AvatarFallback className="bg-orange-200 text-orange-700">
                            {profile.firstName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="text-center space-y-1">
                        <h3 className="font-semibold text-black-900 capitalize">
                          {profile.firstName}{' '}{profile.lastName}
                        </h3>
                        <p className="text-sm text-black-700/80">
                          {profile.bio}
                        </p>
                        <p className="text-xs text-black-600/70">
                          {profile.location}
                        </p>
                      </div>

                      {/* Contact Icons */}
                      <div className="flex gap-3 mt-1 text-green-800">
                        <a
                          href={`mailto:${profile.contacts.email}`}
                          className="hover:text-green-800 transition"
                          aria-label="Email"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                        <a
                          href={`${profile.socialLinks.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-green-800 transition"
                          aria-label="GitHub"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                        <a
                          href={`${profile.socialLinks.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-green-800 transition"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>

                      <div className="flex justify-between items-center w-full mt-3">
                        <Button
                        onClick={()=>{handleViewPortfolio(profile.user)}}
                          variant="outline"
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700 text-white text-xs"
                        >
                          View Portfolio
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          onClick={() => setSelectedProfile(profile)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span className="text-xs">Message</span>
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white shadow-md border border-orange-200 hover:bg-orange-50 text-orange-600">
                <ChevronRight className="h-4 w-4" />
              </CarouselNext>
            </div>
          </Carousel>
        </CardContent>
      </Card>
      {selectedProfile && (
        <MessagePopup
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </>
  );
};
