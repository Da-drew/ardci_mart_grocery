import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // If on home page, don't render breadcrumbs
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-3">
      <div className="border-b border-[#d7d7d7] py-6">
        <nav>
          <ol className="breadcrumbs-list flex items-center gap-2 text-sm text-[#626571] leading-none font-medium min-h-7">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              return (
                <React.Fragment key={name}>
                  <BsChevronRight className="h-3.5 w-3.5" />
                  <li
                    className={`breadcrumb-item capitalize ${
                      isLast ? "active text-[#1b8057] font-semibold" : ""
                    }`}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {isLast ? name : <Link to={routeTo}>{name}</Link>}
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
