import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";
import plugin from "windicss/plugin";

export default defineConfig({
  // darkMode: "class", // or 'media'
  theme: {
    extend: {
      colors: {
        themeBg: "F7F6F4",
        themePrimary: "FD7B38",
        themePrimaryLight: "FFF2EC",
      },
      borderRadius: {
        "4xl": "1.9rem",
      },
    },
  },
  plugins: [],
});
