import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../Navbar";

describe("Navbar", () => {
  it("renders correctly", () => {
    render(<Navbar />);

    expect(screen.getByText("Mango's technical test")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Exercise 1" })).toHaveAttribute(
      "href",
      "/exercise1"
    );
    expect(screen.getByRole("link", { name: "Exercise 2" })).toHaveAttribute(
      "href",
      "/exercise2"
    );
  });

  it("has correct styling classes", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("w-full", "h-16", "bg-gray-800", "text-white");
  });
});
