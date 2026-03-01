import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders the input field and default error message", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Write something")).toBeInTheDocument();
  });

  it("updates the input value on change", () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "1,2,3" } });
    expect(input.value).toBe("1,2,3");
  });

  it("displays results when a valid sum exists", () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "1,2,3" } });
    fireEvent.submit(input.closest("form"));

    expect(screen.getByText(/Result for input/)).toBeInTheDocument();
    expect(screen.getByTestId("result-list")).toBeInTheDocument();
    // 1 + 2 = 3, so we expect "1 + 2 = 3"
    expect(screen.getByText("1 + 2 = 3")).toBeInTheDocument();
  });

  it("does not display error paragraph when results are shown", () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "1,2,3" } });
    fireEvent.submit(input.closest("form"));

    expect(screen.queryByText("Write something")).not.toBeInTheDocument();
    expect(screen.queryByClassName?.("App-error") ?? null).toBeNull();
  });

  it("shows no results when no sums are found", () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "1,2,7" } });
    fireEvent.submit(input.closest("form"));

    // Result section should appear but the list should be empty
    expect(screen.getByText(/Result for input/)).toBeInTheDocument();
    expect(screen.getByTestId("result-list")).toBeEmptyDOMElement();
  });

  it("shows the error message initially", () => {
    render(<App />);
    const errorEl = screen.getByText("Write something");
    expect(errorEl).toHaveClass("App-error");
  });
});
