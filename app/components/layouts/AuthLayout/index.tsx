import { FC, PropsWithChildren } from "react";

type AuthLayoutProps = PropsWithChildren<unknown>;

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto">
      {children}
    </div>
  );
};

export default AuthLayout;
