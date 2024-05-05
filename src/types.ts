export type User = {
  username: string;
  email: string;
  password: string;
};

export type Store = {
  _id: string;
  ownerId: string;
  ownerName: string;
  storeName: string;
  address: string;
  state: string;
  city: string;
  imageUrl: string;
  mobileNumber: string;
};
