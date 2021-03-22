import { Server } from "miragejs";

export const fakeServer = () => {
  return new Server({
    routes() {
      this.post("/api/checkout", () => {
        return { success: true };
      });
    },
  });
};
