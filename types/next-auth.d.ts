import nextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      accessToken: string;
      data: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        accessToken: string;
        user?: any;
        totalPost?: any;
      };
    };
  }
}
