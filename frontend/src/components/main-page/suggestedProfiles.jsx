// components/SuggestedProfiles.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, MessageCircle, Crown } from "lucide-react";

const profiles = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Senior UX Designer",
    company: "TechCorp",
    avatar: "/avatars/01.png",
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
    company: "WebSolutions",
    avatar: "/avatars/02.png",
    premium: false,
    contacts: {
      email: "sarah@websolutions.com",
      github: "sarahmiller",
      linkedin: "sarah-miller",
    },
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Data Scientist",
    company: "DataInsights",
    avatar: "/avatars/03.png",
    premium: true,
    contacts: {
      email: "michael@datainsights.com",
      github: "michaelchen",
      linkedin: "michael-chen",
    },
  },
];

export const SuggestedProfiles = () => {
  return (
    <Card className="bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 border-orange-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-orange-900">Suggested Profiles</CardTitle>
        <p className="text-sm text-muted-foreground">
          Profiles that match your interests
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="relative flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-all"
            >
              {/* Premium Crown */}
              {profile.premium && (
                <Crown className="absolute top-2 right-2 text-yellow-400 h-5 w-5" />
              )}

              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-orange-300">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-semibold text-orange-900">
                  {profile.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {profile.title} at {profile.company}
                </p>
              </div>

              {/* Contact Icons */}
              <div className="flex gap-3 mt-1 text-green-600">
                <a
                  href={`mailto:${profile.contacts.email}`}
                  className="hover:text-orange-800 transition"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href={`https://github.com/${profile.contacts.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-800 transition"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={`https://linkedin.com/in/${profile.contacts.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-800 transition"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>

              <div className="flex justify-between items-center w-full mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                >
                  View Portfolio
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-orange-700 hover:text-orange-800"
                >
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
