import { createContext, useState } from "react";

const [roles, setRoles] = useState({
    manufacturer : "",
    thirdparty : "",
    deliveryhub : "",
    customer : "",
});

RoleDataContext = createContext({ roles, setRoles });

const RoleDataContextProvider = ({ children }) => {
  return (
    <RoleDataContext.Provider value={{ roles, setRoles }}>
      {...children}
    </RoleDataContext.Provider>
  );
};

export { RoleDataContext, RoleDataContextProvider };