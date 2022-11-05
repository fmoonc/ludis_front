import ProfileMenu from "@/components/profile-menu/ProfileMenu";
import MainColorSwitcher from "@/components/main-color-switcher/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";

export default function Configure() {
  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Opciones</h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Profile Menu */}
        <ProfileMenu />

        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          {/*  Color Principal */}
          <div className="intro-y box lg:mt-5">
            <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto">
                Cambiar Color Principal
              </h2>
            </div>

            <div className="p-5">{<MainColorSwitcher />}</div>
          </div>
          {/*  Dark Theme */}
          <div className="intro-y box mt-5">
            <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="font-medium text-base mr-auto">Modo Oscuro</h2>
            </div>

            <div className="p-5">{<DarkModeSwitcher />}</div>
          </div>
        </div>
      </div>
    </>
  );
}
