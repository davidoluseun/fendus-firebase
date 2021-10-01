import firebase from "firebase/app";

declare global {
  namespace APP {
    type StoreItemTypes = {
      _id: string;
      title: string;
      image: string;
      description: string;
      inStock: boolean;
      price: number;
      category: string;
      numInCart: number;
      saved: boolean;
    };

    type CurrentUserTypes = firebase.User | null;
    type RenderOrdersTypes = firebase.firestore.DocumentData[];
    type RenderOrderTypes = firebase.firestore.DocumentData | undefined;
    type UserInfoTypes = firebase.firestore.DocumentData | undefined;

    type StoreStateTypes = {
      storeItems: StoreItemTypes[];
    };

    type DeliveryStateStateTypes = {
      deliveryState: string;
    };

    type AuthStateTypes = {
      currentUser: CurrentUserTypes;
      displayName: string;
    };

    type RenderOrdersStateTypes = {
      renderOrders: RenderOrdersTypes;
    };

    type StateTypes = {
      store: StoreStateTypes;
      deliveryState: DeliveryStateStateTypes;
      auth: AuthStateTypes;
      renderOrders: RenderOrdersStateTypes;
    };

    type StoreActionTypes = {
      type: string;
      payload?: StoreItemTypes;
    };

    type DeliveryStateActionTypes = {
      type: string;
      payload: string;
    };

    type AuthActionTypes = {
      type: string;
      payload: CurrentUserTypes;
    };

    type RenderOrdersActionTypes = {
      type: string;
      payload: RenderOrdersTypes;
    };

    type StoreDispatchTypes = (args: StoreActionTypes) => StoreActionTypes;
    type AuthDispatchTypes = (args: AuthActionTypes) => AuthActionTypes;
    type DeliveryStateDispatchTypes = (
      args: DeliveryStateActionTypes
    ) => DeliveryStateActionTypes;

    type RenderOrdersDispatchTypes = (
      args: RenderOrdersActionTypes
    ) => RenderOrdersActionTypes;
  }
}
