import React from 'react';
import { createContext, useState } from "react";

const RoleDataContext = createContext(null);

export const RoleDataContextProvider = ({ mRole, tpRole, dhRole, cRole, children }) => {

    const [roles, setRoles] = useState({
        manufacturer : mRole,
        thirdparty : tpRole,
        deliveryhub : dhRole,
        customer : cRole
    });

  return (
    <RoleDataContext.Provider value={{ roles, setRoles }}>
      {children}
    </RoleDataContext.Provider>
  );
};

export const useRole = () => React.useContext(RoleDataContext);
