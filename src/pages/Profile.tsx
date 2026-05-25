import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/contexts/AuthContext";

export function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] =
    useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    setProfile(data);
  };

  if (!profile) {
    return (
      <div className="p-6">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black">
        Profile
      </h1>

      <div className="rounded-3xl bg-white p-6 shadow">
        <p className="mb-3">
          <strong>Name:</strong>{" "}
          {profile.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {profile.email}
        </p>
      </div>
    </div>
  );
}