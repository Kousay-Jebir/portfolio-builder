import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FieldTypeEnum } from "@/lib/enums";
import { useState } from "react";
import { Label } from "@/components/ui/label";

// Form schema validation
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  field: z.nativeEnum(FieldTypeEnum),
  contacts: z.record(z.string()).default({}),
  socialLinks: z.record(z.string()).default({}),
  file: z.any(),
  skills: z.array(z.string()).min(1, {
    message: "At least one skill is required.",
  }),
});

export function CreateProfileForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      location: "",
      field: undefined,
      contacts: {},
      socialLinks: {},
      skills: [],
    },
  });

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = form.getValues("skills") || [];
      form.setValue("skills", [...currentSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const currentSkills = form.getValues("skills");
    form.setValue(
      "skills",
      currentSkills.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append all fields to formData
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("bio", values.bio);
      formData.append("location", values.location);
      formData.append("field", values.field);
      formData.append("contacts", JSON.stringify(values.contacts));
      formData.append("socialLinks", JSON.stringify(values.socialLinks));
      formData.append("skills", JSON.stringify(values.skills));

      if (values.file) {
        formData.append("file", values.file);
      }

      const response = await fetch("/main/user/profile", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - let the browser set it with the boundary
      });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      const data = await response.json();

      toast({
        title: "Profile created successfully",
        description: "Your profile has been created.",
      });

      navigate("/profile"); // or wherever you want to redirect after success
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-6">
          Create Your Profile
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      rows={4}
                      {...field}
                      className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City, Country"
                      {...field}
                      className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Field</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-200 focus:ring-orange-400">
                        <SelectValue placeholder="Select your field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(FieldTypeEnum).map((field) => (
                        <SelectItem
                          key={field}
                          value={field}
                          className="hover:bg-orange-50"
                        >
                          {field}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel className="text-gray-700">Skills</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="border-gray-200 focus:border-orange-400 focus:ring-orange-400 flex-1"
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  variant="outline"
                  className="border-orange-400 text-orange-600 hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch("skills")?.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-white text-gray-700 border-orange-300 hover:bg-orange-50"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {form.formState.errors.skills && (
                <p className="text-sm font-medium text-red-500">
                  {form.formState.errors.skills.message}
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Profile Image</FormLabel>
                  <FormControl>
                    <FileUpload
                      onChange={field.onChange}
                      className="border-gray-200 hover:border-orange-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormLabel className="text-gray-700">
                  Contact Information
                </FormLabel>
                {["email", "phone"].map((contactType) => (
                  <div key={contactType} className="space-y-2">
                    <Label className="text-gray-700 capitalize">
                      {contactType}
                    </Label>
                    <Input
                      placeholder={`Your ${contactType}`}
                      className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                      onChange={(e) => {
                        const contacts = form.getValues("contacts") || {};
                        form.setValue("contacts", {
                          ...contacts,
                          [contactType]: e.target.value,
                        });
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <FormLabel className="text-gray-700">Social Links</FormLabel>
                {["github", "linkedin", "twitter"].map((socialType) => (
                  <div key={socialType} className="space-y-2">
                    <Label className="text-gray-700 capitalize">
                      {socialType}
                    </Label>
                    <Input
                      placeholder={`Your ${socialType} URL`}
                      className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                      onChange={(e) => {
                        const socialLinks = form.getValues("socialLinks") || {};
                        form.setValue("socialLinks", {
                          ...socialLinks,
                          [socialType]: e.target.value,
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Create Profile
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
