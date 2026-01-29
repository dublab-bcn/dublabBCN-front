import { ApiProfile, Bside } from "../../types";
import ProfileCard from "../Profiles/ProfileCard";

interface ProfilesListProps {
  profilesOrBsides: ApiProfile[] | Bside[];
}

const ProfilesListArchive = ({ profilesOrBsides }: ProfilesListProps) => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-6 ">
        {profilesOrBsides.map((profile) => (
          <div key={profile.slug} className="px-4">
            <ProfileCard profile={profile} height={"200px"} />
          </div>
        ))}
      </div>
  );
};

export default ProfilesListArchive;
