// pages/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import user

interface APIUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
  };
  phone: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<APIUser | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: APIUser[]) => {
        if (data.length > 0) {
          setUser(data[0]); // only first user
        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!user) {
    return <div className="p-4">Loading...</div>;
  }

  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}`;

  return (
    <UserProfile
      name={user.name}
      email={user.email}
      userId={user.username}
      phone={user.phone}
      address={fullAddress}
    />
  );
};

export default ProfilePage;