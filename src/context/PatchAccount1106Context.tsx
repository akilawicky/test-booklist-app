import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { PatchAccount1106Service } from '../services/PatchAccount1106Service';

interface PatchAccount1106Params {
  accessToken: string;
  userId: string;
  userName?: string;
  journeyId?: string;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  nickName?: string;
  fullName?: string;
  gender?: string;
  placeOfBirth?: string;
  countryOfBirth?: string;
  maritalStatus?: string;
  dateOfBirth?: string;
  email?: string;
  countryCode?: string;
  mobileNumber?: string;
  isCitizen?: boolean;
  isUSCitizen?: boolean;
  nationality?: string;
  status?: string;
  userType?: string;
  isLock?: boolean;
  lockedBy?: string;
  lockedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  lastLoginAt?: string;
  requireChangePass?: boolean;
  isPresentAsPermAddress?: boolean;
  contacts?: unknown[];
  address?: Record<string, unknown>;
  addresses?: unknown[];
  listCustomFields?: unknown[];
  employmentDetails?: unknown[];
  taxDetails?: unknown[];
  memberships?: unknown[];
  orgRelationships?: unknown[];
  kycDetails?: Record<string, unknown>;
  amlDetails?: Record<string, unknown>;
  apps?: unknown[];
  listRoles?: unknown[];
  permissions?: unknown[];
  segments?: unknown[];
  creditDetails?: unknown[];
  createdAt?: string;
  passwordExpired?: boolean;
  updatedAt?: string;
  nameSuffix?: string;
  religion?: string;
  ethnicity?: string;
  residencyStatus?: string;
  cif?: string;
  highestEducation?: string;
  residentialOwnershipStatus?: string;
  devices?: unknown[];
  userPreference?: Record<string, unknown>;
  entitlements?: unknown[];
  roles?: unknown[];
}
type PatchAccount1106ContextValue = {
  responseBodyLoading: boolean;
  patchAccount1106: (params: PatchAccount1106Params) => Promise<unknown>;
  responseBody: unknown;
};

// Create the PatchAccount1106 context
const PatchAccount1106Context = createContext<
  PatchAccount1106ContextValue | undefined
>(undefined);

const patchAccount1106Service = PatchAccount1106Service.instance();

export const PatchAccount1106Provider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [responseBodyLoading, setResponseBodyLoading] =
    useState<boolean>(false);
  const [responseBody, setResponseBody] = useState<unknown>(null);

  const patchAccount1106 = useCallback(
    async (params: PatchAccount1106Params) => {
      setResponseBodyLoading(true);
      try {
        // Call your service function here
        const result = await patchAccount1106Service.patchAccount1106(params);

        // Handle state update
        setResponseBody(result.responseBody);
        setResponseBodyLoading(false);

        return result;
      } catch (error) {
        setResponseBodyLoading(false);
        if (__DEV__) {
          console.error('[PatchAccount1106] Error:', (error as Error).message);
        }
        throw error;
      }
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      responseBodyLoading,
      patchAccount1106,
      responseBody,
    }),
    [responseBodyLoading, patchAccount1106, responseBody],
  );

  return (
    <PatchAccount1106Context.Provider value={contextValue}>
      {children}
    </PatchAccount1106Context.Provider>
  );
};

export const usePatchAccount1106 = () => {
  const context = useContext(PatchAccount1106Context);
  if (context === undefined) {
    throw new Error(
      'usePatchAccount1106 must be used within a PatchAccount1106Provider',
    );
  }
  return context;
};
