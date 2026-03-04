"use client";
import { ApiProfile, Bside } from "../../types";
import ProfileCard from "./ProfileCard";

interface ProfilesListProps {
  profilesOrBsides: ApiProfile[] | Bside[];
}

const ProfilesList = ({ profilesOrBsides }: ProfilesListProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-6 px-2">
      {profilesOrBsides.map((profile) => (
        <div key={profile.slug} className="">
          <ProfileCard profile={profile} height={"300px"} />
        </div>
      ))}
    </div>
  ); 
};

export default ProfilesList;
