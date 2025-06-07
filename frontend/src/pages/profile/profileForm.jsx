import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createProfile } from "@/api/main/user";

export function CreateProfileForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    field: "",
    contacts: { email: "", phone: "" },
    socialLinks: { github: "", linkedin: "", twitter: "" },
    skills: [],
    file: null,
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contacts: { ...prev.contacts, [name]: value },
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.firstName.length < 2)
      newErrors.firstName = "First name must be at least 2 characters";
    if (formData.lastName.length < 2)
      newErrors.lastName = "Last name must be at least 2 characters";
    if (formData.bio.length < 10)
      newErrors.bio = "Bio must be at least 10 characters";
    if (formData.location.length < 2)
      newErrors.location = "Location must be at least 2 characters";
    if (!formData.field)
      newErrors.field = "Field is required";
    if (formData.skills.length === 0)
      newErrors.skills = "At least one skill is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      let base64File = null;
      if (formData.file) {
        const reader = new FileReader();
        base64File = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(formData.file);
        });
      }

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        location: formData.location,
        field: formData.field,
        contacts: formData.contacts,
        socialLinks: formData.socialLinks,
        skills: formData.skills,
        file: base64File,
      };

      await createProfile(payload);
      navigate("/profile");
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-orange-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full bg-white shadow-md p-6 rounded-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-orange-600">Create Your Profile</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>First Name</Label>
            <Input name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <Label>Last Name</Label>
            <Input name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <Label>Bio</Label>
          <Textarea name="bio" value={formData.bio} onChange={handleChange} />
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        <div>
          <Label>Location</Label>
          <Input name="location" value={formData.location} onChange={handleChange} />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        <div>
          <Label>Field</Label>
          <select
            name="field"
            value={formData.field}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select field</option>
            <option value="engineering">engineering</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="AI/ML">AI / Machine Learning</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>
          {errors.field && <p className="text-red-500 text-sm">{errors.field}</p>}
        </div>

        {/* Contacts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Email</Label>
            <Input
              name="email"
              value={formData.contacts.email}
              onChange={handleContactChange}
              type="email"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              name="phone"
              value={formData.contacts.phone}
              onChange={handleContactChange}
              type="tel"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label>GitHub</Label>
            <Input
              name="github"
              value={formData.socialLinks.github}
              onChange={handleSocialLinkChange}
            />
          </div>
          <div>
            <Label>LinkedIn</Label>
            <Input
              name="linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleSocialLinkChange}
            />
          </div>
          <div>
            <Label>Twitter</Label>
            <Input
              name="twitter"
              value={formData.socialLinks.twitter}
              onChange={handleSocialLinkChange}
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <Label>Skills</Label>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill"
            />
            <Button type="button" onClick={addSkill}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap mt-2 gap-2">
            {formData.skills.map((skill, idx) => (
              <Badge key={idx} className="flex items-center gap-1">
                {skill}
                <Trash2 className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(idx)} />
              </Badge>
            ))}
          </div>
          {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
        </div>

        {/* File Upload */}
        <div>
          <Label>Upload File</Label>
          <Input type="file" onChange={handleFileChange} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Profile"}
        </Button>
      </form>
    </div>
  );
}
