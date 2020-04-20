export const testDataProfiles = [
  {
    "access_token": "token",
    "expires_in": "5183527",
    "id": 1,
    "impediment": false,
    "name": "Bartholomeu Facebookius",
    "permissions": [
      "public_profile",
      "ads_read"
    ],
    "platform": "facebook_ads"
  },
  {
    id: 2,
    name: "dev@smth.com",
    nickname: "develop",
    businesses: {
      "1": {
        accounts: {}
      }
    }
  }
]

export const testDataAccounts = [
  {
    "account_status": 2,
    "amount_spent": 0,
    "currency": "BRL",
    "disable_reason": 3,
    "id": 1,
    "name": "Conta"
  }
]

export const testDataBusinesses = [
  {
    id: 1,
    name: "dev",
    businesses: [{
      business_id: 1,
      name: "company",
      permitted_roles: ["EMPLOYEE"]
    }],
    access_token: "token",
  },
  {
    id: 2,
    name: "developer",
    businesses: [{
      business_id: 2,
      name: "companies",
      permitted_roles: ["ADMIN"]
    }],
    access_token: "token",
  }
]
