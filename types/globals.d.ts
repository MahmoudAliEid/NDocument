import { User } from "./types";

declare global {
  interface CustomJwtSessionClaims extends User {
    userId: string;
    orgId: string | undefined;
    orgRole: OrganizationCustomRoleKey | undefined;
    orgSlug: string | undefined;
    orgPermissions: OrganizationCustomPermissionKey[] | undefined;
    __experimental_factorVerificationAge: [number, number] | null;
    getToken: ServerGetToken;
    has: CheckAuthorizationWithCustomPermissions;
    debug: AuthObjectDebug;
    email: string;
  }
}
