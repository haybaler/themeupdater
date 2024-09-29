import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "session" model, go to https://themeupdater.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "j1Vo51G-Hwk1",
  fields: {
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "qapzHivuO3CM",
    },
  },
  shopify: { fields: ["shop", "shopifySID"] },
};
