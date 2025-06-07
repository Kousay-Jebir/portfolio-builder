import {
  Search,
  X,
  Filter,
  Mail,
  Github,
  Linkedin,
  Crown,
  MessageCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  getPortfoliosOfUser,
  getUsers,
  searchUser,
} from "@/api/consulting/user";
import { useState, useEffect } from "react";
import { getSubscriptionState } from "@/api/main/user";
import { MessagePopup } from "./messageDialog";
import { useNavigate } from "react-router";

const allProfiles = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Senior UX Designer",
    field: "Design",
    company: "TechCorp",
    avatar: "/avatars/01.png",
    skills: ["Figma", "User Research", "Prototyping"],
    premium: true,
    contacts: {
      email: "alex@techcorp.com",
      github: "alexjohnson",
      linkedin: "alex-johnson",
    },
  },
  {
    id: 2,
    name: "Sarah Miller",
    title: "Frontend Developer",
    field: "Development",
    company: "WebSolutions",
    avatar: "/avatars/02.png",
    skills: ["React", "TypeScript", "CSS"],
    premium: false,
    contacts: {
      email: "sarah@websolutions.com",
      github: "sarahmiller",
      linkedin: "sarah-miller",
    },
  },
  // ... continue for others
];

export const ProfileSearchSection = () => {
  const navigate = useNavigate();

  const [selectedProfile, setSelectedProfile] = useState(null);

  const [items, setItems] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [searched, setSearched] = useState(false);
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

      navigate(`/portfolio/${latestPortfolio.id}`)

    } catch (error) {
      console.error("Error fetching portfolio:", error);
      alert("Failed to fetch portfolio");
    }
  };
  const fetchData = async () => {
    try {
      const valueToSearch = selectedField == "all" ? "" : selectedField;
      const data = await getUsers(valueToSearch);

      const addSubscriptionStatus = async (items) => {
        return await Promise.all(
          items.map(async (item) => {
            const subStatus = await getSubscriptionState(item.user);
            return {
              ...item,
              isSubscribed: subStatus === "subscribed",
            };
          })
        );
      };

      const profilesWithSub = await addSubscriptionStatus(data);

      setItems(profilesWithSub);
    } catch (err) {
      alert("Failed to load  items");
    }
  };
  const handleSearch = async () => {
    try {
      await fetchData();

      console.log(selectedField);
      return selectedField == "all" ? true : await searchUser(selectedField);
    } catch (err) {
      alert("failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(()=>{
  //   console.log('users',items)
  // },[items])
  return (
    <>
      <Card className="bg-orange-100 shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-orange-900 mb-6 text-center">
            Find Professionals
          </h2>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
              <Input
                placeholder="Search by name, skills, or company..."
                className="pl-10 pr-10 py-5 bg-white border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Select onValueChange={(val) => setSelectedField(val)}>
                <SelectTrigger className="w-[180px] bg-white border-orange-200 focus:ring-orange-500">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-orange-400" />
                    <SelectValue placeholder="Filter by field" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="computer_science">
                    Computer_Science
                  </SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                </SelectContent>
              </Select>

              <Button
                className="bg-orange-600 hover:bg-orange-700"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>

          {/* Profile Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((profile, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-all h-full"
              >
                {/* Premium Crown */}
                {profile.isSubscribed && (
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <Crown className="text-yellow-500 h-4 w-4 fill-yellow-400" />
                  </div>
                )}

                <Avatar className="h-16 w-16 border-2 border-orange-200">
                  <AvatarImage
                    src={`http://localhost:5000${profile.profilePicture}`}
                  />
                  <AvatarFallback className="bg-orange-100 text-orange-700">
                    {profile.firstName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-black-900 capitalize">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-sm text-black-700/80">{profile.field}</p>
                  <p className="text-xs text-black-600/70">
                    {profile.location}
                  </p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center text-xs text-orange-800 mt-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-full bg-orange-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Contact Icons */}
                <div className="flex gap-3 mt-2 text-green-800">
                  <a
                    href={`mailto:${profile.contacts.email}`}
                    className="hover:text-green-800 transition"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href={`${profile.socialLinks.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-800 transition"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={`${profile.socialLinks.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-800 transition"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>

                <Button
                  variant="outline"
                  className="mt-3 border-orange-300 text-orange-600 hover:bg-orange-50"
                  onClick={() => {
                    handleViewPortfolio(profile.user);
                  }}
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
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-1">
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  className={`w-10 h-10 ${
                    page === 1
                      ? "bg-orange-100 border-orange-300 text-orange-700"
                      : "border-orange-200"
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </div>
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
