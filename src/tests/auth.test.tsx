import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";
import { expect, test } from "vitest";
import "@testing-library/jest-dom";

test("renders app without crashing", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <div>App</div>
      </AuthProvider>
    </BrowserRouter>
  );

  expect(screen.getByText("App")).toBeInTheDocument();
});
