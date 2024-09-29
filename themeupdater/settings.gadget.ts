import type { GadgetSettings } from "gadget-server";

export const settings: GadgetSettings = {
  type: "gadget/settings/v1",
  frameworkVersion: "v1.2.0",
  plugins: {
    connections: {
      shopify: {
        apiVersion: "2024-07",
        enabledModels: [
          "shopifyAsset",
          "shopifyFile",
          "shopifyTheme",
        ],
        type: "partner",
        scopes: ["read_themes", "write_themes", "write_pixels"],
      },
      openai: true,
    },
  },
};
