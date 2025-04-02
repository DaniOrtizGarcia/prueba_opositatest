import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import { Header } from "./header";

const getHeaderElement = () => screen.getByRole("banner");
const getLogoElement = () => screen.getByAltText("Logo");
const renderHeader = () => render(<Header />);

describe("Header Component", () => {
  it("should render the header with the logo", () => {
    renderHeader();
    const headerElement = getHeaderElement();
    const logoElement = getLogoElement();
    
    expect(headerElement).toBeInTheDocument();
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute("src", expect.stringContaining("logo.png"));
  });
});
