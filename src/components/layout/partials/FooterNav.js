import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import EditableText from "../../EditableText";
const FooterNav = ({ className, ...props }) => {
  const classes = classNames("footer-nav", className);

  return (
    <nav {...props} className={classes}>
      <ul className="list-reset">
        <li>
          <Link to="#0">
            <EditableText text="Contact" />
          </Link>
        </li>
        <li>
          <Link to="#0">
            <EditableText text="About us" />
          </Link>
        </li>
        <li>
          <Link to="#0">
            <EditableText text="FAQ's" />
          </Link>
        </li>
        <li>
          <Link to="#0">
            <EditableText text="Support" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNav;
