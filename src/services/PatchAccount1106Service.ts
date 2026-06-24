// PatchAccount1106Service.ts

// Import environment if necessary

import { AxiosInstance } from 'axios';

type MembershipServiceClient = AxiosInstance;

export type Contacts = unknown[];

export interface Address {
  [k: string]: unknown;
}

export type Addresses = unknown[];

export type ListCustomFields = unknown[];

export type EmploymentDetails = unknown[];

export type TaxDetails = unknown[];

export type Memberships = unknown[];

export type OrgRelationships = unknown[];

export interface KycDetails {
  [k: string]: unknown;
}

export interface AmlDetails {
  [k: string]: unknown;
}

export type Apps = unknown[];

export type ListRoles = unknown[];

export type Permissions = unknown[];

export type Segments = unknown[];

export type CreditDetails = unknown[];

export type Devices = unknown[];

export interface UserPreference {
  [k: string]: unknown;
}

export type Entitlements = unknown[];

export type Roles = unknown[];

interface Params {
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
  isCitizen?: Boolean;
  isUSCitizen?: Boolean;
  nationality?: string;
  status?: string;
  userType?: string;
  isLock?: Boolean;
  lockedBy?: string;
  lockedAt?: string;
  isDeleted?: Boolean;
  deletedAt?: string;
  lastLoginAt?: string;
  requireChangePass?: Boolean;
  isPresentAsPermAddress?: Boolean;
  createdAt?: string;
  passwordExpired?: Boolean;
  updatedAt?: string;
  nameSuffix?: string;
  religion?: string;
  ethnicity?: string;
  residencyStatus?: string;
  cif?: string;
  highestEducation?: string;
  residentialOwnershipStatus?: string;
  contacts?: Contacts;
  address?: Address;
  addresses?: Addresses;
  listCustomFields?: ListCustomFields;
  employmentDetails?: EmploymentDetails;
  taxDetails?: TaxDetails;
  memberships?: Memberships;
  orgRelationships?: OrgRelationships;
  kycDetails?: KycDetails;
  amlDetails?: AmlDetails;
  apps?: Apps;
  listRoles?: ListRoles;
  permissions?: Permissions;
  segments?: Segments;
  creditDetails?: CreditDetails;
  devices?: Devices;
  userPreference?: UserPreference;
  entitlements?: Entitlements;
  roles?: Roles;
}

import { cleanUrl, cleanBody } from './serviceUtils';

// Define PatchAccount1106Service class
export class PatchAccount1106Service {
  // Singleton instance
  private static _instance: PatchAccount1106Service =
    new PatchAccount1106Service();

  // Client instances

  private _MembershipServiceServiceClient?: MembershipServiceClient;

  // Private constructor for singleton pattern
  private constructor() {
    if (PatchAccount1106Service._instance) {
      throw new Error(
        'Error: Instantiation failed: Use PatchAccount1106Service.getInstance() instead of new.',
      );
    }
    PatchAccount1106Service._instance = this;
  }

  // Method to get singleton instance
  public static instance(): PatchAccount1106Service {
    return PatchAccount1106Service._instance;
  }

  // Method to initialize clients
  public initClients = (clients: {
    membershipServiceServiceClient: MembershipServiceClient;
  }) => {
    this._MembershipServiceServiceClient =
      clients.membershipServiceServiceClient;
  };

  patchAccount1106 = async (params: Params) => {
    // Destructure workflow parameters from params object
    const {
      accessToken,
      userId,
      userName,
      journeyId,
      title,
      firstName,
      middleName,
      lastName,
      nickName,
      fullName,
      gender,
      placeOfBirth,
      countryOfBirth,
      maritalStatus,
      dateOfBirth,
      email,
      countryCode,
      mobileNumber,
      isCitizen,
      isUSCitizen,
      nationality,
      status,
      userType,
      isLock,
      lockedBy,
      lockedAt,
      isDeleted,
      deletedAt,
      lastLoginAt,
      requireChangePass,
      isPresentAsPermAddress,
      createdAt,
      passwordExpired,
      updatedAt,
      nameSuffix,
      religion,
      ethnicity,
      residencyStatus,
      cif,
      highestEducation,
      residentialOwnershipStatus,
      contacts,
      address,
      addresses,
      listCustomFields,
      employmentDetails,
      taxDetails,
      memberships,
      orgRelationships,
      kycDetails,
      amlDetails,
      apps,
      listRoles,
      permissions,
      segments,
      creditDetails,
      devices,
      userPreference,
      entitlements,
      roles,
    } = params;

    try {
      // Destructure environment variables from env.api object

      let step1: unknown = undefined;

      // Check if the clients are registered
      if (!this._MembershipServiceServiceClient) {
        throw new Error('MembershipService Client is not registered');
      }

      // step1
      const step1Request = async () => {
        const client = this._MembershipServiceServiceClient;

        const filteredRequestBody = cleanBody({
          cif: cif,
          email: email,
          title: title,
          gender: gender,
          status: status,
          userId: userId,
          fullName: fullName,
          lastName: lastName,
          lockedAt: lockedAt,
          lockedBy: lockedBy,
          nickName: nickName,
          religion: religion,
          userName: userName,
          userType: userType,
          createdAt: createdAt,
          deletedAt: deletedAt,
          ethnicity: ethnicity,
          firstName: firstName,
          journeyId: journeyId,
          updatedAt: updatedAt,
          middleName: middleName,
          nameSuffix: nameSuffix,
          countryCode: countryCode,
          dateOfBirth: dateOfBirth,
          lastLoginAt: lastLoginAt,
          nationality: nationality,
          mobileNumber: mobileNumber,
          placeOfBirth: placeOfBirth,
          maritalStatus: maritalStatus,
          countryOfBirth: countryOfBirth,
          residencyStatus: residencyStatus,
          highestEducation: highestEducation,
          residentialOwnershipStatus: residentialOwnershipStatus,
          isCitizen: isCitizen,
          isUSCitizen: isUSCitizen,
          isLock: isLock,
          isDeleted: isDeleted,
          requireChangePass: requireChangePass,
          isPresentAsPermAddress: isPresentAsPermAddress,
          contacts: contacts,
          address: address,
          addresses: addresses,
          listCustomFields: listCustomFields,
          employmentDetails: employmentDetails,
          taxDetails: taxDetails,
          memberships: memberships,
          orgRelationships: orgRelationships,
          kycDetails: kycDetails,
          amlDetails: amlDetails,
          apps: apps,
          listRoles: listRoles,
          permissions: permissions,
          segments: segments,
          creditDetails: creditDetails,
          passwordExpired: passwordExpired,
          devices: devices,
          userPreference: userPreference,
          entitlements: entitlements,
          roles: roles,
        });

        const url = cleanUrl(`/users/${userId}`);

        const header = {
          headers: {
            accessToken: `${accessToken}`,
            Authorization: `Bearer ${accessToken}`, // NOSONAR
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        };

        const response = await client.patch(url, filteredRequestBody, header);

        return response;
      };

      try {
        step1 = await step1Request();
        if (!(step1.status < 300)) {
          throw new Error('step1 failed.');
        }

        let step1Response = {
          responseBody: step1.data,
        };
        return step1Response;
      } catch (error) {
        console.error('Error occurred:', error.message);
        throw new Error('patchAccount1 failed', { cause: error });
      }
    } catch (error) {
      // Determine which step failed and include it in the error message

      throw new Error('patchAccount1106 failed', { cause: error });
    }
  };
}
