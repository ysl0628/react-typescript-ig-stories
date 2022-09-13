import useProfile from "../../hooks/useProfile";
import "./index.css";
import Profile from "./Profile";

export default function NavBar() {
  const profiles = useProfile();
  console.log(profiles);

  return (
    <div className="stories-container">
      {profiles.map((profile) => (
        <Profile
          key={profile.id}
          id={profile.id}
          url={profile.profileImg}
          posts={profile.posts as string[]}
        />
      ))}
    </div>
  );
}
