import { ProfileContext } from "./ProfileContext";
import { useState } from "react";

const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null)
  const [email, setEmail] = useState(null);

  const attUser = (user) => {
    setUser(user);
  };

  const attImage = (link) => {
    setImage(link)
  }

  const attEmail = (email) => {
    setEmail(email);
  };


  return (
    <ProfileContext.Provider
      value={{ user, attUser, image, attImage, email, attEmail }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
