import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import logoUrl from "@/assets/images/logo.svg";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import PropTypes from "prop-types";
import useAuth from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { helper } from "@/utils/helper";
import { routes } from "@/router/index";
import LinkPage from "./LinkPage";
import usePermissions from "@/hooks/usePermissions";

function Main(props) {
  const { hasPermission } = usePermissions({ load: false });
  const { logout, userAuth } = useAuth();
  const { pathname } = useLocation();
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div
        className={`${props.className} top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700`}
      >
        <div className="h-full flex items-center">
          {/* BEGIN: Logo */}
          <Link to="/" className="logo -intro-x md:flex xl:w-[180px] block">
            <img
              alt="Enigma Tailwind HTML Admin Template"
              className="logo__image w-6"
              src={logoUrl}
            />
            <span className="logo__text text-white text-lg ml-3"> Luviit </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <nav aria-label="breadcrumb" className="-intro-x h-[45px] mr-auto">
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                <label>App</label>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {helper.includesOtherMenus(pathname)
                  ? helper.capitalizeFirstLetter(
                      helper.deleteOtherMenus(pathname)
                    )
                  : pathname === "/"
                  ? "DashBoard"
                  : helper.capitalizeFirstLetter(
                      helper.deleteFirstLetter(pathname)
                    )}
              </li>
            </ol>
          </nav>
          {/* END: Breadcrumb */}
          {/* BEGIN: Search */}
          <div className="intro-x relative mr-3 sm:mr-6">
            <div className="search hidden sm:block">
              <input
                type="text"
                className="search__input form-control border-transparent"
                placeholder="Buscar..."
                onFocus={showSearchDropdown}
                onBlur={hideSearchDropdown}
                onChange={handleSearch}
                value={search}
              />
              <Lucide
                icon="Search"
                className="search__icon dark:text-slate-500"
              />
            </div>
            <a className="notification sm:hidden" href="">
              <Lucide
                icon="Search"
                className="notification__icon dark:text-slate-500"
              />
            </a>
            <div
              className={classnames({
                "search-result": true,
                show: searchDropdown,
              })}
            >
              <div className="search-result__content">
                <div className="search-result__content__title">Pages</div>
                <div>
                  {routes &&
                    routes[0].children.map(({ path, icon }) => {
                      if (!hasPermission(path === "/" ? "/" : "/" + path)) {
                        return null;
                      }
                      let newPath = "";
                      path === "/" ? (newPath = "Dashboard") : (newPath = path);
                      if (
                        newPath.toUpperCase().includes(search.toUpperCase())
                      ) {
                        return (
                          <LinkPage
                            key={path}
                            path={path}
                            icon={icon}
                            setSearch={setSearch}
                          />
                        );
                      }
                    })}
                </div>
              </div>
            </div>
          </div>
          {/* END: Search */}
          {/* BEGIN: Notifications */}
          <Dropdown className="intro-x mr-4 sm:mr-6">
            <DropdownToggle
              tag="div"
              role="button"
              className="notification notification--bullet cursor-pointer"
            >
              <Lucide
                icon="Bell"
                className="notification__icon dark:text-slate-500"
              />
            </DropdownToggle>
            <DropdownMenu className="notification-content pt-2">
              <DropdownContent tag="div" className="notification-content__box">
                <div className="notification-content__title">Notifications</div>
                {$_.take($f(), 5).map((faker, fakerKey) => (
                  <div
                    key={fakerKey}
                    className={classnames({
                      "cursor-pointer relative flex items-center": true,
                      "mt-5": fakerKey,
                    })}
                  >
                    <div className="w-12 h-12 flex-none image-fit mr-1">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />
                      <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="" className="font-medium truncate mr-5">
                          {faker.users[0].name}
                        </a>
                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                          {faker.times[0]}
                        </div>
                      </div>
                      <div className="w-full truncate text-slate-500 mt-0.5">
                        {faker.news[0].shortContent}
                      </div>
                    </div>
                  </div>
                ))}
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Notifications */}
          {/* BEGIN: Account Menu */}
          <Dropdown className="intro-x w-8 h-8">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
            >
              <img
                alt="Midone Tailwind HTML Admin Template"
                src={
                  userAuth?.image ??
                  `https://ui-avatars.com/api/?name=${userAuth?.name}`
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${userAuth?.name}`;
                }}
              />
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent className="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <DropdownHeader tag="div" className="!font-normal">
                  <div className="font-medium">
                    {userAuth?.name && userAuth?.surnames
                      ? userAuth.name + " " + userAuth.surnames
                      : "Name Unknown"}
                  </div>
                  <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                    {userAuth?.type_user ? userAuth.type_user : "Type Unknown"}
                  </div>
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />

                <Link to="perfil">
                  <DropdownItem className="hover:bg-white/5" tag="div">
                    <Lucide icon="User" className="w-4 h-4 mr-2" />
                    Perfil
                  </DropdownItem>
                </Link>

                <Link to="cambiar-contrasena">
                  <DropdownItem className="hover:bg-white/5" tag="div">
                    <Lucide icon="Lock" className="w-4 h-4 mr-2" />
                    Cambiar Contraseña
                  </DropdownItem>
                </Link>

                <Link to="opciones">
                  <DropdownItem className="hover:bg-white/5" tag="div">
                    <Lucide icon="Sliders" className="w-4 h-4 mr-2" />
                    Opciones
                  </DropdownItem>
                </Link>

                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5" onClick={logout}>
                  <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

Main.propTypes = {
  className: PropTypes.string,
};

Main.defaultProps = {
  className: "",
};

export default Main;
