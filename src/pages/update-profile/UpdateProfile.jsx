import ProfileMenu from "@/components/profile-menu/ProfileMenu";
import ViewEditUser from "@/pages/update-profile/ViewEditUser";

export default function UpdateProfile() {

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Perfil</h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Profile Menu */}
        <ProfileMenu />
        {/* END: Profile Menu */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          {/* BEGIN: Display Information */}
          <ViewEditUser />
          {/* END: Display Information */}
        </div>
      </div>
    </>
  );
}
