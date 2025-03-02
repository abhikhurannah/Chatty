import { Camera, User, Mail, Calendar, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthstore } from "../store/useAuthstore";



const gradients = [
  "bg-[linear-gradient(to_right,#1e3a8a,#647dee,#0f172a)]",
  "bg-[linear-gradient(to_right,#0f172a,#facc15,#1e3a8a)]",
  "bg-[linear-gradient(to_right,#3b0764,#ff8c00,#1e293b)]",
  "bg-[linear-gradient(to_right,#1e293b,#00c9ff,#3b0764)]",
];

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthstore();
  const [selectedImg, setselectedImg] = useState(null)

  const handleImageUpload = async(e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async() => {
      const base64String = reader.result;
      setselectedImg(base64String); // Set the selected image to the state
     await  updateProfile({profilePic : base64String})
    };
  };

  const [gradientIndex, setGradientIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setGradientIndex((prev) => (prev + 1) % gradients.length);
        setTransitioning(false);
      }, 2000); // Smooth transition over 2s
    }, 5000); // Change gradient every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative container mx-auto py-10 px-4 max-w-full min-h-[91vh] flex items-center justify-center">
      {/* Outer Background Layer */}
      <div
        className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${gradients[gradientIndex]} ${
          transitioning ? "opacity-75" : "opacity-100"
        }`}
        style={{ zIndex: -2 }}
      ></div>

      {/* Profile Card with Dynamic Gradient Background */}
      <div
        className={`relative p-10 w-full max-w-2xl shadow-xl rounded-lg overflow-hidden border border-gray-700 transition-all duration-[2000ms] ease-in-out ${
          gradients[gradientIndex]
        } ${transitioning ? "opacity-75" : "opacity-100"} backdrop-blur-lg`}
      >
        <h2 className="text-2xl text-center mb-6 font-bold text-white">
          Profile Information
        </h2>

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-6 mb-6">
          <div className="relative group">
            <div className="h-32 w-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
              <img src={selectedImg || authUser.profilePic || "contact.png"} alt="Profile Picture" className="h-20 object-cover"/>
            </div>
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer shadow-md transition-opacity opacity-90 hover:opacity-100 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera size={18} />
              <span className="sr-only">Upload profile picture</span>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </div>
        </div>

        {/* User Information Section */}
        <div className="space-y-5">
          <InfoField label="Full Name" value={authUser?.fullname} icon={<User size={20} />} />
          <InfoField label="Email Address" value={authUser?.email} icon={<Mail size={20} />} />
          <InfoField label="Member Since" value={authUser.createdAt?.split("T")[0]} icon={<Calendar size={20} />} />
          <InfoField
            label="Account Status"
            value={"Active"}
            icon={(<CheckCircle size={20} className="text-green-400" />) 
            }
          />
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, icon }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-300 mb-1">{label}</span>
    <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-md">
      <div className="text-white">{icon}</div>
      <div className="text-white">{value}</div>
    </div>
  </div>
);

export default ProfilePage;
